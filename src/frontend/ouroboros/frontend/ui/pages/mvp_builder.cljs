(ns ouroboros.frontend.ui.pages.mvp-builder
  "MVP Planning builder page with guided UX

   Features:
   - Step-by-step tutorial
   - Guided prompts for each section
   - Example responses
   - Prioritization framework
   - Progress tracking"
   (:require
    [clojure.string :as str]
    [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
    [com.fulcrologic.fulcro.dom :as dom]
    [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
    [com.fulcrologic.fulcro.data-fetch :as df]
    [com.fulcrologic.fulcro.mutations :as m]
    [ouroboros.frontend.ui.components :as ui]
    [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Section Configuration with Prompts and Examples
;; ============================================================================

(def mvp-sections
  "Configuration for each MVP Planning section"
  [{:key :core-problem
    :title "Core Problem"
    :icon "🎯"
    :prompt "What is THE single most important problem to solve?"
    :hint "Focus on one problem, not many. What's the #1 pain point?"
    :description "Define the single most critical problem your MVP must solve."
    :prompts ["What's the most painful problem from your empathy map?"
              "What problem, if unsolved, makes everything else pointless?"
              "What do users complain about most?"
              "What would make users switch from current solutions?"]
    :examples ["Users waste 5+ hours/week on manual data entry"
               "Teams can't see real-time project status"
               "No easy way to collaborate across time zones"
               "Current tools require too much training"]}

   {:key :target-user
    :title "Target User"
    :icon "👤"
    :prompt "Who is your FIRST target user?"
    :hint "Be specific - one persona, not everyone"
    :description "Define the specific user segment your MVP will serve first."
    :prompts ["Who has this problem most severely?"
              "Who would pay immediately to solve it?"
              "Who can you reach easily?"
              "Who would give you feedback quickly?"]
    :examples ["Product managers at Series A startups (20-50 employees)"
               "Freelance designers managing 5+ clients"
               "Remote team leads with 5-10 direct reports"
               "Small business owners with no IT support"]}

   {:key :success-metric
    :title "Success Metric"
    :icon "📊"
    :prompt "How will you measure if the MVP is successful?"
    :hint "Pick ONE primary metric that indicates product-market fit"
    :description "Define the key metric that proves your MVP works."
    :prompts ["What behavior indicates users find value?"
              "What would prove product-market fit?"
              "What metric shows users are 'activated'?"
              "What's the leading indicator of retention?"]
    :examples ["70% of users complete core workflow in week 1"
               "NPS score > 40 from first 100 users"
               "50% weekly active user retention"
               "Users invite 2+ teammates within 30 days"]}

   {:key :must-have-features
    :title "Must-Have Features"
    :icon "✅"
    :prompt "What features are ESSENTIAL for the MVP?"
    :hint "Only include features without which the product doesn't work"
    :description "List the absolute minimum features needed. Be ruthless."
    :prompts ["What's needed to solve the core problem?"
              "What would make the product unusable if missing?"
              "What's the smallest set that delivers value?"
              "What can you build in 2-4 weeks?"]
    :examples ["User authentication & onboarding"
               "Core dashboard with key metrics"
               "Basic project/task creation"
               "Email notifications for updates"]}

   {:key :nice-to-have
    :title "Nice-to-Have (V2)"
    :icon "💭"
    :prompt "What features can wait until after MVP?"
    :hint "These are important but not essential for first launch"
    :description "Park these ideas for later - they're valuable but not MVP."
    :prompts ["What would enhance but isn't critical?"
              "What do competitors have that you can skip?"
              "What would 'power users' want?"
              "What integrations can wait?"]
    :examples ["Advanced reporting & analytics"
               "Third-party integrations (Slack, Jira)"
               "Mobile app (web first)"
               "Custom branding & white-labeling"]}

   {:key :out-of-scope
    :title "Out of Scope"
    :icon "🚫"
    :prompt "What are you explicitly NOT building?"
    :hint "Being clear about what's out helps focus the team"
    :description "Define what's explicitly out of scope for MVP."
    :prompts ["What features are distracting?"
              "What edge cases can you ignore?"
              "What user segments won't you serve?"
              "What would bloat the product?"]
    :examples ["Enterprise SSO & compliance (for now)"
               "Offline mode support"
               "Multi-language support"
               "Custom workflow automation"]}

   {:key :timeline
    :title "Timeline"
    :icon "📅"
    :prompt "What's your timeline to launch?"
    :hint "Shorter is usually better - aim for 2-6 weeks"
    :description "Set a deadline to force prioritization decisions."
    :prompts ["When do you want first users?"
              "What's the shortest realistic timeline?"
              "What milestones mark progress?"
              "When will you know if it's working?"]
    :examples ["Week 1-2: Core feature development"
               "Week 3: Internal testing & fixes"
               "Week 4: Beta launch with 10 users"
               "Week 6: Iterate based on feedback"]}

   {:key :risks
    :title "Risks & Assumptions"
    :icon "⚠️"
    :prompt "What are the biggest risks and assumptions?"
    :hint "Be honest - what could make this fail?"
    :description "Identify what could go wrong and assumptions to validate."
    :prompts ["What must be true for this to work?"
              "What's the biggest unknown?"
              "What technical risks exist?"
              "What market risks exist?"]
    :examples ["ASSUMPTION: Users will pay $X/month"
               "RISK: Competitors may copy quickly"
               "ASSUMPTION: Users will adopt new workflow"
               "RISK: Technical complexity underestimated"]}])

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for MVP Planning"
  [{:step 1
    :title "Welcome to MVP Planning!"
    :icon "🚀"
    :content "MVP (Minimum Viable Product) planning helps you build the smallest possible product that validates your idea. Less is more!"
    :tip "The goal is to learn fast, not build big. What's the minimum you need to test your hypothesis?"}
   {:step 2
    :title "Start with ONE Problem"
    :icon "🎯"
    :content "The biggest MVP mistake is trying to solve too many problems. Pick THE one problem that, if solved, makes your product valuable."
    :tip "Reference your Value Proposition - what's the #1 pain you relieve?"}
   {:step 3
    :title "Define Your First User"
    :icon "👤"
    :content "Your MVP isn't for everyone. Define the specific person who will be your first user. Be narrow to start, expand later."
    :tip "Think: Who would pay today if this existed? Start there."}
   {:step 4
    :title "Set a Success Metric"
    :icon "📊"
    :content "How will you know if your MVP works? Define ONE primary metric that indicates users find value."
    :tip "Good metrics: Retention, NPS, completion rate. Bad metrics: Downloads, signups (vanity)."}
   {:step 5
    :title "Ruthlessly Prioritize Features"
    :icon "✅"
    :content "List features in three buckets: Must-Have (MVP), Nice-to-Have (V2), and Out of Scope. Be ruthless about Must-Have."
    :tip "For each 'must-have', ask: Would the product work without this? If yes, move it."}
   {:step 6
    :title "Set a Deadline"
    :icon "📅"
    :content "MVPs should launch in weeks, not months. Set an aggressive but realistic timeline. Deadlines force prioritization."
    :tip "Aim for 2-6 weeks. If it takes longer, your scope is too big."}])

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation submit-mvp-response
  "Save a section response"
  [{:keys [section-key response]}]
  (action [{:keys [state]}]
    (swap! state update-in [:page/id :mvp-builder :completed-responses]
           (fnil conj [])
           {:section-key section-key
            :response response
            :completed-at (js/Date.now)})
    ;; Sync to backend
    (let [s @state
          project-id (get-in s [:page/id :mvp-builder :project/id])
          responses (get-in s [:page/id :mvp-builder :completed-responses] [])
          session-id (str "mvp-" project-id)]
      (when project-id
        (ws/save-builder-data! project-id session-id :mvp-planning responses)))))

;; ============================================================================
;; Tutorial Modal Component
;; ============================================================================

(defn tutorial-modal
  "Step-by-step tutorial overlay"
  [{:keys [current-step on-next on-prev on-skip on-complete]}]
  (let [step-data (nth tutorial-steps (dec current-step))
        total-steps (count tutorial-steps)
        is-last? (= current-step total-steps)]
    (dom/div :.modal-overlay
             (dom/div :.tutorial-modal
                      ;; Progress dots
                      (dom/div :.tutorial-progress
                               (for [i (range 1 (inc total-steps))]
                                 (dom/span {:key i
                                            :className (str "progress-dot "
                                                            (when (= i current-step) "active")
                                                            (when (< i current-step) "completed"))})))
                      ;; Step content
                      (dom/div :.tutorial-content
                               (dom/div :.tutorial-icon (:icon step-data))
                               (dom/h2 (:title step-data))
                               (dom/p :.tutorial-text (:content step-data))
                               (dom/div :.tutorial-tip
                                        (dom/span :.tip-icon "💡")
                                        (dom/span (:tip step-data))))
                      ;; Navigation
                      (dom/div :.tutorial-actions
                               (dom/button
                                {:className "btn btn-link"
                                 :onClick on-skip}
                                "Skip tutorial")
                               (dom/div :.tutorial-nav
                                        (when (> current-step 1)
                                          (dom/button
                                           {:className "btn btn-secondary"
                                            :onClick on-prev}
                                           "< Back"))
                                        (if is-last?
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-complete}
                                           "Start Planning! >")
                                          (dom/button
                                           {:className "btn btn-primary"
                                            :onClick on-next}
                                           "Next >"))))))))

;; ============================================================================
;; Section Input Modal with Prompts and Examples
;; ============================================================================

(defn section-input-modal
  "Modal for adding section content with guided prompts"
  [{:keys [section on-submit on-cancel current-value on-value-change]}]
  (let [{:keys [title icon description prompts examples hint]} section]
    (dom/div :.modal-overlay
             (dom/div :.modal-content.section-modal
                      (dom/div :.section-modal-header
                               (dom/span :.section-icon icon)
                               (dom/h2 title))

                      (dom/div :.modal-body
                               (dom/p :.section-description-inline description)

                               (dom/div :.prompts-section
                                        (dom/h4 "Think about:")
                                        (dom/ul :.prompt-list
                                                (for [prompt prompts]
                                                  (dom/li {:key prompt} prompt))))

                               (dom/div :.examples-section
                                        (dom/h4 "Examples (click to use):")
                                        (dom/div :.example-chips
                                                 (for [example examples]
                                                   (dom/span
                                                    {:key example
                                                     :className "example-chip"
                                                     :onClick #(on-value-change (if (str/blank? current-value)
                                                                                  example
                                                                                  (str current-value "\n" example)))
                                                     :title "Click to add this example"}
                                                    example))))

                               (dom/div :.form-group
                                        (dom/label "Your answer:")
                                        (when hint
                                          (dom/p :.input-hint (str "💡 " hint)))
                                        (dom/textarea
                                         {:value (or current-value "")
                                          :onChange #(on-value-change (.. % -target -value))
                                          :placeholder "Type your response here..."
                                          :rows 3})))

                      (dom/div :.modal-actions
                               (dom/button
                                {:className "btn btn-secondary"
                                 :onClick on-cancel}
                                "Cancel")
                               (dom/button
                                {:className "btn btn-primary"
                                 :onClick #(on-submit current-value)
                                 :disabled (str/blank? current-value)}
                                "Save & Continue"))))))

