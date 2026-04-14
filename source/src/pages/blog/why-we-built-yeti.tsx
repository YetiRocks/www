export default function WhyWeBuiltYeti() {
  return (
    <div className="blog-content">
      <p>
        Every application platform makes the same promise: fast, easy, scalable.
        But when you look under the hood, you find a Node.js process, a separate database,
        a message broker, a cache layer, and a deployment pipeline that takes an afternoon
        to configure. We asked: what if the platform itself was the performance?
      </p>

      <h2>The Problem with Layers</h2>
      <p>
        Traditional application platforms are assembled from parts. A web framework talks
        to a database over the network. A cache sits between them to paper over the latency.
        A message broker handles real-time events. Each layer adds latency, complexity,
        and failure modes.
      </p>
      <p>
        For most applications, this works fine. But for applications that need to be fast
        — real-time dashboards, AI inference pipelines, high-frequency data collection —
        the layers become the bottleneck. You're not slow because your code is slow.
        You're slow because your data crosses six network boundaries before it reaches
        the user.
      </p>

      <h2>One Binary, Zero Network Hops</h2>
      <p>
        Yeti is a single Rust binary that embeds everything: HTTP server, storage engine
        (RocksDB), real-time streaming (SSE, WebSocket, MQTT), AI inference (Candle),
        authentication, and a schema-driven API layer. Your application code compiles
        into the binary as a dynamic library. When a request arrives, it goes from TCP
        socket to storage and back without ever crossing a network boundary.
      </p>
      <p>
        The result: 100K+ requests per second on a single node. Sub-millisecond p50 latency.
        Cold start in under 10 seconds. No Docker, no Kubernetes, no infrastructure to manage.
      </p>

      <h2>Schema-First, Not Code-First</h2>
      <p>
        You define your data model in a GraphQL schema file. Yeti reads it and generates
        REST, GraphQL, SSE, WebSocket, MQTT, and MCP endpoints automatically. Add
        <code>@indexed</code> to a field and it builds a secondary index. Add
        <code>@vector</code> and it generates embeddings with a local ML model. Add
        <code>@audit</code> and every mutation is tracked.
      </p>
      <pre><code>{`type Product @table @export @audit {
  id: ID! @primaryKey
  name: String! @indexed
  description: String @indexed(type: "HNSW", source: "description")
  price: Float @default(value: 0)
  status: String @default(value: "draft")
}`}</code></pre>
      <p>
        That schema gives you a full CRUD API, vector search, audit trail, and default
        values — with zero application code.
      </p>

      <h2>Why Rust?</h2>
      <p>
        Not because it's trendy. Because garbage collection pauses are incompatible with
        real-time streaming. Because memory safety without a runtime means you can embed
        an ML inference engine in the same process as your HTTP server without worrying
        about memory corruption. Because a single static binary deploys to any Linux server
        with <code>scp</code>.
      </p>
      <p>
        Rust lets us make a promise that no Node.js or Go platform can: your application's
        latency is bounded by physics, not by the runtime.
      </p>

      <h2>What's Next</h2>
      <p>
        We're building Yeti in public. The codebase has 29 crates, 83 benchmarks,
        and a full audit system that verifies code quality on every change. Over the
        coming weeks, we'll be sharing deep dives into the architecture, performance
        comparisons, and tutorials for building real applications.
      </p>
      <p>
        If you're building something that needs to be fast, we'd love to hear from you.
      </p>
    </div>
  )
}
