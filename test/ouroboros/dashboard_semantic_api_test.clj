(ns ouroboros.dashboard-semantic-api-test
  "Tests for Dashboard Semantic Search API"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.dashboard.semantic-api :as sem-api]
   [ouroboros.test-helper :as th]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest test-semantic-resolvers-defined
  (testing "Semantic resolvers are defined"
    (is (= 4 (count sem-api/resolvers)))
    (is (seq sem-api/resolvers))))

(deftest test-semantic-mutations-defined
  (testing "Semantic mutations are defined"
    (is (= 4 (count sem-api/mutations)))
    (is (seq sem-api/mutations))))

(deftest test-semantic-api-exports
  (testing "All expected exports are present"
    (is (var? #'sem-api/resolvers))
    (is (var? #'sem-api/mutations))
    (is (vector? sem-api/resolvers))
    (is (vector? sem-api/mutations))))

(deftest test-resolver-op-names
  (testing "Resolvers have correct operation names"
    (let [op-names (map #(get-in % [:config :com.wsscode.pathom3.connect.operation/op-name]) sem-api/resolvers)]
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-availability %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-index-stats %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-user-stats %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-stale-links %) op-names)))))

(deftest test-mutation-op-names
  (testing "Mutations have correct operation names"
    (let [op-names (map #(get-in % [:config :com.wsscode.pathom3.connect.operation/op-name]) sem-api/mutations)]
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-search-learn %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-batch-relink %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-cleanup-stale %) op-names))
      (is (some #(= 'ouroboros.dashboard.semantic-api/semantic-update-index %) op-names)))))

(deftest test-resolver-outputs
  (testing "Resolvers have expected outputs"
    (let [availability-resolver (first (filter #(= 'ouroboros.dashboard.semantic-api/semantic-availability 
                                                   (get-in % [:config :com.wsscode.pathom3.connect.operation/op-name]))
                                               sem-api/resolvers))]
      (is (some? availability-resolver))
      (let [output (get-in availability-resolver [:config :com.wsscode.pathom3.connect.operation/output])]
        (is (some #{:semantic/available?} output))
        (is (some #{:semantic/healthy?} output))
        (is (some #{:semantic/version} output))))))

(deftest test-mutation-outputs
  (testing "Mutations have expected outputs"
    (let [search-mutation (first (filter #(= 'ouroboros.dashboard.semantic-api/semantic-search-learn
                                             (get-in % [:config :com.wsscode.pathom3.connect.operation/op-name]))
                                         sem-api/mutations))]
      (is (some? search-mutation))
      (let [output (get-in search-mutation [:config :com.wsscode.pathom3.connect.operation/output])]
        (is (vector? output))
        (is (= 1 (count output)))
        (is (contains? (first output) :semantic/results))))))
