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
- Status: Clean (working directory clean)
- Last Updated: 2026-02-09
- Remote: `origin/chat-platforms` (up to date)

## Completed Features

All P0 features implemented — see [CHANGELOG.md](CHANGELOG.md) for history.

## Current Focus / Next Steps

1. **ECA-Powered Wisdom** -- Replace static hardcoded tips/templates with LLM-generated contextual guidance via ECA chat
2. **Flywheel Progress Tracking** -- Store actual phase completion state per project, not hardcoded `:empathy`
3. **Metrics Export** -- Prometheus/OpenTelemetry format

**Architectural Insight (2026-02-09)**: The flywheel UI and wisdom features are built but use **static hardcoded content**. The chat panel has a working ECA pipeline (streaming, WebSocket, Fulcro state). The wisdom components (tips, templates, suggestions, phase guidance) must be rewired to use ECA/LLM instead of `def` blocks. **WebUX = state/CRUD/interaction, ECA = knowledge/wisdom/guidance.**

**Key Gap**: 6 locations with ~50 pieces of static content (20 tips, 6 templates, 28 prompt suggestions, 4 learning categories) that should be dynamically generated by ECA based on the user's actual project data.

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
- 🔄 **ECA-Powered Wisdom** -- Static tips/templates need replacement with LLM-generated content
- ✅ **Chat Commands** -- `/learn`, `/recall`, `/wisdom`, `/build canvas|empathy|valueprop|mvp` commands (ready)
- ✅ **Progressive Disclosure** -- Builder stage suggestions, contextual help
- ✅ **Product Development Flywheel** -- Empathy Map -> Value Proposition -> MVP -> Lean Canvas with learning integration

**Decommissioned**:
- ✗ MCP server (functionality delegated to ECA)
- ✗ Internal AI/agent system (delegated to ECA)
- ✗ Skill system (replaced by learning flywheel)

**Next Phase**: Wire ECA/LLM into wisdom components -- replace static `def` blocks with dynamic ECA-generated content based on user's actual project data. The chat sidebar pipeline is the model; extend it to wisdom sidebar, templates, suggestions, and phase guidance.

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

## Current Focus / Next Steps

### Web UX Platform — ALL PHASES COMPLETE ✅

The Web UX Platform is production-ready with all 5 phases implemented:

**Completed:**
- ✅ **Phase 1**: Foundation — Project CRUD, basic builders
- ✅ **Phase 2**: Interactive Builders — Visual canvas, drag-and-drop, sticky notes
- ✅ **Phase 3**: Collaboration — Multi-user presence, cursors, comments, versions
- ✅ **Phase 4**: Wisdom & AI — Templates, insights, ECA integration
- ✅ **Phase 5**: Polish & Scale — Offline sync, analytics, embedding API, onboarding

**Next Priorities:**
1. **Metrics Export** — Prometheus/OpenTelemetry format for production monitoring
2. **Streaming Responses** — Wire ECA streaming to chat platforms
3. **Mobile App** — PWA or React Native (Phase 6)

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [PLAN](PLAN.md) · [LEARNING](LEARNING.md) · [CHANGELOG](CHANGELOG.md)
