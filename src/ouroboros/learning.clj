;; Learning System - Facade Namespace
;; Re-exports from core modules
(ns ouroboros.learning
  "Learning System - Capture, recall, and evolve insights
   
   This is the main facade namespace - re-exports from core modules."
  (:require
   ;; Re-export from core
   [ouroboros.learning.core :as core]
   [ouroboros.learning.analytics :as analytics]
   [ouroboros.learning.review :as review]
   [ouroboros.learning.index :as idx]))

;; ============================================================================
;; Re-exported Core Functions
;; ============================================================================

(def save-insight! core/save-insight!)
(def save-insight-with-review! core/save-insight!)
(def get-learning core/get-learning)
(def get-user-history core/get-user-history)
(def update-learning! core/update-learning!)
(def increment-application! core/increment-application!)
(def delete-learning! core/delete-learning!)
(def restore-learning! core/restore-learning!)
(def save-insights-batch! core/save-insights-batch!)
(def record-transfer! core/record-transfer!)
(def suggest-capture core/suggest-capture)
(def create-from-error! core/create-from-error!)
(def create-from-explanation core/create-from-explanation)
(def capture-planning-insight! core/capture-planning-insight!)
(def capture-phase-completion! core/capture-phase-completion!)

;; Instinct tracking
(def determine-instinct-level core/determine-instinct-level)
(def instinct-level-progress core/instinct-level-progress)

;; ============================================================================
;; Analytics Functions
;; ============================================================================

(def get-learning-analytics analytics/get-learning-analytics)
(def get-user-stats analytics/get-user-stats)
(def get-learning-gaps analytics/get-learning-gaps)

;; ============================================================================
;; Review Functions
;; ============================================================================

(def schedule-review! review/schedule-review!)
(def get-due-reviews review/get-due-reviews)
(def get-review-stats review/get-review-stats)
(def complete-review! review/complete-review!)
(def skip-review! review/skip-review!)

;; ============================================================================
;; Index Functions
;; ============================================================================

(def rebuild-index! idx/rebuild-learning-index!)
(def get-all-users (fn [] (keys @idx/learning-index)))

;; ============================================================================
;; Legacy/Compatibility Functions
;; ============================================================================

(defn recall-by-pattern
  "Recall learnings by pattern (legacy)"
  [user-id pattern]
  (let [history (core/get-user-history user-id {:limit 100})]
    (filter #(= pattern (:learning/pattern %)) history)))

(defn find-related
  "Find related learnings for context (legacy)"
  [user-id context]
  (let [history (core/get-user-history user-id {:limit 100})]
    (filter #(some #{context} (:learning/tags %)) history)))

(defn detect-gaps
  "Detect learning gaps for user"
  [user-id]
  (analytics/get-learning-gaps user-id))

;; ============================================================================
;; Init
;; ============================================================================

(defn init!
  "Initialize the learning system - load indexes"
  []
  (idx/init!)
  (analytics/flywheel-progress :system)
  {:status :initialized
   :modules ["core" "analytics" "review" "index"]})
