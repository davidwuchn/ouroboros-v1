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

#### Working Solution: Process Runner Script

For scripts that need to start long-running processes via `shell_command`, use tmux for full interactive control:

```bash
#!/bin/bash
# process-runner.sh - Start/manage long-running processes with tmux

# Start process in detached tmux session
tmux new-session -s "proc-webserver" -d "python -m http.server 8081"

# Control commands:
tmux attach -t "proc-webserver"        # Interactive attachment
tmux send-keys -t "proc-webserver" "ls" Enter  # Send input
tmux capture-pane -t "proc-webserver" -p      # View output
tmux kill-session -t "proc-webserver"         # Stop process
```

**Why it works:** tmux creates detached sessions that persist independently. The wrapper script exits immediately, satisfying `shell_command`'s synchronous expectation while the process continues running.

**Full implementation:** See `scripts/process-runner.sh` for complete process management with start/stop/status/logs/attach/send commands.

**Prerequisite:** tmux must be installed. Run `./scripts/process-runner.sh check` to verify installation.

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

### Common REPL Commands
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
```

### Architecture Decisions
- **ECA Integration**: LLM/tools delegated to ECA binary (JSON-RPC over stdio)
- **Memory**: JSONL + EDN persistence (not DB), cross-session storage
- **Web UX**: Fulcro/ClojureScript frontend, Pathom/EQL backend
- **Chat**: Protocol-based adapters (Telegram HTTP, Discord/Slack WebSocket)
- **Statecharts**: Engine (∅) manages system lifecycle with formal state machine

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
