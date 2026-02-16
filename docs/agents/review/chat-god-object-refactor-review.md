---
name: chat-god-object-refactor-review
description: "Code review for the chat.clj god object refactoring (commit e5394b1)"
date: 2026-02-14
reviewer: clojure-reviewer
---

# Code Review: Chat God Object Refactoring

## Summary

| Metric | Value |
|--------|-------|
| Files Changed | 13 |
| Lines Removed | 2,136 |
| Lines Added | 2,521 |
| Critical Issues | 2 |
| Warnings | 3 |
| Suggestions | 4 |

**Verdict**: ✅ **Approved** with required fixes

The refactoring successfully splits a monolithic `chat.clj` (~860 LOC) into 6 focused modules with clear separation of concerns. The architecture is sound, but there are critical code duplication issues that must be addressed.

---

## Critical Issues (Must Fix)

### 1. [builders.clj] Massive Duplication Across Builder Handlers

**Location**: `handle-canvas-message`, `handle-empathy-message`, `handle-vp-message`, `handle-mvp-message`

**Problem**: ~50+ lines of nearly identical logic repeated 4 times:

```clojure
;; Copied 4 times with only builder-ns varying
(let [session (session/get-session chat-id)
      builder-session (get-in session [:context :builder/session])
      cancel? (= "cancel" (str/lower-case (str/trim text)))]
  (if builder-session
    (if cancel?
      (do (session/update-context! chat-id dissoc :builder/session :builder/mode)
          (send-message! adapter chat-id "🗑️ ...cancelled"))
      (let [result (builder/process-response! builder-session text)]
        (session/assoc-context! chat-id :builder/session (:session result))
        (if (:complete? result)
          (do (session/update-context! chat-id dissoc :builder/session :builder/mode)
              (send-markdown! adapter chat-id (:message result)))
          (send-markdown! adapter chat-id (:message result)))))
    (handle-natural-message adapter chat-id user-name text)))
```

**Fix**: Extract common handler:

```clojure
(defn handle-builder-mode
  "Common handler for builder modes (canvas, empathy, vp, mvp)"
  [adapter chat-id user-name text mode-key builder-ns]
  (let [session (session/get-session chat-id)
        mode-keyword (keyword (name mode-key))
        session-key (keyword (str (name mode-key) "/session"))
        builder-session (get-in session [:context session-key])
        cancel? (= "cancel" (str/lower-case (str/trim text)))]
    (cond
      (nil? builder-session)
      (handle-natural-message adapter chat-id user-name text)

      cancel?
      (do
        (session/update-context! chat-id dissoc session-key mode-keyword)
        (send-message! adapter chat-id (str "🗑️ " (name mode-key) " cancelled")))

      :else
      (let [process-fn (ns-resolve builder-ns 'process-response!)
            result (process-fn builder-session text)]
        (session/assoc-context! chat-id session-key (:session result))
        (if (:complete? result)
          (do
            (session/update-context! chat-id dissoc session-key mode-keyword)
            (send-markdown! adapter chat-id (:message result)))
          (send-markdown! adapter chat-id (:message result)))))))
```

**Priority**: P0 — This violates DRY and will cause maintenance nightmares.

---

### 2. [builders.clj] Inconsistent Namespace Usage

**Location**: Lines 30-31, 45

**Problem**: Uses full namespace instead of alias:

```clojure
(let [eca-status (ouroboros.eca-client/status)]
  ...
  (let [result (ouroboros.eca-client/chat-prompt text {...})]
```

**Fix**: Add to require vector:

```clojure
(:require [ouroboros.eca-client :as eca])
;; Then use: (eca/status) and (eca/chat-prompt ...)
```

**Priority**: P1 — Inconsistent style makes code harder to read.

---

## Warnings (Should Fix)

### 3. [session.clj] Magic Values for History Limits

**Location**: Lines 27-28

**Problem**: Numbers without explanation:

```clojure
(when (> (count (get-in @chat-sessions [chat-id :history])) 20)
  (swap! chat-sessions update-in [chat-id :history] (partial take-last 10)))
```

**Fix**: Extract to constants:

```clojure
(def ^:private max-history-size 20)
(def ^:private history-trim-count 10)
```

**Priority**: P1 — Magic numbers obscure intent.

---

### 4. [streaming.clj] Magic Values Scattered

**Location**: Lines 39-49

**Problem**: Multiple undocumented constants:

```clojure
(def ^:private edit-debounce-ms 500)
(def ^:private max-message-length 2000)
;; In builders.clj: (let [timeout-ms 120000] ...)
```

**Fix**: Document sources:

