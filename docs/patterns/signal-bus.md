# Signal Bus - Event-driven architecture for Ouroboros

A lightweight signal/event bus for decoupled communication between components.

## Usage

```clojure
(require '[ouroboros.signal :as signal])

;; Subscribe to events
(signal/subscribe :tool/execute 
  (fn [event] 
    (println "Tool executed:" (:tool event))))

;; Publish events
(signal/publish! :tool/execute {:tool :file/read :result :success})

;; Unsubscribe
(signal/unsubscribe :tool/execute my-handler)

;; Create named signal bus for isolation
(def trading-bus (signal/create-bus "trading"))
```

## Event Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Tool | `:tool/` | `:tool/execute`, `:tool/approve` |
| Memory | `:memory/` | `:memory/store`, `:memory/retrieve` |
| ECA | `:eca/` | `:eca/chat`, `:eca/tool-call` |
| System | `:system/` | `:system/healthy`, `:system/error` |
| Learning | `:learning/` | `:learning/insight` |

## API

```clojure
;; Create a new signal bus (optional, defaults to global)
(signal/create-bus "name")

;; Subscribe to events
(signal/subscribe event-type handler-fn)
(signal/subscribe-on bus event-type handler-fn)

;; Publish events
(signal/publish! event-type payload)
(signal/publish-on bus event-type payload)

;; Unsubscribe
(signal/unsubscribe event-type handler-fn)

;; Get all subscribers
(signal/subscribers event-type)

;; Clear bus
(signal/clear! bus)
(signal/clear-all!)
```

## Patterns

### Pub/Sub
```clojure
;; Decoupled communication
(signal/subscribe :user/login #(println "User logged in:" %))
(signal/publish! :user/login {:user-id 123 :time (now)})
```

### Request/Reply
```clojure
(let [reply-ch (async/chan)]
  (signal/publish! :query/data {:reply-ch reply-ch})
  (async/<!! reply-ch))
```

### Event Filtering
```clojure
(signal/subscribe :tool/execute 
  (fn [{:keys [tool] :as event}]
    (when (= tool :shell/exec)
      (println "Shell command executed!"))))
```

## Integration with Telemetry

Signal bus feeds telemetry:
```clojure
(signal/subscribe :tool/execute 
  (fn [event]
    (telemetry/record! :tool-execution event)))
```
