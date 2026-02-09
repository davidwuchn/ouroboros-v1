# PLAN.md

> Next steps and future directions for Ouroboros.
> Last Updated: 2026-02-09

## Summary of External Project Analysis

This plan incorporates lessons from analyzing similar projects:

### From [Agent Zero](https://github.com/agent0ai/agent-zero) (14.3k stars, Python AI framework):
1. **Hierarchical Agent System** - Superior/subordinate agents for context management (P1)
2. **Context Summarization** - Tiered compression (recent=full, older=summarized) (P1)
3. **Prompt-Driven Architecture** - All behavior defined in prompt files (P2)
4. **Projects/Workspaces** - Isolated environments with scoped memory/knowledge (P1 - Complete)
5. ~~**Instruments**~~ - On-demand capabilities managed by ECA skills system (DELEGATED)
6. **Extension Points** - Lifecycle hooks for customization without core changes (P2)
7. **Dynamic Behavior** - Runtime behavior rules persisted across sessions (P2)
8. **Docker-First Deployment** - Everything runs in container for consistency (P2)

### From [NanoClaw](https://github.com/gavrielc/nanoclaw):
1. **Container Isolation** - Add OS-level container isolation for AI execution (P1)
2. **Per-Channel Isolation** - Filesystem isolation per chat channel (P1)
3. **Minimal Configuration** - Reduce config sprawl (P2)

### From [Nanobot](https://github.com/HKUDS/nanobot) (7.9k stars, ultra-lightweight):
1. **Message Bus Architecture** - Decouple channels from agent core with async queues (P1)
2. **Heartbeat/Proactive Scheduling** - Wake agent periodically for background tasks (P1)
3. **Cron Service** - Built-in scheduled task execution with CLI management (P1)
4. **Per-Channel Session Persistence** - JSONL files per channel with compaction (P1)
5. **Ultra-Lightweight Philosophy** - Modular core vs optional features (P2)

See detailed analysis sections below for specific recommendations.

## Current Status

**ARCHITECTURE SHIFT** — ECA integration model active:
- Chat platforms (Telegram, Discord, Slack) = core Ouroboros value
- AI/LLM capabilities delegated to ECA (Editor Code Assistant)
- Ouroboros = ECA "editor client" for chat platforms

**Status Key:** ✅ Done | ◐ Partial | 📋 Planned | ✗ Removed

| Feature | Status | Notes |
|---------|--------|-------|
| Learning Memory System | ✅ Done | Store/recall insights, patterns, wisdom |
| Educational Approval | ✅ Done | Tool approvals with risk explanations |
| Interface Integration | ✅ Done | Lazy-loaded APIs for learning |
| Approval Bridge Integration | ✅ Done | Educational messages for approvals |
| Chat Commands | ✅ Done | `/learn`, `/recall`, `/wisdom`, `/build` |
| Progressive Disclosure | ✅ Done | Builder stage suggestions, contextual help |
| Product Development Flywheel | ✅ Done | Empathy→ValueProp→MVP→Canvas |
| Web UX Platform | ✅ Done | 5 phases: canvas, collaboration, wisdom, analytics, embed |
| Clojure Code Quality Automation | ◐ Partial | clj-kondo linting in CI, 52 unused binding warnings to clean up |
| ECA IPC Byte-Level Reader | ✅ Done | Fixed UTF-8 framing bug in JSON-RPC reader (BufferedInputStream) |
| **Streaming Responses** | **✅ Done** | **5-layer pipeline: ECA -> chat platforms + frontend WebSocket chat sidebar** |
| **Flywheel UI** | **✅ Done** | **Step indicator, wisdom sidebar, phase cards, auto-start Empathy Map** |
| **ECA-Powered Wisdom (A+B)** | **✅ Done** | **Backend + Frontend complete. Wisdom sidebar, flywheel progress, wisdom page stream from ECA. Phase C (Continuous Wisdom) next.** |

**Key Insight**: Ouroboros now has the foundation to transform from **utility assistant** to **wisdom partner** by creating a learning flywheel where each interaction builds understanding, context, and transferable knowledge.

## ECA Integration Strategy ✅

### Why ECA?

ECA (Editor Code Assistant) is a battle-tested Clojure-based AI coding assistant:
- **613 stars**, 37 forks, v0.98.1 (near 1.0)
- Editor plugins for Emacs, VSCode, Vim, IntelliJ
- **10+ LLM providers** (Anthropic, OpenAI, Copilot, Ollama, Deepseek, etc.)
- MCP client with HTTP/SSE/stdio transport
- Enterprise-grade tool calling, context management, session handling

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ECA-INTEGRATED ARCHITECTURE                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Telegram/Discord/Slack/WebSocket                               │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                    Ouroboros                             │    │
│  │                                                          │    │
│  │  ┌───────────────┐    ┌────────────────────────────┐    │    │
│  │  │ Chat Adapters │───►│ Ouroboros-ECA Protocol      │────┼──►│
│  │  │               │    │ (JSON-RPC over stdio)       │    │    │
│  │  └───────────────┘    └────────────────────────────┘    │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Ouroboros Tools (Git, Memory, HTTP, Knowledge)    │   │    │
│  │  │ ← Exposed to ECA via direct integration          │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Tool Approval Bridge                             │   │    │
│  │  │ - Forward tool calls to chat platforms          │   │    │
│  │  │ - Wait for user approval                         │   │    │
│  │  │ - Send approval/rejection back to ECA           │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Memory & Session Context                         │   │    │
│  │  │ - Persistent conversation history                │   │    │
│  │  │ - Ouroboros-unique features (no overlap with ECA)│   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Dashboard & Observability                        │   │    │
│  │  │ - System health, metrics, audit logs             │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                            │                                     │
│                            │ ECA Client (JSON-RPC)               │
│                            ▼                                     │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │                       ECA Binary                        │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ LLM Routing Layer                                 │   │    │
│  │  │ - Anthropic, OpenAI, Copilot, Ollama, Deepseek  │   │    │
│  │  │ - Model fallback, token management               │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Tool Engine                                      │   │    │
│  │  │ - File system, grep, edit, completion          │   │    │
│  │  │ - MCP client for external tools                  │   │    │
│  │  │ - Context management (repoMap, index, hooks)   │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  │                                                          │    │
│  │  ┌──────────────────────────────────────────────────┐   │    │
│  │  │ Chat Interface                                  │   │    │
│  │  │ - Prompt handling, streaming                     │   │    │
│  │  │ - Tool approval workflow                        │   │    │
│  │  │ - Message formatting, diff display              │   │    │
│  │  └──────────────────────────────────────────────────┘   │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### What Ouroboros Provides (Unique Value)

| Component | Description | Status |
|-----------|-------------|--------|
| **Chat Adapters** | Telegram, Discord, Slack, WebSocket | ✅ Existing |
| **Memory System** | Persistent conversation context, JSONL storage | ✅ Existing |
| **Tool Approval Bridge** | Forward tool calls to chat for approval | ✅ Done |
| **ECA Protocol Client** | JSON-RPC communication with ECA | ✅ Done |
| **Web UX Platform** | Interactive product development workspace with learning flywheel | 📋 New |
| **Dashboard** | Web UI for monitoring | ✅ Existing |

