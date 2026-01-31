(ns ouroboros.interface
  "Interface - Engine (∅) + Query + Graph + Memory
   
   The unified system surface. Boot sequence:
   1. Start statechart (Engine)
   2. Initialize Pathom (Query)
   3. Load Memory
   4. Expose via nREPL"
  (:require
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(defn boot!
  "Boot the complete system
   
   Sequence:
   - Engine: Create statechart session, transition to :running
   - Query: Initialize Pathom environment with all resolvers
   - Memory: Load persisted memory from disk"
  []
  (println "========================================")
  (println "  Ouroboros System Boot")
  (println "========================================")

  ;; Step 1: Engine
  (println "\n[1/3] Starting Engine (∅)...")
  (engine/boot!)

  ;; Step 2: Query
  (println "\n[2/3] Initializing Query interface...")
  (query/init!)

  ;; Step 3: Memory
  (println "\n[3/3] Loading Memory...")
  (memory/init!)

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

(defn remember
  "Save a value to memory
   
   Usage: (remember :my-key \"my value\")"
  [key value]
  (memory/save-value! key value))

(defn recall
  "Get a value from memory
   
   Usage: (recall :my-key)"
  [key]
  (memory/get-value key))

(defn forget
  "Delete a value from memory
   
   Usage: (forget :my-key)"
  [key]
  (memory/delete-value! key))

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