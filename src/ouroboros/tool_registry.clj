(ns ouroboros.tool-registry
  "Tool Registry - Central registry for AI-accessible tools
   
   Provides a central place to register and discover tools without
   creating circular dependencies between ai and query namespaces.
   
   Tools are registered with metadata (description, parameters) and
   an implementation function. The implementation is provided at
   registration time, allowing flexibility in how tools are defined.
   
   Usage:
   (register-tool! :my/tool
                   {:description \"Does something\"
                    :parameters {:x {:type :string}}
                    :fn (fn [params] ...)})
   (list-tools)
   (call-tool :my/tool {:x \"hello\"})"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

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
     - :fn - Implementation function (params -> result)"
  [tool-name {:keys [description parameters fn]}]
  (swap! registry-atom assoc tool-name
         {:description description
          :parameters parameters
          :fn fn})
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
  (map (fn [[name {:keys [description parameters]}]]
         {:tool/name name
          :tool/description description
          :tool/parameters parameters})
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
;; Execution
;; ============================================================================

(defn call-tool
  "Execute a tool by name with parameters
   
   Handles:
   - Tool lookup
   - Execution timing
   - Telemetry logging
   - Error handling"
  [tool-name params]
  (telemetry/log-tool-invoke tool-name params)
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
          (let [duration (/ (- (System/nanoTime) start) 1e6)]
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

  ;; Call tool
  (call-tool :example/tool {:x "World"})

  ;; Clear
  (clear-registry!))