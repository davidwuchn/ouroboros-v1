;; Datalevin Memory Wrapper - Migration layer with EDN fallback
;; Implements memory.clj interface with Datalevin backend
;; During migration: dual-write to both EDN and Datalevin
;; After migration: Datalevin only with EDN fallback for safety
(ns ouroboros.persistence.datalevin-memory
  "Migration wrapper for Datalevin integration
  
   Provides same interface as memory.clj but with:
   1. Datalevin backend using proper schema
   2. EDN fallback during migration
   3. Dual-write capability
   4. Feature flag control
  
   Usage during migration:
     (require '[ouroboros.persistence.datalevin-memory :as dm])
     
     ;; Replace memory/* calls with dm/*
     (dm/save-value! :test-key \"test-value\")
     (dm/get-value :test-key)
     
   Configuration:
     :datalevin/mode = :edn-only | :dual-write | :datalevin-first | :datalevin-only"
  (:require
   [datalevin.core :as d]
   [clojure.edn :as edn]
   [clojure.string :as str]
   [clojure.java.io :as io]
   [cheshire.core :as json]
   [ouroboros.persistence.schema :as schema]
   [ouroboros.telemetry :as telemetry]))
(declare health)

;; ============================================================================
;; Configuration
;; ============================================================================

(defonce ^:private mode (atom :dual-write))
(defonce ^:private operational-db (atom nil))
(defonce ^:private db-path "data/operational")

(defn set-mode!
  "Set migration mode
  
   :edn-only       - Use EDN only (pre-migration)
   :dual-write     - Write to both EDN and Datalevin (migration phase)
   :datalevin-first - Read from Datalevin first, fall back to EDN (read cutover)
   :datalevin-only  - Use Datalevin only (post-migration)"
  [new-mode]
  (reset! mode new-mode)
  (telemetry/emit! {:event :datalevin/mode-changed
                    :old-mode @mode
                    :new-mode new-mode}))

(defn get-mode []
  @mode)

(defn get-connection
  "Get the current Datalevin connection, or nil if not connected"
  []
  @operational-db)

;; ============================================================================
;; Datalevin Connection
;; ============================================================================

(defn- ensure-db-dir []
  (let [dir (io/file db-path)]
    (when-not (.exists dir)
      (.mkdirs dir))))

(defn connect-datalevin!
  "Connect to Datalevin database and initialize schema"
  []
  (ensure-db-dir)
  (let [conn (d/create-conn db-path)]
    (schema/initialize! conn)
    (reset! operational-db conn)
    conn))

(defn disconnect-datalevin!
  "Disconnect from Datalevin database"
  []
  (when @operational-db
    (d/close @operational-db)
    (reset! operational-db nil)))

(defn- with-datalevin [f]
  (when-not @operational-db
    (connect-datalevin!))
  (f @operational-db))

;; ============================================================================
;; EDN Backend (existing memory system compatibility)
;; ============================================================================

(def ^:private edn-file "memory.edn")
(defonce ^:private edn-store (atom {}))

(defn- load-edn []
  (if (io/file edn-file)
    (try
      (let [data (edn/read-string (slurp edn-file))]
        (reset! edn-store (if (map? data) data {})))
      (catch Exception e
        (println "⚠ Failed to load EDN memory:" (.getMessage e))
        (reset! edn-store {})))
    (reset! edn-store {})))

(defn- save-edn-now []
  (try
    (spit edn-file (pr-str @edn-store))
    true
    (catch Exception e
      (println "⚠ Failed to save EDN memory:" (.getMessage e))
      false)))

(defonce ^:private pending-edn-write? (atom false))
(def ^:private edn-write-delay-ms 100)

(defn- save-edn []
  (when-not @pending-edn-write?
    (reset! pending-edn-write? true)
    (future
      (Thread/sleep edn-write-delay-ms)
      (save-edn-now)
      (reset! pending-edn-write? false))))

;; Load EDN on namespace load
(load-edn)

;; ============================================================================
;; Key Mapping & Entity Conversion
;; ============================================================================

(defn- edn-key->entity-type [edn-key]
  (let [key-str (name edn-key)]
    (cond
      (str/starts-with? key-str "presence/") :session
      (str/starts-with? key-str "collab-session/") :session
      (str/starts-with? key-str "learning/")
      (if (= key-str "learning/tag-index") :tag-index :learning)
      :else :cache)))

(defn- save-to-datalevin [edn-key value]
  (with-datalevin
    (fn [conn]
      (let [entity-type (edn-key->entity-type edn-key)
            key-str (name edn-key)]
        (case entity-type
          :session
          (let [session-id (if (str/starts-with? key-str "presence/")
                             (subs key-str (count "presence/"))
                             (subs key-str (count "collab-session/")))]
            (d/transact! conn
                         [{:session/id session-id
                           :session/type :collaboration
                           :session/created-at (System/currentTimeMillis)
                           :session/last-active (System/currentTimeMillis)
                           :session/data (json/generate-string value)
                           :session/user-count (if (map? value) (count value) 0)}]))

          :learning
          (d/transact! conn
                       [{:learning/id key-str
                         :learning/data (json/generate-string value)}])

          :tag-index
         ;; Convert tag index map to individual tag entities
          (doseq [[tag-name learning-ids] value]
            (d/transact! conn
                         [{:tag/name tag-name
                           :tag/learning-id (vec learning-ids)
                           :tag/count (count learning-ids)}]))

          :cache
          (d/transact! conn
                       [{:cache/key key-str
                         :cache/value (json/generate-string value)
                         :cache/created-at (System/currentTimeMillis)
                         :cache/expires-at 0
                         :cache/type :other}]))))))

(defn- get-from-datalevin [edn-key]
  (with-datalevin
    (fn [conn]
      (let [entity-type (edn-key->entity-type edn-key)
            key-str (name edn-key)]
        (case entity-type
          :session
          (let [session-id (if (str/starts-with? key-str "presence/")
                             (subs key-str (count "presence/"))
                             (subs key-str (count "collab-session/")))]
            (when-let [result (d/q '[:find ?data
                                     :in $ ?session-id
                                     :where [?e :session/id ?session-id]
                                     [?e :session/data ?data]]
                                   conn session-id)]
              (json/parse-string (first (first result)) true)))

          :learning
          (when-let [result (d/q '[:find ?data
                                   :in $ ?learning-id
                                   :where [?e :learning/id ?learning-id]
                                   [?e :learning/data ?data]]
                                 conn key-str)]
            (json/parse-string (first (first result)) true))

          :tag-index
         ;; Reconstruct tag index map from tag entities
          (let [tags (d/q '[:find ?name ?learning-ids
                            :where [?e :tag/name ?name]
                            [?e :tag/learning-id ?learning-ids]]
                          conn)]
            (into {} (map (fn [[tag-name learning-ids]]
                            [tag-name (set learning-ids)])
                          tags)))

          :cache
          (when-let [result (d/q '[:find ?value
                                   :in $ ?cache-key
                                   :where [?e :cache/key ?cache-key]
                                   [?e :cache/value ?value]]
                                 conn key-str)]
            (json/parse-string (first (first result)) true)))))))

;; ============================================================================
;; Deletion
;; ============================================================================

(defn- delete-from-datalevin [edn-key]
  (with-datalevin
    (fn [conn]
      (let [entity-type (edn-key->entity-type edn-key)
            key-str (name edn-key)]
        (case entity-type
          :session
          (let [session-id (if (str/starts-with? key-str "presence/")
                             (subs key-str (count "presence/"))
                             (subs key-str (count "collab-session/")))]
            (d/transact! conn
                         [[:db/retractEntity [:session/id session-id]]]))

          :learning
          (d/transact! conn
                       [[:db/retractEntity [:learning/id key-str]]])

          :tag-index
         ;; Delete all tag entities (since tag-index is a single map)
          (doseq [[tag-name _] (get @edn-store edn-key)]
            (d/transact! conn
                         [[:db/retractEntity [:tag/name tag-name]]]))

          :cache
          (d/transact! conn
                       [[:db/retractEntity [:cache/key key-str]]]))))))

;; ============================================================================
;; Public Interface (memory.clj compatible)
;; ============================================================================

(defn save-value!
  "Save value to appropriate store based on migration mode
  
   Returns map with :memory/saved? true and details"
  [key value]
  (let [start-ms (System/currentTimeMillis)
        result (case @mode
                 :edn-only
                 (do
                   (swap! edn-store assoc key value)
                   (save-edn)
                   {:memory/key key :memory/value value :memory/saved? true :store :edn})

                 :dual-write
                 (do
                   ;; Write to EDN
                   (swap! edn-store assoc key value)
                   (save-edn)
                   ;; Write to Datalevin
                   (try
                     (save-to-datalevin key value)
                     {:memory/key key :memory/value value :memory/saved? true :store :both}
                     (catch Exception e
                       (println "⚠ Datalevin write failed, EDN saved:" (.getMessage e))
                       {:memory/key key :memory/value value :memory/saved? true :store :edn-only :error (str e)})))

                 :datalevin-only
                 (do
                   (save-to-datalevin key value)
                   {:memory/key key :memory/value value :memory/saved? true :store :datalevin}))

        elapsed-ms (- (System/currentTimeMillis) start-ms)]

    (telemetry/emit!
     {:event :memory/save
      :key (str key)
      :mode @mode
      :store (:store result)
      :duration-ms elapsed-ms})

    result))

(defn get-value
  "Get value from appropriate store based on migration mode"
  [key]
  (let [start-ms (System/currentTimeMillis)
        result (case @mode
                 :edn-only
                 (get @edn-store key)

                 :dual-write
                 (get @edn-store key)  ;; During dual-write, read from EDN

                 :datalevin-first
                 (or (try (get-from-datalevin key) (catch Exception _ nil))
                     (get @edn-store key))

                 :datalevin-only
                 (get-from-datalevin key))

        elapsed-ms (- (System/currentTimeMillis) start-ms)
        store-used (cond
                     (and (contains? @edn-store key) (= result (get @edn-store key))) :edn
                     :else :datalevin)]

    (telemetry/emit!
     {:event :memory/get
      :key (str key)
      :mode @mode
      :store store-used
      :found? (some? result)
      :duration-ms elapsed-ms})

    result))

(defn delete-value!
  "Delete value from appropriate store(s)"
  [key]
  (let [start-ms (System/currentTimeMillis)
        result (case @mode
                 :edn-only
                 (let [existed? (contains? @edn-store key)]
                   (swap! edn-store dissoc key)
                   (save-edn)
                   {:memory/key key :memory/deleted? existed? :store :edn})

                 :dual-write
                 (let [existed-edn? (contains? @edn-store key)
                       existed-datalevin? (try (some? (get-from-datalevin key)) (catch Exception _ false))]
                   (swap! edn-store dissoc key)
                   (save-edn)
                   (try
                     (delete-from-datalevin key)
                     {:memory/key key :memory/deleted? (or existed-edn? existed-datalevin?) :store :both}
                     (catch Exception e
                       (println "⚠ Datalevin deletion failed, EDN deleted:" (.getMessage e))
                       {:memory/key key :memory/deleted? existed-edn? :store :edn-only :error (str e)})))

                 :datalevin-first
                 (let [existed-edn? (contains? @edn-store key)
                       existed-datalevin? (try (some? (get-from-datalevin key)) (catch Exception _ false))]
                   (swap! edn-store dissoc key)
                   (save-edn)
                   (try
                     (delete-from-datalevin key)
                     {:memory/key key :memory/deleted? (or existed-edn? existed-datalevin?) :store :both}
                     (catch Exception e
                       (println "⚠ Datalevin deletion failed, EDN deleted:" (.getMessage e))
                       {:memory/key key :memory/deleted? existed-edn? :store :edn-only :error (str e)})))

                 :datalevin-only
                 (let [existed? (try (some? (get-from-datalevin key)) (catch Exception _ false))]
                   (delete-from-datalevin key)
                   {:memory/key key :memory/deleted? existed? :store :datalevin}))

        elapsed-ms (- (System/currentTimeMillis) start-ms)]

    (telemetry/emit!
     {:event :memory/delete
      :key (str key)
      :mode @mode
      :duration-ms elapsed-ms})

    result))

(defn update!
  "Update value with function f (similar to memory/update!)"
  [key f]
  (let [old (get-value key)
        new (f old)]
    (save-value! key new)
    new))

(defn search
  "Search keys and values (limited functionality in Datalevin mode)"
  [query & {:keys [limit] :or {limit 10}}]
  (case @mode
    (:edn-only :dual-write :datalevin-first)
    ;; Search EDN store
    (let [q (str/lower-case (str query))]
      (vec (take limit
                 (filter (fn [[k v]]
                           (or (str/includes? (str/lower-case (str k)) q)
                               (str/includes? (str/lower-case (str v)) q)))
                         @edn-store))))

    :datalevin-only
    ;; TODO: Implement Datalevin search
    []))

(defn clear-memory!
  "Clear all memory (both stores in dual-write mode)"
  []
  (case @mode
    :edn-only
    (do
      (reset! edn-store {})
      (save-edn-now)
      {:memory/cleared? true :store :edn})

    :dual-write
    (do
      (reset! edn-store {})
      (save-edn-now)
      ;; TODO: Clear Datalevin
      {:memory/cleared? true :store :edn :datalevin :pending})

    :datalevin-only
    ;; TODO: Clear Datalevin
    {:memory/cleared? false :store :datalevin :error "Not implemented"}))

(defn migration-status
  "Get migration status report"
  []
  (let [edn-count (count @edn-store)
        ;; TODO: Get Datalevin counts
        datalevin-counts {:sessions 0 :learnings 0 :tags 0 :cache 0}]
    {:mode @mode
     :edn/keys-count edn-count
     :datalevin/counts datalevin-counts
     :datalevin/connected? (some? @operational-db)
     :timestamp (System/currentTimeMillis)}))

;; ============================================================================
;; Migration Utilities
;; ============================================================================

(defn migrate-edn-to-datalevin
  "Migrate all EDN data to Datalevin"
  []
  (println "Starting EDN to Datalevin migration...")
  (let [keys-to-migrate (keys @edn-store)
        total (count keys-to-migrate)]
    (doseq [[i key] (map-indexed vector keys-to-migrate)]
      (when (= 0 (mod i 10))
        (println (format "Migrating %d/%d..." (inc i) total)))
      (try
        (save-to-datalevin key (get @edn-store key))
        (catch Exception e
          (println "⚠ Failed to migrate key" key ":" (.getMessage e)))))
    (println "Migration complete!")))

(defn migrate-sessions-to-datalevin
  "Migrate only session data (presence/ and collab-session/ keys) to Datalevin"
  []
  (println "Starting session data migration...")
  (let [session-keys (filter #(= :session (edn-key->entity-type %)) (keys @edn-store))
        total (count session-keys)]
    (println (format "Found %d session keys to migrate" total))
    (doseq [[i key] (map-indexed vector session-keys)]
      (when (= 0 (mod i 10))
        (println (format "Migrating sessions %d/%d..." (inc i) total)))
      (try
        (save-to-datalevin key (get @edn-store key))
        (catch Exception e
          (println "⚠ Failed to migrate session key" key ":" (.getMessage e)))))
    (println "Session migration complete!")))

(defn validate-migration
  "Validate that Datalevin data matches EDN data"
  []
  (println "Validating migration...")
  (let [discrepancies (atom [])]
    (doseq [[key edn-value] @edn-store]
      (let [datalevin-value (get-from-datalevin key)]
        (when (not= edn-value datalevin-value)
          (swap! discrepancies conj {:key key
                                     :edn edn-value
                                     :datalevin datalevin-value}))))
    (if (empty? @discrepancies)
      (println "✅ Migration validation passed!")
      (do
        (println "❌ Migration validation failed with" (count @discrepancies) "discrepancies")
        (doseq [d (take 5 @discrepancies)]
          (println "  Key:" (:key d) "EDN vs Datalevin mismatch"))))
    {:valid? (empty? @discrepancies)
     :discrepancies (count @discrepancies)}))

(defn test-migration-paths
  "Test all migration paths with a test key"
  []
  (let [original-mode @mode
        test-key (keyword (str "test-migration-" (System/currentTimeMillis)))
        test-value {:test "data" :timestamp (System/currentTimeMillis)}]
    (println "Testing migration paths with key:" test-key)
    (println "Original mode:" original-mode)

    ;; Test :edn-only mode
    (println "\n1. Testing :edn-only mode")
    (set-mode! :edn-only)
    (save-value! test-key test-value)
    (let [retrieved (get-value test-key)]
      (println "   Retrieved from EDN:" (some? retrieved)))

    ;; Test :dual-write mode
    (println "\n2. Testing :dual-write mode")
    (set-mode! :dual-write)
    (save-value! test-key test-value)
    (let [edn-val (get @edn-store test-key)
          datalevin-val (try (get-from-datalevin test-key) (catch Exception _ nil))]
      (println "   EDN stored:" (some? edn-val))
      (println "   Datalevin stored:" (some? datalevin-val)))

    ;; Test :datalevin-first mode
    (println "\n3. Testing :datalevin-first mode")
    (set-mode! :datalevin-first)
    (let [retrieved (get-value test-key)]
      (println "   Retrieved (Datalevin first):" (some? retrieved)))

    ;; Test :datalevin-only mode
    (println "\n4. Testing :datalevin-only mode")
    (set-mode! :datalevin-only)
    (save-value! test-key {:updated "value"})
    (let [retrieved (get-value test-key)]
      (println "   Retrieved from Datalevin only:" (some? retrieved)))

    ;; Clean up
    (println "\nCleaning up test data...")
    (delete-value! test-key)
    (set-mode! original-mode)
    (println "Test complete. Mode restored to:" original-mode)))

(defn test-component-lifecycle
  "Test component startup and shutdown lifecycle"
  []
  (println "Testing component lifecycle...")
  (let [initial-health (health)]
    (println "Initial health:" initial-health)

    ;; Disconnect if connected
    (when (:datalevin-connected? initial-health)
      (println "Disconnecting Datalevin...")
      (disconnect-datalevin!)
      (println "Health after disconnect:" (health)))

    ;; Reconnect
    (println "Reconnecting Datalevin...")
    (connect-datalevin!)
    (let [post-connect-health (health)]
      (println "Health after reconnect:" post-connect-health)

      ;; Verify connection
      (if (:datalevin-connected? post-connect-health)
        (println "✅ Component lifecycle test passed")
        (println "❌ Component lifecycle test failed - Datalevin not connected"))

      post-connect-health)))

;; ============================================================================
;; Initialization
;; ============================================================================

(defn init!
  "Initialize Datalevin memory wrapper"
  []
  (connect-datalevin!)
  (println "Datalevin memory wrapper initialized in mode:" @mode)
  {:status :ready
   :mode @mode
   :datalevin-connected? (some? @operational-db)})

(defn health
  "Return health status of Datalevin memory wrapper"
  []
  {:datalevin-connected? (some? @operational-db)
   :mode @mode
   :edn-count (count @edn-store)
   :status (if (some? @operational-db) :healthy :unhealthy)})

;; Auto-initialize on namespace load
(comment (init!))
