(ns ouroboros.frontend.ui.components
  "Reusable UI components"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]))

;; ============================================================================
;; Error Display Component
;; ============================================================================

(defsc ErrorDisplay [this {:keys [message on-retry]}]
  {:query [:message :on-retry]
   :ident (fn [] [:component/id :error-display])}
  (dom/div :.error-state
    (dom/div :.error-state-icon "⚠️")
    (dom/div :.error-state-message message)
    (when on-retry
      (button
        {:on-click on-retry
         :variant :primary}
        "Try Again"))))

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
  [{:keys [active-route on-navigate]}]
  (dom/nav :.navbar
    (dom/a :.navbar-brand
      {:onClick #(on-navigate "dashboard")}
      "Ouroboros")
    (dom/ul :.navbar-nav
      (dom/li (dom/a {:className (str "nav-link" (when (= active-route "dashboard") " active"))
                      :onClick #(on-navigate "dashboard")}
               "Dashboard"))
      (dom/li (dom/a {:className (str "nav-link" (when (= active-route "telemetry") " active"))
                      :onClick #(on-navigate "telemetry")}
               "Telemetry"))
      (dom/li (dom/a {:className (str "nav-link" (when (= active-route "users") " active"))
                      :onClick #(on-navigate "users")}
               "Users"))
      (dom/li (dom/a {:className (str "nav-link" (when (= active-route "sessions") " active"))
                      :onClick #(on-navigate "sessions")}
               "Sessions"))))

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
  [{:keys [value label className]}]
  (dom/div :.metric-card
    (dom/div {:className (str "metric-value " className)} value)
    (dom/div :.metric-label label)))

(defn card
  "Card container with optional title"
  [{:keys [title className actions]} & children]
  (dom/div {:className (str "card " className)}
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
  [{:keys [message on-retry]}]
  (dom/div :.error-state
    (dom/div :.error-state-icon "⚠️")
    (dom/div :.error-state-message message)
    (when on-retry
      (button
        {:on-click on-retry
         :variant :primary}
        "Try Again"))))

;; ============================================================================
;; Data Table
;; ============================================================================

(defn data-table
  "Generic data table"
  [{:keys [columns rows empty-message]}]
  (if (seq rows)
    (dom/div :.table-container
      (dom/table :.data-table
        (dom/thead
          (dom/tr
            (map #(dom/th {:key (:key %)} (:label %)) columns)))
        (dom/tbody
          (map-indexed
            (fn [idx row]
              (dom/tr {:key idx}
                (map (fn [col]
                       (let [key (:key col)
                             value (get row key)
                             formatter (:format col identity)]
                         (dom/td {:key key} (formatter value row))))
                     columns)))
            rows))))
    (empty-state {:message (or empty-message "No data available")})))

;; ============================================================================
;; Button
;; ============================================================================

(defn button
  "Button component"
  [{:keys [on-click variant disabled className children]}]
  (let [variant-class (case variant
                        :secondary "btn-secondary"
                        :danger "btn-danger"
                        "btn-primary")]
    (dom/button
      {:className (str "btn " variant-class " " className)
       :disabled disabled
       :onClick on-click}
      children)))

;; ============================================================================
;; Code Block
;; ============================================================================

(defn code-block
  "Display code/data"
  [{:keys [content]}]
  (dom/pre :.code-block
    (dom/code (str content))))
