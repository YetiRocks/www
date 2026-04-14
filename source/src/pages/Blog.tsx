import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { fetchPosts, type Post } from '../data/posts'
import { useSEO } from '../hooks/useSEO'

const facts = [
  'Samoyeds were bred by the Samoyede people of Siberia to herd reindeer, pull sleds, and keep their owners warm by sleeping on top of them.',
  'A Samoyed\'s mouth curves upward at the corners, giving them a permanent smile — called the "Sammy smile." It prevents drooling that would form icicles in freezing temperatures.',
  'Samoyed fur can be spun into yarn and knitted into clothing. It\'s sometimes called "Samoyed wool" and is as warm as sheep\'s wool.',
  'Samoyeds were part of Roald Amundsen\'s expedition to the South Pole in 1911. A Samoyed named Etah was the lead dog on the first team to reach the South Pole.',
  'Samoyeds are one of the 14 ancient dog breeds, meaning their DNA is closest to wolves among all domestic dogs. They\'ve been companions to humans for over 3,000 years.',
  'A group of Samoyeds is sometimes called a "cloud" because when they lie down together, they look like a fluffy white cloud on the ground.',
  'Samoyeds are known as "velcro dogs" because they form extremely strong bonds with their families and want to be involved in everything.',
  'A Samoyed\'s tail curls over their back and can be used as a face warmer. They\'ll curl up and tuck their nose under their tail to stay warm while sleeping in snow.',
]

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [fact, setFact] = useState('')

  useSEO({
    title: 'Blog',
    description: 'Engineering deep-dives, product updates, and the story behind the Yeti platform.',
    ogType: 'website',
    canonicalUrl: 'https://yetirocks.com/www/blog',
  })

  useEffect(() => {
    setFact(facts[Math.floor(Math.random() * facts.length)])
    fetchPosts().then(p => { setPosts(p); setLoading(false) })
  }, [])

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Blog</h1>
          <p className="page-subtitle">Loading posts...</p>
        </div>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="container" style={{ textAlign: 'center' }}>
        <div className="page-header" style={{ paddingBottom: 0 }}>
          <img
            src={`${STATIC_ROUTE}favicon.png`}
            alt="Yeti"
            style={{ width: 120, height: 120, margin: '0 auto var(--space-6)', display: 'block', opacity: 0.8 }}
          />
          <h1 className="page-title">No posts yet!</h1>
          <p className="page-subtitle" style={{ maxWidth: 500 }}>
            We're working on something great. In the meantime, here's a fun fact about Samoyeds:
          </p>
        </div>
        <div className="section" style={{ borderTop: 'none', maxWidth: 600, margin: '0 auto' }}>
          <p className="section-desc" style={{ fontSize: 'var(--font-size-lg)', lineHeight: 1.8, maxWidth: 'none' }}>
            "{fact}"
          </p>
          <div style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-4)', justifyContent: 'center' }}>
            <button className="btn" onClick={() => setFact(facts[Math.floor(Math.random() * facts.length)])}>Another fact</button>
            <Link to="/" className="btn btn-primary">Go home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">
          Engineering deep-dives, product updates, and the story behind the platform.
        </p>
      </div>

      <section className="section">
        <div className="blog-list">
          {posts.map(post => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="blog-card"
            >
              <div className="blog-card-meta">
                <span className="blog-card-category">{post.category}</span>
                <span className="blog-card-date">{post.date}</span>
              </div>
              <h2 className="blog-card-title">{post.title}</h2>
              <p className="blog-card-desc">{post.description}</p>
              <span className="blog-card-reading">{post.readingTime}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
