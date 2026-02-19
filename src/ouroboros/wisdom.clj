(ns ouroboros.wisdom
  "Wisdom engine for AI-assisted product development

   Analyzes user patterns, provides insights, and integrates with ECA
   for context-aware AI assistance in the Web UX Platform.

   Features:
   - Pattern recognition from learning memory
   - Template library for canvases
   - AI insight generation
   - Context assembly for ECA prompts
   - Suggestion engine

   Usage:
   (require '[ouroboros.wisdom :as wisdom])
   (wisdom/analyze-project :project-123)
   (wisdom/suggest-next-step :empathy-session-456)
   (wisdom/assemble-context :canvas-id :lean-canvas-789)"
  (:require
   [clojure.edn :as edn]
   [clojure.java.io :as io]
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry]))

;; ============================================================================
;; Template Library
;; ============================================================================

(def ^:private canvas-templates-resource "canvas_templates.edn")

(def ^:private canvas-templates-cache (atom nil))

(defn- load-canvas-templates!
  "Load canvas templates from EDN resource file. Caches result."
  []
  (or @canvas-templates-cache
      (reset! canvas-templates-cache
              (if-let [resource (io/resource canvas-templates-resource)]
                (edn/read-string (slurp resource))
                (do
                  (println "WARNING: canvas_templates.edn not found, using empty map")
                  {})))))

(def canvas-templates
  "Example templates for different product types.
   Loaded from resources/canvas_templates.edn on first access.
   These serve as fallback defaults -- ECA generates personalized templates
   based on the user's actual project description via content/generate :templates."
  (delay (load-canvas-templates!)))

(defn get-template
  "Get a template by key"
  [template-key]
  (get @canvas-templates template-key))

(defn list-templates
  "List all available templates with metadata"
  []
  (map (fn [[k v]]
         {:template/key k
          :template/name (:name v)
          :template/description (:description v)})
       @canvas-templates))

(defn apply-template
  "Apply a template to initialize a canvas session"
  [session-id template-key user-id]
  (if-let [template (get-template template-key)]
    (let [canvas-data (get template :lean-canvas {})]
      ;; Save insight about template usage
      (learning/save-insight! user-id
                              {:title (str "Used template: " (:name template))
                               :insights [(str "Applied " (:name template) " template to project")]
                               :pattern "template-usage"
                               :category "product-development"
                               :tags #{"template" "lean-canvas" (name template-key)}
                               :examples [{:session-id session-id
                                           :template template-key}]})
      
      (telemetry/emit! {:event :wisdom/template-applied
                        :session-id session-id
                        :template template-key
                        :user-id user-id})
      
      {:template/applied? true
       :template/data canvas-data
       :template/name (:name template)})
    
    {:error :template-not-found
     :template-key template-key}))

;; ============================================================================
;; Pattern Recognition
;; ============================================================================

(defn analyze-learning-patterns
  "Analyze user's learning history for patterns"
  [user-id]
  (let [learnings (learning/recall-by-pattern user-id "")
        by-category (group-by :learning/category learnings)
        by-pattern (group-by :learning/pattern learnings)]
    {:total-insights (count learnings)
     :categories (into {} (map (fn [[k v]] [k (count v)]) by-category))
     :patterns (into {} (map (fn [[k v]] [k (count v)]) by-pattern))
     :recent-insights (take 5 (reverse (sort-by :learning/created learnings)))}))

(defn find-similar-projects
  "Find projects similar to current context"
  [user-id project-context]
  (let [related (learning/find-related user-id project-context)]
    (take 5 related)))

(defn recognize-blockers
  "Identify potential blockers from incomplete sessions.
   Returns detected blockers; suggestions come from ECA via content/generate :blockers."
  [user-id]
  (let [all-learnings (learning/recall-by-pattern user-id "")
        incomplete-patterns (filter #(str/includes? (:learning/pattern %) "started")
                                    all-learnings)]
    (when (seq incomplete-patterns)
      {:blockers/detected? true
       :blockers/count (count incomplete-patterns)
       ;; Suggestions now come from ECA -- frontend requests via content/generate :blockers
       :blockers/suggestions []})))

;; ============================================================================
;; AI Insight Generation
;; ============================================================================

