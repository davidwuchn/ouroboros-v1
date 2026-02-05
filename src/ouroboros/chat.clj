(ns ouroboros.chat
  "Chat - Message routing and conversation management

   Core infrastructure for chat platform integration:
   - ChatAdapter protocol for platform abstraction
   - Message routing to handlers
   - Session management (conversation history)
   - ECA integration for AI responses
   - Tool approval bridge for dangerous operations

   AI functionality is delegated to ECA (Editor Code Assistant).
   See: https://github.com/editor-code-assistant/eca"
  (:require
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.memory :as memory]
   [ouroboros.eca-client :as eca]
   [ouroboros.confirmation :as confirmation]
   [ouroboros.eca_approval_bridge :as eca-approval]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.learning :as learning]
   [ouroboros.learning.empathy-map :as empathy]
   [ouroboros.learning.value-proposition :as vp]
   [ouroboros.learning.mvp-planning :as mvp]
   [ouroboros.learning.lean-canvas :as canvas])
  (:import [java.time Instant]))

;; ============================================================================
;; ChatAdapter Protocol
;; ============================================================================

(require '[ouroboros.chat.protocol :as chatp])

(def start! chatp/start!)
(def stop! chatp/stop!)
(def send-message! chatp/send-message!)
(def send-markdown! chatp/send-markdown!)

(def make-message chatp/make-message)

;; ============================================================================
;; Session Management
;; ============================================================================

(defonce ^:private chat-sessions (atom {}))

(defn get-session [chat-id]
  (swap! chat-sessions update chat-id #(or % {:history []
                                              :context {}
                                              :created-at (str (Instant/now))}))
  (get @chat-sessions chat-id))

(defn update-session! [chat-id role content]
  (swap! chat-sessions update-in [chat-id :history] conj
         {:role role :content content :timestamp (str (Instant/now))})
  (when (> (count (get-in @chat-sessions [chat-id :history])) 20)
    (swap! chat-sessions update-in [chat-id :history] (partial take-last 10))))

(defn clear-session! [chat-id]
  (swap! chat-sessions assoc-in [chat-id :history] [])
  {:status :cleared})

;; ============================================================================
;; Tool Filtering for Chat Safety
;; ============================================================================

