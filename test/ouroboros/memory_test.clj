(ns ouroboros.memory-test
  "Tests for the memory subsystem - persistence layer"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.memory :as memory]))

(use-fixtures :each
  (fn [test-fn]
    ;; Clean up test keys before and after each test
    (doseq [k [:mem-test/a :mem-test/b :mem-test/c :mem-test/counter
                :mem-test/nested :mem-test/nil-val]]
      (memory/delete-value! k))
    (test-fn)
    (doseq [k [:mem-test/a :mem-test/b :mem-test/c :mem-test/counter
                :mem-test/nested :mem-test/nil-val]]
      (memory/delete-value! k))))

(deftest save-and-get-test
  (testing "Save and retrieve a value"
    (let [result (memory/save-value! :mem-test/a "hello")]
      (is (map? result) "save-value! should return a map")
      (is (:memory/saved? result) "Should indicate saved"))
    (is (= "hello" (memory/get-value :mem-test/a))
        "get-value should return saved value")))

(deftest get-missing-key-test
  (testing "Getting a non-existent key returns nil"
    (is (nil? (memory/get-value :mem-test/nonexistent))
        "Should return nil for missing key")))

(deftest delete-value-test
  (testing "Deleting a value"
    (memory/save-value! :mem-test/b "to-delete")
    (is (= "to-delete" (memory/get-value :mem-test/b)))
    (let [result (memory/delete-value! :mem-test/b)]
      (is (map? result) "delete-value! should return a map")
      (is (:memory/deleted? result) "Should indicate deleted"))
    (is (nil? (memory/get-value :mem-test/b))
        "Value should be gone after delete")))

(deftest update-value-test
  (testing "Updating a value with a function"
    (memory/save-value! :mem-test/counter 0)
    (memory/update! :mem-test/counter inc)
    (is (= 1 (memory/get-value :mem-test/counter)) "Should be incremented")
    (memory/update! :mem-test/counter #(+ % 10))
    (is (= 11 (memory/get-value :mem-test/counter)) "Should be 11")))

(deftest update-nil-key-test
  (testing "Updating a non-existent key"
    (memory/update! :mem-test/nil-val #(if % (inc %) 42))
    (is (= 42 (memory/get-value :mem-test/nil-val))
        "Should apply fn to nil for missing key")))

(deftest save-complex-values-test
  (testing "Save and retrieve complex data structures"
    (let [complex-val {:name "test"
                       :tags #{:a :b}
                       :nested {:deep [1 2 3]}}]
      (memory/save-value! :mem-test/nested complex-val)
      (is (= complex-val (memory/get-value :mem-test/nested))
          "Should preserve complex data structures"))))

(deftest get-all-test
  (testing "Getting all memory entries"
    (memory/save-value! :mem-test/a 1)
    (memory/save-value! :mem-test/b 2)
    (let [all (memory/get-all)]
      (is (map? all) "Should return a map")
      (is (= 1 (get all :mem-test/a)) "Should contain a")
      (is (= 2 (get all :mem-test/b)) "Should contain b"))))

(deftest init-test
  (testing "Init loads memory from disk"
    (let [result (memory/init!)]
      (is (map? result) "init! should return a map"))))

(deftest resolvers-defined-test
  (testing "Memory resolvers are defined"
    (is (vector? memory/resolvers) "Should have resolvers vector")
    (is (pos? (count memory/resolvers)) "Should have resolvers")))

(deftest mutations-defined-test
  (testing "Memory mutations are defined"
    (is (vector? memory/mutations) "Should have mutations vector")
    (is (pos? (count memory/mutations)) "Should have mutations")))
