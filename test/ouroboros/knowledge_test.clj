(ns ouroboros.knowledge-test
  "Knowledge Tests - File system resolvers

   Tests the knowledge namespace loads correctly and resolvers are defined.
   Full resolver integration testing is covered by existing query tests."
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [clojure.string :as str]
   [ouroboros.test-helper :as th]
   [ouroboros.resolver-registry :as registry]
   [ouroboros.knowledge :as knowledge]))

;; ============================================================================
;; Test Fixtures
;; ============================================================================

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

;; ============================================================================
;; Resolver Registration Tests
;; ============================================================================

(deftest test-knowledge-resolvers-registered
  (testing "Knowledge resolvers are registered with resolver-registry"
    (let [all-resolvers (registry/all-resolvers)
          resolver-names (map (comp :com.wsscode.pathom3.connect.operation/op-name :config) all-resolvers)
          knowledge-resolvers (filter #(str/starts-with? (str %) "ouroboros.knowledge") resolver-names)]
      (is (seq knowledge-resolvers) "Knowledge resolvers should be registered")
      (is (= 6 (count knowledge-resolvers)) "Should have 6 knowledge resolvers")
      ;; Check specific resolvers exist
      (is (some #(= 'ouroboros.knowledge/knowledge-files %) knowledge-resolvers))
      (is (some #(= 'ouroboros.knowledge/knowledge-file %) knowledge-resolvers))
      (is (some #(= 'ouroboros.knowledge/knowledge-content %) knowledge-resolvers))
      (is (some #(= 'ouroboros.knowledge/knowledge-content-preview %) knowledge-resolvers))
      (is (some #(= 'ouroboros.knowledge/knowledge-project %) knowledge-resolvers))
      (is (some #(= 'ouroboros.knowledge/knowledge-search %) knowledge-resolvers)))))

;; ============================================================================
;; Namespace API Tests
;; ============================================================================

(deftest test-resolvers-list
  (testing "All resolvers are defined in namespace"
    (is (vector? knowledge/resolvers))
    (is (= 6 (count knowledge/resolvers)))
    ;; Resolvers are Pathom resolver objects
    (is (seq knowledge/resolvers))))


