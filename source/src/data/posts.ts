// Blog post data — fetched from local BlogPost table (synced from GitHub by server resource).

export interface Post {
  id?: string
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  content?: string
  heroImage?: string
}

const API_BASE = `${STATIC_ROUTE}../api`

let postsCache: Post[] | null = null
let postsCacheTime = 0
const CACHE_TTL = 10_000 // 10 seconds (data is local, cheap to refetch)

export async function fetchPosts(): Promise<Post[]> {
  const now = Date.now()
  if (postsCache && (now - postsCacheTime) < CACHE_TTL) return postsCache
  try {
    const resp = await fetch(`${API_BASE}/blogpost?limit=100&sort=date&order=desc`)
    if (!resp.ok) return postsCache || []
    const records: Post[] = await resp.json()
    const posts = records.map(r => ({
      slug: r.id || (r as any).slug || '',
      title: r.title || '',
      description: r.description || '',
      date: r.date || '',
      author: r.author || 'Yeti Team',
      category: r.category || 'Engineering',
      readingTime: r.readingTime || '5 min read',
    }))
    posts.sort((a, b) => b.date.localeCompare(a.date))
    postsCache = posts
    postsCacheTime = now
    return posts
  } catch { return postsCache || [] }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const resp = await fetch(`${API_BASE}/blogpost/${slug}`)
    if (!resp.ok) return null
    const r: any = await resp.json()
    return {
      slug: r.id || slug,
      title: r.title || slug,
      description: r.description || '',
      date: r.date || '',
      author: r.author || 'Yeti Team',
      category: r.category || 'Engineering',
      readingTime: r.readingTime || '5 min read',
      content: r.content || '',
      heroImage: r.heroImage || undefined,
    }
  } catch { return null }
}
