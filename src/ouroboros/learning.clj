;; Learning System with Git-Embed Integration
;; Semantic learning with code context
(ns ouroboros.learning
  "Learning System - Capture, recall, and evolve insights
   
   Now with git-embed integration for semantic code search!"
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure.set :as set]
            [ouroboros.git-embed :as embed]))

;; ============================================================================
;; Learning Data
;; ============================================================================

(def ^:private learning-file "data/learning.edn")

(defn- ensure-learning-dir []
  (let [dir (io/file "data")]
    (when-not (.exists dir) (.mkdirs dir))))

(defn- load-learning []
  (ensure-learning-dir)
  (if-let [f (io/file learning-file)]
    (if (.exists f)
      (read-string (slurp f))
      {:insights [] :patterns {} :categories []})
    {:insights [] :patterns {} :categories []}))

(defn- save-learning [data]
  (ensure-learning-dir)
  (spit learning-file (pr-str data)))

;; ============================================================================
;; Core Learning Functions
;; ============================================================================

(defn save-insight!
  "Save an insight with automatic code context linking
   
   Usage: (save-insight! \"Use threading macros\" :category :style)
   
   Now uses git-embed to find related code!"
  [content & {:keys [category tags source]
              :or {category :general tags [] source :manual}}]
  (let [data (load-learning)
        
        ;; NEW: Find related code using git-embed
        related-code (try
                       (embed/find-related-to-insight content)
                       (catch Exception _ nil))
        
        insight {:id (str (java.util.UUID/randomUUID))
                 :content content
                 :category category
                 :tags tags
                 :source source
                 :created-at (System/currentTimeMillis)
                 :related-code related-code  ;; NEW: semantic links
                 :code-context (when related-code
                                 (map (fn [f]
                                        (try
                                          {:file f :snippet (first (str/split-lines (slurp f)))}
                                          (catch Exception _ nil)))
                                      (take 3 related-code)))}]
    
    (save-learning (update data :insights conj insight))
    insight))

(defn recall
  "Recall insights by category or search term"
  [query & {:keys [category limit]
             :or {limit 10}}]
  (let [data (load-learning)
        insights (:insights data)]
    
    (if category
      (filter #(= category (:category %)) insights)
      (filter #(str/includes? (str/lower-case (:content %))
                             (str/lower-case query))
              insights))))

;; NEW: Semantic recall using git-embed
(defn semantic-recall
  "Recall insights using semantic similarity
   
   Usage: (semantic-recall \"error handling patterns\")"
  [query & {:keys [limit]
             :or {limit 5}}]
  (let [data (load-learning)
        
        ;; Find related code to query
        related-files (try
                        (embed/find-related-to-insight query)
                        (catch Exception _ nil))
        
        ;; Find insights that reference similar code
        insights (:insights data)
        
        ;; Score by code similarity
        scored (map (fn [insight]
                      {:insight insight
                       :score (count (clojure.set/intersection
                                     (set related-files)
                                     (set (:related-code insight))))})
                    insights)]
    
    (->> scored
         (filter #(pos? (:score %)))
         (sort-by :score >)
         (take limit)
         (map :insight))))

;; ============================================================================
;; Pattern Tracking
;; ============================================================================

(defn track-pattern!
  "Track a recurring pattern
   
   Usage: (track-pattern! :threading-macros [:src/api.clj :src/webux.clj])"
  [pattern files]
  (let [data (load-learning)]
    (save-learning (update-in data [:patterns pattern]
                             (fn [existing]
                               (vec (distinct (concat existing files))))))
    pattern))

(defn get-pattern
  "Get files that exhibit a pattern"
  [pattern]
  (get-in (load-learning) [:patterns pattern] []))

;; ============================================================================
;; Categories
;; ============================================================================

(defn add-category!
  "Add a learning category"
  [category]
  (let [data (load-learning)]
    (save-learning (update data :categories
                           (fn [cats] (vec (distinct (conj cats category))))))
    category))

(defn list-categories []
  (:categories (load-learning)))

;; ============================================================================
;; Learning Analytics
;; ============================================================================

(defn learning-stats
  "Get learning statistics"
  []
  (let [data (load-learning)
        insights (:insights data)]
    {:total-insights (count insights)
     :by-category (frequencies (map :category insights))
     :with-code-context (count (filter :related-code insights))
     :patterns (count (:patterns data))}))

;; ============================================================================
;; Git-Embed Integration
;; ============================================================================

(defn update-code-index!
  "Update the code embedding index"
  []
  (try
    (embed/update-index!)
    {:success true}
    (catch Exception e
      {:success false :error (.getMessage e)})))

(defn find-similar-code
  "Find code similar to a file
   
   Usage: (find-similar-code \"src/api.clj\")"
  [file]
  (try
    (embed/similar file)
    (catch Exception e
      {:error (.getMessage e)})))

;; ============================================================================
;; Link Insight to Code
;; ============================================================================

(defn link-insight-to-code!
  "Manually link an insight to related code files"
  [insight-id files]
  (let [data (load-learning)
        insights (:insights data)
        updated (map (fn [insight]
                      (if (= insight-id (:id insight))
                        (assoc insight
                               :related-code files
                               :code-context (map (fn [f]
                                                   {:file f
                                                    :snippet (try
                                                               (first (str/split-lines (slurp f)))
                                                               (catch Exception _ nil))})
                                                 (take 3 files)))
                        insight))
                    insights)]
    (save-learning (assoc data :insights updated))
    insight-id))

;; ============================================================================
;; Modular System Re-exports (for backward compatibility)
;; ============================================================================

(defn- resolve-learning-fn [ns-sym fn-sym]
  (require ns-sym)
  (ns-resolve ns-sym fn-sym))

(defn recall-by-pattern
  "Recall learnings by pattern (re-export from learning.search)"
  [user-id pattern & {:keys [limit] :or {limit 20}}]
  ((resolve-learning-fn 'ouroboros.learning.search 'recall-by-pattern)
   user-id pattern :limit limit))

(defn find-related
  "Find learnings related to context (re-export from learning.search)"
  [user-id context & {:keys [limit] :or {limit 5}}]
  ((resolve-learning-fn 'ouroboros.learning.search 'find-related)
   user-id context :limit limit))

(defn recall-by-category
  "Recall learnings by category (re-export from learning.search)"
  [user-id category & {:keys [limit] :or {limit 50}}]
  ((resolve-learning-fn 'ouroboros.learning.search 'recall-by-category)
   user-id category :limit limit))

(defn get-user-history
  "Get learning history for user (re-export from learning.core)"
  [user-id & {:keys [limit offset] :or {limit 50 offset 0}}]
  ((resolve-learning-fn 'ouroboros.learning.core 'get-user-history)
   user-id :limit limit :offset offset))

(defn get-learning
  "Get a specific learning record (re-export from learning.core)"
  [learning-id]
  ((resolve-learning-fn 'ouroboros.learning.core 'get-learning)
   learning-id))

(defn delete-learning!
  "Delete a learning record (re-export from learning.core)"
  [learning-id]
  ((resolve-learning-fn 'ouroboros.learning.core 'delete-learning!)
   learning-id))

(defn increment-application!
  "Increment application count (re-export from learning.core)"
  [learning-id]
  ((resolve-learning-fn 'ouroboros.learning.core 'increment-application!)
   learning-id))

(defn flywheel-progress
  "Get flywheel progress (re-export from learning.analytics)"
  [user-id]
  ((resolve-learning-fn 'ouroboros.learning.analytics 'flywheel-progress)
   user-id))

(defn get-due-reviews
  "Get due reviews (re-export from learning.review)"
  [user-id]
  ((resolve-learning-fn 'ouroboros.learning.review 'get-due-reviews)
   user-id))

(defn get-review-stats
  "Get review statistics (re-export from learning.review)"
  [user-id]
  ((resolve-learning-fn 'ouroboros.learning.review 'get-review-stats)
   user-id))

(defn complete-review!
  "Complete a review (re-export from learning.review)"
  [learning-id confidence]
  ((resolve-learning-fn 'ouroboros.learning.review 'complete-review!)
   learning-id confidence))

(defn skip-review!
  "Skip a review (re-export from learning.review)"
  [learning-id]
  ((resolve-learning-fn 'ouroboros.learning.review 'skip-review!)
   learning-id))

(defn rebuild-index!
  "Rebuild learning index (re-export from learning.index)"
  []
  ((resolve-learning-fn 'ouroboros.learning.index 'rebuild-learning-index!)))

(defn detect-gaps
  "Detect learning gaps (re-export from learning.analytics)"
  [user-id]
  ((resolve-learning-fn 'ouroboros.learning.analytics 'detect-gaps)
   user-id))

(defn get-user-stats
  "Get user statistics (re-export from learning.analytics)"
  [user-id]
  ((resolve-learning-fn 'ouroboros.learning.analytics 'get-user-stats)
   user-id))

(defn get-all-users
  "Get all users with learnings (re-export from learning.core)"
  []
  ((resolve-learning-fn 'ouroboros.learning.core 'get-all-users)))

(defn save-insight-with-review!
  "Save learning insight with review scheduling (re-export from learning.core)
   Deprecated: Use save-insight! instead"
  [user-id record]
  ((resolve-learning-fn 'ouroboros.learning.core 'save-insight!)
   user-id record))
