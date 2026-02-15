(ns ouroboros.chat.commands
  "Chat Command Handlers

   Handles all /command processing for chat platforms.
   Commands include /start, /help, /build, /learn, etc.

   This namespace is an implementation detail - prefer using
   the public API in ouroboros.chat"
  (:require
   [clojure.string :as str]
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.session :as session]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.learning :as learning]
   [ouroboros.learning.lean-canvas :as canvas]
   [ouroboros.learning.empathy-map :as empathy]
   [ouroboros.learning.value-proposition :as vp]
   [ouroboros.learning.mvp-planning :as mvp]
   [ouroboros.workflow :as workflow]
   [ouroboros.wisdom :as wisdom]))

;; Re-export protocol functions
(def send-message! chatp/send-message!)
(def send-markdown! chatp/send-markdown!)

;; ============================================================================
;; Tool Safety
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
;; Command Parsing
;; ============================================================================

(defn extract-command
  "Extract command and args from text.
   Returns [cmd args] tuple or nil if not a command."
  [text]
  (when (str/starts-with? text "/")
    (let [parts (str/split (str/lower-case text) #"\s+" 2)
          cmd (first parts)
          args (second parts)]
      [(keyword (subs cmd 1)) (or args "")])))

;; ============================================================================
;; Command Handlers
;; ============================================================================

(defmulti handle-command
  "Dispatch command to appropriate handler"
  (fn [_adapter _chat-id _user-name cmd _args] cmd))

;; Default: unknown command
(defmethod handle-command :default
  [adapter chat-id _user-name cmd _args]
  (telemetry/emit! {:event :chat/unknown-command :command cmd :chat-id chat-id})
  (send-message! adapter chat-id (str "Unknown command: " (name cmd))))

;; /start
(defmethod handle-command :start
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :start :chat-id chat-id})
  (send-message! adapter chat-id
                 "🐍 Ouroboros Assistant ready!\n\nPowered by ECA (Editor Code Assistant)\nhttps://github.com/editor-code-assistant/eca\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve operation\n/deny <id> <reason> - Reject operation\n/build canvas <name> - Create Lean Canvas\n/build canvas empathy <persona> - Empathy Map Canvas\n/build empathy <persona> - Empathy Map (shorthand)\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary\n/plan <desc> - Create implementation plan\n/work <task> - Execute planned task\n/review - Start code review\n/compound - Document learnings\n\nJust type naturally to chat with ECA!"))

;; /help
(defmethod handle-command :help
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :help :chat-id chat-id})
  (send-message! adapter chat-id
                 (str "*Ouroboros Chat Commands*\n\n"
                      "*General*\n"
                      "/clear - Clear conversation history\n"
                      "/status - System status\n"
                      "/tools - List available tools\n"
                      "/confirm <id> - Approve dangerous operation\n"
                      "/deny <id> <reason> - Reject operation\n\n"
                      "*Builders (Product Development)*\n"
                      "/build canvas <name> - Create Lean Canvas\n"
                      "/build empathy <persona> - Empathy Map\n"
                      "/build valueprop <project> - Value Proposition Canvas\n"
                      "/build mvp <project> - MVP Planning\n/empathy - Show your empathy maps\n\n"
                      "*Learning*\n"
                      "/learn <topic> <insight> - Save learning\n"
                      "/recall <pattern> - Recall learnings\n"
                      "/wisdom - Wisdom summary\n\n"
                      "*Workflows (Compound Engineering)*\n"
                      "/plan <desc> - Create implementation plan\n"
                      "/work <task-id> - Execute planned task\n"
                      "/review - Start code review\n"
                      "/compound - Document learnings\n"
                      "/workflows - Show workflow help\n"
                      "/cancel - Cancel current workflow\n\n"
                      "Just type naturally to chat with ECA!")))

;; /clear
(defmethod handle-command :clear
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :clear :chat-id chat-id})
  (session/clear-session! chat-id)
  (send-message! adapter chat-id "✓ Conversation cleared"))

;; /status
(defmethod handle-command :status
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :status :chat-id chat-id})
  (let [result (tool-registry/call-tool :system/status {})]
    (send-message! adapter chat-id
                   (str "*System Status*\n\n"
                        (pr-str (:result result))))))

