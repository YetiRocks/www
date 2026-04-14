// Blog Sync Resource
//
// Fetches markdown posts from YetiRocks/blog GitHub repo, renders to HTML,
// downloads images, and stores everything in local tables.
//
// GET /www/api/blogsync → trigger manual sync + return status
//
// Automatic sync: runs every 5 minutes via schedule!() bridge.
// On startup, the first schedule fire syncs immediately.
//
// Repo structure:
//   posts/{slug}/index.md        — post content with YAML frontmatter
//   posts/{slug}/hero_image.png  — optional hero image
//   posts/{slug}/*.png           — additional images referenced in markdown
//
// Images are downloaded and stored in BlogImage table as base64.
// HTML references /www/api/blogimage/{slug}/{filename} for all images.

use yeti_sdk::prelude::*;

const REPO: &str = "YetiRocks/blog";
const BRANCH: &str = "main";
const POSTS_DIR: &str = "posts";
const RAW_BASE: &str = "https://raw.githubusercontent.com/YetiRocks/blog/main/posts";
const IMAGE_API: &str = "/www/api/blogimage";

// TODO: Uncomment when schedule bridge is implemented (schedule-bridge.md)
// schedule!("sync-blog", sync_posts_scheduled, "*/5 * * * *");
//
// async fn sync_posts_scheduled(ctx: &ScheduleContext) {
//     let synced = do_sync(
//         &ctx.get_table("BlogPost").unwrap(),
//         &ctx.get_table("BlogImage").unwrap(),
//     ).await;
//     if synced > 0 {
//         yeti_log!(info, "Scheduled sync: {} posts updated", synced);
//     }
// }

resource!(BlogSync {
    name = "blogsync",

    get(ctx) => {
        let synced = sync_posts(&ctx).await;
        ok(json!({ "synced": synced }))
    }
});

