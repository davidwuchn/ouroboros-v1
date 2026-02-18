# Component Lifecycle

Mount-style lifecycle management for Ouroboros components.

## Usage

```clojure
(require '[ouroboros.component :as comp])

;; Define components with dependencies
(comp/defcomponent config
  :start (load-config!)
  :stop (save-config!))

(comp/defcomponent database
  :start (connect-db)
  :stop (disconnect-db)
  :dependencies [config])

(comp/defcomponent web-server
  :start (start-server!)
  :stop (stop-server!)
  :dependencies [config database])

;; Start all in dependency order
(comp/start-all)

;; Stop all in reverse order
(comp/stop-all)

;; Individual control
(comp/start :web-server)
(comp/stop :web-server)
(comp/restart :web-server)

;; Status
(comp/status)
(comp/healthy?)
```

## API

```clojure
(defcomponent name
  :start (fn [] ...)    ; Required
  :stop (fn [state] ...) ; Optional
  :dependencies [dep1 dep2])

(start name)
(stop name)
(restart name)
(start-all)
(stop-all)
(state name)
(running? name)
(status)
(healthy?)
```

## Dependencies

Components start in topological order (dependencies first).
Stopping is in reverse order.

```
config → database → web-server
```

## Integration with Interface

```clojure
(require '[ouroboros.interface :as iface])

(iface/component-start :config)
(iface/component-status)
(iface/component-healthy?)
```
