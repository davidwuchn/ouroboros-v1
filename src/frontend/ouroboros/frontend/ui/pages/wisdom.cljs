(ns ouroboros.frontend.ui.pages.wisdom
  "Wisdom page - Templates, AI insights, learning patterns"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

(def fallback-templates
  [{:key :saas
    :name "SaaS Product"
    :icon "💼"
    :description "Software as a Service business model."
    :tags ["recurring revenue" "enterprise" "subscription"]}
   {:key :marketplace
    :name "Marketplace"
    :icon "🏪"
    :description "Two-sided platform connecting buyers and sellers."
    :tags ["network effects" "supply/demand" "transactions"]}
   {:key :mobile-app
    :name "Consumer App"
    :icon "📱"
   :description "Direct-to-consumer mobile or web application."
   :tags ["growth" "retention" "viral"]}
   {:key :developer-tool
    :name "Developer Tool"
    :icon "🛠"
    :description "Tool for software developers."
    :tags ["productivity" "CLI" "open source"]}])

(def fallback-learning-categories
  [{:category "customer-understanding"
    :icon "🧠"
    :label "Customer Understanding"
    :description ""
    :count 0}
   {:category "product-development"
    :icon "🚀"
    :label "Product Development"
    :description ""
    :count 0}
   {:category "business-model"
    :icon "💼"
    :label "Business Model"
    :description ""
    :count 0}
   {:category "competitive-landscape"
    :icon "🔍"
    :label "Competitive Landscape"
    :description ""
    :count 0}])

(def fallback-template-data
  "Local template builder data -- used when backend template data hasn't arrived.
   Mirrors the canvas-templates in wisdom.clj."
  {:saas {:name "SaaS Product"
          :empathy-map {:persona "Small business owner, 35-50, needs to streamline operations"
                        :think-feel "Worried about costs, wants reliable solution"
                        :hear "Other businesses using similar tools"
                        :see "Complex enterprise software, simple alternatives"
                        :say-do "Says 'I need something simple', trials multiple tools"
                        :pains-gains "Pains: Setup complexity, hidden costs. Gains: Time saved, peace of mind"}
          :value-proposition {:customer-job "Manage daily operations, track inventory, handle invoicing, and coordinate team tasks"
                              :pains "Wastes hours on manual data entry; existing tools are too complex and expensive"
                              :gains "Saves 10+ hours per week; single dashboard for everything"
                              :products "Cloud-based operations platform with inventory, invoicing, and task management"
                              :pain-relievers "One-click import from spreadsheets; guided setup wizard; transparent pricing"
                              :gain-creators "Real-time dashboard; automated reminders and alerts; mobile app for on-the-go"}
          :mvp-planning {:core-problem "Small business owners waste 10+ hours/week on manual operations across disconnected spreadsheets"
                         :target-user "Non-technical small business owner (10-50 employees) currently using spreadsheets"
                         :success-metric "50% reduction in time spent on admin tasks within first month"
                         :must-have-features "Dashboard overview; inventory tracking; basic invoicing; CSV import"
                         :nice-to-have "Team collaboration; mobile app; automated reports; QuickBooks integration"
                         :out-of-scope "Advanced analytics; AI predictions; multi-currency; custom workflows"
                         :timeline "Week 1-2: Dashboard + CSV import. Week 3-4: Inventory. Week 5-6: Invoicing. Week 7-8: Beta"
                         :risks "Users may not migrate from spreadsheets; onboarding friction; pricing sensitivity in SMB"}
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
                 :value-proposition {:customer-job "Sell handmade or curated products online, reach new customers, manage orders"
                                     :pains "Existing platforms take 15-30% fees; hard to stand out; no direct customer relationships"
                                     :gains "Keep most of earnings; build a recognizable brand; loyal repeat customers"
                                     :products "Low-fee marketplace with seller tools, storefront customization, and direct messaging"
                                     :pain-relievers "Only 5% transaction fee; seller analytics; direct customer messaging"
                                     :gain-creators "Custom storefront branding; featured seller program; community events"}
                 :mvp-planning {:core-problem "Independent sellers lose 15-30% of revenue to platform fees with no direct customer relationships"
                                :target-user "Side hustler selling handmade goods, currently on Etsy, earning $500-5000/month"
                                :success-metric "100 active sellers within 3 months; average seller saves 15% vs previous platform"
                                :must-have-features "Seller onboarding and listings; buyer search; secure checkout; order management"
                                :nice-to-have "Seller analytics; custom storefronts; review system; messaging"
                                :out-of-scope "Shipping logistics; international payments; wholesale/B2B; native mobile apps"
                                :timeline "Week 1-3: Seller onboarding + listings. Week 4-6: Buyer browse + search. Week 7-10: Checkout + beta"
                                :risks "Chicken-and-egg problem; trust and safety concerns; competing with established platforms"}
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
                :empathy-map {:persona "Young professional, 22-30, values convenience"
                              :think-feel "Wants quick wins, fears missing out"
                              :hear "Friend recommendations, app store reviews"
                              :see "Trending apps, influencers using products"
                              :say-do "Downloads quickly, abandons if not immediate value"
                              :pains-gains "Pains: Slow onboarding, too many notifications. Gains: Convenience, social status"}
                :value-proposition {:customer-job "Stay organized, track personal goals, and build healthy habits"
                                    :pains "Existing apps are bloated; too many notifications; hard to stay consistent"
                                    :gains "Feels in control of daily routine; visible progress; friends notice positive changes"
                                    :products "Minimalist habit tracking app with social accountability and streak rewards"
                                    :pain-relievers "Clean single-screen UI; smart notifications only when needed; 30-second daily check-in"
                                    :gain-creators "Visual streak calendar; shareable milestones; friend challenges"}
                :mvp-planning {:core-problem "Young professionals abandon habit apps within a week due to complexity and notification fatigue"
                               :target-user "Urban professional aged 22-30, has tried and abandoned 2+ habit apps"
                               :success-metric "40% D7 retention; average user completes daily check-in 5 out of 7 days"
                               :must-have-features "Habit creation (up to 5); daily check-in; streak tracking; 1 push notification/day"
                               :nice-to-have "Friend challenges; shareable milestones; habit templates; dark mode"
                               :out-of-scope "Web version; enterprise features; AI coaching; in-app purchases"
                               :timeline "Week 1-2: Core habit CRUD + check-in. Week 3-4: Streaks + notifications. Week 5-8: Beta launch"
                               :risks "Retention cliff after novelty; App Store delays; crowded habit-app space"}
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
                    :empathy-map {:persona "Software engineer, 25-40, values efficiency"
                                  :think-feel "Frustrated with slow workflows, wants to optimize"
                                  :hear "Hacker News, Twitter/X, tech podcasts"
                                  :see "New tools daily, hype cycles"
                                  :say-do "Tries new tools, contributes to OSS, writes blog posts"
                                  :pains-gains "Pains: Context switching, configuration hell. Gains: Flow state, productivity"}
                    :value-proposition {:customer-job "Write, test, and deploy code efficiently; maintain codebases; collaborate on PRs"
                                        :pains "Constant context switching between 5+ tools; hours lost to config; broken CI blocks deployment"
                                        :gains "Stays in flow state; ships features faster; codebase stays clean and maintainable"
                                        :products "Unified CLI combining linting, testing, building, and deploying in one interface"
                                        :pain-relievers "Single config file; auto-detects project type; works offline with instant feedback"
                                        :gain-creators "Built-in best practices; shareable team presets; one-command deploy with rollback"}
                    :mvp-planning {:core-problem "Developers waste 30+ min daily context-switching between fragmented build, test, and deploy tools"
                                   :target-user "Full-stack developer working on 2-3 projects, comfortable with CLI"
                                   :success-metric "500 GitHub stars in first month; 50% daily usage after 2 weeks"
                                   :must-have-features "Project auto-detection; unified test runner; build command; basic deploy"
                                   :nice-to-have "Plugin system; team config sharing; CI integration; VS Code extension"
                                   :out-of-scope "GUI/desktop app; project management; code editing; hosting"
                                   :timeline "Week 1-2: Detection + test runner. Week 3-4: Build + config. Week 5-8: Deploy + open source launch"
                                   :risks "Developers skeptical of 'yet another tool'; hard to support every framework; adoption inertia"}
                    :lean-canvas {:problems "Slow development cycles, tool fragmentation"
                                  :solution "Unified developer experience"
                                  :uvp "Ship 10x faster"
                                  :unfair-advantage "Open source community"
                                  :customer-segments "Individual developers, engineering teams"
                                  :key-metrics "Active users, GitHub stars, CLI installs"
                                  :channels "GitHub, Hacker News, conferences"
                                  :cost-structure "Engineering, cloud infrastructure"
                                  :revenue-streams "Enterprise licenses, support, cloud hosting"}}})

(defn template-card [{:keys [key name icon description tags on-select]}]
  (dom/div {:key (str key)
            :className "wisdom-template-card"
            :role "button"
            :tabIndex 0
            :onClick #(when on-select (on-select key))
            :onKeyDown (fn [e]
                         (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                           (when on-select (on-select key))))}
    (dom/div :.wisdom-template-icon icon)
    (dom/div :.wisdom-template-body
      (dom/h4 :.wisdom-template-name name)
      (dom/p :.wisdom-template-desc description)
      (dom/div :.wisdom-template-tags
        (for [tag tags]
          (dom/span {:key tag :className "wisdom-tag"} tag))))))

(defn category-card [{:keys [icon label description count on-select]}]
  (dom/div {:key label
            :className "wisdom-category-card"
            :role "button"
            :tabIndex 0
            :onClick #(when on-select (on-select label))
            :onKeyDown (fn [e]
                         (when (or (= "Enter" (.-key e)) (= " " (.-key e)))
                           (when on-select (on-select label))))}
    (dom/div :.wisdom-category-icon icon)
    (dom/div :.wisdom-category-body
      (dom/h4 label)
      (dom/p description))
    (dom/div :.wisdom-category-count
      (dom/span :.wisdom-count-value (str count))
      (dom/span :.wisdom-count-label "insights"))))

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
  "Convert template data into the correct data format for a given builder type.
   - Empathy Map / Lean Canvas: map of note-id -> note (sticky-note model)
   - Value Prop / MVP Planning: vector of response maps (form/response model)"
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
  "Save template data across all 4 builders for a project.
   Returns the count of builders that had data to save."
  [project-id template-data]
  (let [results (doall
                  (for [{:keys [type prefix]} all-builder-types
                        :let [data (template->builder-data type template-data)
                              session-id (str prefix project-id)]
                        :when (seq data)]
                    (do (ws/save-builder-data! project-id session-id type data)
                        type)))]
    (count results)))