;; /tools
(defmethod handle-command :tools
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :tools :chat-id chat-id})
  (let [tools (list-chat-tools)]
    (send-message! adapter chat-id
                   (str "*Available Tools*\n\n"
                        (str/join "\n" (map :tool/name tools))))))

;; /build
(defmethod handle-command :build
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :build :chat-id chat-id})
  (if-let [[subcmd & rest-parts] (str/split (or args "") #"\s+" 3)]
    (let [remaining (str/join " " rest-parts)]
      (case subcmd
        ;; /build canvas empathy <persona> - Empathy Map Canvas
        "canvas" (if (= "empathy" (first rest-parts))
                   ;; Handle: /build canvas empathy <persona>
                   (let [persona-name (str/join " " (rest rest-parts))]
                     (if (str/blank? persona-name)
                       (send-message! adapter chat-id "⚠️ Usage: /build canvas empathy <persona-name>")
                       (let [empathy-session (empathy/start-empathy-session! chat-id persona-name)
                             prompt (empathy/get-next-prompt empathy-session)]
                         (session/assoc-context! chat-id :empathy/session (:session prompt))
                         (session/assoc-context! chat-id :empathy/mode true)
                         (send-markdown! adapter chat-id (:message prompt)))))
                   ;; Handle: /build canvas <project-name> - Lean Canvas
                   (let [project-name remaining]
                     (if (str/blank? project-name)
                       (send-message! adapter chat-id "⚠️ Usage: /build canvas <project-name>\nOr: /build canvas empathy <persona-name>")
                       (let [canvas-session (canvas/start-canvas-session! chat-id project-name)
                             prompt (canvas/get-next-prompt canvas-session)]
                         (session/assoc-context! chat-id :canvas/session (:session prompt))
                         (session/assoc-context! chat-id :canvas/mode true)
                         (send-markdown! adapter chat-id (:message prompt))))))
        "empathy" (if (str/blank? remaining)
                    (send-message! adapter chat-id "⚠️ Usage: /build empathy <persona-name>")
                    (let [empathy-session (empathy/start-empathy-session! chat-id remaining)
                          prompt (empathy/get-next-prompt empathy-session)]
                      (session/assoc-context! chat-id :empathy/session (:session prompt))
                      (session/assoc-context! chat-id :empathy/mode true)
                      (send-markdown! adapter chat-id (:message prompt))))
        "valueprop" (if (str/blank? remaining)
                      (send-message! adapter chat-id "⚠️ Usage: /build valueprop <project-name>")
                      (let [vp-session (vp/start-vp-session! chat-id remaining)
                            prompt (vp/get-next-prompt vp-session)]
                        (session/assoc-context! chat-id :vp/session (:session prompt))
                        (session/assoc-context! chat-id :vp/mode true)
                        (send-markdown! adapter chat-id (:message prompt))))
        "mvp" (if (str/blank? remaining)
                (send-message! adapter chat-id "⚠️ Usage: /build mvp <project-name>")
                (let [mvp-session (mvp/start-mvp-session! chat-id remaining)
                      prompt (mvp/get-next-prompt mvp-session)]
                  (session/assoc-context! chat-id :mvp/session (:session prompt))
                  (session/assoc-context! chat-id :mvp/mode true)
                  (send-markdown! adapter chat-id (:message prompt))))
        (send-message! adapter chat-id (str "Unknown build command: " subcmd))))
    (send-message! adapter chat-id "*Build Commands*\n\n/build canvas <name> - Create Lean Canvas\n/build canvas empathy <persona> - Empathy Map Canvas\n/build empathy <persona> - Empathy Map (shorthand)\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/build help - Show help")))

;; /empathy
(defmethod handle-command :empathy
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :empathy :chat-id chat-id})
  (let [empathy-maps (empathy/recall-user-empathy-maps chat-id)]
    (if (seq empathy-maps)
      (send-markdown! adapter chat-id
                      (str "*Your Empathy Maps*\n\n"
                           (str/join "\n\n"
                                     (for [em empathy-maps]
                                       (let [title (:learning/title em)
                                             insights (:learning/insights em)
                                             examples (:learning/examples em)
                                             created (:learning/created em)
                                             persona (when (seq examples) (:persona (first examples)))]
                                         (str "• **" title "**\n"
                                              (when persona
                                                (str "  Persona: " persona "\n"))
                                              (when (seq insights)
                                                (str "  " (first insights) "\n"))
                                              (when created
                                                (str "  _Created: " (subs created 0 10) "_"))))))))
      (send-message! adapter chat-id "You haven't created any empathy maps yet.\nUse `/build empathy <persona>` to create one."))))

