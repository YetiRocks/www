import Icon from '../components/Icon'
import Code from '../components/Code'

export default function Platform() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Stack In A Box.</h1>
        <p className="page-subtitle">
          REST, GraphQL, WebSocket, SSE, MQTT, MCP, gRPC - every interface your clients and devices speak. Plus embedded storage, auth, vector search, observability, and a static file server with build pipelines and SPA support. One runtime. Here's what's inside.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Agents</div>
        <h2 className="section-title">Your AI agent's favorite backend</h2>
        <p className="section-desc">
          Every table gets REST, GraphQL, SSE, and WebSocket endpoints with consistent naming and filtering. Connect an MCP-compatible agent and it introspects your schema, queries live data, and builds applications through a standardized protocol. Agents understand your app the way a senior developer would.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Built-in MCP Server</div>
            <div className="feature-text">
              Every Yeti instance ships with a Model Context Protocol server. Connect Claude, Cursor, Copilot, or any MCP-compatible agent and it gets full platform context - your schemas, APIs, constraints, and installed applications. Agents query a semantic knowledge base to build and maintain apps with complete context.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Guided Skills System</div>
            <div className="feature-text">
              Pre-built workflows guide agents through common tasks: creating applications, adding authentication, setting up vector search, migrating from other platforms. Agents follow proven patterns with full context at every step.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Applications</div>
        <h2 className="section-title">Declare what you need. Skip the boilerplate.</h2>
        <p className="section-desc">
          An application is a directory with three files: a GraphQL schema, a YAML config, and optional Rust code. Drop it into the applications folder and Yeti picks it up. Code changes hot-reload on save. No restart needed.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="file-text" />
            <div className="feature-title">Schema-Driven APIs</div>
            <div className="feature-text">
              Define your data model in GraphQL with custom directives for tables, indexes, relationships, and exports. Yeti generates CRUD operations, query filtering, pagination, and real-time subscriptions from that schema.
            </div>
            <Code label="schema.graphql">{`type Product @table(database: "store")
  @export(rest: true, mqtt: true, public: [read])
  @distribute(residency: "full", replicationFactor: 3)
  @audit(retention: 365) {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`}</Code>
            <div className="feature-text" style={{ marginTop: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--color-grey)' }}>
              Four directives, four concerns. <code>@table</code> for storage, <code>@export</code> for interfaces, <code>@distribute</code> for topology, <code>@audit</code> for compliance — each declared independently.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">Custom Resources</div>
            <div className="feature-text">
              When you need logic beyond CRUD, add a resource file. Yeti compiles it to a native dynamic library and hot-reloads on every save. Full access to the request context, storage backends, and extension APIs.
            </div>
            <Code label="greeting.rs">{`/// Import Yeti's JS-like abstractions (!)
use yeti_sdk::prelude::*;

/// Simple custom resource using concise syntax
resource!(Greeting {
  get => json!({"greeting": "Hello, World!"})
});`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Resource Hooks</div>
            <div className="feature-text">
              Pre-request validation, post-request audit, failure alerting — shell commands that run at the resource boundary without touching handler code.
            </div>
            <Code label="config.yaml">{`hooks:
  pre_request:
    - "./hooks/validate.sh"
  post_request:
    - "./hooks/audit-log.sh"
  post_request_failure:
    - "./hooks/alert.sh"`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="browser" />
            <div className="feature-title">Static Files</div>
            <div className="feature-text">
              Bundle a React, Vue, or any frontend alongside your API. Point Yeti at a directory and it serves with proper caching headers and SPA fallback.
            </div>
            <Code label="config.yaml">{`static_files:
  path: web
  spa: true
  build:
    source_dir: source
    command: npm run build`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Multi-App Composability</div>
            <div className="feature-text">
              Each app runs in its own namespace with isolated storage, routing, and permissions. A single Yeti instance hosts dozens of applications, each scaling independently.
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
        <h2 className="section-title">Embedded storage that replicates globally</h2>
        <p className="section-desc">
          No external database to manage. No connection strings. No migration ceremony. Every table is backed by RocksDB with ACID compliance at the node and eventual consistency across the cluster. Define your schema, pick your consistency level, and Yeti handles replication, conflict resolution, and failover.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Single Node to Global Fleet</div>
            <div className="feature-text">
              Starts as a single-node embedded database. Add nodes and it replicates automatically via WAL shipping with hybrid logical clocks. Your data just shows up on every node.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Conflict Resolution Built In</div>
            <div className="feature-text">
              Last-writer-wins by default with HLC timestamps. CRDTs for counters and sets. Strong consistency mode for financial data. Pick per-table in your schema. The replication layer handles the rest.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Vectors</div>
        <h2 className="section-title">Semantic search without a second database</h2>
        <p className="section-desc">
          Not all searches are the same. Yeti supports multi-table joins, full-text search, and vector search with auto-embedding. Combine any search type with logical operators for precision and speed. No Pinecone. No Elasticsearch. It runs in the same process as everything else.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="link" />
            <div className="feature-title">Declarative Relationships</div>
            <div className="feature-text">
              Define relationships with <code>@relationship</code> directives - Yeti
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
              Mark a field as <code>Vector @indexed</code> to generate and search using default or custom embedding models.
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
              Query with FIQL or JSON. Combine with other logical operators for better precision.

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
        <h2 className="section-title">REST, WebSocket, SSE, MQTT, GraphQL - all from the same schema</h2>
        <p className="section-desc">
          Every table change fires a PubSub event. Subscribe via SSE, WebSocket, MQTT, or MCP for live updates with zero config. Dashboards, chat, AI agents, IoT devices - all natively real-time.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Server-Sent Events</div>
            <div className="feature-text">
              Append <code>?stream=sse</code> to any table endpoint for a persistent event
              stream. Automatic reconnection, last-event-ID support, and per-table or global
              subscription scoping.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">WebSocket + PubSub</div>
            <div className="feature-text">
              Full WebSocket support for bidirectional communication. <code>table.subscribe_all()</code> and <code>table.publish()</code> from any resource handler. Internal PubSub bus
              coordinates events across tables, extensions, and connected clients with
              topic-based routing. Kafka bridge for external event streaming.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="broadcast" />
            <div className="feature-title">Native MQTT Broker</div>
            <div className="feature-text">
              No Mosquitto, no managed broker service. Built-in MQTT broker with native MQTTS on port 8883 and WebSocket proxy
              at <code>/mqtt</code>. Publish and subscribe to table changes over standard
              MQTT topics with integrated auth.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">MCP Server</div>
            <div className="feature-text">
              Model Context Protocol support lets AI agents discover and interact with
              your tables and resources as tools. Connect Claude, GPT, or any MCP-compatible
              client directly to your running application.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Extensions</div>
        <h2 className="section-title">Auth, telemetry, and vectors ship with the binary</h2>
        <p className="section-desc">
          Extensions are shared services that apps opt into. Each one provides tables, API endpoints, and lifecycle hooks. Declare them in config.yaml and configure per-app behavior inline. Yeti ships with four built-in extensions and supports custom ones for specialized needs.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">yeti-auth</div>
            <div className="feature-text">
              Basic, JWT, and OAuth authentication with RBAC. Argon2id
              password hashing, configurable token TTLs, email-pattern role mapping, CSRF
              protection, and per-attribute field-level permissions.
            </div>
            <Code label="config.yaml">{`auth:
  methods: [oauth, basic]
  oauth:
    google:
      clientId: "\${GOOGLE_CLIENT_ID}"
      clientSecret: "\${GOOGLE_CLIENT_SECRET}"
    rules:
      - strategy: email
        pattern: "*@mycompany.com"
        role: admin
      - strategy: email
        pattern: "*"
        role: standard`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">yeti-telemetry</div>
            <div className="feature-text">
              Log, span, and metric collection with a built-in dashboard. OTLP export to
              Grafana, Datadog, or any OpenTelemetry collector. File rotation, real-time
              SSE streaming, and REST query API.
            </div>
            <Code label="yeti-config.yaml">{`telemetry:
  metrics: true
  serviceName: my-service
  otlpEndpoint: "http://otel-collector:4317"
  metricsIntervalSecs: 10`}</Code>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">yeti-ai</div>
            <div className="feature-text">
              Local embeddings and inference via Candle — no external API calls. Auto-embedding on insert/update, HNSW vector search, chat completion, and model management. Download models from HuggingFace Hub, run them in-process. Your data never leaves your server.
            </div>
            <div className="code-block">
              <span className="code-label">models</span>
              <pre style={{ margin: 0, padding: '1rem', background: 'transparent', color: '#d4d4d4', fontSize: '0.85rem', lineHeight: 1.7 }}>
{[
  ['  ', 'BAAI', 'bge-small-en-v1.5'],
  ['  ', 'BAAI', 'bge-base-en-v1.5'],
  ['  ', 'BAAI', 'bge-large-en-v1.5'],
  ['  ', 'sentence-transformers', 'all-MiniLM-L6-v2'],
  ['  ', 'nomic-ai', 'nomic-embed-text-v1.5'],
  ['  ', 'intfloat', 'multilingual-e5-large'],
  ['  ', 'Alibaba-NLP', 'gte-large-en-v1.5'],
  ['  ', 'snowflake', 'snowflake-arctic-embed-l'],
  ['▸ ', 'Qdrant', 'clip-ViT-B-32-vision'],
].map(([prefix, provider, model], i) => (
  <div key={i}>{prefix}{provider}/<span style={{ color: '#a8785a' }}>{model}</span></div>
))}
                <div style={{ color: '#6a9955' }}>{'  ...'}</div>
              </pre>
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">yeti-admin</div>
            <div className="feature-text">
              Web-based app manager with 11 starter templates. Browse, create, edit, and
              delete applications through a React UI. File browser, schema editor, Git
              integration, and SSH deploy key management.
            </div>
            <div className="code-block">
              <span className="code-label">templates</span>
              <pre style={{ margin: 0, padding: '1rem', background: 'transparent', color: '#d4d4d4', fontSize: '0.85rem', lineHeight: 1.7 }}>
{[
  ['app', 'benchmarks'],
  ['app', 'pagebank'],
  ['app', 'redirector'],
  ['demo', 'authentication'],
  ['demo', 'basic'],
  ['demo', 'fiql'],
  ['demo', 'graphql'],
  ['demo', 'kafka'],
  ['demo', 'mcp'],
].map(([prefix, name], i) => (
  <div key={i}>{'  '}<span style={{ color: prefix === 'app' ? '#b8b07e' : '#569cd6' }}>{prefix}</span>-{name}</div>
))}
                <div style={{ color: '#6a9955' }}>{'  ...'}</div>
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
