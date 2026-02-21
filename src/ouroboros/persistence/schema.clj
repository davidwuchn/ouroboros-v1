;; Datalevin Schema for Ouroboros Operational Data
;; Hybrid approach: Core attributes in EAV for querying, nested data as JSON strings
;; Based on analysis of current memory usage patterns
(ns ouroboros.persistence.schema
  "Datalevin schema definition for operational data
  
   Design principles:
   1. Core attributes that need querying → EAV schema
   2. Nested/complex data → JSON strings (preserves structure)
   3. Unique identifiers for all entities
   4. Timestamps for auditing and cleanup
  
   Usage:
     (require '[ouroboros.persistence.schema :as schema])
     (schema/initialize! conn)  ; Apply schema to connection"
  (:require
   [datalevin.core :as d]
   [clojure.string :as str]
   [cheshire.core :as json]))

;; ============================================================================
;; Core Schema Definitions
;; ============================================================================

(def schema
  "Datalevin schema for all operational entities"
  [   ;; ========================================================================
   ;; Session Entity (collaboration sessions)
   ;; ========================================================================
   {:db/ident :session/id
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Unique session identifier (e.g., 'session-123')"}

   {:db/ident :session/type
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Session type: :collaboration, :chat, :builder"}

   {:db/ident :session/created-at
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp when session was created"}

   {:db/ident :session/last-active
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp of last activity in session"}

   {:db/ident :session/data
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "JSON-serialized session state (presence, cursors, etc.)"}

   {:db/ident :session/user-count
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Number of active users in session"}

   ;; ========================================================================
   ;; User Presence (within sessions)
   ;; ========================================================================
   {:db/ident :presence/user-id
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Unique user identifier within session"}

   {:db/ident :presence/session-id
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "Session this user belongs to"}

   {:db/ident :presence/user-name
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "Display name of user"}

   {:db/ident :presence/color
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "User's color in UI (hex code)"}

   {:db/ident :presence/avatar
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "User's avatar emoji or URL"}

   {:db/ident :presence/joined-at
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp when user joined"}

   {:db/ident :presence/last-seen
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp of last user activity"}

   ;; ========================================================================
   ;; Project Entity (builder projects)
   ;; ========================================================================
   {:db/ident :project/id
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Unique project identifier"}

   {:db/ident :project/name
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "Project display name"}

   {:db/ident :project/type
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Project type: :empathy-map, :value-prop, :mvp, :lean-canvas"}

   {:db/ident :project/created-at
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp when project was created"}

   {:db/ident :project/last-modified
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp of last modification"}

   {:db/ident :project/owner
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "User ID of project owner"}

   {:db/ident :project/data
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "JSON-serialized project content (sections, values, etc.)"}

   {:db/ident :project/status
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Project status: :not-started, :in-progress, :completed"}

   ;; ========================================================================
   ;; Learning Record Entity
   ;; ========================================================================
   {:db/ident :learning/id
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Unique learning identifier (e.g., 'user/title-timestamp-entropy')"}

   {:db/ident :learning/title
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "Learning title"}

   {:db/ident :learning/user
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "User who created the learning"}

   {:db/ident :learning/created
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "ISO timestamp of creation"}

   {:db/ident :learning/category
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "Learning category"}

   {:db/ident :learning/confidence
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Confidence level 1-5"}

   {:db/ident :learning/level
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Flywheel level: :utility, :understanding, :insight, :wisdom"}

   {:db/ident :learning/status
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Learning status: :active, :deleted"}

   {:db/ident :learning/data
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "JSON-serialized learning content (insights, examples, pattern, etc.)"}

   ;; ========================================================================
   ;; Tag Index (for learning system)
   ;; ========================================================================
   {:db/ident :tag/name
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Tag name"}

   {:db/ident :tag/learning-id
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/many
    :db/doc "Learning IDs associated with this tag"}

   {:db/ident :tag/count
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Number of learnings with this tag"}

   ;; ========================================================================
   ;; Cache Entry Entity
   ;; ========================================================================
   {:db/ident :cache/key
    :db/valueType :db.type/string
    :db/unique :db.unique/identity
    :db/cardinality :db.cardinality/one
    :db/doc "Cache key"}

   {:db/ident :cache/value
    :db/valueType :db.type/string
    :db/cardinality :db.cardinality/one
    :db/doc "JSON-serialized cached value"}

   {:db/ident :cache/created-at
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp when cached"}

   {:db/ident :cache/expires-at
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/doc "Unix timestamp when cache expires (0 = never)"}

   {:db/ident :cache/type
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/doc "Cache type: :query, :computation, :session, :other"}

   ;; ========================================================================
   ;; Indexes for common queries
   ;; ========================================================================
   {:db/ident :idx/session-by-type
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/index true
    :db/doc "Index for querying sessions by type"}

   {:db/ident :idx/project-by-status
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/index true
    :db/doc "Index for querying projects by status"}

   {:db/ident :idx/learning-by-level
    :db/valueType :db.type/keyword
    :db/cardinality :db.cardinality/one
    :db/index true
    :db/doc "Index for querying learnings by flywheel level"}

   {:db/ident :idx/cache-by-expiry
    :db/valueType :db.type/long
    :db/cardinality :db.cardinality/one
    :db/index true
    :db/doc "Index for finding expired cache entries"}])

;; ============================================================================
;; Schema Utilities
;; ============================================================================

(defn initialize!
  "Initialize database with schema"
  [conn]
  (d/transact! conn schema))

(defn get-schema-version
  "Get current schema version (for migration tracking)"
  []
  "1.0.0")

(defn entity-types
  "Get list of entity types in schema"
  []
  (->> schema
       (filter #(= :db.type/string (:db/valueType %)))
       (filter #(= :db.unique/identity (:db/unique %)))
       (map :db/ident)
       set))

(defn queryable-attributes
  "Get attributes that should be queried directly (not JSON strings)"
  []
  (->> schema
       (remove #(= :db.type/string (:db/valueType %)))
       (map :db/ident)
       set))

(defn json-attributes
  "Get attributes that store JSON data"
  []
  (->> schema
       (filter #(= :db.type/string (:db/valueType %)))
       (filter #(re-find #"data$" (name (:db/ident %))))
       (map :db/ident)
       set))

;; ============================================================================
;; Migration Helpers
;; ============================================================================

(defn migrate-edn-key-to-datalevin
  "Map EDN storage key to Datalevin entity type
   
   Example:
     :presence/session-123 → {:type :session, :id \"session-123\"}
     :learning/tag-index   → {:type :tag, :id \"tag-index\"}"
  [edn-key]
  (let [key-str (name edn-key)]
    (cond
      (str/starts-with? key-str "presence/")
      {:type :session
       :id (subs key-str (count "presence/"))}

      (str/starts-with? key-str "collab-session/")
      {:type :session
       :id (subs key-str (count "collab-session/"))}

      (str/starts-with? key-str "learning/")
      (if (= key-str "learning/tag-index")
        {:type :tag-index :id "global"}
        {:type :learning :id key-str})

      :else
      {:type :cache :id key-str})))

(defn entity-from-edn-data
  "Convert EDN-stored data to Datalevin entity based on key"
  [edn-key edn-value]
  (let [{:keys [type id]} (migrate-edn-key-to-datalevin edn-key)]
    (case type
      :session
      {:session/id id
       :session/type :collaboration
       :session/created-at (System/currentTimeMillis)
       :session/last-active (System/currentTimeMillis)
       :session/data (json/generate-string edn-value)
       :session/user-count (count edn-value)}

      :learning
      {:learning/id id
       :learning/data (json/generate-string edn-value)}

      :tag-index
      ;; Special handling for tag index
      (for [[tag-name learning-ids] edn-value]
        {:tag/name tag-name
         :tag/learning-id (vec learning-ids)
         :tag/count (count learning-ids)})

      :cache
      {:cache/key id
       :cache/value (json/generate-string edn-value)
       :cache/created-at (System/currentTimeMillis)
       :cache/expires-at 0
       :cache/type :other}

      ;; Default fallback
      {:cache/key (str "migrated-" id)
       :cache/value (json/generate-string edn-value)
       :cache/created-at (System/currentTimeMillis)
       :cache/expires-at 0
       :cache/type :migrated})))
