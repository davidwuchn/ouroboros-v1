(ns ouroboros.ws.handlers.wisdom
  "ECA wisdom handler - contextual tips, analysis, next-steps, etc."
  (:require
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.stream :as stream]))

;; ============================================================================
;; Wisdom Prompts
;; ============================================================================

(def ^:private wisdom-prompts
  "System prompts per request type for ECA wisdom queries"
  {:tips
   "You are a product development coach. Based on the project context below, provide 3-5 specific, actionable tips for the current phase. Each tip should be concise (1-2 sentences) and directly relevant to the user's project data. Format as a numbered list."

   :next-steps
   "You are a product development coach. Based on the project context below, suggest the 2-3 most impactful next actions the user should take. Be specific to their project, not generic. Format as a numbered list with brief explanations."

   :analysis
   "You are a product strategy analyst. Based on the project context below, provide a brief analysis of the current state of the project. Identify strengths, gaps, and areas that need more work. Be specific and constructive. Keep it to 3-4 paragraphs."

   :suggestions
   "You are a product development assistant. Based on the project context and current phase, generate 4 specific questions or prompts the user could ask to deepen their understanding. Each should be a complete sentence that the user can click to ask. Format as a numbered list."

   :templates
   "You are a product strategy advisor. Based on the project description, suggest which product development template/archetype best fits this project (SaaS B2B, Marketplace, Consumer App, API Platform, Creator/Content, Hardware/IoT) and explain why in 2-3 sentences. Then provide 2-3 specific tips for that archetype."})

;; ============================================================================
;; Wisdom Handler
;; ============================================================================

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
            system-prompt (get wisdom-prompts request-type-kw (:tips wisdom-prompts))
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

;; ============================================================================
;; Tip Detail Handler
;; ============================================================================

(defn handle-eca-tip-detail!
  "Handle an eca/tip-detail request from the frontend.
   Sends a focused prompt to ECA about a specific contextual wisdom tip."
  [client-id {:keys [project-id phase tip-title tip-description]}]
  (let [phase-kw (if (string? phase) (keyword phase) phase)
        user-id (ctx/current-user-id)]

    (when (stream/ensure-eca-alive! client-id :eca/tip-detail-error
                                    {:phase phase :tip-title tip-title})
      (let [chat-id (str "ws-tip-detail-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-tip-detail-" client-id))
            context-str (ctx/assemble-project-context user-id project-id phase-kw)
            prompt (str "You are a product development coach. "
                        "The user is in the " (or (get ctx/phase-labels phase-kw) (name (or phase-kw :unknown))) " phase "
                        "and clicked on a wisdom tip card:\n\n"
                        "**" tip-title "**\n"
                        tip-description "\n\n"
                        "Provide a detailed, actionable expansion of this tip. Include:\n"
                        "1. Why this matters (1-2 sentences)\n"
                        "2. How to apply it step-by-step (3-4 concrete actions)\n"
                        "3. Common mistakes to avoid (2-3 pitfalls)\n"
                        "4. A quick exercise or prompt to get started\n\n"
                        "Be specific to the user's project context. Use markdown formatting.\n\n"
                        "---\n\n" context-str)]

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
