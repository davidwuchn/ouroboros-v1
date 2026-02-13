(ns ouroboros.schema-test
  "Tests for schema validation and coercion"
  (:require
   [clojure.test :refer [deftest is testing]]
   [ouroboros.schema :as schema]))

;; Schema format: {param-name {:type :string :required true/false}}

(deftest validate-type-test
  (testing "Type validation"
    (is (true? (schema/validate-type "hello" :string)))
    (is (false? (schema/validate-type 123 :string)))
    (is (true? (schema/validate-type 42 :int)))
    (is (false? (schema/validate-type "42" :int)))
    (is (true? (schema/validate-type 3.14 :number)))
    (is (true? (schema/validate-type 42 :number)))
    (is (true? (schema/validate-type true :boolean)))
    (is (true? (schema/validate-type false :boolean)))
    (is (false? (schema/validate-type "true" :boolean)))
    (is (true? (schema/validate-type :foo :keyword)))
    (is (true? (schema/validate-type {} :map)))
    (is (true? (schema/validate-type [] :vector)))))

(deftest validate-params-test
  (testing "Full parameter validation"
    (let [test-schema {:name {:type :string :required true}
                       :age {:type :int}}
          good-result (schema/validate-params {:name "Alice" :age 30} test-schema)
          missing-result (schema/validate-params {:age 30} test-schema)]
      (is (:valid? good-result) "Valid params should pass")
      (is (not (:valid? missing-result)) "Missing required param should fail")
      (is (seq (:errors missing-result)) "Should have error messages"))))

(deftest validate-tool-call-test
  (testing "Tool call validation"
    (let [tool-schema {:parameters {:query {:type :string :required true}}}
          result (schema/validate-tool-call :test/tool {:query "hello"} tool-schema)]
      (is (:valid? result) "Valid tool call should pass")
      (is (= :test/tool (:tool result)) "Should include tool name"))))

(deftest validate-strict-test
  (testing "Strict validation rejects unknown params"
    (let [test-schema {:name {:type :string :required true}}
          result (schema/validate-strict {:name "Alice" :unknown "extra"} test-schema)]
      (is (not (:valid? result)) "Should reject unknown params")
      (is (some #(re-find #"Unknown" %) (:errors result))
          "Should mention unknown parameter"))))

(deftest get-required-params-test
  (testing "Extracting required parameters"
    (let [test-schema {:name {:type :string :required true}
                       :age {:type :int}}
          required (schema/get-required-params test-schema)]
      (is (= [:name] (vec required)) "Should return required params"))))

(deftest get-optional-params-test
  (testing "Extracting optional parameters"
    (let [test-schema {:name {:type :string :required true}
                       :age {:type :int}}
          optional (schema/get-optional-params test-schema)]
      (is (= [:age] (vec optional)) "Should return optional params"))))

(deftest schema-to-json-schema-test
  (testing "Converting to JSON Schema"
    (let [test-schema {:name {:type :string :description "Name" :required true}}
          json-schema (schema/schema->json-schema test-schema)]
      (is (map? json-schema) "Should return a map"))))
