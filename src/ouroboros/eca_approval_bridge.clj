(ns ouroboros.eca_approval_bridge
  "ECA Tool Approval Bridge - Connects ECA tool calls to confirmation system

   Flow:
   ```
   ECA sends chat/toolCallApprove
           │
           ▼
   Parse tool call, check danger level
           │
           ├── Safe ──────────────────► Auto-approve
           │
           └── Dangerous ─────────────► Register confirmation
                                        │
                                        ▼
                                   Forward to chat
                                        │
                                        ▼
                                   User approves/denies
                                        │
                                        ▼
                                   Send to ECA (approve/reject)
   ```

   Core principle: Dangerous operations require explicit human approval.
   Dangerous tools: file/write, file/delete, shell/exec, memory/clear, etc."
  (:require
   [clojure.string :as str]
   [ouroboros.confirmation :as confirmation]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.eca-client :as eca-client]
   [ouroboros.educational-approval :as edu]))

;; Forward declarations
(declare forward-to-chat-platform!
         handle-tool-call-approve
         handle-tool-call-reject)

;; ============================================================================
;; State
;; ============================================================================

(defonce ^:private state
  (atom {:eca-to-confirmation-id {}  ; Map ECA request ID → confirmation ID
         :confirmation-to-eca {}     ; Map confirmation ID → ECA request ID
         :adapter nil                ; Chat adapter for forwarding
         :active-sessions #{}        ; Set of active chat session IDs
         :session-users {}           ; Map chat-id → user-id (for learning attribution)
         :pending-approvals {}       ; Track approvals in flight
         :timeout-ms 120000          ; 2 minute default timeout
         :eca-callbacks-registered? false}))

;; ============================================================================
;; State Management
;; ============================================================================

(defn reset-bridge-state!
  "Reset bridge state for tests"
  []
  (reset! state {:eca-to-confirmation-id {}
                 :confirmation-to-eca {}
                 :adapter nil
                 :active-sessions #{}
                 :session-users {}
                 :pending-approvals {}
                 :timeout-ms 120000
                 :eca-callbacks-registered? false})
  nil)

;; ============================================================================
;; ECA Callback Registration
;; ============================================================================

(defn- handle-eca-tool-call-approve [notification]
  "Handle incoming tool call approval request from ECA"
  (handle-tool-call-approve notification))

(defn- handle-eca-tool-call-reject [notification]
  "Handle incoming tool call rejection from ECA"
  (handle-tool-call-reject notification))

(defn register-eca-callbacks!
  "Register callbacks with ECA client to receive tool approval requests.
   Must be called after ECA client is started."
  []
  (eca-client/register-callback! "chat/toolCallApprove" :approval-bridge handle-eca-tool-call-approve)
  (eca-client/register-callback! "chat/toolCallReject" :approval-bridge handle-eca-tool-call-reject)
  (swap! state assoc :eca-callbacks-registered? true)
  nil)

(defn unregister-eca-callbacks!
  "Unregister callbacks from ECA client."
  []
  (eca-client/unregister-callback! "chat/toolCallApprove" :approval-bridge)
  (eca-client/unregister-callback! "chat/toolCallReject" :approval-bridge)
  (swap! state assoc :eca-callbacks-registered? false)
  nil)

;; ============================================================================
;; Tool Danger Classification
;; ============================================================================

(def eca-dangerous-tools
  "ECA tools that require confirmation (ECA-specific naming)"
  #{"file/write"
    "file/delete"
    "file/rename"
    "shell/exec"
    "shell/script"
    "bash"
    "cmd"
    "memory/clear"
    "memory/delete"
    "system/shutdown"
    "system/reboot"})

(def eca-safe-tools
  "Tools that are auto-approved"
  #{"file/read"
    "file/search"
    "file/list"
    "grep"
    "find"
    "view"
    "read"
    "get"
    "info"
    "status"
    "list"})

