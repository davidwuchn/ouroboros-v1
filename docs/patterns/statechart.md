# Statechart - OODA Execution

Formal state machine for ECA/OODA loop execution.

## Usage

```clojure
(require '[ouroboros.statechart :as sm])

;; Create OODA statechart
(sm/create-ooda-statechart :eca-ooda)

;; Or create custom
(sm/create-statechart :my-workflow
  {:initial :start
   :states {:start {:on {:next :middle}}
            :middle {:on {:done :end
                         :back :start}}
            :end {}}})

;; Start (run entry for initial state)
(sm/start! :eca-ooda)

;; Transition via events
(sm/transition! :eca-ooda :orient)  ; observing → orienting
(sm/transition! :eca-ooda :decide) ; orienting → deciding

;; Get current state
(sm/state :eca-ooda)  ; => :deciding

;; Get valid events from current state
(sm/valid-events :eca-ooda)  ; => (:act :human-gate :observe)

;; Stop
(sm/stop! :eca-ooda)
```

## OODA Statechart

```
observing → orienting → deciding → acting → observing
                ↑           |          |
                |           v          |
                |        waiting ←-----+
                |           |
                +-----------+
```

## State Options

```clojure
{:initial :observing
 :states
 {:observing
  {:entry (fn [] (println "Entering observing"))
   :exit (fn [] (println "Leaving observing"))
   :on {:orient :orienting}
   :guard (fn [event] true)  ; Optional predicate
   }}}
```

## Event Categories

| Category | Prefix | Example |
|----------|--------|---------|
| OODA | - | `:observe`, `:orient`, `:decide`, `:act`, `:learn` |
| Human | `:human-` | `:human-gate`, `:approve`, `:reject` |
| System | `:system-` | `:system-error`, `:system-timeout` |

## Listeners

```clojure
(sm/add-listener! :eca-ooda
  (fn [{:keys [from to event]}]
    (println "Transition:" from "→" to "via" event)))
```

## Integration with Interface

```clojure
(require '[ouroboros.interface :as iface])

;; Create OODA statechart
(iface/sm-create :eca-ooda {...})

;; Control
(iface/sm-start :eca-ooda)
(iface/sm-transition :eca-ooda :orient)
(iface/sm-state :eca-ooda)
(iface/sm-stop :eca-ooda)

;; Status
(iface/sm-status)
```

## Use Cases

1. **ECA Execution** - Model the OODA loop as state machine
2. **Approval Workflow** - Waiting → Approved → Acting → Done
3. **Builder Sessions** - Empathy → ValueProp → MVP → Canvas
4. **Chat Flow** - Processing → Awaiting Response → Complete
