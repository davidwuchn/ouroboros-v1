(ns ouroboros.ws.handlers.builder
  "Builder data persistence, normalization, completion detection, and auto-insights.

   Prompts are loaded from resources/prompts/builder/*.md"
  (:require
   [ouroboros.eca-client :as eca]
   [ouroboros.learning :as learning]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.prompt-loader :as pl]
   [ouroboros.ws.stream :as stream]))

;; ============================================================================
;; Builder Section Counts
;; ============================================================================

(def ^:private builder-section-counts
  "Number of sections required for completion per builder type"
  {:empathy-map 6
   :value-proposition 6
   :mvp-planning 8
   :lean-canvas 9})

;; ============================================================================
;; Normalization & Completion
;; ============================================================================

(defn- normalize-builder-data
  "Normalize builder data after JSON round-trip.
   Restores keyword values for :item/section that were stringified during clj->js."
  [builder-type data]
  (case builder-type
    (:empathy-map :lean-canvas :value-proposition :mvp-planning)
    (reduce-kv (fn [m k note]
                 (let [str-key (if (keyword? k) (name k) k)]
                   (assoc m str-key
                          (cond-> note
                            (string? (:item/section note))
                            (update :item/section keyword)))))
               {} (or data {}))
    data))

(defn- count-completed-sections
  "Count how many sections have data in the builder data map."
  [builder-type data]
  (case builder-type
    (:empathy-map :lean-canvas :value-proposition :mvp-planning)
    (let [notes (vals (or data {}))
          sections-with-notes (set (map :item/section notes))]
      (count sections-with-notes))
    0))

(defn- builder-complete?
  "Check if a builder has all its sections filled"
  [builder-type data]
  (let [required (get builder-section-counts builder-type 0)
        completed (count-completed-sections builder-type data)]
    (and (pos? required)
         (>= completed required))))

;; ============================================================================
;; Auto-Insight
;; ============================================================================

(defn- handle-auto-insight!
  "Generate an auto-insight when a builder section completes.
   Sends ECA a focused prompt about the completed builder data and streams
   the response back as auto-insight tokens. Saves completed insight to learning memory."
  [client-id {:keys [project-id builder-type _data]}]
  (let [user-id (ctx/current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        builder-label (get ctx/phase-labels builder-type-kw (name (or builder-type-kw :unknown)))]

    (when (eca/alive?)
      (let [chat-id (str "ws-insight-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-insight-" client-id))
            insight-text (atom "")
            context-str (ctx/assemble-project-context user-id project-id builder-type-kw)
            base-prompt (pl/get-prompt :builder :auto-insight)
            prompt (str base-prompt
                        "\n\n**Completed Phase:** " builder-label
                        "\n\n---\n\n" context-str)]

        ;; Notify client that auto-insight is starting
        (conn/send-to! client-id {:type :eca/auto-insight-start
                                  :project-id project-id
                                  :builder-type builder-type-kw
                                  :timestamp (System/currentTimeMillis)})

        (stream/stream-eca-to-client! client-id
          {:chat-id chat-id
           :listener-id listener-id
           :prompt prompt
           :token-type :eca/auto-insight-token
           :done-type :eca/auto-insight-done
           :extra-fields {:project-id project-id
                          :builder-type builder-type-kw}
           :on-token (fn [text] (swap! insight-text str text))
           :on-done (fn []
                      ;; Save completed insight to learning memory
                      (let [full-text @insight-text]
                        (when (seq full-text)
                          (try
                            (learning/save-insight! user-id
                              {:title (str builder-label " Completion Insight")
                               :insights [full-text]
                               :pattern (str "builder-completion-" (name builder-type-kw))
                               :category "builder-insight"
                               :tags #{(name builder-type-kw) "auto-insight" (str project-id)}
                               :transfers [(name builder-type-kw)]})
                            (telemetry/emit! {:event :ws/insight-saved-to-learning
                                              :client-id client-id
                                              :project-id project-id
                                              :builder-type builder-type-kw
                                              :insight-length (count full-text)})
                            (catch Exception e
                              (telemetry/emit! {:event :ws/insight-save-error
                                                :error (.getMessage e)})))))
                      (telemetry/emit! {:event :ws/auto-insight-done
                                        :client-id client-id
                                        :project-id project-id
                                        :builder-type builder-type-kw}))
           :on-error (fn [error-msg]
                       (telemetry/emit! {:event :ws/auto-insight-error
                                         :client-id client-id
                                         :error error-msg}))}))))

;; ============================================================================
;; Save Builder Data
;; ============================================================================

(defn handle-save-builder-data!
  "Handle a builder/save-data message from the frontend.
   Persists the current builder data to the backend session store.
   Optionally triggers auto-insight if the builder is newly complete."
  [client-id {:keys [project-id session-id builder-type data]}]
  (let [user-id (ctx/current-user-id)
        builder-type-kw (if (string? builder-type) (keyword builder-type) builder-type)
        normalized-data (normalize-builder-data builder-type-kw data)]

    (telemetry/emit! {:event :ws/builder-data-save
                      :client-id client-id
                      :project-id project-id
                      :session-id session-id
                      :builder-type builder-type-kw})

    ;; Persist session data to memory
    (let [key (keyword (str "builder-sessions/" (name user-id)))]
      (memory/update! key
                      (fn [sessions]
                        (if-let [session (get sessions session-id)]
                          (assoc sessions session-id
                                 (assoc session
                                        :session/data normalized-data
                                        :session/updated-at (str (java.time.Instant/now))))
                          (assoc sessions session-id
                                 {:session/id session-id
                                  :session/project-id project-id
                                  :session/type builder-type-kw
                                  :session/state :active
                                  :session/data normalized-data
                                  :session/created-at (str (java.time.Instant/now))
                                  :session/updated-at (str (java.time.Instant/now))})))))

    ;; Send confirmation
    (conn/send-to! client-id {:type :builder/data-saved
                              :session-id session-id
                              :project-id project-id
                              :builder-type builder-type-kw
                              :timestamp (System/currentTimeMillis)})

    ;; Check if builder is now complete and trigger auto-insight
    (let [is-complete? (builder-complete? builder-type-kw normalized-data)]
      (when is-complete?
        (let [key (keyword (str "builder-sessions/" (name user-id)))
              session (get (memory/get-value key) session-id)
              already-completed? (= :completed (:session/state session))]
          (when-not already-completed?
            ;; Mark session as completed
            (memory/update! key
                            (fn [sessions]
                              (if-let [s (get sessions session-id)]
                                (assoc sessions session-id
                                       (assoc s
                                              :session/state :completed
                                              :session/completed-at (str (java.time.Instant/now))
                                              :session/updated-at (str (java.time.Instant/now))))
                                sessions)))

            (telemetry/emit! {:event :ws/builder-completed
                              :client-id client-id
                              :project-id project-id
                              :session-id session-id
                              :builder-type builder-type-kw})

            ;; Trigger auto-insight via ECA (non-blocking background task)
            (future
              (try
                (handle-auto-insight! client-id
                                      {:project-id project-id
                                       :builder-type builder-type-kw
                                       :data data})
                (catch Exception e
                  (telemetry/emit! {:event :ws/auto-insight-error
                                    :client-id client-id
                                    :error (.getMessage e)}))))))))))
)