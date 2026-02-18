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

;; ============================================================================
;; Extended Health Check (NEW)
;; ============================================================================

(defn version
  "Get git-embed version
   
   Returns: {:version string? :error string?}"
  []
  (if-let [{:keys [installed?]} (installed?)]
    (if installed?
      (let [result (run-command "--version")]
        (if (:success result)
          {:version (str/trim (:output result))
           :raw result}
          {:error (:error result)}))
      {:error "git-embed not installed"})
    {:error "Install check failed"}))

(defn index-info
  "Get information about the embedding index
   
   Returns: {:exists? boolean :size number? :last-updated string? :error string?}"
  []
  (if-let [{:keys [installed?]} (installed?)]
    (if installed?
      (let [result (run-command "embed" "info")]
        (if (:success result)
          (try
            (let [lines (str/split-lines (:output result))
                  info (into {} (keep (fn [line]
                                       (when-let [[_ k v] (re-matches #"([^:]+):\s*(.+)" line)]
                                         [(keyword (str/trim k)) (str/trim v)]))
                                     lines))]
              {:exists? true
               :size (some-> (get info :files) Integer/parseInt)
               :vectors (some-> (get info :vectors) Integer/parseInt)
               :raw info})
            (catch Exception e
              {:exists? true
               :parse-error (.getMessage e)
               :raw (:output result)}))
          {:exists? false
           :error (:error result)}))
      {:exists? false
       :error "git-embed not installed"})
    {:exists? false
     :error "Install check failed"}))

(defn comprehensive-health
  "Comprehensive health check with all diagnostics
   
   Returns:
   {:healthy? boolean
    :installed? boolean
    :version string?
    :index {:exists? boolean :size number?}
    :checks [{:check string :status :pass/:fail :detail string}]
    :recommendations [string]}"
  []
  (let [install-status (installed?)
        version-info (version)
        index-data (index-info)
        
        checks [(if (:installed? install-status)
                 {:check "Binary installed" :status :pass :detail (:path install-status)}
                 {:check "Binary installed" :status :fail :detail (:error install-status)})
               
               (if (:version version-info)
                 {:check "Version check" :status :pass :detail (:version version-info)}
                 {:check "Version check" :status :fail :detail (:error version-info)})
               
               (if (:exists? index-data)
                 {:check "Index exists" :status :pass :detail (str (:size index-data) " files")}
                 {:check "Index exists" :status :fail :detail (:error index-data)})]
        
        healthy? (every? #(= :pass (:status %)) checks)
        
        recommendations (cond-> []
                         (not (:installed? install-status))
                         (conj "Install git-embed: cargo install git-embed")
                         
                         (and (:installed? install-status) (not (:exists? index-data)))
                         (conj "Initialize index: (embed/update-index!)")
                         
                         (and (:exists? index-data) (= 0 (:size index-data 0)))
                         (conj "Index is empty. Run update-index! to populate"))]
    
    {:healthy? healthy?
     :installed? (:installed? install-status)
     :version (:version version-info)
     :index (select-keys index-data [:exists? :size :vectors])
     :checks checks
     :recommendations recommendations}))

;; ============================================================================
;; Git Hook Integration (NEW)
;; ============================================================================

(def ^:private hook-template
  "#!/bin/bash\n# Git Embed Auto-Update Hook\n# Automatically updates semantic code index after each commit\n# Installed by Ouroboros learning system\n\nset -e\n\n# Only run if git-embed is available\nif ! command -v git-embed &> /dev/null; then\n    exit 0\nfi\n\n# Update index in background (don't block commit)\n(\n    cd \"$(git rev-parse --show-toplevel)\"\n    git-embed embed update > /dev/null 2>&1 || true\n) &\n\nexit 0\n")

(defn install-git-hook!
  "Install post-commit hook to auto-update embedding index
   
   Options:
   - :force? - Overwrite existing hook (default false)
   
   Returns: {:installed? boolean :path string? :error string?}"
  [& {:keys [force?] :or {force? false}}]
  (try
    (let [git-dir (str/trim (:out (shell/sh "git" "rev-parse" "--git-dir")))
          hooks-dir (io/file git-dir "hooks")
          hook-file (io/file hooks-dir "post-commit")]
      
      ;; Ensure hooks directory exists
      (.mkdirs hooks-dir)
      
      ;; Check if hook already exists
      (if (and (.exists hook-file) (not force?))
        {:installed? false
         :path (.getAbsolutePath hook-file)
         :error "Hook already exists. Use :force? true to overwrite"}
        
        ;; Install hook
        (do
          (spit hook-file hook-template)
          (.setExecutable hook-file true)
          {:installed? true
           :path (.getAbsolutePath hook-file)
           :message "post-commit hook installed. Index will auto-update after each commit"})))
    
    (catch Exception e
      {:installed? false
       :error (.getMessage e)})))

(defn uninstall-git-hook!
  "Remove the post-commit hook
   
   Returns: {:removed? boolean :path string? :error string?}"
  []
  (try
    (let [git-dir (str/trim (:out (shell/sh "git" "rev-parse" "--git-dir")))
          hook-file (io/file git-dir "hooks" "post-commit")]
      
      (if (.exists hook-file)
        (do
          (.delete hook-file)
          {:removed? true
           :path (.getAbsolutePath hook-file)
           :message "post-commit hook removed"})
        
        {:removed? false
         :error "Hook not found"}))
    
    (catch Exception e
      {:removed? false
       :error (.getMessage e)})))

(defn hook-status
  "Check if git hook is installed
   
   Returns: {:installed? boolean :path string? :content string?}"
  []
  (try
    (let [git-dir (str/trim (:out (shell/sh "git" "rev-parse" "--git-dir")))
          hook-file (io/file git-dir "hooks" "post-commit")]
      
      (if (.exists hook-file)
        {:installed? true
         :path (.getAbsolutePath hook-file)
         :content (slurp hook-file)
         :has-git-embed? (str/includes? (slurp hook-file) "git-embed")}
        
        {:installed? false
         :path (.getAbsolutePath hook-file)}))
    
    (catch Exception e
      {:installed? false
       :error (.getMessage e)})))
