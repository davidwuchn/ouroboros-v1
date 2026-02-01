(ns ouroboros.chat
  "Chat - Message routing and conversation management
   
   Core infrastructure for chat platform integration:
   - ChatAdapter protocol for platform abstraction
   - Message routing to handlers
   - Session management (conversation history)
   - Tool filtering for chat safety"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.ai :as ai]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory])
  (:import [java.time Instant]))

;; ============================================================================
;; ChatAdapter Protocol
;; ============================================================================

(defprotocol ChatAdapter
  "Protocol for chat platform adapters"
  (start! [this handler]
    "Start listening for messages, call handler on each message")
  (stop! [this]
    "Stop listening")
  (send-message! [this chat-id text]
    "Send a text message to a chat")
  (send-markdown! [this chat-id text]
    "Send a markdown-formatted message"))

;; ============================================================================
;; Message Structure
;; ============================================================================

(defn make-message
  "Create a standardized message map"
  [platform chat-id user-id user-name text timestamp]
  {:message/id (str (java.util.UUID/randomUUID))
   :message/platform platform
   :message/chat-id chat-id
   :message/user-id user-id
   :message/user-name user-name
   :message/text text
   :message/timestamp (or timestamp (str (Instant/now)))})

;; ============================================================================
;; Session Management
;; ============================================================================

(defonce ^:private chat-sessions (atom {}))

(defn get-session
  "Get or create session for a chat"
  [chat-id]
  (swap! chat-sessions update chat-id #(or % {:history []
                                              :context {}
                                              :created-at (str (Instant/now))}))
  (get @chat-sessions chat-id))

(defn update-session!
  "Update session with new message"
  [chat-id role content]
  (swap! chat-sessions update-in [chat-id :history] conj
         {:role role :content content :timestamp (str (Instant/now))})
  (when (> (count (get-in @chat-sessions [chat-id :history])) 20)
    (swap! chat-sessions update-in [chat-id :history] (partial take-last 10))))

(defn clear-session!
  "Clear conversation history for a chat"
  [chat-id]
  (swap! chat-sessions assoc-in [chat-id :history] [])
  {:status :cleared})

;; ============================================================================
;; Tool Filtering for Chat Safety
;; ============================================================================

(def ^:private chat-safe-tools
  "Tools safe to expose in chat contexts"
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

(defn chat-safe-tool?
  "Check if a tool is safe for chat usage"
  [tool-name]
  (contains? chat-safe-tools (keyword tool-name)))

(defn list-chat-tools
  "List tools available in chat context"
  []
  (filter #(chat-safe-tool? (:tool/name %)) (ai/list-tools)))

;; ============================================================================
;; Message Handler
;; ============================================================================

(defn- extract-command
  "Extract command from message text"
  [text]
  (when (str/starts-with? text "/")
    (let [parts (str/split (str/lower-case text) #"\s+" 2)
          cmd (first parts)
          args (second parts)]
      [(keyword (subs cmd 1)) (or args "")])))

(defn- handle-command
  "Handle built-in chat commands"
  [adapter chat-id cmd args]
  (telemetry/emit! {:event :chat/command :command cmd :chat-id chat-id})
  (case cmd
    :start (send-message! adapter chat-id
                          "🐍 Ouroboros Assistant ready!\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status")
    :help (send-message! adapter chat-id
                         "*Ouroboros Chat Commands*\n\n/clear - Clear conversation history\n/status - Check system status\n/tools - List available tools\n\nJust type naturally to chat!")
    :clear (do (clear-session! chat-id)
               (send-message! adapter chat-id "✓ Conversation cleared"))
    :status (let [result (ai/call-tool :system/status {})]
              (send-message! adapter chat-id
                             (str "*System Status*\n\n"
                                  (pr-str (:result result)))))
    :tools (let [tools (list-chat-tools)]
             (send-message! adapter chat-id
                            (str "*Available Tools*\n\n"
                                 (str/join "\n" (map :tool/name tools)))))
    (send-message! adapter chat-id (str "Unknown command: " (name cmd)))))

(defn- handle-natural-message
  "Handle natural language message with AI"
  [adapter chat-id user-name text]
  (telemetry/emit! {:event :chat/message :chat-id chat-id :user user-name})

  ;; Update session with user message
  (update-session! chat-id :user text)

  ;; Simple response for now (AI integration comes in Phase 2)
  (let [response (str "Hello " user-name "! You said: " text
                      "\n\n(I'll have AI capabilities in Phase 2)")]
    (update-session! chat-id :assistant response)
    (send-message! adapter chat-id response)))

(defn make-message-handler
  "Create a handler function for incoming messages"
  [adapter]
  (fn [{:keys [chat-id user-id user-name text] :as message}]
    (telemetry/emit! {:event :chat/receive :platform (:message/platform message)})

    ;; Check for commands
    (if-let [[cmd args] (extract-command text)]
      (handle-command adapter chat-id cmd args)
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Router
;; ============================================================================

(defonce ^:private active-adapters (atom {}))

(defn register-adapter!
  "Register a chat adapter"
  [platform adapter]
  (swap! active-adapters assoc platform adapter)
  (println (str "✓ Chat adapter registered: " platform)))

(defn start-all!
  "Start all registered adapters"
  []
  (doseq [[platform adapter] @active-adapters]
    (let [handler (make-message-handler adapter)]
      (start! adapter handler)
      (println (str "✓ Chat adapter started: " platform)))))

(defn stop-all!
  "Stop all registered adapters"
  []
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

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [chat-adapters chat-sessions-resolver])

(def mutations
  [])

(comment
  ;; Usage
  (require '[ouroboros.chat.telegram :as telegram])

  ;; Create and register adapter
  (def tg-bot (telegram/make-bot "YOUR_BOT_TOKEN"))
  (register-adapter! :telegram tg-bot)

  ;; Start all adapters
  (start-all!)

  ;; Stop all
  (stop-all!))
