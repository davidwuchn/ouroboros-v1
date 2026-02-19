(ns ouroboros.ws.handlers.wisdom-page
  "Wisdom page batch data handler.
   Returns all data needed for the wisdom page in one response.
   
   Replaces 4 separate WebSocket requests:
   1. content/generate :templates (ECA-generated template descriptions)
   2. wisdom/template :saas (default template data)
   3. learning/categories (learning categories with counts)
   
   Now includes ECA-generated templates synchronously (no streaming).
   Achieves WS requests: 4 → 1 (full batch).
   
   Usage:
   Frontend sends: {:type \"wisdom/page-data\", :project-id \"...\"}
   Backend responds with combined data."
  (:require
   [clojure.string :as str]
   [ouroboros.eca-client :as eca]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.wisdom :as wisdom]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.prompt-loader :as pl]))

;; ============================================================================
;; Synchronous ECA Template Generation
;; ============================================================================

(defn- generate-eca-templates-sync
  "Generate ECA templates synchronously with timeout.
   Returns {:templates <vector> :source :eca} on success,
   nil if ECA fails or times out."
  [user-id project-id]
  (when (eca/alive?)
    (try
      (let [context-str (ctx/assemble-project-context user-id project-id nil)
            system-prompt (pl/get-prompt :content :templates (pl/default-content-prompt))
            prompt (str system-prompt "\n\n---\n\n" context-str)
            result (eca/chat-prompt prompt {:wait? true :timeout-ms 30000})]
        
        (if (= :success (:status result))
          (let [content (:content result)]
            (try
              ;; ECA should return EDN vector of template maps
              {:templates (read-string content) :source :eca}
              (catch Exception e
                ;; If not valid EDN, wrap as generated text
                (println "WARNING: ECA templates not valid EDN:" (subs (str content) 0 100))
                {:templates [{:template/key :generated
                              :template/name "AI-Generated Templates"
                              :template/description content}] 
                 :source :eca-text})))
          ;; ECA returned error
          (do
            (println "ECA template generation failed:" (:error result))
            nil)))
      (catch Exception e
        (println "ECA sync template generation error:" (.getMessage e))
        nil))))

;; ============================================================================
;; Combined Data Computation
;; ============================================================================

(defn compute-learning-categories
  "Compute learning categories with counts (from learning/handle-learning-categories!)."
  [user-id]
  (let [patterns (wisdom/analyze-learning-patterns user-id)
        all-learnings (learning/recall-by-pattern user-id "")
        by-category (group-by :learning/category all-learnings)
        categories (map (fn [[cat records]]
                          {:category cat
                           :label (str/capitalize (str/replace (or cat "general") #"[-_/]" " "))
                           :count (count records)
                           :recent (take 3 (reverse (sort-by :learning/created records)))})
                        by-category)
        default-cats ["customer-understanding" "product-development"
                      "business-model" "general" "errors/fixes"]
        existing-cats (set (map :category categories))
        with-defaults (concat categories
                              (for [c default-cats
                                    :when (not (existing-cats c))]
                                {:category c
                                 :label (str/capitalize (str/replace c #"[-_/]" " "))
                                 :count 0
                                 :recent []}))]
    {:categories (vec with-defaults)
     :total-insights (:total-insights patterns 0)}))

(defn handle-wisdom-page-data!
  "Handle wisdom/page-data request - returns all wisdom page data in one response.
   Includes ECA-generated templates synchronously when ECA is alive."
  [client-id {:keys [project-id]}]
  (let [user-id (ctx/current-user-id)
        start-time (System/currentTimeMillis)]
    
    (telemetry/emit! {:event :ws/wisdom-page-data-request
                      :client-id client-id
                      :project-id project-id
                      :user-id user-id})
    
    (try
      ;; Compute data in parallel
      (let [categories-future (future (compute-learning-categories user-id))
            ;; Try ECA templates first, fallback to static
            templates-result (or (generate-eca-templates-sync user-id project-id)
                                 {:templates (vec (wisdom/list-templates))
                                  :source :static})
            categories-result @categories-future
            ;; Template data for default (saas)
            template-data (wisdom/get-template :saas)]
        
        (conn/send-to! client-id
          {:type :wisdom/page-data
           :templates (:templates templates-result)
           :templates-source (:source templates-result)
           :template-data template-data
           :learning-categories (:categories categories-result)
           :total-insights (:total-insights categories-result)
           :timestamp (System/currentTimeMillis)})
        
        (telemetry/emit! {:event :ws/wisdom-page-data-success
                          :client-id client-id
                          :duration (- (System/currentTimeMillis) start-time)
                          :templates-source (:source templates-result)
                          :categories-count (count (:categories categories-result))}))
      
      (catch Exception e
        (telemetry/emit! {:event :ws/wisdom-page-data-error
                          :client-id client-id
                          :error (.getMessage e)})
        (conn/send-to! client-id
          {:type :wisdom/page-data-error
           :error (.getMessage e)
           :timestamp (System/currentTimeMillis)})))))

(comment
  ;; Test the handler
  (handle-wisdom-page-data! "test-client" {:project-id "test-project"})
  
  ;; Test ECA template generation
  (generate-eca-templates-sync "test-user" "test-project")
  
  ;; Check template data
  (wisdom/get-template :saas)
  
  ;; Compute categories
  (compute-learning-categories "test-user")
  
  ;; List templates
  (wisdom/list-templates)
  )