// Blog post registry — add new posts here.
// Content lives in src/pages/blog/*.tsx as React components.

export interface Post {
  slug: string
  title: string
  description: string
  date: string        // YYYY-MM-DD
  author: string
  category: 'Engineering' | 'Company' | 'Product'
  readingTime: string // e.g. "5 min read"
}

export const posts: Post[] = [
  {
    slug: 'why-we-built-yeti',
    title: 'Why We Built Yeti',
    description: 'One binary, zero network hops, 100K req/s. The story behind a Rust application platform that embeds everything.',
    date: '2026-04-16',
    author: 'Yeti Team',
    category: 'Company',
    readingTime: '4 min read',
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find(p => p.slug === slug)
}
