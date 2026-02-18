#!/usr/bin/env bb
;; λ(observe) — Record new pattern
(require '[clojure.string :as str]
         '[clojure.java.io :as io])

(let [args (apply hash-map *command-line-args*)
      trigger (:trigger args "")
      action (:action args "")
      domain (:domain args "general")
      name (or (:name args) (str/replace (str/lower-case action) (re-pattern "[^a-z0-9]+") "-"))
      file (str ".eca/skills/continuous-learning/instincts/personal/" name ".md")]
  (if (or (str/blank? trigger) (str/blank? action))
    (do (println "Usage: bb learn record :trigger 'when adding validation' :action 'use Zod schema' :domain 'validation'")
        (System/exit 1))
    (do (spit file (str "---\nname: " name "\ndomain: " domain "\nφ: 0.5\ne: " (str/replace action (re-pattern " ") "-") "\nλ: " trigger "\nΔ: 0.05\nsource: session-manual\nevidence: 1\naccess-count: 0\nlast-accessed: now\ntimeframe: session\n---\n\n# " (str/capitalize action) "\n\n## λ(e): Action\n" action "\n\n## λ(φ): Why\n[Why this pattern works]\n\n## λ(λ): When\n" trigger "\n\n## Context\n- **Domain**: " domain "\n"))
        (println (str "✓ Created instinct: " name " (φ:0.5)"))
        (println (str "  File: " file)))))
