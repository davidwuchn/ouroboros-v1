;; λ(system) Telemetry Bridge
;; Connects telemetry events to OODA observation functions
;; Routes :review/*, :memory/* events to lambda-evolve for pattern recognition
(ns ouroboros.telemetry.lambda-bridge
  "λ(system) Telemetry Bridge

   Connects telemetry events to OODA observation functions.
   Routes events to lambda-evolve for pattern recognition and evolution.
   
   Usage:
     (require '[ouroboros.telemetry.lambda-bridge :as bridge])
     (bridge/enable!)  ; Start listening to telemetry events
     (bridge/disable!) ; Stop listening"
  (:require [ouroboros.telemetry :as telemetry]
            [ouroboros.telemetry.protocol :as tp]
            [ouroboros.lambda-evolve :as evolve]
            [ouroboros.lambda-metrics :as metrics]
            [clojure.string :as str]))

;; ============================================================================
;; Bridge State
;; ============================================================================

(defonce ^:private bridge-enabled? (atom false))

;; ============================================================================
;; Event Processing (defined first to avoid forward reference)
;; ============================================================================

(defn- classify-scale
  "Classify an issue by OODA scale"
  [event-type details]
  (cond
    ;; Syntax-level: line length, indentation, formatting
    (some #(str/includes? (str event-type) (str %))
          [:syntax :indentation :line-length :nesting :format])
    :syntax

    ;; Semantic-level: idioms, error handling, data flow
    (some #(str/includes? (str event-type) (str %))
          [:idiom :semantic :error-handling :data-flow :validation])
    :semantic

    ;; Architectural-level: coupling, boundaries, patterns
    (some #(str/includes? (str event-type) (str %))
          [:architectural :coupling :boundary :pattern :structure])
    :architectural

    ;; Process-level: effectiveness, adoption
    (some #(str/includes? (str event-type) (str %))
          [:process :adoption :effectiveness :workflow])
    :process

    ;; Default to semantic for unknown
    :else :semantic))

(defn- extract-file-path
  "Extract file path from event data"
  [event]
  (or (:file event)
      (:path event)
      (get-in event [:params :path])
      (get-in event [:params :file])
      "unknown"))

(defn- process-review-event
  "Process a review-related telemetry event"
  [event]
  (let [event-type (:event event)
        details (or (:details event) (:params event) {})
        file (extract-file-path event)]

    ;; Track the issue for evolution
    (when-let [issue-type (:issue-type details)]
      (evolve/track-issue! issue-type file))

    ;; Record OODA observation at appropriate scale
    (let [scale (classify-scale event-type details)]
      (case scale
        :syntax (evolve/observe-syntax! event-type file details)
        :semantic (evolve/observe-semantic! event-type file details)
        :architectural (evolve/observe-architectural! event-type file details)
        :process (evolve/observe-process! event-type details)))

    ;; Record metrics
    (metrics/record-review!
     {:issues (or (:issue-count details) 1)
      :suggestions (or (:suggestion-count details) 0)
      :adopted (or (:adopted-count details) 0)
      :false-positive (:false-positive? details false)})))

(defn- process-memory-event
  "Process a memory-related telemetry event"
  [event]
  (let [event-type (:event event)
        details (or (:details event) (:params event) {})]

    (case event-type
      ;; Search operation
      :memory/search
      (let [query (:query details "")
            results-count (:results-count details 0)
            elapsed-ms (:duration-ms event 0)]
        (evolve/track-search! query)
        (metrics/record-retrieval!
         {:query query
          :results-count results-count
          :elapsed-ms elapsed-ms
          :relevant (> results-count 0)}))

      ;; Access/retrieval
      :memory/retrieve
      (let [key (:key details)
            elapsed-ms (:duration-ms event 0)]
        (when key
          (evolve/track-access! (str key))
          (metrics/record-retrieval!
           {:key key
            :elapsed-ms elapsed-ms
            :relevant true})))

      ;; Store operation - record insight if wisdom
      :memory/store
      (when-let [insight (:insight details)]
        (evolve/record-insight! insight))

      ;; Default: ignore
      nil)))

(defn- process-tool-event
  "Process a tool-related telemetry event"
  [event]
  (let [tool-name (:tool event)
        success? (:success? event)]

    ;; Track frequent tool usage patterns
    (when tool-name
      (evolve/track-access! (str "tool:" tool-name)))

    ;; Track failures for evolution
    (when (false? success?)
      (evolve/track-issue! (keyword "tool-failure" tool-name) "system"))))

(defn- process-query-event
  "Process a query-related telemetry event"
  [event]
  (let [query-keys (:query-keys event)
        duration-ms (:duration-ms event 0)]

    ;; Track frequent queries for indexing
    (when query-keys
      (doseq [k query-keys]
        (evolve/track-access! (str "query:" k))))

    ;; Slow queries indicate potential indexing needs
    (when (> duration-ms 1000)
      (evolve/track-issue! :slow-query "query-system"
                           {:duration-ms duration-ms
                            :keys query-keys}))))

(defn- process-event
  "Route telemetry event to appropriate handler"
  [event]
  (let [event-type (:event event)]
    (cond
      ;; Review events
      (str/starts-with? (str event-type) ":review/")
      (process-review-event event)

      ;; Memory events
      (str/starts-with? (str event-type) ":memory/")
      (process-memory-event event)

      ;; Tool events
      (= :tool/invoke event-type)
      (process-tool-event event)

      ;; Query events
      (= :query/execute event-type)
      (process-query-event event)

      ;; Learning events - track insights and applications
      (= :learning/saved event-type)
      (let [title (:title event)
            pattern (:pattern event)
            learning-id (:learning-id event)
            category (:category event)]
        (when pattern
          (evolve/track-issue! (keyword (str "learning-" pattern)) 
                              (str "learning/" learning-id)
                              {:title title :category category}))
        (evolve/record-insight! (str "New learning: " title)))

      (= :learning/applied event-type)
      (let [learning-id (:learning-id event)
            title (:title event)
            pattern (:pattern event)
            applied-count (:applied-count event)]
        (evolve/track-access! (str "learning/" learning-id))
        ;; When proven (3+), elevate to system insight
        (when (>= (or applied-count 0) 3)
          (evolve/record-insight! 
            (str "Proven pattern: '" pattern "' applied " applied-count " times"))))

      ;; WebUX/learning insights
      (= :learning/insight event-type)
      (when-let [insight (get-in event [:params :insight])]
        (evolve/record-insight! insight))

      ;; Default: ignore
      :else nil)))

;; ============================================================================
;; Backend Definition (after process-event)
;; ============================================================================

(defonce ^:private lambda-backend
  (reify tp/TelemetryBackend
    (emit-event! [_ event]
      (process-event event))
    (flush-events! [_])
    (close-backend! [_])))

;; ============================================================================
;; Public API
;; ============================================================================

(defn enable!
  "Enable the lambda bridge - start routing telemetry to lambda-evolve
   
   Usage: (enable!)"
  []
  (when-not @bridge-enabled?
    (tp/add-backend! lambda-backend)
    (reset! bridge-enabled? true)
    (println "✓ λ(system) bridge enabled - telemetry → evolution")))

(defn disable!
  "Disable the lambda bridge
   
   Usage: (disable!)"
  []
  (when @bridge-enabled?
    (tp/remove-backend! lambda-backend)
    (reset! bridge-enabled? false)
    (println "⊘ λ(system) bridge disabled")))

(defn status
  "Get bridge status"
  []
  {:enabled? @bridge-enabled?
   :backend-active? (some #(= lambda-backend %) (tp/get-backends))})

(defn auto-enable!
  "Auto-enable bridge on system boot if not already enabled"
  []
  (when-not @bridge-enabled?
    (enable!)))

;; Auto-enable on namespace load (when telemetry is ready)
(try
  (auto-enable!)
  (catch Exception _
    ;; Telemetry not initialized yet, will enable manually
    nil))

;; ============================================================================
;; Manual Event Injection (for testing/skills)
;; ============================================================================

(defn emit-review-event
  "Manually emit a review event (for skills to call)"
  [issue-type file & [details]]
  (telemetry/emit!
   {:event :review/flagged
    :issue-type issue-type
    :file file
    :details details
    :timestamp (System/currentTimeMillis)}))

(defn emit-search-event
  "Manually emit a search event (for instrumentation)"
  [query results-count elapsed-ms]
  (telemetry/emit!
   {:event :memory/search
    :query query
    :results-count results-count
    :duration-ms elapsed-ms
    :timestamp (System/currentTimeMillis)}))

(defn emit-retrieval-event
  "Manually emit a retrieval event (for instrumentation)"
  [key elapsed-ms]
  (telemetry/emit!
   {:event :memory/retrieve
    :key key
    :duration-ms elapsed-ms
    :timestamp (System/currentTimeMillis)}))

(comment
  ;; Test the bridge
  (enable!)
  (status)

  ;; Simulate events
  (emit-review-event :deep-nesting "src/test.clj" {:line 42})
  (emit-search-event "threading macros" 5 150)
  (emit-retrieval-event :user/settings 50)

  ;; Check evolution state
  (evolve/system-status)
  (evolve/analyze-ooda)

  ;; Disable
  (disable!))
