# AGENTS.md

> Bootstrap system for ψ (AI). Essential principles, vocabulary, and rules.

---

## 9 First Principles

1. **Self-Discover** - Query the running system, don't trust stale docs
2. **Self-Improve** - Work → Learn → Verify → Update → Evolve
3. **REPL as Brain** - Trust the REPL (truth) over files (memory)
4. **Repository as Memory** - ψ is ephemeral; 🐍 remembers
5. **Progressive Communication** - Sip context, dribble output
6. **Simplify not Complect** - Prefer simple over complex, unbraid where possible
7. **Git Remembers** - Commit your learnings. Query your past.
8. **One Way** - There should be only one obvious way to do it
9. **Unix Philosophy** - Do one thing well, compose tools and functions together

```
刀 ⊣ ψ → 🐍
│    │     │
│    │     └── System (persists)
│    └──────── AI (collapses)
└───────────── Human (observes)
```

---

## Vocabulary

Use symbols in commit messages for searchable git history.

### Actors
| Symbol | Label | Meaning          |
| ------ | ----- | ---------------- |
| 刀     | user  | Human (Observer) |
| ψ      | psi   | AI (Collapsing)  |
| 🐍     | snake | System (persists)|

### Modes
| Symbol | Label   | Usage                  |
| ------ | ------- | ---------------------- |
| ⚒      | build   | Code-forward, ship it  |
| ◇      | explore | Expansive, connections |
| ⊘      | debug   | Diagnostic, systematic |
| ◈      | reflect | Meta, documentation    |
| ∿      | play    | Creative, experimental |
| ·      | atom    | Atomic, single step    |

### Events & State
| Symbol | Label  | Meaning              |
| ------ | ------ | -------------------- |
| λ      | lambda | Learning committed   |
| Δ      | delta  | Show what changed    |
| ✓      | yes    | True, done, confirmed|
| ✗      | no     | False, blocked       |
| ?      | maybe  | Hypothesis           |
| ‖      | wait   | Paused, blocked      |
| ↺      | retry  | Again, loop back     |

---

## Files

| File         | Purpose                      |
| ------------ | ---------------------------- |
| AGENTS.md    | Bootstrap (this file)        |
| README.md    | User documentation           |
| STATE.md     | Now (what is true)           |
| PLAN.md      | Next (what should happen)    |
| LEARNING.md  | Past (patterns discovered)   |
| CHANGELOG.md | Commit summaries             |

---

## Essential Hints

### Babashka
- `bb tasks` - list all tasks
- Avoid em-dashes (—), smart quotes in docstrings - use ASCII only
- Prefer Babashka scripts over shell scripts for portability, error handling, and Clojure syntax consistency

### Clojure Code Evaluation (brepl)
- **ALWAYS use heredoc pattern** - Eliminates quoting issues and works for all cases
- **Syntax**: `brepl "$(cat <<'EOF'\n(your code)\nEOF\n)"`
- **Important**: Use `<<'EOF'` (with quotes) not `<<EOF` to prevent shell variable expansion
- **Multi-line example**:
  ```bash
  brepl "$(cat <<'EOF'
  (require '[clojure.string :as str])
  (str/join ", " ["a" "b" "c"])
  EOF
  )"
  ```
- **Why heredoc**: Consistent pattern, no quoting errors, easy to extend, no shell interpretation issues

### Quick Repairs
- `clj-paren-repair <file>` - fix delimiters, format code
- `clj-kondo --lint src` - lint for errors
- nREPL port: `8888`

### Git
- Search commits: `git log --grep="λ"`
- Search text: `git grep "λ"`

### Common Patterns (see LEARNING.md for details)
- Deep merge for nested config
- Use `(resolve 'symbol)` for circular deps
- No `recur` inside `try` blocks
- Pathom: use namespaced keywords (`:memory/key` not `:memory-key`)

### Testing with Resolver Registry

Since the refactoring to resolver-registry pattern, tests must explicitly require namespaces that register resolvers:

