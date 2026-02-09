(ns ouroboros.frontend.ui.components
  "Reusable UI components"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]))

;; ============================================================================
;; Button
;; ============================================================================

(defn button
  "Button component"
  [{:keys [on-click variant disabled className]} & children]
  (let [variant-class (case variant
                        :secondary "btn-secondary"
                        :danger "btn-danger"
                        "btn-primary")]
    (apply dom/button
     {:className (str "btn " variant-class " " className)
      :disabled disabled
      :onClick on-click}
     children)))

;; ============================================================================
;; Error Display Component
;; ============================================================================

(defsc ErrorDisplay [this props]
   {:query [:message]
    :ident (fn [] [:component/id :error-display])
    :initial-state (fn [_] {:message nil})}
  (let [message (:message props)
        retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "⚠️")
             (dom/div :.error-state-message message)
             (when retry-fn
               (button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Connection Status Component
;; ============================================================================

(defn connection-status [{:keys [connected?]}]
  (dom/div {:className (str "connection-status " (if connected? "connected" "disconnected"))}
           (dom/span :.connection-indicator)
           (dom/span :.connection-text
                     (if connected? "Live" "Offline"))))

;; ============================================================================
;; Layout Components
;; ============================================================================

(defn navbar
  "Navigation bar component"
  [{:keys [active-route on-navigate on-toggle-chat chat-open?]}]
  (let [is? (fn [& routes] (some #(= active-route %) routes))]
    (dom/nav :.navbar
             (dom/a :.navbar-brand
                    {:onClick #(on-navigate "dashboard")}
                    "🐍 Ouroboros")
             (dom/ul :.navbar-nav
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "dashboard") " active"))
                                     :onClick #(on-navigate "dashboard")}
                                    "Dashboard"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "projects" "project") " active"))
                                      :onClick #(on-navigate "projects")}
                                     "Projects"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "wisdom") " active"))
                                      :onClick #(on-navigate "wisdom")}
                                     "Wisdom"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "telemetry") " active"))
                                      :onClick #(on-navigate "telemetry")}
                                     "Telemetry"))
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "users") " active"))
                                     :onClick #(on-navigate "users")}
                                    "Users"))
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "sessions") " active"))
                                     :onClick #(on-navigate "sessions")}
                                    "Sessions")))
             ;; Chat toggle button
             (dom/button
              {:className (str "chat-toggle-btn " (when chat-open? "chat-toggle-active"))
               :onClick on-toggle-chat
               :title "AI Assistant (Ctrl+/)"}
              (dom/span :.chat-toggle-icon "🤖")
              (dom/span :.chat-toggle-label "AI Chat")))))

(defn main-layout
  "Main application layout"
  [{:keys [navbar-content children]}]
  (dom/div :.app-container
           navbar-content
           (dom/main :.main-content
                     children)))

;; ============================================================================
;; Card Components
;; ============================================================================

(defn metric-card
   "Display a metric with label"
   [{:keys [value label className key]}]
   (dom/div {:className (str "metric-card " className) :key key}
            (dom/div {:className (str "metric-value " className)} value)
            (dom/div :.metric-label label)))

(defn card
   "Card container with optional title"
   [{:keys [title className actions key]} & children]
   (apply dom/div {:className (str "card " className) :key key}
            (when (or title actions)
              (dom/div :.card-header
                       (when title
                         (dom/h2 :.card-title title))
                       (when actions
                         (dom/div :.card-actions actions))))
            children))

;; ============================================================================
;; Status Components
;; ============================================================================

(defn status-badge
  "Status indicator badge"
  [{:keys [ok? text]}]
  (dom/span {:className (str "status-badge " (if ok? "status-ok" "status-error"))}
            (dom/span :.status-indicator)
            text))

(defn loading
  "Loading spinner"
  []
  (dom/div :.loading
           (dom/div :.spinner)
           "Loading..."))

(defn empty-state
  "Empty state message"
  [{:keys [icon message]}]
  (dom/div :.empty-state
           (dom/div :.empty-state-icon (or icon "Empty"))
           (dom/div message)))

(defn error-state
  "Error state message with optional retry"
  [{:keys [message] :as props}]
  (let [retry-fn (:on-retry props)]
    (dom/div :.error-state
             (dom/div :.error-state-icon "⚠️")
             (dom/div :.error-state-message message)
             (when retry-fn
               (button
                {:on-click retry-fn
                 :variant :primary}
                "Try Again")))))

;; ============================================================================
;; Data Table
;; ============================================================================

(defn- safe-render-value
  "Ensure a value is safe to render in React (convert keywords/symbols to strings)"
  [v]
  (cond
    (keyword? v) (name v)
    (symbol? v) (str v)
    (nil? v) ""
    :else v))

(defn data-table
  "Generic data table"
  [{:keys [columns rows empty-message]}]
  (if (seq rows)
    (dom/div :.table-container
             (dom/table :.data-table
                        (dom/thead
                         (apply dom/tr
                          (for [col columns]
                            (dom/th {:key (name (:key col))} (:label col)))))
                        (apply dom/tbody
                         (for [[idx row] (map-indexed vector rows)]
                           (apply dom/tr {:key (str (or (:id row) idx))}
                                   (for [col columns]
                                     (let [key (:key col)
                                           value (get row key)
                                           formatter (:format col identity)
                                           rendered (formatter value row)]
                                       (dom/td {:key (name key)} (safe-render-value rendered)))))))))
     (empty-state {:message (or empty-message "No data available")})))

