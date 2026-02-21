;; Datalevin Query Wrapper with Caching
;; Provides datalog query interface for operational data with performance caching
(ns ouroboros.persistence.query
  "Datalevin query wrapper with caching
  
   Features:
   1. Datalog query interface for all entity types
   2. Result caching with TTL (time-to-live)
   3. Telemetry integration for performance monitoring
   4. Support for advanced queries (temporal, relationships)
   
   Usage:
     (require '[ouroboros.persistence.query :as dq])
     
     ;; Basic queries
     (dq/query-sessions {:type :collaboration})
     (dq/query-learning-by-level :wisdom)
     
     ;; Advanced queries
     (dq/query-temporal :session {:start-time 123 :end-time 456})
     
     ;; Raw datalog (with caching)
     (dq/datalog-query '[:find ?id ?data
                         :where [?e :session/id ?id]
                                [?e :session/data ?data]])
   
   Caching:
     Queries are automatically cached based on their hash.
     Cache TTL defaults to 5 minutes for reads, 0 for writes.
     Cache can be cleared with (dq/clear-cache!)"
  (:require
   [datalevin.core :as d]
   [cheshire.core :as json]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.persistence.datalevin-memory :as dm]))

;; ============================================================================
;; Connection & Configuration
;; ============================================================================

(defonce ^:private query-cache (atom {}))
(def ^:private default-cache-ttl-ms (* 5 60 1000)) ; 5 minutes

(defn- get-connection
  "Get Datalevin connection from datalevin-memory wrapper"
  []
  (when-let [conn (dm/get-connection)]
    conn))

(defn- with-connection
  "Execute f with Datalevin connection, returns nil if no connection"
  [f]
  (when-let [conn (get-connection)]
    (f conn)))

;; ============================================================================
;; Cache Implementation
;; ============================================================================

(defn- cache-key
  "Generate cache key from query and parameters"
  [query params]
  (hash [query params]))

(defn- cached-query
  "Execute query with caching"
  [cache-key ttl-ms f]
  (let [now (System/currentTimeMillis)
        cached (get @query-cache cache-key)]
    (if (and cached (< (- now (:timestamp cached)) ttl-ms))
      (do
        (telemetry/emit! {:event :query/cache-hit :key cache-key})
        (:result cached))
      (let [result (f)]
        (swap! query-cache assoc cache-key {:timestamp now :result result})
        (telemetry/emit! {:event :query/cache-miss :key cache-key})
        result))))

(defn clear-cache!
  "Clear query cache"
  []
  (reset! query-cache {}))

