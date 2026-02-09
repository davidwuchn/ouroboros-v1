(ns ouroboros.chat.protocol
  "ChatAdapter Protocol - Decouples chat adapters from chat core

   This protocol is defined in its own namespace to break the cycle:
   chat.telegram needs ChatAdapter but shouldn't require all of chat.
   
   Usage:
     (require '[ouroboros.chat.protocol :as chatp])
     (defrecord MyAdapter [] chatp/ChatAdapter ...)
     (chatp/send-message! adapter chat-id text)"
  (:import [java.time Instant]))

(defprotocol ChatAdapter
  "Protocol for chat platform adapters"
  (start! [this handler]
    "Start listening for messages, call handler on each message")
  (stop! [this]
    "Stop listening")
  (send-message! [this chat-id text]
    "Send a text message to a chat. Returns platform message-id for editing.")
  (send-markdown! [this chat-id text]
    "Send a markdown-formatted message. Returns platform message-id for editing."))

(defprotocol EditableAdapter
  "Protocol for adapters that support editing sent messages.
   Separate from ChatAdapter for backward compatibility - adapters
   that don't support editing will simply not implement this."
  (edit-message! [this chat-id message-id text]
    "Edit a previously sent message. message-id is the platform-specific
     identifier returned by send-message! or send-markdown!."))

(defn supports-edit?
  "Check if an adapter supports message editing"
  [adapter]
  (satisfies? EditableAdapter adapter))

(defn make-message
  "Create a standardized message map
   
   Used by adapters to create consistent message structures."
  [platform chat-id user-id user-name text timestamp]
  {:message/id (str (java.util.UUID/randomUUID))
   :message/platform platform
   :message/chat-id chat-id
   :message/user-id user-id
   :message/user-name user-name
   :message/text text
   :message/timestamp (or timestamp (str (Instant/now)))})