async fn sync_posts(ctx: &ResourceContext) -> usize {
    let post_table = match ctx.get_table("BlogPost") {
        Ok(t) => t,
        Err(e) => {
            yeti_log!(warn, "BlogSync: BlogPost table not available: {}", e);
            return 0;
        }
    };

    let image_table = match ctx.get_table("BlogImage") {
        Ok(t) => t,
        Err(e) => {
            yeti_log!(warn, "BlogSync: BlogImage table not available: {}", e);
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
            yeti_log!(warn, "BlogSync: GitHub API failed: {}", e);
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
            yeti_log!(warn, "BlogSync: parse failed: {}", e);
            return 0;
        }
    };

    let mut synced = 0usize;

    for entry in &entries {
        if entry.get("type").and_then(|v| v.as_str()) != Some("dir") {
            continue;
        }

        let slug = match entry.get("name").and_then(|v| v.as_str()) {
            Some(n) => n,
            None => continue,
        };

        // Fetch index.md
        let md_url = format!("{}/{}/index.md", RAW_BASE, slug);
        let raw = match fetch!(&md_url) {
            Ok(r) if r.ok() => match r.text() {
                Ok(t) => t,
                Err(_) => continue,
            },
            _ => continue,
        };

        let (meta, content) = parse_frontmatter(&raw);
        let title = match meta.get("title") {
            Some(t) => t.clone(),
            None => continue,
        };

        // List files in the post folder to find images
        let folder_api = format!(
            "https://api.github.com/repos/{}/contents/{}/{}?ref={}",
            REPO, POSTS_DIR, slug, BRANCH
        );
        let image_files: Vec<String> = match fetch!(&folder_api) {
            Ok(r) if r.ok() => {
                let files: Vec<Value> = r.json().unwrap_or_default();
                files
                    .iter()
                    .filter_map(|f| {
                        let name = f.get("name")?.as_str()?;
                        if name.ends_with(".png")
                            || name.ends_with(".jpg")
                            || name.ends_with(".jpeg")
                            || name.ends_with(".gif")
                            || name.ends_with(".webp")
                            || name.ends_with(".avif")
                        {
                            Some(name.to_string())
                        } else {
                            None
                        }
                    })
                    .collect()
            },
            _ => Vec::new(),
        };

        // Download and store each image
        let mut has_hero = false;
        for filename in &image_files {
            let img_url = format!("{}/{}/{}", RAW_BASE, slug, filename);
            if let Ok(img_resp) = fetch!(&img_url) {
                if img_resp.ok() {
                    if let Ok(bytes) = img_resp.bytes() {
                        let content_type = if filename.ends_with(".jpg") || filename.ends_with(".jpeg") {
                            "image/jpeg"
                        } else if filename.ends_with(".gif") {
                            "image/gif"
                        } else if filename.ends_with(".webp") {
                            "image/webp"
                        } else if filename.ends_with(".avif") {
                            "image/avif"
                        } else {
                            "image/png"
                        };

                        let image_id = format!("{}/{}", slug, filename);
                        let record = json!({
                            "id": image_id,
                            "contentType": content_type,
                            "data": base64_encode(&bytes),
                        });

                        if let Err(e) = image_table.put(&image_id, record).await {
                            yeti_log!(warn, "BlogSync: image store failed for {}/{}: {}", slug, filename, e);
                        }

                        if filename == "hero_image.png"
                            || filename == "hero_image.jpg"
                            || filename == "hero_image.jpeg"
                        {
                            has_hero = true;
                        }
                    }
                }
            }
        }

        // Convert markdown to HTML with local image URLs
        let html = markdown_to_html(&content, slug);

        let hero_value = if has_hero {
            json!(format!("{}/{}/hero_image.png", IMAGE_API, slug))
        } else {
            json!(null)
        };

        let record = json!({
            "id": slug,
            "title": title,
            "description": meta.get("description").cloned().unwrap_or_default(),
            "date": meta.get("date").cloned().unwrap_or_default(),
            "author": meta.get("author").cloned().unwrap_or_else(|| "Yeti Team".to_string()),
            "category": meta.get("category").cloned().unwrap_or_else(|| "Engineering".to_string()),
            "readingTime": meta.get("readingTime").cloned().unwrap_or_else(|| "5 min read".to_string()),
            "content": html,
            "heroImage": hero_value,
        });

        match post_table.put(slug, record).await {
            Ok(_) => synced += 1,
            Err(e) => {
                yeti_log!(warn, "BlogSync: write failed for '{}': {}", slug, e);
            }
        }
    }

    if synced > 0 {
        yeti_log!(info, "BlogSync: synced {} posts + images from {}", synced, REPO);
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
    for line in rest[..end].lines() {
        if let Some(colon) = line.find(':') {
            let key = line[..colon].trim().to_string();
            let value = line[colon + 1..].trim().trim_matches('"').trim_matches('\'').to_string();
            meta.insert(key, value);
        }
    }
    (meta, rest[end + 5..].trim().to_string())
}

/// Convert markdown to HTML with image URLs pointing to local blogimage API.
fn markdown_to_html(md: &str, slug: &str) -> String {
    let image_prefix = format!("{}/{}", IMAGE_API, slug);
    let mut html = String::with_capacity(md.len() * 2);
    let mut in_code_block = false;
    let mut code_lang = String::new();
    let mut code_buf = String::new();
    let mut in_paragraph = false;
    let mut in_list = false;

    for line in md.lines() {
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
                html.push_str(if code_lang.is_empty() {
                    "<pre>".to_string()
                } else {
                    format!("<pre class=\"language-{}\">", code_lang)
                }.as_str());
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
        if trimmed.is_empty() {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            continue;
        }
        if trimmed.starts_with("## ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h2>{}</h2>\n", inline_md(&trimmed[3..], &image_prefix)));
            continue;
        }
        if trimmed.starts_with("### ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<h3>{}</h3>\n", inline_md(&trimmed[4..], &image_prefix)));
            continue;
        }
        if trimmed.starts_with("- ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if !in_list { html.push_str("<ul>\n"); in_list = true; }
            html.push_str(&format!("<li>{}</li>\n", inline_md(&trimmed[2..], &image_prefix)));
            continue;
        }
        if trimmed.starts_with("> ") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            html.push_str(&format!("<blockquote><p>{}</p></blockquote>\n", inline_md(&trimmed[2..], &image_prefix)));
            continue;
        }
        // Standalone image
        if trimmed.starts_with("![") {
            if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
            if in_list { html.push_str("</ul>\n"); in_list = false; }
            if let Some((alt, src)) = parse_image(trimmed) {
                let resolved = resolve_url(&src, &image_prefix);
                html.push_str(&format!(
                    "<figure><img src=\"{}\" alt=\"{}\" loading=\"lazy\" />{}</figure>\n",
                    resolved, html_escape(&alt),
                    if alt.is_empty() { String::new() } else { format!("<figcaption>{}</figcaption>", html_escape(&alt)) }
                ));
            }
            continue;
        }
        if !in_paragraph { html.push_str("<p>"); in_paragraph = true; } else { html.push(' '); }
        html.push_str(&inline_md(trimmed, &image_prefix));
    }
    if in_paragraph { html.push_str("</p>\n"); }
    if in_list { html.push_str("</ul>\n"); }
    if in_code_block { html.push_str("<code>"); html.push_str(&html_escape(&code_buf)); html.push_str("</code></pre>\n"); }
    html
}

