;; Signal Bus - Event-driven architecture
;; Provides decoupled communication between components
(ns ouroboros.signal
  "Signal/Event Bus for decoupled component communication
   
   Usage:
     (require '[ouroboros.signal :as signal])
     (signal/subscribe :tool/execute handler)
     (signal/publish! :tool/execute {:data :value})"
  (:require [clojure.core.async :as async]))

;; ============================================================================
;; Bus Registry
;; ============================================================================

(defonce ^:private buses (atom {}))

(defn- get-or-create-bus [bus-name]
  (or (get @buses bus-name)
      (let [bus {:name bus-name
                 :subs (atom {})
                 :pub (async/chan 1024)}]
        (swap! buses assoc bus-name bus)
        bus)))

(defn create-bus
  "Create a named signal bus for isolated event streams
   
   Usage: (def trading-bus (signal/create-bus \"trading\"))"
  [bus-name]
  (get-or-create-bus bus-name))

(defn clear-bus!
  "Clear a specific bus"
  [bus-name]
  (when-let [bus (get @buses bus-name)]
    (reset! (:subs bus) {})
    (async/close! (:pub bus))
    (swap! buses dissoc bus-name)))

(defn clear-all!
  "Clear all signal buses"
  []
  (doseq [bus-name (keys @buses)]
    (clear-bus! bus-name)))

;; ============================================================================
;; Subscribe/Unsubscribe
;; ============================================================================

(defn subscribe
  "Subscribe to events on the global bus
   
   Usage: (signal/subscribe :tool/execute handler-fn)
   
   Handler receives payload map. Return value is ignored."
  ([event-type handler]
   (subscribe nil event-type handler))
  ([bus-name event-type handler]
   (let [bus (get-or-create-bus (or bus-name :global))
         subs (@bus :subs)]
     (swap! subs update event-type (fnil conj []) handler)
     handler)))

(defn unsubscribe
  "Unsubscribe a handler from events
   
   Usage: (signal/unsubscribe :tool/execute handler-fn)"
  ([event-type handler]
   (unsubscribe nil event-type handler))
  ([bus-name event-type handler]
   (let [bus (get-or-create-bus (or bus-name :global))
         subs (@bus :subs)]
     (swap! subs update event-type (fn [handlers]
                                     (vec (remove #(= % handler) handlers)))))))

(defn subscribers
  "Get all handlers for an event type"
  ([event-type]
   (subscribers nil event-type))
  ([bus-name event-type]
   (let [bus (get-or-create-bus (or bus-name :global))]
     (get @(:subs bus) event-type []))))

(defn subscriber-count
  "Get count of subscribers for an event type"
  ([event-type]
   (subscriber-count nil event-type))
  ([bus-name event-type]
   (count (subscribers bus-name event-type))))

;; ============================================================================
;; Publish
;; ============================================================================

(defn- dispatch-event [bus event-type payload]
  (doseq [handler (subscribers bus event-type)]
    (try
      (handler payload)
      (catch Throwable t
        (println "[signal] Handler error:" (.getMessage t))))))

(defn publish!
  "Publish an event to the global bus
   
   Usage: (signal/publish! :tool/execute {:tool :file/read})"
  ([event-type]
   (publish! nil event-type {}))
  ([event-type payload]
   (publish! nil event-type payload))
  ([bus-name event-type payload]
   (let [bus (get-or-create-bus (or bus-name :global))
         event (merge payload
                     {:event/type event-type
                      :event/timestamp (System/currentTimeMillis)})]
     ;; Synchronous dispatch for immediate handlers
     (dispatch-event bus event-type event)
     ;; Also put on channel for async consumers
     (async/>!! (:pub bus) event))))

(defn publish-async!
  "Publish an event asynchronously (non-blocking)
   
   Usage: (signal/publish-async! :tool/execute {:tool :file/read})"
  ([event-type]
   (publish-async! nil event-type {}))
  ([event-type payload]
   (publish-async! nil event-type payload))
  ([bus-name event-type payload]
   (let [bus (get-or-create-bus (or bus-name :global))]
     (async/go
       (let [event (merge payload
                          {:event/type event-type
                           :event/timestamp (System/currentTimeMillis)})]
         (async/>! (:pub bus) event)
         (dispatch-event bus event-type event))))))

;; ============================================================================
;; Channel Access
;; ============================================================================

(defn channel
  "Get the publish channel for a bus (for async consumers)
   
   Usage: (async/go-loop []
            (when-let [event (async/<! (signal/channel))]
              (println \"Received:\" event))
            (recur))"
  ([]
   (channel nil))
  ([bus-name]
   (let [bus (get-or-create-bus (or bus-name :global))]
     (:pub bus))))

;; ============================================================================
;; Event Categories - Helper Functions
;; ============================================================================

(defn tool-event
  "Publish a tool-related event
   
   Usage: (signal/tool-event :execute {:tool :file/read :result :success})"
  [action data]
  (publish! :tool/action (merge data {:tool/action action})))

(defn memory-event
  "Publish a memory-related event"
  [action data]
  (publish! :memory/action (merge data {:memory/action action})))

(defn eca-event
  "Publish an ECA-related event"
  [action data]
  (publish! :eca/action (merge data {:eca/action action})))

(defn system-event
  "Publish a system event"
  [status data]
  (publish! :system/status (merge data {:system/status status})))

;; ============================================================================
;; Debug
;; ============================================================================

(defn bus-status
  "Get status of all buses"
  []
  (reduce-kv (fn [acc name bus]
               (assoc acc name {:subscriber-count (reduce + (map count (vals @(:subs bus))))
                                :channel-open? (not (nil? (async/poll! (:pub bus))))}))
             {} @buses))

(defn event-history
  "Get recent events from a bus (limited to last N)"
  ([]
   (event-history nil 100))
  ([bus-name limit]
   (let [bus (get-or-create-bus (or bus-name :global))
         ch (:pub bus)]
     (loop [events []
            n 0]
       (if (>= n limit)
         events
         (let [evt (async/poll! ch)]
           (if evt
             (recur (conj events evt) (inc n))
             events)))))))
