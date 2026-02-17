(ns ouroboros.frontend.ui.wisdom.data
  "Fallback data for Wisdom page - templates, categories, insights.
   
   Note: This is minimal fallback data for offline/ECA-unavailable scenarios.
   Full templates are served by the backend via WebSocket on connection."
  (:require
   [clojure.string :as str]))

;; ============================================================================
;; Template Cards (metadata only - full data from backend)
;; ============================================================================

(def fallback-templates
  "Static template cards shown while ECA content loads."
  [{:key :saas :icon "🚀" :name "SaaS Product"
    :description "Software as a Service business model with recurring revenue, user onboarding, and retention focus."
    :tags ["B2B" "Subscription" "Cloud"]}
   {:key :marketplace :icon "🏪" :name "Two-Sided Marketplace"
    :description "Platform connecting buyers and sellers with network effects, trust systems, and transaction facilitation."
    :tags ["Platform" "Network Effects" "Commission"]}
   {:key :mobile-app :icon "📱" :name "Mobile App"
    :description "Consumer mobile application with engagement loops, monetization strategies, and growth mechanics."
    :tags ["Consumer" "Mobile" "Growth"]}
   {:key :developer-tool :icon "🛠" :name "Developer Tool"
    :description "Tools and APIs for developers with adoption funnels, documentation focus, and community building."
    :tags ["B2D" "API" "Open Source"]}
   {:key :ecommerce :icon "🛒" :name "E-Commerce / D2C"
    :description "Direct-to-consumer brand selling physical or digital products with supply chain, branding, and customer acquisition."
    :tags ["D2C" "Retail" "Brand"]}
   {:key :subscription-box :icon "📦" :name "Subscription Box"
    :description "Curated recurring delivery of physical goods with retention mechanics, personalization, and logistics."
    :tags ["Subscription" "Curation" "Logistics"]}
   {:key :edtech :icon "🎓" :name "EdTech Platform"
    :description "Online education platform with courses, certifications, and learning paths for skill development."
    :tags ["Education" "Courses" "B2C"]}
   {:key :agency :icon "🏢" :name "Agency / Consulting"
    :description "Professional services business with client acquisition, project delivery, and expertise monetization."
    :tags ["Services" "B2B" "Consulting"]}
   {:key :content-platform :icon "🎬" :name "Content Platform"
    :description "Creator-driven media platform with content monetization, audience building, and engagement loops."
    :tags ["Creator" "Media" "Monetization"]}])

