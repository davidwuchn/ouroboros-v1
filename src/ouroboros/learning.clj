(ns ouroboros.learning
  "Learning memory system - re-exports from modular namespaces

   Namespaces:
   - ouroboros.learning.core      - CRUD, deduplication, batch operations
   - ouroboros.learning.index     - Index management, caching, WAL
   - ouroboros.learning.review    - Spaced repetition system
   - ouroboros.learning.analytics - Flywheel, stats, gaps
   - ouroboros.learning.search    - Pattern matching, export/import

   Improvements:
   - O(1) index lookups (no more full-memory scans)
   - Atomic index updates with WAL
   - Tag-based inverted index for search
   - Analytics caching with TTL
   - Soft deletes with recovery
   - Batch operations
   - Normalized deduplication"
  (:require
   [clojure.string :as str]
   [ouroboros.learning.core :as core]
   [ouroboros.learning.index :as idx]
   [ouroboros.learning.review :as review]
   [ouroboros.learning.analytics :as analytics]
   [ouroboros.learning.search :as search]))

;; ============================================================================
;; Re-exports from core
;; ============================================================================

(def learning-config core/learning-config)
(def learning-levels analytics/learning-levels)

;; CRUD
(def get-learning core/get-learning)
(def get-user-history core/get-user-history)
(def save-insight! core/save-insight!)
(def save-insight-with-review! core/save-insight-with-review!)  ; Backward compat
(def save-insights-batch! core/save-insights-batch!)
(def update-learning! core/update-learning!)
(def delete-learning! core/delete-learning!)
(def restore-learning! core/restore-learning!)

;; Application tracking
(def increment-application! core/increment-application!)

;; ============================================================================
;; Re-exports from index
;; ============================================================================

(def init! idx/init!)

;; ============================================================================
;; Re-exports from review
;; ============================================================================

(def schedule-review! review/schedule-review!)
(def get-due-reviews review/get-due-reviews)
(def get-review-stats review/get-review-stats)
(def complete-review! review/complete-review!)
(def skip-review! review/skip-review!)
(def ensure-review-scheduled! review/ensure-review-scheduled!)

;; ============================================================================
;; Re-exports from analytics
;; ============================================================================

(def determine-level analytics/determine-level)
(def flywheel-progress analytics/flywheel-progress)
(def get-learning-analytics analytics/get-learning-analytics)
(def get-user-stats analytics/get-user-stats)
(def get-learning-gaps analytics/get-learning-gaps)

;; ============================================================================
;; Re-exports from search
;; ============================================================================

(def recall-by-pattern search/recall-by-pattern)
(def recall-by-category search/recall-by-category)
(def find-related search/find-related)
(def full-text-search search/full-text-search)
(def export-user-learning search/export-user-learning)
(def import-user-learning search/import-user-learning)

;; ============================================================================
;; Backward Compatibility Aliases
;; ============================================================================

(defn create-from-error
  "Create a learning record from an error/fix pattern"
  [user-id error-type fix-explanation context]
  (save-insight! user-id
                 {:title (str "Fix: " error-type)
                  :insights [(str "Error: " error-type)
                             (str "Fix: " fix-explanation)]
                  :pattern (str/replace (str/lower-case error-type) #"\s+" "-")
                  :category "errors/fixes"
                  :tags #{error-type "fix" "debugging"}
                  :examples [{:context context}]}))

(defn create-from-explanation
  "Create a learning record from an explanation"
  [user-id topic explanation depth]
  (save-insight! user-id
                 {:title (str "Understanding: " topic)
                  :insights [explanation]
                  :pattern (str/replace (str/lower-case topic) #"\s+" "-")
                  :category "understanding"
                  :tags #{topic "explanation" "learning"}
                  :confidence (case depth
                               :shallow 2
                               :medium 3
                               :deep 4
                               3)}))

;; ============================================================================
;; Initialization
;; ============================================================================

(init!)

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])

;; Re-export resolvers and mutations from all namespaces
(def resolvers
  (concat
   core/resolvers
   idx/resolvers
   review/resolvers
   analytics/resolvers
   search/resolvers))

(def mutations
  (concat
   core/mutations
   review/mutations
   search/mutations))

;; Legacy aliases for common operations
(pco/defresolver learning-user-history
  [{:keys [user/id]}]
  {::pco/output [{:learning/history [:learning/id
                                     :learning/title
                                     :learning/created
                                     :learning/category
                                     :learning/confidence
                                     :learning/applied-count]}]}
  {:learning/history (get-user-history id)})

(pco/defmutation learning-save!
  [{:keys [user/id title insights pattern category]}]
  {::pco/output [:learning/id :learning/title :learning/created]}
  (let [record (save-insight! id
                              {:title title
                               :insights insights
                               :pattern pattern
                               :category category})]
    {:learning/id (:learning/id record)
     :learning/title (:learning/title record)
     :learning/created (:learning/created record)}))

(pco/defmutation learning-apply!
  [{:keys [learning/id]}]
  {::pco/output [:learning/id :learning/applied-count]}
  (let [updated (increment-application! id)]
    {:learning/id id
     :learning/applied-count (:learning/applied-count updated)}))

;; Add legacy resolvers/mutations to exports
(def all-resolvers (conj resolvers learning-user-history))
(def all-mutations (conj mutations learning-save! learning-apply!))

(comment
  ;; Usage examples
  (require '[ouroboros.learning :as learning])

  ;; Save with auto-deduplication
  (learning/save-insight! :user-123
                          {:title "Type Safety"
                           :insights ["Types prevent bugs"]
                           :tags #{"types" "safety"}})

  ;; Batch save
  (learning/save-insights-batch! :user-123
                                 [{:title "One" :insights ["..."]}
                                  {:title "Two" :insights ["..."]}])

  ;; O(1) lookups
  (learning/get-due-reviews :user-123)  ; Uses review index
  (learning/recall-by-pattern :user-123 "type")  ; Uses tag index

  ;; Cached analytics
  (learning/flywheel-progress :user-123)  ; 60s TTL
  (learning/get-learning-analytics :user-123)

  ;; Export/Import
  (learning/export-user-learning :user-123)
  (learning/import-user-learning :user-123 exported-data))