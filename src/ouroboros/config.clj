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
  {:ai {:openai {:model "gpt-4o-mini"}
        :anthropic {:model "claude-3-5-sonnet-20241022"}}
   :chat {:max-history 10
          :rate-limit-ms 1000}
   :mcp {:port 3000}
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
   "OPENAI_API_KEY" [:ai :openai :api-key]
   "OPENAI_MODEL" [:ai :openai :model]
   "ANTHROPIC_API_KEY" [:ai :anthropic :api-key]
   "ANTHROPIC_MODEL" [:ai :anthropic :model]
   "OUROBOROS_PERSONA" [:ai :persona]
   "MCP_PORT" [:mcp :port]
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
   (let [ks (if (keyword? key)
              (vec (rest (str/split (namespace key) #"\.")))
              key)]
     (get-in @config-cache ks default))))

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
     :ai {:openai (boolean (get-in cfg [:ai :openai :api-key]))
          :anthropic (boolean (get-in cfg [:ai :anthropic :api-key]))
          :model (get-in cfg [:ai :openai :model])}
     :services {:mcp (get-in cfg [:mcp :port])
                :dashboard (get-in cfg [:dashboard :port])}}))

;; ============================================================================
;; Auto-start Helpers
;; ============================================================================

(defn auto-configure-agent!
  "Configure AI agent from environment if API key present"
  []
  (require '[ouroboros.agent :as agent])
  (when-let [api-key (get-config [:ai :openai :api-key])]
    ((resolve 'agent/configure!)
     {:provider :openai
      :api-key api-key
      :model (get-config [:ai :openai :model] "gpt-4o-mini")})
    (println "✓ Agent configured: OpenAI"))
  (when-let [api-key (get-config [:ai :anthropic :api-key])]
    ((resolve 'agent/configure!)
     {:provider :anthropic
      :api-key api-key
      :model (get-config [:ai :anthropic :model] "claude-3-5-sonnet-20241022")})
    (println "✓ Agent configured: Anthropic")))

(defn auto-start-chat!
  "Auto-start configured chat bots from environment"
  []
  (require '[ouroboros.chat :as chat])
  (require '[ouroboros.chat.telegram :as telegram])
  (require '[ouroboros.chat.slack :as slack])
  (require '[ouroboros.chat.discord :as discord])

  ;; Telegram
  (when-let [token (get-config [:chat :telegram :token])]
    (let [bot ((resolve 'telegram/make-bot) token)]
      ((resolve 'chat/register-adapter!) :telegram bot)
      (println "✓ Telegram bot registered")))

  ;; Slack
  (when-let [app-token (get-config [:chat :slack :app-token])]
    (when-let [bot-token (get-config [:chat :slack :bot-token])]
      (let [bot ((resolve 'slack/make-bot) app-token bot-token)]
        ((resolve 'chat/register-adapter!) :slack bot)
        (println "✓ Slack bot registered"))))

  ;; Discord
  (when-let [token (get-config [:chat :discord :token])]
    (let [bot ((resolve 'discord/make-bot) token)]
      ((resolve 'chat/register-adapter!) :discord bot)
      (println "✓ Discord bot registered")))

  ;; Start all registered
  (when (seq @(resolve 'chat/active-adapters))
    ((resolve 'chat/start-all!))
    (println "✓ All chat bots started")))

;; ============================================================================
;; bb Task Helpers
;; ============================================================================

(defn start-from-env!
  "Full startup from environment configuration
   
   Usage: bb chat
   Loads config, configures agent, starts chat bots"
  []
  (println "========================================")
  (println "  Ouroboros Chat Bot Startup")
  (println "========================================")

  ;; Boot system
  (require '[ouroboros.interface :as iface])
  ((resolve 'iface/boot!))

  ;; Load config
  (load-config!)

  ;; Configure agent
  (auto-configure-agent!)

  ;; Start chat bots
  (auto-start-chat!)

  (println "\n========================================")
  (println "  Chat bots running. Press Ctrl+C to stop.")
  (println "========================================")

  ;; Keep running
  @(promise))

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
  (start-from-env!))