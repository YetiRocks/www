// Blog post data — fetched from GitHub at runtime, no rebuild needed.
// Posts are markdown files with YAML frontmatter in YetiRocks/blog repo.

const REPO = 'YetiRocks/blog'
const BRANCH = 'main'
const POSTS_DIR = 'posts'
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/${POSTS_DIR}`
const API_BASE = `https://api.github.com/repos/${REPO}/contents/${POSTS_DIR}?ref=${BRANCH}`

export interface Post {
  slug: string
  title: string
  description: string
  date: string
  author: string
  category: string
  readingTime: string
  content?: string
}

function parseFrontmatter(markdown: string): { meta: Record<string, string>; content: string } {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return { meta: {}, content: markdown }
  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon > 0) {
      const key = line.slice(0, colon).trim()
      const value = line.slice(colon + 1).trim().replace(/^["']|["']$/g, '')
      meta[key] = value
    }
  }
  return { meta, content: match[2].trim() }
}

let postsCache: Post[] | null = null
let postsCacheTime = 0
const CACHE_TTL = 60_000

export async function fetchPosts(): Promise<Post[]> {
  const now = Date.now()
  if (postsCache && (now - postsCacheTime) < CACHE_TTL) return postsCache
  try {
    const resp = await fetch(API_BASE)
    if (!resp.ok) return postsCache || []
    const files: Array<{ name: string; download_url: string }> = await resp.json()
    const mdFiles = files.filter(f => f.name.endsWith('.md'))
    const posts: Post[] = []
    await Promise.all(mdFiles.map(async (file) => {
      try {
        const raw = await fetch(file.download_url).then(r => r.text())
        const { meta } = parseFrontmatter(raw)
        if (meta.title) {
          posts.push({
            slug: file.name.replace(/\.md$/, ''),
            title: meta.title,
            description: meta.description || '',
            date: meta.date || '',
            author: meta.author || 'Yeti Team',
            category: meta.category || 'Engineering',
            readingTime: meta.readingTime || '5 min read',
          })
        }
      } catch {}
    }))
    posts.sort((a, b) => b.date.localeCompare(a.date))
    postsCache = posts
    postsCacheTime = now
    return posts
  } catch { return postsCache || [] }
}

export async function fetchPost(slug: string): Promise<Post | null> {
  try {
    const url = `${RAW_BASE}/${slug}.md`
    const resp = await fetch(url)
    if (!resp.ok) return null
    const raw = await resp.text()
    const { meta, content } = parseFrontmatter(raw)
    const { marked } = await import('marked')
    const html = await marked(content)
    return {
      slug,
      title: meta.title || slug,
      description: meta.description || '',
      date: meta.date || '',
      author: meta.author || 'Yeti Team',
      category: meta.category || 'Engineering',
      readingTime: meta.readingTime || '5 min read',
      content: html,
    }
  } catch { return null }
}
