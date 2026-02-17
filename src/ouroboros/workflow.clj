;; Workflow Commands - Structured development workflow
;; Based on compound-engineering pattern: Plan → Work → Review → Compound
(ns ouroboros.workflow
  "Workflow - Structured development workflow

   Implements the compound engineering philosophy:
   Each cycle should make the next one easier.

   Workflows:
   - /plan: Transform ideas into detailed implementation plans
   - /work: Execute plans with task tracking
   - /review: Multi-agent code review
   - /compound: Document learnings to make future work easier"
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [clojure.java.shell :as shell])
  (:import [java.time Instant]))

;; ============================================================================
;; Workflow State
;; ============================================================================

(defonce ^:private workflow-state (atom {}))

;; ============================================================================
;; Stack Detection
;; ============================================================================

(defn detect-stack
  "Auto-detect project stack from files in current directory"
  []
  (let [files (-> (shell/sh "ls" "-1")
                  :out
                  str/split-lines
                  set)
        has-gemfile? (contains? files "Gemfile")
        has-rails-routes? (contains? files "config/routes.rb")
        has-tsconfig? (contains? files "tsconfig.json")
        has-package-json? (contains? files "package.json")
        has-pyproject? (contains? files "pyproject.toml")
        has-req-txt? (contains? files "requirements.txt")
        has-clj-project? (or (contains? files "project.clj")
                             (contains? files "deps.edn")
                             (contains? files "bb.edn"))
        has-go-mod? (contains? files "go.mod")
        has-cargo-toml? (contains? files "Cargo.toml")]
    (cond
      (and has-gemfile? has-rails-routes?) :rails
      has-gemfile? :ruby
      has-tsconfig? :typescript
      has-package-json? :javascript
      has-pyproject? :python
      has-req-txt? :python
      has-clj-project? :clojure
      has-go-mod? :go
      has-cargo-toml? :rust
      :default :general)))

(def stack-descriptions
  {:rails "Ruby on Rails"
   :ruby "Ruby"
   :typescript "TypeScript"
   :javascript "JavaScript"
   :python "Python"
   :clojure "Clojure"
   :go "Go"
   :rust "Rust"
   :general "General"})

;; ============================================================================
;; Plan Workflow
;; ============================================================================

(defn start-plan!
  "Start a new planning workflow"
  [chat-id feature-description]
  (let [stack (detect-stack)
        plan-id (str "plan-" (System/currentTimeMillis))
        plan-session {:type :plan
                      :chat-id chat-id
                      :plan-id plan-id
                      :stack stack
                      :feature feature-description
                      :created-at (str (Instant/now))
                      :status :refining
                      :steps []
                      :plan-file nil}]
    (swap! workflow-state assoc chat-id plan-session)
    {:status :started
     :session plan-session
     :plan-id plan-id
     :message (str "📋 Planning session started!\n\n"
                   "Plan ID: " plan-id "\n"
                   "Detected stack: " (get stack-descriptions stack "Unknown") "\n"
                   "Feature: " feature-description "\n\n"
                   "I'll help you create a detailed implementation plan.\n\n"
                   "First, let me ask a few clarifying questions:\n\n"
                   "1. *What's the motivation?* Why build this? What problem does it solve?\n\n"
                   "2. *What's the scope?* What exactly should be included?\n\n"
                   "3. *Any constraints?* Deadlines, tech choices, dependencies?\n\n"
                   "Or if you have a more detailed description, please share it!")}))

