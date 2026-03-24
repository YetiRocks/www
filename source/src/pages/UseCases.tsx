import Icon from '../components/Icon'
import { Link } from 'react-router-dom'

export default function UseCases() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Built for high-throughput workloads.</h1>
        <p className="page-subtitle">
          When every millisecond costs money or every dropped message means lost data, you need a backend that keeps up. Yeti handles the workloads where traditional stacks start to buckle.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Media Security</div>
        <h2 className="section-title">Millions of access decisions per second</h2>
        <p className="section-desc">
          Content platforms need to verify licenses, enforce geo-restrictions, and log access events at scale. A typical setup involves an API gateway, an auth service, a rules engine, a message broker for audit trails, and a monitoring stack to watch it all. That's five services before you serve a single asset. Yeti collapses all of it into one binary with single-digit-millisecond response times.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="lock" />
            <div className="feature-title">Inline Auth at Wire Speed</div>
            <div className="feature-text">
              JWT validation, role-based access control, and per-field permissions run in-process. No network hop to a separate auth service. Token verification happens in microseconds, not milliseconds. Add OAuth and RBAC rules in config - no auth code to write or maintain.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Real-Time Audit Streams</div>
            <div className="feature-text">
              Every access decision, every content view, every policy change fires a PubSub event. Subscribe via SSE for live dashboards or MQTT for downstream processing. No separate message broker. The event stream is a built-in feature of every table.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="trending-up" />
            <div className="feature-title">One Server, Full Pipeline</div>
            <div className="feature-text">
              A single Yeti node handles auth checks, content routing, access logging, and monitoring in one process. Scale horizontally by adding nodes - data replicates automatically. Your infrastructure bill shrinks while your throughput grows.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="shield" />
            <div className="feature-title">Geo-Restriction Without Latency</div>
            <div className="feature-text">
              Deploy to multiple regions with sub-100ms replication. Reads are always local. Content access rules, license tables, and geo-policy data stay close to your users. Enforce regional restrictions at the edge without round-tripping to a central database.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Ad Networks</div>
        <h2 className="section-title">Every millisecond of backend latency costs revenue</h2>
        <p className="section-desc">
          Ad decisioning happens in under 100ms end-to-end. The backend processing your bid requests, matching ad inventory, and streaming results to exchanges can't be the bottleneck. Traditional stacks layer an API server, a search index, a cache, and a message broker - each one adding latency and failure modes. Yeti handles the full pipeline in a single process.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="bolt" />
            <div className="feature-title">Sub-Millisecond Query Paths</div>
            <div className="feature-text">
              Schema-driven APIs compile to native Rust with embedded RocksDB storage. No serialization boundaries between your application logic and your data. Bid lookup, inventory match, and response generation happen without leaving the process.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="brain" />
            <div className="feature-title">Contextual Matching with Vector Search</div>
            <div className="feature-text">
              Match ad inventory to content context using semantic vector search. Cached queries return in 3ms. HNSW indexing handles millions of embeddings. No separate vector database, no external API call - it runs alongside your bid logic.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="refresh" />
            <div className="feature-title">Real-Time Bid Streaming</div>
            <div className="feature-text">
              SSE and WebSocket support is built into every table endpoint. Stream bid results, inventory updates, and campaign changes to exchanges and dashboards. PubSub coordinates events across all connected clients without a separate message broker.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="globe" />
            <div className="feature-title">Multi-Region, Low Latency</div>
            <div className="feature-text">
              Deploy across US West, US East, and EU West with automatic replication. Campaign data and inventory indexes stay local to each region. Bid requests hit the nearest node. No cross-region round trips during time-critical decisioning.
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Industrial IoT</div>
        <h2 className="section-title">10,000 sensors, one deployment</h2>
        <p className="section-desc">
          Factory floors, energy grids, and logistics networks generate massive telemetry streams. Most platforms require a managed MQTT service, a time-series database, a separate API layer for dashboards, and a monitoring stack on top. That's four vendors and four bills for what should be a single function: accept data, store it, and make it queryable in real time.
        </p>
        <div className="features-grid">
          <div className="feature-card">
            <Icon name="broadcast" />
            <div className="feature-title">Native MQTT - No Broker Service</div>
            <div className="feature-text">
              Yeti includes a full MQTT broker with MQTTS on port 8883 and WebSocket proxy at <code>/mqtt</code>. Devices connect directly over standard MQTT. No Mosquitto to manage, no AWS IoT Core bill, no separate broker infrastructure. Auth integrates with the same RBAC system as your REST APIs.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="database" />
            <div className="feature-title">Embedded Storage, No External DB</div>
            <div className="feature-text">
              Telemetry writes go straight to RocksDB storage in the same process. No network hop to a separate database. Sustained write throughput scales with your hardware. Run on a single node at the edge or replicate across regions for centralized analytics.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="radio" />
            <div className="feature-title">Live Dashboards Over SSE</div>
            <div className="feature-text">
              Every table write fires a PubSub event. Append <code>?stream=sse</code> to any endpoint for a real-time event stream. Build operator dashboards that update as sensors report. No polling, no WebSocket complexity for read-only views.
            </div>
          </div>
          <div className="feature-card">
            <Icon name="cpu" />
            <div className="feature-title">Edge to Cloud, Same Binary</div>
            <div className="feature-text">
              The same Yeti binary runs on an edge gateway or a cloud server. Deploy locally for low-latency ingestion and autonomy during network outages. Replicate to the cloud for aggregation and long-term storage. No separate edge runtime, no protocol translation layer.
            </div>
          </div>
        </div>
      </section>

      <div className="section" style={{ textAlign: 'center', paddingBottom: '4rem' }}>
        <p className="section-desc">
          These building blocks work the same way regardless of your use case. See them in action on the <Link to="/demos">demos page</Link>, or dig into the technical details on the <Link to="/platform">platform page</Link>.
        </p>
      </div>
    </div>
  )
}
