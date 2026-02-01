(ns ouroboros.agent.context-guard
  "Context Window Guard — Prevents token limit crashes
   
   Monitors conversation context size and compacts/summarizes
   when approaching the model's token limit.
   
   Strategy:
   - Track token count incrementally
   - When > threshold: summarize oldest messages
   - Keep N most recent messages verbatim
   - Never lose critical context (system prompt, tool schemas)"
  (:require
   [clojure.string :as str]))

;; ============================================================================
;; Token Estimation
;; ============================================================================

(def ^:private char-per-token 4.0)

(defn estimate-tokens
  "Rough token estimation for a message
   
   Simple heuristic: chars / 4
   More accurate: use tiktoken or model-specific tokenizer"
  [message]
  (let [text (if (string? message)
               message
               (str message))]
    (int (Math/ceil (/ (count text) char-per-token)))))

(defn count-message-tokens
  "Count tokens for a structured message"
  [{:keys [role content tool-calls tool-results]}]
  (+ (estimate-tokens role)
     (estimate-tokens content)
     (estimate-tokens tool-calls)
     (estimate-tokens tool-results)))

(defn count-conversation-tokens
  "Count total tokens in conversation"
  [messages]
  (reduce + (map count-message-tokens messages)))

;; ============================================================================
;; Context Limits by Model
;; ============================================================================

(def model-limits
  "Token limits for common models"
  {:gpt-4o {:total 128000 :reserved 4000}
   :gpt-4o-mini {:total 128000 :reserved 16000}
   :claude-3-5-sonnet {:total 200000 :reserved 8000}
   :claude-3-haiku {:total 200000 :reserved 4000}
   :default {:total 128000 :reserved 4000}})

(defn get-model-limit
  "Get token limit for a model"
  [model]
  (get model-limits model (:default model-limits)))

(defn available-context
  "Calculate available context after reserving output tokens"
  [model]
  (let [{:keys [total reserved]} (get-model-limit model)]
    (- total reserved)))

;; ============================================================================
;; Compaction Strategy
;; ============================================================================

(def ^:dynamic *compaction-threshold* 0.8)
(def ^:dynamic *messages-to-keep* 6)

(defn should-compact?
  "Check if conversation needs compaction"
  [messages model]
  (let [current-tokens (count-conversation-tokens messages)
        available (available-context model)
        threshold (* available *compaction-threshold*)]
    (> current-tokens threshold)))

(defn summarize-messages
  "Summarize a batch of messages into a single summary message
   
   In production: Use LLM to generate actual summary
   For now: Create a placeholder summary"
  [messages]
  (let [user-messages (filter #(= (:role %) :user) messages)
        assistant-messages (filter #(= (:role %) :assistant) messages)
        topic (if (seq user-messages)
                (subs (:content (first user-messages)) 0 (min 50 (count (:content (first user-messages)))))
                "conversation")]
    {:role :system
     :content (str "[SUMMARY] Previous conversation about: " topic "..."
                   " (" (count messages) " messages condensed)")
     :is-summary? true}))

(defn compact-conversation
  "Compact conversation by summarizing old messages
   
   Strategy:
   1. Keep system messages
   2. Keep last N messages verbatim
   3. Summarize middle messages"
  [messages]
  (let [system-messages (filter #(= (:role %) :system) messages)
        non-system (remove #(= (:role %) :system) messages)
        keep-count (min *messages-to-keep* (count non-system))
        recent-messages (take-last keep-count non-system)
        old-messages (drop-last keep-count non-system)]
    (if (seq old-messages)
      (concat system-messages
              [(summarize-messages old-messages)]
              recent-messages)
      messages)))

;; ============================================================================
;; Context Guard API
;; ============================================================================

(defn check-context!
  "Check and compact conversation if needed
   
   Usage:
     (check-context! messages :gpt-4o)
     => {:messages [...] :compacted? true :before 100000 :after 5000}"
  [messages model]
  (let [before-tokens (count-conversation-tokens messages)]
    (if (should-compact? messages model)
      (let [compacted (compact-conversation messages)
            after-tokens (count-conversation-tokens compacted)]
        {:messages compacted
         :compacted? true
         :before before-tokens
         :after after-tokens
         :saved (- before-tokens after-tokens)})
      {:messages messages
       :compacted? false
       :tokens before-tokens})))

(defn force-compact!
  "Force compaction regardless of threshold
   
   Usage: (force-compact! messages)"
  [messages]
  (let [before (count-conversation-tokens messages)
        compacted (compact-conversation messages)
        after (count-conversation-tokens compacted)]
    {:messages compacted
     :before before
     :after after
     :saved (- before after)}))

;; ============================================================================
;; Integration with Agent
;; ============================================================================

(def ^:private conversation-history (atom {}))

(defn register-conversation!
  "Register a conversation for monitoring"
  [conversation-id messages model]
  (swap! conversation-history assoc conversation-id
         {:messages messages
          :model model
          :last-checked (System/currentTimeMillis)}))

(defn update-conversation!
  "Update conversation and check if compaction needed"
  [conversation-id new-messages]
  (if-let [conv (get @conversation-history conversation-id)]
    (let [result (check-context! new-messages (:model conv))]
      (swap! conversation-history assoc conversation-id
             (assoc conv
                    :messages (:messages result)
                    :last-checked (System/currentTimeMillis)))
      result)
    {:error :conversation-not-found}));

(defn get-conversation
  "Get current conversation state"
  [conversation-id]
  (get-in @conversation-history [conversation-id :messages]))

(defn get-stats
  "Get context guard statistics"
  []
  (let [convs @conversation-history]
    {:conversations-monitored (count convs)
     :total-tokens (reduce + (map #(count-conversation-tokens (:messages %))
                                  (vals convs)))}))

(comment
  ;; Test token counting
  (estimate-tokens "Hello world, this is a test message.")

  ;; Test compaction
  (let [messages [{:role :system :content "You are a helpful assistant."}
                  {:role :user :content "Tell me about Clojure"}
                  {:role :assistant :content "Clojure is a Lisp..."}
                  {:role :user :content "What about concurrency?"}
                  {:role :assistant :content "Atoms, refs, agents..."}
                  {:role :user :content "Show me an example"}
                  {:role :assistant :content "Here's some code..."}
                  {:role :user :content "Can you explain refs?"}
                  {:role :assistant :content "Refs are for coordinated..."}]]
    (force-compact! messages)))
