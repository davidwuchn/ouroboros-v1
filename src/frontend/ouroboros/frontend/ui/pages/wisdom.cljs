(ns ouroboros.frontend.ui.pages.wisdom
  "Wisdom page - Templates, AI insights, learning patterns"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; localStorage Preferences (drawer width persistence)
;; ============================================================================

(def ^:private default-drawer-width 720)
(def ^:private min-drawer-width 400)
(def ^:private max-drawer-width-vw 95)

(defn- pref-get
  "Read a JSON-serialized value from localStorage, returning default-val on miss."
  [k default-val]
  (try
    (when-let [raw (.getItem js/localStorage k)]
      (js->clj (js/JSON.parse raw) :keywordize-keys true))
    (catch :default _ default-val)))

(defn- pref-set
  "Write a value to localStorage as JSON."
  [k v]
  (try
    (.setItem js/localStorage k (js/JSON.stringify (clj->js v)))
    (catch :default _ nil)))

(defn- drawer-width-key
  "localStorage key for a given drawer type keyword."
  [drawer-type]
  (str "ouroboros.drawer-width." (name drawer-type)))

(defn- get-drawer-width
  "Read persisted drawer width for the given type, or return default."
  [drawer-type]
  (let [w (pref-get (drawer-width-key drawer-type) default-drawer-width)]
    (if (number? w) w default-drawer-width)))

(defn- save-drawer-width!
  "Persist a drawer width for the given type."
  [drawer-type width]
  (pref-set (drawer-width-key drawer-type) width))

(defn- clamp-drawer-width
  "Clamp width between min and max-vw of viewport."
  [w]
  (let [max-px (* (.-innerWidth js/window) (/ max-drawer-width-vw 100))]
    (max min-drawer-width (min w max-px))))

;; ============================================================================
;; Resize Drag Handle (shared across all drawers)
;; ============================================================================

(defn- start-resize!
  "Begin resizing a drawer. Sets up mousemove/mouseup listeners on window.
   `this` is the Fulcro component, `drawer-type` is :template, :category, or :tip.
   `start-x` is the initial mouse clientX."
  [this drawer-type start-x start-width]
  (let [on-move (fn [e]
                  (.preventDefault e)
                  (let [dx (- (.-clientX e) start-x)
                        ;; Dragging left edge: moving mouse left = wider
                        new-w (clamp-drawer-width (- start-width dx))]
                    (comp/set-state! this {:resize/width new-w})))
        on-up   (fn on-up-fn [_e]
                  (let [final-w (comp/get-state this :resize/width)]
                    (when (number? final-w)
                      (save-drawer-width! drawer-type final-w))
                    (comp/set-state! this {:resize/active? false})
                    (.removeEventListener js/window "mousemove" (comp/get-state this :resize/move-fn))
                    (.removeEventListener js/window "mouseup" on-up-fn)))]
    (comp/set-state! this {:resize/active? true
                           :resize/move-fn on-move})
    (.addEventListener js/window "mousemove" on-move)
    (.addEventListener js/window "mouseup" on-up)))

(defn- drawer-resize-handle
  "Renders the left-edge drag handle for a drawer.
   `this` is the Fulcro component, `drawer-type` is the persistence key."
  [this drawer-type current-width]
  (dom/div {:className "wisdom-drawer-resize-handle"
            :onMouseDown (fn [e]
                           (.preventDefault e)
                           (.stopPropagation e)
                           (start-resize! this drawer-type (.-clientX e) current-width))}))

;; ============================================================================
;; Fallback Data (used when ECA is unavailable)
;; ============================================================================

(def fallback-templates
  "Static template cards shown while ECA content loads."
  [{:key :saas     :icon "🚀" :name "SaaS Product"          :description "Software as a Service business model with recurring revenue, user onboarding, and retention focus." :tags ["B2B" "Subscription" "Cloud"]}
   {:key :marketplace :icon "🏪" :name "Two-Sided Marketplace" :description "Platform connecting buyers and sellers with network effects, trust systems, and transaction facilitation." :tags ["Platform" "Network Effects" "Commission"]}
   {:key :mobile-app  :icon "📱" :name "Mobile App"            :description "Consumer mobile application with engagement loops, monetization strategies, and growth mechanics." :tags ["Consumer" "Mobile" "Growth"]}
   {:key :developer-tool :icon "🛠" :name "Developer Tool"     :description "Tools and APIs for developers with adoption funnels, documentation focus, and community building." :tags ["B2D" "API" "Open Source"]}])

(def fallback-learning-categories
  "Static learning categories shown while ECA content loads."
  [   {:icon "🧠" :label "Customer Understanding" :description "Patterns about user research, empathy mapping, and customer discovery. Includes interview techniques, persona development, and jobs-to-be-done analysis." :category "customer-understanding" :count 12}
   {:icon "🎯" :label "Value Alignment"        :description "Insights on matching solutions to real customer needs. Covers pain-gain mapping, value proposition design, and product-market fit signals." :category "value-alignment" :count 8}
   {:icon "⚡" :label "MVP Strategy"           :description "Lessons learned about minimum viable products, rapid prototyping, and lean experimentation. Build less, learn more." :category "mvp-strategy" :count 15}
   {:icon "📊" :label "Business Model"         :description "Revenue models, pricing strategies, cost structures, and go-to-market patterns discovered across projects." :category "business-model" :count 6}
   {:icon "🔄" :label "Iteration Patterns"     :description "How successful projects pivot, iterate, and evolve based on user feedback. Includes common pivot triggers and anti-patterns." :category "iteration" :count 10}])

(def default-category-insights
  "Pre-filled insights shown instantly when clicking a Learning Patterns category card.
   Real backend data replaces these silently once loaded."
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
     :confidence 4 :applied-count 0}
    {:id "default-cu-3"
     :title "Observe Before You Ask"
     :category "customer-understanding"
     :insights ["Watch users do the task before interviewing them"
                "People describe idealized behavior, observation reveals reality"
                "Note workarounds -- they signal unmet needs"]
     :tags ["observation" "ethnography" "field-research"]
     :confidence 4 :applied-count 0}]

   "value-alignment"
   [{:id "default-va-1"
     :title "Pain Relievers Beat Gain Creators"
     :category "value-alignment"
     :insights ["Users pay faster for pain relief than for nice-to-haves"
                "Rank pains by severity and frequency, then address the top one"
                "A painkiller beats a vitamin every time in early-stage products"]
     :tags ["value-prop" "pain-gain" "prioritization"]
     :confidence 5 :applied-count 0}
    {:id "default-va-2"
     :title "Test Value Props with Landing Pages"
     :category "value-alignment"
     :insights ["Create a landing page before building the product"
                "Measure sign-up conversion as a proxy for demand"
                "A/B test different value propositions to find the strongest"]
     :tags ["validation" "landing-page" "experiment"]
     :confidence 4 :applied-count 0}]

   "mvp-strategy"
   [{:id "default-mvp-1"
     :title "Scope Ruthlessly"
     :category "mvp-strategy"
     :insights ["An MVP is the smallest thing that tests your riskiest assumption"
                "If it takes more than 2 weeks to build, scope it down further"
                "Cut features until it hurts -- then cut one more"]
     :tags ["scope" "lean" "timeboxing"]
     :confidence 5 :applied-count 0}
    {:id "default-mvp-2"
     :title "Manual Before Automated"
     :category "mvp-strategy"
     :insights ["Wizard-of-Oz the backend: deliver value manually first"
                "Concierge MVPs validate demand without engineering investment"
                "Only automate what users repeatedly pay for"]
     :tags ["concierge" "wizard-of-oz" "validation"]
     :confidence 4 :applied-count 0}
    {:id "default-mvp-3"
     :title "One Metric That Matters"
     :category "mvp-strategy"
     :insights ["Pick a single success metric before launch"
                "Vanity metrics (signups, page views) lie -- track activation"
                "Define what 'success' looks like numerically, not emotionally"]
     :tags ["metrics" "kpi" "measurement"]
     :confidence 4 :applied-count 0}]

   "business-model"
   [{:id "default-bm-1"
     :title "Pricing Is a Feature"
     :category "business-model"
     :insights ["Set pricing before building -- it shapes what you build"
                "Talk to users about willingness to pay early"
                "Three tiers work: anchor with expensive, sell the middle"]
     :tags ["pricing" "monetization" "revenue"]
     :confidence 4 :applied-count 0}
    {:id "default-bm-2"
     :title "Channel-Market Fit"
     :category "business-model"
     :insights ["Your distribution channel must match your customer"
                "Enterprise: direct sales. Consumer: viral/content. SMB: self-serve"
                "The best product loses to better distribution"]
     :tags ["distribution" "channels" "go-to-market"]
     :confidence 4 :applied-count 0}]

   "iteration"
   [{:id "default-it-1"
     :title "Pivot Triggers"
     :category "iteration"
     :insights ["Pivot when metrics plateau despite 3+ experiments"
                "A pivot changes strategy, not vision"
                "Common pivots: zoom-in (one feature becomes the product), customer segment, channel"]
     :tags ["pivot" "strategy" "adaptation"]
     :confidence 4 :applied-count 0}
    {:id "default-it-2"
     :title "Feedback Loops Over Roadmaps"
     :category "iteration"
     :insights ["Ship weekly, learn weekly -- roadmaps beyond 2 weeks are fiction"
                "Instrument everything: you cannot improve what you do not measure"
                "Close the loop: tell users what you changed based on their feedback"]
     :tags ["feedback" "iteration" "learning"]
     :confidence 5 :applied-count 0}]

   ;; Catch-all for categories not listed above
   "general"
   [{:id "default-gen-1"
     :title "Start With Why"
     :category "general"
     :insights ["Document your hypothesis before each experiment"
                "Review learnings weekly -- patterns emerge over time"
                "Share insights across team members to avoid re-learning"]
     :tags ["process" "documentation" "team"]
     :confidence 3 :applied-count 0}]

   "errors/fixes"
   [{:id "default-ef-1"
     :title "Fail Fast, Fix Forward"
     :category "errors/fixes"
     :insights ["Treat errors as data, not disasters"
                "Post-mortem every significant failure within 48 hours"
                "Track recurring issues -- they reveal systemic problems"]
     :tags ["debugging" "post-mortem" "resilience"]
     :confidence 4 :applied-count 0}]

   "product-development"
   [{:id "default-pd-1"
     :title "Build-Measure-Learn"
     :category "product-development"
     :insights ["Each build cycle should test exactly one hypothesis"
                "Measuring without a hypothesis is just collecting data"
                "Learning is the unit of progress, not features shipped"]
     :tags ["lean" "experimentation" "learning"]
     :confidence 5 :applied-count 0}]})

