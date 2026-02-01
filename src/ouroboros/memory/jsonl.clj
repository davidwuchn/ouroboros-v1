(ns ouroboros.memory.jsonl
  "JSONL Session Transcripts — Persistent conversation history
   
   Each session gets a .jsonl file where each line is a JSON object:
   {:timestamp \"2026-02-01T09:00:00Z\"
    :role :user|:assistant|:system|:tool
    :content \"message text\"
    :tool-calls [...]
    :tool-results [...]
    :metadata {...}}"
  (:require
   [clojure.java.io :as io]
   [clojure.data.json :as json]
   [clojure.string :as str]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def ^:private memory-dir "memory")

(defn- ensure-memory-dir!
  []
  (let [dir (io/file memory-dir)]
    (when-not (.exists dir)
      (.mkdirs dir))))

(defn- session-file-path
  "Get path to session's JSONL file"
  [session-id]
  (str memory-dir "/" (name session-id) ".jsonl"))

;; ============================================================================
;; Core Operations
;; ============================================================================

(defn append-message!
  "Append a message to session transcript
   
   Usage:
     (append-message! :session-123
       {:role :user
        :content \"Hello\"
        :timestamp (java.time.Instant/now)})"
  [session-id message]
  (ensure-memory-dir!)
  (let [file-path (session-file-path session-id)
        line (json/write-str message)]
    (spit file-path (str line "\n") :append true)
    message))

(defn read-transcript
  "Read all messages from session transcript
   
   Usage: (read-transcript :session-123)"
  [session-id]
  (let [file-path (session-file-path session-id)
        file (io/file file-path)]
    (if (.exists file)
      (with-open [reader (io/reader file)]
        (->> (line-seq reader)
             (remove str/blank?)
             (map #(json/read-str % :key-fn keyword))
             vec))
      [])))

(defn read-transcript-since
  "Read messages since a specific timestamp
   
   Usage: (read-transcript-since :session-123 \"2026-02-01T00:00:00Z\")"
  [session-id since-timestamp]
  (->> (read-transcript session-id)
       (filter #(pos? (compare (:timestamp %) since-timestamp)))))

(defn read-transcript-last-n
  "Read last N messages from transcript
   
   Usage: (read-transcript-last-n :session-123 10)"
  [session-id n]
  (-> (read-transcript session-id)
      (as-> msgs (take-last n msgs))
      vec))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn list-sessions
  "List all session IDs with transcripts
   
   Usage: (list-sessions)"
  []
  (ensure-memory-dir!)
  (->> (file-seq (io/file memory-dir))
       (filter #(str/ends-with? (.getName %) ".jsonl"))
       (map #(-> (.getName %)
                 (str/replace ".jsonl" "")
                 keyword))
       vec))

(defn session-exists?
  "Check if session has a transcript"
  [session-id]
  (.exists (io/file (session-file-path session-id))))

(defn delete-session!
  "Delete a session transcript
   
   Usage: (delete-session! :session-123)"
  [session-id]
  (let [file (io/file (session-file-path session-id))]
    (when (.exists file)
      (.delete file))
    session-id))

(defn clear-all-sessions!
  "Delete all session transcripts
   
   DANGER: Irreversible!"
  []
  (doseq [session (list-sessions)]
    (delete-session! session))
  :cleared)

;; ============================================================================
;; Summary Generation
;; ============================================================================

(defn write-summary!
  "Write conversation summary to markdown file
   
   Usage:
     (write-summary! :session-123
       \"# Conversation Summary\\n\\nKey points: ...\")"
  [session-id summary-content]
  (ensure-memory-dir!)
  (let [summary-path (str memory-dir "/" (name session-id) ".summary.md")]
    (spit summary-path summary-content)
    summary-path))

(defn read-summary
  "Read conversation summary if exists
   
   Usage: (read-summary :session-123)"
  [session-id]
  (let [summary-path (str memory-dir "/" (name session-id) ".summary.md")
        file (io/file summary-path)]
    (when (.exists file)
      (slurp summary-path))))

(defn get-session-info
  "Get comprehensive session info
   
   Usage: (get-session-info :session-123)"
  [session-id]
  (let [transcript (read-transcript session-id)
        summary (read-summary session-id)]
    {:session/id session-id
     :session/message-count (count transcript)
     :session/first-message (:timestamp (first transcript))
     :session/last-message (:timestamp (last transcript))
     :session/has-summary? (some? summary)
     :session/summary summary
     :session/messages (take-last 5 transcript)}))

(comment
  ;; Test JSONL operations
  (append-message! :test-session
                   {:role :user
                    :content "Hello, how are you?"
                    :timestamp (str (java.time.Instant/now))})

  (append-message! :test-session
                   {:role :assistant
                    :content "I'm doing well, thank you!"
                    :timestamp (str (java.time.Instant/now))})

  (read-transcript :test-session)
  (read-transcript-last-n :test-session 1)
  (get-session-info :test-session)

  ;; Cleanup
  (delete-session! :test-session))
