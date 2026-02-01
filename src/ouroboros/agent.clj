(ns ouroboros.agent
  "Agent - AI Agent with persona and tool access
   
   Provides intelligent responses using LLM providers (OpenAI, Anthropic, etc.)
   with access to Ouroboros tools based on user intent.
   
   Features:
   - Configurable persona/system prompt
   - Tool selection based on context
   - Conversation history management
   - Multiple LLM provider support"
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [ouroboros.ai :as ai]
   [ouroboros.agent.fallback :as fallback]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry]
   [com.wsscode.pathom3.connect.operation :as pco]))

;; ============================================================================
;; LLM Providers
;; ============================================================================

(defmulti generate-response
  "Generate response from LLM provider"
  (fn [provider _config _messages _tools] provider))

;; OpenAI Provider
(defmethod generate-response :openai
  [_ config messages tools]
  (let [api-key (:api-key config)
        model (or (:model config) "gpt-4o-mini")
        url "https://api.openai.com/v1/chat/completions"
        tool-defs (map (fn [t]
                         {:type "function"
                          :function {:name (:name t)
                                     :description (:description t)
                                     :parameters (:inputSchema t)}})
                       tools)
        body {:model model
              :messages messages
              :tools tool-defs
              :tool_choice "auto"}
        response (try
                   (http/post url
                              {:headers {"Authorization" (str "Bearer " api-key)
                                         "Content-Type" "application/json"}
                               :body (json/generate-string body)})
                   (catch Exception e
                     {:error (str "OpenAI API error: " (.getMessage e))}))]
    (if (:error response)
      response
      (let [result (json/parse-string (:body response) true)]
        (if (:error result)
          {:error (:message (:error result))}
          (:choices result))))))

