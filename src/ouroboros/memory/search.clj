(ns ouroboros.memory.search
  "Hybrid Memory Search - Vector + FTS5 (SQLite)
   
   Combines semantic search (vector similarity) with keyword search (FTS5)
   for best-of-both-worlds memory retrieval.
   
   NOTE: This module requires clojure.java.jdbc which is not available
   in all Babashka distributions. Functions will throw if JDBC is not available.
   
   SQLite schema:
   - memories: id, content, embedding (JSON), timestamp, metadata
   - memories_fts: FTS5 virtual table for keyword search
   
   Hybrid ranking: combine vector similarity + BM25 scores"
  (:require
   [cheshire.core :as json]
   [clojure.string :as str]))

;; ============================================================================
;; Database Configuration
;; ============================================================================

(def ^:private db-path "memory/search.db")

(defn- db-spec
  []
  {:classname "org.sqlite.JDBC"
   :subprotocol "sqlite"
   :subname db-path})

;; Lazily load JDBC - not available in all Babashka distributions
(defn- jdbc
  "Get JDBC namespace, throwing helpful error if not available"
  []
  (try
    (require '[clojure.java.jdbc :as jdbc])
    (find-ns 'clojure.java.jdbc)
    (catch Exception e
      (throw (ex-info "JDBC not available. This module requires clojure.java.jdbc which is not included in this Babashka distribution."
                      {:module :memory/search
                       :error :jdbc-not-available})))))

;; ============================================================================
;; Schema Setup
;; ============================================================================

(def ^:private init-sql
  [;; Main memories table
   "CREATE TABLE IF NOT EXISTS memories (
     id TEXT PRIMARY KEY,
     content TEXT NOT NULL,
     embedding TEXT, -- JSON array of floats
     source TEXT, -- session-id or file path
     timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
     metadata TEXT -- JSON object
   )"
   ;; FTS5 virtual table for keyword search
   "CREATE VIRTUAL TABLE IF NOT EXISTS memories_fts USING fts5(
     content,
     source,
     content_rowid=rowid
   )"
   ;; Trigger to keep FTS index in sync
   "CREATE TRIGGER IF NOT EXISTS memories_fts_insert
    AFTER INSERT ON memories BEGIN
      INSERT INTO memories_fts(rowid, content, source)
      VALUES (new.rowid, new.content, new.source);
    END"
   "CREATE TRIGGER IF NOT EXISTS memories_fts_delete
    AFTER DELETE ON memories BEGIN
      INSERT INTO memories_fts(memories_fts, rowid, content, source)
      VALUES ('delete', old.rowid, old.content, old.source);
    END"
   "CREATE TRIGGER IF NOT EXISTS memories_fts_update
    AFTER UPDATE ON memories BEGIN
      INSERT INTO memories_fts(memories_fts, rowid, content, source)
      VALUES ('delete', old.rowid, old.content, old.source);
      INSERT INTO memories_fts(rowid, content, source)
      VALUES (new.rowid, new.content, new.source);
    END"
   ;; Indexes for performance
   "CREATE INDEX IF NOT EXISTS idx_memories_timestamp ON memories(timestamp)"
   "CREATE INDEX IF NOT EXISTS idx_memories_source ON memories(source)"])