(def builder-labels
  "Human-readable labels for builder types"
  {:empathy-map "Empathy Map"
   :value-proposition "Value Proposition"
   :mvp-planning "MVP Planning"
   :lean-canvas "Lean Canvas"})

(defsc WisdomPage
  [this props]
  {:query         [:page/id :ui/dummy]
   :ident         (fn [] [:page/id :wisdom])
   :initial-state (fn [_] {:page/id :wisdom
                           :ui/dummy nil})
   :route-segment ["wisdom"]
   :initLocalState (fn [_] {:drawer/open? false
                            :drawer/state {}})
   :will-enter    (fn [_ _] (dr/route-immediate [:page/id :wisdom]))
   :componentDidMount (fn [this]
                         ;; Request ECA content on mount, not during render
                         (let [state-atom @ws/app-state-atom
                               state (when state-atom @state-atom)]
                           (when (and state
                                      (not (get-in state [:content/generated :templates]))
                                      (not (get-in state [:content/loading? :templates])))
                             (ws/request-content! :templates))
                           (when (and state
                                      (not (get-in state [:content/generated :learning-categories]))
                                      (not (get-in state [:content/loading? :learning-categories])))
                             (ws/request-content! :learning-categories))))}
  (let [state-atom @ws/app-state-atom
        state (when state-atom @state-atom)
        eca-templates (when state (get-in state [:content/generated :templates]))
        templates-loading? (when state (get-in state [:content/loading? :templates]))
        templates (if (seq eca-templates) eca-templates fallback-templates)
        eca-categories (when state (get-in state [:content/generated :learning-categories]))
        categories-loading? (when state (get-in state [:content/loading? :learning-categories]))
        categories (if (seq eca-categories) eca-categories fallback-learning-categories)
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
        drawer-state (or (comp/get-state this :drawer/state) {})]
    (dom/div {:className "wisdom-page"}
      (dom/div :.wisdom-page-header
        (dom/h1 "Wisdom")
        (dom/p :.wisdom-subtitle
          "Templates, insights, and patterns to accelerate your product thinking."))
      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Templates")
          (dom/p :.wisdom-section-desc "Start with a proven framework for your product type.")
          (when templates-loading?
            (dom/span :.wisdom-loading-badge "Loading from AI...")))
        (dom/div {:className "wisdom-template-grid"}
          (for [t templates]
            (template-card (assoc t :on-select
                                  (fn [k]
                                    ;; Request template data from backend if not already loaded
                                    (let [nk (normalize-template-key k)]
                                      (when-not (get template-store nk)
                                        (ws/request-wisdom-template! nk)))
                                    (comp/set-state! this
                                      {:drawer/open? true
                                       :drawer/state {:template-name (:name t)
                                                      :template-key (normalize-template-key k)}})))))))

      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Learning Patterns")
          (dom/p :.wisdom-section-desc "Insights discovered across your projects.")
          (when categories-loading?
            (dom/span :.wisdom-loading-badge "Loading from AI...")))
        (dom/div {:className "wisdom-category-grid"}
          (for [c categories]
            (category-card c))))

      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Contextual Wisdom")
          (dom/p :.wisdom-section-desc (str "Guidance for the " builder-label " phase.")))
        (dom/div :.wisdom-panel-inline
          (ui/wisdom-panel-body {:phase wisdom-phase :project-id project-id})))

      (when drawer-open?
        (let [{:keys [template-name template-key]} drawer-state
              ;; Use backend template data if available, otherwise use local fallback
              template-data (or (get template-store template-key)
                                (get fallback-template-data template-key))
              has-template? (some? template-data)
              can-apply? (and project-id has-template?)
              success? (comp/get-state this :drawer/success?)]
          (dom/div :.wisdom-drawer-backdrop
            {:onClick #(comp/set-state! this {:drawer/open? false :drawer/success? false})}
            (dom/div :.wisdom-drawer
              {:onClick #(.stopPropagation %)}
              (dom/div :.wisdom-drawer-header
                (dom/div
                  (dom/h3 (or template-name "Wisdom"))
                  (dom/p "Pre-fill all 4 builders with this template"))
                (dom/button {:className "btn btn-secondary"
                             :onClick #(comp/set-state! this {:drawer/open? false :drawer/success? false})}
                            "Close"))

              ;; Success feedback
              (when success?
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-success"}
                  (dom/span "Done! All builders pre-filled. Taking you to your project...")))

              ;; Status messages when not ready
              (when (and (not success?) (not has-template?))
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                  (dom/span "Loading template data...")))

              (when (and (not success?) has-template? (not project-id))
                (dom/div {:className "wisdom-drawer-feedback wisdom-drawer-info"}
                  (dom/span "Waiting for project to load...")))

              (dom/div :.wisdom-drawer-actions
                (dom/button
                  {:className (str "btn btn-primary" (when (not can-apply?) " btn-disabled"))
                   :disabled (not can-apply?)
                   :onClick (fn [_]
                              (when can-apply?
                                (let [saved-count (inject-template-all-builders! project-id template-data)
                                      encoded-id (str/replace (str project-id) "/" "~")]
                                  (js/console.log "Injected template into" saved-count "builders for project" project-id)
                                  ;; Also save as learning example
                                  (ws/request-learning-save-examples!
                                    {:project-id project-id
                                     :label (or template-name "Wisdom")
                                     :template-key template-key
                                     :builder-type :empathy-map
                                     :session-id (str "empathy-" project-id)
                                     :data {}})
                                  ;; Show success then navigate to project
                                  (comp/set-state! this {:drawer/success? true})
                                  (js/setTimeout
                                    (fn []
                                      (comp/set-state! this {:drawer/open? false :drawer/success? false})
                                      ;; Navigate to the project page so user sees results
                                      (when-let [nav @ws/navigate-callback]
                                        (nav ["project" encoded-id])))
                                    1500))))}
                  "Apply Template to All Builders")))))))))

(def ui-wisdom-page (comp/factory WisdomPage))
