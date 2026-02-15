(ns ouroboros.chat.adapters
  "Chat Adapters - Telegram, Discord, and Slack implementations
   
   Consolidated adapter implementations for all chat platforms.
   Each adapter implements the ChatAdapter protocol.
   
   Usage:
     (require '[ouroboros.chat.adapters :as adapters])
     (def telegram-bot (adapters/telegram-bot \"TOKEN\"))
     (def discord-bot (adapters/discord-bot \"TOKEN\"))
     (def slack-bot (adapters/slack-bot \"APP-TOKEN\" \"BOT-TOKEN\"))"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.websocket :as ws]
   [ouroboros.telemetry :as telemetry])
  (:import
   [java.net URI]
   [java.net.http WebSocket HttpClient WebSocket$Listener]
   [java.time Instant]
   [java.util.concurrent CompletableFuture]))

;; ============================================================================
;; Telegram Adapter
;; ============================================================================

(def ^:private telegram-api-base "https://api.telegram.org/bot")

(defn- telegram-api-call [token method params]
  (try
    (let [url (str telegram-api-base token "/" method)
          response (http/post url {:headers {"Content-Type" "application/json"}
                                   :body (json/generate-string params)})]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (telemetry/emit! {:event :chat/telegram-api-error :error (.getMessage e)})
      nil)))

(defn- telegram-get-updates [token offset timeout]
  (let [result (telegram-api-call token "getUpdates" {:offset offset :limit 100 :timeout timeout})]
    (when (:ok result) (:result result))))

(defn- telegram-send-text [token chat-id text parse-mode]
  (telegram-api-call token "sendMessage"
                     (merge {:chat_id chat-id :text text}
                            (when parse-mode {:parse_mode parse-mode}))))

(defn- telegram-edit-text [token chat-id message-id text parse-mode]
  (telegram-api-call token "editMessageText"
                     (merge {:chat_id chat-id
                             :message_id message-id
                             :text text}
                            (when parse-mode {:parse_mode parse-mode}))))

(defn- telegram-extract-message-id [response]
  (get-in response [:result :message_id]))

(defn- telegram-parse-message [update]
  (when-let [msg (:message update)]
    (let [chat-id (get-in msg [:chat :id])
          user-id (get-in msg [:from :id])
          user-name (or (get-in msg [:from :username])
                        (str (get-in msg [:from :first_name])))
          text (:text msg "")
          timestamp (when (:date msg) (str (Instant/ofEpochSecond (:date msg))))]
      (chatp/make-message :telegram chat-id user-id user-name text timestamp))))

(defrecord TelegramBot [token running handler offset-atom]
  chatp/ChatAdapter
  (start! [this handler-fn]
    (reset! (:running this) true)
    (reset! (:handler this) handler-fn)
    (future
      (loop []
        (when @(:running this)
          (when-let [updates (telegram-get-updates token @(:offset-atom this) 30)]
            (doseq [update updates]
              (swap! (:offset-atom this) inc)
              (when-let [message (telegram-parse-message update)]
                (try
                  (handler-fn message)
                  (catch Exception e
                    (telemetry/emit! {:event :chat/handler-error :error (.getMessage e)}))))))
          (Thread/sleep 100)
          (recur))))
    (telemetry/emit! {:event :chat/adapter-started :platform :telegram})
    this)
  
  (stop! [this]
    (reset! (:running this) false)
    (telemetry/emit! {:event :chat/adapter-stopped :platform :telegram})
    this)
  
  (send-message! [this chat-id text]
    (telegram-extract-message-id (telegram-send-text token chat-id text nil)))
  
  (send-markdown! [this chat-id text]
    (telegram-extract-message-id (telegram-send-text token chat-id text "Markdown")))

  chatp/EditableAdapter
  (edit-message! [this chat-id message-id text]
    (telegram-edit-text token chat-id message-id text nil)))

(defn telegram-bot
  "Create a Telegram bot adapter
   
   Usage: (telegram-bot \"YOUR_BOT_TOKEN\")"
  [token]
  (->TelegramBot token (atom false) (atom nil) (atom 1)))

;; ============================================================================
;; Discord Adapter
;; ============================================================================

(def ^:private discord-api-base "https://discord.com/api/v10")

(defn- discord-api-call [token method endpoint params]
  (try
    (let [url (str discord-api-base endpoint)
          response (case method
                     :get (http/get url {:headers {"Authorization" (str "Bot " token)
                                                   "Content-Type" "application/json"}})
                     :post (http/post url {:headers {"Authorization" (str "Bot " token)
                                                     "Content-Type" "application/json"}
                                           :body (json/generate-string params)})
                     :patch (http/request {:method :patch
                                           :uri url
                                           :headers {"Authorization" (str "Bot " token)
                                                     "Content-Type" "application/json"}
                                           :body (json/generate-string params)}))]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (telemetry/emit! {:event :chat/discord-api-error :error (.getMessage e)})
      nil)))

(defn- discord-get-gateway [token]
  (:url (discord-api-call token :get "/gateway" {})))

(defn- discord-post-message [token channel-id text]
  (discord-api-call token :post (str "/channels/" channel-id "/messages") {:content text}))

(defn- discord-edit-message [token channel-id message-id text]
  (discord-api-call token :patch (str "/channels/" channel-id "/messages/" message-id) {:content text}))

(defn- discord-parse-message [event-data]
  (when (= "MESSAGE_CREATE" (:t event-data))
    (let [msg (:d event-data)
          author (:author msg)]
      (when (not (:bot author))
        (chatp/make-message :discord
                            (:channel_id msg)
                            (:id author)
                            (:username author)
                            (:content msg)
                            (str (Instant/now)))))))

(defn- discord-connect-websocket [token gateway-url handler]
  (let [client (HttpClient/newHttpClient)
        listener (proxy [WebSocket$Listener] []
                   (onOpen [ws]
                     (telemetry/emit! {:event :chat/discord-ws-open}))
                   (onText [ws text last?]
                     (when-let [data (try (json/parse-string text true) (catch Exception _ nil))]
                       (when (= 10 (:op data))
                         (.sendText ws (json/generate-string {:op 2 :d {:token token :intents 512 :properties {:os "linux" :browser "ouroboros" :device "ouroboros"}}}) true))
                       (when (= 1 (:op data))
                         (.sendText ws (json/generate-string {:op 11}) true))
                       (when-let [message (discord-parse-message data)]
                         (try (handler message) (catch Exception _e)))))
                   (onError [ws error]
                     (telemetry/emit! {:event :chat/discord-ws-error :error (.getMessage error)}))
                   (onClose [ws status-code reason]
                     (telemetry/emit! {:event :chat/discord-ws-close :status status-code})))]
    (.buildAsync client (WebSocket/newBuilder (URI/create gateway-url) listener))))

(defrecord DiscordBot [token running handler ws-atom]
  chatp/ChatAdapter
  (start! [this handler-fn]
    (reset! (:running this) true)
    (reset! (:handler this) handler-fn)
    (when-let [gateway (discord-get-gateway token)]
      (let [ws (discord-connect-websocket token (str gateway "?v=10&encoding=json") handler-fn)]
        (reset! (:ws-atom this) ws)))
    (telemetry/emit! {:event :chat/adapter-started :platform :discord})
    this)
  
  (stop! [this]
    (reset! (:running this) false)
    (when-let [ws @(:ws-atom this)]
      (.sendClose ws WebSocket/NORMAL_CLOSURE "Shutting down"))
    (telemetry/emit! {:event :chat/adapter-stopped :platform :discord})
    this)
  
  (send-message! [this channel-id text]
    (:id (discord-post-message token channel-id text)))
  
  (send-markdown! [this channel-id text]
    (:id (discord-post-message token channel-id text)))

  chatp/EditableAdapter
  (edit-message! [this channel-id message-id text]
    (discord-edit-message token channel-id message-id text)))

(defn discord-bot
  "Create a Discord bot adapter
   
   Usage: (discord-bot \"YOUR_BOT_TOKEN\")"
  [token]
  (->DiscordBot token (atom false) (atom nil) (atom nil)))

;; ============================================================================
;; Slack Adapter
;; ============================================================================

(defn- slack-api-call [token method params]
  (try
    (let [url (str "https://slack.com/api/" method)
          response (http/post url {:headers {"Authorization" (str "Bearer " token)
                                             "Content-Type" "application/json"}
                                   :body (json/generate-string params)})]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (telemetry/emit! {:event :chat/slack-api-error :error (.getMessage e)})
      nil)))

(defn- slack-socket-open [app-token]
  (let [result (http/post "https://slack.com/api/apps.connections.open"
                          {:headers {"Authorization" (str "Bearer " app-token)
                                     "Content-Type" "application/json"}})]
    (when (= 200 (:status result))
      (json/parse-string (:body result) true))))

(defn- slack-post-message [bot-token channel text]
  (slack-api-call bot-token "chat.postMessage" {:channel channel :text text}))

(defn- slack-edit-message [bot-token channel ts text]
  (slack-api-call bot-token "chat.update" {:channel channel :ts ts :text text}))

(defn- slack-ack [app-token _envelope-id]
  (slack-api-call app-token "apps.connections.open" {}))

(defn- slack-parse-message [event-data]
  (when-let [payload (:payload event-data)]
    (when (= "event_callback" (:type event-data))
      (let [event (:event payload)]
        (when (= "message" (:type event))
          (when (not (:bot_profile event))
            (chatp/make-message :slack
                                (:channel event)
                                (:user event)
                                (get-in event [:user :name] "unknown")
                                (:text event)
                                (str (Instant/now)))))))))

(defrecord SlackBot [app-token bot-token running handler ws-atom]
  chatp/ChatAdapter
  (start! [this handler-fn]
    (reset! (:running this) true)
    (reset! (:handler this) handler-fn)
    (when-let [socket-data (slack-socket-open app-token)]
      (when (:ok socket-data)
        (let [ws-atom (:ws-atom this)
              running-atom (:running this)
              listener (ws/make-listener
                        {:on-text (fn [_ws text _last]
                                    (when-let [data (try (json/parse-string text true) (catch Exception _ nil))]
                                      (when-let [message (slack-parse-message data)]
                                        (try (handler-fn message) (catch Exception _e)))))})]
          (ws/connect (:url socket-data) listener ws-atom running-atom))))
    (telemetry/emit! {:event :chat/adapter-started :platform :slack})
    this)
  
  (stop! [this]
    (reset! (:running this) false)
    (when-let [ws @(:ws-atom this)]
      (ws/close ws))
    (telemetry/emit! {:event :chat/adapter-stopped :platform :slack})
    this)
  
  (send-message! [this channel-id text]
    (:ts (slack-post-message bot-token channel-id text)))
  
  (send-markdown! [this channel-id text]
    (:ts (slack-post-message bot-token channel-id text)))

  chatp/EditableAdapter
  (edit-message! [this channel-id message-id text]
    (slack-edit-message bot-token channel-id message-id text)))

(defn slack-bot
  "Create a Slack bot adapter (Socket Mode)
   
   Usage: (slack-bot \"xapp-...\" \"xoxb-...\")"
  [app-token bot-token]
  (->SlackBot app-token bot-token (atom false) (atom nil) (atom nil)))

;; ============================================================================
;; Convenience Functions
;; ============================================================================

(defn make-bot
  "Create a bot for the specified platform
   
   Usage:
     (make-bot :telegram \"TOKEN\")
     (make-bot :discord \"TOKEN\")
     (make-bot :slack \"APP-TOKEN\" \"BOT-TOKEN\")"
  ([platform token]
   (case platform
     :telegram (telegram-bot token)
     :discord (discord-bot token)
     (throw (IllegalArgumentException. (str "Unknown platform: " platform)))))
  ([platform app-token bot-token]
   (case platform
     :slack (slack-bot app-token bot-token)
     (throw (IllegalArgumentException. (str "Unknown platform: " platform))))))
