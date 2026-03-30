import benchmarkData from '../data/bestresults.json'

const NODE_COUNTS = ['1', '3', '6', '9'] as const

function fmt(n: number | null | undefined): string {
  if (n == null) return '—'
  if (n >= 1000000) { const v = n / 1000000; return (v % 1 === 0 ? v.toFixed(0) : v.toFixed(1)) + 'M' }
  if (n >= 10000) return Math.round(n / 1000) + 'k'
  if (n >= 1000) { const v = (n / 1000).toFixed(1); return (v.endsWith('.0') ? v.slice(0, -2) : v) + 'k' }
  return n.toFixed(0)
}

function fmtMs(ms: number | null | undefined): string {
  if (ms == null) return '—'
  if (ms < 0.01) return '<1ms'
  if (ms >= 100) return ms.toFixed(0) + 'ms'
  if (ms >= 10) return ms.toFixed(1) + 'ms'
  return ms.toFixed(2) + 'ms'
}

interface TestData {
  name: string
  group: string
  nodes: Record<string, number | null>
  p95: number
  p99: number
}

const tests = benchmarkData.tests as Record<string, TestData>
const groups = [...new Set(Object.values(tests).map(t => t.group))]

export default function Benchmarks() {
  return (
    <div className="container" style={{ padding: 0 }}>
      <div className="page-header">
        <h1 className="page-title">Benchmarks, not Bullshit</h1>
      </div>

      {groups.map(group => {
        const groupTests = Object.entries(tests).filter(([, t]) => t.group === group)

        return (
          <section className="bench-section" key={group}>
            <table className="bench-perf-table">
              <thead>
                <tr>
                  <th style={{ color: 'var(--color-primary)' }}>{group}</th>
                  {NODE_COUNTS.map(n => (
                    <th key={n} className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>
                      N={n}
                    </th>
                  ))}
                  <th className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>P95</th>
                  <th className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>P99</th>
                </tr>
              </thead>
              <tbody>
                {groupTests.map(([id, test]) => (
                  <tr key={id}>
                    <td>{test.name}</td>
                    {NODE_COUNTS.map(n => (
                      <td key={n} className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>
                        <span className="bench-highlight">{fmt(test.nodes[n])}</span>
                      </td>
                    ))}
                    <td className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>
                      <span className="bench-highlight">{fmtMs(test.p95)}</span>
                    </td>
                    <td className="bench-col-num" style={{ whiteSpace: 'nowrap' }}>{fmtMs(test.p99)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      })}

      <section className="bench-section">
        <table className="bench-perf-table">
          <thead>
            <tr>
              <th style={{ color: 'var(--color-primary)' }}>Methodology</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hardware</td>
              <td style={{ textAlign: 'right' }}>8 Cores / 16 GB RAM / NVMe Storage</td>
            </tr>
            <tr>
              <td>Storage</td>
              <td style={{ textAlign: 'right' }}>Embedded RocksDB (no replication)</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td style={{ textAlign: 'right' }}>HTTPS / TLS 1.3, HTTP/1.1 with connection reuse</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td style={{ textAlign: 'right' }}>30 seconds per test (5s warmup)</td>
            </tr>
            <tr>
              <td>Concurrency</td>
              <td style={{ textAlign: 'right' }}>100 virtual users (API), up to 15,000 (realtime)</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  )
}
