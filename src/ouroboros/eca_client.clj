(ns ouroboros.eca-client
  "ECA Client - JSON-RPC communication with Editor Code Assistant

   Ouroboros acts as an ECA \"editor client\", communicating with ECA binary
   via JSON-RPC 2.0 over stdin/stdout.

   Architecture:
   ```
   Chat Platform (Telegram/Discord/Slack)
           │
           ▼
   Ouroboros Chat → ECA Client → ECA Binary
           │                       │
           │ JSON-RPC              │ LLM + Tools
           ▼                       ▼
   Tool Approval ←─────────────── Tool Calls
   ```

   ECA Protocol Methods:
   - initialize     → Handshake
   - chat/prompt    → Send message
   - chat/queryContext → Get context
   - chat/queryFiles → Search files
   - chat/queryCommands → Available commands

   ECA → Ouroboros (callbacks):
   - chat/content-received  → Response
   - chat/toolCallApprove   → Approval request
   - chat/toolCallReject    → Rejection

   Usage:
   (require '[ouroboros.eca-client :as eca])
   (eca/start!)
   (eca/chat-prompt \"Hello!\")
   (eca/stop!)"
  (:require
    [cheshire.core :as json]
    [clojure.string :as str]
    [ouroboros.fs :as fs]
    [ouroboros.telemetry :as telemetry]
    [ouroboros.resolver-registry :as registry])
    (:import [java.io BufferedReader InputStreamReader BufferedInputStream]
             [java.lang ProcessBuilder]
             [java.util.concurrent TimeUnit]))

;; ============================================================================
;; State
;; ============================================================================

(defonce ^:private state
  (atom {:eca-process nil
         :stdin nil
         :stdout nil
         :running false
         :request-id 0
         :pending-requests {}
         :callbacks {}
         :chat-contents []}))

;; Forward declarations
(declare initialize!)

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

(defn- sanitize-for-json [obj]
  "Convert non-JSON-serializable objects to strings"
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
  "Read a line from a BufferedInputStream, terminated by \\r\\n.
   Returns the line as a String (without \\r\\n), or nil on EOF."
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

(defn- read-response-header [^BufferedInputStream stream]
  "Read Content-Length header from response (byte-level).
   Returns the content-length as an integer, or nil on EOF."
  (loop [found-content-length nil]
    (let [line (read-line-bytes stream)]
      (cond
        (nil? line)
        found-content-length

        (str/blank? line)
        (if found-content-length
          found-content-length
          (recur nil))

        (str/starts-with? line "Content-Length:")
        (let [len-str (str/trim (subs line 15))]
          (recur (Integer/parseInt len-str)))

        :else
        (recur found-content-length)))))

(defn- read-jsonrpc-response [^BufferedInputStream stream]
  "Read and parse a JSON-RPC response (byte-level).
   Content-Length specifies bytes, so we read exactly that many bytes."
  (let [content-length (read-response-header stream)]
    (when content-length
      (let [buf (byte-array content-length)]
        (loop [offset 0]
          (when (< offset content-length)
            (let [read-count (.read stream buf offset (- content-length offset))]
              (cond
                (neg? read-count)
                (telemetry/emit! {:event :eca/read-eof
                                  :expected (- content-length offset)})

                (pos? read-count)
                (recur (+ offset read-count))))))
        (let [json (String. buf "UTF-8")]
          (try
            (json/parse-string json true)
            (catch Exception e
              (telemetry/emit! {:event :eca/json-parse-error
                                :error (.getMessage e)
                                :content-preview (subs json 0 (min 100 (count json)))
                                :content-length content-length
                                :actual-length (count json)})
              nil)))))))

;; ============================================================================
;; Request/Response Handling
;; ============================================================================

(defn- send-request! [method params]
  "Send a JSON-RPC request and return a response promise.
   Returns a promise that will be resolved with the response, or
   an already-delivered error promise if sending fails."
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

(defn- send-notification! [method params]
  "Send a JSON-RPC notification (no response expected)"
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

(defn- handle-notification! [notification]
  "Handle incoming notification from ECA"
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

      "chat/toolCallRun"
      (telemetry/emit! {:event :eca/tool-call-run
                        :tool (:name params)
                        :params (:arguments params)})

      "chat/toolCalled"
      (telemetry/emit! {:event :eca/tool-called
                        :tool (:name params)
                        :outputs (:outputs params)})

      "config/updated"
      (telemetry/emit! {:event :eca/config-updated
                        :config params})

      ;; Unknown notification
      (telemetry/emit! {:event :eca/unknown-notification
                        :method method
                        :params params}))))

(defn- handle-response! [response]
  "Handle incoming JSON-RPC response"
  (let [id (:id response)
        pending (get @state :pending-requests)]
    (when-let [promise (get pending id)]
      (deliver promise response)
      (swap! state update :pending-requests dissoc id))

    (telemetry/emit! {:event :eca/response
                      :id id
                      :has-error? (some? (:error response))})))

(defn- read-loop! []
  "Background thread to read responses from ECA"
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
;; ECA Lifecycle
;; ============================================================================

(defn start!
   "Start ECA process and initialize connection

    Usage: (start!)
           (start! {:eca-path \"/path/to/eca\"})
           (start! {:eca-path \"/path/to/eca\" :debug? true})"
  ([] (start! {}))
  ([{:keys [eca-path debug?] :or {eca-path (get-eca-path)}}]
   (println "◈ Starting ECA client...")
   (println "  ECA path:" eca-path)
   (when debug?
     (println "  Debug mode: enabled"))

   (when-not (fs/exists? eca-path)
     (println "⚠️  ECA not found at:" eca-path)
     (println "   Download from: https://github.com/editor-code-assistant/eca/releases")
     (throw (ex-info "ECA binary not found" {:path eca-path})))

     (try
        (let [cmd (cond-> [eca-path "server"]
                    debug? (conj "--log-level" "debug"))
              proc (.start (ProcessBuilder. cmd))
              stdin-raw (.getOutputStream proc)
              stdout-stream (BufferedInputStream. (.getInputStream proc))
              stderr-reader (BufferedReader. (InputStreamReader. (.getErrorStream proc)))]

        ;; Start thread to drain stderr (prevents ECA from blocking)
        (future
          (loop []
            (when-let [line (.readLine stderr-reader)]
              (telemetry/emit! {:event :eca/stderr :line line})
              (recur))))

        ;; Monitor process health
        (future
          (loop []
            (Thread/sleep 1000)
            (when (:running @state)
              (when-not (.isAlive proc)
                (println "⚠️  ECA process has exited!")
                (telemetry/emit! {:event :eca/process-exit
                                  :exit-code (try (.exitValue proc) (catch Exception _ nil))})
                (swap! state assoc :running false))
              (recur))))

        (reset! state {:eca-process proc
                        :stdin stdin-raw
                        :stdout stdout-stream
                        :stderr stderr-reader
                        :running true
                        :request-id 0
                        :pending-requests {}
                        :callbacks (:callbacks @state)
                        :chat-contents []
                        :eca-path eca-path
                        :debug? (boolean debug?)})

       (println "✓ ECA process started")

       ;; Start reading responses
       (read-loop!)

       ;; Initialize handshake
       (initialize! {})

       {:status :running
        :eca-path eca-path
        :debug? (boolean debug?)})

     (catch Exception e
       (telemetry/emit! {:event :eca/start-error
                         :error (.getMessage e)})
       (println "✗ Failed to start ECA:" (.getMessage e))
       (throw e)))))

(defn- initialize!
  "Send initialize handshake to ECA"
  [{}]
  (let [;; Get actual process ID for ECA liveness probe
        process-id (try
                     (.pid (java.lang.ProcessHandle/current))
                     (catch Exception _
                       ;; Fallback to hash if ProcessHandle not available (Java 8)
                       (long (hash (str (System/getProperty "user.name") (System/currentTimeMillis))))))
         params {:processId process-id
                 :clientInfo {:name "ouroboros"
                              :version "0.1.0"}
                 :capabilities {}
                 :workspaceFolders [{:uri (str "file://" (System/getProperty "user.dir"))
                                     :name "ouroboros"}]}
        response-promise (send-request! "initialize" params)
        timeout-ms 30000
        start-time (System/currentTimeMillis)]

    (telemetry/emit! {:event :eca/initialize})

    (try
      ;; Wait for response with timeout using polling loop
      (loop []
        (cond
          ;; Response received
          (realized? response-promise)
          (let [response @response-promise]
            (if (:error response)
              (do
                (telemetry/emit! {:event :eca/initialize-error
                                  :error (:error response)})
                (println "✗ ECA initialize error:" (:error response)))
              (do
                (println "✓ ECA initialized")
                (telemetry/emit! {:event :eca/initialized})
                ;; Send initialized notification to complete handshake
                (send-notification! "initialized" {}))))

          ;; Timeout reached
          (> (- (System/currentTimeMillis) start-time) timeout-ms)
          (do
            (telemetry/emit! {:event :eca/initialize-timeout})
            (println "⚠️  ECA initialize timeout"))

          ;; Keep waiting
          :else
          (do
            (Thread/sleep 100)
            (recur))))

      (catch Exception e
        (telemetry/emit! {:event :eca/initialize-exception
                          :error (.getMessage e)})
        (println "✗ ECA initialize exception:" (.getMessage e))))))

(defn stop!
  "Stop ECA process

   Usage: (stop!)"
  []
  (telemetry/emit! {:event :eca/stop})
  (let [{:keys [eca-process running]} @state]
    (when running
      (swap! state assoc :running false)

      (when eca-process
        (.destroy eca-process)
        ;; Wait briefly for clean shutdown
        (try (.waitFor eca-process 2 TimeUnit/SECONDS)
             (catch Exception _ nil))
        (when (.isAlive eca-process)
          (.destroyForcibly eca-process))
        (println "✓ ECA process stopped"))))
   (swap! state assoc :debug? false))

(defn status
  "Get ECA client status

   Usage: (status)"
  []
  {:running (:running @state)
   :eca-path (:eca-path @state)
   :pending-requests (count (:pending-requests @state))
   :debug? (:debug? @state)})

(defn alive?
  "Check if ECA process is truly alive (not just :running flag).
   Validates the underlying OS process is still running.

   Usage: (alive?) ;; => true/false"
  []
  (and (:running @state)
       (when-let [proc (:eca-process @state)]
         (.isAlive proc))))

(defn restart!
  "Stop and restart ECA process. Returns start! result or throws.

   Usage: (restart!)"
  []
  (telemetry/emit! {:event :eca/restart})
  (println "↺ Restarting ECA...")
  (try (stop!) (catch Exception _ nil))
  ;; Brief pause to let OS reclaim resources
  (Thread/sleep 500)
  (start! {}))

(defn ensure-alive!
  "Ensure ECA is running. If dead, attempt auto-restart.
   Returns true if ECA is alive after this call, false otherwise.

   Usage: (ensure-alive!) ;; => true/false"
  []
  (if (alive?)
    true
    (do
      (telemetry/emit! {:event :eca/ensure-alive-restart})
      (try
        (restart!)
        (alive?)
        (catch Exception e
          (telemetry/emit! {:event :eca/ensure-alive-failed
                            :error (.getMessage e)})
          false)))))

;; ============================================================================
;; Chat Operations
;; ============================================================================

(defn- chat-prompt-once
  "Internal: Send a single chat-prompt attempt. Returns result map.
   Does NOT retry -- that's handled by chat-prompt."
  [message {:keys [wait? timeout-ms chat-id]
            :or {wait? false timeout-ms 120000 chat-id "default"}}]
  (let [params {:chatId chat-id
                :message message}
        response-promise (send-request! "chat/prompt" params)
        ;; For wait mode: track content received via callback
        content-promise (when wait? (promise))
        collected-content (when wait? (atom []))]

    (telemetry/emit! {:event :eca/chat-prompt-sent})

     ;; Register callback to collect assistant responses when waiting
     (when wait?
       (register-callback! "chat/contentReceived" :chat-prompt-wait
         (fn [notification]
           (let [params (:params notification)
                 role (:role params)
                 content (:content params)]
             (when (and content (= chat-id (:chatId params)))
               (swap! collected-content conj params)
               ;; Resolve when we get a "done" progress or assistant text content
               (when (or (and (= role "assistant")
                              (= "text" (:type content)))
                         (and (= "progress" (:type content))
                              (#{"done" "finished"} (:state content))))
                 (deliver content-promise @collected-content)))))))

     (try
      ;; Wait for the initial RPC acknowledgment (10s - fast fail for better UX)
      (let [ack-response (deref response-promise 10000 nil)]
         (if-not ack-response
           (do
             (when wait? (unregister-callback! "chat/contentReceived" :chat-prompt-wait))
             (telemetry/emit! {:event :eca/chat-timeout})
            {:status :error
             :error :timeout
             :message "Chat acknowledgment timeout"})

          (if-not wait?
            ;; Fast mode: return immediately after ack
            (do
              (telemetry/emit! {:event :eca/chat-response})
              {:status :success
               :response ack-response})

            ;; Wait mode: wait for full assistant response
             (let [contents (deref content-promise timeout-ms nil)]
               (unregister-callback! "chat/contentReceived" :chat-prompt-wait)
              (if contents
                (let [assistant-texts (->> contents
                                           (filter #(= "assistant" (:role %)))
                                           (filter #(= "text" (get-in % [:content :type])))
                                           (map #(get-in % [:content :text])))]
                  (telemetry/emit! {:event :eca/chat-response
                                    :content-count (count contents)})
                  {:status :success
                   :response ack-response
                   :content (str/join "\n" assistant-texts)
                   :notifications contents})
                (do
                  (telemetry/emit! {:event :eca/chat-content-timeout})
                  {:status :error
                   :error :content-timeout
                   :response ack-response
                   :partial-content @collected-content
                   :message "Timed out waiting for assistant response"}))))))

       (catch Exception e
         (when wait? (unregister-callback! "chat/contentReceived" :chat-prompt-wait))
        (telemetry/emit! {:event :eca/chat-error
                          :error (.getMessage e)})
        {:status :error
         :error (.getMessage e)}))))

(defn chat-prompt
  "Send a chat message to ECA and get response.

   By default, returns immediately after ECA acknowledges the prompt.
   Set :wait? true to wait for the full assistant response (via notifications).

   On timeout or write failure, automatically restarts ECA and retries once.

   Usage: (chat-prompt \"Hello!\")
          (chat-prompt \"Hello!\" {:wait? true :timeout-ms 120000})"
  ([message] (chat-prompt message {}))
  ([message opts]
   (telemetry/emit! {:event :eca/chat-prompt
                     :message-length (count message)})

   (let [result (try
                  (chat-prompt-once message opts)
                  (catch Exception e
                    {:status :error
                     :error (str "send-failed:" (.getMessage e))
                     :exception e}))]

     ;; If timeout or send failure, try restart + retry once
     (if (and (= :error (:status result))
              (or (= :timeout (:error result))
                  (and (string? (:error result))
                       (str/starts-with? (str (:error result)) "send-failed:"))))
       (do
         (telemetry/emit! {:event :eca/chat-retry-after-failure
                           :original-error (:error result)})
         (println "⚠️  ECA chat failed, attempting restart + retry...")
         (try
           (restart!)
           ;; Brief pause for ECA to initialize
           (Thread/sleep 1000)
           (if (alive?)
             (let [retry-result (try
                                  (chat-prompt-once message opts)
                                  (catch Exception e
                                    {:status :error
                                     :error (.getMessage e)
                                     :message "ECA retry failed after restart"}))]
               (telemetry/emit! {:event :eca/chat-retry-result
                                 :status (:status retry-result)})
               retry-result)
             {:status :error
              :error :restart-failed
              :message "ECA could not be restarted. Check that the ECA binary is installed."})
           (catch Exception e
             (telemetry/emit! {:event :eca/chat-restart-failed
                               :error (.getMessage e)})
             {:status :error
              :error :restart-failed
              :message (str "ECA restart failed: " (.getMessage e))})))
       ;; Success or non-retryable error
       result))))

(defn query-context
  "Query context from ECA (repoMap, files, etc.)

   Usage: (query-context)"
  []
  (let [params {:chat-id "default"}
        response-promise (send-request! "chat/queryContext" params)]

    (telemetry/emit! {:event :eca/query-context})

    (try
      (let [response (deref response-promise 30000 nil)]
        (if response
          {:status :success :context response}
          {:status :error :error :timeout}))

      (catch Exception e
        {:status :error :error (.getMessage e)}))))

(defn query-files
  "Search files in ECA workspace

   Usage: (query-files \"*.clj\")"
  [pattern]
  (let [params {:chat-id "default"
                :pattern pattern}
        response-promise (send-request! "chat/queryFiles" params)]

    (telemetry/emit! {:event :eca/query-files :pattern pattern})

    (try
      (let [response (deref response-promise 30000 nil)]
        (if response
          {:status :success :files response}
          {:status :error :error :timeout}))

      (catch Exception e
        {:status :error :error (.getMessage e)}))))

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
;; Tool Approval (for chat platforms)
;; ============================================================================

(defn approve-tool!
  "Approve a tool call from ECA

   Usage: (approve-tool! {:tool \"file/read\" :params {...}})"
  [{:keys [tool params]}]
  (let [params {:chat-id "default"
                :tool {:name tool :arguments params}}]
    (send-request! "chat/toolCallApprove" params)
    (telemetry/emit! {:event :eca/tool-approved :tool tool})
    {:status :approved :tool tool}))

(defn reject-tool!
  "Reject a tool call from ECA

   Usage: (reject-tool! {:tool \"shell/exec\" :reason \"Dangerous tool\"})"
  [{:keys [tool reason]}]
  (let [params {:chat-id "default"
                :tool {:name tool}
                :reason reason}]
    (send-request! "chat/toolCallReject" params)
    (telemetry/emit! {:event :eca/tool-rejected :tool tool :reason reason})
    {:status :rejected :tool tool :reason reason}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

(pco/defresolver eca-status [_]
  {::pco/output [:eca/running :eca/eca-path :eca/pending-requests :eca/debug?]}
  (let [s (status)]
    {:eca/running (:running s)
     :eca/eca-path (:eca-path s)
     :eca/pending-requests (:pending-requests s)
     :eca/debug? (:debug? s)}))

(pco/defmutation eca-start! [{:keys [eca-path debug?]}]
  {::pco/output [:status :eca-path :debug?]}
  (let [result (start! {:eca-path eca-path :debug? debug?})]
    {:status (:status result)
     :eca-path (:eca-path result)
     :debug? (:debug? result)}))

(pco/defmutation eca-stop! [_]
  {::pco/output [:status]}
  (stop!)
  {:status :stopped})

(pco/defmutation eca-chat! [{:keys [message]}]
  {::pco/output [:status :response :error]}
  (let [result (chat-prompt message)]
    (merge {:status (:status result)}
           (when (:response result) {:response (:response result)})
           (when (:error result) {:error (:error result)}))))

(pco/defmutation eca-approve! [{:keys [tool params]}]
  {::pco/output [:status :tool]}
  (approve-tool! {:tool tool :params params}))

(pco/defmutation eca-reject! [{:keys [tool reason]}]
  {::pco/output [:status :tool :reason]}
  (reject-tool! {:tool tool :reason reason}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers [eca-status])
(def mutations [eca-start! eca-stop! eca-chat! eca-approve! eca-reject!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Start ECA
  (start!)

  ;; Check status
  (status)

  ;; Chat
  (chat-prompt "What files are in the project?")

  ;; Query context
  (query-context)

  ;; Query files
  (query-files "*.clj")

  ;; Approve tool
  (approve-tool! {:tool "file/read" :params {:path "README.md"}})

  ;; Stop
  (stop!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:eca/running])
  (q/m 'eca/start! {:eca-path "eca"})
  (q/m 'eca/chat! {:message "Hello!"}))
