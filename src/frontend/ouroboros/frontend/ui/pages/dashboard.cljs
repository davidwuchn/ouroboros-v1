(ns ouroboros.frontend.ui.pages.dashboard
  "Start Here - Main entry point with joyful onboarding experience"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.app :refer [app]]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.ui.chat-panel :as chat]
   [ouroboros.frontend.websocket :as ws]))

(defn- handle-key-activation [on-activate e]
  (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
    (.preventDefault e)
    (on-activate)))

(defn- get-phase-status [phase progress]
  (let [phases (:phases progress)
        phase-data (first (filter #(= (:phase %) phase) phases))
        status (:status phase-data)]
    (case status
      :completed :completed
      :active :active
      :not-started)))

(defn- get-next-recommended-phase [progress]
  (let [phases (:phases progress)]
    (if (seq phases)
      (or (->> phases
               (filter #(not= (:status %) :completed))
               first
               :phase)
          :lean-canvas)
      :empathy-map)))

(defn- calculate-completion-pct [progress]
  (let [phases (:phases progress)
        total (count phases)
        completed (count (filter #(= (:status %) :completed) phases))]
    (if (pos? total)
      (int (* 100 (/ completed total)))
      0)))

(defn celebration-banner [{:keys [completed-count]}]
  (when (pos? completed-count)
    (let [message (case completed-count
                    1 "🎉 You've started! First section complete. Keep going!"
                    2 "🚀 Making progress! Two phases done. You're building momentum!"
                    3 "🔥 Almost there! Three phases complete. Finish strong!"
                    4 "🏆 Product vision complete! You're ready to build something amazing!")]
      (dom/div {:className "celebration-banner" :role "status" :aria-live "polite"}
               (dom/span :.celebration-icon (case completed-count 1 "🎉" 2 "🚀" 3 "🔥" 4 "🏆"))
               (dom/span :.celebration-text message)))))

(defn concepts-explainer [{:keys [expanded? on-toggle]}]
  (dom/div :.concepts-card
           (dom/div {:className "concepts-header" :onClick on-toggle :role "button" :tabIndex 0
                     :onKeyDown #(handle-key-activation on-toggle %) :aria-expanded (if expanded? "true" "false")}
                    (dom/h3 :.concepts-title "📖 Understanding Ouroboros")
                    (dom/span :.concepts-toggle (if expanded? "−" "+")))
           (when expanded?
             (dom/div :.concepts-content
                      (dom/div :.concept-section
                               (dom/div :.concept-header
                                        (dom/span :.concept-icon "🎯")
                                        (dom/h4 :.concept-title "Product Development Flywheel"))
                               (dom/p :.concept-desc "A 4-phase methodology for building products. Each phase feeds into the next.")
                               (dom/div :.flywheel-diagram
                                        (dom/div {:className "flywheel-step completed"}
                                                 (dom/span :.fw-icon "👥") (dom/span :.fw-label "Empathy"))
                                        (dom/span :.flywheel-arrow "→")
                                        (dom/div {:className "flywheel-step active"}
                                                 (dom/span :.fw-icon "💎") (dom/span :.fw-label "Value"))
                                        (dom/span :.flywheel-arrow "→")
                                        (dom/div {:className "flywheel-step"}
                                                 (dom/span :.fw-icon "🚀") (dom/span :.fw-label "MVP"))
                                        (dom/span :.flywheel-arrow "→")
                                        (dom/div {:className "flywheel-step"}
                                                 (dom/span :.fw-icon "📊") (dom/span :.fw-label "Canvas")))
                               (dom/p :.concept-hint "📍 Where: Interactive builders on the Project page"))
                      (dom/div :.concept-section
                               (dom/div :.concept-header
                                        (dom/span :.concept-icon "⚡")
                                        (dom/h4 :.concept-title "Development Workflow"))
                               (dom/p :.concept-desc "Plan and review code changes with AI assistance via chat.")
                               (dom/div :.workflow-diagram
                                        (dom/div {:className "workflow-step"}
                                                 (dom/span :.wf-icon "/plan") (dom/span :.wf-label "Plan"))
                                        (dom/span :.workflow-arrow "→")
                                        (dom/div {:className "workflow-step wide"}
                                                 (dom/span :.wf-icon "💬") (dom/span :.wf-label "Implement"))
                                        (dom/span :.workflow-arrow "→")
                                        (dom/div {:className "workflow-step"}
                                                 (dom/span :.wf-icon "/review") (dom/span :.wf-label "Review")))
                               (dom/p :.concept-hint "📍 Where: AI Chat sidebar (/plan and /review commands)"))
                      (dom/div :.concepts-tip
                               (dom/strong "💡 Tip: ")
                               "Use the Product Flywheel for strategic thinking. Use the Dev Workflow for tactical implementation.")))))

(defn flywheel-journey [{:keys [progress encoded-id]}]
  (let [phases [[:empathy-map "Empathy Map" "👥" "Understand your users"]
                [:value-proposition "Value Proposition" "💎" "Define your unique value"]
                [:mvp-planning "MVP Planning" "🚀" "Scope your minimum product"]
                [:lean-canvas "Lean Canvas" "📊" "Model your business"]]
        completed-count (count (filter #(= (:status %) :completed) (:phases progress)))]
    (dom/div :.journey-card
             (dom/div :.journey-header
                      (dom/h3 :.journey-title "🛤️ Your Product Journey")
                      (when (pos? completed-count)
                        (dom/span :.journey-progress (str completed-count "/4 complete"))))
             (dom/div :.journey-path
                      (map-indexed
                       (fn [idx [phase-key label icon desc]]
                         (let [status (get-phase-status phase-key progress)
                               route (case phase-key :empathy-map "empathy" :value-proposition "valueprop" :mvp-planning "mvp" :lean-canvas "canvas")]
                           (dom/div {:key (name phase-key) :className (str "journey-stop journey-" (name status))}
                                    (when (pos? idx)
                                      (dom/div {:className (str "journey-connector " (when (= status :completed) "connector-completed"))}))
                                    (dom/div {:className "journey-node" :onClick #(when encoded-id (dr/change-route! app ["project" encoded-id route]))
                                              :role "button" :tabIndex 0
                                              :onKeyDown (fn [e] (handle-key-activation (fn [] (dr/change-route! app ["project" encoded-id route])) e))
                                              :aria-label (str label " - " (case status :completed "Completed" :active "In Progress" "Not Started"))}
                                             (dom/span :.journey-icon icon)
                                             (when (= status :completed) (dom/span :.journey-check "✓")))
                                    (dom/div :.journey-info
                                             (dom/span :.journey-label label)
                                             (dom/span :.journey-desc desc)
                                             (when (= status :active) (dom/span :.journey-badge "Continue Here →"))))))
                       phases)))))

(defn recommended-action [{:keys [progress encoded-id]}]
  (let [next-phase (get-next-recommended-phase progress)
        completion-pct (calculate-completion-pct progress)
        [action-title action-desc action-route cta-text icon]
        (case next-phase
          :empathy-map ["👥 Start with Empathy" "Understand your users' pains, gains, and behaviors before building anything." "empathy" "Begin Understanding Users" "👥"]
          :value-proposition ["💎 Define Your Value" "What makes your product unique? How do you solve customer pains?" "valueprop" "Define Value Proposition" "💎"]
          :mvp-planning ["🚀 Plan Your MVP" "Scope the minimum features needed to solve the core problem." "mvp" "Start MVP Planning" "🚀"]
          :lean-canvas ["📊 Map Your Business" "Create a one-page business model to align your thinking." "canvas" "Build Lean Canvas" "📊"]
          ;; Default fallback
          ["👥 Start with Empathy" "Understand your users' pains, gains, and behaviors before building anything." "empathy" "Begin Understanding Users" "👥"])]
    (dom/div {:className (str "recommended-action " (when (pos? completion-pct) "has-progress"))}
             (dom/div :.rec-badge-container
                      (dom/span :.rec-badge "⭐ Recommended Next Step")
                      (when (pos? completion-pct) (dom/span :.rec-progress (str completion-pct "% complete"))))
             (dom/div :.rec-content
                      (dom/span :.rec-icon icon)
                      (dom/div :.rec-text
                               (dom/h4 :.rec-title action-title)
                               (dom/p :.rec-desc action-desc)))
             (when encoded-id
               (ui/button {:onClick #(dr/change-route! app ["project" encoded-id action-route]) :variant :primary :size :large :className "rec-cta"}
                          (str cta-text " →"))))))

(defn primary-paths [{:keys [encoded-id this-comp]}]
  (dom/div :.primary-paths
           (dom/h3 :.paths-title "🚀 What would you like to do?")
           (dom/div :.paths-grid
                    (dom/div {:className "path-card product-path" :onClick #(when encoded-id (dr/change-route! app ["project" encoded-id]))
                              :role "button" :tabIndex 0 :onKeyDown (fn [e] (handle-key-activation (fn [] (when encoded-id (dr/change-route! app ["project" encoded-id]))) e))}
                             (dom/div :.path-visual
                                      (dom/span :.path-icon "🎯")
                                      (dom/div :.path-mini-flywheel (dom/span :.mini-fw "👥") (dom/span :.mini-fw "💎") (dom/span :.mini-fw "🚀") (dom/span :.mini-fw "📊")))
                             (dom/div :.path-content
                                      (dom/h4 :.path-name "Build a Product")
                                      (dom/p :.path-desc "Follow the Product Development Flywheel from empathy to business model.")
                                      (dom/div :.path-tags (dom/span :.path-tag "Startups") (dom/span :.path-tag "New Products") (dom/span :.path-tag "Features"))
                                      (dom/span :.path-cta "Start Building →")))
                    (dom/div {:className "path-card dev-path" :onClick #(comp/transact! this-comp [(chat/toggle-chat {})])
                              :role "button" :tabIndex 0 :onKeyDown (fn [e] (handle-key-activation (fn [] (comp/transact! this-comp [(chat/toggle-chat {})])) e))}
                             (dom/div :.path-visual
                                      (dom/span :.path-icon "⚡")
                                      (dom/div :.path-mini-workflow (dom/code :.mini-wf "/plan") (dom/span :.mini-arrow "→") (dom/code :.mini-wf "/review")))
                             (dom/div :.path-content
                                      (dom/h4 :.path-name "Write Code")
                                      (dom/p :.path-desc "Plan features, implement with AI assistance, and review code quality.")
                                      (dom/div :.path-tags (dom/span :.path-tag "Implementation") (dom/span :.path-tag "Refactoring") (dom/span :.path-tag "Code Review"))
                                      (dom/span :.path-cta "Open AI Chat →")))
                    (dom/div {:className "path-card resource-path" :onClick #(dr/change-route! app ["wisdom"])
                              :role "button" :tabIndex 0 :onKeyDown (fn [e] (handle-key-activation (fn [] (dr/change-route! app ["wisdom"])) e))}
                             (dom/div :.path-visual (dom/span :.path-icon "📚"))
                             (dom/div :.path-content
                                      (dom/h4 :.path-name "Browse Resources")
                                      (dom/p :.path-desc "Templates, learning patterns, and AI-powered insights.")
                                      (dom/span :.path-cta.secondary "Explore Wisdom →"))))))

(defn empty-state-welcome [{:keys [on-create-project]}]
  (dom/div :.empty-state
           (dom/div :.empty-illustration "🌱")
           (dom/h3 :.empty-title "Welcome to Ouroboros!")
           (dom/p :.empty-desc "You're about to build something amazing. Ouroboros guides you through the Product Development Flywheel.")
           (dom/div :.empty-features
                    (dom/div :.empty-feature (dom/span :.ef-icon "🎯") (dom/span :.ef-text "4-phase methodology"))
                    (dom/div :.empty-feature (dom/span :.ef-icon "🤖") (dom/span :.ef-text "AI-powered guidance"))
                    (dom/div :.empty-feature (dom/span :.ef-icon "📊") (dom/span :.ef-text "Visual builders")))
           (ui/button {:onClick on-create-project :variant :primary :size :large} "🚀 Start Your First Project")))

(defn dashboard-loading []
  (dom/div {:key "dashboard-loading" :className "start-here-loading"}
           (dom/div :.loading-header
                    (dom/h1 :.loading-title "🌟 Start Here")
                    (dom/p :.loading-subtitle "Loading your dashboard..."))
           (dom/div {:key "dashboard-skeleton" :className "dash-loading-grid"}
                    (dom/div :.skeleton-card)
                    (dom/div :.skeleton-card)
                    (dom/div :.skeleton-card)
                    (dom/div :.skeleton-card))))

(defn error-state [{:keys [message on-retry]}]
  (dom/div :.error-state
           (dom/div :.error-state-icon "⚠️")
           (dom/div :.error-state-message message)
           (when on-retry
             (ui/button {:on-click on-retry :variant :primary} "Try Again"))))

(defsc DashboardPage [this props]
  {:query [[df/marker-table :dashboard] :page/error :ui/concepts-expanded?]
   :ident (fn [] [:page/id :dashboard])
   :initial-state (fn [_] {:ui/concepts-expanded? false})
   :route-segment ["dashboard"]
   :will-enter (fn [app _route-params]
                 (dr/route-deferred [:page/id :dashboard]
                                    (fn [] (df/load! app [:page/id :dashboard] DashboardPage
                                                     {:marker :dashboard :post-mutation `dr/target-ready
                                                      :post-mutation-params {:target [:page/id :dashboard]}}))))
   :componentDidMount (fn [this]
                        (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
                              ws-project (get ws-state :workspace/project)
                              project-id (:project/id ws-project)]
                          (when project-id
                            (when-not (get-in ws-state [:flywheel/progress project-id])
                              (ws/request-flywheel-progress! project-id))
                            (when-not (get-in ws-state [:kanban/board project-id])
                              (ws/request-kanban-board! project-id)))))}
  (let [loading? (df/loading? (get props [df/marker-table :dashboard]))
        error-msg (get-in props [:page/error :dashboard])
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        project-id (:project/id ws-project)
        progress (when project-id (get-in ws-state [:flywheel/progress project-id]))
        encoded-id (when project-id (str/replace (str project-id) "/" "~"))
        concepts-expanded? (get props :ui/concepts-expanded? false)
        completed-count (count (filter #(= (:status %) :completed) (:phases progress [])))]
    (cond
      error-msg (error-state {:message error-msg :on-retry #(do (comp/transact! this [(m/set-value! this :page/error nil)])
                                                                (df/load! this [:page/id :dashboard] DashboardPage {:marker :dashboard}))})
      loading? (dashboard-loading)
      :else (dom/div :.start-here-page
                     (dom/div :.page-header
                              (dom/h1 :.page-title "🌟 Start Here")
                              (dom/p :.page-subtitle "Build products with joy. Let Ouroboros guide you."))
                     (celebration-banner {:completed-count completed-count})
                     (concepts-explainer {:expanded? concepts-expanded? :on-toggle #(m/set-value! this :ui/concepts-expanded? (not concepts-expanded?))})
                     (if ws-project
                       (dom/div :.main-content
                                (dom/div :.content-grid
                                         (flywheel-journey {:progress progress :encoded-id encoded-id})
                                         (recommended-action {:progress progress :encoded-id encoded-id}))
                                (primary-paths {:encoded-id encoded-id :this-comp this}))
                       (empty-state-welcome {:on-create-project #(dr/change-route! app ["project" "new"])}))))))