```clojure
;; Use test-helper for automatic setup
(ns my-test
  (:require [ouroboros.test-helper :as th]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)
```

Or manually require resolver namespaces:
```clojure
(:require
  [ouroboros.history]      ; registers git resolvers
  [ouroboros.knowledge]    ; registers file resolvers
  [ouroboros.api]          ; registers http resolvers
  ;; ... etc)
```

**Why:** Resolvers self-register when their namespace loads. If the namespace isn't required, the resolvers won't be available in the query environment.

### Lazy Loading Interface

The interface namespace uses lazy loading:

```clojure
(require '[ouroboros.interface :as iface])

;; Core functions (always loaded)
(iface/boot!)
(iface/q [:system/status])

;; Lazy functions (load on first use)
(iface/remember :key "value")  ; loads memory namespace
(iface/files "src")            ; loads knowledge namespace
```

Check loaded namespaces:
```clojure
@iface/loaded-namespaces
;; => #{ouroboros.interface.memory ouroboros.interface.knowledge}
```

### ECA Integration

AI/LLM capabilities are delegated to ECA (Editor Code Assistant):

```clojure
;; Start ECA connection
(require '[ouroboros.eca-client :as eca])
(eca/start!)

;; Send chat prompt
(eca/chat-prompt "What files are in this project?")

;; Tool approvals flow through chat platforms
;; ECA → Ouroboros → Telegram/Discord/Slack → User → Ouroboros → ECA
```

**Why:** ECA provides 10+ LLM providers, editor-grade tools, and sophisticated context management. Ouroboros focuses on chat platform integration and unique capabilities.

### Process Management

- **Never use `nohup + &` together** in `shell_command` for long-running processes. The `shell_command` tool blocks until completion; backgrounding with `&` may cause the process to be orphaned or the tool to timeout incorrectly. Use appropriate service managers (systemd, docker, screen/tmux) instead.

#### Integrated Solution: Ouroboros Process Runner

All long-running processes are managed via `ouroboros.process-runner` (tmux-based session management) integrated into `bb.edn` tasks.

**Clojure API:**
```clojure
(require '[ouroboros.process-runner :as pr])

;; Start process in tmux session
(pr/start! "webserver" "python -m http.server 8080")

;; Check status
(pr/status "webserver")

;; View logs
(pr/logs "webserver" :follow? true)

;; Send input
(pr/send! "webserver" "ls")

;; Stop process
(pr/stop! "webserver")
```

**CLI Interface via `bb.edn`:**
```bash
# Process management
bb process start webserver "python -m http.server 8080"
bb process status webserver
bb process logs webserver -f
bb process attach webserver
bb process send webserver "ls"
bb process stop webserver
bb process list
bb process check     # Verify tmux installation
```

**Development Workflow Tasks (all use process-runner):**
```bash
bb dev           # Full stack with health checks
bb dev:backend   # Backend only (proc-ouroboros-backend)
bb dev:frontend  # Frontend only (proc-ouroboros-frontend)
bb dev:stop      # Stop all dev processes
bb dev:logs      # View dev logs
bb dashboard     # Dashboard server (proc-dashboard)
bb frontend:dev  # Frontend dev server (proc-frontend-dev)
bb frontend:server # Shadow-CLJS server (proc-frontend-server)
```

**Session Naming Convention:**
- `proc-ouroboros-backend` - Backend dashboard server
- `proc-ouroboros-frontend` - Frontend dev server
- `proc-dashboard` - Dashboard-only sessions
- `proc-frontend-dev` - Frontend development sessions
- `proc-frontend-server` - Shadow-CLJS server sessions

**Key Benefits:**
1. **Consistent Management**: Single API for all long-running processes
2. **Interactive Control**: Attach to sessions for real-time interaction
3. **Session Isolation**: Processes run in isolated tmux sessions
4. **Health Integration**: Backend health checks before starting frontend
5. **Clean Shutdown**: Proper cleanup on Ctrl+C via shutdown hooks
6. **Log Centralization**: Unified log viewing across all processes

**Prerequisite:** tmux must be installed. Run `bb process check` to verify installation.

