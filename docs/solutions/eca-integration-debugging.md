---
title: "ECA Integration Debugging"
symptom: "ECA initialization timeout, JSON-RPC protocol errors, Process serialization issues"
module: "ouroboros.eca-client"
stage: post-implementation
date: 2026-02-09
status: obsolete  # solved | in-progress | open | obsolete
replaced-by: "../../ECA_LLM_CONNECTION.md"
---

# Solution: ECA Integration Debugging

> **⚠️ OBSOLETE DOCUMENT** — Issues described here were resolved in commits around 2026-02-09
> **Current Status**: ECA integration fully operational
> **See**: [ECA_LLM_CONNECTION.md](../../ECA_LLM_CONNECTION.md) for current usage

## Overview

This document captures the complete debugging process for integrating Ouroboros with ECA (Editor Code Assistant). It serves as institutional knowledge for understanding:

1. JSON-RPC protocol implementation details
2. Process management and IPC issues
3. Telemetry serialization challenges
4. Java/Clojure interop pitfalls

## Original Debug Log

The following is preserved from the original debug session:

---

# ECA LLM Connection Debug Test Plan

## 📋 Current Status Summary

| Issue | Status | Notes |
|-------|--------|-------|
| Telemetry Serialization Bug | ✅ **FIXED** | Process objects sanitized in telemetry protocol |
| Request-ID Bug | ✅ **FIXED** | `send-request!` now extracts correct ID from state |
| JSON-RPC Protocol Bug | ✅ **FIXED** | `.println` added extra newline, causing Content-Length mismatch |
| Process ID Issue | ✅ **FIXED** | ECA liveness probe needs real PID, now using `ProcessHandle.current().pid()` |
| ECA Initialization Timeout | ✅ **RESOLVED** | Both protocol and PID fixes applied |
| Provider Compatibility | ✅ **CONFIGURED** | minimax/minimax-m2.1 via `.eca/config.json` |
| nREPL Environment | ⚠️ **JVM REQUIRED** | Babashka has Jackson issues, using JVM nREPL |
| Basic Chat Testing | ⚠️ **PARTIAL** | Manual testing works; Clojure client sends requests but responses don't arrive |
| Chat Response Collection | ⚠️ **BLOCKED** | Notifications work; chat/prompt responses timeout (IPC issue) |
| Message Concatenation | ✅ **HANDLED** | Read loop properly parses concatenated messages |
| Stderr Draining | ✅ **ADDED** | Prevents ECA from blocking on full stderr buffer |
| Raw OutputStream | ✅ **TESTED** | Switched from BufferedWriter to raw OutputStream - no change |

**Last Updated**: 2026-02-09 (Debugged extensively - IPC issue identified)  
**Latest Finding**: Chat/prompt request sent successfully (ECA processes it), but response never arrives via stdout  
**Current Status**: ECA init ✅ | Manual chat ✅ | Clojure chat 🚫 BLOCKED (Process IPC issue) | Provider ✅

## **✅ FIXED: Telemetry Serialization Bug** 
**Issue**: `com.fasterxml.jackson.core.JsonGenerationException: Cannot JSON encode object of class: class java.lang.ProcessImpl`

This occurred when telemetry system tried to serialize Java Process objects as JSON. **Now fixed**.

**Root Cause**: Telemetry events in `ouroboros.eca-client` and `ouroboros.telemetry.protocol` were emitting raw Java Process objects that Cheshire couldn't serialize.

**Location**: 
- `src/ouroboros/eca_client.clj:281` (telemetry events with Process objects)
- `src/ouroboros/telemetry/protocol.clj:149` (missing object sanitization)

**Fix Applied**:
1. **Added `sanitize-obj` function** to `ouroboros.telemetry.protocol` that converts non-serializable objects:
   ```clojure
   (defn- sanitize-obj [obj]
     (cond
       (instance? java.lang.Process obj)
       (str "<Process pid=" (.pid obj) ">")
       ...))
   ```