```clojure
(def ^:private edit-debounce-ms
  "Minimum ms between edit-message! calls.
   Sources: Telegram 30/sec, Discord 5/sec, Slack ~1/sec"
  500)

(def ^:private max-message-length
  "Maximum text length per message.
   Sources: Telegram 4096, Discord 2000, Slack 40000. Using 2000."
  2000)
```

**Priority**: P2 — Reduces clarity for future maintainers.

---

### 5. [commands.clj] Duplicate /setup Handlers

**Location**: `:setup`, `:setup-run`, `:setup-detect` methods

**Problem**: Three methods with identical behavior:

```clojure
(defmethod handle-command :setup [_ _ _ _ args] ...)
(defmethod handle-command :setup-run [_ _ _ _ _] ...)
(defmethod handle-command :setup-detect [_ _ _ _ _] ...)
;; All return "Setup wizard not yet available. Coming soon."
```

**Fix**: Consolidate:

```clojure
(defmethod handle-command :setup
  [adapter chat-id _user-name _cmd args]
  (let [subcmd (some-> args str/lower-case keyword)]
    (case subcmd
      (:run :detect) (send-message! adapter chat-id "Coming soon.")
      (send-message! adapter chat-id "⚠️ Usage: /setup [run|detect]"))))
```

**Priority**: P2 — Dead code waiting to be cleaned up.

---

## Suggestions (Optional)

### 6. [router.clj] Redundant Routing in make-message-handler

**Location**: Lines 90-94

**Problem**: `:else` branch duplicates command dispatch:

```clojure
:else (if-let [[cmd args] (commands/extract-command text)]
        (commands/handle-command adapter chat-id user-name cmd args)
        (builders/handle-natural-message adapter chat-id user-name text))
```

**Note**: This is acceptable since `handle-command` has a `:default` method. Could simplify but current approach is clear.

---

### 7. [Boundary] Missing Input Validation

**Location**: `router/make-message-handler`

**Problem**: No validation on incoming message map:

```clojure
(fn [{:keys [chat-id user-id user-name text] :as message}]
  ;; Could crash on nil chat-id or text
```

**Fix**: Add defensive check:

```clojure
(fn [{:keys [chat-id text] :as message}]
  (when (or (nil? chat-id) (nil? text))
    (telemetry/emit! {:event :chat/invalid-message :message message})
    (throw (ex-info "Invalid message: missing required fields"
                    {:chat-id chat-id :text text})))
  ;; ... rest
```

---

### 8. [Testing] No Tests for Chat Modules

**Location**: `src/ouroboros/chat/*`

**Problem**: New modules have zero test coverage.

**Suggested Tests**:

```clojure
;; test/ouroboros/chat/session_test.clj
(deftest session-history-trim-test
  (let [sid "test-chat"]
    (dotimes [n 25]
      (session/update-session! sid :user (str "msg " n)))
    (is (= 10 (count (get-in @session/chat-sessions [sid :history]))))))

;; test/ouroboros/chat/commands_test.clj
(deftest extract-command-test
  (is (= [:help ""] (commands/extract-command "/help")))
  (is (= [:build "canvas MyApp"] (commands/extract-command "/build canvas MyApp")))
  (is (nil? (commands/extract-command "hello")))))

;; test/ouroboros/chat/streaming_test.clj
(deftest truncate-test
  (is (= "hello" (streaming/truncate-for-chat "hello")))
  (is (string? (streaming/truncate-for-chat (apply str (range 3000))))))
```

---

## Praise

| Area | Details |
|------|---------|
| **Architecture** | Excellent separation: session, router, commands, streaming, builders |
| **Documentation** | Clear docstrings on all public functions |
| **Protocol Usage** | Clean re-exports via `chatp/` alias |
| **State Encapsulation** | Atoms properly scoped to modules |
| **Telemetry** | Consistent event logging throughout |

---

## Action Items

- [ ] **P0**: Extract `handle-builder-mode` common function
- [ ] **P1**: Fix inconsistent `eca-client` alias in builders.clj
- [ ] **P1**: Extract magic numbers to constants in session.clj
- [ ] **P2**: Document streaming constants with sources
- [ ] **P2**: Consolidate duplicate `/setup` handlers
- [ ] **P2**: Add input validation at message handler boundary
- [ ] **P3**: Add tests for session, commands, streaming modules

## Related Documentation

- [Clojure Idiom Reviewer](./clojure-idiom-reviewer.md)
- [Pathom Resolver Patterns](../../patterns/pathom-resolver-patterns.md)

---

**Reviewed by**: clojure-reviewer skill
**Date**: 2026-02-14
**Commit**: e5394b1 (HEAD~3..HEAD)
