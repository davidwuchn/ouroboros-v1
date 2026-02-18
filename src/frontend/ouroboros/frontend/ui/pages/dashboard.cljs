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
   [ouroboros.frontend.ui.chat-panel :as chat]
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

(defn- open-ai-chat []
  "Open the AI Chat panel"
  (comp/transact! app [(chat/open-chat {})]))

(defn- navigate-to-builder!
  "Navigate to a builder page with the current project ID.
   Replaces / with ~ in project-id for safe URL routing."
  [builder-route]
  (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
        project-id (get-in ws-state [:workspace/project :project/id])
        encoded-id (when project-id (str/replace project-id "/" "~"))]
    (if encoded-id
      (dr/change-route! app ["project" encoded-id builder-route])
      (js/console.warn "No project ID available for navigation"))))

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

(defn- workflow-step-clickable [{:keys [icon label command skill on-click]}]
  (dom/div {:className "workflow-step clickable"
            :onClick on-click
            :role "button"
            :tabIndex 0
            :onKeyDown #(handle-key-activation on-click %)
            :aria-label (str label " - Click to open AI Chat with " skill " skill")
            :title (str "Click to start " label " (loads " skill " skill)")}
           (dom/span :.wf-icon icon)
           (dom/span :.wf-label label)
           (dom/span :.wf-command command)))

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
                               (dom/p :.concept-desc "A 4-phase methodology for building products. Each phase feeds into the next. Click any phase to start.")
                               (dom/div :.flywheel-diagram
                                        (flywheel-step-clickable
                                         {:phase :empathy-map :icon "👥" :label "Empathy" :status :completed
                                          :on-click #(navigate-to-builder! "empathy")})
                                        (dom/span :.flywheel-arrow "→")
                                        (flywheel-step-clickable
                                         {:phase :value-proposition :icon "💎" :label "Value" :status :active
                                          :on-click #(navigate-to-builder! "valueprop")})
                                        (dom/span :.flywheel-arrow "→")
                                        (flywheel-step-clickable
                                         {:phase :mvp-planning :icon "🚀" :label "MVP" :status :not-started
                                          :on-click #(navigate-to-builder! "mvp")})
                                        (dom/span :.flywheel-arrow "→")
                                        (flywheel-step-clickable
                                         {:phase :lean-canvas :icon "📊" :label "Canvas" :status :not-started
                                          :on-click #(navigate-to-builder! "canvas")}))
                               (dom/p :.concept-hint "📍 Click any phase above to open the builder"))
                      (dom/div :.concept-section
                               (dom/div :.concept-header
                                        (dom/span :.concept-icon "⚡")
                                        (dom/h4 :.concept-title "Development Workflow"))
                               (dom/p :.concept-desc "AI-assisted development with specialized skills. Load skills to enhance AI capabilities.")
                               (dom/div :.workflow-diagram
                                        (workflow-step-clickable
                                         {:icon "📋" :label "Plan" :command "/plan"
                                          :skill "planning"
                                          :on-click #(open-ai-chat)})
                                        (dom/span :.workflow-arrow "→")
                                        (workflow-step-clickable
                                         {:icon "⚒" :label "Build" :command "/code"
                                          :skill "clojure-expert"
                                          :on-click #(open-ai-chat)})
                                        (dom/span :.workflow-arrow "→")
                                        (workflow-step-clickable
                                         {:icon "👁" :label "Review" :command "/review"
                                          :skill "clojure-reviewer"
                                          :on-click #(open-ai-chat)})
                                        (dom/span :.workflow-arrow "→")
                                        (workflow-step-clickable
                                         {:icon "📚" :label "Learn" :command "/learn"
                                          :skill "continuous-learning"
                                          :on-click #(dr/change-route! app ["wisdom"])}))
                               
                               ;; Quick Actions
                               (dom/div :.quick-actions
                                        (dom/div :.quick-actions-header "Quick Start")
                                        (dom/div :.quick-actions-grid
                                                 (dom/button {:className "quick-action-btn"
                                                              :onClick #(do (open-ai-chat)
                                                                            (js/setTimeout
                                                                             (fn [] (ws/send! {:type "eca/chat"
                                                                                               :text "/plan Help me plan a new feature"
                                                                                               :context "dashboard"})) 500))}
                                                             (dom/span "📋") " New Plan")
                                                 (dom/button {:className "quick-action-btn"
                                                              :onClick #(do (open-ai-chat)
                                                                            (js/setTimeout
                                                                             (fn [] (ws/send! {:type "eca/chat"
                                                                                               :text "/review"
                                                                                               :context "dashboard"})) 500))}
                                                             (dom/span "👁") " Code Review")
                                                 (dom/button {:className "quick-action-btn"
                                                              :onClick #(dr/change-route! app ["wisdom"])}
                                                             (dom/span "📚") " My Learnings")))
                               
                               ;; Skills Reference
                               (dom/div :.skills-section
                                        (dom/div :.skills-header "Available Skills")
                                        (dom/div :.skills-list
                                                 (dom/div {:className "skill-item"
                                                           :onClick #(open-ai-chat)
                                                           :title "Click to open AI Chat with planning skill"}
                                                          (dom/span :.skill-badge "📋")
                                                          (dom/div :.skill-info
                                                                   (dom/div :.skill-title "planning")
                                                                   (dom/div :.skill-detail "3-file pattern: task_plan.md, findings.md, progress.md")))
                                                 (dom/div {:className "skill-item"
                                                           :onClick #(open-ai-chat)
                                                           :title "Click to open AI Chat with clojure-expert skill"}
                                                          (dom/span :.skill-badge "⚒")
                                                          (dom/div :.skill-info
                                                                   (dom/div :.skill-title "clojure-expert")
                                                                   (dom/div :.skill-detail "REPL-first development, idiomatic patterns")))
                                                 (dom/div {:className "skill-item"
                                                           :onClick #(open-ai-chat)
                                                           :title "Click to open AI Chat with clojure-reviewer skill"}
                                                          (dom/span :.skill-badge "👁")
                                                          (dom/div :.skill-info
                                                                   (dom/div :.skill-title "clojure-reviewer")
                                                                   (dom/div :.skill-detail "Multi-scale review: syntax, semantic, architectural")))
                                                 (dom/div {:className "skill-item"
                                                           :onClick #(dr/change-route! app ["wisdom"])
                                                           :title "Go to Wisdom page"}
                                                          (dom/span :.skill-badge "📚")
                                                          (dom/div :.skill-info
                                                                   (dom/div :.skill-title "continuous-learning")
                                                                   (dom/div :.skill-detail "λ-based patterns with φ, e, λ, Δ framework")))))
                               
                               ;; Pro Tips
                               (dom/div :.pro-tips
                                        (dom/div :.pro-tips-header "💡 Pro Tips")
                                        (dom/ul :.pro-tips-list
                                                (dom/li "Use \"/plan <description>\" to create structured plans")
                                                (dom/li "Use \"/code <task>\" for REPL-driven implementation")
                                                (dom/li "Use \"/review\" before committing code")
                                                (dom/li "Use \"/learn <topic>: <insight>\" to capture knowledge")))
                               
                               )))))

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
        concepts-expanded? (get props :ui/concepts-expanded? false)]
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
                                    :on-toggle #(m/set-value! this :ui/concepts-expanded? (not concepts-expanded?))})))))