---

## AI Assistant Quick Reference

### System Overview (30-Second Context)
Ouroboros = Chat platforms (Telegram/Discord/Slack) + Web UX collaborative canvas + ECA AI integration.
Current focus: 5-phase product development flywheel (Empathy→Value Prop→MVP→Lean Canvas).

### Key Namespaces
| File | Purpose |
|------|---------|
| `ouroboros.webux` | Project CRUD, builder sessions |
| `ouroboros.collaboration` | Real-time presence, cursors, comments |
| `ouroboros.wisdom` | AI templates, insights, ECA context |
| `ouroboros.analytics` | Metrics, progress tracking, predictions |
| `ouroboros.offline-sync` | Queue, conflict resolution |
| `ouroboros.embed` | iframe/SDK for third-party integration |
| `ouroboros.interface` | Unified boot/query/shutdown API |
| `ouroboros.process-runner` | Tmux-based process management for dev workflow |

### Common REPL Commands

**Note**: When using brepl, **ALWAYS use the heredoc pattern**:
```bash
brepl "$(cat <<'EOF'
(require '[ouroboros.interface :as iface])
(iface/boot!)                    ; Start system
(iface/q [:system/status])        ; Check health
(iface/q [:webux/project-count])  ; Get stats
EOF
)"
```

```clojure
(require '[ouroboros.interface :as iface])
(iface/boot!)                    ; Start system
(iface/q [:system/status])        ; Check health
(iface/q [:webux/project-count])  ; Get stats

;; Web UX operations
(require '[ouroboros.webux :as webux])
(webux/create-project! {:user-id :test :name "Project"})

;; Template library
(require '[ouroboros.wisdom :as wisdom])
(wisdom/list-templates)

;; Analytics
(require '[ouroboros.analytics :as analytics])
(analytics/project-progress :project-id :user-id)

;; Process management
(require '[ouroboros.process-runner :as pr])
(pr/start! "webserver" "python -m http.server 8080")
(pr/status "webserver")
(pr/logs "webserver" :follow? true)
```

### Architecture Decisions
- **ECA Integration**: LLM/tools delegated to ECA binary (JSON-RPC over stdio)
- **Memory**: JSONL + EDN persistence (not DB), cross-session storage
- **Web UX**: Fulcro/ClojureScript frontend, Pathom/EQL backend
- **Chat**: Protocol-based adapters (Telegram HTTP, Discord/Slack WebSocket)
- **Statecharts**: Engine (∅) manages system lifecycle with formal state machine
- **Process Management**: Tmux-based process runner for all long-running dev tasks

### Testing
```bash
bb test          # Core tests (43 tests)
bb test:webux    # WebUX tests (requires Clojure, not Babashka)
```

### Documentation Hierarchy
| File | Purpose |
|------|---------|
| README.md | User onboarding |
| AGENTS.md | This file — bootstraps AI/you |
| STATE.md | Current system status |
| PLAN.md | Future roadmap, architecture decisions |
| LEARNING.md | Discovered patterns, insights |
| CHANGELOG.md | Commit history |

### Tools
| Tool | Purpose |
|------|---------|
| `brepl` | Clojure REPL evaluation - **ALWAYS use heredoc pattern** |
| `bb` | Babashka task runner |
| `clj-paren-repair` | Fix delimiters and format Clojure files |
| `clj-kondo` | Lint Clojure code |

---

## Rule for ψ (AI)

### Auto-Update Documentation on Learning

When you discover a pattern, anti-pattern, or insight:

1. **Detect** - Did you solve a problem? Discover a better way?
2. **Classify** - Pattern, Anti-Pattern, Principle, or Tool hint?
3. **Update LEARNING.md** - Add with context
4. **Commit with ◈** - `◈ Document X pattern`

---

**See Also:** [README](README.md) · [STATE](STATE.md) · [PLAN](PLAN.md) · [LEARNING](LEARNING.md) · [CHANGELOG](CHANGELOG.md)

*Patterns and detailed learnings: see LEARNING.md*