(def fallback-template-data
  "Full template data keyed by template keyword, used when backend
   has not yet responded with real template data."
  {:saas {:name "SaaS Product"
          :empathy-map {:persona "Small business owner, 35-50, needs to streamline operations"
                        :think-feel "Worried about costs, wants reliable solution"
                        :hear "Other businesses using similar tools"
                        :see "Complex enterprise software, simple alternatives"
                        :say-do "Says 'I need something simple', trials multiple tools"
                        :pains-gains "Pains: Setup complexity, hidden costs. Gains: Time saved, peace of mind"}
          :value-proposition {:customer-job "Manage daily operations, track inventory, handle invoicing"
                              :pains "Hours on manual data entry; complex expensive tools; data in spreadsheets"
                              :gains "10+ hours saved per week; single dashboard; nothing falls through cracks"
                              :products "Cloud-based operations platform"
                              :pain-relievers "One-click import; guided setup; transparent pricing"
                              :gain-creators "Real-time dashboard; automated reminders; mobile app"}
          :mvp-planning {:core-problem "Small business owners waste 10+ hours/week on manual operations"
                         :target-user "Non-technical small business owner using spreadsheets"
                         :success-metric "50% reduction in admin time within first month"
                         :must-have-features "Dashboard; inventory tracking; basic invoicing; CSV import"
                         :nice-to-have "Team collaboration; mobile app; automated reports"
                         :out-of-scope "Advanced analytics; AI predictions; multi-currency"
                         :timeline "8 weeks: Dashboard, Inventory, Invoicing, Beta testing"
                         :risks "Migration friction; onboarding drop-off; pricing sensitivity"}
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
                 :empathy-map {:persona "Side hustler, 25-35, looking for extra income"
                               :think-feel "Excited but overwhelmed by competition"
                               :hear "Success stories, platform fees complaints"
                               :see "Established marketplaces with high fees"
                               :say-do "Posts on social media, researches alternatives"
                               :pains-gains "Pains: High fees, lack of support. Gains: Income, flexibility"}
                 :value-proposition {:customer-job "Sell products online, reach new customers, manage orders"
                                     :pains "15-30% platform fees; hard to stand out; no direct relationships"
                                     :gains "Keep most earnings; build a brand; loyal repeat customers"
                                     :products "Low-fee marketplace with seller tools and storefront"
                                     :pain-relievers "5% flat fee; SEO tools; direct messaging"
                                     :gain-creators "Custom storefronts; analytics; loyalty program"}
                 :mvp-planning {:core-problem "Independent sellers lose 15-30% to platform fees"
                                :target-user "Handmade/curated product sellers with existing social following"
                                :success-metric "100 active sellers with 5+ sales each in 3 months"
                                :must-have-features "Seller profiles; product listings; payments; messaging"
                                :nice-to-have "Reviews; analytics; promotional tools"
                                :out-of-scope "Shipping integration; international; wholesale"
                                :timeline "6 weeks: Profiles, Listings, Payments, Launch"
                                :risks "Chicken-and-egg; payment trust; seller onboarding"}
                 :lean-canvas {:problems "High platform fees, no brand identity, poor seller tools"
                               :solution "Creator-first marketplace with low fees"
                               :uvp "Keep 95% of your earnings"
                               :unfair-advantage "Community-driven curation"
                               :customer-segments "Independent creators and curators"
                               :key-metrics "GMV, Take rate, Seller retention"
                               :channels "Social media, creator partnerships"
                               :cost-structure "Platform, payments, support"
                               :revenue-streams "5% transaction fee, premium seller tools"}}
   :mobile-app {:name "Mobile App"
                :empathy-map {:persona "Young professional, 22-35, health-conscious"
                              :think-feel "Wants to be healthier but lacks consistency"
                              :hear "Friends using fitness apps, influencer recommendations"
                              :see "Overwhelming number of health apps"
                              :say-do "Downloads apps, uses for 2 weeks, abandons"
                              :pains-gains "Pains: Lack of motivation, information overload. Gains: Feeling healthier, habits"}
                :value-proposition {:customer-job "Build and maintain healthy daily habits consistently"
                                    :pains "Apps are too complex; lose motivation after 2 weeks; no accountability"
                                    :gains "Feel accomplished daily; visible progress; sustainable habits"
                                    :products "Habit tracker with social accountability"
                                    :pain-relievers "One-tap daily check-in; gentle reminders; streak protection"
                                    :gain-creators "Progress visualization; friend challenges; milestone rewards"}
                :mvp-planning {:core-problem "People abandon health apps within 2 weeks"
                               :target-user "Young professional who has tried and failed with habit apps"
                               :success-metric "30-day retention above 40%"
                               :must-have-features "Habit tracking; streaks; daily reminders; progress chart"
                               :nice-to-have "Social features; challenges; health insights"
                               :out-of-scope "Meal planning; workout videos; wearable sync"
                               :timeline "4 weeks: Core tracking, Streaks, Reminders, Beta"
                               :risks "Low retention; notification fatigue; App Store competition"}
                :lean-canvas {:problems "App abandonment, lack of motivation, no accountability"
                              :solution "Social habit tracker with streak mechanics"
                              :uvp "The only habit app your friends are on"
                              :unfair-advantage "Social graph and peer accountability"
                              :customer-segments "Health-conscious millennials and Gen Z"
                              :key-metrics "DAU/MAU, 30-day retention, streaks completed"
                              :channels "App Store, social sharing, influencer partnerships"
                              :cost-structure "Development, cloud, marketing"
                              :revenue-streams "Freemium, premium features, coaching upsell"}}
   :developer-tool {:name "Developer Tool"
                    :empathy-map {:persona "Full-stack developer, 25-40, building side projects"
                                  :think-feel "Frustrated with boilerplate, wants to ship faster"
                                  :hear "HN discussions, tool recommendations from colleagues"
                                  :see "Many tools with poor docs and steep learning curves"
                                  :say-do "Evaluates tools by docs quality, tries them on weekend projects"
                                  :pains-gains "Pains: Poor docs, breaking changes, vendor lock-in. Gains: Productivity, clean code"}
                    :value-proposition {:customer-job "Ship production-quality software faster with less boilerplate"
                                        :pains "Hours configuring tooling; poor documentation; breaking upgrades"
                                        :gains "Ship in days not weeks; confidence in production; clean architecture"
                                        :products "CLI tool + library with opinionated defaults"
                                        :pain-relievers "Zero-config start; migration guides; semantic versioning"
                                        :gain-creators "Code generation; best-practice templates; interactive docs"}
                    :mvp-planning {:core-problem "Developers spend 40% of time on boilerplate and config"
                                   :target-user "Full-stack dev building SaaS side projects"
                                   :success-metric "1000 GitHub stars and 100 weekly active users in 3 months"
                                   :must-have-features "CLI scaffolding; core library; getting-started guide; examples"
                                   :nice-to-have "VS Code extension; playground; community templates"
                                   :out-of-scope "Enterprise features; managed hosting; GUI builder"
                                   :timeline "6 weeks: CLI, Library, Docs, Launch on HN"
                                   :risks "Developer adoption is slow; competing tools; maintenance burden"}
                    :lean-canvas {:problems "Boilerplate overhead, poor DX, fragmented tooling"
                                  :solution "Opinionated full-stack toolkit"
                                  :uvp "From idea to production in one weekend"
                                  :unfair-advantage "Developer community and ecosystem"
                                  :customer-segments "Indie hackers, startup CTOs, side-project devs"
                                  :key-metrics "GitHub stars, npm downloads, WAU"
                                  :channels "Dev.to, HN, Twitter, GitHub"
                                  :cost-structure "Open source maintenance, docs, community"
                                  :revenue-streams "Pro features, consulting, enterprise support"}}})