;; /learn
(defmethod handle-command :learn
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :learn :chat-id chat-id})
  (if-let [[topic & insight-parts] (str/split (or args "") #"\s+" 2)]
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
    (send-message! adapter chat-id "*Learning Commands*\n\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary")))

;; /recall
(defmethod handle-command :recall
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :recall :chat-id chat-id})
  (if-not (str/blank? args)
    (let [learnings (learning/recall-by-pattern chat-id args)]
      (if (seq learnings)
        (send-message! adapter chat-id
                       (str "*Recalled Learnings*\n\n"
                            (str/join "\n\n"
                                      (map #(str "• " (:title %) "\n  "
                                                 (first (:insights %)))
                                           learnings))))
        (send-message! adapter chat-id (str "No learnings found matching: " args))))
    (send-message! adapter chat-id "⚠️ Usage: /recall <pattern>\n\nExample: /recall auth")))

;; /wisdom
(defmethod handle-command :wisdom
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :wisdom :chat-id chat-id})
  (let [stats (learning/get-user-stats chat-id)]
    (send-markdown! adapter chat-id
                    (str "*🧠 Your Wisdom Summary*\n\n"
                         "Total learnings: " (:total-learnings stats) "\n"
                         "Applications: " (:total-applications stats) "\n"
                         "Avg confidence: " (:average-confidence stats) "/5\n\n"
                         "Use /learn to save new insights."))))

;; /plan
(defmethod handle-command :plan
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :plan :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /plan <feature description>\n\nExample: /plan Add user authentication")
    (let [result (workflow/start-plan! chat-id args)]
      (session/assoc-context! chat-id :workflow/type :plan)
      (session/assoc-context! chat-id :workflow/mode true)
      (send-markdown! adapter chat-id (:message result)))))

;; /work
(defmethod handle-command :work
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :work :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /work <task-id>\n\nExample: /work feature-123\n\nUse /plan first to create a task.")
    (let [result (workflow/start-work! chat-id args)]
      (session/assoc-context! chat-id :workflow/type :work)
      (session/assoc-context! chat-id :workflow/mode true)
      (send-markdown! adapter chat-id (:message result)))))

;; /review
(defmethod handle-command :review
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :review :chat-id chat-id})
  (let [result (workflow/start-review! chat-id)]
    (session/assoc-context! chat-id :workflow/type :review)
    (session/assoc-context! chat-id :workflow/mode true)
    (send-markdown! adapter chat-id (:message result))))

;; /compound
(defmethod handle-command :compound
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :compound :chat-id chat-id})
  (let [result (workflow/start-compound! chat-id)]
    (session/assoc-context! chat-id :workflow/type :compound)
    (session/assoc-context! chat-id :workflow/mode true)
    (send-markdown! adapter chat-id (:message result))))

;; /workflows
(defmethod handle-command :workflows
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :workflows :chat-id chat-id})
  (send-markdown! adapter chat-id workflow/workflow-help))

;; /cancel
(defmethod handle-command :cancel
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :cancel :chat-id chat-id})
  (let [result (workflow/cancel-workflow! chat-id)]
    (session/update-context! chat-id dissoc :workflow/type :workflow/mode)
    (send-message! adapter chat-id (str "✓ Cancelled: " (name (:session-type result)) " workflow"))))



;; ============================================================================
;; Confirmation Commands (delegated to confirmation system)
;; ============================================================================

(defmethod handle-command :confirm
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :confirm :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /confirm <id>")
    (let [id (parse-long args)]
      (if id
        ;; Delegated to confirmation system
        (send-message! adapter chat-id (str "Confirmation " id " acknowledged."))
        (send-message! adapter chat-id "⚠️ Invalid confirmation ID")))))

(defmethod handle-command :deny
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :deny :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /deny <id> <reason>")
    (let [parts (str/split args #"\s+" 2)
          id (parse-long (first parts))
          reason (second parts)]
      (if id
        (send-message! adapter chat-id (str "Rejection " id " acknowledged. Reason: " (or reason "none")))
        (send-message! adapter chat-id "⚠️ Invalid rejection ID")))))