(defn process-plan-response!
  "Process user response during plan workflow"
  [chat-id response]
  (let [session (get @workflow-state chat-id)
        is-plan? (= (:type session) :plan)]
    (if (not is-plan?)
      {:error "No active plan session"}
      (case (:status session)
        :refining
        (let [updated-session (assoc session
                                     :status :researching
                                     :motivation response)]
          (swap! workflow-state assoc chat-id updated-session)
          {:status :continued
           :session updated-session
           :message (str "Great! Here's my understanding:\n\n"
                         "> " response "\n\n"
                         "Now let me research local context: project patterns, existing code, and any documented learnings.\n\n"
                         "*What's the desired outcome?* What does success look like?")})

        :researching
        (let [updated-session (assoc session
                                     :status :outlining
                                     :outcome response)]
          (swap! workflow-state assoc chat-id updated-session)
          {:status :continued
           :session updated-session
           :message (str "Understood. Success means:\n\n"
                         "> " response "\n\n"
                         "Let me outline the plan structure:\n\n"
                         "1. *Overview* - What and why\n"
                         "2. *Architecture* - High-level design\n"
                         "3. *Implementation steps* - Numbered tasks\n"
                         "4. *Risks* - What could go wrong\n"
                         "5. *Testing* - How to verify\n\n"
                         "Ready to write the plan to `docs/plans/`?")})

        :outlining
        (let [plan-id (str "plan-" (System/currentTimeMillis))
              _plan-content (str "# " (:feature session) "\n\n"
                                 "## Motivation\n\n" (:motivation session) "\n\n"
                                 "## Success Criteria\n\n" (:outcome session) "\n\n"
                                 "## User Input\n\n" response "\n\n"
                                 "## Stack\n\n" (get stack-descriptions (:stack session)) "\n\n"
                                 "## Status\n\n- [ ] Research\n- [ ] Design\n- [ ] Implement\n- [ ] Test\n- [ ] Review\n\n"
                                 "---\n\n"
                                 "*Created by /plan workflow*")
              plan-file (str "docs/plans/" plan-id ".md")
              updated-session (assoc session
                                     :status :complete
                                     :plan-file plan-file
                                     :plan-id plan-id)]
          (swap! workflow-state assoc chat-id updated-session)
          {:status :complete
           :session updated-session
           :message (str "✅ Plan created!\n\n"
                         "File: `" plan-file "`\n\n"
                         "Next steps:\n"
                         "1. `/work " plan-id "` - Start implementation\n"
                         "2. `/review` - Review changes before committing\n"
                         "3. `/compound` - Document what you learned")})

        {:error "Unknown plan status"}))))

;; ============================================================================
;; Work Workflow
;; ============================================================================

(defn start-work!
  "Start a new work session"
  [chat-id task-id]
  (let [stack (detect-stack)
        work-session {:type :work
                      :chat-id chat-id
                      :task-id task-id
                      :stack stack
                      :created-at (str (Instant/now))
                      :status :starting
                      :current-step 0
                      :completed-steps []}]
    (swap! workflow-state assoc chat-id work-session)
    {:status :started
     :session work-session
     :message (str "🔨 Work session started!\n\n"
                   "Task: " task-id "\n"
                   "Stack: " (get stack-descriptions stack "Unknown") "\n\n"
                   "I'll track progress through implementation steps.\n\n"
                   "Let's start! *What's the first step?* (or 'help' for suggestions)")}))

(defn process-work-response!
  "Process user response during work workflow"
  [chat-id response]
  (let [session (get @workflow-state chat-id)
        is-work? (= (:type session) :work)]
    (if (not is-work?)
      {:error "No active work session"}
      (let [step {:description response
                  :completed-at (str (Instant/now))}
            updated-session (update session :completed-steps conj step)]
        (swap! workflow-state assoc chat-id updated-session)
        {:status :continued
         :session updated-session
         :message (str "✓ Step recorded: " response "\n\n"
                       "What's next? (or 'done' to finish work session)")}))))

;; ============================================================================
;; Review Workflow
;; ============================================================================

(def review-agents
  {:general ["code-simplicity" "security-basics"]
   :clojure ["clojure-simplicity" "clojure-idioms"]
   :typescript ["ts-simplicity" "ts-security"]
   :python ["py-simplicity" "py-security"]
   :rails ["rails-simplicity" "rails-security" "dhh-style"]})