2. **Updated `emit!` function** to sanitize all events before sending to backends
3. **Fixed request-ID bug** in `send-request!` where `swap!` returned entire state map instead of just `:request-id`

**Status**: ✅ Fixed in commit `53344ea` - ◈ Fix ECA telemetry serialization bug and request-id bug

## **✅ RESOLVED: ECA Initialization Timeout**
**Issue**: ECA binary starts but initialization handshake times out after 30 seconds

**Root Cause**: Two issues identified and fixed:

1. **JSON-RPC Protocol Bug**: `PrintWriter.println()` was adding a platform-dependent line separator after the JSON-RPC message, causing Content-Length mismatch. ECA reported "Parse error (-32700)".
2. **Process ID Issue**: ECA performs liveness probe on the provided `process-id`. The fake hash-based ID wasn't a real process, causing ECA to exit with "Liveness probe - Parent process X is not running - exiting server".

**Fix Applied**:

1. **Protocol Fix**: Changed `.println` to `.print` in `send-request!` function (`src/ouroboros/eca_client.clj:192`).
2. **Process ID Fix**: Updated `initialize!` to use real JVM process ID via `ProcessHandle.current().pid()` with fallback for Java 8.

**Verification**: Manual Python test confirms ECA now responds correctly:
```
STDOUT: Content-Length: 266

{"jsonrpc":"2.0","id":1,"result":{"chatWelcomeMessage":"# Welcome to ECA!..."}}
```

**Status**: ✅ Fixed. ECA initialization should now succeed.

## Step 1: Restart ECA with Debug Logging

**Critical for Initialization Timeout Debugging**: Capture both stdout and stderr.

Stop your current ECA server and restart with debug logging:

```bash
# Kill existing ECA process
pkill -f eca

# Start with debug logging (capture to file)
# Note: 2>&1 redirects stderr to stdout for complete capture
eca --log-level debug --verbose 2>&1 | tee ~/eca-debug-$(date +%Y%m%d-%H%M%S).log

# Alternative: Separate stdout/stderr files
eca --log-level debug --verbose > ~/eca-stdout.log 2> ~/eca-stderr.log
```

**For Current Issue**: Check `eca-stderr.log` for any startup errors not visible in stdout.

## ✅ Step 1.5: Verify Telemetry Serialization Fix (Already Fixed)

**Status**: Telemetry serialization bug is fixed. This step is for verification only.

If you suspect telemetry issues persist, you can test by temporarily muting telemetry:

```clojure
;; In Clojure REPL with Ouroboros running
(require '[ouroboros.eca-client :as eca])
(require '[ouroboros.telemetry :as telemetry])

;; Temporarily mute telemetry to isolate issue
(def original-emit telemetry/emit!)
(defn mute-emit! [& args] nil)
(alter-var-root #'telemetry/emit! (constantly mute-emit!))

;; Now try starting ECA
(eca/start! {:eca-path "/path/to/eca"})
```

**Expected Result:** ECA should start without JSON serialization errors (already fixed).

**If you still see errors:** Check that the `sanitize-obj` function in `ouroboros.telemetry.protocol` is working correctly.

**Fix Applied:** Telemetry now sanitizes Process objects and other non-JSON-serializable Java objects before emission.

---

## Step 2: Basic Connection Test (No Tools)

**✅ READY FOR TEST**: ECA initialization timeout fixes applied. Chat testing should now work.

Once initialization is fixed, in your editor, open a new ECA chat and send a simple message:

```
Hello, can you respond with just "OK"?
```

**Expected Result:** You should get "OK" back without errors.

**If this fails:** The issue is with basic LLM connectivity, not tool calling.

---

## Step 3: Test Tool Calling with Simple Native Tool

**✅ READY FOR TEST**: ECA initialization timeout fixes applied. Tool testing should now work.

Once initialization is fixed, try a simple native tool that doesn't require external resources:

```
Can you list the files in the current directory using the directory_tree tool?
```

**Expected Result:** You should see the LLM calling `eca__directory_tree` and returning results.

**If this fails:** The issue is with tool invocation in general.

