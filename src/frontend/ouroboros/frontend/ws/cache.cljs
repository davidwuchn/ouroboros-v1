(ns ouroboros.frontend.ws.cache
  "Cache persistence for localStorage (wisdom, tip-detail, content, categories).
   Handles serialization/deserialization of complex cache keys."
  (:require
   [clojure.string :as str]
   [ouroboros.frontend.ws.defaults :as defaults]))

;; ============================================================================
;; Wisdom Cache Persistence
;; ============================================================================

(def ^:private wisdom-cache-key "ouroboros.wisdom-cache")

(defn load-wisdom-cache
  "Load wisdom cache from localStorage. Returns map or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage wisdom-cache-key)]
      (let [parsed (js/JSON.parse raw)
            m (js->clj parsed :keywordize-keys true)]
        (into {}
              (keep (fn [[k v]]
                      (let [parts (str/split (name k) #":")]
                        (when (= 2 (count parts))
                          [[(keyword (first parts)) (keyword (second parts))] v]))))
              m)))
    (catch :default _e nil)))

(defn save-wisdom-cache!
  "Persist wisdom cache to localStorage."
  [cache-map]
  (try
    (let [serializable (into {}
                             (map (fn [[[phase req-type] content]]
                                    [(str (name phase) ":" (name req-type)) content]))
                             cache-map)]
      (.setItem js/localStorage wisdom-cache-key
                (js/JSON.stringify (clj->js serializable))))
    (catch :default _e nil)))

;; ============================================================================
;; Tip Detail Cache Persistence
;; ============================================================================

(def ^:private tip-detail-cache-key "ouroboros.tip-detail-cache")

(defn load-tip-detail-cache
  "Load tip-detail cache from localStorage. Returns map or nil."
  []
  (try
    (when-let [raw (.getItem js/localStorage tip-detail-cache-key)]
      (let [parsed (js/JSON.parse raw)
            m (js->clj parsed :keywordize-keys false)]
        (into {}
              (keep (fn [[k v]]
                      (let [idx (.indexOf k ":")]
                        (when (pos? idx)
                          [[(keyword (subs k 0 idx)) (subs k (inc idx))] v]))))
              m)))
    (catch :default _e nil)))

(defn save-tip-detail-cache!
  "Persist tip-detail cache to localStorage."
  [cache-map]
  (try
    (let [serializable (into {}
                             (map (fn [[[phase title] content]]
                                    [(str (name phase) ":" title) content]))
                             cache-map)]
      (.setItem js/localStorage tip-detail-cache-key
                (js/JSON.stringify (clj->js serializable))))
    (catch :default _e nil)))

;; ============================================================================
;; Category Insights Cache
;; ============================================================================

(def ^:private category-insights-cache-key "ouroboros.category-insights-cache")

(defn load-category-insights-cache
  "Load category-insights cache from localStorage."
  []
  (try
    (when-let [raw (.getItem js/localStorage category-insights-cache-key)]
      (let [parsed (js/JSON.parse raw)]
        (js->clj parsed :keywordize-keys true)))
    (catch :default _e nil)))

(defn save-category-insights-cache!
  "Persist category-insights cache to localStorage."
  [cache-map]
  (try
    (when (seq cache-map)
      (.setItem js/localStorage category-insights-cache-key
                (js/JSON.stringify (clj->js cache-map))))
    (catch :default _e nil)))

;; ============================================================================
;; Content Cache Persistence
;; ============================================================================

(def ^:private content-cache-key "ouroboros.content-cache")

(def ^:private cacheable-content-types
  #{:templates :learning-categories :chat-suggestions :flywheel-guide})

(defn load-content-cache
  "Load cached content/generated data from localStorage."
  []
  (try
    (when-let [raw (.getItem js/localStorage content-cache-key)]
      (let [parsed (js/JSON.parse raw)]
        (js->clj parsed :keywordize-keys true)))
    (catch :default _e nil)))

(defn save-content-cache!
  "Persist content/generated data to localStorage."
  [generated-map]
  (try
    (let [to-cache (select-keys generated-map cacheable-content-types)]
      (when (seq to-cache)
        (.setItem js/localStorage content-cache-key
                  (js/JSON.stringify (clj->js to-cache)))))
    (catch :default _e nil)))

;; ============================================================================
;; Learning Categories Cache
;; ============================================================================

(defn save-learning-categories!
  "Persist learning categories to localStorage."
  [categories total-insights]
  (try
    (.setItem js/localStorage "ouroboros.learning-categories"
              (js/JSON.stringify (clj->js {:categories categories
                                           :total-insights total-insights})))
    (catch :default _e nil)))

;; ============================================================================
;; Hydration (called from set-app-state-atom!)
;; ============================================================================

(defn hydrate-caches!
  "Hydrate all caches from localStorage into app-state-atom.
   Called once during initialization."
  [state-atom]
  ;; Wisdom cache: defaults as base, localStorage overrides on top
  (let [persisted (or (load-wisdom-cache) {})
        merged (merge defaults/default-wisdom-cache persisted)]
    (swap! state-atom assoc :wisdom/cache merged))
  ;; Content cache
  (when-let [cached-content (load-content-cache)]
    (swap! state-atom update :content/generated merge cached-content))
  ;; Learning categories
  (try
    (when-let [raw (.getItem js/localStorage "ouroboros.learning-categories")]
      (let [parsed (js->clj (js/JSON.parse raw) :keywordize-keys true)]
        (when (seq (:categories parsed))
          (swap! state-atom
                 (fn [s]
                   (-> s
                       (assoc :learning/categories (:categories parsed))
                       (assoc :learning/total-insights (:total-insights parsed))))))))
    (catch :default _e nil))
  ;; Tip-detail cache: defaults as baseline
  (let [tip-cache (load-tip-detail-cache)]
    (swap! state-atom assoc :tip-detail/cache
           (merge defaults/default-tip-detail-cache tip-cache)))
  ;; Category-insights cache
  (when-let [insights-cache (load-category-insights-cache)]
    (swap! state-atom assoc :learning/category-insights-cache insights-cache)))
