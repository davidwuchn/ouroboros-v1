(ns ouroboros.interface
  "Interface - Unified system surface (refactored)
   
   This namespace re-exports all interface functions for backward compatibility.
   
   For specific domains, you can require directly:
   - ouroboros.interface.lifecycle - boot! shutdown!
   - ouroboros.interface.query - q status report
   - ouroboros.interface.memory - remember recall forget
   - ouroboros.interface.knowledge - files file search project
   - ouroboros.interface.api - http-get http-request!
   - ouroboros.interface.openapi - openapi-*
   - ouroboros.interface.ai - ai-*
   - ouroboros.interface.telemetry - telemetry-*
   - ouroboros.interface.mcp - mcp-*
   - ouroboros.interface.chat - chat-*
   - ouroboros.interface.agent - agent-*
   - ouroboros.interface.auth - auth-*
   - ouroboros.interface.dashboard - dashboard-*
   - ouroboros.interface.config - load-config! get-config config-summary"
  (:require
   [ouroboros.interface.lifecycle :as lifecycle]
   [ouroboros.interface.query :as query]
   [ouroboros.interface.memory :as memory]
   [ouroboros.interface.knowledge :as knowledge]
   [ouroboros.interface.api :as api]
   [ouroboros.interface.openapi :as openapi]
   [ouroboros.interface.ai :as ai]
   [ouroboros.interface.telemetry :as telemetry]
   [ouroboros.interface.mcp :as mcp]
   [ouroboros.interface.chat :as chat]
   [ouroboros.interface.agent :as agent]
   [ouroboros.interface.auth :as auth]
   [ouroboros.interface.dashboard :as dashboard]
   [ouroboros.interface.config :as config]))

;; ============================================================================
;; Lifecycle
;; ============================================================================

(def boot!
  "Boot the complete system
   
   Sequence: Engine → Query → Memory"
  lifecycle/boot!)

(def shutdown!
  "Graceful shutdown"
  lifecycle/shutdown!)

;; ============================================================================
;; Query
;; ============================================================================

(def q
  "Query the system (after boot)"
  query/q)

(def status
  "Current system status"
  query/status)

(def report
  "Full system report"
  query/report)

;; ============================================================================
;; Memory
;; ============================================================================

(def remember
  "Save a value to memory"
  memory/remember)

(def recall
  "Get a value from memory"
  memory/recall)

(def forget
  "Delete a value from memory"
  memory/forget)

;; ============================================================================
;; Knowledge
;; ============================================================================

(def files
  "List files in a directory"
  knowledge/files)

(def file
  "Get info about a specific file"
  knowledge/file)

(def search
  "Search files by pattern"
  knowledge/search)

(def project
  "Get project structure"
  knowledge/project)

;; ============================================================================
;; API
;; ============================================================================

(def http-get
  "Make HTTP GET request"
  api/http-get)

(def http-request!
  "Make HTTP request (mutation)"
  api/http-request!)

;; ============================================================================
;; OpenAPI
;; ============================================================================

(def openapi-bootstrap!
  "Bootstrap an OpenAPI client from spec URL"
  openapi/openapi-bootstrap!)

(def openapi-clients
  "List registered OpenAPI clients"
  openapi/openapi-clients)

(def openapi-operations
  "List operations for a client"
  openapi/openapi-operations)

(def openapi-call!
  "Call an OpenAPI operation"
  openapi/openapi-call!)

;; ============================================================================
;; AI
;; ============================================================================

(def ai-tools
  "List all AI-available tools"
  ai/ai-tools)

(def ai-call!
  "Call an AI tool with parameters"
  ai/ai-call!)

(def ai-context
  "Get system context for AI"
  ai/ai-context)

(def ai-project
  "Get project context for AI"
  ai/ai-project)

(def ai-full
  "Get complete AI context"
  ai/ai-full)

;; ============================================================================
;; Telemetry
;; ============================================================================

(def telemetry-events
  "Get all telemetry events"
  telemetry/telemetry-events)

(def telemetry-recent
  "Get n recent telemetry events"
  telemetry/telemetry-recent)

(def telemetry-stats
  "Get telemetry statistics"
  telemetry/telemetry-stats)

(def telemetry-clear!
  "Clear all telemetry events"
  telemetry/telemetry-clear!)

;; ============================================================================
;; MCP
;; ============================================================================

(def mcp-tools
  "List all MCP-exposed tools"
  mcp/mcp-tools)

(def mcp-start!
  "Start MCP server"
  mcp/mcp-start!)

(def mcp-stop!
  "Stop MCP server"
  mcp/mcp-stop!)

(def mcp-status
  "Get MCP server status"
  mcp/mcp-status)

(def mcp-invoke!
  "Invoke a tool via MCP"
  mcp/mcp-invoke!)

;; ============================================================================
;; Chat
;; ============================================================================

(def chat-adapters
  "List registered chat adapters"
  chat/chat-adapters)

(def chat-start!
  "Start all chat adapters"
  chat/chat-start!)

(def chat-stop!
  "Stop all chat adapters"
  chat/chat-stop!)

(def chat-register-telegram!
  "Register Telegram bot"
  chat/chat-register-telegram!)

(def chat-register-slack!
  "Register Slack bot"
  chat/chat-register-slack!)

(def chat-register-discord!
  "Register Discord bot"
  chat/chat-register-discord!)

(def chat-sessions
  "Get active chat sessions"
  chat/chat-sessions)

(def chat-clear-session!
  "Clear a chat session"
  chat/chat-clear-session!)

;; ============================================================================
;; Agent
;; ============================================================================

(def agent-configure!
  "Configure the AI agent"
  agent/agent-configure!)

(def agent-config
  "Get current agent configuration"
  agent/agent-config)

(def agent-generate
  "Generate AI response for a message"
  agent/agent-generate)

;; ============================================================================
;; Auth
;; ============================================================================

(def auth-get-user
  "Get or create user by platform ID"
  auth/auth-get-user)

(def auth-users
  "List all registered users"
  auth/auth-users)

(def auth-check-permission
  "Check if user has permission"
  auth/auth-check-permission)

(def auth-rate-limit
  "Check rate limit for user action"
  auth/auth-rate-limit)

;; ============================================================================
;; Dashboard
;; ============================================================================

(def dashboard-start!
  "Start web dashboard server"
  dashboard/dashboard-start!)

(def dashboard-stop!
  "Stop web dashboard server"
  dashboard/dashboard-stop!)

(def dashboard-status
  "Get dashboard server status"
  dashboard/dashboard-status)

;; ============================================================================
;; Config
;; ============================================================================

(def load-config!
  "Load configuration from environment"
  config/load-config!)

(def get-config
  "Get configuration value"
  config/get-config)

(def config-summary
  "Get configuration summary (safe to log)"
  config/config-summary)

(comment
  ;; Full boot sequence
  (boot!)

  ;; Query examples
  (q [:system/current-state])
  (q [:system/healthy?])
  (status)
  (report)

  ;; Shutdown
  (shutdown!))
