(ns ouroboros.frontend.ui.pages.project-detail
  "Project page - 4 builder cards in a 2x2 grid.
   Project info (name, status, flywheel nav) lives on the Dashboard now.
   This page is purely for launching builders."
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.websocket :as ws]))

;; Project IDs contain "/" (e.g. "davidwu/project-ouroboros-chat-1739012345678")
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
;; Builder Card Data
;; ============================================================================

(def builder-cards
  "The 4 builder phases displayed as cards"
  [{:key :empathy
    :label "Empathy Map"
    :icon "🧠"
    :route "empathy"
    :color "#8E24AA"
    :tagline "Walk in their shoes"
    :description "Understand your customer's pains, gains, thoughts, and feelings to build products they actually need."}
   {:key :valueprop
    :label "Value Proposition"
    :icon "💎"
    :route "valueprop"
    :color "#1565C0"
    :tagline "Connect needs to solution"
    :description "Map customer jobs, pains, and gains to your product's pain relievers and gain creators."}
   {:key :mvp
    :label "MVP Planning"
    :icon "🚀"
    :route "mvp"
    :color "#E65100"
    :tagline "Build the smallest thing that proves value"
    :description "Define the core problem, must-have features, and success metrics for your first release."}
   {:key :canvas
    :label "Lean Canvas"
    :icon "📊"
    :route "canvas"
    :color "#2E7D32"
    :tagline "Connect all the dots"
    :description "Capture your complete business model: problem, solution, metrics, channels, and revenue."}])

;; ============================================================================
;; Builder Card Component
;; ============================================================================

(defn- status-label
  "Get status display info from kanban board data"
  [board builder-type]
  (when board
    (let [columns (:columns board)
          all-cards (for [col columns
                          card (:cards col)]
                      card)
          cards (filter #(= (name builder-type) (name (:builder-type %))) all-cards)
          total (count cards)
          done (count (filter #(= "done" (name (:status %))) cards))]
      (cond
        (and (pos? total) (= done total)) {:text "Complete" :class "builder-status-done"}
        (and (pos? total) (pos? done))    {:text (str done "/" total " done") :class "builder-status-progress"}
        (pos? total)                      {:text "In Progress" :class "builder-status-progress"}
        :else                             nil))))

(defn builder-card
  "A single builder card for the 2x2 grid"
  [{:keys [card on-navigate board]}]
  (let [{:keys [key label icon route color tagline description]} card
        status (status-label board key)]
    (dom/div {:className "builder-card"
              :key (name key)
              :onClick #(on-navigate route)}
             (dom/div {:className "builder-card-icon-ring"
                       :style {:borderColor color :color color}}
                      icon)
             (dom/div :.builder-card-body
                      (dom/h3 :.builder-card-title label)
                      (dom/p :.builder-card-tagline tagline)
                      (dom/p :.builder-card-desc description))
             (dom/div :.builder-card-footer
                      (when status
                        (dom/span {:className (str "builder-card-status " (:class status))}
                                  (:text status)))
                      (dom/span {:className "builder-card-action"
                                 :style {:color color}}
                                (if (and status (= "builder-status-done" (:class status)))
                                  "Review"
                                  "Start"))))))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectDetailPage
  "Project page - clean 2x2 grid of builder cards.
   Project info has moved to the Dashboard."
  [this {:keys [project/id] :as props}]
  {:query         [:project/id :project/name
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
                                                      :post-mutation-params {:target [:page/id :project-detail]}})))))
   ;; Request Kanban board data on mount (not during render)
   :componentDidMount
   (fn [this]
     (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
           ws-project (get ws-state :workspace/project)
           effective-id (or (:project/id (comp/props this)) (:project/id ws-project))]
       (when (and effective-id
                  (not (get-in ws-state [:kanban/board effective-id])))
         (ws/request-kanban-board! effective-id))))}

  (let [loading? (df/loading? (get props [df/marker-table :project-detail]))
        ;; Fallback: read project from WS state if Pathom hasn't loaded yet
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        effective-id (or id (:project/id ws-project))
        project-name (or (:project/name props) (:project/name ws-project) "Project")
        encoded-id (encode-project-id effective-id)
        navigate-fn (fn [route]
                      (when effective-id
                        (dr/change-route! this ["project" encoded-id route])))
        ;; Kanban board for status indicators
        board (when effective-id
                (get-in ws-state [:kanban/board effective-id]))]
    (if (and loading? (not ws-project))
      (dom/div :.pd-loading
               (dom/div :.pd-loading-spinner)
               (dom/span "Loading project..."))
      (dom/div :.builders-page
               ;; Page header - just project name, minimal
               (dom/div :.builders-header
                        (dom/h1 :.builders-title project-name)
                        (dom/p :.builders-subtitle "Choose a builder to continue your product development journey."))
               ;; 2x2 builder grid
               (dom/div :.builders-grid
                        (for [card builder-cards]
                          (builder-card
                           {:key (name (:key card))
                            :card card
                            :on-navigate navigate-fn
                            :board board})))))))
