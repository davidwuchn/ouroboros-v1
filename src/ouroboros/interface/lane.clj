(ns ouroboros.interface.lane
  "Lane-based execution interface — Serialized command queues"
  (:require
   [ouroboros.lane :as lane]))

(defn lane-create!
  "Create a new lane with the given ID
   
   Usage: (lane-create! :session-123)"
  [lane-id]
  (lane/create-lane! lane-id))

(defn lane-submit!
  "Submit a command to a lane for serial execution
   
   Usage:
     (lane-submit! :session-123 my-fn [arg1 arg2])
     (lane-submit! :session-123 my-fn [arg1 arg2] callback-fn)"
  ([lane-id f args]
   (lane/submit! lane-id f args))
  ([lane-id f args callback]
   (lane/submit! lane-id f args callback)))

(defn lane-submit!!
  "Submit command and block for result (synchronous)
   
   Usage: (lane-submit!! :session-123 my-fn [arg1 arg2])"
  [lane-id f args]
  (lane/submit!! lane-id f args))

(defn lane-destroy!
  "Destroy a lane and clean up resources
   
   Usage: (lane-destroy! :session-123)"
  [lane-id]
  (lane/destroy-lane! lane-id))

(defn lane-status
  "Get status of a specific lane
   
   Usage: (lane-status :session-123)"
  [lane-id]
  (lane/lane-status lane-id))

(defn lane-stats
  "Get lane system statistics
   
   Usage: (lane-stats)"
  []
  (lane/stats))

(defn with-session-lane
  "Execute function within a session's dedicated lane
   
   Usage:
     (with-session-lane :telegram \"123456\"
       (fn [] (process-message message)))"
  [platform platform-id f]
  (lane/with-session-lane platform platform-id f))
