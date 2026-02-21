;; EDN Query Wrapper for Benchmarking
;; Provides same interface as datalevin query.clj but uses EDN memory store
(ns ouroboros.persistence.edn-query
  "EDN query wrapper for benchmarking Datalevin performance
  
   Features:
   1. Same API as ouroboros.persistence.query
   2. Uses EDN memory store (ouroboros.memory/memory-store)
   3. No caching (or simple memoization)
   4. Telemetry integration for performance comparison
   
   Usage:
     (require '[ouroboros.persistence.edn-query :as eq])
     
     ;; Basic queries
     (eq/query-sessions {:type :collaboration})
     (eq/query-learning-by-level :wisdom)
     
     ;; Advanced queries
     (eq/query-temporal :session {:start-time 123 :end-time 456})
   
   Note: This is for benchmarking only. In production, use Datalevin query.clj."
  (:require
   [ouroboros.memory :as mem]
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Configuration
;; ============================================================================

(def ^:private edn-store (delay @mem/memory-store))

(defn- get-store []
  @edn-store)

;; ============================================================================
;; Key Pattern Matching
;; ============================================================================

(defn- key-matches-prefix? [key prefix]
  (str/starts-with? (name key) prefix))

(defn- get-session-keys []
  (let [store (get-store)]
    (filter #(or (key-matches-prefix? % "presence/")
                 (key-matches-prefix? % "collab-session/"))
            (keys store))))

(defn- get-learning-keys []
  (let [store (get-store)]
    (filter #(and (key-matches-prefix? % "learning/")
                  (not= % :learning/tag-index)
                  (not= % :learning/index))
            (keys store))))

(defn- get-cache-keys []
  ;; TODO: define cache key pattern
  (let [store (get-store)]
    (filter #(key-matches-prefix? % "cache/")
            (keys store))))

;; ============================================================================
;; Basic Query Functions
;; ============================================================================

(defn query-sessions
  "Query sessions with optional filters
  
   Options:
     :type - session type keyword (:collaboration, :chat, :builder)
     :active-since - only sessions active since timestamp
     :limit - maximum results (default 100)"
  [& {:keys [type active-since limit] :or {limit 100}}]
  (let [store (get-store)
        session-keys (get-session-keys)
        results (map (fn [k]
                       (let [v (get store k)]
                         {:session/id (name k)
                          :session/type (cond
                                          (key-matches-prefix? k "presence/") :collaboration
                                          (key-matches-prefix? k "collab-session/") :builder
                                          :else :unknown)
                          :session/last-active (or (:last-active v) 0)
                          :session/data v
                          :session/user-count (if (map? v) (count v) 0)}))
                     session-keys)
        filtered (cond->> results
                   type (filter #(= (:session/type %) type))
                   active-since (filter #(>= (:session/last-active %) active-since)))]
    (vec (take limit filtered))))

(defn query-learning-by-level
  "Query learning records by flywheel level
  
   Level: :utility, :understanding, :insight, :wisdom
   Options:
     :limit - maximum results (default 50)"
  [level & {:keys [limit] :or {limit 50}}]
  (let [store (get-store)
        learning-keys (get-learning-keys)
        results (map (fn [k]
                       (let [v (get store k)]
                         (assoc v :learning/id (name k))))
                     learning-keys)
        filtered (filter #(= (:learning/level %) level) results)]
    (vec (take limit filtered))))

(defn query-cache-by-type
  "Query cache entries by type
  
   Type: :query, :computation, :session, :other
   Options:
     :expired? - include only expired entries (expires-at < now)
     :limit - maximum results (default 100)"
  [cache-type & {:keys [expired? limit] :or {limit 100}}]
  (let [store (get-store)
        cache-keys (get-cache-keys)
        now (System/currentTimeMillis)
        results (map (fn [k]
                       (let [v (get store k)]
                         {:cache/key (name k)
                          :cache/value v
                          :cache/created-at (:created-at v 0)
                          :cache/expires-at (:expires-at v 0)
                          :cache/type (:type v :other)}))
                     cache-keys)
        filtered (cond->> results
                   cache-type (filter #(= (:cache/type %) cache-type))
                   expired? (filter #(< (:cache/expires-at %) now)))]
    (vec (take limit filtered))))

;; ============================================================================
;; Advanced Queries (Temporal & Relationships)
;; ============================================================================

(defn query-temporal
  "Query entities within a time range
  
   Entity type: :session, :learning, :cache
   Options:
     :start-time - minimum timestamp (inclusive)
     :end-time - maximum timestamp (inclusive)
     :attribute - timestamp attribute to filter on
                  (default: :session/last-active for sessions,
                   :learning/created for learning,
                   :cache/created-at for cache)"
  [entity-type {:keys [start-time end-time attribute]}]
  (let [store (get-store)
        keys-fn (case entity-type
                  :session get-session-keys
                  :learning get-learning-keys
                  :cache get-cache-keys
                  (constantly []))
        attr (or attribute
                 (case entity-type
                   :session :session/last-active
                   :learning :learning/created
                   :cache :cache/created-at))
        results (map (fn [k]
                       (let [v (get store k)]
                         {:id (name k)
                          :timestamp (get v attr 0)
                          :data v}))
                     (keys-fn))
        filtered (cond->> results
                   start-time (filter #(>= (:timestamp %) start-time))
                   end-time (filter #(<= (:timestamp %) end-time)))]
    (vec filtered)))

(defn query-relationships
  "Query entity relationships (e.g., sessions with users)
   
   Currently supports:
     - Sessions with user presence
     - Learning records with tags"
  [relationship-type & [params]]
  (case relationship-type
    :sessions-with-users
    (let [store (get-store)
          presence-keys (filter #(key-matches-prefix? % "presence/") (keys store))]
      (vec (mapcat (fn [k]
                     (let [session-id (subs (name k) (count "presence/"))
                           presence-map (get store k)]
                       (map (fn [[user-id user-info]]
                              {:session-id session-id
                               :user-id user-id
                               :user-name (:user-name user-info)
                               :joined-at (:joined-at user-info)})
                            presence-map)))
                   presence-keys)))

    :learning-with-tags
    (let [store (get-store)
          tag-index (get store :learning/tag-index {})]
      (vec (mapcat (fn [[tag-name learning-ids]]
                     (map (fn [learning-id]
                            {:learning-id learning-id
                             :tag-name tag-name})
                          learning-ids))
                   tag-index)))

    ;; Default
    []))

;; ============================================================================
;; Telemetry Integration
;; ============================================================================

(defn- emit-query-telemetry
  [query-type duration-ms result-count success?]
  (telemetry/emit!
   {:event :edn-query/execution
    :query-type query-type
    :duration-ms duration-ms
    :result-count result-count
    :success? success?}))

;; Wrap query functions with telemetry
(defn query-sessions-instrumented [& args]
  (let [start (System/currentTimeMillis)
        result (apply query-sessions args)
        duration (- (System/currentTimeMillis) start)]
    (emit-query-telemetry :query/sessions duration (count result) true)
    result))

(defn query-learning-by-level-instrumented [level & args]
  (let [start (System/currentTimeMillis)
        result (apply query-learning-by-level level args)
        duration (- (System/currentTimeMillis) start)]
    (emit-query-telemetry :query/learning-by-level duration (count result) true)
    result))

;; ============================================================================
;; Performance Benchmarking
;; ============================================================================

(defn benchmark-query
  "Benchmark a query function"
  [query-fn & args]
  (let [start (System/currentTimeMillis)
        result (apply query-fn args)
        end (System/currentTimeMillis)]
    {:duration-ms (- end start)
     :result-count (count result)
     :query (str query-fn)}))

(defn compare-with-datalevin
  "Compare EDN query performance with Datalevin equivalent"
  [edn-fn datalevin-fn & args]
  (let [edn-result (benchmark-query edn-fn args)
        datalevin-result (benchmark-query datalevin-fn args)]
    {:edn edn-result
     :datalevin datalevin-result
     :speedup (/ (:duration-ms edn-result)
                 (max 1 (:duration-ms datalevin-result)))}))

;; ============================================================================
;; Initialization & Health
;; ============================================================================

(defn init!
  "Initialize EDN query wrapper"
  []
  {:status :ready
   :store-size (count (get-store))})

(defn health
  "EDN query wrapper health status"
  []
  {:store-size (count (get-store))
   :status :healthy})

;; Auto-initialize
(init!)

(comment
  ;; Example usage
  (require '[ouroboros.persistence.edn-query :as eq])

  ;; Basic queries
  (eq/query-sessions :type :collaboration)
  (eq/query-learning-by-level :wisdom :limit 10)
  (eq/query-cache-by-type :query :expired? true)

  ;; Advanced queries
  (eq/query-temporal :session {:start-time 0 :end-time (System/currentTimeMillis)})
  (eq/query-relationships :sessions-with-users)

  ;; Benchmarking
  (eq/benchmark-query eq/query-sessions :type :collaboration)

  ;; Compare with Datalevin
  (require '[ouroboros.persistence.query :as dq])
  (eq/compare-with-datalevin eq/query-sessions dq/query-sessions :type :collaboration)

  ;; Health check
  (eq/health))