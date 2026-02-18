(ns ouroboros.component-test
  (:require [clojure.test :refer :all]
            [ouroboros.component :as comp]))

;; ============================================================================
;; Component Definition Tests
;; ============================================================================

(deftest test-defcomponent-creates-component
  (testing "defcomponent creates a component in registry"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    ;; Define test component
    (comp/defcomponent test-component
      :start (fn [] {:value :started})
      :stop (fn [s] nil))
    
    ;; Verify component exists
    (let [c (comp/component :test-component)]
      (is (some? c))
      (is (= :test-component (:name c)))
      (is (fn? (:start c)))
      (is (fn? (:stop c))))))

(deftest test-component-dependencies
  (testing "Component can declare dependencies"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    ;; Define components with dependencies
    (comp/defcomponent dep-a
      :start (fn [] {:value :a}))
    
    (comp/defcomponent dep-b
      :dependencies [:dep-a]
      :start (fn [] {:value :b}))
    
    ;; Verify dependencies
    (let [b (comp/component :dep-b)]
      (is (= [:dep-a] (:dependencies b))))))

;; ============================================================================
;; Lifecycle Tests
;; ============================================================================

(deftest test-start-component
  (testing "Starting a component executes start function"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    (let [start-called (atom false)]
      (comp/defcomponent test-start
        :start (fn [] (reset! start-called true) {:result :ok}))
      
      (comp/start :test-start)
      
      (is @start-called)
      (is (comp/running? :test-start))
      (is (= {:result :ok} (comp/state :test-start))))))

(deftest test-stop-component
  (testing "Stopping a component executes stop function"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    (let [stop-called (atom false)]
      (comp/defcomponent test-stop
        :start (fn [] {:value :running})
        :stop (fn [s] (reset! stop-called true)))
      
      (comp/start :test-stop)
      (comp/stop :test-stop)
      
      (is @stop-called)
      (is (not (comp/running? :test-stop))))))

(deftest test-start-dependencies-first
  (testing "Components start in dependency order"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    (let [order (atom [])]
      (comp/defcomponent first
        :start (fn [] (swap! order conj :first) {:value :first}))
      
      (comp/defcomponent second
        :dependencies [:first]
        :start (fn [] (swap! order conj :second) {:value :second}))
      
      (comp/start :second)
      
      (is (= [:first :second] @order))))

;; ============================================================================
;; Status Tests
;; ============================================================================

(deftest test-status-returns-all-components
  (testing "Status returns all registered components"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    (comp/defcomponent status-test-1
      :start (fn [] {}))
    
    (comp/defcomponent status-test-2
      :start (fn [] {}))
    
    (let [status (comp/status)]
      (is (vector? status))
      (is (> (count status) 0)))))

(deftest test-healthy-when-all-running
  (testing "healthy? returns true when all components running"
    ;; Clear registry
    (reset! comp/component-registry {})
    (reset! comp/running-components #{})
    
    (comp/defcomponent healthy-test
      :start (fn [] {}))
    
    (comp/start :healthy-test)
    
    (is (comp/healthy?))))

;; ============================================================================
;; Run Tests
;; ============================================================================

(comment
  (run-tests)))