;; ============================================================================
;; Help Panel Component
;; ============================================================================

(defn help-panel
  "Slide-out help panel with tips and guidance"
  [{:keys [on-close on-start-tutorial]}]
  (dom/div :.help-panel
           (dom/div :.help-header
                    (dom/h3 "📚 MVP Planning Help")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "x"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is an MVP?")
                             (dom/p "A Minimum Viable Product is the smallest version of your product that delivers value and lets you learn from real users. It's not a crappy product - it's a focused product."))

                    (dom/div :.help-section
                             (dom/h4 "The 8 Sections")
                             (dom/ul
                              (dom/li (dom/strong "🎯 Core Problem: ") "The ONE problem to solve")
                              (dom/li (dom/strong "👤 Target User: ") "Your first specific customer")
                              (dom/li (dom/strong "📊 Success Metric: ") "How you'll measure success")
                              (dom/li (dom/strong "✅ Must-Have: ") "Essential features only")
                              (dom/li (dom/strong "💭 Nice-to-Have: ") "Features for V2")
                              (dom/li (dom/strong "🚫 Out of Scope: ") "What you won't build")
                              (dom/li (dom/strong "📅 Timeline: ") "Your launch deadline")
                              (dom/li (dom/strong "⚠️ Risks: ") "Assumptions to validate")))

                    (dom/div :.help-section
                             (dom/h4 "MVP Principles")
                             (dom/ul
                              (dom/li "Build the smallest thing that tests your hypothesis")
                              (dom/li "Focus on learning, not features")
                              (dom/li "Launch in weeks, not months")
                              (dom/li "Perfect is the enemy of done")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn mvp-progress [{:keys [completed total sections completed-keys]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/div :.progress-header
                      (dom/h3 "Planning Progress")
                      (dom/span :.progress-percentage (str (Math/round percentage) "%")))
             (dom/div :.progress-container
                      (dom/div :.progress-bar
                               (dom/div :.progress-fill {:style {:width (str percentage "%")}})))
             ;; Section breakdown
             (dom/div :.section-status
                      (for [{:keys [key icon title]} sections]
                        (let [is-completed? (contains? completed-keys key)]
                          (dom/span
                           {:key (name key)
                            :className (str "status-item " (when is-completed? "completed"))
                            :title (str title ": " (if is-completed? "Done" "Not started"))}
                           icon)))))))

;; ============================================================================
;; Section Card Component
;; ============================================================================

(defn section-card
  "Displays a section card with response or prompt to fill"
  [{:keys [section response on-click on-edit]}]
  (let [{:keys [key title icon hint]} section]
    (dom/div {:className (str "mvp-card " (when response "completed"))
              :onClick (if response on-edit on-click)}
             (dom/div :.card-header
                      (dom/span :.card-icon icon)
                      (dom/h4 title)
                      (when response
                        (dom/span :.completed-badge "✓")))
             (if response
               (dom/div :.card-response
                        (dom/p response)
                        (dom/button {:className "btn btn-sm btn-link"
                                     :onClick (fn [e]
                                                (.stopPropagation e)
                                                (on-edit))}
                                    "Edit"))
               (dom/div :.card-prompt
                        (dom/p :.hint hint)
                        (dom/button {:className "btn btn-primary btn-sm"}
                                    "+ Add Response"))))))

;; ============================================================================
;; Main Builder Page
;; ============================================================================

(defsc MVPBuilderPage
  "MVP Planning builder page with guided UX"
  [this {:keys [project/id completed-responses ui] :as props}]
  {:query         [:project/id :project/name
                   :completed-responses
                   {:ui [:ui/show-tutorial :ui/tutorial-step
                         :ui/show-help :ui/show-section-modal
                         :ui/active-section :ui/section-value
                         :ui/show-wisdom]}
                   [df/marker-table :mvp-builder]]
   :ident         (fn [] [:page/id :mvp-builder])
   :route-segment ["project" :project-id "mvp"]
   :initial-state (fn [_] {:completed-responses []
                            :ui {:ui/show-tutorial true
                                 :ui/tutorial-step 1
                                 :ui/show-help false
                                 :ui/show-section-modal false
                                 :ui/active-section nil
                                 :ui/section-value ""
                                 :ui/show-wisdom false}})
   :pre-merge     (fn [{:keys [current-normalized data-tree]}]
                     (let [default-ui {:ui/show-tutorial true
                                       :ui/tutorial-step 1
                                       :ui/show-help false
                                       :ui/show-section-modal false
                                       :ui/active-section nil
                                       :ui/section-value ""
                                       :ui/show-wisdom false}
                          existing-ui (:ui current-normalized)
                          ui-val (if (and existing-ui (seq existing-ui))
                                   existing-ui
                                   default-ui)
                          clean-data (dissoc data-tree :ui :completed-responses)]
                      (merge
                       {:ui ui-val
                        :completed-responses (or (not-empty (:completed-responses current-normalized)) [])}
                       clean-data)))
   :will-enter    (fn [app {:keys [project-id]}]
                    (let [decoded-id (str/replace (or project-id "") "~" "/")]
                      (dr/route-deferred [:page/id :mvp-builder]
                        (fn []
                          (df/load! app [:page/id :mvp-builder] MVPBuilderPage
                            {:marker :mvp-builder
                             :params {:project-id decoded-id}
                             :post-mutation `dr/target-ready
                             :post-mutation-params {:target [:page/id :mvp-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :mvp-builder]))
        project-id id
        project-name (or (:project/name props) "")
        responses (or completed-responses [])
        {:keys [ui/show-tutorial ui/tutorial-step ui/show-help
                ui/show-section-modal ui/active-section ui/section-value
                ui/show-wisdom]} (or ui {})
        tutorial-step (or tutorial-step 1)
        section-value (or section-value "")

        ;; Build response map by section key
        response-map (reduce (fn [acc {:keys [section-key response]}]
                               (assoc acc section-key response))
                             {} responses)
        completed-keys (set (keys response-map))
        completed-count (count completed-keys)
        total-sections (count mvp-sections)
        is-complete? (= completed-count total-sections)

        ;; Get current section config for modal
        active-section-config (when active-section
                                (first (filter #(= (:key %) active-section) mvp-sections)))]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading MVP planner..."))

      (dom/div :.builder-page.mvp-builder

        ;; Tutorial Modal
        (when show-tutorial
          (tutorial-modal
           {:current-step tutorial-step
            :on-next #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (inc tutorial-step))})])
            :on-prev #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/tutorial-step (dec tutorial-step))})])
            :on-skip #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])
            :on-complete #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-tutorial false)})])}))

        ;; Section Input Modal
        (when (and show-section-modal active-section-config)
          (section-input-modal
           {:section active-section-config
            :current-value section-value
            :on-value-change (fn [v]
                               (comp/transact! this [(m/set-props {:ui (assoc ui :ui/section-value v)})]))
            :on-submit (fn [response]
                         (comp/transact! this
                                         [(submit-mvp-response
                                           {:section-key active-section
                                            :response response})
                                          (m/set-props {:ui (-> ui
                                                                (assoc :ui/show-section-modal false)
                                                                (assoc :ui/active-section nil)
                                                                (assoc :ui/section-value ""))})]))
            :on-cancel #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                    (assoc :ui/show-section-modal false)
                                                                    (assoc :ui/active-section nil)
                                                                    (assoc :ui/section-value ""))})])}))

        ;; Help Panel
        (when show-help
          (help-panel
           {:on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-help false)})])
            :on-start-tutorial #(comp/transact! this [(m/set-props {:ui (-> ui
                                                                            (assoc :ui/show-help false)
                                                                            (assoc :ui/show-tutorial true)
                                                                            (assoc :ui/tutorial-step 1))})])}))

        ;; Header
        (dom/div :.builder-header
                 (dom/div :.header-content
                          (dom/h1 "🚀 MVP Planning Builder")
                          (dom/p :.builder-subtitle (str "Planning MVP for: " project-name)))
                 (dom/div :.header-actions
                   (dom/button
                    {:className (str "btn-wisdom " (when show-wisdom "active"))
                     :onClick #(comp/transact! this [(m/set-props {:ui (update ui :ui/show-wisdom not)})])}
                    "💡 Wisdom")
                   (dom/button
                    {:className "btn btn-help"
                     :onClick #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-help true)})])
                     :title "How to use this tool"}
                    "❓ Help")))

        ;; Flywheel progress indicator
        (ui/flywheel-indicator
          {:current-step :mvp
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :mvp
           :show? show-wisdom
           :project-id project-id
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Progress
        (mvp-progress {:completed completed-count
                       :total total-sections
                       :sections mvp-sections
                       :completed-keys completed-keys})

        (if is-complete?
          ;; Completion State
          (dom/div :.completion-state
                   (dom/div :.completion-icon "🎉")
                   (dom/h2 "MVP Plan Complete!")
                   (dom/p "You now have a clear plan for your minimum viable product!")
                   (dom/div :.insights-summary
                            (dom/h4 "Your MVP Plan:")
                            (dom/div :.mvp-summary
                                     (for [{:keys [key title icon]} mvp-sections]
                                       (when-let [response (get response-map key)]
                                         (dom/div {:key (name key) :className "summary-item"}
                                                  (dom/strong (str icon " " title ": "))
                                                  (dom/p response))))))
                   (dom/div :.completion-actions
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~")])
                              :variant :secondary}
                             "Back to Project")
                            (ui/button
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "canvas"])
                              :variant :primary}
                             "Continue to Lean Canvas >")))

          ;; Section Cards Grid
          (dom/div :.mvp-grid
                   (for [{:keys [key] :as section} mvp-sections]
                     (section-card
                      {:key (name key)
                       :section section
                       :response (get response-map key)
                       :on-click #(comp/transact! this
                                                  [(m/set-props {:ui (-> ui
                                                                         (assoc :ui/show-section-modal true)
                                                                         (assoc :ui/active-section key)
                                                                         (assoc :ui/section-value ""))})])
                       :on-edit #(comp/transact! this
                                                 [(m/set-props {:ui (-> ui
                                                                        (assoc :ui/show-section-modal true)
                                                                        (assoc :ui/active-section key)
                                                                        (assoc :ui/section-value (get response-map key "")))})])}))))))))
