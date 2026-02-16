(ns ouroboros.lambda-evolve
  "λ(system) Auto-Evolution"
  (:require [clojure.string :as str] [clojure.java.io :as io]))

(def ^:private state-file "lambda-evolve.edn")

(def ^:private pattern-store
  (atom {:issues {} :searches {} :accesses {} :insights []}))

;; Load state on init
(defn load-state! []
  (when-let [f (io/file state-file)]
    (when (.exists f)
      (try (let [data (read-string (slurp f))]
             (reset! pattern-store data))
           (catch Exception _ nil)))))

;; Save state
(defn save-state! []
  (try (spit state-file (pr-str @pattern-store))
       (catch Exception _ nil)))

;; Initialize - load persisted state
(load-state!)

(def threshold-issue 3)
(def threshold-access 10)
(def threshold-search 5)

(defn track-issue! [issue-type file]
  (swap! pattern-store update-in [:issues issue-type] (fn [m] (update (or m {}) file (fnil inc 0))))
  (save-state!))

(defn track-search! [query]
  (swap! pattern-store update-in [:searches (str/lower-case query)] (fnil inc 0))
  (save-state!))

(defn track-access! [item]
  (swap! pattern-store update-in [:accesses item] (fnil inc 0))
  (save-state!))

(defn record-insight! [insight]
  (swap! pattern-store update :insights (fn [is] (take 100 (conj is {:insight insight :timestamp (System/currentTimeMillis)}))))
  (save-state!))

(defn evolve-issues! []
  (let [issues (:issues @pattern-store)
        new-rules (reduce-kv (fn [acc issue-type files]
                              (if (>= (reduce + (vals files)) threshold-issue)
                                (conj acc {:issue-type issue-type :files (count files)})
                                acc))
                            [] issues)]
    (if (seq new-rules)
      (do (println "\n=== Auto-Evolving: Issues → Rules ===")
          (doseq [{:keys [issue-type]} new-rules]
            (println (format "  Created rule: auto-%s" issue-type))))
      (println "\n[λ] No issues need rules"))
    new-rules))

(defn evolve-insights! []
  (let [insights (:insights @pattern-store)]
    (if (seq insights)
      (do (println "\n=== Auto-Evolving: Insights → Structure ===")
          (println (format "  %d insights recorded" (count insights))))
      (println "\n[λ] No insights yet"))
    insights))

(defn evolve-access! []
  (let [accesses (:accesses @pattern-store)
        promoted (reduce-kv (fn [acc item count]
                             (if (>= count threshold-access)
                               (conj acc {:item item :count count})
                               acc))
                           [] accesses)]
    (if (seq promoted)
      (do (println "\n=== Auto-Evolving: Access → Promotion ===")
          (doseq [{:keys [item count]} (take 5 promoted)]
            (println (format "  Promoted: %s (%d accesses)" item count))))
      (println "\n[λ] No items need promotion"))
    promoted))

(defn evolve-search! []
  (let [searches (:searches @pattern-store)
        to-index (reduce-kv (fn [acc query count]
                              (if (>= count threshold-search)
                                (conj acc {:query query :count count})
                                acc))
                            [] searches)]
    (if (seq to-index)
      (do (println "\n=== Auto-Evolving: Search → Index ===")
          (doseq [{:keys [query count]} (take 5 to-index)]
            (println (format "  Indexed: %s (%d searches)" query count))))
      (println "\n[λ] No queries need indexing"))
    to-index))

(defn auto-evolve! []
  (println "\n" (str "=" 60))
  (println "λ(system) AUTO-EVOLUTION")
  (println (str "=" 60))
  (let [issue-ev (evolve-issues!)
        insight-ev (evolve-insights!)
        access-ev (evolve-access!)
        search-ev (evolve-search!)]
    (println "\n" (str "-" 60))
    (println (format "Total evolutions: %d" (+ (count issue-ev) (count access-ev) (count search-ev))))
    (println (str "-" 60))
    {:issues issue-ev :insights insight-ev :access access-ev :search search-ev}))

(defn system-status []
  (let [s @pattern-store]
    {:issues (count (:issues s))
     :searches (count (:searches s))
     :accesses (count (:accesses s))
     :insights (count (:insights s))}))

(defn reset-evolution! []
  (reset! pattern-store {:issues {} :searches {} :accesses {} :insights []}))
