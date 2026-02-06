(ns ouroboros.fs
  "Filesystem utilities - compatible with both Babashka and JVM Clojure
   
   Provides a subset of babashka.fs API using Java interop for JVM compatibility."
  (:require [clojure.string :as str])
  (:import [java.io File]
           [java.nio.file Files Path Paths]
           [java.nio.file.attribute BasicFileAttributes]))

;; ============================================================================
;; Path Operations
;; ============================================================================

(defn path
  "Create a path from string"
  [s]
  (Paths/get s (into-array String [])))

(defn file-name
  "Get the filename from a path"
  [p]
  (let [f (if (instance? Path p) p (path p))]
    (str (.getFileName f))))

;; ============================================================================
;; File Predicates
;; ============================================================================

(defn exists?
  "Check if path exists"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (.exists f)))

(defn directory?
  "Check if path is a directory"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (.isDirectory f)))

(defn regular-file?
  "Check if path is a regular file"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (.isFile f)))

(defn hidden?
  "Check if file is hidden"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (.isHidden f)))

;; ============================================================================
;; File Attributes
;; ============================================================================

(defn size
  "Get file size in bytes"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (.length f)))

(defn last-modified-time
  "Get last modified time"
  [p]
  (let [f (if (instance? File p) p (if (instance? Path p) (.toFile p) (.toFile (path p))))]
    (java.time.Instant/ofEpochMilli (.lastModified f))))

(defn extension
  "Get file extension"
  [p]
  (let [name (file-name p)
        idx (str/last-index-of name ".")]
    (when (and idx (> idx 0))
      (subs name (inc idx)))))

;; ============================================================================
;; Directory Operations
;; ============================================================================

(defn list-dir
  "List directory contents as seq of Path objects"
  [dir]
  (let [d (if (instance? Path dir) dir (path dir))]
    (when (directory? d)
      (->> (.toFile d)
           .listFiles
           (map #(.toPath %))))))

(defn create-dirs
  "Create directories including parents"
  [dir]
  (let [d (if (instance? Path dir) dir (path dir))]
    (Files/createDirectories d (into-array java.nio.file.attribute.FileAttribute []))
    d))

(defn delete-tree
  "Recursively delete directory"
  [dir]
  (let [d (if (instance? File dir) dir (if (instance? Path dir) (.toFile dir) (.toFile (path dir))))]
    (when (.isDirectory d)
      (doseq [f (.listFiles d)]
        (if (.isDirectory f)
          (delete-tree f)
          (.delete f))))
    (.delete d)))

;; ============================================================================
;; Search
;; ============================================================================

(defn glob
  "Simple glob implementation - returns matching files"
  [dir pattern]
  (let [d (if (instance? Path dir) dir (path dir))]
    (when (directory? d)
      (let [regex (re-pattern
                    (-> pattern
                        (str/replace "." "\\.")
                        (str/replace "*" ".*")
                        (str/replace "?" ".")))]
        (->> (list-dir d)
             (filter #(re-matches regex (file-name %))))))))
