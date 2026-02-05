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
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.learning :as learning]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.eca-client :as eca]))

;; ============================================================================
;; Template Library
;; ============================================================================

(def canvas-templates
  "Pre-built templates for different product types"
  {:saas {:name "SaaS Product"
          :description "Software as a Service business model"
          :empathy-map {:persona "Small business owner, 35-50, needs to streamline operations"
                        :think-feel "Worried about costs, wants reliable solution"
                        :hear "Other businesses using similar tools"
                        :see "Complex enterprise software, simple alternatives"
                        :say-do "Says 'I need something simple', trials multiple tools"
                        :pains-gains "Pains: Setup complexity, hidden costs. Gains: Time saved, peace of mind"}
          :lean-canvas {:problems "Manual processes, data silos, lack of insights"
                        :solution "Cloud-based automation platform"
                        :uvp "Setup in minutes, not months"
                        :unfair-advantage "Proprietary AI for workflow optimization"
                        :customer-segments "SMBs 10-100 employees"
                        :key-metrics "MRR, Churn, NPS"
                        :channels "Content marketing, partnerships"
                        :cost-structure "Engineering, infrastructure, support"
                        :revenue-streams "Monthly subscriptions, enterprise tier"}}
   
   :marketplace {:name "Two-Sided Marketplace"
                 :description "Platform connecting buyers and sellers"
                 :empathy-map {:persona "Side hustler, 25-35, looking for extra income"
                               :think-feel "Excited but overwhelmed by competition"
                               :hear "Success stories, platform fees complaints"
                               :see "Established marketplaces with high fees"
                               :say-do "Posts on social media, researches alternatives"
                               :pains-gains "Pains: High fees, lack of support. Gains: Income, flexibility"}
                 :lean-canvas {:problems "High platform fees, poor seller support, limited reach"
                               :solution "Low-fee marketplace with seller tools"
                               :uvp "Keep 95% of your earnings"
                               :unfair-advantage "Community-driven curation"
                               :customer-segments "Side hustlers, small creators"
                               :key-metrics "GMV, take rate, seller retention"
                               :channels "Social media, creator partnerships"
                               :cost-structure "Platform development, marketing"
                               :revenue-streams "Transaction fees, premium features"}}
   
   :mobile-app {:name "Consumer Mobile App"
                :description "B2C mobile application"
                :empathy-map {:persona "Young professional, 22-30, values convenience"
                              :think-feel "Wants quick wins, fears missing out"
                              :hear "Friend recommendations, app store reviews"
                              :see "Trending apps, influencers using products"
                              :say-do "Downloads quickly, abandons if not immediate value"
                              :pains-gains "Pains: Slow onboarding, too many notifications. Gains: Convenience, social status"}
                :lean-canvas {:problems "Inconvenient existing solutions, lack of mobile-first options"
                              :solution "Mobile-native experience"
                              :uvp "Get started in 30 seconds"
                              :unfair-advantage "Viral sharing mechanics"
                              :customer-segments "Urban professionals 22-35"
                              :key-metrics "DAU, retention D7, viral coefficient"
                              :channels "App store, social sharing, influencers"
                              :cost-structure "Development, user acquisition"
                              :revenue-streams "In-app purchases, subscriptions, ads"}}
   
   :developer-tool {:name "Developer Tool"
                   :description "Tool for software developers"
                   :empathy-map {:persona "Software engineer, 25-40, values efficiency"
                                 :think-feel "Frustrated with slow workflows, wants to optimize"
                                 :hear "Hacker News, Twitter/X, tech podcasts"
                                 :see "New tools daily, hype cycles"
                                 :say-do "Tries new tools, contributes to OSS, writes blog posts"
                                 :pains-gains "Pains: Context switching, configuration hell. Gains: Flow state, productivity"}
                   :lean-canvas {:problems "Slow development cycles, tool fragmentation"
                                 :solution "Unified developer experience"
                                 :uvp "Ship 10x faster"
                                 :unfair-advantage "Open source community"
                                 :customer-segments "Individual developers, engineering teams"
                                 :key-metrics "Active users, GitHub stars, CLI installs"
                                 :channels "GitHub, Hacker News, conferences"
                                 :cost-structure "Engineering, cloud infrastructure"
                                 :revenue-streams "Enterprise licenses, support, cloud hosting"}}})

(defn get-template
  "Get a template by key"
  [template-key]
  (get canvas-templates template-key))

