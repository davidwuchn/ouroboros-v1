# Ouroboros

> Your own personal AI assistant. Any OS. Any Platform. The snake way. 🐍

A co-evolution framework for AI tooling—built with Clojure, powered by Babashka.

## Quick Start

### Local Development

```bash
# Clone and enter
git clone https://github.com/davidwuchn/ouroboros-v1.git
cd ouroboros-v1

# Start nREPL with full system
bb nrepl

# In REPL:
(iface/q [:system/status])  ; Check system health
(iface/status)              ; Quick status
```

### Frontend Development (ClojureScript/Fulcro)

```bash
# Install dependencies (first time)
npm install

# Terminal 1: Start backend API server
bb dashboard

# Terminal 2: Start frontend dev server
bb frontend:dev
# Or: npx shadow-cljs watch dashboard

# Access at http://localhost:8080
```

### Docker Deployment

```bash
# Copy and configure environment
cp .env.example .env
# Edit .env with your API keys

# Run with Docker Compose
docker-compose up -d

# Or build and run manually
docker build -t ouroboros .
docker run -d --env-file .env -p 3000:3000 -p 8080:8080 ouroboros
```

### Running Tests

```bash
bb test                 # Run all system tests
bb git:install-hooks    # Install pre-commit hook (runs tests before commits)
```

**Pre-commit Hook:** Automatically runs `bb test` before every commit. Bypass with `git commit --no-verify` if needed.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  🐍 OUROBOROS - Co-Evolution Framework                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend          →  ClojureScript/Fulcro                  │
│  Chat Platforms    →  Telegram | Discord | Slack           │
│  AI Agent          →  OpenAI | Anthropic | Ollama          │
│  Tools             →  13 built-in capabilities              │
│  Query Interface   →  EQL over Pathom                       │
│  Engine            →  Statecharts (∅)                       │
└─────────────────────────────────────────────────────────────┘
```

## Capabilities

| Category | Features |
|----------|----------|
| **System** | Statecharts, Introspection, Telemetry |
| **Safety** | Tool sandboxing, Allowlists, Docker execution |
| **Data** | Git history, File system, Memory, HTTP |
| **AI** | LLM providers, Tool selection, Context |
| **Chat** | Telegram, Discord, Slack bots, Rate limiting |
| **Integration** | MCP server, OpenAPI specs, Dashboard |
| **Extensibility** | Skill system with dependency management |

## Usage

### Query Everything

```clojure
;; System health
(iface/q [:system/status :system/healthy?])

;; Git history
(iface/q [{:git/commits [:git/hash :git/subject]}])

;; File system
(iface/files "src")
(iface/search "*.clj")

;; AI tools
(iface/ai-tools)
(iface/ai-call! :file/read {:path "README.md"})

;; Safety (P0) - Tool sandboxing
(iface/allowlist-create! :session-123 :chat-safe)
(iface/tool-safe :file/read {:path "README.md"} :session-123)
(iface/sandbox-exec-shell "echo 'Hello'" {:profile :restricted})

;; Skill system
(iface/skill-register-built-ins!)
(iface/skill-load! :file/operations)
(iface/skill-tools :file/operations)  ; => [:file/read :file/write ...]
```

### Chat Bots

```bash
# Telegram
export TELEGRAM_BOT_TOKEN="..."
export OPENAI_API_KEY="..."
bb chat

# Slack (in REPL)
(iface/chat-register-slack! "xapp-..." "xoxb-...")
(iface/chat-start!)
```

### Dashboard

The dashboard provides a web interface for system observability:

```clojure
;; Start web dashboard (serves frontend + API)
(iface/dashboard-start! {:port 8080})
;; → http://localhost:8080
```

**Features:**
- **Dashboard** — System health, telemetry stats, user count, session overview
- **Telemetry** — Event logs, tool invocations, error tracking
- **Users** — User management with roles and permissions
- **Sessions** — Active chat sessions and adapter status

**Tech Stack:**
- ClojureScript/Fulcro (normalized state, EQL queries)
- Shadow CLJS (hot reload, advanced compilation)
- Ring/Jetty (backend API server)

### MCP Server

```clojure
;; Expose tools to any MCP client
(iface/mcp-start! {:port 3000})
```

## Design Principles

1. **Query over API** — Everything is EQL
2. **Observe by default** — Telemetry everywhere
3. **Protocol abstraction** — ChatAdapter, LLM providers
4. **Safety boundaries** — Tool sandboxing, allowlists, rate limits, safe tools
5. **Self-documenting** — System queries itself

## Documentation

- [STATE.md](STATE.md) — Current system status
- [AGENTS.md](AGENTS.md) — Bootstrap & vocabulary
- [LEARNING.md](LEARNING.md) — Patterns discovered
- [CHANGELOG.md](CHANGELOG.md) — Commit history

## License

MIT — See LICENSE file
# Git Hooks
