#!/usr/bin/env bb
(ns ns-audit
  "Namespace dependency graph analyzer"
  (:require [clojure.string :as str]
            [clojure.java.io :as io]))

(defn ns-name [f]
  (second (re-find #"\(ns\s+(\S+)" (slurp f))))

(defn requires [f]
  (->> (re-seq #"\[(ouroboros\.[^\s\]]+)" (slurp f))
       (map second) set))

(def files (->> (file-seq (io/file "src"))
                (filter #(str/ends-with? (.getName %) ".clj"))))

(def data (into {} (keep #(let [n (ns-name %)]
                            (when n [n {:file (.getPath %)
                                        :requires (requires %)}]))
                         files)))

(def all-ns (set (keys data)))

;; Reverse index: who requires this namespace
(def rev (reduce (fn [acc [ns info]]
                   (reduce (fn [a r] (update a r (fnil conj #{}) ns))
                           acc (:requires info)))
                 {} data))

;; Find cycles using DFS
(defn find-cycles [graph]
  (let [visited (atom #{}) 
        stack (atom #{}) 
        cycles (atom [])]
    (defn dfs [node path]
      (when (contains? @stack node)
        (swap! cycles conj (vec (drop-while #(not= % node) (conj path node)))))
      (when (and (contains? graph node) (not (contains? @visited node)))
        (swap! visited conj node)
        (swap! stack conj node)
        (doseq [nbr (:requires (get graph node))]
          (when (contains? graph nbr)
            (dfs nbr (conj path node))))
        (swap! stack disj node)))
    (doseq [n (keys graph)]
      (when (not (contains? @visited n))
        (dfs n [])))
    @cycles))

(defn max-depth [graph node seen]
  (if (contains? seen node)
    0
    (let [deps (:requires (get graph node))]
      (if (seq deps)
        (inc (apply max 0 (map #(max-depth graph % (conj seen node)) deps)))
        1))))

;; Report
(println "\n╔════════════════════════════════════════════════╗")
(println "║       NAMESPACE DEPENDENCY AUDIT               ║")
(println "╚════════════════════════════════════════════════╝")
(println (format "\nTotal: %d namespaces\n" (count all-ns)))

(println "╔══ HIGH FAN-IN (used by 5+ namespaces) ══╗")
(doseq [[ns importers] (sort-by #(count (val %)) > rev)
        :when (>= (count importers) 5)]
  (println (format "  %s: %d importers" ns (count importers))))

(println "\n╔══ HEAVY IMPORTERS (10+ requires) ══╗")
(doseq [[ns info] (sort-by #(count (:requires (val %))) > data)
        :when (>= (count (:requires info)) 10)]
  (println (format "  %s: %d requires" ns (count (:requires info)))))

(println "\n╔══ CIRCULAR DEPENDENCIES ══╗")
(let [cycles (find-cycles data)]
  (if (seq cycles)
    (doseq [c cycles]
      (println (format "  ✗ %s" (str/join " → " c))))
    (println "  ✓ None detected")))

(println "\n╔══ DEEPEST DEPENDENCY CHAINS ══╗")
(doseq [n (take 10 (sort-by #(max-depth data % #{}) > all-ns))]
  (println (format "  %s: depth %d" n (max-depth data n #{}))))

(println "\n╔══ LEAF NODES (no ouroboros deps) ══╗")
(doseq [[ns info] (sort data)
        :when (empty? (:requires info))]
  (println (format "  · %s" ns)))

(println "\n╚════════════════════════════════════════════════╝\n")
