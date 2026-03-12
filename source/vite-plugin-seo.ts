import { Plugin } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { resolve, dirname } from 'path'

const SITE_URL = 'https://yetirocks.com'
const OG_IMAGE = `${SITE_URL}/og-image.png`

interface RouteMeta {
  path: string
  title: string
  description: string
}

const routes: RouteMeta[] = [
  {
    path: '/',
    title: 'Yeti | Distributed Rust + Apps + Data',
    description: 'Schema-driven APIs, real-time streaming, and vector search powered by Rust. Ship production APIs in minutes.',
  },
  {
    path: '/platform',
    title: 'Platform | Yeti',
    description: 'Maximum performance, zero learning curve. Agent-friendly building blocks that look like NodeJS but run like Rust.',
  },
  {
    path: '/cloud',
    title: 'Cloud | Yeti',
    description: 'Multi-region cloud platform. Deploy globally, scale automatically, and manage environments from dev to production.',
  },
  {
    path: '/demos',
    title: 'Demos | Yeti',
    description: 'Interactive examples: REST APIs, GraphQL, real-time streaming, vector search, and authentication — all powered by Yeti.',
  },
  {
    path: '/benchmarks',
    title: 'Benchmarks | Yeti',
    description: 'Performance benchmarks: 77K req/s REST, sub-millisecond p50 latency, 3ms vector search across Yeti\'s API surface.',
  },
  {
    path: '/legal',
    title: 'Legal | Yeti',
    description: 'Policies and legal documents for Yeti software and Yeti Cloud, including terms of service, privacy policy, and software license.',
  },
]

const JSON_LD_HOME = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Yeti",
  "description": "Distributed Rust + Apps + Data platform. Schema-driven APIs, real-time streaming, and vector search powered by Rust.",
  "url": "https://yetirocks.com",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Linux, macOS, Windows",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "creator": { "@type": "Organization", "name": "Yeti", "url": "https://yetirocks.com" }
}
</script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Yeti",
  "url": "https://yetirocks.com"
}
</script>`

function generateMetaTags(route: RouteMeta): string {
  const url = route.path === '/' ? SITE_URL : `${SITE_URL}${route.path}`
  return `
    <!-- SEO Meta Tags -->
    <meta name="description" content="${route.description}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${url}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${route.title}" />
    <meta property="og:description" content="${route.description}" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:site_name" content="Yeti" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${route.title}" />
    <meta name="twitter:description" content="${route.description}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />`
}

function stripExistingMetaTags(html: string): string {
  let result = html
  // Remove existing description, robots, canonical, OG, Twitter tags and their comments
  result = result.replace(/\s*<meta name="description" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta name="robots" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta property="og:[^"]*" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<meta name="twitter:[^"]*" content="[^"]*"\s*\/?>\s*/g, '\n')
  result = result.replace(/\s*<!-- Open Graph[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- Twitter Card[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- Canonical[^>]*-->\s*/g, '\n')
  result = result.replace(/\s*<!-- SEO Meta Tags[^>]*-->\s*/g, '\n')
  // Collapse multiple blank lines
  result = result.replace(/\n{3,}/g, '\n\n')
  return result
}

function injectMetaTags(html: string, route: RouteMeta): string {
  let result = stripExistingMetaTags(html)

  // Replace title
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  )

  // Inject meta tags before </head>
  const metaTags = generateMetaTags(route)
  const jsonLd = route.path === '/' ? JSON_LD_HOME : ''
  result = result.replace('</head>', `${metaTags}${jsonLd}\n  </head>`)

  return result
}

export default function seoPlugin(): Plugin {
  return {
    name: 'vite-plugin-seo',
    closeBundle() {
      const outDir = resolve(__dirname, '../web')
      const indexPath = resolve(outDir, 'index.html')
      const html = readFileSync(indexPath, 'utf-8')

      // Generate per-route HTML files
      for (const route of routes) {
        const routeHtml = injectMetaTags(html, route)

        if (route.path === '/') {
          // Overwrite root index.html with home-specific meta
          writeFileSync(indexPath, routeHtml)
        } else {
          // Create subdirectory with index.html (e.g., web/platform/index.html)
          const routeDir = resolve(outDir, route.path.slice(1))
          mkdirSync(routeDir, { recursive: true })
          writeFileSync(resolve(routeDir, 'index.html'), routeHtml)
        }
      }

      console.log(`[seo] Generated HTML for ${routes.length} routes`)
    },
  }
}
