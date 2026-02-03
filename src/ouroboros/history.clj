(ns ouroboros.history
  "History - Git resolvers for the knowledge graph

   Exposes git history as queryable EQL nodes:
   - :git/commits - commit history
   - :git/commit - single commit details
   - :git/diff - changes between commits
   - :git/branches - branch list
   - :git/status - working tree status"
  (:require
   [babashka.process :refer [shell]]
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Git Command Interface
;; ============================================================================

(defn- git
  "Run git command, return trimmed output"
  [& args]
  (-> (apply shell {:out :string :err :string} "git" args)
      :out
      str/trim))

(defn- git-lines
  "Run git command, return lines"
  [& args]
  (let [out (apply git args)]
    (if (str/blank? out)
      []
      (str/split-lines out))))

;; ============================================================================
;; Git Parsers
;; ============================================================================

(defn parse-commit-line
  "Parse formatted git log line
   Format: hash|author|date|subject|refs"
  [line]
  (let [[hash author date subject refs] (str/split line #"\|" 5)]
    {:commit/hash hash
     :commit/author author
     :commit/date date
     :commit/subject subject
     :commit/refs (when refs
                    (->> (str/split (str/replace refs #"[()]" "") #", ")
                         (remove str/blank?)
                         vec))}))

(defn parse-status-line
  "Parse git status --porcelain line
   Format: XY filename or XY orig -> rename"
  [line]
  (let [x (subs line 0 1)
        y (subs line 1 2)
        rest (subs line 3)]
    {:status/index (if (= x " ") nil (str x))
     :status/work-tree (if (= y " ") nil (str y))
     :status/file rest}))

;; ============================================================================
;; Git Queries
;; ============================================================================

(defn commits
  "Get commit history
   Options: :limit (default 10), :branch (default current)"
  [& {:keys [limit branch] :or {limit 10}}]
  (let [format "%h|%an|%ai|%s|%d"
        args (concat ["log" (str "--pretty=format:" format) (str "-n" limit)]
                     (when branch [branch]))]
    (->> (apply git-lines args)
         (map parse-commit-line))))

(defn commit-detail
  "Get detailed info for a single commit"
  [hash]
  (let [subject (git "log" "-1" "--pretty=%s" hash)
        body (git "log" "-1" "--pretty=%b" hash)
        author (git "log" "-1" "--pretty=%an <%ae>" hash)
        date (git "log" "-1" "--pretty=%ai" hash)
        stat (git "show" "--stat" "--oneline" hash)]
    {:commit/hash hash
     :commit/subject subject
     :commit/body (when-not (str/blank? body) body)
     :commit/author author
     :commit/date date
     :commit/stat stat}))

(defn branches
  "Get list of branches"
  []
  (->> (git-lines "branch" "-a" "--format=%(refname:short)")
       (map (fn [name]
              {:branch/name name
               :branch/current? (str/starts-with? name "*")}))))

(defn status
  "Get working tree status"
  []
  (let [lines (git-lines "status" "--porcelain")
        branch (git "rev-parse" "--abbrev-ref" "HEAD")]
    {:status/branch branch
     :status/files (map parse-status-line lines)
     :status/clean? (empty? lines)}))

(defn diff
  "Get diff between commits or working tree"
  ([commit]
   (git "show" commit))
  ([from to]
   (git "diff" (str from ".." to))))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(defn- commit->map
  "Convert parsed commit to Pathom response map"
  [c]
  {:git/hash (:commit/hash c)
   :git/author (:commit/author c)
   :git/date (:commit/date c)
   :git/subject (:commit/subject c)
   :git/refs (:commit/refs c)})

(pco/defresolver git-commits [_]
  {::pco/output [{:git/commits [:git/hash :git/author :git/date :git/subject :git/refs]}]}
  {:git/commits (map commit->map (commits :limit 10))})

(pco/defresolver git-status [_]
  {::pco/output [:git/status]}
  (let [s (status)]
    {:git/status {:status/branch (:status/branch s)
                  :status/clean? (:status/clean? s)
                  :status/file-count (count (:status/files s))}}))

(pco/defresolver git-branches [_]
  {::pco/output [{:git/branches [:branch/name :branch/current?]}]}
  {:git/branches (branches)})

(pco/defresolver git-meta [_]
  {::pco/output [:git/meta]}
  {:git/meta {:git/repo-root (git "rev-parse" "--show-toplevel")
              :git/remote-url (try (git "remote" "get-url" "origin")
                                   (catch Exception _ nil))}})

(def resolvers
  "Pathom resolvers for git history"
  [git-commits git-status git-branches git-meta])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)

(comment
  ;; Resolvers are auto-registered in query.clj
  ;; Direct function calls also available:

  ;; Get recent commits
  (commits :limit 5)

  ;; Get commit detail
  (commit-detail "HEAD")

  ;; Get branches
  (branches)

  ;; Get status
  (status)

  ;; Get diff
  (diff "HEAD~1")
  (diff "HEAD~2" "HEAD"))