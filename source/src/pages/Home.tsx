import { Link } from 'react-router-dom'
import Icon from '../components/Icon'

interface HomeProps {
  onGetStarted: () => void
}

export default function Home({ onGetStarted }: HomeProps) {
  return (
    <>
      <div className="container">
        <div className="hero">
          <img
            src={`${import.meta.env.BASE_URL}logo_white.svg`}
            alt="Yeti Platform Architecture"
            className="hero-logo"
          />
          <h1 className="hero-title">Distributed Rust + Apps + Data<br />Optimized For Agentic Development</h1>
          <p className="hero-subtitle">
            Ship production APIs in minutes. Scale without rewriting.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Request Early Access
            </button>
            <Link className="btn btn-lg" to="/demos">
              See Demos
            </Link>
          </div>
        </div>
      </div>

      <section className="section" id="building-blocks">
        <div className="container">
          <div className="section-label">SIMPLE</div>
          <h2 className="section-title">From Prototype to Production</h2>
          <p className="section-desc">
            Most applications follow a painful path: SQLite MVP, then a Postgres rewrite, then Redis, Kafka, and Kubernetes for scale. By then, months have passed and the original code is obsolete. Yeti eliminates this cycle. Define your schema and business logic. Yeti compiles it to a production backend that evolves with your application, whether it's week one or year three.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Same Runtime, Every Stage</div>
              <div className="feature-text">
                Every Yeti application uses the same optimized runtime - compiled Rust, zero-copy HTTP, and RocksDB storage. Your prototype has the same sub-millisecond latency and 187K req/s throughput as your production deployment. You optimize your business logic, not your infrastructure.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Schema + Config = Application</div>
              <div className="feature-text">
                A GraphQL schema defines your data model. A YAML config declares extensions, permissions, and seed data. That's the entire application - no framework boilerplate, no ORM, no migration scripts. Add custom business logic in Rust when you need it, and it hot-reloads on save.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faster">
        <div className="container">
          <div className="section-label">FASTER</div>
          <h2 className="section-title">Build At The Speed of Thought</h2>
          <p className="section-desc">
            Yeti is built for agentic development. Connect Claude, Cursor, or Copilot through the built-in MCP server and your AI agent introspects schemas, queries data, and builds entire applications through a standardized protocol. Underneath, compiled Rust delivers 50-100x the throughput of Node.js or Python without you writing a single line of systems code.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="brain" />
              <div className="feature-title">Agent-Native Platform</div>
              <div className="feature-text">
                Every Yeti instance includes an MCP server with deep platform knowledge - architecture, APIs, constraints, and installed applications. Agents don't just call endpoints; they understand your schema and generate correct code on the first try. AI that actually knows the platform you're building on.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Rust Performance, Zero Effort</div>
              <div className="feature-text">
                187K req/s and sub-millisecond latency - not because you tuned anything, but because Yeti compiles to native Rust. A single Yeti instance handles traffic that would require a fleet of Node.js servers. The performance gap between prototype and production disappears entirely.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="easier">
        <div className="container">
          <div className="section-label">EASIER</div>
          <h2 className="section-title">Rust That Feels Like JavaScript</h2>
          <p className="section-desc">
            Yeti's SDK gives you familiar, high-level abstractions - <code>json!()</code>, <code>resource!()</code>, <code>async/await</code> - that compile to zero-cost Rust. No lifetimes, no borrow checker fights, no unsafe blocks. If you can write Express, you can write Yeti. Auth, telemetry, vector search, and MQTT are single-line config entries, not external services with separate SDKs and failure modes.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Batteries Included</div>
              <div className="feature-text">
                Authentication with JWT, OAuth, and RBAC. Observability with logs, spans, metrics, and OTLP export. Vector search with auto-embedding. MQTT broker with WebSocket proxy. Each is one line in config.yaml, runs in-process, and shares the same performance guarantees. No external services. No integration headaches.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="wrench" />
              <div className="feature-title">Concise By Design</div>
              <div className="feature-text">
                Yeti's prelude gives you <code>resource!()</code> macros, <code>json!()</code> responses, and <code>ctx.get_table()</code> data access. A complete REST endpoint is five lines. Custom business logic hot-reloads on save. You write the interesting parts and Yeti handles the plumbing.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cheaper">
        <div className="container">
          <div className="section-label">CHEAPER</div>
          <h2 className="section-title">Do More With Less</h2>
          <p className="section-desc">
            Rust's efficiency means a single Yeti instance replaces a cluster of Node.js servers. Fewer servers, fewer services, fewer engineers to keep the lights on. When you're ready to go global, Yeti Fabric's pay-as-you-go pricing scales with your actual usage, not your worst-case capacity plan.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="trending-up" />
              <div className="feature-title">One Server, Not Ten</div>
              <div className="feature-text">
                A typical Node.js stack needs separate processes for the API, database, cache, message broker, and background workers. Yeti is a single binary that does all of it. One process to deploy, monitor, and scale with 50-100x better resource utilization per dollar.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="globe" />
              <div className="feature-title">Pay As You Grow</div>
              <div className="feature-text">
                Yeti Fabric charges for the compute and storage you actually use. No reserved instances, no minimum commits, no surprise egress fees. Start on a single region for pennies. Scale to multi-region global deployment as your traffic grows. Your bill tracks your revenue, not your anxiety.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
