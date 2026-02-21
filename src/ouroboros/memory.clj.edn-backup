(ns ouroboros.memory
  "Memory - Cross-session persistence for the system
   
   Stores key-value pairs that persist across nREPL sessions.
   Memory is saved to disk as EDN and auto-loaded on boot.
   
   Query: :memory/all, :memory/get, :memory/keys
   Mutations: memory/save!, memory/delete!, memory/clear!"
  (:require
   [clojure.edn :as edn]
   [clojure.string :as str]
   [ouroboros.fs :as fs]
   [ouroboros.telemetry :as telemetry]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Storage
;; ============================================================================

(def ^:private memory-file
  "Path to memory storage file"
  "memory.edn")

(defonce memory-store
   ;; In-memory store, persisted to disk
  (atom {}))

;; Debounced write state
(defonce ^:private pending-write? (atom false))
(defonce ^:private write-delay-ms 100)

(defn- load-memory
  "Load memory from disk"
  []
  (if (fs/exists? memory-file)
    (try
      (let [data (edn/read-string (slurp memory-file))]
        (reset! memory-store (if (map? data) data {})))
      (catch Exception e
        (println "⚠ Failed to load memory:" (.getMessage e))
        (reset! memory-store {})))
    (reset! memory-store {})))

(defn- save-memory-now
  "Save memory to disk immediately"
  []
  (try
    (spit memory-file (pr-str @memory-store))
    true
    (catch Exception e
      (println "⚠ Failed to save memory:" (.getMessage e))
      false)))

(defn- save-memory
  "Save memory to disk with debouncing - batches rapid updates"
  []
  (when (compare-and-set! pending-write? false true)
    (future
      (Thread/sleep write-delay-ms)
      (save-memory-now)
      (reset! pending-write? false))))

(defn save-now!
  "Force immediate save to disk (blocks until complete)"
  []
  (save-memory-now))

;; ============================================================================
;; Memory Operations
;; ============================================================================

(defn get-value
  "Get value from memory"
  [key]
  (get @memory-store key))

(defn get-all
  "Get all memory entries"
  []
  @memory-store)

(defn save-value!
  "Save value to memory, persists to disk"
  [key value]
  (swap! memory-store assoc key value)
  (save-memory)
  {:memory/key key
   :memory/value value
   :memory/saved? true})

(defn delete-value!
  "Delete value from memory, persists to disk"
  [key]
  (let [existed? (contains? @memory-store key)]
    (swap! memory-store dissoc key)
    (save-memory)
    {:memory/key key
     :memory/deleted? existed?}))

(defn clear-memory!
  "Clear all memory, persists to disk"
  []
  (let [count (count @memory-store)]
    (reset! memory-store {})
    (save-memory)
    {:memory/cleared? true
     :memory/count count}))

(defn update!
  "Update value at key with function f, similar to clojure.core/swap!
   f receives current value (or nil if absent) and returns new value.
   Persists to disk and returns new value."
  [key f]
  (let [old (get-value key)
        new (f old)]
    (save-value! key new)
    new))

;; NOTE: Do NOT define swap! here - it would shadow clojure.core/swap!
;; Use update! for memory updates, or swap! directly on memory-store atom

;; ============================================================================
;; Search & Retrieval (λ(system) Instrumented)
;; ============================================================================

(defn search
  "Search memory keys and values for query string
   
   λ(system) Integration: Emits telemetry events for access tracking
   and evolution analysis.
   
   Usage: (search \"config\") => [{:key :db-config :value {...}} ...]"
  [query & {:keys [limit] :or {limit 10}}]
  (let [start-ms (System/currentTimeMillis)
        q (str/lower-case (str query))
        results (vec
                 (take limit
                       (filter (fn [[k v]]
                                 (or (str/includes? (str/lower-case (str k)) q)
                                     (str/includes? (str/lower-case (str v)) q)))
                               @memory-store)))
        elapsed-ms (- (System/currentTimeMillis) start-ms)]

    ;; Emit telemetry for λ(system) evolution tracking
    (telemetry/emit!
     {:event :memory/search
      :query query
      :results-count (count results)
      :duration-ms elapsed-ms
      :success? true})

    ;; Return formatted results
    (mapv (fn [[k v]]
            {:memory/key k
             :memory/value v
             :memory/retrieved-at (System/currentTimeMillis)})
          results)))

(defn get-instrumented
  "Get value with λ(system) telemetry tracking
   
   Usage: (get-instrumented :user/settings)"
  [key]
  (let [start-ms (System/currentTimeMillis)
        value (get-value key)
        elapsed-ms (- (System/currentTimeMillis) start-ms)
        found? (contains? @memory-store key)]

    ;; Emit telemetry
    (telemetry/emit!
     {:event :memory/retrieve
      :key key
      :found? found?
      :duration-ms elapsed-ms
      :success? true})

    value))

(defn init!
  "Initialize memory - load from disk"
  []
  (load-memory)
  (println (str "✓ Memory loaded: " (count @memory-store) " entries"))
  @memory-store)

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver memory-all [_]
  {::pco/output [{:memory/all [:memory/key :memory/value]}]}
  {:memory/all (map (fn [[k v]]
                      {:memory/key k
                       :memory/value v})
                    @memory-store)})

(pco/defresolver memory-get [{:keys [memory/key]}]
  {::pco/input [:memory/key]
   ::pco/output [:memory/value :memory/exists?]}
  (let [start-ms (System/currentTimeMillis)
        exists? (contains? @memory-store key)
        value (get @memory-store key)
        elapsed-ms (- (System/currentTimeMillis) start-ms)]

    ;; Emit telemetry for λ(system) evolution tracking
    (telemetry/emit!
     {:event :memory/retrieve
      :key key
      :found? exists?
      :duration-ms elapsed-ms
      :success? true})

    {:memory/value value
     :memory/exists? exists?}))

(pco/defresolver memory-keys [_]
  {::pco/output [:memory/keys]}
  {:memory/keys (vec (keys @memory-store))})

(pco/defresolver memory-meta [_]
  {::pco/output [:memory/meta]}
  {:memory/meta {:memory/count (count @memory-store)
                 :memory/file memory-file
                 :memory/persisted? (fs/exists? memory-file)}})

;; ============================================================================
;; Pathom Mutations
;; ============================================================================

(pco/defmutation memory-save! [{:keys [memory/key memory/value]}]
  {::pco/output [:memory/key :memory/value :memory/saved?]}
  (save-value! key value))

(pco/defmutation memory-delete! [{:keys [memory/key]}]
  {::pco/output [:memory/key :memory/deleted?]}
  (delete-value! key))

(pco/defmutation memory-clear! [_]
  {::pco/output [:memory/cleared? :memory/count]}
  (clear-memory!))

(pco/defresolver memory-search [{:keys [memory/query memory/limit]}]
  {::pco/input [:memory/query :memory/limit]
   ::pco/output [{:memory/search-results [:memory/key :memory/value]}]}
  (let [start-ms (System/currentTimeMillis)
        q (str/lower-case (str query))
        lim (or limit 10)
        results (vec
                 (take lim
                       (filter (fn [[k v]]
                                 (or (str/includes? (str/lower-case (str k)) q)
                                     (str/includes? (str/lower-case (str v)) q)))
                               @memory-store)))
        elapsed-ms (- (System/currentTimeMillis) start-ms)]

    ;; Emit telemetry for λ(system) evolution tracking
    (telemetry/emit!
     {:event :memory/search
      :query query
      :results-count (count results)
      :duration-ms elapsed-ms
      :success? true})

    {:memory/search-results
     (mapv (fn [[k v]]
             {:memory/key k
              :memory/value v})
           results)}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  "Pathom resolvers for memory queries"
  [memory-all memory-get memory-keys memory-meta memory-search])

(def mutations
  "Pathom mutations for memory operations"
  [memory-save! memory-delete! memory-clear!])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Direct usage
  (init!)
  (save-value! :test "hello")
  (save-value! :config {:db {:host "localhost"}})
  (get-value :test)
  (get-instrumented :test)  ; With telemetry
  (get-all)
  (search "config")  ; λ(system) instrumented search
  (delete-value! :test)
  (clear-memory!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:memory/keys])
  (q/q [{:memory/all [:memory/key :memory/value]}])
  (q/q [:memory/meta])
  (q/q [{:memory/search-results [:memory/key :memory/value]}]
       {:memory/query "config"}))
