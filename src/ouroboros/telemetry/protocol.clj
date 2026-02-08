(ns ouroboros.telemetry.protocol
  "Telemetry Protocol - Pluggable backends for event collection

   Backends implement TelemetryBackend protocol to receive events.
   Multiple backends can be active simultaneously.
   
   Built-in backends:
   - ConsoleBackend - prints to stdout (default)
   - MemoryBackend - stores in circular buffer (for querying)
   - FileBackend - appends to log file
   - NullBackend - discards all events (for testing)
   
   Usage:
     (require '[ouroboros.telemetry.protocol :as tp])
     (tp/set-backends! [(tp/console-backend) (tp/file-backend \"events.log\")])
     (tp/emit! {:event :test :data \"hello\"})"
  (:import [java.time Instant]))

;; ============================================================================
;; Protocol
;; ============================================================================

(defprotocol TelemetryBackend
  "Protocol for telemetry event sinks"
  (emit-event! [this event]
    "Emit a single event to this backend")
  (flush-events! [this]
    "Flush any buffered events")
  (close-backend! [this]
    "Clean up resources"))

;; ============================================================================
;; Backend Implementations
;; ============================================================================

(defrecord ConsoleBackend []
  TelemetryBackend
  (emit-event! [_ event]
    (println (str "[TELEMETRY] " (pr-str event))))
  (flush-events! [_])
  (close-backend! [_]))

(defrecord MemoryBackend [store counter max-events]
  TelemetryBackend
  (emit-event! [_ event]
    (swap! counter inc)
    (swap! store
           (fn [q]
             (let [new-q (conj q (assoc event :event/id @counter))]
               (if (> (count new-q) max-events)
                 (pop new-q)
                 new-q)))))
  (flush-events! [_])
  (close-backend! [_]))

(defrecord FileBackend [file-path writer]
  TelemetryBackend
  (emit-event! [_ event]
    (binding [*out* writer]
      (println (pr-str event))
      (.flush writer)))
  (flush-events! [_]
    (.flush writer))
  (close-backend! [_]
    (.close writer)))

(defrecord NullBackend []
  TelemetryBackend
  (emit-event! [_ _])
  (flush-events! [_])
  (close-backend! [_]))

;; ============================================================================
;; Backend Constructors
;; ============================================================================

(defn console-backend
  "Create a console backend that prints events to stdout"
  []
  (->ConsoleBackend))

(defn memory-backend
  "Create a memory backend with circular buffer

   Usage: (memory-backend :max-events 500)"
  [& {:keys [max-events] :or {max-events 1000}}]
  (->MemoryBackend (atom clojure.lang.PersistentQueue/EMPTY)
                   (atom 0)
                   max-events))

(defn file-backend
  "Create a file backend that appends to a log file

   Usage: (file-backend \"logs/events.log\")"
  [file-path]
  (let [writer (java.io.BufferedWriter. 
                (java.io.FileWriter. file-path true))]
    (->FileBackend file-path writer)))

(defn null-backend
  "Create a null backend that discards all events (for testing)"
  []
  (->NullBackend))

;; ============================================================================
;; Backend Management
;; ============================================================================

(defonce ^:private active-backends (atom []))

(defn get-backends
  "Get currently active backends"
  []
  @active-backends)

(defn set-backends!
  "Set active backends (replaces current)

   Usage: (set-backends! [(console-backend) (memory-backend)])"
  [backends]
  ;; Close old backends
  (doseq [backend @active-backends]
    (close-backend! backend))
  ;; Set new backends
  (reset! active-backends backends))

(defn add-backend!
  "Add a backend to active set"
  [backend]
  (swap! active-backends conj backend))

(defn remove-backend!
  "Remove a backend from active set"
  [backend]
  (swap! active-backends #(vec (remove #{backend} %)))
  (close-backend! backend))

(defn clear-backends!
  "Remove all backends"
  []
  (doseq [backend @active-backends]
    (close-backend! backend))
  (reset! active-backends []))

;; ============================================================================
;; Event Emission
;; ============================================================================

(defn- sanitize-obj [obj]
  "Convert non-serializable objects to strings for safe logging"
  (cond
    ;; Java objects that can't be serialized
    (instance? java.lang.Process obj)
    (str "<Process pid=" (.pid obj) ">")
    
    (instance? java.lang.Throwable obj)
    {:type (str (class obj))
     :message (.getMessage obj)
     :cause (some-> obj .getCause sanitize-obj)}
    
    ;; Basic serializable types
    (or (nil? obj) (string? obj) (number? obj) (boolean? obj) (keyword? obj) (symbol? obj))
    obj
    
    ;; Collections - recurse
    (map? obj)
    (into {} (map (fn [[k v]] [(sanitize-obj k) (sanitize-obj v)]) obj))
    
    (coll? obj)
    (mapv sanitize-obj obj)
    
    ;; Default: convert to string
    :else
    (try
      (str obj)
      (catch Exception _
        (str "<" (class obj) ">")))))

(defn emit!
  "Emit event to all active backends

   Usage: (emit! {:event :tool/invoke :tool :file/read})"
  [event-data]
  (let [event (merge (sanitize-obj event-data)
                     {:event/timestamp (str (Instant/now))})]
    (doseq [backend @active-backends]
      (emit-event! backend event))
    event))

(defn flush!
  "Flush all backends"
  []
  (doseq [backend @active-backends]
    (flush-events! backend)))

;; ============================================================================
;; Convenience
;; ============================================================================

(defn with-backends
  "Execute body with temporary backends, restore original after

   Usage: 
     (with-backends [(null-backend)]
       (do-something-that-emits))"
  [temp-backends & body]
  `(let [original# (get-backends)]
     (try
       (set-backends! ~temp-backends)
       ~@body
       (finally
         (set-backends! original#)))))

(comment
  ;; Setup backends
  (set-backends! [(console-backend)
                  (memory-backend :max-events 500)])

  ;; Emit event
  (emit! {:event :test :message "Hello"})

  ;; Check backends
  (get-backends)

  ;; Cleanup
  (clear-backends!))