(defn normalize-template-key
  "Normalize template key to keyword."
  [k]
  (cond
    (keyword? k) k
    (string? k) (keyword (str/replace k #"^:" ""))
    :else (keyword (str k))))

;; ============================================================================
;; Learning Categories
;; ============================================================================

(def fallback-learning-categories-base
  "Static learning categories metadata (icon, label, description)."
  [{:icon "🧠" :label "Customer Understanding"
    :description "Patterns about user research, empathy mapping, and customer discovery. Includes interview techniques, persona development, and jobs-to-be-done analysis."
    :category "customer-understanding"}
   {:icon "🎯" :label "Value Alignment"
    :description "Insights on matching solutions to real customer needs. Covers pain-gain mapping, value proposition design, and product-market fit signals."
    :category "value-alignment"}
   {:icon "⚡" :label "MVP Strategy"
    :description "Lessons learned about minimum viable products, rapid prototyping, and lean experimentation. Build less, learn more."
    :category "mvp-strategy"}
   {:icon "📊" :label "Business Model"
    :description "Revenue models, pricing strategies, cost structures, and go-to-market patterns discovered across projects."
    :category "business-model"}
   {:icon "🔄" :label "Iteration Patterns"
    :description "How successful projects pivot, iterate, and evolve based on user feedback. Includes common pivot triggers and anti-patterns."
    :category "iteration"}])

(def category-metadata
  "Lookup map of UI-only metadata (icon, description) keyed by category string."
  (into {} (map (fn [{:keys [category] :as c}]
                  [category (select-keys c [:icon :description :label])])
                fallback-learning-categories-base)))

;; ============================================================================
;; Default Insights (shown instantly while backend loads)
;; ============================================================================

(def default-category-insights
  "Pre-filled insights shown instantly when clicking a Learning Patterns category card."
  {"customer-understanding"
   [{:id "default-cu-1"
     :title "Interview Users Before Building"
     :category "customer-understanding"
     :insights ["Talk to at least 5 potential users before writing code"
                "Ask about their current workflow, not what they want built"
                "Listen for emotions and frustrations, not feature requests"]
     :tags ["user-research" "interviews" "discovery"]
     :confidence 5 :applied-count 0}
    {:id "default-cu-2"
     :title "Jobs-to-Be-Done Over Demographics"
     :category "customer-understanding"
     :insights ["Segment by the job users hire your product for"
                "Demographics mislead -- a CEO and a student may have the same job"
                "Map the full job chain: trigger, search, decide, use, evaluate"]
     :tags ["jtbd" "segmentation" "personas"]
     :confidence 4 :applied-count 0}]

   "value-alignment"
   [{:id "default-va-1"
     :title "Pain Relievers Beat Gain Creators"
     :category "value-alignment"
     :insights ["Users pay faster for pain relief than for nice-to-haves"
                "Rank pains by severity and frequency, then address the top one"
                "A painkiller beats a vitamin every time in early-stage products"]
     :tags ["value-prop" "pain-gain" "prioritization"]
     :confidence 5 :applied-count 0}]

   "mvp-strategy"
   [{:id "default-mvp-1"
     :title "Scope Ruthlessly"
     :category "mvp-strategy"
     :insights ["An MVP is the smallest thing that tests your riskiest assumption"
                "If it takes more than 2 weeks to build, scope it down further"
                "Cut features until it hurts -- then cut one more"]
     :tags ["scope" "lean" "timeboxing"]
     :confidence 5 :applied-count 0}]

   "business-model"
   [{:id "default-bm-1"
     :title "Pricing Is a Feature"
     :category "business-model"
     :insights ["Set pricing before building -- it shapes what you build"
                "Talk to users about willingness to pay early"
                "Three tiers work: anchor with expensive, sell the middle"]
     :tags ["pricing" "monetization" "revenue"]
     :confidence 4 :applied-count 0}]

   "iteration"
   [{:id "default-it-1"
     :title "Feedback Loops Over Roadmaps"
     :category "iteration"
     :insights ["Ship weekly, learn weekly -- roadmaps beyond 2 weeks are fiction"
                "Instrument everything: you cannot improve what you do not measure"
                "Close the loop: tell users what you changed based on their feedback"]
     :tags ["feedback" "iteration" "learning"]
     :confidence 5 :applied-count 0}]

   ;; Catch-all for unknown categories
   "general"
   [{:id "default-gen-1"
     :title "Start With Why"
     :category "general"
     :insights ["Document your hypothesis before each experiment"
                "Review learnings weekly -- patterns emerge over time"
                "Share insights across team members to avoid re-learning"]
     :tags ["process" "documentation" "team"]
     :confidence 3 :applied-count 0}]})

(defn enrich-categories
  "Merge fallback metadata onto backend categories.
   Backend provides real :count; fallback provides :icon, :description, and default :count."
  [backend-categories]
  ;; Defensive: ensure we have a sequence
  (let [safe-categories (cond
                          (vector? backend-categories) backend-categories
                          (seq? backend-categories) backend-categories
                          (nil? backend-categories) []
                          :else (if (sequential? backend-categories)
                                  backend-categories
                                  []))
        fallback-by-cat (into {} (map (fn [c] [(:category c) c]) fallback-learning-categories-base))
        merged (reduce (fn [acc {:keys [category] :as bc}]
                         (let [fb (get fallback-by-cat category)
                               default-count (count (get default-category-insights category []))
                               backend-count (or (:count bc) 0)
                               ;; Use backend count if available, otherwise default
                               effective-count (if (> backend-count 0) backend-count default-count)
                               enriched (merge {:icon "📝"} fb bc {:count effective-count})]
                           (assoc acc category enriched)))
                       {}
                       safe-categories)]
    (let [fallback-order (map :category fallback-learning-categories-base)
          fallback-set (set fallback-order)
          extra-keys (remove fallback-set (keep :category safe-categories))]
      (into (vec (keep #(get merged %) fallback-order))
            (keep #(get merged %) extra-keys)))))

;; ============================================================================
;; Contextual Wisdom Cards
;; ============================================================================

(def contextual-wisdom-cards
  "Contextual wisdom cards for each phase of the product flywheel."
  {:empathy
   [{:icon "👁" :title "Observe First" :description "Start by observing real users in their natural context before forming hypotheses."}
    {:icon "🔍" :title "Find Contradictions" :description "Look for gaps between what people say and what they actually do."}
    {:icon "💬" :title "Listen to Non-Users" :description "Interview people who chose NOT to use your solution."}
    {:icon "🎭" :title "Emotional Jobs" :description "Understand the emotional and social jobs users try to fulfill."}]

   :valueprop
   [{:icon "⚖" :title "Jobs Before Features" :description "Start with customer jobs-to-be-done, not product features."}
    {:icon "🔥" :title "Pain Severity Ranking" :description "Rank pains by severity and frequency."}
    {:icon "🎯" :title "One Killer Value" :description "Focus on ONE compelling value proposition."}
    {:icon "🔗" :title "Fit Score" :description "Map each pain reliever to a specific customer pain."}]

   :mvp
   [{:icon "✂" :title "Cut Ruthlessly" :description "Cut features until it hurts, then cut one more."}
    {:icon "👤" :title "One User, One Problem" :description "Focus on ONE user persona, ONE core problem."}
    {:icon "📏" :title "Define Success First" :description "Set success metrics BEFORE you build."}
    {:icon "🧪" :title "Test the Riskiest Bit" :description "Design MVP to test your riskiest assumption first."}]

   :canvas
   [{:icon "🧩" :title "Problem-Customer First" :description "Fill Problem and Customer Segments first."}
    {:icon "💎" :title "Unfair Advantage" :description "If you cannot fill it, keep iterating until you find something defensible."}
    {:icon "📈" :title "Pick 1-3 Metrics" :description "Key Metrics should be 1-3 numbers that prove traction."}
    {:icon "🔄" :title "Canvas as Conversation" :description "Revisit your canvas every 2 weeks."}]})

;; ============================================================================
;; BMC Configuration
;; ============================================================================

(def bmc-block-config
  "Mapping from BMC block key to display label and data source."
  [[:key-partners "Key Partners" :lean-canvas :unfair-advantage]
   [:key-activities "Key Activities" :lean-canvas :solution]
   [:key-resources "Key Resources" :mvp-planning :must-have-features]
   [:value-props "Value Propositions" :lean-canvas :uvp]
   [:customer-rel "Customer Relationships" :value-proposition :gain-creators]
   [:channels "Channels" :lean-canvas :channels]
   [:customer-segments "Customer Segments" :lean-canvas :customer-segments]
   [:cost-structure "Cost Structure" :lean-canvas :cost-structure]
   [:revenue-streams "Revenue Streams" :lean-canvas :revenue-streams]])

(def bmc-block-colors
  "Subtle background colors for each BMC block."
  {:key-partners "rgba(108, 92, 231, 0.08)"
   :key-activities "rgba(0, 184, 148, 0.08)"
   :key-resources "rgba(9, 132, 227, 0.08)"
   :value-props "rgba(253, 121, 168, 0.08)"
   :customer-rel "rgba(255, 159, 67, 0.08)"
   :channels "rgba(0, 206, 209, 0.08)"
   :customer-segments "rgba(162, 155, 254, 0.08)"
   :cost-structure "rgba(223, 230, 233, 0.12)"
   :revenue-streams "rgba(85, 239, 196, 0.08)"})

;; ============================================================================
;; Builders
;; ============================================================================

(def all-builder-types
  "All 4 builder types with their session-id prefixes."
  [{:type :empathy-map :prefix "empathy-"}
   {:type :value-proposition :prefix "valueprop-"}
   {:type :mvp-planning :prefix "mvp-"}
   {:type :lean-canvas :prefix "canvas-"}])

(def builder-labels
  "Human-readable labels for builder types."
  {:empathy-map "Empathy Map"
   :value-proposition "Value Proposition"
   :mvp-planning "MVP Planning"
   :lean-canvas "Lean Canvas"})

(defn stage->builder-type
  "Convert stage string to builder type keyword."
  [stage]
  (case stage
    "empathy" :empathy-map
    "valueprop" :value-proposition
    "mvp" :mvp-planning
    "canvas" :lean-canvas
    nil))

(defn stage->builder-label
  "Convert stage string to builder label."
  [stage]
  (case stage
    "empathy" "Empathy Map"
    "valueprop" "Value Proposition"
    "mvp" "MVP Planning"
    "canvas" "Lean Canvas"
    "Builder"))

;; ============================================================================
;; State Management (Single Source of Truth)
;; ============================================================================

(defonce wisdom-state
  "Global state atom for Wisdom page.
   
   Structure:
   {:templates {:status :loading|:loaded|:error
                :data [...]
                :search-query ''
                :active-filter nil}
    :insights {:status :loading|:loaded|:error
               :categories [...]
               :category-insights {category [...]}}
    :ui {:toast {:message nil :visible? false}
         :selected-template nil
         :drawer-open? false}}"
  (atom {:templates {:status :loading
                     :data fallback-templates
                     :search-query ""
                     :active-filter nil}
         :insights {:status :loading
                    :categories []
                    :category-insights {}}
         :ui {:toast {:message nil :visible? false :type :info}
              :selected-template nil
              :drawer {:open? false
                       :category nil
                       :label nil}}}))

;; ============================================================================
;; Template Search & Filter
;; ============================================================================

(def template-filters
  "Available filter options for templates."
  [{:key :b2b :label "B2B" :match-fn #(some #{"B2B"} (:tags %))}
   {:key :b2c :label "B2C" :match-fn #(some #{"Consumer" "B2C" "Creator"} (:tags %))}
   {:key :dev :label "Developer" :match-fn #(some #{"B2D" "API" "Developer" "Open Source"} (:tags %))}
   {:key :subscription :label "Subscription" :match-fn #(some #{"Subscription"} (:tags %))}
   {:key :marketplace :label "Marketplace" :match-fn #(some #{"Marketplace" "Platform"} (:tags %))}])

(defn matches-search?
  "Check if template matches search query."
  [template query]
  (if (str/blank? query)
    true
    (let [q (str/lower-case query)
          name (str/lower-case (or (:name template) ""))
          desc (str/lower-case (or (:description template) ""))
          tags (map str/lower-case (or (:tags template) []))]
      (or (str/includes? name q)
          (str/includes? desc q)
          (some #(str/includes? % q) tags)))))

(defn filter-templates
  "Filter templates by search query and active filter."
  [templates query active-filter]
  (let [by-search (filter #(matches-search? % query) templates)
        by-filter (if active-filter
                    (let [filter-fn (:match-fn (first (filter #(= (:key %) active-filter) template-filters)))]
                      (if filter-fn
                        (filter filter-fn by-search)
                        by-search))
                    by-search)]
    by-filter))

;; ============================================================================
;; Skeleton Loading Data
;; ============================================================================

(def skeleton-template
  "Single skeleton template for loading state."
  {:key :skeleton :icon "" :name "" :description "" :tags [] :skeleton? true})

(defn skeleton-templates
  "Generate n skeleton templates for loading state."
  [n]
  (vec (repeat n skeleton-template)))

;; ============================================================================
;; Toast Notifications
;; ============================================================================

(defn show-toast!
  "Show a toast notification."
  ([message] (show-toast! message :info))
  ([message type]
   (swap! wisdom-state assoc-in [:ui :toast] {:message message :visible? true :type type})
   ;; Auto-hide after 3 seconds
   (js/setTimeout #(swap! wisdom-state assoc-in [:ui :toast :visible?] false) 3000)))

(defn hide-toast! []
  (swap! wisdom-state assoc-in [:ui :toast :visible?] false))

;; ============================================================================
;; BMC Block Configuration
;; ============================================================================

(def bmc-block-nav
  "Mapping from BMC block to builder stage and section for navigation."
  {:key-partners {:stage "canvas" :section :unfair-advantage :label "Key Partners"}
   :key-activities {:stage "canvas" :section :solution :label "Key Activities"}
   :key-resources {:stage "mvp" :section :must-have-features :label "Key Resources"}
   :value-props {:stage "valueprop" :section :uvp :label "Value Propositions"}
   :customer-rel {:stage "valueprop" :section :gain-creators :label "Customer Relationships"}
   :channels {:stage "canvas" :section :channels :label "Channels"}
   :customer-segments {:stage "empathy" :section :customer-segments :label "Customer Segments"}
   :cost-structure {:stage "canvas" :section :cost-structure :label "Cost Structure"}
   :revenue-streams {:stage "canvas" :section :revenue-streams :label "Revenue Streams"}})