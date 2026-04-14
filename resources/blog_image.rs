// Blog Image Resource
//
// Serves blog images from the BlogImage table as binary responses.
// Images are stored as base64 in the table by the blog_sync resource.
//
// GET /www/api/blogimage/{slug}/{filename} → image binary with correct Content-Type

use yeti_sdk::prelude::*;

resource!(BlogImage {
    name = "blogimage",

    get(ctx) => {
        // Path: /blogimage/{slug}/{filename} → path_id = "{slug}/{filename}"
        let path_id = match ctx.path_id.as_deref() {
            Some(p) => p,
            None => return error_response(400, "Usage: /blogimage/{slug}/{filename}"),
        };

        let table = ctx.get_table("BlogImage")?;

        // The image ID in the table is "{slug}/{filename}"
        match table.get(path_id).await {
            Ok(Some(record)) => {
                let content_type = record.get("contentType")
                    .and_then(|v| v.as_str())
                    .unwrap_or("image/png");
                let data_b64 = match record.get("data").and_then(|v| v.as_str()) {
                    Some(d) => d,
                    None => return error_response(404, "Image data missing"),
                };

                // Decode base64 to binary
                let bytes = match base64_decode(data_b64) {
                    Ok(b) => b,
                    Err(_) => return error_response(500, "Image decode failed"),
                };

                Ok(http::Response::builder()
                    .status(200)
                    .header("content-type", content_type)
                    .header("cache-control", "public, max-age=86400")
                    .body(ResponseBody::Complete(bytes))?)
            },
            Ok(None) => error_response(404, "Image not found"),
            Err(e) => error_response(500, &format!("Storage error: {}", e)),
        }
    }
});
