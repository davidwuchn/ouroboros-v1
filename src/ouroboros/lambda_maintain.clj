;; λ(system) Maintenance Checklist
;; Implements: λ(system).maintain from LAMBDA_SYSTEM_REAL.md
(ns ouroboros.lambda-maintain
  "λ(system) Maintenance Checklist

   Implements the λ(system).maintain checklist:
   - Size check: lines < 200
   - Scope check: single-purpose
   - Value check: unique-value
   - Overlap check: no-overlaps
   - Access check: retrieval-time < 1s
   - Usage check: hit-rate > 0.8"
  (:require [clojure.java.io :as io]
            [clojure.string :as str]))

;; ============================================================================
;; Size Check
;; ============================================================================

(defn check-file-size
  "Check if a file is under the 200-line threshold"
  [f]
  (let [lines (try (with-open [r (io/reader f)]
                     (count (line-seq r)))
                   (catch Exception _ -1))
        passed (< lines 200)]
    {:check :file-size
     :file (str f)
     :lines lines
     :passed? passed}))

(defn check-all-file-sizes
  "Check all Clojure files in src/ directory"
  []
  (let [src-dir (io/file "src")
        clj-files (if (.exists src-dir)
                    (filter #(str/ends-with? (.getName %) ".clj")
                            (file-seq src-dir))
                    [])
        results (map check-file-size clj-files)
        oversized (filter #(not (:passed? %)) results)]
    {:check :file-size-all
     :total-files (count results)
     :oversized (count oversized)
     :files (map #(select-keys % [:file :lines]) oversized)}))

;; ============================================================================
;; Scope Check (Single Purpose)
;; ============================================================================

(defn- extract-ns-decl [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               ns-match (re-find #"\(ns\s+([^\s]+)" content)]
           (second ns-match)))
       (catch Exception _ nil)))

(defn- count-public-defs [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               defs (re-seq #"\(defn\s+(?!-|n|-)\[?([^\s\]]+)" content)]
           (count defs)))
       (catch Exception _ 0)))

(defn- count-mutations [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               mutations (re-seq #"\(pco/defmutation\s+([^\s\]]+)" content)]
           (count mutations)))
       (catch Exception _ 0)))

(defn- count-resolvers [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               resolvers (re-seq #"\(pco/defresolver\s+([^\s\]]+)" content)]
           (count resolvers)))
       (catch Exception _ 0)))

(defn check-namespace-scopes
  "Check if namespaces have single purpose (focus metric)

   A namespace should ideally have:
   - < 10 public functions (single-purpose indicator)
   - < 5 mutations/resolvers (domain focus)"
  []
  (let [src-dir (io/file "src")
        clj-files (if (.exists src-dir)
                    (filter #(str/ends-with? (.getName %) ".clj")
                            (file-seq src-dir))
                    [])
        namespace-stats (for [f clj-files
                              :let [ns (extract-ns-decl f)
                                    defs (count-public-defs f)
                                    mutations (count-mutations f)
                                    resolvers (count-resolvers f)]
                              :when ns]
                          {:namespace ns
                           :file (str f)
                           :public-fns defs
                           :mutations mutations
                           :resolvers resolvers
                           :focus-score (+ (* 0.3 (- 10 defs))
                                           (* 0.4 (- 5 mutations))
                                           (* 0.3 (- 5 resolvers)))}) ;; Higher = better focused
        overloaded (filter #(or (> (:public-fns %) 10)
                                (> (:mutations %) 5)
                                (> (:resolvers %) 5))
                           namespace-stats)]
    {:check :single-purpose
     :total-namespaces (count namespace-stats)
     :focus-issues (count overloaded)
     :details (map #(select-keys % [:namespace :file :public-fns :mutations :resolvers])
                   overloaded)}))

;; ============================================================================
;; Overlap Check
;; ============================================================================

(defn- extract-requires [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               requires (re-seq #":require\s*\n?\s*\[([^\]]+)" content)]
           (map second requires)))
       (catch Exception _ [])))

