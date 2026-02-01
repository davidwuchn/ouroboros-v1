(ns ouroboros.openapi
  "OpenAPI - OpenAPI specs → callable clients via Martian
   
   Loads OpenAPI specifications and exposes them as queryable
   operations in the Pathom graph."
  (:require
   [babashka.http-client :as http]
   [cheshire.core :as json]
   [clojure.string :as str]
   [com.wsscode.pathom3.connect.operation :as pco]
   [martian.core :as martian]))

;; ============================================================================
;; Client Registry
;; ============================================================================

(defonce ^:private clients (atom {}))

(defn register-client!
  "Register an OpenAPI client with a name"
  [name client]
  (swap! clients assoc name client)
  (println (str "✓ OpenAPI client registered: " name)))

(defn get-client
  "Get a registered client by name"
  [name]
  (get @clients (keyword name)))

(defn list-clients
  "List all registered OpenAPI clients"
  []
  (keys @clients))

;; ============================================================================
;; OpenAPI Loading
;; ============================================================================

(defn load-spec
  "Load OpenAPI spec from URL or file"
  [source]
  (try
    (if (str/starts-with? source "http")
      ;; Load from URL
      (let [response (http/get source)]
        (if (< (:status response) 400)
          (json/parse-string (:body response) true)
          {:openapi/error (str "HTTP " (:status response))}))
      ;; Load from file
      (if (java.io.File. source)
        (json/parse-string (slurp source) true)
        {:openapi/error "File not found"}))
    (catch Exception e
      {:openapi/error (.getMessage e)})))

(defn create-client
  "Create a Martian client from OpenAPI spec"
  ([spec-url]
   (create-client spec-url nil))
  ([spec-url base-url]
   (let [spec (load-spec spec-url)]
     (if (:openapi/error spec)
       spec
       (let [base (or base-url
                      (get-in spec [:servers 0 :url])
                      (when-let [host (:host spec)]
                        (str (first (:schemes spec ["https"])) "://" host (:basePath spec "")))
                      "http://localhost")]
         (martian/bootstrap-openapi base spec))))))

(defn bootstrap!
  "Bootstrap an OpenAPI client and register it
   
   Usage: (bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  [name spec-url & {:keys [base-url]}]
  (let [client (create-client spec-url base-url)]
    (if (:openapi/error client)
      (do (println (str "✗ Failed to load " name ": " (:openapi/error client)))
          client)
      (do (register-client! name client)
          {:openapi/name name
           :openapi/spec-url spec-url
           :openapi/operations (map :route-name (martian/explore client))}))))

;; ============================================================================
;; Operation Discovery
;; ============================================================================

(defn list-operations
  "List all operations available on a client"
  [client-name]
  (when-let [client (get-client client-name)]
    (martian/explore client)))

(defn get-operation
  "Get details about a specific operation"
  [client-name operation-id]
  (when-let [client (get-client client-name)]
    (martian/explore client operation-id)))

;; ============================================================================
;; Operation Execution
;; ============================================================================

(defn call-operation
  "Call an operation on a client"
  [client-name operation-id params]
  (when-let [client (get-client client-name)]
    (try
      ;; Martian's response-for needs an HTTP implementation.
      ;; For babashka, we use the request-for to get the URL/method/body
      ;; and then use babashka.http-client directly.
      (let [request (martian/request-for client operation-id params)
            response (case (:method request :get)
                       :get (http/get (:url request) {:headers (:headers request)})
                       :post (http/post (:url request) {:headers (:headers request)
                                                        :body (:body request)})
                       :put (http/put (:url request) {:headers (:headers request)
                                                      :body (:body request)})
                       :delete (http/delete (:url request) {:headers (:headers request)})
                       (http/get (:url request) {:headers (:headers request)}))]
        {:openapi/status (:status response)
         :openapi/body (:body response)
         :openapi/success? (< (:status response) 400)})
      (catch Exception e
        {:openapi/error (.getMessage e)
         :openapi/success? false}))))

;; ============================================================================
;; Pathom Resolvers
;; ============================================================================

(pco/defresolver openapi-clients [_]
  {::pco/output [{:openapi/clients [:openapi/name :openapi/spec-url]}]}
  {:openapi/clients
   (map (fn [[name _]]
          {:openapi/name name
           :openapi/spec-url (str "registered://" name)})
        @clients)})

(pco/defresolver openapi-operations [{:keys [openapi-client]}]
  {::pco/input [:openapi-client]
   ::pco/output [{:openapi/operations [:operation/id :operation/summary
                                       :operation/method :operation/path]}]}
  (when-let [client (get-client openapi-client)]
    {:openapi/operations
     (map (fn [op]
            {:operation/id (:route-name op)
             :operation/summary (:summary op)
             :operation/method (str/upper-case (name (:method op)))
             :operation/path (:path op)})
          (martian/explore client))}))

(pco/defresolver openapi-operation-detail [{:keys [openapi-client operation-id]}]
  {::pco/input [:openapi-client :operation-id]
   ::pco/output [:operation/parameters :operation/response-schemas]}
  (when-let [client (get-client openapi-client)]
    (let [op (martian/explore client (keyword operation-id))]
      {:operation/parameters (:parameters op)
       :operation/response-schemas (:response-schemas op)})))

;; ============================================================================
;; Mutations
;; ============================================================================

(pco/defmutation openapi-call! [{:keys [openapi-client operation-id params]}]
  {::pco/output [:openapi/status :openapi/body :openapi/success? :openapi/error]}
  (call-operation (keyword openapi-client) (keyword operation-id) params))

(pco/defmutation openapi-bootstrap! [{:keys [name spec-url base-url]}]
  {::pco/output [:openapi/name :openapi/spec-url :openapi/operations :openapi/error]}
  (bootstrap! (keyword name) spec-url :base-url base-url))

;; ============================================================================
;; Exports
;; ============================================================================

(def resolvers
  "Pathom resolvers for OpenAPI"
  [openapi-clients openapi-operations openapi-operation-detail])

(def mutations
  "Pathom mutations for OpenAPI operations"
  [openapi-call! openapi-bootstrap!])

(comment
  ;; Bootstrap a client
  (bootstrap! :petstore "https://petstore.swagger.io/v2/swagger.json")

  ;; List operations
  (list-operations :petstore)

  ;; Get operation details
  (get-operation :petstore :get-pet-by-id)

  ;; Call an operation
  (call-operation :petstore :get-pet-by-id {:petId 1})

  ;; Via Pathom
  (require '[ouroboros.query :as q])
  (q/q [:openapi/clients])
  (q/q [{[:openapi-client :petstore]
         [{:openapi/operations [:operation/id :operation/summary]}]}]))
