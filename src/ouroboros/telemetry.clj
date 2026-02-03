(ns ouroboros.telemetry
  "Telemetry - Structured logging and metrics for system observability

   Now uses pluggable backends via ouroboros.telemetry.protocol.
   By default: console + memory backends.
   
   Captures events across the system:
   - Tool invocations (duration, success, params)
   - Query execution (EQL queries, timing)
   - State transitions (engine lifecycle)
   - HTTP requests (API/OpenAPI calls)
   
   Events are stored in a circular buffer and queryable via EQL."
  (:require
   [clojure.string :as str]
   [clojure.edn :as edn]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.telemetry.protocol :as tp])
  (:import [java.time Instant Duration]))

;; ============================================================================
;; Default Backends
;; ============================================================================

(defonce ^:private memory-store (tp/memory-backend :max-events 1000))

(defn init!
  "Initialize telemetry with default backends

   Usage: (init!)"
  []
  (tp/set-backends! [(tp/console-backend)
                     memory-store])
  (println "✓ Telemetry initialized with console + memory backends"))

;; Initialize on namespace load
(init!)

;; ============================================================================
;; Event Store Access (for backward compatibility)
;; ============================================================================

(defn get-events
  "Get all events from the memory backend"
  []
  (vec @(:store memory-store)))

(defn get-recent-events
  "Get n most recent events"
  [n]
  (vec (take-last n @(:store memory-store))))

(defn clear-events!
  "Clear all events from memory backend"
  []
  (reset! (:store memory-store) clojure.lang.PersistentQueue/EMPTY)
  (reset! (:counter memory-store) 0)
  {:status :cleared})

;; ============================================================================
;; Event Emission
;; ============================================================================

(defn emit!
  "Emit a telemetry event to all backends

   Usage: (emit! {:event :tool/invoke :tool :file/read :duration-ms 12})"
  [event-data]
  (tp/emit! event-data))

;; ============================================================================
;; Instrumentation Wrappers
;; ============================================================================

(defmacro with-timing
  "Execute body and emit timing event"
  [event-base & body]
  `(let [start# (System/nanoTime)
         result# (try ~@body (catch Exception e# e#))
         duration# (/ (- (System/nanoTime) start#) 1e6)
         success?# (not (instance? Exception result#))]
     (emit! (merge ~event-base
                   {:duration-ms duration#
                    :success? success?#}))
     (if (instance? Exception result#)
       (throw result#)
       result#)))

(defn instrument-tool
  "Wrap a tool function with telemetry"
  [tool-name tool-fn]
  (fn [params]
    (with-timing {:event :tool/invoke
                  :tool tool-name
                  :params (select-keys params [:path :pattern :dir :n :url :key])}
      (tool-fn params))))

(defn instrument-query
  "Wrap query execution with telemetry"
  [query env]
  (with-timing {:event :query/execute
                :query (str (take 100 (pr-str query)))}
    (try
      (let [result (p.eql/process env query)]
        (emit! {:event :query/complete
                :query-keys (keys result)
                :status :success})
        result)
      (catch Exception e
        (emit! {:event :query/error
                :error (.getMessage e)
                :status :error})
        (throw e)))))

;; ============================================================================
;; Specific Event Types
;; ============================================================================

(defn log-tool-invoke
  "Log a tool invocation"
  [tool-name params]
  (emit! {:event :tool/invoke
          :tool tool-name
          :params-keys (keys params)}))

(defn log-tool-complete
  "Log a tool completion"
  [tool-name result duration-ms]
  (emit! {:event :tool/complete
          :tool tool-name
          :success? (not (:error result))
          :has-result? (some? (:result result))
          :duration-ms duration-ms}))

(defn log-tool-error
  "Log a tool error"
  [tool-name error]
  (emit! {:event :tool/error
          :tool tool-name
          :error-type (type error)
          :error-message (.getMessage error)}))

(defn log-state-transition
  "Log a state transition"
  [from-state to-state trigger]
  (emit! {:event :engine/transition
          :from from-state
          :to to-state
          :trigger trigger}))

(defn log-http-request
  "Log an HTTP request"
  [method url status duration-ms]
  (emit! {:event :http/request
          :method method
          :url (str (take 100 url))
          :status status
          :duration-ms duration-ms}))

;; ============================================================================
;; Backend Management
;; ============================================================================

(defn set-backends!
  "Set telemetry backends (replaces current)

   Usage: (set-backends! [(tp/console-backend) (tp/file-backend \"events.log\")])"
  [backends]
  (tp/set-backends! backends)
  ;; Always keep memory store for queries
  (when-not (some #(instance? ouroboros.telemetry.protocol.MemoryBackend %) backends)
    (tp/add-backend! memory-store)))

(defn add-backend!
  "Add a backend"
  [backend]
  (tp/add-backend! backend))

(defn get-backends
  "Get active backends"
  []
  (tp/get-backends))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver telemetry-events [_]
  {::pco/output [{:telemetry/events [:event/id :event/timestamp :event/seq
                                     :event]}]}
  {:telemetry/events (get-events)})

(pco/defresolver telemetry-recent [{:keys [n]}]
  {::pco/input [:n]
   ::pco/output [{:telemetry/recent [:event/id :event/timestamp :event]}]}
  {:telemetry/recent (get-recent-events n)})

(pco/defresolver telemetry-stats [_]
  {::pco/output [:telemetry/total-events :telemetry/tool-invocations :telemetry/query-executions
                 :telemetry/errors :telemetry/error-rate :telemetry/avg-tool-duration]}
  (let [events (get-events)
        tool-events (filter #(= :tool/invoke (:event %)) events)
        query-events (filter #(= :query/execute (:event %)) events)
        errors (filter #(false? (:success? %)) events)]
    {:telemetry/total-events (count events)
     :telemetry/tool-invocations (count tool-events)
     :telemetry/query-executions (count query-events)
     :telemetry/errors (count errors)
     :telemetry/error-rate (if (seq events)
                             (/ (count errors) (count events) 0.01)
                             0)
     :telemetry/avg-tool-duration (if (seq tool-events)
                                    (/ (reduce + 0 (keep :duration-ms tool-events))
                                       (count tool-events))
                                    0)}))

(pco/defresolver telemetry-by-tool [{:keys [tool-name]}]
  {::pco/input [:tool-name]
   ::pco/output [{:telemetry/by-tool [:event :duration-ms :success?]}]}
  (let [events (filter #(= (keyword tool-name) (:tool %)) (get-events))]
    {:telemetry/by-tool events}))

(pco/defmutation telemetry-clear! [_]
  {::pco/output [:status]}
  (clear-events!))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [telemetry-events
   telemetry-recent
   telemetry-stats
   telemetry-by-tool])

(def mutations
  [telemetry-clear!])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Setup custom backends
  (set-backends! [(tp/console-backend)
                  (tp/file-backend "logs/telemetry.log")])

  ;; Emit events
  (emit! {:event :test :message "Hello telemetry"})

  ;; Get events
  (get-events)
  (get-recent-events 10)

  ;; With timing
  (with-timing {:event :test/work}
    (Thread/sleep 100)
    "done")

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{:telemetry/events [:event/id :event/timestamp]}])
  (q/q [:telemetry/stats]))
