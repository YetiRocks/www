<p align="center">
  <img src="https://cdn.prod.website-files.com/68e09cef90d613c94c3671c0/697e805a9246c7e090054706_logo_horizontal_grey.png" alt="Yeti" width="200" />
</p>

---

# www

[![Yeti](https://img.shields.io/badge/Yeti-Application-blue)](https://yetirocks.com)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)](https://typescriptlang.org)

The yetirocks.com marketing site. A React single-page application served by Yeti, showcasing platform features, architecture, application development, and benchmark data.

## Features

- **Homepage** - Hero section with platform overview, performance stats, resiliency, simplicity, and cost sections
- **Platform Page** - System architecture diagram, applications, data, streaming, and extension details
- **Applications Page** - Schema-to-API examples, auth configuration, vector search with code blocks
- **Benchmarks Page** - Comprehensive performance data from load-test suite with tables and charts
- **Beta Signup** - "Get Started" button opens email collection modal (localStorage)
- **Responsive Design** - Mobile-first with hamburger menu, stacked layouts, and touch-friendly targets
- **Yeti Studio Theme** - Dark theme matching all Yeti applications (#121212 background, Ubuntu font)

## Installation

```bash
# Clone into your Yeti applications folder
cd ~/yeti/applications
git clone https://github.com/yetirocks/www.git

# Build the React UI (requires Node.js)
cd www
cargo run --bin build-ui

# Restart Yeti to load the application
# The site will be available at /www/
```

## Usage

### Web UI

Open your browser to:
```
https://localhost:9996/www/
```

Navigate between pages using the top navigation bar:
- **Home** - Platform overview and value propositions
- **Platform** - Architecture diagram and feature deep-dives
- **Applications** - Code examples for schema, auth, and vector search
- **Benchmarks** - Performance numbers and methodology

### Beta Signup

Click "Get Started" in the navigation to open the beta signup modal. Submissions are stored in the browser's localStorage under the key `yeti-beta-list`.

## Pages

### Home

Hero section with headline, subtitle, and call-to-action buttons. Four stat cards (77K req/s, <1ms p50, 3ms vector search, 50MB memory). Four content sections:

- **Performance** - 77K reads/s, 35K writes/s, sub-millisecond p50
- **Resiliency** - Compiled Rust, no GC, zero runtime exceptions
- **Simplicity** - One schema generates REST + GraphQL + SSE + WebSocket
- **Cost** - Single-process from $5 VPS to 100M writes/sec globally

### Platform

Architecture diagram (SVG from yetirocks.com). Four feature sections:

- **Applications** - Schema-driven development, hot-reloaded Rust plugins, static file serving
- **Data** - RocksDB storage, FIQL queries, relationships, HNSW vector search, GraphQL
- **Streaming** - SSE, WebSocket, PubSub real-time event system
- **Extensions** - yeti-auth, yeti-telemetry, yeti-vectors, yeti-applications

### Applications

Code examples demonstrating:

1. **Schema to API** - GraphQL schema that generates full CRUD REST + GraphQL + SSE
2. **Authentication** - yeti-auth config.yaml with OAuth providers and role mapping
3. **Vector Search** - Schema with `@indexed(type: "HNSW")` and text search curl examples

### Benchmarks

Complete performance data from load-test RESULTS.md:

| Test | Throughput | p50 | p99 |
|------|-----------|-----|-----|
| Raw Reads | 77,045 req/s | <1ms | <5ms |
| Raw Writes | 35,062 req/s | <1ms | <5ms |
| REST CRUD | 1,607 req/s | 1-12ms | 16-42ms |
| GraphQL | 390 req/s | 3-30ms | 21-64ms |
| Relationships | 6,782 req/s | 1-5ms | 8-21ms |
| Blob Storage | 1,826 req/s | 4-5ms | 12-27ms |

Plus resource consumption, write amplification, scalability narrative, and test methodology.

## Project Structure

```
www/
├── Cargo.toml           # Rust package manifest
├── build.rs             # UI build script (run with cargo run --bin build-ui)
├── config.yaml          # Application configuration (static-only)
├── README.md            # This file
└── source/              # React/Vite source code
    ├── package.json     # npm dependencies (react, react-router-dom)
    ├── vite.config.ts   # Vite configuration
    ├── tsconfig.json    # TypeScript configuration
    ├── index.html       # HTML entry point
    ├── public/          # Static assets
    │   ├── favicon.png
    │   ├── logo_white.svg
    │   └── architecture.svg
    └── src/
        ├── main.tsx           # React DOM entry
        ├── App.tsx            # Router and layout
        ├── index.css          # Yeti Studio theme + marketing styles
        ├── components/
        │   ├── Nav.tsx        # Navigation bar
        │   ├── Footer.tsx     # Site footer
        │   └── BetaModal.tsx  # Email collection modal
        └── pages/
            ├── Home.tsx         # Homepage
            ├── Platform.tsx     # Platform architecture
            ├── Applications.tsx # Code examples
            └── Benchmarks.tsx   # Performance data
```

## Development

### UI Development

```bash
cd source

# Install dependencies
npm install

# Start development server with HMR
npm run dev
# Accessible at http://localhost:5180

# Build for production
npm run build
```

The development server proxies API requests to `https://localhost:9996`.

### Building the UI

From the application root:

```bash
# Using Cargo (recommended)
cargo run --bin build-ui

# Or manually with npm
cd source && npm install && npm run build
```

## Configuration

This is a static-only application with no tables, resources, or extensions:

```yaml
name: "Yeti"
app_id: "www"
version: "1.0.0"
description: "yetirocks.com marketing site"
enabled: true
static_files:
  path: web
  route: /
  index: index.html
```

## Learn More

- [Yeti Documentation](https://yetirocks.com/docs)
- [GitHub](https://github.com/yetirocks)
- [Application Template](https://github.com/yetirocks/application-template)

---

Built with [Yeti](https://yetirocks.com) - The Application Platform Built for Speed.
