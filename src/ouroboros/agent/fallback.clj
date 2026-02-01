(ns ouroboros.agent.fallback
  "Model Fallback Chain — Auto-failover between LLM providers
   
   Provides resilient LLM access by automatically failing over to backup
   providers when the primary fails. Tracks provider health and manages
   cooldown periods to prevent hammering failing endpoints.
   
   Features:
   - Configurable provider chain (e.g., OpenAI → Anthropic → Ollama)
   - Automatic cooldown after failures (default: 60s)
   - Health tracking per provider
   - Telemetry events for observability
   
   Usage:
     (fallback/generate-with-fallback
       [:openai :anthropic :ollama]
       {:openai {:api-key \"sk-...\" :model \"gpt-4o\"}
        :anthropic {:api-key \"...\" :model \"claude-3-haiku\"}
        :ollama {:url \"http://localhost:11434\" :model \"llama3.1\"}}
       messages
       tools)"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry])
  (:import [java.time Instant Duration]))

;; ============================================================================
;; Provider Health State
;; ============================================================================

(defrecord ProviderHealth
           [provider status last-error last-failure-at
            consecutive-failures total-requests total-failures])

(defonce ^:private health-state
  ;; Atom tracking health of each provider
  (atom {}))

(def ^:private cooldown-seconds 60)
(def ^:private max-consecutive-failures 3)

;; ============================================================================
;; Health Management
;; ============================================================================

(defn- now []
  (Instant/now))

(defn- in-cooldown?
  "Check if provider is in cooldown period"
  [provider]
  (when-let [health (get @health-state provider)]
    (when-let [last-failure (:last-failure-at health)]
      (let [cooldown-end (.plusSeconds last-failure cooldown-seconds)]
        (.isBefore (now) cooldown-end)))))

(defn- get-provider-status
  "Get current status of a provider"
  [provider]
  (if (in-cooldown? provider)
    :cooldown
    (get-in @health-state [provider :status] :unknown)))

(defn record-success!
  "Record a successful request to a provider"
  [provider]
  (swap! health-state update provider
         (fn [health]
           (-> (or health (map->ProviderHealth
                           {:provider provider
                            :status :healthy
                            :consecutive-failures 0
                            :total-requests 0
                            :total-failures 0}))
               (update :total-requests inc)
               (assoc :status :healthy
                      :consecutive-failures 0
                      :last-error nil))))
  (telemetry/emit! {:event :llm/provider-success
                    :provider provider}))

(defn record-failure!
  "Record a failed request to a provider"
  [provider error]
  (swap! health-state update provider
         (fn [health]
           (let [base (or health (map->ProviderHealth
                                  {:provider provider
                                   :status :healthy
                                   :consecutive-failures 0
                                   :total-requests 0
                                   :total-failures 0}))
                 new-failures (inc (:consecutive-failures base))
                 new-status (cond
                              (>= new-failures max-consecutive-failures) :unhealthy
                              (>= new-failures 2) :degraded
                              :else :healthy)]
             (-> base
                 (update :total-requests inc)
                 (update :total-failures inc)
                 (assoc :status new-status
                        :consecutive-failures new-failures
                        :last-error (ex-message error)
                        :last-failure-at (now))))))
  (telemetry/emit! {:event :llm/provider-failure
                    :provider provider
                    :error (ex-message error)}))

;; ============================================================================
;; Provider Selection
;; ============================================================================

(defn- available-providers
  "Filter providers that are not in cooldown"
  [chain]
  (filter #(not (in-cooldown? %)) chain))

(defn- select-provider
  "Select the best available provider from the chain"
  [chain configs]
  (let [available (available-providers chain)]
    (if (seq available)
      (first available)
      ;; All in cooldown, pick the one with oldest failure
      (first (sort-by #(get-in @health-state [% :last-failure-at]) chain)))))

;; ============================================================================
;; Fallback Generation
;; ============================================================================

(defn- attempt-generation
  "Try to generate with a single provider. Returns result map or throws.
   Separated from loop/recur to avoid 'recur across try' error."
  [provider config generate-fn messages tools attempted]
  (telemetry/emit! {:event :llm/provider-attempt
                    :provider provider
                    :position (count attempted)})
  (generate-fn provider config messages tools))

(defn generate-with-fallback
  "Generate LLM response with automatic fallback
   
   Args:
     chain - Ordered list of provider keywords [:openai :anthropic :ollama]
     configs - Map of provider configurations
     generate-fn - Function to call for generation (takes [provider config messages tools])
     messages - Conversation messages
     tools - Available tools
   
   Returns:
     {:success true :result ... :provider :openai}
     {:success false :error ... :attempted [:openai :anthropic]}"
  [chain configs generate-fn messages tools]
  (loop [remaining chain
         attempted []]
    (if (empty? remaining)
      {:success false
       :error "All providers failed"
       :attempted attempted
       :health (select-keys @health-state chain)}
      (let [provider (select-provider remaining configs)
            config (get configs provider)]
        (if-not config
          (do
            (telemetry/emit! {:event :llm/provider-skipped
                              :provider provider
                              :reason :no-config})
            (recur (remove #{provider} remaining)
                   (conj attempted provider)))
          (let [result (try
                         (attempt-generation provider config generate-fn messages tools attempted)
                         (catch Exception e
                           {:error e :exception? true}))]
            (if (:error result)
              (do
                (if (:exception? result)
                  (record-failure! provider (:error result))
                  (record-failure! provider (ex-info (:error result) {})))
                (recur (remove #{provider} remaining)
                       (conj attempted provider)))
              (do
                (record-success! provider)
                {:success true
                 :result result
                 :provider provider
                 :attempted (conj attempted provider)
                 :attempts (inc (count attempted))}))))))))

;; ============================================================================
;; Health Queries
;; ============================================================================

(defn get-health
  "Get health status for all providers or specific provider"
  ([] @health-state)
  ([provider] (get @health-state provider)))

(defn reset-health!
  "Reset health state for a provider or all providers"
  ([] (reset! health-state {}))
  ([provider] (swap! health-state dissoc provider)))

(defn get-provider-stats
  "Get statistics for providers"
  []
  (into {} (map (fn [[p h]]
                  [p {:status (:status h)
                      :total-requests (:total-requests h)
                      :total-failures (:total-failures h)
                      :success-rate (if (pos? (:total-requests h))
                                      (/ (- (:total-requests h)
                                            (:total-failures h))
                                         (:total-requests h))
                                      0.0)
                      :in-cooldown? (in-cooldown? p)}])
                @health-state)))

;; ============================================================================
;; Configuration Helpers
;; ============================================================================

(defn build-config
  "Build fallback configuration from environment/config
   
   Usage:
     (build-config {:openai-api-key \"sk-...\"
                    :anthropic-api-key \"...\"})"
  [env-config]
  (let [providers []
        configs {}]
    (cond-> [providers configs]
      (:openai-api-key env-config)
      (-> (update 0 conj :openai)
          (update 1 assoc :openai {:api-key (:openai-api-key env-config)
                                   :model (or (:openai-model env-config)
                                              "gpt-4o-mini")}))
      (:anthropic-api-key env-config)
      (-> (update 0 conj :anthropic)
          (update 1 assoc :anthropic {:api-key (:anthropic-api-key env-config)
                                      :model (or (:anthropic-model env-config)
                                                 "claude-3-haiku")}))
      (:ollama-url env-config)
      (-> (update 0 conj :ollama)
          (update 1 assoc :ollama {:url (:ollama-url env-config)
                                   :model (or (:ollama-model env-config)
                                              "llama3.1")})))))

(comment
  ;; Example usage
  (generate-with-fallback
   [:openai :anthropic]
   {:openai {:api-key "sk-..." :model "gpt-4o-mini"}
    :anthropic {:api-key "..." :model "claude-3-haiku"}}
   (fn [p c m t] {:content "Hello"}) ;; Mock generate function
   [{:role :user :content "Hi"}]
   [])

  ;; Check health
  (get-health)
  (get-provider-stats)

  ;; Reset after issues
  (reset-health! :openai)
  (reset-health!))