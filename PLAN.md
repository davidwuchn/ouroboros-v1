# PLAN.md

> Next steps and future directions for Ouroboros.

## Current Status

**ARCHITECTURE SHIFT** — Pivoting to ECA integration model:
- Chat platforms (Telegram, Discord, Slack) remain core Ouroboros value
- AI/LLM capabilities delegated to ECA (Editor Code Assistant)
- Ouroboros becomes ECA "editor client" for chat platforms

**LEARNING FLYWHEEL IMPLEMENTED** — Foundation for wisdom-building chat:
- ✓ **Learning Memory System** - Store/recall insights, patterns, wisdom
- ✓ **Educational Approval** - Tool approvals with risk explanations, best practices  
- ✓ **Interface Integration** - Lazy-loaded APIs for all learning operations
- ◐ **Approval Bridge Integration** - Educational messages for tool approvals (partial)
- ◐ **Chat Commands** - `/learn`, `/recall`, `/wisdom` commands (pending)
- ◐ **Progressive Disclosure** - Depth manager for utility→understanding→wisdom (pending)

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
│  │  │ ← Exposed to ECA via MCP Server (optional)       │   │    │
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
| **Tool Bridge** | Forward tool calls to chat for approval | 🔄 New |
| **ECA Protocol Client** | JSON-RPC communication with ECA | 🔄 New |
| **MCP Server** | Expose Ouroboros tools to ECA | ⚠️ Existing |
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

### MCP Server Strategy (Bidirectional Tool Access)

**Problem**: ECA has file/grep/edit tools, but lacks git/memory/telemetry capabilities.

**Solution**: Ouroboros runs MCP server exposing **unique tools only**.

