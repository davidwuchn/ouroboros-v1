(ns ouroboros.interface.ai
  "AI interface - AI tooling hooks and context

   DEPRECATED: This namespace will be removed in a future version.
   Use ECA (https://github.com/editor-code-assistant/eca) for AI functionality."
  (:require
   [ouroboros.ai :as ai]))

(defn ^:deprecated ai-tools
  "DEPRECATED: Use ECA for AI tools.

   List all AI-available tools"
  []
  (println "⚠️  DEPRECATED: iface/ai-tools is deprecated. Use ECA instead.")
  (ai/list-tools))

(defn ^:deprecated ai-call!
  "DEPRECATED: Use ECA for AI tool calls.

   Call an AI tool with parameters"
  [tool-name params]
  (println "⚠️  DEPRECATED: iface/ai-call! is deprecated. Use ECA instead.")
  (ai/call-tool tool-name params))

(defn ^:deprecated ai-context
  "DEPRECATED: Use ECA for AI context.

   Get system context for AI"
  []
  (println "⚠️  DEPRECATED: iface/ai-context is deprecated. Use ECA instead.")
  (ai/system-context))

(defn ^:deprecated ai-project
  "DEPRECATED: Use ECA for AI context.

   Get project context for AI"
  []
  (println "⚠️  DEPRECATED: iface/ai-project is deprecated. Use ECA instead.")
  (ai/project-context))

(defn ^:deprecated ai-full
  "DEPRECATED: Use ECA for AI context.

   Get complete AI context"
  []
  (println "⚠️  DEPRECATED: iface/ai-full is deprecated. Use ECA instead.")
  (ai/full-context))
