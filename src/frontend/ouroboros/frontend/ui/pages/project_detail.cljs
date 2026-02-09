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
  [{:keys [phase eca-phase project-id on-navigate is-recommended?]}]
  (let [merged (merge phase eca-phase)
        {:keys [key label icon route step tagline description
                what-you-build time-estimate outputs]} merged]
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
;; Kanban Board Components
;; ============================================================================

(def ^:private builder-route-map
  "Map builder-type keywords to route segments"
  {:empathy-map "empathy"
   :value-proposition "valueprop"
   :mvp-planning "mvp"
   :lean-canvas "canvas"})

(defn kanban-card
  "Individual Kanban card representing a builder section.
   Clicking navigates to the builder."
  [{:keys [card on-navigate]}]
  (let [{:keys [id title icon builder-type builder-label builder-color
                description note-count has-data?]} card
        route (get builder-route-map (keyword builder-type))]
    (dom/div {:className "kanban-card"
              :onClick (when on-navigate #(on-navigate route))
              :title (str builder-label " - " description)}
      ;; Builder color indicator
      (dom/div {:className "kanban-card-color-bar"
                :style {:backgroundColor builder-color}})
      (dom/div :.kanban-card-body
        (dom/div :.kanban-card-header
          (dom/span :.kanban-card-icon icon)
          (dom/span :.kanban-card-title title))
        (dom/div :.kanban-card-meta
          (dom/span {:className "kanban-card-builder-tag"
                     :style {:color builder-color
                             :borderColor builder-color}}
            builder-label)
          (when (and has-data? (pos? note-count))
            (dom/span :.kanban-card-count
              (str note-count (if (= note-count 1) " item" " items")))))))))

(defn kanban-column
  "Kanban column with header and cards"
  [{:keys [column on-navigate]}]
  (let [{:keys [id label cards]} column
        count (count cards)]
    (dom/div {:className (str "kanban-column kanban-column-" (name id))}
      (dom/div :.kanban-column-header
        (dom/h3 :.kanban-column-title label)
        (dom/span :.kanban-column-count (str count)))
      (dom/div :.kanban-column-body
        (if (seq cards)
          (for [card cards]
            (kanban-card {:key (:id card)
                          :card card
                          :on-navigate on-navigate}))
          (dom/div :.kanban-column-empty
            (case id
              :not-started "No tasks yet"
              :in-progress "Nothing in progress"
              :done "Nothing completed yet"
              "")))))))

(defn kanban-board
  "Full Kanban board showing builder section progress.
   Props:
   - project-id: string
   - on-navigate: fn called with route segment
   - board: the board data from backend (or nil if loading)"
  [{:keys [project-id on-navigate]}]
  (let [state-atom @ws/app-state-atom
        board (when state-atom (get-in @state-atom [:kanban/board project-id]))
        columns (:columns board)
        summary (:summary board)]
    ;; Request board data if not loaded
    (when (and project-id (not board))
      (ws/request-kanban-board! project-id))
    (dom/div :.kanban-board
      ;; Summary bar
      (when summary
        (dom/div :.kanban-summary
          (dom/span :.kanban-summary-item
            (dom/span :.kanban-summary-value (str (:done summary 0)))
            (dom/span :.kanban-summary-label " done"))
          (dom/span :.kanban-summary-sep "/")
          (dom/span :.kanban-summary-item
            (dom/span :.kanban-summary-value (str (:total summary 0)))
            (dom/span :.kanban-summary-label " total"))
          ;; Progress bar
          (dom/div :.kanban-progress-bar
            (dom/div {:className "kanban-progress-fill"
                      :style {:width (str (if (pos? (:total summary 0))
                                            (* 100 (/ (:done summary 0) (:total summary 0)))
                                            0) "%")}}))))
      ;; Columns
      (if columns
        (dom/div :.kanban-columns
          (for [col columns]
            (kanban-column {:key (name (:id col))
                            :column col
                            :on-navigate on-navigate})))
        (dom/div :.kanban-loading "Loading board...")))))

;; ============================================================================
;; Main Page
;; ============================================================================

(def ^:private view-state
  "Local atom tracking which view is active on the project detail page"
  (atom :flywheel))

(defsc ProjectDetailPage
  "Project overview page - shows flywheel progress and Kanban board with view toggle"
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
                      (dr/change-route! this ["project" encoded-id route]))
        ;; Get real flywheel progress from WS state
        state-atom @ws/app-state-atom
        progress (when state-atom (get-in @state-atom [:flywheel/progress id]))
        current-step (or (when progress
                           ;; Map backend phase keywords to frontend keywords
                           (let [step (:current-step progress)]
                             (case step
                               :empathy-map :empathy
                               :value-proposition :valueprop
                               :mvp-planning :mvp
                               :lean-canvas :canvas
                               :empathy)))
                         :empathy)
        active-view @view-state
        ;; ECA-generated flywheel guide content
        eca-guide (when state-atom (get-in @state-atom [:content/generated :flywheel-guide]))
        eca-guide-loading? (when state-atom (get-in @state-atom [:content/loading? :flywheel-guide]))
        ;; Build phase lookup from ECA data (keyed by phase :key)
        eca-phases-map (when (seq eca-guide)
                         (into {} (map (fn [p] [(keyword (:key p)) p]) eca-guide)))]
    ;; Request flywheel progress from backend on load
    (when (and id (not progress))
      (ws/request-flywheel-progress! id))
    ;; Request ECA flywheel guide if not loaded
    (when (and id state-atom (not eca-guide) (not eca-guide-loading?))
      (ws/request-content! :flywheel-guide :project-id id))
    (if loading?
      (dom/div :.loading "Loading project...")
      (dom/div :.project-detail-page
        ;; Header
        (dom/div :.project-header
          (dom/div :.project-header-top
            (dom/div :.project-header-info
              (dom/h1 project-name)
              (dom/span :.project-status-badge (clojure.core/name (or status :draft)))
              (when description
                (dom/p :.project-description description)))
            ;; View toggle
            (dom/div :.view-toggle
              (dom/button {:className (str "view-toggle-btn"
                                          (when (= active-view :flywheel) " view-toggle-active"))
                           :onClick #(reset! view-state :flywheel)}
                (dom/span :.view-toggle-icon "🔄")
                (dom/span "Flywheel"))
              (dom/button {:className (str "view-toggle-btn"
                                          (when (= active-view :kanban) " view-toggle-active"))
                           :onClick #(reset! view-state :kanban)}
                (dom/span :.view-toggle-icon "📋")
                (dom/span "Kanban")))))

        ;; === Flywheel View ===
        (when (= active-view :flywheel)
          (dom/div :.flywheel-view
            ;; Flywheel indicator at top
            (ui/flywheel-indicator
              {:current-step current-step
               :project-id id
               :on-navigate navigate-fn})

            ;; Guidance message
            (dom/div :.project-guidance
              (dom/div :.guidance-icon "🎯")
              (dom/div :.guidance-content
                (dom/h2 "Your Product Development Journey")
                (if progress
                  (dom/p (str "Progress: " (:completed-count progress) "/" (:total-phases progress)
                              " phases complete. "
                              (case current-step
                                :empathy "Start with Empathy to understand your customer."
                                :valueprop "Map your insights to a Value Proposition."
                                :mvp "Define what to build first in your MVP."
                                :canvas "Capture your complete business model."
                                "Keep going!")))
                  (dom/p "Follow the flywheel: Empathy -> Value Prop -> MVP -> Lean Canvas. Each step builds on the last. Start with Empathy to understand your customer."))))

            ;; Phase Cards
            (dom/div :.phases-grid
              (for [phase fallback-flywheel-phases]
                (phase-card
                  {:key (name (:key phase))
                   :phase phase
                   :eca-phase (get eca-phases-map (:key phase))
                   :project-id id
                   :on-navigate navigate-fn
                   :is-recommended? (= (:key phase) current-step)})))))

        ;; === Kanban View ===
        (when (= active-view :kanban)
          (dom/div :.kanban-view
            (kanban-board
              {:project-id id
               :on-navigate navigate-fn})))

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
