import Icon from '../components/Icon'

export default function Fabric() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Deploy Globally.<br/>Scale Automatically.</h1>
        <p className="page-subtitle">
          Yeti Fabric is a multi-region hosting platform that takes your app from localhost to worldwide in one command.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Infrastructure</div>
        <h2 className="section-title">Built For Global Scale</h2>
        <p className="section-desc">
          Yeti Fabric separates compute from storage. Your applications run as stateless containers on Kubernetes while data lives in a dedicated distributed storage cluster. Every region holds a complete copy of all data, replicated automatically. New pods start in milliseconds with immediate access. No data migration, no warm-up period.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Automatic Failover</div>
            <div className="feature-text">
              Raft consensus replicates data across nodes and regions. When a node fails, the cluster rebalances without downtime. No single point of failure. No manual failover. The system converges to healthy on its own and alerts you after the fact.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="clock" />
            <div className="feature-title">Millisecond App Startup</div>
            <div className="feature-text">
              Deploy a new application node and it starts serving requests immediately. Region-local replicas are already consistent. No waiting for data copies, no read-only warm-up period. First request, full speed.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Regions</div>
        <h2 className="section-title">Multi-Region By Default</h2>
        <p className="section-desc">
          Every Fabric deployment spans multiple geographic regions with Akamai GTM routing users to the nearest one. Data replicates across regions via change data capture over encrypted WireGuard tunnels. Your users get local latency regardless of where they are.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Geo-Aware Routing</div>
            <div className="feature-text">
              Akamai GTM routes every request to the nearest healthy region based on geography and real-time performance data. Built-in CDN provides edge caching and DDoS protection with zero configuration.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Full Data Replication</div>
            <div className="feature-text">
              Every region holds all data, sharded across local storage nodes. Cross-region WAL shipping keeps regions in sync. Node failure within a region triggers automatic rerouting to the nearest healthy replica.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Environments</div>
        <h2 className="section-title">Dev, Stage, Production - One Platform</h2>
        <p className="section-desc">
          Fabric manages your application lifecycle from development through production. Push to a branch and get a staging environment. Merge to main and promote to production. Each environment is fully isolated with its own data, secrets, and custom domains.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="layers" />
            <div className="feature-title">Environment Promotion</div>
            <div className="feature-text">
              Branch-based environments with Git-driven promotion. Development and staging share a non-production cluster. Production runs on dedicated high-performance infrastructure with full replication.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Tenant Isolation</div>
            <div className="feature-text">
              Each customer's applications run in process-isolated Kubernetes pods, not shared dylib co-tenancy. Separate namespaces, network policies, and storage prefixes ensure complete data isolation between tenants.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Operations</div>
        <h2 className="section-title">Zero-Ops Infrastructure</h2>
        <p className="section-desc">
          Fabric handles provisioning, scaling, monitoring, and recovery so you don't have to. Auto-scaling adjusts compute capacity based on load. Built-in telemetry exports to your preferred observability stack. You ship features. Fabric runs them.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">Auto-Scaling</div>
            <div className="feature-text">
              Kubernetes horizontal pod autoscaling adjusts capacity based on CPU, memory, and request rate. Scale from one pod to hundreds without configuration changes. Storage nodes scale independently from compute.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="monitor" />
            <div className="feature-title">Built-In Monitoring</div>
            <div className="feature-text">
              Real-time dashboards, log aggregation, and OTLP export come standard. Automatic alerting on latency spikes, error rates, and resource exhaustion. 99.99% uptime target backed by multi-region redundancy.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
