(ns ouroboros.schema
  "Schema validation for tool inputs

   DEPRECATED: This namespace will be removed in a future version.
   Schema validation is now handled by ECA (Editor Code Assistant).

   See: https://github.com/editor-code-assistant/eca

   This namespace provided:
   - Type validation for tool parameters
   - Parameter coercion
   - JSON Schema conversion

   All functionality is now handled by ECA's validation layer."
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Type Validation (DEPRECATED)
;; ============================================================================

(defmulti ^:deprecated validate-type
  "DEPRECATED: Use ECA for type validation."
  (fn [value type-spec] type-spec))

(defmethod ^:deprecated validate-type :string [value _] (string? value))
(defmethod ^:deprecated validate-type :int [value _] (int? value))
(defmethod ^:deprecated validate-type :number [value _] (number? value))
(defmethod ^:deprecated validate-type :boolean [value _] (boolean? value))
(defmethod ^:deprecated validate-type :keyword [value _] (keyword? value))
(defmethod ^:deprecated validate-type :map [value _] (map? value))
(defmethod ^:deprecated validate-type :vector [value _] (vector? value))
(defmethod ^:deprecated validate-type :list [value _] (seq? value))
(defmethod ^:deprecated validate-type :any [_ _] true)
(defmethod ^:deprecated validate-type :default [value type-spec]
  (telemetry/emit! {:event :schema/unknown-type
                    :type type-spec
                    :value-type (type value)})
  true)

;; ============================================================================
;; Coercion (DEPRECATED)
;; ============================================================================

(defn- ^:deprecated coerce-value [value type-spec]
  (case type-spec
    :string (str value)
    :int (try
           (if (string? value)
             (Integer/parseInt value)
             (int value))
           (catch Exception _ value))
    :number (try
              (if (string? value)
                (Double/parseDouble value)
                (double value))
              (catch Exception _ value))
    :keyword (if (string? value)
               (keyword value)
               value)
    value))

;; ============================================================================
;; Parameter Validation (DEPRECATED)
;; ============================================================================

(defn- ^:deprecated validate-param [param-name value schema]
  (let [param-type (get schema :type :any)
        required? (get schema :required false)
        default-value (get schema :default nil)
        has-value? (contains? value param-name)]

    (cond
      (and required? (not has-value?))
      {:valid? false
       :errors [(str "Missing required parameter: " (name param-name))]}

      (and (not has-value?) (some? default-value))
      {:valid? true :value default-value :errors []}

      (not has-value?)
      {:valid? true :value nil :errors []}

      :else
      (let [actual-value (get value param-name)
            coerced (coerce-value actual-value param-type)
            type-valid? (validate-type coerced param-type)]
        (if type-valid?
          {:valid? true :value coerced :errors []}
          {:valid? false
           :value actual-value
           :errors [(str "Invalid type for " (name param-name)
                         ": expected " (name param-type)
                         ", got " (type actual-value))]})))))

(defn ^:deprecated validate-params
  "DEPRECATED: Use ECA for parameter validation.

   Validate parameters against a tool schema"
  [params schema]
  (let [results (map (fn [[param-name param-schema]]
                       (let [result (validate-param param-name params param-schema)]
                         [param-name result]))
                     schema)
        valid? (every? #(get (second %) :valid?) results)
        validated-params (into {}
                               (keep (fn [[param-name result]]
                                       (when (contains? result :value)
                                         [param-name (:value result)])))
                                     results)
        errors (mapcat #(get (second %) :errors []) results)]

    (telemetry/emit! {:event :schema/validation
                      :valid? valid?
                      :error-count (count errors)
                      :params (keys params)})

    {:valid? valid?
     :params validated-params
     :errors errors}))

(defn ^:deprecated validate-tool-call
  "DEPRECATED: Use ECA for tool call validation.

   Validate a complete tool call"
  [tool-name params tool-schema]
  (let [param-schema (get tool-schema :parameters {})
        validation (validate-params params param-schema)]
    (assoc validation
           :tool tool-name
           :original-params params)))

;; ============================================================================
;; Strict Validation (DEPRECATED)
;; ============================================================================

(defn ^:deprecated validate-strict
  "DEPRECATED: Use ECA for strict validation.

   Strict validation that rejects unknown parameters"
  [params schema]
  (let [allowed-params (set (keys schema))
        actual-params (set (keys params))
        unknown-params (clojure.set/difference actual-params allowed-params)
        base-validation (validate-params params schema)]

    (if (seq unknown-params)
      (do
        (telemetry/emit! {:event :schema/unknown-params-rejected
                          :unknown-params unknown-params})
        {:valid? false
         :params (:params base-validation)
         :errors (concat (:errors base-validation)
                         (map #(str "Unknown parameter: " (name %)) unknown-params))})
      base-validation)))

;; ============================================================================
;; Utility Functions (DEPRECATED)
;; ============================================================================

(defn ^:deprecated get-required-params [schema]
  "DEPRECATED: Use ECA for schema utilities."
  (keep (fn [[param-name param-schema]]
          (when (get param-schema :required false)
            param-name))
        schema))

(defn ^:deprecated get-optional-params [schema]
  "DEPRECATED: Use ECA for schema utilities."
  (keep (fn [[param-name param-schema]]
          (when-not (get param-schema :required false)
            param-name))
        schema))

(defn ^:deprecated schema->json-schema [schema]
  "DEPRECATED: Use ECA for schema conversion.

   Convert internal schema format to JSON Schema"
  {:type "object"
   :properties (into {}
                     (map (fn [[param-name param-schema]]
                            [(name param-name)
                             (case (:type param-schema)
                               :string {:type "string"}
                               :int {:type "integer"}
                               :number {:type "number"}
                               :boolean {:type "boolean"}
                               :map {:type "object"}
                               :vector {:type "array"}
                               {:type "string"})])
                          schema))
   :required (mapv name (get-required-params schema))})

(comment
  ;; DEPRECATED - All functions will be removed
  (validate-params {:path "test.txt"}
                    {:path {:type :string :required true}})

  ;; Strict validation (deprecated)
  (validate-strict {:path "test.txt" :extra "value"}
                  {:path {:type :string :required true}})

  ;; Get required/optional (deprecated)
  (get-required-params {:a {:required true} :b {:required false} :c {}}))
