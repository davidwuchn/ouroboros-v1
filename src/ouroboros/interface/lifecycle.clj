(ns ouroboros.interface.lifecycle
  "System lifecycle - Boot and shutdown
   
   The unified system surface. Boot sequence:
   1. Start statechart (Engine)
   2. Initialize Pathom (Query)
   3. Load Memory"
  (:require
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]))

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
