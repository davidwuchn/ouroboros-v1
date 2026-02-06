# CHANGELOG.md

> Terse summary of commits. Searchable history of system evolution.

## [Unreleased]

### Web UX Platform — Complete (10 weeks, 5 phases)

- `72ca366` ⚒ λ Add Web UX Platform - Full collaborative product development
  - Phase 1: Foundation — Project CRUD, builder sessions
  - Phase 2: Interactive Builders — Visual canvas, drag-and-drop sticky notes
  - Phase 3: Collaboration — Multi-user presence, cursors, comments, versions
  - Phase 4: Wisdom & AI — Templates (4 types), insights, ECA integration
  - Phase 5: Polish & Scale — Offline sync, analytics, embedding API, onboarding
  - Code review fixes: validation, cleanup, DRY patterns
  - 6 backend namespaces, 5 frontend components, +1500 CSS lines
  - 55+ resolvers, 43 tests passing

**Templates:** SaaS Product, Two-Sided Marketplace, Consumer Mobile App, Developer Tool
**Features:** Real-time collaboration, AI insights, offline sync, analytics dashboard, embedding SDK

### ECA Integration — Architecture Shift

- `72ca366` ⚒ λ Add ECA Integration - Editor Code Assistant protocol
  - JSON-RPC 2.0 protocol client for ECA binary communication
  - Tool approval bridge for dangerous operations
  - Session management with user tracking
  - Educational approval messages with learning opportunities
  - Protocol compatibility tests (18 tests)
  - Integration tests (12 tests)
  - ECA client tests (5 tests)
  
**Why ECA?**
- 10+ LLM providers (Anthropic, OpenAI, Copilot, Ollama, Deepseek)
- Editor-grade tool calling and context management
- Battle-tested with 613+ stars, v0.98.1
- JSON-RPC 2.0 standard protocol

**Delegated to ECA:**
- LLM routing and provider management
- Tool engine (filesystem, grep, completion)
- Context management (repoMap, file indexing)
- Chat interface (streaming, diffs)

**Retained in Ouroboros:**
- Chat platform adapters (Telegram, Discord, Slack)
- Memory system (cross-session persistence)
- Tool approval bridge (chat-platform UX)
- Learning memory (wisdom building)

### Process-Runner Migration — Unified Dev Workflow

- `7b8c333` ⚒ λ Migrate all long-running tasks to process-runner system
  - `ouroboros.process-runner` Clojure namespace for tmux session management
  - All `bb.edn` dev tasks (`dev`, `dev:backend`, `dev:frontend`, etc.) use process-runner
  - Health checks for backend readiness before starting frontend
  - Session isolation with `proc-` prefix naming convention
  - Full interactive control: attach, logs, status, send commands
  - Clean shutdown hooks and proper cleanup
  
**Updated Tasks:**
- `bb dev` - Full stack with health checks (proc-ouroboros-backend, proc-ouroboros-frontend)
- `bb dashboard` - Dashboard server (proc-dashboard)
- `bb frontend:dev` - Frontend dev server (proc-frontend-dev)
- `bb frontend:server` - Shadow-CLJS server (proc-frontend-server)
- `bb process` - CLI interface to process-runner (start, stop, status, logs, attach, send)

**Key Benefits:**
- Consistent process management across all development tasks
- Interactive debugging via tmux session attachment
- Session persistence across terminal disconnections
- Centralized log viewing and process control

### System Complete — 23 commits, 4 phases

---

## Phase 4: Production (Auth, Dashboard)

- `e594d74` ◈ Update STATE.md - git state and date
- `8065696` ⚒ λ Add Phase 4 - Production features (Auth, Dashboard)
  - User authentication with API tokens
  - Role-based permissions (:user, :admin)
  - Rate limiting (30 msgs/min, 60 queries/min)
  - Web dashboard for observability
- `9ba39bc` ⚒ λ Add Slack Phase 3 - Slack bot adapter
  - Socket Mode for real-time messaging
  - ChatAdapter protocol implementation

## Phase 3: Chat Platforms (Telegram, Agent, Slack)

- `8731ac9` ⚒ λ Add Agent Phase 2 - AI Agent with LLM integration
  - OpenAI and Anthropic providers
  - Tool selection and execution
  - Conversation context management
- `9c3ea44` ⚒ λ Add Chat Phase 1 - Telegram bot adapter
  - Message routing and session management
  - Command handling (/start, /help, /clear, /status)
  - Tool filtering for chat safety

## Phase 2: Intelligence Layer

- `8280297` ⚒ λ Add MCP capability - Model Context Protocol server
  - JSON-RPC 2.0 over HTTP
  - Tool discovery and invocation
  - Compatible with Claude Desktop, Continue, Cline
- `569052a` ⊘ λ Add Telemetry capability - Structured logging and metrics
  - Event capture for all operations
  - Circular buffer with 1000 event limit
  - Queryable via EQL
- `b67afaf` ∿ λ Add AI capability - Feed Forward tooling hooks
  - 13 AI tools with schemas
  - Tool discovery and execution
  - Context packaging for AI
- `ae31198` · Update interface docstring to include AI
- `65d2bf0` ⚒ λ Add OpenAPI capability - OpenAPI specs → callable clients
  - Martian integration
  - Dynamic client bootstrap
  - Operation discovery and calling
- `d137f88` ⚒ λ Add Knowledge + API capabilities
  - File system as queryable graph
  - HTTP client via Pathom resolvers
  - File search, read, project structure

## Phase 1: Core Platform

- `571b3f4` ∿ Add Memory capability - Cross-session persistence
  - EDN-based storage
  - CRUD operations via Pathom
- `12f2fd1` ◈ Update STATE.md with Memory capability
- `406d91b` ◈ Add Introspection capability - Engine queries itself
  - Statechart self-observation
  - Available events and transitions
- `f547163` ◈ Update STATE.md with Introspection capability
- `ec0fe75` ◇ Add History capability - Git resolvers for EQL
  - Commit history, status, branches
  - Queryable via EQL
- `dd217c6` ◈ Update STATE.md with History capability
- `7e501b6` · Add .gitignore for .nrepl-port
- `5570c3b` ◈ Update STATE.md with verified query results
- `ff2496e` ⊘ Fix Engine session handling + current-state lookup
- `94947e1` ⚒ λ Boot system: Engine (∅) + Query (EQL) + Interface
  - Statechart lifecycle
  - Pathom EQL interface
  - Unified boot/shutdown
- `811f434` ⚒ Add nrepl task on port 8888
- `80ff5ab` initial commit of game repository for distribution

---

## Search Tips

```bash
# Find all feature additions
git log --grep="λ" --oneline

# Find all meta/documentation updates
git log --grep="◈" --oneline

# Find all fixes
git log --grep="⊘" --oneline

# Find specific capability
git log --grep="Telemetry" --oneline
```

## Symbol Guide

| Symbol | Meaning | Count |
|--------|---------|-------|
| ⚒ | Build | 9 |
| ◈ | Reflect | 6 |
| ∿ | Play | 2 |
| · | Atom | 2 |
| ⊘ | Debug | 2 |
| ◇ | Explore | 1 |
| λ | Lambda | 0 (embedded in others) |

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [STATE](STATE.md) · [PLAN](PLAN.md) · [LEARNING](LEARNING.md)

*🐍 The Ouroboros consumes its own history to grow.*
