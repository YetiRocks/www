import Icon from '../components/Icon'
import Code from '../components/Code'

export default function Platform() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Maximum Performance. Zero Learning Curve.</h1>
        <p className="page-subtitle">
          High-performance building blocks the look like NodeJS, but run like Rust.
        </p>
      </div>

      {/*<img
        src={`${import.meta.env.BASE_URL}architecture.svg`}
        alt="Yeti Platform Architecture"
        className="arch-image"
      />*/}

      <section className="section">
        <div className="section-label">Applications</div>
        <h2 className="section-title">Declare, Don't Code</h2>
        <p className="section-desc">
          Applications are directories with three files: a GraphQL schema, a YAML config, and optional Rust code. Drop them into the applications folder. Yeti loads them automatically, hot-reloads code changes, and compiles everything on save — no restart required.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="file-text" />
            <div className="feature-title">Declarative Configuration</div>
            <div className="feature-text">
              Applications declare their data model in GraphQL with custom directives for tables, indexes, relationships, and export paths. Yeti generates interfaces for CRUD operations, query filtering, pagination, and real-time subscriptions.
            </div>
            <Code label="schema.graphql">{`type Product @table @export {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Custom Resources</div>
            <div className="feature-text">
              For custom logic beyond CRUD, add a resource file. Yeti compiles it to a native dynamic library and hot-reloads on every save. Full access to the request context, storage backends, and extension APIs.
            </div>
            <Code label="greeting.rs">{`/// Import Yeti's JS-like abstractions (!)
use yeti_core::prelude::*;

/// Simple custom resource using concise syntax
resource!(Greeting {
  get => json!({"greeting": "Hello, World!"})
});`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="browser" />
            <div className="feature-title">Static Files</div>
            <div className="feature-text">
              Bundle a React, Vue, or any frontend framework alongside your API. Configure a static files directory and Yeti will build and serve it with proper caching headers and SPA fallback.
            </div>
            <Code label="config.yaml">{`static_files:
  path: web
  route: /
  index: index.html
  notFound:
    file: index.html
    statusCode: 200
  build:
    sourceDir: source
    command: npm run build`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Multi-App Composability</div>
            <div className="feature-text">
              Each application runs in its own namespace with isolated storage, routing, and permissions. A single Yeti instance can host dozens of applications, scaling each independently.
            </div>
            <Code label="config.yaml">{`environment: production
rootDirectory: /opt/yeti
http:
  port: 443
logging:
  level: info
applications:
  - https://github.com/yetirocks/www
  - https://github.com/yetirocks/documentation
  - https://github.com/yetirocks/demos
`}</Code>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Data</div>
        <h2 className="section-title">Two Storage Engines. One API. Unlimited Scale.</h2>
        <p className="section-desc">
          Yeti offers two types of persistence: An ACID-compliant database with NoSQL and FIQL query capabilities, and a streaming message queue capable of scaling to 200+ million writes per second for high-throughput event pipelines. Same schema, same API surface- choose the backend that matches your access pattern.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">ACID Database</div>
            <div className="feature-text">
              Globally-replicated, eventually-consistent, ACID-compliant-at-the-node. Built on top of RocksDB, Yeti scales horizontally across regions with configurable replication and conflict resolution.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Streaming Message Queue</div>
            <div className="feature-text">
              Append-only streaming for event sourcing, CDC, and high-throughput pipelines. Kafka-compatible protocol in pure Rust with zero-copy overhead. Ideal for audit logs, telemetry, and event-driven architectures.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Vectors</div>
        <h2 className="section-title">Fast, Dynamic, Composable Search</h2>
        <p className="section-desc">
          Not all searches are the same, and no single indexing strategy is right for every use case. Yeti supports multi-table joins based on relationships, full-text search, and powerful vector search with auto-embedding. Execute queries using any combination of search types and conditions for maximum precision and performance.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Declarative Relationships</div>
            <div className="feature-text">
              Declare relationships with <code>@relationship</code> directives- Yeti
              resolves joins automatically in REST and GraphQL.

              <Code label="schema.graphql">{`type Author @table @export {
    id: ID! @primaryKey
    name: String!
    bio: String
    books: [Book] @relationship(to: "authorId")
}

type Book @table @export {
    id: ID! @primaryKey
    title: String!
    authorId: ID! @indexed
    author: Author @relationship(from: "authorId")
}`}</Code>
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">REST + FIQL + GraphQL Queries</div>
            <div className="feature-text">
              Filter, sort, select, order. Key-value, full-text, vector. URL-safe, composable, and auto-generated from your schema.
            </div>
            <Code label="query.graphql">{`{
  Author(id: "author-1") {
    name
    books {
      title
    }
  }
}`}</Code>
            <Code label="query.fiql">{` GET /Author/author-1?select=name,books{title} `}</Code>
          </div>
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Vector Index Declaration</div>
            <div className="feature-text">
              Declare a field to be <code>Vector @indexed</code> to generate and search using default or custom models.
            </div>
            <Code label="schema.graphql">{`type Article @table @export {
  id: ID! @primaryKey
  title: String!
  author: String!
  category: String!
  tags: String
  text: String!
  embedding: Vector @indexed(source: "text")
}`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Simple Vector Searches</div>
            <div className="feature-text">
              Query with FIQL or JSON. Combine with other logical operators to improve precision and performance.

              <Code label="query.json">{`{
  "table": "Article",
  "conditions": [
    {
      "field": "embedding",
      "op": "vector",
      "value": "african swallow airspeed"
    }
  ]
}`}</Code>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Interfaces</div>
        <h2 className="section-title">Modern Interfaces Included</h2>
        <p className="section-desc">
          Every table change emits a PubSub event. Subscribe via Server-Sent Events or WebSocket
          to receive live updates with zero configuration. Build dashboards, chat systems, and
          collaborative tools with native real-time support.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Server-Sent Events</div>
            <div className="feature-text">
              Append <code>?stream=sse</code> to any table endpoint to receive a persistent event
              stream. Automatic reconnection, last-event-ID support, and per-table or global
              subscription scoping.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">WebSocket + PubSub</div>
            <div className="feature-text">
              Full WebSocket support for bidirectional communication. Internal PubSub bus
              coordinates events across tables, extensions, and connected clients with
              topic-based routing.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Extensions</div>
        <h2 className="section-title">Powerful Building Blocks for Production Applications</h2>
        <p className="section-desc">
          Extensions are shared services that applications opt into. Each extension provides
          tables, API endpoints, and lifecycle hooks that integrate seamlessly with your
          application. Declare them in config.yaml and configure per-app behavior inline. Yeti
          has several built-in extensions and supports custom extensions for specialized needs.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth</div>
            <div className="feature-text">
              Basic, JWT, and OAuth authentication with role-based access control. Argon2id
              password hashing, configurable token TTLs, email-pattern role mapping, CSRF
              protection, and per-attribute field-level permissions.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">yeti-telemetry</div>
            <div className="feature-text">
              Log, span, and metric collection with a built-in dashboard. OTLP export to
              Grafana, Datadog, or any OpenTelemetry collector. File rotation, real-time
              SSE streaming, and REST query API.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-vectors</div>
            <div className="feature-text">
              Automatic text and image embedding on every insert and update. Five models
              from BAAI and Sentence Transformers. Persistent embedding cache shared across
              applications. HNSW vector indexing with configurable distance metrics.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">yeti-applications</div>
            <div className="feature-text">
              Web-based application manager. Browse, create, edit, and delete applications
              through a React UI. File browser, schema parsing, Git integration, and SSH
              deploy key management.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
