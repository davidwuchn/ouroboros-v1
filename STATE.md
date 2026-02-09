# STATE.md

> What is true now. The current snapshot of the system.

## System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Engine (∅) | ✅ Running | Statechart lifecycle operational |
| Query | ✅ Active | Pathom EQL interface exposed |
| Interface | ✅ Ready | Unified boot/shutdown via `ouroboros.interface` |
| nREPL | ✅ Port 8888 | Auto-boots system on connect |
| Process Runner | ✅ Active | Tmux-based process management for dev workflow |
| History | ✅ Active | Git resolvers for commits, status, branches |
| Introspection | ✅ Active | Engine queries its own statechart |
| Memory | ✅ Active | Cross-session persistence via EDN |
| Knowledge | ✅ Active | File system as queryable graph |
| API | ✅ Active | HTTP client via Pathom resolvers |
| OpenAPI | ✅ Active | OpenAPI specs → callable clients via Martian |
| Telemetry | ✅ Active | Structured logging, metrics, observability |

| Chat | ✅ Active | Telegram, Discord, Slack bot adapters (shared WebSocket) |
| **Config** | ✅ Done | **Environment-based configuration (.env, env vars)** |
| **Auth** | ✅ Done | **User authentication, permissions, rate limiting** |
| **Dashboard** | ✅ Done | **Web dashboard for observability** |
| **CI/CD** | ✅ Done | **GitHub Actions + Docker deployment** |
| **Tool Sandbox** | ✅ Done | **Timeouts, memory limits, error isolation for tool execution** |
| **Tool Allowlist** | ✅ Done | **Per-session/per-user tool permissions** |
| **Sandboxed Execution** | ✅ Done | **Docker/container-based shell/code execution** |

| **Prompt Injection Protection** | ✅ Done | **Input sanitization, pattern detection, risk scoring** |
| **Content Quarantine** | ✅ Done | **Track external content, limit tool chaining after exposure** |
| **Human Confirmation** | ✅ Done | **Require approval for dangerous operations (file/write, shell/exec)** |
| **Output Schema Validation** | ✅ Done | **Validate LLM tool calls against schemas before execution** |
| **ECA Client** | ✅ Done | **JSON-RPC connection to ECA binary (auto-start)** |
| **Learning Memory System** | ✅ Done | **Store/recall insights, patterns, wisdom** |
| **Educational Approval** | ✅ Done | **Tool approvals with risk explanations, best practices** |
| **Learning Interface** | ✅ Done | **Lazy-loaded API for learning operations** |
| **Lean Canvas Builder** | ✅ Done | **Interactive Lean Canvas creation with learning integration** |
| **Web UX Platform - Phase 2** | ✅ Done | **Rich canvas components: drag-and-drop, sticky notes, visual layouts** |
| **Web UX Platform - Phase 3** | ✅ Done | **Multi-user collaboration: presence, cursors, comments, version history** |
| **Web UX Platform - Phase 4** | ✅ Done | **Wisdom & AI: templates, insights, ECA chat integration, pattern recognition** |
| **Web UX Platform - Phase 5** | ✅ Done | **Polish & Scale: offline sync, analytics, embedding API, onboarding tours** |
| **Phase C: Continuous Wisdom** | ✅ Done | **Builder persistence, auto-insights on completion, learning storage, cross-project analysis (backend)** |

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