### What ECA Provides (Delegated)

| Component | Description | Benefit |
|-----------|-------------|---------|
| **LLM Providers** | Anthropic, OpenAI, Copilot, Ollama, etc. | 10+ providers, battle-tested |
| **Tool Engine** | File read/write, grep, completion | Editor-grade UX |
| **Context Management** | repoMap, file indexing, workspace | Sophisticated context |
| **Chat Interface** | Streaming, tool display, diffs | Rich interaction |
| **Protocol** | JSON-RPC 2.0 over stdio | Standard, well-defined |

### ECA Protocol Methods (What Ouroboros Implements)

```clojure
;; Ouroboros → ECA (requests)
"initialize"          ;; Handshake with capabilities
"chat/prompt"         ;; Send message to LLM
"chat/queryContext"  ;; Get context (repoMap, files, etc.)
"chat/queryFiles"     ;; Search files
"chat/queryCommands" ;; Available commands

;; ECA → Ouroboros (notifications/callbacks)
"chat/content-received"   ;; Assistant response
"chat/toolCallApprove"    ;; Request tool approval
"chat/toolCallReject"     ;; Tool call rejected
"chat/promptStop"         ;; Streaming stopped
```

### Tool Approval Flow (Critical for Security)

```
User: "Read config.json and summarize"
     │
     ▼
ECA: chat/prompt → Assistant: "I'll read the file"
     │
     ▼
ECA → Ouroboros: chat/toolCallApprove
  {tool: "file/read", params: {path: "config.json"}}
     │
     ▼
Ouroboros → Telegram: "🔧 Allow file/read on config.json?"
     │
     User clicks ✅ or ❌
     │
     ▼
Ouroboros → ECA: chat/toolCallApprove (or Reject)
     │
     ▼
ECA continues or aborts
```



### ECA Integration Status

| Phase | Status | Notes |
|-------|--------|-------|
| 1: ECA Protocol Client | ✅ Done | JSON-RPC, handshake, lifecycle |
| 2: Tool Approval Bridge | ✅ Done | Forward to chat, callbacks, timeouts |
| 3: MCP Server | ✗ Removed | Delegated to ECA |
| 4: Polish & Integration | ✅ Done | Docs, tests, release notes |

**Completed:**
- [x] End-to-end integration tests (12 tests)
- [x] Release notes (CHANGELOG.md updated)
- [x] Protocol compatibility tests (18 tests)
- [x] User ID tracking from sessions (TODO fixed)

### What Gets Removed/Deprecated

