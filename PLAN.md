# PLAN.md

> Next steps and future directions for Ouroboros.

## Current Status

**PLATFORM COMPLETE** — All core capabilities implemented:
- Engine (∅), Query (EQL), Memory, Knowledge, API, OpenAPI
- AI tools (13), Agent (LLM integration), Chat (3 platforms)
- Telemetry, MCP, Auth, Dashboard, Config
- Docker, CI/CD, Test Suite

## Immediate Priorities

### 1. Documentation Cleanup ✅ COMPLETE
- [x] Fix README.md (add Discord to architecture)
- [x] Update STATE.md (remove duplicate examples, fix test counts)
- [x] Update LEARNING.md (document registry pattern, not just resolve)
- [x] Delete Containerfile (superseded by Dockerfile)
- [x] Fix .gitignore (remove tracked ignored files)

### 2. Test Coverage
- [x] Chat adapter tests (protocol compliance)
- [x] Tool execution tests (all 13 tools)
- [x] Error handling tests (boundary conditions)
- [ ] Integration tests (full chat flow with AI) — WIP

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

### Agent Capabilities (P1-P2) 📋 TODO
- [ ] **Semantic browser tool** — ARIA tree snapshots (50KB) vs screenshots (5MB). 100x token cost reduction for web interaction.
- [ ] **Model fallback chain** — Auto-failover between providers (OpenAI → Anthropic → local) with cooldown tracking.
- [ ] **Tool-use planning** — AI generates execution plan before acting, allows user approval for destructive operations. Critical for security: prevents rogue chains, gives humans veto power.
- [ ] **Context-aware tool selection** — Dynamic tool selection based on conversation context using embeddings.
- [ ] **Tool composition & pipelines** — Chain tools without intermediate AI calls for complex workflows.

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
- [ ] **Streaming responses** — Real-time progress updates for long-running operations.

### Developer Experience
- [ ] **REPL-driven debugging guide** — Document patterns for interactive development.
- [ ] **Custom tool development tutorial** — SDK for third-party tool authors.
- [x] **Skill system** ✅ COMPLETE — Reusable, composable capabilities with dependency management (OpenClaw-inspired).
- [ ] **Plugin architecture** — Extension system built on skill framework for third-party plugins.
- [ ] **Tool testing framework** — Built-in testing utilities for tool validation.

### Platform Expansion
- [ ] **Additional chat platforms** — WhatsApp, Matrix, IRC adapters.
- [ ] **Voice integration** — Speech-to-text and text-to-speech capabilities.
- [ ] **Multi-modal support** — Image understanding and generation.
- [ ] **Message formatting** — Rich formatting (markdown, code blocks, interactive elements).

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

### AI Research
- [ ] **Fine-tuning pipeline** — Custom model training for specialized domains.
- [ ] **Reasoning traces** — Show AI's step-by-step thinking for transparency.
- [ ] **Multi-agent coordination** — Multiple AI agents collaborating on tasks.
- [ ] **Local model support** — Ollama/Llama.cpp integration for offline operation.

### Protocol Completeness (MCP)
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
| 2026-02-01 | Skill System — OpenClaw-inspired reusable capabilities with dependencies |
| 2026-02-02 | Security audit — Prompt injection analysis, threat modeling from Moltbook incident |
| 2026-02-02 | P0 Security Complete — Prompt injection protection, human confirmation, tool chaining limits |
| 2026-02-02 | P1 Security — Output schema validation for LLM tool calls |

## Implementation Priority Matrix

| Priority | Feature | Effort | Impact | Risk if Delayed |
|----------|---------|--------|--------|-----------------|
| **P0** | **Prompt injection protection** | Low | 🔴 Critical | Agent compromise via malicious input |
| **P0** | **Human-in-the-loop confirmation** | Medium | 🔴 Critical | Unauthorized destructive operations |
| P0 | Tool sandboxing | Medium | 🔴 Critical | Runaway tool crashes system |
| P0 | Tool allowlists | Low | 🔴 Critical | Unauthorized tool access |
| **P1** | **Tool chaining limits** | Low | 🔴 High | Cascade attacks from injected prompts |
| **P1** | **Quarantine external content** | Medium | 🔴 High | Untrusted input triggers dangerous tools |
| P1 | Unified tool schema | Low | 🔴 High | Inconsistent tool behavior |
| **P1** | **Output schema validation** | Low | 🔴 High | Malformed tool calls execute unexpectedly |
| P1 | MCP Resources/Prompts | Low | 🔴 High | Protocol incompleteness |
| P1 | Semantic browser | Medium | 🔴 High | Excessive token costs |
| P1 | Sandboxed execution | Medium | 🟡 Medium | Unsafe code execution |
| P2 | Streaming responses | Medium | 🟡 Medium | Poor UX for long operations |
| P2 | Tool composition | Medium | 🟡 Medium | Limited workflow capability |
| P2 | Metrics export | Low | 🟢 Low | Operational blindness |
| P2 | Model fallback | Medium | 🟢 Low | Provider downtime |
| P3 | Context-aware selection | High | 🟢 Low | Suboptimal tool usage |
| P3 | Plugin system | High | 🟢 Low | Limited extensibility |

## How to Contribute

1. Pick an item from Immediate Priorities or Architecture Improvements
2. Discuss in GitHub issue first
3. Follow the established patterns (see AGENTS.md)
4. Update tests and documentation
5. Commit with appropriate symbols (⚒, ◈, etc.)

---

*The Ouroboros grows by consuming its own tail.*
