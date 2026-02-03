(ns ouroboros.interface.schema
  "Interface for schema validation

   Provides user-facing functions for validating tool parameters."
  (:require
   [ouroboros.schema :as schema]))

(defn schema-validate
  "Validate parameters against a tool schema

   Usage: (schema-validate {:path \"test.txt\"}
                           {:path {:type :string :required true}})

   Returns: {:valid? true :params {...} :errors []}"
  [params tool-schema]
  (schema/validate-params params tool-schema))

(defn schema-validate-tool
  "Validate a complete tool call

   Usage: (schema-validate-tool :file/read {:path \"test.txt\"} tool-definition)"
  [tool-name params tool-schema]
  (schema/validate-tool-call tool-name params tool-schema))

(defn schema-strict
  "Strict validation that rejects unknown parameters

   Use for security-critical tools to prevent parameter injection."
  [params tool-schema]
  (schema/validate-strict params tool-schema))

(defn schema-required
  "Get list of required parameter names from schema"
  [tool-schema]
  (schema/get-required-params tool-schema))

(defn schema-optional
  "Get list of optional parameter names from schema"
  [tool-schema]
  (schema/get-optional-params tool-schema))

(defn schema->json
  "Convert internal schema format to JSON Schema"
  [tool-schema]
  (schema/schema->json-schema tool-schema))
