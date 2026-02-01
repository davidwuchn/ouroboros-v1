(ns ouroboros.interface.query
  "Query interface - EQL queries and system introspection"
  (:require
   [ouroboros.query :as query]))

(defn q
  "Query the system (after boot)
   
   Usage: (q [:system/status])
          (q [:system/healthy?])
          (q [{:git/commits [:git/hash :git/subject]}])"
  [query-expr]
  (query/q query-expr))

(defn status
  "Current system status
   
   Usage: (status)"
  []
  (query/status))

(defn report
  "Full system report
   
   Usage: (report)"
  []
  (query/full-report))