```
┌─────────────────────────────────────────────────────────┐
│                    Tool Architecture                      │
├─────────────────────────────────────────────────────────┤
│                                                           │
│  ECA Built-in Tools          Ouroboros Unique Tools      │
│  ──────────────────          ───────────────────────     │
│  • file/read                 • git/commits               │
│  • file/write                • git/status                │
│  • file/edit                 • git/diff                  │
│  • grep                      • memory/get                │
│  • find                      • memory/set                │
│  • shell/exec                • telemetry/events          │
│                              • openapi/bootstrap         │
│                                                           │
│         ▲                              ▲                 │
│         │                              │                 │
│    ECA uses                    ECA connects via MCP      │
│    (built-in)                  (http://localhost:3000)   │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Flow**:
1. User (via Telegram): "Show me recent commits"
2. Ouroboros → ECA (JSON-RPC): chat/prompt
3. ECA → LLM: Process request
4. LLM decides: Need git/commits tool
5. ECA → Ouroboros MCP Server: git/commits (MCP call)
6. Ouroboros executes git log
7. Ouroboros → ECA: Results
8. ECA → Ouroboros: chat/content-received
9. Ouroboros → Telegram: "Recent commits: ..."

**Why MCP for this?**
- ECA is already an MCP client (standard protocol)
- Clean separation: JSON-RPC for chat control, MCP for tool access
- Generic: Other MCP clients (Claude Desktop, Continue) can also use Ouroboros tools

### Implementation Phases

#### Phase 1: ECA Protocol Client (Week 1)
- [ ] Create `ouroboros.eca-client` namespace
- [ ] Implement JSON-RPC message framing (Content-Length header)
- [ ] Implement initialize handshake
- [ ] Implement chat/prompt with response parsing
- [ ] Start/stop ECA process lifecycle

#### Phase 2: Tool Approval Bridge (Week 2)
- [ ] Implement chat/toolCallApprove handler
- [ ] Forward approval requests to chat platforms
- [ ] Implement approval/rejection callbacks
- [ ] Handle timeout (auto-reject for safety)
- [ ] Test with dangerous tools (file/write, shell/exec)

### Phase 3: MCP Server Refinement ✅ COMPLETE
- [x] Refactor MCP server to expose ONLY Ouroboros-unique tools
      - Git operations (commits, status, diff, log)
      - Persistent memory (get, set, keys, delete)
      - Telemetry (events, stats, clear)
      - OpenAPI client generation (bootstrap, call, list)
      - System introspection (status, report)
      - EQL queries (query/eql)
- [x] Add `:unique?` metadata to tool definitions for filtering
- [x] Update tool registry to preserve metadata
- [x] Create comprehensive MCP integration tests (16 tests, 107 assertions)
- [x] Verify tool categorization (5 categories: git, memory, openapi, query, system)
- [x] Test ECA → MCP → Ouroboros flow simulation
- [ ] Configure ECA to connect to Ouroboros MCP server
- [ ] Add authentication (API key) for external MCP clients
- [ ] Add security: localhost-only by default, rate limiting
- [ ] Document MCP server setup for external clients (Claude Desktop, Continue, Cline)
- [ ] Handle MCP connection lifecycle (start, stop, health checks)

**Why keep MCP?**
- ECA (MCP client) gets access to Ouroboros unique capabilities (git, memory, telemetry)
- Generic integration point for other MCP clients (Claude Desktop, Continue, Cline)
- Standard protocol (loose coupling) vs JSON-RPC (tight coupling for chat)
- Clear separation: JSON-RPC for chat platforms, MCP for AI tool clients

#### Phase 4: Polish & Cleanup (Week 4)
- [ ] Remove internal LLM/AI code (delegated to ECA)
- [ ] Update interface.clj to use ECA client
- [ ] Update documentation
- [ ] End-to-end integration tests
- [ ] Release notes

### What Gets Removed/Deprecated

| Component | Reason | Replacement |
|-----------|--------|-------------|
| `ouroboros.ai` | LLM routing | ECA |
| `ouroboros.agent` | AI agent | ECA chat |
| `ouroboros.tool-defs` (partial) | Redundant file/* tools | ECA file tools |
| `ouroboros.schema` | Schema validation | ECA validation |

**Note**: Tool-defs for git/*, memory/*, telemetry/*, openapi/* remain — these are Ouroboros-unique capabilities exposed via MCP server.

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

### 1. ECA Integration ✅ IN PROGRESS
- [ ] Phase 1: ECA Protocol Client
- [ ] Phase 2: Tool Approval Bridge
- [ ] Phase 3: MCP Bridge (optional)
- [ ] Phase 4: Polish & Cleanup

### 2. Test Coverage
- [x] Chat adapter tests (protocol compliance)
- [x] Tool execution tests (all 13 tools)
- [x] Error handling tests (boundary conditions)
- [ ] Integration tests (full chat flow with ECA) — NEW

### 3. Infrastructure Hardening ✅ COMPLETE
- [x] Fix Docker health check (remove resolve)
- [x] Fix CI secret detection (cover all token types)
- [x] Update bb test task (run all test suites)
- [x] Split interface.clj (God Object refactor)

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
- [ ] **MCP Server** — Expose Ouroboros tools to ECA
- [ ] **Chat Platform Integration** — Telegram, Discord, Slack, WebSocket

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

### Protocol Completeness (MCP)
- [x] **MCP Tools** ✅ COMPLETE — Exposed via `ouroboros.mcp`
- [ ] **MCP Resources** — Expose contextual data sources (files, git history) as resources.
- [ ] **MCP Prompts** — Templated workflows for common AI-assisted tasks.
- [ ] **MCP Sampling** — Let AI request additional context from the server.
- [ ] **MCP Roots** — Support for project/workspace root directory management.

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
| **P0** | **ECA Protocol Client** | Medium | 🔴 Critical | ✅ Done |
| **P0** | **Tool Approval Bridge** | Medium | 🔴 Critical | ✅ Done |
| **P1** | **MCP Server Refinement** | Medium | 🟡 High | ✅ Done |
| **P1** | **Chat Adapter → ECA routing** | Medium | 🔴 High | 📋 Next |
| P1 | Tool chaining limits | Low | 🔴 High | ✅ Done |
| P1 | Quarantine external content | Medium | 🔴 High | ✅ Done |
| P1 | MCP Authentication | Medium | 🟡 Medium | 📋 Next |
| P1 | Model fallback | Medium | 🟢 Low | 📋 Later |
| P2 | Streaming responses | Medium | 🟡 Medium | 📋 Later |
| P2 | Metrics export | Low | 🟢 Low | 📋 Later |
| P3 | Context-aware selection | High | 🟢 Low | 📋 Later |
| P3 | Plugin system | High | 🟢 Low | 📋 Later |

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
| Telemetry | Ouroboros-specific observability (event tracking, metrics) |
| **MCP Server** | **Expose unique tools (git, memory, telemetry) to ECA + external MCP clients** |
| Git Tools | Repository operations (commits, status, diff, log) |
| OpenAPI Client | Dynamic API client generation from OpenAPI specs |

## How to Contribute

1. Pick an item from ECA Integration or Immediate Priorities
2. Discuss in GitHub issue first
3. Follow the established patterns (see AGENTS.md)
4. Update tests and documentation
5. Commit with appropriate symbols (⚒, ◈, etc.)

---

*The Ouroboros grows by consuming its own tail.*
