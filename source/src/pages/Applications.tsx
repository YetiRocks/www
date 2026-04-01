import Code from '../components/Code'
import Icon from '../components/Icon'
import { Link } from '@tanstack/react-router'

export default function Applications() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Zero to production in four steps.</h1>
        <p className="page-subtitle">
          A schema, a config file, and optionally some Rust. That's the whole application. Here's how it works from first file to live API.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Step 1</div>
        <h2 className="section-title">Define your data model</h2>
        <p className="section-desc">
          Write a GraphQL schema. Each type with <code>@table</code> becomes a stored table. Add <code>@export</code> and Yeti generates REST, GraphQL, and SSE endpoints automatically. Indexes, relationships, and vector fields are all declared inline.
        </p>

        <Code label="schemas/schema.graphql">{`type Product @table @export {
    id: ID! @primaryKey
    name: String!
    price: Float!
    category: String! @indexed
    inStock: Boolean!
}

type Review @table @export {
    id: ID! @primaryKey
    productId: ID! @indexed
    product: Product @relationship(from: "productId")
    rating: Int!
    body: String!
    embedding: Vector @indexed(source: "body")
}`}</Code>
      </section>

      <section className="section">
        <div className="section-label">Step 2</div>
        <h2 className="section-title">Configure your app</h2>
        <p className="section-desc">
          A YAML file names the app, points to the schema, and declares which extensions to use. Auth, vector search, telemetry - each one is a few lines of config. No code to write for any of it.
        </p>

        <Code label="config.yaml">{`name: "Product Catalog"
app_id: "catalog"
version: "1.0.0"
route_prefix: /catalog

schemas:
  - schemas/schema.graphql

auth:
  methods: [jwt, basic]

vectors:
  model: "BAAI/bge-small-en-v1.5"

static_files:
  path: web
  spa: true
  build:
    source_dir: frontend
    command: npm run build`}</Code>
      </section>

      <section className="section">
        <div className="section-label">Step 3</div>
        <h2 className="section-title">Add custom logic where you need it</h2>
        <p className="section-desc">
          Most apps don't need custom code - the schema and config handle CRUD, auth, search, and streaming. When you do need business logic, write a resource file. It compiles to native Rust and hot-reloads on save.
        </p>

        <Code label="resources/featured.rs">{`use yeti_sdk::prelude::*;

resource!(Featured {
    get(request, ctx) => {
        let products = ctx.get_table("Product")?;
        let featured = products.query("inStock==true;price=gt=50")
            .await?;
        json!({"featured": featured, "count": featured.len()})
    }
});`}</Code>
      </section>

      <section className="section">
        <div className="section-label">Step 4</div>
        <h2 className="section-title">Drop it in and go</h2>
        <p className="section-desc">
          Put your application directory in the Yeti applications folder. Yeti detects it, compiles any resources, builds your frontend, and starts serving. Push to GitHub and Yeti Cloud deploys it globally.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">What you get</div>
            <div className="feature-text">
              REST CRUD for every table. GraphQL with queries, mutations, and subscriptions. SSE streams for real-time updates. FIQL filtering, pagination, field selection, and relationship joins. JWT and basic auth with RBAC. Vector search with auto-embedding. Telemetry with OTLP export. A built frontend served with SPA fallback. All from a schema, a config, and one resource file.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">What you didn't write</div>
            <div className="feature-text">
              No ORM. No migration scripts. No auth middleware. No WebSocket server. No search index. No build pipeline config. No Dockerfile. No Kubernetes manifest. No CI/CD workflow. No monitoring agent. Yeti handles all of it so you can focus on what makes your app different.
            </div>
          </div>
        </div>
      </section>

      <div className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <p className="section-desc">
          See the full list of platform capabilities on the <Link to="/platform">platform page</Link>, or try the <Link to="/developers/demos">interactive demos</Link>.
        </p>
      </div>
    </div>
  )
}
