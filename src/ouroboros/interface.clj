(ns ouroboros.interface
  "Interface - Unified system surface

   This namespace provides direct access to all system capabilities.
   Core namespaces are always loaded. Extension namespaces are lazy-loaded.
   
   Usage:
     (require '[ouroboros.interface :as iface])
     (iface/boot!)
     (iface/q [:system/status])
     (iface/remember :key \"value\")"
  (:require
   ;; Core - always loaded
   [ouroboros.interface.lifecycle :as lifecycle]
   [ouroboros.interface.config :as config]
   ;; Direct core access (no interface wrapper)
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.api :as api]
   [ouroboros.openapi :as openapi]))

;; ============================================================================
;; Lazy Loading Helper
;; ============================================================================

(defonce ^:private loaded-namespaces (atom #{}))

(defn- lazy-load
  "Load a namespace on first use

   Usage: (lazy-load 'ouroboros.interface.memory 'memory)"
  [ns-sym alias-sym]
  (when-not (contains? @loaded-namespaces ns-sym)
    (require ns-sym)
    (swap! loaded-namespaces conj ns-sym))
  (ns-resolve ns-sym alias-sym))

(defn- lazy-fn
  "Create a lazy wrapper for a function

   Usage: (def memory-get (lazy-fn 'ouroboros.interface.memory 'get))"
  [ns-sym fn-sym]
  (fn [& args]
    (let [f (lazy-load ns-sym fn-sym)]
      (apply f args))))

;; ============================================================================
;; Lifecycle (Always Loaded)
;; ============================================================================

(def boot! lifecycle/boot!)
(def shutdown! lifecycle/shutdown!)

;; ============================================================================
;; Query (Direct)
;; ============================================================================

(defn q
  "Execute EQL query
   
   Usage: (q [:system/status])
          (q [{:git/commits [:git/hash]}])"
  [query-expr]
  (query/q query-expr))

(defn status
  "Current system status"
  []
  (query/status))

(defn report
  "Full system report"
  []
  (query/full-report))

;; ============================================================================
;; Config (Always Loaded)
;; ============================================================================

(def load-config! config/load-config!)
(def get-config config/get-config)
(def config-summary config/config-summary)

;; ============================================================================
;; Memory (Direct)
;; ============================================================================

(defn remember
  "Save value to persistent memory
   
   Usage: (remember :key \"value\")"
  [key value]
  (memory/save-value! key value))

(defn recall
  "Get value from memory
   
   Usage: (recall :key)"
  [key]
  (memory/get-value key))

(defn forget
  "Delete value from memory
   
   Usage: (forget :key)"
  [key]
  (memory/delete-value! key))

;; ============================================================================
;; Knowledge (Direct)
;; ============================================================================

(defn files
  "List files in directory via EQL query
   
   Usage: (files \"src\")"
  [dir-path]
  (q [{[:dir-path dir-path]
       [{:knowledge/files [:file/path :file/name]}]}]))

(defn file
  "Get file info via EQL query
   
   Usage: (file \"README.md\")"
  [file-path]
  (q [{[:file-path file-path]
       [:file/path :file/name :file/size :file/content-preview]}]))

(defn search
  "Search files by pattern via EQL query
   
   Usage: (search \"*.clj\")"
  [pattern]
  (q [{[:search-pattern pattern]
       [{:knowledge/search [:file/path :file/name :file/size]}]}]))

(defn project
  "Get project structure via EQL query
   
   Usage: (project)"
  []
  (q [:knowledge/project]))

;; ============================================================================
;; API (Direct)
;; ============================================================================

(defn http-get
  "Make HTTP GET request
   
   Usage: (http-get \"https://api.example.com/data\")"
  [url]
  (api/http-request {:method :get :url url}))

(defn http-request!
  "Make HTTP request with method
   
   Usage: (http-request! :post \"https://api.example.com/data\" {:body {...}})"
  [method url opts]
  (api/http-request (assoc opts :method method :url url)))

;; ============================================================================
;; OpenAPI (Direct)
;; ============================================================================

(defn openapi-bootstrap!
  "Bootstrap OpenAPI client from spec URL
   
   Usage: (openapi-bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  [name spec-url]
  (openapi/bootstrap! name spec-url))

(defn openapi-clients
  "List registered OpenAPI clients"
  []
  (openapi/list-clients))

(defn openapi-operations
  "List operations for client
   
   Usage: (openapi-operations :petstore)"
  [client-name]
  (openapi/list-operations client-name))

(defn openapi-call!
  "Call OpenAPI operation
   
   Usage: (openapi-call! :petstore :get-pet-by-id {:petId 123})"
  [client-name operation params]
  (openapi/call-operation client-name operation params))

;; ============================================================================
;; Telemetry (Direct)
;; ============================================================================

(defn telemetry-events
  "Get all telemetry events"
  []
  (telemetry/get-events))

(defn telemetry-recent
  "Get n recent telemetry events"
  [n]
  (telemetry/get-recent-events n))

(defn telemetry-stats
  "Get telemetry statistics"
  []
  (query/q [:telemetry/total-events :telemetry/tool-invocations]))

(defn telemetry-clear!
  "Clear all telemetry events"
  []
  (query/m 'ouroboros.telemetry/telemetry-clear! {}))

;; ============================================================================
;; Metrics (Lazy)
;; ============================================================================

(def metrics-status (lazy-fn 'ouroboros.interface.metrics 'metrics-status))
(def metrics-snapshot (lazy-fn 'ouroboros.interface.metrics 'metrics-snapshot))



;; ============================================================================
;; Chat (Lazy)
;; ============================================================================

(def chat-adapters (lazy-fn 'ouroboros.interface.chat 'chat-adapters))
(def chat-start! (lazy-fn 'ouroboros.interface.chat 'chat-start!))
(def chat-stop! (lazy-fn 'ouroboros.interface.chat 'chat-stop!))
(def chat-register-telegram! (lazy-fn 'ouroboros.interface.chat 'chat-register-telegram!))
(def chat-register-slack! (lazy-fn 'ouroboros.interface.chat 'chat-register-slack!))
(def chat-register-discord! (lazy-fn 'ouroboros.interface.chat 'chat-register-discord!))
(def chat-sessions (lazy-fn 'ouroboros.interface.chat 'chat-sessions))
(def chat-clear-session! (lazy-fn 'ouroboros.interface.chat 'chat-clear-session!))

;; ============================================================================
;; Auth (Lazy)
;; ============================================================================

(def auth-get-user (lazy-fn 'ouroboros.interface.auth 'auth-get-user))
(def auth-users (lazy-fn 'ouroboros.interface.auth 'auth-users))
(def auth-check-permission (lazy-fn 'ouroboros.interface.auth 'auth-check-permission))
(def auth-rate-limit (lazy-fn 'ouroboros.interface.auth 'auth-rate-limit))

;; ============================================================================
;; Dashboard (Lazy)
;; ============================================================================

(def dashboard-start! (lazy-fn 'ouroboros.interface.dashboard 'dashboard-start!))
(def dashboard-stop! (lazy-fn 'ouroboros.interface.dashboard 'dashboard-stop!))
(def dashboard-status (lazy-fn 'ouroboros.interface.dashboard 'dashboard-status))

;; ============================================================================
;; Lane (Lazy)
;; ============================================================================

(def lane-create! (lazy-fn 'ouroboros.interface.lane 'lane-create!))
(def lane-submit! (lazy-fn 'ouroboros.interface.lane 'lane-submit!))
(def lane-submit!! (lazy-fn 'ouroboros.interface.lane 'lane-submit!!))
(def lane-destroy! (lazy-fn 'ouroboros.interface.lane 'lane-destroy!))
(def lane-status (lazy-fn 'ouroboros.interface.lane 'lane-status))
(def lane-stats (lazy-fn 'ouroboros.interface.lane 'lane-stats))
(def with-session-lane (lazy-fn 'ouroboros.interface.lane 'with-session-lane))

;; ============================================================================
;; Memory JSONL (Lazy)
;; ============================================================================

(def transcript-append! (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-append!))
(def transcript-read (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-read))
(def transcript-last-n (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-last-n))
(def transcript-since (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-since))
(def transcript-list (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-list))
(def transcript-delete! (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-delete!))
(def transcript-info (lazy-fn 'ouroboros.interface.memory-jsonl 'transcript-info))
(def summary-write! (lazy-fn 'ouroboros.interface.memory-jsonl 'summary-write!))
(def summary-read (lazy-fn 'ouroboros.interface.memory-jsonl 'summary-read))

;; ============================================================================
;; Memory Search (Lazy)
;; ============================================================================

(def memory-init! (lazy-fn 'ouroboros.interface.memory-search 'memory-init!))
(def memory-add! (lazy-fn 'ouroboros.interface.memory-search 'memory-add!))
(def memory-get (lazy-fn 'ouroboros.interface.memory-search 'memory-get))
(def memory-delete! (lazy-fn 'ouroboros.interface.memory-search 'memory-delete!))
(def memory-search-keyword (lazy-fn 'ouroboros.interface.memory-search 'memory-search-keyword))
(def memory-search-vector (lazy-fn 'ouroboros.interface.memory-search 'memory-search-vector))
(def memory-search (lazy-fn 'ouroboros.interface.memory-search 'memory-search))
(def memory-list (lazy-fn 'ouroboros.interface.memory-search 'memory-list))
(def memory-search-stats (lazy-fn 'ouroboros.interface.memory-search 'memory-search-stats))
(def memory-clear! (lazy-fn 'ouroboros.interface.memory-search 'memory-clear!))

;; ============================================================================
;; Sandbox (Lazy)
;; ============================================================================

(def allowlist-create! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-create!))
(def allowlist-custom! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-custom!))
(def allowlist-destroy! (lazy-fn 'ouroboros.interface.sandbox 'allowlist-destroy!))
(def allowlist-permitted? (lazy-fn 'ouroboros.interface.sandbox 'allowlist-permitted?))
(def allowlist-tools (lazy-fn 'ouroboros.interface.sandbox 'allowlist-tools))
(def allowlist-stats (lazy-fn 'ouroboros.interface.sandbox 'allowlist-stats))
(def sandbox-stats (lazy-fn 'ouroboros.interface.sandbox 'sandbox-stats))
(def sandbox-health (lazy-fn 'ouroboros.interface.sandbox 'sandbox-health))
(def tool-safe (lazy-fn 'ouroboros.interface.sandbox 'tool-safe))
(def session-create! (lazy-fn 'ouroboros.interface.sandbox 'session-create!))
(def sandbox-exec-shell (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-shell))
(def sandbox-exec-python (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-python))
(def sandbox-exec-node (lazy-fn 'ouroboros.interface.sandbox 'sandbox-exec-node))
(def sandbox-docker? (lazy-fn 'ouroboros.interface.sandbox 'sandbox-docker?))
(def safety-report (lazy-fn 'ouroboros.interface.sandbox 'safety-report))

;; ============================================================================
;; Security (Lazy)
;; ============================================================================

(def security-sanitize (lazy-fn 'ouroboros.interface.security 'security-sanitize))
(def security-check (lazy-fn 'ouroboros.interface.security 'security-check))
(def security-quarantine! (lazy-fn 'ouroboros.interface.security 'security-quarantine!))
(def security-release! (lazy-fn 'ouroboros.interface.security 'security-release!))
(def security-quarantined? (lazy-fn 'ouroboros.interface.security 'security-quarantined?))
(def security-quarantine-status (lazy-fn 'ouroboros.interface.security 'security-quarantine-status))
(def security-report (lazy-fn 'ouroboros.interface.security 'security-report))

;; ============================================================================
;; Confirmation (Lazy)
;; ============================================================================

(def confirm-pending? (lazy-fn 'ouroboros.interface.confirmation 'confirm-pending?))
(def confirm-get (lazy-fn 'ouroboros.interface.confirmation 'confirm-get))
(def confirm-approve! (lazy-fn 'ouroboros.interface.confirmation 'confirm-approve!))
(def confirm-deny! (lazy-fn 'ouroboros.interface.confirmation 'confirm-deny!))
(def confirm-cancel! (lazy-fn 'ouroboros.interface.confirmation 'confirm-cancel!))
(def confirm-clear! (lazy-fn 'ouroboros.interface.confirmation 'confirm-clear!))
(def confirm-history (lazy-fn 'ouroboros.interface.confirmation 'confirm-history))
(def confirm-stats (lazy-fn 'ouroboros.interface.confirmation 'confirm-stats))
(def confirm-security-report (lazy-fn 'ouroboros.interface.confirmation 'confirm-security-report))



;; ============================================================================
;; ECA Client (NEW - Phase 1)
;; ============================================================================

(def eca-start!
  "Start ECA client (JSON-RPC connection to ECA binary)

   Usage: (eca-start!)
          (eca-start! {:eca-path \"/path/to/eca\"})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-start!))

(def eca-stop!
  "Stop ECA client

   Usage: (eca-stop!)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-stop!))

(def eca-status
  "Get ECA client status

   Usage: (eca-status)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-status))

(def eca-chat-prompt
  "Send chat message to ECA

   Usage: (eca-chat-prompt \"Hello, help me write a function!\")"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-chat-prompt))

(def eca-query-context
  "Query context from ECA (repoMap, files, etc.)

   Usage: (eca-query-context)"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-query-context))

(def eca-query-files
  "Search files in ECA workspace

   Usage: (eca-query-files \"*.clj\")"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-query-files))

(def eca-approve-tool!
  "Approve tool call from ECA

   Usage: (eca-approve-tool! {:tool \"file/read\" :params {:path \"README.md\"}})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-approve-tool!))

(def eca-reject-tool!
  "Reject tool call from ECA

   Usage: (eca-reject-tool! {:tool \"shell/exec\" :reason \"Too dangerous\"})"
  (lazy-fn 'ouroboros.interface.eca-client 'eca-reject-tool!))

;; ============================================================================
;; Learning System (NEW - Wisdom Flywheel)
;; ============================================================================

(def learning-save-insight!
  "Save a learning insight

   Usage: (learning-save-insight! :user-123 {:title \"...\" :insights [...]})"
  (lazy-fn 'ouroboros.interface.learning 'save-insight!))

(def learning-get-history
  "Get learning history for a user

   Usage: (learning-get-history :user-123)"
  (lazy-fn 'ouroboros.interface.learning 'get-history))

(def learning-recall-pattern
  "Recall learnings by pattern

   Usage: (learning-recall-pattern :user-123 \"sequence-type\")"
  (lazy-fn 'ouroboros.interface.learning 'recall-pattern))

(def learning-find-related
  "Find related learnings for context

   Usage: (learning-find-related :user-123 \"python error\")"
  (lazy-fn 'ouroboros.interface.learning 'find-related-learnings))

(def learning-create-from-error
  "Create learning from error/fix pattern

   Usage: (learning-create-from-error :user-123 \"TypeError\" \"Fix\" \"context\")"
  (lazy-fn 'ouroboros.interface.learning 'create-error-learning))

(def learning-apply!
  "Increment application count for a learning

   Usage: (learning-apply! \"user-123/sequence-types-1234567890\")"
  (lazy-fn 'ouroboros.interface.learning 'apply-learning!))

(def learning-user-stats
  "Get learning statistics for user

   Usage: (learning-user-stats :user-123)"
  (lazy-fn 'ouroboros.interface.learning 'user-stats))

;; ============================================================================
;; Semantic Learning with Git-Embed (NEW - Code-Aware Learning)
;; ============================================================================

(def learning-semantic-recall
  "Recall learnings using semantic similarity to code context

   Usage: (learning-semantic-recall :user-123 \"error handling\")
          (learning-semantic-recall :user-123 \"threading macros\" :limit 5)"
  (lazy-fn 'ouroboros.interface.learning 'semantic-recall))

(def learning-find-code-related
  "Find code context for an existing learning

   Usage: (learning-find-code-related :user-123 \"learning-id\")"
  (lazy-fn 'ouroboros.interface.learning 'find-code-related))

(def learning-auto-link-code!
  "Auto-link learning to related code files

   Usage: (learning-auto-link-code! \"user-123/learning-id\")"
  (lazy-fn 'ouroboros.interface.learning 'auto-link-code!))

(def learning-save-with-code!
  "Save learning with automatic code context extraction

   Usage: (learning-save-with-code! :user-123 {:title \"...\" :insights [...]})"
  (lazy-fn 'ouroboros.interface.learning 'save-with-code!))

(def learning-semantic-available?
  "Check if semantic search is available (git-embed healthy)

   Usage: (learning-semantic-available?)"
  (lazy-fn 'ouroboros.interface.learning 'semantic-available?))

(def learning-semantic-user-stats
  "Get semantic search statistics for user

   Usage: (learning-semantic-user-stats :user-123)"
  (lazy-fn 'ouroboros.interface.learning 'semantic-user-stats))

(def learning-update-code-index!
  "Update git-embed code index

   Usage: (learning-update-code-index!)"
  (lazy-fn 'ouroboros.interface.learning 'update-code-index!))

;; ============================================================================
;; Educational Approval (NEW - Teaching Moments)
;; ============================================================================

(def educational-enhance-approval
  "Enhance approval message with educational content

   Usage: (educational-enhance-approval \"file/write\" {:path \"config.json\"})"
  (lazy-fn 'ouroboros.interface.educational-approval 'enhance-approval))

(def educational-calculate-risk
  "Calculate risk level for tool

   Usage: (educational-calculate-risk \"shell/exec\" {:command \"rm -rf /tmp\"})"
  (lazy-fn 'ouroboros.interface.educational-approval 'calculate-risk))

(def educational-get-tool-knowledge
  "Get knowledge about a tool

   Usage: (educational-get-tool-knowledge \"file/write\")"
  (lazy-fn 'ouroboros.interface.educational-approval 'get-tool-knowledge))

(def educational-wrap-forward-approval
  "Wrap forward approval function with educational enhancement

   Usage: (def enhanced (educational-wrap-forward-approval original-forward-fn))"
  (lazy-fn 'ouroboros.interface.educational-approval 'wrap-forward-approval))

;; ============================================================================
;; λ(system) - Auto-evolution & Metrics
;; ============================================================================

(defn lambda-evolve
  "Run λ(system) auto-evolution loop
   
   Usage: (iface/lambda-evolve)"
  []
  (try (require '[ouroboros.lambda-evolve :as evolve])
       (evolve/auto-evolve!)
       (catch Exception e (println "λ evolution error:" (.getMessage e)))))

(defn lambda-metrics
  "Show λ(system) effectiveness metrics
   
   Usage: (iface/lambda-metrics)"
  []
  (try (require '[ouroboros.lambda-metrics :as lambda])
       (lambda/lambda-system-report)
       (catch Exception e (println "λ metrics error:" (.getMessage e)))))

(defn lambda-status
  "Show λ(system) status and state
   
   Usage: (iface/lambda-status)"
  []
  (try (require '[ouroboros.lambda-evolve :as evolve])
       (evolve/system-status)
       (catch Exception e (println "λ status error:" (.getMessage e)))))

(defn lambda-track-issue!
  "Track an issue for auto-evolution
   
   Usage: (iface/lambda-track-issue! \"deep-nesting\" \"src/foo.clj\")"
  [issue-type file]
  (try (require '[ouroboros.lambda-evolve :as evolve])
       (evolve/track-issue! issue-type file)
       (println "Tracked issue:" issue-type "in" file)
       (catch Exception e (println "λ track error:" (.getMessage e)))))

(defn lambda-maintain
  "Run λ(system) maintenance checklist
   
   Usage: (iface/lambda-maintain)"
  []
  (try (require '[ouroboros.lambda-maintain :as maintain])
       (maintain/run-checklist!)
       (catch Exception e (println "λ maintain error:" (.getMessage e)))))

;; ============================================================================
;; Git-Embed (Semantic Code Search)
;; ============================================================================

(defn git-embed-update!
  "Update git-embed index for semantic search
   
   Usage: (iface/git-embed-update!)"
  []
  (require '[ouroboros.git-embed :as embed])
  (embed/update-index!))

(defn git-embed-search
  "Semantic search for code
   
   Usage: (iface/git-embed-search \"threading macros\" 5)"
  [query & [limit]]
  (require '[ouroboros.git-embed :as embed])
  (embed/search query (or limit 5)))

(defn git-embed-similar
  "Find similar files
   
   Usage: (iface/git-embed-similar \"src/api.clj\")"
  [file & [limit]]
  (require '[ouroboros.git-embed :as embed])
  (embed/similar file (or limit 5)))

(defn git-embed-status
  "Check git-embed status"
  []
  (require '[ouroboros.git-embed :as embed])
  (embed/status))

(defn git-embed-healthy?
  "Check if git-embed is available"
  []
  (require '[ouroboros.git-embed :as embed])
  (embed/healthy?))

;; ============================================================================
;; Learning (with Git-Embed)
;; ============================================================================

(defn learn-save!
  "Save insight with automatic code context
   
   Usage: (iface/learn-save! \"Use threading macros\" :category :style)"
  [content & {:keys [category tags source]}]
  (require '[ouroboros.learning :as learning])
  (learning/save-insight! content :category category :tags tags :source source))

(defn learn-recall
  "Recall insights by query or category"
  [query-or-category & {:keys [limit]}]
  (require '[ouroboros.learning :as learning])
  (if (keyword? query-or-category)
    (learning/recall query-or-category :limit (or limit 10))
    (learning/recall query-or-category :limit (or limit 10))))

(defn learn-semantic-recall
  "Semantic recall using git-embed"
  [query & {:keys [limit]}]
  (require '[ouroboros.learning :as learning])
  (learning/semantic-recall query :limit (or limit 5)))

(defn learn-stats
  "Get learning statistics"
  []
  (require '[ouroboros.learning :as learning])
  (learning/learning-stats))

(defn learn-categories
  "List learning categories"
  []
  (require '[ouroboros.learning :as learning])
  (learning/list-categories))

;; ============================================================================
;; REPL
;; ============================================================================

(comment
  ;; Full boot sequence
  (boot!)

  ;; Query examples
  (q [:system/current-state])
  (q [:system/healthy?])
  (status)
  (report)

  ;; Lazy loading demo
  ;; First call loads the namespace
  (remember :test-key "test-value")

  ;; Check what's loaded
  @loaded-namespaces

  ;; λ(system) Prometheus metrics
  (prometheus/metrics-text)
  (prometheus/lambda-health-check)
  (prometheus/start-server! 9090)

  ;; Shutdown
  (shutdown!))

;; ============================================================================
;; Component Lifecycle (Mount-style)
;; ============================================================================

(defn component-start
  "Start a component by name
   
   Usage: (iface/component-start :config)"
  [name]
  (require '[ouroboros.component :as comp])
  (comp/start name))

(defn component-stop
  "Stop a component by name
   
   Usage: (iface/component-stop :config)"
  [name]
  (require '[ouroboros.component :as comp])
  (comp/stop name))

(defn component-status
  "Get status of all components
   
   Usage: (iface/component-status)"
  []
  (require '[ouroboros.component :as comp])
  (comp/status))

(defn component-healthy?
  "Check if all components are running
   
   Usage: (iface/component-healthy?)"
  []
  (require '[ouroboros.component :as comp])
  (comp/healthy?))

;; ============================================================================
;; Signal Bus (Event-driven)
;; ============================================================================

(defn signal-publish
  "Publish an event to the signal bus
   
   Usage: (iface/signal-publish :tool/execute {:tool :file/read})"
  [event-type payload]
  (require '[ouroboros.signal :as signal])
  (signal/publish! event-type payload))

(defn signal-subscribe
  "Subscribe to signal events
   
   Usage: (iface/signal-subscribe :tool/execute handler-fn)"
  [event-type handler]
  (require '[ouroboros.signal :as signal])
  (signal/subscribe event-type handler))

(defn signal-unsubscribe
  "Unsubscribe from signal events
   
   Usage: (iface/signal-unsubscribe :tool/execute handler-fn)"
  [event-type handler]
  (require '[ouroboros.signal :as signal])
  (signal/unsubscribe event-type handler))

(defn signal-bus-status
  "Get signal bus status
   
   Usage: (iface/signal-bus-status)"
  []
  (require '[ouroboros.signal :as signal])
  (signal/bus-status))

;; ============================================================================
;; Statechart (OODA execution)
;; ============================================================================

(defn sm-create
  "Create a statechart
   
   Usage: (iface/sm-create :my-sm {:initial :start :states {...}})"
  [name config]
  (require '[ouroboros.statechart :as sm])
  (sm/create-statechart name config))

(defn sm-start
  "Start a statechart
   
   Usage: (iface/sm-start :eca-ooda)"
  [name]
  (require '[ouroboros.statechart :as sm])
  (sm/start! name))

(defn sm-stop
  "Stop a statechart
   
   Usage: (iface/sm-stop :eca-ooda)"
  [name]
  (require '[ouroboros.statechart :as sm])
  (sm/stop! name))

(defn sm-transition
  "Transition a statechart via event
   
   Usage: (iface/sm-transition :eca-ooda :orient)"
  [name event]
  (require '[ouroboros.statechart :as sm])
  (sm/transition! name event))

(defn sm-state
  "Get current state of a statechart
   
   Usage: (iface/sm-state :eca-ooda)"
  [name]
  (require '[ouroboros.statechart :as sm])
  (sm/current-state name))

(defn sm-status
  "Get status of all statecharts
   
   Usage: (iface/sm-status)"
  []
  (require '[ouroboros.statechart :as sm])
  (sm/status))

;; ============================================================================
;; Statecharts Registry (5 registered statecharts)
;; ============================================================================

(defn statecharts-register!
  "Register all system statecharts
   
   Usage: (iface/statecharts-register!)"
  []
  (require '[ouroboros.statecharts :as statecharts])
  (statecharts/register-statecharts!))

(defn statecharts-start-all
  "Register and start all statecharts
   
   Usage: (iface/statecharts-start-all)"
  []
  (require '[ouroboros.statecharts :as statecharts])
  (statecharts/start-all))

(defn statecharts-stop-all
  "Stop all statecharts
   
   Usage: (iface/statecharts-stop-all)"
  []
  (require '[ouroboros.statecharts :as statecharts])
  (statecharts/stop-all))

(defn statecharts-coordinator
  "Route event to appropriate statechart
   
   Usage: (iface/statecharts-coordinator {:type :approve})"
  [event]
  (require '[ouroboros.statecharts :as statecharts])
  (statecharts/coordinator event))

;; ============================================================================
;; System Components (9 mount states)
;; ============================================================================

(defn components-start-all
  "Start all system components
   
   Usage: (iface/components-start-all)"
  []
  (require '[ouroboros.components :as components])
  (components/start-all))

(defn components-stop-all
  "Stop all system components
   
   Usage: (iface/components-stop-all)"
  []
  (require '[ouroboros.components :as components])
  (components/stop-all))

(defn components-status
  "Get status of all components
   
   Usage: (iface/components-status)"
  []
  (require '[ouroboros.components :as components])
  (components/status))

(defn components-healthy?
  "Check if all components are healthy
   
   Usage: (iface/components-healthy?)"
  []
  (require '[ouroboros.components :as components])
  (components/healthy?))

(defn component-state
  "Get state of a specific component
   
   Usage: (iface/component-state :config)"
  [name]
  (require '[ouroboros.components :as components])
  (components/state name))

;; ============================================================================
;; Dual Persistence (Datalevin + Git)
;; ============================================================================

(defn persistence-save!
  "Save to appropriate store (auto-detect operational vs knowledge)
   
   Usage: (iface/persistence-save! :sessions {:id \"s1\"})
          (iface/persistence-save! :insights \"content\")"
  [entity data]
  (require '[ouroboros.persistence :as persist])
  (persist/save! entity data))

(defn persistence-get
  "Get from appropriate store
   
   Usage: (iface/persistence-get :sessions)
          (iface/persistence-get :insights)"
  [entity]
  (require '[ouroboros.persistence :as persist])
  (persist/get entity))

(defn persistence-status
  "Get persistence status
   
   Usage: (iface/persistence-status)"
  []
  (require '[ouroboros.persistence :as persist])
  (persist/status))

(defn persistence-close!
  "Close all persistence connections
   
   Usage: (iface/persistence-close!)"
  []
  (require '[ouroboros.persistence :as persist])
  (persist/close!))
