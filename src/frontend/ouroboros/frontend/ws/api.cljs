(ns ouroboros.frontend.ws.api
  "Public API functions for requesting data via WebSocket.
   All request-* functions include safety timeouts to clear loading state."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.connection :as conn]))

;; ============================================================================
;; Wisdom Requests
;; ============================================================================

(defn request-wisdom!
  "Request ECA wisdom for a project phase.
   request-type: :tips, :next-steps, :analysis, :suggestions, :templates
   Options:
     :silent? - When true, don't show loading UI (cache is already displayed).
   Includes a 25s safety timeout."
  [project-id phase request-type & [{:keys [silent?]}]]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (cond-> (not silent?)
                   (-> (assoc-in [:wisdom/id :global :wisdom/content] "")
                       (assoc-in [:wisdom/id :global :wisdom/loading?] true)
                       (assoc-in [:wisdom/id :global :wisdom/streaming?] true)))
                 (assoc-in [:wisdom/id :global :wisdom/request-type] request-type)
                 (assoc-in [:wisdom/id :global :wisdom/phase] phase)
                 (assoc-in [:wisdom/id :global :wisdom/refreshing?] (boolean silent?)))))
    (state/schedule-render!))
  (conn/send! (cond-> {:type "eca/wisdom"
                        :project-id project-id
                        :request-type (name request-type)}
                phase (assoc :phase (name phase))))
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (let [s @state-atom
             loading? (get-in s [:wisdom/id :global :wisdom/loading?])
             refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])]
         (when (or loading? refreshing?)
           (swap! state-atom
                  (fn [s]
                    (-> s
                        (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                        (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                        (assoc-in [:wisdom/id :global :wisdom/refreshing?] false))))
           (state/schedule-render!)))))
   25000))

;; ============================================================================
;; ECA Debug
;; ============================================================================

(defn request-eca-debug!
  "Toggle ECA debug mode."
  [enabled?]
  (conn/send! {:type "eca/debug"
               :enabled? (boolean enabled?)}))

;; ============================================================================
;; Tip Detail Requests
;; ============================================================================

(defn request-tip-detail!
  "Request ECA-enriched tip detail for a specific contextual wisdom tip.
   Options:
     :silent? - When true, use shadow buffer (cache is already displayed)."
  [project-id phase tip-title tip-description & [{:keys [silent?]}]]
  (let [phase-kw (if (string? phase) (keyword phase) phase)
        cache-key [phase-kw tip-title]]
    (when-let [state-atom @state/app-state-atom]
      (swap! state-atom
             (fn [s]
               (-> s
                   (cond-> (not silent?)
                     (-> (assoc-in [:tip-detail/content cache-key] "")
                         (assoc-in [:tip-detail/loading? cache-key] true)
                         (assoc-in [:tip-detail/streaming? cache-key] true)))
                   (assoc-in [:tip-detail/refreshing? cache-key] (boolean silent?)))))
      (state/schedule-render!))
    (conn/send! {:type "eca/tip-detail"
                 :project-id project-id
                 :phase (name phase-kw)
                 :tip-title tip-title
                 :tip-description tip-description})
    (js/setTimeout
     (fn []
       (when-let [state-atom @state/app-state-atom]
         (let [s @state-atom
               loading? (get-in s [:tip-detail/loading? cache-key])
               refreshing? (get-in s [:tip-detail/refreshing? cache-key])]
           (when (or loading? refreshing?)
             (swap! state-atom
                    (fn [s]
                      (-> s
                          (assoc-in [:tip-detail/loading? cache-key] false)
                          (assoc-in [:tip-detail/streaming? cache-key] false)
                          (assoc-in [:tip-detail/refreshing? cache-key] false))))
             (state/schedule-render!)))))
     25000)))

;; ============================================================================
;; Data Requests (simple send + timeout pattern)
;; ============================================================================

(defn request-flywheel-progress!
  "Request flywheel progress for a project"
  [project-id]
  (conn/send! {:type "flywheel/progress"
               :project-id project-id}))

(defn request-kanban-board!
  "Request Kanban board state for a project"
  [project-id]
  (conn/send! {:type "kanban/board"
               :project-id project-id}))

(defn request-analytics!
  "Request real analytics dashboard data for a project.
   If analytics data already exists, refreshes silently.
   Includes a 25s safety timeout."
  [project-id]
  (when-let [state-atom @state/app-state-atom]
    (let [existing (get-in @state-atom [:analytics/dashboard project-id])
          silent? (boolean (seq existing))]
      (when-not silent?
        (swap! state-atom assoc-in
               [:analytics/dashboard project-id :prediction-streaming?] true))))
  (conn/send! {:type "analytics/dashboard"
               :project-id project-id})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get-in @state-atom [:analytics/dashboard project-id :prediction-streaming?])
         (swap! state-atom assoc-in
                [:analytics/dashboard project-id :prediction-streaming?] false)
         (state/schedule-render!))))
   25000))

(defn request-content!
  "Request ECA-generated content by type.
   content-type: :insights, :blockers, :templates, :chat-suggestions,
                  :flywheel-guide, :section-hints, :learning-categories
   Includes a 25s safety timeout."
  [content-type & {:keys [project-id context]}]
  ;; Guard: don't request if WebSocket is not connected
  (when-not (conn/connected?)
    (js/console.warn "request-content: WebSocket not connected, skipping request for" (name content-type))
    nil)
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc-in [:content/loading? content-type] true)
                 (assoc-in [:content/streaming content-type] "")))))
  (conn/send! (cond-> {:type "content/generate"
                        :content-type (name content-type)}
                project-id (assoc :project-id project-id)
                context (assoc :context context)))
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get-in @state-atom [:content/loading? content-type])
         (swap! state-atom assoc-in [:content/loading? content-type] false)
         (state/schedule-render!))))
   25000))

