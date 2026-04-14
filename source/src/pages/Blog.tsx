import { Link } from '@tanstack/react-router'
import { posts } from '../data/posts'
import { useSEO } from '../hooks/useSEO'

export default function Blog() {
  useSEO({
    title: 'Blog',
    description: 'Engineering deep-dives, product updates, and the story behind the Yeti platform.',
    ogType: 'website',
    canonicalUrl: 'https://yetirocks.com/www/blog',
  })

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Blog</h1>
        <p className="page-subtitle">
          Engineering deep-dives, product updates, and the story behind the platform.
        </p>
      </div>

      {posts.length === 0 ? (
        <section className="section">
          <p className="section-desc">Posts coming soon.</p>
        </section>
      ) : (
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
      )}
    </div>
  )
}