;; ============================================================================
;; Template card component
;; ============================================================================

(defn template-card
  "Renders a clickable template card with icon, name, description, and tags."
  [{:keys [key icon name description tags on-select]}]
  (dom/div {:key (str key)
            :className "wisdom-template-card"
            :role "button"
            :tabIndex 0
            :onClick #(when on-select (on-select key))
            :onKeyDown (fn [e]
                         (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                           (.preventDefault e)
                           (when on-select (on-select key))))}
    (dom/div :.wisdom-template-icon icon)
    (dom/div :.wisdom-template-body
      (dom/h4 :.wisdom-template-name name)
      (dom/p :.wisdom-template-desc
        (ui/extract-plain-text-from-markdown (or description "") 140))
      (when (seq tags)
        (dom/div :.wisdom-template-tags
          (for [tag tags]
            (dom/span {:key tag :className "wisdom-tag"} tag)))))))

;; ============================================================================
;; Category card component
;; ============================================================================

(defn category-card [{:keys [icon label description count category on-select]}]
  (let [key-id (or label
                   (when category (str category))
                   (str "category-" (hash (or description ""))))]
    (dom/div {:key key-id
             :className "wisdom-category-card"
             :role "button"
             :tabIndex 0
             :onClick #(when on-select (on-select label))
             :onKeyDown (fn [e]
                          (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                            (.preventDefault e)
                            (when on-select (on-select label))))}
    (dom/div :.wisdom-category-icon icon)
    (dom/div :.wisdom-category-body
      (dom/h4 label)
      (dom/p (ui/extract-plain-text-from-markdown description 120)))
    (dom/div :.wisdom-category-count
      (dom/span :.wisdom-count-value (str count))
      (dom/span :.wisdom-count-label "insights")))))