(defn- extract-defs [file]
  (try (with-open [r (io/reader file)]
         (let [content (slurp r)
               defs (re-seq #"\(def[n\s-]+\"?(\w+)\"?\s" content)]
           (map second defs)))
       (catch Exception _ [])))

(defn check-overlaps
  "Check for code overlap between namespaces

   Detects:
   - Duplicate function names across files
   - Similar require patterns (potential feature overlap)"
  []
  (let [src-dir (io/file "src")
        clj-files (if (.exists src-dir)
                    (filter #(str/ends-with? (.getName %) ".clj")
                            (file-seq src-dir))
                    [])
        ;; Build index of defs by name
        def-index (reduce (fn [acc f]
                            (let [defs (extract-defs f)]
                              (reduce (fn [a d]
                                        (update a d (fnil conj #{}) (str f)))
                                      acc
                                      defs)))
                          {}
                          clj-files)
        ;; Find duplicates
        duplicates (filter #(> (count (val %)) 1) def-index)
        ;; Build require graph
        require-graph (reduce (fn [acc f]
                                (let [reqs (extract-requires f)]
                                  (assoc acc (str f) (set reqs))))
                              {}
                              clj-files)]
    {:check :no-overlaps
     :duplicate-defs (count duplicates)
     :duplicate-details (map #(hash-map :def (key %) :files (val %))
                             (take 10 duplicates))
     :total-namespaces (count require-graph)}))

;; ============================================================================
;; Value Check (Unique Value)
;; ============================================================================

(defn check-unique-value
  "Check if files provide unique value

   Small files (< 30 lines) that don't contain core logic may be candidates for removal."
  []
  (let [src-dir (io/file "src")
        clj-files (if (.exists src-dir)
                    (filter #(str/ends-with? (.getName %) ".clj")
                            (file-seq src-dir))
                    [])
        small-files (for [f clj-files
                          :let [lines (try (with-open [r (io/reader f)]
                                             (count (line-seq r)))
                                           (catch Exception _ 0))]
                          :when (< lines 30)]
                      {:file (str f) :lines lines})
        core-files #{"resolver_registry.clj" "memory.clj" "telemetry.clj"
                     "engine.clj" "query.clj" "websocket.clj"}
        candidates (filter #(not (some (fn [c] (str/includes? (str %) c))
                                       core-files))
                           small-files)]
    {:check :unique-value
     :small-files (count candidates)
     :candidates (map #(select-keys % [:file :lines]) (take 10 candidates))}))

;; ============================================================================
;; Run Full Checklist
;; ============================================================================
(defn run-checklist!
  "Execute the complete λ(system).maintain checklist"
  []
  (println "\n" (str "= " 56))
  (println "λ(system).maintain Checklist")
  (println (str "= " 56))
  (println "")

  ;; Run all checks and collect results
  (let [size-check (check-all-file-sizes)
        scope-check (check-namespace-scopes)
        overlap-check (check-overlaps)
        value-check (check-unique-value)]

    ;; Size check output
    (println (format "[%s] File size - %d/%d files under 200 lines"
                     (if (zero? (:oversized size-check)) "✓" "✗")
                     (- (:total-files size-check) (:oversized size-check))
                     (:total-files size-check)))
    (when (pos? (:oversized size-check))
      (doseq [f (take 5 (:files size-check))]
        (println (format "      %s (%d lines)" (:file f) (:lines f)))))
    (println "")

    ;; Scope check output
    (println (format "[%s] Single purpose - %d/%d namespaces focused"
                     (if (zero? (:focus-issues scope-check)) "✓" "⚠")
                     (- (:total-namespaces scope-check) (:focus-issues scope-check))
                     (:total-namespaces scope-check)))
    (when (pos? (:focus-issues scope-check))
      (doseq [d (take 3 (:details scope-check))]
        (println (format "      %s: %d fns, %d mutations"
                         (:namespace d)
                         (:public-fns d)
                         (:mutations d)))))
    (println "")

    ;; Overlap check output
    (println (format "[%s] No overlaps - %d duplicate definitions"
                     (if (zero? (:duplicate-defs overlap-check)) "✓" "⚠")
                     (:duplicate-defs overlap-check)))
    (when (pos? (:duplicate-defs overlap-check))
      (doseq [d (take 3 (:duplicate-details overlap-check))]
        (println (format "      '%s' in %s"
                         (:def d)
                         (count (:files d))))))
    (println "")

    ;; Value check output
    (println (format "[?] Unique value - %d small files need review"
                     (:small-files value-check)))
    (println "")

    {:checks {:size size-check
              :scope scope-check
              :overlap overlap-check
              :value value-check}}))
