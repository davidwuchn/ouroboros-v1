;; Semantic Learning Search with Git-Embed Integration
;; Provides code-aware learning recall using semantic similarity
(ns ouroboros.learning.semantic
  "Semantic search integration for learning system
   
   Uses git-embed for semantic code search to enhance learning recall
   with code context awareness.
   
   Usage:
     (require '[ouroboros.learning.semantic :as sem])
     
     ;; Check if semantic search available
     (sem/available?)
     
     ;; Semantic recall with hybrid fallback
     (sem/recall-semantic :user-123 \"error handling patterns\")
     
     ;; Find code context for existing learning
     (sem/find-code-context :user-123 \"learning-id\")
     
     ;; Auto-link learning to related code
     (sem/auto-link-code! \"user-123/learning-id\")"
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [clojure.set :as set]
   [ouroboros.git-embed :as embed]
   [ouroboros.learning.core :as core]
   [ouroboros.learning.search :as search]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.telemetry :as telemetry]
   [com.wsscode.pathom3.connect.operation :as pco]))

;; ============================================================================
;; Health & Availability
;; ============================================================================

(def ^:private health-cache (atom {:last-check 0 :healthy? false}))
(def ^:private health-ttl-ms 60000) ; 1 minute

(defn available?
  "Check if semantic search is available (git-embed healthy)
   
   Returns: boolean
   
   Caches result for 1 minute to avoid repeated binary checks."
  []
  (let [{:keys [last-check healthy?]} @health-cache
        now (System/currentTimeMillis)]
    (if (< (- now last-check) health-ttl-ms)
      healthy?
      (try
        (let [healthy (embed/healthy?)]
          (reset! health-cache {:last-check now :healthy? healthy})
          healthy)
        (catch Exception _e
          (reset! health-cache {:last-check now :healthy? false})
          false)))))

(defn- ensure-available!
  "Throw if semantic search not available"
  []
  (when-not (available?)
    (throw (ex-info "Semantic search not available (git-embed not healthy)"
                    {:type :semantic/unavailable}))))

;; ============================================================================
;; Cache for Semantic Results
;; ============================================================================

(def ^:private semantic-cache (atom {}))
(def ^:private cache-ttl-ms 300000) ; 5 minutes

(defn- cache-key [user-id query]
  (str (name user-id) "/" (hash (str/lower-case (str/trim query)))))

(defn- get-cached [user-id query]
  (when-let [entry (get @semantic-cache (cache-key user-id query))]
    (let [age (- (System/currentTimeMillis) (:timestamp entry))]
      (when (< age cache-ttl-ms)
        (:results entry)))))

(defn- cache-results! [user-id query results]
  (swap! semantic-cache assoc (cache-key user-id query)
         {:timestamp (System/currentTimeMillis)
          :results results}))

(defn clear-cache!
  "Clear the semantic search cache"
  []
  (reset! semantic-cache {}))

;; ============================================================================
;; Code Context Extraction
;; ============================================================================

(defn- safe-slurp
  "Safely read file with line limit"
  [file max-lines]
  (try
    (when (.exists (io/file file))
      (let [lines (str/split-lines (slurp file))]
        (str/join "\n" (take max-lines lines))))
    (catch Exception _ nil)))

(defn extract-snippet
  "Extract code snippet from file around specific lines
   
   Options:
   - :context-lines - Number of context lines (default 3)
   - :max-chars - Max snippet length (default 500)
   
   Returns: {:file :line-start :line-end :snippet :truncated?}"
  [file line-num & {:keys [context-lines max-chars]
                    :or {context-lines 3 max-chars 500}}]
  (try
    (let [lines (str/split-lines (slurp file))
          total-lines (count lines)
          start (max 0 (- (dec line-num) context-lines))
          end (min total-lines (+ line-num context-lines))
          snippet-lines (subvec lines start end)
          snippet (str/join "\n" snippet-lines)
          truncated? (> (count snippet) max-chars)]
      {:file file
       :line-start (inc start)
       :line-end end
       :snippet (if truncated?
                  (str (subs snippet 0 max-chars) "...")
                  snippet)
       :truncated? truncated?})
    (catch Exception e
      {:file file
       :error (.getMessage e)})))

(defn- extract-snippets-for-files
  "Extract snippets for multiple files, sorted by relevance"
  [files & {:keys [max-snippets] :or {max-snippets 3}}]
  (->> files
       (take max-snippets)
       (map #(extract-snippet % 1 :context-lines 5))
       (remove :error)))

;; ============================================================================
;; Semantic Recall
;; ============================================================================

(defn- semantic-search-code
  "Search for code using git-embed
   
   Returns: [{:file :score}] or nil if unavailable"
  [query limit]
  (when (available?)
    (try
      (let [result (embed/search query limit)]
        (when (:success result)
          (:results result)))
      (catch Exception e
        (telemetry/emit! {:event :semantic/search-error
                          :error (.getMessage e)
                          :query query})
        nil))))

(defn- score-by-code-overlap
  "Score learning by overlap with code files"
  [learning code-files]
  (let [learning-files (set (map str (:learning/code-files learning [])))
        code-file-set (set (map :file code-files))
        overlap (count (set/intersection learning-files code-file-set))
        bonus (if (pos? overlap) 5.0 0.0)] ; Bonus for any overlap
    (+ bonus (* overlap 10.0))))

(defn recall-semantic
  "Recall learnings using semantic similarity to code
   
   Options:
   - :limit - Max results (default 10)
   - :hybrid? - Combine with keyword search (default true)
   
   Returns: [{:learning/id :learning/title ... :semantic/score}]"
  [user-id query & {:keys [limit hybrid?]
                    :or {limit 10 hybrid? true}}]
  (let [;; Check cache first
        cached (get-cached user-id query)]

    (if cached
      cached

      ;; Perform search
      (let [;; Get keyword results if hybrid
            keyword-results (when hybrid?
                              (search/full-text-search user-id query :limit limit))
            keyword-ids (set (map :learning/id keyword-results))

            ;; Get semantic code results
            code-results (semantic-search-code query limit)
            code-files (set (map :file code-results))

            ;; Get user learnings to score
            user-learnings (core/get-user-history user-id {:limit 200})

            ;; Create lookup for keyword scores
            keyword-score-map (into {} (map #(vector (:learning/id %) (:search-score % 0)) keyword-results))

            ;; Score by semantic relevance + keyword overlap
            scored (map (fn [learning]
                          (let [semantic-score (score-by-code-overlap learning code-results)
                                ;; Get keyword score from search results, not from learning record
                                keyword-score (get keyword-score-map (:learning/id learning) 0)
                                ;; Boost score if learning appears in both semantic and keyword
                                hybrid-bonus (if (contains? keyword-ids (:learning/id learning)) 2.0 0.0)]
                            (assoc learning
                                   :semantic/score semantic-score
                                   :semantic/code-files (vec code-files)
                                   :keyword/score keyword-score
                                   :hybrid/bonus hybrid-bonus
                                   :combined/score (+ (* semantic-score 0.6)
                                                      (* keyword-score 0.3)
                                                      (* hybrid-bonus 0.1)))))
                        user-learnings)

            ;; Filter and sort - include results with either semantic OR keyword match
            results (->> scored
                         (filter #(or (pos? (:semantic/score %))
                                      (pos? (:keyword/score %))
                                      (pos? (:hybrid/bonus %))))
                         (sort-by :combined/score >)
                         (take limit)
                         vec)]

        ;; Cache and return
        (cache-results! user-id query results)

        (telemetry/emit! {:event :semantic/recall
                          :user user-id
                          :query query
                          :results (count results)
                          :hybrid? hybrid?})

        results))))

(defn recall-with-fallback
  "Recall learnings with automatic fallback
   
   Tries semantic search first, falls back to keyword search if unavailable."
  [user-id query & {:keys [limit] :or {limit 10}}]
  (if (available?)
    (recall-semantic user-id query :limit limit :hybrid? true)
    (do
      (telemetry/emit! {:event :semantic/fallback-to-keyword
                        :user user-id
                        :query query})
      (search/full-text-search user-id query :limit limit))))

;; ============================================================================
;; Code Context for Learnings
;; ============================================================================

(defn find-code-context
  "Find code context for an existing learning
   
   Searches for code related to learning title and insights,
   returns suggested code files with snippets."
  [_user-id learning-id]
  (when-let [learning (core/get-learning learning-id)]
    (let [query (str (:learning/title learning) " "
                     (str/join " " (:learning/insights learning [])))
          code-results (semantic-search-code query 5)]
      (when code-results
        {:learning/id learning-id
         :learning/title (:learning/title learning)
         :code-files (vec code-results)
         :snippets (extract-snippets-for-files (map :file code-results))
         :timestamp (str (java.time.Instant/now))}))))

(defn auto-link-code!
  "Automatically link learning to related code files
   
   Updates the learning record with :learning/code-files and
   :learning/code-context (snippets)."
  [learning-id]
  (when-let [learning (core/get-learning learning-id)]
    (let [user-id (keyword (:learning/user learning))
          context (find-code-context user-id learning-id)]
      (when context
        (core/update-learning! learning-id
                               {:learning/code-files (:code-files context)
                                :learning/code-snippets (:snippets context)
                                :learning/code-linked-at (str (java.time.Instant/now))})

        (telemetry/emit! {:event :semantic/auto-linked
                          :learning-id learning-id
                          :files (count (:code-files context))})

        context))))

;; ============================================================================
;; Save with Auto-Link
;; ============================================================================

(defn save-insight-with-code!
  "Save learning insight with automatic code context extraction
   
   Saves the insight first, then asynchronously links code context
   to avoid blocking."
  [user-id {:keys [title insights examples pattern transfers tags category]
            :or {category "general"}}]
  ;; Save the learning first
  (let [learning (core/save-insight! user-id
                                     {:title title
                                      :insights insights
                                      :examples examples
                                      :pattern pattern
                                      :transfers transfers
                                      :tags tags
                                      :category category})]
    ;; Async link code context
    (future
      (try
        (Thread/sleep 100) ; Let save complete
        (auto-link-code! (:learning/id learning))
        (catch Exception e
          (telemetry/emit! {:event :semantic/auto-link-error
                            :learning-id (:learning/id learning)
                            :error (.getMessage e)}))))

    ;; Return immediately with learning (code context will be added async)
    (assoc learning :semantic/linking? true)))

;; ============================================================================
;; Statistics
;; ============================================================================

(defn semantic-stats
  "Get semantic search statistics for user
   
   Returns: {:available? :cache-size :learnings-with-code :total-code-files}"
  [user-id]
  (let [learnings (core/get-user-history user-id {:limit 1000})
        with-code (filter :learning/code-files learnings)
        total-files (reduce + (map #(count (:learning/code-files % [])) with-code))]
    {:available? (available?)
     :cache-size (count @semantic-cache)
     :learnings-with-code (count with-code)
     :total-code-files total-files
     :code-coverage (if (seq learnings)
                      (double (/ (count with-code) (count learnings)))
                      0.0)}))

;; ============================================================================
;; Index Management
;; ============================================================================

(defn update-code-index!
  "Update git-embed code index
   
   Call this after significant code changes to refresh embeddings."
  []
  (if (available?)
    (try
      (embed/update-index!)
      (clear-cache!) ; Clear semantic cache after index update
      (telemetry/emit! {:event :semantic/index-updated})
      {:success? true}
      (catch Exception e
        {:success? false :error (.getMessage e)}))
    {:success? false :error "git-embed not available"}))

;; ============================================================================
;; Stale Link Detection & Batch Operations (NEW)
;; ============================================================================

(defn- file-exists?
  "Check if a file still exists"
  [file-path]
  (.exists (io/file file-path)))

(defn detect-stale-links
  "Detect learnings with code links to non-existent files
   
   Returns: [{:learning/id :learning/title :stale-files [string]}]"
  [user-id]
  (let [learnings (core/get-user-history user-id {:limit 1000})
        with-code (filter :learning/code-files learnings)]
    (->> with-code
         (map (fn [learning]
                (let [files (:learning/code-files learning)
                      stale (remove file-exists? files)]
                  (when (seq stale)
                    {:learning/id (:learning/id learning)
                     :learning/title (:learning/title learning)
                     :stale-files stale
                     :stale-count (count stale)
                     :total-files (count files)}))))
         (remove nil?))))

(defn batch-relink!
  "Re-link code for all learnings of a user
   
   Options:
   - :force? - Re-link even if code-files already exist (default false)
   - :batch-size - Process in batches (default 10)
   
   Returns: {:relinked number :errors number :details [map]}"
  [user-id & {:keys [force? batch-size] :or {force? false batch-size 10}}]
  (let [learnings (core/get-user-history user-id {:limit 1000})
        to-relink (if force?
                    learnings
                    (filter #(or (nil? (:learning/code-files %))
                                 (seq (detect-stale-links user-id)))
                            learnings))
        batches (partition-all batch-size to-relink)
        results (atom {:relinked 0 :errors 0 :details []})]

    (doseq [batch batches]
      (doseq [learning batch]
        (try
          (auto-link-code! (:learning/id learning))
          (swap! results update :relinked inc)
          (Thread/sleep 100) ; Rate limiting
          (catch Exception e
            (swap! results update :errors inc)
            (swap! results update :details conj
                   {:learning-id (:learning/id learning)
                    :error (.getMessage e)})))))

    (telemetry/emit! {:event :semantic/batch-relink
                      :user user-id
                      :relinked (:relinked @results)
                      :errors (:errors @results)})

    @results))

(defn cleanup-stale-links!
  "Remove stale code file references from learnings
   
   Returns: {:cleaned number :removed-files number}"
  [user-id]
  (let [stale (detect-stale-links user-id)
        cleaned (atom 0)
        removed-files (atom 0)]

    (doseq [{:keys [learning/id stale-files]} stale]
      (try
        (let [learning (core/get-learning id)
              current-files (:learning/code-files learning)
              valid-files (remove (set stale-files) current-files)]
          (core/update-learning! id
                                 {:learning/code-files valid-files
                                  :learning/code-stale-removed-at (str (java.time.Instant/now))})
          (swap! cleaned inc)
          (swap! removed-files + (count stale-files)))
        (catch Exception e
          (telemetry/emit! {:event :semantic/cleanup-error
                            :learning-id id
                            :error (.getMessage e)}))))

    (telemetry/emit! {:event :semantic/stale-cleanup
                      :user user-id
                      :cleaned @cleaned
                      :removed-files @removed-files})

    {:cleaned @cleaned :removed-files @removed-files}))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver learning-semantic-search
  "Resolver for semantic learning search
   
   Query: [{[:user/id :query/query] [:learning/semantic-results]}]"
  [{:keys [user/id query/hybrid?] q :query/query}]
  {::pco/input [:user/id :query/query (pco/? :query/hybrid?)]
   ::pco/output [{:learning/semantic-results
                  [:learning/id
                   :learning/title
                   :semantic/score
                   :semantic/code-files]}]}
  {:learning/semantic-results
   (recall-semantic id q :limit 10 :hybrid? (get hybrid? true))})

(pco/defresolver learning-code-context
  "Resolver for code context of a learning"
  [{:keys [learning/id]}]
  {::pco/input [:learning/id]
   ::pco/output [:learning/code-files :learning/code-snippets]}
  (when-let [learning (core/get-learning id)]
    {:learning/code-files (:learning/code-files learning)
     :learning/code-snippets (:learning/code-snippets learning)}))

(pco/defmutation learning-auto-link!
  "Mutation to auto-link learning to code"
  [{:keys [learning/id]}]
  {::pco/output [:learning/id :linked? :file-count]}
  (if-let [result (auto-link-code! id)]
    {:learning/id id
     :linked? true
     :file-count (count (:code-files result))}
    {:learning/id id
     :linked? false
     :file-count 0}))

(def resolvers [learning-semantic-search learning-code-context])
(def mutations [learning-auto-link!])

;; Register with Pathom
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comments / Examples
;; ============================================================================

(comment
  ;; Check availability
  (available?)

  ;; Semantic recall
  (recall-semantic :alex "error handling patterns" :limit 5)

  ;; With fallback
  (recall-with-fallback :alex "threading macros")

  ;; Find code context
  (find-code-context :alex "alex/error-handling-1234567890-42")

  ;; Auto-link existing learning
  (auto-link-code! "alex/error-handling-1234567890-42")

  ;; Save with auto-link
  (save-insight-with-code!
   :alex
   {:title "Error Handling Patterns"
    :insights ["Use try-catch for external calls" "Log before throwing"]
    :tags #{"error" "patterns"}})

  ;; Stats
  (semantic-stats :alex)

  ;; Update code index
  (update-code-index!)

  ;; Clear cache
  (clear-cache!))