;; Dual Persistence - Datalevin (operational) + Git (knowledge)
;; Based on ASSESSMENT: "Dual Persistence: Datalevin (operational) + Git (knowledge)"
(ns ouroboros.persistence
  "Dual Persistence Layer
   
   - Datalevin: Fast operational data (sessions, projects, queries)
   - Git-backed: Knowledge/wisdom (learning, insights, patterns)
   
   Usage:
     (require '[ouroboros.persistence :as persist])
     
     ;; Operational (Datalevin)
     (persist/save! :sessions {:id \"s1\" :data {}})
     (persist/get :sessions \"s1\")
     
     ;; Knowledge (Git-backed)
     (persist/save-knowledge! :insights {:content \"...\"})
     (persist/get-knowledge :insights)"
  (:require [datalevin.core :as d]
            [clojure.java.shell :as shell]
            [clojure.java.io :as io]
            [clojure.string :as str]))

;; ============================================================================
;; Datalevin (Operational)
;; ============================================================================

(def ^:private operational-db (atom nil))
(def ^:private db-path "data/operational")

(defn- ensure-db-dir []
  (let [dir (io/file db-path)]
    (when-not (.exists dir)
      (.mkdirs dir))))

(defn connect-operational!
  "Connect to operational Datalevin store"
  []
  (ensure-db-dir)
  (let [conn (d/connect-db db-path)]
    (reset! operational-db conn)
    conn))

(defn close-operational!
  "Close operational Datalevin store"
  []
  (when @operational-db
    (d/close @operational-db)
    (reset! operational-db nil)))

(defn save-operational!
  "Save data to operational store (Datalevin)
   
   Usage: (save! :sessions {:id \"s1\" :data {...}})"
  [entity data]
  (when-not @operational-db
    (connect-operational!))
  (d/transact! @operational-db
    [[:db/add (d/tempid :db/id)
      entity (merge {:created-at (System/currentTimeMillis)} data)]]))

(defn get-operational
  "Get data from operational store by entity type
   
   Usage: (get :sessions)"
  [entity]
  (when-not @operational-db
    (connect-operational!))
  (d/q '[:find ?e ?v
         :in $ ?entity
         :where [?e ?entity ?v]]
       @operational-db entity))

;; ============================================================================
;; Git-backed (Knowledge)
;; ============================================================================

(def ^:private knowledge-path "data/knowledge")

(defn- ensure-knowledge-dir []
  (let [dir (io/file knowledge-path)]
    (when-not (.exists dir)
      (.mkdirs dir))))

(defn init-knowledge-repo!
  "Initialize Git-backed knowledge store"
  []
  (ensure-knowledge-dir)
  (let [git-dir (io/file knowledge-path ".git")]
    (when-not (.exists git-dir)
      (shell/sh "git" "init" :dir knowledge-path))))

(defn save-knowledge!
  "Save knowledge to Git-backed store
   
   Usage: (save-knowledge! :insights \"content\" {:message \"Add insight\"})"
  ([entity content]
   (save-knowledge! entity content {:message (str "Update " entity)}))
  ([entity content {:keys [message]}]
   (init-knowledge-repo!)
   (let [file (io/file knowledge-path (str (name entity) ".md"))]
     (spit file content)
     (shell/sh "git" "add" (str (name entity) ".md")
               :dir knowledge-path)
     (shell/sh "git" "commit" "-m" message
               :dir knowledge-path))))

(defn get-knowledge
  "Get knowledge from Git-backed store
   
   Usage: (get-knowledge :insights)"
  [entity]
  (init-knowledge-repo!)
  (let [file (io/file knowledge-path (str (name entity) ".md"))]
    (when (.exists file)
      (slurp file))))

(defn git-commit!
  "Commit all knowledge changes"
  [message]
  (init-knowledge-repo!)
  (shell/sh "git" "add" "-A" :dir knowledge-path)
  (shell/sh "git" "commit" "-m" message :dir knowledge-path))

;; ============================================================================
;; Dual Store Interface
;; ============================================================================

(def ^:private store-config
  {:operational [:sessions :projects :queries :cache]
   :knowledge [:insights :patterns :templates :wisdom]})

(defn store-type
  "Determine which store to use based on entity type"
  [entity]
  (if (some #{entity} (:operational store-config))
    :operational
    :knowledge))

(defn save!
  "Save to appropriate store (auto-detect)
   
   Usage: (save! :sessions {...}) or (save! :insights {...})"
  [entity data]
  (case (store-type entity)
    :operational (save-operational! entity data)
    :knowledge (save-knowledge! entity data)))

(defn get
  "Get from appropriate store (auto-detect)
   
   Usage: (get :sessions) or (get :insights)"
  [entity]
  (case (store-type entity)
    :operational (get-operational entity)
    :knowledge (get-knowledge entity)))

;; ============================================================================
;; Status
;; ============================================================================

(defn status
  "Get status of both stores"
  {:operational (if @operational-db :connected :disconnected)
   :knowledge (if (.exists (io/file knowledge-path ".git")) :initialized :uninitialized)})

(defn close!
  "Close all stores"
  []
  (close-operational!))