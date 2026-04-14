import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  ogImage?: string
  canonicalUrl?: string
}

/**
 * Set page title, meta description, and Open Graph tags.
 * Cleans up on unmount (restores defaults).
 */
export function useSEO({ title, description, ogTitle, ogDescription, ogType, ogImage, canonicalUrl }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = `${title} | Yeti`

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name'
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.content = content
    }

    setMeta('description', description)
    setMeta('og:title', ogTitle || title, true)
    setMeta('og:description', ogDescription || description, true)
    setMeta('og:type', ogType || 'article', true)
    if (ogImage) setMeta('og:image', ogImage, true)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (canonicalUrl) {
      if (!canonical) {
        canonical = document.createElement('link')
        canonical.rel = 'canonical'
        document.head.appendChild(canonical)
      }
      canonical.href = canonicalUrl
    }

    return () => {
      document.title = prevTitle
    }
  }, [title, description, ogTitle, ogDescription, ogType, ogImage, canonicalUrl])
}