;; Anthropic Provider
(defmethod generate-response :anthropic
  [_ config messages tools]
  (let [api-key (:api-key config)
        model (or (:model config) "claude-3-5-sonnet-20241022")
        url "https://api.anthropic.com/v1/messages"
        ;; Convert OpenAI-style messages to Anthropic format
        system-msg (first (filter #(= (:role %) :system) messages))
        chat-msgs (filter #(not= (:role %) :system) messages)
        tool-defs (map (fn [t]
                         {:name (:name t)
                          :description (:description t)
                          :input_schema (:inputSchema t)})
                       tools)
        body {:model model
              :max_tokens 4096
              :system (:content system-msg "")
              :messages (mapv (fn [m]
                                {:role (case (:role m)
                                         :user "user"
                                         :assistant "assistant"
                                         "user")
                                 :content (:content m)})
                              chat-msgs)}
        body-with-tools (if (seq tools)
                          (assoc body :tools tool-defs)
                          body)
        response (try
                   (http/post url
                              {:headers {"x-api-key" api-key
                                         "anthropic-version" "2023-06-01"
                                         "Content-Type" "application/json"}
                               :body (json/generate-string body-with-tools)})
                   (catch Exception e
                     {:error (str "Anthropic API error: " (.getMessage e))}))]
    (if (:error response)
      response
      (let [result (json/parse-string (:body response) true)]
        (if (:error result)
          {:error (:message (:error result))}
          [{:message {:role "assistant"
                      :content (:content (:content result))
                      :tool_calls (map (fn [u]
                                         {:function {:name (:name u)
                                                     :arguments (json/generate-string (:input u))}})
                                       (:tool_use (:content result)))}}])))))

;; Local/Ollama Provider (placeholder)
(defmethod generate-response :ollama
  [_ _config _messages _tools]
  (let [_url (or (:url _config) "http://localhost:11434/api/chat")
        _model (or (:model _config) "llama3.1")]
    ;; Ollama implementation would go here
    {:error "Ollama provider not yet implemented"}))

;; ============================================================================
;; Agent Configuration
;; ============================================================================

(def default-persona
  "You are Ouroboros, a helpful AI assistant with access to development tools.
   
   You can:
   - Read files and search code
   - Check git status and commits
   - Make HTTP requests
   - Query the system state
   
   Be concise and helpful. When using tools, explain what you're doing.
   If you're unsure about something, say so.
   
   Always respond in a friendly, professional manner.")

(defonce ^:private agent-config
  (atom {:provider :openai
         :api-key nil
         :model "gpt-4o-mini"
         :persona default-persona
         :max-history 10
         :enabled-tools #{:file/read :git/status :system/status
                          :http/get :memory/get :query/eql}
         ;; Fallback chain configuration
         :fallback-chain [:openai :anthropic :ollama]
         :fallback-enabled? false
         :provider-configs {}}))

(defn configure!
  "Configure the AI agent
   
   Usage: (configure! {:provider :openai
                       :api-key \"sk-...\"
                       :model \"gpt-4o\"})"
  [config]
  (swap! agent-config merge config)
  (println "✓ Agent configured")
  @agent-config)

(defn get-config
  "Get current agent configuration"
  []
  @agent-config)

;; ============================================================================
;; Tool Execution
;; ============================================================================

(defn- parse-tool-call
  "Parse tool call from LLM response"
  [tool-call]
  (let [fn-data (:function tool-call)
        name (:name fn-data)
        args (try
               (json/parse-string (:arguments fn-data) true)
               (catch Exception _ {}))]
    {:name name :arguments args}))

(defn- execute-tool-call
  "Execute a tool call and return result"
  [{:keys [name arguments]}]
  (telemetry/emit! {:event :agent/tool-call :tool name})
  (try
    (let [result (ai/call-tool (keyword name) arguments)]
      (telemetry/emit! {:event :agent/tool-result :tool name :success? true})
      (str "Tool result: " (pr-str (:result result))))
    (catch Exception e
      (telemetry/emit! {:event :agent/tool-error :tool name :error (.getMessage e)})
      (str "Tool error: " (.getMessage e)))))

;; ============================================================================
;; Response Generation
;; ============================================================================

(defn- build-messages
  "Build message list for LLM from history and persona"
  [history persona]
  (concat [{:role :system :content persona}]
          (mapv (fn [h]
                  {:role (case (:role h)
                           :user :user
                           :assistant :assistant
                           :system :system
                           :user)
                   :content (:content h)})
                history)))

(defn- get-enabled-tools
  "Get list of tools enabled for this agent"
  []
  (let [enabled (:enabled-tools @agent-config)]
    (filter #(contains? enabled (keyword (:name %)))
            (ai/list-tools))))

(defn- wrap-generate-fn
  "Wrap generate-response for use with fallback chain"
  [messages tools]
  (fn [provider config _msgs _tools]
    (generate-response provider config messages tools)))

(defn- generate-with-fallback
  "Generate response using fallback chain if enabled"
  [config messages tools]
  (if (:fallback-enabled? config)
    (let [chain (:fallback-chain config [:openai :anthropic :ollama])
          provider-configs (merge
                            ;; Build configs from current config
                            {:openai {:api-key (:api-key config)
                                      :model (or (:model config) "gpt-4o-mini")}}
                            (:provider-configs config))
          result (fallback/generate-with-fallback
                  chain
                  provider-configs
                  (wrap-generate-fn messages tools)
                  messages
                  tools)]
      (if (:success result)
        (do
          (telemetry/emit! {:event :agent/fallback-success
                            :provider (:provider result)
                            :attempts (:attempts result)})
          (:result result))
        {:error (str "All providers failed: " (:error result))}))
    ;; Fallback disabled, use primary provider
    (generate-response (:provider config) config messages tools)))

(defn generate-chat-response
  "Generate AI response for chat message
   
   Usage: (generate-chat-response \"Hello, what's the system status?\" history)"
  [user-message history]
  (telemetry/emit! {:event :agent/generate :message-length (count user-message)})

  (let [config @agent-config
        {:keys [provider api-key persona]} config

        ;; Build conversation
        conversation (concat history [{:role :user :content user-message}])
        messages (build-messages conversation persona)
        tools (get-enabled-tools)

        ;; Call LLM (with fallback if enabled)
        response (if api-key
                   (generate-with-fallback config messages tools)
                   {:error "No API key configured. Set :api-key in (configure!)"})]

    (if (:error response)
      {:error (:error response) :response "Sorry, I'm having trouble connecting to my AI backend."}

      ;; Process response
      (let [choice (first response)
            message (:message choice)
            tool-calls (:tool_calls message)]

        (if (seq tool-calls)
          ;; Handle tool calls
          (let [tool-results (map execute-tool-call (map parse-tool-call tool-calls))
                tool-context (str "I used the following tools:\n"
                                  (str/join "\n" tool-results))
                ;; Follow-up without tools to get final response
                follow-up-messages (concat messages
                                           [{:role :assistant :content (:content message)}
                                            {:role :user :content tool-context}])
                follow-up (generate-with-fallback config follow-up-messages [])]
            (if (:error follow-up)
              {:response (str "I used some tools. Here's what I found:\n" tool-context)}
              {:response (:content (:message (first follow-up)))}))

          ;; Direct response
          {:response (:content message)})))))

;; ============================================================================
;; Pathom Integration
;; ============================================================================

(pco/defresolver agent-config-resolver [_]
  {::pco/output [:agent/provider :agent/model :agent/persona-preview
                 :agent/fallback-enabled?]}
  (let [config @agent-config]
    {:agent/provider (:provider config)
     :agent/model (:model config)
     :agent/persona-preview (str (subs (:persona config) 0 50) "...")
     :agent/fallback-enabled? (:fallback-enabled? config false)}))

(pco/defresolver agent-fallback-health [_]
  {::pco/output [{:agent/fallback-health [:provider/status :provider/total-requests
                                          :provider/total-failures :provider/success-rate]}]}
  {:agent/fallback-health (fallback/get-provider-stats)})

(pco/defmutation agent-configure! [{:keys [provider api-key model]}]
  {::pco/output [:status :provider]}
  (configure! {:provider provider :api-key api-key :model model})
  {:status :configured :provider provider})

(pco/defmutation agent-enable-fallback! [{:keys [enabled chain]}]
  {::pco/output [:status :fallback-enabled? :fallback-chain]}
  (swap! agent-config
         (fn [c]
           (cond-> c
             (some? enabled) (assoc :fallback-enabled? enabled)
             chain (assoc :fallback-chain (map keyword chain)))))
  {:status (if (:fallback-enabled? @agent-config) :enabled :disabled)
   :fallback-enabled? (:fallback-enabled? @agent-config)
   :fallback-chain (:fallback-chain @agent-config)})

(pco/defmutation agent-reset-provider! [{:keys [provider]}]
  {::pco/output [:status :provider]}
  (fallback/reset-health! (keyword provider))
  {:status :reset :provider provider})

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  [agent-config-resolver
   agent-fallback-health])

(def mutations
  [agent-configure!
   agent-enable-fallback!
   agent-reset-provider!])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

(comment
  ;; Configure agent
  (configure! {:provider :openai
               :api-key "sk-..."
               :model "gpt-4o-mini"})

  ;; Enable fallback chain
  (swap! agent-config assoc
         :fallback-enabled? true
         :fallback-chain [:openai :anthropic]
         :provider-configs {:anthropic {:api-key "..."
                                        :model "claude-3-haiku"}})

  ;; Or via Pathom
  (require '[ouroboros.query :as q])
  (q/m 'agent/enable-fallback! {:enabled true
                                :chain [:openai :anthropic]})

  ;; Check fallback health
  (fallback/get-provider-stats)
  (q/q [{:agent/fallback-health [:provider/status
                                 :provider/success-rate]}])

  ;; Reset provider after issues
  (fallback/reset-health! :openai)
  (q/m 'agent/reset-provider! {:provider "openai"})

  ;; Generate response (uses fallback if enabled)
  (generate-chat-response "What's the system status?"
                          [{:role :user :content "Hello"}
                           {:role :assistant :content "Hi!"}]))
