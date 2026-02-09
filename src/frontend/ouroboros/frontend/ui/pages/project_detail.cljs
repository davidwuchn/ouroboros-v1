(ns ouroboros.frontend.ui.pages.project-detail
  "Project overview page - shows flywheel progress and guides next step"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.ui.components :as ui]))

;; Project IDs contain "/" (e.g. "demo-user/project-name-123")
;; which breaks URL routing. Encode/decode for safe URL use.
(defn encode-project-id
  "Replace / with ~ for safe URL routing"
  [project-id]
  (str/replace (str project-id) "/" "~"))

(defn decode-project-id
  "Restore / from ~ in route params"
  [encoded-id]
  (str/replace (str encoded-id) "~" "/"))

;; ============================================================================
;; Flywheel Phase Cards
;; ============================================================================

(def flywheel-phases
  "The 4-phase product development flywheel with detailed guidance"
  [{:key :empathy
    :label "Empathy Map"
    :icon "🧠"
    :route "empathy"
    :step 1
    :tagline "Walk in their shoes"
    :description "Deeply understand your customer - what they think, feel, see, hear, say, and do. This is the foundation for everything."
    :what-you-build "A visual map of your customer's world: their persona, inner thoughts, external influences, behaviors, pains, and gains."
    :time-estimate "15-20 min"
    :outputs ["Customer persona" "Key pains and gains" "Behavioral insights"]}
   {:key :valueprop
    :label "Value Proposition"
    :icon "💎"
    :route "valueprop"
    :step 2
    :tagline "Connect needs to solution"
    :description "Map your product directly to customer needs. Show how you relieve their pains and create their gains."
    :what-you-build "A clear value proposition showing the fit between customer needs and your offering."
    :time-estimate "20-30 min"
    :outputs ["Customer jobs" "Pain relievers" "Gain creators" "Product definition"]}
   {:key :mvp
    :label "MVP Planning"
    :icon "🚀"
    :route "mvp"
    :step 3
    :tagline "Build the smallest thing that proves value"
    :description "Define what to build first. Focus on one problem, one user, one metric. Ruthlessly cut scope."
    :what-you-build "A focused MVP plan with must-have features, success metrics, timeline, and identified risks."
    :time-estimate "20-30 min"
    :outputs ["Core problem" "Must-have features" "Success metric" "Timeline"]}
   {:key :canvas
    :label "Lean Canvas"
    :icon "📊"
    :route "canvas"
    :step 4
    :tagline "Connect all the dots"
    :description "Complete your 1-page business model. Document problems, solution, metrics, channels, costs, and revenue."
    :what-you-build "A complete Lean Canvas business model that captures your key assumptions to test."
    :time-estimate "25-35 min"
    :outputs ["Business model" "Key metrics" "Revenue model" "Unfair advantage"]}])

(defn phase-card
  "Individual phase card showing status and what to expect"
  [{:keys [phase project-id on-navigate is-recommended?]}]
  (let [{:keys [key label icon route step tagline description
                what-you-build time-estimate outputs]} phase]
    (dom/div {:className (str "phase-card " (when is-recommended? "phase-recommended"))}
      (dom/div :.phase-card-header
        (dom/div :.phase-step-badge (str "Step " step))
        (dom/span :.phase-icon icon)
        (dom/h3 label)
        (when is-recommended?
          (dom/span :.phase-recommended-badge "Start Here")))
      (dom/p :.phase-tagline tagline)
      (dom/p :.phase-description description)
      (dom/div :.phase-details
        (dom/div :.phase-detail-item
          (dom/span :.detail-label "You'll build:")
          (dom/span :.detail-value what-you-build))
        (dom/div :.phase-detail-item
          (dom/span :.detail-label "Time:")
          (dom/span :.detail-value time-estimate))
        (dom/div :.phase-detail-item
          (dom/span :.detail-label "Outputs:")
          (dom/div :.phase-outputs
            (for [output outputs]
              (dom/span {:key output :className "phase-output-tag"} output)))))
      (dom/div :.phase-actions
        (ui/button
          {:on-click #(on-navigate route)
           :variant (if is-recommended? :primary :secondary)}
          (if is-recommended?
            (str "Start " label " →")
            (str "Open " label)))))))

;; ============================================================================
;; Session List Component
;; ============================================================================

(defsc SessionItem
  "Individual session item"
  [this {:session/keys [id type state updated-at]}]
  {:query [:session/id :session/type :session/state :session/updated-at]
   :ident :session/id}
  (dom/div :.session-item
           (dom/div :.session-info
                    (dom/span :.session-type (clojure.core/name type))
                    (dom/span :.session-state (clojure.core/name state)))
           (dom/div :.session-meta
                    (dom/span :.session-updated updated-at))))

(def ui-session-item (comp/factory SessionItem {:keyfn :session/id}))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectDetailPage
  "Project overview page - shows flywheel progress and guides next step"
  [this {:keys [project/id project/description project/status
                project/sessions] :as props}]
  {:query         [:project/id :project/name :project/description :project/status
                   {:project/sessions (comp/get-query SessionItem)}
                   [df/marker-table :project-detail]]
    :ident         (fn [] [:page/id :project-detail])
    :initial-state (fn [_] {})
    :route-segment ["project" :project-id]
   :will-enter    (fn [app {:keys [project-id]}]
                     (let [decoded-id (decode-project-id (or project-id ""))]
                      (dr/route-deferred [:page/id :project-detail]
                                         (fn []
                                           (df/load! app [:page/id :project-detail] ProjectDetailPage
                                                     {:marker :project-detail
                                                      :params {:project-id decoded-id}
                                                      :post-mutation `dr/target-ready
                                                      :post-mutation-params {:target [:page/id :project-detail]}})))))}

  (let [loading? (df/loading? (get props [df/marker-table :project-detail]))
        project-name (:project/name props)
        encoded-id (encode-project-id id)
        navigate-fn (fn [route]
                      (dr/change-route! this ["project" encoded-id route]))]
    (if loading?
      (dom/div :.loading "Loading project...")
      (dom/div :.project-detail-page
        ;; Header
        (dom/div :.project-header
          (dom/h1 project-name)
          (dom/span :.project-status-badge (clojure.core/name (or status :draft)))
          (when description
            (dom/p :.project-description description)))

        ;; Flywheel indicator at top
        (ui/flywheel-indicator
          {:current-step :empathy
           :project-id id
           :on-navigate navigate-fn})

        ;; Guidance message
        (dom/div :.project-guidance
          (dom/div :.guidance-icon "🎯")
          (dom/div :.guidance-content
            (dom/h2 "Your Product Development Journey")
            (dom/p "Follow the flywheel: Empathy → Value Prop → MVP → Lean Canvas. Each step builds on the last. Start with Empathy to understand your customer.")))

        ;; Phase Cards
        (dom/div :.phases-grid
          (for [phase flywheel-phases]
            (phase-card
              {:key (name (:key phase))
               :phase phase
               :project-id id
               :on-navigate navigate-fn
               :is-recommended? (= (:key phase) :empathy)})))

        ;; Active Sessions
        (when (seq sessions)
          (dom/div :.sessions-section
            (dom/h2 "Active Sessions")
            (dom/div :.sessions-list
              (map #(when (:session/id %) (ui-session-item %)) sessions))))

        ;; Navigation
        (dom/div :.project-actions
          (ui/button
            {:on-click #(dr/change-route! this ["projects"])
             :variant :secondary}
            "← Back to Projects"))))))
