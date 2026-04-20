// BlogPost Table Extender
//
// Overrides GET to filter by publish date.
// Posts with a future date are staged content — invisible to readers.
// All other methods (POST, PUT, DELETE) delegate to the table.
//
// GET /api/BlogPost        → list published posts (date <= today), newest first, no content
// GET /api/BlogPost/{slug} → single post if published, 404 if not

use yeti_sdk::prelude::*;

extends_table!(BlogPost {
    get(ctx) => {
        let cutoff = cutoff_date(&ctx);
        if let Some(slug) = ctx.path_id.as_deref() {
            return get_post(&ctx, slug, &cutoff).await;
        }
        list_posts(&ctx, &cutoff).await
    }
});

/// Determine the cutoff date for publish filtering.
/// If ?date=<unix_timestamp> is present, use that. Otherwise use today.
fn cutoff_date(ctx: &Context) -> String {
    if let Some(ts_str) = ctx.query_params.get("date") {
        if let Ok(secs) = ts_str.parse::<u64>() {
            let days = (secs / 86400) as i32;
            let (y, m, d) = civil_from_days(days);
            return format!("{:04}-{:02}-{:02}", y, m, d);
        }
    }
    let secs = unix_timestamp().unwrap_or(0);
    let days = (secs / 86400) as i32;
    let (y, m, d) = civil_from_days(days);
    format!("{:04}-{:02}-{:02}", y, m, d)
}

/// Convert days since epoch to (year, month, day).
/// Algorithm from Howard Hinnant (public domain).
fn civil_from_days(days: i32) -> (i32, u32, u32) {
    let z = days + 719468;
    let era = if z >= 0 { z } else { z - 146096 } / 146097;
    let doe = (z - era * 146097) as u32;
    let yoe = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y = yoe as i32 + era * 400;
    let doy = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp = (5 * doy + 2) / 153;
    let d = doy - (153 * mp + 2) / 5 + 1;
    let m = if mp < 10 { mp + 3 } else { mp - 9 };
    let y = if m <= 2 { y + 1 } else { y };
    (y, m, d)
}

fn is_published(record: &Value, today: &str) -> bool {
    record
        .get("date")
        .and_then(|v| v.as_str())
        .is_some_and(|d| d <= today)
}

async fn list_posts(ctx: &Context, cutoff: &str) -> Result<Response<ResponseBody>> {
    let table = ctx.table("BlogPost")?;
    let all = table.get_all().await?;

    let mut posts: Vec<Value> = all
        .into_iter()
        .filter(|r| is_published(r, cutoff))
        .map(|mut r| {
            if let Some(obj) = r.as_object_mut() {
                obj.remove("content");
            }
            r
        })
        .collect();

    posts.sort_by(|a, b| {
        let da = a.get("date").and_then(|v| v.as_str()).unwrap_or("");
        let db = b.get("date").and_then(|v| v.as_str()).unwrap_or("");
        db.cmp(da)
    });

    ok(json!(posts))
}

async fn get_post(ctx: &Context, slug: &str, cutoff: &str) -> Result<Response<ResponseBody>> {
    let table = ctx.table("BlogPost")?;
    match table.get(slug).await? {
        Some(record) if is_published(&record, cutoff) => ok(record),
        _ => not_found(&format!("Post '{}' not found", slug)),
    }
}
