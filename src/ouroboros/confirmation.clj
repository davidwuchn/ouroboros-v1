(ns ouroboros.confirmation
  "Human-in-the-loop confirmation system for destructive operations

   Core principle: Dangerous operations require explicit human approval.

   Dangerous tools:
   - :file/write, :file/delete - File system modifications
   - :shell/exec, :shell/script - Command execution
   - :memory/clear, :memory/delete - Data destruction
   - :system/shutdown - System control

   Usage:
     ;; Request confirmation before executing dangerous tool
     (confirmation/request! :session-123 :file/write {:path \"config.edn\" :content \"...\"})

     ;; Check if confirmation is pending
     (confirmation/pending? :session-123)

     ;; Approve or deny pending confirmation
     (confirmation/approve! :session-123)
     (confirmation/deny! :session-123 \"User declined\")"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Dangerous Tool Detection
;; ============================================================================

(def dangerous-tools
  "Tools that require explicit confirmation before execution"
  #{:file/write
    :file/delete
    :shell/exec
    :shell/script
    :memory/clear
    :memory/delete
    :system/shutdown})

(defn dangerous-tool?
  "Check if a tool requires confirmation"
  [tool]
  (contains? dangerous-tools (keyword tool)))

(defn tool-description
  "Get human-readable description of what the tool does"
  [tool arguments]
  (case (keyword tool)
    :file/write (str "Write to file: " (:path arguments))
    :file/delete (str "Delete file: " (:path arguments))
    :shell/exec (str "Execute command: " (:command arguments))
    :shell/script (str "Execute script: " (str/join " " (take 3 (:args arguments))) "...")
    :memory/clear "Clear all memory"
    :memory/delete (str "Delete memory key: " (:key arguments))
    :system/shutdown "Shutdown the system"
    (str "Execute " (name tool))))

;; ============================================================================
;; Confirmation Registry
;; ============================================================================

;; Map of session IDs to pending confirmations
(defonce ^:private confirmation-registry (atom {}))

;; Map of session IDs to confirmation history
(defonce ^:private confirmation-history (atom {}))

(def ^:private max-history-per-session 100)

(defn- generate-confirmation-id
  "Generate unique confirmation ID"
  []
  (str (java.util.UUID/randomUUID)))

(defn- log-confirmation!
  "Log confirmation event to history"
  [session-id event]
  (swap! confirmation-history
         update session-id
         (fn [history]
           (take max-history-per-session
                 (cons (assoc event
                              :timestamp (System/currentTimeMillis)
                              :confirmation-id (generate-confirmation-id))
                       (or history []))))))

;; ============================================================================
;; Confirmation Management
;; ============================================================================

(defn request!
  "Request confirmation for a dangerous operation

   Returns:
   - {:status :pending :confirmation-id id :description desc} if confirmation needed
   - {:status :auto-approved :reason reason} if auto-approved (e.g., in trusted context)
   - {:status :blocked :reason reason} if operation blocked by policy"
  [session-id tool arguments & {:keys [auto-approve? timeout-ms]
                                 :or {auto-approve? false
                                      timeout-ms 300000}}] ; 5 minute default
  (if (dangerous-tool? tool)
    (if auto-approve?
      ;; Auto-approve in trusted contexts
      (do
        (telemetry/emit! {:event :confirmation/auto-approved
                          :session session-id
                          :tool tool})
        {:status :auto-approved
         :reason "Trusted context"
         :tool tool})
      ;; Require confirmation
      (let [confirmation-id (generate-confirmation-id)
            description (tool-description tool arguments)]
        (swap! confirmation-registry
               assoc session-id
               {:confirmation-id confirmation-id
                :tool tool
                :arguments arguments
                :description description
                :requested-at (System/currentTimeMillis)
                :timeout-ms timeout-ms
                :status :pending})
        (log-confirmation! session-id
                           {:event :confirmation/requested
                            :tool tool
                            :description description})
        (telemetry/emit! {:event :confirmation/requested
                          :session session-id
                          :tool tool
                          :confirmation-id confirmation-id})
        {:status :pending
         :confirmation-id confirmation-id
         :description description
         :tool tool
         :arguments arguments}))
    ;; Not a dangerous tool
    {:status :not-required
     :tool tool}))

(defn pending?
  "Check if there's a pending confirmation for a session"
  [session-id]
  (when-let [confirmation (get @confirmation-registry session-id)]
    (and (= :pending (:status confirmation))
         (let [elapsed (- (System/currentTimeMillis) (:requested-at confirmation))
               timeout (:timeout-ms confirmation 300000)]
           (< elapsed timeout)))))

(defn get-pending
  "Get pending confirmation details for a session"
  [session-id]
  (when (pending? session-id)
    (get @confirmation-registry session-id)))

(defn approve!
  "Approve a pending confirmation

   Returns:
   - {:status :approved :tool tool :arguments args} on success
   - {:status :error :reason reason} if no pending confirmation"
  [session-id & {:keys [approved-by]}]
  (if-let [confirmation (get @confirmation-registry session-id)]
    (if (= :pending (:status confirmation))
      (let [approved-confirmation (assoc confirmation
                                         :status :approved
                                         :approved-at (System/currentTimeMillis)
                                         :approved-by approved-by)]
        (swap! confirmation-registry assoc session-id approved-confirmation)
        (log-confirmation! session-id
                           {:event :confirmation/approved
                            :tool (:tool confirmation)
                            :approved-by approved-by})
        (telemetry/emit! {:event :confirmation/approved
                          :session session-id
                          :tool (:tool confirmation)
                          :approved-by approved-by})
        {:status :approved
         :tool (:tool confirmation)
         :arguments (:arguments confirmation)})
      {:status :error
       :reason (str "Confirmation already " (name (:status confirmation)))})
    {:status :error
     :reason "No pending confirmation found"}))

(defn deny!
  "Deny a pending confirmation

   Returns:
   - {:status :denied :tool tool} on success
   - {:status :error :reason reason} if no pending confirmation"
  [session-id reason & {:keys [denied-by]}]
  (if-let [confirmation (get @confirmation-registry session-id)]
    (if (= :pending (:status confirmation))
      (let [denied-confirmation (assoc confirmation
                                       :status :denied
                                       :denied-at (System/currentTimeMillis)
                                       :denied-by denied-by
                                       :denial-reason reason)]
        (swap! confirmation-registry assoc session-id denied-confirmation)
        (log-confirmation! session-id
                           {:event :confirmation/denied
                            :tool (:tool confirmation)
                            :reason reason
                            :denied-by denied-by})
        (telemetry/emit! {:event :confirmation/denied
                          :session session-id
                          :tool (:tool confirmation)
                          :reason reason
                          :denied-by denied-by})
        {:status :denied
         :tool (:tool confirmation)
         :reason reason})
      {:status :error
       :reason (str "Confirmation already " (name (:status confirmation)))})
    {:status :error
     :reason "No pending confirmation found"}))

(defn cancel!
  "Cancel a pending confirmation (e.g., timeout, session end)"
  [session-id reason]
  (if-let [confirmation (get @confirmation-registry session-id)]
    (do
      (swap! confirmation-registry dissoc session-id)
      (log-confirmation! session-id
                         {:event :confirmation/cancelled
                          :tool (:tool confirmation)
                          :reason reason})
      (telemetry/emit! {:event :confirmation/cancelled
                        :session session-id
                        :tool (:tool confirmation)
                        :reason reason})
      {:status :cancelled
       :tool (:tool confirmation)})
    {:status :error
     :reason "No pending confirmation found"}))

;; ============================================================================
;; Execution with Confirmation
;; ============================================================================

(defn execute-with-confirmation
  "Execute a tool with confirmation check

   This is the main entry point for executing dangerous tools.
   It checks for confirmation and either:
   1. Returns {:status :pending} if confirmation needed
   2. Executes the tool if already approved
   3. Returns error if denied or expired

   Usage:
     (execute-with-confirmation :session-123 :file/write {:path \"test.txt\"}
       (fn [tool args] (actual-execution tool args)))"
  [session-id tool arguments execution-fn]
  (cond
    ;; Check if there's already a pending confirmation for this tool
    (and (pending? session-id)
         (let [pending (get-pending session-id)]
           (and (= tool (:tool pending))
                (= arguments (:arguments pending)))))
    {:status :pending
     :confirmation-id (:confirmation-id (get-pending session-id))
     :description (:description (get-pending session-id))}

    ;; Check if this was already approved
    (and (get @confirmation-registry session-id)
         (= :approved (get-in @confirmation-registry [session-id :status]))
         (= tool (get-in @confirmation-registry [session-id :tool])))
    (let [confirmation (get @confirmation-registry session-id)]
      ;; Clear the confirmation after use (one-time approval)
      (swap! confirmation-registry dissoc session-id)
      ;; Execute the tool
      (try
        (let [result (execution-fn tool (:arguments confirmation))]
          (telemetry/emit! {:event :confirmation/executed
                            :session session-id
                            :tool tool
                            :success? true})
          {:status :executed
           :result result})
        (catch Exception e
          (telemetry/emit! {:event :confirmation/execution-failed
                            :session session-id
                            :tool tool
                            :error (.getMessage e)})
          {:status :error
           :reason (.getMessage e)})))

    ;; New request - require confirmation
    (dangerous-tool? tool)
    (request! session-id tool arguments)

    ;; Not dangerous - execute directly
    :else
    (try
      (let [result (execution-fn tool arguments)]
        {:status :executed
         :result result})
      (catch Exception e
        {:status :error
         :reason (.getMessage e)}))))

;; ============================================================================
;; Session Cleanup
;; ============================================================================

(defn clear-session!
  "Clear all confirmations for a session"
  [session-id]
  (swap! confirmation-registry dissoc session-id)
  (telemetry/emit! {:event :confirmation/session-cleared
                    :session session-id}))

(defn cleanup-expired!
  "Remove expired confirmations across all sessions"
  []
  (let [now (System/currentTimeMillis)]
    (doseq [[session-id confirmation] @confirmation-registry]
      (when (and (= :pending (:status confirmation))
                 (let [elapsed (- now (:requested-at confirmation))
                       timeout (:timeout-ms confirmation 300000)]
                   (>= elapsed timeout)))
        (cancel! session-id "Confirmation timeout")))))

;; ============================================================================
;; Audit & Reporting
;; ============================================================================

(defn get-history
  "Get confirmation history for a session"
  [session-id & {:keys [limit]
                  :or {limit 50}}]
  (take limit (get @confirmation-history session-id [])))

(defn stats
  "Get confirmation system statistics"
  []
  (let [confirmations (vals @confirmation-registry)
        history (apply concat (vals @confirmation-history))]
    {:pending-count (count (filter #(= :pending (:status %)) confirmations))
     :total-pending (count confirmations)
     :total-history (count history)
     :approval-rate (if (seq history)
                      (let [decisions (filter #(#{:approved :denied} (:event %)) history)
                            approvals (count (filter #(= :confirmation/approved (:event %)) decisions))]
                        (if (seq decisions)
                          (/ approvals (count decisions))
                          0))
                      0)}))

(defn security-report
  "Generate security report for confirmations"
  []
  (let [pending (filter #(= :pending (:status (val %))) @confirmation-registry)]
    {:pending-confirmations (count pending)
     :sessions-with-pending (mapv first pending)
     :dangerous-tools dangerous-tools
     :stats (stats)}))

(comment
  ;; Request confirmation
  (request! :test-session :file/write {:path "test.txt" :content "Hello"})

  ;; Check status
  (pending? :test-session)
  (get-pending :test-session)

  ;; Approve or deny
  (approve! :test-session :approved-by "admin")
  ;; (deny! :test-session "Too risky" :denied-by "admin")

  ;; Execute with confirmation flow
  (execute-with-confirmation :test-session :file/write {:path "test.txt"}
    (fn [tool args] {:executed true :tool tool :args args}))

  ;; Cleanup
  (clear-session! :test-session)
  (cleanup-expired!)

  ;; Reports
  (stats)
  (security-report))
