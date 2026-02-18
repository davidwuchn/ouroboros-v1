;; Learning System with Git-Embed Integration
;; Semantic learning with code context
(ns ouroboros.learning
  "Learning System - Capture, recall, and evolve insights
   
   Now with git-embed integration for semantic code search!
   
   This is the main facade namespace - re-exports from core modules."
  (:require [clojure.java.io :as io]
            [clojure.string :as str]
            [clojure.set :as set]
            [ouroboros.git-embed :as embed]
            ;; Re-export from core
            [ouroboros.learning.core :as core]
            [ouroboros.learning.analytics :as analytics]
            [ouroboros.learning.review :as review]
            [ouroboros.learning.index :as idx]))

;; ============================================================================
;; Re-exported Core Functions
;; ============================================================================

(def save-insight! core/save-insight!)
(def save-insight-with-review! core/save-insight!) ; Alias for backward compat
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
;; Legacy Functions (Backward Compatibility)
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
;; Learning Data (Legacy)
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
;; Legacy Functions (File-based - for backward compat)
;; ============================================================================

(defn save-insight!-legacy
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
;; Init
;; ============================================================================

(defn init!
  "Initialize the learning system - load indexes"
  []
  (idx/init!)
  (analytics/flywheel-progress :system) ;; warm up
  {:status :initialized
   :modules ["core" "analytics" "review" "index"]})

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
