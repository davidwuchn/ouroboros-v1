(ns ouroboros.interface
  "Interface - Engine (∅) + Query + Graph
   
   The unified system surface. Boot sequence:
   1. Start statechart (Engine)
   2. Initialize Pathom (Query)
   3. Expose via nREPL"
  (:require
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn boot!
  "Boot the complete system
   
   Sequence:
   - Engine: Create statechart session, transition to :running
   - Query: Initialize Pathom environment with Engine resolvers"
  []
  (println "========================================")
  (println "  Ouroboros System Boot")
  (println "========================================")

  ;; Step 1: Engine
  (println "\n[1/2] Starting Engine (∅)...")
  (engine/boot!)

  ;; Step 2: Query
  (println "\n[2/2] Initializing Query interface...")
  (query/init!)

  ;; Verification
  (println "\n========================================")
  (println "  System Status:")
  (clojure.pprint/pprint (query/status))
  (println "========================================")

  ;; Return the query function for convenience
  query/q)

(defn shutdown!
  "Graceful shutdown"
  []
  (println "\n========================================")
  (println "  System Shutdown")
  (println "========================================")
  (engine/stop!)
  (println "✓ System stopped"))

;; ============================================================================
;; Query Helpers (convenience in REPL)
;; ============================================================================

(defn q
  "Query the system (after boot)"
  [query]
  (query/q query))

(defn status
  "Current system status"
  []
  (query/status))

(defn report
  "Full system report"
  []
  (query/full-report))

(comment
  ;; Full boot sequence
  (boot!)

  ;; Query examples
  (q [:system/current-state])
  (q [:system/healthy?])
  (status)
  (report)

  ;; Shutdown
  (shutdown!))