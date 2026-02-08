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
  (:import [java.io BufferedReader PrintWriter InputStreamReader]
           [java.lang ProcessBuilder]))

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
         :callbacks {}}))

;; Forward declarations
(declare initialize!)

;; ============================================================================
;; Callback Registration
;; ============================================================================

(defn register-callback!
  "Register a callback function for a specific ECA notification method.

   The callback function will be called with the notification map when a
   notification with matching method is received.

   Usage: (register-callback! \"chat/toolCallApprove\" handle-tool-call)
          (register-callback! \"chat/content-received\" handle-content)"
  [method callback-fn]
  (swap! state update :callbacks assoc method callback-fn)
  nil)

(defn unregister-callback!
  "Remove callback for a method.

   Usage: (unregister-callback! \"chat/toolCallApprove\")"
  [method]
  (swap! state update :callbacks dissoc method)
  nil)

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
  (cond
    (System/getenv "ECA_PATH") (System/getenv "ECA_PATH")
    (fs/exists? "/usr/local/bin/eca") "/usr/local/bin/eca"
    (fs/exists? (str (System/getProperty "user.home") "/.local/bin/eca"))
    (str (System/getProperty "user.home") "/.local/bin/eca")
    :else "eca"))

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
        content-length (count json)]
    (str "Content-Length: " content-length "\r\n\r\n" json)))

(defn- read-response-header [reader]
  "Read Content-Length header from response"
  (loop []
    (let [line (.readLine reader)]
      (if (str/blank? line)
        nil
        (if (str/starts-with? line "Content-Length:")
          (let [len-str (str/trim (subs line 15))]
            (Integer/parseInt len-str))
          (recur))))))

(defn- read-jsonrpc-response [reader]
  "Read and parse a JSON-RPC response"
  (let [content-length (read-response-header reader)]
    (when content-length
      (let [chars (char-array content-length)
            _ (.read reader chars 0 content-length)
            json (str chars)]
        (json/parse-string json true)))))

;; ============================================================================
;; Request/Response Handling
;; ============================================================================

(defn- send-request! [method params]
  "Send a JSON-RPC request and wait for response"
  (let [{:keys [stdin running request-id pending-requests]} @state
        new-state (swap! state update :request-id inc)
        id (:request-id new-state)
        message (make-jsonrpc-message method params id)
        response-promise (promise)]

    (swap! state assoc-in [:pending-requests id] response-promise)

    (.println stdin (serialize-message message))
    (.flush stdin)

    (telemetry/emit! {:event :eca/send-request
                      :method method
                      :id id})

    response-promise))