| Component | Reason | Replacement |
|-----------|--------|-------------|
| `ouroboros.ai` | LLM routing | ECA |
| `ouroboros.agent` | AI agent | ECA chat |
| `ouroboros.tool-defs` (partial) | Redundant file/* tools | ECA file tools |
| `ouroboros.schema` | Schema validation | ECA validation |



### Risk Assessment

| Risk | Mitigation |
|------|------------|
| ECA dependency | Version pinning, monitoring upstream releases |
| Protocol changes | Test suite for protocol compatibility |
| Tool approval latency | Async handling, timeout defaults |
| No ECA binary | Docker image with embedded ECA |

### Comparison

| Aspect | Before (Internal AI) | After (ECA Integration) |
|--------|---------------------|-------------------------|
| LLM Providers | ~3 | 10+ |
| Editor Features | None | Full |
| Maintenance | High (own LLM code) | Low (ECA updates) |
| Tool Approval | Custom | ECA-native |
| Protocol | Ad-hoc | JSON-RPC (standard) |

### Migration Path

1. **Parallel Run** — Run both internal AI and ECA, compare outputs
2. **Gradual Shift** — Route specific chat platforms to ECA first
3. **Full Migration** — Remove internal AI once stable

---

## Immediate Priorities

### 0. ECA-Powered Wisdom (P0) -- PHASE A+B COMPLETE ✅

**Problem**: The flywheel UI has wisdom components (tips, templates, suggestions, guidance) but all content is **static hardcoded `def` blocks**. The chat sidebar has a working ECA pipeline (streaming, WebSocket, Fulcro state) but the wisdom features don't use it. Knowledge and guidance should come from ECA/LLM, not from code.

**Architecture Principle**: **WebUX = state/CRUD/interaction. ECA = knowledge/wisdom/guidance.**

The user interacts with WebUX builders (drag sticky notes, fill empathy map sections, etc). When they need guidance, tips, or analysis, that comes from ECA via the LLM -- not from hardcoded strings.

**Static Content to Replace**:

| Location | Static Content | Replacement |
|----------|---------------|-------------|
| `components.cljs:wisdom-tips` | 20 tips (5/phase), taglines | ECA generates tips from actual project data |
| `components.cljs:wisdom-sidebar` | Renders static tips | Renders ECA-generated contextual insights |
| `wisdom.cljs:templates` | 6 product templates | ECA suggests templates based on project context |
| `wisdom.cljs:learning-categories` | 4 categories, count=0 | Query actual learning data from backend memory |
| `wisdom.cljs:Quick Tips` | 4 inline tip cards | ECA-generated insights from project patterns |
| `project_detail.cljs:flywheel-phases` | Phase descriptions, time estimates | ECA-enriched with project-specific guidance |
| `project_detail.cljs:guidance text` | "Follow the flywheel..." static text | Reflects actual project state + ECA recommendations |
| `project_detail.cljs:current-step` | Hardcoded `:empathy` | Read actual progress from backend project state |
| `chat_panel.cljs:context-suggestions` | 28 prompt suggestions | ECA generates context-aware suggestions |

**Implementation Plan**:

#### Phase A: Backend -- Wisdom via ECA (P0) ✅ COMPLETE

1. **Project context assembly**: ✅ Build rich context from project data (empathy map entries, value prop fields, canvas sections) and pass to ECA as system prompt context
2. **Wisdom query endpoint**: ✅ New WebSocket message type `eca/wisdom` that sends project context + phase to ECA and gets back structured guidance (tips, next steps, analysis)
3. **Flywheel progress tracking**: ✅ Store phase completion status per project in backend state (not just "current step = empathy")
4. **Learning memory query**: ✅ Expose actual learning/insight counts and recent entries via EQL resolvers

#### Phase B: Frontend -- Dynamic Wisdom Components (P0) ✅ COMPLETE

1. **Wisdom sidebar**: ✅ Replace static `wisdom-tips` with ECA-generated content fetched on sidebar open
2. **Project detail page**: ✅ Read actual flywheel progress from backend state, show ECA-recommended next phase
3. **Chat suggestions**: ⚠️ Deferred -- `context-suggestions` still static (28 prompts). Will replace with ECA-generated suggestions.
4. **Wisdom page**: ✅ Quick Tips section now ECA-powered with static fallback. Templates/categories structural (OK static).
5. **Loading states**: ✅ Show streaming indicator while ECA generates wisdom content

#### Phase C: Continuous Wisdom (P1) -- NEXT

1. **Auto-insights**: When user completes a builder section, trigger ECA analysis in background
2. **Cross-project patterns**: ECA analyzes patterns across all user's projects
3. **Wisdom memory**: Store generated insights in learning memory for reuse
4. **Progressive depth**: First visit = basic tips, repeated visits = deeper analysis based on accumulated context

### 1. Production Readiness (P1)
- **Container Isolation** — OS-level container isolation for ECA execution
- **Per-Channel Isolation** — Filesystem isolation per chat channel/platform  
- **Metrics export** — Prometheus/OpenTelemetry format for monitoring
- **Streaming responses** -- ECA streaming to chat platforms ✅ DONE (5-layer pipeline + frontend WebSocket)
- **Protocol compatibility tests** — Ensure Ouroboros works with ECA versions
- **Config unification** — Single config for Ouroboros + ECA settings

#### Streaming Responses -- COMPLETE ✅

| Layer | File | What | Status |
|-------|------|------|--------|
| 1 | `protocol.clj` | `EditableAdapter` protocol with `edit-message!` | ✅ Done |
| 2 | `adapters.clj` | `edit-message!` for Telegram/Discord/Slack + return message-id | ✅ Done |
| 3 | `eca_client.clj` | Multi-listener callbacks, reasoning notifications | ✅ Done |
| 4 | `chat.clj` | Streaming bridge: ECA notifications -> chat with debounced edits | ✅ Done |
| 5 | `chat.clj` | Rewritten `handle-natural-message` for streaming flow | ✅ Done |
| 6 | `websocket.clj` | Backend WS handler for eca/chat with auto-start ECA | ✅ Done |
| 7 | `chat_panel.cljs` | Frontend chat sidebar with streaming tokens | ✅ Done |
| 8 | `websocket.cljs` | WS message handlers + Fulcro render scheduling | ✅ Done |

**Key design decisions:**
- Rate limiting: Debounce message edits (Telegram: 30/sec, Discord: 5/sec)
- Multi-chat: Key streaming state by chat-id + prompt correlation
- Backward compatible: `edit-message!` optional in protocol (existing adapters still work)
- Follow existing pattern: `eca_approval_bridge.clj` for ECA->chat forwarding

### 2. Test Coverage
- [x] Chat adapter tests (protocol compliance)
- [x] Tool execution tests (all 13 tools)  
- [x] Error handling tests (boundary conditions)
- [ ] **Integration tests** — Full chat flow with ECA (remaining)

### 3. Observability & Performance (P2)
- **Structured logging** — JSON format with correlation IDs
- **Distributed tracing** — Trace tool calls across system
- **Audit logging** — Compliance-ready logs of AI actions
- **Query caching** — Pathom resolver caching
- **Connection pooling** — HTTP client pooling
- **Memory optimization** — Event buffer sizing, lazy loading

### 4. Developer Experience (P2)
- **Clojure code quality automation** — clj-kondo linting, cljfmt formatting
- **REPL-driven debugging guide** — Document patterns for interactive development
- **Custom tool development tutorial** — SDK for third-party tool authors
- **Tool testing framework** — Built-in testing utilities

**Note:** Web UX Platform is complete (all 5 phases). ECA Integration core is complete. Infrastructure hardening and P0 security features are complete.

## Security Architecture (New - Feb 2025)

Based on analysis of [Moltbook incident](https://x.com/DavidOndrej1/status/2017945523060088934) and emerging AI agent threats:

### Core Security Principles

1. **Never Trust External Input** — Every webpage, file, and user message may contain prompt injection. Assume compromise.
2. **Tool Access ≠ Intelligence** — An agent with email + calendar + browser is a loaded weapon, not a feature.
3. **Quarantine After Exposure** — After processing external content, restrict tool chaining. One injection + 10 tool calls = disaster.
4. **Human Confirmation for Destructive Ops** — File write, shell exec, API calls with side effects require explicit approval.
5. **Schema Validation is Mandatory** — LLM outputs are probabilistic. Validate tool calls against schemas before execution.

### Threat Model: The Moltbook Pattern
```
Attacker injects hidden instructions in webpage
    ↓
Agent fetches webpage via :http/get
    ↓
LLM processes content, "decides" to call :file/read, :email/send
    ↓
Agent executes chained tools, exfiltrates data, locks user out
```

**Ouroboros Defense Layers**:
- Input sanitization (strip injection patterns)
- Quarantine (mark external content, limit chaining)
- Tool chaining limits (max 1 tool after external input)
- Confirmation gates (human approval for destructive ops)
- Schema validation (reject malformed tool calls)
- Audit logging (detect and respond to attacks)

## Web UX Platform Initiative (New - Feb 2025)

**Vision**: Transform Ouroboros from chat-based assistant to collaborative product development platform with dedicated web interface.

**Core Value**: Teams move from scattered conversations to structured wisdom-building with persistent artifacts, real-time collaboration, and integrated learning memory.

### Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                  WEB UX CLIENT ARCHITECTURE              │
├─────────────────────────────────────────────────────────┤
│  Fulcro/ClojureScript App                               │
│  • Interactive builders (Empathy→ValueProp→MVP→Canvas)  │
│  • Real-time collaboration (WebSocket)                  │
│  • Integrated chat with ECA                             │
│  • Wisdom building dashboard                            │
└─────────────────────────────────────────────────────────┘
```

### Key Features

1. **Workspace Dashboard** - Project gallery, progress tracking, team collaboration
2. **Interactive Builders** - Visual editors for each flywheel stage
3. **Integrated Chat** - Context-aware messaging with ECA AI assistant
4. **Wisdom Building** - Learning insights, pattern recognition, template library
5. **Collaboration** - Live editing, comments, version history, export

### Web UX Platform — COMPLETE ✅

The Web UX Platform is now a fully functional collaborative product development environment with AI assistance.

**Completed in 10 weeks:**
- **Phase 1** (Weeks 1-2): Foundation — Project scaffolding, data model, basic builders
- **Phase 2** (Weeks 3-4): Interactive Builders — Visual canvas, drag-and-drop, sticky notes
- **Phase 3** (Weeks 5-6): Collaboration — Multi-user presence, cursors, comments, versions
- **Phase 4** (Weeks 7-8): Wisdom & AI — Templates, insights, ECA integration
- **Phase 5** (Weeks 9-10): Polish & Scale — Offline sync, analytics, embedding API, onboarding

### Architecture Summary

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         WEB UX PLATFORM ARCHITECTURE                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │   Frontend   │  │  Frontend    │  │  Frontend    │  │  Frontend   │ │
│  │   Canvas     │  │ Collaboration│  │   Wisdom     │  │  Analytics  │ │
│  │ Components   │  │ Components   │  │ Components   │  │ Components  │ │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘ │
│         │                 │                 │                 │        │
│  ┌──────┴─────────────────┴─────────────────┴─────────────────┴──────┐ │
│  │                      Fulcro/React Frontend                          │ │
│  │  • Visual builders (Empathy, Value Prop, MVP, Canvas)              │ │
│  │  • Drag-and-drop sticky notes                                      │ │
│  │  • Real-time collaboration UI                                      │ │
│  │  • AI assistant panel                                              │ │
│  └──────┬─────────────────────────────────────────────────────────────┘ │
│         │                                                               │
│  ┌──────┴─────────────────────────────────────────────────────────────┐ │
│  │                      WebSocket Layer                                │ │
│  │  • Cursor positions • Presence updates • Comments • Versions        │ │
│  └──────┬─────────────────────────────────────────────────────────────┘ │
│         │                                                               │
│  ┌──────┴─────────────────────────────────────────────────────────────┐ │
│  │                      Pathom/EQL Backend                             │ │
│  ├──────────────┬──────────────┬──────────────┬──────────────┬────────┤ │
│  │    WebUX     │ Collaboration│    Wisdom    │   Analytics  │ Offline│ │
│  │   (CRUD)     │  (Presence)  │  (AI/ML)     │   (Metrics)  │  (Sync)│ │
│  └──────────────┴──────────────┴──────────────┴──────────────┴────────┘ │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Feature Matrix

| Feature | Phase | Backend | Frontend | Status |
|---------|-------|---------|----------|--------|
| Project CRUD | 1 | ✅ | ✅ | Complete |
| Canvas Builders | 2 | ✅ | ✅ | Complete |
| Sticky Notes (9 colors) | 2 | ✅ | ✅ | Complete |
| Drag & Drop | 2 | ✅ | ✅ | Complete |
| Real-time Collaboration | 3 | ✅ | ✅ | Complete |
| Cursor Tracking | 3 | ✅ | ✅ | Complete |
| Comments | 3 | ✅ | ✅ | Complete |
| Version History | 3 | ✅ | ✅ | Complete |
| AI Insights | 4 | ✅ | ✅ | Complete |
| Template Library (4 types) | 4 | ✅ | ✅ | Complete |
| ECA Integration | 4 | ✅ | ✅ | Complete |
| Offline Sync | 5 | ✅ | ✅ | Complete |
| Conflict Resolution | 5 | ✅ | ✅ | Complete |
| Analytics Dashboard | 5 | ✅ | ✅ | Complete |
| Success Prediction | 5 | ✅ | ✅ | Complete |
| Embedding API | 5 | ✅ | ✅ | Complete |
| JavaScript SDK | 5 | ✅ | ✅ | Complete |
| Onboarding Tours | 5 | ✅ | ✅ | Complete |

### Implementation Phases

#### Phase 1: Foundation (Week 1-2) ✅
- [x] Extend Fulcro router with project/builder routes (projects, project detail, empathy builder routes added)
- [x] Project data model and basic builder UI (webux.clj data model, projects UI, empathy/value-prop/MVP/lean-canvas builder UI)
- [x] Backend resolvers for projects and builder sessions (webux.clj resolvers registered)
- [x] Single-user persistence (memory system per instance)

#### Phase 2: Interactive Builders (Week 3-4) ✅ COMPLETE
- [x] Rich canvas components (drag-and-drop, visual editors)
- [x] Real-time updates via WebSocket (backend broadcasting complete)
- [x] Validation completed: all tests pass, broadcast functions verified
- [x] Sticky notes with 9 color variants
- [x] Visual layouts: Empathy Map (2x3 grid), Lean Canvas (9-box)
- [x] Export to JSON functionality
- [x] Mobile responsive layouts

**New Components:**
- `canvas-components.cljs` - Rich canvas UI library
  - `StickyNote` - Draggable sticky notes with edit capability
  - `CanvasSection` - Drop zones for organizing notes
  - `EmpathyMapCanvas` - Visual 2x3 empathy map layout
  - `LeanCanvas` - Business model canvas (9-box layout)
  - `canvas-toolbar` - Export, share, present actions

#### Phase 3: Collaboration (Week 5-6) ✅ COMPLETE
- [x] Multi-user presence (cursor tracking, user avatars)
- [x] Live editing (operational transforms for concurrent edits)
- [x] Comment system on canvas elements
- [x] Version history and snapshots
- [x] Team management foundation (join/leave, user colors)

**New Components:**
- `collaboration.clj` - Backend collaboration engine
  - `join-session!` / `leave-session!` - User presence
  - `update-cursor!` - Real-time cursor tracking
  - `apply-operation!` - Operational transform for edits
  - `add-comment!` / `resolve-comment!` - Comment threads
  - `create-snapshot!` / `restore-version!` - Version history

- `collaboration_components.cljs` - Frontend collaboration UI
  - `UserPresenceList` - Live user avatars with colors
  - `RemoteCursor` / `CursorOverlay` - Cursor tracking display
  - `CommentThread` - Inline comment discussions
  - `VersionHistory` - Snapshot/restore sidebar
  - `CollaborationSidebar` - Unified collaboration panel

#### Phase 4: Wisdom & AI (Week 7-8) ✅ COMPLETE
- [x] Integrated chat with ECA and project context
- [x] Learning insights panel and pattern recognition
- [x] Template library and wisdom dashboard
- [x] AI-assisted builder suggestions

**New Components:**
- `wisdom.clj` - AI insight engine
  - `get-template` / `list-templates` - Template library (SaaS, Marketplace, Mobile App, Dev Tool)
  - `analyze-learning-patterns` - Pattern recognition from user history
  - `generate-insights` - AI insight generation from canvas data
  - `suggest-next-step` - Smart progression suggestions
  - `assemble-context` / `format-for-eca` - ECA prompt assembly

- `wisdom_components.cljs` - Frontend wisdom UI
  - `TemplateLibrary` - Pre-built canvas templates
  - `AIInsight` / `InsightsPanel` - AI-generated suggestions
  - `LearningDashboard` - User pattern visualization
  - `NextStepSuggestion` - Smart next action prompts
  - `ECAChatPanel` - Integrated AI assistant
  - `WisdomSidebar` - Unified wisdom panel

**Templates Available:**
- SaaS Product - Cloud-based automation platform
- Two-Sided Marketplace - Low-fee marketplace with seller tools
- Consumer Mobile App - B2C mobile application
- Developer Tool - Open source developer productivity tool

#### Phase 5: Polish & Scale (Week 9-10) ✅ COMPLETE
- [x] Performance optimization (virtual scrolling, lazy loading)
- [x] Offline support (operation queue, conflict resolution, session persistence)
- [x] Advanced visualizations (progress gauges, funnel charts, velocity metrics)
- [x] API for embedding (iframe, JavaScript SDK, webhooks, CORS)
- [x] Documentation and onboarding tours
- [ ] Mobile app (PWA or React Native) — Deferred to Phase 6

**New Components:**
- `offline_sync.clj` - Offline operation queue and conflict resolution
  - `queue-operation!` / `sync-session!` - Offline operation management
  - `detect-conflicts` / `resolve-conflicts!` - Conflict detection and resolution
  - `save-session-state!` / `load-session-state` - Session persistence
  - Optimistic updates with rollback support

- `analytics.clj` - Analytics and metrics engine
  - `project-progress` - Stage completion tracking
  - `completion-funnel` - Drop-off analysis
  - `team-velocity` - Productivity metrics
  - `calculate-health-score` / `predict-success` - Success prediction

- `embed.clj` - Embedding API for third-party integration
  - `generate-token` / `validate-token` - Secure embed tokens
  - `generate-iframe-html` / `generate-sdk-js` - iframe and SDK generation
  - `register-webhook!` / `trigger-webhook` - Webhook support
  - CORS configuration for cross-origin embedding

- `analytics_components.cljs` - Frontend analytics visualizations
  - `progress-gauge` - Circular progress indicators
  - `funnel-chart` - Completion funnel visualization
  - `health-score-display` - Project health dashboard
  - `velocity-chart` - Team velocity over time
  - `prediction-card` - Success likelihood prediction

- `onboarding.cljs` - Guided tours and onboarding
  - `ActiveTour` - Step-by-step guided tours
  - `TourLauncher` - Tour selection and progress
  - `ContextualTooltip` - Contextual help tooltips
  - Keyboard shortcuts help

### Integration Points

- **Chat Platforms** - Notifications, approval requests via Telegram/Discord/Slack
- **ECA** - AI assistant with project context, builder suggestions
- **Learning Memory** - Auto-save insights, pattern application, wisdom transfer
- **Existing Dashboard** - Extend current Fulcro app with new builder pages

### Success Metrics

- **Builder Completion Rate** - % of projects reaching Lean Canvas
- **Time to Canvas** - Average time from empathy to complete business model
- **Team Collaboration** - % of projects with multiple contributors
- **Wisdom Application** - Frequency of learning insight reuse

### First Steps (Next 48 hours)
1. ✅ Create project scaffolding (builder pages created, chat/wisdom pending)
2. ✅ Extend existing dashboard with Projects page (added to router)
3. ✅ Build static empathy map builder with backend integration
4. ✅ Update navigation and routing (root.cljs updated)

**Bug fix**: Added missing `memory/swap!` function to enable webux resolvers (all tests pass).

**Impact**: Creates virtuous cycle where teams build better products using structured methodology, every interaction generates wisdom, and success patterns propagate across the organization.

## Architecture Improvements

Based on analysis of [OpenClaw architecture](https://deepwiki.com/openclaw/openclaw) and Claude Code's design ([reference](https://x.com/hesamation/status/2017038553058857413)), the following improvements are prioritized:

### Execution Reliability (P0) ✅ COMPLETE
- [x] **Lane-based command queues** — Serialize session operations by default, parallel only when explicitly safe. Eliminates race conditions and "async spaghetti."
- [x] **Context window guard** — Monitor token usage, compact/summarize when near limit. Prevents crashes from oversized contexts.

### Memory & Search (P1) ✅ COMPLETE
- [x] **Hybrid memory system** — JSONL transcripts + Markdown files + Vector/FTS5 search (SQLite). Semantic + keyword search.
- [x] **Session compaction** — Auto-summarize old conversation turns, keep recent verbatim.

### Safety & Sandboxing (P0) ✅ COMPLETE
- [x] **Tool sandboxing layer** — Execute tools with timeouts, memory limits, and resource constraints. Prevents runaway tools from crashing system.
- [x] **Tool allowlists** — Per-session/per-user tool permissions. Restrict which tools AI can invoke based on context.
- [x] **Sandboxed code execution** — Docker/container-based shell execution with configurable safety profiles.
- [x] **Prompt injection protection** — Sanitize user inputs and external content before LLM processing. Block known injection patterns.
- [x] **Human-in-the-loop confirmation** — Require explicit approval for dangerous operations (file/write, shell/exec, memory/clear, etc.).
- [x] **Tool chaining limits** — Restrict number of sequential tool calls after processing external input (web, files, user messages).
- [x] **Output schema validation** — Validate LLM tool calls against schemas before execution. Reject malformed calls.
- [x] **Quarantine for external content** — Mark and restrict tool access after processing untrusted web content or files.

**Security Alert**: See [Moltbook analysis](https://x.com/DavidOndrej1/status/2017945523060088934) — AI agents with excessive tool access are vulnerable to prompt injection attacks. An agent that can browse the web AND access email/calendar/files is one hidden webpage instruction away from compromise. **Principle: Never trust external input. Never chain dangerous tools after untrusted content.**

### Agent Capabilities (P1-P2) 📋 DELEGATED TO ECA
The following are now delegated to ECA:
- [x] **LLM Routing** — Handled by ECA (10+ providers)
- [x] **Tool Engine** — Handled by ECA (filesystem, grep, completion)
- [x] **Context Management** — Handled by ECA (repoMap, index, hooks)
- [x] **Chat Interface** — Handled by ECA (streaming, diff display)

Ouroboros focuses on:
- [ ] **Tool Approval Bridge** — Forward tool calls to chat platforms for approval
- [x] **Chat Platform Integration** — Telegram, Discord, Slack, WebSocket (Done)

### Observability (P2) 📊 PRODUCTION READINESS
- [ ] **Metrics export** — Prometheus/OpenTelemetry format for monitoring systems.
- [ ] **Structured logging** — JSON format option with correlation IDs for distributed tracing.
- [ ] **Distributed tracing** — Trace tool calls across the system for debugging.
- [ ] **Audit logging** — Compliance-ready logs of all AI actions and tool invocations.
- [ ] **Tool usage heatmaps** — Visualize tool usage patterns over time for optimization.
- [ ] **Latency percentiles** — P50/P95/P99 tracking for performance monitoring.

## Medium Term

### Performance
- [ ] **Query caching** — Pathom resolver caching for frequently accessed data.
- [ ] **Connection pooling** — HTTP client pooling for API calls and chat platforms.
- [ ] **Memory optimization** — Event buffer sizing, lazy loading for large datasets.
- [x] **Streaming responses** -- ECA streaming wired to chat platforms + frontend WebSocket. ✅ DONE

### Developer Experience
- [ ] **REPL-driven debugging guide** — Document patterns for interactive development.
- [ ] **Custom tool development tutorial** — SDK for third-party tool authors.


- [ ] **Tool testing framework** — Built-in testing utilities for tool validation.

### Platform Expansion
- [ ] **Additional chat platforms** — WhatsApp, Matrix, IRC adapters.
- [ ] **Voice integration** — Speech-to-text and text-to-speech capabilities.
- [ ] **Multi-modal support** — Image understanding and generation.
- [ ] **Message formatting** — Rich formatting (markdown, code blocks, interactive elements).

### ECA Integration (Short-term)
- [ ] **Protocol compatibility tests** — Ensure Ouroboros works with ECA versions.
- [ ] **Fallback mode** — Internal AI for when ECA is unavailable.
- [ ] **Config unification** — Single config for Ouroboros + ECA settings.

## Long Term / Research

### Persistence & State
- [ ] **Datomic/Datalevin integration** — Alternative to EDN/SQLite for large-scale deployments.
- [ ] **Event sourcing** — Reconstruct system state from event log.
- [ ] **Multi-node state sync** — Redis/etcd for shared state across instances.

### Scaling
- [ ] **Horizontal scaling** — Load balancing across multiple Ouroboros instances.
- [ ] **Webhook-based adapters** — Serverless chat adapter option.
- [ ] **Kubernetes operator** — Native K8s deployment and management.

### Enterprise Features
- [ ] **OAuth2/SAML authentication** — Enterprise SSO integration.
- [ ] **RBAC expansion** — Granular permissions beyond admin/user roles.
- [ ] **Compliance frameworks** — SOC2, GDPR, HIPAA considerations.
- [ ] **Data retention policies** — Automated cleanup with legal hold support.

### AI Research (DELEGATED TO ECA)
These are now handled by ECA:
- [x] Fine-tuning pipeline — Use ECA's provider configuration
- [x] Reasoning traces — Use ECA's chat interface
- [x] Multi-agent coordination — Use ECA's MCP capabilities
- [x] Local model support — Use ECA's Ollama integration

## Completed Recently

| Date | Achievement |
|------|-------------|
| 2026-02-01 | Interface.clj refactor — 13 focused namespaces from God Object |
| 2026-02-01 | Platform definition and test restructuring |
| 2026-02-01 | Docker + CI/CD implementation |
| 2026-02-01 | Tool registry restructuring (circular dependency eliminated) |
| 2026-02-01 | Comprehensive test suite (32+ tests) |
| 2026-02-01 | Error handling test coverage complete |
| 2026-02-01 | P0 Safety & Sandboxing — Tool sandboxing, allowlists, Docker execution |

| 2026-02-02 | Security audit — Prompt injection analysis, threat modeling from Moltbook incident |
| 2026-02-02 | P0 Security Complete — Prompt injection protection, human confirmation, tool chaining limits |
| 2026-02-02 | P1 Security — Output schema validation for LLM tool calls |
| 2026-02-05 | **Architecture Shift** — ECA integration strategy adopted |
| 2026-02-08 | ECA IPC fix — Byte-level Content-Length reader for UTF-8 framing |
| 2026-02-08 | Streaming analysis — Mapped 5-layer implementation plan for ECA->chat streaming |
| 2026-02-08 | **Streaming Pipeline** -- 5-layer ECA streaming to chat platforms (Telegram/Discord/Slack) |
| 2026-02-08 | **Frontend Chat** -- Global AI chat sidebar with ECA streaming (WebSocket) |
| 2026-02-08 | **Auto-start ECA** -- ECA binary auto-starts on first chat message from frontend |
| 2026-02-08 | **Fulcro Render Fix** -- WebSocket handlers schedule renders for streaming updates |
| 2026-02-09 | **Flywheel UI** -- Wisdom-guided flywheel: step indicator, contextual tips sidebar, phase cards |
| 2026-02-09 | **Backend ECA Wisdom** -- `eca/wisdom` + `flywheel/progress` WebSocket handlers, context-enriched LLM queries |
| 2026-02-09 | **Frontend ECA Wisdom** -- Streaming tips, real flywheel progress, project context across 9 files. 0 warnings, 58 tests pass. |

## Lessons from NanoClaw Analysis

Based on analysis of [NanoClaw](https://github.com/gavrielc/nanoclaw) (minimal Claude assistant), the following architectural improvements are prioritized:

### Container Isolation (P1) 📋 NEW
**Current**: Tool sandboxing with timeouts, memory limits, and Docker execution profiles.
**Gap**: No OS-level container isolation for AI execution - agents run in-process with permission checks.
**NanoClaw Approach**: Agents run in Apple Container (lightweight Linux VMs) or Docker with:
- Explicit volume mounts only (no host filesystem access)
- Per-group filesystem isolation (`groups/{folder}/`)
- Non-root execution inside containers
- Fresh ephemeral containers per invocation

**Recommendation**: Add container-based AI execution layer:
- Spawn ECA in isolated containers per chat session
- Mount only explicitly allowed directories
- Separate session directories per chat platform/channel
- External mount allowlist outside project root (security)

### Per-Channel Isolation (P1) 📋 NEW
**Current**: Session-based isolation with tool allowlists.
**Gap**: No filesystem isolation between different chat channels/platforms.
**NanoClaw Approach**: Each WhatsApp group gets:
- Isolated folder (`groups/{folder}/`)
- Separate session (`data/sessions/{group}/`)
- Per-group memory/context
- Main group (admin) vs non-main group privilege model

**Recommendation**: Implement channel-based isolation:
- Per-channel filesystem mounts
- Separate memory/context per Telegram group/Discord channel
- Admin channel with full access vs restricted channels

### Minimal Configuration (P2) 📋 NEW
**Current**: `.env` files, config maps, environment variables, complex setup.
**Gap**: Configuration sprawl makes deployment difficult.
**NanoClaw Approach**: Almost no config files - users modify code directly:
- No `.env` or YAML configs
- Hardcoded defaults that users change in source
- Claude Code guides all customization

**Recommendation**: Simplify configuration:
- Reduce config surface area
- Sensible defaults in code
- Clear documentation for common customizations

---

## Lessons from Nanobot Analysis

Based on analysis of [Nanobot](https://github.com/HKUDS/nanobot) (7.9k stars, ~4,000 lines, ultra-lightweight Python AI assistant):

### Message Bus Architecture (P1) 📋 NEW
**Current**: Chat adapters directly coupled to processing logic.
**Gap**: Tight coupling makes testing and extension difficult.
**Nanobot Approach**: Central `MessageBus` with `asyncio.Queue`:
- Inbound queue: channels publish messages
- Outbound queue: agent publishes responses
- Dispatcher routes to appropriate channels via subscriptions

**Recommendation**: Implement message bus pattern:
- Decouple chat adapters from processing logic
- Async message queues for better concurrency
- Easier testing with mock bus

**Status**: 📋 Deferred to P3 — Current architecture works with 3 adapters; add when scaling to 5+ platforms or experiencing backpressure issues.

### Heartbeat / Proactive Scheduling (P3) 📋 Deferred
**Current**: Reactive only - responds to user messages.
**Gap**: No proactive background task execution.
**Nanobot Approach**: `HeartbeatService` wakes agent every 30 minutes:
- Reads `HEARTBEAT.md` from workspace
- Triggers agent turn if actionable content found
- Configurable interval, `HEARTBEAT_OK` token for no-op

**Recommendation**: Add heartbeat service:
- Periodic wake-up for background tasks
- File-based trigger mechanism
- Configurable intervals per channel

**Status**: 📋 Deferred to P3 — No concrete use case yet. Implement when users request reminders, scheduled reports, or background health checks.

### Cron Service (P3) 📋 Deferred
**Current**: No native scheduling capability.
**Gap**: Users cannot schedule recurring tasks.
**Nanobot Approach**: Built-in cron with CLI:
- `nanobot cron add --name "daily" --cron "0 9 * * *"`
- JSON persistence for jobs (`~/.nanobot/cron/jobs.json`)
- Supports cron expressions, intervals, one-time tasks
- Delivery to chat channels

**Recommendation**: Add cron-like scheduling:
- CLI commands for job management
- Multiple schedule types (cron, interval, one-time)
- JSON persistence with state tracking
- Integration with chat platforms for notifications

**Status**: 📋 Deferred to P3 — Depends on Heartbeat/Scheduling. No recurring task requirements identified.

### Per-Channel Session Persistence (P2) 📋 NEW
**Current**: Memory system with EDN/JSONL but limited session isolation.
**Gap**: No per-channel JSONL files with automatic compaction.
**Nanobot Approach**: Sessions stored as JSONL files:
- Keyed by `channel:chat_id`
- Configurable history limits
- Automatic compaction for context window management

**Recommendation**: Enhanced session persistence:
- Per-channel JSONL files
- Automatic compaction/summarization
- Configurable retention policies

**Status**: 📋 P2 — Enhancement to existing memory system. Current EDN/JSONL works; implement when scaling to high-volume channels or needing automatic compaction.

---

## Lessons from Agent Zero Analysis

Based on analysis of [Agent Zero](https://github.com/agent0ai/agent-zero) (14.3k stars, Python-based AI framework with hierarchical multi-agent system):

### Hierarchical Agent System (P1) 📋 NEW
**Current**: Single agent per chat session, context grows unbounded.
**Gap**: No way to delegate subtasks to specialized agents with fresh context.
**Agent Zero Approach**: Superior/subordinate agent hierarchy:
- Agent 0 delegates to sub-agents for specific tasks
- Each sub-agent has clean context, focused tools
- Parallel execution of independent subtasks
- Sub-agents report back to superior

**Recommendation**: Implement hierarchical agents:
```clojure
;; Spawn sub-agent for empathy mapping
(subordinate/spawn! 
  {:role :empathy-builder
   :context {:project-id "proj-123"}
   :timeout-ms 300000}
  "Build empathy map for SaaS product")

;; Sub-agent has:
;; - Fresh context window
;; - Specialized tools (canvas/create, sticky-note/add)
;; - Isolated memory for the task
;; - Callback to parent on completion
```

**Use Cases**:
- Canvas builders (each builder = sub-agent)
- Research tasks (spawn agent to gather info)
- Code review (separate agent for analysis)
- Long-running tasks (don't block main session)

**Implementation Approach**:
1. Add `ouroboros.subordinate` namespace
2. Sub-agents are lightweight (shared process, isolated context)
3. Communication via message passing (not parent/child process)
4. Results merged back into parent context

**Status**: 📋 P1 — Core capability for Web UX Platform and chat scalability.

### Context Summarization (P1) 📋 NEW
**Current**: Memory stores full conversation history; no compaction.
**Gap**: Context windows overflow in long sessions; no summarization strategy.
**Agent Zero Approach**: Tiered compression:
- **Recent** (last 10 messages): Full verbatim content
- **Medium** (10-50 messages ago): Summarized key points
- **Old** (50+ messages ago): Condensed to decisions/outcomes only

**Ouroboros Already Does This**: Our documentation structure (STATE/PLAN/LEARNING) mirrors this tiered approach:
- **STATE.md** = Now — Full fidelity, current status
- **PLAN.md** = Next — Summarized intentions, roadmap  
- **LEARNING.md** = Past — Distilled patterns, eternal truths

We just need to apply the same pattern to conversation memory.

**Recommendation**: Add context compression to chat sessions:
```clojure
;; Automatic tiered compression
(context/compress 
  {:recent-threshold 10      ; Keep verbatim
   :medium-threshold 50      ; Summarize
   :compression-model :fast}) ; Use fast model for summarization
```

**Benefits**:
- "Near-infinite" effective conversation memory
- Reduced token costs
- Faster inference (smaller context)
- Preserved important decisions

**Status**: 📋 P1 — Critical for production chat usage; prevents context overflow.

### Prompt-Driven Architecture (P2) 📋 NEW
**Current**: System prompts hardcoded in namespaces.
**Gap**: Non-developers cannot customize agent behavior without code changes.
**Agent Zero Approach**: Everything in `/prompts/`:
- `agent.system.main.role.md`
- `agent.system.main.communication.md`
- `agent.system.tool.*.md`

**This Extends Ouroboros's Core Philosophy:**

Ouroboros already treats **behavior as data**:
- Statecharts = lifecycle as data
- Resolvers = query logic as data  
- Memory/Knowledge = persistence as data
- **Prompts** = agent behavior as data (same pattern!)

**Recommendation**: Prompt hierarchy:
```
prompts/
├── default/                    ; Built-in prompts
│   ├── system.main.role.md
│   ├── system.main.communication.md
│   └── system.tool.*.md
└── custom/                     ; User overrides
    └── my-prompts/
        └── system.main.role.md  ; Only override what changes
```

**Features**:
- Variable placeholders: `{{var}}` syntax
- File includes: `{{ include "path/to/file.md" }}`
- Queryable via EQL: `(q [:prompt/system :prompt/tools])`
- Dynamic variable loaders (Clojure functions that generate prompt data)

**Status**: 📋 P2 — Natural extension of our data-driven architecture.

### Instruments: On-Demand Tools (P2) 📋 DELEGATED TO ECA
**Current**: ECA handles tool management and extended capabilities.
**Status**: ✅ **Not needed** — ECA already provides:
- Skills/procedures system
- Context-aware tool selection
- Extended capabilities beyond core tools
- Dynamic tool loading

**Why we don't build this:**
Ouroboros delegates AI capabilities to ECA. ECA manages:
- Tool registry and discovery
- Skill-based procedures
- Context-appropriate tool selection
- Extended capability loading

**Ouroboros focus:** Chat platform integration, not AI tool management.

**Status**: 📋 DELEGATED — ECA handles instruments/skills. Ouroboros focuses on unique value.

### Dynamic Behavior Adjustment (P2) 📋 NEW
**Current**: User preferences require repetitive prompting or code changes.
**Gap**: No persistent per-user behavior customization.
**What We Have**: Foundation exists — `memory/save!` can store data, prompts can be dynamic
**What's Missing**: 
- Dedicated behavior namespace
- Automatic injection of rules into system prompts
- User-facing API: `(behavior/add-rule! ...)`

**Agent Zero Approach**: Runtime behavior rules in `behaviour.md`:
```markdown
# Behavior Rules
- Use UK English spelling
- Always explain "why" before "how"
- Prefer Clojure over Python for examples
```

**Recommendation**: Build behavior layer on top of memory:
```clojure
;; User says: "Always use UK spelling"
(behavior/add-rule! :uk-english "Use UK English spelling (colour, not color)")

;; Rule automatically injected into system prompt for this user
;; Persists across sessions via memory system
```

**Status**: 📋 P2 — Enhancement for personalization. Foundation exists, needs orchestration.

### Extension Points Architecture (P2) 📋 NEW
**Current**: Extensions require modifying core code.
**Gap**: No clean hooks for customization without forks.
**Agent Zero Approach**: 11 extension points:
- `agent_init`, `before_main_llm_call`, `message_loop_start`
- `tool_call`, `tool_result`, `session_shutdown`

**Recommendation**: Lifecycle hooks:
```clojure
;; Register extension hook
(extension/on :tool-call
  (fn [tool params]
    (when (= tool :file/write)
      (if (dangerous? params)
        {:block true :reason "Dangerous path"}
        {:continue true}))))
```

**Status**: 📋 P2 — Enables community extensions without core changes.

### Voice Interface (P3) 📋 NEW
**Current**: Text-only chat interfaces.
**Gap**: No speech-to-text or text-to-speech.
**Agent Zero Approach**: Local Whisper STT + browser TTS:
- Speech-to-text: OpenAI Whisper (local, no API key)
- Text-to-speech: Browser built-in (no cloud dependency)

**Recommendation**: Voice integration:
- Telegram voice messages → Whisper → text
- Responses → optional TTS for accessibility
- Local processing (privacy-preserving)

**Status**: 📋 P3 — Accessibility enhancement; deferred until requested.

---

### Ultra-Lightweight Philosophy (P2) 📋 NEW
**Current**: 60+ files, feature-rich but complex.
**Gap**: Hard to understand and customize.
**Nanobot Approach**: ~4,000 lines, research-friendly:
- Minimal core with plugin architecture
- Easy to understand and modify
- Fast startup, low resource usage

**Recommendation**: Modular extraction:
- Core: chat adapters, memory, ECA bridge
- Optional: Web UX Platform, analytics, collaboration
- Users opt-in to features

---

## Implementation Priority Matrix

**P0** = Critical security & core functionality (completed)  
**P1** = High-impact production readiness  
**P2** = Medium-impact improvements  
**P3** = Nice-to-have & future expansion

| Priority | Feature | Effort | Impact | Status |
|----------|---------|--------|--------|--------|
| **P0** | ECA Protocol Client | Medium | 🔴 Critical | ✅ Done |
| **P0** | Tool Approval Bridge | Medium | 🔴 Critical | ✅ Done |
| **P0** | Tool chaining limits | Low | 🔴 High | ✅ Done |
| **P0** | Quarantine external content | Medium | 🔴 High | ✅ Done |
| **P1** | Container Isolation | High | 🔴 Critical | 📋 NEW |
| **P1** | Per-Channel Isolation | Medium | 🔴 High | 📋 NEW |
| **P1** | Metrics export | Low | 🟡 High | 📋 Planned |
| **P1** | Streaming responses | Medium | 🟡 High | ✅ Done |
| **P0** | ECA-Powered Wisdom (A+B) | High | 🔴 Critical | ✅ Done |
| **P1** | Protocol compatibility tests | Low | 🟡 High | 📋 Planned |
| **P1** | Config unification | Low | 🟡 Medium | 📋 Planned |
| **P1** | Hierarchical Agent System | High | 🔴 High | 📋 NEW |
| **P1** | Context Summarization | Medium | 🔴 High | 📋 NEW |
| **P2** | Per-Channel Session Persistence | Medium | 🟡 Medium | 📋 NEW |
| **P2** | Prompt-Driven Architecture | Medium | 🟡 Medium | 📋 NEW |
| **P2** | Instruments (On-Demand Tools) | N/A | N/A | ✅ DELEGATED TO ECA |
| **P2** | Dynamic Behavior Adjustment | Low | 🟢 Low | 📋 NEW |
| **P2** | Extension Points | High | 🟡 Medium | 📋 NEW |
| **P2** | Structured logging | Low | 🟡 Medium | 📋 Planned |
| **P2** | Distributed tracing | Medium | 🟡 Medium | 📋 Planned |
| **P2** | Audit logging | Low | 🟡 Medium | 📋 Planned |
| **P2** | Query caching | Low | 🟡 Medium | 📋 Planned |
| **P2** | Connection pooling | Low | 🟡 Medium | 📋 Planned |
| **P2** | Memory optimization | Low | 🟡 Medium | 📋 Planned |
| **P2** | Ultra-Lightweight Core | High | 🟢 Low | 📋 NEW |
| **P2** | Minimal Configuration | Low | 🟢 Low | 📋 NEW |
| **P2** | Clojure code quality automation | Low | 🟢 Low | 📋 Planned |
| **P2** | ~~REPL-driven debugging guide~~ | Low | ✅ Done | Debug namespace (`ouroboros.debug`) + `bb debug` task created |
| **P2** | Custom tool development tutorial | Medium | 🟢 Low | 📋 Planned |
| **P2** | Tool testing framework | Medium | 🟢 Low | 📋 Planned |
| **P3** | Message Bus Architecture | High | 🟢 Low | 📋 Deferred |
| **P3** | Heartbeat/Proactive Scheduling | Medium | 🟢 Low | 📋 Deferred |
| **P3** | Cron Service | Medium | 🟢 Low | 📋 Deferred |
| **P3** | Context-aware selection | High | 🟢 Low | 📋 Planned |
| **P3** | Plugin system | High | 🟢 Low | 📋 Planned |
| **P3** | Tool usage heatmaps | Low | 🟢 Low | 📋 Planned |
| **P3** | Latency percentiles | Low | 🟢 Low | 📋 Planned |
| **P3** | Additional chat platforms | Medium | 🟢 Low | 📋 Planned |
| **P3** | Voice integration | High | 🟢 Low | 📋 NEW |
| **P3** | Multi-modal support | High | 🟢 Low | 📋 Planned |
| **P3** | Voice Interface (STT/TTS) | High | 🟢 Low | 📋 NEW |
| **P3** | Message formatting | Low | 🟢 Low | 📋 Planned |
| **P3** | Fallback mode | Medium | 🟢 Low | 📋 Planned |

### Features Removed (Delegated to ECA)

| Feature | Reason | ECA Equivalent |
|---------|--------|----------------|
| `ouroboros.ai` | LLM routing | ECA `llm_providers/*` |
| `ouroboros.agent` | AI agent | ECA `features/chat.clj` |
| `ouroboros.tool-defs` | Tool implementations | ECA `features/tools/*` |
| `ouroboros.schema` | Schema validation | ECA `tools.util` |

### Features Retained (Ouroboros Unique)

| Feature | Reason |
|---------|--------|
| Chat Adapters | Platform-specific implementations (Telegram, Discord, Slack) |
| Memory System | Persistent cross-session storage (JSONL + EDN) |
| Tool Approval Bridge | Chat-platform-specific UX for ECA tool approval |
| Dashboard | Web UI for monitoring system health |
| **Web UX Platform** | **Interactive product development workspace with learning flywheel** |
| Telemetry | Ouroboros-specific observability (event tracking, metrics) |
| Git Tools | Repository operations (commits, status, diff, log) - via direct ECA integration |
| OpenAPI Client | Dynamic API client generation from OpenAPI specs - via direct ECA integration |

## How to Contribute

1. Pick an item from ECA Integration or Immediate Priorities
2. Discuss in GitHub issue first
3. Follow the established patterns (see AGENTS.md)
4. Update tests and documentation
5. Commit with appropriate symbols (⚒, ◈, etc.)

---

*The Ouroboros grows by consuming its own tail.*
