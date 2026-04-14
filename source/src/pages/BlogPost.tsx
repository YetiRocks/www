import { Link } from '@tanstack/react-router'
import { getPost } from '../data/posts'
import { lazy, Suspense } from 'react'
import { useSEO } from '../hooks/useSEO'

// Dynamically import post content components from src/pages/blog/{slug}.tsx
const postModules = import.meta.glob('./blog/*.tsx') as Record<string, () => Promise<{ default: React.ComponentType }>>

interface BlogPostProps {
  slug: string
}

export default function BlogPost({ slug }: BlogPostProps) {
  const post = getPost(slug)

  useSEO({
    title: post?.title || 'Post not found',
    description: post?.description || 'Blog post not found.',
    ogType: 'article',
    canonicalUrl: post ? `https://yetirocks.com/www/blog/${post.slug}` : undefined,
  })

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

  const modulePath = `./blog/${slug}.tsx`
  const loader = postModules[modulePath]

  if (!loader) {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">{post.title}</h1>
          <p className="page-subtitle">Content not found for this post.</p>
        </div>
      </div>
    )
  }

  const PostContent = lazy(loader)

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
        <Suspense fallback={<div className="section-desc">Loading...</div>}>
          <PostContent />
        </Suspense>
      </article>
    </div>
  )
}
