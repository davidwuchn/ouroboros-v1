(ns ouroboros.ws.handlers.content
  "Content generation handler - generic ECA content streaming.

   Prompts are loaded from resources/prompts/content/*.md for easy editing
   without code changes. See resources/prompts/content/ for available prompts."
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.ws.connections :as conn]
   [ouroboros.ws.context :as ctx]
   [ouroboros.ws.stream :as stream]))

;; ============================================================================
;; Prompt Loading
;; ============================================================================

(def ^:private prompt-cache (atom {}))

(defn- extract-prompt-body
  "Extract the prompt body from markdown content (after frontmatter)"
  [content]
  (let [lines (str/split-lines content)
        ;; Find the end of frontmatter (second ---)
        frontmatter-end (second (keep-indexed #(when (= %2 "---") %1) lines))]
    (if frontmatter-end
      (->> (drop (inc frontmatter-end) lines)
           (str/join "\n")
           str/trim)
      content)))

(defn- load-prompt-file
  "Load a prompt from resources/prompts/content/{name}.md"
  [prompt-name]
  (let [resource-path (str "prompts/content/" (name prompt-name) ".md")
        resource (io/resource resource-path)]
    (if resource
      (let [content (slurp resource)]
        (extract-prompt-body content))
      (do
        (telemetry/emit! {:event :ws/prompt-not-found
                          :prompt-name prompt-name
                          :resource-path resource-path})
        nil))))

(defn- get-prompt
  "Get prompt content, with caching"
  [prompt-name]
  (if-let [cached (get @prompt-cache prompt-name)]
    cached
    (let [content (load-prompt-file prompt-name)]
      (when content
        (swap! prompt-cache assoc prompt-name content)
        content))))

(defn- default-prompt
  "Fallback prompt when specific prompt not found"
  []
  (or (get-prompt :default)
      "You are a product development advisor. Provide specific, actionable guidance based on the project data below."))

;; ============================================================================
;; Content Generation Handler
;; ============================================================================

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
            system-prompt (or (get-prompt content-type-kw)
                              (default-prompt))
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

;; ============================================================================
;; Cache Management
;; ============================================================================

(defn reload-prompt!
  "Reload a specific prompt from disk (useful for development)"
  [prompt-name]
  (let [content (load-prompt-file prompt-name)]
    (when content
      (swap! prompt-cache assoc prompt-name content)
      (telemetry/emit! {:event :ws/prompt-reloaded
                        :prompt-name prompt-name})
      true)))

(defn reload-all-prompts!
  "Reload all cached prompts from disk"
  []
  (doseq [prompt-name (keys @prompt-cache)]
    (reload-prompt! prompt-name))
  (telemetry/emit! {:event :ws/all-prompts-reloaded
                    :count (count @prompt-cache)}))

(defn clear-prompt-cache!
  "Clear the prompt cache (forces reload on next use)"
  []
  (reset! prompt-cache {})
  (telemetry/emit! {:event :ws/prompt-cache-cleared}))

(comment
  ;; Development utilities
  (get-prompt :insights)
  (reload-prompt! :insights)
  (reload-all-prompts!)
  (clear-prompt-cache!))
)