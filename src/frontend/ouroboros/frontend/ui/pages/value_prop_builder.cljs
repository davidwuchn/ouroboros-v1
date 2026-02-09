(ns ouroboros.frontend.ui.pages.value-prop-builder
  "Value Proposition builder page with guided UX

   Features:
   - Step-by-step tutorial
   - Guided prompts for each section
   - Example responses
   - Progress tracking"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Section Configuration with Prompts and Examples
;; ============================================================================

(def value-prop-sections
  "Configuration for each Value Proposition section"
  [{:key :customer-job
    :title "Customer Job"
    :icon "🎯"
    :prompt "What job does your customer need to get done?"
    :hint "Describe the core problem they're trying to solve"
    :description "Identify the main task, problem, or need your customer is trying to address."
    :prompts ["What task are they trying to accomplish?"
              "What problem keeps recurring for them?"
              "What need are they trying to satisfy?"
              "What goal are they working toward?"]
    :examples ["Coordinate team projects across time zones"
               "Track expenses and stay within budget"
               "Find qualified leads for sales pipeline"
               "Ship products to customers quickly"]}

   {:key :pains
    :title "Customer Pains"
    :icon "😫"
    :prompt "What frustrates your customer about current solutions?"
    :hint "Focus on the obstacles, risks, and negative outcomes they face"
    :description "Understand what annoys, frustrates, or creates risk for your customer."
    :prompts ["What do they find too costly (time, money, effort)?"
              "What makes them feel bad or frustrated?"
              "What risks do they fear?"
              "What common mistakes do they make?"]
    :examples ["Current tools are too complex and slow"
               "Manual processes waste 10+ hours per week"
               "Worried about security and data breaches"
               "Hard to get buy-in from stakeholders"]}

   {:key :gains
    :title "Customer Gains"
    :icon "🌟"
    :prompt "What would make your customer's life better?"
    :hint "Focus on the outcomes, benefits, and positive feelings they desire"
    :description "Discover what your customer would love to achieve or have."
    :prompts ["What would make them happy?"
              "What would make their job easier?"
              "What would they brag about to peers?"
              "What would exceed their expectations?"]
    :examples ["Save 5+ hours per week on admin tasks"
               "Get real-time visibility into team progress"
               "Feel confident about data security"
               "Look like a hero to their boss"]}

   {:key :products
    :title "Products & Services"
    :icon "📦"
    :prompt "What products or services will you offer?"
    :hint "List the specific things you'll create or provide"
    :description "Define what you'll actually build or provide."
    :prompts ["What is the core product/service?"
              "What features are essential (MVP)?"
              "What supporting services are needed?"
              "What format will it take (app, service, platform)?"]
    :examples ["Web-based project management dashboard"
               "Mobile app for expense tracking"
               "API for automated data sync"
               "Weekly consulting sessions"]}

   {:key :pain-relievers
    :title "Pain Relievers"
    :icon "💊"
    :prompt "How does your product reduce customer pains?"
    :hint "Connect your solution directly to their frustrations"
    :description "Explain how your product alleviates specific customer pains."
    :prompts ["How do you save them time/money?"
              "How do you reduce their risks?"
              "How do you eliminate frustrations?"
              "How do you prevent common mistakes?"]
    :examples ["One-click automation replaces manual work"
               "Real-time alerts prevent missed deadlines"
               "Bank-level encryption protects data"
               "Guided wizards prevent configuration errors"]}

   {:key :gain-creators
    :title "Gain Creators"
    :icon "🚀"
    :prompt "How does your product create customer gains?"
    :hint "Show how you deliver the outcomes they desire"
    :description "Explain how your product creates specific customer gains."
    :prompts ["How do you deliver desired outcomes?"
              "How do you exceed expectations?"
              "How do you make them look good?"
              "How do you create unexpected delight?"]
    :examples ["Dashboard shows ROI to justify budget"
               "Team productivity increased by 40%"
               "Integration with existing tools - no switching"
               "AI suggestions surface insights automatically"]}])

;; ============================================================================
;; Tutorial Steps
;; ============================================================================

(def tutorial-steps
  "Step-by-step tutorial for the Value Proposition Canvas"
  [{:step 1
    :title "Welcome to Value Proposition Design!"
    :icon "🎯"
    :content "The Value Proposition Canvas helps you design products that customers actually want. It ensures a fit between what you offer and what customers need."
    :tip "This takes about 20-30 minutes and builds on your Empathy Map insights."}
   {:step 2
    :title "Start with Customer Jobs"
    :icon "🧑‍💼"
    :content "First, identify the main job your customer is trying to get done. This could be a task, problem they're solving, or need they're fulfilling."
    :tip "Use your Empathy Map insights - what are they trying to achieve?"}
   {:step 3
    :title "Identify Their Pains"
    :icon "😫"
    :content "List what frustrates your customer about getting their job done. What obstacles, risks, or negative outcomes do they face?"
    :tip "Focus on the most severe and frequent pains first."}
   {:step 4
    :title "Discover Their Gains"
    :icon "🌟"
    :content "Capture what would make your customer happy. What outcomes do they desire? What would exceed their expectations?"
    :tip "Think about both expected and unexpected gains."}
   {:step 5
    :title "Define Your Offering"
    :icon "📦"
    :content "Now describe your products and services. What will you actually build or provide to help customers?"
    :tip "Start with the minimum viable product (MVP)."}
   {:step 6
    :title "Create Value Fit"
    :icon "✨"
    :content "Finally, show how your product relieves pains and creates gains. This is where you prove the fit between customer needs and your solution."
    :tip "The best value propositions directly address the biggest pains and gains."}])

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation submit-value-prop-response
  "Save a section response (client-only for now)"
  [{:keys [section-key response]}]
  (action [{:keys [state]}]
    (swap! state update-in [:page/id :value-prop-builder :completed-responses]
           (fnil conj [])
           {:section-key section-key
            :response response
            :completed-at (js/Date.now)})))

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
                                           "Start Building! >")
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
                      ;; Fixed header
                      (dom/div :.section-modal-header
                               (dom/span :.section-icon icon)
                               (dom/h2 title))

                      ;; Scrollable body
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

                      ;; Fixed actions
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
                    (dom/h3 "📚 Value Proposition Help")
                    (dom/button
                     {:className "btn btn-close"
                      :onClick on-close}
                     "x"))
           (dom/div :.help-content
                    (dom/div :.help-section
                             (dom/h4 "What is a Value Proposition?")
                             (dom/p "A Value Proposition describes the benefits customers can expect from your product. It shows the fit between what you offer and what customers need."))

                    (dom/div :.help-section
                             (dom/h4 "The 6 Sections")
                             (dom/ul
                              (dom/li (dom/strong "🎯 Customer Job: ") "What they're trying to accomplish")
                              (dom/li (dom/strong "😫 Pains: ") "What frustrates them")
                              (dom/li (dom/strong "🌟 Gains: ") "What they want to achieve")
                              (dom/li (dom/strong "📦 Products: ") "What you offer")
                              (dom/li (dom/strong "💊 Pain Relievers: ") "How you reduce pains")
                              (dom/li (dom/strong "🚀 Gain Creators: ") "How you create gains")))

                    (dom/div :.help-section
                             (dom/h4 "Tips for Success")
                             (dom/ul
                              (dom/li "Start with customer jobs, not your product")
                              (dom/li "Rank pains and gains by importance")
                              (dom/li "Focus on the most important items first")
                              (dom/li "Validate assumptions with real customers")))

                    (dom/button
                     {:className "btn btn-primary btn-block"
                      :onClick on-start-tutorial}
                     "🎓 Start Tutorial"))))

