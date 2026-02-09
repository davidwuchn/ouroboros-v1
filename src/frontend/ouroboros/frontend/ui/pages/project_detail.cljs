(ns ouroboros.frontend.ui.pages.project-detail
  "Project overview page - shows flywheel progress and Kanban board"
  (:require
   [clojure.string :as str]
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]
   [com.fulcrologic.fulcro.dom :as dom]
   [com.fulcrologic.fulcro.routing.dynamic-routing :as dr]
   [com.fulcrologic.fulcro.data-fetch :as df]
   [com.fulcrologic.fulcro.application :as app]
   [ouroboros.frontend.ui.components :as ui]
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
;; Flywheel Phase Cards
;; ============================================================================

(def fallback-flywheel-phases
  "Structural flywheel phase data. Descriptive text is minimal --
   ECA provides rich, project-specific guidance via content/generate."
  [{:key :empathy
    :label "Empathy Map"
    :icon "🧠"
    :route "empathy"
    :step 1
    :tagline "Walk in their shoes"
    :description ""
    :what-you-build ""
    :time-estimate ""
    :outputs ["Customer persona" "Key pains and gains"]}
   {:key :valueprop
    :label "Value Proposition"
    :icon "💎"
    :route "valueprop"
    :step 2
    :tagline "Connect needs to solution"
    :description ""
    :what-you-build ""
    :time-estimate ""
    :outputs ["Customer jobs" "Pain relievers" "Gain creators"]}
   {:key :mvp
    :label "MVP Planning"
    :icon "🚀"
    :route "mvp"
    :step 3
    :tagline "Build the smallest thing that proves value"
    :description ""
    :what-you-build ""
    :time-estimate ""
    :outputs ["Core problem" "Must-have features" "Success metric"]}
   {:key :canvas
    :label "Lean Canvas"
    :icon "📊"
    :route "canvas"
    :step 4
    :tagline "Connect all the dots"
    :description ""
    :what-you-build ""
    :time-estimate ""
    :outputs ["Business model" "Key metrics" "Revenue model"]}])

(defn phase-card
  "Individual phase card showing status and what to expect.
   Merges ECA-generated descriptions when available."
  [{:keys [key phase eca-phase project-id on-navigate is-recommended?]}]
  (let [merged (merge phase eca-phase)
        {:keys [label icon route step tagline description
                what-you-build time-estimate outputs]} merged]
    (dom/div {:key key
              :className (str "phase-card " (when is-recommended? "phase-recommended"))}
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
;; Kanban Board Components
;; ============================================================================

(def ^:private builder-route-map
  "Map builder-type keywords to route segments"
  {:empathy-map "empathy"
   :value-proposition "valueprop"
   :mvp-planning "mvp"
   :lean-canvas "canvas"})

(def ^:private builder-phase-order
  "Ordered phases for the board layout"
  [{:type :empathy-map      :label "Empathy Map"        :icon "🧠" :color "#8E24AA" :route "empathy"
    :tagline "Understand your customer"}
   {:type :value-proposition :label "Value Proposition"  :icon "💎" :color "#1565C0" :route "valueprop"
    :tagline "Connect needs to solution"}
   {:type :mvp-planning      :label "MVP Planning"      :icon "🚀" :color "#E65100" :route "mvp"
    :tagline "Build the smallest thing that proves value"}
   {:type :lean-canvas        :label "Lean Canvas"       :icon "📊" :color "#2E7D32" :route "canvas"
    :tagline "Capture your complete business model"}])

(defn- status-icon [status]
  (case (keyword status)
    :done "✓"
    :in-progress "◐"
    :not-started "○"
    "○"))

(defn- status-class [status]
  (case (keyword status)
    :done "kb-status-done"
    :in-progress "kb-status-progress"
    :not-started "kb-status-todo"
    "kb-status-todo"))

(defn kanban-card
  "Individual Kanban card representing a builder section."
  [{:keys [key card on-navigate]}]
  (let [{:keys [id title icon builder-type description note-count
                has-data? status]} card
        route (get builder-route-map (keyword builder-type))]
    (dom/div {:key key
              :className (str "kb-card " (status-class status))
              :onClick (when on-navigate #(on-navigate route))}
             (dom/div :.kb-card-left
                      (dom/span {:className (str "kb-card-status " (status-class status))}
                                (status-icon status)))
             (dom/div :.kb-card-content
                      (dom/div :.kb-card-title-row
                               (dom/span :.kb-card-icon icon)
                               (dom/span :.kb-card-title title)
                               (when (and has-data? (pos? note-count))
                                 (dom/span :.kb-card-badge (str note-count))))
                      (dom/p :.kb-card-desc description)))))

(defn kanban-phase-group
  "A phase group showing the builder name, progress, and its section cards."
  [{:keys [key phase cards on-navigate]}]
  (let [{:keys [type label icon color route tagline]} phase
        total (count cards)
        done (count (filter #(= :done (keyword (:status %))) cards))
        in-progress (count (filter #(= :in-progress (keyword (:status %))) cards))
        pct (if (pos? total) (int (* 100 (/ done total))) 0)]
    (dom/div {:key key :className "kb-phase"}
      ;; Phase header
             (dom/div {:className "kb-phase-header" :style {:borderLeftColor color}}
                      (dom/div :.kb-phase-header-top
                               (dom/div :.kb-phase-title-row
                                        (dom/span :.kb-phase-icon icon)
                                        (dom/h3 :.kb-phase-title label))
                               (dom/div :.kb-phase-stats
                                        (when (pos? done)
                                          (dom/span :.kb-phase-stat-done (str done "/" total)))
                                        (when (and (zero? done) (pos? in-progress))
                                          (dom/span :.kb-phase-stat-progress (str in-progress " active")))
                                        (when (and (zero? done) (zero? in-progress))
                                          (dom/span :.kb-phase-stat-new "Ready"))))
                      (dom/p :.kb-phase-tagline tagline)
        ;; Mini progress bar
                      (dom/div :.kb-phase-progress
                               (dom/div {:className "kb-phase-progress-fill"
                                         :style {:width (str pct "%")
                                                 :backgroundColor color}})))
      ;; Section cards
             (dom/div :.kb-phase-cards
                      (for [[idx card] (map-indexed vector cards)]
                        (kanban-card {:key (or (:id card) (str (name (:type phase)) "-" idx))
                                      :card card
                                      :on-navigate on-navigate})))
      ;; Action button
             (dom/div :.kb-phase-action
                      (dom/button {:className "kb-phase-btn"
                                   :style {:color color :borderColor color}
                                   :onClick #(on-navigate route)}
                                  (cond
                                    (pos? done)        (str "Continue " label " →")
                                    (pos? in-progress) (str "Continue " label " →")
                                    :else              (str "Start " label " →")))))))

(defn kanban-board
  "Full Kanban board showing builder section progress grouped by phase.
   Props:
   - project-id: string
   - on-navigate: fn called with route segment"
  [{:keys [project-id on-navigate]}]
  (let [state-atom @ws/app-state-atom
        board (when state-atom (get-in @state-atom [:kanban/board project-id]))
        columns (:columns board)
        summary (:summary board)
        ;; Build a lookup: card-id -> card from all columns
        all-cards (when columns (into {} (for [col columns
                                               card (:cards col)]
                                           [(:id card) card])))
        ;; Group cards by builder-type
        cards-by-type (when all-cards
                        (group-by #(keyword (:builder-type %)) (vals all-cards)))]
    ;; Request board data if not loaded
    (when (and project-id (not board))
      (ws/request-kanban-board! project-id))
    (dom/div :.kb-board
      ;; Overall progress header
             (when summary
               (let [total (:total summary 0)
                     done (:done summary 0)
                     in-prog (:in-progress summary 0)
                     pct (if (pos? total) (int (* 100 (/ done total))) 0)]
                 (dom/div :.kb-header
                          (dom/div :.kb-header-stats
                                   (dom/div :.kb-stat
                                            (dom/span :.kb-stat-value (str done))
                                            (dom/span :.kb-stat-label "done"))
                                   (dom/div :.kb-stat
                                            (dom/span :.kb-stat-value (str in-prog))
                                            (dom/span :.kb-stat-label "active"))
                                   (dom/div :.kb-stat
                                            (dom/span :.kb-stat-value (str (- total done in-prog)))
                                            (dom/span :.kb-stat-label "remaining"))
                                   (dom/div :.kb-stat-pct
                                            (dom/span :.kb-stat-value (str pct "%"))
                                            (dom/span :.kb-stat-label "complete")))
                          (dom/div :.kb-header-bar
                                   (dom/div {:className "kb-header-bar-fill"
                                             :style {:width (str pct "%")}})))))
      ;; Phase groups
             (if cards-by-type
               (dom/div :.kb-phases
                        (for [phase builder-phase-order]
                          (let [cards (get cards-by-type (:type phase) [])]
                            (kanban-phase-group
                             {:key (name (:type phase))
                              :phase phase
                              :cards cards
                              :on-navigate on-navigate}))))
               (dom/div :.kb-loading
                        (dom/div :.kb-loading-spinner)
                        (dom/span "Loading board..."))))))

;; ============================================================================
;; Main Page
;; ============================================================================

(defsc ProjectDetailPage
  "Project overview page - shows flywheel progress and Kanban board with view toggle"
  [this {:keys [project/id project/description project/status
                project/sessions] :as props}]
  {:query         [:project/id :project/name :project/description :project/status
                   {:project/sessions (comp/get-query SessionItem)}
                   [df/marker-table :project-detail]]
    :ident         (fn [] [:page/id :project-detail])
    :initial-state (fn [_] {})
    :initLocalState (fn [_] {:active-view :kanban})
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
        ;; Fallback: read project from WS state if Pathom hasn't loaded yet
        ws-state (when-let [sa @ws/app-state-atom] @sa)
        ws-project (get ws-state :workspace/project)
        ;; Use Pathom data if available, fall back to WS-detected project
        effective-id (or id (:project/id ws-project))
        project-name (or (:project/name props) (:project/name ws-project) "Project")
        effective-desc (or description (:project/description ws-project))
        effective-status (or status (:project/status ws-project) :draft)
        encoded-id (encode-project-id effective-id)
        navigate-fn (fn [route]
                      (when effective-id
                        (dr/change-route! this ["project" encoded-id route])))
        ;; Get real flywheel progress from WS state
        progress (get-in ws-state [:flywheel/progress effective-id])
        current-step (or (when progress
                           (let [step (:current-step progress)]
                             (case step
                               :empathy-map :empathy
                               :value-proposition :valueprop
                               :mvp-planning :mvp
                               :lean-canvas :canvas
                               :empathy)))
                         :empathy)
        active-view (or (comp/get-state this :active-view) :kanban)
        ;; ECA-generated flywheel guide content
        eca-guide (get-in ws-state [:content/generated :flywheel-guide])
        eca-guide-loading? (get-in ws-state [:content/loading? :flywheel-guide])
        ;; Build phase lookup from ECA data (keyed by phase :key)
        eca-phases-map (when (seq eca-guide)
                         (into {} (map (fn [p] [(keyword (:key p)) p]) eca-guide)))]
    ;; Request flywheel progress from backend on load
    (when (and effective-id (not progress))
      (ws/request-flywheel-progress! effective-id))
    ;; Request ECA flywheel guide if not loaded
    (when (and effective-id (not eca-guide) (not eca-guide-loading?))
      (ws/request-content! :flywheel-guide :project-id effective-id))
    (if (and loading? (not ws-project))
      (dom/div :.pd-loading
               (dom/div :.pd-loading-spinner)
               (dom/span "Loading project..."))
      (dom/div :.pd-page
        ;; Compact header with project info + flywheel nav + view toggle
               (dom/div :.pd-header
                        (dom/div :.pd-header-row
                                 (dom/div :.pd-project-info
                                          (dom/h1 :.pd-project-name project-name)
                                          (dom/span {:className (str "pd-status pd-status-" (name effective-status))}
                                                    (name effective-status)))
                                 (dom/div :.pd-controls
              ;; View toggle
                                           (dom/div :.pd-view-toggle
                                                    (dom/button {:className (str "pd-toggle-btn"
                                                                                 (when (= active-view :kanban) " pd-toggle-active"))
                                                                 :onClick #(comp/set-state! this {:active-view :kanban})}
                                                                "Board")
                                                    (dom/button {:className (str "pd-toggle-btn"
                                                                                 (when (= active-view :flywheel) " pd-toggle-active"))
                                                                 :onClick #(comp/set-state! this {:active-view :flywheel})}
                                                                "Phases"))))
                        (when effective-desc
                          (dom/p :.pd-description effective-desc))
          ;; Flywheel nav - always visible as phase breadcrumb
                        (let [step-order {:empathy 0 :valueprop 1 :mvp 2 :canvas 3}
                              current-idx (get step-order current-step 0)]
                          (dom/div :.pd-flywheel-nav
                                   (for [[idx step] (map-indexed vector ui/flywheel-steps)]
                                     (let [is-current? (= (:key step) current-step)
                                           is-past? (< idx current-idx)
                                           step-cls (str "pd-fw-step"
                                                         (when is-current? " pd-fw-current")
                                                         (when is-past? " pd-fw-done"))]
                                       (dom/div {:key (name (:key step))}
                                                (when (> idx 0)
                                                  (dom/div {:className (str "pd-fw-connector"
                                                                            (when (or is-past? is-current?) " pd-fw-connector-done"))}))
                                                (dom/button {:className step-cls
                                                             :onClick #(navigate-fn (:route step))}
                                                            (dom/span :.pd-fw-icon (:icon step))
                                                            (dom/span :.pd-fw-label (:label step)))))))))

        ;; === Kanban View ===
               (when (= active-view :kanban)
                 (dom/div :.kanban-view
                          (kanban-board
                           {:project-id effective-id
                            :on-navigate navigate-fn})))

        ;; === Flywheel/Phases View ===
               (when (= active-view :flywheel)
                 (dom/div :.flywheel-view
            ;; Guidance message
                          (dom/div :.pd-guidance
                                   (dom/h2 :.pd-guidance-title "Product Development Journey")
                                   (if progress
                                     (dom/p :.pd-guidance-text
                                            (str "Progress: " (:completed-count progress) "/" (:total-phases progress)
                                                 " phases complete. "
                                                 (case current-step
                                                   :empathy "Start with Empathy to understand your customer."
                                                   :valueprop "Map your insights to a Value Proposition."
                                                   :mvp "Define what to build first in your MVP."
                                                   :canvas "Capture your complete business model."
                                                   "Keep going!")))
                                     (dom/p :.pd-guidance-text
                                            "Follow the flywheel: Empathy -> Value Prop -> MVP -> Lean Canvas. Each step builds on the last.")))

            ;; Phase Cards
                          (dom/div :.phases-grid
                                   (for [phase fallback-flywheel-phases]
                                     (phase-card
                                      {:key (name (:key phase))
                                       :phase phase
                                       :eca-phase (get eca-phases-map (:key phase))
                                       :project-id effective-id
                                       :on-navigate navigate-fn
                                       :is-recommended? (= (:key phase) current-step)})))))))))
