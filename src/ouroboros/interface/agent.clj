(ns ouroboros.interface.agent
  "Agent interface - AI Agent with LLM providers

   DEPRECATED: This namespace will be removed in a future version.
   Use ECA (https://github.com/editor-code-assistant/eca) for AI agent functionality."
  (:require
   [ouroboros.agent :as agent]))

(defn ^:deprecated agent-configure!
  "DEPRECATED: Use ECA for agent configuration.

   Configure the AI agent"
  [config]
  (println "⚠️  DEPRECATED: iface/agent-configure! is deprecated. Use ECA instead.")
  (agent/configure! config))

(defn ^:deprecated agent-config
  "DEPRECATED: Use ECA for agent config.

   Get current agent configuration"
  []
  (println "⚠️  DEPRECATED: iface/agent-config is deprecated. Use ECA instead.")
  (agent/get-config))

(defn ^:deprecated agent-generate
  "DEPRECATED: Use ECA for AI generation.

   Generate AI response for a message"
  [message history]
  (println "⚠️  DEPRECATED: iface/agent-generate is deprecated. Use ECA instead.")
  (agent/generate-chat-response message history))
