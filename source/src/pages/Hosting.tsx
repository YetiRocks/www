import Icon from '../components/Icon'

export default function Hosting() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Push to main. Deploy globally.</h1>
        <p className="page-subtitle">
          Yeti Cloud runs your applications across Linode, GCP, AWS, and Azure. You push code. We handle servers, scaling, replication, monitoring, and billing. Whether you're processing 50,000 ad impressions per second or ingesting telemetry from factory floor sensors, the same deploy workflow applies.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Deploy</div>
        <h2 className="section-title">Push code, not configs</h2>
        <p className="section-desc">
          Connect your GitHub repo and push to main. Yeti builds your plugins, distributes the artifacts, and rolls out to every region. Or run <code>yeti deploy</code> from your terminal. Branch pushes create preview environments on a single server. Merge to main promotes to production.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Branch Previews</div>
            <div className="feature-text">
              Every branch gets its own isolated environment with its own data, running on a single server in the cheapest region. Test in production-identical conditions without touching production. Environments clean up automatically when the branch is deleted.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Process Isolation</div>
            <div className="feature-text">
              Each application runs as a separate OS process with cgroup resource limits. One app crashing cannot affect another. No shared memory, no shared threads, no container overhead. Your data directory persists across deploys and restarts.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Global</div>
        <h2 className="section-title">Three regions on day one</h2>
        <p className="section-desc">
          Paid customers start with US West, US East, and EU West. Your data replicates across all three in under 100 milliseconds. Every region holds a complete copy. Reads are always local. The auto-scaler watches your traffic and proposes new regions when the data supports it.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Encrypted Everything</div>
            <div className="feature-text">
              All server-to-server traffic uses mutual TLS with per-node certificates from a private certificate authority. No VPN gateways, no kernel modules, no vendor lock-in. Standard TLS that works through every firewall on every cloud.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Smart Scaling</div>
            <div className="feature-text">
              The auto-scaler monitors latency, CPU, and connection count across all your instances. Within a region, it scales immediately. Across regions, it builds a case over time, showing you the evidence and cost impact before acting.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Architecture</div>
        <h2 className="section-title">Built with Yeti, for Yeti</h2>
        <p className="section-desc">
          Yeti Cloud runs on the same platform you use. Four applications on every server handle routing, process management, builds, and orchestration. The same SDK, the same plugin system, the same config files. No Kubernetes. No containers.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">yeti-cluster</div>
            <div className="feature-text">
              Owns port 443. Routes traffic by hostname to customer applications over Unix sockets. Multiplexes replication through a single encrypted gRPC connection per server. Customer processes have zero network surface area.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">yeti-agent</div>
            <div className="feature-text">
              Starts, stops, and monitors your application processes. Each app runs in its own cgroup with strict CPU and memory limits. Crash recovery with exponential backoff. Your app goes down, the agent brings it back.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="wrench" />
            <div className="feature-title">yeti-build</div>
            <div className="feature-text">
              Compiles your Rust plugins into native dynamic libraries on dedicated build servers. Artifacts replicate to every node automatically. When the agent starts your app, the compiled code is already on local disk.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">yeti-admin</div>
            <div className="feature-text">
              The control plane. Customer portal with real-time monitoring, deployment management, team settings, and billing. Operators see the entire fleet. Customers see their own apps, metrics, and costs.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Pricing</div>
        <h2 className="section-title">No tiers. No minimums. Pay for what you use.</h2>
        <p className="section-desc">
          Six metered dimensions: compute, memory, storage, requests, bandwidth, and active regions. Pricing updates in real time as you adjust your settings. You confirm before anything changes.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Free Tier</div>
            <div className="feature-text">
              One app, one region, no credit card. Enough to build, test, and show your work. When you hit the limits, responses slow down instead of failing. Upgrade when the project is ready, not when we decide you should.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Multi-Cloud</div>
            <div className="feature-text">
              Run on Linode, GCP, AWS, or Azure. Pin to a single provider for your spend commitments, or let Yeti pick the cheapest option per region. A cloud provider outage becomes a routing change. Your users don't notice.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Observe</div>
        <h2 className="section-title">See everything. Configure nothing.</h2>
        <p className="section-desc">
          Built-in dashboards show request rate, error rate, latency percentiles, CPU, memory, disk, and bandwidth for every app in every region. Charts update every 30 seconds over SSE. Export to your own Grafana or Datadog via OTLP. No agents to install. No third-party billing surprises.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Real-Time Dashboards</div>
            <div className="feature-text">
              Request rate, latency percentiles (p50/p95/p99), CPU and memory utilization, storage growth, active connections. Drill down from region to app to instance. Works on mobile for on-call.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="search" />
            <div className="feature-title">Log Search</div>
            <div className="feature-text">
              Searchable, filterable logs per instance with live tail mode. Filter by app, level, and time range. For centralized logging, point your OTLP export at any collector and Yeti sends everything in standard OpenTelemetry format.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
