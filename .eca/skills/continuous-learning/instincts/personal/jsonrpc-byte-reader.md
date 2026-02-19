---
name: jsonrpc-byte-reader
domain: protocols
φ: 0.90
e: use-byte-stream-not-reader
λ: when.jsonrpc or when.content-length-header
Δ: 0.03
source: learning-md-pattern-22
evidence: 5
access-count: 0
last-accessed: never
timeframe: project
---

# LSP/JSON-RPC: Content-Length Is Bytes, Not Characters

When implementing JSON-RPC (LSP, ECA, MCP), always read from byte streams, not character readers. `Content-Length` headers specify bytes; `Reader` reads characters. Multi-byte UTF-8 causes silent corruption.

## λ(e): Action

**Use `BufferedInputStream` (byte-level), never `BufferedReader` (character-level):**

```clojure
;; WRONG - BufferedReader reads chars, Content-Length is bytes
(let [reader (BufferedReader. (InputStreamReader. stdout))
      chars (char-array content-length)]
  (.read reader chars 0 content-length)  ; reads N chars, not N bytes!
  (String. chars))
```

```clojure
;; CORRECT - BufferedInputStream reads bytes, then decode
(let [stream (BufferedInputStream. stdout)
      bytes (byte-array content-length)]
  ;; Read exactly content-length bytes
  (loop [offset 0]
    (when (< offset content-length)
      (let [n (.read stream bytes offset (- content-length offset))]
        (when (pos? n)
          (recur (+ offset n))))))
  (String. bytes "UTF-8"))
```

**Also fix the serializer:**
```clojure
;; WRONG - count gives chars
(str "Content-Length: " (count json-string) "\r\n\r\n" json-string)

;; CORRECT - count bytes
(let [json-bytes (.getBytes json-string "UTF-8")]
  (str "Content-Length: " (alength json-bytes) "\r\n\r\n" json-string))
```

## λ(φ): Why

The failure is **silent and intermittent** — it only manifests when messages contain enough multi-byte UTF-8 characters to shift the byte/char offset.

**Real-world failure in ECA integration:**
- `tool/serverUpdated` notification had `Content-Length: 18291`
- 61 multi-byte UTF-8 characters in MCP tool descriptions
- Actual character count: ~18230
- `BufferedReader.read(char[], 0, 18291)` consumed 18291 **chars** = 18352 **bytes**
- Reader was 61 bytes ahead in stream, corrupting all subsequent frames

**Why this is the #1 LSP client bug:**
- `Reader`/`BufferedReader` decode bytes to chars
- Impossible to honor byte-count headers when multi-byte UTF-8 present
- Works fine with ASCII, fails randomly with unicode

## λ(λ): When to Apply

**Trigger conditions:**
- Implementing LSP client/server
- Building JSON-RPC over stdin/stdout
- Using `Content-Length` framing
- Integrating with ECA, MCP, or any LSP-compatible tool

**Symptoms of this bug:**
- Messages dropped after large notifications
- JSON parse errors mid-stream
- "Unexpected token" at stream positions
- Works locally, fails with real data (unicode in tool descriptions, emojis in chat)

## λ(Δ): Evolution

- **Validated**: φ += 0.03 (critical fix, saved ECA integration)
- **Corrected**: φ -= 0.05 (if applied to non-Content-Length protocols)

## Related Fixes

When implementing ECA/JSON-RPC, also apply:

```clojure
;; Remove artificial delays
;; WRONG
(Thread/sleep 100)  ; Unnecessary, IO blocks naturally

;; CORRECT
;; Just call .read - it blocks until data available

;; EOF detection
;; Handle nil response to stop loop instead of spinning
(if-let [response (read-jsonrpc-response stream)]
  (process response)
  (stop-loop))  ; EOF reached

;; Preserve callbacks across restarts
;; Store :callbacks in state atom, not local let
```

## Context

- **Applies to**: LSP clients, JSON-RPC implementations, ECA integration, MCP servers
- **Avoid for**: Line-based protocols (HTTP chunked), pure ASCII streams
- **Related instincts**: eca-integration, stream-framing, utf8-handling
- **See also**: [LEARNING.md#eca-integration](LEARNING.md#eca-integration)

## Evidence Log

| Date | Scenario | Result | φ Change |
|------|----------|--------|----------|
| 2026-02 | ECA IPC silent failures | Fixed Content-Length reader | +0.15 |
| 2026-02 | Tool descriptions with unicode | Root cause identified | +0.05 |
| 2026-02 | Streaming pipeline stable | All messages received | +0.03 |
