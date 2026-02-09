(ns ouroboros.frontend.ui.pages.wisdom
  "Wisdom page - Templates, AI insights, learning patterns"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [ouroboros.frontend.ui.components :as ui]
   [ouroboros.frontend.websocket :as ws]))

;; ============================================================================
;; Fallback Template Data (shown while ECA loads)
;; ============================================================================

(def fallback-templates
  "Default templates shown while ECA content loads"
  [{:key :saas-b2b
    :name "SaaS B2B"
    :icon "💼"
    :description "Business-to-business software as a service."
    :tags ["recurring revenue" "enterprise" "subscription"]}
   {:key :marketplace
    :name "Marketplace"
    :icon "🏪"
    :description "Two-sided platform connecting buyers and sellers."
    :tags ["network effects" "supply/demand" "transactions"]}
   {:key :consumer-app
    :name "Consumer App"
    :icon "📱"
    :description "Direct-to-consumer mobile or web application."
    :tags ["growth" "retention" "viral"]}
   {:key :api-platform
    :name "API / Developer Platform"
    :icon "🔌"
    :description "Developer tools and infrastructure."
    :tags ["developer" "self-serve" "usage-based"]}
   {:key :content-creator
    :name "Creator / Content"
    :icon "🎨"
    :description "Tools for content creators."
    :tags ["creator economy" "content" "monetization"]}
   {:key :hardware-iot
    :name "Hardware / IoT"
    :icon "🔧"
    :description "Physical products with connected software."
    :tags ["hardware" "firmware" "supply chain"]}])

(def fallback-learning-categories
  "Default categories shown while ECA content loads"
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

  (let [state-atom @ws/app-state-atom
        ;; ECA-generated templates
        eca-templates (when state-atom (get-in @state-atom [:content/generated :templates]))
        templates-loading? (when state-atom (get-in @state-atom [:content/loading? :templates]))
        templates (if (seq eca-templates) eca-templates fallback-templates)
        ;; ECA-generated learning categories
        eca-categories (when state-atom (get-in @state-atom [:content/generated :learning-categories]))
        categories-loading? (when state-atom (get-in @state-atom [:content/loading? :learning-categories]))
        categories (if (seq eca-categories) eca-categories fallback-learning-categories)]

    ;; Request ECA content on first load
    (when (and state-atom (not eca-templates) (not templates-loading?))
      (ws/request-content! :templates))
    (when (and state-atom (not eca-categories) (not categories-loading?))
      (ws/request-content! :learning-categories))

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
          (dom/p :.wisdom-section-desc "Start with a proven framework for your product type.")
          (when templates-loading?
            (dom/span :.wisdom-loading-badge "Loading from AI...")))
        (dom/div :.wisdom-template-grid
          (for [t templates]
            (template-card (assoc t :on-select
                             (fn [k] (js/console.log "Selected template:" (str k))))))))

      ;; Learning Patterns Section
      (dom/section :.wisdom-section
        (dom/div :.wisdom-section-header
          (dom/h2 "Learning Patterns")
          (dom/p :.wisdom-section-desc "Insights discovered across your projects.")
          (when categories-loading?
            (dom/span :.wisdom-loading-badge "Loading from AI...")))
        (dom/div :.wisdom-category-grid
          (for [c categories]
            (category-card c))))

      ;; Tips Section (ECA-powered with fallback)
      (let [wisdom-state (when state-atom (get-in @state-atom [:wisdom/id :global]))
            eca-content (:wisdom/content wisdom-state)
            eca-loading? (:wisdom/loading? wisdom-state)
            eca-streaming? (:wisdom/streaming? wisdom-state)
            has-eca-content? (and eca-content (seq eca-content))]
        ;; Auto-request tips from ECA on first load
        (when (and (not eca-loading?) (not has-eca-content?))
          (ws/request-wisdom! nil :general :tips))
        (dom/section :.wisdom-section
          (dom/div :.wisdom-section-header
            (dom/h2 "Quick Tips")
            (when has-eca-content?
              (dom/button
                {:className "btn btn-secondary btn-sm"
                 :onClick (fn [_]
                            (when state-atom
                              (swap! @ws/app-state-atom
                                     assoc-in [:wisdom/id :global :wisdom/content] ""))
                            (ws/request-wisdom! nil :general :tips))}
                "Refresh")))
          (if has-eca-content?
            ;; ECA-powered content
            (dom/div :.wisdom-eca-content
              (dom/div :.wisdom-eca-text eca-content)
              (when eca-streaming?
                (dom/span :.wisdom-streaming-indicator "...")))
            ;; Fallback static tips while ECA loads
            (dom/div :.wisdom-tips-grid
              (when eca-loading?
                (dom/div :.wisdom-loading
                  (dom/span :.wisdom-loading-icon "AI")
                  (dom/span "Generating personalized tips...")))
              (dom/div :.wisdom-tip-card
                (dom/div :.wisdom-tip-icon "...")
                (dom/h4 "Loading Tips")
                (dom/p "AI-powered tips are being generated. Please wait...")))))))))