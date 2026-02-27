import { useState, useEffect } from 'react'

const TESTS = [
  { id: 'rest-read', name: 'REST Reads' },
  { id: 'rest-write', name: 'REST Writes' },
  { id: 'rest-update', name: 'REST Update' },
  { id: 'rest-join', name: 'REST Join' },
  { id: 'graphql-read', name: 'GraphQL Reads' },
  { id: 'graphql-mutation', name: 'GraphQL Mutations' },
  { id: 'graphql-join', name: 'GraphQL Join' },
  { id: 'vector-embed', name: 'Vector Embed' },
  { id: 'vector-search', name: 'Vector Search' },
  { id: 'ws', name: 'WebSocket' },
  { id: 'sse', name: 'SSE Streaming' },
  { id: 'blob-retrieval', name: '150k Blob Retrieval' },
]

interface BestResult {
  name: string
  throughput: number
  results: {
    throughput?: number
    p50_latency?: number
    p99_latency?: number
    avg_latency?: number
  }
}

function formatThroughput(value: number): string {
  if (value >= 1000) {
    return value.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }
  return value.toLocaleString('en-US', { maximumFractionDigits: 1 })
}

function formatLatency(ms: number): string {
  if (ms < 1) {
    return `${(ms * 1000).toFixed(0)}µs`
  }
  return `${ms.toFixed(1)}ms`
}

export default function Benchmarks() {
  const [results, setResults] = useState<Record<string, BestResult>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/admin/bestresults')
      .then(res => {
        if (!res.ok) throw new Error(`${res.status}`)
        return res.json()
      })
      .then(data => {
        const map: Record<string, BestResult> = {}
        for (const test of data.tests || []) {
          map[test.name] = test
        }
        setResults(map)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Benchmarks</h1>
        <p className="page-subtitle">
          Live results from a single Yeti process on commodity hardware. No caching layer, no read replicas, no load balancer.
        </p>
      </div>

      <section className="section">
        <div className="section-label">Live Results</div>

        {loading && <p className="bench-loading">Loading benchmark results…</p>}
        {error && <p className="bench-error">Could not load results</p>}

        <div className="bench-grid">
          {TESTS.map(test => {
            const result = results[test.id]
            return (
              <div key={test.id} className="bench-card">
                <div className="bench-card-value">
                  {result ? formatThroughput(result.throughput) : '—'}
                </div>
                <div className="bench-card-unit">req/s</div>
                <div className="bench-card-name">{test.name}</div>
                {result?.results?.p50_latency != null && (
                  <div className="bench-card-latency">
                    p50 {formatLatency(result.results.p50_latency)}
                  </div>
                )}
              </div>
            )
          })}
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
          </tbody>
        </table>
      </section>
    </div>
  )
}