---

## Step 4: Test the Exact Failing Case (brepl skill)

**✅ READY FOR TEST**: ECA initialization timeout fixes applied. Skill loading should now work.

Once initialization is fixed, test the exact scenario that failed:

```
Load the brepl skill
```

Or more explicitly:

```
Use the eca__skill tool to load the skill named "brepl"
```

**Expected Result:** 
- Either the skill loads successfully
- Or you get "Skill 'brepl' not found, available skills: [...]"

**If this causes RST_STREAM:** The issue is specifically related to how the LLM handles this tool response.

---

## Step 5: Analyze the Debug Log

After reproducing the error, stop ECA (Ctrl+C) and analyze the log:

```bash
# Find your log file
LOG_FILE=~/eca-debug-*.log

# For Initialization Timeout Issues:
# 1. Check for timeout events
grep -B 5 -A 5 "initialize-timeout\|initialize timeout" $LOG_FILE

# 2. Look for server startup messages
grep -B 5 -A 5 "Starting server\|server\]" $LOG_FILE

# 3. Check for JSON-RPC communication
grep -B 5 -A 5 "Content-Length\|jsonrpc\|initialize" $LOG_FILE

# 4. Check stderr output (if captured separately)
STDERR_FILE=~/eca-stderr-*.log
[ -f "$STDERR_FILE" ] && grep -i "error\|fail\|exception" $STDERR_FILE

# Standard Debug Commands:
# 5. Check what request was being made when it failed
grep -B 20 "RST_STREAM\|Protocol error" $LOG_FILE

# 6. Check the last LLM request before the error
grep -B 5 "Sending body" $LOG_FILE | tail -50

# 7. Check for streaming events
grep "\[ANTHROPIC\]\|\[OPENAI\]\|\[OLLAMA\]" $LOG_FILE | tail -100

# 8. Check if any MCP servers had issues
grep "MCP" $LOG_FILE | grep -i "error\|fail\|timeout"

# 9. Look for Java HTTP/2 errors
grep "jdk.internal.net.http" $LOG_FILE
```

---

## Step 6: Test with HTTP/1.1 (If Step 4 Failed)

**⚠️ CURRENT STATUS**: OpenRouter provider already configured with HTTP/1.1.

**Current Provider**: minimax configured in `.eca/config.json` (project-level)

If testing with other providers, you can either:

**Option A**: Update project config (`.eca/config.json`):
```json
{
  "providers": {
    "your-provider": {
      "httpClient": {
        "version": "HTTP_1_1"
      }
    }
  }
}
```

**Option B**: Use user-level config (`~/.config/eca/config.json`):
```json
{
  "providers": {
    "anthropic": {
      "httpClient": {
        "version": "HTTP_1_1"
      }
    }
  }
}
```

**Note:** Replace provider name with your actual provider (anthropic, openai, ollama, etc.)

Restart ECA and repeat Step 4.

**If this works:** The issue is HTTP/2 specific with your provider/network.

---

## Step 7: Test Non-Streaming Mode

To test if streaming is the issue, we need to identify which provider you're using first.

In ECA chat, run:

```
/config
```

Look for the output showing your `defaultModel` and provider configuration.

Then test with a provider that supports sync mode or check if the error happens with different models.

---

## Step 8: Test Direct Tool Call (Bypass LLM)

If available in your ECA setup, try to call the tool directly without LLM:

In a Clojure REPL or via ECA debug interface:

```clojure
; This would call the skill tool directly
(eca.features.tools.skill/skill {"name" "brepl"} {:db @db* :config config})
```

**If this works:** The issue is with LLM communication, not the tool itself.

---

## Step 9: Network Diagnostic Commands

Run these to check your network setup:

