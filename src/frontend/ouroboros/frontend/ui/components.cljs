(ns ouroboros.frontend.ui.components
  "Reusable UI components"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [ouroboros.frontend.websocket :as ws]))

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
                                      :onClick (fn [_]
                                                 (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
                                                       project-id (get-in ws-state [:workspace/project :project/id])
                                                       encoded (when project-id (str/replace (str project-id) "/" "~"))]
                                                   (if encoded
                                                     (on-navigate ["project" encoded])
                                                     (on-navigate "projects"))))}
                                     "Project"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "wisdom") " active"))
                                      :onClick #(on-navigate "wisdom")}
                                     "Wisdom"))
                      (dom/li (dom/a {:className (str "nav-link" (when (is? "telemetry") " active"))
                                      :onClick #(on-navigate "telemetry")}
                                      "Telemetry")))
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
  "Fallback contextual wisdom tips shown while ECA loads or is unavailable.
   ECA replaces these with personalized, project-aware guidance."
  {:empathy
   {:title "Empathy Phase"
    :tagline "Walk in their shoes before you build."
    :tips ["Start by observing real users"
           "Look for contradictions between what people say and do"
           "Focus on pains they have accepted as normal"]
    :next-hint "Your empathy insights will directly feed the Value Proposition."}
   :valueprop
   {:title "Value Proposition Phase"
    :tagline "Connect what they need to what you offer."
    :tips ["Start with customer jobs, not your product features"
           "Rank pains by severity"
           "A great pain reliever beats a nice-to-have gain creator"]
    :next-hint "Your value fit will guide what to build in the MVP."}
   :mvp
   {:title "MVP Phase"
    :tagline "Build the smallest thing that proves your value."
    :tips ["Cut features until it hurts, then cut one more"
           "Focus on ONE user, ONE problem, ONE solution"
           "Define success metrics BEFORE you build"]
    :next-hint "Your MVP learnings will validate the business model."}
   :canvas
   {:title "Lean Canvas Phase"
    :tagline "Connect all the dots into a business model."
    :tips ["Fill in Problem and Customer Segments first"
           "Your Unfair Advantage is the hardest box"
           "Key Metrics: pick 1-3 numbers that prove traction"]
    :next-hint "Iterate: go back to Empathy with new learnings!"}})

(defn wisdom-panel-body
  "Core wisdom content for a phase. Can be embedded in pages or sidebars.

   Props:
   - phase: keyword (:empathy, :valueprop, :mvp, :canvas)
   - project-id: string (for ECA context)"
  [{:keys [phase project-id]}]
  (let [fallback (get wisdom-tips phase)
        ;; Read ECA wisdom state from app state atom
        state-atom @ws/app-state-atom
        wisdom-state (when state-atom (get-in @state-atom [:wisdom/id :global]))
        eca-content (:wisdom/content wisdom-state)
        eca-loading? (:wisdom/loading? wisdom-state)
        eca-streaming? (:wisdom/streaming? wisdom-state)
        has-eca-content? (and eca-content (seq eca-content))
        ;; Read auto-insight state
        auto-insight (when (and state-atom project-id)
                       (get-in @state-atom [:auto-insight/id project-id]))
        auto-insight-content (:auto-insight/content auto-insight)
        auto-insight-loading? (:auto-insight/loading? auto-insight)
        auto-insight-streaming? (:auto-insight/streaming? auto-insight)
        has-auto-insight? (and auto-insight-content (seq auto-insight-content))]
    ;; Request tips from ECA on first render if not already loading
    (when (and project-id (not eca-loading?) (not has-eca-content?))
      (ws/request-wisdom! project-id phase :tips))
    (dom/div :.wisdom-panel-body
      ;; Auto-insight notification (proactive, from builder completion)
      (when (or has-auto-insight? auto-insight-loading?)
        (dom/div :.wisdom-auto-insight
          (dom/div :.wisdom-auto-insight-header
            (dom/span :.wisdom-auto-insight-icon "🎯")
            (dom/span :.wisdom-auto-insight-title "Builder Insight"))
          (if has-auto-insight?
            (dom/div :.wisdom-auto-insight-content
              (dom/div :.wisdom-eca-text auto-insight-content)
              (when auto-insight-streaming?
                (dom/span :.wisdom-streaming-indicator "...")))
            (when auto-insight-loading?
              (dom/div :.wisdom-loading
                (dom/span :.wisdom-loading-icon "🤖")
                (dom/span "Analyzing your work..."))))))
      ;; ECA-powered content (streaming or complete)
      (if has-eca-content?
        (dom/div :.wisdom-eca-content
          (dom/div :.wisdom-eca-text eca-content)
          (when eca-streaming?
            (dom/span :.wisdom-streaming-indicator "...")))
        ;; Fallback static tips while ECA loads
        (dom/div :.wisdom-tips-list
          (when eca-loading?
            (dom/div :.wisdom-loading
              (dom/span :.wisdom-loading-icon "🤖")
              (dom/span "AI is thinking...")))
          (for [tip (:tips fallback)]
            (dom/div {:key tip :className "wisdom-tip-item"}
              (dom/span :.wisdom-bullet "→")
              (dom/span tip)))))
      (when-let [next-hint (:next-hint fallback)]
        (dom/div :.wisdom-next-hint
          (dom/span :.wisdom-hint-icon "⏭")
          (dom/span next-hint)))
      ;; Refresh button to get new ECA tips
      (when has-eca-content?
        (dom/div :.wisdom-actions
          (dom/button
            {:className "btn btn-secondary wisdom-refresh-btn"
             :onClick (fn []
                        (when-let [sa @ws/app-state-atom]
                          (swap! sa assoc-in [:wisdom/id :global :wisdom/content] ""))
                        (ws/request-wisdom! project-id phase :tips))
             :disabled eca-loading?}
            "🔄 Get fresh tips"))))))

(defn wisdom-sidebar
  "Contextual wisdom tips panel for the current builder phase.
   Fetches ECA-powered tips on open, shows fallback tips while loading.
   Also displays auto-insights from builder completion.
    
   Props:
   - phase: keyword (:empathy, :valueprop, :mvp, :canvas)
   - show?: boolean
   - project-id: string (for ECA context)"
  [{:keys [phase show? on-close project-id]}]
  (when show?
    (let [fallback (get wisdom-tips phase)]
      (dom/div :.wisdom-sidebar
        (dom/div :.wisdom-sidebar-header
          (dom/h3 (str "💡 " (:title fallback)))
          (dom/button {:className "btn btn-close"
                       :onClick on-close} "x"))
        (dom/p :.wisdom-tagline (:tagline fallback))
        (wisdom-panel-body {:phase phase :project-id project-id})))))
