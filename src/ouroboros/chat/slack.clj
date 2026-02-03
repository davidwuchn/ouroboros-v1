(ns ouroboros.chat.slack
  "Slack - Slack Socket Mode adapter for Ouroboros Chat
   
   Implements ChatAdapter protocol for Slack using Socket Mode.
   Uses shared WebSocket utilities from ouroboros.chat.websocket.
   
   Setup:
   1. Create app at https://api.slack.com/apps
   2. Enable Socket Mode
   3. Subscribe to events: message.channels, message.groups, message.im
   4. Get app token (xapp-) and bot token (xoxb-)
   5. Invite bot to channels
   6. (def bot (make-bot \"xapp-...\" \"xoxb-...\"))
   7. (register-adapter! :slack bot)"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.websocket :as ws]
   [ouroboros.telemetry :as telemetry])
  (:import [java.time Instant]))

;; ============================================================================
;; Slack API
;; ============================================================================

(defn- api-call
  "Make Slack API call"
  [token method params]
  (try
    (let [url (str "https://slack.com/api/" method)
          response (http/post url
                              {:headers {"Authorization" (str "Bearer " token)
                                         "Content-Type" "application/json"}
                               :body (json/generate-string params)})]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (println "Slack API error:" (.getMessage e))
      nil)))

(defn- apps-connect-open
  "Open Socket Mode connection and get WebSocket URL"
  [app-token]
  (let [result (http/post "https://slack.com/api/apps.connections.open"
                          {:headers {"Authorization" (str "Bearer " app-token)
                                     "Content-Type" "application/json"}})]
    (when (= 200 (:status result))
      (json/parse-string (:body result) true))))

(defn- post-message
  "Post message to Slack channel"
  [bot-token channel text]
  (api-call bot-token "chat.postMessage"
            {:channel channel
             :text text}))

(defn- ack-event
  "Acknowledge an event to Slack"
  [ws envelope-id]
  (ws/send-json ws {:envelope_id envelope-id}))

;; ============================================================================
;; Message Parsing
;; ============================================================================

(defn- parse-message
  "Parse Slack message event into standard format"
  [event]
  (when (= "message" (:type event))
    (let [channel (:channel event)
          user-id (:user event)
          text (:text event "")
          timestamp (:ts event)
          ;; Get user info if available
          user-name (or (:username event) user-id)]
      ;; Ignore bot messages
      (when-not (:bot_id event)
        (chatp/make-message :slack channel user-id user-name text
                            (when timestamp
                              (str (Instant/ofEpochMilli (long (* 1000 (Double/parseDouble timestamp)))))))))))

;; ============================================================================
;; WebSocket Event Handler
;; ============================================================================

(defn- handle-socket-event
  "Handle incoming Socket Mode event"
  [data handler-atom ws]
  (let [event-type (:type data)
        envelope-id (:envelope_id data)]

    ;; Acknowledge the event first
    (when envelope-id
      (ack-event ws envelope-id))

    (case event-type
      ;; Hello - connection established
      "hello" (println "✓ Slack Socket Mode connected")

      ;; Events API
      "events_api" (let [payload (:payload data)
                         event (:event payload)
                         message (parse-message event)]
                     (when message
                       (telemetry/emit! {:event :slack/message
                                         :channel (:message/chat-id message)
                                         :user (:message/user-name message)})
                       (try
                         ((deref handler-atom) message)
                         (catch Exception e
                           (println "Error handling Slack message:" (.getMessage e))))))

      ;; Disconnect warning
      "disconnect" (println "◈ Slack requested disconnect")

      ;; Ping from server
      "ping" (println "◈ Slack ping received")

      ;; Unknown
      (println "◈ Slack event:" event-type))))

;; ============================================================================
;; WebSocket Listener
;; ============================================================================

(defn- make-slack-listener
  "Create WebSocket listener for Slack Socket Mode"
  [handler-atom running-atom ws-atom]
  (ws/make-listener
   {:on-open (fn [ws]
               (println "✓ Slack WebSocket connected")
               (reset! ws-atom ws))

    :on-text (fn [ws text last]
               (when-let [data (ws/parse-json text)]
                 (handle-socket-event data handler-atom ws)))

    :on-error (fn [ws error]
                (println "Slack WebSocket error:" (.getMessage error))
                (reset! running-atom false))

    :on-close (fn [ws status-code reason]
                (println (str "Slack WebSocket closed: " status-code " - " reason))
                (reset! running-atom false))}))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defn- connect-socket-mode
  "Connect to Slack Socket Mode"
  [app-token handler-atom running-atom ws-atom]
  (let [connection (apps-connect-open app-token)]
    (if (:ok connection)
      (let [ws-url (:url connection)]
        (println (str "◈ Slack Socket Mode URL: " ws-url))
        (let [listener (make-slack-listener handler-atom running-atom ws-atom)]
          (ws/connect ws-url listener ws-atom running-atom)))
      (do (println "✗ Failed to get Slack Socket Mode URL:" (:error connection))
          (throw (Exception. "Failed to connect to Slack Socket Mode"))))))

;; ============================================================================
;; Bot State
;; ============================================================================

(defrecord SlackBot [app-token bot-token ws-atom running-atom handler-atom reconnect-atom]
  chatp/ChatAdapter

  (start! [this handler]
    (reset! handler-atom handler)
    (reset! running-atom true)
    (reset! reconnect-atom true)
    (println "◈ Starting Slack bot...")

    ;; Start with auto-reconnect
    (ws/with-reconnect
      #(connect-socket-mode app-token handler-atom running-atom ws-atom)
      reconnect-atom
      5000)

    this)

  (stop! [this]
    (reset! reconnect-atom false)
    (reset! running-atom false)
    (ws/close @ws-atom)
    (reset! ws-atom nil)
    (println "✓ Slack bot stopped")
    this)

  (send-message! [this channel-id text]
    (post-message bot-token channel-id text)
    this)

  (send-markdown! [this channel-id text]
    ;; Slack uses mrkdwn format
    (post-message bot-token channel-id text)
    this))

;; ============================================================================
;; Factory
;; ============================================================================

(defn make-bot
  "Create a new Slack bot instance
   
   Usage: (make-bot \"xapp-...\" \"xoxb-...\")
   
   app-token: From Slack App-Level Tokens (starts with xapp-)
   bot-token: From OAuth & Permissions (starts with xoxb-)
   
   Required OAuth scopes:
   - chat:write
   - channels:history (for public channels)
   - groups:history (for private channels)
   - im:history (for DMs)
   
   Required Socket Mode scopes:
   - connections:write"
  [app-token bot-token]
  (->SlackBot app-token bot-token (atom nil) (atom false) (atom nil) (atom false)))

(defn test-auth
  "Test bot authentication"
  [bot-token]
  (api-call bot-token "auth.test" {}))

;; ============================================================================
;; REPL
;; ============================================================================

(comment
  ;; Create bot
  (def bot (make-bot "xapp-YOUR-APP-TOKEN" "xoxb-YOUR-BOT-TOKEN"))

  ;; Test auth
  (test-auth "xoxb-YOUR-BOT-TOKEN")

  ;; Register and start (requires ouroboros.chat)
  ;; (chat/register-adapter! :slack bot)
  ;; (chat/start-all!)

  ;; Send message (channel ID must be a string)
  (chatp/send-message! bot "C1234567890" "Hello from Ouroboros!")

  ;; Stop
  ;; (chat/stop-all!)
  )