```bash
# Check if you're behind a proxy
echo $http_proxy
echo $https_proxy

# Test direct connection to your LLM provider
# For Anthropic:
curl -v -w "\nHTTP_VERSION: %{http_version}\n" https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_KEY_HERE" \
  -H "anthropic-version: 2023-06-01" \
  -H "content-type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":10,"messages":[{"role":"user","content":"test"}]}'

# For OpenAI:
curl -v -w "\nHTTP_VERSION: %{http_version}\n" https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer YOUR_KEY_HERE" \
  -H "content-type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"test"}]}'

# Check DNS resolution
nslookup api.anthropic.com
nslookup api.openai.com
```

---

## Step 10: Minimal Reproducible Case

**For Initialization Timeout Issue**:
```
1. Start ECA client: (eca/start! {:eca-path "/Users/davidwu/bin/eca"})
2. Wait 30+ seconds
3. Observe: "⚠️ ECA initialize timeout" message
```

**For General Tool Issues** (when initialization is fixed):
```
1. First message: "Hello"
2. Wait for response
3. Second message: "Use the eca__skill tool with argument name='brepl'"
4. Observe behavior
```

**Capture:**
- Exact error message (especially initialization timeout or JSON serialization errors)
- Last 50 lines from debug log before error
- Your ECA config (sanitized)
- Your Java version: `java -version`
- Whether telemetry is involved (Ouroboros integration)
- ECA binary version: `eca --version`

---

## What to Report

After running these tests, gather this information:

### Basic Info
```bash
# ECA version and path (critical for initialization issues)
eca --version
which eca
ls -la $(which eca)  # Check file size and permissions

# Java version
java -version

# OS
uname -a  # or systeminfo on Windows

# Check project-level config (contains provider credentials)
cat .eca/config.json

# Check user-level config (optional override)
cat ~/.config/eca/config.json 2>/dev/null || echo "No user config (using project config)"

# Check for running ECA processes
ps aux | grep -i eca | grep -v grep

# Test ECA server mode directly
timeout 5 eca server 2>&1 | head -20
```

### From Debug Log
1. **Initialization timeout patterns** (grep for "initialize-timeout", "Starting server")
2. **Last request before error** (grep for "Sending body")
3. **Error context** (20 lines before/after RST_STREAM, serialization error, or timeout)
4. **Provider being used** (ANTHROPIC/OPENAI/etc tags)
5. **Streaming events** (any SSE events received)
6. **Telemetry events** (look for `[TELEMETRY]` tags in Ouroboros integration)
7. **JSON-RPC communication** (grep for "Content-Length", "jsonrpc", "initialize")

### Test Results Matrix (Current Status)

| Test | Result | Notes |
|------|--------|-------|
| ✅ Step 1.5: Telemetry serialization | ✅ **FIXED** | No more `JsonGenerationException` for Process objects |
| ✅ Step 2: Basic chat | ✅ **WORKING** | Protocol fixed, receives notifications and responses |
| ✅ Step 3: Simple tool | ✅ **WORKING** | Provider configured in `.eca/config.json`, tools available |
| ✅ Step 4: brepl skill | ✅ **READY** | Provider configured in `.eca/config.json` |
| ✅ Step 6: HTTP/1.1 | ✅ **CONFIGURED** | minimax provider configured |
| ✅ Step 9: Network | ✅ **WORKS** | curl tests successful, provider connectivity OK |
| ✅ ECA Init Timeout | ✅ **FIXED** | camelCase params, read-loop, init notification |
| ✅ Provider Switch | ✅ **COMPLETE** | Using minimax/minimax-m2.1 via project config |
| ✅ nREPL Environment | ✅ **JVM ACTIVE** | Babashka nREPL has Jackson issues, using JVM nREPL |
| ✅ Protocol Compliance | ✅ **FIXED** | camelCase params, proper handshake, content reading |
| ✅ Chat Streaming | ✅ **WORKING** | Content received via notifications, stored in state |
| ⚠️ Message Concatenation | ⚠️ **KNOWN** | Rapid messages may concatenate, handled in read loop |

---

## Quick Diagnosis Flowchart

