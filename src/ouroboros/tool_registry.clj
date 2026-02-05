(ns ouroboros.tool-registry
  "Tool Registry - Central registry for AI-accessible tools
   
   Provides a central place to register and discover tools without
   creating circular dependencies between ai and query namespaces.
   
   SAFETY: All tool execution now goes through:
   1. Allowlist check - Is the subject permitted to use this tool?
   2. Sandbox execution - Timeouts, memory limits, error isolation
   
   Usage:
   (register-tool! :my/tool
                   {:description \"Does something\"
                    :parameters {:x {:type :string}}
                    :fn (fn [params] ...)})
   (list-tools)
   (call-tool :my/tool {:x \"hello\"} :session-123)  ; With safety context"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.tool-sandbox :as sandbox]
   [ouroboros.tool-allowlist :as allowlist]
   [ouroboros.schema :as schema]))

;; ============================================================================
;; Registry
;; ============================================================================

(defonce ^:private registry-atom (atom {}))

;; ============================================================================
;; Registration
;; ============================================================================

(defn register-tool!
  "Register a new tool for AI use
   
   Args:
   - tool-name: Keyword name of the tool
   - spec: Map with:
     - :description - Human-readable description
     - :parameters - Parameter schema for the tool
     - :fn - Implementation function (params -> result)
     - :unique? - (optional) Whether tool is unique to Ouroboros (for MCP filtering)"
  [tool-name {:keys [description parameters fn unique?] :as spec}]
  (swap! registry-atom assoc tool-name
         {:description description
          :parameters parameters
          :fn fn
          :unique? unique?
          :spec spec})  ; Store full spec for metadata access
  (println (str "✓ Tool registered: " tool-name)))

(defn unregister-tool!
  "Remove a tool from the registry"
  [tool-name]
  (swap! registry-atom dissoc tool-name)
  (println (str "✓ Tool unregistered: " tool-name)))

(defn clear-registry!
  "Clear all tools (useful for testing)"
  []
  (reset! registry-atom {}))

;; ============================================================================
;; Discovery
;; ============================================================================

(defn list-tools
  "List all available tools with metadata (excluding implementation)"
  []
  (map (fn [[name {:keys [description parameters unique? spec]}]]
         {:tool/name name
          :tool/description description
          :tool/parameters parameters
          :tool/unique? unique?
          :tool/spec spec})
       @registry-atom))

(defn get-tool
  "Get a specific tool's full definition (including :fn)"
  [tool-name]
  (get @registry-atom (keyword tool-name)))

(defn tool-exists?
  "Check if a tool is registered"
  [tool-name]
  (contains? @registry-atom (keyword tool-name)))

;; ============================================================================
;; Safe Execution (NEW - with sandbox and allowlist)
;; ============================================================================

