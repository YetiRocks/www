const BASE = import.meta.env.BASE_URL

const DEMOS = [
  { path: '/demo-basic/', name: 'Basic', img: 'screenshots/basic.png', desc: 'Simple counter with persistent state and a custom Rust greeting endpoint. Shows how tables and resources work together.' },
  { path: '/demo-fiql/', name: 'Query Language', img: 'screenshots/fiql.png', desc: '50+ query examples covering equality, ranges, full-text search, joins, sorting, pagination, and query introspection.' },
  { path: '/demo-graphql/', name: 'GraphQL', img: 'screenshots/graph.png', desc: 'Interactive GraphQL explorer with editable queries, mutations, and live SSE subscriptions on a book catalog.' },
  { path: '/demo-realtime/', name: 'Realtime', img: 'screenshots/realtime.png', desc: 'Side-by-side comparison of WebSocket, Server-Sent Events, and REST polling updating in real time.' },
  { path: '/demo-vector/', name: 'Vector Search', img: 'screenshots/vector.png', desc: 'Automatic text-to-vector embedding with HNSW nearest-neighbor semantic search on article content.' },
  { path: '/demo-authentication/', name: 'Authentication', img: 'screenshots/auth.png', desc: 'Role-based access control demo with Basic, JWT, and OAuth login. Admin and reader roles see different fields.' },
]

export default function Demos() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Demos</h1>
        <p className="page-subtitle">
          Interactive examples showing what you can build with Yeti.<br />Each demo runs as a standalone application.
        </p>
      </div>

      <div className="demo-grid">
        {DEMOS.map((demo) => (
          <a
            key={demo.path}
            href={demo.path}
            target="_blank"
            rel="noopener noreferrer"
            className="demo-card"
          >
            <div className="demo-card-img">
              <img src={`${BASE}${demo.img}`} alt={demo.name} />
            </div>
            <div className="demo-card-body">
              <div className="demo-card-name">{demo.name}</div>
              <div className="demo-card-desc">{demo.desc}</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
