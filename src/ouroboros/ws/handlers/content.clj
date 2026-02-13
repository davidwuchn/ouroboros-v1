(ns ouroboros.ws.handlers.content
  "Content generation handler - generic ECA content streaming."
  (:require
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.stream :as stream]))

;; ============================================================================
;; Content Prompts
;; ============================================================================

(def ^:private content-prompts
  "System prompts for different content generation types"
  {:insights
   "You are a product development coach. Based on the project data below, provide 2-3 specific insights about the user's work. Be concrete and reference their actual data. Format as a JSON array of objects with keys: type, title, description, confidence (0-1). Example: [{\"type\":\"pattern\",\"title\":\"Strong customer focus\",\"description\":\"Your empathy map shows...\",\"confidence\":0.85}]"

   :blockers
   "You are a product development coach. Based on the project data below, identify any potential blockers or gaps. What's missing? What should the user address before moving forward? Be specific. Format as a JSON array of strings."

   :templates
   "You are a product strategy advisor. Based on the project description below, suggest 3-4 product templates/archetypes that could fit this project. For each, give: name, icon (emoji), description (1 sentence), and relevant tags. Format as a JSON array of objects with keys: key, name, icon, description, tags (array of strings)."

   :chat-suggestions
   "You are a product development assistant. Based on the current project context and phase, generate 4 specific questions or prompts the user could ask to deepen their work. Each should be a complete sentence. Format as a JSON array of strings."

   :flywheel-guide
   "You are a product development coach. Based on the project data below, provide guidance for each of the 4 flywheel phases (Empathy Map, Value Proposition, MVP Planning, Lean Canvas). For each phase, give a personalized tagline and 1-2 sentence description based on their actual data. Format as a JSON array of objects with keys: key (empathy/valueprop/mvp/canvas), tagline, description."

   :section-hints
   "You are a product development coach. Based on the project context, generate helpful hints and descriptions for the builder sections the user is working on. Be specific to their project, not generic. Format as a JSON object mapping section keys to objects with keys: description, hint."

   :learning-categories
   "You are a product strategist. Based on the user's project data and learning history, describe what they've learned in each category: customer-understanding, product-development, business-model, competitive-landscape. Give insight counts and brief descriptions. Format as a JSON array of objects with keys: category, label, description, count."})

;; ============================================================================
;; Content Generation Handler
;; ============================================================================

(defn handle-content-generate!
  "Handle a content/generate request from the frontend.
   Routes to ECA with content-type-specific prompts.
   Sends streaming tokens back, then a complete message with accumulated content."
  [client-id {:keys [project-id content-type context]}]
  (let [user-id (ctx/current-user-id)
        content-type-kw (if (string? content-type) (keyword content-type) content-type)]

    (when (stream/ensure-eca-alive! client-id :content/error
                                    {:content-type content-type-kw})
      (let [chat-id (str "ws-content-" (name content-type-kw) "-" client-id "-" (System/currentTimeMillis))
            listener-id (keyword (str "ws-content-" (name content-type-kw) "-" client-id))
            accumulated (atom "")
            context-str (ctx/assemble-project-context user-id project-id nil)
            system-prompt (get content-prompts content-type-kw
                               "You are a product development advisor. Provide specific, actionable guidance based on the project data below.")
            prompt (str system-prompt "\n\n---\n\n" context-str
                        (when context (str "\n\nAdditional context: " context)))]

        (telemetry/emit! {:event :ws/content-generate-request
                          :client-id client-id
                          :content-type content-type-kw
                          :project-id project-id})

        ;; Content generation uses a custom callback because the done message
        ;; needs the accumulated content, not just a done signal
        (stream/stream-eca-to-client! client-id
          {:chat-id chat-id
           :listener-id listener-id
           :prompt prompt
           :token-type :content/token
           :done-type :content/generated
           :error-type :content/error
           :extra-fields {:content-type content-type-kw
                          :project-id project-id}
           :suppress-done-msg? true
           :on-token (fn [text] (swap! accumulated str text))
           :on-done (fn []
                      ;; Send the accumulated content as the final message
                      (conn/send-to! client-id {:type :content/generated
                                                :content-type content-type-kw
                                                :content @accumulated
                                                :project-id project-id
                                                :timestamp (System/currentTimeMillis)})
                      (telemetry/emit! {:event :ws/content-generate-done
                                        :client-id client-id
                                        :content-type content-type-kw}))})))))
