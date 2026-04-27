// Blog Sync Resource
//
// Fetches the YetiRocks/blog GitHub repo as a single tarball
// (`/repos/{owner}/{repo}/tarball/{ref}`), decompresses + walks the
// archive in memory, renders markdown posts to HTML, and stores
// posts + images in local tables.
//
// GET /www/api/blogsync → trigger manual sync + return status
//
// Automatic sync: runs every 5 minutes via schedule!() bridge.
// On startup, the first schedule fire syncs immediately.
//
// Repo structure (under the tarball's top-level directory):
//   posts/{slug}/index.md        — post content with YAML frontmatter
//   posts/{slug}/hero_image.png  — optional hero image
//   posts/{slug}/*.png           — additional images referenced in markdown
//
// Images are stored in BlogImage table as base64. HTML references
// /www/api/blogimage/{slug}/{filename} for all images.
//
// Why the tarball: one HTTP request gets an atomic snapshot of the
// repo at the resolved SHA. The previous per-file API approach made
// 1 + 2N + M calls (root listing + per-post index.md + per-post
// folder listing + per-image fetch), which is N×M-style fan-out
// against an API that anonymously rate-limits at 60 req/hr.

use std::collections::{HashMap, HashSet};
use std::io::Read;

use flate2::read::GzDecoder;
use tar::Archive;
use yeti_sdk::prelude::*;

const REPO: &str = "YetiRocks/blog";
const BRANCH: &str = "main";
const IMAGE_API: &str = "/api/blogimage";

// TODO: Uncomment when schedule bridge is implemented (schedule-bridge.md)
// schedule!("sync-blog", sync_posts_scheduled, "*/5 * * * *");
//
// async fn sync_posts_scheduled(ctx: &ScheduleContext) {
//     let synced = do_sync(
//         &ctx.table("BlogPost").unwrap(),
//         &ctx.table("BlogImage").unwrap(),
//     ).await;
//     if synced > 0 {
//         tracing::info!("Scheduled sync: {} posts updated", synced);
//     }
// }

resource!(BlogSync {
    name = "blogsync",

    get(ctx) => {
        let synced = sync_posts(&ctx).await;
        ok(json!({ "synced": synced }))
    }
});

/// One post's worth of files extracted from the tarball.
#[derive(Default)]
struct PostBundle {
    index_md: Option<Vec<u8>>,
    images: HashMap<String, Vec<u8>>, // filename -> raw bytes
}

/// Pull the repo archive and group its `posts/<slug>/*` entries by slug.
/// Returns `None` on any I/O or HTTP error so the caller can keep the
/// existing local state instead of clobbering it with partial data.
fn fetch_repo_bundles() -> Option<HashMap<String, PostBundle>> {
    let url = format!(
        "https://api.github.com/repos/{}/tarball/{}",
        REPO, BRANCH
    );
    let response = match fetch!(&url)
        .header("User-Agent", "yeti-www")
        .header("Accept", "application/vnd.github.v3+json")
        .send()
    {
        Ok(r) if r.ok() => r,
        Ok(r) => {
            tracing::warn!("BlogSync: GitHub tarball returned {}", r.status);
            return None;
        },
        Err(e) => {
            tracing::warn!("BlogSync: GitHub tarball fetch failed: {}", e);
            return None;
        },
    };

    let bytes: &[u8] = response.bytes();
    let gz = GzDecoder::new(bytes);
    let mut archive = Archive::new(gz);

    let mut bundles: HashMap<String, PostBundle> = HashMap::new();

    let entries = match archive.entries() {
        Ok(e) => e,
        Err(e) => {
            tracing::warn!("BlogSync: tar entries iter failed: {}", e);
            return None;
        },
    };

    for entry_result in entries {
        let mut entry = match entry_result {
            Ok(e) => e,
            Err(e) => {
                tracing::warn!("BlogSync: tar entry read failed: {}", e);
                continue;
            },
        };

        // GitHub tarballs nest everything under
        // `<owner>-<repo>-<sha-prefix>/...`. Skip directory entries
        // and anything outside `posts/<slug>/<filename>`.
        if !entry.header().entry_type().is_file() {
            continue;
        }
        let path = match entry.path() {
            Ok(p) => p.into_owned(),
            Err(_) => continue,
        };
        let components: Vec<_> = path.components().collect();
        // Expect [<top>, "posts", "<slug>", "<filename>"] — at least 4.
        if components.len() < 4 {
            continue;
        }
        if components[1].as_os_str() != "posts" {
            continue;
        }
        let slug = match components[2].as_os_str().to_str() {
            Some(s) => s.to_string(),
            None => continue,
        };
        let filename = match components[3].as_os_str().to_str() {
            Some(s) => s.to_string(),
            None => continue,
        };

        let mut buf = Vec::new();
        if let Err(e) = entry.read_to_end(&mut buf) {
            tracing::warn!("BlogSync: read {} failed: {}", path.display(), e);
            continue;
        }

        let bundle = bundles.entry(slug).or_default();
        if filename == "index.md" {
            bundle.index_md = Some(buf);
        } else if is_image_filename(&filename) {
            bundle.images.insert(filename, buf);
        }
    }

    Some(bundles)
}

