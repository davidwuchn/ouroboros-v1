(ns ouroboros.chat
  "Chat - Message routing and conversation management

   Core infrastructure for chat platform integration:
   - ChatAdapter protocol for platform abstraction
   - Message routing to handlers
   - Session management (conversation history)
   - ECA integration for AI responses
   - Tool approval bridge for dangerous operations

   This is the public API facade. Implementation is split across:
   - ouroboros.chat.session - Session management
   - ouroboros.chat.streaming - Streaming bridge
   - ouroboros.chat.commands - Command handlers
   - ouroboros.chat.builders - Builder mode handlers
   - ouroboros.chat.router - Message routing and lifecycle

   AI functionality is delegated to ECA (Editor Code Assistant).
   See: https://github.com/editor-code-assistant/eca"
  (:require
   [ouroboros.chat.protocol :as chatp]
   [ouroboros.chat.session :as session]
   [ouroboros.chat.streaming :as streaming]
   [ouroboros.chat.commands :as commands]
   [ouroboros.chat.builders :as builders]
   [ouroboros.chat.router :as router]))

;; ============================================================================
;; Protocol Re-exports (from chat.protocol)
;; ============================================================================

(def start! chatp/start!)
(def stop! chatp/stop!)
(def send-message! chatp/send-message!)
(def send-markdown! chatp/send-markdown!)
(def edit-message! chatp/edit-message!)
(def supports-edit? chatp/supports-edit?)
(def make-message chatp/make-message)

;; ============================================================================
;; Session Re-exports
;; ============================================================================

(def get-session session/get-session)
(def update-session! session/update-session!)
(def clear-session! session/clear-session!)
(def get-session-count session/get-session-count)

;; ============================================================================
;; Router Re-exports
;; ============================================================================

(def register-adapter! router/register-adapter!)
(def start-all! router/start-all!)
(def stop-all! router/stop-all!)

;; ============================================================================
;; Internal State (for testing/backward compatibility)
;; ============================================================================

(def active-adapters router/active-adapters)
(def chat-sessions session/chat-sessions)
(def streaming-state streaming/streaming-state)

;; ============================================================================
;; Command Re-exports
;; ============================================================================

(def extract-command commands/extract-command)
(def list-chat-tools commands/list-chat-tools)
(def chat-safe-tool? commands/chat-safe-tool?)

;; ============================================================================
;; Builder Re-exports
;; ============================================================================

(def handle-natural-message builders/handle-natural-message)
(def handle-canvas-message builders/handle-canvas-message)
(def handle-empathy-message builders/handle-empathy-message)
(def handle-vp-message builders/handle-vp-message)
(def handle-mvp-message builders/handle-mvp-message)
(def handle-workflow-message builders/handle-workflow-message)

;; ============================================================================
;; Streaming Re-exports (for testing)
;; ============================================================================

(def truncate-for-chat streaming/truncate-for-chat)
(def build-display-text streaming/build-display-text)
(def start-streaming! streaming/start-streaming!)
(def stop-streaming! streaming/stop-streaming!)
(def flush-edit! streaming/flush-edit!)
(def handle-stream-content! streaming/handle-stream-content!)

(comment
  ;; Usage
  (require '[ouroboros.chat.adapters :as adapters])

  ;; Create and register adapter
  (def tg-bot (adapters/telegram-bot "YOUR_BOT_TOKEN"))
  (register-adapter! :tg tg-bot)

  ;; Start all adapters
  (start-all!)

  ;; Stop all
  (stop-all!))