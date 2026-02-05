# STATE.md

> What is true now. The current snapshot of the system.
> Updated: 2026-02-05 (Latest: Learning Flywheel Foundation)

## System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Engine (∅) | ✓ Running | Statechart lifecycle operational |
| Query | ✓ Active | Pathom EQL interface exposed |
| Interface | ✓ Ready | Unified boot/shutdown via `ouroboros.interface` |
| nREPL | ✓ Port 8888 | Auto-boots system on connect |
| History | ✓ Active | Git resolvers for commits, status, branches |
| Introspection | ✓ Active | Engine queries its own statechart |
| Memory | ✓ Active | Cross-session persistence via EDN |
| Knowledge | ✓ Active | File system as queryable graph |
| API | ✓ Active | HTTP client via Pathom resolvers |
| OpenAPI | ✓ Active | OpenAPI specs → callable clients via Martian |
| Telemetry | ✓ Active | Structured logging, metrics, observability |

| Chat | ✓ Active | Telegram, Discord, Slack bot adapters (shared WebSocket) |
| **Config** | **✓ New** | **Environment-based configuration (.env, env vars)** |
| **Auth** | **✓ New** | **User authentication, permissions, rate limiting** |
| **Dashboard** | **✓ New** | **Web dashboard for observability** |
| **CI/CD** | **✓ New** | **GitHub Actions + Docker deployment** |
| **Tool Sandbox** | **✓ New** | **Timeouts, memory limits, error isolation for tool execution** |
| **Tool Allowlist** | **✓ New** | **Per-session/per-user tool permissions** |
| **Sandboxed Execution** | **✓ New** | **Docker/container-based shell/code execution** |

| **Prompt Injection Protection** | **✓ New** | **Input sanitization, pattern detection, risk scoring** |
| **Content Quarantine** | **✓ New** | **Track external content, limit tool chaining after exposure** |
| **Human Confirmation** | **✓ New** | **Require approval for dangerous operations (file/write, shell/exec)** |
| **Output Schema Validation** | **✓ New** | **Validate LLM tool calls against schemas before execution** |
| **ECA Client** | **✓ Ready** | **JSON-RPC connection to ECA binary (auto-start)** |
| **Learning Memory System** | **✓ Ready** | **Store/recall insights, patterns, wisdom** |
| **Educational Approval** | **✓ Ready** | **Tool approvals with risk explanations, best practices** |
| **Learning Interface** | **✓ Ready** | **Lazy-loaded API for learning operations** |
| **Lean Canvas Builder** | **✓ Ready** | **Interactive Lean Canvas creation with learning integration** |

**Verified Working:**
```clojure
;; System queries
(iface/q [:system/status])
=> {:system/status {:state #{:running :system}, :running? true, :ready? true},
    :system/healthy? true}

;; Git queries  
(iface/q [{:git/commits [:git/hash :git/subject]} :git/status])
=> {:git/commits [{:git/hash "...", :git/subject "..."} ...]
    :git/status {:status/branch "main", :status/clean? false}}

;; Introspection queries
(iface/q [:introspection/configuration :introspection/available-events])
=> {:introspection/configuration [:ouroboros.engine/running :ouroboros.engine/system]
    :introspection/available-events ["stop"]}

;; Memory queries
(iface/remember :my-key "my-value")
(iface/recall :my-key) => "my-value"
(iface/q [{:memory/all [:memory/key :memory/value]}])

;; Combined
(iface/q [:system/healthy? 
          {:introspection/states [:state/id]}
          {:git/commits [:git/hash]}
          :memory/keys])

;; Knowledge queries
(iface/files "src")
(iface/file "bb.edn")
(iface/search "*.clj")
(iface/project)
(iface/q [{[:file-path "README.md"] [:file/content-preview]}])

;; API queries  
(iface/q [{[:url "https://api.github.com/users/github"]
           [:api/status :api/body :api/success?]}])
(iface/http-get "https://api.github.com/users/github")

;; OpenAPI queries
(iface/openapi-bootstrap! :petstore "https://petstore.swagger.io/v2/swagger.json")
(iface/openapi-clients)
(iface/openapi-operations :petstore)
(iface/openapi-call! :petstore :get-inventory {})



;; Telemetry queries
(iface/telemetry-events)
(iface/telemetry-recent 10)
(iface/telemetry-stats)
(iface/q [{:telemetry/events [:event/id :event/timestamp :event]}])
(iface/q [:telemetry/total-events :telemetry/tool-invocations])



;; Chat queries
(iface/chat-register-telegram! "YOUR_BOT_TOKEN")
(iface/chat-register-slack! "xapp-..." "xoxb-...")
(iface/chat-register-discord! "YOUR_BOT_TOKEN")
(iface/chat-start!)
(iface/chat-sessions)
(iface/chat-clear-session! chat-id)
(iface/chat-stop!)



;; Auth queries
(iface/auth-get-user :telegram "123456" "Alice")
(iface/auth-users)
(iface/q [:auth/user-count :auth/admin-count])
(iface/q [{:auth/users [:user/id :user/name :user/platform :user/role]}])

;; Dashboard queries
(iface/dashboard-start! {:port 8080})
(iface/dashboard-status)
(iface/q [:dashboard/status])

;; Config queries
(iface/load-config!)           ; Load from .env and env vars
(iface/get-config :openai/api-key)
(iface/get-config [:chat :telegram :token])
(iface/config-summary)         ; Safe to log - no secrets

;; Auto-start from config (bb chat)
;; TELEGRAM_BOT_TOKEN=... OPENAI_API_KEY=... bb chat

;; P0 Safety features
(iface/allowlist-create! :session-123 :chat-safe)
(iface/allowlist-permitted? :session-123 :file/read)
(iface/tool-safe :file/read {:path "README.md"} :session-123)
(iface/session-create! :telegram "123456" "user-789")
(iface/sandbox-exec-shell "echo 'Hello'" {:profile :restricted})
(iface/safety-report)


```

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
- Ahead of origin: 21+ commits
- Latest: Tool registry restructuring + comprehensive test suite
- Status: Clean (working directory clean)

