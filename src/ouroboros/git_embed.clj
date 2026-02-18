;; Git-Embed Integration for Learning System
;; Semantic similarity search for code patterns
(ns ouroboros.git-embed
  "Git-Embed wrapper for semantic code search
   
   Usage:
     (require '[ouroboros.git-embed :as embed])
     
     (embed/update-index!)
     (embed/search \"threading macros\")
     (embed/similar \"src/api.clj\")
     (embed/status)"
  (:require [clojure.java.shell :as shell]
            [clojure.string :as str]
            [clojure.java.io :as io]))

(def ^:private binary "git-embed")

(defn- run-command
  "Run git-embed command and return output"
  [& args]
  (try
    (let [result (apply shell/sh binary args)]
      {:success (zero? (:exit result))
       :output (str/trim (:out result))
       :error (str/trim (:err result))})
    (catch Exception e
      {:success false
       :error (.getMessage e)})))

(defn- parse-results [output]
  "Parse git-embed output into structured data"
  (when output
    (keep (fn [line]
            (when (and line (str/includes? line ":"))
              (let [[file score] (str/split line #"\s+" 2)]
                {:file file
                 :score (some-> score Double/parseDouble)})))
          (str/split-lines output))))

(defn update-index!
  "Update the git-embed index for this repository"
  []
  (run-command "embed" "update"))

(defn status
  "Check git-embed index status"
  []
  (run-command "embed" "status"))

(defn clear-index!
  "Clear the entire embedding index"
  []
  (run-command "embed" "clear"))

(defn search
  "Search for similar code using semantic similarity"
  ([query]
   (search query 5))
  ([query limit]
   (let [result (run-command "embed" "search" "-n" (str limit) query)]
     (if (:success result)
       {:query query
        :results (parse-results (:output result))}
       {:error (:error result)}))))

(defn similar
  "Find files similar to a given file"
  ([file]
   (similar file 5))
  ([file limit]
   (let [result (run-command "embed" "similar" "-n" (str limit) file)]
     (if (:success result)
       {:file file
        :results (parse-results (:output result))}
       {:error (:error result)}))))

(defn find-related-to-insight
  "Find code related to an insight content"
  [insight-content]
  (let [result (search insight-content 5)]
    (when (not (:error result))
      (map :file (:results result)))))

(defn healthy?
  "Check if git-embed is available"
  []
  (let [result (status)]
    (and (:success result)
         (not (str/blank? (:output result))))))

;; ============================================================================
;; Binary Validation (NEW)
;; ============================================================================

(def ^:private install-checked (atom false))
(def ^:private install-status (atom nil))

(defn- check-binary-exists?
  "Check if git-embed binary exists in PATH"
  []
  (try
    (let [result (shell/sh "which" binary)]
      (zero? (:exit result)))
    (catch Exception _
      false)))

(defn installed?
  "Check if git-embed is installed and available.
   
   Returns: {:installed? boolean :path string? :error string?}"
  []
  (if @install-checked
    @install-status
    (let [exists? (check-binary-exists?)
          path (when exists?
                 (try
                   (str/trim (:out (shell/sh "which" binary)))
                   (catch Exception _ nil)))
          status {:installed? exists?
                  :path path
                  :error (when-not exists?
                           "git-embed not found in PATH. Install from: https://github.com/davidwuchn/git-embed")}]
      (reset! install-checked true)
      (reset! install-status status)
      status)))

(defn ensure-installed!
  "Throw if git-embed is not installed"
  []
  (let [{:keys [installed? error]} (installed?)]
    (when-not installed?
      (throw (ex-info error
                      {:type :git-embed/not-installed
                       :install-url "https://github.com/davidwuchn/git-embed"
                       :help "Run: cargo install git-embed (requires Rust)"})))))

(defn reset-install-check!
  "Reset install check cache (useful after installation)"
  []
  (reset! install-checked false)
  (reset! install-status nil))
