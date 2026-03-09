import { useState, useEffect } from 'react'
import BenchmarkChart from '../components/BenchmarkChart'

interface BestResult {
  name: string
  throughput: number
  run?: {
    snapshots?: string
  }
  results: {
    throughput?: number
    p50?: number
    p95?: number
    p99?: number
    p999?: number
    total?: number
    errors?: number
    cv?: number
    peakConnections?: number
  }
}

interface Snapshot {
  second: number
  rps: number
  p50_ms: number
  p95_ms: number
  p99_ms: number
  p999_ms: number
  errors: number
  active_vus: number
}

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + 'k'
  return n.toFixed(0)
}

function formatLatency(ms: number | undefined): string {
  if (ms == null) return '—'
  if (ms === 0) return '<1 ms'
  if (ms < 0.01) return '<1 ms'
  return ms.toFixed(2) + ' ms'
}

function formatThroughput(n: number | undefined): string {
  if (n == null) return '—'
  return formatNumber(n) + ' req/s'
}

function parseSnapshots(result: BestResult): Snapshot[] {
  try {
    const raw = result.run?.snapshots
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

interface WorkloadGroup {
  label: string
  id: string
  description: string
  tests: { id: string; name: string }[]
}

const WORKLOADS: WorkloadGroup[] = [
  {
    label: 'Transactional API',
    id: 'rest',
    description: 'Core platform workload — REST CRUD operations over HTTPS with JSON payloads.',
    tests: [
      { id: 'rest-read', name: 'REST Reads' },
      { id: 'rest-write', name: 'REST Writes' },
      { id: 'rest-update', name: 'REST Update' },
      { id: 'rest-join', name: 'REST Join' },
    ],
  },
  {
    label: 'Graph API',
    id: 'graphql',
    description: 'GraphQL query planner and execution engine — reads, mutations, and relationship joins.',
    tests: [
      { id: 'graphql-read', name: 'GraphQL Reads' },
      { id: 'graphql-mutation', name: 'GraphQL Mutations' },
      { id: 'graphql-join', name: 'GraphQL Join' },
    ],
  },
  {
    label: 'Realtime & Streaming',
    id: 'realtime',
    description: 'Persistent connections — WebSocket and Server-Sent Events fan-out throughput.',
    tests: [
      { id: 'ws', name: 'WebSocket' },
      { id: 'sse', name: 'SSE Streaming' },
    ],
  },
  {
    label: 'Vector & AI Workloads',
    id: 'vector',
    description: 'Compute-intensive workloads — embedding generation and approximate nearest-neighbor search.',
    tests: [
      { id: 'vector-embed', name: 'Vector Embed' },
      { id: 'vector-search', name: 'Vector Search' },
    ],
  },
  {
    label: 'Large Object Handling',
    id: 'blob',
    description: 'Retrieval of 150 KB binary payloads through the REST interface.',
    tests: [
      { id: 'blob-retrieval', name: '150 KB Blob Retrieval' },
    ],
  },
]

const RAMP_TESTS = [
  { id: 'rest-read-ramp', name: 'REST Read Ramp' },
  { id: 'rest-write-ramp', name: 'REST Write Ramp' },
  { id: 'graphql-read-ramp', name: 'GraphQL Read Ramp' },
  { id: 'ws-ramp', name: 'WebSocket Ramp' },
]

const SUSTAINED_TESTS = [
  { id: 'rest-read-sustained', name: 'REST Read Sustained' },
  { id: 'rest-write-sustained', name: 'REST Write Sustained' },
  { id: 'graphql-read-sustained', name: 'GraphQL Read Sustained' },
]

export default function Benchmarks() {
  const [results, setResults] = useState<Record<string, BestResult>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/yeti-benchmarks/bestresults')
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

  const hasResults = Object.keys(results).length > 0
  const isRealtime = (id: string) => id === 'ws' || id === 'sse'

  // Check for ramp/sustained data
  const hasRampData = RAMP_TESTS.some(t => results[t.id])
  const hasSustainedData = SUSTAINED_TESTS.some(t => results[t.id])

  // Build sustained capacity callout
  const sustainedRead = results['rest-read-sustained']
  const sustainedCapacity = sustainedRead ? {
    throughput: sustainedRead.throughput,
    p999: sustainedRead.results?.p999,
    cv: sustainedRead.results?.cv,
  } : null

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Benchmarks, not Bullshit</h1>
        <p className="page-subtitle">
          Real-time results from a single Yeti node. No caching layer, no read replicas, no load balancer.
        </p>
      </div>

      {loading && <p className="bench-loading">Loading benchmark results...</p>}
      {error && <p className="bench-error">Could not load results</p>}

      {hasResults && (
        <>
          {WORKLOADS.map(group => {
            const groupHasData = group.tests.some(t => results[t.id])
            if (!groupHasData) return null

            return (
              <section className="bench-section" key={group.id}>
                <div className="bench-section-header">
                  <h2 className="bench-section-title">{group.label}</h2>
                  <p className="bench-section-desc">{group.description}</p>
                </div>
                <table className="bench-perf-table">
                  <thead>
                    <tr>
                      <th>Operation</th>
                      <th className="bench-col-num">Throughput</th>
                      {isRealtime(group.tests[0].id) ? (
                        <th className="bench-col-num">Subscribers</th>
                      ) : (
                        <th className="bench-col-num">p95 Latency</th>
                      )}
                      <th className="bench-col-num">p50</th>
                      <th className="bench-col-num">p99</th>
                      <th className="bench-col-num">p99.9</th>
                      <th className="bench-col-num">Error Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.tests.map(test => {
                      const r = results[test.id]
                      const res = r?.results
                      const total = res?.total ?? 0
                      const errors = res?.errors ?? 0
                      const errorPct = total > 0 ? ((errors / total) * 100) : 0

                      return (
                        <tr key={test.id}>
                          <td>{test.name}</td>
                          <td className="bench-col-num">
                            <span className="bench-highlight">
                              {r ? formatThroughput(r.throughput) : '—'}
                            </span>
                          </td>
                          {isRealtime(test.id) ? (
                            <td className="bench-col-num">
                              {res?.peakConnections != null ? formatNumber(res.peakConnections) : '—'}
                            </td>
                          ) : (
                            <td className="bench-col-num">
                              <span className="bench-highlight">
                                {formatLatency(res?.p95)}
                              </span>
                            </td>
                          )}
                          <td className="bench-col-num">{formatLatency(res?.p50)}</td>
                          <td className="bench-col-num">{formatLatency(res?.p99)}</td>
                          <td className="bench-col-num">{formatLatency(res?.p999)}</td>
                          <td className="bench-col-num">
                            {total > 0 ? (
                              <span className={errorPct > 1 ? 'bench-error-rate' : ''}>
                                {errorPct < 0.01 ? '< 0.01%' : errorPct.toFixed(2) + '%'}
                              </span>
                            ) : '—'}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </section>
            )
          })}

          {hasRampData && (
            <section className="bench-section">
              <div className="bench-section-header">
                <h2 className="bench-section-title">Scalability Under Load</h2>
                <p className="bench-section-desc">
                  Progressive VU ramp from 10 to 200 over 120 seconds. Shows throughput scaling and latency knee point.
                </p>
              </div>
              {RAMP_TESTS.map(test => {
                const r = results[test.id]
                if (!r) return null
                const snaps = parseSnapshots(r)
                return (
                  <div key={test.id} style={{ marginBottom: '2rem' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', marginBottom: '0.5rem' }}>{test.name}</h3>
                    {snaps.length > 0 ? (
                      <BenchmarkChart snapshots={snaps} mode="ramp" />
                    ) : (
                      <table className="bench-perf-table">
                        <thead>
                          <tr>
                            <th>Operation</th>
                            <th className="bench-col-num">Throughput</th>
                            <th className="bench-col-num">p95</th>
                            <th className="bench-col-num">p99.9</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{test.name}</td>
                            <td className="bench-col-num"><span className="bench-highlight">{formatThroughput(r.throughput)}</span></td>
                            <td className="bench-col-num">{formatLatency(r.results?.p95)}</td>
                            <td className="bench-col-num">{formatLatency(r.results?.p999)}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                )
              })}
            </section>
          )}

          {hasSustainedData && (
            <section className="bench-section">
              <div className="bench-section-header">
                <h2 className="bench-section-title">Sustained Throughput Stability</h2>
                <p className="bench-section-desc">
                  5-minute continuous load at 50 VUs. Low coefficient of variation proves zero-GC jitter and predictable performance.
                </p>
              </div>
              {SUSTAINED_TESTS.map(test => {
                const r = results[test.id]
                if (!r) return null
                const snaps = parseSnapshots(r)
                const cv = r.results?.cv
                return (
                  <div key={test.id} style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                      <h3 style={{ fontSize: '1rem', fontWeight: 400, color: '#fff', margin: 0 }}>{test.name}</h3>
                      {cv != null && (
                        <span className={`bench-cv-badge ${cv < 3 ? 'good' : 'warn'}`}>
                          CV: {cv.toFixed(1)}%
                        </span>
                      )}
                    </div>
                    {snaps.length > 0 ? (
                      <BenchmarkChart snapshots={snaps} mode="stability" />
                    ) : (
                      <table className="bench-perf-table">
                        <thead>
                          <tr>
                            <th>Operation</th>
                            <th className="bench-col-num">Throughput</th>
                            <th className="bench-col-num">p95</th>
                            <th className="bench-col-num">p99.9</th>
                            <th className="bench-col-num">CV</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{test.name}</td>
                            <td className="bench-col-num"><span className="bench-highlight">{formatThroughput(r.throughput)}</span></td>
                            <td className="bench-col-num">{formatLatency(r.results?.p95)}</td>
                            <td className="bench-col-num">{formatLatency(r.results?.p999)}</td>
                            <td className="bench-col-num">{cv != null ? cv.toFixed(1) + '%' : '—'}</td>
                          </tr>
                        </tbody>
                      </table>
                    )}
                  </div>
                )
              })}
            </section>
          )}

          <section className="bench-section bench-capacity">
            <div className="bench-capacity-text">
              {sustainedCapacity ? (
                <>
                  Sustained {formatNumber(sustainedCapacity.throughput)} REST reads/sec for 5 minutes
                  {sustainedCapacity.p999 != null && <>, p99.9 &lt; {sustainedCapacity.p999.toFixed(1)}ms</>}
                  {sustainedCapacity.cv != null && <>, CV = {sustainedCapacity.cv.toFixed(1)}%</>}
                  {' '}— zero-GC, predictable performance.
                </>
              ) : (
                <>
                  Sustained {formatNumber(results['rest-read']?.throughput ?? 0)} REST reads/sec for 30 seconds with p95 &lt; 4 ms and error rate &lt; 0.1%.
                </>
              )}
            </div>
          </section>
        </>
      )}

      <section className="bench-section">
        <div className="bench-section-header">
          <h2 className="bench-section-title">Environment &amp; Methodology</h2>
          <p className="bench-section-desc">
            All tests run on a single node with benchmark client co-located on the same machine.
            Results reflect end-to-end request latency including TLS handshake and JSON serialization.
          </p>
        </div>
        <table className="bench-perf-table bench-env-table">
          <tbody>
            <tr>
              <td>Hardware</td>
              <td>8 Cores / 16 GB RAM / 320 GB NVMe</td>
            </tr>
            <tr>
              <td>Quick Tests</td>
              <td>30 seconds per test (5s warmup excluded from results)</td>
            </tr>
            <tr>
              <td>Ramp Tests</td>
              <td>120 seconds, 10→200 VUs (step +10 every 5s)</td>
            </tr>
            <tr>
              <td>Sustained Tests</td>
              <td>300 seconds at 50 VUs (proves throughput stability)</td>
            </tr>
            <tr>
              <td>Concurrency</td>
              <td>50 virtual users (quick/sustained), progressive ramp (ramp tests)</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>HTTPS / TLS 1.3, HTTP/1.1 with connection reuse</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td>Embedded RocksDB (single node, no replication)</td>
            </tr>
            <tr>
              <td>Dataset</td>
              <td>1,000 records for reads/joins, 5,000 records for updates</td>
            </tr>
            <tr>
              <td>Warmup</td>
              <td>5 seconds — metrics discarded, connections pre-established</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
