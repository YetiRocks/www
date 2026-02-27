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
    p50?: number
    p99?: number
    total?: number
    errors?: number
  }
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k'
  return n.toFixed(0)
}

function formatMs(n: number): string {
  return n.toFixed(2) + 'ms'
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
          Real-time results from a single Yeti node on commodity hardware. No caching layer, no read replicas, no load balancer.
        </p>
      </div>

      <section className="section">

        {loading && <p className="bench-loading">Loading benchmark results…</p>}
        {error && <p className="bench-error">Could not load results</p>}

        <div className="bench-grid">
          {TESTS.map(test => {
            const result = results[test.id]
            return (
              <div key={test.id} className="bench-card">
                <div className="bench-card-name">{test.name}</div>
                <div className="bench-card-stats">
                  <div className="bench-stat">
                    <span className="bench-stat-value">{result ? formatNumber(result.throughput) : '—'}</span>
                    <span className="bench-stat-label">requests/sec</span>
                  </div>
                  <div className="bench-stat">
                    <span className="bench-stat-value">{result?.results?.p50 != null ? formatMs(result.results.p50) : '—'}</span>
                    <span className="bench-stat-label">p95 latency</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="section">
        <div className="section-label">Test Configuration</div>

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
              <td>50</td>
            </tr>
            <tr>
              <td>Warmup Requests</td>
              <td>1,000</td>
            </tr>
            <tr>
              <td>Hardware</td>
              <td>8 Cores / 16GB RAM / 320 GB DISK</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>Embedded RocksDB</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>HTTPS (TLS 1.3)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
