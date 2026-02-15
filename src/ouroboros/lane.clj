(ns ouroboros.lane
  "Lane-based command queues — Execution reliability through serialization
   
   Core principle: Default to Serial, go for Parallel explicitly
   
   A Lane is a serialized command queue. Each session gets its own lane,
   ensuring operations within a session never race. Independent operations
   can run in parallel lanes.
   
   Mental model shift: 'What's safe to parallelize?' instead of 'What do I lock?'"
  (:require
   [clojure.core.async :as async]))

;; ============================================================================
;; Lane Data Structure
;; ============================================================================

(defrecord Lane [id queue active? processor])

(defonce ^:private lanes (atom {}))

(defonce ^:private lane-stats
  (atom {:commands-processed 0
         :commands-queued 0
         :lanes-created 0
         :errors 0}))

;; ============================================================================
;; Lane Management
;; ============================================================================

(defn- process-lane-commands
  "Processor loop for a lane — executes commands serially"
  [_lane-id queue]
  (async/go-loop []
    (when-let [command (async/<! queue)]
      (try
        (let [{:keys [f args callback]} command
              result (apply f args)]
          (swap! lane-stats update :commands-processed inc)
          (when callback
            (callback {:status :success :result result})))
        (catch Exception e
          (swap! lane-stats update :errors inc)
          (when-let [callback (:callback command)]
            (callback {:status :error :error (ex-message e)}))))
      (recur))))

(defn create-lane!
  "Create a new lane with the given ID
   
   Usage: (create-lane! :session-123)"
  [lane-id]
  (let [queue (async/chan 100)]  ; Buffer 100 commands
    (swap! lanes assoc lane-id
           (map->Lane
            {:id lane-id
             :queue queue
             :active? true
             :processor (process-lane-commands lane-id queue)}))
    (swap! lane-stats update :lanes-created inc)
    lane-id))

(defn get-lane
  "Get lane by ID, create if doesn't exist"
  [lane-id]
  (or (get @lanes lane-id)
      (do (create-lane! lane-id)
          (get @lanes lane-id))))

(defn lane-exists?
  "Check if a lane exists"
  [lane-id]
  (contains? @lanes lane-id))

(defn destroy-lane!
  "Destroy a lane and clean up resources"
  [lane-id]
  (when-let [lane (get @lanes lane-id)]
    (async/close! (:queue lane))
    (swap! lanes dissoc lane-id))
  lane-id)

;; ============================================================================
;; Command Submission
;; ============================================================================

(defn submit!
  "Submit a command to a lane for serial execution
   
   Usage:
     (submit! :session-123 
              {:f my-function :args [arg1 arg2]})
     
     (submit! :session-123
              {:f my-function :args [arg1]
               :callback (fn [result] (println result))})"
  ([lane-id f args]
   (submit! lane-id f args nil))
  ([lane-id f args callback]
   (let [lane (get-lane lane-id)
         command {:f f :args args :callback callback}]
     (swap! lane-stats update :commands-queued inc)
     (async/put! (:queue lane) command)
     {:status :queued :lane lane-id})))

(defn submit!!
  "Submit command and block for result (synchronous)
   
   Usage: (submit!! :session-123 my-function [arg1 arg2])"
  [lane-id f args]
  (let [result-chan (async/promise-chan)
        callback (fn [result] (async/put! result-chan result))]
    (submit! lane-id f args callback)
    (async/<!! result-chan)))

;; ============================================================================
;; Parallel Execution (Explicit Opt-in)
;; ============================================================================

(defn submit-parallel!
  "Submit commands to multiple lanes for parallel execution
   
   Usage:
     (submit-parallel!
       [[:lane-1 fn1 [args1]]
        [:lane-2 fn2 [args2]]])"
  [lane-command-pairs]
  (let [results (atom {})
        latch (async/chan)]
    (doseq [[lane-id f args] lane-command-pairs]
      (submit! lane-id f args
               (fn [result]
                 (swap! results assoc lane-id result)
                 (async/put! latch true))))
    ;; Wait for all to complete
    (async/<!! (async/go
                 (dotimes [_ (count lane-command-pairs)]
                   (async/<! latch))
                 @results))))

;; ============================================================================
;; Session Integration
;; ============================================================================

(defn session-lane-id
  "Generate lane ID for a chat session
   
   Usage: (session-lane-id :telegram \"123456\")"
  [platform platform-id]
  (keyword (str (name platform) "-" platform-id)))

(defn with-session-lane
  "Execute function within a session's dedicated lane
   
   Usage:
     (with-session-lane :telegram \"123456\"
       (fn [] (process-message message)))"
  [platform platform-id f]
  (let [lane-id (session-lane-id platform platform-id)]
    (submit!! lane-id f [])))

;; ============================================================================
;; Monitoring & Introspection
;; ============================================================================

(defn lane-status
  "Get status of a specific lane"
  [lane-id]
  (when-let [lane (get @lanes lane-id)]
    {:lane/id (:id lane)
     :lane/active? (:active? lane)
     :lane/queue-size (.count (:queue lane))}))

(defn all-lanes
  "List all active lanes"
  []
  (map lane-status (keys @lanes)))

(defn stats
  "Get lane system statistics"
  []
  (merge @lane-stats
         {:active-lanes (count @lanes)}))

(defn reset-stats!
  "Reset lane statistics"
  []
  (reset! lane-stats {:commands-processed 0
                      :commands-queued 0
                      :lanes-created 0
                      :errors 0}))

(comment
  ;; Create a lane
  (create-lane! :test-lane)

  ;; Submit a command
  (submit! :test-lane
           + [1 2 3]
           (fn [result] (println "Result:" result)))

  ;; Synchronous execution
  (submit!! :test-lane + [1 2 3 4 5])

  ;; Check stats
  (stats)

  ;; Cleanup
  (destroy-lane! :test-lane))
