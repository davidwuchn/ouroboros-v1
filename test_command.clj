(require '[clojure.string :as str])
(require '[ouroboros.chat.commands :as commands])

(defn test-extract []
  (let [text "/build canvas empathy"
        result (commands/extract-command text)]
    (println "extract-command result:" result)
    (when result
      (let [[cmd args] result]
        (println "cmd:" cmd "args:" args)
        (println "handler dispatch:" (commands/handle-command nil "test-chat-id" "test-user" cmd args))))))

(test-extract)