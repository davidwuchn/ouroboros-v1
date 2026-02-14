(ns ouroboros.ws.handlers.chat
  "ECA chat handler - relays chat messages between frontend and ECA.

   Includes automatic approval of safe tools (file/read, file/list, etc.)
   so ECA can explore the codebase without user intervention."
  (:require
   [clojure.string :as str]
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.stream :as stream]))

;; ============================================================================
;; Tool Approval
;; ============================================================================

(def ^:private safe-tools
  "Tools that are auto-approved for ECA in WebSocket chat"
  #{"file/read"
    "file/list"
    "file/search"
    "grep"
    "find"
    "view"
    "read"
    "get"
    "info"
    "status"
    "list"
    "git/status"
    "git/commits"
    "memory/get"
    "query/eql"})

(defn- safe-tool?
  "Check if a tool is safe to auto-approve"
  [tool-name]
  (let [tool (str/lower-case (or tool-name ""))]
    (or (contains? safe-tools tool)
        (some #(str/starts-with? tool %) ["file/read" "file/list" "git/" "memory/get"]))))

(defn- register-tool-approval-handler!
  "Register handler for ECA tool calls.
   Auto-approves safe tools, notifies frontend about dangerous ones."
  [client-id chat-id]
  (let [tool-listener-id (keyword (str "ws-tools-" client-id))]
    (eca/register-callback! "chat/toolCallApprove" tool-listener-id
      (fn [notification]
        ;; Debug: log the full notification structure
        (telemetry/emit! {:event :ws/eca-tool-notification-received
                          :client-id client-id
                          :chat-id chat-id
                          :notification-keys (keys notification)
                          :has-tool? (some? (:tool notification))
                          :has-params? (some? (:params notification))})

        ;; ECA sends tool info at top level, not in :params
        (let [tool-call (get notification :tool {})
              tool-name (get tool-call :name "")
              arguments (get tool-call :arguments {})]

          (telemetry/emit! {:event :ws/eca-tool-call
                            :client-id client-id
                            :chat-id chat-id
                            :tool tool-name
                            :tool-empty? (empty? tool-call)})

          (if (safe-tool? tool-name)
            ;; Auto-approve safe tools
            (do
              (telemetry/emit! {:event :ws/eca-tool-auto-approved
                                :client-id client-id
                                :tool tool-name})
              (try
                (eca/approve-tool! {:tool tool-name :params arguments})
                (telemetry/emit! {:event :ws/eca-tool-approve-sent
                                  :client-id client-id
                                  :tool tool-name})
                (catch Exception e
                  (telemetry/emit! {:event :ws/eca-tool-approve-error
                                    :client-id client-id
                                    :tool tool-name
                                    :error (.getMessage e)}))))

            ;; Notify frontend about dangerous tool
            (do
              (telemetry/emit! {:event :ws/eca-tool-confirmation-required
                                :client-id client-id
                                :tool tool-name})
              (conn/send-to! client-id
                {:type :eca/tool-approval-required
                 :tool tool-name
                 :arguments arguments
                 :chat-id chat-id
                 :timestamp (System/currentTimeMillis)}))))))

    ;; Return listener-id so it can be cleaned up later
    tool-listener-id))

;; ============================================================================
;; Chat Handler
;; ============================================================================

(defn handle-eca-chat!
  "Handle an eca/chat message from the frontend.
   Registers a per-request ECA callback that streams tokens back to the
   specific WebSocket client, then cleans up when done.

   Also registers tool approval handler to auto-approve safe tools."
  [client-id {:keys [text context]}]
  (when (stream/ensure-eca-alive! client-id :eca/chat-error {})
    (let [chat-id (str "ws-" client-id "-" (System/currentTimeMillis))
          listener-id (keyword (str "ws-chat-" client-id))
          ;; Register tool approval handler
          tool-listener-id (register-tool-approval-handler! client-id chat-id)]

      (telemetry/emit! {:event :ws/eca-chat-request
                        :client-id client-id
                        :chat-id chat-id
                        :context context
                        :text-length (count (str text))})

      (stream/stream-eca-to-client! client-id
        {:chat-id chat-id
         :listener-id listener-id
         :prompt text
         :token-type :eca/chat-token
         :done-type :eca/chat-done
         :error-type :eca/chat-error
         :on-done (fn []
                    ;; Clean up tool handler when chat is done
                    (eca/unregister-callback! "chat/toolCallApprove" tool-listener-id)
                    (telemetry/emit! {:event :ws/eca-chat-done
                                      :client-id client-id
                                      :chat-id chat-id}))
         :on-error (fn [error-msg]
                     ;; Clean up tool handler on error too
                     (eca/unregister-callback! "chat/toolCallApprove" tool-listener-id)
                     (telemetry/emit! {:event :ws/eca-chat-error
                                       :client-id client-id
                                       :error error-msg}))}))))

(defn approve-tool!
  "Approve a tool call from the frontend.
   Called when user approves a dangerous tool in the UI."
  [client-id {:keys [tool arguments chat-id]}]
  (telemetry/emit! {:event :ws/eca-tool-approved-by-user
                    :client-id client-id
                    :tool tool})
  (try
    (eca/approve-tool! {:tool tool :params arguments})
    {:status :approved}
    (catch Exception e
      {:status :error
       :error (.getMessage e)})))

(defn reject-tool!
  "Reject a tool call from the frontend.
   Called when user denies a dangerous tool in the UI."
  [client-id {:keys [tool reason]}]
  (telemetry/emit! {:event :ws/eca-tool-rejected-by-user
                    :client-id client-id
                    :tool tool})
  (try
    (eca/reject-tool! {:tool tool :reason (or reason "User rejected")})
    {:status :rejected}
    (catch Exception e
      {:status :error
       :error (.getMessage e)})))