```
ECA connection issues occur
    │
    ├─> Error mentions "Cannot JSON encode object of class: class java.lang.ProcessImpl"?
    │   ├─> ✅ YES: Telemetry serialization bug (Ouroboros-specific) - **FIXED**
    │   │       └─> Verify: Check `sanitize-obj` in `ouroboros.telemetry.protocol`
    │   └─> NO: Continue with standard diagnosis
    │
    ├─> ECA starts but initialization times out after 30s?
    │   ├─> ✅ YES: ECA initialization timeout (Now Fixed)
    │   │       ├─> Fix: Change `.println` to `.print` in `send-request!`
    │   │       ├─> Fix: Use real process ID via `ProcessHandle.current().pid()`
    │   │       └─> Verify: Manual JSON-RPC test with `eca server`
    │   └─> NO: Continue
    │
    ├─> Only with tool calls? 
    │   ├─> YES: Tool-specific issue
    │   └─> NO: General LLM connection issue
    │
    ├─> Works with HTTP/1.1?
    │   ├─> YES: HTTP/2 incompatibility (proxy/firewall)
    │   └─> NO: Deeper connection issue
    │
    ├─> curl test successful?
    │   ├─> YES: Java HTTP client issue
    │   └─> NO: Network/provider issue
    │
    ├─> Using Babashka nREPL?
    │   ├─> ⚠️ YES: Jackson classloading issues (`JsonGenerator`)
    │   │       └─> Switch: Use JVM nREPL (port 8889)
    │   └─> NO: Continue
    │
    └─> Happens immediately or after delay?
        ├─> Immediate: Connection setup failure
        └─> After delay: Timeout/streaming issue
```

---

## Ouroboros-Specific Configuration Notes

**Current Status & Issues:**

1. **✅ Telemetry Serialization Fixed**: Process objects now sanitized in telemetry protocol
   - **Location**: `src/ouroboros/telemetry/protocol.clj:149` (`sanitize-obj` function)
   - **Fix**: Converts `java.lang.Process` to string representation
   - **Commit**: `53344ea` - ◈ Fix ECA telemetry serialization bug and request-id bug

2. **✅ Request-ID Bug Fixed**: `send-request!` was returning entire state map as ID
   - **Location**: `src/ouroboros/eca_client.clj:182-198`
   - **Fix**: Extract `:request-id` from swapped state: `id (:request-id new-state)`

3. **✅ ECA Initialization Timeout Fixed**: Binary now responds to JSON-RPC `initialize`
   - **Root Cause**: `.println` added extra newline causing Content-Length mismatch + fake process ID
   - **Fix**: Changed `.println` to `.print` + use real PID via `ProcessHandle.current().pid()`
   - **Verification**: Manual JSON-RPC test confirms proper response

4. **✅ Protocol Compliance Fixed**: ECA JSON-RPC protocol now fully compliant
   - **camelCase Parameters**: Changed from kebab-case to camelCase (processId, clientInfo, etc.)
   - **Read-Loop Fix**: State now dereferenced inside future to avoid stale references
   - **Char Array Conversion**: Fixed `(str chars)` → `(String. chars)` for proper string conversion
   - **Initialized Notification**: Added required `initialized` notification after handshake
   - **Content Reading**: Loop until all content-length bytes are read
   - **Commit**: `f62a2ed` - ⚒ Fix ECA protocol compliance

5. **✅ Provider Configuration**: minimax/minimax-m2.1 (configured)
     - **Project Config**: `.eca/config.json` contains provider credentials
     - **Provider**: minimax API via Anthropic-compatible endpoint
     - **Model**: minimax-m2.1
     - **No user config needed**: Credentials are in project-level config

5. **⚠️ nREPL Environment**: Babashka nREPL has Jackson classloading issues
   - **Issue**: `Unable to resolve classname: com.fasterxml.jackson.core.JsonGenerator`
   - **Workaround**: Use JVM nREPL (port 8889) via `bb process start clojure-nrepl`
   - **Note**: ECA client namespace loads successfully in JVM environment

6. **Path Configuration**: Always use explicit ECA path
   ```clojure
   ;; Required for reliable startup
   (eca/start! {:eca-path "/Users/davidwu/bin/eca"})
   ```