;; ============================================================================
;; Code Block
;; ============================================================================

(defn code-block
  "Display code/data"
  [{:keys [content]}]
  (dom/pre :.code-block
           (dom/code (str content))))

;; ============================================================================
;; Flywheel Steps - Product Development Progression
;; ============================================================================

(def flywheel-steps
  "The 4-phase product development flywheel"
  [{:key :empathy
    :label "Empathy Map"
    :icon "🧠"
    :route "empathy"
    :description "Understand your customer deeply"}
   {:key :valueprop
    :label "Value Prop"
    :icon "💎"
    :route "valueprop"
    :description "Map your product to their needs"}
   {:key :mvp
    :label "MVP"
    :icon "🚀"
    :route "mvp"
    :description "Define what to build first"}
   {:key :canvas
    :label "Lean Canvas"
    :icon "📊"
    :route "canvas"
    :description "Complete business model"}])

(defn flywheel-indicator
  "Shows the 4-phase product development progression.
   Highlights current step and shows completion state.
   
   Props:
   - current-step: keyword (:empathy, :valueprop, :mvp, :canvas)
   - project-id: encoded project id for navigation
   - on-navigate: fn called with route segment on click"
  [{:keys [current-step project-id on-navigate]}]
  (let [step-order [:empathy :valueprop :mvp :canvas]
        current-idx (.indexOf step-order current-step)]
    (dom/div :.flywheel-indicator
      (dom/div :.flywheel-steps
        (for [[idx step] (map-indexed vector flywheel-steps)]
          (let [is-current? (= (:key step) current-step)
                is-past? (< idx current-idx)
                is-future? (> idx current-idx)
                step-class (str "flywheel-step "
                                (when is-current? "flywheel-current ")
                                (when is-past? "flywheel-completed ")
                                (when is-future? "flywheel-future "))]
            (dom/div {:key (name (:key step))}
              ;; Connector line (except before first)
              (when (> idx 0)
                (dom/div {:className (str "flywheel-connector "
                                          (when is-past? "flywheel-connector-done ")
                                          (when is-current? "flywheel-connector-done "))}))
              (dom/div {:className step-class
                        :onClick (when on-navigate
                                   #(on-navigate (:route step)))
                        :title (:description step)}
                (dom/span :.flywheel-icon (:icon step))
                (dom/span :.flywheel-label (:label step))
                (when is-past?
                  (dom/span :.flywheel-check "✓"))))))))))

;; ============================================================================
;; Wisdom Tips - Contextual guidance per builder phase
;; ============================================================================

(def wisdom-tips
  "Contextual wisdom tips for each phase of the flywheel"
  {:empathy
   {:title "Empathy Phase"
    :tagline "Walk in their shoes before you build."
    :tips ["Start by observing real users -- don't just imagine"
           "Look for contradictions between what people say and do"
           "The most valuable insights come from pains they've accepted as normal"
           "Be specific: 'Sarah the PM' beats 'busy professionals'"
           "Capture direct quotes -- they reveal real emotions"]
    :next-hint "Your empathy insights will directly feed the Value Proposition."}
   :valueprop
   {:title "Value Proposition Phase"
    :tagline "Connect what they need to what you offer."
    :tips ["Start with customer jobs, not your product features"
           "Rank pains by severity -- solve the worst ones first"
           "A great pain reliever beats a nice-to-have gain creator"
           "If you can't explain the value in one sentence, simplify"
           "Validate: would they pay to solve this pain today?"]
    :next-hint "Your value fit will guide what to build in the MVP."}
   :mvp
   {:title "MVP Phase"
    :tagline "Build the smallest thing that proves your value."
    :tips ["The best MVPs are embarrassingly small -- cut features until it hurts"
           "Focus on ONE user, ONE problem, ONE solution"
           "Speed of iteration beats quality of iteration"
           "Define success metrics BEFORE you build"
           "If you can test the assumption without code, do that first"]
    :next-hint "Your MVP learnings will validate the business model."}
   :canvas
   {:title "Lean Canvas Phase"
    :tagline "Connect all the dots into a business model."
    :tips ["Fill in Problem and Customer Segments first -- they drive everything"
           "Your Unfair Advantage is the hardest box -- that's OK"
           "Revenue and Cost should be realistic, not optimistic"
           "Key Metrics: pick 1-3 numbers that prove traction"
           "Revisit and update as you learn -- this is a living document"]
    :next-hint "Iterate: go back to Empathy with new learnings!"}})

(defn wisdom-sidebar
  "Contextual wisdom tips panel for the current builder phase.
   
   Props:
   - phase: keyword (:empathy, :valueprop, :mvp, :canvas)
   - show?: boolean"
  [{:keys [phase show? on-close]}]
  (when show?
    (let [{:keys [title tagline tips next-hint]} (get wisdom-tips phase)]
      (dom/div :.wisdom-sidebar
        (dom/div :.wisdom-sidebar-header
          (dom/h3 (str "💡 " title))
          (dom/button {:className "btn btn-close"
                       :onClick on-close} "x"))
        (dom/p :.wisdom-tagline tagline)
        (dom/div :.wisdom-tips-list
          (for [tip tips]
            (dom/div {:key tip :className "wisdom-tip-item"}
              (dom/span :.wisdom-bullet "→")
              (dom/span tip))))
        (when next-hint
          (dom/div :.wisdom-next-hint
            (dom/span :.wisdom-hint-icon "⏭")
            (dom/span next-hint)))))))
