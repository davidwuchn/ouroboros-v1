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
  [{:keys [active-route on-navigate]}]
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
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "telemetry") " active"))
                                     :onClick #(on-navigate "telemetry")}
                                    "Telemetry"))
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "users") " active"))
                                     :onClick #(on-navigate "users")}
                                    "Users"))
                     (dom/li (dom/a {:className (str "nav-link" (when (is? "sessions") " active"))
                                     :onClick #(on-navigate "sessions")}
                                    "Sessions"))))))

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
