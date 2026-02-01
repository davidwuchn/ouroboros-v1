(ns ouroboros.interface.api
  "API interface - HTTP requests"
  (:require
   [ouroboros.query :as query]))

(defn http-get
  "Make HTTP GET request
   
   Usage: (http-get \"https://api.github.com/users/github\")"
  [url]
  (query/q [{[:url url]
             [:api/status :api/body :api/success?]}]))

(defn http-request!
  "Make HTTP request (mutation)
   
   Usage: (http-request! {:method :post :url \"...\" :body \"...\"})"
  [{:keys [method url headers body]}]
  (query/m 'ouroboros.api/api-request!
           {:method method :url url :headers headers :body body}))
