(ns ouroboros.chat
  "Chat - Message routing and conversation management

   Core infrastructure for chat platform integration:
   - ChatAdapter protocol for platform abstraction
   - Message routing to handlers
   - Session management (conversation history)
   - ECA integration for AI responses
   - Tool approval bridge for dangerous operations

   AI functionality is delegated to ECA (Editor Code Assistant).
   See: https://github.com/editor-code-assistant/eca"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory]
   [ouroboros.eca-client :as eca]
   [ouroboros.confirmation :as confirmation]
   [ouroboros.eca_approval_bridge :as eca-approval]
   [ouroboros.resolver-registry :as registry])
  (:import [java.time Instant]))

;; ============================================================================
;; ChatAdapter Protocol
;; ============================================================================

(require '[ouroboros.chat.protocol :as chatp])

(def start! chatp/start!)
(def stop! chatp/stop!)
(def send-message! chatp/send-message!)
(def send-markdown! chatp/send-markdown!)

(def make-message chatp/make-message)

;; ============================================================================
;; Session Management
;; ============================================================================

(defonce ^:private chat-sessions (atom {}))

(defn get-session [chat-id]
  (swap! chat-sessions update chat-id #(or % {:history []
                                              :context {}
                                              :created-at (str (Instant/now))}))
  (get @chat-sessions chat-id))

(defn update-session! [chat-id role content]
  (swap! chat-sessions update-in [chat-id :history] conj
         {:role role :content content :timestamp (str (Instant/now))})
  (when (> (count (get-in @chat-sessions [chat-id :history])) 20)
    (swap! chat-sessions update-in [chat-id :history] (partial take-last 10))))

(defn clear-session! [chat-id]
  (swap! chat-sessions assoc-in [chat-id :history] [])
  {:status :cleared})

;; ============================================================================
;; Tool Filtering for Chat Safety
;; ============================================================================

(def ^:private chat-safe-tools
  #{:system/status
    :system/report
    :git/commits
    :git/status
    :file/read
    :file/search
    :file/list
    :memory/get
    :memory/set
    :http/get
    :query/eql})

(defn chat-safe-tool? [tool-name]
  (contains? chat-safe-tools (keyword tool-name)))

