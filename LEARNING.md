# LEARNING.md

> What was discovered. Patterns, principles, and insights from building Ouroboros.

---

## 2026-02-01 — System Complete

### Pattern: Iterative Phase-Based Development

**Observation:** Building in 4 distinct phases allowed focused development without breaking changes.

**Phases:**
1. **Core Platform** — Engine, Query, Interface (foundation)
2. **Intelligence Layer** — History, Memory, Knowledge, AI, Telemetry (capabilities)
3. **Chat Platforms** — Telegram, Slack, Agent with LLMs (user interface)
4. **Production** — Auth, Dashboard (operational readiness)

**Lesson:** Each phase must be usable standalone. Don't block Phase 2 on Phase 4 features.

---

### Pattern: Protocol-Based Abstraction

**Observation:** The `ChatAdapter` protocol enabled multi-platform support with one implementation.

```clojure
(defprotocol ChatAdapter
  (start! [this handler])
  (send-message! [this chat-id text]))
```

**Applied to:**
- Telegram (HTTP long-polling)
- Slack (WebSocket Socket Mode)
- Could extend to: Discord, WhatsApp, etc.

**Lesson:** Define the interface first, implement platforms second.

---

### Pattern: Unified Query Interface

**Observation:** EQL/Pathom eliminated the need for multiple APIs.

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

**Lesson:** One query language for everything. The system becomes self-documenting.

---

### Pattern: Observability by Design

**Observation:** Adding telemetry after-the-fact never works. It must be woven in.

**Every layer emits events:**
- `:tool/invoke` — AI tool execution
- `:mcp/complete` — MCP operation
- `:chat/message` — User message
- `:agent/generate` — LLM call
- `:auth/user-created` — New user

**Lesson:** If you can't observe it, you can't operate it.

---

### Pattern: Safety Through Boundaries

**Observation:** Chat platforms need different safety than nREPL.

**Boundaries enforced:**
- **Chat-safe tools:** Only 11 of 13 tools exposed (no `:openapi/call`)
- **Rate limiting:** 30 msgs/min per user
- **Role-based access:** `:user` vs `:admin`
- **API tokens:** For programmatic access

**Lesson:** Same system, different safety profiles per interface.

---

### Pattern: Functional Composition

**Observation:** Each namespace does one thing. They compose through Interface.

```
ouroboros.engine    → Statecharts
ouroboros.query     → EQL interface
ouroboros.agent     → LLM integration
ouroboros.auth      → Identity/rate limits
ouroboros.interface → Unified surface
```

**Lesson:** Small, focused modules. Clear ownership. No circular deps (use `resolve` when needed).

---

### Pattern: Runtime Discoverability

**Observation:** Static documentation rots. The system should document itself.

**Self-querying:**
- `[:introspection/configuration]` — What states exist?
- `[:ai/tools]` — What can the AI do?
- `[:mcp/tools]` — What do MCP clients see?
- `[:auth/users]` — Who's registered?

**Lesson:** If you can query it, you can discover it. If you can discover it, you can learn it.

---

### Pattern: Tool-Centric AI

**Observation:** LLMs work best when given tools, not just prompts.

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

**Lesson:** Give AI capabilities, not just context.

---

### Pattern: The Ouroboros Loop

**The system feeds itself:**

```
Human → Chat → Agent → Tools → Query → Engine
  ↑                                    ↓
  └────── Telemetry ← Memory ←────────┘
```

**Each interaction:**
- Generates telemetry (observable)
- Updates memory (persistent)
- Triggers state changes (introspectable)

**Lesson:** The system that observes itself can improve itself.

---

### Anti-Pattern: Circular Dependencies

**Problem:** `ouroboros.ai` needed `ouroboros.query`, which needed `ouroboros.ai`.

**Solution 1 (Legacy):** Use `(resolve 'symbol)` for late binding.

```clojure
;; In ai.clj
:fn (fn [_] ((resolve 'ouroboros.query/q) [:system/status]))
```

**Solution 2 (Preferred):** Extract registry to separate namespace.

```clojure
;; ouroboros.tool-registry - no dependencies, just storage
(defonce registry-atom (atom {}))
(defn register-tool! [name spec])
(defn call-tool [name params])

;; ouroboros.tool-defs - depends on registry and query
(defn- make-query-tool []
  {:fn (fn [params] (query/q ...))})

;; Register after both are loaded
(tool-defs/register-all-tools!)
```

**Lesson:** Prefer explicit registry namespaces over dynamic resolution. Use `(resolve)` only as fallback for truly circular cases.

---

### Anti-Pattern: HTTP Server Dependency

**Problem:** `babashka.http-server` not available in all Babashka distributions.

**Solution:** Dashboard starts without full HTTP server for now. Use placeholder.

**Lesson:** Don't depend on libraries that aren't universally available.

---

## Vocabulary (Established)

| Symbol | Meaning | Usage |
|--------|---------|-------|
| ⚒ | Build | Code-forward commits |
| ◈ | Reflect | Meta, documentation |
| ∿ | Play | Creative, experimental |
| · | Atom | Single step |
| ⊘ | Debug | Diagnostic commits |
| λ | Lambda | Learning committed |
| 🐍 | Snake | System complete/milestone |

---

## Open Questions

1. **Persistence:** Atoms are simple but not durable. Should we add Datomic/Datalevin?
2. **Scaling:** Single-process now. How to distribute across nodes?
3. **Security:** API tokens are basic. Need OAuth2/SAML for enterprise?
4. **Frontend:** Dashboard is HTML strings. Should we add ClojureScript/ Re-frame?

---

## 2026-02-01 — Documentation & Code Quality

### Pattern: Unicode Safety in Babashka

**Observation:** Em-dashes (—), smart quotes, and fancy Unicode in docstrings cause cryptic parse errors.

**Error:**
```
Invalid number: 1.0.0
Don't know how to create ISeq from: clojure.lang.Symbol
```

**Cause:** Babashka's parser interprets certain Unicode sequences as numbers or syntax.

**Fix:**
```clojure
;; Bad - contains em-dash
"Core principle — execution"

;; Good - plain ASCII
"Core principle - execution"
```

**Lesson:** Save fancy typography for markdown files. Use ASCII-only in docstrings.

---

### Pattern: Schema Validation for Skills

**Observation:** Skills need validation to prevent runtime errors from malformed definitions.

**Schema approach:**
```clojure
(def skill-schema
  {:id {:type :keyword :required true}
   :version {:type :string :pattern #"^\d+\.\d+\.\d+$"}})

(defn validate-skill [skill]
  (let [errors (check-required skill schema)]
    {:valid? (empty? errors) :errors errors}))
```

**Applied in:** `ouroboros.skill/register-skill!`

**Lesson:** Validate at registration time, not load time. Fail fast with clear errors.

---

### Anti-Pattern: Unchecked Tool Parameters

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

**Lesson:** Add specs or validation to tools. Document expected parameters.

---

*Feed forward: Each discovery shapes the next version.*
