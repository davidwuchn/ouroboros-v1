# STATE.md

> What is true now. The current snapshot of the system.
> Updated: 2025-01-21

## System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Engine (∅) | ✓ Running | Statechart lifecycle operational |
| Query | ✓ Active | Pathom EQL interface exposed |
| Interface | ✓ Ready | Unified boot/shutdown via `ouroboros.interface` |
| nREPL | ✓ Port 8888 | Auto-boots system on connect |

## Current Capabilities

### Engine
- States: `:uninitialized` → `:initializing` → `:running` → `:stopped`
- Entry points: `engine/boot!`, `engine/stop!`
- Query: `engine/current-state`, `engine/system-status`, `engine/healthy?`

### Query
- Resolvers: `:system/current-state`, `:system/status`, `:system/healthy?`, `:system/meta`
- Entry point: `query/q` (EQL)
- Convenience: `query/status`, `query/full-report`

### Interface
- `iface/boot!` — boot full system
- `iface/shutdown!` — graceful stop
- `iface/q` — query the system
- `iface/status` — quick status
- `iface/report` — full report

## Running the System

```bash
# Boot only
bb boot

# Boot + nREPL
bb nrepl
```

In REPL:
```clojure
(iface/q [:system/status])
(iface/status)
(iface/report)
```

## Git State

- Branch: `main`
- Ahead of origin: 2 commits
- Latest: `94947e1` — ⚒ λ Boot system: Engine (∅) + Query (EQL) + Interface

## Known Gaps / Next Steps

1. **History** — Git resolvers for commit history, diffs
2. **Knowledge** — File system as queryable graph
3. **Introspection** — Engine queries Engine (meta-statecharts)
4. **Memory** — Cross-session persistence
5. **API** — OpenAPI integration via Martian

## Active Decisions

- nREPL auto-boots system — trade-off: convenience vs control
- State stored in atoms — simple, not durable
- Pathom resolvers are static — could be dynamically registered
