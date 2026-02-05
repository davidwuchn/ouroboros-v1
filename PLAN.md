# PLAN.md

> Next steps and future directions for Ouroboros.
> Last Updated: 2026-02-05

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
| Progressive Disclosure | ◐ Partial | Stage suggestions implemented |
| Product Development Flywheel | ✅ Done | Empathy→ValueProp→MVP→Canvas |

**Key Insight**: Ouroboros now has the foundation to transform from **utility assistant** to **wisdom partner** by creating a learning flywheel where each interaction builds understanding, context, and transferable knowledge.

## ECA Integration Strategy

### Why ECA?

ECA (Editor Code Assistant) is a battle-tested Clojure-based AI coding assistant:
- **613 stars**, 37 forks, v0.97.7 (near 1.0)
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
| 4: Polish & Integration | ◐ Partial | Docs, tests, release notes |

**Remaining:**
- [ ] End-to-end integration tests
- [ ] Release notes
- [ ] Protocol compatibility tests

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
| ECA dependency | Version pinning, fallback to internal AI |
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

### 1. ECA Integration — ✅ Done
All core integration complete. Remaining polish tracked above.

### 2. Test Coverage
- [x] Chat adapter tests (protocol compliance)
- [x] Tool execution tests (all 13 tools)
- [x] Error handling tests (boundary conditions)
- [ ] Integration tests (full chat flow with ECA) — **Next**

### 3. Infrastructure Hardening — ✅ Done
All items completed. See [CHANGELOG.md](CHANGELOG.md).

### 4. Web UX Platform Initiative — 📋 Current Focus
- [ ] Phase 1: Foundation (Project scaffolding, basic builders)
- [ ] Phase 2: Interactive Builders (Rich canvas, real-time updates)
- [ ] Phase 3: Collaboration (Multi-user, comments, versioning)
- [ ] Phase 4: Wisdom & AI (Integrated chat, learning insights)
- [ ] Phase 5: Polish & Scale (Performance, offline, API)

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

### Implementation Phases (10 weeks)

#### Phase 1: Foundation (Week 1-2)
- Extend Fulcro router with project/builder routes
- Project data model and basic builder UI
- Backend resolvers for projects and builder sessions
- Single-user persistence

#### Phase 2: Interactive Builders (Week 3-4)
- Rich canvas components (drag-and-drop, visual editors)
- Real-time updates via WebSocket
- Validation, guidance, export functionality
- Mobile responsive layouts

#### Phase 3: Collaboration (Week 5-6)
- Multi-user presence and live editing
- Comment system on canvas elements
- Version history and team management

#### Phase 4: Wisdom & AI (Week 7-8)
- Integrated chat with ECA and project context
- Learning insights panel and pattern recognition
- Template library and wisdom dashboard

#### Phase 5: Polish & Scale (Week 9-10)
- Performance optimization and offline support
- Advanced visualizations and API embedding
- Documentation and onboarding

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
1. Create project scaffolding (new UI pages for builder/chat/wisdom)
2. Extend existing dashboard with Projects page
3. Build static empathy map builder with backend integration
4. Update navigation and routing

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
- [ ] **Streaming responses** — ECA supports streaming, wire through to chat platforms.

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

## Implementation Priority Matrix

| Priority | Feature | Effort | Impact | Status |
|----------|---------|--------|--------|--------|
| **P0** | ECA Protocol Client | Medium | 🔴 Critical | ✅ Done |
| **P0** | Tool Approval Bridge | Medium | 🔴 Critical | ✅ Done |
| **P0** | Tool chaining limits | Low | 🔴 High | ✅ Done |
| **P0** | Quarantine external content | Medium | 🔴 High | ✅ Done |
| **P1** | **Web UX Platform** | High | 🟡 High | 📋 **Current** |
| **P1** | Chat Adapter → ECA integration | Medium | 🔴 High | ✅ Done |
| **P1** | Approval bridge completion | Medium | 🟡 Medium | ✅ Done |
| **P2** | Streaming responses | Medium | 🟡 Medium | 📋 Planned |
| **P2** | Metrics export | Low | 🟢 Low | 📋 Planned |
| **P3** | Context-aware selection | High | 🟢 Low | 📋 Planned |
| **P3** | Plugin system | High | 🟢 Low | 📋 Planned |

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
