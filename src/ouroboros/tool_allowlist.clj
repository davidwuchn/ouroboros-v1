(ns ouroboros.tool-allowlist
  "Tool Allowlist — Per-session and per-user tool permissions
   
   Core principle: Tools are denied by default. Access is granted explicitly.
   
   Permission levels:
   - :none — No tools allowed
   - :read-only — Safe read operations (file/read, git/status, etc.)
   - :chat-safe — Tools safe for chat contexts
   - :standard — Most tools except dangerous ones
   - :admin — All tools including dangerous operations
   
   Usage:
     ;; Create allowlist for session
     (allowlist/create! :session-123 :chat-safe)
     
     ;; Check permission
     (allowlist/permitted? :session-123 :file/read) => true
     (allowlist/permitted? :session-123 :file/delete) => false
     
     ;; Custom allowlist
     (allowlist/create-custom! :session-456
       #{:file/read :git/status :system/status})"
  (:require
   [clojure.set :as set]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Tool Categories
;; ============================================================================

(def read-only-tools
  "Tools that only read, never write"
  #{:system/status
    :system/report
    :git/commits
    :git/status
    :file/read
    :file/search
    :file/list
    :memory/get
    :http/get})

(def chat-safe-tools
  "Tools safe to expose in untrusted chat contexts"
  #{:system/status
    :system/report
    :git/commits
    :git/status
    :file/read
    :file/search
    :file/list
    :memory/get
    :memory/set
    :http/get
    :query/eql})

(def standard-tools
  "Most tools except dangerous operations"
  (set/union chat-safe-tools
             #{:openapi/bootstrap
               :openapi/call}))

(def admin-tools
  "All available tools (including dangerous)"
  (set/union standard-tools
             #{:memory/clear
               :system/shutdown
               :file/write
               :file/delete
               :shell/exec
               :shell/script}))

;; ============================================================================
;; Permission Levels
;; ============================================================================

(def permission-levels
  "Map of permission levels to allowed tool sets"
  {:none #{}
   :read-only read-only-tools
   :chat-safe chat-safe-tools
   :standard standard-tools
   :admin admin-tools})

