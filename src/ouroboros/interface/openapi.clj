(ns ouroboros.interface.openapi
  "OpenAPI interface - OpenAPI specs → callable clients"
  (:require
   [ouroboros.query :as query]
   [ouroboros.openapi]))

(defn openapi-bootstrap!
  "Bootstrap an OpenAPI client from spec URL
   
   Usage: (openapi-bootstrap! :petstore \"https://petstore.swagger.io/v2/swagger.json\")"
  ([name spec-url]
   (openapi-bootstrap! name spec-url nil))
  ([name spec-url base-url]
   (query/m 'ouroboros.openapi/openapi-bootstrap!
            {:name name :spec-url spec-url :base-url base-url})))

(defn openapi-clients
  "List registered OpenAPI clients
   
   Usage: (openapi-clients)"
  []
  (query/q [:openapi/clients]))

(defn openapi-operations
  "List operations for a client
   
   Usage: (openapi-operations :petstore)"
  [client-name]
  (ouroboros.openapi/list-operations client-name))

(defn openapi-call!
  "Call an OpenAPI operation
   
   Usage: (openapi-call! :petstore :get-pet-by-id {:petId 1})"
  [client-name operation-id params]
  (ouroboros.openapi/call-operation client-name operation-id params))
