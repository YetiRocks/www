import { Link } from '@tanstack/react-router'
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
            fetchPriority="high"
          />
          <h1 className="hero-title">Faster Applications, Faster.</h1>
          <p className="hero-subtitle">
            Create and scale high-performance Rust applications with Yeti's composable, agent-friendly building blocks: database, interfaces, streaming, integrations, security, and telemetry. <span className="nowrap">Move faster with Yeti.</span>
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onGetStarted}>
              Request Early Access
            </button>
            <Link className="btn btn-lg" to="/developers/demos">
              See Demos
            </Link>
          </div>
        </div>
      </div>

      <section className="section" id="building-blocks">
        <div className="container">
          <h2 className="section-title">From schema to production API in minutes</h2>
          <p className="section-desc">
            Most teams start with SQLite, rewrite to Postgres, bolt on Redis, add Kafka, then hire two people to run Kubernetes. That's six months gone before you ship anything real. Yeti skips the whole cycle. Your prototype and your production deployment run on the same compiled Rust runtime and the same embedded storage. No rewrites. No migration weekends. Same codebase from week one through year three.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">Same Runtime, Every Stage</div>
              <div className="feature-text">
                Your local dev environment runs the same compiled Rust and RocksDB storage as production. Sub-millisecond p95 latency on day one. No "it was fast in dev" surprises when you ship.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Schema + Config = Application</div>
              <div className="feature-text">
                A GraphQL schema defines your data model. A YAML config declares auth, permissions, and extensions. That's it. No framework boilerplate, no ORM, no migration scripts. Need custom logic? Write it in Rust and it hot-reloads on save.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="faster">
        <div className="container">
          <h2 className="section-title">Rust speed without writing Rust</h2>
          <p className="section-desc">
            Yeti's SDK gives you high-level abstractions that look like JavaScript but compile to native Rust. No lifetimes, no borrow checker fights. If you can write Express, you can write Yeti. Connect Claude, Cursor, or Copilot through the built-in MCP server and let your AI agent build entire applications while you focus on the product.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="brain" />
              <div className="feature-title">Your AI Agent's Favorite Backend</div>
              <div className="feature-text">
                Every Yeti instance ships with an MCP server that understands the platform deeply. Agents introspect schemas, query live data, and generate correct code on the first try. Not just an API to hit - a system that agents can reason about.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="bolt" />
              <div className="feature-title">One Instance, Fleet-Level Throughput</div>
              <div className="feature-text">
                A single Yeti node handles traffic that would need a fleet of Node.js servers. Not because you tuned anything, but because everything compiles to native Rust with RocksDB storage and parallel query execution.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="easier">
        <div className="container">
          <h2 className="section-title">Auth, streaming, search - one config line each</h2>
          <p className="section-desc">
            No API gateway. No message broker. No separate search cluster. JWT, OAuth, and RBAC auth. Logs, spans, metrics, and OTLP export. Vector search with auto-embedding. Native MQTT broker. Each one is a single line in config.yaml, runs in-process, and shares the same performance profile. No external services. No integration weekends.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="clipboard" />
              <div className="feature-title">Everything Ships in the Binary</div>
              <div className="feature-text">
                Authentication, telemetry, vector search, MQTT - they're not plugins you install or services you connect. They ship with Yeti and run in-process. Add <code>auth: true</code> to your config. That's your auth service. No separate deployment, no separate failure mode.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="wrench" />
              <div className="feature-title">Five Lines to a Production Endpoint</div>
              <div className="feature-text">
                <code>resource!()</code> macros, <code>json!()</code> responses, <code>ctx.get_table()</code> data access. A complete REST endpoint is five lines of code. Custom business logic hot-reloads on save. You write the interesting parts. Yeti handles the plumbing.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="cheaper">
        <div className="container">
          <h2 className="section-title">One binary runs what used to take a cluster</h2>
          <p className="section-desc">
            A typical stack needs separate processes for the API server, database, cache, message broker, and background workers. Yeti is a single binary that handles all of it. One process to deploy, monitor, and scale. Your infrastructure bill drops by an order of magnitude.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <Icon name="trending-up" />
              <div className="feature-title">Fewer Servers, Fewer 3am Pages</div>
              <div className="feature-text">
                Rust's efficiency means one Yeti instance replaces a cluster of application servers. Fewer moving parts means fewer things that break. When something does go wrong, there's one process to investigate, not seven.
              </div>
            </div>
            <div className="feature-card">
              <Icon name="globe" />
              <div className="feature-title">Your Bill Tracks Your Revenue</div>
              <div className="feature-text">
                Yeti Cloud charges for the compute and storage you actually use. No reserved instances, no minimum commits, no surprise egress fees. Start on a single region for pennies. Scale to multi-cloud global deployment as traffic grows.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
