# STATE.md

> What is true now. The current snapshot of the system.

## System Status

| Component | Status | Notes |
|-----------|--------|-------|
| Engine (∅) | ✅ Running | Statechart lifecycle operational |
| **clj-kondo** | **✅ Phase 4 Complete** | **0 errors, 64 warnings (down from 44 errors)** |
| **Test Coverage** | **⚒ Phase 5 Active** | **91 tests, 381 assertions (+16 new tests)** |
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
| **Learning Memory System** | ✅ Done | **Modularized: core, index, review, analytics, search. O(1) lookups, WAL, soft deletes, 91 tests** |
| **Educational Approval** | ✅ Done | **Tool approvals with risk explanations, best practices** |
| **Learning Interface** | ✅ Done | **Lazy-loaded API for learning operations** |
| **Lean Canvas Builder** | ✅ Done | **Interactive Lean Canvas creation with learning integration** |
| **Web UX Platform - Phase 2** | ✅ Done | **Rich canvas components: drag-and-drop, sticky notes, visual layouts** |
| **Web UX Platform - Phase 3** | ✅ Done | **Multi-user collaboration: presence, cursors, comments, version history** |
| **Web UX Platform - Phase 4** | ✅ Done | **Wisdom & AI: templates, insights, ECA chat integration, pattern recognition** |
| **Web UX Platform - Phase 5** | ✅ Done | **Polish & Scale: offline sync, analytics, embedding API, onboarding tours** |
| **Phase C: Continuous Wisdom** | ✅ Done | **Builder persistence, auto-insights on completion, learning storage** |
| **Workspace Auto-Detection** | ✅ Done | **Single project per instance, auto-detect from cwd, no create form, project/path in Pathom** |
| **UI Cleanup: Remove Users/Sessions** | ✅ Done | **Removed Users and Sessions pages (chat-platform data, empty in single-project model). Navbar: Dashboard, Project, Wisdom, Telemetry + AI Chat toggle** |
| **Kanban Board** | ✅ Done | **Auto-derived Kanban board on Project page: 29 cards across 4 builders, 3 columns (Not Started/In Progress/Done), color-coded by builder, view toggle (Flywheel/Kanban)** |
| **Phase D: Dynamic Content** | ✅ Done | **Replaced all hardcoded static content with ECA-powered dynamic content. New `analytics/dashboard` and `content/generate` WS handlers. Real analytics from project data. Generic content generation pipeline with 7 content types. Frontend reads ECA content with static fallback.** |
| **λ(system) Integration** | ✅ Done | **Telemetry bridge routes events to OODA observation. Memory search/retrieval instrumented. Reviewer skill with hooks. `bb lambda:cron` for scheduled maintenance.** |

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

- Branch: `main`
- Status: Clean
- Last Updated: 2026-02-19
- Remote: `origin/main` (pushed, up to date)
- Latest committed: ⚒ Add batch WebSocket endpoint: wisdom/page-data

## Completed Features

All P0 features implemented — see [CHANGELOG.md](CHANGELOG.md) for history.

## Current Focus / Next Steps

