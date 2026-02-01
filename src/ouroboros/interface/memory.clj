(ns ouroboros.interface.memory
  "Memory interface - Cross-session persistence"
  (:require
   [ouroboros.memory :as memory]))

(defn remember
  "Save a value to memory
   
   Usage: (remember :my-key \"my value\")"
  [key value]
  (memory/save-value! key value))

(defn recall
  "Get a value from memory
   
   Usage: (recall :my-key)"
  [key]
  (memory/get-value key))

(defn forget
  "Delete a value from memory
   
   Usage: (forget :my-key)"
  [key]
  (memory/delete-value! key))