(def ^:private chat-safe-tools
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

(defn chat-safe-tool? [tool-name]
  (contains? chat-safe-tools (keyword tool-name)))

(defn list-chat-tools []
  (filter #(chat-safe-tool? (:tool/name %)) (tool-registry/list-tools)))

;; ============================================================================
;; Message Handler
;; ============================================================================

(defn- extract-command [text]
  (when (str/starts-with? text "/")
    (let [parts (str/split (str/lower-case text) #"\s+" 2)
          cmd (first parts)
          args (second parts)]
      [(keyword (subs cmd 1)) (or args "")])))

(defn- handle-command [adapter chat-id user-name cmd args]
  (telemetry/emit! {:event :chat/command :command cmd :chat-id chat-id})
  (case cmd
    :start (send-message! adapter chat-id
                          "🐍 Ouroboros Assistant ready!\n\nPowered by ECA (Editor Code Assistant)\nhttps://github.com/editor-code-assistant/eca\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve operation\n/deny <id> <reason> - Reject operation\n/build canvas <name> - Create Lean Canvas\n/build empathy <persona> - Empathy Map\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary")
    :help (send-message! adapter chat-id
                         "*Ouroboros Chat Commands*\n\n/clear - Clear conversation history\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve dangerous operation\n/deny <id> <reason> - Reject operation\n/build canvas <name> - Create Lean Canvas\n/build empathy <persona> - Empathy Map\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary\n\nJust type naturally to chat with ECA!")
    :clear (do (clear-session! chat-id)
               (send-message! adapter chat-id "✓ Conversation cleared"))
    :status (let [result (tool-registry/call-tool :system/status {})]
              (send-message! adapter chat-id
                             (str "*System Status*\n\n"
                                  (pr-str (:result result)))))
    :tools (let [tools (list-chat-tools)]
             (send-message! adapter chat-id
                            (str "*Available Tools*\n\n"
                                 (str/join "\n" (map :tool/name tools)))))
    :build (if-let [[subcmd & project-parts] (str/split (or args "") #"\s+" 2)]
             (let [project-name (str/join " " project-parts)]
               (case subcmd
                 "canvas" (if (str/blank? project-name)
                           (send-message! adapter chat-id "⚠️ Usage: /build canvas <project-name>")
                           (let [canvas-session (canvas/start-canvas-session! chat-id project-name)
                                 prompt (canvas/get-next-prompt canvas-session)]
                             ;; Enter canvas mode
                             (swap! chat-sessions assoc-in [chat-id :context :canvas/session] (:session prompt))
                             (swap! chat-sessions assoc-in [chat-id :context :canvas/mode] true)
                             (send-markdown! adapter chat-id (:message prompt))))
                 "empathy" (if (str/blank? project-name)
                            (send-message! adapter chat-id "⚠️ Usage: /build empathy <persona-name>")
                            (let [empathy-session (empathy/start-empathy-session! chat-id project-name)
                                  prompt (empathy/get-next-prompt empathy-session)]
                              (swap! chat-sessions assoc-in [chat-id :context :empathy/session] (:session prompt))
                              (swap! chat-sessions assoc-in [chat-id :context :empathy/mode] true)
                              (send-markdown! adapter chat-id (:message prompt))))
                 "valueprop" (if (str/blank? project-name)
                              (send-message! adapter chat-id "⚠️ Usage: /build valueprop <project-name>")
                              (let [vp-session (vp/start-vp-session! chat-id project-name)
                                    prompt (vp/get-next-prompt vp-session)]
                                (swap! chat-sessions assoc-in [chat-id :context :vp/session] (:session prompt))
                                (swap! chat-sessions assoc-in [chat-id :context :vp/mode] true)
                                (send-markdown! adapter chat-id (:message prompt))))
                 "mvp" (if (str/blank? project-name)
                         (send-message! adapter chat-id "⚠️ Usage: /build mvp <project-name>")
                         (let [mvp-session (mvp/start-mvp-session! chat-id project-name)
                               prompt (mvp/get-next-prompt mvp-session)]
                           (swap! chat-sessions assoc-in [chat-id :context :mvp/session] (:session prompt))
                           (swap! chat-sessions assoc-in [chat-id :context :mvp/mode] true)
                           (send-markdown! adapter chat-id (:message prompt))))
                 (send-message! adapter chat-id (str "Unknown build command: " subcmd))))
             (send-message! adapter chat-id "*Build Commands*\n\n/build canvas <name> - Create Lean Canvas\n/build empathy <persona> - Empathy Map\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/build help - Show help"))
    :learn (if-let [[topic & insight-parts] (str/split (or args "") #"\s+" 2)]
             (let [insight (str/join " " insight-parts)]
               (if (str/blank? insight)
                 (send-message! adapter chat-id "⚠️ Usage: /learn <topic> <insight>")
                 (do (learning/save-insight! chat-id
                       {:title (str "Learning: " topic)
                        :insights [insight]
                        :pattern (str "user-learning-" (str/replace topic #"\s+" "-"))
                        :category "user-insights"
                        :tags #{topic "learning"}})
                     (send-message! adapter chat-id (str "✓ Learning saved: " topic)))))
             (send-message! adapter chat-id "*Learning Commands*\n\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary"))
    :recall (if-not (str/blank? args)
              (let [learnings (learning/recall-by-pattern chat-id args)]
                (if (seq learnings)
                  (send-markdown! adapter chat-id
                    (str "*📚 Learnings matching \"" args "\"*\n\n"
                         (str/join "\n---\n"
                           (map (fn [l]
                                  (str "**" (:learning/title l) "**\n"
                                       (str/join "\n" (map #(str "• " %) (:learning/insights l)))))
                                (take 5 learnings)))))
                  (send-message! adapter chat-id "No learnings found for that pattern.")))
              (send-message! adapter chat-id "⚠️ Usage: /recall <pattern>"))
    :wisdom (let [stats (learning/get-user-stats chat-id)]
              (send-markdown! adapter chat-id
                (str "*🧠 Your Wisdom Summary*\n\n"
                     "Total learnings: " (:total-learnings stats) "\n"
                     "Applications: " (:total-applications stats) "\n"
                     "Avg confidence: " (:average-confidence stats) "/5\n\n"
                     "Recent learnings:\n"
                     (str/join "\n" (map #(str "• " %) (:recent-learnings stats))) "\n\n"
                     "Use /learn to save insights, /recall to find them.")))
    :confirm (if-let [[prefix id] (str/split (or args "") #"\s+" 2)]
               (if (= prefix "eca-")
                 ;; Handle ECA approval
                 (let [result (eca-approval/process-chat-confirm! chat-id args user-name)]
                   (case (:status result)
                     :approved (send-message! adapter chat-id
                                              (str "✓ ECA Tool Approved: " (:tool result) "\nSending to ECA..."))
                     :error (send-message! adapter chat-id
                                           (str "⚠️ " (:reason result)))))
                 ;; Handle internal confirmation
                 (let [result (confirmation/approve! chat-id :approved-by user-name)]
                   (case (:status result)
                     :approved (send-message! adapter chat-id
                                              (str "✓ Confirmed: " (:tool result) "\nExecuting..."))
                     :error (send-message! adapter chat-id
                                           (str "⚠️ " (:reason result))))))
               (send-message! adapter chat-id "⚠️ Usage: /confirm <confirmation-id>"))
    :deny (if-let [[confirmation-id & reason-parts] (str/split (or args "") #"\s+" 2)]
            (let [reason (str/join " " reason-parts)]
              (if (= confirmation-id "eca-")
                ;; Handle ECA rejection
                (let [result (eca-approval/process-chat-deny! chat-id args reason user-name)]
                  (case (:status result)
                    :denied (send-message! adapter chat-id "✗ ECA Tool Denied")
                    :error (send-message! adapter chat-id (str "⚠️ " (:reason result)))))
                ;; Handle internal rejection
                (let [result (confirmation/deny! chat-id reason :denied-by user-name)]
                  (case (:status result)
                    :denied (send-message! adapter chat-id "✗ Operation denied")
                    :error (send-message! adapter chat-id (str "⚠️ " (:reason result)))))))
            (send-message! adapter chat-id "⚠️ Usage: /deny <confirmation-id> <reason>"))
    (send-message! adapter chat-id (str "Unknown command: " (name cmd)))))

(defn- handle-natural-message
  "Handle natural language message via ECA

   Flow:
   1. Store user message in session
   2. Send to ECA via chat-prompt
   3. Store and forward ECA response to chat

   Note: Conversation history is maintained by ECA, we just track
   for display purposes in Ouroboros."
  [adapter chat-id user-name text]
  (telemetry/emit! {:event :chat/message :chat-id chat-id :user user-name})

  ;; Store user message
  (update-session! chat-id :user text)

  ;; Check if ECA is running
  (let [eca-status (eca/status)]
    (if-not (:running eca-status)
      (let [error-msg (str "⚠️  ECA is not running.\n\n"
                           "Please start ECA first:\n"
                           "(require '[ouroboros.interface :as iface])\n"
                           "(iface/eca-start!)\n\n"
                           "Or set ECA_PATH environment variable.")]
        (telemetry/emit! {:event :chat/eca-not-running})
        (send-message! adapter chat-id error-msg))

      ;; Send to ECA
      (let [result (eca/chat-prompt text)]
        (case (:status result)
          :success
          (let [response (get-in result [:response :result :content]
                                 (str "ECA: " (pr-str (:response result))))]
            (update-session! chat-id :assistant response)
            (send-message! adapter chat-id response))

          :error
          (let [error-msg (str "⚠️  ECA error: "
                               (or (:error result) "Unknown error")
                               "\n\n"
                               "Message: " (:message result))]
            (telemetry/emit! {:event :chat/eca-error
                              :error (:error result)})
            (update-session! chat-id :assistant error-msg)
            (send-message! adapter chat-id error-msg))

          ;; Timeout or other issues
          (let [error-msg (str "⚠️  ECA request failed: "
                               (pr-str result))]
            (telemetry/emit! {:event :chat/eca-failed})
            (update-session! chat-id :assistant error-msg)
            (send-message! adapter chat-id error-msg)))))))

(defn- handle-canvas-message
  "Handle message when user is in canvas-building mode"
  [adapter chat-id user-name text]
  (let [session (get-session chat-id)
        canvas-session (get-in session [:context :canvas/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if canvas-session
      (if cancel?
        (do
          ;; Cancel canvas building
          (swap! chat-sessions update-in [chat-id :context] dissoc :canvas/session :canvas/mode)
          (send-message! adapter chat-id "🗑️ Canvas building cancelled. All progress lost."))
        (let [result (canvas/process-response! canvas-session text)]
          ;; Update session with new canvas state
          (swap! chat-sessions assoc-in [chat-id :context :canvas/session] (:session result))
          
          (if (:complete? result)
            (do
              ;; Canvas complete - show summary and exit canvas mode
              (swap! chat-sessions update-in [chat-id :context] dissoc :canvas/session :canvas/mode)
              (let [summary (canvas/get-canvas-summary (:session result))]
                (send-markdown! adapter chat-id
                  (str (:message result) "\n\n"
                       "📊 *Canvas Summary*\n"
                       "Project: " (:canvas/project-name summary) "\n"
                       "Completed: " (:canvas/completed-blocks summary) "/" (:canvas/total-blocks summary) " blocks\n"
                       "Canvas ID: " (:canvas/id summary) "\n\n"
                       "Each block has been saved as a learning insight.\n"
                       "Use /recall lean-canvas to review later."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No canvas session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

;; ============================================================================
;; Builder Mode Handlers
;; ============================================================================

(defn- handle-empathy-message
  "Handle message when user is in empathy mapping mode"
  [adapter chat-id user-name text]
  (let [session (get-session chat-id)
        empathy-session (get-in session [:context :empathy/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if empathy-session
      (if cancel?
        (do
          ;; Cancel empathy building
          (swap! chat-sessions update-in [chat-id :context] dissoc :empathy/session :empathy/mode)
          (send-message! adapter chat-id "🗑️ Empathy mapping cancelled. All progress lost."))
        (let [result (empathy/process-response! empathy-session text)]
          ;; Update session with new empathy state
          (swap! chat-sessions assoc-in [chat-id :context :empathy/session] (:session result))
          
          (if (:complete? result)
            (do
              ;; Empathy map complete - show summary and exit mode
              (swap! chat-sessions update-in [chat-id :context] dissoc :empathy/session :empathy/mode)
              (let [summary (empathy/get-empathy-summary (:session result))]
                (send-markdown! adapter chat-id
                  (str (:message result) "\n\n"
                       "🧠 *Empathy Map Summary*\n"
                       "Persona: " (:empathy/persona-name summary) "\n"
                       "Completed: " (:empathy/completed-sections summary) "/" (:empathy/total-sections summary) " sections\n"
                       "Empathy ID: " (:empathy/id summary) "\n\n"
                       "Each section has been saved as a learning insight.\n"
                       "Use /recall empathy- to review later.\n\n"
                       "Next step: Use /build valueprop to create a Value Proposition Canvas."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No empathy session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

(defn- handle-vp-message
  "Handle message when user is in value proposition mode"
  [adapter chat-id user-name text]
  (let [session (get-session chat-id)
        vp-session (get-in session [:context :vp/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if vp-session
      (if cancel?
        (do
          ;; Cancel VP building
          (swap! chat-sessions update-in [chat-id :context] dissoc :vp/session :vp/mode)
          (send-message! adapter chat-id "🗑️ Value Proposition cancelled. All progress lost."))
        (let [result (vp/process-response! vp-session text)]
          ;; Update session with new VP state
          (swap! chat-sessions assoc-in [chat-id :context :vp/session] (:session result))
          
          (if (:complete? result)
            (do
              ;; VP complete - show summary and exit mode
              (swap! chat-sessions update-in [chat-id :context] dissoc :vp/session :vp/mode)
              (let [summary (vp/get-vp-summary (:session result))]
                (send-markdown! adapter chat-id
                  (str (:message result) "\n\n"
                       "🎯 *Value Proposition Summary*\n"
                       "Project: " (:vp/project-name summary) "\n"
                       "Completed: " (:vp/completed-sections summary) "/" (:vp/total-sections summary) " sections\n"
                       "VP ID: " (:vp/id summary) "\n\n"
                       "Each section has been saved as a learning insight.\n"
                       "Use /recall value-prop- to review later.\n\n"
                       "Next step: Use /build mvp to create an MVP plan."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No VP session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

(defn- handle-mvp-message
  "Handle message when user is in MVP planning mode"
  [adapter chat-id user-name text]
  (let [session (get-session chat-id)
        mvp-session (get-in session [:context :mvp/session])
        text-normalized (str/trim text)
        cancel? (= "cancel" (str/lower-case text-normalized))]
    (if mvp-session
      (if cancel?
        (do
          ;; Cancel MVP building
          (swap! chat-sessions update-in [chat-id :context] dissoc :mvp/session :mvp/mode)
          (send-message! adapter chat-id "🗑️ MVP planning cancelled. All progress lost."))
        (let [result (mvp/process-response! mvp-session text)]
          ;; Update session with new MVP state
          (swap! chat-sessions assoc-in [chat-id :context :mvp/session] (:session result))
          
          (if (:complete? result)
            (do
              ;; MVP complete - show summary and exit mode
              (swap! chat-sessions update-in [chat-id :context] dissoc :mvp/session :mvp/mode)
              (let [summary (mvp/get-mvp-summary (:session result))]
                (send-markdown! adapter chat-id
                  (str (:message result) "\n\n"
                       "🚀 *MVP Planning Summary*\n"
                       "Project: " (:mvp/project-name summary) "\n"
                       "Completed: " (:mvp/completed-sections summary) "/" (:mvp/total-sections summary) " sections\n"
                       "MVP ID: " (:mvp/id summary) "\n\n"
                       "Each section has been saved as a learning insight.\n"
                       "Use /recall mvp- to review later.\n\n"
                       "Next step: Use /build canvas to create a Lean Canvas."))))
            ;; Continue with next prompt
            (send-markdown! adapter chat-id (:message result)))))
      ;; No MVP session - treat as normal message
      (handle-natural-message adapter chat-id user-name text))))

(defn make-message-handler [adapter]
  (fn [{:keys [chat-id user-id user-name text] :as message}]
    (telemetry/emit! {:event :chat/receive :platform (:message/platform message)})
    
    ;; Register this session for ECA approval forwarding
    ;; This ensures approval requests can be sent to active chat sessions
    (try
      (eca-approval/register-session! chat-id user-name)
      (catch Exception _
        ;; Silently ignore if approval bridge not available
        nil))
    
    ;; Check if session is in any builder mode
    (let [session (get-session chat-id)
          canvas-mode? (get-in session [:context :canvas/mode])
          empathy-mode? (get-in session [:context :empathy/mode])
          vp-mode? (get-in session [:context :vp/mode])
          mvp-mode? (get-in session [:context :mvp/mode])]
      (cond
        canvas-mode? (handle-canvas-message adapter chat-id user-name text)
        empathy-mode? (handle-empathy-message adapter chat-id user-name text)
        vp-mode? (handle-vp-message adapter chat-id user-name text)
        mvp-mode? (handle-mvp-message adapter chat-id user-name text)
        :else (if-let [[cmd args] (extract-command text)]
                (handle-command adapter chat-id user-name cmd args)
                (handle-natural-message adapter chat-id user-name text))))))

;; ============================================================================
;; Router
;; ============================================================================

(defonce ^:private active-adapters (atom {}))

(defn register-adapter! [platform adapter]
  (swap! active-adapters assoc platform adapter)
  (println (str "✓ Chat adapter registered: " platform)))

(defn- setup-eca-approval-bridge!
  "Wire ECA approval bridge to chat adapter
   
   Allows tool approval requests to be forwarded to chat platforms.
   Silently skips if ECA approval bridge is not available."
  [adapter]
  (try
    (eca-approval/set-adapter!
     {:forward-approval-request
      (fn [confirmation-id message tool-name arguments]
        ;; Forward to all active sessions on this platform
        (doseq [[chat-id _session] @chat-sessions]
          (try
            (send-markdown! adapter chat-id message)
            (telemetry/emit! {:event :chat/approval-forwarded
                              :chat-id chat-id
                              :confirmation-id confirmation-id})
            (catch Exception e
              (telemetry/emit! {:event :chat/approval-forward-error
                                :chat-id chat-id
                                :error (.getMessage e)})))))})
    (telemetry/emit! {:event :chat/eca-approval-wired})
    (catch IllegalStateException e
      ;; ECA approval bridge function not bound - skip silently
      (telemetry/emit! {:event :chat/eca-approval-skipped
                        :reason "ECA approval bridge not available"}))
    (catch Exception e
      (telemetry/emit! {:event :chat/eca-approval-error
                        :error (.getMessage e)}))))

(defn start-all! []
  ;; Ensure ECA client is running
  (let [eca-status (eca/status)]
    (when-not (:running eca-status)
      (println "◈ Starting ECA client...")
      (try
        (eca/start!)
        (println "✓ ECA client started")
        (catch Exception e
          (println "⚠️  Failed to start ECA client:" (.getMessage e))))))

  (doseq [[platform adapter] @active-adapters]
    (let [handler (make-message-handler adapter)]
      ;; Wire ECA approval bridge to this adapter
      (setup-eca-approval-bridge! adapter)
      
      (start! adapter handler)
      (println (str "✓ Chat adapter started: " platform)))))

(defn stop-all! []
  (doseq [[platform adapter] @active-adapters]
    (stop! adapter)
    (println (str "✓ Chat adapter stopped: " platform)))
  (reset! active-adapters {}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver chat-adapters [_]
  {::pco/output [{:chat/adapters [:platform :running]}]}
  {:chat/adapters (map (fn [[k v]]
                         {:platform k
                          :running (some? v)})
                       @active-adapters)})

(pco/defresolver chat-sessions-resolver [_]
  {::pco/output [{:chat/sessions [:chat-id :message-count]}]}
  {:chat/sessions (map (fn [[k v]]
                         {:chat-id k
                          :message-count (count (:history v))})
                       @chat-sessions)})

(def resolvers
  [chat-adapters chat-sessions-resolver])

(def mutations [])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Usage
  (require '[ouroboros.chat.adapters :as adapters])

  ;; Create and register adapter
  (def tg-bot (adapters/telegram-bot "YOUR_BOT_TOKEN"))
  (register-adapter! :tg tg-bot)

  ;; Start all adapters
  (start-all!)

  ;; Stop all
  (stop-all!))
