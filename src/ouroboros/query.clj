(ns ouroboros.query
  "Query + Graph - EQL interface over the Engine

   Resolvers expose the statechart state as a queryable graph.
   This is psi's window into the system."
  (:require
   [com.wsscode.pathom3.interface.eql :as p.eql]
   [com.wsscode.pathom3.connect.operation :as pco]
   [com.wsscode.pathom3.connect.indexes :as pci]
   [ouroboros.engine :as engine]
   [ouroboros.history :as history]
   [ouroboros.introspection :as intro]
   [ouroboros.memory :as memory]
   [ouroboros.knowledge :as knowledge]
   [ouroboros.api :as api]
   [ouroboros.openapi :as openapi]
   [ouroboros.tool-registry :as tool-registry]
   [ouroboros.tool-defs :as tool-defs]
   [ouroboros.ai :as ai]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.metrics :as metrics]
   [ouroboros.mcp :as mcp]
   [ouroboros.chat :as chat]
   [ouroboros.agent :as agent]
   [ouroboros.auth :as auth])
  (:import [java.time Instant]))

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
                 :timestamp (str (Instant/now))
                 :engine "statecharts"}})

;; ============================================================================
;; Page Resolvers - For Fulcro Frontend
;; ============================================================================

(pco/defresolver page-dashboard [_]
  {::pco/output [:page/id :system/healthy? :system/current-state :system/meta
                 :telemetry/total-events :telemetry/tool-invocations :telemetry/errors
                 :auth/user-count :auth/admin-count :chat/session-count]}
  {:page/id :dashboard
   :system/healthy? (engine/healthy?)
   :system/current-state (engine/current-state)
   :system/meta {:version "0.1.0"
                 :timestamp (str (Instant/now))
                 :engine "statecharts"}
   :telemetry/total-events (count (telemetry/get-events))
   :telemetry/tool-invocations (count (filter #(= :tool/invoke (:event %)) (telemetry/get-events)))
   :telemetry/errors (count (filter #(false? (:success? %)) (telemetry/get-events)))
   :auth/user-count (count @auth/users)
   :auth/admin-count (count (filter #(= (:user/role %) :admin) (vals @auth/users)))
   :chat/session-count (count @chat/chat-sessions)})

(pco/defresolver page-telemetry [_]
  {::pco/output [:page/id :telemetry/total-events :telemetry/tool-invocations
                 :telemetry/query-executions :telemetry/errors :telemetry/error-rate
                 :telemetry/events]}
  (let [events (telemetry/get-events)
        tool-events (filter #(= :tool/invoke (:event %)) events)
        query-events (filter #(= :query/execute (:event %)) events)
        errors (filter #(false? (:success? %)) events)]
    {:page/id :telemetry
     :telemetry/total-events (count events)
     :telemetry/tool-invocations (count tool-events)
     :telemetry/query-executions (count query-events)
     :telemetry/errors (count errors)
     :telemetry/error-rate (if (seq events)
                             (/ (count errors) (count events))
                             0)
     :telemetry/events (take 50 (reverse events))}))

(pco/defresolver page-users [_]
  {::pco/output [:page/id :auth/user-count :auth/admin-count :auth/users]}
  {:page/id :users
   :auth/user-count (count @auth/users)
   :auth/admin-count (count (filter #(= (:user/role %) :admin) (vals @auth/users)))
   :auth/users (map #(select-keys % [:user/id :user/name :user/platform :user/role
                                    :user/created-at :user/last-active])
                    (vals @auth/users))})

(pco/defresolver page-sessions [_]
  {::pco/output [:page/id :chat/sessions :chat/adapters]}
  {:page/id :sessions
   :chat/sessions (map (fn [[id session]]
                         {:chat/id id
                          :chat/message-count (count (:history session))
                          :chat/created-at (:created-at session)})
                       @chat/chat-sessions)
   :chat/adapters (map (fn [[platform adapter]]
                         {:adapter/platform platform
                          :adapter/running? (some? adapter)})
                       @chat/active-adapters)})

;; ============================================================================
;; Environment - The queryable interface
;; ============================================================================

(def all-resolvers
  (concat [system-state
           system-status-resolver
           system-healthy
           system-meta
           page-dashboard
           page-telemetry
           page-users
           page-sessions]
          history/resolvers
          intro/resolvers
          memory/resolvers
          knowledge/resolvers
          api/resolvers
          openapi/resolvers
          ai/resolvers
          telemetry/resolvers
          metrics/resolvers
          mcp/resolvers
          chat/resolvers
          agent/resolvers
          auth/resolvers))

(defn create-env
  "Create a Pathom environment with all resolvers and mutations"
  []
  (-> (pci/register all-resolvers)
      (pci/register memory/mutations)
      (pci/register api/mutations)
      (pci/register openapi/mutations)
      (pci/register ai/mutations)
      (pci/register telemetry/mutations)
      (pci/register mcp/mutations)
      (pci/register agent/mutations)))

(defonce query-env (atom nil))

(defn init!
  "Initialize the query environment

   Also registers all tools with the tool registry."
  []
  (reset! query-env (create-env))
  ;; Register tools after query env is ready (breaks circular dependency)
  (tool-defs/register-all-tools!)
  (println "Query environment initialized"))

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

  ;; Page queries
  (q [:page/id :system/healthy? :auth/user-count])
  (q [:page/id :telemetry/total-events :telemetry/events])

  ;; Full report
  (full-report)

  ;; Status
  (status))
