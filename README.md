<p align="center">
  <img src="https://cdn.prod.website-files.com/68e09cef90d613c94c3671c0/697e805a9246c7e090054706_logo_horizontal_grey.png" alt="Yeti" width="200" />
</p>

---

# yeti-www

[![Yeti](https://img.shields.io/badge/Yeti-Application-blue)](https://yetirocks.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646cff)](https://vitejs.dev)

> **[Yeti](https://yetirocks.com)** - The Performance Platform for Agent-Driven Development.
> Schema-driven APIs, real-time streaming, and vector search. From prompt to production.

**The marketing website for yetirocks.com.** A React single-page application served by Yeti, showcasing platform features, architecture, application development, hosting, use cases, demos, and benchmark data. Ships with a server-side beta signup table for collecting early access requests.

---

## Why yeti-www

Most marketing sites are deployed on a separate CMS or static host, disconnected from the product they describe. yeti-www runs on the same Yeti instance it markets — the site itself is a working demonstration of the platform. A GraphQL schema defines the beta signup table, Yeti serves the SPA with client-side routing, and the Vite build pipeline produces optimized bundles with automatic SEO metadata generation. One `config.yaml`, one schema file, zero external services.

- **Dogfooding the platform** — the site runs as a yeti application with schema-driven data collection, proving the workflow it describes to visitors.
- **Single-process deployment** — no separate web server, no CDN configuration, no CMS. Yeti serves the built React app and handles form submissions.
- **Public beta signup** — the `BetaSignup` table uses `@export(public: [create])` so visitors can submit their information without authentication.
- **SPA routing** — `spa: true` in config returns `index.html` for all unmatched routes, enabling React Router client-side navigation.
- **SEO-optimized** — custom Vite plugin generates per-route meta tags, Open Graph images, and a sitemap for search engine indexing.
- **Responsive design** — mobile-first layouts with hamburger menu, stacked grids, and touch-friendly targets across all pages.

---

## Quick Start

### 1. Clone

```bash
cd ~/yeti/applications
git clone https://github.com/yetirocks/yeti-www.git
```

### 2. Build the UI

```bash
cd ~/yeti/applications/yeti-www/source
npm install
npm run build
```

This compiles TypeScript, bundles the React app with Vite, and outputs production files to `../web/`.

### 3. Start Yeti

```bash
cd ~/yeti
/Users/jrepp/Developer/yeti/target/debug/yeti
```

The site loads automatically. No plugin compilation needed — yeti-www is a static-only application with a single schema table.

### 4. Open in browser

```
https://localhost:9996/
```

The site is served at the root path (`route_prefix: "/"`). Navigate between pages using the top navigation bar.

---

## Architecture

```
Browser (yetirocks.com)
    |
    +-- GET / -----------------> Yeti (static file handler)
    |                                |
    |                                +-- SPA mode: returns index.html
    |                                |   for all unmatched routes
    |                                |
    |                                +-- /assets/* served from web/
    |                                |
    +-- POST /yeti-www/BetaSignup -> Yeti (schema-driven REST)
    |                                |
    |                                +-- Public create (no auth)
    |                                +-- Stored in RocksDB ("www" db)
    |
    +-- React Router (client-side)
         |
         +-- /              Home
         +-- /platform      Platform architecture
         +-- /applications  Code examples
         +-- /cloud         Hosting & pricing
         +-- /use-cases     Use case gallery
         +-- /demos         Live demos
         +-- /benchmarks    Performance data
         +-- /legal/*       Terms, privacy, cookies, etc.
```

**Static serving:** Yeti serves pre-built files from the `web/` directory. The `spa: true` config option returns `index.html` for any route that does not match a static file, enabling React Router to handle client-side navigation.

**Data collection:** The `BetaSignup` table is the only server-side data model. It accepts public POST requests with name, email, company, title, and idea fields. Records are stored in the embedded RocksDB database under the "www" namespace.

**Build pipeline:** Vite compiles TypeScript, bundles React components, code-splits vendor libraries (React, highlight.js), and runs a custom SEO plugin that generates per-route HTML with Open Graph metadata and a sitemap.

---

## Features

### Homepage (/)

Hero section with the Yeti logo, headline ("Faster Applications, Faster."), subtitle, and call-to-action buttons for early access and demos. Four content sections below:

| Section | Headline | Key Points |
|---------|----------|------------|
| **Building Blocks** | From schema to production API in minutes | Same runtime every stage; schema + config = application |
| **Faster** | Rust speed without writing Rust | AI agent MCP integration; single-instance fleet throughput |
| **Easier** | Auth, streaming, search - one config line each | Everything ships in the binary; five lines to a production endpoint |
| **Cheaper** | One binary runs what used to take a cluster | Fewer servers, fewer pages; pay-as-you-go pricing |

### Platform (/platform)

Architecture diagram (SVG) showing the full Yeti stack. Four deep-dive feature sections:

- **Applications** — schema-driven development, hot-reloaded Rust plugins, static file serving
- **Data** — RocksDB storage, FIQL queries, relationships, HNSW vector search, GraphQL
- **Streaming** — SSE, WebSocket, PubSub real-time event system
- **Extensions** — yeti-auth, yeti-telemetry, yeti-vectors, yeti-applications

### Applications (/applications)

Interactive code examples with syntax highlighting demonstrating:

1. **Schema to API** — a GraphQL schema that generates full CRUD REST + GraphQL + SSE endpoints
2. **Authentication** — yeti-auth config.yaml with OAuth providers and role mapping
3. **Vector Search** — schema with `@indexed(type: "HNSW")` and text search curl examples

### Cloud (/cloud)

Yeti Cloud hosting and pricing information. Infrastructure details, deployment options, and scaling narrative.

### Use Cases (/use-cases)

Gallery of use case scenarios showing how Yeti applies to different problem domains.

### Demos (/demos)

Links to live demo applications running on the Yeti platform.

### Benchmarks (/benchmarks)

Comprehensive performance data from the load-test suite with charts and tables:

| Test | Throughput | p50 | p99 |
|------|-----------|-----|-----|
| Raw Reads | 77,045 req/s | <1ms | <5ms |
| Raw Writes | 35,062 req/s | <1ms | <5ms |
| REST CRUD | 1,607 req/s | 1-12ms | 16-42ms |
| GraphQL | 390 req/s | 3-30ms | 21-64ms |
| Relationships | 6,782 req/s | 1-5ms | 8-21ms |
| Blob Storage | 1,826 req/s | 4-5ms | 12-27ms |

Includes resource consumption, write amplification, scalability narrative, and test methodology. The `BenchmarkChart` component renders performance data using uPlot.

### Legal (/legal/*)

Full legal documentation suite:

| Route | Page |
|-------|------|
| `/legal` | Legal index |
| `/legal/terms-of-service` | Terms of Service |
| `/legal/privacy-policy` | Privacy Policy |
| `/legal/software-license` | Software License |
| `/legal/cookie-policy` | Cookie Policy |
| `/legal/acceptable-use` | Acceptable Use Policy |
| `/legal/support-policy` | Support Policy |

### Beta Signup Modal

Click "Request Early Access" in the navigation or hero section to open the beta signup modal. The form collects name, email, company, title, and idea. Submissions are POSTed to the `BetaSignup` table endpoint (`POST /yeti-www/BetaSignup`) which is publicly accessible via `@export(public: [create])`.

---

## Data Model

### BetaSignup Table

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | ID! | Yes | Auto-generated unique identifier |
| `name` | String! | Yes | Contact name |
| `email` | String! | Yes | Contact email address |
| `company` | String | No | Company or organization |
| `title` | String | No | Job title |
| `idea` | String | No | What they want to build with Yeti |
| `created_at` | String! | Auto | Timestamp set automatically via `@createdTime` |

**Schema directives:**
- `@table(database: "www")` — stores records in the "www" RocksDB database
- `@export(public: [create])` — generates REST endpoints with public create access (no authentication required for POST)
- `@primaryKey` on `id` — auto-generated unique key
- `@createdTime` on `created_at` — server-side timestamp on record creation

**REST endpoints (auto-generated):**

| Endpoint | Methods | Auth Required |
|----------|---------|---------------|
| `/yeti-www/BetaSignup` | GET, POST | GET: yes, POST: no (public) |
| `/yeti-www/BetaSignup/{id}` | GET, PUT, DELETE | Yes |

---

## Configuration

### config.yaml

```yaml
name: "Website"
app_id: "yeti-www"
customer_id: "yeti"
version: "1.0.0"
description: "yetirocks.com marketing site + demos"
route_prefix: "/"

schemas:
  path: schemas/schema.graphql

static:
  path: web
  route: /
  spa: true
  build:
    source: source
    command: npm run build
```

**Key settings:**

| Field | Value | Purpose |
|-------|-------|---------|
| `app_id` | `yeti-www` | Application identifier used in table endpoints |
| `route_prefix` | `/` | Serves at the root path (not `/yeti-www/`) |
| `static_files.path` | `web` | Directory containing built React app |
| `static_files.spa` | `true` | Returns `index.html` for unmatched routes (SPA mode) |
| `static_files.build.sourceDir` | `source` | Vite project directory |
| `static_files.build.command` | `npm run build` | Build command executed by Yeti |

### schema.graphql

```graphql
type BetaSignup @table(database: "www") @export(public: [create]) {
    id: ID! @primaryKey
    name: String!
    email: String!
    company: String
    title: String
    idea: String
    created_at: String! @createdTime
}
```

No resources, no extensions, no plugins. This is a static-first application with a single server-side table.

---

## Project Structure

```
yeti-www/
├── config.yaml                  # Yeti application configuration
├── README.md                    # This file
├── schemas/
│   └── schema.graphql           # BetaSignup table definition
├── source/                      # React/Vite source code
│   ├── package.json             # npm dependencies
│   ├── package-lock.json        # Lockfile
│   ├── vite.config.ts           # Vite config (auto-reads base path from config.yaml)
│   ├── vite-plugin-seo.ts       # Custom SEO plugin (meta tags, sitemap, OG images)
│   ├── tsconfig.json            # TypeScript configuration
│   ├── tsconfig.node.json       # TypeScript config for Vite/Node
│   ├── index.html               # HTML entry point
│   ├── public/                  # Static assets (copied as-is to build)
│   │   ├── favicon.png          # Site favicon
│   │   ├── logo_white.svg       # Yeti logo (white, for dark backgrounds)
│   │   ├── architecture.svg     # Platform architecture diagram
│   │   ├── og-image.png         # Open Graph social preview image
│   │   ├── install.sh           # Unix install script
│   │   ├── install.ps1          # Windows install script
│   │   ├── robots.txt           # Search engine crawler rules
│   │   ├── sitemap.xml          # XML sitemap for search engines
│   │   └── screenshots/         # Page screenshots for social previews
│   └── src/
│       ├── main.tsx             # React DOM entry point
│       ├── App.tsx              # Router and layout (BrowserRouter + Routes)
│       ├── articles.ts          # Article/content data
│       ├── utils.ts             # Shared utility functions
│       ├── index.css            # Yeti Studio theme + marketing styles
│       ├── yeti.css             # Yeti-specific component styles
│       ├── auth.css             # Auth page styles
│       ├── legal.css            # Legal page styles
│       ├── vite-env.d.ts        # Vite type declarations
│       ├── components/
│       │   ├── Nav.tsx          # Top navigation bar + hamburger menu
│       │   ├── Footer.tsx       # Site footer with links
│       │   ├── BetaModal.tsx    # Early access signup modal
│       │   ├── BenchmarkChart.tsx  # uPlot chart for benchmark data
│       │   ├── Code.tsx         # Syntax-highlighted code blocks
│       │   └── Icon.tsx         # SVG icon component
│       └── pages/
│           ├── Home.tsx         # Homepage (hero, building blocks, value props)
│           ├── Platform.tsx     # Platform architecture deep-dive
│           ├── Applications.tsx # Code examples (schema, auth, vectors)
│           ├── Hosting.tsx      # Yeti Cloud hosting (/cloud route)
│           ├── UseCases.tsx     # Use case gallery
│           ├── Demos.tsx        # Live demos
│           ├── Benchmarks.tsx   # Performance data with charts
│           ├── Legal.tsx        # Legal index page
│           └── legal/
│               ├── TermsOfService.tsx
│               ├── PrivacyPolicy.tsx
│               ├── SoftwareLicense.tsx
│               ├── CookiePolicy.tsx
│               ├── AcceptableUse.tsx
│               └── SupportPolicy.tsx
└── web/                         # Built output (gitignored)
    └── ...                      # Production-ready static files
```

---

## Development

### UI Development (Hot Reload)

```bash
cd ~/yeti/applications/yeti-www/source

# Install dependencies
npm install

# Start Vite dev server with HMR
npm run dev
# Accessible at http://localhost:5180
```

The development server reads `route_prefix` from `../config.yaml` to set the correct base path automatically. Override with `YETI_BASE_PATH` environment variable if needed.

### Production Build

```bash
cd ~/yeti/applications/yeti-www/source

# TypeScript check + Vite production build
npm run build
```

Output goes to `../web/` (configured in `vite.config.ts` via `build.outDir`). Vite code-splits into three chunks:

| Chunk | Contents |
|-------|----------|
| `react-vendor` | react, react-dom, react-router-dom |
| `highlight` | highlight.js, prism-react-renderer |
| `index` | Application code |

### Adding a New Page

1. Create `source/src/pages/NewPage.tsx`
2. Add route in `source/src/App.tsx`:
   ```tsx
   <Route path="/new-page" element={<NewPage />} />
   ```
3. Add navigation link in `source/src/components/Nav.tsx`
4. Rebuild: `cd source && npm run build`
5. Restart Yeti to pick up new static files

### SEO Plugin

The custom Vite plugin at `source/vite-plugin-seo.ts` runs during the build and generates:

- Per-route `<meta>` tags (title, description, Open Graph)
- `sitemap.xml` for search engine indexing
- Open Graph image references for social media previews

### Styling

The site uses the Yeti Studio dark theme:

| Property | Value |
|----------|-------|
| Background | `#121212` |
| Font | Ubuntu |
| Layout | CSS Grid + Flexbox |
| Responsive | Mobile-first breakpoints |

Styles are split across four CSS files: `index.css` (base theme + marketing), `yeti.css` (component styles), `auth.css` (auth page styles), and `legal.css` (legal page styles).

---

## Deployment

yeti-www is deployed as part of any Yeti instance. In production:

1. Build the UI: `cd source && npm run build`
2. Ensure `web/` directory contains the built output
3. Start Yeti — the application loads automatically from `config.yaml`

The `route_prefix: "/"` means this application claims the root path. Only one application per Yeti instance can use `/` as its prefix.

For yetirocks.com, Yeti serves the site directly over TLS with certificates managed via `mkcert` or a production certificate authority. No reverse proxy required.

---

## Learn More

- [Yeti Documentation](https://yetirocks.com/docs)
- [GitHub](https://github.com/yetirocks)
- [Application Template](https://github.com/yetirocks/application-template)

---

Built with [Yeti](https://yetirocks.com) | The Performance Platform for Agent-Driven Development
