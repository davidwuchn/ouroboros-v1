(ns ouroboros.interface.knowledge
  "Knowledge interface - File system as queryable graph"
  (:require
   [ouroboros.query :as query]))

(defn files
  "List files in a directory
   
   Usage: (files \"src\")
          (files \".\")"
  [dir-path]
  (query/q [{[:dir-path dir-path]
             [{:knowledge/files [:file/path :file/name :file/extension
                                 :file/size :file/directory?]}]}]))

(defn file
  "Get info about a specific file
   
   Usage: (file \"README.md\")"
  [file-path]
  (query/q [{[:file-path file-path]
             [:file/path :file/name :file/size
              :file/content-preview :file/last-modified]}]))

(defn search
  "Search files by pattern
   
   Usage: (search \"*.clj\")"
  [pattern]
  (query/q [{[:search-pattern pattern]
             [{:knowledge/search [:file/path :file/name :file/size]}]}]))

(defn project
  "Get project structure
   
   Usage: (project)"
  []
  (query/q [:knowledge/project]))
