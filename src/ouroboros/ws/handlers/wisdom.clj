(ns ouroboros.ws.handlers.wisdom
  "ECA wisdom handler - contextual tips, analysis, next-steps, etc.

   Prompts are loaded from resources/prompts/wisdom/*.md"
  (:require
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.prompt-loader :as pl]
   [ouroboros.ws.stream :as stream]))

(defn handle-eca-wisdom!
  "Handle an eca/wisdom message from the frontend.
   Assembles project context, sends to ECA with a phase-specific prompt,
   and streams the response back to the requesting WebSocket client."
  [client-id {:keys [project-id phase request-type]}]
  (let [phase-kw (if (string? phase) (keyword phase) phase)
        request-type-kw (if (string? request-type) (keyword request-type) (or request-type :tips))
        user-id (ctx/current-user-id)]

    (when (stream/ensure-eca-alive! client-id :eca/wisdom-response
                                    {:request-type request-type-kw})
      (let [chat-id (str "ws-wisdom-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-wisdom-" client-id))
            context-str (ctx/assemble-project-context user-id project-id phase-kw)
            system-prompt (pl/get-prompt :wisdom request-type-kw (pl/default-wisdom-prompt))
            prompt (str system-prompt "\n\n---\n\n" context-str)]

        (telemetry/emit! {:event :ws/eca-wisdom-request
                          :client-id client-id
                          :chat-id chat-id
                          :project-id project-id
                          :phase phase-kw
                          :request-type request-type-kw
                          :context-length (count context-str)})

        (stream/stream-eca-to-client! client-id
          {:chat-id chat-id
           :listener-id listener-id
           :prompt prompt
           :token-type :eca/wisdom-token
           :done-type :eca/wisdom-done
           :error-type :eca/wisdom-response
           :extra-fields {:request-type request-type-kw}
           :on-done (fn []
                      (telemetry/emit! {:event :ws/eca-wisdom-done
                                        :client-id client-id
                                        :chat-id chat-id
                                        :request-type request-type-kw}))
           :on-error (fn [error-msg]
                       (telemetry/emit! {:event :ws/eca-wisdom-error
                                         :client-id client-id
                                         :error error-msg}))})))))

(defn handle-eca-tip-detail!
  "Handle an eca/tip-detail request from the frontend.
   Sends a focused prompt to ECA about a specific contextual wisdom tip."
  [client-id {:keys [project-id phase tip-title tip-description]}]
  (let [phase-kw (if (string? phase) (keyword phase) phase)
        user-id (ctx/current-user-id)
        phase-label (get ctx/phase-labels phase-kw (name (or phase-kw :unknown)))]

    (when (stream/ensure-eca-alive! client-id :eca/tip-detail-error
                                    {:phase phase :tip-title tip-title})
      (let [chat-id (str "ws-tip-detail-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-tip-detail-" client-id))
            context-str (ctx/assemble-project-context user-id project-id phase-kw)
            base-prompt (pl/get-prompt :wisdom :tip-detail)
            prompt (str base-prompt
                        "\n\n**Phase:** " phase-label
                        "\n**Tip Title:** " tip-title
                        "\n**Tip Description:** " tip-description
                        "\n\n---\n\n" context-str)]

        (telemetry/emit! {:event :ws/eca-tip-detail-request
                          :client-id client-id
                          :chat-id chat-id
                          :phase phase-kw
                          :tip-title tip-title})

        (stream/stream-eca-to-client! client-id
          {:chat-id chat-id
           :listener-id listener-id
           :prompt prompt
           :token-type :eca/tip-detail-token
           :done-type :eca/tip-detail-done
           :error-type :eca/tip-detail-error
           :extra-fields {:phase phase :tip-title tip-title}})))))