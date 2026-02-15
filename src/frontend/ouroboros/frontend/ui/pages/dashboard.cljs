(ns ouroboros.frontend.ui.pages.dashboard
  "Dashboard overview page - shows project info, flywheel progress, wisdom summary, quick actions"
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

;; ============================================================================
;; Error Handling Mutation
;; ============================================================================

(m/defmutation handle-load-error [{:keys [page-id error-message]}]
  (action [{:keys [state]}]
          (swap! state assoc-in [:page/error page-id] error-message)))

(m/defmutation clear-page-error [{:keys [page-id]}]
  (action [{:keys [state]}]
          (swap! state update :page/error dissoc page-id)))

;; ============================================================================
;; Error UI Component
;; ============================================================================

(defn error-state [{:keys [message] :as props}]
  (let [retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "!!!")
             (dom/div :.error-state-message message)
             (when retry-fn
               (ui/button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Loading Skeleton Components
;; ============================================================================

(defn dashboard-loading []
  (dom/div {:key "dashboard-loading"}
   (dom/h1 {:key "dashboard-title"} "Dashboard")
   (dom/div {:key "dashboard-skeleton" :className "dash-loading-grid"}
            (dom/div :.skeleton-card)
            (dom/div :.skeleton-card)
            (dom/div :.skeleton-card))))

;; ============================================================================
;; Shared Card Helpers
;; ============================================================================

(defn- handle-card-key
  "Keyboard handler for clickable cards - activates on Enter or Space."
  [on-click-fn e]
  (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
    (.preventDefault e)
    (on-click-fn)))

;; ============================================================================
;; Project Overview Card (moved from project-detail page)
;; ============================================================================

(defn project-overview-card
  "Project info card for the dashboard - shows name, status, description, flywheel progress.
   Entire card is clickable (navigates to project detail). Flywheel steps have their own nav.
   All data passed via props from parent (no independent atom reads)."
  [{:keys [project-name project-status project-description project-id
           progress board]}]
  (let [encoded-id (when project-id (str/replace (str project-id) "/" "~"))
        navigate-project! (when encoded-id
                            #(dr/change-route! app ["project" encoded-id]))
        current-step (or (when progress
                           (let [step (:current-step progress)]
                             (case step
                               :empathy-map :empathy
                               :value-proposition :valueprop
                               :mvp-planning :mvp
                               :lean-canvas :canvas
                               :empathy)))
                         :empathy)
        summary (:summary board)]
    (dom/div (cond-> {:className (str "dash-project-card"
                                      (when encoded-id " dash-project-clickable"))}
               encoded-id (assoc :role "button"
                                 :tabIndex 0
                                 :onClick navigate-project!
                                 :onKeyDown #(handle-card-key navigate-project! %)))
             ;; Project header
             (dom/div :.dash-project-header
                      (dom/div :.dash-project-info
                               (dom/h2 :.dash-project-name (or project-name "Project"))
                               (dom/span {:className (str "dash-project-status dash-status-"
                                                          (name (or project-status :draft)))}
                                         (name (or project-status :draft))))
                      (when encoded-id
                        (dom/span :.dash-project-arrow ">")))
             ;; Description
             (when (seq project-description)
               (dom/p :.dash-project-desc project-description))
             ;; Kanban summary stats
             (when summary
               (let [total (:total summary 0)
                     done (:done summary 0)
                     in-prog (:in-progress summary 0)
                     pct (if (pos? total) (int (* 100 (/ done total))) 0)]
                 (dom/div :.dash-progress-section
                          (dom/div :.dash-progress-stats
                                   (dom/span :.dash-progress-pct (str pct "% complete"))
                                   (dom/span :.dash-progress-detail
                                             (str done " done, " in-prog " active, "
                                                  (- total done in-prog) " remaining")))
                          (dom/div :.dash-progress-bar
                                   (dom/div {:className "dash-progress-bar-fill"
                                             :style {:width (str pct "%")}})))))
             ;; Flywheel nav -- uses shared circle stepper (clicks handled internally)
             (dom/div {:onClick #(.stopPropagation %)}
                      (ui/flywheel-indicator
                       {:current-step current-step
                        :project-id encoded-id
                        :on-navigate (when encoded-id
                                       #(dr/change-route! app ["project" encoded-id %]))})))))

;; ============================================================================
;; Wisdom Overview Card
;; ============================================================================

(def ^:private fallback-wisdom-stats
  "Static wisdom summary shown before ECA data loads."
  {:templates 4
   :learning-categories 5
   :phase-tips 4})

(defn- navigate-wisdom!
  "Navigate to Wisdom page, optionally scrolling to a section after route change."
  ([] (dr/change-route! app ["wisdom"]))
  ([section-id]
   (dr/change-route! app ["wisdom"])
   ;; Scroll to section after route renders (requestAnimationFrame to wait for DOM)
   (js/requestAnimationFrame
    (fn []
      (js/setTimeout
       (fn []
         (when-let [el (.getElementById js/document section-id)]
           (.scrollIntoView el #js {:behavior "smooth" :block "start"})))
       120)))))

(defn wisdom-overview-card
  "Shows a brief summary of available wisdom resources with link to Wisdom page.
   Reads template/category counts from WS state (ECA content or fallbacks).
   Entire card is clickable; stat boxes deep-link to sections."
  [{:keys [ws-state]}]
  (let [eca-templates (get-in ws-state [:content/generated :templates])
        eca-categories (get-in ws-state [:content/generated :learning-categories])
        template-count (if (seq eca-templates) (count eca-templates) (:templates fallback-wisdom-stats))
        category-count (if (seq eca-categories) (count eca-categories) (:learning-categories fallback-wisdom-stats))
        templates-loading? (get-in ws-state [:content/loading? :templates])
        categories-loading? (get-in ws-state [:content/loading? :learning-categories])
        ;; Only show loading when we have zero content (no cache, no ECA response, no fallback counts)
        any-loading? (and (or templates-loading? categories-loading?)
                          (not (seq eca-templates))
                          (not (seq eca-categories)))
        ;; Check wisdom cache for recent content
        wisdom-cache (:wisdom/cache ws-state)
        cached-count (count wisdom-cache)]
    (dom/div {:className "dash-wisdom-card dash-wisdom-clickable"
              :role "button"
              :tabIndex 0
              :onClick #(navigate-wisdom!)
              :onKeyDown #(handle-card-key navigate-wisdom! %)}
             (dom/div :.dash-wisdom-header
                      (dom/div :.dash-wisdom-title-row
                               (dom/span :.dash-wisdom-icon "~")
                               (dom/h3 :.dash-wisdom-title "Wisdom Library"))
                      (dom/span :.dash-wisdom-arrow ">"))
             (dom/p :.dash-wisdom-desc
                    "Templates, learning patterns, and AI-powered insights to guide your product thinking.")
             (dom/div :.dash-wisdom-stats
                      (dom/div {:className "dash-wstat dash-wstat-clickable"
                                :role "button"
                                :tabIndex 0
                                :onClick (fn [e]
                                           (.stopPropagation e)
                                           (navigate-wisdom! "wisdom-templates"))
                                :onKeyDown (fn [e]
                                             (.stopPropagation e)
                                             (handle-card-key #(navigate-wisdom! "wisdom-templates") e))}
                               (dom/span :.dash-wstat-value (str template-count))
                               (dom/span :.dash-wstat-label "Templates"))
                      (dom/div {:className "dash-wstat dash-wstat-clickable"
                                :role "button"
                                :tabIndex 0
                                :onClick (fn [e]
                                           (.stopPropagation e)
                                           (navigate-wisdom! "wisdom-learning"))
                                :onKeyDown (fn [e]
                                             (.stopPropagation e)
                                             (handle-card-key #(navigate-wisdom! "wisdom-learning") e))}
                               (dom/span :.dash-wstat-value (str category-count))
                               (dom/span :.dash-wstat-label "Learning Patterns"))
                      (dom/div {:className "dash-wstat dash-wstat-clickable"
                                :role "button"
                                :tabIndex 0
                                :onClick (fn [e]
                                           (.stopPropagation e)
                                           (navigate-wisdom! "wisdom-contextual"))
                                :onKeyDown (fn [e]
                                             (.stopPropagation e)
                                             (handle-card-key #(navigate-wisdom! "wisdom-contextual") e))}
                               (dom/span :.dash-wstat-value (str cached-count))
                               (dom/span :.dash-wstat-label "Cached Insights")))
             (when any-loading?
               (dom/div :.dash-wisdom-loading
                        (dom/span :.dash-wisdom-loading-dot)
                        (dom/span "Loading from AI..."))))))

;; ============================================================================
;; Quick Actions
;; ============================================================================

(defn quick-actions
  "Quick action buttons for common tasks - navigate builders, open chat, view wisdom."
  [{:keys [encoded-id this-comp]}]
  (dom/div :.dash-actions
           (dom/h3 :.dash-actions-title "Quick Actions")
           (dom/div :.dash-actions-grid
                    ;; Start with Empathy Map
                    (dom/button {:className "dash-action-btn dash-action-empathy"
                                 :onClick #(when encoded-id
                                             (dr/change-route! app ["project" encoded-id "empathy"]))}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "Empathy Map")
                                (dom/span :.dash-action-hint "Start understanding your users"))
                    ;; Value Proposition
                    (dom/button {:className "dash-action-btn dash-action-valueprop"
                                 :onClick #(when encoded-id
                                             (dr/change-route! app ["project" encoded-id "valueprop"]))}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "Value Proposition")
                                (dom/span :.dash-action-hint "Define your unique value"))
                    ;; MVP Planning
                    (dom/button {:className "dash-action-btn dash-action-mvp"
                                 :onClick #(when encoded-id
                                             (dr/change-route! app ["project" encoded-id "mvp"]))}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "MVP Planning")
                                (dom/span :.dash-action-hint "Scope your minimum product"))
                    ;; Lean Canvas
                    (dom/button {:className "dash-action-btn dash-action-canvas"
                                 :onClick #(when encoded-id
                                             (dr/change-route! app ["project" encoded-id "canvas"]))}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "Lean Canvas")
                                (dom/span :.dash-action-hint "Map your business model"))
                    ;; AI Chat
                    (dom/button {:className "dash-action-btn dash-action-chat"
                                 :onClick #(comp/transact! this-comp [(chat/toggle-chat {})])}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "Ask AI")
                                (dom/span :.dash-action-hint "Get guidance from ECA"))
                    ;; Wisdom
                    (dom/button {:className "dash-action-btn dash-action-wisdom"
                                 :onClick #(dr/change-route! app ["wisdom"])}
                                (dom/span :.dash-action-icon "~")
                                (dom/span :.dash-action-label "Wisdom")
                                (dom/span :.dash-action-hint "Templates and insights")))))

;; ============================================================================
;; Main Dashboard Page
;; ============================================================================

(defsc DashboardPage
  [this props]
  {:query         [[df/marker-table :dashboard]
                   :page/error]
    :ident         (fn [] [:page/id :dashboard])
    :initial-state (fn [_] {})
    :route-segment ["dashboard"]
   :will-enter    (fn [app _route-params]
                    (dr/route-deferred [:page/id :dashboard]
                                       (fn []
                                         (df/load! app [:page/id :dashboard] DashboardPage
                                                   {:marker :dashboard
                                                    :post-mutation `dr/target-ready
                                                    :post-mutation-params {:target [:page/id :dashboard]}
                                                    :fallback `handle-load-error
                                                    :fallback-params {:page-id :dashboard
                                                                      :error-message "Failed to load dashboard data"}}))))
   ;; Request WS data on mount instead of during render
   :componentDidMount
   (fn [this]
     (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
           ws-project (get ws-state :workspace/project)
           project-id (:project/id ws-project)]
       (when project-id
         (when-not (get-in ws-state [:flywheel/progress project-id])
           (ws/request-flywheel-progress! project-id))
         (when-not (get-in ws-state [:kanban/board project-id])
           (ws/request-kanban-board! project-id)))
       ;; Pre-fetch wisdom data for the overview card
       (when-not (get-in ws-state [:content/generated :templates])
         (ws/request-content! :templates))
       (when-not (get-in ws-state [:content/generated :learning-categories])
         (ws/request-content! :learning-categories))))}

  (let [loading? (df/loading? (get props [df/marker-table :dashboard]))
        error-msg (get-in props [:page/error :dashboard])
        ;; Read workspace project from WS state (schedule-render! triggers re-render when WS data arrives)
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        project-id (:project/id ws-project)
        project-name (:project/name ws-project)
        project-status (:project/status ws-project)
        project-desc (:project/description ws-project)
        ;; Read WS data for child components (passed via props, not re-read by children)
        progress (when project-id (get-in ws-state [:flywheel/progress project-id]))
        board (when project-id (get-in ws-state [:kanban/board project-id]))
        encoded-id (when project-id (str/replace (str project-id) "/" "~"))]
    (cond
      error-msg
      (error-state
       {:message error-msg
        :on-retry #(do
                     (comp/transact! this `[(clear-page-error {:page-id :dashboard})])
                     (df/load! this [:page/id :dashboard] DashboardPage
                               {:marker :dashboard
                                :fallback `handle-load-error
                                :fallback-params {:page-id :dashboard
                                                  :error-message "Failed to load dashboard data"}}))})

      loading?
      (dashboard-loading)

      :else
      (dom/div :.dash-page
               (dom/h1 :.dash-title "Dashboard")

               ;; Two-column layout: project overview + wisdom summary
               (dom/div :.dash-grid
                        ;; Left column: Project overview
                        (when ws-project
                          (project-overview-card
                           {:project-name project-name
                            :project-status project-status
                            :project-description project-desc
                            :project-id project-id
                            :progress progress
                            :board board}))
                        ;; Right column: Wisdom overview
                        (wisdom-overview-card {:ws-state ws-state}))

               ;; Quick actions
               (quick-actions {:encoded-id encoded-id
                               :this-comp this})))))
