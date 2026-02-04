(ns ouroboros.chat
  "Chat - Message routing and conversation management

   Core infrastructure for chat platform integration:
   - ChatAdapter protocol for platform abstraction
   - Message routing to handlers
   - Session management (conversation history)
   - Tool filtering for chat safety

   DEPRECATED NOTE: This namespace uses ouroboros.agent for AI responses.
   AI functionality will be delegated to ECA in a future version."
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory]
   [ouroboros.agent :as agent]
   [ouroboros.confirmation :as confirmation]
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
                          "🐍 Ouroboros Assistant ready!\n\n⚠️  AI responses use deprecated internal agent.\nUse ECA for production: https://github.com/editor-code-assistant/eca\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status\n/confirm - Approve operation\n/deny - Reject operation")
    :help (send-message! adapter chat-id
                         "*Ouroboros Chat Commands*\n\n/clear - Clear conversation history\n/status - Check system status\n/tools - List available tools\n/confirm - Approve pending dangerous operation\n/deny - Reject pending operation\n\nJust type naturally to chat!")
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
    :confirm (let [result (confirmation/approve! chat-id :approved-by user-name)]
               (case (:status result)
                 :approved (send-message! adapter chat-id
                                          (str "✓ Confirmed: " (:tool result) "\nExecuting..."))
                 :error (send-message! adapter chat-id
                                       (str "⚠️ " (:reason result)))))
    :deny (let [result (confirmation/deny! chat-id "User declined" :denied-by user-name)]
            (case (:status result)
              :denied (send-message! adapter chat-id "✗ Operation denied")
              :error (send-message! adapter chat-id (str "⚠️ " (:reason result)))))
    (send-message! adapter chat-id (str "Unknown command: " (name cmd)))))

(defn- handle-natural-message
  [adapter chat-id user-name text]
  (telemetry/emit! {:event :chat/message :chat-id chat-id :user user-name})

  (update-session! chat-id :user text)

  (let [session (get-session chat-id)
        history (:history session)
        ;; DEPRECATED: Using internal agent - will be replaced with ECA
        result (agent/generate-chat-response text history :session-id chat-id)]

    (if (:error result)
      (let [error-response (str "⚠️  AI response error.\n\n"
                                  "Internal agent is deprecated.\n"
                                  "Install ECA for production: https://github.com/editor-code-assistant/eca\n\n"
                                  "Error: " (:response result))]
        (update-session! chat-id :assistant error-response)
        (send-message! adapter chat-id error-response))
      (let [response (:response result)]
        (update-session! chat-id :assistant response)
        (send-message! adapter chat-id response)))))

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

(defn start-all! []
  (doseq [[platform adapter] @active-adapters]
    (let [handler (make-message-handler adapter)]
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
  (require '[ouroboros.chat.telegram :as telegram])

  ;; Create and register adapter
  (def tg-bot (telegram/make-bot "YOUR_BOT_TOKEN"))
  (register-adapter! :tg tg-bot)

  ;; Start all adapters
  (start-all!)

  ;; Stop all
  (stop-all!))
