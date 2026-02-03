(ns ouroboros.chat.discord
  "Discord - Discord Gateway adapter for Ouroboros Chat
   
   Implements ChatAdapter protocol for Discord.
   Uses Gateway WebSocket for real-time messaging.
   
   Setup:
   1. Create bot at https://discord.com/developers/applications
   2. Enable 'Message Content Intent' in Bot settings
   3. Get bot token
   4. Invite bot to server with 'bot' scope
   5. (def bot (make-bot \"YOUR_BOT_TOKEN\"))
   6. (register-adapter! :discord bot)"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.telemetry :as telemetry])
  (:import
   [java.net URI]
   [java.net.http WebSocket HttpClient WebSocket$Listener]
   [java.time Instant]
   [java.util.concurrent CompletableFuture]))

;; ============================================================================
;; Discord API
;; ============================================================================

(def ^:private api-base "https://discord.com/api/v10")

(defn- api-call
  "Make Discord API call"
  [token method endpoint params]
  (try
    (let [url (str api-base endpoint)
          response (case method
                     :get (http/get url
                                    {:headers {"Authorization" (str "Bot " token)
                                               "Content-Type" "application/json"}})
                     :post (http/post url
                                      {:headers {"Authorization" (str "Bot " token)
                                                 "Content-Type" "application/json"}
                                       :body (json/generate-string params)}))]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (println "Discord API error:" (.getMessage e))
      nil)))

(defn- get-gateway-url
  "Get Gateway URL from Discord"
  [token]
  (let [response (api-call token :get "/gateway" {})]
    (:url response)))

(defn- post-message
  "Post message to Discord channel"
  [token channel-id text]
  (api-call token :post (str "/channels/" channel-id "/messages")
            {:content text}))

;; ============================================================================
;; Gateway WebSocket
;; ============================================================================

(def ^:private gateway-version 10)
(def ^:private gateway-encoding "json")

(defn- make-gateway-url
  "Build Gateway URL with parameters"
  [base-url]
  (str base-url "/?v=" gateway-version "&encoding=" gateway-encoding))

(defn- send-identify
  "Send IDENTIFY payload to Discord"
  [ws token]
  (let [payload {:op 2
                 :d {:token token
                     :intents 513  ; GUILDS (1) + GUILD_MESSAGES (512)
                     :properties {:os "linux"
                                  :browser "ouroboros"
                                  :device "ouroboros"}}}]
    (.sendText ws (json/generate-string payload) true)))

(defn- send-heartbeat
  "Send heartbeat to keep connection alive"
  [ws seq-num]
  (let [payload {:op 1
                 :d seq-num}]
    (.sendText ws (json/generate-string payload) true)))

(defn- send-ack
  "Acknowledge an interaction (slash command)"
  [ws interaction-id interaction-token]
  (api-call nil :post (str "/interactions/" interaction-id "/" interaction-token "/callback")
            {:type 4
             :data {:content "Processing..."}}))

;; ============================================================================
;; Message Parsing
;; ============================================================================

(defn- parse-message
  "Parse Discord event into standard format"
  [event-data]
  (let [msg-type (:t event-data)]
    (when (= "MESSAGE_CREATE" msg-type)
      (let [msg (:d event-data)
            channel-id (:channel_id msg)
            author (:author msg)
            user-id (:id author)
            user-name (:username author)
            text (:content msg)
            timestamp (:timestamp msg)
            ;; Check if this is a bot message
            bot? (:bot author false)]
         ;; Ignore bot messages
         (when-not bot?
           (chatp/make-message :discord channel-id user-id user-name text timestamp))))))

(defn- parse-ready
  "Parse ready event for bot info"
  [event-data]
  (when (= "READY" (:t event-data))
    (let [ready (:d event-data)
          user (:user ready)]
      {:bot-id (:id user)
       :bot-name (:username user)
       :session-id (:session_id ready)})))

;; ============================================================================
;; WebSocket Listener
;; ============================================================================

(defn- make-listener
  "Create WebSocket listener for Discord Gateway"
  [handler-atom running-atom seq-num-atom ws-atom token]
  (proxy [WebSocket$Listener] []
    (onOpen [ws]
      (println "✓ Discord Gateway connected")
      (send-identify ws token))

    (onText [ws text last]
      (try
        (let [event (json/parse-string text true)
              op (:op event)]
          (case op
            ;; Heartbeat
            1 (do (println "◈ Discord heartbeat requested")
                  (send-heartbeat ws @seq-num-atom))

            ;; Reconnect
            7 (do (println "◈ Discord requested reconnect")
                  (reset! running-atom false))

            ;; Invalid session
            9 (do (println "✗ Discord invalid session")
                  (reset! running-atom false))

            ;; Hello - start heartbeat
            10 (let [interval (get-in event [:d :heartbeat_interval] 45000)]
                 (println (str "◈ Discord heartbeat interval: " interval "ms"))
                 ;; Start heartbeat loop
                 (future
                   (loop []
                     (when @running-atom
                       (Thread/sleep interval)
                       (when @running-atom
                         (try
                           (send-heartbeat @ws-atom @seq-num-atom)
                           (catch Exception e
                             (println "Heartbeat error:" (.getMessage e))))
                         (recur))))))

            ;; Heartbeat ACK
            11 (println "◈ Discord heartbeat ACK")

            ;; Dispatch (events)
            0 (do (reset! seq-num-atom (:s event))
                  (when-let [ready (parse-ready event)]
                    (println (str "✓ Discord bot ready: " (:bot-name ready))))
                  (when-let [message (parse-message event)]
                    (telemetry/emit! {:event :discord/message
                                      :channel (:message/chat-id message)
                                      :user (:message/user-name message)})
                    (try
                      ((deref handler-atom) message)
                      (catch Exception e
                        (println "Error handling Discord message:" (.getMessage e))))))

            ;; Unknown
            (println "◈ Discord unknown op:" op)))
        (catch Exception e
          (println "Error parsing Discord message:" (.getMessage e))))
      nil)

    (onError [ws error]
      (println "Discord WebSocket error:" (.getMessage error))
      (reset! running-atom false))

    (onClose [ws status-code reason]
      (println (str "Discord Gateway closed: " status-code " - " reason))
      (reset! running-atom false))))

;; ============================================================================
;; Connection Management
;; ============================================================================

(defn- connect-gateway
  "Connect to Discord Gateway"
  [gateway-url token handler-atom running-atom seq-num-atom ws-atom]
  (future
    (try
      (let [client (HttpClient/newHttpClient)
            listener (make-listener handler-atom running-atom seq-num-atom ws-atom token)
            ws @(.. client
                    (newWebSocketBuilder)
                    (buildAsync (URI/create (make-gateway-url gateway-url)) listener))]
        (reset! ws-atom ws)
        ;; Keep connection alive
        (while @running-atom
          (Thread/sleep 1000)))
      (catch Exception e
        (println "Discord Gateway error:" (.getMessage e))
        (reset! running-atom false)))))

;; ============================================================================
;; Bot State
;; ============================================================================

(defrecord DiscordBot [token ws-atom running-atom handler-atom seq-num-atom reconnect-atom]
  chatp/ChatAdapter

  (start! [this handler]
    (reset! handler-atom handler)
    (reset! running-atom true)
    (reset! reconnect-atom true)
    (println "◈ Starting Discord bot...")

    ;; Get Gateway URL and connect
    (future
      (loop []
        (when @reconnect-atom
          (let [gateway-url (get-gateway-url token)]
            (if gateway-url
              (do (println (str "◈ Discord Gateway URL: " gateway-url))
                  (connect-gateway gateway-url token handler-atom running-atom seq-num-atom ws-atom)
                  ;; Wait for connection or error
                  (while @running-atom
                    (Thread/sleep 1000)))
              (do (println "✗ Failed to get Discord Gateway URL")
                  (Thread/sleep 10000))))
          ;; Auto-reconnect if not explicitly stopped
          (when @reconnect-atom
            (println "◈ Discord reconnecting...")
            (Thread/sleep 5000)
            (reset! running-atom true)
            (recur)))))

    this)

  (stop! [this]
    (reset! reconnect-atom false)
    (reset! running-atom false)
    (when-let [ws @ws-atom]
      (try
        (.sendClose ws WebSocket/NORMAL_CLOSURE "Shutting down")
        (catch Exception e
          (println "Error closing Discord WebSocket:" (.getMessage e)))))
    (reset! ws-atom nil)
    (println "✓ Discord bot stopped")
    this)

  (send-message! [this channel-id text]
    (post-message token channel-id text)
    this)

  (send-markdown! [this channel-id text]
    ;; Discord supports markdown natively
    (post-message token channel-id text)
    this))

;; ============================================================================
;; Factory
;; ============================================================================

(defn make-bot
  "Create a new Discord bot instance
   
   Usage: (make-bot \"YOUR_BOT_TOKEN\")
   
   Get token from: https://discord.com/developers/applications
   
   Required permissions:
   - Send Messages
   - Read Message History
   - View Channels
   
   Required Gateway Intents:
   - GUILDS
   - GUILD_MESSAGES"
  [token]
  (->DiscordBot token (atom nil) (atom false) (atom nil) (atom nil) (atom false)))

(defn test-gateway
  "Test Gateway connection"
  [token]
  (get-gateway-url token))

;; ============================================================================
;; REPL
;; ============================================================================

(comment
  ;; Create bot
  (def bot (make-bot "YOUR_BOT_TOKEN"))

  ;; Test Gateway
  (test-gateway "YOUR_BOT_TOKEN")

  ;; Register and start (requires ouroboros.chat)
  ;; (chat/register-adapter! :discord bot)
  ;; (chat/start-all!)

  ;; Send message (channel ID must be a string)
  (chatp/send-message! bot "1234567890123456789" "Hello from Ouroboros!")

  ;; Stop
  ;; (chat/stop-all!)
  )