(ns ouroboros.chat.session
  "Chat Session Management

   Manages conversation history and context for chat sessions.
   Each chat-id has its own session with history and metadata.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.chat"
  (:require
   [clojure.string :as str])
  (:import [java.time Instant]))

;; ============================================================================
;; Session State
;; ============================================================================

(defonce chat-sessions (atom {}))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn get-session
  "Get or create a session for a chat-id.
   Initializes with empty history if not exists."
  [chat-id]
  (swap! chat-sessions update chat-id #(or % {:history []
                                              :context {}
                                              :created-at (str (Instant/now))}))
  (get @chat-sessions chat-id))

(defn update-session!
  "Add a message to the session history.
   Automatically trims history to last 10 messages when over 20."
  [chat-id role content]
  (swap! chat-sessions update-in [chat-id :history] conj
         {:role role :content content :timestamp (str (Instant/now))})
  (when (> (count (get-in @chat-sessions [chat-id :history])) 20)
    (swap! chat-sessions update-in [chat-id :history] (partial take-last 10))))

(defn clear-session!
  "Clear the conversation history for a chat-id."
  [chat-id]
  (swap! chat-sessions assoc-in [chat-id :history] [])
  {:status :cleared})

(defn get-session-count
  "Get the number of active chat sessions"
  []
  (count @chat-sessions))

;; ============================================================================
;; Session Context
;; ============================================================================

(defn get-context
  "Get the context map for a chat-id"
  [chat-id]
  (get-in @chat-sessions [chat-id :context] {}))

(defn assoc-context!
  "Associate a key-value pair in the session context"
  [chat-id key value]
  (swap! chat-sessions assoc-in [chat-id :context key] value))

(defn dissoc-context!
  "Remove a key from the session context"
  [chat-id key]
  (swap! chat-sessions update-in [chat-id :context] dissoc key))

(defn update-context!
  "Update the session context using a function"
  [chat-id f & args]
  (apply swap! chat-sessions update-in [chat-id :context] f args))

;; ============================================================================
;; Mode Checkers
;; ============================================================================

(defn in-mode?
  "Check if a chat session is in a specific mode"
  [chat-id mode-key]
  (get-in @chat-sessions [chat-id :context mode-key]))

(defn get-session-atom
  "Get the raw sessions atom (for internal use and testing)"
  []
  chat-sessions)

(defn get-sessions-snapshot
  "Get a snapshot of all sessions (for resolvers)"
  []
  @chat-sessions)