(ns ouroboros.knowledge
  "Knowledge - File system as queryable graph
   
   Exposes the file system as EQL nodes:
   - :knowledge/files - files in a directory
   - :knowledge/file - specific file info
   - :knowledge/content - file contents
   - :knowledge/project - project structure"
  (:require
    [ouroboros.fs :as fs]
    [clojure.string :as str]
    [com.wsscode.pathom3.connect.operation :as pco]
    [ouroboros.history :as history]
    [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; File System Queries
;; ============================================================================

(defn- file-info
  "Get info about a file"
  [path]
  (let [f (fs/path path)]
    (when (fs/exists? f)
      {:file/path (str path)
       :file/name (fs/file-name f)
       :file/extension (fs/extension f)
       :file/size (if (fs/regular-file? f) (fs/size f) nil)
       :file/directory? (fs/directory? f)
       :file/regular-file? (fs/regular-file? f)
       :file/hidden? (fs/hidden? f)
       :file/last-modified (when (fs/regular-file? f)
                             (str (fs/last-modified-time f)))})))

(defn- list-files
  "List files in a directory"
  ([dir] (list-files dir 1))
  ([dir depth]
   (let [path (fs/path dir)]
     (when (fs/directory? path)
       (->> (fs/list-dir path)
            (map #(file-info (str %)))
            (remove nil?))))))

(defn- read-file-content
  "Read file content as string"
  [path max-lines]
  (let [f (fs/path path)]
    (when (and (fs/regular-file? f)
               (< (fs/size f) (* 1024 1024))) ; Only files < 1MB
      (try
        (let [lines (str/split-lines (slurp (str path)))]
          (if max-lines
            (str/join "\n" (take max-lines lines))
            (str/join "\n" lines)))
        (catch Exception e
          (str "[Error reading file: " (.getMessage e) "]"))))))

(defn- search-files
  "Search files by name pattern"
  [dir pattern]
  (->> (fs/glob dir pattern)
       (map #(file-info (str %)))
       (remove nil?)))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver knowledge-files [{:keys [dir-path]}]
  {::pco/input [:dir-path]
   ::pco/output [{:knowledge/files [:file/path :file/name :file/extension
                                    :file/size :file/directory?
                                    :file/regular-file? :file/hidden?]}]}
  {:knowledge/files (list-files dir-path)})

(pco/defresolver knowledge-file [{:keys [file-path]}]
  {::pco/input [:file-path]
   ::pco/output [:file/path :file/name :file/extension
                 :file/size :file/directory?
                 :file/regular-file? :file/hidden?
                 :file/last-modified]}
  (file-info file-path))

(pco/defresolver knowledge-content [{:keys [file-path]}]
  {::pco/input [:file-path]
   ::pco/output [:file/content]}
  {:file/content (read-file-content file-path nil)})

(pco/defresolver knowledge-content-preview [{:keys [file-path]}]
  {::pco/input [:file-path]
   ::pco/output [:file/content-preview]}
  {:file/content-preview (read-file-content file-path 50)})

(pco/defresolver knowledge-project [_]
  {::pco/output [{:knowledge/project [:project/name :project/root
                                      {:project/files [:file/path :file/name]}]}]}
  (let [root (history/git "rev-parse" "--show-toplevel")
        name (fs/file-name root)]
    {:knowledge/project {:project/name name
                         :project/root root
                         :project/files (take 20 (list-files root))}}))

(pco/defresolver knowledge-search [{:keys [search-pattern]}]
  {::pco/input [:search-pattern]
   ::pco/output [{:knowledge/search [:file/path :file/name :file/size]}]}
  {:knowledge/search (search-files "." (str "**" search-pattern "**"))})

(def resolvers
  "Pathom resolvers for file system knowledge"
  [knowledge-files
   knowledge-file
   knowledge-content
   knowledge-content-preview
   knowledge-project
   knowledge-search])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)

(comment
  ;; Direct usage
  (file-info "src")
  (list-files "src")
  (read-file-content "README.md" 10)
  (search-files "." "*.clj")
  
  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{[:dir-path "src"]
         [{:knowledge/files [:file/name :file/directory?]}]}])
  (q/q [{[:file-path "bb.edn"]
         [:file/size :file/content-preview]}]))
