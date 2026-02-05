(ns ouroboros.memory
  "Memory - Cross-session persistence for the system
   
   Stores key-value pairs that persist across nREPL sessions.
   Memory is saved to disk as EDN and auto-loaded on boot.
   
   Query: :memory/all, :memory/get, :memory/keys
   Mutations: memory/save!, memory/delete!, memory/clear!"
  (:require
   [clojure.edn :as edn]
   [clojure.string :as str]
   [babashka.fs :as fs]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.engine :as engine]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Storage
;; ============================================================================

(def ^:private memory-file
  "Path to memory storage file"
  "memory.edn")

(defonce ^:private memory-store
  ;; In-memory store, persisted to disk
  (atom {}))

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

(defn- save-memory
  "Save memory to disk"
  []
  (try
    (spit memory-file (pr-str @memory-store))
    true
    (catch Exception e
      (println "⚠ Failed to save memory:" (.getMessage e))
      false)))

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

;; Deprecated alias for backward compatibility
(def swap! update!)

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
  (let [exists? (contains? @memory-store key)]
    {:memory/value (get @memory-store key)
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

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  "Pathom resolvers for memory queries"
  [memory-all memory-get memory-keys memory-meta])

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
  (get-value :test)
  (get-all)
  (delete-value! :test)
  (clear-memory!)
  
  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:memory/keys])
  (q/q [{:memory/all [:memory/key :memory/value]}])
  (q/q [:memory/meta]))
