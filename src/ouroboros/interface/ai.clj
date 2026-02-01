(ns ouroboros.interface.ai
  "AI interface - AI tooling hooks and context"
  (:require
   [ouroboros.ai :as ai]))

(defn ai-tools
  "List all AI-available tools
   
   Usage: (ai-tools)"
  []
  (ai/list-tools))

(defn ai-call!
  "Call an AI tool with parameters
   
   Usage: (ai-call! :file/read {:path \"README.md\"})"
  [tool-name params]
  (ai/call-tool tool-name params))

(defn ai-context
  "Get system context for AI
   
   Usage: (ai-context)"
  []
  (ai/system-context))

(defn ai-project
  "Get project context for AI
   
   Usage: (ai-project)"
  []
  (ai/project-context))

(defn ai-full
  "Get complete AI context
   
   Usage: (ai-full)"
  []
  (ai/full-context))
