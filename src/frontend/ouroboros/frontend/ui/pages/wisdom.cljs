(ns ouroboros.frontend.ui.pages.wisdom
  "Wisdom page - Templates, AI insights, learning patterns"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Static Template Data (client-side for now)
;; ============================================================================

(def templates
  [{:key :saas-b2b
    :name "SaaS B2B"
    :icon "💼"
    :description "Business-to-business software as a service. Recurring revenue, enterprise sales cycles."
    :tags ["recurring revenue" "enterprise" "subscription"]}
   {:key :marketplace
    :name "Marketplace"
    :icon "🏪"
    :description "Two-sided platform connecting buyers and sellers. Network effects and liquidity."
    :tags ["network effects" "supply/demand" "transactions"]}
   {:key :consumer-app
    :name "Consumer App"
    :icon "📱"
    :description "Direct-to-consumer mobile or web application. Growth loops and retention."
    :tags ["growth" "retention" "viral"]}
   {:key :api-platform
    :name "API / Developer Platform"
    :icon "🔌"
    :description "Developer tools and infrastructure. Self-serve onboarding, usage-based pricing."
    :tags ["developer" "self-serve" "usage-based"]}
   {:key :content-creator
    :name "Creator / Content"
    :icon "🎨"
    :description "Tools for content creators. Monetization, audience building, creative workflow."
    :tags ["creator economy" "content" "monetization"]}
   {:key :hardware-iot
    :name "Hardware / IoT"
    :icon "🔧"
    :description "Physical products with connected software. Manufacturing, firmware, support."
    :tags ["hardware" "firmware" "supply chain"]}])

(def learning-categories
  [{:category "customer-understanding"
    :icon "🧠"
    :label "Customer Understanding"
    :description "Insights about your target audience, their pains, gains, and jobs-to-be-done."
    :count 0}
   {:category "product-development"
    :icon "🚀"
    :label "Product Development"
    :description "Patterns in feature prioritization, MVP scope, and iteration cycles."
    :count 0}
   {:category "business-model"
    :icon "💼"
    :label "Business Model"
    :description "Revenue streams, cost structure, channels, and key partnerships."
    :count 0}
   {:category "competitive-landscape"
    :icon "🔍"
    :label "Competitive Landscape"
    :description "Differentiation, unfair advantages, and market positioning."
    :count 0}])

;; ============================================================================
;; Sub-components
;; ============================================================================

(defn template-card [{:keys [key name icon description tags on-select]}]
  (dom/div {:key (str key)
            :className "wisdom-template-card"
            :onClick #(when on-select (on-select key))}
    (dom/div :.wisdom-template-icon icon)
    (dom/div :.wisdom-template-body
      (dom/h4 :.wisdom-template-name name)
      (dom/p :.wisdom-template-desc description)
      (dom/div :.wisdom-template-tags
        (for [tag tags]
          (dom/span {:key tag :className "wisdom-tag"} tag))))))

(defn category-card [{:keys [icon label description count]}]
  (dom/div {:key label :className "wisdom-category-card"}
    (dom/div :.wisdom-category-icon icon)
    (dom/div :.wisdom-category-body
      (dom/h4 label)
      (dom/p description))
    (dom/div :.wisdom-category-count
      (dom/span :.wisdom-count-value (str count))
      (dom/span :.wisdom-count-label "insights"))))

;; ============================================================================
;; Wisdom Page
;; ============================================================================

(defsc WisdomPage
  [this props]
  {:query         []
   :ident         (fn [] [:page/id :wisdom])
   :initial-state (fn [_] {})
   :route-segment ["wisdom"]
   :will-enter    (fn [app _route-params]
                    (dr/route-immediate [:page/id :wisdom]))}

  (dom/div :.wisdom-page
    ;; Header
    (dom/div :.wisdom-page-header
      (dom/h1 "Wisdom")
      (dom/p :.wisdom-subtitle
        "Templates, insights, and patterns to accelerate your product thinking."))

    ;; Templates Section
    (dom/section :.wisdom-section
      (dom/div :.wisdom-section-header
        (dom/h2 "Templates")
        (dom/p :.wisdom-section-desc "Start with a proven framework for your product type."))
      (dom/div :.wisdom-template-grid
        (for [t templates]
          (template-card (assoc t :on-select
                           (fn [k] (js/console.log "Selected template:" (str k))))))))

    ;; Learning Patterns Section
    (dom/section :.wisdom-section
      (dom/div :.wisdom-section-header
        (dom/h2 "Learning Patterns")
        (dom/p :.wisdom-section-desc "Insights discovered across your projects."))
      (dom/div :.wisdom-category-grid
        (for [c learning-categories]
          (category-card c))))

    ;; Tips Section
    (dom/section :.wisdom-section
      (dom/div :.wisdom-section-header
        (dom/h2 "Quick Tips"))
      (dom/div :.wisdom-tips-grid
        (dom/div :.wisdom-tip-card
          (dom/div :.wisdom-tip-icon "💡")
          (dom/h4 "Start with Empathy")
          (dom/p "Always begin with understanding your customer. Use the Empathy Map builder to capture what they think, feel, say, and do."))
        (dom/div :.wisdom-tip-card
          (dom/div :.wisdom-tip-icon "🎯")
          (dom/h4 "Test Assumptions Early")
          (dom/p "Your Lean Canvas is full of hypotheses. Identify the riskiest assumption and design an experiment to validate it."))
        (dom/div :.wisdom-tip-card
          (dom/div :.wisdom-tip-icon "✂️")
          (dom/h4 "Scope Down Your MVP")
          (dom/p "The best MVPs are embarrassingly small. Cut features until it hurts, then cut one more."))
        (dom/div :.wisdom-tip-card
          (dom/div :.wisdom-tip-icon "🔄")
          (dom/h4 "Iterate Fast")
          (dom/p "Ship, measure, learn, repeat. Speed of iteration beats quality of iteration."))))))
