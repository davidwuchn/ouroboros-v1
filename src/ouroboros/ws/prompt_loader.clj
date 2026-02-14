(ns ouroboros.ws.prompt-loader
  "Shared prompt loading utilities for WebSocket handlers.

   Prompts are loaded from resources/prompts/{category}/{name}.md
   with YAML frontmatter and markdown body.

   Usage:
     (require '[ouroboros.ws.prompt-loader :as pl])
     (pl/get-prompt :wisdom :tips)
     (pl/reload-prompt! :wisdom :tips)"
  (:require
   [clojure.java.io :as io]
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Cache
;; ============================================================================

(def ^:private prompt-cache (atom {}))

;; ============================================================================
;; Parsing
;; ============================================================================

(defn- extract-prompt-body
  "Extract the prompt body from markdown content (after YAML frontmatter)"
  [content]
  (if (str/blank? content)
    ""
    (let [lines (str/split-lines content)
          ;; Find indices of --- lines
          dashes (keep-indexed #(when (= %2 "---") %1) lines)]
      (if (>= (count dashes) 2)
        ;; Has frontmatter - extract body after second ---
        (->> (drop (inc (second dashes)) lines)
             (str/join "\n")
             str/trim)
        ;; No frontmatter - return whole content
        (str/trim content)))))

;; ============================================================================
;; Loading
;; ============================================================================

(defn- load-prompt-file
  "Load a prompt file from resources/prompts/{category}/{name}.md"
  [category name]
  (let [resource-path (str "prompts/" (name category) "/" (name name) ".md")
        resource (io/resource resource-path)]
    (if resource
      (let [content (slurp resource)]
        (extract-prompt-body content))
      (do
        (telemetry/emit! {:event :ws/prompt-not-found
                          :prompt-category category
                          :prompt-name name
                          :resource-path resource-path})
        nil))))

(defn get-prompt
  "Get a prompt by category and name, with caching.

   Category: :wisdom, :analytics, :builder, :content
   Name: The prompt identifier (e.g., :tips, :prediction)

   Returns the prompt string or nil if not found."
  ([category name]
   (get-prompt category name nil))
  ([category name default-prompt]
   (let [cache-key [category name]
         cached (get @prompt-cache cache-key)]
     (if cached
       cached
       (let [content (load-prompt-file category name)]
         (if content
           (do (swap! prompt-cache assoc cache-key content)
               content)
           default-prompt))))))

(defn reload-prompt!
  "Reload a specific prompt from disk (useful for development)."
  [category name]
  (let [content (load-prompt-file category name)]
    (when content
      (swap! prompt-cache assoc [category name] content)
      (telemetry/emit! {:event :ws/prompt-reloaded
                        :prompt-category category
                        :prompt-name name})
      true)))

(defn reload-category!
  "Reload all prompts in a category."
  [category]
  (let [category-keys (filter #(= category (first %)) (keys @prompt-cache))]
    (doseq [[cat name] category-keys]
      (reload-prompt! cat name))
    (telemetry/emit! {:event :ws/prompt-category-reloaded
                      :category category
                      :count (count category-keys)})))

(defn reload-all!
  "Reload all cached prompts from disk."
  []
  (doseq [[category name] (keys @prompt-cache)]
    (reload-prompt! category name))
  (telemetry/emit! {:event :ws/all-prompts-reloaded
                    :count (count @prompt-cache)}))

(defn clear-cache!
  "Clear the prompt cache (forces reload on next use)."
  []
  (reset! prompt-cache {})
  (telemetry/emit! {:event :ws/prompt-cache-cleared}))

;; ============================================================================
;; Default Prompts
;; ============================================================================

(defn default-wisdom-prompt
  "Default fallback for wisdom prompts."
  []
  (or (get-prompt :wisdom :tips)
      "You are a product development coach. Provide specific, actionable guidance based on the project context below."))

(defn default-content-prompt
  "Default fallback for content prompts."
  []
  (or (get-prompt :content :insights)
      "You are a product development advisor. Provide specific, actionable guidance based on the project data below."))

(comment
  ;; Development utilities
  (get-prompt :wisdom :tips)
  (get-prompt :analytics :prediction)
  (get-prompt :builder :auto-insight)
  (reload-prompt! :wisdom :tips)
  (reload-category! :wisdom)
  (reload-all!)
  (clear-cache!))
