#!/usr/bin/env bb
;; λ(maintain) — Run maintenance checklist
(require '[clojure.java.io :as io]
         '[clojure.string :as str])

(defn get-phi [file]
  (let [content (slurp file)
        fm-pattern (re-pattern "(?s)^---\\n(.*?)\\n---")
        phi-pattern (re-pattern "φ:\\s*([0-9.]+)")
        frontmatter (second (re-find fm-pattern content))]
    [(.getName file)
     (parse-double (second (re-find phi-pattern frontmatter)))]))

(let [instincts (->> (file-seq (io/file ".eca/skills/continuous-learning/instincts/personal"))
                     (filter (fn [f] (str/ends-with? (.getName f) ".md"))))]
  (println "\n┌──────────────────────────────────────────────────────────────┐")
  (println "│  λ(maintain) — Maintenance Checklist                        │")
  (println "├──────────────────────────────────────────────────────────────┤")
  (println (format "│  Total instincts: %-42d│" (count instincts)))
  (let [oversized (->> instincts
                       (filter (fn [f] (> (count (slurp f)) 4000)))
                       (map (fn [f] (.getName f))))]
    (when (seq oversized)
      (println (format "│  ⚠ Oversized (>4000 chars): %-30s│" (count oversized)))
      (doseq [f oversized]
        (println (format "│    • %s" f)))))
  (let [low-phi (->> instincts
                     (map get-phi)
                     (filter (fn [pair] (< (second pair) 0.3)))
                     (map first))]
    (when (seq low-phi)
      (println (format "│  ⚠ Low φ (<0.3) consider archive: %-24s│" (count low-phi)))
      (doseq [f low-phi]
        (println (format "│    • %s" f)))))
  (println "├──────────────────────────────────────────────────────────────┤")
  (println "│  Checks:                                                     │")
  (println "│    [✓] Size < 4000 chars                                    │")
  (println "│    [✓] φ >= 0.3 or archive                                  │")
  (println "│    [ ] Access patterns (manual review)                      │")
  (println "└──────────────────────────────────────────────────────────────┘"))
