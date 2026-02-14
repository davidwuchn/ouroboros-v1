(ns ouroboros.ws.handlers.content
  "Content generation handler - generic ECA content streaming.

   Prompts are loaded from resources/prompts/content/*.md for easy editing
   without code changes. See resources/prompts/content/ for available prompts."
  (:require
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.prompt-loader :as pl]
   [ouroboros.ws.stream :as stream]))

(defn handle-content-generate!
  "Handle a content/generate request from the frontend.
   Routes to ECA with content-type-specific prompts loaded from resources/prompts/.
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
            ;; Load prompt from file, fallback to default
            system-prompt (pl/get-prompt :content content-type-kw (pl/default-content-prompt))
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
                                        :content-type content-type-kw}))}))))

(comment
  ;; Development utilities
  (pl/reload-prompt! :content :insights)
  (pl/reload-category! :content)
  (pl/clear-cache!))
)