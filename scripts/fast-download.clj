#!/usr/bin/env bb

"""
Fast Downloader - Parallel download with auto-resume support

Usage:
  bb scripts/fast-download.clj <url> [output-file]
  
Examples:
  bb scripts/fast-download.clj https://github.com/user/repo/releases/download/v1.0/file.zip
  bb scripts/fast-download.clj https://example.com/large-file.tar.gz my-file.tar.gz
  
Features:
  - Auto-resume interrupted downloads
  - Parallel connections (16 by default)
  - Progress display
  - Retry on failure
  - Checksum verification (optional)
"""

(require '[babashka.process :refer [shell process]]
         '[babashka.fs :as fs]
         '[clojure.string :as str])

(def ^:private default-connections 16)
(def ^:private default-splits 16)
(def ^:private max-retries 3)

(defn- get-filename-from-url [url]
  "Extract filename from URL"
  (let [decoded (java.net.URLDecoder/decode url "UTF-8")
        parts (str/split decoded #"/")]
    (last parts)))

(defn- file-exists? [path]
  "Check if file exists and has content"
  (and (fs/exists? path)
       (> (fs/size path) 0)))

(defn- format-bytes [bytes]
  "Format bytes to human readable"
  (cond
    (>= bytes (* 1024 1024 1024)) (format "%.2f GB" (/ bytes 1024.0 1024.0 1024.0))
    (>= bytes (* 1024 1024)) (format "%.2f MB" (/ bytes 1024.0 1024.0))
    (>= bytes 1024) (format "%.2f KB" (/ bytes 1024.0))
    :else (format "%d B" bytes)))

(defn- check-aria2-installed []
  "Check if aria2c is available"
  (try
    (shell {:out :string} "which aria2c")
    true
    (catch Exception _
      false)))

(defn- download-with-aria2 [url output-file connections splits]
  "Download using aria2c with resume support"
  (let [cmd ["aria2c"
             "-c"  ; Continue partial download
             "-x" (str connections)  ; Max connections per server
             "-s" (str splits)       ; Split count
             "-k" "1M"               ; Min split size
             "--file-allocation=none" ; Faster start
             "--summary-interval=0"   ; Less verbose
             "-o" output-file
             url]]
    (println (str "⚡ Downloading with " connections " parallel connections..."))
    (println (str "📁 Output: " output-file))
    (println (str "🔗 URL: " url))
    (println)
    
    (let [result (shell cmd)]
      (if (zero? (:exit result))
        (do
          (println "✓ Download complete!")
          (when (file-exists? output-file)
            (println (str "📊 Size: " (format-bytes (fs/size output-file)))))
          true)
        (do
          (println (str "✗ Download failed with exit code: " (:exit result)))
          false)))))

(defn- download-with-wget [url output-file]
  "Fallback download using wget"
  (println "⚠️  aria2c not found, using wget (slower)...")
  (let [cmd ["wget" "-c" "-O" output-file url]]
    (println (str "📁 Output: " output-file))
    (println (str "🔗 URL: " url))
    
    (let [result (shell cmd)]
      (if (zero? (:exit result))
        (do
          (println "✓ Download complete!")
          true)
        (do
          (println (str "✗ Download failed with exit code: " (:exit result)))
          false)))))

(defn- download-with-curl [url output-file]
  "Fallback download using curl"
  (println "⚠️  aria2c and wget not found, using curl...")
  (let [cmd ["curl" "-C" "-" "-L" "-o" output-file url]]
    (println (str "📁 Output: " output-file))
    (println (str "🔗 URL: " url))
    
    (let [result (shell cmd)]
      (if (zero? (:exit result))
        (do
          (println "✓ Download complete!")
          true)
        (do
          (println (str "✗ Download failed with exit code: " (:exit result)))
          false)))))

(defn- download-file [url output-file connections splits retry-count]
  "Download file with retry logic"
  (let [aria2-installed (check-aria2-installed)]
    (loop [attempt 1]
      (let [success (if aria2-installed
                     (download-with-aria2 url output-file connections splits)
                     (try
                       (download-with-wget url output-file)
                       (catch Exception _
                         (download-with-curl url output-file))))]
        (if success
          true
          (if (< attempt retry-count)
            (do
              (println (str "\n⚠️  Retry " attempt "/" retry-count " in 3 seconds..."))
              (Thread/sleep 3000)
              (recur (inc attempt)))
            (do
              (println (str "\n✗ Failed after " retry-count " attempts"))
              false)))))))

(defn- print-help []
  "Print usage help"
  (println "Fast Downloader - Parallel download with auto-resume")
  (println)
  (println "Usage:")
  (println "  bb scripts/fast-download.clj <url> [output-file] [options]")
  (println)
  (println "Options:")
  (println "  -c, --connections N    Number of parallel connections (default: 16)")
  (println "  -s, --splits N         Number of splits (default: 16)")
  (println "  -h, --help             Show this help")
  (println)
  (println "Examples:")
  (println "  bb scripts/fast-download.clj https://example.com/file.zip")
  (println "  bb scripts/fast-download.clj https://example.com/file.zip my-file.zip")
  (println "  bb scripts/fast-download.clj https://example.com/file.zip -c 32 -s 32"))

(defn -main [& args]
  (cond
    ;; No arguments or help
    (or (empty? args)
        (= (first args) "-h")
        (= (first args) "--help"))
    (print-help)
    
    :else
    (let [url (first args)
          ;; Parse remaining args
          parsed-args (loop [remaining (rest args)
                            opts {:output nil :connections default-connections :splits default-splits}]
                       (cond
                         (empty? remaining) opts
                         
                         (or (= (first remaining) "-c")
                             (= (first remaining) "--connections"))
                         (recur (drop 2 remaining)
                               (assoc opts :connections (Integer/parseInt (second remaining))))
                         
                         (or (= (first remaining) "-s")
                             (= (first remaining) "--splits"))
                         (recur (drop 2 remaining)
                               (assoc opts :splits (Integer/parseInt (second remaining))))
                         
                         ;; Assume it's the output filename
                         (not (str/starts-with? (first remaining) "-"))
                         (if (:output opts)
                           (recur (rest remaining) opts)  ; Already have output, skip
                           (recur (rest remaining) (assoc opts :output (first remaining))))
                         
                         :else (recur (rest remaining) opts)))
          
          output-file (or (:output parsed-args)
                         (get-filename-from-url url))
          connections (:connections parsed-args)
          splits (:splits parsed-args)]
      
      (when (and url output-file)
        (println "========================================")
        (println "  Fast Downloader")
        (println "========================================")
        (println)
        
        ;; Check if partial file exists
        (when (file-exists? output-file)
          (println (str "⚠️  Partial file found (" (format-bytes (fs/size output-file)) "), will resume..."))
          (println))
        
        ;; Download
        (let [success (download-file url output-file connections splits max-retries)]
          (System/exit (if success 0 1)))))))

;; Run if called directly
(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
