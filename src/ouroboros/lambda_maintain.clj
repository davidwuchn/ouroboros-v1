(ns ouroboros.lambda-maintain
  "λ(system) Maintenance Checklist"
  (:require [clojure.java.io :as io] [clojure.string :as str]))

(defn check-file-size [f]
  (let [lines (try (with-open [r (io/reader f)] (count (line-seq r))) (catch Exception -1))
        passed (< lines 200)]
    {:check :file-size :file (str f) :lines lines :passed? passed}))

(defn check-all-file-sizes []
  (let [src-dir (io/file "src")
        clj-files (if (.exists src-dir) (filter #(str/ends-with? (.getName %) ".clj") (file-seq src-dir)) [])
        results (map check-file-size clj-files)
        oversized (filter #(not (:passed? %)) results)]
    {:check :file-size-all :total-files (count results) :oversized (count oversized)}))

(defn check-namespace-scopes []
  {:check :single-purpose :message "Basic check - requires manual review"})

(defn check-overlaps []
  {:check :no-overlaps :message "Basic check - requires manual review"})

(defn run-checklist! []
  (let [size-check (check-all-file-sizes)]
    (println "\n=== λ(system).maintain Checklist ===\n")
    (println (format "[%s] File size - %d/%d files under 200 lines"
                    (if (zero? (:oversized size-check)) "✓" "✗")
                    (- (:total-files size-check) (:oversized size-check))
                    (:total-files size-check)))
    (println "[?] Single purpose - requires manual review")
    (println "[?] No overlaps - requires manual review")
    (println "")
    {:checks [size-check]}))