;; ============================================================================
;; Contextual Wisdom Tip Card
;; ============================================================================

(def contextual-wisdom-cards
  "Contextual wisdom cards for each phase of the product flywheel."
  {:empathy
   [{:icon "👁"  :title "Observe First"        :description "Start by observing real users in their natural context before forming hypotheses."}
    {:icon "🔍" :title "Find Contradictions"   :description "Look for gaps between what people say and what they actually do -- that is where opportunities hide."}
    {:icon "💬" :title "Listen to Non-Users"   :description "Interview people who chose NOT to use your solution. Their reasons reveal hidden barriers."}
    {:icon "🎭" :title "Emotional Jobs"        :description "Beyond functional needs, understand the emotional and social jobs your users are trying to fulfill."}]
   :valueprop
   [{:icon "⚖"  :title "Jobs Before Features"  :description "Start with customer jobs-to-be-done, not your product features. Features follow from validated jobs."}
    {:icon "🔥" :title "Pain Severity Ranking"  :description "Rank pains by severity and frequency. A great pain reliever beats a nice-to-have gain creator."}
    {:icon "🎯" :title "One Killer Value"       :description "Focus on ONE compelling value proposition rather than a laundry list. Clarity beats comprehensiveness."}
    {:icon "🔗" :title "Fit Score"              :description "Map each pain reliever to a specific customer pain. No match? Cut the feature."}]
   :mvp
   [{:icon "✂"  :title "Cut Ruthlessly"        :description "Cut features until it hurts, then cut one more. The best MVPs are embarrassingly simple."}
    {:icon "👤" :title "One User, One Problem"  :description "Focus on ONE user persona, ONE core problem, and ONE elegant solution. Expand after validation."}
    {:icon "📏" :title "Define Success First"   :description "Set your success metrics BEFORE you build. Without a target, you cannot know if you hit it."}
    {:icon "🧪" :title "Test the Riskiest Bit"  :description "Identify your riskiest assumption and design the MVP to test that specific assumption first."}]
   :canvas
   [{:icon "🧩" :title "Problem-Customer First" :description "Fill in Problem and Customer Segments before anything else. Everything flows from there."}
    {:icon "💎" :title "Unfair Advantage"       :description "The hardest box on the canvas. If you cannot fill it, keep iterating until you find something defensible."}
    {:icon "📈" :title "Pick 1-3 Metrics"       :description "Key Metrics should be 1-3 numbers that prove traction. Vanity metrics do not count."}
    {:icon "🔄" :title "Canvas as Conversation"  :description "Revisit your canvas every 2 weeks. It is a living document that evolves with your learning."}]})

