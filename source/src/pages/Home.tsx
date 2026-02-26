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
          <h1 className="hero-title">The Performance Platform<br />For Agent-Driven Development</h1>
          <p className="hero-subtitle">
            Production Rust in minutes. Scale without rewriting.<br />Build with humans, AI agents, or both.
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
            Most applications follow a painful path: SQLite MVP, then a Postgres rewrite, then Redis, Kafka, and Kubernetes for scale. By then, months have passed and the original code is obsolete. Yeti eliminates this cycle. Define your schema and business logic. Yeti compiles it to a production backend that evolves with your application — from day one to day thousand.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Production-Grade From Day One</div>
              <div className="feature-text">
                Every Yeti application uses the same optimized runtime — compiled Rust, zero-copy HTTP, and RocksDB storage. Your prototype on day one has the same sub-millisecond latency and 187K req/s throughput as your production app on day 1,000. You optimize your business logic, not your infrastructure.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Schema + Config = Application</div>
              <div className="feature-text">
                A GraphQL schema defines your data model. A YAML config declares extensions, permissions, and seed data. That's the entire application — no framework boilerplate, no ORM, no migration scripts. Add custom business logic in Rust when you need it, and it hot-reloads on save.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="discoverable">
        <div className="container">
          <div className="section-label">INTELLIGENT</div>
          <h2 className="section-title">Designed For Agent-Driven Development</h2>
          <p className="section-desc">
            Yeti exposes every table as REST, GraphQL, SSE, and WebSocket endpoints with consistent naming and filtering. Connect an MCP-compatible agent — Claude, Cursor, Copilot — and it introspects your schema, queries data, and builds applications through a standardized protocol. Agents understand your application's structure the same way expert developers do.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="brain" />
              <div className="feature-title">Built-In MCP Server</div>
              <div className="feature-text">
                Every Yeti instance includes a Model Context Protocol server. Connect any MCP-compatible agent and it gets deep understanding of the platform — architecture, APIs, constraints, and installed applications. Agents query a semantic knowledge base to build and maintain apps with full context.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="layers" />
              <div className="feature-title">Guided Skills System</div>
              <div className="feature-text">
                Pre-built multi-step workflows guide agents through common tasks: creating applications, adding authentication, setting up vector search, migrating from other platforms. Agents follow proven patterns with full context at every step.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="always-on">
        <div className="container">
          <div className="section-label">RELIABLE</div>
          <h2 className="section-title">Built For Global Scale</h2>
          <p className="section-desc">
            Yeti's multi-region architecture replicates data across nodes automatically. When failures happen — and they will — the system recovers without operator intervention. Automatic failover keeps applications running, with real-time alerting so your team stays informed.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="shield" />
              <div className="feature-title">Automatic Failover</div>
              <div className="feature-text">
                Raft consensus replicates data across nodes and regions. When a node fails, the cluster rebalances without downtime. No single point of failure. No manual failover. The system converges to healthy on its own, and alerts you after the fact.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clock" />
              <div className="feature-title">Sub-Second App Startup</div>
              <div className="feature-text">
                Deploy a new application node and it starts serving requests immediately. Region-local replicas are already consistent — no waiting for data copies, no read-only warm-up period. First request, full speed.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="extensions">
        <div className="container">
          <div className="section-label">COMPLETE</div>
          <h2 className="section-title">Auth. Telemetry. Vectors. Included.</h2>
          <p className="section-desc">
            Modern applications require authentication, observability, and AI capabilities. Instead of integrating external services, declare them as extensions — each a single line in config.yaml, each built on the same high-performance runtime as your application.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="lock" />
              <div className="feature-title">Drop-In Auth</div>
              <div className="feature-text">
                Basic, JWT, and OAuth authentication. Resource and attribute-level permissions tied to roles or mapped to identity provider claims. One line to enable, full control when you need it.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="monitor" />
              <div className="feature-title">Built-In Observability</div>
              <div className="feature-text">
                Logs, spans, metrics, and OTLP export. Real-time telemetry dashboard with SSE streaming. No manual instrumentation, no separate APM service. Observable from the moment you start.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
