(ns ouroboros.interface.dashboard
  "Dashboard interface - Web dashboard for observability"
  (:require
   [ouroboros.dashboard :as dashboard]))

(defn dashboard-start!
  "Start web dashboard server
   
   Usage: (dashboard-start! {:port 8080})"
  ([] (dashboard/start!))
  ([opts] (dashboard/start! opts)))

(defn dashboard-stop!
  "Stop web dashboard server
   
   Usage: (dashboard-stop!)"
  []
  (dashboard/stop!))

(defn dashboard-status
  "Get dashboard server status
   
   Usage: (dashboard-status)"
  []
  (dashboard/status))
