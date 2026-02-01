(ns ouroboros.interface.agent
  "Agent interface - AI Agent with LLM providers"
  (:require
   [ouroboros.agent :as agent]))

(defn agent-configure!
  "Configure the AI agent
   
   Usage: (agent-configure! {:provider :openai :api-key \"sk-...\"})"
  [config]
  (agent/configure! config))

(defn agent-config
  "Get current agent configuration
   
   Usage: (agent-config)"
  []
  (agent/get-config))

(defn agent-generate
  "Generate AI response for a message
   
   Usage: (agent-generate \"Hello\" [{:role :user :content \"Hi\"}])"
  [message history]
  (agent/generate-chat-response message history))