;; ============================================================================
;; Progress Component
;; ============================================================================

(defn value-prop-progress [{:keys [completed total sections completed-keys]}]
  (let [percentage (if (> total 0) (* 100 (/ completed total)) 0)]
    (dom/div :.builder-progress
             (dom/div :.progress-header
                      (dom/h3 "Your Progress")
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
    (dom/div {:className (str "value-prop-card " (when response "completed"))
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

(defsc ValuePropBuilderPage
  "Value Proposition builder page with guided UX"
  [this {:keys [project/id completed-responses ui] :as props}]
  {:query         [:project/id :project/name
                   :completed-responses
                   {:ui [:ui/show-tutorial :ui/tutorial-step
                         :ui/show-help :ui/show-section-modal
                         :ui/active-section :ui/section-value
                         :ui/show-wisdom]}
                   [df/marker-table :value-prop-builder]]
   :ident         (fn [] [:page/id :value-prop-builder])
   :route-segment ["project" :project-id "valueprop"]
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
                      (dr/route-deferred [:page/id :value-prop-builder]
                        (fn []
                          (df/load! app [:page/id :value-prop-builder] ValuePropBuilderPage
                            {:marker :value-prop-builder
                             :params {:project-id decoded-id}
                             :post-mutation `dr/target-ready
                             :post-mutation-params {:target [:page/id :value-prop-builder]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :value-prop-builder]))
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
        total-sections (count value-prop-sections)
        is-complete? (= completed-count total-sections)

        ;; Get current section config for modal
        active-section-config (when active-section
                                (first (filter #(= (:key %) active-section) value-prop-sections)))]

    (if loading?
      (dom/div :.loading
               (dom/div :.loading-spinner)
               (dom/p "Loading Value Proposition builder..."))

      (dom/div :.builder-page.value-prop-builder

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
                                         [(submit-value-prop-response
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
                          (dom/h1 "🎯 Value Proposition Builder")
                          (dom/p :.builder-subtitle (str "Defining value for: " project-name)))
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
          {:current-step :valueprop
           :project-id project-id
           :on-navigate (fn [route]
                          (let [encoded-id (str/replace (str project-id) "/" "~")]
                            (dr/change-route! this ["project" encoded-id route])))})

        ;; Wisdom sidebar (contextual tips)
        (ui/wisdom-sidebar
          {:phase :valueprop
           :show? show-wisdom
           :on-close #(comp/transact! this [(m/set-props {:ui (assoc ui :ui/show-wisdom false)})])})

        ;; Progress
        (value-prop-progress {:completed completed-count
                              :total total-sections
                              :sections value-prop-sections
                              :completed-keys completed-keys})

        (if is-complete?
          ;; Completion State
          (dom/div :.completion-state
                   (dom/div :.completion-icon "🎉")
                   (dom/h2 "Value Proposition Complete!")
                   (dom/p "You now have a clear value proposition. Ready for the next step?")
                   (dom/div :.insights-summary
                            (dom/h4 "Your Value Proposition:")
                            (dom/div :.vp-summary
                                     (for [{:keys [key title icon]} value-prop-sections]
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
                             {:on-click #(dr/change-route! this ["project" (str/replace (str project-id) "/" "~") "mvp"])
                              :variant :primary}
                             "Continue to MVP Planning >")))

          ;; Section Cards Grid
          (dom/div :.value-prop-grid
                   (for [{:keys [key] :as section} value-prop-sections]
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