(defn level->tools
  "Get tool set for a permission level"
  [level]
  (get permission-levels level #{}))

;; ============================================================================
;; Registry
;; ============================================================================

;; Map of session/user IDs to their allowed tools
(defonce ^:private allowlist-registry (atom {}))

;; Audit log of permission checks
(defonce ^:private permission-log (atom []))

(def ^:private max-log-entries 1000)

(defn- log-permission-check!
  [subject tool allowed? context]
  (let [entry {:timestamp (System/currentTimeMillis)
               :subject subject
               :tool tool
               :allowed? allowed?
               :context context}]
    (swap! permission-log (fn [log]
                            (take max-log-entries (cons entry log))))
    (telemetry/emit! {:event :allowlist/check
                      :subject subject
                      :tool tool
                      :allowed? allowed?})))

;; ============================================================================
;; Allowlist Management
;; ============================================================================

(defn create!
  "Create an allowlist for a subject with a permission level
   
   Usage:
     (create! :session-123 :chat-safe)
     (create! :user-alice :admin)"
  [subject level]
  (let [tools (level->tools level)]
    (swap! allowlist-registry assoc subject
           {:level level
            :tools tools
            :created-at (System/currentTimeMillis)})
    (telemetry/emit! {:event :allowlist/created
                      :subject subject
                      :level level
                      :tool-count (count tools)})
    {:subject subject
     :level level
     :tools tools}))

(defn create-custom!
  "Create a custom allowlist with specific tools
   
   Usage:
     (create-custom! :session-456 
                     #{:file/read :git/status})"
  [subject tools]
  (swap! allowlist-registry assoc subject
         {:level :custom
          :tools (set tools)
          :created-at (System/currentTimeMillis)})
  (telemetry/emit! {:event :allowlist/created-custom
                    :subject subject
                    :tool-count (count tools)})
  {:subject subject
     :level :custom
     :tools tools})

(defn destroy!
  "Remove an allowlist for a subject"
  [subject]
  (swap! allowlist-registry dissoc subject)
  (telemetry/emit! {:event :allowlist/destroyed
                    :subject subject})
  subject)

(defn get-allowlist
  "Get the allowlist for a subject"
  [subject]
  (get @allowlist-registry subject))

(defn exists?
  "Check if subject has an allowlist"
  [subject]
  (contains? @allowlist-registry subject))

;; ============================================================================
;; Permission Checking
;; ============================================================================

(defn permitted?
  "Check if subject is permitted to use a tool
   
   Returns true if:
   - Subject has an allowlist AND tool is in allowed set
   
   Returns false if:
   - Subject has no allowlist (default deny)
   - Tool is not in subject's allowed set"
  ([subject tool]
   (permitted? subject tool {}))
  ([subject tool context]
   (let [allowlist (get-allowlist subject)
         tool-kw (keyword tool)
         allowed? (and allowlist (contains? (:tools allowlist) tool-kw))]
     (log-permission-check! subject tool-kw allowed? context)
     allowed?)))

(defn permitted-tools
  "Get list of tools permitted for a subject"
  [subject]
  (when-let [allowlist (get-allowlist subject)]
    (:tools allowlist)))

(defn filter-permitted
  "Filter a collection to only permitted tools
   
   Usage:
     (filter-permitted :session-123 [:file/read :file/delete :git/status])
     => (:file/read :git/status)"
  [subject tools]
  (filter #(permitted? subject %) tools))

;; ============================================================================
;; Default Policies
;; ============================================================================

(defn set-default-level!
  "Set default permission level for new sessions without explicit allowlist
   
   WARNING: Setting this to anything other than :none reduces security.
   Only use in trusted environments."
  [level]
  (swap! allowlist-registry assoc :__default__
         {:level level
          :tools (level->tools level)})
  (telemetry/emit! {:event :allowlist/default-set
                    :level level})
  level)

(defn get-default-level
  "Get default permission level"
  []
  (get-in @allowlist-registry [:__default__ :level] :none))

(defn permitted-with-default?
  "Check permission, falling back to default if no explicit allowlist"
  [subject tool]
  (if (exists? subject)
    (permitted? subject tool)
    (when-let [default (:tools (get-allowlist :__default__))]
      (contains? default (keyword tool)))))

;; ============================================================================
;; Chat Integration
;; ============================================================================

(defn create-for-chat!
  "Create appropriate allowlist for a chat session
   
   Automatically determines level based on platform and user."
  [platform platform-id user-id & {:keys [level] :or {level :chat-safe}}]
  (let [session-key (keyword (str (name platform) "-" platform-id "-" user-id))]
    (create! session-key level)
    session-key))

(defn get-chat-session-key
  "Generate session key for chat context"
  [platform platform-id user-id]
  (keyword (str (name platform) "-" platform-id "-" user-id)))

;; ============================================================================
;; Audit & Monitoring
;; ============================================================================

(defn audit-log
  "Get permission check audit log
   
   Options:
   - :subject — Filter by subject
   - :tool — Filter by tool
   - :since — Timestamp to filter from"
  [& {:keys [subject tool since]}]
  (cond->> @permission-log
    subject (filter #(= (:subject %) subject))
    tool (filter #(= (:tool %) (keyword tool)))
    since (filter #(> (:timestamp %) since))))

(defn stats
  "Get allowlist statistics"
  []
  (let [allowlists @allowlist-registry
        checks @permission-log]
    {:total-allowlists (count (dissoc allowlists :__default__))
     :default-level (get-default-level)
     :permission-breakdown (frequencies (map :level (vals allowlists)))
     :total-checks (count checks)
     :allowed-rate (if (seq checks)
                     (/ (count (filter :allowed? checks)) (count checks))
                     0)}))

(defn reset-audit-log!
  "Clear audit log (use with caution)"
  []
  (reset! permission-log [])
  (telemetry/emit! {:event :allowlist/audit-cleared}))

;; ============================================================================
;; Dangerous Tool Detection
;; ============================================================================

(defn dangerous-tool?
  "Check if a tool is considered dangerous (can modify state)"
  [tool]
  (let [tool-kw (keyword tool)]
    (or (contains? #{:memory/clear :memory/delete
                     :file/write :file/delete
                     :shell/exec :shell/script
                     :system/shutdown}
                   tool-kw)
        ;; Check if tool name suggests danger
        (some #(clojure.string/includes? (name tool-kw) %)
              ["delete" "remove" "clear" "exec" "write" "modify"]))))

(defn requires-confirmation?
  "Check if tool use should require user confirmation"
  [tool]
  (dangerous-tool? tool))

(comment
  ;; Create allowlists
  (create! :session-123 :chat-safe)
  (create! :admin-user :admin)
  (create-custom! :custom-session #{:file/read :git/status})
  
  ;; Check permissions
  (permitted? :session-123 :file/read)
  (permitted? :session-123 :file/delete)
  (permitted? :admin-user :file/delete)
  
  ;; Get permitted tools
  (permitted-tools :session-123)
  
  ;; Chat integration
  (create-for-chat! :telegram "123456" "user-789")
  (permitted? (get-chat-session-key :telegram "123456" "user-789") :file/read)
  
  ;; Audit
  (audit-log :subject :session-123)
  (stats)
  
  ;; Cleanup
  (destroy! :session-123)
  (reset-audit-log!))