(ns ouroboros.frontend.model.chat
  "Chat data model"
  (:require
   [com.fulcrologic.fulcro.components :as comp :refer [defsc]]))

;; ============================================================================
;; Chat Session Entity
;; ============================================================================

(defsc ChatSession [_this _props]
  {:query [:chat/id
           :chat/message-count
           :chat/created-at
           :chat/platform
           :chat/running?]
   :ident :chat/id}
  {})

;; ============================================================================
;; Chat Adapter
;; ============================================================================

(defsc ChatAdapter [_this _props]
  {:query [:adapter/platform :adapter/running?]
   :ident (fn [] [:adapter/platform :chat/adapter])}
  {})

;; ============================================================================
;; Queries
;; ============================================================================

(defn sessions-query
  "Query for all chat sessions"
  []
  [{:chat/sessions (comp/get-query ChatSession)}])

(defn adapters-query
  "Query for all chat adapters"
  []
  [{:chat/adapters (comp/get-query ChatAdapter)}])
