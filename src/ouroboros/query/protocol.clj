;; ----------------------------------------------------------------------------
;; Query Protocol - Minimal interface for query operations
;;
;; This protocol exists to break the query ↔ agent circular dependency.
;; Both namespaces can depend on this protocol instead of each other.
;; ----------------------------------------------------------------------------

(ns ouroboros.query.protocol
  "Query Protocol - Decouples query from agent

   Breaking the cycle: query.clj required agent.clj (for resolvers),
   and agent.clj indirectly depended on query (for EQL queries).

   Solution: Define a minimal protocol that agent can call without
   requiring the full query namespace."
  (:require
   [com.wsscode.pathom3.interface.eql :as p.eql]))

(defprotocol IQuery
  "Minimal query interface for agents"

  (eql
    [this query]
    "Execute EQL query and return result")

  (env
    [this]
    "Get the query environment for advanced operations"))

;; Create a query implementation that wraps the actual query functions
(defonce ^:private query-impl (atom nil))

(defn set-impl!
  "Set the query implementation (called after query/init!)"
  [impl]
  (reset! query-impl impl))

(defn get-impl
  "Get the current query implementation"
  []
  @query-impl)

(extend-type Object
  IQuery
  (eql [_ query]
    (when-let [env (env @query-impl)]
      (p.eql/process env query)))
  (env [_]
    (:env @query-impl)))

(comment
  ;; Usage in agent:
  ;; (require '[ouroboros.query.protocol :as qp])
  ;; (qp/eql my-query-instance [:system/status])

  ;; Setup (in query.clj after init!):
  ;; (require '[ouroboros.query.protocol :as qp])
  ;; (qp/set-impl! {:env query-env})
  )
