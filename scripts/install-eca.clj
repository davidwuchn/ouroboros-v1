#!/usr/bin/env bb
"""
ECA Installer Script

Downloads and installs the ECA (Editor Code Assistant) binary
to the appropriate location based on the OS.

Usage:
  bb setup:eca              # Install to default location (~/.local/bin)
  bb setup:eca /usr/local   # Install to custom prefix
"""

(require '[babashka.process :refer [shell process check]]
         '[babashka.fs :as fs]
         '[clojure.string :as str])

(def ^:private eca-version "0.5.2")

(defn- detect-platform
  "Detect OS and architecture for binary selection"
  []
  (let [os (str/lower-case (System/getProperty "os.name"))
        arch (str/lower-case (System/getProperty "os.arch"))
        os-map {"mac os x" "Darwin"
                "macos" "Darwin"
                "linux" "Linux"
                "windows" "Windows"}
        arch-map {"amd64" "x86_64"
                  "x86_64" "x86_64"
                  "aarch64" "arm64"
                  "arm64" "arm64"}]
    {:os (get os-map os os)
     :arch (get arch-map arch arch)}))

(defn- get-download-url
  "Generate download URL for the detected platform"
  [{:keys [os arch]}]
  (format "https://github.com/editor-code-assistant/eca/releases/download/v%s/eca_%s_%s"
          eca-version os arch))

(defn- check-existing-eca
  "Check if ECA is already installed and return its path"
  []
  (let [paths [(System/getenv "ECA_PATH")
               "/usr/local/bin/eca"
               (str (System/getProperty "user.home") "/.local/bin/eca")
               (str (System/getProperty "user.home") "/bin/eca")]
        found (first (filter #(and % (fs/exists? %)) paths))]
    (when found
      (try
        {:path found
         :version (str/trim (:out (shell {:out :string} found "--version")))}
        (catch Exception _
          {:path found :version "unknown"})))))

(defn- download-file
  "Download file from URL to destination with progress"
  [url dest]
  (println "  Downloading from:" url)
  (let [temp-file (str dest ".tmp")]
    (fs/create-dirs (fs/parent dest))
    (shell "curl" "-fsSL" "-o" temp-file url)
    (fs/move temp-file dest {:replace-existing true})))

(defn- install-eca
  "Download and install ECA to the specified directory"
  [install-dir]
  (let [platform (detect-platform)
        url (get-download-url platform)
        bin-name (if (= (:os platform) "Windows") "eca.exe" "eca")
        dest-path (fs/path install-dir "bin" bin-name)]

    (println (format "◈ Installing ECA v%s..." eca-version))
    (println (format "  Platform: %s/%s" (:os platform) (:arch platform)))
    (println (format "  Destination: %s" dest-path))

    ;; Download
    (download-file url (str dest-path))

    ;; Make executable (Unix only)
    (when-not (= (:os platform) "Windows")
      (fs/set-posix-file-permissions dest-path "rwxr-xr-x"))

    ;; Verify installation
    (let [version (str/trim (:out (shell {:out :string} (str dest-path) "--version")))]
      (println (format "✓ ECA installed successfully: %s" version))
      dest-path)))

(defn- add-to-path-instructions
  "Print instructions for adding ECA to PATH"
  [install-dir]
  (let [shell-rc (cond
                   (fs/exists? (fs/path (System/getProperty "user.home") ".zshrc")) "~/.zshrc"
                   (fs/exists? (fs/path (System/getProperty "user.home") ".bashrc")) "~/.bashrc"
                   :else "your shell profile")]
    (println "\n⚠️  ECA is installed but not in your PATH")
    (println "   Add this to " shell-rc ":")
    (println (format "   export PATH=\"%s/bin:$PATH\"" install-dir))
    (println "\n   Or run: echo 'export PATH=\"" install-dir "/bin:$PATH\"' >> " shell-rc)))

(defn -main
  "Main entry point for ECA installer"
  [& args]
  (let [install-prefix (or (first args)
                           (str (System/getProperty "user.home") "/.local"))
        install-dir (fs/path install-prefix)]

    ;; Check for existing installation
    (when-let [existing (check-existing-eca)]
      (println (format "✓ ECA already installed: %s (%s)"
                       (:path existing)
                       (:version existing)))
      (println "  To reinstall, delete the existing binary first.")
      (System/exit 0))

    ;; Check for curl
    (try
      (shell "curl --version > /dev/null")
      (catch Exception _
        (println "✗ curl is required but not installed")
        (println "  Install curl and try again")
        (System/exit 1)))

    ;; Install
    (try
      (let [installed-path (install-eca install-dir)]
        ;; Check if it's in PATH
        (when-not (= "/usr/local" install-prefix)
          (add-to-path-instructions install-prefix))
        (println "\n✓ Setup complete!")
        (println "  You can now use AI chat features."))
      (catch Exception e
        (println (format "\n✗ Installation failed: %s" (.getMessage e)))
        (println "  Try downloading manually from:")
        (println "  https://github.com/editor-code-assistant/eca/releases")
        (System/exit 1)))))

;; Run if called as script
(when (= *file* (System/getProperty "babashka.file"))
  (apply -main *command-line-args*))
