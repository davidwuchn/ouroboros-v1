(ns ouroboros.ws.handlers.wisdom-page
  "Wisdom page batch data handler.
   Returns all data needed for the wisdom page in one response.
   
   Replaces 3 separate WebSocket requests:
   1. content/generate :templates (static template descriptions)
   2. wisdom/template :saas (default template data)
   3. learning/categories (learning categories with counts)
   
   Note: ECA-generated templates are not included in batch (they stream).
   Frontend can request them separately if needed.
   
   Usage:
   Frontend sends: {:type \"wisdom/page-data\", :project-id \"...\"}
   Backend responds with combined data."
  (:require
   [clojure.string :as str]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.wisdom :as wisdom]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]))

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
  "Handle wisdom/page-data request - returns all wisdom page data in one response."
  [client-id {:keys [project-id]}]
  (let [user-id (ctx/current-user-id)
        start-time (System/currentTimeMillis)]
    
    (telemetry/emit! {:event :ws/wisdom-page-data-request
                      :client-id client-id
                      :project-id project-id
                      :user-id user-id})
    
    (try
      ;; Compute data
      (let [categories-result (compute-learning-categories user-id)
            ;; Static templates (same as wisdom/list-templates)
            static-templates (vec (wisdom/list-templates))
            ;; Template data for default (saas)
            template-data (wisdom/get-template :saas)]
        
        (conn/send-to! client-id
          {:type :wisdom/page-data
           :templates static-templates
           :templates-source :static
           :template-data template-data
           :learning-categories (:categories categories-result)
           :total-insights (:total-insights categories-result)
           :timestamp (System/currentTimeMillis)})
        
        (telemetry/emit! {:event :ws/wisdom-page-data-success
                          :client-id client-id
                          :duration (- (System/currentTimeMillis) start-time)
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
  
  ;; Check template data
  (wisdom/get-template :saas)
  
  ;; Compute categories
  (compute-learning-categories "test-user")
  
  ;; List templates
  (wisdom/list-templates)
  )