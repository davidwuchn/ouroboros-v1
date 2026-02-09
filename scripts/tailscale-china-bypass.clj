#!/usr/bin/env bb
;; tailscale-china-bypass.clj
;; Configure macOS routing to bypass China IPs when using Tailscale
;; Usage: bb tailscale-china-bypass.clj [up|down|status]

(ns scripts.tailscale-china-bypass
  (:require [babashka.process :refer [shell]]
            [clojure.string :as str]
            [clojure.java.io :as io]))

;; China IP ranges sources
(def china-ip-sources
  ["http://www.ipdeny.com/ipblocks/data/countries/cn.zone"
   "https://raw.githubusercontent.com/17mon/china_ip_list/master/china_ip_list.txt"
   "https://raw.githubusercontent.com/gaoyifan/china-operator-ip/ip-lists/china.txt"])

(def cache-file (str (System/getProperty "user.home") "/.cache/tailscale-china-bypass/cn.zone"))
(def cache-max-age-hours 24)

(defn valid-cidr?
  "Check if a string is a valid CIDR notation (e.g. 1.2.3.0/24)"
  [s]
  (when (and (string? s) (not (str/blank? s)))
    (re-matches #"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/\d{1,2}" (str/trim s))))

(defn ensure-cache-dir
  "Ensure cache directory exists"
  []
  (let [cache-dir (io/file cache-file)]
    (.mkdirs (.getParentFile cache-dir))))

(defn cache-valid?
  "Check if cache file exists and is not too old"
  []
  (let [f (io/file cache-file)]
    (and (.exists f)
         (< (/ (- (System/currentTimeMillis) (.lastModified f))
               (* 1000 60 60))
            cache-max-age-hours))))

(defn read-cache
  "Read IP ranges from cache file, filtering out invalid entries"
  []
  (filterv valid-cidr? (str/split-lines (slurp cache-file))))

(defn write-cache
  "Write IP ranges to cache file"
  [content]
  (ensure-cache-dir)
  (spit cache-file content))

(defn fetch-from-source
  "Fetch IP ranges from a single source, filtering invalid entries"
  [source]
  (let [result (shell {:out :string :err :string :continue true}
                      "curl" "-s" "--max-time" "30" source)]
    (when (zero? (:exit result))
      (filterv valid-cidr? (str/split-lines (:out result))))))

(defn fetch-china-ips
  "Fetch China IP ranges from multiple sources with caching"
  []
  (if (cache-valid?)
    (do
      (println "Using cached China IP ranges...")
      (read-cache))
    (do
      (println "Fetching China IP ranges from multiple sources...")
      (let [all-ranges (atom [])
            success-count (atom 0)]
        (doseq [source china-ip-sources]
          (println "  Trying" source "...")
          (when-let [ranges (fetch-from-source source)]
            (swap! all-ranges concat ranges)
            (swap! success-count inc)
            (println "    ✓ Got" (count ranges) "ranges")))

        (if (zero? @success-count)
          (do
            (println "Error: Could not fetch from any source")
            (if (.exists (io/file cache-file))
              (do
                (println "Using stale cache...")
                (read-cache))
              []))
          (let [unique-ranges (vec (set @all-ranges))]
            (println "\n✓ Total unique ranges:" (count unique-ranges))
            (write-cache (str/join "\n" unique-ranges))
            unique-ranges))))))

(defn get-default-gateway
  "Get the default gateway for direct China traffic (physical interface)"
  []
  (let [result (shell {:out :string} "sh" "-c" "netstat -rn | grep '^default' | grep -v 'link#' | grep -v 'utun' | head -1 | awk '{print $2}'")]
    (str/trim (:out result))))

(defn get-tailscale-interface
  "Get the Tailscale interface name (usually utun*)"
  []
  (let [result (shell {:out :string} "sh" "-c" "ifconfig | grep -B1 'inet 100\\.' | head -1 | cut -d: -f1")]
    (str/trim (:out result))))

(defn prompt-sudo-password
  "Prompt user for sudo password and return it (hidden input)"
  []
  (print "Enter sudo password: ")
  (flush)
  (let [console (System/console)]
    (if console
      (String. (.readPassword console))
      (.readLine (io/reader *in*)))))

(def sudo-password (atom nil))

(defn get-sudo-password
  "Get cached sudo password or prompt for it"
  []
  (or @sudo-password
      (let [pwd (prompt-sudo-password)]
        (reset! sudo-password pwd)
        pwd)))

(defn add-routes-batch
  "Add multiple routes in a single batch - larger batches for speed"
  [cidrs gateway]
  (let [route-commands (str/join "\n"
                                 (map #(str "route add -net " % " " gateway) cidrs))
        result (shell {:out :string :err :string :continue true :in route-commands}
                      "sudo" "-n" "sh" "-c" "while read cmd; do eval $cmd 2>/dev/null || true; done")]
    (when (not (zero? (:exit result)))
      (println "Warning: Some routes may have failed to add"))))

(defn delete-routes-batch
  "Delete multiple routes in a single batch - larger batches for speed"
  [cidrs]
  (let [route-commands (str/join "\n"
                                 (map #(str "route delete -net " %) cidrs))
        result (shell {:out :string :err :string :continue true :in route-commands}
                      "sudo" "-n" "sh" "-c" "while read cmd; do eval $cmd 2>/dev/null || true; done")]
    (when (not (zero? (:exit result)))
      (println "Warning: Some routes may have failed to delete"))))

(defn add-route
  "Add a route for China IP via default gateway (bypass Tailscale)"
  [cidr gateway]
  (let [result (shell {:out :string :err :string :continue true}
                      "sudo" "-n" "route" "-q" "-n" "add" "-net" cidr gateway)]
    (when (and (not (zero? (:exit result)))
               (not (str/includes? (:err result) "File exists")))
      (println "Warning: Failed to add route for" cidr ":" (:err result)))))

(defn delete-route
  "Delete a route for China IP"
  [cidr]
  (shell {:out :string :err :string :continue true}
         "sudo" "-n" "route" "-q" "-n" "delete" "-net" cidr))

(defn ip-in-cidr?
  "Check if an IP address falls within a CIDR range"
  [ip cidr]
  (when (valid-cidr? cidr)
    (let [[network prefix] (str/split cidr #"/")
          prefix-len (Integer/parseInt prefix)
          ip-parts (mapv #(Integer/parseInt %) (str/split ip #"\."))
          net-parts (mapv #(Integer/parseInt %) (str/split network #"\."))
          mask (bit-shift-left -1 (- 32 prefix-len))
          ip-int (reduce (fn [acc part] (+ (bit-shift-left acc 8) part)) 0 ip-parts)
          net-int (reduce (fn [acc part] (+ (bit-shift-left acc 8) part)) 0 net-parts)
          ip-masked (bit-and ip-int mask)
          net-masked (bit-and net-int mask)]
      (= ip-masked net-masked))))

(defn test-bypass
  "Test if bypass is working by checking route to a China IP"
  []
  (println "\n=== Testing Bypass ===")
  ;; Test with baidu.com IP
  (let [test-ip "110.242.74.102"
        cidrs (fetch-china-ips)
        matching-cidr (first (filter #(ip-in-cidr? test-ip %) cidrs))]

    (if matching-cidr
      (do
        (println (str "✓ Found " test-ip " in CIDR: " matching-cidr))
        (let [result (shell {:out :string :err :string :continue true}
                            "sh" "-c" (str "netstat -rn | grep '^" matching-cidr "' | head -1"))]
          (if (str/blank? (:out result))
            (println "⚠ Warning: Route not found in routing table for " matching-cidr)
            (do
              (println "✓ China IP route configured:")
              (println " " (str/trim (:out result)))
              (if (str/includes? (:out result) "100.")
                (println "✗ FAIL: Traffic going through Tailscale (100.x.x.x)")
                (println "✓ PASS: Traffic going direct (not through Tailscale)"))))))
      (println "⚠ Warning: " test-ip " not found in any China CIDR range")))

  ;; Show sample routes
  (let [cidrs (fetch-china-ips)
        sample-cidrs (take 3 cidrs)]
    (when (seq sample-cidrs)
      (println "\n✓ Sample routes configured:")
      (doseq [cidr sample-cidrs]
        (let [result (shell {:out :string :err :string :continue true}
                            "sh" "-c" (str "netstat -rn | grep '^" cidr "' | head -1"))]
          (when (not (str/blank? (:out result)))
            (println " " (str/trim (:out result))))))))

  ;; Test China AI services
  (println "\n=== Testing China AI Services ===")
  (let [ai-services [{:name "minimaxi.com" :ip "8.130.49.194"}
                     {:name "moonshot.cn" :ip "103.143.17.156"}
                     {:name "kimi.com" :ip "103.143.17.156"}
                     {:name "bigmodel.cn" :ip "119.23.85.51"}]
        cidrs (fetch-china-ips)]
    (doseq [{:keys [name ip]} ai-services]
      (let [matching-cidr (first (filter #(ip-in-cidr? ip %) cidrs))]
        (if matching-cidr
          (let [network (first (str/split matching-cidr #"/"))
                prefix (Integer/parseInt (second (str/split matching-cidr #"/")))
                net-parts (str/split network #"\.")
                ;; macOS shortens routes based on prefix length
                ;; /8 -> 8/8, /16 -> 8.130/16, /24 -> 8.130.0/24
                octets-to-keep (cond
                                 (<= prefix 8) 1
                                 (<= prefix 16) 2
                                 (<= prefix 24) 3
                                 :else 4)
                short-network (str/join "." (take octets-to-keep net-parts))
                result (shell {:out :string :err :string :continue true}
                              "sh" "-c" (str "netstat -rn | grep -E '^" short-network "/" prefix "' | head -1"))]
            (if (str/blank? (:out result))
              (println (str "⚠ " name " (" ip "): CIDR " matching-cidr " found but route not configured"))
              (if (str/includes? (:out result) "100.")
                (println (str "✗ " name " (" ip "): FAIL - Going through Tailscale"))
                (println (str "✓ " name " (" ip "): PASS - Direct access")))))
          (println (str "⚠ " name " (" ip "): IP not in China CIDR ranges")))))))

(defn tailscale-up
  "Configure routing to bypass China IPs through default gateway"
  []
  (let [china-cidrs (fetch-china-ips)
        gateway (get-default-gateway)
        tailscale-iface (get-tailscale-interface)]
    (if (empty? china-cidrs)
      (println "No China IP ranges fetched. Check internet connection.")
      (do
        (println (str "Found " (count china-cidrs) " China CIDR blocks"))
        (println (str "Default gateway: " gateway))
        (println (str "Tailscale interface: " tailscale-iface))
        (println "\nAdding routes to bypass Tailscale for China IPs...")
        (println "(This requires sudo privileges)")
        (println "Tip: Run 'sudo -v' first to cache credentials, or you'll be prompted for each batch)")

        ;; Add routes in larger batches for maximum speed
        (println "Adding routes in batches of 500...")
        (let [start-time (System/currentTimeMillis)]
          (doseq [[batch-idx batch] (map-indexed vector (partition-all 500 china-cidrs))]
            (when (zero? (mod batch-idx 10))
              (println (str "Progress: " (* batch-idx 500) "/" (count china-cidrs))))
            (add-routes-batch batch gateway))
          (let [elapsed (/ (- (System/currentTimeMillis) start-time) 1000.0)]
            (println (str "\n✓ Added " (count china-cidrs) " routes in " elapsed " seconds"))
            (println "  - China traffic: Direct via default gateway")
            (println "  - Other traffic: Through Tailscale")
            ;; Auto-test the bypass
            (test-bypass)))))))

(defn tailscale-down
  "Remove China bypass routes"
  []
  (let [china-cidrs (fetch-china-ips)]
    (if (empty? china-cidrs)
      (println "No China IP ranges to remove.")
      (do
        (println (str "Removing " (count china-cidrs) " China bypass routes..."))
        (println "(This requires sudo privileges)")
        (println "Tip: Run 'sudo -v' first to cache credentials")

        ;; Delete routes in larger batches for maximum speed
        (println "Removing routes in batches of 500...")
        (let [start-time (System/currentTimeMillis)]
          (doseq [[batch-idx batch] (map-indexed vector (partition-all 500 china-cidrs))]
            (when (zero? (mod batch-idx 10))
              (println (str "Progress: " (* batch-idx 500) "/" (count china-cidrs))))
            (delete-routes-batch batch))
          (let [elapsed (/ (- (System/currentTimeMillis) start-time) 1000.0)]
            (println (str "\n✓ Removed " (count china-cidrs) " routes in " elapsed " seconds"))))))))

(defn tailscale-status
  "Show current routing status"
  []
  (println "=== Tailscale Status ===")
  (let [result (shell {:out :string :err :string} "tailscale" "status")]
    (println (:out result)))

  (println "\n=== China Routes (sample) ===")
  (let [result (shell {:out :string :err :string} "sh" "-c" "netstat -rn | grep -E '^1\\.0\\.|^14\\.' | head -10")]
    (if (str/blank? (:out result))
      (println "No China routes configured")
      (println (:out result))))

  (println "\n=== Default Gateway ===")
  (let [result (shell {:out :string :err :string} "sh" "-c" "netstat -rn | grep '^default'")]
    (println (:out result))))

(defn -main [& args]
  (case (first args)
    "up" (tailscale-up)
    "down" (tailscale-down)
    "status" (tailscale-status)
    (do
      (println "Tailscale China Bypass Tool for macOS")
      (println "")
      (println "Usage: bb tailscale-china-bypass.clj <command>")
      (println "")
      (println "Commands:")
      (println "  up      - Add routes to bypass Tailscale for China IPs")
      (println "  down    - Remove China bypass routes")
      (println "  status  - Show current Tailscale and routing status")
      (println "")
      (println "How it works:")
      (println "  1. Fetches China IP ranges from ipdeny.com")
      (println "  2. Adds static routes for China IPs via your default gateway")
      (println "  3. China traffic bypasses Tailscale, all other traffic uses Tailscale")
      (println "")
      (println "Note: This modifies system routes and requires sudo privileges.")
      (System/exit 1))))

(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