## Known Gaps / Next Steps

1. ~~**History** — Git resolvers for commit history, diffs~~ ✓ Done
2. ~~**Introspection** — Engine queries Engine (meta-statecharts)~~ ✓ Done
3. ~~**Memory** — Cross-session persistence~~ ✓ Done
4. ~~**Knowledge** — File system as queryable graph~~ ✓ Done
5. ~~**API** — HTTP client capabilities~~ ✓ Done
6. ~~**OpenAPI** — OpenAPI specs → callable clients via Martian~~ ✓ Done
7. ~~**Telemetry** — Structured logging and metrics~~ ✓ Done
8. ~~**Chat** — Telegram, Discord, Slack bot adapters~~ ✓ Done
9. ~~**Auth** — User authentication, rate limiting~~ ✓ Done
10. ~~**Dashboard** — Web dashboard for observability~~ ✓ Done
11. ~~**Tool Sandbox** — Timeouts, memory limits for tool execution~~ ✓ Done
12. ~~**Tool Allowlist** — Per-session/per-user permissions~~ ✓ Done
13. ~~**Sandboxed Execution** — Docker-based shell/code execution~~ ✓ Done

18. ~~**Prompt Injection Protection** — Input sanitization, pattern detection, risk scoring~~ ✓ Done
19. ~~**Content Quarantine** — Track external content, limit tool chaining~~ ✓ Done
20. ~~**Human Confirmation** — Require approval for dangerous operations~~ ✓ Done
21. ~~**Output Schema Validation** — Validate LLM tool calls against schemas before execution~~ ✓ Done

**🐍 SYSTEM COMPLETE** — All P0 safety features implemented. The Ouroboros is production-ready with comprehensive security controls.

**Architectural Pivot (2026-02-05)**: Transitioned to ECA integration model + learning flywheel foundation — transforming chat from utility assistant to wisdom partner via progressive disclosure (utility → understanding → insight → wisdom).

**Key Changes**:
- ✅ **Learning Memory System** — Store/recall insights, patterns, wisdom
- ✅ **Educational Approval** — Tool approvals with risk explanations, best practices  
- ✅ **ECA Integration** — JSON-RPC client with callback system, auto-start
- ✅ **Interface Updates** — Lazy-loaded APIs for learning operations
- 🔄 **Approval Bridge Integration** — Educational messages for tool approvals (partial)
- ✅ **Chat Commands** — `/learn`, `/recall`, `/wisdom`, `/build canvas|empathy|valueprop|mvp` commands (ready)
- ◐ **Progressive Disclosure** — Depth manager for utility→understanding→wisdom (partial: stage suggestions)
- ✅ **Product Development Flywheel** — Empathy Map → Value Proposition → MVP → Lean Canvas with learning integration

**Decommissioned**:
- ✗ MCP server (functionality delegated to ECA)
- ✗ Internal AI/agent system (delegated to ECA)
- ✗ Skill system (replaced by learning flywheel)

**Next Phase**: Complete approval bridge integration, enhance progressive disclosure with wisdom levels, add product builder orchestration.

## Shared Components

### WebSocket Utilities (`ouroboros.chat.websocket`)
Shared WebSocket functionality for chat adapters:
- Connection management with auto-reconnect
- Message handling (text, JSON)
- Heartbeat/ping support
- Error handling

Used by: Discord Gateway, Slack Socket Mode

## Testing & Deployment

### Test Suite
```bash
bb test  # Run all system tests
```

**Coverage:** 52+ tests, 227+ assertions
- Engine lifecycle and state verification
- Query initialization and EQL queries
- Memory operations
- Telemetry events
- Git resolvers
- Configuration loading
- Chat adapter protocol compliance (Telegram, Discord, Slack)
- Tool execution (all 13 AI tools)
- Error handling and boundary conditions

### Docker Deployment
```bash
# Local development
docker-compose up -d

# Production build
docker build -t ouroboros .
docker run -d --env-file .env -p 8080:8080 ouroboros
```

**Ports:**
- 8888 - nREPL (optional, debugging)
- 8080 - Web dashboard

### CI/CD
GitHub Actions workflow (`.github/workflows/ci.yml`):
- Automated testing on push/PR
- Docker image build verification
- Linting and security checks

## Active Decisions

- nREPL auto-boots system — trade-off: convenience vs control
- State stored in atoms — simple, not durable
- Pathom resolvers are static — could be dynamically registered