(defn call-tool-safe
  "Execute a tool with full safety: allowlist + sandbox
   
   Args:
   - tool-name: Keyword name of the tool
   - params: Parameters for the tool
   - subject: Subject identifier for allowlist check (e.g., :session-123)
   - opts: Optional map with:
     - :check-allowlist? - Check allowlist before execution (default true)
     - :use-sandbox? - Use sandbox execution (default true)
     - :sandbox-opts - Override sandbox constraints
   
   Returns:
   {:status :success :result {...}}
   {:status :forbidden :error \"...\"}  ; Not in allowlist
   {:status :timeout :error \"...\"}     ; Sandbox timeout
   {:status :error :error \"...\"}       ; Execution error"
  ([tool-name params subject]
   (call-tool-safe tool-name params subject {}))
   ([tool-name params subject opts]
    (let [{:keys [check-allowlist? use-sandbox? validate-schema? sandbox-opts]
           :or {check-allowlist? true use-sandbox? true validate-schema? true}} opts
          tool-kw (keyword tool-name)]

      ;; Step 1: Check allowlist
      (if (and check-allowlist? (not (allowlist/permitted? subject tool-kw {:params params})))
        ;; Forbidden - not in allowlist
        (do
          (telemetry/emit! {:event :tool/forbidden
                            :tool tool-kw
                            :subject subject})
          {:status :forbidden
           :tool tool-kw
           :error (str "Tool " tool-kw " not permitted for subject " subject)
           :subject subject})

        ;; Step 2: Validate schema
        (if-let [tool (get-tool tool-kw)]
          (let [validation (when validate-schema?
                             (schema/validate-tool-call tool-kw params tool))]
            (if (and validate-schema? (not (:valid? validation)))
              ;; Schema validation failed
              (do
                (telemetry/emit! {:event :tool/validation-failed
                                  :tool tool-kw
                                  :errors (:errors validation)
                                  :subject subject})
                {:status :validation-failed
                 :tool tool-kw
                 :error (str "Schema validation failed: " (str/join ", " (:errors validation)))
                 :validation-errors (:errors validation)
                 :subject subject})

              ;; Step 3: Execute with sandbox
              (let [validated-params (if validate-schema?
                                       (:params validation)
                                       params)]
                (telemetry/log-tool-invoke tool-kw validated-params)
                (if use-sandbox?
                  ;; Use sandbox for safe execution
                  (let [sandbox-result (sandbox/execute! tool-kw (:fn tool) validated-params sandbox-opts)]
                    (case (:status sandbox-result)
                      :success {:status :success
                                :tool tool-kw
                                :params validated-params
                                :result (:result sandbox-result)
                                :duration-ms (:duration-ms sandbox-result)}
                      :timeout {:status :timeout
                                :tool tool-kw
                                :error (:error sandbox-result)
                                :timeout-ms (:timeout-ms sandbox-result)}
                      :memory-exceeded {:status :error
                                        :tool tool-kw
                                        :error (:error sandbox-result)
                                        :memory-used-mb (:memory-used-mb sandbox-result)}
                      {:status :error
                       :tool tool-kw
                       :error (:error sandbox-result)}))
                  ;; Direct execution (bypass sandbox - use with caution)
                  (try
                    (let [start (System/nanoTime)
                          result ((:fn tool) validated-params)
                          duration (/ (- (System/nanoTime) start) 1e6)]
                      (telemetry/log-tool-complete tool-kw result duration)
                      {:status :success
                       :tool tool-kw
                       :params validated-params
                       :result result
                       :duration-ms duration})
                    (catch Exception e
                      (telemetry/log-tool-error tool-kw e)
                      {:status :error
                       :tool tool-kw
                       :params validated-params
                       :error (.getMessage e)}))))))
          {:status :not-found
           :tool tool-kw
           :error "Tool not found"
           :available-tools (keys @registry-atom)})))))

;; ============================================================================
;; Legacy Execution (DEPRECATED - use call-tool-safe instead)
;; ============================================================================

(defn call-tool
  "Execute a tool by name with parameters
   
   WARNING: This bypasses allowlist and sandbox. For safe execution,
   use call-tool-safe instead.
   
   Handles:
   - Tool lookup
   - Execution timing
   - Telemetry logging
   - Error handling"
  [tool-name params]
  (telemetry/emit! {:event :tool/unsafe-execution
                    :tool tool-name
                    :warning "Using deprecated call-tool - no sandbox protection"})
  (let [start (System/nanoTime)]
    (if-let [tool (get-tool tool-name)]
      (try
        (let [result ((:fn tool) params)
              duration (/ (- (System/nanoTime) start) 1e6)]
          (telemetry/log-tool-complete tool-name result duration)
          {:tool tool-name
           :params params
           :result result
           :status :success})
        (catch Exception e
          (let [_duration (/ (- (System/nanoTime) start) 1e6)]
            (telemetry/log-tool-error tool-name e)
            {:tool tool-name
             :params params
             :error (.getMessage e)
             :status :error})))
      (do
        (telemetry/emit! {:event :tool/not-found :tool tool-name})
        {:tool tool-name
         :error "Tool not found"
         :available-tools (keys @registry-atom)
         :status :not-found}))))

;; ============================================================================
;; Chat-Safe Tool Filtering
;; ============================================================================

(def ^:private chat-safe-tools
  "Tools safe to expose in chat contexts"
  #{:system/status
    :system/report
    :git/commits
    :git/status
    :file/read
    :file/search
    :file/list
    :memory/get
    :memory/set
    :http/get
    :query/eql})

(defn chat-safe-tool?
  "Check if a tool is safe for chat usage"
  [tool-name]
  (contains? chat-safe-tools (keyword tool-name)))

(defn list-chat-safe-tools
  "List tools that are safe to use in chat contexts"
  []
  (filter #(chat-safe-tool? (:tool/name %)) (list-tools)))

;; ============================================================================
;; Convenience: Quick Allowlist Setup
;; ============================================================================

(defn setup-chat-allowlist!
  "Quick setup for chat session with chat-safe tools
   
   Usage:
     (setup-chat-allowlist! :telegram-123-456)"
  [subject]
  (allowlist/create! subject :chat-safe))

(defn setup-safe-session!
  "Setup a fully safe session with all safety features
   
   Creates allowlist and returns subject key for use with call-tool-safe."
  [platform platform-id user-id & {:keys [level] :or {level :chat-safe}}]
  (let [subject (allowlist/get-chat-session-key platform platform-id user-id)]
    (allowlist/create! subject level)
    subject))

;; ============================================================================
;; Safety Statistics
;; ============================================================================

(defn safety-stats
  "Get combined safety statistics from sandbox and allowlist"
  []
  {:sandbox (sandbox/get-stats)
   :allowlist (allowlist/stats)})

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Register a tool
  (register-tool! :example/tool
                  {:description "Example tool"
                   :parameters {:x {:type :string}}
                   :fn (fn [{:keys [x]}] (str "Hello, " x))})

  ;; List tools
  (list-tools)

  ;; Setup safe session
  (setup-safe-session! :telegram "123" "user-456")

  ;; Call with safety
  (call-tool-safe :example/tool {:x "World"} :telegram-123-user-456)

  ;; Check safety stats
  (safety-stats)

  ;; Cleanup
  (clear-registry!))