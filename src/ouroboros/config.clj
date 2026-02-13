(ns ouroboros.config
  "Configuration - Environment-based configuration management
   
   Loads configuration from environment variables and optional
   config files (.env, edn). Supports 12-factor app principles.
   
   Priority (highest to lowest):
   1. Environment variables
   2. .env file (if present)
   3. config.edn file (if present)
   4. Default values
   
   Usage:
   (load-config!)           ; Load and cache config
   (get-config :openai/api-key)
   (get-config :chat/telegram-token)"
  (:require
   [clojure.string :as str]
   [clojure.edn :as edn]
   [clojure.java.io :as io])
  (:import [java.io File]))

;; ============================================================================
;; Configuration Store
;; ============================================================================

(defonce ^:private config-cache (atom nil))

(def ^:private default-config
  "Default configuration values"
  {:chat {:max-history 10
          :rate-limit-ms 1000}
   :dashboard {:port 8080}
   :nrepl {:port 8888}})

;; ============================================================================
;; Environment Variable Loading
;; ============================================================================

(defn- env-var
  "Get environment variable"
  [key]
  (System/getenv key))

(defn- parse-env-line
  "Parse a line from .env file"
  [line]
  (when-let [match (re-matches #"^([A-Za-z_][A-Za-z0-9_]*)=(.*)$" (str/trim line))]
    [(second match) (nth match 2)]))

(defn- load-dotenv
  "Load .env file if present"
  []
  (let [env-file (File. ".env")]
    (when (.exists env-file)
      (println "◈ Loading .env file")
      (try
        (into {} (keep parse-env-line (str/split-lines (slurp env-file))))
        (catch Exception e
          (println "Warning: Could not load .env file:" (.getMessage e))
          {})))))

(defn- load-edn-config
  "Load config.edn if present"
  []
  (let [config-file (io/file "config.edn")]
    (when (.exists config-file)
      (println "◈ Loading config.edn")
      (try
        (edn/read-string (slurp config-file))
        (catch Exception e
          (println "Warning: Could not load config.edn:" (.getMessage e))
          {})))))

;; ============================================================================
;; Config Key Mapping
;; ============================================================================

(def ^:private env-key-mapping
  "Mapping from environment variable names to config keys"
  {"TELEGRAM_BOT_TOKEN" [:chat :telegram :token]
   "SLACK_APP_TOKEN" [:chat :slack :app-token]
   "SLACK_BOT_TOKEN" [:chat :slack :bot-token]
   "DISCORD_BOT_TOKEN" [:chat :discord :token]
   "DASHBOARD_PORT" [:dashboard :port]
   "NREPL_PORT" [:nrepl :port]})

(defn- deep-merge
  "Deep merge nested maps"
  [& maps]
  (if (every? map? maps)
    (apply merge-with deep-merge maps)
    (last maps)))

(defn- set-in
  "Set value in nested map"
  [m ks v]
  (assoc-in m ks v))

;; ============================================================================
;; Public API
;; ============================================================================

(defn load-config!
  "Load configuration from all sources
   
   Priority: defaults < .env < config.edn < environment variables"
  []
  (println "◈ Loading configuration...")

  ;; Start with defaults
  (let [defaults default-config

        ;; Layer 1: .env file
        dotenv (or (load-dotenv) {})

        ;; Layer 2: config.edn
        edn-config (or (load-edn-config) {})

        ;; Layer 3: Environment variables (highest priority)
        env-config (reduce (fn [acc [env-var-name ks]]
                             (if-let [val (env-var env-var-name)]
                               (set-in acc ks val)
                               acc))
                           {} env-key-mapping)]

    ;; Merge all layers
    (reset! config-cache
            (deep-merge defaults
                        edn-config
                        env-config
                        ;; Also include raw env vars for dotenv
                        (reduce (fn [acc [k v]]
                                  (if-let [ks (get env-key-mapping k)]
                                    (set-in acc ks v)
                                    acc))
                                {} dotenv)))

    (println "✓ Configuration loaded")
    (println (str "  Chat adapters: "
                  (str/join ", "
                            (keep (fn [k]
                                    (when (get-in @config-cache [:chat k :token])
                                      (name k)))
                                  [:telegram :slack :discord]))))
    @config-cache))

(defn get-config
  "Get configuration value by key path
   
   Usage:
   (get-config :openai/api-key)
   (get-config [:ai :openai :api-key])
   (get-config :chat/telegram-token)"
  ([key] (get-config key nil))
  ([key default]
   (cond
     (nil? key) default
     (keyword? key)
     (let [ns-part (namespace key)]
       (if ns-part
         (let [ks (conj (vec (str/split ns-part #"\.")) (name key))]
           (get-in @config-cache (mapv keyword ks) default))
         (get @config-cache key default)))
     (vector? key)
     (get-in @config-cache key default)
     :else default)))

(defn reload-config!
  "Reload configuration from all sources"
  []
  (reset! config-cache nil)
  (load-config!))

(defn config-summary
  "Get configuration summary (safe to log - no secrets)"
  []
  (let [cfg @config-cache]
    {:chat {:telegram (boolean (get-in cfg [:chat :telegram :token]))
            :slack (boolean (and (get-in cfg [:chat :slack :app-token])
                                 (get-in cfg [:chat :slack :bot-token])))
            :discord (boolean (get-in cfg [:chat :discord :token]))}
     :services {:dashboard (get-in cfg [:dashboard :port])}}))

;; ============================================================================
;; Auto-start Helpers
;; ============================================================================

(defn auto-start-chat!
  "Auto-start configured chat bots from environment"
  []
  (require '[ouroboros.chat :as chat])
  (require '[ouroboros.chat.adapters])

  ;; Telegram
  (when-let [token (get-config [:chat :telegram :token])]
    (let [bot ((resolve 'ouroboros.chat.adapters/telegram-bot) token)]
      ((resolve 'chat/register-adapter!) :telegram bot)
      (println "✓ Telegram bot registered")))

  ;; Slack
  (when-let [app-token (get-config [:chat :slack :app-token])]
    (when-let [bot-token (get-config [:chat :slack :bot-token])]
      (let [bot ((resolve 'ouroboros.chat.adapters/slack-bot) app-token bot-token)]
        ((resolve 'chat/register-adapter!) :slack bot)
        (println "✓ Slack bot registered"))))

  ;; Discord
  (when-let [token (get-config [:chat :discord :token])]
    (let [bot ((resolve 'ouroboros.chat.adapters/discord-bot) token)]
      ((resolve 'chat/register-adapter!) :discord bot)
      (println "✓ Discord bot registered")))

  ;; Start all registered
  (when (seq @@(resolve 'chat/active-adapters))
    ((resolve 'chat/start-all!))
    (println "✓ All chat bots started")))

;; ============================================================================
;; bb Task Helpers
;; ============================================================================

(defn start-from-env!
  "Full startup from environment configuration for chat bots

   Usage: bb chat
   Loads config and starts chat bots (Telegram, Slack, Discord)"
  []
  (println "========================================")
  (println "  Ouroboros Chat Bot Startup")
  (println "========================================")
  (println)

  ;; Boot system (resolve to avoid circular dep)
  (when-let [boot! (resolve 'ouroboros.interface.lifecycle/boot!)]
    (boot!))

  ;; Load config
  (load-config!)

  ;; Start chat bots
  (auto-start-chat!)

  (println "\n========================================")
  (println "  Chat bots running. Press Ctrl+C to stop.")
  (println "========================================")

  ;; Keep running
  @(promise))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(require '[com.wsscode.pathom3.connect.operation :as pco])
(require '[ouroboros.resolver-registry :as registry])

(pco/defresolver config-summary-resolver [_]
  {::pco/output [:config/summary]}
  (load-config!)
  {:config/summary (config-summary)})

(pco/defresolver config-value [{:keys [path]}]
  {::pco/input [:path]
   ::pco/output [:config/value :config/exists?]}
  (let [value (get-config (edn/read-string path))]
    {:config/value value
     :config/exists? (some? value)}))

(pco/defresolver config-keys [_]
  {::pco/output [:config/keys]}
  (load-config!)
  {:config/keys (keys @config-cache)})

(pco/defresolver config-sources [_]
  {::pco/output [:config/sources]}
  {:config/sources
   {:config/has-env-file? (.exists (java.io.File. ".env"))
    :config/has-edn-file? (.exists (java.io.File. "config.edn"))
    :config/env-vars (count (System/getenv))}})

(def resolvers
  [config-summary-resolver
   config-value
   config-keys
   config-sources])

;; Register with resolver registry on load
(registry/register-resolvers! resolvers)

;; ============================================================================
;; Exports
;; ============================================================================

(comment
  ;; Load config
  (load-config!)

  ;; Get values
  (get-config [:chat :telegram :token])
  (get-config :openai/model "default")

  ;; Check what's configured
  (config-summary)

  ;; Auto-start from environment
  (start-from-env!)

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:config/summary])
  (q/q [{[:path "[:ai :openai :model]"] [:config/value :config/exists?]}])
  (q/q [:config/keys]))