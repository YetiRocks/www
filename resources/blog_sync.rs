// Blog Sync Resource
//
// Polls YetiRocks/blog GitHub repo for markdown posts and syncs them
// to the BlogPost table. Runs on a 5-minute interval via a background
// task started on first GET.
//
// GET /www/api/blogsync → trigger sync + return status
//
// Posts are markdown files in posts/ with YAML frontmatter. The slug
// is the filename without .md. Content is rendered to HTML server-side
// via a simple markdown-to-HTML converter.

use yeti_sdk::prelude::*;

const REPO: &str = "YetiRocks/blog";
const BRANCH: &str = "main";
const POSTS_DIR: &str = "posts";

resource!(BlogSync {
    name = "blogsync",

    get(ctx) => {
        let synced = sync_posts(&ctx).await;
        ok(json!({ "synced": synced }))
    }
});

async fn sync_posts(ctx: &ResourceContext) -> usize {
    let table = match ctx.get_table("BlogPost") {
        Ok(t) => t,
        Err(e) => {
            yeti_log!(warn, "BlogSync: BlogPost table not available: {}", e);
            return 0;
        }
    };

    // Fetch file list from GitHub Contents API
    let api_url = format!(
        "https://api.github.com/repos/{}/contents/{}?ref={}",
        REPO, POSTS_DIR, BRANCH
    );

    let response = match fetch!(&api_url) {
        Ok(r) => r,
        Err(e) => {
            yeti_log!(warn, "BlogSync: GitHub API fetch failed: {}", e);
            return 0;
        }
    };

    if !response.ok() {
        yeti_log!(warn, "BlogSync: GitHub API returned {}", response.status);
        return 0;
    }

    let files: Vec<Value> = match response.json() {
        Ok(v) => v,
        Err(e) => {
            yeti_log!(warn, "BlogSync: GitHub API parse failed: {}", e);
            return 0;
        }
    };

    let mut synced = 0usize;

    for file in &files {
        let name = match file.get("name").and_then(|v| v.as_str()) {
            Some(n) if n.ends_with(".md") => n,
            _ => continue,
        };

        let slug = name.trim_end_matches(".md");
        let download_url = match file.get("download_url").and_then(|v| v.as_str()) {
            Some(u) => u,
            None => continue,
        };

        // Fetch raw markdown
        let raw = match fetch!(download_url) {
            Ok(r) if r.ok() => match r.text() {
                Ok(t) => t,
                Err(_) => continue,
            },
            _ => continue,
        };

        // Parse frontmatter
        let (meta, content) = parse_frontmatter(&raw);
        let title = match meta.get("title") {
            Some(t) => t.clone(),
            None => continue, // Skip files without title
        };

        // Convert markdown to HTML
        let html = markdown_to_html(&content);

        // Upsert into BlogPost table
        let record = json!({
            "id": slug,
            "title": title,
            "description": meta.get("description").cloned().unwrap_or_default(),
            "date": meta.get("date").cloned().unwrap_or_default(),
            "author": meta.get("author").cloned().unwrap_or_else(|| "Yeti Team".to_string()),
            "category": meta.get("category").cloned().unwrap_or_else(|| "Engineering".to_string()),
            "readingTime": meta.get("readingTime").cloned().unwrap_or_else(|| "5 min read".to_string()),
            "content": html,
        });

        match table.put(slug, record).await {
            Ok(_) => synced += 1,
            Err(e) => {
                yeti_log!(warn, "BlogSync: Failed to write post '{}': {}", slug, e);
            }
        }
    }

    if synced > 0 {
        yeti_log!(info, "BlogSync: synced {} posts from {}", synced, REPO);
    }

    synced
}

fn parse_frontmatter(markdown: &str) -> (std::collections::HashMap<String, String>, String) {
    let mut meta = std::collections::HashMap::new();

    if !markdown.starts_with("---\n") {
        return (meta, markdown.to_string());
    }

    let rest = &markdown[4..];
    let end = match rest.find("\n---\n") {
        Some(pos) => pos,
        None => return (meta, markdown.to_string()),
    };

    let frontmatter = &rest[..end];
    let content = &rest[end + 5..];

    for line in frontmatter.lines() {
        if let Some(colon) = line.find(':') {
            let key = line[..colon].trim().to_string();
            let value = line[colon + 1..].trim().trim_matches('"').trim_matches('\'').to_string();
            meta.insert(key, value);
        }
    }

    (meta, content.trim().to_string())
}