(defn generate-insights
  "Generate structural insights from canvas data.
   Returns detected patterns with types/titles; detailed descriptions come
   from ECA via the content/generate :insights handler."
  [canvas-data canvas-type]
  (case canvas-type
    :empathy-map
    (let [sections (:empathy/sections canvas-data {})]
      (cond-> []
        (and (get sections :pains) (get sections :gains))
        (conj {:insight/type :pains-gains-alignment
               :insight/title "Pains & Gains Analysis"
               :insight/description ""  ;; ECA fills this via content/generate :insights
               :insight/confidence 0.85})
        
        (get sections :think-feel)
        (conj {:insight/type :emotional-driver
               :insight/title "Emotional Driver Identified"
               :insight/description ""  ;; ECA fills this via content/generate :insights
               :insight/confidence 0.72})))
    
    :lean-canvas
    (let [blocks (:canvas/blocks canvas-data {})]
      (cond-> []
        (and (get blocks :problems) (get blocks :solution))
        (conj {:insight/type :problem-solution-fit
               :insight/title "Problem-Solution Alignment"
               :insight/description ""  ;; ECA fills this via content/generate :insights
               :insight/confidence 0.90})
        
        (and (get blocks :uvp) (get blocks :customer-segments))
        (conj {:insight/type :uvp-clarity
               :insight/title "UVP Clarity Check"
               :insight/description ""  ;; ECA fills this via content/generate :insights
               :insight/confidence 0.78})))
    
    []))

(defn suggest-next-step
  "Suggest the next logical step in the product development flywheel.
   Returns structural data (next-stage, action label); detailed reasoning
   comes from ECA via content/generate :flywheel-guide."
  [current-stage current-data]
  (case current-stage
    :empathy-map
    (if (get-in current-data [:empathy/sections :pains-gains])
      {:suggestion/next-stage :value-proposition
       :suggestion/reason ""  ;; ECA fills via content/generate
       :suggestion/action "Continue to Value Proposition Canvas"}
      {:suggestion/next-stage :empathy-map
       :suggestion/reason ""  ;; ECA fills via content/generate
       :suggestion/action "Add Pains & Gains"})
    
    :value-proposition
    {:suggestion/next-stage :mvp-planning
     :suggestion/reason ""  ;; ECA fills via content/generate
     :suggestion/action "Start MVP Planning"}
    
    :mvp-planning
    {:suggestion/next-stage :lean-canvas
     :suggestion/reason ""  ;; ECA fills via content/generate
     :suggestion/action "Build Lean Canvas"}
    
    :lean-canvas
    {:suggestion/next-stage :validation
     :suggestion/reason ""  ;; ECA fills via content/generate
     :suggestion/action "Start Validation"}
    
    {:suggestion/next-stage :empathy-map
     :suggestion/reason ""  ;; ECA fills via content/generate
     :suggestion/action "Create Empathy Map"}))

;; ============================================================================
;; ECA Context Assembly
;; ============================================================================

(defn assemble-context
  "Assemble context for ECA from canvas data"
  [canvas-id canvas-data canvas-type user-id]
  (let [patterns (analyze-learning-patterns user-id)
        similar (find-similar-projects user-id (str canvas-type " " canvas-id))
        insights (generate-insights canvas-data canvas-type)]
    {:context/canvas-id canvas-id
     :context/canvas-type canvas-type
     :context/data canvas-data
     :context/user-patterns patterns
     :context/similar-projects similar
     :context/insights insights
     :context/timestamp (System/currentTimeMillis)}))

(defn format-for-eca
  "Format context for ECA chat prompt"
  [context]
  (str "## Project Context\n\n"
       "**Current Work:** " (name (:context/canvas-type context)) "\n\n"
       "**Canvas Data:**\n"
       (case (:context/canvas-type context)
         :empathy-map
         (let [sections (get-in context [:context/data :empathy/sections])]
           (str/join "\n" (map (fn [[k v]] (str "- " (name k) ": " v)) sections)))
         
         :lean-canvas
         (let [blocks (get-in context [:context/data :canvas/blocks])]
           (str/join "\n" (map (fn [[k v]] (str "- " (name k) ": " v)) blocks)))
         
         "Canvas data available")
       "\n\n"
       "**User History:**\n"
       "- Total insights: " (get-in context [:context/user-patterns :total-insights] 0) "\n"
       "- Categories: " (str/join ", " (keys (get-in context [:context/user-patterns :categories]))) "\n\n"
       "**AI Insights:**\n"
       (if (seq (:context/insights context))
         (str/join "\n" (map #(str "- " (:insight/title %) ": " (:insight/description %))
                             (:context/insights context)))
         "No specific insights at this stage.")))

