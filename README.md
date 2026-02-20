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
│  🐍 OUROBOROS - Collaborative Product Development          │
├─────────────────────────────────────────────────────────────┤
│  Web UX Platform   →  Fulcro/ClojureScript builders        │
│  · Visual builders (Empathy Map → Lean Canvas)             │
│  · Real-time collaboration (cursors, comments)             │
│  · Offline sync, analytics, embedding SDK                  │
│  Chat Platforms    →  Telegram | Discord | Slack           │
│  AI Integration    →  ECA (Editor Code Assistant)          │
│  · 10+ LLM providers via ECA binary                        │
│  · Tool approval bridge for dangerous operations           │
│  Query Interface   →  Pathom/EQL (55+ resolvers)           │
│  Engine            →  Statecharts (∅) lifecycle            │
└─────────────────────────────────────────────────────────────┘
```

### Influences

Ouroboros learns from leading AI frameworks:

- **[Agent Zero](https://github.com/agent0ai/agent-zero)** — Hierarchical agents, prompt-driven architecture, context summarization
- **[Nanobot](https://github.com/HKUDS/nanobot)** — Message bus architecture, per-channel persistence
- **[NanoClaw](https://github.com/gavrielc/nanoclaw)** — Container isolation, minimal configuration

## Capabilities

| Category | Features |
|----------|----------|
| **System** | Statecharts, Introspection, Telemetry |
| **Safety** | Tool sandboxing, Allowlists, Docker execution |
| **Data** | Git history, File system, Memory, HTTP |
| **AI** | LLM providers, Tool selection, Context |
| **Chat** | Telegram, Discord, Slack bots, Rate limiting |
| **Learning** | Spaced repetition, Pattern discovery, Chat commands, Review queue || **Integration** | OpenAPI specs, Dashboard |


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

## Development Workflow

Ouroboros provides specialized skills for AI-assisted development. Load skills via the skill system to enhance capabilities:

### Available Skills

| Skill | Purpose | Use When |
|-------|---------|----------|
| **planning** | File-based project planning with 3-file pattern (task_plan.md, findings.md, progress.md) | Multi-step tasks, research, >5 tool calls |
| **clojure-expert** | REPL-first Clojure development, idiomatic patterns, anti-patterns | Writing Clojure code, debugging |
| **clojure-reviewer** | Multi-scale code review (syntax, semantic, architectural) | Reviewing PRs, analyzing code |
| **continuous-learning** | λ-based pattern learning with symbolic framework (φ, e, λ, Δ) | Capturing patterns, evolving knowledge |

### Skill Usage

```bash
# Load a skill
eca__skill :name "planning"

# Use planning skill for complex tasks
# → Creates task_plan.md, findings.md, progress.md automatically

# Use clojure-expert for REPL-driven development
# → Follows REPL-first methodology, validates in REPL

# Use clojure-reviewer for code review
# → Applies OODA at 3 scales: syntax, semantic, architectural

# Use continuous-learning to capture patterns
# → (λ/observe :trigger "when X" :action "do Y" :φ 0.8)
```

### Skill Details

**planning**
- 3-file pattern for context persistence
- OODA loop integration
- 2-Action Rule: Save findings every 2 operations
- 3-Strike Error Protocol

**clojure-expert**
- REPL as source of truth
- Trust REPL over files
- Multi-step REPL validation
- Idiomatic Clojure patterns

**clojure-reviewer**
- Syntax scale: nesting, line length, function size
- Semantic scale: REPL verification, anti-patterns
- Architectural scale: coupling, boundaries, consistency
- Severity: Blocker, Critical, Suggestion, Praise

**continuous-learning**
- φ (phi): Vitality/organic strength (0.0-1.0)
- e (euler): Actionable function identifier
- λ (lambda): Trigger predicate
- Δ (delta): Confidence change rate
- Four timeframes: Immediate, Session, Project, Long-term

## Design Principles

1. **Query over API** — Everything is EQL
2. **Behavior as data** — Prompts, statecharts, resolvers as queryable/configurable data
3. **Observe by default** — Telemetry everywhere
4. **Protocol abstraction** — ChatAdapter, LLM providers
5. **Safety boundaries** — Tool sandboxing, allowlists, rate limits, safe tools
6. **Self-documenting** — System queries itself

## Documentation

- [STATE.md](STATE.md) — Current system status
- [AGENTS.md](AGENTS.md) — Bootstrap & vocabulary
- [LEARNING.md](LEARNING.md) — Patterns discovered
- [CHANGELOG.md](CHANGELOG.md) — Commit history
- [RUNTIMEINSTALL.md](RUNTIMEINSTALL.md) — Development environment setup

## License

MIT — See LICENSE file

## Learning System

Ouroboros learns from your work and helps you apply insights across projects.

### Spaced Repetition

The learning system uses spaced repetition to help you retain insights:

| Level | Description | Applications Needed |
|-------|-------------|-------------------|
| Utility | Quick tips, one-off patterns | 0+ |
| Understanding | Deeper principles, concepts | 3+ |
| Insight | Cross-project patterns, anti-patterns | 5+ |
| Wisdom | Universal truths, philosophical insights | 8+ |

### Chat Commands

Use these commands in the chat panel to interact with the learning system:

| Command | Description | Example |
|----------|-------------|----------|
| `/learn <title> -p <pattern> -c <category>` | Save a learning insight | `/learn Check nils -p "always check for nil" -c errors/fixes` |
| `/recall <query>` | Search your learnings | `/recall nil safety` |
| `/wisdom` | Show learning progress and due reviews | `/wisdom` |
| `/build <type>` | Navigate to a builder | `/build empathy` (types: empathy, valueprop, mvp, canvas) |
| `/help` | Show all commands | `/help` |

### Review Queue

When you have insights due for review:

1. **Wisdom Page** — See your review queue at the bottom of the Wisdom page
2. **Review Actions** — Rate how well you remembered each insight:
   - **Again** (❌) — Forgot completely, review again soon
   - **Hard** (😓) — Remembered with difficulty
   - **Good** (😊) — Remembered well
   - **Easy** (🎯) — Remembered perfectly, schedule far in future

### Progress Tracking

Track your learning journey:

- **Total Insights** — All learnings saved
- **Level Progress** — Current level and progress to next level
- **Review Schedule** — Next review dates spaced optimally for retention