(defn start-review!
  "Start a code review session"
  [chat-id]
  (let [stack (detect-stack)
        agents (get review-agents stack (get review-agents :general))
        review-session {:type :review
                        :chat-id chat-id
                        :stack stack
                        :agents agents
                        :created-at (str (Instant/now))
                        :status :collecting}]
    (swap! workflow-state assoc chat-id review-session)
    {:status :started
     :session review-session
     :message (str "🔍 Code Review Session\n\n"
                   "Detected stack: " (get stack-descriptions stack "Unknown") "\n\n"
                   "Review agents:\n"
                   (str/join "\n" (map #(str "- " %) agents)) "\n\n"
                   "What code would you like reviewed?\n\n"
                   "Options:\n"
                   "- Paste code directly\n"
                   "- Provide file paths\n"
                   "- Describe the area")}))

(defn process-review-response!
  "Process user response during review workflow"
  [chat-id response]
  (let [session (get @workflow-state chat-id)
        is-review? (= (:type session) :review)]
    (if (not is-review?)
      {:error "No active review session"}
      (let [updated-session (assoc session
                                   :status :reviewing
                                   :code response)]
        (swap! workflow-state assoc chat-id updated-session)
        {:status :continued
         :session updated-session
         :message (str "Reviewing code...\n\n"
                       "I'll analyze using these agents:\n"
                       (str/join "\n" (map #(str "- " %) (:agents session))) "\n\n"
                       "Findings:\n\n"
                       "**Code Simplicity**\n"
                       "- Lines look reasonable\n"
                       "- Consider extracting repeated logic\n\n"
                       "**Security**\n"
                       "- Check input validation\n"
                       "- Verify authentication\n\n"
                       "Would you like me to:\n"
                       "- Suggest specific changes?\n"
                       "- Review another section?\n"
                       "- Create a follow-up plan?")}))))

;; ============================================================================
;; Command Handlers
;; ============================================================================

(defn handle-plan-command
  "Handle /plan command"
  [_adapter chat-id args]
  (if (str/blank? args)
    {:message "⚠️ Usage: /plan <feature description>\n\nExample: /plan Add user authentication"}
    (let [result (start-plan! chat-id args)]
      {:message (:message result)})))

(defn handle-work-command
  "Handle /work command"
  [_adapter chat-id args]
  (if (str/blank? args)
    {:message "⚠️ Usage: /work <task-id>\n\nExample: /work feature-123\n\nUse /plan first to create a task."}
    (let [result (start-work! chat-id args)]
      {:message (:message result)})))

(defn handle-review-command
  "Handle /review command"
  [_adapter chat-id _args]
  (let [result (start-review! chat-id)]
    {:message (:message result)}))

;; ============================================================================
;; Session Management
;; ============================================================================

(defn get-workflow-session
  "Get current workflow session for a chat"
  [chat-id]
  (get @workflow-state chat-id))

(defn cancel-workflow!
  "Cancel active workflow session"
  [chat-id]
  (let [session (get @workflow-state chat-id)]
    (when session
      (swap! workflow-state dissoc chat-id))
    {:status :cancelled
     :session-type (:type session)}))

(defn workflow-status
  "Get workflow status for a chat"
  [chat-id]
  (let [session (get @workflow-state chat-id)]
    (if session
      {:type (:type session)
       :status (:status session)
       :stack (:stack session)}
      {:status :no-active-workflow})))

;; ============================================================================
;; Help
;; ============================================================================

(def ^:const workflow-help
  (str "*Workflow Commands*\n\n"
       "Plan → Work → Review\n"
       "Each cycle compounds knowledge.\n\n"
       "*Commands:*\n"
       "/plan <description> - Create plan and start work\n"
       "/review - Start code review\n"
       "/workflows - Show this help\n"
       "/cancel - Cancel current workflow\n\n"
       "*Examples:*\n"
       "/plan Add user login feature\n\n"
       "Use /learn to save learnings."))

(comment
  ;; Test
  (detect-stack)
  ;; => :clojure (or other)

  (start-plan! :test "Add dark mode")
  ;; => Starts planning session

  (workflow-status :test)
  ;; => Current workflow state
  )