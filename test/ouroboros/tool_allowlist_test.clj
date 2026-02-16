(ns ouroboros.tool-allowlist-test
  "Tests for tool allowlist - per-session permissions"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.tool-allowlist :as allow]))

(use-fixtures :each
  (fn [test-fn]
    (allow/reset-audit-log!)
    (test-fn)
    ;; Clean up test subjects
    (doseq [s [:test-subject :custom-subject :chat-subject]]
      (allow/destroy! s))
    (allow/reset-audit-log!)))

(deftest permission-levels-test
  (testing "Permission level definitions"
    (is (map? allow/permission-levels) "Should be a map")
    (is (set? (allow/level->tools :read-only)) "read-only should return a set")
    (is (set? (allow/level->tools :chat-safe)) "chat-safe should return a set")
    (is (set? (allow/level->tools :standard)) "standard should return a set")
    (is (set? (allow/level->tools :admin)) "admin should return a set")))

(deftest create-and-check-test
  (testing "Creating an allowlist and checking permissions"
    (allow/create! :test-subject :read-only)
    (is (allow/exists? :test-subject) "Subject should exist")
    (is (allow/permitted? :test-subject :memory/get) "Should permit read-only tool")
    (is (not (allow/permitted? :test-subject :file/write)) "Should deny write tool")))

(deftest create-custom-test
  (testing "Creating a custom allowlist"
    (allow/create-custom! :custom-subject #{:special/tool :other/tool})
    (is (allow/permitted? :custom-subject :special/tool) "Should permit custom tool")
    (is (not (allow/permitted? :custom-subject :memory/get)) "Should deny unlisted tool")))

(deftest destroy-test
  (testing "Destroying an allowlist"
    (allow/create! :test-subject :standard)
    (is (allow/exists? :test-subject))
    (allow/destroy! :test-subject)
    (is (not (allow/exists? :test-subject)) "Should not exist after destroy")))

(deftest permitted-tools-test
  (testing "Getting permitted tools for a subject"
    (allow/create! :test-subject :chat-safe)
    (let [tools (allow/permitted-tools :test-subject)]
      (is (set? tools) "Should return a set")
      (is (pos? (count tools)) "Should have some tools"))))

(deftest filter-permitted-test
  (testing "Filtering to only permitted tools"
    (allow/create! :test-subject :read-only)
    (let [all-tools [:memory/get :file/write :git/status :shell/exec]
          filtered (allow/filter-permitted :test-subject all-tools)]
      (is (every? #(allow/permitted? :test-subject %) filtered)
          "All filtered tools should be permitted"))))

(deftest default-deny-test
  (testing "Default deny for unknown subjects"
    (is (not (allow/permitted? :nonexistent-subject :memory/get))
        "Unknown subject should be denied by default")))

(deftest dangerous-tool-test
  (testing "Dangerous tool detection"
    (is (boolean? (allow/dangerous-tool? :file/write)) "Should return boolean")
    (is (boolean? (allow/requires-confirmation? :shell/exec)) "Should return boolean")))

(deftest stats-test
  (testing "Allowlist statistics"
    (allow/create! :test-subject :standard)
    (allow/permitted? :test-subject :memory/get)
    (let [stats (allow/stats)]
      (is (map? stats) "Should return a map"))))

(deftest audit-log-test
  (testing "Audit log captures permission checks"
    (allow/create! :test-subject :read-only)
    (allow/permitted? :test-subject :memory/get)
    (allow/permitted? :test-subject :file/write)
    (let [log (allow/audit-log)]
      (is (seq log) "Should have audit entries"))))
