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
   [ouroboros.workflow :as workflow]))

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
                 "🐍 Ouroboros Assistant ready!\n\nPowered by ECA (Editor Code Assistant)\nhttps://github.com/editor-code-assistant/eca\n\nAvailable commands:\n/help - Show help\n/clear - Clear conversation\n/status - System status\n/tools - List available tools\n/confirm <id> - Approve operation\n/deny <id> <reason> - Reject operation\n/build canvas <name> - Create Lean Canvas\n/build canvas empathy <persona> - Empathy Map Canvas\n/build empathy <persona> - Empathy Map (shorthand)\n/build valueprop <project> - Value Proposition Canvas\n/build mvp <project> - MVP Planning\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/wisdom - Wisdom summary\n/plan <desc> - Create plan and start work\n/review - Start code review\n\nJust type naturally to chat with ECA!"))

;; /help
(defmethod handle-command :help
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :help :chat-id chat-id})
  (send-message! adapter chat-id
                 (str "*Ouroboros Chat Commands*\n\n"
                      "*Development Workflow (Plan → Build → Review → Learn)*\n"
                      "📋 /plan <desc> - Create plan (loads *planning* skill)\n"
                      "⚒ /code <task> - Implement with *clojure-expert* skill\n"
                      "👁 /review - Code review with *clojure-reviewer* skill\n"
                      "📚 /learn <topic> <insight> - Capture with *continuous-learning*\n\n"
                      "*Available Skills*\n"
                      "• planning - 3-file pattern for complex tasks\n"
                      "• clojure-expert - REPL-first development\n"
                      "• clojure-reviewer - Multi-scale code review\n"
                      "• continuous-learning - λ-based pattern learning (φ, e, λ, Δ)\n\n"
                      "*Builders (Product Development)*\n"
                      "/build canvas <name> - Create Lean Canvas\n"
                      "/build empathy <persona> - Empathy Map\n"
                      "/build valueprop <project> - Value Proposition Canvas\n"
                      "/build mvp <project> - MVP Planning\n"
                      "/empathy - Show your empathy maps\n\n"
                      "*Learning & Recall*\n"
                      "/recall <pattern> - Recall learnings\n"
                      "/reviews - Due reviews (spaced repetition)\n"
                      "/reviews all - All scheduled reviews\n"
                      "/wisdom - Wisdom summary\n\n"
                      "*System*\n"
                      "/clear - Clear conversation history\n"
                      "/status - System status\n"
                      "/tools - List available tools\n"
                      "/confirm <id> - Approve dangerous operation\n"
                      "/deny <id> <reason> - Reject operation\n"
                      "/cancel - Cancel current workflow\n\n"
                      "Type naturally to chat, or use /plan, /code, /review, /learn for skill-enhanced workflow!")))

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
    (if-let [status (:result result)]
      (let [{:keys [state running? ready?]} status
            state-str (cond
                       (set? state) (name (first state))
                       :else (str state))]
        (send-message! adapter chat-id
                       (str "*System Status*\n\n"
                            "🟢 Running: " (if running? "Yes" "No") "\n"
                            "✅ Ready: " (if ready? "Yes" "No") "\n"
                            "📊 State: " state-str)))
      (send-message! adapter chat-id
                     (str "*System Status*\n\n"
                          "⚠️ System not initialized or unavailable")))))

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
        ;; /build canvas - Lean Canvas Builder
        "canvas" (let [port (or (some-> (System/getenv "PORT") Integer/parseInt) 8080)
                        url (str "http://localhost:" port)]
                    (send-markdown! adapter chat-id
                      (str "Opening Lean Canvas Builder...\n" url "#/lean-canvas-builder")))
        "empathy" (let [port (or (some-> (System/getenv "PORT") Integer/parseInt) 8080)
                        url (str "http://localhost:" port)]
                    (send-markdown! adapter chat-id
                      (str "Opening Empathy Map Builder...\n" url "#/empathy-builder")))
        "valueprop" (let [port (or (some-> (System/getenv "PORT") Integer/parseInt) 8080)
                         url (str "http://localhost:" port)]
                     (send-markdown! adapter chat-id
                       (str "Opening Value Proposition Builder...\n" url "#/value-prop-builder")))
        "mvp" (let [port (or (some-> (System/getenv "PORT") Integer/parseInt) 8080)
                    url (str "http://localhost:" port)]
                (send-markdown! adapter chat-id
                  (str "Opening MVP Builder...\n" url "#/mvp-builder")))
        (send-message! adapter chat-id (str "Unknown build command: " subcmd))))
    (send-message! adapter chat-id "*Build Commands*\n\n/build canvas - Open Lean Canvas Builder\n/build empathy - Open Empathy Map Builder\n/build valueprop - Open Value Proposition Builder\n/build mvp - Open MVP Builder\n/build help - Show help")))

