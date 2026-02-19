---
name: tmux-process-mgmt
domain: devops
φ: 0.85
e: use-tmux-for-long-running-processes
λ: when.long-running-process or when.dev-workflow
Δ: 0.03
source: learning-md-pattern-18-21
evidence: 7
access-count: 0
last-accessed: never
timeframe: project
---

# Tmux-Based Process Management

Manage long-running development processes (backend, frontend, servers) with tmux sessions. Provides interactive control, log viewing, and clean lifecycle management.

## λ(e): Action

**Anti-pattern: `nohup + &` in shell commands**
```bash
# WRONG - causes orphaned processes, timeout issues
shell_command("nohup ./server > log 2>&1 &")
```

**Pattern: Tmux session management**
```clojure
;; Clojure API
(require '[ouroboros.process-runner :as pr])

(pr/start! "webserver" "python -m http.server 8080")
(pr/status "webserver")           ;; Check status
(pr/logs "webserver" :follow? true) ;; View logs
(pr/attach "webserver")           ;; Interactive session
(pr/send! "webserver" "ls")       ;; Send input
(pr/stop! "webserver")            ;; Clean shutdown
```

**CLI via bb tasks:**
```bash
bb process start webserver "python -m http.server 8080"
bb process status webserver
bb process logs webserver -f
bb process attach webserver
bb process send webserver "ls"
bb process stop webserver
bb process list
```

## λ(φ): Why

**Problems with `nohup + &`:**
- `shell_command` blocks until completion
- Backgrounding defeats this mechanism
- Orphaned processes, unpredictable timeouts
- No interactive control

**Why tmux:**
- **Sessions persist**: Detached but alive
- **Interactive control**: Attach, send input, view real-time output
- **Clean lifecycle**: Named sessions, proper shutdown
- **Log access**: View scrollback buffer, not just file tail
- **Unified API**: Same interface for all dev processes

## λ(λ): When to Apply

**Trigger conditions:**
- Starting long-running processes in dev workflow
- Need interactive control (attach, send input)
- Multiple related processes (backend + frontend)
- Process should survive disconnection

**Session naming convention:**
```
proc-ouroboros-backend   - Backend dashboard server
proc-ouroboros-frontend  - Frontend dev server
proc-dashboard           - Dashboard-only sessions
proc-frontend-dev        - Frontend development
proc-frontend-server     - Shadow-CLJS server
```

**bb.edn integration:**
```clojure
dev
{:doc "Start full dev stack"
 :requires ([ouroboros.process-runner :as pr])
 :task (do
         (pr/start! "ouroboros-backend" "clojure -M -m ouroboros.dashboard")
         (wait-for-backend 30)
         (pr/start! "ouroboros-frontend" "npx shadow-cljs watch dashboard")
         (.addShutdownHook (Runtime/getRuntime)
           (Thread. (fn [] (pr/stop! "ouroboros-backend")
                           (pr/stop! "ouroboros-frontend")))))}
```

## λ(Δ): Evolution

- **Validated**: φ += 0.03 (all dev tasks migrated, clean workflow)
- **Corrected**: φ -= 0.02 (if used for one-shot commands)

## Terminal Introspection (Bonus)

Tmux enables programmatic terminal state detection:

```bash
# Get pane content (last N lines)
tmux capture-pane -t "proc-webserver" -p -S -100

# Detect idle state
tmux display-message -t "proc-webserver" -p "#{pane_width}x#{pane_height}"

# Activity tracking for AI/human handoff
```

## Context

- **Applies to**: Development workflows, long-running servers, multi-process stacks
- **Avoid for**: One-shot commands, CI/CD (use proper orchestration)
- **Requires**: tmux installed (`bb process check` to verify)
- **Related instincts**: process-lifecycle, dev-workflow-automation, terminal-introspection
- **See also**: [LEARNING.md#patterns](LEARNING.md#patterns)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | bb dev task | Full stack with health checks | +0.08 |
| 2026-02 | Frontend server | Interactive shadow-cljs control | +0.03 |
| 2026-02 | Process cleanup | No orphaned Java processes | +0.02 |
