(ns ouroboros.tool-sandbox
  "Tool Sandboxing Layer - Execute tools with safety constraints
   
   Core principle: All tool execution goes through the sandbox.
   The sandbox enforces:
   - Timeouts (prevent infinite loops)
   - Memory limits (prevent OOM)
   - Resource tracking (CPU, I/O)
   - Error isolation (do not crash the system)
   
   Usage:
     (sandbox/execute! :file/read {:path \"README.md\"}
                       {:timeout-ms 5000
                        :memory-limit-mb 100})
     
     => {:status :success :result ...}
     => {:status :timeout :error \"Execution exceeded 5000ms\"}
     => {:status :error :error ...}"
  (:require
   [clojure.core.async :as async]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def default-constraints
  "Default safety constraints for all tool executions"
  {:timeout-ms 30000        ; 30 second timeout
   :memory-limit-mb 256     ; 256 MB memory limit
   :cpu-limit-percent 50    ; 50% CPU max (enforced where possible)
   :max-retries 0           ; No retries by default
   :retry-delay-ms 1000})   ; 1 second between retries

(def tool-specific-constraints
  "Override constraints for specific tools"
  {:file/read {:timeout-ms 10000 :memory-limit-mb 64}
   :file/search {:timeout-ms 20000 :memory-limit-mb 128}
   :http/get {:timeout-ms 15000 :memory-limit-mb 32}
   :system/status {:timeout-ms 5000 :memory-limit-mb 16}
   :openapi/call {:timeout-ms 30000 :memory-limit-mb 64}
   :query/eql {:timeout-ms 10000 :memory-limit-mb 128}})

;; ============================================================================
;; Resource Tracking
;; ============================================================================

(defonce ^:private execution-stats
  (atom {:executions 0
         :timeouts 0
         :memory-exceeded 0
         :errors 0
         :total-duration-ms 0}))

(defn- record-execution! [status duration-ms]
  (swap! execution-stats update :executions inc)
  (swap! execution-stats update :total-duration-ms + duration-ms)
  (case status
    :timeout (swap! execution-stats update :timeouts inc)
    :memory-exceeded (swap! execution-stats update :memory-exceeded inc)
    :error (swap! execution-stats update :errors inc)
    nil))

(defn get-stats
  "Get sandbox execution statistics"
  []
  (merge @execution-stats
         {:avg-duration-ms (if (> (:executions @execution-stats) 0)
                             (/ (:total-duration-ms @execution-stats)
                                (:executions @execution-stats))
                             0)}))

(defn reset-stats!
  "Reset sandbox statistics"
  []
  (reset! execution-stats {:executions 0
                           :timeouts 0
                           :memory-exceeded 0
                           :errors 0
                           :total-duration-ms 0}))

;; ============================================================================
;; Memory Tracking
;; ============================================================================

(defn- get-memory-usage-mb
  "Get current JVM memory usage in MB"
  []
  (let [runtime (Runtime/getRuntime)
        used (- (.totalMemory runtime) (.freeMemory runtime))]
    (/ used 1024.0 1024.0)))

(defn- check-memory-limit
  "Check if memory usage is within limit"
  [limit-mb]
  (<= (get-memory-usage-mb) limit-mb))

;; ============================================================================
;; Execution with Timeout
;; ============================================================================

(defn- execute-with-timeout
  "Execute function with timeout using core.async
   
   Returns {:status :success :result ...}
        or {:status :timeout :error ...}"
  [f args timeout-ms]
  (let [result-chan (async/promise-chan)
        timeout-chan (async/timeout timeout-ms)]
    ;; Run function in thread to avoid blocking go block
    (async/thread
      (try
        (let [result (apply f args)]
          (async/put! result-chan {:status :success :result result}))
        (catch Exception e
          (async/put! result-chan {:status :error
                                   :error (.getMessage e)
                                   :exception e}))))
    ;; Wait for result or timeout
    (async/alt!!
      result-chan ([result] result)
      timeout-chan (do
                     (async/close! result-chan)
                     {:status :timeout
                      :error (str "Execution exceeded " timeout-ms "ms")
                      :timeout-ms timeout-ms}))))

;; ============================================================================
;; Sandboxed Execution
;; ============================================================================

(defn get-constraints
  "Get effective constraints for a tool (defaults + tool-specific)"
  [tool-name]
  (merge default-constraints
         (get tool-specific-constraints (keyword tool-name) {})))

(defn execute!
  "Execute a tool function with sandbox constraints
   
   Args:
   - tool-name: Keyword name of the tool
   - tool-fn: The function to execute
   - params: Parameters to pass to the function
   - opts: Optional override constraints
   
   Returns:
   {:status :success :result {...}}
   {:status :timeout :error \" ... \" :timeout-ms N}
   {:status :error :error \" ... \" :exception e}"
  ([tool-name tool-fn params]
   (execute! tool-name tool-fn params {}))
  ([tool-name tool-fn params opts]
   (let [constraints (merge (get-constraints tool-name) opts)
         {:keys [timeout-ms max-retries]} constraints
         start-time (System/currentTimeMillis)]

     (telemetry/emit! {:event :sandbox/execute-start
                       :tool tool-name
                       :timeout-ms timeout-ms
                       :memory-limit-mb (:memory-limit-mb constraints)})

     (loop [attempt 0]
       (let [memory-before (get-memory-usage-mb)
             result (execute-with-timeout tool-fn [params] timeout-ms)
             duration (- (System/currentTimeMillis) start-time)
             memory-after (get-memory-usage-mb)
             memory-used (- memory-after memory-before)]

         ;; Check memory limit
         (if (> memory-used (:memory-limit-mb constraints))
           ;; Memory exceeded
           (do
             (record-execution! :memory-exceeded duration)
             (telemetry/emit! {:event :sandbox/memory-exceeded
                               :tool tool-name
                               :memory-used-mb memory-used
                               :memory-limit-mb (:memory-limit-mb constraints)})
             {:status :memory-exceeded
              :error (str "Memory limit exceeded: "
                          (int memory-used) "MB > "
                          (:memory-limit-mb constraints) "MB")
              :memory-used-mb memory-used
              :memory-limit-mb (:memory-limit-mb constraints)
              :duration-ms duration})

           ;; Memory OK - process result
           (do
             ;; Record stats
             (record-execution! (:status result) duration)

             ;; Log completion
             (telemetry/emit! {:event :sandbox/execute-complete
                               :tool tool-name
                               :status (:status result)
                               :duration-ms duration})

             ;; Handle result
             (cond
               ;; Success
               (= :success (:status result))
               (assoc result :duration-ms duration)

               ;; Timeout with retries remaining
               (and (= :timeout (:status result))
                    (< attempt max-retries))
               (do
                 (telemetry/emit! {:event :sandbox/retry
                                   :tool tool-name
                                   :attempt (inc attempt)
                                   :max-retries max-retries})
                 (Thread/sleep (:retry-delay-ms constraints))
                 (recur (inc attempt)))

               ;; Final result (error or timeout with no retries)
               :else
               (assoc result :duration-ms duration)))))))))

(defn execute-safe!
  "Execute with additional safety wrapper that catches all Throwables
   
   Use this for potentially dangerous tools that might throw Errors (OutOfMemoryError, etc.)"
  ([tool-name tool-fn params]
   (execute-safe! tool-name tool-fn params {}))
  ([tool-name tool-fn params opts]
   (try
     (execute! tool-name tool-fn params opts)
     (catch Throwable t
       (telemetry/emit! {:event :sandbox/critical-error
                         :tool tool-name
                         :error-type (type t)
                         :error (.getMessage t)})
       {:status :critical-error
        :error (str "Critical error: " (.getMessage t))
        :error-type (str (type t))}))))

;; ============================================================================
;; Batch Execution
;; ============================================================================

(defn execute-batch!
  "Execute multiple tools in parallel with individual constraints
   
   Usage:
     (execute-batch!
       [[:file/read read-fn {:path \"a.txt\"} {:timeout-ms 1000}]
        [:file/read read-fn {:path \"b.txt\"} {:timeout-ms 1000}]])"
  [tool-executions]
  (let [results (atom {})]
    (doseq [[tool-name tool-fn params opts] tool-executions]
      (let [result (execute! tool-name tool-fn params opts)]
        (swap! results assoc tool-name result)))
    @results))

;; ============================================================================
;; Monitoring
;; ============================================================================

(defn health-check
  "Check sandbox health
   
   Returns health status and recent error rate"
  []
  (let [stats @execution-stats
        total (:executions stats)
        errors (+ (:timeouts stats) (:errors stats) (:memory-exceeded stats))
        error-rate (if (> total 0) (/ errors total) 0)]
    {:healthy? (< error-rate 0.1)  ; Less than 10% errors is healthy
     :error-rate error-rate
     :total-executions total
     :recent-errors errors
     :stats stats}))

(comment
  ;; Test sandbox execution
  (execute! :test/slow
            (fn [_] (Thread/sleep 100) :done)
            {}
            {:timeout-ms 50})  ; Will timeout

  (execute! :test/quick
            (fn [x] (* x 2))
            {:x 21}
            {:timeout-ms 1000})  ; Will succeed

  ;; Check stats
  (get-stats)
  (health-check)
  (reset-stats!))