;; /empathy
(defmethod handle-command :empathy
  [adapter chat-id _user-name _cmd _args]
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
      (if (or (str/blank? topic) (str/blank? insight))
        (send-message! adapter chat-id "⚠️ Usage: /learn <topic> <insight>\n\nExample: /learn clojure \"Use keywords for map keys, not strings\"")
        (let [record (learning/save-insight-with-review! chat-id
                                                         {:title (str "Learning: " topic)
                                                          :insights [insight]
                                                          :pattern (str "user-learning-" (str/replace topic #"\s+" "-"))
                                                          :category "user-insights"
                                                          :tags #{topic "learning"}})]
          (send-message! adapter chat-id (str "✓ Learning saved: " topic "\n📅 Review scheduled in 1 day")))))
    (send-message! adapter chat-id "*Learning Commands*\n\n/learn <topic> <insight> - Save learning\n/recall <pattern> - Recall learnings\n/review - Due reviews\n/wisdom - Wisdom summary")))

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

;; /reviews - Spaced Repetition System
(defmethod handle-command :reviews
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :reviews :chat-id chat-id})
  (let [subcmd (str/lower-case (or args ""))]
    (case subcmd
      ("" "due" "now")
      (let [due (learning/get-due-reviews chat-id)]
        (if (seq due)
          (do
            (send-markdown! adapter chat-id
                            (str "*📚 Reviews Due* (" (count due) ")\n\n"
                                 (str/join "\n\n"
                                           (map-indexed (fn [idx review]
                                                          (str (inc idx) ". **" (:title review) "**\n"
                                                               "   Category: " (:category review) "\n"
                                                               "   Reply with: /reviews done " idx " <1-4> (confidence)\n"
                                                               "   Or: /reviews skip " idx))
                                                        due))))
            ;; Store due reviews in session for reference
            (session/assoc-context! chat-id :review/due-list due))
          (let [stats (learning/get-review-stats chat-id)]
            (send-message! adapter chat-id
                           (str "✅ No reviews due!\n\n"
                                "Reviews scheduled: " (:total-scheduled stats) "\n"
                                "Upcoming: " (:upcoming stats) "\n\n"
                                "Use /learn to save new insights.")))))

      "all"
      (let [stats (learning/get-review-stats chat-id)]
        (send-markdown! adapter chat-id
                        (str "*📅 All Scheduled Reviews*\n\n"
                             "Total: " (:total-scheduled stats) "\n"
                             "Due now: " (:due-now stats) "\n"
                             "Upcoming: " (:upcoming stats) "\n\n"
                             "By level:\n"
                             (str/join "\n" (map (fn [[level count]]
                                                   (str "  Level " level ": " count))
                                                 (:by-level stats))))))

      ("done" "skip")
      (let [parts (str/split (or args "") #"\s+" 3)
            action (first parts)
            idx-str (second parts)
            confidence-str (nth parts 2 nil)
            due-list (session/get-context chat-id :review/due-list)
            idx (when idx-str (try (dec (Integer/parseInt idx-str)) (catch Exception _ nil)))]
        (if (and due-list idx (>= idx 0) (< idx (count due-list)))
          (let [review (nth due-list idx)
                learning-id (:learning-id review)]
            (case action
              "done" (let [confidence (try (Integer/parseInt confidence-str) (catch Exception _ 3))]
                       (learning/complete-review! learning-id confidence)
                       (send-message! adapter chat-id
                                      (str "✓ Review completed: " (:title review) "\n"
                                           "📅 Next review scheduled")))
              "skip" (do
                       (learning/skip-review! learning-id)
                       (send-message! adapter chat-id
                                      (str "⏭ Review skipped: " (:title review) "\n"
                                           "📅 Rescheduled with shorter interval")))))
          (send-message! adapter chat-id "⚠️ Invalid review index. Use /reviews to see due reviews.")))

      ;; Default: show help
      (send-message! adapter chat-id "*Review Commands*\n\n/reviews - Show due reviews\n/reviews all - Show all scheduled reviews\n/reviews done <index> <1-4> - Complete a review (confidence 1=hard, 4=easy)\n/reviews skip <index> - Skip/reschedule a review"))))

;; /wisdom
(defmethod handle-command :wisdom
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :wisdom :chat-id chat-id})
  (let [stats (learning/get-user-stats chat-id)
        review-stats (learning/get-review-stats chat-id)
        due-count (:due-now review-stats)]
    (send-markdown! adapter chat-id
                    (str "*🧠 Your Wisdom Summary*\n\n"
                         "Total learnings: " (:total-learnings stats) "\n"
                         "Applications: " (:total-applications stats) "\n"
                         "Avg confidence: " (:average-confidence stats) "/5\n\n"
                         "*Spaced Repetition*\n"
                         "Reviews scheduled: " (:total-scheduled review-stats) "\n"
                         "Due now: " due-count (when (pos? due-count) " 📚") "\n"
                         "Upcoming: " (:upcoming review-stats) "\n\n"
                         (when (pos? due-count)
                           "⚡ You have reviews due! Use /review to start.\n\n")
                         "Use /learn to save new insights."))))