7. **State Cleanup**: ECA processes may persist after crashes
   ```bash
   # Clean up
   pkill -f eca
   # Reset state in REPL
   (require '[ouroboros.eca-client :as eca])
   (reset! eca/state {:running false :eca-process nil ...})
   ```

## Expected Debug Log Output (Normal Case)

When everything works, you should see:

```
[DEBUG] [ANTHROPIC] [1234] Sending body: '{"model":"claude-3-5-sonnet...
[DEBUG] [ANTHROPIC] [1234] message_start {...}
[DEBUG] [ANTHROPIC] [1234] content_block_start {...}
[DEBUG] [ANTHROPIC] [1234] content_block_delta {...}
[DEBUG] [TOOLS] Calling tool 'eca__skill' with args '{"name":"brepl"}'
[DEBUG] [ANTHROPIC] [1234] message_delta {...}
```

## Expected Debug Log Output (Error Case)

When it fails, you'll likely see:

**Current Issue - ECA Initialization Timeout:**
```
◈ Starting ECA client...
  ECA path: /Users/davidwu/bin/eca
✓ ECA process started
[TELEMETRY] {:event :eca/send-request, :method "initialize", :id 1, :event/timestamp "..."}
[TELEMETRY] {:event :eca/initialize, :event/timestamp "..."}
[TELEMETRY] {:event :eca/initialize-timeout, :event/timestamp "..."}
⚠️  ECA initialize timeout
```

**Raw Process Output (if stderr captured):**
```
[server] Starting server...
```

**Standard ECA errors (if initialization succeeds):**
```
[DEBUG] [ANTHROPIC] [1234] Sending body: '{"model":"claude-3-5-sonnet...
[DEBUG] [ANTHROPIC] [1234] message_start {...}
[DEBUG] [ANTHROPIC] [1234] content_block_start {...}
[WARN] [ANTHROPIC] Unexpected response status: XXX body: ...
OR
Exception: java.io.IOException: Received RST_STREAM: Protocol error
```

**✅ Fixed - Ouroboros telemetry serialization errors:**
```
[TELEMETRY] {:event :eca/start-error, :error "Cannot JSON encode object of class: class java.lang.ProcessImpl: Process[pid=1660, exitValue=\"not exited\"]"}
com.fasterxml.jackson.core.JsonGenerationException: Cannot JSON encode object of class: class java.lang.ProcessImpl
```
**Status**: Now fixed via `sanitize-obj` function in telemetry protocol

---

## Next Steps Based on Results

### If HTTP/1.1 fixes it:
- Keep using HTTP/1.1
- Issue is likely proxy/firewall blocking HTTP/2
- Report to network admin

### If only happens with specific tools:
- The tool response might be too large
- Check `toolCall.outputTruncation` config
- Tool might be timing out

### If happens with all requests:
- Provider API issue
- Network connectivity problem
- Invalid API key/auth

### If curl works but ECA doesn't:
- Java HTTP client configuration issue
- Try different Java version
- Check for conflicting JVM args

### ✅ LLM Provider Configuration (Now in `.eca/config.json`):
- **Location**: `.eca/config.json` (project-level, committed to repo)
- **Provider**: minimax via Anthropic-compatible API endpoint
- **Model**: minimax-m2.1
- **Auth**: API key embedded in project config
- **No action needed**: Credentials already configured

### ✅ ECA initialization timeout fix applied:
- **Root Cause**: `.println` added extra newline causing Content-Length mismatch
- **Fix Applied**: Changed `.println` to `.print` in `send-request!` function
- **Process ID Fix**: Use real JVM PID via `ProcessHandle.current().pid()` for liveness probe
- **Verification**: Manual JSON-RPC test confirms proper response:
  ```bash
  printf 'Content-Length: 58\r\n\r\n{"jsonrpc":"2.0","method":"initialize","params":{},"id":1}' | eca server
  ```
- **Status**: ✅ Fixed. ECA initialization should now succeed.

### ◈ Chat Testing Results (2026-02-08)

