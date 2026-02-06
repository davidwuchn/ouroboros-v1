(ns ouroboros.frontend.ui.pages.project-detail
  "Project detail page with builder selection"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.ui.components :as ui]))

;; ============================================================================
;; Builder Selection Component
;; ============================================================================

(def ^:private builder-types
  [{:key :empathy-map
    :name "Empathy Map"
    :description "Understand your customer's perspective"
    :icon "🧠"
    :route "empathy"
    :sections ["Persona" "Think & Feel" "Hear" "See" "Say & Do" "Pains" "Gains"]}
   {:key :value-proposition
    :name "Value Proposition"
    :description "Map your product to customer needs"
    :icon "💎"
    :route "valueprop"
    :sections ["Customer Jobs" "Pains" "Gains" "Products" "Pain Relievers" "Gain Creators"]}
   {:key :mvp-planning
    :name "MVP Planning"
    :description "Define your minimum viable product"
    :icon "🚀"
    :route "mvp"
    :sections ["Goal" "Success Metrics" "Features" "User Flow" "Assumptions" "Riskiest"]}
   {:key :lean-canvas
    :name "Lean Canvas"
    :description "Complete business model canvas"
    :icon "📊"
    :route "canvas"
    :sections ["Problems" "Solution" "UVP" "Unfair Advantage" "Customer Segments"
               "Key Metrics" "Channels" "Cost Structure" "Revenue Streams"]}])

(defsc BuilderCard
  "Card for selecting a builder type"
  [this {:keys [builder project-id]}]
  (let [{:keys [key name description icon sections route]} builder]
    (ui/card {:title (str icon " " name)
              :className (str "builder-card builder-" (name key))}
             (dom/div :.builder-description description)
             (dom/div :.builder-sections
                      (dom/span :.sections-label (str (count sections) " sections:"))
                      (dom/ul :.sections-list
                              (map #(dom/li {:key %} %) (take 4 sections))
                              (when (> (count sections) 4)
                                (dom/li (str "+" (- (count sections) 4) " more...")))))
             (dom/div :.builder-actions
                      (ui/button
                       {:on-click #(dr/change-route! this ["project" {:project-id project-id} route])
                        :variant :primary}
                       "Start Building")))))

(def ui-builder-card (comp/factory BuilderCard {:keyfn #(-> % :builder :key)}))

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
                    (dom/span :.session-type (name type))
                    (dom/span :.session-state (name state)))
           (dom/div :.session-meta
                    (dom/span :.session-updated updated-at))))

(def ui-session-item (comp/factory SessionItem {:keyfn :session/id}))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectDetailPage
  "Project detail page with builder selection"
  [this {:keys [project/id project/name project/description project/status
                project/sessions] :as props}]
  {:query         [:project/id :project/name :project/description :project/status
                   {:project/sessions (comp/get-query SessionItem)}
                   [df/marker-table :project-detail]]
   :ident         (fn [] [:page/id :project-detail])
   :route-segment ["project" :project-id]
   :will-enter    (fn [app {:keys [project-id]}]
                    (dr/route-deferred [:page/id :project-detail]
                                       (fn []
                                         (df/load! app [:page/id :project-detail] ProjectDetailPage
                                                   {:marker :project-detail
                                                    :params {:project-id project-id}
                                                    :post-mutation `dr/target-ready
                                                    :post-mutation-params {:target [:page/id :project-detail]}}))))}

  (let [loading? (df/loading? (get props [df/marker-table :project-detail]))]
    (if loading?
      (dom/div :.loading "Loading project...")
      (dom/div :.project-detail-page
        ;; Header
               (dom/div :.project-header
                        (dom/h1 name)
                        (dom/span :.project-status-badge (name status))
                        (when description
                          (dom/p :.project-description description)))

        ;; Builder Selection
               (dom/h2 "Choose a Builder")
               (dom/div :.builders-grid
                        (map #(ui-builder-card {:builder % :project-id id}) builder-types))

        ;; Active Sessions
               (when (seq sessions)
                 (dom/div :.sessions-section
                          (dom/h2 "Active Sessions")
                          (dom/div :.sessions-list
                                   (map ui-session-item sessions))))

        ;; Navigation
               (dom/div :.project-actions
                        (ui/button
                         {:on-click #(dr/change-route! this ["projects"])
                          :variant :secondary}
                         "← Back to Projects"))))))
