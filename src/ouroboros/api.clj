(ns ouroboros.api
  "API - HTTP client capabilities
   
   Provides HTTP client capabilities for making requests.
   Simple wrapper around babashka.http-client.
   
   Query: :api/request (makes HTTP requests)
   Mutations: api/request!"
  (:require
   [babashka.http-client :as http]
   [com.wsscode.pathom3.connect.operation :as pco]))

;; ============================================================================
;; HTTP Requests
;; ============================================================================

(defn http-request
  "Make an HTTP request"
  [{:keys [method url headers body]}]
  (try
    (let [response (case method
                     :get (http/get url {:headers headers})
                     :post (http/post url {:headers headers :body body})
                     :put (http/put url {:headers headers :body body})
                     :delete (http/delete url {:headers headers})
                     (http/get url {:headers headers}))]
      {:api/status (:status response)
       :api/body (:body response)
       :api/headers (:headers response)
       :api/success? (< (:status response) 400)})
    (catch Exception e
      {:api/error (.getMessage e)
       :api/success? false})))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver api-get [_env input]
  {::pco/input [:url]
   ::pco/output [:api/status :api/body :api/headers :api/success? :api/error]}
  (let [url (:url input)
        headers (get input :headers nil)]
    (http-request {:method :get :url url :headers headers})))

(pco/defresolver api-meta [_]
  {::pco/output [:api/meta]}
  {:api/meta {:api/version "0.1.0"
              :api/http-client "babashka.http-client"
              :api/methods [:get :post :put :delete]}})

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation api-request! [{:keys [method url headers body]}]
  {::pco/output [:api/status :api/body :api/headers :api/success? :api/error]}
  (http-request {:method (or method :get) :url url :headers headers :body body}))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  "Pathom resolvers for API queries"
  [api-get api-meta])

(def mutations
  "Pathom mutations for API operations"
  [api-request!])

(comment
  ;; Direct usage
  (http-request {:method :get :url "https://api.github.com/users/github"})
  
  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [{[:url "https://api.github.com/users/github"]
         [:api/status :api/body]}]))
