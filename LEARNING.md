# LEARNING.md

> What was discovered. Patterns, principles, and insights from building Ouroboros.

## Contents

- [Architecture Evolution](#architecture-evolution)
- [Patterns](#patterns)
  - [Development Methodology](#patterns)
  - [Communication & Naming](#patterns)
  - [System Design](#patterns)
  - [AI Integration](#patterns)
  - [Tooling](#patterns)
- [Anti-Patterns](#anti-patterns)
- [Babashka / SCI Quirks](#babashka--sci-quirks)
- [ClojureScript/Fulcro Frontend](#clojurescriptfulcro-frontend)
- [Architecture Decisions](#architecture-decisions)
- [ECA Integration](#eca-integration)
- [Web UX Platform Patterns](#web-ux-platform-patterns)
- [Open Questions](#open-questions)

---

## Architecture Evolution

### 2026-02: Resolver Registry Pattern

**Problem:** `query.clj` was a "god module" with 16 requires, creating circular dependencies throughout the system.

**Solution:** Registry pattern for Pathom resolvers.

**Before (circular):**
```clojure
;; query.clj - required everything
(:require
  [ouroboros.history]      ; for git resolvers
  [ouroboros.knowledge]    ; for file resolvers
  [ouroboros.api]          ; for http resolvers
  ... 13 more)
```

**After (decoupled):**
```clojure
;; query.clj - only 3 requires
(:require
  [ouroboros.resolver-registry :as registry]
  [ouroboros.engine :as engine])

;; Each resolver namespace self-registers
(ns ouroboros.history
  (:require [ouroboros.resolver-registry :as registry]))

(def resolvers [git-commits git-status ...])
(registry/register-resolvers! resolvers)
```

**Results:**
- Circular deps: 15 → 3 (all false positives)
- Query requires: 16 → 3
- Deepest chain: 14 → 11
- All 52 tests pass

**Key Insight:** Protocols and registries should live in their own namespaces to break cycles.

### 2026-02: Learning System Modularization

**Problem:** `learning.clj` grew to 700+ lines with mixed concerns: CRUD, indexing, review scheduling, analytics, and search.

**Solution:** Split into 5 focused namespaces with thin wrapper facade.

**Structure:**
```
src/ouroboros/learning/
├── core.clj      (326 LOC) - CRUD, deduplication, batch operations
├── index.clj     (227 LOC) - O(1) indexes, WAL, caching
├── review.clj    (184 LOC) - Spaced repetition, Leitner system
├── analytics.clj (257 LOC) - Flywheel progression, stats, gaps
├── search.clj    (218 LOC) - Pattern matching, export/import v2.0
└── learning.clj  (202 LOC) - Thin wrapper, re-exports, Pathom resolvers
```

**Key Improvements:**
- **O(1) Lookups:** Index-backed instead of full memory scans
  - `get-due-reviews`: O(n) → O(1) via review-index
  - `recall-by-pattern`: O(n) → O(tags) via tag-index
- **WAL (Write-Ahead Log):** Atomic index updates with crash recovery
- **Soft Deletes:** Mark :deleted, async cleanup, enables restore
- **Deduplication:** Jaccard similarity + tag-index candidate generation
- **Analytics Caching:** 60s TTL avoids recomputing flywheel progress

**Lessons:**
- Use `(declare fn-name)` for forward references within a namespace
- Add empty `resolvers`/`mutations` vectors for Pathom integration even if empty
- Always require `clojure.string` explicitly - don't rely on transitive requires
- Test after every namespace split to catch missing requires early

**Results:**
- All 91 tests pass
- 5 focused modules vs 1 god module
- Clear separation of concerns
- Easier to test and extend

---

## Patterns

### 1. Iterative Phase-Based Development

Build in phases: Core → Intelligence → Interface → Production. Each phase standalone usable.

**Phases:**
1. **Core Platform** — Engine, Query, Interface (foundation)
2. **Intelligence Layer** — History, Memory, Knowledge, AI, Telemetry (capabilities)
3. **Chat Platforms** — Telegram, Slack, Agent with LLMs (user interface)
4. **Production** — Auth, Dashboard (operational readiness)

**Lesson:** Each phase must be usable standalone. Don't block Phase 2 on Phase 4 features.

---

### 2. Distinguish Similar Concepts Explicitly

**Problem:** Two different "flywheels" with similar names caused confusion:
- **Product Dev Flywheel** (4 phases): Empathy→Value Prop→MVP→Canvas
- **Learning Flywheel** (4 levels): Utility→Understanding→Insight→Wisdom

**Solution:** 
- Always qualify: "Product Dev Flywheel" vs "Learning Flywheel"
- Never say "the flywheel" without context
- Create CONCEPTS.md with clear definitions
- Add notes in documents that might be confused

**Lesson:** When two concepts share a name, explicitly distinguish them everywhere. Don't assume context makes it clear.

---

### 3. Protocol-Based Abstraction

Define interfaces first (`ChatAdapter`), implement platforms second (Telegram, Slack).

```clojure
(defprotocol ChatAdapter
  (start! [this handler])
  (send-message! [this chat-id text]))
```

**Applied to:** Telegram (HTTP), Slack (WebSocket), extendable to Discord, WhatsApp, etc.

---

### 3. Unified Query Interface

One query language (EQL) for everything. System becomes self-documenting.

**Before (scattered):**
- `(git/commits)` for git
- `(fs/list-files)` for files
- `(system/status)` for health

**After (unified):**
```clojure
(iface/q [:system/status
          {:git/commits [:git/hash]}
          {:knowledge/files [:file/name]}])
```

---

### 4. Observability by Design

Telemetry woven into every layer. If you can't observe it, you can't operate it.

**Events emitted:**
- `:tool/invoke` — AI tool execution

- `:chat/message` — User message
- `:agent/generate` — LLM call
- `:auth/user-created` — New user

---

### 5. Safety Through Boundaries

Same system, different safety profiles per interface.

**Boundaries enforced:**
- **Chat-safe tools:** Only 11 of 13 tools exposed (no `:openapi/call`)
- **Rate limiting:** 30 msgs/min per user
- **Role-based access:** `:user` vs `:admin`
- **API tokens:** For programmatic access

---

### 6. Functional Composition

Small, focused modules. Clear ownership. Interface as unified surface.

```
ouroboros.engine    → Statecharts
ouroboros.query     → EQL interface
ouroboros.agent     → LLM integration
ouroboros.auth      → Identity/rate limits
ouroboros.interface → Unified surface
```

---

### 7. Runtime Discoverability

System documents itself via queries. No stale documentation.

**Self-querying:**
- `[:introspection/configuration]` — What states exist?
- `[:ai/tools]` — What can the AI do?

- `[:auth/users]` — Who's registered?

---

### 8. Extract Shared Infrastructure

When two modules implement similar functionality (WebSocket for Discord/Slack), extract shared utilities. Reduces duplication, ensures consistency, makes third implementation trivial.

---

### 10. Configuration as Data

12-factor app configuration: defaults < .env < config.edn < environment variables. Deep merge nested maps. Never commit secrets.

```clojure
(defn deep-merge [& maps]
  (if (every? map? maps)
    (apply merge-with deep-merge maps)
    (last maps)))

;; Usage: (deep-merge defaults env-config file-config)
```

**Environment mapping:**
```clojure
(def env-mapping
  {"TELEGRAM_TOKEN" [:chat :telegram :token]
   "OPENAI_KEY" [:ai :openai :api-key]})

(def config
  (reduce (fn [acc [env-var ks]]
            (if-let [val (System/getenv env-var)]
              (assoc-in acc ks val)
              acc))
          {} env-mapping))
```

### 11. Schema Validation Pattern

Define expected shape up front, validate at runtime.

```clojure
(def schema
  {:id {:type :keyword :required true}
   :version {:type :string :pattern #"^\d+\.\d+\.\d+$"}})

(defn validate [data schema]
  (let [errors (check-required data schema)]
    (if (seq errors)
      {:valid? false :errors errors}
      {:valid? true})))
```

---

### 12. Pre-Commit Hooks for Quality Gates

Automate testing before commits to prevent broken code from entering history.

```bash
# Install hook
bb git:install-hooks

# Hook runs bb test before every commit
# Bypass with: git commit --no-verify (emergencies only)
```

**Lesson:** Version hooks in `scripts/git-hooks/`, install via task.

---

### 13. Pathom EQL Attribute Conventions

Pathom resolvers use namespaced keywords (`:memory/key`), not hyphenated (`:memory-key`).

```clojure
;; Wrong - won't resolve
(q [{[:memory-key key] [:memory/value]}])

;; Correct - matches resolver input
(q [{[:memory/key key] [:memory/value :memory/exists?]}])
```

---

### 14. Pathom Mutation Symbol Qualification

Mutations must be called with fully qualified symbols as registered.

```clojure
;; Registered as: ouroboros.memory/memory-save!
(m 'ouroboros.memory/memory-save! {:memory/key k :memory/value v})

;; Wrong - 'memory/save! won't be found
(m 'memory/save! {...})
```

**Debug:** Check registered mutations:
```clojure
(keys (:com.wsscode.pathom3.connect.indexes/index-mutations @env))
```

**Mutation Result Keys:** Pathom returns mutation results with symbol keys (not keywords). When querying mutations via `(q [{(mutation params) ...}])`, the result map will have a key like `ouroboros.webux/create-project!` (a symbol), not `:webux/create-project!` (a keyword).

```clojure
;; Query pattern
(let [result (q `[{(webux/create-project! params) [:project/id]}])
      ;; Extract using symbol key
      project (get result 'ouroboros.webux/create-project!)]
  ...)
```

**Why:** Pathom stores mutations in its index with fully qualified symbols as keys. The query processor preserves these symbols in the result map.

---

### 15. Tool-Centric AI

LLMs work best when given tools, not just prompts.

**Agent workflow:**
1. User message
2. LLM decides which tools to call
3. Execute tools
4. LLM synthesizes results
5. Natural language response

**Tools exposed:**
- `:file/read` — Code inspection
- `:git/status` — Repository state
- `:http/get` — Web fetching
- `:system/status` — Health check

---

### 16. The Ouroboros Loop

The system feeds itself:

```
Human → Chat → Agent → Tools → Query → Engine
  ↑                                    ↓
  └────── Telemetry ← Memory ←────────┘
```

**Each interaction:**
- Generates telemetry (observable)
- Updates memory (persistent)
- Triggers state changes (introspectable)

---

### 17. Prefer ripgrep (rg) over grep

Use `rg` for all code searching. It's faster, respects `.gitignore`, and has better defaults.

**Why:**
- Recursive by default
- Respects `.gitignore` and `.rgignore`
- Parallel search across files
- Better Unicode and binary file handling
- Colorized output by default

**Examples:**
```bash
# Find function definitions
rg "defn.*foo" src/

# Case-insensitive search
rg -i "todo" src/

# Search specific file types
rg "defprotocol" -t clj

# Replace (with --replace flag)
rg "old-name" -r "new-name"
```

**Note:** Only fall back to `grep` on systems where `rg` isn't available (rare).

### 18. Shell Command Process Management

**Problem:** Long-running processes started via `shell_command` with `nohup + &` can cause orphaned processes, timeout issues, and unpredictable behavior.

**Solution:** Never combine `nohup` and `&` in `shell_command` calls. The tool blocks until completion; backgrounding defeats this mechanism. Use appropriate service managers instead:

- **System services:** `systemd` for daemons
- **Container orchestration:** `docker` with health checks
- **Terminal multiplexers:** `screen` or `tmux` for interactive sessions
- **Process supervisors:** `supervisord` for production process management

**Example Anti-Pattern:**
```bash
# Wrong: orphaned process, tool timeout unpredictable
nohup ./long-running-server > server.log 2>&1 &
```

**Example Solutions:**
```bash
# Use systemd service
sudo systemctl start my-service

# Use docker container
docker run -d --name my-service my-image

# Use screen/tmux session (interactive)
screen -S mysession -d -m ./server

# Use supervisor
supervisorctl start my-service
```

**Key Insight:** The `shell_command` tool is designed for synchronous execution with clear lifecycle. For long-running processes, delegate to proper process management systems.

### 19. Working Long-Running Process Pattern

**Problem:** Need to start a long-running process via `shell_command` without causing timeouts or orphaned processes.

**Solution:** Create a wrapper script that:
1. **Daemonizes properly** - Uses `nohup` with output redirection to a runner script
2. **Exits quickly** - The wrapper returns control immediately
3. **Manages state** - PID files for tracking, log files for output
4. **Cleans up** - Removes PID files when processes exit

**Working Implementation:**
```bash
#!/bin/bash
# process-runner-daemon.sh - Daemon-based process runner (legacy)

BASE_DIR="/tmp/process-runner"
mkdir -p "$BASE_DIR"

daemonize() {
    local name="$1"
    local command="$2"
    
    # Create runner script
    cat > "$BASE_DIR/$name-runner.sh" <<EOF
#!/bin/bash
echo \$\$ > "$BASE_DIR/$name.pid"
exec > "$BASE_DIR/$name.log" 2>&1
eval "$command"
rm -f "$BASE_DIR/$name.pid"
EOF
    
    chmod +x "$BASE_DIR/$name-runner.sh"
    nohup bash "$BASE_DIR/$name-runner.sh" >/dev/null 2>&1 &
}

# Usage: daemonize "webserver" "python -m http.server 8080"
```

**Why This Works:**
- `nohup` is used **outside** the `shell_command` context (in the runner script)
- The wrapper script exits immediately after starting the daemon
- PID tracking enables management (stop, status, logs)
- Log capture provides output visibility
- Cleanup happens automatically on process exit

**Control Commands:**
```bash
# Start (exits immediately)
./process-runner-daemon.sh start webserver "python -m http.server 8080"

# Check status  
./process-runner-daemon.sh status webserver

# View logs
./process-runner-daemon.sh logs webserver -f

# Stop gracefully
./process-runner-daemon.sh stop webserver

# List all processes
./process-runner-daemon.sh list
```

**Key Insight:** The anti-pattern isn't `nohup + &` itself, but using them **within** `shell_command`. By delegating to a properly daemonized runner script, we get reliable long-running processes with full control.

### 20. Tmux-Based Interactive Process Management

**Problem:** Need full interactive control (real-time output viewing, input sending) for long-running processes via `shell_command`.

**Solution:** Use `tmux` as a process manager. `tmux new -s name -d 'command'` creates a detached session that persists, allowing later attachment and control.

**Working Implementation:**
```bash
#!/bin/bash
# process-runner.sh - Interactive process management with tmux

# Start process in detached tmux session
tmux new-session -s "proc-$name" -d "bash -c '$command'; exec bash"

# Later control:
tmux attach -t "proc-$name"        # Interactive attachment
tmux send-keys -t "proc-$name" "ls" Enter  # Send input
tmux capture-pane -t "proc-$name" -p      # View output
tmux kill-session -t "proc-$name"         # Stop process
```

**Full-featured wrapper:** `scripts/process-runner.sh` provides complete management:

```bash
# Start (exits immediately, works with shell_command)
./scripts/process-runner.sh start webserver "python -m http.server 8081"

# Interactive control (all 4 requirements):
./scripts/process-runner.sh attach webserver   # 1. Real-time output viewing
./scripts/process-runner.sh send webserver "ls" # 2. Interactive input
./scripts/process-runner.sh status webserver    # 3. Process management
./scripts/process-runner.sh logs webserver -f   # 4. All combined

# Additional controls:
./scripts/process-runner.sh check     # Verify tmux installation
./scripts/process-runner.sh list      # List all sessions
./scripts/process-runner.sh stop webserver
```

**Why This Is Better Than Basic Daemonization:**
- **True interactivity**: Attach to see real-time output and type commands
- **Input capability**: Send commands to running processes
- **Visual management**: `list` shows all sessions with status
- **No log file limitations**: View entire scrollback buffer, not just log tail
- **Persistent sessions**: Sessions survive disconnection

**Key Insight:** `tmux` is already recommended in AGENTS.md as an appropriate service manager. By wrapping it in a script that exits quickly, we get the best of both worlds: `shell_command` compatibility with full interactive control.

### 21. Process-Runner Integration in Development Workflow

**Problem:** Development workflow tasks (`bb dev`, `bb dev:backend`, etc.) used ad-hoc process management with `p/process` and manual cleanup, lacking consistency and interactive control.

**Solution:** Migrate all long-running development tasks to use the unified `ouroboros.process-runner` system with tmux session management.

**Implementation in `bb.edn`:**
```clojure
;; Process runner CLI interface
process
{:doc "Manage long-running processes with tmux (start, stop, status, logs, etc.)"
 :requires ([ouroboros.process-runner])
 :task (apply ouroboros.process-runner/-main *command-line-args*)}

;; Full dev stack with health checks
dev
{:doc "Start full dev stack with health checks and tmux session management"
 :requires ([ouroboros.process-runner :as pr])
 :task (do
         ;; Start backend in tmux session
         (pr/start! "ouroboros-backend" "clojure -M -m ouroboros.dashboard")
         
         ;; Wait for backend health endpoint
         (wait-for-backend 30)
         
         ;; Start frontend in separate tmux session
         (pr/start! "ouroboros-frontend" "npx shadow-cljs watch dashboard")
         
         ;; Cleanup on shutdown
         (.addShutdownHook (Runtime/getRuntime)
           (Thread. (fn [] (cleanup)))))}  ; Uses pr/stop!
```

**Individual Task Migration:**
```clojure
dev:backend    → pr/start! "ouroboros-backend" "clojure -M -m ouroboros.dashboard"
dev:frontend   → pr/start! "ouroboros-frontend" "npx shadow-cljs watch dashboard"
dev:stop       → pr/stop! for both sessions
dev:logs       → pr/logs with :follow? true
dashboard      → pr/start! "dashboard" "clojure -M -m ouroboros.dashboard"
frontend:dev   → pr/start! "frontend-dev" "npx shadow-cljs watch dashboard"
frontend:server → pr/start! "frontend-server" "npx shadow-cljs server"
```

**Session Naming Convention:**
- `proc-ouroboros-backend` - Backend dashboard server
- `proc-ouroboros-frontend` - Frontend dev server
- `proc-dashboard` - Dashboard-only sessions
- `proc-frontend-dev` - Frontend development sessions
- `proc-frontend-server` - Shadow-CLJS server sessions

**Key Benefits:**
1. **Consistent Management**: All processes use same API (`start!`, `stop!`, `logs`, `status`)
2. **Interactive Control**: Attach to any session with `bb process attach <name>`
3. **Session Isolation**: Each process in isolated tmux session with `proc-` prefix
4. **Health Integration**: Backend health checks before starting frontend
5. **Clean Shutdown**: Proper cleanup on Ctrl+C via shutdown hooks
6. **Log Centralization**: Unified log viewing via `bb process logs` or `bb dev:logs`

**Critical Fixes Applied:**
1. **Babashka EDN regex literals**: Replaced `#"already exists"` with `(re-pattern "already exists")`
2. **Task formatting**: Fixed comment/task separation lines causing parsing issues
3. **Task discovery**: All tasks properly appear in `bb tasks` output

**Usage Examples:**
```bash
# Full stack with health checks
bb dev

# Individual components
bb dev:backend
bb dev:frontend
bb frontend:dev
bb dashboard

# Process management
bb process list
bb process logs ouroboros-backend -f
bb process attach ouroboros-frontend

# Stop everything
bb dev:stop
```

**Key Insight:** Unify all process management through a single abstraction (`ouroboros.process-runner`) to ensure consistency, interactive control, and proper lifecycle management across development workflows.

---

### 22. LSP/JSON-RPC Content-Length Is Bytes, Not Characters

**Problem:** ECA IPC was silently dropping all messages after the first large notification containing multi-byte UTF-8 characters (e.g., unicode in tool descriptions). The `chat/prompt` RPC returned `{status: "prompting"}` but no `chat/contentReceived` notifications ever arrived.

**Root Cause:** The JSON-RPC reader used `BufferedReader` (character-based) but `Content-Length` headers specify **bytes**. When ECA sent a message with `Content-Length: 18291` that contained multi-byte UTF-8 characters, the actual character count was lower (~18230 chars). `BufferedReader.read(char[], 0, 18291)` consumed 18291 **chars** which was more **bytes** than intended, eating into the next message's framing. All subsequent messages were corrupted.

**Diagnostic approach:**
1. Raw byte-level dump of ECA stdout showed messages were being sent correctly
2. Noticed `tool/serverUpdated` notification (18291 Content-Length) was the last successfully parsed message
3. Computed: 18291 bytes = 18230 chars (61 multi-byte characters in MCP tool descriptions)
4. After that message, reader was 61 bytes ahead in the stream, corrupting all subsequent frames

**Solution:** Read from `BufferedInputStream` (byte-level), not `BufferedReader` (character-level):

```clojure
;; WRONG - BufferedReader reads chars, Content-Length is bytes
(let [reader (BufferedReader. (InputStreamReader. stdout))
      chars (char-array content-length)]
  (.read reader chars 0 content-length)  ; reads N chars, not N bytes!
  (String. chars))

;; CORRECT - BufferedInputStream reads bytes, then decode to string
(let [stream (BufferedInputStream. stdout)
      bytes (byte-array content-length)]
  ;; Read exactly content-length bytes
  (loop [offset 0]
    (when (< offset content-length)
      (let [n (.read stream bytes offset (- content-length offset))]
        (when (pos? n)
          (recur (+ offset n))))))
  (String. bytes "UTF-8"))
```

Also fix the serializer to compute Content-Length from bytes, not chars:
```clojure
;; WRONG
(str "Content-Length: " (count json-string) "\r\n\r\n" json-string)

;; CORRECT
(let [json-bytes (.getBytes json-string "UTF-8")]
  (str "Content-Length: " (alength json-bytes) "\r\n\r\n" json-string))
```

**Key Insight:** This is the single most common LSP client implementation bug on the JVM. Any protocol using `Content-Length` in bytes MUST read from raw byte streams. `Reader`/`BufferedReader` decode bytes to chars, making it impossible to honor byte-count headers when multi-byte UTF-8 is present. The failure is silent and intermittent -- it only manifests when messages happen to contain enough multi-byte characters to shift the byte/char offset.

**Additional fixes in the same session:**
- Removed `Thread/sleep 100` from read-loop (IO blocks naturally on `InputStream.read`)
- Added EOF detection (nil response stops loop instead of spinning)
- Preserved `:callbacks` across `start!` restarts
- Added `{:wait? true}` mode to `chat-prompt` for synchronous response collection
- Suppressed noisy read errors during shutdown

### 23. WebUX = State/CRUD, ECA = Knowledge/Wisdom

**Problem:** The flywheel UI has wisdom components (tips sidebar, templates, prompt suggestions, phase guidance) but all content is **static hardcoded `def` blocks** -- 50+ pieces of content across 6 files. The chat sidebar has a working ECA streaming pipeline but wisdom features don't use it.

**Anti-Pattern: Hardcoded Wisdom Content**

```clojure
;; BAD - static knowledge that can't adapt to user's project context
(def wisdom-tips
  {:empathy [{:title "Start with Why" :text "Understanding your users..."}
             {:title "Observe First" :text "Watch how people currently..."}]
   :value-prop [{:title "Be Specific" :text "Vague value props fail..."}]})
```

This is wrong because:
1. Tips don't reflect the user's actual project data
2. Same tips shown to every user regardless of progress
3. No learning or adaptation over time
4. Duplicates knowledge that ECA/LLM already has

**Correct Pattern: Dynamic Wisdom via ECA**

```clojure
;; GOOD - wisdom comes from ECA/LLM with project context
(defn request-wisdom! [project-id phase]
  (let [context (assemble-project-context project-id)]
    (ws/send! {:type "eca/wisdom"
               :project-id project-id
               :phase phase
               :context context})))

;; Backend streams ECA-generated tips back to frontend
;; Same pipeline pattern as chat sidebar
```

**Architecture Principle:** **WebUX = state/CRUD/interaction. ECA = knowledge/wisdom/guidance.**

- WebUX handles: Project creation, builder interactions, drag/drop, form fields, undo/redo, presence
- ECA handles: Tips, templates, suggestions, analysis, insights, phase guidance, learning patterns

**Reference Implementation:** The chat sidebar (`chat_panel.cljs` + `websocket.clj`) is the model for how all wisdom should work:
1. Frontend sends context + request via WebSocket
2. Backend assembles project context, sends to ECA
3. ECA streams response tokens back
4. Frontend renders progressively with Fulcro render scheduling

**Static Content Inventory (to replace):**

| File | What | Count |
|------|------|-------|
| `components.cljs` | `wisdom-tips` def | 20 tips |
| `wisdom.cljs` | `templates` def | 6 templates |
| `wisdom.cljs` | `learning-categories` def | 4 categories |
| `project_detail.cljs` | `flywheel-phases` def | Phase descriptions |
| `chat_panel.cljs` | `context-suggestions` def | 28 suggestions |

**Key Insight:** If a piece of content in the UI could be better with knowledge of the user's project data, it should come from ECA, not from a `def` block.

---

### 24. Fulcro Render Scheduling for WebSocket State Mutations

**Problem:** WebSocket message handlers that mutate Fulcro's state atom via `swap!` don't trigger re-renders. Chat messages would appear only after the *next* user action triggered a render.

**Root Cause:** Fulcro doesn't `add-watch` its state atom. It only re-renders after `comp/transact!` or `app/schedule-render!`. Direct `swap!` on the state atom changes the data but Fulcro doesn't know to re-render.

**Solution:**

```clojure
;; websocket.cljs - store render callback in defonce atom
(defonce render-callback (atom nil))

(defn set-render-callback! [cb]
  (reset! render-callback cb))

(defn schedule-render! []
  (when-let [cb @render-callback]
    (cb)))

;; app.cljs - set callback during init
(set-render-callback! #(app/schedule-render! APP))

;; Every WS handler that mutates state must call:
(swap! state assoc-in [...] data)
(schedule-render!)  ;; <- CRITICAL
```

**Hot Reload Caveat:** `defonce` atoms survive Shadow-CLJS hot reload, but `init` doesn't re-run. The `refresh` hook in `client.cljs` must re-set the render callback:

```clojure
(defn ^:dev/after-load refresh []
  (ws/set-render-callback! #(app/schedule-render! APP))
  (app/mount! APP Root "app"))
```

**Key Insight:** Any code path that bypasses Fulcro's transaction system (direct `swap!`, WebSocket handlers, external events) must explicitly schedule renders. This is the #1 gotcha when integrating real-time data with Fulcro.

---

## Anti-Patterns

### Circular Dependencies

**Problem:** `ouroboros.ai` needed `ouroboros.query`, which needed `ouroboros.ai`.

**Solution 1 (Legacy):** Use `(resolve 'symbol)` for late binding.
```clojure
:fn (fn [_] ((resolve 'ouroboros.query/q) [:system/status]))
```

**Solution 2 (Preferred):** Extract registry to separate namespace.
```clojure
;; ouroboros.tool-registry - no dependencies, just storage
(defonce registry-atom (atom {}))

;; ouroboros.tool-defs - depends on registry and query
(defn- make-query-tool []
  {:fn (fn [params] (query/q ...))})
```

**Solution 3 (Refactored 2025-02):** Resolver Registry Pattern

Instead of query requiring all namespaces (circular), each namespace registers its resolvers:

```clojure
;; ouroboros.resolver-registry - central registry, no deps
(defonce resolver-registry (atom []))

(defn register-resolvers! [resolvers]
  (swap! resolver-registry into resolvers))

;; In each resolver namespace (e.g., ouroboros.history)
(def resolvers [git-commits git-status ...])
(registry/register-resolvers! resolvers)

;; query.clj - just collects registered resolvers
(defn create-env []
  (-> (pci/register (registry/all-resolvers))
      (pci/register (registry/all-mutations))))
```

**Benefits:**
- Query goes from 16 requires to 3
- No circular dependencies
- Resolvers self-register on namespace load
- Easy to add new resolver namespaces without touching query

**Protocol Extraction:**
When adapters need protocols but shouldn't depend on the whole namespace:

```clojure
;; Extract to ouroboros.chat.protocol
(defprotocol ChatAdapter
  (start! [this handler])
  (send-message! [this chat-id text]))

;; Adapters use protocol namespace only
(ns ouroboros.chat.telegram
  (:require [ouroboros.chat.protocol :as chatp]))

(defrecord TelegramBot [...]
  chatp/ChatAdapter
  ...)
```

---

### HTTP Server Dependency

**Problem:** `babashka.http-server` not available in all Babashka distributions.

**Lesson:** Don't depend on libraries that aren't universally available.

---

### Unchecked Tool Parameters

**Problem:** Tools accept any parameters, leading to runtime failures.

```clojure
;; Bad - no validation
(defn file-read [{:keys [path lines]}]
  (slurp path))  ; Fails if path nil

;; Better - explicit checks
(defn file-read [{:keys [path lines] :or {lines 100}}]
  (when (nil? path)
    (throw (ex-info "Path required" {:type :validation-error})))
  (slurp path))
```

### Orphaned Processes After Tmux Kill

**Problem:** `tmux kill-session` sends SIGHUP to processes in the session, but some processes (Java/Clojure, Python with signal handlers) may ignore SIGHUP or not propagate it to child processes, leaving orphaned processes still running on ports.

**Example:** After `bb dev:stop`, backend Java process remained alive on port 8080, requiring manual `kill -15`.

**Solution:** Enhance process-runner to send SIGTERM/SIGKILL directly to the process group before killing the tmux session, or ensure commands are wrapped in a script that traps signals.

**Implementation idea:**
```bash
# Before tmux kill-session, find and kill process group
pkill -TERM -t "proc-$name"  # Kill by terminal
# Or store PID when starting and kill by PID
```

**Workaround:** For now, manually check for orphaned processes with `lsof -ti:PORT` after stopping sessions.

---

## Babashka / SCI Quirks

### Unicode in Docstrings

Em-dashes (—), smart quotes cause cryptic parse errors.

**Error:**
```
Invalid number: 1.0.0
Don't know how to create ISeq from: clojure.lang.Symbol
```

**Fix:**
```clojure
;; Bad - contains em-dash
"Core principle — execution"

;; Good - plain ASCII
"Core principle - execution"
```

---

### defonce with Metadata and Docstring

SCI doesn't support docstrings in `defonce` with metadata.

```clojure
;; Broken in SCI
(defonce ^:private state
  "Docstring here"  ; Causes parse errors
  (atom {}))

;; Workaround - use comment
(defonce ^:private state
  ;; Docstring here
  (atom {}))
```

---

### No Recur Across Try

Cannot use `recur` inside a `try` block - JVM stack frame constraint.

**Real-world example from eca_client.clj:**
```clojure
;; Broken - "Cannot recur across try"
(defn- read-loop! []
  (future
    (loop []
      (when @running
        (try
          (if-let [response (read-jsonrpc-response stdout)]
            (do
              (if (:id response)
                (handle-response! response)
                (handle-notification! response))
              (recur))  ; ERROR
            (do
              (Thread/sleep 100)
              (recur))))  ; ERROR
          (catch Exception e
            (telemetry/emit! {:event :eca/read-error
                              :error (.getMessage e)})
            (when @running
              (Thread/sleep 1000)
              (recur))))))))  ; ERROR
```

**Fixed - restructure to keep recur outside try:**
```clojure
(defn- read-loop! []
  "Background thread to read responses from ECA"
  (let [{:keys [stdout running]} @state]
    (future
      (loop []
        (when @running
          (let [response (try
                           (read-jsonrpc-response stdout)
                           (catch Exception e
                             (telemetry/emit! {:event :eca/read-error
                                               :error (.getMessage e)})
                             nil))]
            (when response
              (if (:id response)
                (handle-response! response)
                (handle-notification! response))))
          (Thread/sleep 100)
          (recur))))))
```

**Key restructuring:**
1. Extract `try/catch` to wrap just the risky operation
2. Store result in `let` binding
3. Process result outside the `try` block
4. Keep `recur` in tail position, outside all `try` forms

**Simpler pattern - extract try into helper:**
```clojure
(defn- try-process [item]
  (try (process item)
       (catch Exception e {:error e})))

(loop [items xs]
  (let [result (try-process (first items))]
    (if (:error result)
      (recur (rest items))  ; OK - outside try
      result)))
```

---

### No Return Statements

Clojure functions return the last expression evaluated. There is no `return` keyword.

```clojure
;; Anti-pattern (won't work)
(defn check [x]
  (when (< x 0)
    (return {:error "negative"}))  ; ERROR
  {:value x})

;; Pattern (use if/cond)
(defn check [x]
  (if (< x 0)
    {:error "negative"}
    {:value x}))
```

---

### Use Babashka for System Scripts

**Rule:** For system automation, analysis, and tooling scripts, use Babashka (`bb`) instead of bash or other scripting languages.

**Why:** Babashka provides the full power of Clojure with fast startup, standard library access, and cross-platform compatibility. No context-switching between languages.

**Example - Namespace Dependency Audit:**

```clojure
#!/usr/bin/env bb
(require '[clojure.string :as str]
         '[clojure.java.io :as io])

(defn ns-name [f]
  (second (re-find #"\(ns\s+(\S+)" (slurp f))))

(defn requires [f]
  (->> (re-seq #"\[(ouroboros\.[^\s\]]+)" (slurp f))
       (map second) set))

(def files (->> (file-seq (io/file "src"))
                (filter #(str/ends-with? (.getName %) ".clj"))))

(def data (into {} (keep #(let [n (ns-name %)]
                            (when n [n {:requires (requires %)}]))
                         files)))

;; Find high fan-in (used by many namespaces)
(def rev (reduce (fn [acc [ns info]]
                   (reduce (fn [a r] (update a r (fnil conj #{}) ns))
                           acc (:requires info)))
                 {} data))

(println "=== HIGH FAN-IN (3+ importers) ===")
(doseq [[ns importers] (sort-by #(count (val %)) > rev)
        :when (>= (count importers) 3)]
  (println (format "%s: %d importers" ns (count importers))))
```

**Run it:**
```bash
bb audit_deps.clj
```

**Benefits:**
- Data structures (maps, sets) for building indexes
- Standard library (sort-by, filter, group-by)
- REPL-driven development of scripts
- Same language as the system being analyzed
- No shell escaping nightmares

---

## ClojureScript/Fulcro Frontend

### Architecture

Fulcro provides a complete, data-driven frontend framework with:
- **Normalized state** - Client state mirrors server structure
- **EQL queries** - Same query language for client and server
- **Dynamic routing** - Route-based code splitting
- **Hot reload** - Fast development cycle
- **WebSocket support** - Real-time telemetry updates

### Project Structure

```
src/frontend/ouroboros/frontend/
├── app.cljs          # Fulcro application configuration
├── client.cljs       # Entry point and hot reload
├── websocket.cljs    # WebSocket client for real-time updates
├── model/            # Data models
│   ├── system.cljs   # System status entities
│   ├── user.cljs     # User entities
│   ├── telemetry.cljs# Event entities
│   └── chat.cljs     # Chat session entities
└── ui/
    ├── components.cljs    # Reusable UI components
    ├── root.cljs          # Root component with router
    └── pages/
        ├── dashboard.cljs # Overview page (System Status + Telemetry)
        ├── telemetry.cljs # Events page (with live updates)
        ├── projects.cljs  # Single workspace project view
        ├── project_detail.cljs  # Project detail + flywheel
        ├── empathy_builder.cljs # Empathy Map builder
        ├── value_prop_builder.cljs # Value Prop builder
        ├── mvp_builder.cljs    # MVP builder
        ├── lean_canvas_builder.cljs # Lean Canvas builder
        └── wisdom.cljs    # Wisdom page
```

### Key Patterns

**1. Page Resolvers**
Backend provides page-level resolvers for each route:
```clojure
(pco/defresolver page-dashboard [_]
  {::pco/output [:page/id :system/healthy? :auth/user-count ...]}
  {:page/id :dashboard
   :system/healthy? (engine/healthy?)
   :auth/user-count (count @auth/users)
   ...})
```

**2. Route Loading**
Pages use `dr/route-deferred` to load data on navigation:
```clojure
:will-enter (fn [app route-params]
              (dr/route-deferred [:page/id :dashboard]
                #(df/load! app [:page/id :dashboard] DashboardPage
                   {:post-mutation `dr/target-ready
                    :post-mutation-params {:target [:page/id :dashboard]}})))
```

**3. Component Queries**
Components declare their data requirements:
```clojure
(defsc DashboardPage [this props]
  {:query [:system/healthy?
           :telemetry/total-events
           {:auth/users (comp/get-query User)}]
   :ident (fn [] [:page/id :dashboard])}
  ...)
```

**4. Real-time Updates via WebSocket**
Telemetry events flow from backend to frontend in real-time:
```clojure
;; Backend: Broadcast telemetry events
(defn telemetry-callback [event]
  (broadcast-to! :telemetry/events
    {:type :telemetry/event :data event}))

;; Frontend: Handle incoming events
(m/defmutation add-telemetry-event [{:keys [event]}]
  (action [{:keys [state]}]
    ;; Add to events list
    (swap! state update-in [:page/id :telemetry :telemetry/events]
           #(vec (cons event (take 49 %))))
    ;; Update stats
    (swap! state update-in [:page/id :telemetry :telemetry/total-events] inc)))
```

### Development Workflow

```bash
# Terminal 1: Start backend (with WebSocket support)
cd /Users/davidwu/workspace/ouroboros-v1
clojure -M -m ouroboros.dashboard

# Terminal 2: Start frontend dev server
cd /Users/davidwu/workspace/ouroboros-v1
bb frontend:dev
# Or: npx shadow-cljs watch dashboard
```

Access the app at http://localhost:8080
WebSocket endpoint: ws://localhost:8080/ws

### Production Build

```bash
# Build optimized JavaScript
bb frontend:build

# Files output to: resources/public/js/
```

### Features

| Feature | Implementation |
|---------|---------------|
| **Loading States** | Skeleton screens with shimmer animation |
| **Error Handling** | Retry buttons, error state UI |
| **Real-time Updates** | WebSocket with auto-reconnect |
| **Connection Status** | Live/offline indicator with pulse animation |
| **Responsive Design** | Mobile-friendly grid layouts |

---

## Architecture Decisions

### Dependency Injection Evaluation

**Current Approach:** Registry pattern + lazy loading
- **Pros:** Simple, no external dependencies, works with Babashka
- **Cons:** Manual registration, no lifecycle management

**Alternatives Considered:**

1. **Integrant** - Component lifecycle management
   - Pros: Clean lifecycle, dependency graph
   - Cons: Additional dependency, overkill for current scale
   - Verdict: Not needed yet

2. **Component** - Stuart Sierra's library
   - Pros: Industry standard, well-documented
   - Cons: Heavyweight, requires protocol definitions
   - Verdict: Too complex for current needs

3. **Mount** - State management
   - Pros: Simple, defstate macro
   - Cons: Global state, harder to test
   - Verdict: Registry pattern is cleaner

**Decision:** Stick with registry pattern. It's simple, testable, and sufficient for current architecture. Revisit if system grows beyond 100 components.

---

## ECA Integration

### Architecture Shift

Ouroboros now integrates with ECA (Editor Code Assistant) as its AI backend. This shifts Ouroboros from building AI capabilities to focusing on chat platform integration.

```
┌─────────────────────────────────────────────────────────┐
│                     Ouroboros                          │
│  Chat Adapters (Telegram, Discord, Slack, WebSocket)   │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │              ECA Protocol Client                │   │
│  │          (ouroboros.eca-client)                │   │
│  └─────────────────────────────────────────────────┘   │
│           │                                             │
│           ▼                                             │
│  ┌─────────────────────────────────────────────────┐   │
│  │                    ECA Binary                    │   │
│  │  LLM Providers, Tool Engine, Chat Interface     │   │
│  └─────────────────────────────────────────────────┘   │
```

### ECA Client (`ouroboros.eca-client`)

The ECA client implements JSON-RPC 2.0 communication over stdin/stdout.

**Key Features:**
- JSON-RPC framing with Content-Length headers
- Initialize handshake with capabilities negotiation
- Request/response handling with promise-based responses
- Notification handling for async events (tool approvals, content)
- Pathom integration for EQL access to ECA state

**Usage:**
```clojure
(require '[ouroboros.eca-client :as eca])

;; Start ECA
(eca/start!)

;; Check status
(eca/status)
;; => {:running true, :eca-path "...", :pending-requests 0}

;; Chat with AI
(eca/chat-prompt "What files are in the project?")

;; Query context
(eca/query-context)

;; Query files
(eca/query-files "*.clj")

;; Approve/reject tool calls
(eca/approve-tool! {:tool "file/read" :params {:path "..."}})
(eca/reject-tool! {:tool "shell/exec" :reason "Dangerous tool"})

;; Stop ECA
(eca/stop!)
```

**Pathom Integration:**
```clojure
;; Query ECA status
(q [:eca/running :eca/eca-path])

;; Start ECA via mutation
(m 'eca/start! {:eca-path "/path/to/eca"})

;; Chat via mutation
(m 'eca/chat! {:message "Hello!"})
```

### Protocol Methods

**Ouroboros → ECA (requests):**
- `initialize` — Handshake with capabilities
- `chat/prompt` — Send message to LLM
- `chat/queryContext` — Get context (repoMap, files)
- `chat/queryFiles` — Search files
- `chat/queryCommands` — Available commands

**ECA → Ouroboros (notifications):**
- `chat/content-received` — Assistant response
- `chat/toolCallApprove` — Request tool approval
- `chat/toolCallReject` — Tool call rejected
- `chat/promptStop` — Streaming stopped

### Tool Approval Bridge

Critical for security. All tool calls from ECA must be approved by the user via chat platform.

```
User: "Read config.json and summarize"
     │
     ▼
ECA → Ouroboros: chat/toolCallApprove
  {tool: "file/read", params: {path: "config.json"}}
     │
     ▼
Ouroboros → Telegram: "Allow file/read on config.json?"
     │
     User clicks ✅ or ❌
     │
     ▼
Ouroboros → ECA: chat/toolCallApprove (or Reject)
```

### ECA Binary Discovery

The ECA client automatically locates the ECA binary:

```clojure
(def ^:private default-eca-path
  (cond
    (System/getenv "ECA_PATH") (System/getenv "ECA_PATH")
    (babashka.fs/exists? "/usr/local/bin/eca") "/usr/local/bin/eca"
    (babashka.fs/exists? (str (System/getProperty "user.home") "/.local/bin/eca"))
    (str (System/getProperty "user.home") "/.local/bin/eca")
    :else "eca"))
```

Set `ECA_PATH` environment variable to override.

### Telemetry Events

The ECA client emits telemetry for observability:

| Event | Meaning |
|-------|---------|
| `:eca/send-request` | Sent JSON-RPC request |
| `:eca/notification` | Received notification |
| `:eca/response` | Received response |
| `:eca/initialize` | Started handshake |
| `:eca/initialized` | Handshake complete |
| `:eca/chat-prompt` | User message sent |
| `:eca/tool-approved` | Tool approved by user |
| `:eca/tool-rejected` | Tool rejected by user |
| `:eca/read-error` | Failed to read from ECA |
| `:eca/start-error` | Failed to start ECA |

---

## Open Questions

1. **Persistence:** Atoms are simple but not durable. Should we add Datomic/Datalevin?
2. **Scaling:** Single-process now. How to distribute across nodes?
3. **Security:** API tokens are basic. Need OAuth2/SAML for enterprise?
4. **Frontend:** ✅ ClojureScript/Fulcro implemented
5. **ECA Tool Bridge:** ✅ Implemented — ECA forwards tool calls to chat platforms for approval

---

## Web UX Platform Patterns

### 2026-02: Code Review Fixes

**Problem:** Web UX Platform code review revealed critical issues:
1. Memory leaks from unbounded `defonce` atoms
2. Non-deterministic color selection (random)
3. Missing input validation
4. Duplicated key generation patterns

**Solutions:**

**1. Session Cleanup with TTL**
```clojure
(def ^:private session-ttl-ms (* 24 60 60 1000))

(defn cleanup-stale-sessions! []
  (let [cutoff (- (System/currentTimeMillis) session-ttl-ms)]
    (swap! session-presence
           #(->> % (remove (fn [[_ users]] 
                            (every? (fn [u] (< (:joined-at u) cutoff)) 
                                   (vals users)))) 
                  (into {})))))
```

**2. Deterministic Color Selection**
```clojure
;; Before: (rand-nth colors) — non-deterministic, hard to test
;; After: hash-based selection
(defn- user-color [id] 
  (nth colors (mod (hash id) (count colors))))
```

**3. Input Validation at Boundaries**
```clojure
(pco/defmutation create-project! [{:keys [user-id name]}]
  (when (nil? user-id)
    (throw (ex-info "user-id required" {:param :user-id})))
  (when (str/blank? name)
    (throw (ex-info "name required" {:param :name})))
  ;; ... logic)
```

**4. Queue Compaction**
```clojure
(defn- compact-queue! [session-id]
  (swap! operation-queues update session-id 
         #(filterv (fn [op] (or (= (:status op) :pending)
                               (< (- (now) (:queued-at op)) retention)))
                    %)))
```

**Key Insight:** Production code needs explicit resource management—cleanup, validation, and bounds checking.

### 2026-02: Babashka vs JVM Test Separation

**Problem:** WebUX Platform tests depend on JVM Clojure features (Pathom3 records, http-kit WebSocket) that Babashka's SCI cannot handle. The `bb test:webux` task was failing with "sci.impl.records.SciRecord cannot be cast to clojure.lang.IFn".

**Solution:** Delegate WebUX test execution to JVM Clojure while maintaining the same `bb test:webux` command interface.

**Implementation:**
```clojure
;; bb.edn - delegate to JVM Clojure
:task (shell "clojure -M -e \"(load-file \\\"scripts/test_webux_jvm.clj\\\") (let [main (resolve 'scripts.test-webux-jvm/-main)] (main))\"")

;; scripts/test_webux_jvm.clj - JVM test runner
(ns scripts.test-webux-jvm
  (:require [clojure.test :as t]
            [ouroboros.webux-test]
            [ouroboros.wisdom-test]
            [ouroboros.analytics-test]))
```

**Key Changes:**
1. Updated `bb.edn` `test:webux` task to call JVM Clojure
2. Added `scripts/test_webux_jvm.clj` runner with proper namespace loading  
3. Added `scripts` to `deps.edn` `:paths` for classpath access
4. Removed attempt to run Pathom3 mutations via Babashka SCI

**Why SCI fails:**
- Pathom3 mutations create records that must implement `IFn` (function interface)
- SCI records don't implement `IFn` like JVM Clojure records
- http-kit WebSocket dependencies require JVM, not Babashka

**Result:** `bb test:webux` now runs WebUX Platform tests with JVM Clojure, while `bb test` continues to run Babashka-compatible tests.

**Key Insight:** Separate test execution environments based on dependencies—Babashka for lightweight tasks, JVM Clojure for full-stack features.

### 2026-02: Field Name Consistency and Sorting Patterns

**Problem:** Test failures revealed field name mismatches and incorrect sorting logic across modules.

**Issue 1: Wisdom Engine Field Mismatch**
- `wisdom.clj` used `:learning/created-at` but learning records store `:learning/created`
- `sort-by :learning/created-at >` failed with `ClassCastException: String cannot be cast to Number`

**Fix:**
```clojure
;; Before - wrong field name and comparator
:recent-insights (take 5 (sort-by :learning/created-at > learnings))

;; After - correct field name and reverse sort
:recent-insights (take 5 (reverse (sort-by :learning/created learnings)))
```

**Issue 2: Analytics Dashboard String Sorting**
- `analytics.clj` used `sort-by :project/updated-at >` on ISO timestamp strings
- Strings cannot be compared with `>` operator

**Fix:**
```clojure
;; Before - invalid comparator for strings
:recent-activity (take 5 (sort-by :project/updated-at > projects))

;; After - reverse sort for chronological order
:recent-activity (take 5 (reverse (sort-by :project/updated-at projects)))
```

**Issue 3: Empathy Map Completion Logic**
- Analytics calculated 6 sections but empathy map has 7 sections (`:pains` and `:gains` separate)
- Tests expected 6 sections, 33% completion for 2/6, but should be 2/7 = 28%

**Fix:**
```clojure
;; Before - combined pains-gains, wrong section count
(let [sections [:persona :think-feel :hear :see :say-do :pains-gains]]

;; After - separate pains and gains, correct section count  
(let [sections [:persona :think-feel :hear :see :say-do :pains :gains]]
```

**Key Insights:**
1. **Field Name Audit:** Verify field names across namespaces (e.g., `:learning/created` vs `:learning/created-at`)
2. **String Sorting:** Use `(reverse (sort-by ...))` for descending order of strings, not `>` comparator
3. **Schema Alignment:** Keep data models in sync between modules (empathy map sections count)
4. **Test Protection:** When merging test results, select only numeric keys to avoid `ClassCastException`

### 2026-02: Fulcro Inspect Compatibility

**Problem:** Shadow-CLJS build failed with Fulcro inspect version incompatibility warning.

**Issue:** `com.fulcrologic.fulcro.inspect.preload` caused errors in newer Fulcro versions.

**Solution:** Remove automatic preload, add conditional loading based on `goog.DEBUG`.

**Implementation:**
```clojure
;; shadow-cljs.edn - remove preloads
:devtools {:after-load ouroboros.frontend.client/refresh}  ;; removed preloads

;; client.cljs - conditional debug mode
:dev {:compiler-options {:closure-defines {goog.DEBUG true}}}
:release {:compiler-options {:closure-defines {goog.DEBUG false}}}

;; Optionally load inspect only in development
(when ^boolean goog.DEBUG
  (try (require '[com.fulcrologic.fulcro.inspect.tool :as inspect]) ...))
```

**Key Insight:** Development tools should be opt-in and version-agnostic; use feature flags for compatibility.

---

### 2026-02: Auto-Downloading Dependencies with bb Tasks

**Problem:** ECA integration tests required manual binary installation, creating friction for new developers.

**Solution:** `bb test:eca` task auto-detects platform, downloads correct binary, extracts, and verifies.

**Implementation:**
```clojure
;; bb.edn - test:eca task with auto-download
:test:eca
{:doc "Run ECA tests (auto-downloads binary if needed)"
 :requires ([clojure.test :as t]
            [babashka.fs :as fs]
            [babashka.process :refer [shell]])
 :task (let [;; Auto-detect platform
             os-name (System/getProperty "os.name")
             platform (cond (str/includes? os-name "Mac") "macos"
                            (str/includes? os-name "Linux") "linux"
                            :else "linux")
             arch (let [a (System/getProperty "os.arch")]
                    (cond (= a "aarch64") "aarch64"
                          (= a "x86_64") "amd64"
                          ...))
             ;; Construct download URL
             version "0.99.0"
             download-url (str "https://github.com/.../eca-native-"
                               platform "-" arch ".zip")
             ;; Auto-download if missing
             _ (when-not (fs/exists? "scripts/eca")
                 (shell "bb" "download" download-url zip-file)
                 (shell "unzip" "-o" zip-file "-d" "scripts")
                 (fs/set-posix-file-permissions "scripts/eca" "rwxr-xr-x"))
             ;; Run tests...
             ] ... )}
```

**Key Insights:**
1. **Platform Detection:** Use `System/getProperty` for OS/arch detection
2. **Zip Extraction:** GitHub releases use `.zip` format, extract with `unzip`
3. **Reuse download task:** Delegate to existing `bb download` task for resume/parallel support
4. **No regex in EDN:** EDN config can't use `#"..."`, use `str/includes?` instead

---

### 2026-02: Debug Utilities Namespace Pattern

**Problem:** Debugging ECA, system status, and tools required repetitive REPL commands across different namespaces.

**Solution:** Centralized `ouroboros.debug` namespace with common debug functions.

**Implementation:**
```clojure
;; src/ouroboros/debug.clj
(ns ouroboros.debug
  (:require [babashka.process :refer [shell]]
            [babashka.fs :as fs]))

(defn eca-status [] ...)
(defn eca-check [] ...)  ; pretty-printed
(defn eca-test-server [] ...)  ; test server mode
(defn system-status [] ...)
(defn tool-registry [] ...)
(defn debug-menu [] ...)  ; show all commands
```

**BB Task Integration:**
```clojure
;; bb.edn - debug task
:debug
{:doc "Debug utilities - Usage: bb debug [eca|system|tools|menu]"
 :requires ([ouroboros.debug :as dbg])
 :task (case (first *command-line-args*)
         ("eca" nil) (let [s (dbg/eca-status)] ...)
         ("system") (dbg/system-status)
         ("tools") (dbg/tool-registry)
         ("menu") (dbg/debug-menu)
         ... )}
```

**Usage:**
```bash
bb debug        # Quick ECA status
bb debug eca    # Same
bb debug system # System health
bb debug tools  # List tools
bb debug menu   # Show all commands
```

**Key Insights:**
1. **Single source of truth:** One namespace for all debug utilities
2. **Both REPL and CLI:** Same functions work in REPL and bb tasks
3. **Lazy loading:** Use `resolve` for functions from other namespaces to avoid circular deps
4. **Pretty output:** Box-drawing characters for human-readable reports

---

### 25. Hierarchical Agent Pattern (from Agent Zero)

**Problem:** Single agents get overwhelmed with complex tasks, context windows overflow, and parallel execution is hard to coordinate.

**Agent Zero Solution:** Superior/subordinate agent hierarchy:
```
User (Superior)
  └── Agent 0
       ├── Sub-agent A (research)
       └── Sub-agent B (coding)
```

**Benefits:**
1. **Clean context** — Each agent focuses on specific subtask
2. **Parallel execution** — Sub-agents work simultaneously
3. **Specialization** — Different models/tools per agent role
4. **Recoverability** — Failed sub-agents don't crash the main session

**Implementation in Ouroboros:**
```clojure
;; Create sub-agent for canvas building
(def empathy-agent
  {:role :empathy-builder
   :tools [:canvas/create :sticky-note/add]
   :parent-session :main-session
   :context {:project-id "proj-123"}})

;; Delegate with timeout
(subordinate/delegate! empathy-agent
  {:task "Build empathy map for SaaS product"
   :timeout-ms 300000
   :callback (fn [result] (ui/update-canvas result))})
```

**Key Insight:** Hierarchy is not just for coordination—it's for context management. When an agent's context grows too large, spawn a sub-agent to continue the work with fresh context.

---

### 26. Context Summarization Strategy (from Agent Zero)

**Problem:** Long chat sessions exceed LLM context windows, causing failures or degraded performance.

**Agent Zero Solution:** Tiered compression:
- **Recent (last 10 messages):** Full content, verbatim
- **Medium (10-50 messages ago):** Summarized with key facts
- **Old (50+ messages ago):** Condensed to decisions + outcomes only

**Implementation Pattern:**
```clojure
(defn compress-context [messages]
  (let [recent (take 10 messages)           ; Keep verbatim
        medium (take 40 (drop 10 messages)) ; Summarize
        old (drop 50 messages)]             ; Condense
    (concat recent
            (map summarize-message medium)
            [(condense-to-decisions old)])))
```

**Key Insight:** Not all history is equal. Recent context needs precision, old context needs only outcomes. This gives "near-infinite" effective memory.

**Ouroboros Already Implements This:**
Our documentation structure mirrors this tiered approach:
- **STATE.md** = Recent (now) — Full fidelity, current status
- **PLAN.md** = Medium-term — Intentions, roadmap, decisions
- **LEARNING.md** = Long-term — Distilled patterns, timeless wisdom

The same principle applies: STATE changes frequently with full detail, PLAN summarizes direction, LEARNING captures eternal truths.

---

### 27. Prompt-Driven Customization (from Agent Zero)

**Problem:** Customizing AI behavior requires code changes, limiting non-developer users.

**Agent Zero Solution:** Everything is prompts:
```
prompts/
├── agent.system.main.role.md
├── agent.system.main.communication.md
├── agent.system.main.solving.md
└── agent.system.tool.*.md
```

**This Is Already Ouroboros's Core Philosophy:**

Ouroboros is built on the principle that **behavior is data**, not code:

| Domain | Data-Driven Approach |
|--------|---------------------|
| **System lifecycle** | Statecharts define transitions in data |
| **Query interface** | Pathom resolvers registered as data |
| **Chat adapters** | Protocol-based, implementation swappable |
| **Memory/Knowledge** | EDN/JSONL files, not hardcoded |
| **Agent behavior** | → **Prompts as markdown** (same pattern) |

**Benefits:**
1. **Non-coder customization** — Modify behavior with text files
2. **Version control** — Prompts are code, tracked in git
3. **A/B testing** — Swap prompt directories to test behaviors
4. **Community sharing** — Share prompt packs like themes
5. **Queryable** — Load prompts via EQL: `(q [:prompt/system :prompt/tools])`

**Ouroboros Integration:**
```clojure
;; Load custom prompts from ~/.ouroboros/prompts/
(wisdom/load-prompt-profile! :my-custom)

;; Or per-project prompts
(wisdom/load-prompt-profile! "./project-prompts")

;; Query prompt library
(q [:prompt/system :prompt/tools])
;; => {:prompt/system "You are Ouroboros...", :prompt/tools [...]}
```

**Key Insight:** Prompts are the "source code" of agent behavior. This isn't new—it's the same pattern we use for resolvers, statecharts, and memory. Behavior as data, queryable and customizable.

---

### 28. Instruments: On-Demand Capabilities (from Agent Zero) — DELEGATED

**Problem:** Tools in system prompt consume tokens even when unused. Too many tools = context overflow.

**Agent Zero Solution:** Instruments stored in memory, recalled on demand.

**Ouroboros Status:** ✅ **Delegated to ECA**

Since we delegate AI capabilities to ECA (Editor Code Assistant), we don't need to build our own instruments system. ECA already provides:
- **Skills/procedures** — Extended capabilities beyond core tools
- **Context-aware selection** — Automatically chooses relevant tools
- **Dynamic loading** — Load capabilities on demand
- **Tool management** — Registry, discovery, execution

**What Ouroboros provides:**
- Chat platform integration (Telegram, Discord, Slack)
- Tool approval bridge (security layer)
- Unique platform capabilities (Web UX, collaboration)

**Key Insight:** Don't rebuild what ECA provides. Focus on what makes Ouroboros unique: multi-platform chat with collaborative product development.

---

### 29. Dynamic Behavior Adjustment (from Agent Zero)

**Problem:** User preferences ("always use UK English", "never use emojis") require code changes or repetitive prompting.

**Agent Zero Solution:** Runtime behavior rules stored in `behaviour.md`:
```markdown
# Behavior Rules
- Use UK English spelling (colour, not color)
- Provide code examples in Clojure first
- Always explain the "why" before the "how"
```

**Ouroboros Status:** Infrastructure exists, feature does not.

We have the foundation:
- `memory/save!` — Can store preferences
- `learning/remember` — Can store insights
- Prompt system — Can inject text into context

**Gap:** No dedicated behavior system that:
1. Stores user preferences separately from general memory
2. Automatically injects them into system prompts
3. Provides user-facing API for adding rules

**Proposed Implementation:**
```clojure
;; User says: "Always explain why before how"
(behavior/add-rule! :explain-why-first
  "Always explain the reasoning before providing the solution")

;; Rule automatically injected into system prompt
;; Persists across sessions
```

**Key Insight:** Agents should learn preferences like humans do—once stated, always applied. Behavior rules are "soft programming." We have the memory, just need the orchestration.

---

### 30. Terminal Introspection via Tmux

**Problem:** Need to determine terminal state programmatically (idle, prompt, cursor position) for AI/human handoff and automation.

**Solution:** Use tmux commands to query session state.

**Tmux Introspection Commands:**
```bash
# Get pane content (last N lines)
tmux capture-pane -t "session-name" -p -S -100

# Terminal dimensions
tmux display-message -t "session-name" -p "#{pane_width}x#{pane_height}"

# Cursor position
tmux display-message -t "session-name" -p "#{cursor_x} #{cursor_y}"

# Pane ID
tmux display-message -t "session-name" -p "#{pane_id}"
```

**Activity Tracking Pattern:**
```bash
# Store timestamps in file
ACTIVITY_FILE="/tmp/.process-runner-activities"

get_activity() {
    grep "^${name}:" "$ACTIVITY_FILE" | cut -d: -f2
}

update_activity() {
    echo "${name}:$(date +%s%3N)" >> "$ACTIVITY_FILE"
}
```

**Idle Detection Logic:**
```bash
idle?() {
    local name="$1"
    local threshold="${2:-5000}"
    local last_activity=$(get_activity "$name")
    local now=$(date +%s%3N)
    local time_since=$((now - last_activity))
    
    [ "$time_since" -lt "$threshold" ] && [ -n "$pane_content" ]
}
```

**Prompt Detection Patterns:**
```bash
# Different shells have different prompts
bash/zsh:   .*\$ *$
zsh:        .*❯ *$
fish:       .*> *$
git:        .*➜.*$
plan9:      .*λ.*$
```

**Cross-Platform Timestamp Challenge:**
macOS `date` doesn't support `%3N` for milliseconds. Fallbacks needed:

```bash
get_now_ms() {
    if date +%s%3N >/dev/null 2>&1; then
        date +%s%3N | sed 's/N$//'
    elif date -u +%s%3N >/dev/null 2>&1; then
        date -u +%s%3N | sed 's/N$//'
    elif command -v perl >/dev/null 2>&1; then
        perl -MTime::HiRes -e 'printf "%d\n", Time::HiRes::time() * 1000'
    elif command -v python3 >/dev/null 2>&1; then
        python3 -c 'import time; print(int(time.time() * 1000))'
    else
        echo $(($(date +%s) * 1000))
    fi
}
```

**Full Introspection API:**
```bash
./process-runner.sh idle <name> [ms]      # Check if idle
./process-runner.sh prompt <name>         # Detect shell prompt
./process-runner.sh terminal <name>       # Dimensions + cursor
./process-runner.sh stats <name>         # All data combined
./process-runner.sh recent <name> [ms]   # Output since timestamp
```

**Clojure API (equivalent):**
```clojure
(require '[ouroboros.process-runner :as pr])

(pr/idle? "webserver")          ;; Check idle state
(pr/at-prompt? "webserver")     ;; Detect prompt
(pr/terminal-state "webserver") ;; Get dimensions
(pr/session-stats "webserver")  ;; Full statistics
```

**Key Insights:**
1. **Tmux provides complete terminal introspection** — capture-pane, display-message
2. **Activity tracking requires persistent state** — file-based timestamp store
3. **Prompt patterns vary by shell** — flexible regex needed
4. **macOS date is limited** — need Perl/Python fallbacks for millisecond timestamps
5. **Escape special characters** — backslashes, quotes, backticks in output

---

### 31. ECA Wisdom Pipeline Pattern (End-to-End)

**Problem:** Wisdom components (tips sidebar, flywheel progress, quick tips page) displayed static hardcoded content. The chat sidebar had a working ECA streaming pipeline, but wisdom features didn't use it. Needed to extend the same pattern to all wisdom delivery.

**Solution:** Replicate the chat streaming architecture for wisdom, with project context enrichment.

**End-to-End Data Flow:**

```
Browser (wisdom sidebar opens in builder)
  -> ws/request-wisdom! sends {type: "eca/wisdom", project-id, phase, request-type}
  -> Backend websocket.clj handle-eca-wisdom!
       -> auto-start ECA if needed
       -> assemble project context (empathy entries, value prop, canvas)
       -> build system prompt with context + wisdom instruction
       -> register per-request callback for "chat/contentReceived"
       -> eca/chat-prompt with system + user prompt
  -> ECA binary -> LLM generates wisdom
  -> chat/contentReceived notifications arrive
       -> callback filters by chat-id
       -> text chunks -> send-to! client {:type :eca/wisdom-token :token "..."}
       -> "finished" -> send-to! {:type :eca/wisdom-done}
       -> unregister callback
  -> Frontend websocket.cljs dispatches
       -> :eca/wisdom-token -> swap! state, append content, schedule-render!
       -> :eca/wisdom-done -> set loading?/streaming? false, schedule-render!
  -> Fulcro re-renders wisdom-sidebar with ECA content
  -> If ECA unavailable: static fallback tips shown (graceful degradation)
```

**Key Design Decisions:**

1. **Reuse chat pipeline**: Same ECA callback registration, same streaming token pattern, same Fulcro render scheduling. Don't invent a new mechanism.

2. **Context enrichment**: Backend assembles project data (empathy map entries, value prop fields, canvas sections) into the system prompt so ECA/LLM generates project-specific wisdom, not generic tips.

3. **Static fallback**: Keep reduced static tips (3/phase instead of 5) as graceful degradation when ECA is unavailable. Don't remove fallback content entirely.

4. **Phase keyword mapping**: Backend uses domain keywords (`:empathy-map`, `:value-proposition`) while frontend uses short keywords (`:empathy`, `:valueprop`). Map at the boundary in `project_detail.cljs`.

5. **Per-request callbacks**: Each wisdom request registers a unique callback keyed by chat-id, then unregisters when done. Prevents cross-request interference.

**Frontend State Shape:**
```clojure
;; At [:wisdom/id :global] in Fulcro normalized state
{:wisdom/content ""          ;; Accumulated ECA streaming text
 :wisdom/loading? false      ;; Request in flight?
 :wisdom/streaming? false    ;; Actively receiving tokens?
 :wisdom/request-type :tips} ;; Which type was requested
```

**Files Modified (9 total):**
- `websocket.clj` -- Backend handlers: `handle-eca-wisdom!`, `handle-flywheel-progress!`
- `websocket.cljs` -- Frontend handlers: wisdom-token, wisdom-done, wisdom-response, flywheel/progress
- `components.cljs` -- `wisdom-sidebar` now ECA-powered with streaming + fallback
- `wisdom.cljs` -- Quick Tips section now ECA-powered
- `project_detail.cljs` -- Real flywheel progress from backend
- 4 builder files -- Pass `:project-id` to `wisdom-sidebar`

**Key Insight:** When you have a working streaming pipeline (chat), extending it to new use cases (wisdom) is mostly about context assembly on the backend and state management on the frontend. The transport layer (WebSocket + ECA callbacks + Fulcro render scheduling) stays the same.

---

### 32. Builder Data Persistence Pipeline (WebSocket Sync)

**Problem:** Builder interactions (adding sticky notes, filling sections) only existed in the frontend Fulcro state. The backend had no knowledge of what users actually built, so it couldn't detect completion or trigger analysis.

**Solution:** Wire every builder mutation to send data to the backend via WebSocket, with the backend persisting to memory and detecting builder completion.

**Data Flow:**
```
User adds sticky note / submits section
  -> Fulcro mutation (swap! state)
  -> sync helper reads updated state
  -> [500ms debounce for sticky-note builders]
  -> ws/save-builder-data!(project-id, session-id, builder-type, data)
  -> WebSocket "builder/save-data" message
  -> Backend handle-save-builder-data!
  -> memory/update! persists to session store
  -> Sends :builder/data-saved confirmation
  -> If builder-complete? AND not already completed:
    -> Marks session :completed
    -> Spawns future: handle-auto-insight!
```

**Builder Completion Detection:**
```clojure
;; Each builder type has a required section count
(def builder-section-counts
  {:empathy-map 6, :value-proposition 6, :mvp-planning 8, :lean-canvas 9})

;; Sticky-note builders: group by :item/section, count unique sections
;; Form builders: count unique :section-key values in response vector
(defn count-completed-sections [builder-type data] ...)

(defn builder-complete? [builder-type data]
  (>= (count-completed-sections builder-type data)
      (get builder-section-counts builder-type 0)))
```

**Session ID Conventions:**
| Builder | Pattern |
|---------|---------|
| Empathy Map | `(:session/id session)` or `"empathy-<project-id>"` |
| Value Prop | `"valueprop-<project-id>"` |
| MVP | `"mvp-<project-id>"` |
| Lean Canvas | `(:session/id session)` or `"canvas-<project-id>"` |

**Key Insight:** The backend doesn't need to understand builder UI interactions -- it just needs the data shape and section counts. Completion detection is a simple count check, not complex state machine logic.

---

### 33. Debounced WebSocket Sync in ClojureScript

**Problem:** Sticky-note builders fire mutations rapidly (add, update, delete, drag). Sending a WebSocket message on every mutation would flood the backend and waste bandwidth.

**Solution:** 500ms debounce using `js/setTimeout` with a `defonce` timer atom per builder.

**Implementation:**
```clojure
;; Per-builder debounce timer
(defonce ^:private empathy-sync-timer (atom nil))

(defn- sync-empathy-notes! [state]
  ;; Cancel previous timer
  (when-let [t @empathy-sync-timer]
    (js/clearTimeout t))
  ;; Set new timer - fires after 500ms of inactivity
  (reset! empathy-sync-timer
    (js/setTimeout
      (fn []
        (let [project-id (get-in @state [...])
              session-id (get-in @state [...])
              notes (get-in @state [...])]
          (ws/save-builder-data! project-id session-id :empathy-map notes)))
      500)))

;; Called from every mutation that changes notes
(m/defmutation add-empathy-note [params]
  (action [{:keys [state]}]
    (swap! state ...)
    (sync-empathy-notes! state)))
```

**Why `defonce`:** The timer atom must survive Shadow-CLJS hot reloads. Regular `def` would reset the timer reference, potentially orphaning in-flight timers.

**Pattern applies to:** Empathy Map builder (4 mutations), Lean Canvas builder (4 mutations). Value Prop and MVP builders use form submission (not per-keystroke), so they sync immediately without debounce.

**Key Insight:** Debounce at the sync boundary, not at the mutation boundary. The UI should feel instant (immediate `swap!`), while the network sync batches naturally.

---

### 34. Auto-Insight Streaming with Accumulation

**Problem:** When a builder completes, we want ECA to analyze the work and provide insights. The insight needs to be both streamed to the frontend (for real-time display) AND saved to learning memory (for persistence). But ECA streams tokens one at a time.

**Solution:** Accumulate streamed tokens in an atom during streaming, then save the complete text on stream completion.

**Implementation:**
```clojure
(defn- handle-auto-insight! [ch project-id builder-type user-id]
  (let [context (assemble-project-context project-id user-id)
        prompt (str "Analyze the " (name builder-type) " the user just completed...")
        ;; Accumulator for streamed text
        accumulated-text (atom "")]
    ;; Send start marker
    (send-to! ch {:type :eca/auto-insight-start :builder-type builder-type})
    ;; Register streaming callback
    (eca/register-callback! "chat/contentReceived" :auto-insight
      (fn [{:keys [text status]}]
        (when text
          (swap! accumulated-text str text)
          (send-to! ch {:type :eca/auto-insight-token :token text}))
        (when (= status "finished")
          ;; Save accumulated insight to learning memory
          (learning/save-insight!
            {:title (str (label builder-type) " Completion Insight")
             :content @accumulated-text
             :category "builder-insight"
             :tags [builder-type "auto-insight" project-id]})
          (send-to! ch {:type :eca/auto-insight-done})
          (eca/unregister-callback! "chat/contentReceived" :auto-insight))))
    ;; Trigger ECA
    (eca/chat-prompt prompt {:system-prompt (str context "\n\n" instruction)})))
```

**Frontend State (separate from wisdom):**
```clojure
;; At [:auto-insight/id <project-id>] -- NOT at [:wisdom/id :global]
{:auto-insight/content ""
 :auto-insight/loading? false
 :auto-insight/streaming? false
 :auto-insight/builder-type :empathy-map}
```

**Key Design Decisions:**
1. **Separate from wisdom state** -- Auto-insights are proactive (system-initiated), wisdom is reactive (user-requested). Different idents prevent interference.
2. **Accumulate in atom, save on done** -- Can't save to learning memory token by token. Atom accumulates, then bulk-saves on "finished".
3. **Run in future** -- `handle-auto-insight!` is spawned in a `future` from the save handler. Doesn't block the save confirmation response.

**Key Insight:** Streaming + persistence requires dual output: one channel for real-time UI (tokens), one for durable storage (accumulated text). An atom bridging the two is the simplest correct approach.

---

### 35. Single Project Per Instance -- Workspace Auto-Detection

**Problem:** The multi-project CRUD model (create/list/delete projects) didn't match the actual use case. Ouroboros runs in a specific workspace directory, and there's always exactly one project -- the current working directory.

**Solution:** Auto-detect the project from `user.dir` on WebSocket connect. No create form needed.

**Implementation:**

```clojure
;; Backend: websocket.clj
(defn- detect-workspace-info []
  (let [dir (System/getProperty "user.dir")
        name (last (str/split dir #"/"))]
    {:project/name name
     :project/path dir
     :project/description (str "Project from " dir)}))

(defn- ensure-workspace-project! [user-id]
  (let [info (detect-workspace-info)
        existing (webux/user-projects user-id)]
    (if (seq existing)
      (first existing)
      (webux/create-project! {:user-id user-id :name (:project/name info) ...}))))

;; On WS connect, after :connected message:
(send-to! ch {:type :project/detected :project (ensure-workspace-project! user-id)})
```

```clojure
;; Frontend: websocket.cljs
(defmethod handle-message :project/detected [msg]
  (let [project (:project msg)
        id (:project/id project)]
    ;; Normalize into Fulcro state at two locations:
    ;; 1. [:project/id <id>] -- normalized entity table
    ;; 2. [:workspace/project] -- quick access ref
    (swap! state assoc-in [:project/id id] project)
    (swap! state assoc :workspace/project project)
    (schedule-render!)))
```

**Frontend page rewrite:** `projects.cljs` no longer has a `ProjectForm` component. It reads `:workspace/project` from the raw state atom and displays it directly. Uses `(::app/state-atom (comp/any->app this))` to access raw Fulcro state.

**Key Insight:** When the deployment model is "one instance per workspace" (like VS Code extensions, editor plugins, or local dev tools), don't build multi-project CRUD. Auto-detect from the environment and present the single project directly.

---

### 36. Fulcro State Atom Access from Components

**Problem:** Need to read raw Fulcro normalized state from within a component (e.g., to access `:workspace/project` which isn't part of any component's EQL query).

**Solution:** Use `(::app/state-atom (comp/any->app this))` to get the raw state atom from any Fulcro component.

```clojure
(defsc ProjectsPage [this _]
  {:query [:page/id]
   :ident (fn [] [:page/id :projects])}
  (let [state-atom (::app/state-atom (comp/any->app this))
        project (:workspace/project @state-atom)]
    ;; Render project data directly from raw state
    (dom/div (dom/h1 (:project/name project)) ...)))
```

**When to use:**
- Data injected by external sources (WebSocket messages, not EQL queries)
- Global singleton data that doesn't fit component query model
- Workspace-level state shared across all pages

**When NOT to use:**
- Normal component data -- use `:query` and `:ident` instead
- Data that should trigger re-renders on change -- use `comp/transact!`

**Caveat:** Direct `deref` of the state atom during render works for reading, but mutations via `swap!` won't trigger re-renders. Always call `app/schedule-render!` after `swap!` on the state atom.

---

### 37. Remove Unused Pages Cleanly from Fulcro

**Problem:** Users and Sessions pages were chat-platform pages showing data from in-memory atoms. In the single-project WebUX model, these pages were always empty and irrelevant. Need to remove them without breaking the router or leaving orphaned references.

**Checklist for removing a Fulcro page:**

1. **`root.cljs`** -- Remove from router target list and remove the `:require` for the page namespace
2. **`components.cljs`** -- Remove navbar link (`nav-link` call)
3. **`dashboard.cljs`** (if applicable) -- Remove summary cards and related query keys (`:auth/user-count`, `:chat/session-count`, etc.)
4. **`query.clj`** (backend) -- Remove resolver output keys and data loading branches for removed pages. Remove namespace requires if no longer needed.
5. **Delete page files** -- `users.cljs`, `sessions.cljs` (verify no other files reference them)
6. **Verify** -- `bb test`, `bb test:webux`, Shadow-CLJS 0 warnings

**What we kept:** Backend modules (`ouroboros.auth`, `ouroboros.chat`) still exist and register their own Pathom resolvers. They're still required by `dashboard.clj` (HTTP server), `test_helper.clj`, `embed.clj`, etc. We only removed them from **page-level data loading** in `query.clj`.

**Key Insight:** Removing a page from a Fulcro app is a 6-point checklist: router targets, navbar links, dashboard cards, backend query resolver, file deletion, test verification. Miss any one and you'll have broken routes or orphaned code. Backend modules can stay if other parts of the system use them -- just remove them from the page data loading path.

---

### 38. Auto-Derived Kanban Board Pattern

**Problem:** Needed a Kanban board to show builder progress, but manually dragging cards between columns would duplicate state and drift from actual builder data. The board should always reflect reality.

**Solution:** Derive Kanban card status automatically from builder session data. No manual drag-and-drop.

**Status derivation logic:**
- **Done** -- Section has data (sticky notes in canvas builders, responses in form builders)
- **In Progress** -- Builder session exists but section is empty
- **Not Started** -- No builder session exists for that builder type

**Two builder architectures require different completion checks:**
```clojure
;; Canvas builders (Empathy Map, Value Prop): notes stored in maps keyed by section
(defn- canvas-section-completed? [data section-key]
  (let [notes (get-in data [:notes (name section-key)])]
    (and (seq notes) (> (count notes) 0))))

;; Form builders (MVP, Lean Canvas): responses stored as vectors of maps
(defn- form-section-completed? [data section-key]
  (let [responses (get-in data [:responses (name section-key)])]
    (and (seq responses) (> (count responses) 0))))
```

**Auto-refresh pattern:** When builder data is saved (`:builder/data-saved` WS message), the frontend automatically re-requests the Kanban board. This keeps the board in sync without polling.

**View toggle with module-level atom:** Used a simple `(defonce view-state (atom :flywheel))` instead of Fulcro mutations for the Flywheel/Kanban toggle. This is purely local UI state with no persistence needs -- an atom is simpler and avoids unnecessary Fulcro mutation boilerplate.

**Key Insight:** When a board's purpose is to visualize progress (not manage workflow), derive status from source data rather than storing it independently. This eliminates sync bugs and ensures the board is always truthful. The cost is that you can't have "manual override" statuses, but for progress tracking that's actually a feature -- the board can't lie.

---

### 39. Hardcoded-to-ECA Content Migration Pattern

**Problem:** ~17 categories of hardcoded static content across ~15 files (wisdom tips, templates, learning categories, analytics data, chat suggestions, flywheel phase descriptions, section hints, prediction messages). All these should come from ECA/LLM for personalized, context-aware guidance instead of generic `def` blocks.

**Solution:** Systematic audit + generic content generation handler + frontend ECA-first pattern.

**Step 1: Audit and categorize all hardcoded content**

Classify each piece into one of three buckets:
1. **Replace with ECA** -- Human-readable guidance text that benefits from project context (tips, suggestions, descriptions, predictions)
2. **Keep as static fallback** -- Structural data needed for instant UI load (builder section configs, route keys, icon names, keyboard shortcuts)
3. **Keep as-is** -- UI chrome that must be instant (onboarding tours, structural labels, CSS)

**Step 2: Backend -- Generic content handler**

Instead of one handler per content type, create a single generic `content/generate` handler dispatching by `:content-type`:

```clojure
(defn- handle-content-generate! [ch {:keys [content-type project-id context]}]
  (let [system-prompt (case content-type
                        :insights "Analyze project data and generate insights..."
                        :blockers "Identify potential blockers..."
                        :templates "Suggest project templates..."
                        :chat-suggestions "Generate context-aware chat prompts..."
                        :flywheel-guide "Generate flywheel phase guidance..."
                        :section-hints "Generate builder section hints..."
                        :learning-categories "Generate learning categories..."
                        (str "Generate " (name content-type) " content"))]
    ;; Stream tokens as :content/token, complete as :content/generated
    (stream-eca-content! ch system-prompt content-type)))
```

**Step 3: Backend -- Real analytics handler**

For analytics, compute REAL data from actual project/session state (don't fake it):

```clojure
(defn- handle-analytics-dashboard! [ch {:keys [project-id]}]
  ;; Compute from actual session data
  (let [progress (analytics/project-progress project-id user-id)
        health (analytics/calculate-health-score progress)
        funnel (analytics/completion-funnel project-id user-id)]
    ;; Send computed data immediately
    (send-to! ch {:type :analytics/dashboard :data {:progress progress :health health ...}})
    ;; Stream ECA prediction message asynchronously
    (future (stream-eca-prediction! ch project-id))))
```

**Step 4: Frontend -- ECA-first with fallback**

Each component reads ECA content from WS state, requests on mount if not cached, falls back to static while loading:

```clojure
;; Pattern used in all 7 frontend files
(let [eca-content (get-in @ws-state [:content/generated :templates])
      loading? (get-in @ws-state [:content/loading :templates])]
  ;; Request from ECA on first load
  (when (and (nil? eca-content) (not loading?))
    (ws/request-content! :templates))
  ;; Merge ECA over fallback
  (let [content (or eca-content fallback-templates)]
    (render-templates content)))
```

**Step 5: Empty hardcoded strings, preserve computation**

For backend wisdom/analytics, empty the human-readable TEXT strings but keep computation logic intact:

```clojure
;; Before: hardcoded prediction message
{:message "Strong potential for success. Focus on customer validation."}

;; After: empty string, ECA generates via analytics/dashboard handler
{:message ""}
;; ECA streams contextual prediction text as :analytics/prediction-token
```

**What stays static (by design):**
- Builder section configs (prompts, examples) -- UX structure, must load instantly
- Onboarding tour steps -- sequential flow, no project context needed
- Keyboard shortcuts, structural labels -- UI chrome
- Route keys, icon names, column names -- structural data

**Results:**
- 10 files changed (3 backend, 7 frontend)
- 2 new WS handlers: `analytics/dashboard`, `content/generate`
- 6 new frontend WS message handlers
- All 58 tests pass, 268 assertions, 0 failures
- No blank pages -- static fallback shown while ECA loads

**Key Insight:** The migration is about replacing _text_ not _logic_. Keep all computation (health scores, pattern detection, section counting, completion checks). Only replace the human-readable strings that benefit from project-specific context. A generic handler with content-type dispatch is far better than N specialized handlers for similar streaming patterns.

---

### 40. Fulcro Wrapped Form Elements Require React Keys on Children

**Problem:** React warning "Each child in a list should have a unique key prop" from `ForwardRef` on `dom/select` children, even though `dom/option` elements were positional (not in a `for` loop).

**Root Cause:** Fulcro's `dom/select`, `dom/input`, `dom/textarea`, and `dom/option` are wrapped form elements using `react/forwardRef`. The wrapper receives children via `React.createElement(forwardRef, props, child1, child2, ...)`, then internally clones `props` (which includes `props.children` as a JS array) and passes them to `createElement("select", cloned-props)`. Since children arrive as `props.children` array rather than spread arguments, React treats them as a dynamic list and requires keys.

**Non-wrapped elements** (like `dom/div`, `dom/span`, `dom/table`) use `macro-create-element*` which calls `React.createElement.apply(null, [type, props, child1, child2, ...])` -- children are spread as positional args, so no keys needed.

```clojure
;; BAD - React warning on dom/select children (wrapped form element)
(dom/select {:value filter-type :onChange handler}
  (dom/option {:value "all"} "All Events")
  (dom/option {:value "eca"} "ECA Events"))

;; GOOD - add :key to every child of wrapped form elements
(dom/select {:value filter-type :onChange handler}
  (dom/option {:key "all" :value "all"} "All Events")
  (dom/option {:key "eca" :value "eca"} "ECA Events"))
```

**Rule:** Always add `:key` props to children of `dom/select`, `dom/input`, `dom/textarea`, and `dom/option` -- even when they are static positional children (not produced by `for` or `map`).

**How to identify:** The React warning says "Check the render method of `ForwardRef`" -- this specifically points to Fulcro's wrapped form elements, not regular DOM elements.

---

### 41. Guard nil Inputs to clojure.string Functions

**Problem:** `clojure.string/replace` (and most `clojure.string/*` functions) throw when passed `nil` instead of a string. In ClojureScript this manifests as `TypeError: can't access property "replace", s is null`.

**Root Cause:** Data from backend or Fulcro state can be `nil` when expected fields are missing (e.g., ECA unavailable, data not loaded yet, optional fields). If `nil` flows into a `clojure.string` function, it crashes.

**Two-layer defense:**

```clojure
;; Layer 1: Guard at the utility function (defense-in-depth)
(defn extract-plain-text-from-markdown [text max-length]
  (let [plain-text (-> (or text "")      ;; <- nil guard
                       (str/replace ...)
                       (str/replace ...))])

;; Layer 2: Guard at the call site (explicit intent)
(dom/p (ui/extract-plain-text text 120))           ;; BAD - text might be nil
(dom/p (ui/extract-plain-text (or text "") 120))   ;; GOOD - explicit guard
```

**Rule:** Any function that passes data to `clojure.string/*` should guard with `(or value "")`. Apply at both the utility level (so all callers are safe) and at call sites (for explicit documentation of nullable fields).

---

### 42. Cache-First Instant Display Pattern

**Problem:** Drawer/panel content that loads from the backend via WebSocket shows a "Loading..." spinner every time the user clicks. Even sub-second loads feel sluggish when the content was already fetched moments ago.

**Solution:** Pre-seed default content into app state at mount/hydration time. Show cached or default content instantly on click. Let backend refresh silently in the background.

**Three-layer approach:**

```clojure
;; Layer 1: Pre-seed defaults at component mount or state hydration
(defn set-app-state-atom! [atom]
  (swap! atom merge
    {:tip-detail-cache default-tip-detail-cache}     ;; Pre-written content
    (:tip-detail-cache (read-local-storage))))        ;; localStorage overrides

;; Layer 2: On click, show existing content immediately
(defn open-drawer [category]
  (let [existing (get-in @state [:insights category])]
    ;; Show immediately -- no loading spinner
    (swap! state assoc :drawer-open category)
    ;; Only show loading if nothing exists
    (when-not (seq existing)
      (swap! state assoc :loading? true))
    ;; Silent background refresh
    (ws/request-category-insights! category)))

;; Layer 3: Response handler preserves existing when backend returns empty
(defmethod handle-message :learning/category-insights [msg]
  (let [insights (:insights msg)]
    (when (seq insights)  ;; Don't overwrite with empty
      (swap! state assoc-in [:insights (:category msg)] insights))))
```

**Key Insight:** The perceived performance of a UI is determined by how much content appears instantly on interaction. Pre-seeding defaults means the user never sees an empty drawer, even on first load before any backend response.

---

### 43. Silent Refresh Mode for WebSocket Requests

**Problem:** Re-fetching content that already exists in state causes a visible loading spinner, creating unnecessary visual noise. The user sees content disappear and reappear.

**Solution:** Check whether content already exists before setting `loading?=true`. If content exists, fetch silently in the background and swap in the new data when it arrives.

```clojure
(defn request-category-insights! [category]
  (let [existing (get-in @state [:insights category])]
    ;; Only show loading state if nothing cached
    (when-not (seq existing)
      (swap! state assoc-in [:loading category] true))
    ;; Always request -- but quietly if cached
    (ws-send! {:type "learning/category-insights" :category category})))
```

**Safety timeout:** Always add a timeout to clear loading flags, even for silent requests:

```clojure
(js/setTimeout
  (fn [] (swap! state assoc-in [:loading category] false))
  20000)  ;; 20s safety net
```

**Key Insight:** Loading spinners should indicate "we have nothing to show yet," not "we're refreshing what you already see." Silent refresh preserves the user's context while keeping data fresh.

---

### 44. Never Overwrite Content with Empty Responses

**Problem:** Backend WebSocket responses sometimes return empty arrays (`[]`) when data is temporarily unavailable. If the response handler blindly writes this to state, it wipes out perfectly good cached/default content.

**Solution:** Check response content before writing to state. Preserve existing data when the backend returns nothing useful.

```clojure
;; BAD - overwrites cache with nothing
(defmethod handle-message :learning/category-insights [msg]
  (swap! state assoc-in [:insights (:category msg)] (:insights msg)))

;; GOOD - preserve existing on empty response
(defmethod handle-message :learning/category-insights [msg]
  (let [insights (:insights msg)]
    (when (seq insights)
      (swap! state assoc-in [:insights (:category msg)] insights))
    ;; Always clear loading flag regardless
    (swap! state assoc-in [:loading (:category msg)] false)))
```

**Key Insight:** Treat empty responses as "no update" not "clear everything." The backend being temporarily unable to provide data is not the same as "there is no data."

---

### 45. Frontend Enrichment of Backend Data

**Problem:** Backend returns raw data (counts, records, category names) but the frontend needs UI metadata (icons, descriptions, default content). The backend shouldn't know about UI concerns.

**Solution:** Frontend maintains a metadata lookup and merges UI enrichment onto backend data, using `max(backend, default)` for counts.

```clojure
;; UI metadata defined in frontend
(def category-metadata
  {:architecture  {:icon "icon-arch"  :description "System design patterns"}
   :performance   {:icon "icon-perf"  :description "Optimization insights"}})

;; Default insights per category (also frontend-only)
(def default-category-insights
  {:architecture [{:title "Pattern A" :content "..."}
                  {:title "Pattern B" :content "..."}]})

;; Enrichment function: backend raw data + frontend metadata
(defn enrich-categories [backend-categories]
  (mapv (fn [cat]
          (let [k (:category cat)
                meta (get category-metadata k)
                default-count (count (get default-category-insights k []))]
            (merge cat meta
                   {:count (max (:count cat 0) default-count)})))
        backend-categories))
```

**Count strategy:** Use `max(backend-count, default-count)` because:
- Backend may return 0 when data isn't loaded yet, but we have defaults to show
- Backend may return more than defaults if user has generated insights
- Either way, the card count should reflect what the user will actually see

**Key Insight:** Separate concerns: backend owns data and computation, frontend owns presentation and UI metadata. The enrichment layer at the boundary keeps both sides clean.

---

### 46. Derive Display Counts from Actual Data

**Problem:** Card components showed hardcoded counts (e.g., `{:count 12}`) while the corresponding drawer only contained 2-3 items. The user clicks a card saying "12 insights" and sees 3.

**Root Cause:** Counts were defined in one `def` block and actual content in a separate `def` block. The two drifted independently because there was no programmatic connection between them.

**Solution:** Derive counts from the actual data source. Never hardcode a count separately from the data it represents.

```clojure
;; BAD - count and data defined independently, will drift
(def categories
  [{:category :arch :count 12}       ;; aspirational, not real
   {:category :perf :count 8}])

(def category-insights
  {:arch [{:title "A"} {:title "B"}]  ;; only 2, not 12
   :perf [{:title "C"}]})             ;; only 1, not 8

;; GOOD - count derived from data
(def categories-base
  [{:category :arch}                  ;; metadata only, no :count
   {:category :perf}])

(def categories
  (mapv (fn [base]
          (assoc base :count
            (count (get category-insights (:category base) []))))
        categories-base))
;; => [{:category :arch :count 2} {:category :perf :count 1}]
```

**Key Insight:** Every display count in the UI should be computable from the data it represents. If you can't point to the `(count ...)` call that produces it, the count is a bug waiting to happen.

---

### 47. Avoid Destructuring Names That Shadow cljs.core

**Problem:** Destructuring `{:keys [count]}` shadows `cljs.core/count`. Later calling `(count items)` tries to invoke a number as a function, producing `count.call is not a function` at runtime.

**Commonly shadowed names:** `count`, `name`, `type`, `key`, `val`, `first`, `last`, `list`, `map`, `filter`, `reduce`, `set`, `get`, `str`, `int`, `meta`, `hash`, `range`, `seq`, `sort`, `merge`, `replace`, `read`, `symbol`, `keyword`, `identity`, `class`

**Solution:** Use rename destructuring when a map key collides with a core function name:

```clojure
;; BAD - shadows cljs.core/count
(let [{:keys [label description category count]} card]
  (dom/span (str "(" (count insights) ")")))  ;; CRASH: count is a number

;; GOOD - rename to avoid shadowing
(let [{:keys [label description category] card-count :count} card]
  (dom/span (str "(" (count insights) ")")))  ;; Works: count is cljs.core/count
```

**Detection:** ClojureScript compiler does NOT warn about this shadowing. The error only appears at runtime and the message (`count.call is not a function`) doesn't mention the real cause. Look for `{:keys [...]}` destructuring containing core function names.

**Key Insight:** This is a silent, common bug in ClojureScript. The compiler accepts it, the REPL works fine with small test data, and it only crashes at runtime when the shadowed name is actually called. Treat `{:keys [count name type key]}` as code smell.

---

### 48. Clickable Card Pattern with Keyboard Accessibility

**Problem:** Making an entire card clickable while preserving child interactive elements (buttons, links) requires careful event handling and accessibility markup.

**Solution:** Use `role="button"`, `tabIndex 0`, `:onClick`, and `:onKeyDown` with a shared keyboard handler. Child interactive elements use `(.stopPropagation e)` to prevent card-level navigation.

```clojure
;; Shared keyboard handler for card activation
(defn handle-card-key [callback e]
  (when (or (= (.-key e) "Enter") (= (.-key e) " "))
    (.preventDefault e)
    (callback)))

;; Card element
(dom/div {:role "button"
          :tabIndex 0
          :className "dash-card dash-card-clickable"
          :onClick (fn [_] (navigate-to! path))
          :onKeyDown (partial handle-card-key #(navigate-to! path))}
  ;; Child button that should NOT trigger card navigation
  (dom/button {:onClick (fn [e]
                          (.stopPropagation e)
                          (do-child-action!))}
    "Child Action"))
```

**CSS pattern:** Hover lift (2px translateY), border accent, elevated shadow, active press-down, focus-visible ring. Arrow affordance (`>`) animates on parent hover via CSS descendant selector.

**Key Insight:** The `stopPropagation` pattern lets you nest independently-clickable elements inside a clickable card without conflicts. Always pair with `role="button"` + `tabIndex 0` for keyboard users.

---

### 49. Section Deep-Linking via Scroll-After-Route-Change

**Problem:** When navigating to a new route and scrolling to a specific section, the target element doesn't exist yet because the route hasn't rendered.

**Solution:** Use `requestAnimationFrame` + `setTimeout` to wait for the route to render before scrolling:

```clojure
(defn navigate-wisdom! [this & [section-id]]
  (dr/change-route! this ["wisdom"])
  (when section-id
    (js/requestAnimationFrame
      (fn []
        (js/setTimeout
          (fn []
            (when-let [el (js/document.getElementById section-id)]
              (.scrollIntoView el #js {:behavior "smooth" :block "start"})))
          120)))))
```

**Why 120ms?** Fulcro's route change triggers re-render, then DOM update. `requestAnimationFrame` gets us past the virtual DOM diff, and 120ms covers the actual DOM paint. Shorter delays (e.g., 50ms) fail intermittently on slower devices.

**Target elements need stable IDs:**
```clojure
(dom/div {:id "wisdom-templates"} ...)
(dom/div {:id "wisdom-learning"} ...)
```

**Key Insight:** Route-then-scroll is a two-phase operation. The scroll must be deferred until after the route's component tree is mounted. This rAF + setTimeout pattern is reliable across browsers and device speeds.

---

### 50. CSS Custom Properties on :root for Cross-Component Styling

**Problem:** A resizable sidebar needs to communicate its width to sibling elements (e.g., main content area) that aren't in the same component tree.

**Solution:** Set a CSS custom property on `:root` from JavaScript, and reference it from any CSS rule:

```clojure
;; ClojureScript: sync width to CSS
(defn sync-sidebar-css-var! [width]
  (.setProperty (.-style js/document.documentElement)
    "--chat-sidebar-width" (str width "px")))

;; Called on resize, mount, and localStorage load
(sync-sidebar-css-var! current-width)
```

```css
/* CSS: any element can reference it */
.main-content-shifted {
  margin-right: var(--chat-sidebar-width, 400px);
}

.chat-sidebar {
  width: var(--chat-sidebar-width, 400px);
}
```

**Companion pattern:** Add a body class during drag (`chat-resizing-global`) to disable transitions globally, preventing janky animation during resize:

```css
body.chat-resizing-global .main-content-shifted,
body.chat-resizing-global .chat-sidebar {
  transition: none !important;
}
```

**Key Insight:** CSS custom properties on `:root` act as a global communication channel between JavaScript and CSS, bypassing React/Fulcro component hierarchy. Combined with localStorage for persistence, this gives you resizable UI elements that survive page reloads without any state management library.

---

### 51. Data-Driven Handler Dispatch (from Compound Engineering Plugin)

**Problem:** WebSocket message handlers use a large `case` statement to dispatch by message type. Each new handler adds a branch, growing the file linearly. At 1420+ LOC the file is a god object.

**Anti-Pattern:**
```clojure
;; websocket.clj - monolithic case dispatch
(defn handle-message! [ch msg]
  (case (:type msg)
    "chat/prompt" (handle-chat-prompt! ch msg)
    "eca/wisdom"  (handle-eca-wisdom! ch msg)
    "builder/save-data" (handle-save-builder-data! ch msg)
    ;; ... 30+ more branches
    (log/warn "Unknown message type" (:type msg))))
```

**Correct Pattern (from Compound's strategy registry):**
```clojure
;; ws/registry.clj - handler registry, no business logic
(defonce handlers (atom {}))

(defn register! [msg-type handler-fn]
  (swap! handlers assoc msg-type handler-fn))

(defn dispatch! [ch msg]
  (if-let [handler (get @handlers (:type msg))]
    (handler ch msg)
    (log/warn "Unknown message type" (:type msg))))

;; ws/handlers/chat.clj - self-registering
(ns ouroboros.ws.handlers.chat
  (:require [ouroboros.ws.registry :as reg]))

(defn handle-chat-prompt! [ch msg] ...)
(defn handle-chat-stop! [ch msg] ...)

(reg/register! "chat/prompt" handle-chat-prompt!)
(reg/register! "chat/stop" handle-chat-stop!)
```

**Benefits:**
1. Each handler file is small (~100-200 LOC), focused on one domain
2. New handlers don't touch the dispatch file
3. Handler discovery: `(keys @handlers)` lists all supported messages
4. Testable in isolation: `(handle-chat-prompt! mock-ch mock-msg)`

**Reference:** Compound uses `Record<string, {convert, write}>` -- a map from format name to handler pair. Same principle: data-driven dispatch, not control-flow dispatch.

**Key Insight:** When a `case` or `cond` has more than ~10 branches, it's a dispatch table pretending to be code. Make it an actual table (map/registry) and let each handler module register itself.

---

### 52. Module Size Discipline (Max ~400 LOC)

**Problem:** websocket.clj (1420 LOC) and websocket.cljs (1704 LOC) are god objects. Every new feature adds more handlers, making the files harder to navigate, review, and test.

**Reference:** Compound Engineering Plugin's largest file is ~430 LOC. Most files are 50-200 LOC. Despite having 29 agents and 22 commands, no single file exceeds 500 LOC.

**Rule:** Maximum ~400 LOC per file. When a file approaches this limit, split by domain.

**Split plan for websocket.clj (1420 LOC):**

```
src/ouroboros/chat/
  websocket.clj          # Core: connect, disconnect, send, broadcast (~200 LOC)
  ws/
    registry.clj         # Handler dispatch map (~30 LOC)
    handlers/
      chat.clj           # chat/prompt, chat/stop (~150 LOC)
      wisdom.clj         # eca/wisdom, flywheel/progress (~200 LOC)
      builder.clj        # builder/save-data, builder/complete (~150 LOC)
      content.clj        # content/generate, analytics/dashboard (~200 LOC)
      system.clj         # project/detected, telemetry (~100 LOC)
```

**Split plan for websocket.cljs (1704 LOC):**

```
src/frontend/ouroboros/frontend/
  websocket.cljs         # Core: connect!, send!, state atom (~200 LOC)
  ws/
    handlers/
      chat.cljs          # Chat message handlers (~200 LOC)
      wisdom.cljs        # Wisdom/insight handlers (~200 LOC)
      builder.cljs       # Builder sync handlers (~200 LOC)
      content.cljs       # Content/analytics handlers (~200 LOC)
      system.cljs        # System/project handlers (~150 LOC)
```

**Key Insight:** Module size is a leading indicator of maintainability. When a file crosses ~400 LOC, it's accumulating responsibilities. Split by domain, not by layer. Each handler file should map to one business domain (chat, wisdom, builder, etc.).

---

### 53. Frontmatter Markdown as Config (from Compound Engineering Plugin)

**Problem:** Agent/skill metadata (name, description, version, capabilities) is either hardcoded in source or spread across multiple config files with no standard format.

**Compound's Pattern:** Frontmatter markdown files define agent and skill metadata:

```markdown
---
name: "code-reviewer"
description: "Reviews code changes for quality and correctness"
version: "1.0.0"
tools: ["file/read", "git/diff", "shell/exec"]
---

# Code Reviewer

You are an expert code reviewer. Focus on:
- Correctness and edge cases
- Performance implications
- Readability and maintainability
```

**Benefits:**
1. **Human-readable** -- Markdown body is the prompt, frontmatter is metadata
2. **Machine-parseable** -- YAML frontmatter extracts to a map
3. **Version-controlled** -- Just text files in git
4. **Non-coder friendly** -- Anyone can edit a markdown file
5. **Self-documenting** -- The file IS the documentation

**Ouroboros Application:** Extract inline prompt strings from websocket.clj into `resources/prompts/`:

```
resources/prompts/
  wisdom/empathy.md       # Empathy map wisdom prompt
  wisdom/value-prop.md    # Value proposition wisdom prompt
  content/insights.md     # Insight generation prompt
  content/predictions.md  # Analytics prediction prompt
```

```clojure
;; Load prompt at runtime
(defn load-prompt [path]
  (let [content (slurp (io/resource (str "prompts/" path)))
        [_ frontmatter body] (re-find #"(?s)^---\n(.+?)\n---\n(.+)$" content)]
    {:meta (yaml/parse-string frontmatter)
     :prompt (str/trim body)}))

;; Usage
(let [{:keys [prompt]} (load-prompt "wisdom/empathy.md")]
  (eca/chat-prompt user-msg {:system-prompt prompt}))
```

**Key Insight:** Prompts are the "source code" of AI behavior. They deserve the same treatment as code: versioned, reviewed, tested, and documented. Frontmatter markdown is the simplest format that satisfies all four requirements.

---

### 54. Integration Tests via Binary Spawn (from Compound Engineering Plugin)

**Problem:** Unit tests mock too much, missing real integration bugs. End-to-end tests through the UI are slow and brittle. Need a middle ground that tests the actual system with real I/O.

**Compound's Pattern:** Tests spawn the actual CLI binary, feed it real input, and verify real output:

```typescript
// Compound's integration test pattern
test("convert claude-code to cursor", async () => {
  const tmpDir = await mkdtemp(join(tmpdir(), "test-"));
  const input = join(tmpDir, "input.md");
  await writeFile(input, testAgentContent);
  
  // Spawn actual binary
  const result = await execFile("./bin/compound", [
    "convert", "--input", input, "--target", "cursor"
  ]);
  
  // Verify real output files
  const output = await readFile(join(tmpDir, ".cursorrules"), "utf-8");
  expect(output).toContain("expected content");
  
  // Cleanup
  await rm(tmpDir, { recursive: true });
});
```

**Ouroboros Application:** Test WebSocket handlers, ECA pipeline, and builder persistence through real system calls:

```clojure
;; Integration test pattern for Ouroboros
(deftest test-builder-save-and-complete
  (let [tmp-dir (create-temp-dir "test-")]
    (try
      ;; Boot real system
      (with-system [sys (test-system {:data-dir tmp-dir})]
        ;; Connect real WebSocket
        (let [ws (ws-connect! "ws://localhost:8080/ws")]
          ;; Send real builder data
          (ws-send! ws {:type "builder/save-data"
                        :builder-type :empathy-map
                        :data test-empathy-data})
          ;; Verify real persistence
          (is (= test-empathy-data
                 (memory/recall :builder-session)))
          ;; Verify completion detection
          (is (ws-received? ws :builder/completed))))
      (finally
        (delete-dir tmp-dir)))))
```

**Key Principles:**
1. **Temp directory isolation** -- Each test gets fresh filesystem state
2. **Real binary/system** -- No mocking of core infrastructure
3. **Real I/O** -- Actual files, actual WebSocket, actual network
4. **Cleanup in finally** -- Always clean up, even on failure
5. **Assertion on output** -- Verify what the user would see, not internal state

**Key Insight:** The highest-value tests are those that exercise the same code path as production. Compound achieves ~80% coverage with this pattern because each test validates the entire pipeline from input to output.

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [STATE](STATE.md) · [PLAN](PLAN.md) · [CHANGELOG](CHANGELOG.md)

*Feed forward: Each discovery shapes the next version.*
