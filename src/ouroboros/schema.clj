(ns ouroboros.schema
  "Schema validation for tool inputs

   Validates LLM tool call arguments against tool schemas before execution.
   Prevents malformed tool calls from executing with unexpected parameters.

   Schema format (Clojure-style):
   {:param-name {:type :string :description \"...\" :required true}
    :other-param {:type :int :description \"...\" :default 0}}

   Supported types:
   - :string - String values
   - :int - Integer values
   - :number - Numeric values (int or float)
   - :boolean - Boolean values
   - :keyword - Keyword values
   - :map - Map/object values
   - :vector - Array/vector values
   - :any - Any type accepted

   Usage:
     ;; Validate parameters against schema
     (validate-params {:path \"test.txt\"} tool-schema)
     => {:valid? true :params {:path \"test.txt\"}}

     ;; Validation with defaults and coercion
     (validate-params {} {:n {:type :int :default 5}})
     => {:valid? true :params {:n 5}}"
  (:require
   [clojure.string :as str]
   [ouroboros.telemetry :as telemetry]))

;; ============================================================================
;; Type Validation
;; ============================================================================

(defmulti validate-type
  "Validate a value against a type specification"
  (fn [value type-spec] type-spec))

(defmethod validate-type :string
  [value _]
  (string? value))

(defmethod validate-type :int
  [value _]
  (int? value))

(defmethod validate-type :number
  [value _]
  (number? value))

(defmethod validate-type :boolean
  [value _]
  (boolean? value))

(defmethod validate-type :keyword
  [value _]
  (keyword? value))

(defmethod validate-type :map
  [value _]
  (map? value))

(defmethod validate-type :vector
  [value _]
  (vector? value))

(defmethod validate-type :list
  [value _]
  (seq? value))

(defmethod validate-type :any
  [_ _]
  true)

(defmethod validate-type :default
  [value type-spec]
  ;; Unknown type - log warning but accept
  (telemetry/emit! {:event :schema/unknown-type
                    :type type-spec
                    :value-type (type value)})
  true)

;; ============================================================================
;; Coercion
;; ============================================================================

(defn- coerce-value
  "Coerce a value to the expected type if possible"
  [value type-spec]
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
;; Parameter Validation
;; ============================================================================

(defn- validate-param
  "Validate a single parameter against its schema

   Returns {:valid? boolean :value coerced-value :errors [strings]}"
  [param-name value schema]
  (let [param-type (get schema :type :any)
        required? (get schema :required false)
        default-value (get schema :default nil)
        has-value? (contains? value param-name)]

    (cond
      ;; Missing required parameter
      (and required? (not has-value?))
      {:valid? false
       :errors [(str "Missing required parameter: " (name param-name))]}

      ;; Missing optional parameter with default
      (and (not has-value?) (some? default-value))
      {:valid? true
       :value default-value
       :errors []}

      ;; Missing optional parameter without default
      (not has-value?)
      {:valid? true
       :value nil
       :errors []}

      ;; Has value - validate type
      :else
      (let [actual-value (get value param-name)
            coerced (coerce-value actual-value param-type)
            type-valid? (validate-type coerced param-type)]
        (if type-valid?
          {:valid? true
           :value coerced
           :errors []}
          {:valid? false
           :value actual-value
           :errors [(str "Invalid type for " (name param-name) 
                         ": expected " (name param-type) 
                         ", got " (type actual-value))]})))))

;; ============================================================================
;; Main Validation
;; ============================================================================

(defn validate-params
  "Validate parameters against a tool schema

   Args:
   - params: Map of parameter names to values
   - schema: Tool parameter schema map

   Returns:
   {:valid? boolean
    :params validated-and-coerced-params  ; includes defaults
    :errors [error-messages]}

   Usage:
     (validate-params {:path \"test.txt\"}
                      {:path {:type :string :required true}})
     => {:valid? true :params {:path \"test.txt\"} :errors []}"
  [params schema]
  (let [results (map (fn [[param-name param-schema]]
                       (let [result (validate-param param-name params param-schema)]
                         [param-name result]))
                     schema)
        valid? (every? #(get (second %) :valid?) results)
        validated-params (into {} 
                               (keep (fn [[param-name result]]
                                       (when (contains? result :value)
                                         [param-name (:value result)]))
                                     results))
        errors (mapcat #(get (second %) :errors []) results)]
    
    (telemetry/emit! {:event :schema/validation
                      :valid? valid?
                      :error-count (count errors)
                      :params (keys params)})
    
    {:valid? valid?
     :params validated-params
     :errors errors}))

(defn validate-tool-call
  "Validate a complete tool call

   Args:
   - tool-name: Keyword name of the tool
   - params: Map of parameters
   - tool-schema: Full tool schema (from tool-registry)

   Returns:
   {:valid? boolean
    :tool tool-name
    :params validated-params
    :errors [error-messages]}

   This is the main entry point for validating LLM tool calls."
  [tool-name params tool-schema]
  (let [param-schema (get tool-schema :parameters {})
        validation (validate-params params param-schema)]
    (assoc validation
           :tool tool-name
           :original-params params)))

;; ============================================================================
;; Strict Validation (for security-critical tools)
;; ============================================================================

(defn validate-strict
  "Strict validation that rejects unknown parameters

   Unlike validate-params, this rejects parameters not defined in the schema.
   Use for security-critical tools to prevent parameter injection."
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
;; Utility Functions
;; ============================================================================

(defn get-required-params
  "Get list of required parameter names from schema"
  [schema]
  (keep (fn [[param-name param-schema]]
          (when (get param-schema :required false)
            param-name))
        schema))

(defn get-optional-params
  "Get list of optional parameter names from schema"
  [schema]
  (keep (fn [[param-name param-schema]]
          (when-not (get param-schema :required false)
            param-name))
        schema))

(defn schema->json-schema
  "Convert internal schema format to JSON Schema"
  [schema]
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
  ;; Basic validation
  (validate-params {:path "test.txt"}
                   {:path {:type :string :required true}})

  ;; With defaults
  (validate-params {}
                   {:n {:type :int :default 5}})

  ;; Type coercion
  (validate-params {:n "42"}
                   {:n {:type :int :required true}})

  ;; Validation errors
  (validate-params {:path 123}
                   {:path {:type :string :required true}})

  ;; Strict validation
  (validate-strict {:path "test.txt" :extra "value"}
                   {:path {:type :string :required true}})

  ;; Get required/optional
  (get-required-params {:a {:required true} :b {:required false} :c {}})

  ;; Convert to JSON Schema
  (schema->json-schema {:path {:type :string :required true}
                        :lines {:type :int :default 100}}))
