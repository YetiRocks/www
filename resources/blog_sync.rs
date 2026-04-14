// Blog Sync Resource
//
// Polls YetiRocks/blog GitHub repo for markdown posts and syncs them
// to the BlogPost table.
//
// GET /www/api/blogsync → trigger sync + return status
//
// Repo structure:
//   posts/{slug}/index.md      — post content with YAML frontmatter
//   posts/{slug}/hero_image.png — optional hero image (always named hero_image.png)
//   posts/{slug}/*.png          — additional images referenced in markdown
//
// Images are served from GitHub raw content URLs. Relative image paths
// in markdown are resolved to absolute GitHub URLs during sync.

use yeti_sdk::prelude::*;

const REPO: &str = "YetiRocks/blog";
const BRANCH: &str = "main";
const POSTS_DIR: &str = "posts";
const RAW_BASE: &str = "https://raw.githubusercontent.com/YetiRocks/blog/main/posts";

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

    // Fetch top-level directory listing (each entry is a post folder)
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

    let entries: Vec<Value> = match response.json() {
        Ok(v) => v,
        Err(e) => {
            yeti_log!(warn, "BlogSync: GitHub API parse failed: {}", e);
            return 0;
        }
    };

    let mut synced = 0usize;

    for entry in &entries {
        // Only process directories (each is a post folder)
        let entry_type = entry.get("type").and_then(|v| v.as_str()).unwrap_or("");
        if entry_type != "dir" {
            continue;
        }

        let slug = match entry.get("name").and_then(|v| v.as_str()) {
            Some(n) => n,
            None => continue,
        };

        // Fetch index.md from the post folder
        let md_url = format!("{}/{}/index.md", RAW_BASE, slug);
        let raw = match fetch!(&md_url) {
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
            None => continue,
        };

        // Check for hero image (convention: hero_image.png in the post folder)
        let hero_url = format!("{}/{}/hero_image.png", RAW_BASE, slug);

        // Convert markdown to HTML, resolving relative image paths to GitHub URLs
        let html = markdown_to_html(&content, slug);

        // Build record with hero image URL
        let mut record = json!({
            "id": slug,
            "title": title,
            "description": meta.get("description").cloned().unwrap_or_default(),
            "date": meta.get("date").cloned().unwrap_or_default(),
            "author": meta.get("author").cloned().unwrap_or_else(|| "Yeti Team".to_string()),
            "category": meta.get("category").cloned().unwrap_or_else(|| "Engineering".to_string()),
            "readingTime": meta.get("readingTime").cloned().unwrap_or_else(|| "5 min read".to_string()),
            "content": html,
            "heroImage": hero_url,
        });

        // Check if hero image actually exists (HEAD request)
        if let Ok(head) = fetch!(&record["heroImage"].as_str().unwrap_or(""), {
            "method": "HEAD"
        }) {
            if !head.ok() {
                record["heroImage"] = json!(null);
            }
        }

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

/// Convert markdown to HTML, resolving relative image paths to GitHub raw URLs.
fn markdown_to_html(md: &str, slug: &str) -> String {
    let image_base = format!("{}/{}", RAW_BASE, slug);
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

        // Empty line
        if trimmed.is_empty() {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            continue;
        }

        // Headings
        if trimmed.starts_with("## ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h2>{}</h2>\n", inline_md(trimmed[3..].trim(), &image_base)));
            continue;
        }
        if trimmed.starts_with("### ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h3>{}</h3>\n", inline_md(trimmed[4..].trim(), &image_base)));
            continue;
        }

        // Unordered list
        if trimmed.starts_with("- ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if !in_list { html.push_str("<ul>\n"); in_list = true; }
            html.push_str(&format!("<li>{}</li>\n", inline_md(&trimmed[2..], &image_base)));
            continue;
        }

        // Blockquote
        if trimmed.starts_with("> ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<blockquote><p>{}</p></blockquote>\n", inline_md(&trimmed[2..], &image_base)));
            continue;
        }

        // Image on its own line: ![alt](path)
        if trimmed.starts_with("![") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            if let Some((alt, src)) = parse_image_md(trimmed) {
                let resolved_src = resolve_image_url(&src, &image_base);
                html.push_str(&format!(
                    "<figure><img src=\"{}\" alt=\"{}\" loading=\"lazy\" />{}</figure>\n",
                    resolved_src,
                    html_escape(&alt),
                    if alt.is_empty() { String::new() } else { format!("<figcaption>{}</figcaption>", html_escape(&alt)) }
                ));
            }
            continue;
        }

        // Regular paragraph
        if !in_paragraph {
            html.push_str("<p>");
            in_paragraph = true;
        } else {
            html.push(' ');
        }
        html.push_str(&inline_md(trimmed, &image_base));
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

fn parse_image_md(text: &str) -> Option<(String, String)> {
    // ![alt](src)
    let start = text.find("![")?;
    let alt_end = text[start + 2..].find("](")?;
    let alt = text[start + 2..start + 2 + alt_end].to_string();
    let src_start = start + 2 + alt_end + 2;
    let src_end = text[src_start..].find(')')?;
    let src = text[src_start..src_start + src_end].to_string();
    Some((alt, src))
}

fn resolve_image_url(src: &str, image_base: &str) -> String {
    if src.starts_with("http://") || src.starts_with("https://") {
        src.to_string()
    } else {
        format!("{}/{}", image_base, src.trim_start_matches("./"))
    }
}

/// Inline markdown: bold, italic, code, links, inline images
fn inline_md(text: &str, image_base: &str) -> String {
    let mut result = html_escape(text);
    // Code spans
    while let Some(start) = result.find('`') {
        if let Some(end) = result[start + 1..].find('`') {
            let code = result[start + 1..start + 1 + end].to_string();
            result = format!("{}<code>{}</code>{}", &result[..start], code, &result[start + 2 + end..]);
        } else { break; }
    }
    // Bold
    while let Some(start) = result.find("**") {
        if let Some(end) = result[start + 2..].find("**") {
            let bold = result[start + 2..start + 2 + end].to_string();
            result = format!("{}<strong>{}</strong>{}", &result[..start], bold, &result[start + 4 + end..]);
        } else { break; }
    }
    // Images ![alt](src)
    while let Some(start) = result.find("![") {
        if let Some((alt, src)) = parse_image_md(&result[start..]) {
            let full_len = 4 + alt.len() + src.len(); // ![alt](src)
            let resolved = resolve_image_url(&src, image_base);
            let img_html = format!("<img src=\"{}\" alt=\"{}\" loading=\"lazy\" />", resolved, alt);
            result = format!("{}{}{}", &result[..start], img_html, &result[start + full_len..]);
        } else { break; }
    }
    // Links [text](url)
    while let Some(bracket_start) = result.find('[') {
        // Skip if preceded by ! (image, already handled)
        if bracket_start > 0 && result.as_bytes()[bracket_start - 1] == b'!' { break; }
        if let Some(bracket_end) = result[bracket_start..].find("](") {
            let abs_bracket_end = bracket_start + bracket_end;
            if let Some(paren_end) = result[abs_bracket_end + 2..].find(')') {
                let text_inner = result[bracket_start + 1..abs_bracket_end].to_string();
                let url = result[abs_bracket_end + 2..abs_bracket_end + 2 + paren_end].to_string();
                result = format!("{}<a href=\"{}\">{}</a>{}", &result[..bracket_start], url, text_inner, &result[abs_bracket_end + 3 + paren_end..]);
            } else { break; }
        } else { break; }
    }
    result
}

fn html_escape(text: &str) -> String {
    text.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;")
}