fn parse_image(text: &str) -> Option<(String, String)> {
    let s = text.find("![")?;
    let ae = text[s + 2..].find("](")?;
    let alt = text[s + 2..s + 2 + ae].to_string();
    let ss = s + 2 + ae + 2;
    let se = text[ss..].find(')')?;
    Some((alt, text[ss..ss + se].to_string()))
}

fn resolve_url(src: &str, prefix: &str) -> String {
    if src.starts_with("http://") || src.starts_with("https://") { src.to_string() }
    else { format!("{}/{}", prefix, src.trim_start_matches("./")) }
}

fn inline_md(text: &str, image_prefix: &str) -> String {
    let mut r = html_escape(text);
    // Code
    while let Some(s) = r.find('`') {
        if let Some(e) = r[s + 1..].find('`') {
            let c = r[s + 1..s + 1 + e].to_string();
            r = format!("{}<code>{}</code>{}", &r[..s], c, &r[s + 2 + e..]);
        } else { break; }
    }
    // Bold
    while let Some(s) = r.find("**") {
        if let Some(e) = r[s + 2..].find("**") {
            let b = r[s + 2..s + 2 + e].to_string();
            r = format!("{}<strong>{}</strong>{}", &r[..s], b, &r[s + 4 + e..]);
        } else { break; }
    }
    // Images
    while let Some(s) = r.find("![") {
        if let Some((alt, src)) = parse_image(&r[s..]) {
            let len = 4 + alt.len() + src.len();
            let resolved = resolve_url(&src, image_prefix);
            let img = format!("<img src=\"{}\" alt=\"{}\" loading=\"lazy\" />", resolved, alt);
            r = format!("{}{}{}", &r[..s], img, &r[s + len..]);
        } else { break; }
    }
    // Links
    while let Some(bs) = r.find('[') {
        if bs > 0 && r.as_bytes()[bs - 1] == b'!' { break; }
        if let Some(be) = r[bs..].find("](") {
            let abe = bs + be;
            if let Some(pe) = r[abe + 2..].find(')') {
                let t = r[bs + 1..abe].to_string();
                let u = r[abe + 2..abe + 2 + pe].to_string();
                r = format!("{}<a href=\"{}\">{}</a>{}", &r[..bs], u, t, &r[abe + 3 + pe..]);
            } else { break; }
        } else { break; }
    }
    r
}

fn html_escape(t: &str) -> String {
    t.replace('&', "&amp;").replace('<', "&lt;").replace('>', "&gt;")
}
