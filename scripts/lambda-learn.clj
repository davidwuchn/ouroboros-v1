#!/usr/bin/env bb
;; λ(learn) — Retrieve instincts for current context
(require '[clojure.java.io :as io]
         '[clojure.string :as str])

(defn parse-instinct [file]
  (let [content (slurp file)
        fm-pattern (re-pattern "(?s)^---\\n(.*?)\\n---")
        frontmatter (second (re-find fm-pattern content))]
    (into {:file (.getName file)}
          (keep (fn [line]
                  (let [[k v] (str/split line (re-pattern ":"))]
                    (when (and k v)
                      [(keyword (str/trim k)) (str/trim v)])))
                (str/split-lines frontmatter)))))

(let [ctx (or (first *command-line-args*) "general")]
  (println (str "\nλ(learn) for context: " ctx))
  (println "\nActive instincts:")
  (->> (file-seq (io/file ".eca/skills/continuous-learning/instincts/personal"))
       (filter (fn [f] (str/ends-with? (.getName f) ".md")))
       (map parse-instinct)
       (filter (fn [i] (or (str/includes? (str (:λ i)) ctx)
                          (str/includes? (str (:domain i)) ctx)
                          (str/blank? ctx))))
       (sort-by (fn [i] (parse-double (:φ i "0.5"))) >)
       (take 5)
       (run! (fn [i] (println (format "  • %s (φ:%s) — %s"
                                      (:name i)
                                      (:φ i)
                                      (str/replace (:λ i) "when." "")))))))