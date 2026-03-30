import Icon from '../components/Icon'

export default function AI() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">The runtime your agent already knows.</h1>
        <p className="page-subtitle">
          Claude, Cursor, Copilot, Windsurf. Yeti's built-in MCP knowledge base teaches any coding agent how to build, test, and deploy production applications. Your agent, your workflow, your repo.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Agent-Native Development</div>
        <h2 className="section-title">Minutes, not months</h2>
        <p className="section-desc">
          Your agent connects to Yeti's MCP server and instantly understands the entire platform - schemas, APIs, configuration, deployment patterns, and best practices. It doesn't guess. It queries a vector-search-powered knowledge base built from every page of documentation, every working example, and every edge case we've encountered. The result: agents that scaffold complete applications, write correct resource handlers, and deploy to production without a single round of debugging.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">MCP Knowledge Base</div>
            <div className="feature-text">
              Every Yeti instance ships with a Model Context Protocol server. Your agent introspects live schemas, queries the documentation, and discovers available APIs through a standardized protocol. No custom integrations. No API wrappers. Connect your agent and it understands Yeti the way a senior engineer would.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Scaffold to Production in One Session</div>
            <div className="feature-text">
              Tell your agent what you need. It creates the schema, writes the resource handlers in Rust, builds the frontend, configures auth, and deploys - all in a single conversation. Yeti's declarative config and SDK abstractions mean the agent writes less code, and every line it writes is correct.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Migrate From Anything</div>
            <div className="feature-text">
              Moving from another unified platform? Point your agent at the existing codebase and Yeti's knowledge base guides the migration. Schema translation, endpoint mapping, auth configuration - the agent handles it methodically because it has full context on both the source and the target. Our migration accuracy approaches 100%.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Agents Never Touch Infrastructure</div>
            <div className="feature-text">
              Your agent works with declarative YAML configs and Rust source files. It never sees credentials, never SSH's into servers, never runs infrastructure commands. The deployment pipeline handles everything. Enterprise teams get the velocity of AI-assisted development without the security risk of giving agents infrastructure access.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Why Agents Love Yeti</div>
        <h2 className="section-title">One system to learn, not seven.</h2>
        <p className="section-desc">
          Agents struggle with distributed systems. When your backend spans multiple services with different config languages, deployment models, and failure modes, even the best agent gets lost. Yeti is a single runtime with a single configuration model. Your agent learns one system and can build anything.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">One Schema File</div>
            <div className="feature-text">
              Your agent writes a GraphQL schema. Yeti generates every endpoint automatically. No boilerplate, no routing code, no serialization logic. One file in, a complete API out.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Three Lines of Config</div>
            <div className="feature-text">
              Your agent adds auth, telemetry, or vector search by editing YAML. No libraries to install, no middleware to wire up, no services to deploy. Configuration, not code.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Deterministic Outcomes</div>
            <div className="feature-text">
              Schema in, API out. Config in, behavior out. There's no ambiguity for the agent to resolve. The same inputs always produce the same outputs. That's why agents get it right the first time.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Local Equals Production</div>
            <div className="feature-text">
              What your agent builds on your machine is exactly what runs in production. Same binary, same storage engine, same config. No environment drift, no deployment surprises.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Agentic Engineering</div>
        <h2 className="section-title">Your agent is the developer. Yeti is the platform.</h2>
        <p className="section-desc">
          The future of software isn't developers writing code faster. It's agents building complete applications while developers focus on the product. This only works when the platform is simple enough for an agent to master and powerful enough to handle real workloads.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Any Agent, Any IDE</div>
            <div className="feature-text">
              Any tool that speaks MCP connects to Yeti's knowledge base instantly. Use the workflow you already have. Yeti doesn't require a proprietary agent or a specific IDE. Your agent, your rules.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Not a Prototype</div>
            <div className="feature-text">
              Agent-built Yeti apps run in production at scale. The same binary that runs on your laptop runs on your servers. Add nodes for linear throughput scaling. What your agent builds today handles the traffic you'll have tomorrow.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Closed-Loop Development</div>
            <div className="feature-text">
              Your agent builds the app, deploys it, queries the telemetry to verify it works, and iterates. No handoff between development and operations. One agent, one conversation, from idea to production.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Security by Construction</div>
            <div className="feature-text">
              Your agent doesn't implement security. It configures it. Auth, TLS, and permissions are properties of the platform, not code the agent writes. Enterprise teams get AI velocity without security risk.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
