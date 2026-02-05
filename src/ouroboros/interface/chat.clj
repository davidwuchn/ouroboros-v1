(ns ouroboros.interface.chat
  "Chat interface - Chat Platform Integration
   
   Supports: Telegram, Discord, Slack"
  (:require
   [ouroboros.chat :as chat]
   [ouroboros.chat.adapters :as adapters]))

(defn chat-adapters
  "List registered chat adapters
   
   Usage: (chat-adapters)"
  []
  (chat/list-chat-tools))

(defn chat-start!
  "Start all chat adapters
   
   Usage: (chat-start!)"
  []
  (chat/start-all!))

(defn chat-stop!
  "Stop all chat adapters
   
   Usage: (chat-stop!)"
  []
  (chat/stop-all!))

(defn chat-register-telegram!
  "Register Telegram bot
   
   Usage: (chat-register-telegram! \"YOUR_BOT_TOKEN\")"
  [token]
  (let [bot (adapters/telegram-bot token)]
    (chat/register-adapter! :telegram bot)
    {:status :registered :platform :telegram}))

(defn chat-register-slack!
  "Register Slack bot
   
   Usage: (chat-register-slack! \"xapp-...\" \"xoxb-...\")"
  [app-token bot-token]
  (let [bot (adapters/slack-bot app-token bot-token)]
    (chat/register-adapter! :slack bot)
    {:status :registered :platform :slack}))

(defn chat-register-discord!
  "Register Discord bot
   
   Usage: (chat-register-discord! \"YOUR_BOT_TOKEN\")"
  [token]
  (let [bot (adapters/discord-bot token)]
    (chat/register-adapter! :discord bot)
    {:status :registered :platform :discord}))

(defn chat-sessions
  "Get active chat sessions
   
   Usage: (chat-sessions)"
  []
  (keys @chat/chat-sessions))

(defn chat-clear-session!
  "Clear a chat session
   
   Usage: (chat-clear-session! chat-id)"
  [chat-id]
  (chat/clear-session! chat-id))