(defn cache-stats
  "Get cache statistics"
  []
  {:size (count @query-cache)
   :hits (reduce + (map :hits (vals @query-cache)))
   :misses (reduce + (map :misses (vals @query-cache)))})

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
  (let [start-ms (System/currentTimeMillis)]
    (with-connection
      (fn [conn]
        (let [query (cond-> '[:find ?id ?type ?last-active ?data ?user-count
                              :where [?e :session/id ?id]
                                     [?e :session/type ?type]
                                     [?e :session/last-active ?last-active]
                                     [?e :session/data ?data]
                                     [?e :session/user-count ?user-count]]
                      type (conj ['?type type])
                      active-since (conj ['(>= ?last-active active-since)]))
              results (d/q query conn)
              result (mapv (fn [[id session-type last-active data user-count]]
                             {:session/id id
                              :session/type session-type
                              :session/last-active last-active
                              :session/data (json/parse-string data true)
                              :session/user-count user-count})
                           (take limit results))
              duration-ms (- (System/currentTimeMillis) start-ms)]
          (telemetry/emit! {:event :query/execution
                            :query-type :sessions
                            :duration-ms duration-ms
                            :result-count (count result)
                            :success? true})
          result)))))

(defn query-learning-by-level
  "Query learning records by flywheel level
  
   Level: :utility, :understanding, :insight, :wisdom
   Options:
     :limit - maximum results (default 50)"
  [level & {:keys [limit] :or {limit 50}}]
  (let [start-ms (System/currentTimeMillis)]
    (with-connection
      (fn [conn]
        (let [query '[:find ?id ?title ?user ?created ?category ?confidence ?data
                      :in $ ?level
                      :where [?e :learning/id ?id]
                             [?e :learning/level ?level]
                             [?e :learning/title ?title]
                             [?e :learning/user ?user]
                             [?e :learning/created ?created]
                             [?e :learning/category ?category]
                             [?e :learning/confidence ?confidence]
                             [?e :learning/data ?data]]
              results (d/q query conn level)
              result (mapv (fn [[id title user created category confidence data]]
                             {:learning/id id
                              :learning/title title
                              :learning/user user
                              :learning/created created
                              :learning/category category
                              :learning/confidence confidence
                              :learning/data (json/parse-string data true)})
                           (take limit results))
              duration-ms (- (System/currentTimeMillis) start-ms)]
          (telemetry/emit! {:event :query/execution
                            :query-type :learning-by-level
                            :duration-ms duration-ms
                            :result-count (count result)
                            :success? true})
          result)))))

(defn query-cache-by-type
  "Query cache entries by type
  
   Type: :query, :computation, :session, :other
   Options:
     :expired? - include only expired entries (expires-at < now)
     :limit - maximum results (default 100)"
  [cache-type & {:keys [expired? limit] :or {limit 100}}]
  (let [start-ms (System/currentTimeMillis)]
    (with-connection
      (fn [conn]
        (let [now (System/currentTimeMillis)
              query (cond-> '[:find ?key ?value ?created-at ?expires-at
                              :in $ ?type
                              :where [?e :cache/key ?key]
                                     [?e :cache/value ?value]
                                     [?e :cache/created-at ?created-at]
                                     [?e :cache/expires-at ?expires-at]
                                     [?e :cache/type ?type]]
                      expired? (conj ['(< ?expires-at now)]))
              results (d/q query conn cache-type)
              result (mapv (fn [[key value created-at expires-at]]
                             {:cache/key key
                              :cache/value (json/parse-string value true)
                              :cache/created-at created-at
                              :cache/expires-at expires-at})
                           (take limit results))
              duration-ms (- (System/currentTimeMillis) start-ms)]
          (telemetry/emit! {:event :query/execution
                            :query-type :cache-by-type
                            :duration-ms duration-ms
                            :result-count (count result)
                            :success? true})
          result)))))

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
  (with-connection
    (fn [conn]
      (let [attr (or attribute
                     (case entity-type
                       :session :session/last-active
                       :learning :learning/created
                       :cache :cache/created-at))
            query (cond-> '[:find ?id ?timestamp ?data
                            :in $ ?attr
                            :where [?e ?attr ?timestamp]]
                    start-time (conj ['(>= ?timestamp start-time)])
                    end-time (conj ['(<= ?timestamp end-time)]))
            results (d/q query conn attr)]
        (mapv (fn [[id timestamp data]]
                {:id id
                 :timestamp timestamp
                 :data data})
              results)))))

(defn query-relationships
  "Query entity relationships (e.g., sessions with users)
   
   Currently supports:
     - Sessions with user presence
     - Learning records with tags"
  [relationship-type & [params]]
  (case relationship-type
    :sessions-with-users
    (with-connection
      (fn [conn]
        (d/q '[:find ?session-id ?user-id ?user-name ?joined-at
               :where [?p :presence/session-id ?session-id]
                      [?p :presence/user-id ?user-id]
                      [?p :presence/user-name ?user-name]
                      [?p :presence/joined-at ?joined-at]]
             conn)))
    
    :learning-with-tags
    (with-connection
      (fn [conn]
        (d/q '[:find ?learning-id ?tag-name
               :where [?t :tag/name ?tag-name]
                      [?t :tag/learning-id ?learning-id]]
             conn)))
    
    ;; Default
    []))

;; ============================================================================
;; Generic Datalog Query (with caching)
;; ============================================================================

(defn datalog-query
  "Execute datalog query with optional caching
  
   Options:
     :cache-ttl - cache TTL in milliseconds (default 5 minutes)
     :use-cache? - whether to use cache (default true)"
  [query & {:keys [cache-ttl use-cache?] :or {cache-ttl default-cache-ttl-ms use-cache? true}}]
  (let [key (cache-key query {})
        executor (fn []
                   (with-connection
                     (fn [conn]
                       (d/q query conn))))]
    (if use-cache?
      (cached-query key cache-ttl executor)
      (executor))))

;; ============================================================================
;; Telemetry Integration
;; ============================================================================

(defn- emit-query-telemetry
  [query-type duration-ms result-count success?]
  (telemetry/emit!
   {:event :query/execution
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

(defn compare-with-edn
  "Compare Datalevin query performance with EDN equivalent"
  [datalevin-fn edn-fn & args]
  (let [datalevin-result (benchmark-query datalevin-fn args)
        edn-result (benchmark-query edn-fn args)]
    {:datalevin datalevin-result
     :edn edn-result
     :speedup (/ (:duration-ms edn-result)
                 (max 1 (:duration-ms datalevin-result)))}))

;; ============================================================================
;; Initialization & Health
;; ============================================================================

(defn init!
  "Initialize query wrapper"
  []
  (clear-cache!)
  {:status :ready
   :cache-size (count @query-cache)})

(defn health
  "Query wrapper health status"
  []
  {:cache-stats (cache-stats)
   :connection-available? (some? (get-connection))
   :status :healthy})

;; Auto-initialize
(init!)

(comment
  ;; Example usage
  (require '[ouroboros.persistence.query :as dq])
  
  ;; Basic queries
  (dq/query-sessions :type :collaboration)
  (dq/query-learning-by-level :wisdom :limit 10)
  (dq/query-cache-by-type :query :expired? true)
  
  ;; Advanced queries
  (dq/query-temporal :session {:start-time 0 :end-time (System/currentTimeMillis)})
  (dq/query-relationships :sessions-with-users)
  
  ;; Raw datalog
  (dq/datalog-query '[:find ?id
                      :where [?e :session/id ?id]])
  
  ;; Benchmarking
  (dq/benchmark-query dq/query-sessions :type :collaboration)
  
  ;; Cache management
  (dq/clear-cache!)
  (dq/cache-stats)
  
  ;; Health check
  (dq/health))