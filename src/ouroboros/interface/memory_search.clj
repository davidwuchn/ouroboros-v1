(ns ouroboros.interface.memory-search
  "Hybrid memory search interface — Vector + FTS5"
  (:require
   [ouroboros.memory.search :as search]))

(defn memory-init!
  "Initialize memory search database
   
   Usage: (memory-init!)"
  []
  (search/init-db!))

(defn memory-add!
  "Add memory to search index
   
   Usage:
     (memory-add! :mem-123 \"Content here\" :source-session)
     (memory-add! :mem-123 \"Content\" :source {:key \"value\"})"
  ([id content source]
   (memory-add! id content source {}))
  ([id content source metadata]
   (search/add-memory! id content source metadata)))

(defn memory-get
  "Get memory by ID
   
   Usage: (memory-get :mem-123)"
  [id]
  (search/get-memory id))

(defn memory-delete!
  "Delete memory by ID
   
   Usage: (memory-delete! :mem-123)"
  [id]
  (search/delete-memory! id))

(defn memory-search-keyword
  "Keyword search (FTS5)
   
   Usage: (memory-search-keyword \"Clojure programming\" :limit 10)"
  [query & {:keys [limit] :or {limit 10}}]
  (search/search-keyword query :limit limit))

(defn memory-search-vector
  "Vector similarity search
   
   Usage: (memory-search-vector \"functional language\" :limit 10)"
  [query & {:keys [limit] :or {limit 10}}]
  (search/search-vector query :limit limit))

(defn memory-search
  "Hybrid search (keyword + vector)
   
   Usage:
     (memory-search \"authentication bug\" :limit 10)
     (memory-search \"query\" :limit 5 :keyword-weight 0.6 :vector-weight 0.4)"
  [query & {:keys [limit keyword-weight vector-weight]
            :or {limit 10 keyword-weight 0.5 vector-weight 0.5}}]
  (search/search-hybrid query
                        :limit limit
                        :keyword-weight keyword-weight
                        :vector-weight vector-weight))

(defn memory-list
  "List all memories
   
   Usage: (memory-list :limit 100 :offset 0)"
  [& {:keys [limit offset] :or {limit 100 offset 0}}]
  (search/list-memories :limit limit :offset offset))

(defn memory-stats
  "Get memory search statistics
   
   Usage: (memory-stats)"
  []
  (search/memory-stats))

(defn memory-clear!
  "Clear all memories
   
   DANGER: Irreversible!"
  []
  (search/clear-memories!))