;; ============================================================================
;; Suggestion Engine
;; ============================================================================

(defn suggest-templates
  "Suggest templates based on project context"
  [project-description]
  (let [description-lower (str/lower-case project-description)
        scores (map (fn [[k template]]
                      [k (count (filter #(str/includes? description-lower %)
                                        (str/split (str/lower-case (:description template)) #"\s+")))])
                    canvas-templates)
        sorted (sort-by second > scores)]
    (take 3 (map first sorted))))

(defn suggest-from-history
  "Suggest based on user's past successful patterns.
   Returns structural data (type, confidence); personalized message
   comes from ECA via content/generate."
  [user-id current-stage]
  (let [history (learning/recall-by-pattern user-id (name current-stage))
        completed (filter #(str/includes? (:learning/pattern %) "complete") history)]
    (when (seq completed)
      {:suggestion/type :historical
       :suggestion/message ""  ;; ECA fills personalized message via content/generate
       :suggestion/confidence 0.65
       :suggestion/history-count (count completed)})))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver wisdom-templates
  "Get available templates"
  [_]
  {::pco/output [{:wisdom/templates [:template/key :template/name :template/description]}]}
  {:wisdom/templates (list-templates)})

(pco/defresolver wisdom-insights
  "Generate insights for a session"
  [{_session-id :session/id session-data :session/data session-type :session/type}]
  {::pco/input [:session/id :session/data :session/type]
   ::pco/output [{:wisdom/insights [:insight/type :insight/title :insight/description :insight/confidence]}]}
  {:wisdom/insights (generate-insights session-data session-type)})

(pco/defresolver wisdom-suggestions
  "Get suggestions for next steps"
  [{:keys [session/type session/data]}]
  {::pco/input [:session/type :session/data]
   ::pco/output [:wisdom/next-stage :wisdom/reason :wisdom/action]}
  (suggest-next-step type data))

(pco/defresolver wisdom-patterns
  "Get user's learning patterns"
  [{:keys [user/id]}]
  {::pco/input [:user/id]
   ::pco/output [:wisdom/total-insights {:wisdom/categories [:category :count]}]}
  (let [analysis (analyze-learning-patterns id)]
    {:wisdom/total-insights (:total-insights analysis)
     :wisdom/categories (map (fn [[k v]] {:category k :count v})
                             (:categories analysis))}))

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation apply-template-mutation!
  "Apply a template to a session"
  [{:keys [session-id template-key user-id]}]
  {::pco/output [:template/applied? :template/name :template/data]}
  (apply-template session-id template-key user-id))

(pco/defmutation generate-eca-context!
  "Generate ECA-ready context for a session"
  [{:keys [canvas-id canvas-data canvas-type user-id]}]
  {::pco/output [:context/formatted :context/timestamp]}
  (let [context (assemble-context canvas-id canvas-data canvas-type user-id)]
    {:context/formatted (format-for-eca context)
     :context/timestamp (System/currentTimeMillis)}))

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [wisdom-templates wisdom-insights wisdom-suggestions wisdom-patterns])
(def mutations [apply-template-mutation! generate-eca-context!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; List templates
  (list-templates)
  
  ;; Apply template
  (apply-template :session-123 :saas :user-456)
  
  ;; Analyze patterns
  (analyze-learning-patterns :user-456)
  
  ;; Generate insights
  (generate-insights {:empathy/sections {:pains "Slow workflows" :gains "More time"}}
                     :empathy-map)
  
  ;; Suggest next step
  (suggest-next-step :empathy-map {:empathy/sections {:pains-gains "Done"}})
  
  ;; Assemble context for ECA
  (def ctx (assemble-context :canvas-123
                             {:canvas/blocks {:problems "X" :solution "Y"}}
                             :lean-canvas
                             :user-456))
  (println (format-for-eca ctx))
  
  ;; Query via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:wisdom/templates :wisdom/total-insights]))
