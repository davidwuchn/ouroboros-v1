# Architecture

## New Systems (2026-02-16)

Added systems from ASSESSMENT analysis:

| System | File | Purpose | Interface |
|--------|------|---------|-----------|
| **Component** | `src/ouroboros/component.clj` | Mount-style lifecycle | `iface/component-*` |
| **Components** | `src/ouroboros/components.clj` | 9 system components | `iface/components-*` |
| **Signal Bus** | `src/ouroboros/signal.clj` | Event-driven communication | `iface/signal-*` |
| **Statechart** | `src/ouroboros/statechart.clj` | OODA execution model | `iface/sm-*` |
| **Statecharts** | `src/ouroboros/statecharts.clj` | 5 registered statecharts | `iface/statecharts-*` |
| **Persistence** | `src/ouroboros/persistence.clj` | Dual: Datalevin + Git | `iface/persistence-*` |

## 5 Registered Statecharts

```
:eca-ooda           → observe → orient → decide → act → learn
:approval-workflow  → pending → approved → executing → complete
:builder-session    → empathy → value-prop → mvp → canvas
:chat-flow          → idle → processing → responding → idle
:signal-collector   → collecting → analyzing → emitting
```

## 9 System Components

```
:config         → System configuration
:database       → Data persistence  
:memory         → Session memory
:telemetry      → Event/metrics collection
:websocket      → WebSocket server
:eca-client     → ECA integration
:chat-adapters → Telegram/Discord/Slack
:learning       → Learning system
:wisdom         → Wisdom/insights
```

## Dual Persistence

```
Operational (Datalevin)  → Fast queries (sessions, projects, queries)
Knowledge (Git-backed)   → Wisdom (insights, patterns, templates)
```

## Usage Examples

### Component (Mount-style)

```clojure
(require '[ouroboros.component :as comp])

(comp/defcomponent config
  :start (load-config!)
  :stop (save-config!))

(comp/defcomponent database
  :start (connect-db)
  :stop (disconnect-db)
  :dependencies [config])

(comp/start-all)
(comp/stop-all)
(comp/status)
```

### Signal Bus

```clojure
(require '[ouroboros.signal :as signal])

;; Subscribe to events
(signal/subscribe :tool/execute 
  (fn [event] (println "Tool:" event)))

;; Publish events
(signal/publish! :tool/execute {:tool :file/read :result :ok})

;; Categories
(signal/tool-event :execute {:tool :file/read})
(signal/memory-event :store {:key :test})
(signal/eca-event :chat {:message "hello"})
```

### Statechart (OODA)

```clojure
(require '[ouroboros.statechart :as sm])

;; Create OODA loop
(sm/create-ooda-statechart :eca-ooda)

;; Or custom
(sm/create-statechart :my-workflow
  {:initial :start
   :states {:start {:on {:next :middle}}
            :middle {:on {:done :end}}})

;; Control
(sm/start! :eca-ooda)
(sm/transition! :eca-ooda :orient)  ; observing → orienting
(sm/state :eca-ooda)  ; => :orienting
(sm/stop! :eca-ooda)
```

## Interface Functions

```clojure
;; Component
(iface/component-start :config)
(iface/component-stop :config)
(iface/component-status)
(iface/component-healthy?)

;; Signal Bus
(iface/signal-publish :tool/execute {:tool :file/read})
(iface/signal-subscribe :tool/execute handler-fn)
(iface/signal-bus-status)

;; Statechart
(iface/sm-create :eca-ooda {:initial :observing :states {...}})
(iface/sm-start :eca-ooda)
(iface/sm-transition :eca-ooda :orient)
(iface/sm-state :eca-ooda)
(iface/sm-status)
```

## Integration Points

### Wire Signal Bus Into

- Tool execution → `:tool/execute`, `:tool/approve`
- Memory operations → `:memory/store`, `:memory/retrieve`
- ECA events → `:eca/chat`, `:eca/tool-call`
- System events → `:system/healthy`, `:system/error`

### Use Statechart For

- ECA OODA loop execution
- Approval workflow (waiting → approved → acting)
- Builder sessions (empathy → valueprop → mvp → canvas)
- Chat flow (processing → awaiting → complete)