1. **ECA-Powered Wisdom** -- ✅ Backend + Frontend complete. Wisdom sidebar, flywheel progress, wisdom page all stream from ECA. Static fallback tips remain as graceful degradation.
2. **Continuous Wisdom (Phase C)** -- ✅ Builder persistence, auto-insights on completion, learning memory storage. Debounced WebSocket sync for sticky-note builders.
3. **Workspace Auto-Detection** -- ✅ Single project per instance. Backend auto-detects from `user.dir`, sends `:project/detected` on WS connect. No create form. Project page shows workspace project directly.
4. **UI Cleanup: Remove Users/Sessions** -- ✅ Removed chat-platform pages (empty data in single-project model). Navbar: Dashboard, Project, Wisdom, Telemetry + AI Chat toggle.
5. **Kanban Board** -- ✅ Auto-derived Kanban board on Project page. 29 cards across 4 builders (Empathy Map 6, Value Prop 6, MVP 8, Lean Canvas 9). 3 columns: Not Started, In Progress, Done. Cards derive status from actual builder session data. Color-coded by builder. View toggle (Flywheel/Kanban) on Project page.
6. **Phase D: Dynamic Content** -- ✅ Replaced ALL hardcoded static content with ECA-powered dynamic content. New backend handlers: `analytics/dashboard` (real analytics from project data + ECA prediction text), `content/generate` (generic ECA content generation with 7 content types: insights, blockers, templates, chat-suggestions, flywheel-guide, section-hints, learning-categories). Frontend reads ECA content from WS state with static fallback. 10 files changed (3 backend, 7 frontend). 58 tests, 268 assertions pass.
7. **Resilience & UI Polish** -- ✅ ECA client auto-restart on failure with alive checks. WebSocket content caching in localStorage. Chat panel WS connectivity checks. Telemetry UI overhaul with event detail drawer and debug toggle. Nil-safety sweep across 9 frontend components. Flywheel indicator redesigned as circle stepper with accessibility.
8. **Frontend Bug Fixes (2026-02-11)** -- ✅ Fixed nil-safety in `extract-plain-text-from-markdown` and `str/` call sites (13 sites across 8 files). Added React keys to Fulcro wrapped form elements. Fixed Learning Patterns cards: enriched backend categories with icons/descriptions/default counts. Fixed drawer "Loading insights..." on every click (cache-first pattern). Fixed card count mismatch with drawer (derived counts from actual data, fixed `count` shadowing bug, fixed `enrich-categories` extras path).
9. **Empathy Map Builder Fixes (2026-02-14)** -- ✅ Fixed empathy map interactive session routing. Enhanced WebSocket handler to detect `:empathy/mode` and route responses to empathy processor (not ECA). Added `/empathy` command to list saved maps. Improved rate limit error handling with friendly messages. All 7 sections (Persona → Think & Feel → Hear → See → Say & Do → Pains → Gains) now work end-to-end.
10. **Context Tab Consolidation** -- ✅ Enhanced Context tab to show both app context (current page/phase) and chat context (message count, summarization status). No `/context` command needed — single source of truth via UI.
11. **Batch WebSocket Endpoint** -- ✅ Added `wisdom/page-data` batch endpoint. Reduces wisdom page WS requests from 3 → 2 (static batch + ECA streaming). Returns static templates, saas template data, learning categories in one response.
12. **Metrics Export** -- Prometheus/OpenTelemetry format
13. **Learning + Embed Gaps Integration** -- ✅ Binary health checks, ✅ Hybrid search fix, ✅ Auto index updates; remaining: code re-linking, chat command integration

**Architectural Insight (2026-02-09)**: ECA-powered wisdom is now **fully wired end-to-end**. Backend assembles project context, sends to ECA, streams tokens back via WebSocket. Frontend renders progressively with Fulcro render scheduling. The wisdom sidebar in all 4 builders and the wisdom page Quick Tips section now fetch from ECA with static fallback. **WebUX = state/CRUD/interaction, ECA = knowledge/wisdom/guidance.**

**Single-Project Model (2026-02-08)**: Shifted from multi-project CRUD to single-project-per-instance. The running directory IS the project. Backend auto-detects workspace info on WS connect and sends `:project/detected`. Frontend normalizes into Fulcro state. Users/Sessions pages removed (were chat-platform data, always empty without adapters running).

**Resilience & UI Polish (2026-02-10)**: Systematic hardening pass. ECA client now auto-restarts on failure (`alive?`, `restart!`, `ensure-alive!`). WebSocket content cached in localStorage for generated content. Chat panel checks WS connectivity before sending. Telemetry page redesigned with event detail drawer and debug mode toggle. Nil-safety sweep across 9 frontend components. Flywheel indicator redesigned from pill buttons to numbered-circle stepper with SVG checkmarks and ARIA accessibility.

**Frontend Bug Fix Sweep (2026-02-11)**: 4 commits fixing frontend display bugs. (1) Nil-safety guards on 13 `clojure.string/*` call sites across 8 files + React keys on Fulcro wrapped form elements. (2) Learning Patterns cards enriched with icons/descriptions from frontend metadata when backend returns raw data. (3) Learning Patterns drawer cache-first pattern: pre-seed defaults at mount, silent refresh, safety timeouts. (4) Learning Patterns card count derived from actual default insight data, fixed `count` destructuring shadowing `cljs.core/count`, fixed `enrich-categories` extras code path. New LEARNING.md patterns #36-41 documented.

