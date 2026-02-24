export default function Benchmarks() {
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Benchmarks</h1>
        <p className="page-subtitle">
          Baseline numbers from a single Yeti process on commodity hardware. No caching layer, no read replicas, no load balancer. Distributed Yeti scales these numbers across nodes and regions.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Peak Throughput</div>
        <h2 className="section-title">Raw Storage Performance</h2>
        <p className="section-desc">
          REST and GraphQL read and write operations through the full API lifecycle,
          including the full HTTP/TLS stack, JSON serialization, query parsing, relationship
          resolution, and response formatting. 100 concurrent connections, 30-second sustained load.
        </p>

        <div className="stats-grid stats-grid-3">
          <div className="stat-card">
            <div className="stat-value">187,266</div>
            <div className="stat-label">REST Join req/s</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">117,620</div>
            <div className="stat-label">GraphQL Read req/s</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">84,000</div>
            <div className="stat-label">Blob 150KB req/s</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">21,498</div>
            <div className="stat-label">REST Update req/s</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">10,202</div>
            <div className="stat-label">GraphQL Mutation req/s</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">2,085</div>
            <div className="stat-label">Vector Search query/s</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-label">Test Configuration</div>
        <h2 className="section-title">How We Measured</h2>
        <p className="section-desc">
          All benchmarks run against a single Yeti process on the local machine. No caching
          proxies, no connection pooling, no read replicas. The numbers represent what a single
          Yeti instance can deliver.
        </p>

        <table className="bench-table">
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Test Duration</td>
              <td>30 seconds per test</td>
            </tr>
            <tr>
              <td>Concurrent VUs</td>
              <td>100</td>
            </tr>
            <tr>
              <td>Warmup Requests</td>
              <td>1,000</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>HTTPS (TLS 1.3, self-signed)</td>
            </tr>
            <tr>
              <td>Client</td>
              <td>Rust reqwest with connection pooling</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>Embedded RocksDB (single instance)</td>
            </tr>
            <tr>
              <td>Test Date</td>
              <td>February 20, 2026</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
