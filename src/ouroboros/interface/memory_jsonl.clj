(ns ouroboros.interface.memory-jsonl
  "JSONL transcript interface — Session persistence"
  (:require
   [ouroboros.memory.jsonl :as jsonl]))

(defn transcript-append!
  "Append a message to session transcript
   
   Usage:
     (transcript-append! :session-123
       {:role :user
        :content \"Hello\"
        :timestamp (str (java.time.Instant/now))})"
  [session-id message]
  (jsonl/append-message! session-id message))

(defn transcript-read
  "Read all messages from session
   
   Usage: (transcript-read :session-123)"
  [session-id]
  (jsonl/read-transcript session-id))

(defn transcript-last-n
  "Read last N messages
   
   Usage: (transcript-last-n :session-123 10)"
  [session-id n]
  (jsonl/read-transcript-last-n session-id n))

(defn transcript-since
  "Read messages since timestamp
   
   Usage: (transcript-since :session-123 \"2026-02-01T00:00:00Z\")"
  [session-id since-timestamp]
  (jsonl/read-transcript-since session-id since-timestamp))

(defn transcript-list
  "List all sessions with transcripts
   
   Usage: (transcript-list)"
  []
  (jsonl/list-sessions))

(defn transcript-delete!
  "Delete a session transcript
   
   Usage: (transcript-delete! :session-123)"
  [session-id]
  (jsonl/delete-session! session-id))

(defn transcript-info
  "Get session info with summary
   
   Usage: (transcript-info :session-123)"
  [session-id]
  (jsonl/get-session-info session-id))

(defn summary-write!
  "Write conversation summary
   
   Usage: (summary-write! :session-123 \"# Summary\\n\\nKey points...\")"
  [session-id summary-content]
  (jsonl/write-summary! session-id summary-content))

(defn summary-read
  "Read conversation summary
   
   Usage: (summary-read :session-123)"
  [session-id]
  (jsonl/read-summary session-id))