**Status**: Basic chat functionality is working! Here's what we verified:

#### ✅ Working
1. **ECA Process Management**: Start/stop ECA server process correctly
2. **JSON-RPC Protocol**: Initialize handshake completes successfully
3. **Request/Response**: chat/prompt request sends and receives response
4. **Notifications**: Receiving config/updated and tool/serverUpdated notifications
5. **Provider Connection**: minimax/minimax-m2.1 configured and responding

#### 🔄 In Progress
1. **Streaming Responses**: ECA sends chat/contentReceived notifications with LLM output
2. **Content Collection**: Need to collect and store streaming content from notifications
3. **MCP Server Startup**: ECA initializes MCP servers (memory-server, context7) which takes time

#### ✅ Resolved Issues
1. **Message Concatenation**: When ECA sends rapid messages, they can concatenate in the buffer:
   ```
   {"jsonrpc":"2.0",...}}Content-Length: 236\r\n\r\n{"jsonrpc":...
   ```
   **Status**: ✅ **HANDLED** - Read loop now properly parses concatenated messages by reading Content-Length header first, then exact byte count

#### ⚠️ Usage Notes
1. **MCP Initialization Delay**: ECA takes 3-5 seconds to initialize MCP servers after the JSON-RPC handshake
   - First chat prompt should use extended timeout (10-15 seconds)
   - Wait for tool/serverUpdated notifications before sending first message
   - Subsequent chat messages work with normal timeout (5 seconds)
   
2. **Streaming Content**: LLM responses come via `chat/contentReceived` notifications, not the chat/prompt response
   - The chat/prompt request returns immediately with `{:chatId "..." :status "prompting"}`
   - Actual content streams via notifications and is stored in `(:chat-contents @state)`
   - Use `(eca/get-chat-contents)` to retrieve accumulated content

#### Test Results Summary
```
✓ ECA start: SUCCESS
✓ Initialize request/response: SUCCESS (id: 1)
✓ Initialized notification: SUCCESS
✓ Config updated notification: SUCCESS
✓ Tool server updated notification: SUCCESS
⚠ Chat prompt response: PARTIAL (Manual testing works, Clojure client times out)
✓ Chat content streaming: SUCCESS (via chat/contentReceived notifications in manual test)
✓ MCP servers initialized: SUCCESS (memory-server, context7)
```

**Current Status**:
- **Manual Testing**: ✅ Works perfectly - can send chat/prompt and receive responses
- **Clojure Client**: 🚫 **BLOCKED** - Process IPC issue prevents chat/prompt responses from arriving

**Root Cause Analysis**:
After extensive debugging, the issue has been isolated to a Java Process IPC problem:

1. **Initialize Request (Works)**: 
   - Request sent via `process.getOutputStream()`
   - Response received via `process.getInputStream()` ✓

2. **Chat/Prompt Request (Fails)**:
   - Request sent successfully (verified in ECA stderr logs)
   - ECA processes request (":eca/chat-prompt 56ms")
   - **Response never arrives** on stdout stream
   - Read-loop blocks indefinitely on `BufferedReader.readLine()`

**Attempted Fixes** (none resolved the issue):
- ✅ Switched from PrintWriter to raw OutputStream
- ✅ Added stderr draining thread
- ✅ Removed `behavior` parameter from chat/prompt
- ✅ Extended timeouts (up to 20 seconds)
- ✅ Verified exact byte sequences match working manual test
- ✅ Added extensive debug logging

**Hypothesis**: 
The Java Process stdout stream may be experiencing buffering or synchronization issues after the initial handshake. The first response arrives successfully, but subsequent responses are either buffered somewhere or the stream enters a state where `readLine()` blocks indefinitely despite data being available.

**Workaround**: 
Use shell-based integration (echo/printf + pipe) instead of Java Process for chat operations until the IPC issue is resolved.

**Next Steps**:
1. Test with ProcessBuilder.redirectOutput() to redirect to a file
2. Try non-blocking I/O (NIO) or async stream reading
3. Test on different Java versions
4. Consider using a socket-based transport instead of stdin/stdout

