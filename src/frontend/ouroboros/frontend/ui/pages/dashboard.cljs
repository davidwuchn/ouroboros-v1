(ns ouroboros.frontend.ui.pages.dashboard
  "Start Here - Main entry point with concepts explainer"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.mutations :as m]
   [ouroboros.frontend.app :refer [app]]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Mutations
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:page/error page-id] error-message)))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
          (swap! state update :page/error dissoc page-id)))

;; ============================================================================
;; Helper Functions
;; ============================================================================

(defn- handle-key-activation [on-activate e]
  (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
    (.preventDefault e)
    (on-activate)))

;; ============================================================================
;; Components
;; ============================================================================

(defn- flywheel-step-clickable [{:keys [phase icon label status on-click]}]
  (dom/div {:className (str "flywheel-step clickable flywheel-step-" (name status))
            :onClick on-click
            :role "button"
            :tabIndex 0
            :onKeyDown #(handle-key-activation on-click %)
            :aria-label (str label " - " (case status :completed "Completed" :active "In Progress" "Not Started"))}
           (dom/span :.fw-icon icon)
           (dom/span :.fw-label label)))

(defn concepts-explainer [{:keys [expanded? on-toggle project-id]}]
  (let [encoded-id (when project-id (str/replace (str project-id) "/" "~"))]
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
                                 (dom/p :.concept-desc "A 4-phase methodology for building products. Each phase feeds into the next. Click any phase to start.")
                                 (dom/div :.flywheel-diagram
                                          (flywheel-step-clickable
                                           {:phase :empathy-map :icon "👥" :label "Empathy" :status :completed
                                            :on-click #(when encoded-id (dr/change-route! app ["project" encoded-id "empathy"]))})
                                          (dom/span :.flywheel-arrow "→")
                                          (flywheel-step-clickable
                                           {:phase :value-proposition :icon "💎" :label "Value" :status :active
                                            :on-click #(when encoded-id (dr/change-route! app ["project" encoded-id "valueprop"]))})
                                          (dom/span :.flywheel-arrow "→")
                                          (flywheel-step-clickable
                                           {:phase :mvp-planning :icon "🚀" :label "MVP" :status :not-started
                                            :on-click #(when encoded-id (dr/change-route! app ["project" encoded-id "mvp"]))})
                                          (dom/span :.flywheel-arrow "→")
                                          (flywheel-step-clickable
                                           {:phase :lean-canvas :icon "📊" :label "Canvas" :status :not-started
                                            :on-click #(when encoded-id (dr/change-route! app ["project" encoded-id "canvas"]))}))
                                 (dom/p :.concept-hint "📍 Click any phase above to open the builder")))
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

(defn dashboard-loading []
  (dom/div {:key "dashboard-loading" :className "start-here-loading"}
           (dom/div :.loading-header
                    (dom/h1 :.loading-title "🌟 Start Here")
                    (dom/p :.loading-subtitle "Loading your dashboard..."))
           (dom/div {:key "dashboard-skeleton" :className "dash-loading-grid"}
                    (dom/div :.skeleton-card)
                    (dom/div :.skeleton-card))))

(defn error-state [{:keys [message on-retry]}]
  (dom/div :.error-state
           (dom/div :.error-state-icon "⚠️")
           (dom/div :.error-state-message message)
           (when on-retry
             (ui/button {:on-click on-retry :variant :primary} "Try Again"))))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc DashboardPage [this props]
  {:query [[df/marker-table :dashboard] :page/error :ui/concepts-expanded?]
   :ident (fn [] [:page/id :dashboard])
   :initial-state (fn [_] {:ui/concepts-expanded? false})
   :route-segment ["dashboard"]
   :will-enter (fn [app _route-params]
                 (dr/route-deferred [:page/id :dashboard]
                                    (fn [] (df/load! app [:page/id :dashboard] DashboardPage
                                                     {:marker :dashboard
                                                      :post-mutation `dr/target-ready
                                                      :post-mutation-params {:target [:page/id :dashboard]}}))))}
  (let [loading? (df/loading? (get props [df/marker-table :dashboard]))
        error-msg (get-in props [:page/error :dashboard])
        concepts-expanded? (get props :ui/concepts-expanded? false)
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        project-id (:project/id ws-project)]
    (cond
      error-msg
      (error-state {:message error-msg
                    :on-retry #(do (comp/transact! this [(clear-page-error {:page-id :dashboard})])
                                   (df/load! this [:page/id :dashboard] DashboardPage {:marker :dashboard}))})

      loading?
      (dashboard-loading)

      :else
      (dom/div :.start-here-page
               (dom/div :.page-header
                        (dom/h1 :.page-title "🌟 Start Here")
                        (dom/p :.page-subtitle "Build products with joy. Let Ouroboros guide you."))
               (concepts-explainer {:expanded? concepts-expanded?
                                    :on-toggle #(m/set-value! this :ui/concepts-expanded? (not concepts-expanded?))
                                    :project-id project-id})))))