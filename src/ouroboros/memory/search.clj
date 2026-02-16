(ns ouroboros.memory.search
  "Memory Search - Simple keyword matching (no DB)"
  (:require [cheshire.core :as json] [clojure.string :as str] [clojure.java.io :as io]))

(def ^:private index-file "memory/search-index.jsonl")

(defn- ensure-dir! []
  (let [dir (io/file "memory")]
    (when-not (.exists dir) (.mkdirs dir))))

(def ^:private search-index (atom {:memories {} :by-tag {}}))

(defn- load-index! []
  (ensure-dir!)
  (let [f (io/file index-file)]
    (when (.exists f)
      (try (reset! search-index (json/parse-string (slurp f)))
           (catch Exception _ (reset! search-index {:memories {} :by-tag {}}))))))

(defn- save-index! []
  (ensure-dir!)
  (try (spit index-file (json/generate-string @search-index))
       (catch Exception _ nil)))

(load-index!)

(defn add-memory! [id content tags]
  (let [entry {:content content :tags (set tags) :timestamp (System/currentTimeMillis)}
        id-str (name id)]
    (doseq [tag tags]
      (swap! search-index update-in [:by-tag (name tag)] (fnil conj #{}) id-str))
    (swap! search-index update :memories assoc id-str entry)
    (save-index!)
    {:id id :status :added}))

(defn get-memory [id]
  (get-in @search-index [:memories (name id)]))

(defn delete-memory! [id]
  (swap! search-index (fn [idx] (update idx :memories dissoc (name id))))
  (save-index!)
  {:id id :status :deleted})

(defn search [query & {:keys [limit] :or {limit 10}}]
  (let [q (str/lower-case query)
        results (filter (fn [[_ mem]] (str/includes? (str/lower-case (:content mem)) q))
                       (:memories @search-index))]
    {:query query
     :results (mapv (fn [[id mem]] {:id (keyword id) :content (:content mem)}) (take limit results))
     :total (count results)}))

(defn memory-stats []
  {:total (count (:memories @search-index)) :tags (count (:by-tag @search-index))})
