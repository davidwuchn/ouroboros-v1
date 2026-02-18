(ns ouroboros.dashboard.semantic-api
  "Semantic Search Dashboard API

   Pathom resolvers and mutations for semantic search dashboard.
   This namespace is compatible with both Babashka and JVM."
  (:require
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.learning.semantic :as semantic]
   [ouroboros.git-embed :as embed]
   [ouroboros.resolver-registry :as registry])
  (:import [java.time Instant]))

(pco/defresolver semantic-availability
  "Check if semantic search is available"
  [_]
  {::pco/output [:semantic/available? :semantic/healthy? :semantic/version]}
  (let [health (embed/comprehensive-health)]
    {:semantic/available? (semantic/available?)
     :semantic/healthy? (:healthy? health)
     :semantic/version (:version health)}))

(pco/defresolver semantic-index-stats
  "Get semantic index statistics"
  [_]
  {::pco/output [:semantic/index-size :semantic/index-vectors :semantic/index-exists?]}
  (let [info (embed/index-info)]
    {:semantic/index-size (:size info)
     :semantic/index-vectors (:vectors info)
     :semantic/index-exists? (:exists? info)}))

(pco/defresolver semantic-user-stats
  "Get user's semantic learning statistics"
  [{:keys [session/user-id]}]
  {::pco/input [(pco/? :session/user-id)]
   ::pco/output [:semantic/learnings-with-code
                 :semantic/total-code-files
                 :semantic/code-coverage]}
  (if user-id
    (let [stats (semantic/semantic-stats (keyword user-id))]
      {:semantic/learnings-with-code (:learnings-with-code stats)
       :semantic/total-code-files (:total-code-files stats)
       :semantic/code-coverage (:code-coverage stats)})
    {:semantic/learnings-with-code 0
     :semantic/total-code-files 0
     :semantic/code-coverage 0.0}))

(pco/defmutation semantic-search-learn
  "Search learnings using semantic similarity"
  [{:keys [session/user-id query/query query/limit query/hybrid?]}]
  {::pco/input [:session/user-id :query/query
                (pco/? :query/limit)
                (pco/? :query/hybrid?)]
   ::pco/output [{:semantic/results
                  [:learning/id
                   :learning/title
                   :learning/insights
                   :semantic/score
                   :keyword/score
                   :combined/score]}]}
  (if (and user-id query)
    (let [results (semantic/recall-semantic
                   (keyword user-id)
                   query
                   :limit (or limit 10)
                   :hybrid? (get hybrid? true))]
      {:semantic/results results})
    {:semantic/results []}))

(pco/defmutation semantic-batch-relink
  "Batch re-link all user learnings to code"
  [{:keys [session/user-id relink/force?]}]
  {::pco/input [:session/user-id (pco/? :relink/force?)]
   ::pco/output [:relink/relinked :relink/errors :relink/details]}
  (if user-id
    (let [result (semantic/batch-relink!
                  (keyword user-id)
                  :force? (get force? false)
                  :batch-size 10)]
      {:relink/relinked (:relinked result)
       :relink/errors (:errors result)
       :relink/details (:details result)})
    {:relink/relinked 0
     :relink/errors 0
     :relink/details []}))

(pco/defmutation semantic-cleanup-stale
  "Cleanup stale code links for user"
  [{:keys [session/user-id]}]
  {::pco/input [:session/user-id]
   ::pco/output [:cleanup/cleaned :cleanup/removed-files]}
  (if user-id
    (let [result (semantic/cleanup-stale-links! (keyword user-id))]
      {:cleanup/cleaned (:cleaned result)
       :cleanup/removed-files (:removed-files result)})
    {:cleanup/cleaned 0
     :cleanup/removed-files 0}))

(pco/defresolver semantic-stale-links
  "Detect stale code links for user"
  [{:keys [session/user-id]}]
  {::pco/input [:session/user-id]
   ::pco/output [{:semantic/stale-links
                  [:learning/id
                   :learning/title
                   :stale/count
                   :stale/files]}]}
  (if user-id
    (let [stale (semantic/detect-stale-links (keyword user-id))]
      {:semantic/stale-links
       (mapv (fn [item]
               {:learning/id (:learning/id item)
                :learning/title (:learning/title item)
                :stale/count (:stale-count item)
                :stale/files (:stale-files item)})
             stale)})
    {:semantic/stale-links []}))

(pco/defmutation semantic-update-index
  "Trigger git-embed index update"
  [_]
  {::pco/output [:update/success? :update/error :update/timestamp]}
  (let [result (semantic/update-code-index!)]
    {:update/success? (:success? result)
     :update/error (:error result)
     :update/timestamp (str (Instant/now))}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [semantic-availability
   semantic-index-stats
   semantic-user-stats
   semantic-stale-links])

(def mutations
  [semantic-search-learn
   semantic-batch-relink
   semantic-cleanup-stale
   semantic-update-index])

;; Auto-register on namespace load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)
