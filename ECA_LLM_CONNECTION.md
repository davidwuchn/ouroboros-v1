# ECA LLM Connection Debug Test Plan

## 📋 Current Status Summary

| Issue | Status | Notes |
|-------|--------|-------|
| Telemetry Serialization Bug | ✅ **FIXED** | Process objects sanitized in telemetry protocol |
| Request-ID Bug | ✅ **FIXED** | `send-request!` now extracts correct ID from state |
| ECA Initialization Timeout | 🚨 **ACTIVE** | Binary starts but no JSON-RPC response |
| Provider Compatibility | 🔄 **UPDATED** | Moonshot → OpenRouter/Claude Sonnet 4.5 |
| nREPL Environment | ⚠️ **JVM REQUIRED** | Babashka has Jackson issues, using JVM nREPL |
| Basic Chat Testing | ❌ **BLOCKED** | Cannot proceed due to initialization timeout |

**Last Updated**: 2026-02-08  
**Latest Fix**: Commit `53344ea` - ◈ Fix ECA telemetry serialization bug and request-id bug  
**Current Focus**: Debug ECA binary JSON-RPC protocol communication

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

## **🚨 NEW ISSUE: ECA Initialization Timeout**
**Issue**: ECA binary starts but initialization handshake times out after 30 seconds

**Symptoms**:
```
◈ Starting ECA client...
  ECA path: /Users/davidwu/bin/eca
✓ ECA process started
[TELEMETRY] {:event :eca/initialize-timeout}
⚠️  ECA initialize timeout
```

**Root Cause**: ECA process starts (`[server] Starting server...`) but doesn't respond to JSON-RPC `initialize` method. Protocol mismatch or binary communication issue.

**Environment Details**:
- **ECA Binary**: `/Users/davidwu/bin/eca` (version 0.99.0, 85.7 MB)
- **Provider**: Switched from Moonshot/Kimi (403 errors) to OpenRouter/Claude Sonnet 4.5
- **nREPL**: Using JVM nREPL (port 8889) due to Babashka Jackson classloading issues
- **Java**: OpenJDK 25.0.2

**Debug Findings**:
1. **Raw communication test**: Process starts, accepts stdin, but only outputs `[server] Starting server...` without JSON-RPC response
2. **Telemetry fixed**: No more serialization errors after sanitization patch
3. **Provider changed**: Moonshot API returns 403 (coding agents only), OpenRouter configured
4. **Environment**: Babashka nREPL has Jackson classloading issues (`com.fasterxml.jackson.core.JsonGenerator`), JVM nREPL works for loading namespaces

**Next Steps Needed**:
1. Debug ECA binary JSON-RPC protocol manually
2. Check if ECA expects different Content-Length header format
3. Verify stderr capture (errors may not be visible)
4. Test ECA `server` mode standalone

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

**⚠️ CURRENTLY BLOCKED**: ECA initialization timeout prevents chat testing.

Once initialization is fixed, in your editor, open a new ECA chat and send a simple message:

```
Hello, can you respond with just "OK"?
```

**Expected Result:** You should get "OK" back without errors.

**If this fails:** The issue is with basic LLM connectivity, not tool calling.

---

## Step 3: Test Tool Calling with Simple Native Tool

**⚠️ CURRENTLY BLOCKED**: ECA initialization timeout prevents tool testing.

Once initialization is fixed, try a simple native tool that doesn't require external resources:

```
Can you list the files in the current directory using the directory_tree tool?
```

**Expected Result:** You should see the LLM calling `eca__directory_tree` and returning results.

**If this fails:** The issue is with tool invocation in general.

---

## Step 4: Test the Exact Failing Case (brepl skill)

**⚠️ CURRENTLY BLOCKED**: ECA initialization timeout prevents tool testing.

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

If testing with other providers, create or update `~/.config/eca/config.json`:

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

**Note:** Replace "anthropic" with your actual provider (openai, ollama, etc.)

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

# Check config
cat ~/.config/eca/config.json

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
| 🚨 Step 2: Basic chat | ❌ **BLOCKED** | ECA initialization timeout prevents chat |
| Step 3: Simple tool | ❌ **BLOCKED** | Cannot test due to initialization issue |
| Step 4: brepl skill | ❌ **BLOCKED** | Cannot test due to initialization issue |
| 🔄 Step 6: HTTP/1.1 | ⏳ **PENDING** | Provider already uses HTTP/1.1 (OpenRouter) |
| ✅ Step 9: Network | ✅ **WORKS** | curl tests successful, provider connectivity OK |
| 🚨 ECA Init Timeout | ❌ **NEW ISSUE** | Binary starts but no JSON-RPC response |
| ✅ Provider Switch | ✅ **COMPLETE** | Moonshot → OpenRouter/Claude Sonnet 4.5 |
| ✅ nREPL Environment | ✅ **JVM ACTIVE** | Babashka nREPL has Jackson issues, using JVM nREPL |

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
    │   ├─> 🚨 YES: ECA initialization timeout (Current issue)
    │   │       ├─> Debug: Test raw JSON-RPC communication with `eca server`
    │   │       ├─> Check: ECA binary version (0.99.0)
    │   │       └─> Verify: Content-Length header format matches ECA expectations
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

3. **🚨 ECA Initialization Timeout**: Binary starts but doesn't respond to JSON-RPC `initialize`
   - **Symptoms**: `[TELEMETRY] {:event :eca/initialize-timeout}` after 30 seconds
   - **Debug**: Raw process starts, outputs `[server] Starting server...`, no JSON response
   - **Next**: Manual JSON-RPC protocol debugging required

4. **🔄 Provider Switched**: Moonshot/Kimi API returns 403 (coding agents only)
   - **New Provider**: OpenRouter/Claude Sonnet 4.5
   - **Config**: `~/.config/eca/config.json` updated with `defaultModel: "openrouter/anthropic/claude-sonnet-4.5"`
   - **Alternative**: DeepSeek also configured and available

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

### ✅ If telemetry serialization error occurs (Now Fixed):
- **Verification**: Check `sanitize-obj` function in `ouroboros.telemetry.protocol`
- **If persists**: Temporarily mute telemetry in REPL:
  ```clojure
  (alter-var-root #'ouroboros.telemetry/emit! (constantly (fn [& _] nil)))
  ```
- **Root cause**: Process objects in telemetry events, now sanitized to strings
- **Fixed in**: Commit `53344ea` - ◈ Fix ECA telemetry serialization bug and request-id bug

### 🚨 If ECA initialization times out (Current Issue):
- **Debug raw communication**: Test ECA `server` mode with manual JSON-RPC
  ```bash
  echo -e 'Content-Length: 85\r\n\r\n{"jsonrpc":"2.0","method":"initialize","params":{},"id":1}' | eca server
  ```
- **Check ECA version**: Ensure compatibility (currently 0.99.0)
- **Verify protocol**: ECA may expect different Content-Length format or JSON structure
- **Capture stderr**: Errors may not be visible (redirect stderr to stdout)
- **Test standalone**: Run ECA server manually and observe startup behavior
- **Next step**: Protocol-level debugging of JSON-RPC handshake
