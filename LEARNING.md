# LEARNING.md

> What was discovered. Patterns, principles, and insights from building Ouroboros.



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

### 2. Protocol-Based Abstraction

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

### 9. Configuration as Layers

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
        ├── dashboard.cljs # Overview page
        ├── telemetry.cljs # Events page (with live updates)
        ├── users.cljs     # User management
        └── sessions.cljs  # Chat sessions
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

### 22. Hierarchical Agent Pattern (from Agent Zero)

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

### 23. Context Summarization Strategy (from Agent Zero)

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

### 24. Prompt-Driven Customization (from Agent Zero)

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

### 25. Instruments: On-Demand Capabilities (from Agent Zero) — DELEGATED

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

### 26. Dynamic Behavior Adjustment (from Agent Zero)

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

### 27. Terminal Introspection via Tmux

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

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [STATE](STATE.md) · [PLAN](PLAN.md) · [CHANGELOG](CHANGELOG.md)

*Feed forward: Each discovery shapes the next version.*
