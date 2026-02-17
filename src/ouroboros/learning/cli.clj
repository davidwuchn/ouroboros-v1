;; Learning CLI Tasks
;; Provides bb tasks for learning gap detection and stats
(ns ouroboros.learning.cli
  "Learning CLI tasks for bb"
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]))

(defn gaps-task
  "Detect learning gaps for all users"
  []
  (let [users (learning/get-all-users)
        results (map (fn [user]
                       {:user user
                        :gaps (learning/detect-gaps user)})
                     users)
        with-gaps (filter #(or (seq (:needs-review (:gaps %)))
                               (seq (:low-confidence (:gaps %)))
                               (seq (:rarely-applied (:gaps %))))
                          results)]
    (println "\n=== Learning Gap Analysis ===")
    (if (seq with-gaps)
      (doseq [{:keys [user gaps]} with-gaps]
        (println (str "\nUser: " user))
        (when (seq (:needs-review gaps))
          (println "  Needs review:" (str/join ", " (:needs-review gaps))))
        (when (seq (:low-confidence gaps))
          (println "  Low confidence:" (str/join ", " (:low-confidence gaps))))
        (when (seq (:rarely-applied gaps))
          (println "  Rarely used:" (str/join ", " (:rarely-applied gaps)))))
      (println "No learning gaps detected"))
    (println "")
    {:users-checked (count users)
     :users-with-gaps (count with-gaps)
     :results with-gaps}))

(defn stats-task
  "Show learning statistics"
  []
  (let [users (learning/get-all-users)
        results (map (fn [user]
                       {:user user
                        :stats (learning/get-user-stats user)})
                     users)]
    (println "\n=== Learning Statistics ===")
    (if (seq results)
      (doseq [{:keys [user stats]} results]
        (println (str "\n" (name user) ":"))
        (println "  Total learnings:" (:total-learnings stats))
        (println "  Applications:" (:total-applications stats))
        (println "  Avg confidence:" (format "%.1f" (:average-confidence stats)))
        (when (seq (:recent-learnings stats))
          (println "  Recent:" (str/join ", " (take 3 (:recent-learnings stats))))))
      (println "No learnings yet"))
    (println "")
    {:results results}))
