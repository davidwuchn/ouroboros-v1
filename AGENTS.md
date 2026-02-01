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

---

## Rule for ψ (AI)

### Auto-Update Documentation on Learning

When you discover a pattern, anti-pattern, or insight:

1. **Detect** - Did you solve a problem? Discover a better way?
2. **Classify** - Pattern, Anti-Pattern, Principle, or Tool hint?
3. **Update LEARNING.md** - Add with context
4. **Commit with ◈** - `◈ Document X pattern`

---

*Patterns and detailed learnings: see LEARNING.md*