**Dynamic Content Migration Complete**: All hardcoded static content (wisdom tips, templates, learning categories, analytics dashboard, chat suggestions, flywheel phase descriptions, section hints) now powered by ECA with static fallback. Builder section configs (UX structure) remain static by design -- they define instant-load UI chrome.

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
- ✅ **Phase C: Continuous Wisdom** -- Builder data persisted to backend via WebSocket, auto-insights on builder completion, learning memory storage
- ✅ **Workspace Auto-Detection** -- Single project per instance, auto-detect from `user.dir`, no create form, `:project/detected` on WS connect
- ✅ **Remove Users/Sessions Pages** -- Removed orphaned chat-platform pages, cleaned navbar, router, dashboard cards, backend query resolver
- ✅ **Kanban Board** -- Auto-derived task board on Project page with view toggle (Flywheel/Kanban), 29 cards across 4 builders, status from builder session data
- ✅ **Phase D: Dynamic Content** -- Replaced all hardcoded static content with ECA-powered dynamic content. New `analytics/dashboard` and `content/generate` WS handlers. Real analytics, generic content pipeline with 7 types, frontend ECA-first with static fallback.
- ✅ **Chat Commands** -- `/learn`, `/recall`, `/wisdom`, `/build canvas|empathy|valueprop|mvp` commands (ready)
- ✅ **Progressive Disclosure** -- Builder stage suggestions, contextual help
- ✅ **Product Development Flywheel** -- Empathy Map -> Value Proposition -> MVP -> Lean Canvas with learning integration

**Decommissioned**:
- ✗ MCP server (functionality delegated to ECA)
- ✗ Internal AI/agent system (delegated to ECA)
- ✗ Skill system (replaced by learning flywheel)

**Next Phase**: Code health (websocket split, test coverage) then production hardening (container isolation, metrics export).

**Recent Architectural Changes**:
- **Single project per instance** -- removed multi-project CRUD, workspace auto-detected from `user.dir`
- **Cleaned frontend pages** -- removed Users/Sessions pages (chat-platform data not relevant in WebUX model)
- **Simplified navbar** -- Dashboard, Project, Wisdom, Telemetry + AI Chat toggle
- **Simplified dashboard** -- System Status + Telemetry cards only (no users/sessions summary)
- **Cleaned backend** -- Removed `ouroboros.auth` and `ouroboros.chat` from page-level data loading in `query.clj`

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
- ✅ Chat panel context suggestions (ECA-generated with fallback)

### Phase C: Continuous Wisdom -- COMPLETE ✅

Builder persistence and auto-insight pipeline fully wired:
- ✅ Backend `save-builder-data!` handler with completion detection
- ✅ Auto-insight trigger on builder completion (ECA streaming)
- ✅ Learning memory storage for generated insights
- ✅ Frontend builder persistence with 500ms debounced WebSocket sync
- ✅ Frontend auto-insight display in wisdom sidebar

- ⚠️ Undo/redo mutations don't sync to backend yet

### Phase D: Dynamic Content -- COMPLETE ✅

All hardcoded static content replaced with ECA-powered dynamic content:
- ✅ Analytics dashboard with REAL data (backend-computed from project/session data)
- ✅ ECA-streamed prediction messages for analytics
- ✅ Generic `content/generate` handler with 7 content types
- ✅ Wisdom page templates and learning categories from ECA
- ✅ Chat panel suggestions from ECA with fallback
- ✅ Flywheel phase descriptions from ECA
- ✅ Builder section hints from ECA
- ✅ Hardcoded insight/suggestion/prediction TEXT strings emptied (computation logic preserved)
- ✅ Frontend ECA-first pattern: request on mount, show fallback while loading

### P0: Code Health (from Compound Engineering Analysis, 2026-02-12)

External analysis against compound-engineering-plugin revealed critical gaps:

| Area | Current | Target | Priority |
|------|---------|--------|----------|
| ~~God objects~~ | ~~websocket.clj 1420 LOC, websocket.cljs 1704 LOC~~ | Max ~400 LOC per file | ✅ **Already split** (141 LOC, ~100 LOC) |
| ~~wisdom.clj~~ | ~~643 LOC~~ | <200 LOC | ✅ **Done** (369 LOC after template extraction) |
| Test coverage | 36 test files, 99 tests | 60%+ | ✅ **Core modules covered** |

**Updated (2026-02-19)**: STATE.md previously claimed websocket files were "god objects" but they were already split into `ws.*` modules. Wisdom.clj templates extracted to `resources/canvas_templates.edn`.

### Next Priorities
1. **WebSocket Split** -- Break god objects into handler modules (~400 LOC max each)
2. **Test Coverage** -- Priority: resolver-registry, eca-client, websocket handlers, analytics, wisdom
3. **Metrics Export** -- Prometheus/OpenTelemetry format for production monitoring
4. **Container Isolation** -- OS-level isolation for ECA execution

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [PLAN](PLAN.md) · [LEARNING](LEARNING.md) · [CHANGELOG](CHANGELOG.md)
