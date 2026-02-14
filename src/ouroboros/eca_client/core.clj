(ns ouroboros.eca-client.core
  "ECA Client Core - JSON-RPC protocol and state management

   Low-level communication layer with ECA binary.
   Handles message serialization, request/response correlation,
   and callback registration for notifications.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.eca-client"
  (:require
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.fs :as fs]
   [ouroboros.telemetry :as telemetry])
  (:import [java.io BufferedInputStream]))

;; ============================================================================
;; State
;; ============================================================================

(defonce state
  (atom {:eca-process nil
         :stdin nil
         :stdout nil
         :running false
         :request-id 0
         :pending-requests {}
         :callbacks {}
         :chat-contents []}))

;; Forward declarations
(declare read-loop!)

;; ============================================================================
;; Callback Registration
;; ============================================================================

(defn register-callback!
  "Register a callback function for a specific ECA notification method.

   Supports multiple listeners per method. Returns a listener-id that can
   be used to unregister this specific callback.

   The callback function will be called with the notification map when a
   notification with matching method is received.

   Usage: (register-callback! \"chat/contentReceived\" handle-content)
          ;; => \"chat/contentReceived-1738972800000-abc123\"
          (register-callback! \"chat/contentReceived\" :my-listener handle-content)
          ;; => :my-listener"
  ([method callback-fn]
   (let [listener-id (str method "-" (System/currentTimeMillis) "-" (subs (str (java.util.UUID/randomUUID)) 0 6))]
     (register-callback! method listener-id callback-fn)))
  ([method listener-id callback-fn]
   (swap! state update-in [:callbacks method] (fnil assoc {}) listener-id callback-fn)
   listener-id))

(defn unregister-callback!
  "Remove a specific callback by method and listener-id, or all callbacks for a method.

   Usage: (unregister-callback! \"chat/contentReceived\" :my-listener)
          (unregister-callback! \"chat/contentReceived\")  ;; removes all"
  ([method]
   (swap! state update :callbacks dissoc method)
   nil)
  ([method listener-id]
   (swap! state update-in [:callbacks method] dissoc listener-id)
   ;; Clean up empty maps
   (when (empty? (get-in @state [:callbacks method]))
     (swap! state update :callbacks dissoc method))
   nil))

(defn clear-callbacks!
  "Remove all callbacks.

   Usage: (clear-callbacks!)"
  []
  (swap! state assoc :callbacks {})
  nil)

;; ============================================================================
;; Configuration
;; ============================================================================

(def ^:private default-eca-path
  "Default ECA binary location"
  (let [home (System/getProperty "user.home")]
    (cond
      (System/getenv "ECA_PATH") (System/getenv "ECA_PATH")
      (fs/exists? "/usr/local/bin/eca") "/usr/local/bin/eca"
      (fs/exists? (str home "/.local/bin/eca"))
      (str home "/.local/bin/eca")
      (fs/exists? (str home "/bin/eca"))
      (str home "/bin/eca")
      :else "eca")))

(defn- get-eca-path []
  (or (System/getenv "ECA_PATH")
      default-eca-path))

;; ============================================================================
;; JSON-RPC Protocol
;; ============================================================================

(defn- make-jsonrpc-message [method params id]
  {:jsonrpc "2.0"
   :method method
   :params params
   :id id})

(defn- sanitize-for-json
  "Convert non-JSON-serializable objects to strings"
  [obj]
  (cond
    ;; Java objects that can't be JSON serialized
    (instance? java.lang.Process obj)
    (str "<Process pid=" (.pid obj) ">")

    (instance? java.lang.Throwable obj)
    {:type (str (class obj))
     :message (.getMessage obj)}

    ;; Basic JSON types
    (or (nil? obj) (string? obj) (number? obj) (boolean? obj) (keyword? obj))
    obj

    ;; Collections - recurse
    (map? obj)
    (into {} (map (fn [[k v]] [(sanitize-for-json k) (sanitize-for-json v)]) obj))

    (sequential? obj)
    (mapv sanitize-for-json obj)

    (set? obj)
    (mapv sanitize-for-json (seq obj))

    ;; Default: convert to string
    :else
    (try
      (str obj)
      (catch Exception _
        (str "<" (class obj) ">")))))

(defn- serialize-message [message]
  (let [safe-message (sanitize-for-json message)
        json (json/generate-string safe-message)
        json-bytes (.getBytes json "UTF-8")
        content-length (alength json-bytes)]
    (str "Content-Length: " content-length "\r\n\r\n" json)))

(defn- read-line-bytes
  "Read a line from a BufferedInputStream, terminated by \r\n.
   Returns the line as a String (without \r\n), or nil on EOF."
  [^BufferedInputStream stream]
  (let [baos (java.io.ByteArrayOutputStream. 256)]
    (loop [prev-byte -1]
      (let [b (.read stream)]
        (cond
          ;; EOF
          (neg? b) (if (pos? (.size baos))
                     (.toString baos "UTF-8")
                     nil)
          ;; \r\n sequence - line complete
          (and (= b 10) (= prev-byte 13))
          (let [arr (.toByteArray baos)
                len (alength arr)]
            ;; Remove trailing \r (we already appended it)
            (String. arr 0 (max 0 (dec len)) "UTF-8"))
          ;; Accumulate
          :else
          (do (.write baos b)
              (recur b)))))))

(defn- read-response-header
  "Read Content-Length header from stream. Returns content-length or nil on error."
  [^BufferedInputStream stream]
  (try
    (when-let [line (read-line-bytes stream)]
      (when (str/starts-with? line "Content-Length: ")
        (let [len-str (subs line (count "Content-Length: "))
              len (parse-long len-str)
              ;; Consume the \r\n after header
              cr (.read stream)
              lf (.read stream)]
          (when (and (= cr 13) (= lf 10))
            len))))
    (catch Exception e
      (telemetry/emit! {:event :eca/header-read-error
                        :error (.getMessage e)})
      nil)))

(defn- read-jsonrpc-response
  "Read a complete JSON-RPC response from stream.
   Returns parsed map or throws on parse error."
  [^BufferedInputStream stream]
  (when-let [content-length (read-response-header stream)]
    (let [buffer (byte-array content-length)
          bytes-read (.read stream buffer 0 content-length)]
      (when (= bytes-read content-length)
        (let [json-str (String. buffer "UTF-8")
              parsed (json/parse-string json-str true)]
          parsed)))))

;; ============================================================================
;; Request/Response Handling
;; ============================================================================

(defn send-request!
  "Send a JSON-RPC request and return a response promise.
   Returns a promise that will be resolved with the response, or
   an already-delivered error promise if sending fails."
  [method params]
  (let [{:keys [stdin running]} @state]
    ;; Pre-flight check: is ECA actually alive?
    (when-not running
      (let [p (promise)]
        (deliver p {:error {:code -1 :message "ECA not running"}})
        (telemetry/emit! {:event :eca/send-request-rejected
                          :method method
                          :reason "not running"})
        (throw (ex-info "ECA not running" {:method method}))))

    ;; Validate process is alive
    (when-let [proc (:eca-process @state)]
      (when-not (.isAlive proc)
        (swap! state assoc :running false)
        (telemetry/emit! {:event :eca/send-request-rejected
                          :method method
                          :reason "process dead"})
        (throw (ex-info "ECA process is dead" {:method method}))))

    (let [new-state (swap! state update :request-id inc)
          id (:request-id new-state)
          message (make-jsonrpc-message method params id)
          response-promise (promise)]

      (swap! state assoc-in [:pending-requests id] response-promise)

      (try
        (let [serialized (serialize-message message)
              bytes (.getBytes serialized "UTF-8")]
          (.write stdin bytes)
          (.flush stdin))
        (catch Exception e
          ;; Write failed - ECA stdin is broken
          (swap! state update :pending-requests dissoc id)
          (swap! state assoc :running false)
          (telemetry/emit! {:event :eca/send-write-error
                            :method method
                            :id id
                            :error (.getMessage e)})
          (throw (ex-info (str "ECA write failed: " (.getMessage e))
                          {:method method :id id}
                          e))))

      (telemetry/emit! {:event :eca/send-request
                        :method method
                        :id id
                        :debug? (:debug? @state)
                        :payload (when (:debug? @state)
                                   (assoc message :params params))})

      response-promise)))

(defn send-notification!
  "Send a JSON-RPC notification (no response expected)"
  [method params]
  (let [{:keys [stdin running]} @state]
    (when-not running
      (throw (ex-info "ECA not running" {:method method})))

    (let [message {:jsonrpc "2.0"
                   :method method
                   :params params}]
      (try
        (let [msg (serialize-message message)
              bytes (.getBytes msg "UTF-8")]
          (.write stdin bytes)
          (.flush stdin))
        (catch Exception e
          (swap! state assoc :running false)
          (telemetry/emit! {:event :eca/notification-write-error
                            :method method
                            :error (.getMessage e)})
          (throw (ex-info (str "ECA write failed: " (.getMessage e))
                          {:method method} e))))

      (telemetry/emit! {:event :eca/send-notification
                        :method method
                        :debug? (:debug? @state)
                        :payload (when (:debug? @state)
                                   (assoc message :params params))}))))

(defn- handle-notification!
  "Handle incoming notification from ECA"
  [notification]
  (let [method (:method notification)
        params (:params notification)]

    (telemetry/emit! {:event :eca/notification
                      :method method})

    ;; Call all registered callbacks for this method
    (when-let [listeners (get-in @state [:callbacks method])]
      (doseq [[listener-id callback] listeners]
        (try
          (callback notification)
          (catch Exception e
            (telemetry/emit! {:event :eca/callback-error
                              :method method
                              :listener-id listener-id
                              :error (.getMessage e)})))))

    (case method
      "chat/contentReceived"
      (do
        (telemetry/emit! {:event :eca/content-received
                          :role (:role params)
                          :content (:content params)})
        ;; Store chat content in state for retrieval
        (swap! state update :chat-contents conj params))

      ;; Dual logging: ECA-specific events for debugging, and standard :tool/invoke
      ;; for telemetry dashboards and counts (see telemetry.cljs filters)
      "chat/toolCallRun"
      (let [tool-name (:name params)
            tool-kw (keyword tool-name)
            args (:arguments params)]
        (telemetry/emit! {:event :eca/tool-call-run
                          :tool tool-name
                          :params args})
        (telemetry/emit! {:event :tool/invoke
                          :tool tool-kw
                          :params-keys (keys (or args {}))}))

      "chat/toolCalled"
      (let [tool-name (:name params)
            tool-kw (keyword tool-name)
            outputs (:outputs params)]
        (telemetry/emit! {:event :eca/tool-called
                          :tool tool-name
                          :outputs outputs})
        (telemetry/emit! {:event :tool/complete
                          :tool tool-kw
                          :success? true
                          :has-result? (some? outputs)}))

      "config/updated"
      (telemetry/emit! {:event :eca/config-updated
                        :config params})

      ;; Unknown notification
      (telemetry/emit! {:event :eca/unknown-notification
                        :method method
                        :params params}))))

(defn- handle-response!
  "Handle incoming JSON-RPC response"
  [response]
  (let [id (:id response)
        pending (get @state :pending-requests)]
    (when-let [promise (get pending id)]
      (deliver promise response)
      (swap! state update :pending-requests dissoc id))

    (telemetry/emit! {:event :eca/response
                      :id id
                      :has-error? (some? (:error response))})))

(defn read-loop!
  "Background thread to read responses from ECA"
  []
  (future
    (loop []
      (let [{:keys [stdout running]} @state]
        (when running
          (let [response (try
                           (read-jsonrpc-response stdout)
                           (catch Exception e
                             (when (:running @state)
                               (telemetry/emit! {:event :eca/read-error
                                                 :error (.getMessage e)}))
                             nil))]
            (if response
              (do
                (if (:id response)
                  (handle-response! response)
                  (handle-notification! response))
                ;; No sleep needed - read-jsonrpc-response blocks on IO
                (recur))
              ;; nil response means EOF or parse error - ECA likely exited
              (when (:running @state)
                (telemetry/emit! {:event :eca/read-loop-eof})
                (swap! state assoc :running false)))))))))

;; ============================================================================
;; State Accessors
;; ============================================================================

(defn get-eca-path
  "Get the current ECA binary path"
  []
  (or (System/getenv "ECA_PATH") default-eca-path))

(defn get-state
  "Get the current ECA client state (for internal use)"
  []
  state)

(defn swap-state!
  "Update ECA client state (for internal use)"
  [f & args]
  (apply swap! state f args))

(defn reset-state!
  "Reset ECA client state (for internal use)"
  [new-state]
  (reset! state new-state))

(defn add-chat-content!
  "Add chat content to state"
  [content]
  (swap! state update :chat-contents conj content))

(defn get-chat-contents
  "Get all received chat contents from ECA notifications.

   Usage: (get-chat-contents)"
  []
  (get @state :chat-contents []))

(defn clear-chat-contents!
  "Clear stored chat contents.

   Usage: (clear-chat-contents!)"
  []
  (swap! state assoc :chat-contents [])
  nil)

;; ============================================================================
;; Re-exports for other eca-client namespaces
;; ============================================================================

(defn get-default-eca-path
  "Get the default ECA path (used by lifecycle namespace)"
  []
  default-eca-path)