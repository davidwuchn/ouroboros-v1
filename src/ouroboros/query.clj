(ns ouroboros.query
  "Query + Graph - EQL interface over the Engine
   
   Resolvers expose the statechart state as a queryable graph.
   This is ψ's window into the system."
  (:require
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [ouroboros.engine :as engine]
   [ouroboros.history :as history]
   [ouroboros.introspection :as intro]
   [ouroboros.memory :as memory]
   [ouroboros.knowledge :as knowledge]
   [ouroboros.api :as api]))

;; ============================================================================
;; Resolvers - Exposing Engine state as graph nodes
;; ============================================================================

(pco/defresolver system-state [_]
  {::pco/output [:system/current-state]}
  {:system/current-state (engine/current-state)})

(pco/defresolver system-status-resolver [_]
  {::pco/output [:system/status]}
  (let [status (engine/system-status)]
    {:system/status status}))

(pco/defresolver system-healthy [_]
  {::pco/output [:system/healthy?]}
  {:system/healthy? (engine/healthy?)})

(pco/defresolver system-meta [_]
  {::pco/output [:system/meta]}
  {:system/meta {:version "0.1.0"
                 :timestamp (str (java.time.Instant/now))
                 :engine "statecharts"}})

;; ============================================================================
;; Environment - The queryable interface
;; ============================================================================

(def all-resolvers
  (concat [system-state
           system-status-resolver
           system-healthy
           system-meta]
          history/resolvers
          intro/resolvers
          memory/resolvers
          knowledge/resolvers
          api/resolvers))

(defn create-env
  "Create a Pathom environment with all resolvers and mutations"
  []
  (-> (pci/register all-resolvers)
      (pci/register memory/mutations)
      (pci/register api/mutations)))

(defonce ^:private query-env (atom nil))

(defn init!
  "Initialize the query environment"
  []
  (reset! query-env (create-env))
  (println "✓ Query environment initialized"))

(defn q
  "Query the system with EQL
   
   Usage: (q [:system/current-state])
          (q [:system/status])
          (q [:system/healthy? :system/meta])"
  [query]
  (when-let [env @query-env]
    (p.eql/process env query)))

(defn m
  "Execute a mutation on the system
   
   Usage: (m 'memory/save! {:memory/key :foo :memory/value \"bar\"})"
  [mutation params]
  (when-let [env @query-env]
    (p.eql/process env [(list mutation params)])))

;; ============================================================================
;; Convenience Queries
;; ============================================================================

(defn status
  "Quick status check"
  []
  (q [:system/status :system/healthy?]))

(defn full-report
  "Complete system report"
  []
  (q [:system/current-state
      :system/status
      :system/healthy?
      :system/meta]))

(comment
  ;; Initialize and query
  (init!)

  ;; Simple queries
  (q [:system/current-state])
  (q [:system/healthy?])

  ;; Full report
  (full-report)

  ;; Status
  (status))