(defn- handle-notification! [notification]
  "Handle incoming notification from ECA"
  (let [method (:method notification)
        params (:params notification)]

    (telemetry/emit! {:event :eca/notification
                      :method method})

    ;; Call registered callback if any
    (when-let [callback (get-in @state [:callbacks method])]
      (try
        (callback notification)
        (catch Exception e
          (telemetry/emit! {:event :eca/callback-error
                            :method method
                            :error (.getMessage e)}))))

    (case method
      "chat/content-received"
      (telemetry/emit! {:event :eca/content-received
                        :role (:role params)})

      "chat/toolCallApprove"
      (telemetry/emit! {:event :eca/tool-call-approve
                        :tool (get-in params [:tool :name])
                        :params (get-in params [:tool :arguments])})

      "chat/toolCallReject"
      (telemetry/emit! {:event :eca/tool-call-reject
                        :tool (get-in params [:tool :name])})

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
  (let [{:keys [stdout running]} @state]
    (future
      (loop []
        (when @running
          (let [response (try
                           (read-jsonrpc-response stdout)
                           (catch Exception e
                             (telemetry/emit! {:event :eca/read-error
                                               :error (.getMessage e)})
                             nil))]
            (when response
              (if (:id response)
                (handle-response! response)
                (handle-notification! response))))
          (Thread/sleep 100)
          (recur))))))

;; ============================================================================
;; ECA Lifecycle
;; ============================================================================

(defn start!
  "Start ECA process and initialize connection

   Usage: (start!)
          (start! {:eca-path \"/path/to/eca\"})"
  ([] (start! {}))
  ([{:keys [eca-path] :or {eca-path (get-eca-path)}}]
   (println "◈ Starting ECA client...")
   (println "  ECA path:" eca-path)

   (when-not (fs/exists? eca-path)
     (println "⚠️  ECA not found at:" eca-path)
     (println "   Download from: https://github.com/editor-code-assistant/eca/releases")
     (throw (ex-info "ECA binary not found" {:path eca-path})))

   (try
      (let [proc (.start (ProcessBuilder. [eca-path "server"]))
           stdin-writer (PrintWriter. (.getOutputStream proc) true)
           stdout-reader (BufferedReader. (InputStreamReader. (.getInputStream proc)))]

       (reset! state {:eca-process proc
                      :stdin stdin-writer
                      :stdout stdout-reader
                      :running true
                      :request-id 0
                      :pending-requests {}
                      :eca-path eca-path})

       (println "✓ ECA process started")

       ;; Start reading responses
       (read-loop!)

       ;; Initialize handshake
       (initialize! {})

       {:status :running
        :eca-path eca-path})

     (catch Exception e
       (telemetry/emit! {:event :eca/start-error
                         :error (.getMessage e)})
       (println "✗ Failed to start ECA:" (.getMessage e))
       (throw e)))))

(defn- initialize!
  "Send initialize handshake to ECA"
  [{}]
  (let [;; Get process ID - use a stable identifier
        process-id (long (hash (str (System/getProperty "user.name") (System/currentTimeMillis))))
        params {:process-id process-id
                :client-info {:name "ouroboros"
                              :version "0.1.0"}
                :capabilities {}
                :workspace-folders [{:uri (str "file://" (System/getProperty "user.dir"))
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
                (telemetry/emit! {:event :eca/initialized}))))

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
    (when @running
      (swap! state assoc :running false)

      (when eca-process
        (.destroy eca-process)
        (println "✓ ECA process stopped")))))

(defn status
  "Get ECA client status

   Usage: (status)"
  []
  {:running (:running @state)
   :eca-path (:eca-path @state)
   :pending-requests (count (:pending-requests @state))})

;; ============================================================================
;; Chat Operations
;; ============================================================================

(defn chat-prompt
  "Send a chat message to ECA and get response

   Usage: (chat-prompt \"Hello, help me write a function!\")"
  [message]
  (telemetry/emit! {:event :eca/chat-prompt
                    :message-length (count message)})

  (let [params {:chat-id "default"
                :prompt message
                :behavior "default"}
        response-promise (send-request! "chat/prompt" params)]

    (telemetry/emit! {:event :eca/chat-prompt-sent})

    (try
      (let [response (deref response-promise 60000 nil)]
        (if response
          (do
            (telemetry/emit! {:event :eca/chat-response})
            {:status :success
             :response response})
          (do
            (telemetry/emit! {:event :eca/chat-timeout})
            {:status :error
             :error :timeout
             :message "Chat response timeout"})))

      (catch Exception e
        (telemetry/emit! {:event :eca/chat-error
                          :error (.getMessage e)})
        {:status :error
         :error (.getMessage e)}))))

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
  {::pco/output [:eca/running :eca/eca-path :eca/pending-requests]}
  (let [s (status)]
    {:eca/running (:running s)
     :eca/eca-path (:eca-path s)
     :eca/pending-requests (:pending-requests s)}))

(pco/defmutation eca-start! [{:keys [eca-path]}]
  {::pco/output [:status :eca-path]}
  (let [result (start! {:eca-path eca-path})]
    {:status (:status result)
     :eca-path (:eca-path result)}))

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
