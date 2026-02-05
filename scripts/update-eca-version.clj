#!/usr/bin/env bb

(ns update-eca-version
  "Update ECA version references across the codebase.

   Fetches the latest release tag from GitHub API and updates:
   - PLAN.md
   - CHANGELOG.md
   - test/ouroboros/eca_protocol_test.clj

   Usage:
     bb scripts/update-eca-version.clj [--dry-run]
     bb scripts/update-eca-version.clj --help

   Options:
     --dry-run  Print changes without writing files
     --help     Show this help"
  (:require
   [babashka.cli :as cli]
   [cheshire.core :as json]
   [clojure.string :as str]))

(def eca-repo "editor-code-assistant/eca")
(def github-api (str "https://api.github.com/repos/" eca-repo "/releases/latest"))

;; File update specifications: regex pattern -> replacement template
;; Use %s for version placeholder
(def file-specs
  {"PLAN.md" [[#"(?i)(\*\*613 stars\*\*, 37 forks, )v?\d+\.\d+\.\d+"
               "$1v%s"]]
   "CHANGELOG.md" [[#"(?i)(Battle-tested with 613\+ stars, )v?\d+\.\d+\.\d+"
                    "$1v%s"]]
   "test/ouroboros/eca_protocol_test.clj"
   [[#"(def eca-protocol-version \")\d+\.\d+\.\d+(\")"
     "$1%s$2"]
    [#"(Protocol Version: ECA v)\d+\.\d+\.\d+(\+)"
     "$1%s$2"]]})

(defn fetch-latest-version []
  "Fetch latest ECA release tag from GitHub API."
  (try
    (let [resp (slurp github-api)
          data (json/parse-string resp true)
          tag (:tag_name data)]
      (if (str/starts-with? tag "v")
        (subs tag 1)
        tag))
    (catch Exception e
      (binding [*out* *err*]
        (println "Error fetching latest ECA version:" (.getMessage e)))
      (System/exit 1))))

(defn update-file [filepath patterns new-version dry-run?]
  "Update version patterns in a single file."
  (let [content (slurp filepath)
        updated (reduce (fn [content [pattern replacement]]
                          (str/replace content pattern
                                       (format replacement new-version)))
                        content
                        patterns)]
    (when (not= content updated)
      (if dry-run?
        (do
          (println "---" filepath "---")
          (println updated)
          (println))
        (do
          (spit filepath updated)
          (println "✓ Updated" filepath))))))

(defn -main [& args]
  (let [opts (cli/parse-opts args {:spec {:dry-run {:alias :d}
                                          :help {:alias :h}}})
        dry-run? (:dry-run opts)
        help? (:help opts)]
    (when help?
      (println (:doc (meta #'-main)))
      (System/exit 0))
    (println "Fetching latest ECA release from GitHub...")
    (let [new-version (fetch-latest-version)]
      (println "Latest ECA version:" new-version)
      (doseq [[file patterns] file-specs]
        (update-file file patterns new-version dry-run?))
      (if dry-run?
        (println "\nDry run complete. No files changed.")
        (println "\nAll files updated successfully.")))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))