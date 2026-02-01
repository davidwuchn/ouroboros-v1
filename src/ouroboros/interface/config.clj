(ns ouroboros.interface.config
  "Config interface - Configuration management"
  (:require
   [ouroboros.config :as config]))

(defn load-config!
  "Load configuration from environment
   
   Usage: (load-config!)"
  []
  (config/load-config!))

(defn get-config
  "Get configuration value
   
   Usage: (get-config :openai/api-key)
          (get-config [:chat :telegram :token])"
  ([key]
   (config/get-config key))
  ([key default]
   (config/get-config key default)))

(defn config-summary
  "Get configuration summary (safe to log)
   
   Usage: (config-summary)"
  []
  (config/config-summary))
