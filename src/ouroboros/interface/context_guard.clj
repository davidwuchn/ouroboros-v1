(ns ouroboros.interface.context-guard
  "Context guard interface — Prevent token limit crashes"
  (:require
   [ouroboros.agent.context-guard :as context-guard]))

(defn context-check!
  "Check and compact conversation if needed
   
   Usage:
     (context-check! messages :gpt-4o)
     => {:messages [...] :compacted? true :before 100000 :after 5000}"
  [messages model]
  (context-guard/check-context! messages model))

(defn context-force-compact!
  "Force compaction regardless of threshold
   
   Usage: (context-force-compact! messages)"
  [messages]
  (context-guard/force-compact! messages))

(defn context-count-tokens
  "Count tokens in conversation
   
   Usage: (context-count-tokens messages)"
  [messages]
  (context-guard/count-conversation-tokens messages))

(defn context-register!
  "Register a conversation for monitoring
   
   Usage: (context-register! :conv-123 messages :gpt-4o)"
  [conversation-id messages model]
  (context-guard/register-conversation! conversation-id messages model))

(defn context-update!
  "Update conversation and check if compaction needed
   
   Usage: (context-update! :conv-123 new-messages)"
  [conversation-id new-messages]
  (context-guard/update-conversation! conversation-id new-messages))

(defn context-stats
  "Get context guard statistics
   
   Usage: (context-stats)"
  []
  (context-guard/get-stats))
