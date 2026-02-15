(ns ouroboros.embed
  "Embedding API for third-party integration

   Provides:
   - iframe embedding with sandboxed security
   - JavaScript SDK for programmatic control
   - Webhook support for events
   - API key authentication
   - CORS configuration

   Usage:
   (require '[ouroboros.embed :as embed])
   (embed/create-embed-token :user-123 :project-456)
   (embed/validate-token token)
   (embed/generate-iframe-html token {:width 800 :height 600})"
  (:require
   [clojure.string :as str]
   [crypto.random :as random]
   [com.wsscode.pathom3.connect.operation :as pco]
   [ouroboros.memory :as memory]
   [ouroboros.telemetry :as telemetry]
   [ouroboros.resolver-registry :as registry])
  (:import [java.time Instant Duration]))

;; ============================================================================
;; Token Management
;; ============================================================================

(defn generate-token
  "Generate a secure embed token"
  [user-id project-id & {:keys [expires-hours permissions]
                         :or {expires-hours 24
                              permissions [:read :write]}}]
  (let [token (random/hex 32)
        expires-at (.plus (Instant/now) (Duration/ofHours expires-hours))
        token-data {:token/value token
                    :token/user-id user-id
                    :token/project-id project-id
                    :token/permissions permissions
                    :token/created-at (str (Instant/now))
                    :token/expires-at (str expires-at)
                    :token/active? true}]

    ;; Store token
    (memory/save-value! (keyword (str "embed-token/" token)) token-data)

    (telemetry/emit! {:event :embed/token-created
                      :user-id user-id
                      :project-id project-id})

    token))

(defn validate-token
  "Validate an embed token"
  [token]
  (if-let [token-data (memory/get-value (keyword (str "embed-token/" token)))]
    (let [expires-at (Instant/parse (:token/expires-at token-data))
          now (Instant/now)]
      (if (.isAfter expires-at now)
        {:valid? true
         :token token-data}
        {:valid? false
         :error :token-expired}))
    {:valid? false
     :error :token-not-found}))

(defn revoke-token!
  "Revoke an embed token"
  [token]
  (let [key (keyword (str "embed-token/" token))]
    (memory/update! key #(assoc % :token/active? false))
    (memory/update! key #(assoc % :token/revoked-at (str (Instant/now))))
    {:revoked? true
     :token token}))

(defn list-user-tokens
  "List all active tokens for a user"
  [user-id]
  (->> (memory/get-all)
       (filter #(and (str/starts-with? (namespace (key %)) "embed-token")
                     (= (get-in (val %) [:token/user-id]) user-id)
                     (get-in (val %) [:token/active?])))
       (map (fn [[k v]]
              {:token/token (name k)
               :token/project-id (:token/project-id v)
               :token/created-at (:token/created-at v)
               :token/expires-at (:token/expires-at v)}))))

;; ============================================================================
;; iframe Generation
;; ============================================================================

(defn generate-iframe-url
  "Generate URL for iframe embedding"
  [token & {:keys [view mode]
            :or {view :canvas
                 mode :edit}}]
  (str "/embed?token=" token
       "&view=" (name view)
       "&mode=" (name mode)))

(defn generate-iframe-html
  "Generate complete iframe HTML"
  [token & {:keys [width height view mode sandbox]
            :or {width "100%"
                 height "600"
                 view :canvas
                 mode :edit
                 sandbox true}}]
  (let [url (generate-iframe-url token :view view :mode mode)
        sandbox-attr (when sandbox
                       "sandbox=\"allow-scripts allow-same-origin allow-popups\"")]
    (str "<iframe "
         "src=\"" url "\" "
         "width=\"" width "\" "
         "height=\"" height "\" "
         "frameborder=\"0\" "
         sandbox-attr
         "title=\"Ouroboros Canvas\" "
         "style=\"border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);\">"
         "</iframe>")))

;; ============================================================================
;; SDK Generation
;; ============================================================================

(defn generate-sdk-js
  "Generate JavaScript SDK code"
  [token]
  (str "// Ouroboros Embed SDK
(function() {
  'use strict';
  
  const TOKEN = '" token "';
  const BASE_URL = window.location.origin;
  
  class OuroborosEmbed {
    constructor(iframe) {
      this.iframe = iframe;
      this.listeners = {};
      this.init();
    }
    
    init() {
      window.addEventListener('message', (e) => {
        if (e.origin !== BASE_URL) return;
        this.handleMessage(e.data);
      });
    }
    
    handleMessage(data) {
      const { type, payload } = data;
      if (this.listeners[type]) {
        this.listeners[type].forEach(cb => cb(payload));
      }
    }
    
    on(event, callback) {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
      this.listeners[event].push(callback);
      return this;
    }
    
    postMessage(type, payload) {
      this.iframe.contentWindow.postMessage(
        { token: TOKEN, type, payload },
        BASE_URL
      );
    }
    
    // API Methods
    getCanvasState() {
      return new Promise((resolve) => {
        this.on('canvas:state', resolve);
        this.postMessage('canvas:getState');
      });
    }
    
    setCanvasState(state) {
      this.postMessage('canvas:setState', state);
    }
    
    export(format = 'json') {
      return new Promise((resolve) => {
        this.on('canvas:exported', resolve);
        this.postMessage('canvas:export', { format });
      });
    }
    
    destroy() {
      this.listeners = {};
    }
  }
  
  // Auto-initialize iframes with data-ouroboros attribute
  document.querySelectorAll('iframe[data-ouroboros]').forEach(iframe => {
    iframe._ouroboros = new OuroborosEmbed(iframe);
  });
  
  // Expose globally
  window.OuroborosEmbed = OuroborosEmbed;
})();"))

;; ============================================================================
;; Webhook Support
;; ============================================================================

(defn register-webhook!
  "Register a webhook URL for events"
  [user-id url events & {:keys [secret]}]
  (let [webhook-id (random/hex 16)
        webhook {:webhook/id webhook-id
                 :webhook/user-id user-id
                 :webhook/url url
                 :webhook/events (set events)
                 :webhook/secret (or secret (random/hex 32))
                 :webhook/created-at (str (Instant/now))
                 :webhook/active? true}]

    (memory/save-value! (keyword (str "webhook/" webhook-id)) webhook)

    (telemetry/emit! {:event :embed/webhook-registered
                      :user-id user-id
                      :webhook-id webhook-id})

    {:webhook/id webhook-id
     :webhook/secret (:webhook/secret webhook)}))

(defn trigger-webhook
  "Trigger a webhook event"
  [event-type payload]
  (let [webhooks (->> (memory/get-all)
                      (filter #(str/starts-with? (namespace (key %)) "webhook"))
                      (map val)
                      (filter #(and (:webhook/active? %)
                                    (contains? (:webhook/events %) event-type))))]

    (doseq [webhook webhooks]
      ;; In production, this would be an async HTTP call
      (println (str "Webhook: " (:webhook/url webhook)
                    " Event: " event-type
                    " Payload: " (pr-str payload))))

    {:triggered (count webhooks)}))

;; ============================================================================
;; CORS Configuration
;; ============================================================================

(def allowed-origins (atom #{"http://localhost:3000"}
                           "http://localhost:8080"
                           "https://app.example.com"))

(defn add-allowed-origin!
  "Add an allowed origin for CORS"
  [origin]
  (swap! allowed-origins conj origin)
  {:origin origin :allowed? true})

(defn remove-allowed-origin!
  "Remove an allowed origin"
  [origin]
  (swap! allowed-origins disj origin)
  {:origin origin :allowed? false})

(defn cors-headers
  "Generate CORS headers for a request"
  [origin]
  (if (contains? @allowed-origins origin)
    {"Access-Control-Allow-Origin" origin
     "Access-Control-Allow-Methods" "GET, POST, PUT, DELETE, OPTIONS"
     "Access-Control-Allow-Headers" "Content-Type, Authorization, X-Embed-Token"
     "Access-Control-Allow-Credentials" "true"}
    {}))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver embed-tokens
  "Get user's embed tokens"
  [{:keys [user/id]}]
  {::pco/input [:user/id]
   ::pco/output [{:user/embed-tokens [:token/token :token/project-id :token/expires-at]}]}
  {:user/embed-tokens (list-user-tokens id)})

(pco/defresolver embed-config
  "Get embed configuration for a project"
  [{:keys [project/id] user-id :user/id}]
  {::pco/input [:project/id :user/id]
   ::pco/output [:embed/url :embed/html]}
  (let [token (generate-token user-id id)]
    {:embed/url (generate-iframe-url token)
     :embed/html (generate-iframe-html token)}))

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation create-embed-token!
  "Create a new embed token"
  [{:keys [user-id project-id expires-hours permissions]}]
  {::pco/output [:token/value :token/expires-at]}
  (let [token (generate-token user-id project-id
                              :expires-hours (or expires-hours 24)
                              :permissions (or permissions [:read]))]
    {:token/value token
     :token/expires-at (str (.plus (Instant/now) (Duration/ofHours (or expires-hours 24))))}))

(pco/defmutation revoke-embed-token!
  "Revoke an embed token"
  [{:keys [token]}]
  {::pco/output [:revoked?]}
  (revoke-token! token))

(pco/defmutation register-webhook-mutation!
  "Register a webhook"
  [{:keys [user-id url events]}]
  {::pco/output [:webhook/id :webhook/secret]}
  (register-webhook! user-id url events))

;; ============================================================================
;; Registration
;; ============================================================================

(def resolvers [embed-tokens embed-config])
(def mutations [create-embed-token! revoke-embed-token! register-webhook-mutation!])

(registry/register-resolvers! resolvers)
(registry/register-mutations! mutations)

;; ============================================================================
;; Comment / Examples
;; ============================================================================

(comment
  ;; Create embed token
  (def token (generate-token :user-123 :project-456 :expires-hours 48))

  ;; Validate token
  (validate-token token)

  ;; Generate iframe HTML
  (println (generate-iframe-html token :width 800 :height 600))

  ;; Generate SDK
  (spit "sdk.js" (generate-sdk-js token))

  ;; Register webhook
  (register-webhook! :user-123 "https://example.com/webhook"
                     [:canvas/updated :comment/added])

  ;; Query via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{[:project/id :my-project]
         [:embed/url :embed/html]}]))
