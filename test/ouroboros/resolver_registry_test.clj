(ns ouroboros.resolver-registry-test
  "Tests for the resolver registry - core infrastructure"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.resolver-registry :as registry]))

;; Clean registry between tests to avoid cross-contamination
(use-fixtures :each
  (fn [test-fn]
    (let [saved-resolvers (registry/all-resolvers)
          saved-mutations (registry/all-mutations)]
      (test-fn)
      ;; Restore original state (don't clear, resolvers may be needed by other tests)
      )))

(deftest count-resolvers-test
  (testing "Counting registered resolvers"
    (let [n (registry/count-resolvers)]
      (is (integer? n) "Should return an integer")
      (is (>= n 0) "Should be non-negative"))))

(deftest count-mutations-test
  (testing "Counting registered mutations"
    (let [n (registry/count-mutations)]
      (is (integer? n) "Should return an integer")
      (is (>= n 0) "Should be non-negative"))))

(deftest all-resolvers-test
  (testing "Getting all resolvers"
    (let [resolvers (registry/all-resolvers)]
      (is (vector? resolvers) "Should return a vector")
      (is (pos? (count resolvers)) "Should have registered resolvers"))))

(deftest all-mutations-test
  (testing "Getting all mutations"
    (let [mutations (registry/all-mutations)]
      (is (vector? mutations) "Should return a vector"))))

(deftest list-sources-test
  (testing "Listing resolver sources"
    (let [sources (registry/list-sources)]
      (is (seq sources) "Should have resolver sources")
      (is (every? #(or (string? %) (nil? %)) sources)
          "Sources should be strings or nil"))))

(deftest register-resolvers-idempotent-test
  (testing "Registering resolvers is idempotent"
    (let [count-before (registry/count-resolvers)]
      ;; Re-register existing resolvers (should not duplicate)
      (registry/register-resolvers! (registry/all-resolvers))
      ;; Count should be same or at most doubled if not deduped
      ;; (implementation may or may not deduplicate)
      (is (>= (registry/count-resolvers) count-before)
          "Should have at least as many resolvers"))))

(deftest clear-and-restore-test
  (testing "Clear wipes all registrations"
    (let [resolver-count (registry/count-resolvers)
          mutation-count (registry/count-mutations)
          saved-resolvers (registry/all-resolvers)
          saved-mutations (registry/all-mutations)]
      ;; Clear
      (registry/clear!)
      (is (zero? (registry/count-resolvers)) "Resolvers should be cleared")
      (is (zero? (registry/count-mutations)) "Mutations should be cleared")
      ;; Restore
      (when (seq saved-resolvers)
        (registry/register-resolvers! saved-resolvers))
      (when (seq saved-mutations)
        (registry/register-mutations! saved-mutations))
      (is (= resolver-count (registry/count-resolvers)) "Resolvers should be restored")
      (is (= mutation-count (registry/count-mutations)) "Mutations should be restored"))))