(defn list-chat-tools []
  (filter #(chat-safe-tool? (:tool/name %)) (tool-registry/list-tools)))

;; ============================================================================
;; Message Handler
;; ============================================================================

(defn- extract-command [text]
  (when (str/starts-with? text "/")
    (let [parts (str/split (str/lower-case text) #"\s+" 2)
          cmd (first parts)
          args (second parts)]
      [(keyword (subs cmd 1)) (or args "")])))

(defn- handle-command [adapter chat-id user-name cmd args]
  (telemetry/emit! {:event :chat/command :command cmd :chat-id chat-id})
  (case cmd
    :start (send-message! adapter chat-id
                          "🐍 Ouroboros Assistant ready!\n\nPowered by ECA (Editor Code Assistant)\nhttps://github.com/editor-code-assistant/eca\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve operation\n/deny <id> <reason> - Reject operation")
    :help (send-message! adapter chat-id
                         "*Ouroboros Chat Commands*\n\n/clear - Clear conversation history\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve dangerous operation\n/deny <id> <reason> - Reject operation\n\nJust type naturally to chat with ECA!")
    :clear (do (clear-session! chat-id)
               (send-message! adapter chat-id "✓ Conversation cleared"))
    :status (let [result (tool-registry/call-tool :system/status {})]
              (send-message! adapter chat-id
                             (str "*System Status*\n\n"
                                  (pr-str (:result result)))))
    :tools (let [tools (list-chat-tools)]
             (send-message! adapter chat-id
                            (str "*Available Tools*\n\n"
                                 (str/join "\n" (map :tool/name tools)))))
    :confirm (if-let [[prefix id] (str/split (or args "") #"\s+" 2)]
               (if (= prefix "eca-")
                 ;; Handle ECA approval
                 (let [result (eca-approval/process-chat-confirm! chat-id args user-name)]
                   (case (:status result)
                     :approved (send-message! adapter chat-id
                                              (str "✓ ECA Tool Approved: " (:tool result) "\nSending to ECA..."))
                     :error (send-message! adapter chat-id
                                           (str "⚠️ " (:reason result)))))
                 ;; Handle internal confirmation
                 (let [result (confirmation/approve! chat-id :approved-by user-name)]
                   (case (:status result)
                     :approved (send-message! adapter chat-id
                                              (str "✓ Confirmed: " (:tool result) "\nExecuting..."))
                     :error (send-message! adapter chat-id
                                           (str "⚠️ " (:reason result))))))
               (send-message! adapter chat-id "⚠️ Usage: /confirm <confirmation-id>"))
    :deny (if-let [[confirmation-id & reason-parts] (str/split (or args "") #"\s+" 2)]
            (let [reason (str/join " " reason-parts)]
              (if (= confirmation-id "eca-")
                ;; Handle ECA rejection
                (let [result (eca-approval/process-chat-deny! chat-id args reason user-name)]
                  (case (:status result)
                    :denied (send-message! adapter chat-id "✗ ECA Tool Denied")
                    :error (send-message! adapter chat-id (str "⚠️ " (:reason result)))))
                ;; Handle internal rejection
                (let [result (confirmation/deny! chat-id reason :denied-by user-name)]
                  (case (:status result)
                    :denied (send-message! adapter chat-id "✗ Operation denied")
                    :error (send-message! adapter chat-id (str "⚠️ " (:reason result)))))))
            (send-message! adapter chat-id "⚠️ Usage: /deny <confirmation-id> <reason>"))
    (send-message! adapter chat-id (str "Unknown command: " (name cmd)))))

(defn- handle-natural-message
  "Handle natural language message via ECA

   Flow:
   1. Store user message in session
   2. Send to ECA via chat-prompt
   3. Store and forward ECA response to chat

   Note: Conversation history is maintained by ECA, we just track
   for display purposes in Ouroboros."
  [adapter chat-id user-name text]
  (telemetry/emit! {:event :chat/message :chat-id chat-id :user user-name})

  ;; Store user message
  (update-session! chat-id :user text)

  ;; Check if ECA is running
  (let [eca-status (eca/status)]
    (if-not (:running eca-status)
      (let [error-msg (str "⚠️  ECA is not running.\n\n"
                           "Please start ECA first:\n"
                           "(require '[ouroboros.interface :as iface])\n"
                           "(iface/eca-start!)\n\n"
                           "Or set ECA_PATH environment variable.")]
        (telemetry/emit! {:event :chat/eca-not-running})
        (send-message! adapter chat-id error-msg))

      ;; Send to ECA
      (let [result (eca/chat-prompt text)]
        (case (:status result)
          :success
          (let [response (get-in result [:response :result :content]
                                 (str "ECA: " (pr-str (:response result))))]
            (update-session! chat-id :assistant response)
            (send-message! adapter chat-id response))

          :error
          (let [error-msg (str "⚠️  ECA error: "
                               (or (:error result) "Unknown error")
                               "\n\n"
                               "Message: " (:message result))]
            (telemetry/emit! {:event :chat/eca-error
                              :error (:error result)})
            (update-session! chat-id :assistant error-msg)
            (send-message! adapter chat-id error-msg))

          ;; Timeout or other issues
          (let [error-msg (str "⚠️  ECA request failed: "
                               (pr-str result))]
            (telemetry/emit! {:event :chat/eca-failed})
            (update-session! chat-id :assistant error-msg)
            (send-message! adapter chat-id error-msg)))))))

(defn make-message-handler [adapter]
  (fn [{:keys [chat-id user-id user-name text] :as message}]
    (telemetry/emit! {:event :chat/receive :platform (:message/platform message)})

    (if-let [[cmd args] (extract-command text)]
      (handle-command adapter chat-id user-name cmd args)
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Router
;; ============================================================================

(defonce ^:private active-adapters (atom {}))

(defn register-adapter! [platform adapter]
  (swap! active-adapters assoc platform adapter)
  (println (str "✓ Chat adapter registered: " platform)))

(defn- setup-eca-approval-bridge!
  "Wire ECA approval bridge to chat adapter
   
   Allows tool approval requests to be forwarded to chat platforms.
   Silently skips if ECA approval bridge is not available."
  [adapter]
  (try
    (eca-approval/set-adapter!
     {:forward-approval-request
      (fn [confirmation-id message tool-name arguments]
        ;; Forward to all active sessions on this platform
        (doseq [[chat-id _session] @chat-sessions]
          (try
            (send-markdown! adapter chat-id message)
            (telemetry/emit! {:event :chat/approval-forwarded
                              :chat-id chat-id
                              :confirmation-id confirmation-id})
            (catch Exception e
              (telemetry/emit! {:event :chat/approval-forward-error
                                :chat-id chat-id
                                :error (.getMessage e)})))))})
    (telemetry/emit! {:event :chat/eca-approval-wired})
    (catch IllegalStateException e
      ;; ECA approval bridge function not bound - skip silently
      (telemetry/emit! {:event :chat/eca-approval-skipped
                        :reason "ECA approval bridge not available"}))
    (catch Exception e
      (telemetry/emit! {:event :chat/eca-approval-error
                        :error (.getMessage e)}))))

(defn start-all! []
  (doseq [[platform adapter] @active-adapters]
    (let [handler (make-message-handler adapter)]
      ;; Wire ECA approval bridge to this adapter
      (setup-eca-approval-bridge! adapter)
      
      (start! adapter handler)
      (println (str "✓ Chat adapter started: " platform)))))

(defn stop-all! []
  (doseq [[platform adapter] @active-adapters]
    (stop! adapter)
    (println (str "✓ Chat adapter stopped: " platform)))
  (reset! active-adapters {}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver chat-adapters [_]
  {::pco/output [{:chat/adapters [:platform :running]}]}
  {:chat/adapters (map (fn [[k v]]
                         {:platform k
                          :running (some? v)})
                       @active-adapters)})

(pco/defresolver chat-sessions-resolver [_]
  {::pco/output [{:chat/sessions [:chat-id :message-count]}]}
  {:chat/sessions (map (fn [[k v]]
                         {:chat-id k
                          :message-count (count (:history v))})
                       @chat-sessions)})

(def resolvers
  [chat-adapters chat-sessions-resolver])

(def mutations [])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Usage
  (require '[ouroboros.chat.adapters :as adapters])

  ;; Create and register adapter
  (def tg-bot (adapters/telegram-bot "YOUR_BOT_TOKEN"))
  (register-adapter! :tg tg-bot)

  ;; Start all adapters
  (start-all!)

  ;; Stop all
  (stop-all!))
