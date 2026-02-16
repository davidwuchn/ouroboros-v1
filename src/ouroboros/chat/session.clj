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

;; ============================================================================
;; Context Summarization (Agent Zero Pattern)
;; ============================================================================

(def ^:private context-config
  "Configuration for tiered context management"
  {:recent-count 10   ; Full verbatim
   :medium-count 10   ; Summarized into key points
   :max-history 20})  ; Trigger compression

(defn summarize-messages
  "Summarize a batch of messages into key points.
   Uses heuristics to extract important information."
  [messages]
  (let [user-count (count (filter #(= :user (:role %)) messages))
        assistant-count (count (filter #(= :assistant (:role %)) messages))
        ;; Extract potential decisions (lines with checkmarks or conclusions)
        decisions (->> messages
                       (filter #(= :assistant (:role %)))
                       (map :content)
                       (filter #(or (str/includes? % "✓")
                                    (str/includes? % "decided")
                                    (str/includes? % "conclusion:")
                                    (str/includes? % "Summary:")))
                       (take 3))
        ;; Extract user goals (questions/commands)
        goals (->> messages
                   (filter #(= :user (:role %)))
                   (map :content)
                   (filter #(or (str/starts-with? % "/")
                                (str/includes? % "?")))
                   (take 2))]
    (str "📋 Previous Context (" (count messages) " messages):\n"
         "User messages: " user-count ", Assistant: " assistant-count
         (when (seq goals)
           (str "\nUser goals: " (str/join "; " goals)))
         (when (seq decisions)
           (str "\nKey outcomes: " (str/join "; " decisions))))))

(defn compress-history
  "Tiered compression of chat history.
   - Recent (last 10): Full verbatim
   - Medium (10-20): Summarized into key points
   - Old (>20): Compressed to summary only"
  [history]
  (let [recent-count (:recent-count context-config)
        total (count history)]
    (cond
      ;; Under threshold - keep all
      (<= total (:max-history context-config))
      history

      ;; Medium size - summarize older messages
      :else
      (let [recent (take-last recent-count history)
            to-summarize (drop-last recent-count history)]
        (concat
          [{:role :system
            :content (summarize-messages to-summarize)
            :type :summary
            :timestamp (str (Instant/now))}]
          recent)))))

(defn update-session!
  "Add a message to the session history.
   Automatically compresses history using tiered summarization when over threshold."
  [chat-id role content]
  (swap! chat-sessions update-in [chat-id :history] conj
         {:role role :content content :timestamp (str (Instant/now))})
  ;; Apply compression when over threshold
  (when (> (count (get-in @chat-sessions [chat-id :history]))
           (:max-history context-config))
    (swap! chat-sessions update-in [chat-id :history] compress-history)))

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
;; History Access
;; ============================================================================

(defn get-history
  "Get the full conversation history for a chat-id.
   Returns compressed history with summaries if over threshold."
  [chat-id]
  (get-in @chat-sessions [chat-id :history] []))

(defn get-history-for-display
  "Get history formatted for display (no system summaries)."
  [chat-id]
  (->> (get-history chat-id)
       (remove #(= :summary (:type %)))))

(defn get-history-for-llm
  "Get history formatted for LLM consumption.
   Includes summaries as system messages."
  [chat-id]
  (get-history chat-id))

(defn get-history-stats
  "Get statistics about the chat history."
  [chat-id]
  (let [history (get-history chat-id)
        summaries (filter #(= :summary (:type %)) history)
        user-msgs (filter #(= :user (:role %)) history)
        assistant-msgs (filter #(= :assistant (:role %)) history)]
    {:total-messages (count history)
     :summaries (count summaries)
     :user-messages (count user-msgs)
     :assistant-messages (count assistant-msgs)
     :has-compression? (seq summaries)}))

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