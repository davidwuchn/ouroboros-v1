---
name: test-backend-via-websocket-before-asking-user
domain: debugging-workflow
φ: 0.7
e: verify-ws-handler-with-wscat
λ: when.fixing.websocket-handler-bugs
Δ: 0.05
source: session-debug-2026-02-17
evidence: 1
access-count: 1
last-accessed: 2026-02-17
timeframe: project
---

# Test Backend via WebSocket Before Asking User

## λ(e): Action
After fixing a WebSocket handler, **send a test message via wscat** before asking the user to retry. This catches compile errors, unbound fns, and data format issues immediately.

```bash
npx -y wscat -c ws://localhost:8080/ws -x '{"type":"builder/apply-template",...}' -w 5
```

Also check backend logs for errors:
```bash
tmux capture-pane -t proc-ouroboros-backend -p -S -30 | grep -i "error\|exception\|unbound"
```

## λ(φ): Why
- The user's "still no data" was because the handler was unbound -- a server-side error invisible to the UI
- One wscat test would have revealed "Attempting to call unbound fn" immediately
- Saves user frustration from repeated "try again" cycles

## λ(λ): When
- After any WebSocket handler fix
- When user reports "nothing happens" after clicking a button that sends WS messages
- Before saying "please try again"

## Context
- **Applies to**: Any WebSocket-driven feature
- **Related**: restart-jvm-after-clj-edits, verify-paren-depth