/// Simple markdown to HTML converter — handles the common cases.
/// Keeps it dependency-free in the plugin (no external crate needed).
fn markdown_to_html(md: &str) -> String {
    let mut html = String::with_capacity(md.len() * 2);
    let mut in_code_block = false;
    let mut code_lang = String::new();
    let mut code_buf = String::new();
    let mut in_paragraph = false;
    let mut in_list = false;

    for line in md.lines() {
        // Code blocks
        if line.starts_with("```") {
            if in_code_block {
                html.push_str("<code>");
                html.push_str(&html_escape(&code_buf));
                html.push_str("</code></pre>\n");
                code_buf.clear();
                in_code_block = false;
            } else {
                if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
                if in_list { html.push_str("</ul>\n"); in_list = false; }
                code_lang = line[3..].trim().to_string();
                if code_lang.is_empty() {
                    html.push_str("<pre>");
                } else {
                    html.push_str(&format!("<pre class=\"language-{}\">", code_lang));
                }
                in_code_block = true;
            }
            continue;
        }

        if in_code_block {
            if !code_buf.is_empty() { code_buf.push('\n'); }
            code_buf.push_str(line);
            continue;
        }

        let trimmed = line.trim();

        // Empty line — close paragraph
        if trimmed.is_empty() {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            continue;
        }

        // Headings
        if trimmed.starts_with("## ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h2>{}</h2>\n", inline_md(&trimmed[3..])));
            continue;
        }
        if trimmed.starts_with("### ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h3>{}</h3>\n", inline_md(&trimmed[4..])));
            continue;
        }

        // Unordered list
        if trimmed.starts_with("- ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if !in_list { html.push_str("<ul>\n"); in_list = true; }
            html.push_str(&format!("<li>{}</li>\n", inline_md(&trimmed[2..])));
            continue;
        }

        // Blockquote
        if trimmed.starts_with("> ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<blockquote><p>{}</p></blockquote>\n", inline_md(&trimmed[2..])));
            continue;
        }

        // Regular paragraph
        if !in_paragraph {
            html.push_str("<p>");
            in_paragraph = true;
        } else {
            html.push(' ');
        }
        html.push_str(&inline_md(trimmed));
    }

    if in_paragraph { html.push_str("</p>\n"); }
    if in_list { html.push_str("</ul>\n"); }
    if in_code_block {
        html.push_str("<code>");
        html.push_str(&html_escape(&code_buf));
        html.push_str("</code></pre>\n");
    }

    html
}

/// Inline markdown: bold, italic, code, links
fn inline_md(text: &str) -> String {
    let mut result = html_escape(text);
    // Code spans (must be before bold/italic to avoid conflicts)
    while let Some(start) = result.find('`') {
        if let Some(end) = result[start + 1..].find('`') {
            let code = &result[start + 1..start + 1 + end].to_string();
            result = format!(
                "{}<code>{}</code>{}",
                &result[..start],
                code,
                &result[start + 2 + end..]
            );
        } else {
            break;
        }
    }
    // Bold
    while let Some(start) = result.find("**") {
        if let Some(end) = result[start + 2..].find("**") {
            let bold = &result[start + 2..start + 2 + end].to_string();
            result = format!(
                "{}<strong>{}</strong>{}",
                &result[..start],
                bold,
                &result[start + 4 + end..]
            );
        } else {
            break;
        }
    }
    // Links [text](url)
    while let Some(bracket_start) = result.find('[') {
        if let Some(bracket_end) = result[bracket_start..].find("](") {
            let abs_bracket_end = bracket_start + bracket_end;
            if let Some(paren_end) = result[abs_bracket_end + 2..].find(')') {
                let text = &result[bracket_start + 1..abs_bracket_end].to_string();
                let url = &result[abs_bracket_end + 2..abs_bracket_end + 2 + paren_end].to_string();
                result = format!(
                    "{}<a href=\"{}\">{}</a>{}",
                    &result[..bracket_start],
                    url,
                    text,
                    &result[abs_bracket_end + 3 + paren_end..]
                );
            } else {
                break;
            }
        } else {
            break;
        }
    }
    result
}

fn html_escape(text: &str) -> String {
    text.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
}
