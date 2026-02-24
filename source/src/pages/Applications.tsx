import Code from '../components/Code'

const schemaExample = `type Product @table @export {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}`

const resourceExample = `use yeti_core::prelude::*;

/// Simple greeting resource using Harper-like concise syntax
resource!(Greeting {
    get => json!({"greeting": "Hello, World!"})
});`

const authExample = `extensions:
  - yeti-auth:
      oauth:
        rules:
          - strategy: provider
            pattern: "google"
            role: admin
          - strategy: email
            pattern: "*@mycompany.com"
            role: standard
          - strategy: provider
            pattern: "github"
            role: standard`

const vectorSchema = `type Article @table @export {
    id: ID! @primaryKey
    title: String!
    content: String!
    embedding: [Float!]! @indexed(type: "HNSW")
}`

export default function Applications() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Composable Performance</h1>
        <p className="page-subtitle">
          Yeti applications run as native libraries- no serialization
          boundaries, no interpreter tax. You get resource-stability, and maximum performance.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Schema to API</div>
        <h2 className="section-title">Define Once. Get Everything.</h2>
        <p className="section-desc">
          Write a GraphQL schema with table directives. Yeti generates REST CRUD, GraphQL queries
          and mutations, real-time subscriptions, FIQL filtering, pagination, field selection,
          and relationship joins- automatically.
        </p>

        <Code label="schema.graphql">{schemaExample}</Code>

        <div className="stats-grid stats-grid-3">
          <div className="stat-card">
            <div className="stat-value">REST</div>
            <div className="stat-label">Auto-Generated</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">GraphQL</div>
            <div className="stat-label">Auto-Generated</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">SSE</div>
            <div className="stat-label">Auto-Generated</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Custom Resources</div>
        <h2 className="section-title">Rust That Looks Like Javascript</h2>
        <p className="section-desc">
          Yeti&rsquo;s intelligent abstractions deliver compiled, zero-overhead Rust without the
          complexity. Define and deploy complex business logic with elegant code that's easy to
          write and maintain.
        </p>

        <Code label="greeting.rs">{resourceExample}</Code>

        <div className="stats-grid stats-grid-3">
          <div className="stat-card">
            <div className="stat-value">Native</div>
            <div className="stat-label">Compiled Rust</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">&lt;1s</div>
            <div className="stat-label">Hot Reload</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">0</div>
            <div className="stat-label">Boilerplate</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Authentication</div>
        <h2 className="section-title">Auth in Five Lines of Config</h2>
        <p className="section-desc">
          The yeti-auth extension provides Basic, JWT, and OAuth authentication with role-based
          access control. Declare it in your config.yaml with provider credentials and role
          mapping rules. No auth code to write.
        </p>

        <Code label="config.yaml">{authExample}</Code>

        <p className="section-desc">
          JWT tokens are issued with configurable TTLs. Role permissions control read, write,
          and delete access per table, with optional attribute-level field filtering. Argon2id
          password hashing meets OWASP minimum parameters out of the box.
        </p>

        <div className="stats-grid stats-grid-3">
          <div className="stat-card">
            <div className="stat-value">3</div>
            <div className="stat-label">Auth Strategies</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">RBAC</div>
            <div className="stat-label">Per-Field Control</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">Argon2</div>
            <div className="stat-label">OWASP Compliant</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Vector Search</div>
        <h2 className="section-title">Semantic Search in 3ms</h2>
        <p className="section-desc">
          Add a vector index to any float array field. The yeti-vectors extension automatically
          embeds text on every insert and update using your choice of five models. A persistent
          embedding cache eliminates redundant computation. Search by natural language with
          sub-5ms response times.
        </p>

        <Code label="schema.graphql">{vectorSchema}</Code>

        <div className="stats-grid stats-grid-3">
          <div className="stat-card">
            <div className="stat-value">5</div>
            <div className="stat-label">Embedding Models</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">3ms</div>
            <div className="stat-label">Cached Search</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">HNSW</div>
            <div className="stat-label">Index Type</div>
          </div>
        </div>
      </section>
    </div>
  )
}
