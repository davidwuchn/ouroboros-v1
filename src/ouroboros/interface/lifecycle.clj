(ns ouroboros.interface.lifecycle
  "System lifecycle - Boot and shutdown
   
   The unified system surface. Boot sequence:
   1. Start statechart (Engine)
   2. Initialize Pathom (Query)
   3. Load Memory
   4. Enable λ(system) evolution bridge"
  (:require
   [clojure.pprint :as pprint]
   [ouroboros.engine :as engine]
   [ouroboros.query :as query]
   [ouroboros.memory :as memory]))

(defn boot!
  "Boot the complete system
   
   Sequence:
   - Engine: Create statechart session, transition to :running
   - Query: Initialize Pathom environment with all resolvers
   - Memory: Load persisted memory from disk
   - λ(system): Enable evolution bridge for auto-improvement"
  []
  (println "========================================")
  (println "  Ouroboros System Boot")
  (println "========================================")

  ;; Step 1: Engine
  (println "\n[1/4] Starting Engine (∅)...")
  (engine/boot!)

  ;; Step 2: Query
  (println "\n[2/4] Initializing Query interface...")
  (query/init!)

  ;; Step 3: Memory
  (println "\n[3/4] Loading Memory...")
  (memory/init!)

  ;; Step 4: λ(system) Evolution Bridge
  (println "\n[4/4] Enabling λ(system) evolution bridge...")
  (try
    (require '[ouroboros.telemetry.lambda-bridge :as bridge])
    (bridge/enable!)
    (println "✓ λ(system) auto-evolution enabled")
    (catch Exception e
      (println "⚠ λ(system) bridge unavailable:" (.getMessage e))))

  ;; Verification
  (println "\n========================================")
  (println "  System Status:")
  (pprint/pprint (query/status))
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
