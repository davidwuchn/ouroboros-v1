(ns ouroboros.frontend.ui.analytics-components
  "Analytics and visualization components for Web UX Platform

   Provides:
   - Progress charts and gauges
   - Completion funnel visualization
   - Team velocity metrics
   - Health score display
   - Time tracking visualizations"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Progress Gauge
;; ============================================================================

(defn progress-gauge
  "Circular progress gauge"
  [{:keys [percentage size label color]}]
  (let [size (or size 120)
        stroke-width 8
        radius (- (/ size 2) stroke-width)
        circumference (* 2 Math/PI radius)
        offset (- circumference (* (/ percentage 100) circumference))
        color (or color "#4CAF50")]
    (dom/div :.progress-gauge
             {:style {:width size :height size}}
             (dom/svg
              {:width size :height size :viewBox (str "0 0 " size " " size)}
        ;; Background circle
              (dom/circle
               {:cx (/ size 2)
                :cy (/ size 2)
                :r radius
                :fill "none"
                :stroke "#e0e0e0"
                :strokeWidth stroke-width})
        ;; Progress circle
              (dom/circle
               {:cx (/ size 2)
                :cy (/ size 2)
                :r radius
                :fill "none"
                :stroke color
                :strokeWidth stroke-width
                :strokeDasharray circumference
                :strokeDashoffset offset
                :strokeLinecap "round"
                :style {:transform "rotate(-90deg)"
                        :transformOrigin "center"
                        :transition "stroke-dashoffset 0.5s ease"}}))
      ;; Percentage text
             (dom/div :.gauge-text
                      (dom/span :.gauge-percentage (str percentage "%"))
                      (when label
                        (dom/span :.gauge-label label))))))

;; ============================================================================
;; Funnel Chart
;; ============================================================================

(defsc FunnelStage
  "Individual funnel stage"
  [this {:keys [stage reached reached-percentage completed drop-off width]}]
  (dom/div :.funnel-stage
           {:style {:width (str width "%")}}
           (dom/div :.funnel-bar
                    {:style {:height (str reached-percentage "%")}}
                    (dom/span :.funnel-count reached))
           (dom/div :.funnel-info
                    (dom/span :.funnel-name (name stage))
                    (dom/span :.funnel-percentage (str reached-percentage "%"))
                    (when (> drop-off 0)
                      (dom/span :.funnel-drop-off (str "↓ " drop-off " drop-off"))))))

(def ui-funnel-stage (comp/factory FunnelStage {:keyfn :stage}))

(defn funnel-chart
  "Vertical funnel chart showing drop-off at each stage"
  [{:keys [stages]}]
  (dom/div :.funnel-chart
           (dom/h4 "Completion Funnel")
           (dom/div :.funnel-container
                    (map (fn [stage-data]
                           (ui-funnel-stage (assoc stage-data :width 100)))
                         stages))))

;; ============================================================================
;; Health Score Display
;; ============================================================================

(defn health-score-display
  "Display health score with color coding"
  [{:keys [score factors]}]
  (let [color (cond
                (>= score 80) "#4CAF50"
                (>= score 60) "#FF9800"
                :else "#f44336")
        status (cond
                 (>= score 80) "Healthy"
                 (>= score 60) "Needs Attention"
                 :else "At Risk")]
    (dom/div :.health-score-display
             (progress-gauge {:percentage score
                              :size 150
                              :label status
                              :color color})
             (dom/div :.health-factors
                      (dom/h5 "Health Factors")
                      (dom/ul
                       (dom/li (when (:has-empathy? factors) "✓ ") "Empathy Map Created")
                       (dom/li (when (:has-value-prop? factors) "✓ ") "Value Proposition Defined")
                       (dom/li (when (:has-canvas? factors) "✓ ") "Lean Canvas Started")
                       (dom/li (when (:empathy-complete? factors) "✓ ") "Empathy Map Complete")
                       (dom/li (when (:recent-activity? factors) "✓ ") "Recent Activity"))))))

;; ============================================================================
;; Stage Progress Bars
;; ============================================================================

(defsc StageProgress
  "Progress bar for a single stage"
  [this {:stage/keys [type status percentage updated-at]}]
  {:query [:stage/type :stage/status :stage/percentage :stage/updated-at]
   :ident (fn [] [:stage/type type])}
  (dom/div :.stage-progress
           (dom/div :.stage-header
                    (dom/span :.stage-name (str/replace (name type) #"-" " "))
                    (dom/span :.stage-status-badge
                              {:className (str "status-" (name status))}
                              (name status)))
           (dom/div :.progress-bar-container
                    (dom/div :.progress-bar
                             (dom/div :.progress-fill
                                      {:style {:width (str percentage "%")}}))
                    (dom/span :.progress-text (str percentage "%")))
           (dom/div :.stage-meta
                    (when updated-at
                      (dom/span :.stage-updated
                                (str "Updated: " (.toLocaleDateString (js/Date. updated-at))))))))

(def ui-stage-progress (comp/factory StageProgress {:keyfn :stage/type}))

;; ============================================================================
;; Velocity Chart
;; ============================================================================

(defn velocity-chart
  "Display team velocity over time"
  [{:keys [completions-by-week]}]
  (dom/div :.velocity-chart
           (dom/h4 "Team Velocity (Completions/Week)")
           (dom/div :.velocity-bars
                    (map-indexed
                     (fn [idx count]
                       (dom/div :.velocity-bar-container
                                {:key idx}
                                (dom/div :.velocity-bar
                                         {:style {:height (str (* count 20) "px")}}
                                         (dom/span :.velocity-count count))
                                (dom/span :.velocity-label (str "Week " (inc idx)))))
                     completions-by-week))))

;; ============================================================================
;; Time Tracking
;; ============================================================================

(defn time-display
  "Display time in human-readable format"
  [ms]
  (cond
    (> ms (* 7 24 60 60 1000))
    (str (int (/ ms (* 7 24 60 60 1000))) " weeks")

    (> ms (* 24 60 60 1000))
    (str (int (/ ms (* 24 60 60 1000))) " days")

    (> ms (* 60 60 1000))
    (str (int (/ ms (* 60 60 1000))) " hours")

    :else
    (str (int (/ ms (* 60 1000))) " minutes")))

(defn time-tracking-display
  "Display time spent on project"
  [{:keys [total-time stages]}]
  (dom/div :.time-tracking
           (dom/h4 "⏱ Time Tracking")
           (dom/div :.time-total
                    (dom/span :.time-label "Total Time:")
                    (dom/span :.time-value (time-display total-time)))
           (dom/div :.time-by-stage
                    (map (fn [stage]
                           (dom/div :.time-stage
                                    {:key (:stage/type stage)}
                                    (dom/span :.stage-name (name (:stage/type stage)))
                                    (dom/span :.stage-time (time-display (:stage/time stage)))))
                         stages))))

;; ============================================================================
;; Predictions
;; ============================================================================

(defn prediction-card
  "Display success prediction"
  [{:keys [likelihood confidence message]}]
  (let [colors {:high "#4CAF50"
                :medium "#FF9800"
                :low "#f44336"
                :very-low "#b71c1c"}
        icons {:high "🚀"
               :medium "⚠️"
               :low "🔴"
               :very-low "🛑"}]
    (dom/div :.prediction-card
             {:style {:borderLeftColor (get colors likelihood "#999")}}
             (dom/div :.prediction-header
                      (dom/span :.prediction-icon (get icons likelihood "❓"))
                      (dom/h4 (str/capitalize (name likelihood)) " Likelihood of Success")
                      (dom/span :.prediction-confidence
                                (str (int (* 100 confidence)) "% confident")))
             (dom/p :.prediction-message message)
             (dom/div :.prediction-actions
                      (ui/button
                       {:onClick #(js/alert "View recommendations")
                        :variant :primary
                        :children "View Recommendations"})
                      (ui/button
                       {:onClick #(js/alert "Dismissed")
                        :variant :secondary
                        :children "Dismiss"})))))

;; ============================================================================
;; Analytics Dashboard
;; ============================================================================

(defsc AnalyticsDashboard
  "Main analytics dashboard component"
  [this {:keys [project-id user-id]}]
  (dom/div :.analytics-dashboard
    ;; Header
           (dom/div :.dashboard-header
                    (dom/h2 "📊 Project Analytics")
                    (ui/button
                     {:onClick #(df/load! this [:component/id :analytics] AnalyticsDashboard)
                      :variant :secondary
                      :children "🔄 Refresh"}))

    ;; Grid layout
           (dom/div :.analytics-grid
      ;; Progress gauge
                    (dom/div :.analytics-card
                             (progress-gauge {:percentage 65 :label "Overall Progress"}))

      ;; Health score
                    (dom/div :.analytics-card
                             (health-score-display
                              {:score 72
                               :factors {:has-empathy? true}
                               :has-value-prop? true
                               :has-canvas? false
                               :empathy-complete? true
                               :recent-activity? true}))

      ;; Stage breakdown
                    (dom/div :.analytics-card.wide
                             (dom/h4 "Stage Progress")
                             (map ui-stage-progress
                                  [{:stage/type :empathy-map :stage/status :completed :stage/percentage 100}
                                   {:stage/type :value-proposition :stage/status :active :stage/percentage 60}
                                   {:stage/type :mvp-planning :stage/status :pending :stage/percentage 0}
                                   {:stage/type :lean-canvas :stage/status :pending :stage/percentage 0}]))

      ;; Funnel
                    (dom/div :.analytics-card
                             (funnel-chart
                              {:stages [{:stage :empathy-map :reached 100 :reached-percentage 100 :completed 85 :drop-off 15}
                                        {:stage :value-proposition :reached 75 :reached-percentage 75 :completed 60 :drop-off 15}
                                        {:stage :mvp-planning :reached 50 :reached-percentage 50 :completed 30 :drop-off 20}
                                        {:stage :lean-canvas :reached 35 :reached-percentage 35 :completed 20 :drop-off 15}]}))

      ;; Prediction
                    (dom/div :.analytics-card
                             (prediction-card
                              {:likelihood :medium
                               :confidence 0.70
                               :message "Making good progress. Focus on completing value proposition and starting MVP planning."}))

      ;; Time tracking
                    (dom/div :.analytics-card
                             (time-tracking-display
                              {:total-time (* 5 24 60 60 1000)
                               :stages [{:stage/type :empathy-map :stage/time (* 3 24 60 60 1000)}
                                        {:stage/type :value-proposition :stage/time (* 2 24 60 60 1000)}]})))))

;; ============================================================================
;; Export
;; ============================================================================

(def dashboard AnalyticsDashboard)
(def progress progress-gauge)
(def funnel funnel-chart)
(def health health-score-display)
