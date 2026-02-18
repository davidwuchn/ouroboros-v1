;; Git-Embed Integration for Learning System
;; Semantic similarity search for code patterns
(ns ouroboros.git-embed
  "Git-Embed wrapper for semantic code search
   
   Usage:
     (require '[ouroboros.git-embed :as embed])
     
     (embed/update-index!)
     (embed/search \"threading macros\")
     (embed/similar \"src/api.clj\")
     (embed/status)"
  (:require [clojure.java.shell :as shell]
            [clojure.string :as str]))

(def ^:private binary "git-embed")

(defn- run-command
  "Run git-embed command and return output"
  [& args]
  (try
    (let [result (apply shell/sh binary args)]
      {:success (zero? (:exit result))
       :output (str/trim (:out result))
       :error (str/trim (:err result))})
    (catch Exception e
      {:success false
       :error (.getMessage e)})))

(defn update-index!
  "Update the git-embed index for this repository"
  []
  (run-command "embed" "update"))

(defn status
  "Check git-embed index status"
  []
  (run-command "embed" "status"))

(defn clear-index!
  "Clear the entire embedding index"
  []
  (run-command "embed" "clear"))

(defn search
  "Search for similar code using semantic similarity"
  ([query]
   (search query 5))
  ([query limit]
   (let [result (run-command "embed" "search" "-n" (str limit) query)]
     (if (:success result)
       {:query query
        :results (parse-results (:output result))}
       {:error (:error result)}))))

(defn similar
  "Find files similar to a given file"
  ([file]
   (similar file 5))
  ([file limit]
   (let [result (run-command "embed" "similar" "-n" (str limit) file)]
     (if (:success result)
       {:file file
        :results (parse-results (:output result))}
       {:error (:error result)}))))

(defn- parse-results [output]
  "Parse git-embed output into structured data"
  (when output
    (keep (fn [line]
            (when (and line (str/includes? line ":"))
              (let [[file score] (str/split line #"\s+" 2)]
                {:file file
                 :score (some-> score Double/parseDouble)})))
          (str/split-lines output))))

(defn find-related-to-insight
  "Find code related to an insight content"
  [insight-content]
  (let [result (search insight-content 5)]
    (when (not (:error result))
      (map :file (:results result)))))

(defn healthy?
  "Check if git-embed is available"
  []
  (let [result (status)]
    (and (:success result)
         (not (str/blank? (:output result))))))