;; ============================================================================
;; Learning Requests
;; ============================================================================

(defn request-learning-save-examples!
  "Save builder contents as learning examples"
  [{:keys [project-id label template-key builder-type session-id data]}]
  (conn/send! {:type "learning/save-examples"
               :project-id project-id
               :label label
               :template-key (when template-key (name template-key))
               :builder-type (name builder-type)
               :session-id session-id
               :data data}))

(defn request-wisdom-template!
  "Request template data from backend"
  [template-key]
  (conn/send! {:type "wisdom/template"
               :template-key (name template-key)}))

(defn request-learning-categories!
  "Request real learning categories from backend memory.
   Fast (no ECA) -- reads directly from learning storage.
   Includes a 20s safety timeout."
  []
  (when-let [state-atom @state/app-state-atom]
    (let [existing (get @state-atom :learning/categories)
          silent? (boolean (seq existing))]
      (when-not silent?
        (swap! state-atom assoc :learning/categories-loading? true))))
  (conn/send! {:type "learning/categories"})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get @state-atom :learning/categories-loading?)
         (swap! state-atom assoc :learning/categories-loading? false)
         (state/schedule-render!))))
   20000))

(defn request-wisdom-page-data!
  "Request all wisdom page data in one batch request.
   Replaces separate calls for templates, template data, and categories."
  [project-id]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (-> s
                 (assoc :wisdom/page-data-loading? true)
                 (assoc-in [:content/loading? :templates] true)
                 (assoc :learning/categories-loading? true)))))
  (conn/send! {:type "wisdom/page-data"
               :project-id project-id})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get @state-atom :wisdom/page-data-loading?)
         (swap! state-atom
                (fn [s]
                  (-> s
                      (assoc :wisdom/page-data-loading? false)
                      (assoc-in [:content/loading? :templates] false)
                      (assoc :learning/categories-loading? false))))
         (state/schedule-render!))))
   20000))

(defn request-category-insights!
  "Request actual insight records for a specific learning category.
   If insights are already present (from cache/defaults), refreshes silently."
  [category]
  (when-let [state-atom @state/app-state-atom]
    (let [existing (get-in @state-atom [:learning/category-insights category])
          silent? (boolean (seq existing))]
      (swap! state-atom
             (fn [s]
               (if silent?
                 (assoc-in s [:learning/category-insights-loading? category] false)
                 (assoc-in s [:learning/category-insights-loading? category] true))))))
  (conn/send! {:type "learning/category-insights"
               :category category})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (let [loading? (get-in @state-atom [:learning/category-insights-loading? category])]
         (when loading?
           (swap! state-atom assoc-in [:learning/category-insights-loading? category] false)
           (state/schedule-render!)))))
   20000))

(defn request-learning-flywheel!
  "Request user's learning flywheel progress data."
  []
  (conn/send! {:type "learning/flywheel"})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get @state-atom :learning/flywheel-loading?)
         (swap! state-atom assoc :learning/flywheel-loading? false)
         (state/schedule-render!))))
   10000))

(defn request-due-reviews!
  "Request due reviews for spaced repetition."
  []
  (conn/send! {:type "learning/due-reviews"})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get @state-atom :learning/due-reviews-loading?)
         (swap! state-atom assoc :learning/due-reviews-loading? false)
         (state/schedule-render!))))
   10000))

(defn complete-review!
  "Complete a review with confidence level (1-4)."
  [learning-id confidence]
  (conn/send! {:type "learning/complete-review"
               :learning-id learning-id
               :confidence confidence}))

(defn skip-review!
  "Skip a review (reschedules with shorter interval)."
  [learning-id]
  (conn/send! {:type "learning/skip-review"
               :learning-id learning-id}))

(defn search-learnings!
  "Search learning insights by query."
  [query]
  (conn/send! {:type "learning/search"
               :query query})
  (js/setTimeout
   (fn []
     (when-let [state-atom @state/app-state-atom]
       (when (get @state-atom :learning/search-loading?)
         (swap! state-atom assoc :learning/search-loading? false)
         (state/schedule-render!))))
   10000))

;; ============================================================================
;; Builder Data
;; ============================================================================

(defn save-builder-data!
  "Send builder section data to backend for persistence."
  [project-id session-id builder-type data]
  (conn/send! {:type "builder/save-data"
               :project-id project-id
               :session-id session-id
               :builder-type (name builder-type)
               :data data}))

(defn apply-template-to-builders!
  "Atomically apply a template to ALL builders for a project.
   This is a single transaction - replaces the old pattern of 4 separate WS calls.
   Backend saves template data to all 4 builders and records a learning insight."
  [project-id template-key template-data]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom assoc-in [:builder/template-applying? project-id] true))
  (conn/send! {:type "builder/apply-template"
               :project-id project-id
               :template-key (name template-key)
               :template-data template-data})
  (js/setTimeout
    (fn []
      (when-let [state-atom @state/app-state-atom]
        (when (get-in @state-atom [:builder/template-applying? project-id])
          (swap! state-atom assoc-in [:builder/template-applying? project-id] false)
          (state/schedule-render!))))
    30000))
