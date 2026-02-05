(ns ouroboros.learning.mvp-planning
  "MVP (Minimum Viable Product) Planning

   Guides users through defining their MVP based on Value Proposition insights.
   Focuses on: Core Value, Key Features, Success Metrics, and Validation Experiments.

   Outputs feed into Lean Canvas: Solution, Key Metrics, and Channels blocks.
   "
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; MVP Planning Sections
;; ============================================================================

(def ^:private mvp-sections
  "MVP planning sections"
  [{:key :core-value :question "What is the CORE VALUE your MVP delivers? (One sentence)"
    :hint "From Value Proposition. E.g., 'Helps developers learn from past AI interactions'"}
   {:key :must-have-features :question "What are the MUST-HAVE features? (Max 3)"
    :hint "Without these, there's no value. E.g., 'Learning memory, educational approvals, chat interface'"}
   {:key :nice-to-have :question "What are NICE-TO-HAVE features? (Can launch without)"
    :hint "Future enhancements. E.g., 'Team sharing, advanced analytics, mobile app'"}
   {:key :success-metrics :question "What SUCCESS METRICS will you track?"
    :hint "From Value Proposition gains. E.g., 'User learning retention, approval education time, error reduction'"}
   {:key :validation-experiments :question "What VALIDATION EXPERIMENTS will you run?"
    :hint "Test riskiest assumptions. E.g., 'Landing page signups, user interview feedback, prototype testing'"}
   {:key :timeline :question "What is your MVP TIMELINE? (Weeks or months)"
    :hint "Realistic timeframe. E.g., '6 weeks: 2w research, 3w build, 1w test'"}
   {:key :next-steps :question "What are your IMMEDIATE NEXT STEPS? (This week)"
    :hint "Actionable tasks. E.g., 'Sketch wireframes, write user stories, setup project repo'"}])

(defn- generate-mvp-id
  [user-id project-name]
  (str (name user-id) "/mvp-" (str/replace project-name #"\s+" "-") "-" (System/currentTimeMillis)))

(defn start-mvp-from-vp!
  "Start an MVP planning session from Value Proposition insights"
  [user-id project-name {:keys [pain-relievers gain-creators products-services]}]
  (let [mvp-id (generate-mvp-id user-id project-name)]
    {:mvp/id mvp-id
     :mvp/user-id user-id
     :mvp/project-name project-name
     :mvp/state :active
     :mvp/current-section 0
     :mvp/sections {:core-value (str pain-relievers " / " gain-creators)}
     :mvp/started-at (System/currentTimeMillis)
     :mvp/updated-at (System/currentTimeMillis)}))

(defn start-mvp-session!
  "Start a new MVP planning session"
  [user-id project-name]
  (let [mvp-id (generate-mvp-id user-id project-name)]
    {:mvp/id mvp-id
     :mvp/user-id user-id
     :mvp/project-name project-name
     :mvp/state :active
     :mvp/current-section 0
     :mvp/sections {}
     :mvp/started-at (System/currentTimeMillis)
     :mvp/updated-at (System/currentTimeMillis)}))

(defn- get-section-index
  [session]
  (or (:mvp/current-section session) 0))

(defn- get-current-section
  [session]
  (let [idx (get-section-index session)
        existing-keys (set (keys (:mvp/sections session)))
        sections-to-process (filterv #(not (contains? existing-keys (:key %))) mvp-sections)]
    (when (< idx (count sections-to-process))
      (nth sections-to-process idx))))

(defn- format-progress
  [session]
  (let [existing-keys (set (keys (:mvp/sections session)))
        total (- (count mvp-sections) (count existing-keys))
        idx (get-section-index session)]
    (str "(" (inc idx) "/" total ")")))

(defn update-mvp-section!
  "Update a section in MVP session"
  [session section-key response]
  (let [updated (-> session
                    (assoc-in [:mvp/sections section-key] response)
                    (update :mvp/current-section inc)
                    (assoc :mvp/updated-at (System/currentTimeMillis)))]

    ;; Save as learning insight
    (learning/save-insight! (:mvp/user-id session)
                            {:title (str "MVP Planning: " (name section-key))
                             :insights [response]
                             :pattern (str "mvp-" (name section-key))
                             :category "product-execution"
                             :tags #{"mvp" "planning" "execution" (name section-key)}
                             :examples [{:mvp-id (:mvp/id session)
                                         :project (:mvp/project-name session)
                                         :section section-key
                                         :response response}]})

    (telemetry/emit! {:event :learning/mvp-section-saved
                      :user-id (:mvp/user-id session)
                      :mvp-id (:mvp/id session)
                      :section section-key})

    updated))

(defn get-mvp-summary
  "Generate summary of completed MVP plan"
  [session]
  (let [sections (:mvp/sections session)
        completed (count (keys sections))
        total (count mvp-sections)]
    {:mvp/id (:mvp/id session)
     :mvp/project-name (:mvp/project-name session)
     :mvp/completed-sections completed
     :mvp/total-sections total
     :mvp/completion-percent (int (* 100 (/ completed total)))
     :mvp/sections (keys sections)
     :mvp/started-at (:mvp/started-at session)
     :mvp/updated-at (:mvp/updated-at session)}))

(defn is-complete?
  "Check if MVP plan is complete"
  [session]
  (let [existing-keys (set (keys (:mvp/sections session)))
        total-sections (count mvp-sections)]
    (>= (count existing-keys) total-sections)))

(defn get-next-prompt
  "Get next prompt for user"
  [session]
  (if (is-complete? session)
    {:message "🚀 *MVP Planning Complete!*\n\nNow you have a clear roadmap. Next: Lean Canvas to build your full business model."
     :session session
     :complete? true}
    (let [current-section (get-current-section session)
          progress (format-progress session)]
      {:message (str "🚀 **Section " progress ": " (name (:key current-section)) "**\n"
                     (:question current-section) "\n\n"
                     "💡 *Hint*: " (:hint current-section) "\n\n"
                     (when (= :core-value (:key current-section))
                       "From Value Proposition: \"" (get-in session [:mvp/sections :core-value] "") "\"\n\n")
                     "Type your answer (or 'skip' to move on):")
       :session session
       :complete? false
       :current-section (:key current-section)})))

(defn process-response!
  "Process user response for current section"
  [session response]
  (if (is-complete? session)
    {:session session
     :message "MVP plan is already complete. Use /mvp summary to view."
     :complete? true}
    (let [current-section (get-current-section session)
          section-key (:key current-section)
          response-normalized (str/trim response)
          skip? (= "skip" (str/lower-case response-normalized))]
      (cond
        (str/blank? response-normalized)
        {:session session
         :message "Please provide an answer. You can type 'skip' to move on."
         :complete? false}

        skip?
        (let [updated-session (update-mvp-section! session section-key "[User skipped this section]")
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))

        :else
        (let [updated-session (update-mvp-section! session section-key response-normalized)
              next-prompt (get-next-prompt updated-session)]
          (merge next-prompt {:session updated-session}))))))

;; ============================================================================
;; Lean Canvas Connection
;; ============================================================================

(defn extract-solution-for-canvas
  "Extract solution features for Lean Canvas"
  [session]
  (let [sections (:mvp/sections session)
        must-have (get sections :must-have-features "")
        nice-to-have (get sections :nice-to-have "")]
    (str "MVP: " must-have "\n\nFuture: " nice-to-have)))

(defn extract-metrics-for-canvas
  "Extract key metrics for Lean Canvas"
  [session]
  (let [sections (:mvp/sections session)]
    (get sections :success-metrics "User learning retention, approval education time")))

(defn extract-validation-for-canvas
  "Extract validation experiments for Lean Canvas channels"
  [session]
  (let [sections (:mvp/sections session)]
    (get sections :validation-experiments "Landing page, user interviews, prototype testing")))

;; ============================================================================
;; Learning Integration
;; ============================================================================

(defn recall-user-mvps
  "Find all MVP planning learnings for a user"
  [user-id]
  (learning/recall-by-pattern user-id "mvp-"))

(defn find-related-mvps
  "Find MVP plans related to current context"
  [user-id project-context]
  (learning/find-related user-id project-context))

(comment
  ;; Test the flow
  (require '[ouroboros.learning.mvp-planning :as mvp])

  ;; Start from Value Proposition
  (def vp-data {:pain-relievers "Memory system prevents repeating mistakes"
                :gain-creators "Learning flywheel helps ship faster"
                :products-services "AI assistant with educational approvals"})

  (def session (mvp/start-mvp-from-vp! :alex "Ouroboros" vp-data))

  ;; Get first prompt
  (mvp/get-next-prompt session)

  ;; Extract for Lean Canvas
  (mvp/extract-solution-for-canvas session))