# LEARNING.md

> What was discovered. Patterns, principles, and insights from building Ouroboros.

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
- `:mcp/complete` — MCP operation
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
- `[:mcp/tools]` — What do MCP clients see?
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

---

### 10. Skill-Based Architecture

Group related tools into versioned, documented skills with dependency management.

```clojure
;; Skill definition
{:id :file/operations
 :name "File Operations"
 :version "1.0.0"
 :description "Work with files"
 :dependencies [:core/essentials]
 :provides [:file/read :file/write]
 :config {:max-file-size 10485760}
 :lifecycle {:init init-fn :shutdown shutdown-fn}}

;; Usage
(skill/register! file-skill)
(skill/tools :file/operations)  ; => [:file/read :file/write]
```

**Benefits:** Clear ownership, dependency resolution, hot-reloading, configuration per capability.

---

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

```clojure
;; Broken - "Cannot recur across try"
(loop [items xs]
  (try
    (process items)
    (catch Exception e
      (recur (rest items)))))  ; ERROR

;; Fixed - extract try into helper
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

## Open Questions

1. **Persistence:** Atoms are simple but not durable. Should we add Datomic/Datalevin?
2. **Scaling:** Single-process now. How to distribute across nodes?
3. **Security:** API tokens are basic. Need OAuth2/SAML for enterprise?
4. **Frontend:** Dashboard is HTML strings. Should we add ClojureScript/Re-frame?

---

*Feed forward: Each discovery shapes the next version.*