(defn eca-tool-danger-level
  "Classify danger level of ECA tool call

   Returns: :safe | :confirmation-required | :blocked"
  [tool-name]
  (let [tool (str/lower-case tool-name)]
    (cond
      ;; Explicitly blocked tools
      (str/includes? tool "sudo") :blocked
      (str/includes? tool "rm -rf") :blocked
      (str/includes? tool "format") :blocked
      ;; Dangerous tools
      (some #{tool} eca-dangerous-tools) :confirmation-required
      ;; Check patterns
      (and (str/includes? tool "exec")
           (not (str/includes? tool "read"))) :confirmation-required
      (and (str/includes? tool "write")
           (not (str/includes? tool "read"))) :confirmation-required
      ;; Safe tools
      :else :safe)))

(defn eca-tool-description
  "Generate human-readable description of ECA tool call"
  [tool-name arguments]
  (let [tool (str/lower-case tool-name)]
    (cond
      (str/includes? tool "file/write") (str "Write file: " (get arguments :path "unknown"))
      (str/includes? tool "file/delete") (str "Delete file: " (get arguments :path "unknown"))
      (str/includes? tool "file/rename") (str "Rename: " (get arguments :from "unknown") " → " (get arguments :to "unknown"))
      (str/includes? tool "shell/exec") (str "Execute: " (get arguments :command "unknown"))
      (str/includes? tool "bash") (str "Bash: " (get arguments :code "unknown"))
      (str/includes? tool "cmd") (str "Cmd: " (get arguments :code "unknown"))
      (str/includes? tool "memory/clear") "Clear all memory"
      (str/includes? tool "memory/delete") (str "Delete memory: " (get arguments :key "unknown"))
      (str/includes? tool "system/shutdown") "Shutdown system"
      (str/includes? tool "system/reboot") "Reboot system"
      :else (str "Execute " tool-name))))

;; ============================================================================
;; ECA Notification Handlers
;; ============================================================================

(defn handle-tool-call-approve
  "Handle incoming chat/toolCallApprove from ECA

   This is called when ECA needs user approval for a dangerous tool.

   Flow:
   1. Parse tool call from ECA
   2. Classify danger level
   3. Auto-approve safe tools
   4. Register confirmation for dangerous tools
   5. Forward to chat platform for user approval"
  [eca-notification]
  (let [eca-id (get eca-notification :id (str (java.util.UUID/randomUUID)))
        tool-call (get eca-notification :tool {})
        tool-name (get tool-call :name)
        arguments (get tool-call :arguments {})
        danger-level (eca-tool-danger-level tool-name)]

    (telemetry/emit! {:event :eca-approval/received-tool-call
                      :eca-id eca-id
                      :tool tool-name
                      :danger-level danger-level})

    (case danger-level
      ;; Auto-approve safe tools
      :safe
      (do
        (telemetry/emit! {:event :eca-approval/auto-approved-safe
                          :tool tool-name})
        {:status :auto-approved
         :eca-id eca-id
         :tool tool-name})

      ;; Blocked tools
      :blocked
      (do
        (telemetry/emit! {:event :eca-approval/blocked-tool
                          :tool tool-name})
        {:status :blocked
         :eca-id eca-id
         :tool tool-name
         :reason "Tool is blocked by security policy"})

      ;; Require confirmation
      :confirmation-required
      (let [description (eca-tool-description tool-name arguments)
            confirmation-id (str "eca-" eca-id)
            timeout-ms (:timeout-ms @state 120000)]

        ;; Register with confirmation system
        (swap! state assoc-in [:eca-to-confirmation-id eca-id] confirmation-id)
        (swap! state assoc-in [:confirmation-to-eca confirmation-id] eca-id)

        ;; Register confirmation request
        (swap! state assoc-in [:pending-approvals confirmation-id]
               {:eca-id eca-id
                :tool tool-name
                :arguments arguments
                :description description
                :requested-at (System/currentTimeMillis)
                :timeout-ms timeout-ms
                :status :pending})

        ;; Forward to chat platform
        (forward-to-chat-platform! confirmation-id description tool-name arguments)

        (telemetry/emit! {:event :eca-approval/confirmation-required
                          :eca-id eca-id
                          :confirmation-id confirmation-id
                          :tool tool-name
                          :description description})

        {:status :pending-confirmation
         :eca-id eca-id
         :confirmation-id confirmation-id
         :description description}))))

(defn handle-tool-call-reject
  "Handle incoming chat/toolCallReject from ECA (user rejected on ECA side)

   Cancels any pending Ouroboros confirmation."
  [eca-notification]
  (let [eca-id (get eca-notification :id)
        confirmation-id (get-in @state [:eca-to-confirmation-id eca-id])]

    (when confirmation-id
      (confirmation/cancel! confirmation-id "ECA rejected")
      (swap! state update :eca-to-confirmation-id dissoc eca-id)
      (swap! state update :confirmation-to-eca dissoc confirmation-id)
      (swap! state update :pending-approvals dissoc confirmation-id)

      (telemetry/emit! {:event :eca-approval/eca-rejected
                        :eca-id eca-id
                        :confirmation-id confirmation-id})))

  {:status :cancelled})

;; ============================================================================
;; Chat Platform Integration
;; ============================================================================

(defn set-adapter!
  "Set the chat adapter for forwarding approval requests"
  [adapter]
  (swap! state assoc :adapter adapter)
  (when-not (:eca-callbacks-registered? @state)
    (register-eca-callbacks!)))

(defn register-session!
  "Register an active chat session for approval forwarding

   Usage: (register-session! chat-id)
          (register-session! chat-id user-id) - with user attribution"
  ([chat-id]
   (register-session! chat-id nil))
  ([chat-id user-id]
   (swap! state update :active-sessions conj chat-id)
   (when user-id
     (swap! state assoc-in [:session-users chat-id] user-id))
   (telemetry/emit! {:event :eca-approval/session-registered :chat-id chat-id :user-id user-id})))

(defn unregister-session!
  "Unregister a chat session

   Usage: (unregister-session! chat-id)"
  [chat-id]
  (swap! state update :active-sessions disj chat-id)
  (swap! state update :session-users dissoc chat-id)
  (telemetry/emit! {:event :eca-approval/session-unregistered :chat-id chat-id}))

(defn forward-to-chat-platform!
  "Forward approval request to chat platform with educational content

   Sends an educational message to all active chat sessions asking for confirmation.
   Includes risk assessment, best practices, and learning opportunities."
  [confirmation-id _description tool-name arguments]
  (let [adapter (:adapter @state)
        active-sessions (:active-sessions @state)
        ;; Get educational enhancement
        enhanced (edu/enhance-approval-message tool-name arguments)
        ;; Replace {id} placeholder with actual confirmation ID
        message (str/replace (:message enhanced) "{id}" confirmation-id)]
    (when adapter
      (if (seq active-sessions)
        ;; Forward to all active chat sessions
        (do
          (telemetry/emit! {:event :eca-approval/forwarding-to-chat
                            :confirmation-id confirmation-id
                            :tool tool-name
                            :risk (:risk enhanced)
                            :learning-opportunity (:learning-opportunity enhanced)
                            :session-count (count active-sessions)})

          ;; Use adapter's forward-approval-request method
          (when-let [forward-fn (:forward-approval-request adapter)]
            (try
              (forward-fn confirmation-id message tool-name arguments)
              (catch Exception e
                (telemetry/emit! {:event :eca-approval/send-error
                                  :error (.getMessage e)}))))

          ;; Create learning opportunity for user
          ;; Use first active session's user, or "unknown-user" if not tracked
          (let [first-session (first active-sessions)
                user-id (get-in @state [:session-users first-session] "unknown-user")
                learning (edu/create-learning-from-approval
                          user-id
                          tool-name
                          arguments
                          (:risk enhanced))]
            (telemetry/emit! {:event :educational-approval/learning-created
                              :confirmation-id confirmation-id
                              :tool tool-name
                              :user-id user-id
                              :learning-title (:title learning)})))

        ;; No active sessions - log warning
        (do
          (telemetry/emit! {:event :eca-approval/no-active-sessions
                            :confirmation-id confirmation-id
                            :tool tool-name})
          (println "⚠️  No active chat sessions to forward approval request")
          (println "    Confirmation ID:" confirmation-id)
          (println "    Tool:" tool-name))))))

;; ============================================================================
;; Approval Callback (from chat system)
;; ============================================================================

(defn approve-confirmation!
  "Handle approval from chat platform (via /confirm command)

   This is called when a user approves via chat command.

   Usage: (approve-confirmation! \"eca-123\" \"admin\")"
  [confirmation-id approved-by]
  (let [eca-id (get-in @state [:confirmation-to-eca confirmation-id])
        approval (get-in @state [:pending-approvals confirmation-id])]

    (if (and eca-id approval)
      (do
        ;; Mark confirmation as approved
        (swap! state assoc-in [:pending-approvals confirmation-id :status] :approved)
        (swap! state assoc-in [:pending-approvals confirmation-id :approved-by] approved-by)

        (telemetry/emit! {:event :eca-approval/approved
                          :eca-id eca-id
                          :confirmation-id confirmation-id
                          :tool (:tool approval)
                          :approved-by approved-by})

        ;; Send approval back to ECA via eca-client
        (try
          (eca-client/approve-tool! {:tool (:tool approval)
                                     :params (:arguments approval)})
          (telemetry/emit! {:event :eca-approval/sent-to-eca
                            :eca-id eca-id
                            :confirmation-id confirmation-id})
          (catch Exception e
            (telemetry/emit! {:event :eca-approval/eca-send-error
                              :eca-id eca-id
                              :error (.getMessage e)})))

        {:status :approved
         :eca-id eca-id
         :confirmation-id confirmation-id
         :tool (:tool approval)})

      (do
        (telemetry/emit! {:event :eca-approval/approve-error
                          :confirmation-id confirmation-id})
        {:status :error
         :reason "Confirmation not found"}))))

(defn deny-confirmation!
  "Handle denial from chat platform (via /deny command)

   This is called when a user denies via chat command.

   Usage: (deny-confirmation! \"eca-123\" \"Too risky\" :denied-by \"admin\")"
  [confirmation-id reason & {:keys [denied-by]}]
  (let [eca-id (get-in @state [:confirmation-to-eca confirmation-id])
        approval (get-in @state [:pending-approvals confirmation-id])]

    (if (and eca-id approval)
      (do
        ;; Mark confirmation as denied
        (swap! state assoc-in [:pending-approvals confirmation-id :status] :denied)
        (swap! state assoc-in [:pending-approvals confirmation-id :denial-reason] reason)
        (swap! state assoc-in [:pending-approvals confirmation-id :denied-by] denied-by)

        (telemetry/emit! {:event :eca-approval/denied
                          :eca-id eca-id
                          :confirmation-id confirmation-id
                          :tool (:tool approval)
                          :reason reason
                          :denied-by denied-by})

        ;; Send rejection back to ECA
        (try
          (eca-client/reject-tool! {:tool (:tool approval)
                                    :reason reason})
          (telemetry/emit! {:event :eca-approval/sent-rejection-to-eca
                            :eca-id eca-id
                            :confirmation-id confirmation-id})
          (catch Exception e
            (telemetry/emit! {:event :eca-approval/eca-reject-error
                              :eca-id eca-id
                              :error (.getMessage e)})))

        {:status :denied
         :eca-id eca-id
         :confirmation-id confirmation-id
         :tool (:tool approval)
         :reason reason})

      (do
        (telemetry/emit! {:event :eca-approval/deny-error
                          :confirmation-id confirmation-id})
        {:status :error
         :reason "Confirmation not found"}))))

;; ============================================================================
;; Timeout Handling
;; ============================================================================

(defn cleanup-expired-approvals!
  "Check and expire pending approvals

   Call this periodically to auto-reject stale approvals."
  []
  (let [now (System/currentTimeMillis)
        pending (:pending-approvals @state)]
    (doseq [[confirmation-id approval] pending]
      (when (and (= :pending (:status approval))
                 (let [elapsed (- now (:requested-at approval))
                       timeout (:timeout-ms approval 120000)]
                   (>= elapsed timeout)))
        (let [eca-id (:eca-id approval)]
          (telemetry/emit! {:event :eca-approval/auto-rejected-timeout
                            :eca-id eca-id
                            :confirmation-id confirmation-id
                            :tool (:tool approval)})
          ;; Auto-reject
          (deny-confirmation! confirmation-id "Timeout - auto-rejected")))))

  {:status :cleaned})

;; ============================================================================
;; Query Functions
;; ============================================================================

(defn pending-approvals
  "Get all pending approval requests"
  []
  (let [approvals (vals (:pending-approvals @state))]
    (filter #(= :pending (:status %)) approvals)))

(defn get-approval
  "Get details of a specific approval"
  [confirmation-id]
  (get-in @state [:pending-approvals confirmation-id]))

(defn status
  "Get bridge status"
  []
  {:pending-count (count (pending-approvals))
   :timeout-ms (:timeout-ms @state)
   :adapter-set? (some? (:adapter @state))
   :active-sessions (:active-sessions @state)})

;; ============================================================================
;; Integration with Chat /confirm and /deny Commands
;; ============================================================================

(defn process-chat-confirm!
  "Process /confirm command from chat

   Usage: (process-chat-confirm! chat-id \"eca-123\" \"admin\")"
  [_chat-id confirmation-id user-name]
  (if-let [[prefix _eca-id] (str/split confirmation-id #"-" 2)]
    (if (= prefix "eca")
      (approve-confirmation! confirmation-id user-name)
      {:status :error :reason "Invalid confirmation ID format"})
    {:status :error :reason "Missing confirmation ID"}))

(defn process-chat-deny!
  "Process /deny command from chat

   Usage: (process-chat-deny! chat-id \"eca-123\" \"Too risky\" \"admin\")"
  [_chat-id confirmation-id reason user-name]
  (if-let [[prefix _eca-id] (str/split confirmation-id #"-" 2)]
    (if (= prefix "eca")
      (deny-confirmation! confirmation-id reason :denied-by user-name)
      {:status :error :reason "Invalid confirmation ID format"})
    {:status :error :reason "Missing confirmation ID"}))

;; ============================================================================
;; Comments / Examples
;; ============================================================================

(comment
  ;; Handle tool call from ECA
  (handle-tool-call-approve
   {:id "req-123"
    :tool {:name "file/write"
           :arguments {:path "README.md" :content "# Hello"}}})

  ;; Process chat confirmation
  (process-chat-confirm! "tg-123" "eca-req-123" "admin")

  ;; Process chat denial
  (process-chat-deny! "tg-123" "eca-req-123" "Too dangerous" "admin")

  ;; Check status
  (status)
  (pending-approvals)

  ;; Cleanup expired
  (cleanup-expired-approvals!))
