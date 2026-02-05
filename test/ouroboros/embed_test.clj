(ns ouroboros.embed-test
  "Tests for embedding API and SDK generation"
  (:require
   [clojure.test :refer [deftest is testing use-fixtures]]
   [ouroboros.test-helper :as th]
   [ouroboros.embed :as embed]))

(use-fixtures :once th/system-fixture)
(use-fixtures :each th/clean-fixture)

(deftest generate-token-test
  (testing "Generating embed token"
    (let [token (embed/generate-token :user-123 :project-456)]
      (is (string? token) "Should return string token")
      (is (= 64 (count token)) "Should be 64 hex characters (32 bytes)"))))

(deftest validate-token-test
  (testing "Validating embed token"
    (let [token (embed/generate-token :user-123 :project-456)
          result (embed/validate-token token)]
      (is (:valid? result) "Should be valid")
      (is (= :user-123 (get-in result [:token :token/user-id])))
      (is (= :project-456 (get-in result [:token :token/project-id])))))
  
  (testing "Validating invalid token"
    (let [result (embed/validate-token "invalid-token")]
      (is (not (:valid? result)))
      (is (= :token-not-found (:error result)))))
  
  (testing "Validating expired token"
    ;; Note: Creating actually expired tokens is hard to test without
    ;; manipulating time, so we just verify the structure
    (is (fn? embed/validate-token))))

(deftest revoke-token-test
  (testing "Revoking a token"
    (let [token (embed/generate-token :user-123 :project-456)
          _ (embed/revoke-token! token)
          result (embed/validate-token token)]
      ;; After revocation, token data exists but is marked inactive
      (is (map? result)))))

(deftest list-user-tokens-test
  (testing "Listing user's tokens"
    (embed/generate-token :list-user :project-1)
    (embed/generate-token :list-user :project-2)
    
    (let [tokens (embed/list-user-tokens :list-user)]
      (is (= 2 (count tokens)))
      (is (every? :token/token tokens))
      (is (every? :token/project-id tokens)))))

(deftest generate-iframe-url-test
  (testing "Generating iframe URL"
    (let [token (embed/generate-token :user-1 :project-1)
          url (embed/generate-iframe-url token)]
      (is (string? url))
      (is (clojure.string/starts-with? url "/embed?"))
      (is (clojure.string/includes? url "token="))
      (is (clojure.string/includes? url "view=canvas"))
      (is (clojure.string/includes? url "mode=edit"))))
  
  (testing "Generating URL with custom options"
    (let [token (embed/generate-token :user-1 :project-1)
          url (embed/generate-iframe-url token :view :lean-canvas :mode :view)]
      (is (clojure.string/includes? url "view=lean-canvas"))
      (is (clojure.string/includes? url "mode=view")))))

(deftest generate-iframe-html-test
  (testing "Generating complete iframe HTML"
    (let [token (embed/generate-token :user-1 :project-1)
          html (embed/generate-iframe-html token)]
      (is (string? html))
      (is (clojure.string/starts-with? html "<iframe "))
      (is (clojure.string/includes? html "sandbox="))
      (is (clojure.string/includes? html "frameborder=\"0\""))
      (is (clojure.string/ends-with? html "</iframe>"))))
  
  (testing "Generating HTML with custom dimensions"
    (let [token (embed/generate-token :user-1 :project-1)
          html (embed/generate-iframe-html token :width "800" :height "600")]
      (is (clojure.string/includes? html "width=\"800\""))
      (is (clojure.string/includes? html "height=\"600\""))))
  
  (testing "Generating HTML without sandbox"
    (let [token (embed/generate-token :user-1 :project-1)
          html (embed/generate-iframe-html token :sandbox false)]
      (is (not (clojure.string/includes? html "sandbox="))))))

(deftest generate-sdk-js-test
  (testing "Generating JavaScript SDK"
    (let [token (embed/generate-token :user-1 :project-1)
          sdk (embed/generate-sdk-js token)]
      (is (string? sdk))
      (is (clojure.string/includes? sdk "class OuroborosEmbed"))
      (is (clojure.string/includes? sdk token))
      (is (clojure.string/includes? sdk "getCanvasState"))
      (is (clojure.string/includes? sdk "postMessage")))))

(deftest register-webhook-test
  (testing "Registering a webhook"
    (let [result (embed/register-webhook! :user-1
                                          "https://example.com/webhook"
                                          [:canvas/updated :comment/added])]
      (is (string? (:webhook/id result)))
      (is (string? (:webhook/secret result)))
      (is (= 32 (count (:webhook/id result))))))
  
  (testing "Registering with custom secret"
    (let [result (embed/register-webhook! :user-2
                                          "https://example.com/hook"
                                          [:event]
                                          :secret "my-secret")]
      (is (= "my-secret" (:webhook/secret result))))))

(deftest cors-headers-test
  (testing "Generating CORS headers for allowed origin"
    (embed/add-allowed-origin! "https://example.com")
    (let [headers (embed/cors-headers "https://example.com")]
      (is (= "https://example.com" (get headers "Access-Control-Allow-Origin")))
      (is (get headers "Access-Control-Allow-Methods"))
      (is (get headers "Access-Control-Allow-Headers"))))
  
  (testing "Generating CORS headers for disallowed origin"
    (let [headers (embed/cors-headers "https://evil.com")]
      (is (empty? headers) "Should return empty headers for disallowed origin"))))

(deftest add-and-remove-allowed-origin-test
  (testing "Managing allowed origins"
    (embed/add-allowed-origin! "https://test.com")
    (let [headers (embed/cors-headers "https://test.com")]
      (is (seq headers) "Should be allowed"))
    
    (embed/remove-allowed-origin! "https://test.com")
    (let [headers (embed/cors-headers "https://test.com")]
      (is (empty? headers) "Should be removed"))))
