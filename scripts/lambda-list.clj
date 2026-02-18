#!/usr/bin/env bb
;; λ(list) - List all instincts sorted by φ
(require '[clojure.string :as str]
         '[clojure.java.io :as io])

(defn parse-instinct [file]
  (let [content (slurp file)
        frontmatter (second (re-find #"(?s)^---\n(.*?)\n---" content))
        lines (str/split-lines frontmatter)]
    (into {} (keep #(let [[k v] (str/split % #":" 2)]
                      (when (and k v)
                        [(keyword (str/trim k)) (str/trim v)]))
                   lines))))

(def instincts
  (->> (file-seq (io/file ".eca/skills/continuous-learning/instincts/personal"))
       (filter #(str/ends-with? (.getName %) ".md"))
       (map #(assoc (parse-instinct %) :file (.getName %)))
       (sort-by #(parse-double (:φ % "0.5")) >)))

(println "\n┌─────────────────────────────────────────────────────────────────┐")
(println "│  λ(list) — Instincts by φ (organic strength)                   │")
(println "├─────────────────────────────────────────────────────────────────┤")

(doseq [i instincts
        :let [phi (parse-double (:φ i "0.5"))
              bar (str/join (repeat (int (* phi 20)) "█"))]]
  (println (format "│  %s │ φ:%.2f │ %s"
                   bar
                   phi
                   (str/trim (:name i)))))

(println "├─────────────────────────────────────────────────────────────────┤")
(println (format "│  Total: %d instincts                                            │" (count instincts)))
(println "└─────────────────────────────────────────────────────────────────┘")

(println "\nCommands:")
(println "  bb lambda:list      — Show all instincts")
(println "  bb lambda:learn     — Retrieve relevant for current context")
(println "  bb lambda:observe   — Record new pattern")
(println "  bb lambda:maintain  — Run maintenance checklist")
