(ns ouroboros.ws.handlers.chat
  "ECA chat handler - relays chat messages between frontend and ECA.

   Includes automatic approval of safe tools (file/read, file/list, etc.)
   so ECA can explore the codebase without user intervention."
  (:require
   [clojure.string :as str]
   [ouroboros.eca-client :as eca]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.stream :as stream]
   [ouroboros.chat.commands :as commands]
   [ouroboros.chat.session :as session]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.learning.empathy-map :as empathy]
   [ouroboros.learning :as learning]))

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

;; ============================================================================
;; Learning: Auto-capture repeat queries
;; ============================================================================

(defn- check-repeat-query
  "Check if user asked similar question before.
   If repeat detected, send prompt to save insight."
  [client-id query]
  (let [user-id (keyword (str "ws-" client-id))
        ;; Extract key terms from query for pattern matching
        terms (-> query str/lower-case (str/split #"\s+") set)
        ;; Search existing learnings for related topics
        related (learning/find-related user-id query)]
    (when (seq related)
      ;; User has asked about this before - emit telemetry and could prompt
      (telemetry/emit! {:event :learning/repeat-query
                         :client-id client-id
                         :query query
                         :related-count (count related)
                         :matches (map :learning/title related)})
      ;; Return related learnings for context
      related)))

(defn- suggest-save-insight
  "Send message suggesting user save their knowledge"
  [client-id related-learnings]
  (let [titles (map :learning/title related-learnings)
        msg (str "💡 You asked about this before. Your previous topics: "
                 (str/join ", " (take 3 titles))
                 ". Want to save this as a learning? Use /learn save <topic>: <insight>")]
    (conn/send-to! client-id {:type :learning/suggest-save
                              :text msg
                              :timestamp (System/currentTimeMillis)})))

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

(defn- handle-eca-chat-raw
  "Raw ECA chat handling (original implementation)"
  [client-id text context]
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

(defn- handle-mode-response
  "Handle user response when in a special mode (empathy, canvas, etc.)
   Returns true if handled, false otherwise."
  [client-id chat-id text]
  (let [context (session/get-context chat-id)
        in-empathy? (:empathy/mode context)
        empathy-session (:empathy/session context)]
    (telemetry/emit! {:event :ws/mode-response-debug
                      :client-id client-id
                      :chat-id chat-id
                      :in-empathy? in-empathy?
                      :has-empathy-session? (some? empathy-session)
                      :context-keys (keys context)})
    (cond
      (and in-empathy? empathy-session)
      (try
        (telemetry/emit! {:event :ws/empathy-response
                          :client-id client-id
                          :chat-id chat-id
                          :text-length (count (str text))})
        (let [result (empathy/process-response! empathy-session text)
              next-prompt (:message result)
              updated-session (:session result)
              ;; Create adapter for sending response
              adapter (reify
                        chatp/ChatAdapter
                        (start! [_this _handler] nil)
                        (stop! [_this] nil)
                        (send-message! [_this _chat-id msg-text]
                          (conn/send-to! client-id {:type :eca/chat-response
                                                     :text msg-text
                                                     :timestamp (System/currentTimeMillis)})
                          nil)
                        (send-markdown! [_this _chat-id msg-text]
                          (conn/send-to! client-id {:type :eca/chat-response
                                                     :text msg-text
                                                     :timestamp (System/currentTimeMillis)})
                          nil))]
          ;; Update session context with updated empathy session
          (session/assoc-context! chat-id :empathy/session updated-session)
          
          ;; If empathy map is complete, clear the mode
          (when (:complete? result)
            (session/dissoc-context! chat-id :empathy/mode))
          
          ;; Send the next prompt (or completion message)
          (chatp/send-markdown! adapter chat-id next-prompt)
          true)  ;; Return true to indicate we handled this
        (catch Exception e
          (telemetry/emit! {:event :ws/empathy-error
                            :client-id client-id
                            :chat-id chat-id
                            :error (.getMessage e)})
          ;; Send error to user
          (conn/send-to! client-id {:type :eca/chat-response
                                     :text (str "⚠️ Error processing empathy response: " (.getMessage e))
                                     :timestamp (System/currentTimeMillis)})
          true))  ;; Still return true since we handled it (with error)
      
      ;; Add other modes here (canvas, valueprop, mvp, etc.)
      :else
      (do
        (telemetry/emit! {:event :ws/mode-response-not-handled
                          :client-id client-id
                          :chat-id chat-id})
        false))))  ;; Return false to indicate we didn't handle this

(defn handle-eca-chat!
  "Handle an eca/chat message from the frontend.
   Registers a per-request ECA callback that streams tokens back to the
   specific WebSocket client, then cleans up when done.

   Also registers tool approval handler to auto-approve safe tools."
  [client-id {:keys [text context]}]
  ;; Debug logging
  (telemetry/emit! {:event :ws/eca-chat-debug
                    :client-id client-id
                    :text (pr-str text)
                    :is-string? (string? text)
                    :starts-with-slash? (and (string? text) (str/starts-with? text "/"))})
  
  (let [chat-id (str "ws-" client-id)]
    ;; First, check if we're in a special mode (empathy, canvas, etc.)
    (if (handle-mode-response client-id chat-id text)
      ;; Mode was handled, we're done
      nil
      ;; Not in a mode, check if this is a command (starts with /)
      (if (and (string? text) (str/starts-with? text "/"))
        ;; Handle as command
        (let [_user-id (str "ws-" client-id)
              user-name "WebSocket User"
              ;; Create a WebSocket adapter that implements ChatAdapter
              adapter (reify
                        chatp/ChatAdapter
                        (start! [_this _handler] nil)
                        (stop! [_this] nil)
                        (send-message! [_this _chat-id msg-text]
                          (conn/send-to! client-id {:type :eca/chat-response
                                                     :text msg-text
                                                     :timestamp (System/currentTimeMillis)})
                          nil)
                        (send-markdown! [_this _chat-id msg-text]
                          (conn/send-to! client-id {:type :eca/chat-response
                                                     :text msg-text
                                                     :timestamp (System/currentTimeMillis)})
                          nil))]
          (telemetry/emit! {:event :ws/command-request
                            :client-id client-id
                            :text text})
          ;; Extract command and args
          (if-let [[cmd args] (commands/extract-command text)]
            (do
              (telemetry/emit! {:event :ws/command-extracted
                                :client-id client-id
                                :cmd cmd
                                :args args})
              (commands/handle-command adapter chat-id user-name cmd args))
            ;; Not a recognized command, send to ECA
            (do
              (telemetry/emit! {:event :ws/command-not-recognized
                                :client-id client-id
                                :text text})
              ;; Check for repeat query and suggest saving
              (when-let [related (check-repeat-query client-id text)]
                (suggest-save-insight client-id related))
              (handle-eca-chat-raw client-id text context))))
        ;; Not a command, send to ECA as usual
        (do
          ;; Check for repeat query and suggest saving
          (when-let [related (check-repeat-query client-id text)]
            (suggest-save-insight client-id related))
          (handle-eca-chat-raw client-id text context))))))

(defn approve-tool!
  "Approve a tool call from the frontend.
   Called when user approves a dangerous tool in the UI."
  [client-id {:keys [tool arguments _chat-id]}]
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

;; ============================================================================
;; Skill Loading
;; ============================================================================

(defn handle-load-skills!
  "Handle eca/load-skills message from frontend.
   Loads specified skills in ECA and confirms readiness."
  [client-id {:keys [skills context]}]
  (telemetry/emit! {:event :ws/eca-load-skills
                    :client-id client-id
                    :skills skills
                    :context context})
  ;; ECA skill loading is handled automatically by the ECA client
  ;; We just confirm the skills are ready
  (conn/send-to! client-id
                 {:type :eca/skills-loaded
                  :skills skills
                  :message (str "🤖 Skills loaded: " (str/join ", " skills)
                                "\nReady to assist with " (or context "your request") ".")
                  :timestamp (System/currentTimeMillis)})
  {:status :loaded
   :skills skills})