;; Process management
(require '[ouroboros.process-runner :as pr])
(pr/start! "webserver" "python -m http.server 8080")
(pr/status "webserver")
(pr/logs "webserver" :follow? true)
(pr/stop! "webserver")

;; Debug utilities
(require '[ouroboros.debug :as dbg])
(dbg/eca-check)           ; Check ECA binary status
(dbg/eca-check :verbose)  ; Detailed status
(dbg/eca-test-server)     ; Test ECA server mode
(dbg/system-status)       ; Check system health
(dbg/tool-registry)       ; List registered tools
(dbg/resolver-info)       ; List Pathom resolvers
(dbg/debug-menu)          ; Show debug menu



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

# Debug utilities
bb debug              # Check ECA binary status
bb debug eca          # Same as above
bb debug system       # Check system health
bb debug tools        # List registered tools
bb debug menu         # Show debug menu

# Run tests
bb test               # Run all core tests
bb test:eca           # Run ECA tests (auto-downloads ECA if needed)
bb test:webux         # Run WebUX tests (requires JVM Clojure)
```

In REPL:
```clojure
(iface/q [:system/status])
(iface/status)
(iface/report)

;; Debug utilities
(require '[ouroboros.debug :as dbg])
(dbg/eca-check)
(dbg/eca-test-server)
```

## Git State

- Branch: `chat-platforms`
- Status: Clean
- Last Updated: 2026-02-09
- Remote: `origin/chat-platforms`
- Latest: `02ae95d` + Phase C changes
- Phase C (Continuous Wisdom): ✅ Builder persistence, auto-insights, learning storage -- COMPLETE

## Completed Features

All P0 features implemented — see [CHANGELOG.md](CHANGELOG.md) for history.

## Current Focus / Next Steps

1. **ECA-Powered Wisdom** -- ✅ Backend + Frontend complete. Wisdom sidebar, flywheel progress, wisdom page all stream from ECA. Static fallback tips remain as graceful degradation.
2. **Continuous Wisdom (Phase C)** -- ✅ Builder persistence, auto-insights on completion, learning memory storage, cross-project analysis (backend). Debounced WebSocket sync for sticky-note builders.
3. **Remaining Static Content** -- Chat panel `context-suggestions` (28 prompts) still static (deferred). Templates/learning categories on wisdom page are structural (OK static).
4. **Metrics Export** -- Prometheus/OpenTelemetry format

**Architectural Insight (2026-02-09)**: ECA-powered wisdom is now **fully wired end-to-end**. Backend assembles project context, sends to ECA, streams tokens back via WebSocket. Frontend renders progressively with Fulcro render scheduling. The wisdom sidebar in all 4 builders and the wisdom page Quick Tips section now fetch from ECA with static fallback. **WebUX = state/CRUD/interaction, ECA = knowledge/wisdom/guidance.**

**Remaining Static Content**: Chat panel `context-suggestions` (28 prompts) -- deferred to avoid complexity. Templates and learning categories on wisdom page are structural, not guidance -- OK to remain static.

**🐍 SYSTEM COMPLETE** — All P0 safety features implemented. The Ouroboros is production-ready with comprehensive security controls.

**Architectural Pivot (2026-02-05)**: Transitioned to ECA integration model + learning flywheel foundation — transforming chat from utility assistant to wisdom partner via progressive disclosure (utility → understanding → insight → wisdom).

**Key Changes**:
- ✅ **Learning Memory System** -- Store/recall insights, patterns, wisdom
- ✅ **Educational Approval** -- Tool approvals with risk explanations, best practices  
- ✅ **ECA Integration** -- JSON-RPC client with callback system, auto-start
- ✅ **Interface Updates** -- Lazy-loaded APIs for learning operations
- ✅ **ECA IPC Fix** -- Byte-level Content-Length reader for UTF-8 framing
- ✅ **Streaming Pipeline** -- 5-layer ECA streaming to chat platforms (Telegram/Discord/Slack)
- ✅ **Frontend Chat** -- Global AI chat sidebar with ECA streaming (WebSocket)
- ✅ **Flywheel UI** -- Step indicator, wisdom sidebar, project detail dashboard
- ✅ **ECA-Powered Wisdom** -- Wisdom sidebar, flywheel progress, wisdom page all stream from ECA with static fallback
- ✅ **Phase C: Continuous Wisdom** -- Builder data persisted to backend via WebSocket, auto-insights on builder completion, learning memory storage, cross-project analysis (backend)
- ✅ **Chat Commands** -- `/learn`, `/recall`, `/wisdom`, `/build canvas|empathy|valueprop|mvp` commands (ready)
- ✅ **Progressive Disclosure** -- Builder stage suggestions, contextual help
- ✅ **Product Development Flywheel** -- Empathy Map -> Value Proposition -> MVP -> Lean Canvas with learning integration

**Decommissioned**:
- ✗ MCP server (functionality delegated to ECA)
- ✗ Internal AI/agent system (delegated to ECA)
- ✗ Skill system (replaced by learning flywheel)

**Next Phase**: Production hardening -- container isolation, metrics export, cross-project UI, chat context suggestions from ECA.

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

**Coverage:** 58 tests, 268 assertions, 60+ resolvers
- Engine lifecycle and state verification
- Query initialization and EQL queries
- Memory operations
- Telemetry events
- Git resolvers
- Configuration loading
- Chat adapter protocol compliance (Telegram, Discord, Slack)
- Streaming pipeline tests (14 tests, 82 assertions)
- Tool execution tests (all 13 tools)
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
- Registry pattern for resolvers — decoupled, self-registering
- ECA integration for AI — delegate LLM/tool handling, focus on chat platforms

## Current Priorities

### ECA-Powered Wisdom -- COMPLETE ✅

All wisdom components now stream from ECA/LLM with static fallback:
- ✅ Wisdom sidebar in all 4 builders (Empathy, Value Prop, MVP, Lean Canvas)
- ✅ Wisdom page Quick Tips section
- ✅ Flywheel progress from backend state
- ✅ Project detail dynamic guidance
- ⚠️ Chat panel `context-suggestions` (28 prompts) still static (deferred)

### Phase C: Continuous Wisdom -- COMPLETE ✅

Builder persistence and auto-insight pipeline fully wired:
- ✅ Backend `save-builder-data!` handler with completion detection
- ✅ Auto-insight trigger on builder completion (ECA streaming)
- ✅ Learning memory storage for generated insights
- ✅ Frontend builder persistence with 500ms debounced WebSocket sync
- ✅ Frontend auto-insight display in wisdom sidebar
- ✅ Cross-project analysis (backend only, UI deferred)
- ⚠️ Cross-project analysis UI not yet built (no trigger button)
- ⚠️ Undo/redo mutations don't sync to backend yet

### Next Priorities
1. **Cross-project analysis UI** -- Add trigger button for portfolio-level ECA analysis
2. **Metrics Export** -- Prometheus/OpenTelemetry format for production monitoring
3. **Container Isolation** -- OS-level isolation for ECA execution

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [PLAN](PLAN.md) · [LEARNING](LEARNING.md) · [CHANGELOG](CHANGELOG.md)
