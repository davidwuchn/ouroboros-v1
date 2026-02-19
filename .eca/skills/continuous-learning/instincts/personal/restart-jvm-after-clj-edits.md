---
name: restart-jvm-after-clj-edits
domain: clojure-dev-workflow
φ: 0.7
e: restart-backend-after-file-changes
λ: when.editing.backend-clj-files-without-nrepl
Δ: 0.05
source: session-debug-2026-02-17
evidence: 1
access-count: 1
last-accessed: 2026-02-17
timeframe: project
---

# Restart JVM After .clj Edits

## λ(e): Action
When editing `.clj` files and nREPL is unavailable, **always restart the backend process** before testing. File saves do NOT hot-reload in a running JVM. Use `bb dev:stop && sleep 2 && bb dev:start` and verify with `curl -s http://localhost:8080/api/status`.

For `.cljs` files, Shadow-CLJS auto-compiles on save -- no restart needed. Verify with `tmux capture-pane -t proc-ouroboros-frontend` showing "X compiled, 0 warnings".

## λ(φ): Why
- JVM Clojure loads `.clj` files once at startup; runtime doesn't watch filesystem
- nREPL allows live reload but isn't always running
- Shadow-CLJS has file watcher built in for `.cljs`
- Testing against stale code wastes entire debugging rounds

## λ(λ): When
- After editing any `.clj` file in `src/ouroboros/`
- When nREPL port 8888 returns "Connection refused"
- Before asking user to test a backend fix

## Context
- **Applies to**: Ouroboros backend (JVM Clojure via `clojure -M`)
- **Avoid for**: Frontend `.cljs` (auto-compiled by Shadow-CLJS)
- **Related**: verify-paren-depth-at-section-boundaries