(defn init-db!
  "Initialize SQLite database with schema
   
   Usage: (init-db!)"
  []
  (let [jdbc-ns (jdbc)
        _jdbc-insert! (ns-resolve jdbc-ns 'insert!)
        _jdbc-query (ns-resolve jdbc-ns 'query)
        jdbc-execute! (ns-resolve jdbc-ns 'execute!)
        db (db-spec)]
    ;; Ensure directory exists
    (let [dir (java.io.File. "memory")]
      (when-not (.exists dir) (.mkdirs dir)))
    ;; Create tables
    (doseq [sql init-sql]
      (jdbc-execute! db sql))
    :initialized))

;; ============================================================================
;; Vector Operations (Simple implementation)
;; ============================================================================

(defn- cosine-similarity
  "Calculate cosine similarity between two vectors"
  [v1 v2]
  (let [dot-product (reduce + (map * v1 v2))
        norm1 (Math/sqrt (reduce + (map #(* % %) v1)))
        norm2 (Math/sqrt (reduce + (map #(* % %) v2)))]
    (if (or (zero? norm1) (zero? norm2))
      0.0
      (/ dot-product (* norm1 norm2)))))

(defn- random-embedding
  "Generate random embedding for testing
   In production: use external embedding API (OpenAI, etc.)"
  [content]
  ;; Simple hash-based embedding for demo
  ;; Real implementation: call embedding API
  (let [seed (reduce + (map int content))
        rng (java.util.Random. seed)]
    (vec (repeatedly 128 #(.nextDouble rng)))))

(defn- get-embedding
  "Get or generate embedding for content
   
   TODO: Integrate with embedding API (OpenAI, local model, etc.)"
  [content]
  ;; Placeholder: use random embedding
  ;; Real: (openai/get-embedding content)
  (random-embedding content))

;; ============================================================================
;; CRUD Operations
;; ============================================================================

(defn add-memory!
  "Add a memory to the search index
   
   Usage:
     (add-memory! :mem-123 
                  \"User likes Clojure programming\"
                  :session-456)"
  ([id content source]
   (add-memory! id content source {}))
  ([id content source metadata]
   (init-db!)
   (let [jdbc-ns (jdbc)
         jdbc-insert! (ns-resolve jdbc-ns 'insert!)
         embedding (get-embedding content)
         db (db-spec)]
     (jdbc-insert! db :memories
                   {:id (name id)
                    :content content
                    :embedding (json/generate-string embedding)
                    :source (name source)
                    :metadata (json/generate-string metadata)})
     {:id id :status :added})))

(defn get-memory
  "Retrieve a memory by ID
   
   Usage: (get-memory :mem-123)"
  [id]
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-query (ns-resolve jdbc-ns 'query)
        db (db-spec)
        result (jdbc-query db
                           ["SELECT * FROM memories WHERE id = ?" (name id)]
                           {:result-set-fn first})]
    (when result
      {:id (keyword (:id result))
       :content (:content result)
       :embedding (json/parse-string (:embedding result))
       :source (keyword (:source result))
       :timestamp (:timestamp result)
       :metadata (json/parse-string (:metadata result))})))

(defn delete-memory!
  "Delete a memory by ID
   
   Usage: (delete-memory! :mem-123)"
  [id]
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-delete! (ns-resolve jdbc-ns 'delete!)
        db (db-spec)]
    (jdbc-delete! db :memories ["id = ?" (name id)])
    {:id id :status :deleted}))

;; ============================================================================
;; Search Operations
;; ============================================================================

(defn search-keyword
  "Keyword search using FTS5
   
   Usage: (search-keyword \"Clojure programming\")"
  [query & {:keys [limit] :or {limit 10}}]
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-query (ns-resolve jdbc-ns 'query)
        db (db-spec)
        ;; FTS5 query syntax: AND implicit between terms
        fts-query (str/replace query #"\s+" " AND ")
        results (jdbc-query db
                            [(str "SELECT m.id, m.content, m.source, m.timestamp,
                                          rank as fts_rank
                                   FROM memories_fts fts
                                   JOIN memories m ON m.rowid = fts.rowid
                                   WHERE memories_fts MATCH ?
                                   ORDER BY rank
                                   LIMIT ?")
                             fts-query limit])]
    (mapv #(hash-map :id (keyword (:id %))
                     :content (:content %)
                     :source (keyword (:source %))
                     :timestamp (:timestamp %)
                     :score (:fts_rank %)
                     :type :keyword)
          results)))

(defn search-vector
  "Vector similarity search
   
   Usage: (search-vector \"Clojure programming\" :limit 5)"
  [query & {:keys [limit] :or {limit 10}}]
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-query (ns-resolve jdbc-ns 'query)
        db (db-spec)
        query-embedding (get-embedding query)
        ;; Get all memories with embeddings
        memories (jdbc-query db ["SELECT id, content, source, timestamp, embedding FROM memories"])
        ;; Calculate similarity for each
        scored (map (fn [m]
                      (let [emb (json/parse-string (:embedding m))]
                        (assoc m :similarity (cosine-similarity query-embedding emb)
                               :score (cosine-similarity query-embedding emb))))
                    memories)
        ;; Sort by similarity, take top N
        top-results (->> scored
                         (sort-by :similarity >)
                         (take limit))]
    (mapv #(hash-map :id (keyword (:id %))
                     :content (:content %)
                     :source (keyword (:source %))
                     :timestamp (:timestamp %)
                     :score (:similarity %)
                     :type :vector)
          top-results)))

(defn search-hybrid
  "Hybrid search: combine keyword + vector results
   
   Usage: (search-hybrid \"authentication bug\" :limit 10)
   
   Returns ranked results combining:
   - Exact phrase matches (FTS5)
   - Semantic matches (vector similarity)"
  [query & {:keys [limit keyword-weight vector-weight]
            :or {limit 10 keyword-weight 0.5 vector-weight 0.5}}]
  (init-db!)
  (let [;; Get keyword results
        kw-results (search-keyword query :limit (* limit 2))
        ;; Get vector results
        vec-results (search-vector query :limit (* limit 2))
        ;; Normalize scores (0-1 range)
        kw-max (or (apply max (map :score kw-results)) 1.0)
        vec-max (or (apply max (map :score vec-results)) 1.0)
        ;; Combine and deduplicate
        all-results (concat
                     (map #(assoc % :normalized-score (* keyword-weight (/ (:score %) kw-max))
                                  :kw-score (:score %))
                          kw-results)
                     (map #(assoc % :normalized-score (* vector-weight (/ (:score %) vec-max))
                                  :vec-score (:score %))
                          vec-results))
        ;; Group by ID, combine scores
        grouped (group-by :id all-results)
        merged (map (fn [[id items]]
                      {:id id
                       :content (:content (first items))
                       :source (:source (first items))
                       :timestamp (:timestamp (first items))
                       :hybrid-score (reduce + (map :normalized-score items))
                       :keyword-score (some :kw-score items)
                     :vector-score (some :vec-score items)
                       :types (set (map :type items))})
                    grouped)
        ;; Sort by combined score, take top N
        top-results (->> merged
                         (sort-by :hybrid-score >)
                         (take limit))]
    {:query query
     :results top-results
     :total (count top-results)
     :keyword-hits (count kw-results)
     :vector-hits (count vec-results)}))

;; ============================================================================
;; Memory Management
;; ============================================================================

(defn list-memories
  "List all memories with pagination
   
   Usage: (list-memories :limit 100 :offset 0)"
  [& {:keys [limit offset] :or {limit 100 offset 0}}]
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-query (ns-resolve jdbc-ns 'query)
        db (db-spec)
        results (jdbc-query db
                            [(str "SELECT id, content, source, timestamp 
                                   FROM memories 
                                   ORDER BY timestamp DESC 
                                   LIMIT ? OFFSET ?")
                             limit offset])]
    (mapv #(hash-map :id (keyword (:id %))
                     :content (:content %)
                     :source (keyword (:source %))
                     :timestamp (:timestamp %))
          results)))

(defn clear-memories!
  "Clear all memories
   
   DANGER: Irreversible!"
  []
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-execute! (ns-resolve jdbc-ns 'execute!)
        db (db-spec)]
    (jdbc-execute! db ["DELETE FROM memories"])
    (jdbc-execute! db ["DELETE FROM memories_fts"])
    :cleared))

(defn memory-stats
  "Get search index statistics
   
   Usage: (memory-stats)"
  []
  (init-db!)
  (let [jdbc-ns (jdbc)
        jdbc-query (ns-resolve jdbc-ns 'query)
        db (db-spec)
        total (:count (jdbc-query db ["SELECT COUNT(*) as count FROM memories"]
                                  {:result-set-fn first}))
        sources (jdbc-query db ["SELECT source, COUNT(*) as count FROM memories GROUP BY source"])]
    {:total-memories total
     :by-source (into {} (map (juxt (comp keyword :source) :count) sources))
     :db-path db-path}))

(comment
  ;; Test hybrid search
  (init-db!)

  ;; Add test memories
  (add-memory! :mem-1 "Clojure is a functional programming language" :session-a)
  (add-memory! :mem-2 "Python is great for data science and ML" :session-b)
  (add-memory! :mem-3 "Authentication bugs are security vulnerabilities" :session-c)
  (add-memory! :mem-4 "Ring is a Clojure web library" :session-a)

  ;; Keyword search
  (search-keyword "Clojure programming")

  ;; Vector search
  (search-vector "functional language")

  ;; Hybrid search (best of both)
  (search-hybrid "authentication bug")

  ;; Stats
  (memory-stats)

  ;; Cleanup
  (clear-memories!))