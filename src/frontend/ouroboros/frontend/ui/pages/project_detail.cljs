(ns ouroboros.frontend.ui.pages.project-detail
  "Project page - kanban board with 4 builder columns.
   Each column represents a builder phase, cards are the sections within."
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [ouroboros.frontend.websocket :as ws]))

(defn encode-project-id
  "Replace / with ~ for safe URL routing"
  [project-id]
  (str/replace (str project-id) "/" "~"))

(defn decode-project-id
  "Restore / from ~ in route params"
  [encoded-id]
  (str/replace (str encoded-id) "~" "/"))

;; ============================================================================
;; Builder Column Definitions
;; ============================================================================

(def builder-columns
  "The 4 builder phases as kanban columns, left to right.
   Sections are populated from the kanban board data."
  [{:key :empathy-map
    :route "empathy"
    :label "Empathy Map"
    :icon "🧠"
    :color "#8E24AA"
    :brief "Understand your customer deeply"}
   {:key :value-proposition
    :route "valueprop"
    :label "Value Prop"
    :icon "💎"
    :color "#1565C0"
    :brief "Map needs to your solution"}
   {:key :mvp-planning
    :route "mvp"
    :label "MVP"
    :icon "🚀"
    :color "#E65100"
    :brief "Define what to build first"}
   {:key :lean-canvas
    :route "canvas"
    :label "Lean Canvas"
    :icon "📊"
    :color "#2E7D32"
    :brief "Complete business model"}])

;; ============================================================================
;; Kanban Card
;; ============================================================================

(defn- status-icon [status]
  (case status
    :done "✓"
    :in-progress "●"
    :not-started "○"
    "○"))

(defn- status-class [status]
  (case status
    :done "kb-card-done"
    :in-progress "kb-card-active"
    :not-started "kb-card-pending"
    "kb-card-pending"))

(defn kanban-card
  "A single section card within a builder column"
  [{:keys [title icon description status note-count]}]
  (dom/div {:className (str "kb-card " (status-class status))}
   (dom/div :.kb-card-row
    (dom/span :.kb-card-icon icon)
    (dom/span :.kb-card-title title)
    (dom/span {:className (str "kb-card-status " (status-class status))}
              (status-icon status)))
   (dom/p :.kb-card-desc description)
   (when (and (= status :done) (pos? (or note-count 0)))
     (dom/span :.kb-card-notes (str note-count " note" (when (not= note-count 1) "s"))))))

;; ============================================================================
;; Kanban Column
;; ============================================================================

(defn- column-progress
  "Compute done/total for a builder column from board cards"
  [board builder-type]
  (when board
    (let [all-cards (mapcat :cards (:columns board))
          cards (filter #(= (name builder-type) (name (:builder-type %))) all-cards)
          total (count cards)
          done (count (filter #(= :done (:status %)) cards))]
      {:total total :done done})))

(defn kanban-column
  "A builder column in the kanban board"
  [{:keys [column board on-click]}]
  (let [{:keys [key label icon color brief route]} column
        {:keys [total done] :or {total 0 done 0}} (column-progress board key)
        all-cards (mapcat :cards (:columns board))
        section-cards (filter #(= (name key) (name (:builder-type %))) all-cards)
        pct (if (pos? total) (int (* 100 (/ done total))) 0)
        all-done? (and (pos? total) (= done total))]
    (dom/div {:className (str "kb-column" (when all-done? " kb-column-done"))
              :key (name key)}
     ;; Column header
     (dom/div {:className "kb-col-header"
               :style {:borderColor color}
               :onClick #(on-click route)}
      (dom/div :.kb-col-title-row
       (dom/span :.kb-col-icon icon)
       (dom/span :.kb-col-label label))
      (dom/p :.kb-col-brief brief)
      (dom/div :.kb-col-progress
       (dom/div :.kb-col-progress-bar
        (dom/div {:className "kb-col-progress-fill"
                  :style {:width (str pct "%")
                          :background color}}))
       (dom/span :.kb-col-progress-text (str done "/" total))))
     ;; Section cards
     (dom/div :.kb-col-cards
      (if (seq section-cards)
        (map-indexed (fn [idx card]
          (dom/div {:key (or (:id card) (str "card-" idx))}
           (kanban-card card)))
         section-cards)
        (dom/div :.kb-col-empty "No sections yet"))))))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectDetailPage
  "Project page - kanban board with 4 builder columns."
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
   :componentDidMount
   (fn [this]
     (let [ws-state (when-let [sa @ws/app-state-atom] @sa)
           ws-project (get ws-state :workspace/project)
           effective-id (or (:project/id (comp/props this)) (:project/id ws-project))]
       (when (and effective-id
                  (not (get-in ws-state [:kanban/board effective-id])))
         (ws/request-kanban-board! effective-id))))}

  (let [loading? (df/loading? (get props [df/marker-table :project-detail]))
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        effective-id (or id (:project/id ws-project))
        project-name (or (:project/name props) (:project/name ws-project) "Project")
        encoded-id (encode-project-id effective-id)
        navigate-fn (fn [route]
                      (when effective-id
                        (dr/change-route! this ["project" encoded-id route])))
        board (when effective-id
                (get-in ws-state [:kanban/board effective-id]))]
    (if (and loading? (not ws-project))
      (dom/div :.kb-loading
       (dom/div :.kb-loading-spinner)
       (dom/span "Loading project..."))
      (dom/div :.kb-page
       ;; Header
       (dom/div :.kb-header
        (dom/h1 :.kb-title project-name)
        (when-let [summary (:summary board)]
          (let [total (:total summary 0)
                done (:done summary 0)
                pct (if (pos? total) (int (* 100 (/ done total))) 0)]
            (dom/span :.kb-header-progress (str pct "% complete - " done "/" total " sections done")))))
       ;; Kanban board - 4 columns
        (dom/div :.kb-board
         (for [col builder-columns]
           (dom/div {:key (name (:key col))}
            (kanban-column
             {:column col
              :board board
              :on-click navigate-fn}))))))))