fn is_image_filename(name: &str) -> bool {
    name.ends_with(".png")
        || name.ends_with(".jpg")
        || name.ends_with(".jpeg")
        || name.ends_with(".gif")
        || name.ends_with(".webp")
        || name.ends_with(".avif")
}

fn content_type_for(name: &str) -> &'static str {
    if name.ends_with(".jpg") || name.ends_with(".jpeg") {
        "image/jpeg"
    } else if name.ends_with(".gif") {
        "image/gif"
    } else if name.ends_with(".webp") {
        "image/webp"
    } else if name.ends_with(".avif") {
        "image/avif"
    } else {
        "image/png"
    }
}

async fn sync_posts(ctx: &Context) -> usize {
    let post_table = match ctx.table("BlogPost") {
        Ok(t) => t,
        Err(e) => {
            tracing::warn!("BlogSync: BlogPost table not available: {}", e);
            return 0;
        },
    };

    let image_table = match ctx.table("BlogImage") {
        Ok(t) => t,
        Err(e) => {
            tracing::warn!("BlogSync: BlogImage table not available: {}", e);
            return 0;
        },
    };

    let bundles = match fetch_repo_bundles() {
        Some(b) => b,
        None => return 0, // already logged
    };

    let repo_slugs: HashSet<String> = bundles.keys().cloned().collect();
    let mut synced = 0usize;

    for (slug, bundle) in &bundles {
        let raw_bytes = match bundle.index_md.as_ref() {
            Some(b) => b,
            None => continue, // post folder without an index.md, skip
        };
        let raw = match std::str::from_utf8(raw_bytes) {
            Ok(s) => s,
            Err(_) => {
                tracing::warn!("BlogSync: index.md for '{}' is not utf-8", slug);
                continue;
            },
        };

        let (meta, content) = parse_frontmatter(raw);
        let title = match meta.get("title") {
            Some(t) => t.clone(),
            None => continue,
        };

        // Persist images, track whether a hero exists.
        let mut has_hero = false;
        for (filename, image_bytes) in &bundle.images {
            let image_id = format!("{}/{}", slug, filename);
            let record = json!({
                "id": image_id,
                "contentType": content_type_for(filename),
                "data": base64_encode(image_bytes),
            });
            if let Err(e) = image_table.put(&image_id, record).await {
                tracing::warn!(
                    "BlogSync: image store failed for {}/{}: {}",
                    slug,
                    filename,
                    e
                );
            }
            if filename == "hero_image.png"
                || filename == "hero_image.jpg"
                || filename == "hero_image.jpeg"
            {
                has_hero = true;
            }
        }

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
                tracing::warn!("BlogSync: write failed for '{}': {}", slug, e);
            },
        }
    }

    // Cleanup pass: drop posts (and their images) that no longer
    // appear in the repo snapshot.
    let mut removed = 0usize;
    let existing = post_table.get_all().await.unwrap_or_default();
    for record in &existing {
        let Some(id) = record.get("id").and_then(|v| v.as_str()) else {
            continue;
        };
        if repo_slugs.contains(id) {
            continue;
        }
        if let Err(e) = post_table.delete(id).await {
            tracing::warn!("BlogSync: failed to remove '{}': {}", id, e);
            continue;
        }
        let prefix = format!("{}/", id);
        let images = image_table.get_all().await.unwrap_or_default();
        for img in &images {
            if let Some(img_id) = img.get("id").and_then(|v| v.as_str())
                && img_id.starts_with(&prefix)
            {
                let _ = image_table.delete(img_id).await;
            }
        }
        removed += 1;
    }

    if synced > 0 || removed > 0 {
        tracing::info!(
            "BlogSync: synced {} posts, removed {} from {}",
            synced,
            removed,
            REPO
        );
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
                if code_lang.is_empty() {
                    html.push_str("<code>");
                } else {
                    html.push_str(&format!("<code class=\"language-{}\">", code_lang));
                }
                html.push_str(&html_escape(&code_buf));
                html.push_str("</code></pre>\n");
                code_buf.clear();
                in_code_block = false;
            } else {
                if in_paragraph { html.push_str("</p>\n"); in_paragraph = false; }
                if in_list { html.push_str("</ul>\n"); in_list = false; }
                code_lang = line[3..].trim().to_string();
                html.push_str("<pre>");
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
