(ns ouroboros.chat.slack
  "Slack - Slack Bolt adapter for Ouroboros Chat
   
   Implements ChatAdapter protocol for Slack.
   Uses Socket Mode for real-time messaging.
   
   Setup:
   1. Create app at https://api.slack.com/apps
   2. Enable Socket Mode
   3. Get app token (xapp-) and bot token (xoxb-)
   4. (def bot (make-bot \"xapp-...\" \"xoxb-...\"))
   5. (register-adapter! :slack bot)"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.chat :as chat]
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
  "Open Socket Mode connection"
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

;; ============================================================================
;; Message Parsing
;; ============================================================================

(defn- parse-message
  "Parse Slack event into standard format"
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
        (chat/make-message :slack channel user-id user-name text
                           (when timestamp
                             (str (Instant/ofEpochMilli (long (* 1000 (Double/parseDouble timestamp)))))))))))

;; ============================================================================
;; Socket Mode Handler
;; ============================================================================

(defn- handle-socket-event
  "Handle incoming socket mode event"
  [event handler]
  (let [event-type (:type event)]
    (cond
      ;; URL verification (initial handshake)
      (= "url_verification" event-type)
      {:challenge (:challenge event)}

      ;; Events API
      (= "event_callback" event-type)
      (let [payload (:event event)
            message (parse-message payload)]
        (when message
          (telemetry/emit! {:event :slack/message
                            :channel (:message/chat-id message)})
          (try
            (handler message)
            (catch Exception e
              (println "Error handling Slack message:" (.getMessage e)))))
        {:ok true})

      :else
      {:ok true})))

;; ============================================================================
;; WebSocket Client
;; ============================================================================

(defn- connect-websocket
  "Connect to WebSocket and handle messages"
  [ws-url handler-atom running-atom]
  (future
    (loop []
      (when @running-atom
        (try
          ;; For now, log that we would connect
          ;; Full WebSocket implementation would use java.net.http.WebSocket
          ;; or an external library
          (println "◈ Slack Socket Mode: would connect to" ws-url)

          ;; Simulate event loop
          (Thread/sleep 5000)

          (catch Exception e
            (println "Slack WebSocket error:" (.getMessage e))
            (Thread/sleep 10000)))
        (recur)))))

;; ============================================================================
;; Bot State
;; ============================================================================

(defrecord SlackBot [app-token bot-token ws-atom running-atom handler-atom]
  chat/ChatAdapter

  (start! [this handler]
    (reset! handler-atom handler)
    (reset! running-atom true)
    (println "◈ Starting Slack bot...")

    ;; Open Socket Mode connection
    (let [connection (apps-connect-open app-token)]
      (if (:ok connection)
        (let [ws-url (:url connection)]
          (println "✓ Slack Socket Mode connected")
          (reset! ws-atom ws-url)
          ;; Start WebSocket listener
          (connect-websocket ws-url handler-atom running-atom))
        (println "✗ Failed to connect Slack Socket Mode:" (:error connection))))

    this)

  (stop! [this]
    (reset! running-atom false)
    (reset! ws-atom nil)
    (println "✓ Slack bot stopped")
    this)

  (send-message! [this channel-id text]
    (post-message bot-token channel-id text)
    this)

  (send-markdown! [this channel-id text]
    ;; Slack uses mrkdwn, similar to markdown
    (post-message bot-token channel-id text)
    this))

;; ============================================================================
;; Factory
;; ============================================================================

(defn make-bot
  "Create a new Slack bot instance
   
   Usage: (make-bot \"xapp-...\" \"xoxb-...\")
   
   app-token: From Slack App-Level Tokens (xapp-)
   bot-token: From OAuth & Permissions (xoxb-)"
  [app-token bot-token]
  (->SlackBot app-token bot-token (atom nil) (atom false) (atom nil)))

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

  ;; Register and start
  (chat/register-adapter! :slack bot)
  (chat/start-all!)

  ;; Send message
  (chat/send-message! bot "C1234567890" "Hello from Ouroboros!")

  ;; Stop
  (chat/stop-all!))