(defn list-templates
  "List all available templates with metadata"
  []
  (map (fn [[k v]]
         {:template/key k
          :template/name (:name v)
          :template/description (:description v)})
       canvas-templates))

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
     :recent-insights (take 5 (sort-by :learning/created-at > learnings))}))

(defn find-similar-projects
  "Find projects similar to current context"
  [user-id project-context]
  (let [related (learning/find-related user-id project-context)]
    (take 5 related)))

(defn recognize-blockers
  "Identify potential blockers from incomplete sessions"
  [user-id]
  (let [all-learnings (learning/recall-by-pattern user-id "")
        incomplete-patterns (filter #(str/includes? (:learning/pattern %) "started")
                                    all-learnings)]
    (when (seq incomplete-patterns)
      {:blockers/detected? true
       :blockers/count (count incomplete-patterns)
       :blockers/suggestions ["Consider completing your empathy map first"
                              "You have multiple projects in progress - focus on one"]})))

;; ============================================================================
;; AI Insight Generation
;; ============================================================================

(defn generate-insights
  "Generate AI insights from canvas data"
  [canvas-data canvas-type]
  (case canvas-type
    :empathy-map
    (let [sections (:empathy/sections canvas-data {})]
      (cond-> []
        (and (get sections :pains) (get sections :gains))
        (conj {:insight/type :pains-gains-alignment
               :insight/title "Pains & Gains Analysis"
               :insight/description "Your customer has clear pains around efficiency. Consider emphasizing time savings in your value proposition."
               :insight/confidence 0.85})
        
        (get sections :think-feel)
        (conj {:insight/type :emotional-driver
               :insight/title "Emotional Driver Identified"
               :insight/description "Fear of missing out is a key motivator. Consider scarcity tactics or social proof."
               :insight/confidence 0.72})))
    
    :lean-canvas
    (let [blocks (:canvas/blocks canvas-data {})]
      (cond-> []
        (and (get blocks :problems) (get blocks :solution))
        (conj {:insight/type :problem-solution-fit
               :insight/title "Problem-Solution Alignment"
               :insight/description "Your solution directly addresses the stated problems. Good alignment for MVP validation."
               :insight/confidence 0.90})
        
        (and (get blocks :uvp) (get blocks :customer-segments))
        (conj {:insight/type :uvp-clarity
               :insight/title "UVP Clarity Check"
               :insight/description "Ensure your UVP speaks directly to the customer segment's primary pain point."
               :insight/confidence 0.78})))
    
    []))

(defn suggest-next-step
  "Suggest the next logical step in the product development flywheel"
  [current-stage current-data]
  (case current-stage
    :empathy-map
    (if (get-in current-data [:empathy/sections :pains-gains])
      {:suggestion/next-stage :value-proposition
       :suggestion/reason "You have a complete empathy map. Time to define your value proposition."
       :suggestion/action "Continue to Value Proposition Canvas"}
      {:suggestion/next-stage :empathy-map
       :suggestion/reason "Complete the Pains & Gains section to finish your empathy map."
       :suggestion/action "Add Pains & Gains"})
    
    :value-proposition
    {:suggestion/next-stage :mvp-planning
     :suggestion/reason "With value prop defined, plan your MVP features."
     :suggestion/action "Start MVP Planning"}
    
    :mvp-planning
    {:suggestion/next-stage :lean-canvas
     :suggestion/reason "Now formalize your business model."
     :suggestion/action "Build Lean Canvas"}
    
    :lean-canvas
    {:suggestion/next-stage :validation
     :suggestion/reason "You have a complete business model. Time to validate!"
     :suggestion/action "Start Validation"}
    
    {:suggestion/next-stage :empathy-map
     :suggestion/reason "Start with customer understanding."
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
  "Suggest based on user's past successful patterns"
  [user-id current-stage]
  (let [history (learning/recall-by-pattern user-id (name current-stage))
        completed (filter #(str/includes? (:learning/pattern %) "complete") history)]
    (when (seq completed)
      {:suggestion/type :historical
       :suggestion/message "Based on your past projects, you typically spend 3-4 days on this stage. Consider setting a deadline."
       :suggestion/confidence 0.65})))

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
  [{:keys [session/id session/data session/type]}]
  {::pco/input [:session/id :session/data :session/type]
   ::pco/output [{:wisdom/insights [:insight/type :insight/title :insight/description :insight/confidence]}]}
  {:wisdom/insights (generate-insights data type)})

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