;; ============================================================================
;; Helpers
;; ============================================================================

(defn- normalize-template-key
  [k]
  (cond
    (keyword? k) k
    (string? k) (keyword (str/replace k #"^:" ""))
    :else (keyword (str k))))

(defn- parse-route
  [route]
  (let [route-vec (vec (or route []))
        idx (first (keep-indexed (fn [i v] (when (= v "project") i)) route-vec))
        encoded (when (and (number? idx) (>= idx 0)) (nth route-vec (inc idx) nil))
        project-id (when encoded (str/replace (str encoded) "~" "/"))
        stage (last route-vec)]
    {:project-id project-id
     :stage stage}))

(defn- stage->builder-type
  [stage]
  (case stage
    "empathy" :empathy-map
    "valueprop" :value-proposition
    "mvp" :mvp-planning
    "canvas" :lean-canvas
    nil))

(defn- stage->builder-label
  [stage]
  (case stage
    "empathy" "Empathy Map"
    "valueprop" "Value Proposition"
    "mvp" "MVP Planning"
    "canvas" "Lean Canvas"
    "Builder"))

(def ^:private lean-canvas-colors
  "Color mapping for lean canvas blocks (matches lean_canvas_builder.cljs)"
  {:problems "red"
   :customer-segments "blue"
   :uvp "purple"
   :solution "green"
   :channels "orange"
   :revenue-streams "green"
   :cost-structure "pink"
   :key-metrics "teal"
   :unfair-advantage "gold"})

(defn- template->builder-data
  "Convert template data into the correct data format for a given builder type."
  [builder-type template]
  (case builder-type
    :empathy-map
    (let [sections (:empathy-map template)]
      (when (seq sections)
        (into {}
              (for [[k v] sections]
                (let [id (str "wisdom-" (name k) "-" (random-uuid))]
                  [id {:item/id id
                       :item/section k
                       :item/content v
                       :item/color "yellow"
                       :item/position {:x 0 :y 0}}])))))

    :lean-canvas
    (let [blocks (:lean-canvas template)]
      (when (seq blocks)
        (into {}
              (for [[k v] blocks]
                (let [id (str "wisdom-" (name k) "-" (random-uuid))]
                  [id {:item/id id
                       :item/section k
                       :item/content v
                       :item/color (get lean-canvas-colors k "yellow")
                       :item/position {:x 0 :y 0}}])))))

    :value-proposition
    (let [sections (:value-proposition template)]
      (when (seq sections)
        (vec (for [[k v] sections]
               {:section-key k
                :response v
                :completed-at (js/Date.now)}))))

    :mvp-planning
    (let [sections (:mvp-planning template)]
      (when (seq sections)
        (vec (for [[k v] sections]
               {:section-key k
                :response v
                :completed-at (js/Date.now)}))))

    nil))

(def ^:private all-builder-types
  "All 4 builder types with their session-id prefixes"
  [{:type :empathy-map       :prefix "empathy-"}
   {:type :value-proposition :prefix "valueprop-"}
   {:type :mvp-planning      :prefix "mvp-"}
   {:type :lean-canvas       :prefix "canvas-"}])

(defn- inject-template-all-builders!
  "Save template data across all 4 builders for a project."
  [project-id template-data]
  (let [results (doall
                  (for [{:keys [type prefix]} all-builder-types
                        :let [data (template->builder-data type template-data)
                              session-id (str prefix project-id)]
                        :when (seq data)]
                    (do
                      (ws/save-builder-data! project-id session-id type data)
                      (ws/merge-builder-data-into-state! type data)
                      type)))]
    (count results)))

(def builder-labels
  "Human-readable labels for builder types"
  {:empathy-map "Empathy Map"
   :value-proposition "Value Proposition"
   :mvp-planning "MVP Planning"
   :lean-canvas "Lean Canvas"})

;; ============================================================================
;; Wisdom Page Component
;; ============================================================================

(defsc WisdomPage
  [this props]
  {:query         [:page/id :ui/dummy]
   :ident         (fn [] [:page/id :wisdom])
   :initial-state (fn [_] {:page/id :wisdom
                            :ui/dummy nil})
   :route-segment ["wisdom"]
   :initLocalState (fn [_] {:drawer/open? false
                             :drawer/state {}
                             :category-drawer/open? false
                             :category-drawer/state {}
                             :tip-drawer/open? false
                             :tip-drawer/state {}
                             :resize/width nil
                             :resize/active? false})
   :will-enter    (fn [_ _] (dr/route-immediate [:page/id :wisdom]))
   :componentDidMount (fn [this]
                         (let [state-atom @ws/app-state-atom
                               state (when state-atom @state-atom)]
                           (when (and state
                                      (not (get-in state [:content/generated :templates]))
                                      (not (get-in state [:content/loading? :templates])))
                             (ws/request-content! :templates))
                           ;; Always request real learning categories from backend (fast, no ECA)
                           ;; This silently updates cached/fallback data with real counts
                           (when (and state
                                      (not (get state :learning/categories-loading?)))
                             (ws/request-learning-categories!))))}
   (let [state-atom @ws/app-state-atom
        state (when state-atom @state-atom)
        eca-templates (when state (get-in state [:content/generated :templates]))
        templates-loading? (when state (get-in state [:content/loading? :templates]))
        templates (if (seq eca-templates) eca-templates fallback-templates)
        real-categories (when state (get state :learning/categories))
        categories-loading? (when state (get state :learning/categories-loading?))
        categories (if (seq real-categories) real-categories fallback-learning-categories)
        ;; Only show "Loading from AI..." when we have no content at all (no cache, no ECA response)
        ;; Once we have content (cached or fallback), the badge is hidden -- ECA silently replaces in background
        templates-show-loading? (and templates-loading? (not (seq eca-templates)))
        categories-show-loading? (and categories-loading? (not (seq real-categories))
                                      (not (seq fallback-learning-categories)))
        current-route (or (get-in state [:ui/current-route]) [])
        route-info (parse-route current-route)
        stage (:stage route-info)
        builder-type (or (stage->builder-type stage) :empathy-map)
        wisdom-phase (case builder-type
                       :empathy-map :empathy
                       :value-proposition :valueprop
                       :mvp-planning :mvp
                       :lean-canvas :canvas
                       :empathy)
        builder-label (or (get builder-labels builder-type)
                          (stage->builder-label stage))
        route-project-id (:project-id route-info)
        ws-project (get state :workspace/project)
        project-id (or route-project-id (:project/id ws-project))
        template-store (get-in state [:wisdom/template])
        drawer-open? (boolean (comp/get-state this :drawer/open?))
        drawer-state (or (comp/get-state this :drawer/state) {})
        tip-drawer-open? (boolean (comp/get-state this :tip-drawer/open?))
        tip-drawer-state (or (comp/get-state this :tip-drawer/state) {})
        resize-width (comp/get-state this :resize/width)
        resize-active? (boolean (comp/get-state this :resize/active?))
        wisdom-cards (get contextual-wisdom-cards wisdom-phase)]
    (dom/div {:className "wisdom-page"}
      ;; Page Header
      (dom/div :.wisdom-page-header
        (dom/h1 "Wisdom")
        (dom/p :.wisdom-subtitle
          "Templates, insights, and patterns to accelerate your product thinking."))

      ;; ── Templates Section ──
      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Templates")
          (dom/p :.wisdom-section-desc "Start with a proven framework for your product type.")
          (when templates-show-loading?
            (dom/span :.wisdom-loading-badge "Loading from AI...")))
        (if (seq templates)
          (dom/div {:className "wisdom-template-grid"}
            (for [t templates]
              (template-card (assoc t :on-select
                                    (fn [k]
                                      (let [nk (normalize-template-key k)]
                                        (when-not (get template-store nk)
                                          (ws/request-wisdom-template! nk)))
                                      (comp/set-state! this
                                        {:drawer/open? true
                                         :drawer/state {:template-name (:name t)
                                                        :template-key (normalize-template-key k)}
                                         :resize/width (get-drawer-width :template)}))))))
          ;; Empty state for templates
          (when-not templates-show-loading?
            (dom/div :.wisdom-empty-state
              (dom/div :.wisdom-empty-icon "📭")
              (dom/p "No templates available yet. Connect ECA for AI-generated templates.")))))

      ;; ── Learning Patterns Section ──
      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Learning Patterns")
          (dom/p :.wisdom-section-desc "Insights discovered across your projects.")
          (when categories-show-loading?
            (dom/span :.wisdom-loading-badge "Loading...")))
        (if (seq categories)
          (dom/div {:className "wisdom-category-grid"}
            (for [c categories]
              (category-card (assoc c :on-select
                                    (fn [label]
                                      (let [cat (:category c)
                                            ;; Three-layer lookup: live state > localStorage cache > defaults
                                            cached (or (when state (get-in state [:learning/category-insights cat]))
                                                       (when state (get-in state [:learning/category-insights-cache cat]))
                                                       (get default-category-insights cat))]
                                        ;; Pre-fill insights immediately if we have any source
                                        (when (and cached (nil? (when state (get-in state [:learning/category-insights cat]))))
                                          (when-let [sa @ws/app-state-atom]
                                            (swap! sa assoc-in [:learning/category-insights cat] cached)))
                                        ;; Always request fresh data from backend (fast, no ECA)
                                        (ws/request-category-insights! cat)
                                        (comp/set-state! this
                                          {:category-drawer/open? true
                                           :category-drawer/state {:category cat
                                                                   :label label
                                                                   :description (:description c)
                                                                   :count (:count c)}
                                           :resize/width (get-drawer-width :category)})))))))
          (when-not categories-show-loading?
            (dom/div :.wisdom-empty-state
              (dom/div :.wisdom-empty-icon "📚")
              (dom/p "Complete more projects to see patterns emerge.")))))

      ;; ── Contextual Wisdom Section ──
      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Contextual Wisdom")
          (dom/p :.wisdom-section-desc (str "Guidance for the " builder-label " phase.")))
        (dom/div {:className "wisdom-tips-grid"}
          (for [{:keys [icon title description] :as tip} wisdom-cards]
            (dom/div {:key title
                      :className "wisdom-tip-card"
                      :role "button"
                      :tabIndex 0
                      :onClick (fn [_]
                                 ;; Show drawer immediately with cached/default content
                                 ;; Then fire async ECA refresh in background
                                 (let [cache-key [wisdom-phase title]
                                       cached (when state
                                                (get-in state [:tip-detail/cache cache-key]))]
                                   ;; If we have cached ECA content, show it instantly
                                   (when (and state-atom (seq cached))
                                     (swap! state-atom
                                            assoc-in [:tip-detail/content cache-key] cached))
                                   ;; Open the drawer
                                   (comp/set-state! this
                                     {:tip-drawer/open? true
                                      :tip-drawer/state {:icon icon
                                                         :title title
                                                         :description description
                                                         :phase wisdom-phase}
                                      :resize/width (get-drawer-width :tip)})
                                   ;; Fire ECA enrichment (silent if cache exists)
                                   (when project-id
                                     (ws/request-tip-detail!
                                      project-id wisdom-phase title description
                                      (when (seq cached) {:silent? true})))))
                      :onKeyDown (fn [e]
                                    (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                                      (.preventDefault e)
                                      (let [cache-key [wisdom-phase title]
                                            cached (when state
                                                     (get-in state [:tip-detail/cache cache-key]))]
                                        (when (and state-atom (seq cached))
                                          (swap! state-atom
                                                 assoc-in [:tip-detail/content cache-key] cached))
                                        (comp/set-state! this
                                          {:tip-drawer/open? true
                                           :tip-drawer/state {:icon icon
                                                              :title title
                                                              :description description
                                                              :phase wisdom-phase}
                                           :resize/width (get-drawer-width :tip)})
                                        (when project-id
                                          (ws/request-tip-detail!
                                           project-id wisdom-phase title description
                                           (when (seq cached) {:silent? true}))))))}

              (dom/div :.wisdom-tip-icon icon)
              (dom/h4 title)
              (dom/p description))))

)

      ;; ── Template Drawer ──
      (when drawer-open?
        (let [{:keys [template-name template-key]} drawer-state
              template-data (or (get template-store template-key)
                                (get fallback-template-data template-key))
              has-template? (some? template-data)
              can-apply? (and project-id has-template?)
              success? (comp/get-state this :drawer/success?)
              dw (clamp-drawer-width (or resize-width default-drawer-width))]
          (dom/div :.wisdom-drawer-backdrop
            {:onClick #(comp/set-state! this {:drawer/open? false :drawer/success? false})}
            (dom/div {:className (str "wisdom-drawer" (when resize-active? " wisdom-drawer-resizing"))
                      :style {:width (str dw "px")}
                      :onClick #(.stopPropagation %)}
              (drawer-resize-handle this :template dw)
              (dom/div :.wisdom-drawer-header
                (dom/div
                  (dom/h3 (or template-name "Wisdom"))
                  (dom/p "Pre-fill all 4 builders with this template"))
                (dom/button {:className "btn btn-secondary"
                             :onClick #(comp/set-state! this {:drawer/open? false :drawer/success? false})}
                            "Close"))

              (when success?
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-success"}
                  (dom/span "Done! All builders pre-filled. Taking you to your project...")))

              (when (and (not success?) (not has-template?))
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                  (dom/span "Loading template data...")))

              (when (and (not success?) has-template? (not project-id))
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                  (dom/span "Open or create a project first to apply templates.")))

              ;; Template preview
              (when (and has-template? (not success?))
                (dom/div :.wisdom-drawer-body
                  (dom/p :.wisdom-drawer-subtitle "TEMPLATE PREVIEW")
                  (dom/div :.wisdom-drawer-preview-grid
                    (for [[section-key section-label]
                          [[:empathy-map "Empathy Map"]
                           [:value-proposition "Value Proposition"]
                           [:mvp-planning "MVP Planning"]
                           [:lean-canvas "Lean Canvas"]]]
                      (let [section-data (get template-data section-key)]
                        (when (seq section-data)
                          (dom/div {:key (name section-key) :className "wisdom-preview-section"}
                            (dom/h4 section-label)
                            (dom/div :.wisdom-preview-fields
                              (for [[fk fv] (take 3 section-data)]
                                (dom/div {:key (name fk) :className "wisdom-preview-field"}
                                  (dom/span :.wisdom-preview-label (str/capitalize (str/replace (name fk) #"-" " ")))
                                  (dom/span :.wisdom-preview-value (subs (str fv) 0 (min 80 (count (str fv)))))))))))))))

              (dom/div :.wisdom-drawer-actions
                (dom/button
                  {:className (str "btn btn-primary" (when (not can-apply?) " btn-disabled"))
                   :disabled (not can-apply?)
                   :onClick (fn [_]
                              (when can-apply?
                                (let [saved-count (inject-template-all-builders! project-id template-data)
                                      encoded-id (str/replace (str project-id) "/" "~")]
                                  (js/console.log "Injected template into" saved-count "builders for project" project-id)
                                  (ws/request-learning-save-examples!
                                    {:project-id project-id
                                     :label (or template-name "Wisdom")
                                     :template-key template-key
                                     :builder-type :empathy-map
                                     :session-id (str "empathy-" project-id)
                                     :data {}})
                                  (comp/set-state! this {:drawer/success? true})
                                  (js/setTimeout
                                    (fn []
                                      (comp/set-state! this {:drawer/open? false :drawer/success? false})
                                      (when-let [nav @ws/navigate-callback]
                                        (nav ["project" encoded-id])))
                                    1500))))}
                  (if can-apply?
                    "Apply Template to All Builders"
                    (if (not project-id)
                      "Open a Project First"
                      "Loading..."))))))))

      ;; ── Category Drawer (Learning Patterns) ──
      (let [category-drawer-open? (boolean (comp/get-state this :category-drawer/open?))
            category-drawer-state (or (comp/get-state this :category-drawer/state) {})]
        (when category-drawer-open?
          (let [{:keys [label description category count]} category-drawer-state
                dw (clamp-drawer-width (or resize-width default-drawer-width))
                insights (when state (get-in state [:learning/category-insights category]))
                insights-loading? (when state (get-in state [:learning/category-insights-loading? category]))]
            (dom/div :.wisdom-drawer-backdrop
              {:onClick #(comp/set-state! this {:category-drawer/open? false})}
              (dom/div {:className (str "wisdom-drawer" (when resize-active? " wisdom-drawer-resizing"))
                        :style {:width (str dw "px")}
                        :onClick #(.stopPropagation %)}
                (drawer-resize-handle this :category dw)
                (dom/div :.wisdom-drawer-header
                  (dom/div
                    (dom/h3 (or label "Learning Pattern"))
                    (dom/p (str (or count 0) " insights in " (or category "this category"))))
                  (dom/button {:className "btn btn-secondary"
                               :onClick #(comp/set-state! this {:category-drawer/open? false})}
                              "Close"))

                (dom/div :.wisdom-drawer-body
                  ;; Category description
                  (when (seq description)
                    (dom/div {:className "category-drawer-description"}
                      (dom/p description)))

                  ;; Insights list
                  (cond
                    ;; Loading state -- only show when no insights at all (no cache, no defaults)
                    (and insights-loading? (not (seq insights)))
                    (dom/div {:className "category-drawer-loading"}
                      (dom/span "Loading insights..."))

                    ;; Has real insights
                    (seq insights)
                    (dom/div {:className "category-drawer-insights"}
                      (for [insight insights]
                        (let [insight-id (or (:id insight) (str (hash insight)))]
                          (dom/div {:key insight-id
                                    :className "category-insight-card"}
                            (dom/div {:className "category-insight-header"}
                              (dom/h4 (or (:title insight) "Untitled Insight"))
                              (when (:created insight)
                                (dom/span {:className "category-insight-date"}
                                  (let [created (:created insight)]
                                    (if (> (count created) 10)
                                      (subs created 0 10)
                                      created)))))
                            (when (seq (:insights insight))
                              (dom/ul {:className "category-insight-points"}
                                (for [[idx point] (map-indexed vector (:insights insight))]
                                  (dom/li {:key idx} point))))
                            (when (seq (:tags insight))
                              (dom/div {:className "category-insight-tags"}
                                (for [tag (:tags insight)]
                                  (dom/span {:key tag :className "category-insight-tag"} tag))))
                            (when (:confidence insight)
                              (dom/div {:className "category-insight-meta"}
                                (dom/span (str "Confidence: " (:confidence insight) "/5"))
                                (when (pos? (or (:applied-count insight) 0))
                                  (dom/span (str "Applied " (:applied-count insight) " times")))))))))

                    ;; No insights found
                    :else
                    (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                      (dom/span "No insights recorded yet for this category. Insights are captured as you work through builders and apply templates."))))

                (dom/div :.wisdom-drawer-footer
                  (dom/button {:className "btn btn-primary btn-sm"
                               :onClick #(comp/set-state! this {:category-drawer/open? false})}
                              "Got it")))))))

      ;; ── Tip Drawer (Contextual Wisdom) ──
      (when tip-drawer-open?
        (let [{:keys [icon title description phase]} tip-drawer-state
              cache-key [phase title]
              ;; ECA-enriched content (live streaming or cached)
              eca-content (when state (get-in state [:tip-detail/content cache-key]))
              eca-loading? (when state (get-in state [:tip-detail/loading? cache-key]))
              eca-streaming? (when state (get-in state [:tip-detail/streaming? cache-key]))
              has-eca-content? (and eca-content (seq eca-content))
              ;; Related tips for fallback display
              phase-tips (get contextual-wisdom-cards phase)
              related-tips (remove #(= (:title %) title) phase-tips)
              dw (clamp-drawer-width (or resize-width default-drawer-width))]
          (dom/div :.wisdom-drawer-backdrop
            {:onClick #(comp/set-state! this {:tip-drawer/open? false})}
            (dom/div {:className (str "wisdom-drawer" (when resize-active? " wisdom-drawer-resizing"))
                      :style {:width (str dw "px")}
                      :onClick #(.stopPropagation %)}
              (drawer-resize-handle this :tip dw)
              (dom/div :.wisdom-drawer-header
                (dom/div
                  (dom/h3 (str icon " " title))
                  (dom/p (str (name phase) " phase guidance")))
                (dom/button {:className "btn btn-secondary"
                             :onClick #(comp/set-state! this {:tip-drawer/open? false})}
                            "Close"))

              (dom/div :.wisdom-drawer-body
                (cond
                  ;; ECA-enriched content available (cached or streaming)
                  has-eca-content?
                  (dom/div :.wisdom-tip-detail
                    (dom/div :.wisdom-drawer-markdown
                      (ui/render-markdown eca-content "wisdom-eca-text"))
                    (when eca-streaming?
                      (dom/span :.wisdom-typing-cursor)))

                  ;; Loading (no cache, waiting for first token)
                  eca-loading?
                  (dom/div :.wisdom-tip-detail
                    (dom/p :.wisdom-tip-detail-desc description)
                    (dom/div :.wisdom-loading
                      (dom/div :.wisdom-loading-dots
                        (dom/span :.dot)
                        (dom/span :.dot)
                        (dom/span :.dot))
                      (dom/span "Personalizing this tip...")))

                  ;; Fallback: static content (no project-id or ECA unavailable)
                  :else
                  (dom/div :.wisdom-tip-detail
                    (dom/p :.wisdom-tip-detail-desc description)
                    (when (seq related-tips)
                      (dom/div :.wisdom-related-tips
                        (dom/h4 "Related Tips")
                        (for [rt related-tips]
                          (dom/div {:key (:title rt) :className "wisdom-related-tip"}
                            (dom/span :.wisdom-related-icon (:icon rt))
                            (dom/div
                              (dom/strong (:title rt))
                              (dom/p (:description rt))))))))))

              (dom/div :.wisdom-drawer-footer
                (dom/div {:className "insight-meta"}
                  (dom/span {:className "insight-source"} "Phase: ")
                  (dom/span {:className "insight-files"} (str/capitalize (name phase))))
                (dom/button {:className "btn btn-primary btn-sm"
                             :onClick #(comp/set-state! this {:tip-drawer/open? false})}
                            "Got it")))))))))

(def ui-wisdom-page (comp/factory WisdomPage))
