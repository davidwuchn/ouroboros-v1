---
name: sci-no-recur-try
domain: clojure
φ: 0.90
e: restructure-loop-outside-try
λ: when.sci-runtime or when.recur-in-try
Δ: 0.02
source: learning-md-babashka-quirks
evidence: 6
access-count: 0
last-accessed: never
timeframe: long-term
---

# SCI: No Recur Across Try

Babashka's SCI (Small Clojure Interpreter) cannot use `recur` inside a `try` block — JVM stack frame constraint. Restructure to keep `recur` outside `try`.

## λ(e): Action

**Anti-pattern: `recur` inside `try`**
```clojure
;; BROKEN in SCI - "Cannot recur across try"
(defn- read-loop! []
  (future
    (loop []
      (when @running
        (try
          (if-let [response (read-jsonrpc-response stdout)]
            (do
              (handle-response! response)
              (recur))  ; ERROR - recur across try
            (recur))     ; ERROR - recur across try
          (catch Exception e
            (when @running
              (recur))))))))  ; ERROR - recur across try
```

**Pattern: Extract `try` to binding, `recur` outside**
```clojure
;; CORRECT - restructure to keep recur outside try
(defn- read-loop! []
  (let [{:keys [stdout running]} @state]
    (future
      (loop []
        (when @running
          (let [response (try
                           (read-jsonrpc-response stdout)
                           (catch Exception e
                             (telemetry/emit! {:event :read-error
                                               :error (.getMessage e)})
                             nil))]
            (when response
              (if (:id response)
                (handle-response! response)
                (handle-notification! response))))
          (Thread/sleep 100)
          (recur))))))  ; OK - outside try
```

## λ(φ): Why

**SCI constraint:** JVM bytecode doesn't allow jumping back to a `loop` from within a `try` block's exception handler — would violate stack unwinding semantics.

**Key restructuring:**
1. Extract `try/catch` to wrap just the risky operation
2. Store result in `let` binding
3. Process result outside the `try` block
4. Keep `recur` in tail position, outside all `try` forms

**Alternative: Helper function pattern**
```clojure
;; Simpler - extract try into helper
(defn- try-process [item]
  (try (process item)
       (catch Exception e {:error e})))

(loop [items xs]
  (let [result (try-process (first items))]
    (if (:error result)
      (recur (rest items))  ; OK - outside try
      result)))
```

## λ(λ): When to Apply

**Trigger conditions:**
- Writing code for Babashka (SCI runtime)
- `recur` inside `try` or `catch` block
- "Cannot recur across try" compiler error
- Background loops with exception handling (WebSocket readers, streaming pipelines)

**Applies to:**
- ECA client read loops
- WebSocket message handlers
- Streaming data processors
- Any long-running loop with error recovery

**Does NOT apply to:**
- JVM Clojure (allows recur across try)
- One-shot try/catch (no loop)
- Error boundaries (just catch and return)

## λ(Δ): Evolution

- **Validated**: φ += 0.02 (fixed ECA read loop, WebSocket handlers)
- **Corrected**: φ -= 0.01 (if applied to JVM Clojure unnecessarily)

## Context

- **Applies to**: Babashka scripts, SCI-based runtimes, ECA client, streaming loops
- **Avoid for**: JVM Clojure (no constraint), simple try/catch without loops
- **Related instincts**: sci-defonce-metadata, babashka-unicode, sci-reader-constraints
- **See also**: [LEARNING.md#babashka--sci-quirks](LEARNING.md#babashka--sci-quirks)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | ECA read-loop! | Restructured, works in SCI | +0.05 |
| 2026-02 | WebSocket handlers | Applied pattern consistently | +0.03 |
| 2026-01 | Streaming pipeline | Loop + error handling | +0.02 |
