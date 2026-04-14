import { useState, useEffect } from 'react'
import { Link } from '@tanstack/react-router'
import { fetchPost, type Post } from '../data/posts'
import { useSEO } from '../hooks/useSEO'

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useSEO({
    title: post?.title || 'Blog',
    description: post?.description || 'Yeti Blog',
    ogType: 'article',
    canonicalUrl: post ? `https://yetirocks.com/www/blog/${post.slug}` : undefined,
  })

  useEffect(() => {
    fetchPost(slug).then(p => { setPost(p); setLoading(false) })
  }, [slug])

  if (loading) {
    return (
      <div className="container">
        <div className="page-header">
          <Link to="/blog" className="blog-back-link">Blog</Link>
          <h1 className="page-title">Loading...</h1>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Post not found</h1>
          <p className="page-subtitle">
            <Link to="/blog">Back to blog</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <article className="blog-article">
        <div className="blog-article-header">
          <Link to="/blog" className="blog-back-link">Blog</Link>
          <div className="blog-article-meta">
            <span className="blog-card-category">{post.category}</span>
            <span>{post.date}</span>
            <span>{post.author}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="page-title">{post.title}</h1>
          <p className="page-subtitle">{post.description}</p>
        </div>
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>
    </div>
  )
}
