(ns ouroboros.frontend.ws.handlers.wisdom
  "Handlers for :eca/wisdom-* and :eca/tip-detail-* messages.
   Implements shadow buffer pattern for silent ECA refreshes."
  (:require
   [ouroboros.frontend.ws.state :as state]
   [ouroboros.frontend.ws.cache :as cache]
   [ouroboros.frontend.ws.dispatch :as dispatch]))

;; ============================================================================
;; Wisdom Handlers
;; ============================================================================

(defmethod dispatch/handle-message :eca/wisdom-token
  [{:keys [token _request-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])]
               (if refreshing?
                 (update-in s [:wisdom/id :global :wisdom/shadow-content] str token)
                 (update-in s [:wisdom/id :global :wisdom/content] str token)))))
    (when-not (get-in @state-atom [:wisdom/id :global :wisdom/refreshing?])
      (state/schedule-render!))))

(defmethod dispatch/handle-message :eca/wisdom-done
  [{:keys [request-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [refreshing? (get-in s [:wisdom/id :global :wisdom/refreshing?])
                   shadow (get-in s [:wisdom/id :global :wisdom/shadow-content])
                   content (if (and refreshing? (seq shadow))
                             shadow
                             (get-in s [:wisdom/id :global :wisdom/content]))
                   phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                           (assoc-in [:wisdom/id :global :wisdom/refreshing?] false)
                           (cond->
                             (and refreshing? (seq shadow))
                             (assoc-in [:wisdom/id :global :wisdom/content] shadow))
                           (assoc-in [:wisdom/id :global :wisdom/shadow-content] nil))
                 (and phase req-type (seq content))
                 (assoc-in [:wisdom/cache [phase req-type]] content)))))
    (cache/save-wisdom-cache! (:wisdom/cache @state-atom))
    (state/schedule-render!)))

(defmethod dispatch/handle-message :eca/wisdom-response
  [{:keys [text request-type]}]
  (when-let [state-atom @state/app-state-atom]
    (swap! state-atom
           (fn [s]
             (let [phase (get-in s [:wisdom/id :global :wisdom/phase])
                   req-type (or (when (string? request-type) (keyword request-type))
                                (when (keyword? request-type) request-type)
                                (get-in s [:wisdom/id :global :wisdom/request-type]))]
               (cond-> (-> s
                           (assoc-in [:wisdom/id :global :wisdom/content] text)
                           (assoc-in [:wisdom/id :global :wisdom/loading?] false)
                           (assoc-in [:wisdom/id :global :wisdom/streaming?] false)
                           (assoc-in [:wisdom/id :global :wisdom/refreshing?] false))
                 (and phase req-type (seq text))
                 (assoc-in [:wisdom/cache [phase req-type]] text)))))
    (cache/save-wisdom-cache! (:wisdom/cache @state-atom))
    (state/schedule-render!)))

;; ============================================================================
;; Tip Detail Handlers (shadow buffer pattern)
;; ============================================================================

(defmethod dispatch/handle-message :eca/tip-detail-token
  [{:keys [token phase tip-title]}]
  (when-let [state-atom @state/app-state-atom]
    (let [phase-kw (if (string? phase) (keyword phase) phase)]
      (swap! state-atom
             (fn [s]
               (let [refreshing? (get-in s [:tip-detail/refreshing? [phase-kw tip-title]])]
                 (if refreshing?
                   (update-in s [:tip-detail/shadow [phase-kw tip-title]] str token)
                   (update-in s [:tip-detail/content [phase-kw tip-title]] str token)))))
      (when-not (get-in @state-atom [:tip-detail/refreshing? [phase-kw tip-title]])
        (state/schedule-render!)))))

(defmethod dispatch/handle-message :eca/tip-detail-done
  [{:keys [phase tip-title]}]
  (when-let [state-atom @state/app-state-atom]
    (let [phase-kw (if (string? phase) (keyword phase) phase)]
      (swap! state-atom
             (fn [s]
               (let [refreshing? (get-in s [:tip-detail/refreshing? [phase-kw tip-title]])
                     shadow (get-in s [:tip-detail/shadow [phase-kw tip-title]])
                     content (if (and refreshing? (seq shadow))
                               shadow
                               (get-in s [:tip-detail/content [phase-kw tip-title]]))]
                 (cond-> (-> s
                             (assoc-in [:tip-detail/loading? [phase-kw tip-title]] false)
                             (assoc-in [:tip-detail/streaming? [phase-kw tip-title]] false)
                             (assoc-in [:tip-detail/refreshing? [phase-kw tip-title]] false)
                             (cond->
                               (and refreshing? (seq shadow))
                               (assoc-in [:tip-detail/content [phase-kw tip-title]] shadow))
                             (assoc-in [:tip-detail/shadow [phase-kw tip-title]] nil))
                   (seq content)
                   (assoc-in [:tip-detail/cache [phase-kw tip-title]] content)))))
      (cache/save-tip-detail-cache! (:tip-detail/cache @state-atom))
      (state/schedule-render!))))

(defmethod dispatch/handle-message :eca/tip-detail-error
  [{:keys [_text phase tip-title]}]
  (when-let [state-atom @state/app-state-atom]
    (let [phase-kw (if (string? phase) (keyword phase) phase)]
      (swap! state-atom
             (fn [s]
               (-> s
                   (assoc-in [:tip-detail/loading? [phase-kw tip-title]] false)
                   (assoc-in [:tip-detail/streaming? [phase-kw tip-title]] false)
                   (assoc-in [:tip-detail/refreshing? [phase-kw tip-title]] false))))
      (state/schedule-render!))))