;; /plan
(defmethod handle-command :plan
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :plan :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /plan <feature description>\n\nExample: /plan Add user authentication")
    (let [plan-result (workflow/start-plan! chat-id args)]
      (session/assoc-context! chat-id :workflow/type :plan)
      (session/assoc-context! chat-id :workflow/mode true)
      (send-markdown! adapter chat-id (:message plan-result)))))

;; /review
(defmethod handle-command :review
  [adapter chat-id _user-name _cmd _args]
  (telemetry/emit! {:event :chat/command :command :review :chat-id chat-id})
  (let [result (workflow/start-review! chat-id)]
    (session/assoc-context! chat-id :workflow/type :review)
    (session/assoc-context! chat-id :workflow/mode true)
    (send-markdown! adapter chat-id (:message result))))

;; /code
(defmethod handle-command :code
  [adapter chat-id _user-name _cmd args]
  (telemetry/emit! {:event :chat/command :command :code :chat-id chat-id})
  (if (str/blank? args)
    (send-message! adapter chat-id "⚠️ Usage: /code <task description>\n\nExample: /code Create a function to validate user input\n\n🤖 Loads *clojure-expert* skill for REPL-first development.")
    (do
      (session/assoc-context! chat-id :workflow/type :code)
      (session/assoc-context! chat-id :workflow/mode true)
      (send-message! adapter chat-id (str "⚒ *Coding Mode Activated*\n\n"
                                          "Skill loaded: *clojure-expert*\n"
                                          "Task: " args "\n\n"
                                          "I'll help you implement this with REPL-first methodology. "
                                          "Let's start by exploring the codebase and testing in the REPL.")))))

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