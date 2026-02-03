(ns ouroboros.chat.telegram
  "Telegram - Telegram Bot API adapter for Ouroboros Chat
   
   Implements ChatAdapter protocol for Telegram.
   Uses long-polling to receive messages.
   
   Setup:
   1. Create bot via @BotFather
   2. Get token
   3. (def bot (make-bot \"YOUR_TOKEN\"))
   4. (register-adapter! :telegram bot)"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.telemetry :as telemetry])
  (:import [java.time Instant]))

;; ============================================================================
;; Telegram API
;; ============================================================================

(def ^:private api-base "https://api.telegram.org/bot")

(defn- api-url [token method]
  (str api-base token "/" method))

(defn- api-call
  "Make Telegram API call"
  [token method params]
  (try
    (let [url (api-url token method)
          response (http/post url
                              {:headers {"Content-Type" "application/json"}
                               :body (json/generate-string params)})]
      (when (= 200 (:status response))
        (json/parse-string (:body response) true)))
    (catch Exception e
      (println "Telegram API error:" (.getMessage e))
      nil)))

(defn- get-updates
  "Get updates from Telegram (long polling)"
  [token offset timeout]
  (let [result (api-call token "getUpdates"
                         {:offset offset
                          :limit 100
                          :timeout timeout})]
    (when (:ok result)
      (:result result))))

(defn- send-text
  "Send text message to Telegram chat"
  [token chat-id text parse-mode]
  (api-call token "sendMessage"
            (merge {:chat_id chat-id
                    :text text}
                   (when parse-mode
                     {:parse_mode parse-mode}))))

;; ============================================================================
;; Message Parsing
;; ============================================================================

(defn- parse-message
  "Parse Telegram message into standard format"
  [update]
  (when-let [msg (:message update)]
    (let [chat-id (get-in msg [:chat :id])
          user-id (get-in msg [:from :id])
          user-name (or (get-in msg [:from :username])
                        (str (get-in msg [:from :first_name])))
          text (:text msg "")
          timestamp (when (:date msg)
                      (str (Instant/ofEpochSecond (:date msg))))]
      (chatp/make-message :telegram chat-id user-id user-name text timestamp))))

;; ============================================================================
;; Bot State
;; ============================================================================

(defrecord TelegramBot [token offset-atom running-atom handler-atom]
  chatp/ChatAdapter

  (start! [this handler]
    (reset! handler-atom handler)
    (reset! running-atom true)
    (println "◈ Starting Telegram bot...")

    ;; Start polling loop in background
    (future
      (loop []
        (when @running-atom
          (try
            (when-let [updates (get-updates token @offset-atom 30)]
              (doseq [update updates]
                ;; Update offset
                (swap! offset-atom inc)
                (when-let [update-id (:update_id update)]
                  (reset! offset-atom (inc update-id)))

                ;; Parse and handle message
                (when-let [message (parse-message update)]
                  (telemetry/emit! {:event :telegram/message
                                    :chat-id (:message/chat-id message)})
                  (try
                    (@handler-atom message)
                    (catch Exception e
                      (println "Error handling message:" (.getMessage e)))))))

            (catch Exception e
              (println "Telegram polling error:" (.getMessage e))
              (Thread/sleep 5000)))

          (recur))))

    (println "✓ Telegram bot started")
    this)

  (stop! [this]
    (reset! running-atom false)
    (println "✓ Telegram bot stopped")
    this)

  (send-message! [this chat-id text]
    (send-text token chat-id text nil)
    this)

  (send-markdown! [this chat-id text]
    (send-text token chat-id text "Markdown")
    this))

;; ============================================================================
;; Factory
;; ============================================================================

(defn make-bot
  "Create a new Telegram bot instance
   
   Usage: (make-bot \"YOUR_BOT_TOKEN\")"
  [token]
  (->TelegramBot token (atom 0) (atom false) (atom nil)))

(defn get-me
  "Get bot info (test token)"
  [token]
  (api-call token "getMe" {}))

;; ============================================================================
;; REPL
;; ============================================================================

(comment
  ;; Create bot
  (def bot (make-bot "YOUR_BOT_TOKEN"))

  ;; Test token
  (get-me "YOUR_BOT_TOKEN")

  ;; Register and start (requires ouroboros.chat)
  ;; (chat/register-adapter! :telegram bot)
  ;; (chat/start-all!)

  ;; Send message
  (chatp/send-message! bot 123456789 "Hello from Ouroboros!")

  ;; Stop
  ;; (chat/stop-all!)
  )