### ◈ Lessons Learned from ECA Protocol Implementation (2026-02-08)

#### Critical Protocol Requirements

1. **camelCase Parameter Names** (Not kebab-case!)
   - ECA protocol follows JSON conventions, using camelCase
   - ❌ `:process-id` → ✅ `:processId`
   - ❌ `:client-info` → ✅ `:clientInfo`
   - ❌ `:workspace-folders` → ✅ `:workspaceFolders`
   - ❌ `:chat-id` → ✅ `:chatId`
   - **Location**: `src/ouroboros/eca_client.clj`
   - **Impact**: Using kebab-case causes ECA to ignore parameters or fail silently

2. **State Access in Futures**
   - **Bug**: Capturing `@state` outside `future` creates stale state reference
   - **Fix**: Dereference state inside the future loop on each iteration
   ```clojure
   ;; WRONG - captures stale state
   (let [{:keys [stdout running]} @state]
     (future
       (when @running ...)))  ; running is a boolean, not atom!
   
   ;; CORRECT - reads fresh state each iteration
   (future
     (loop []
       (let [{:keys [stdout running]} @state]
         (when running ...))))
   ```

3. **Char Array to String Conversion**
   - **Bug**: `(str chars)` on char-array returns object reference `[C@...`
   - **Fix**: Use `(String. chars)` constructor
   - **Impact**: JSON parsing fails with "Unrecognized token 'C'"

4. **Initialized Notification**
   - **Requirement**: Must send `initialized` notification after receiving initialize response
   - **Protocol**: LSP/JSON-RPC requires this handshake completion
   - **Without it**: ECA won't start processing chat/prompt requests

5. **Content Reading Loop**
   - **Issue**: `.read()` may not return all bytes in one call
   - **Fix**: Loop until all `content-length` bytes are read
   ```clojure
   (loop [remaining content-length]
     (when (> remaining 0)
       (let [read-count (.read reader chars 0 remaining)]
         (when (> read-count 0)
           (.append sb chars 0 read-count)
           (recur (- remaining read-count))))))
   ```

#### Testing Protocol

**Manual ECA Test**:
```bash
# Test ECA directly
(echo -e 'Content-Length: 58\r\n\r\n{"jsonrpc":"2.0","method":"initialize","params":{},"id":1}'; sleep 2) | eca server

# Expected response:
# Content-Length: 266
# {"jsonrpc":"2.0","id":1,"result":{"chatWelcomeMessage":"# Welcome to ECA!..."}}
```

**Ouroboros ECA Client Test**:
```clojure
(require '[ouroboros.eca-client :as eca])

;; Start ECA
(eca/start! {:eca-path "/Users/davidwu/bin/eca"})
;; Should see: ✓ ECA initialized

;; Wait for MCP servers to initialize (5-10 seconds)
(Thread/sleep 8000)

;; Clear any previous chat contents
(eca/clear-chat-contents!)

;; Send chat message
(let [result (future (eca/chat-prompt "Say hello"))]
  (deref result 15000 nil))

;; Wait for streaming responses
(Thread/sleep 5000)

;; Get accumulated chat content
(doseq [content (eca/get-chat-contents)]
  (println (:role content) ":" (get-in content [:content :text])))

;; Stop ECA
(eca/stop!)
```

#### ECA Configuration

**Project-level config** (`.eca/config.json`) - Contains provider credentials:
```json
{
  "defaultModel": "minimax/minimax-m2.1",
  "providers": {
    "minimax": {
      "api": "anthropic",
      "url": "https://api.minimaxi.com/anthropic",
      "key": "sk-api-...",
      "models": {
        "minimax-m2.1": {}
      }
    }
  }
}
```

**Note**: API key is embedded in project config. No user-level config required.

#### Commits
- `f62a2ed` - Fix ECA protocol compliance (camelCase, read-loop, init notification)
- `c6f3279` - Set default ECA model to minimax/minimax-m2.1
