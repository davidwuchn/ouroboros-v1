(ns ouroboros.interface.schema
  "Interface for schema validation

   DEPRECATED: This namespace will be removed in a future version.
   Use ECA (https://github.com/editor-code-assistant/eca) for schema validation."
  (:require
   [ouroboros.schema :as schema]))

(defn ^:deprecated schema-validate
  "DEPRECATED: Use ECA for parameter validation.

   Validate parameters against a tool schema"
  [params tool-schema]
  (println "⚠️  DEPRECATED: iface/schema-validate is deprecated. Use ECA instead.")
  (schema/validate-params params tool-schema))

(defn ^:deprecated schema-validate-tool
  "DEPRECATED: Use ECA for tool call validation.

   Validate a complete tool call"
  [tool-name params tool-schema]
  (println "⚠️  DEPRECATED: iface/schema-validate-tool is deprecated. Use ECA instead.")
  (schema/validate-tool-call tool-name params tool-schema))

(defn ^:deprecated schema-strict
  "DEPRECATED: Use ECA for strict validation.

   Strict validation that rejects unknown parameters"
  [params tool-schema]
  (println "⚠️  DEPRECATED: iface/schema-strict is deprecated. Use ECA instead.")
  (schema/validate-strict params tool-schema))

(defn ^:deprecated schema-required
  "DEPRECATED: Use ECA for schema utilities.

   Get list of required parameter names from schema"
  [tool-schema]
  (println "⚠️  DEPRECATED: iface/schema-required is deprecated. Use ECA instead.")
  (schema/get-required-params tool-schema))

(defn ^:deprecated schema-optional
  "DEPRECATED: Use ECA for schema utilities.

   Get list of optional parameter names from schema"
  [tool-schema]
  (println "⚠️  DEPRECATED: iface/schema-optional is deprecated. Use ECA instead.")
  (schema/get-optional-params tool-schema))

(defn ^:deprecated schema->json
  "DEPRECATED: Use ECA for schema conversion.

   Convert internal schema format to JSON Schema"
  [tool-schema]
  (println "⚠️  DEPRECATED: iface/schema->json is deprecated. Use ECA instead.")
  (schema/schema->json-schema tool-schema))
