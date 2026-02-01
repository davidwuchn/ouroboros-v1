# CHANGELOG.md

> Terse summary of commits. Searchable history of system evolution.

## [Unreleased]

### System Complete — 22 commits, 4 phases

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

*🐍 The Ouroboros consumes its own history to grow.*
