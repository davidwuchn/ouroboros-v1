# LEARNING.md

> What was discovered. Patterns, principles, and insights from building Ouroboros.

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

---

**See Also:** [README](README.md) · [AGENTS](AGENTS.md) · [STATE](STATE.md) · [PLAN](PLAN.md) · [CHANGELOG](CHANGELOG.md)

*Feed forward: Each discovery shapes the next version.*
