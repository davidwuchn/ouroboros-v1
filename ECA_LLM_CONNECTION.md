# ECA LLM Connection Debug Test Plan

## Step 1: Restart ECA with Debug Logging

Stop your current ECA server and restart with debug logging:

```bash
# Kill existing ECA process
pkill -f eca

# Start with debug logging (capture to file)
eca --log-level debug --verbose 2>&1 | tee ~/eca-debug-$(date +%Y%m%d-%H%M%S).log
```

## Step 2: Basic Connection Test (No Tools)

In your editor, open a new ECA chat and send a simple message:

```
Hello, can you respond with just "OK"?
```

**Expected Result:** You should get "OK" back without errors.

**If this fails:** The issue is with basic LLM connectivity, not tool calling.

---

## Step 3: Test Tool Calling with Simple Native Tool

Try a simple native tool that doesn't require external resources:

```
Can you list the files in the current directory using the directory_tree tool?
```

**Expected Result:** You should see the LLM calling `eca__directory_tree` and returning results.

**If this fails:** The issue is with tool invocation in general.

---

## Step 4: Test the Exact Failing Case (brepl skill)

Now test the exact scenario that failed:

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

# 1. Check what request was being made when it failed
grep -B 20 "RST_STREAM\|Protocol error" $LOG_FILE

# 2. Check the last LLM request before the error
grep -B 5 "Sending body" $LOG_FILE | tail -50

# 3. Check for any streaming events
grep "\[ANTHROPIC\]\|\[OPENAI\]\|\[OLLAMA\]" $LOG_FILE | tail -100

# 4. Check if any MCP servers had issues
grep "MCP" $LOG_FILE | grep -i "error\|fail\|timeout"

# 5. Look for Java HTTP/2 errors
grep "jdk.internal.net.http" $LOG_FILE
```

---

## Step 6: Test with HTTP/1.1 (If Step 4 Failed)

Create or update `~/.config/eca/config.json`:

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

Create this exact sequence in a fresh ECA chat:

```
1. First message: "Hello"
2. Wait for response
3. Second message: "Use the eca__skill tool with argument name='brepl'"
4. Observe behavior
```

**Capture:**
- Exact error message
- Last 50 lines from debug log before error
- Your ECA config (sanitized)
- Your Java version: `java -version`

---

## What to Report

After running these tests, gather this information:

### Basic Info
```bash
# ECA version
eca --version

# Java version
java -version

# OS
uname -a  # or systeminfo on Windows

# Check config
cat ~/.config/eca/config.json
```

### From Debug Log
1. **Last request before error** (grep for "Sending body")
2. **Error context** (20 lines before/after RST_STREAM)
3. **Provider being used** (ANTHROPIC/OPENAI/etc tags)
4. **Streaming events** (any SSE events received)

### Test Results Matrix

| Test | Result | Notes |
|------|--------|-------|
| Step 2: Basic chat | ✅/❌ | |
| Step 3: Simple tool | ✅/❌ | |
| Step 4: brepl skill | ✅/❌ | |
| Step 6: HTTP/1.1 | ✅/❌ | |
| Step 9: Network | ✅/❌ | HTTP version used? |

---

## Quick Diagnosis Flowchart

```
RST_STREAM error occurs
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
    └─> Happens immediately or after delay?
        ├─> Immediate: Connection setup failure
        └─> After delay: Timeout/streaming issue
```

---

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

```
[DEBUG] [ANTHROPIC] [1234] Sending body: '{"model":"claude-3-5-sonnet...
[DEBUG] [ANTHROPIC] [1234] message_start {...}
[DEBUG] [ANTHROPIC] [1234] content_block_start {...}
[WARN] [ANTHROPIC] Unexpected response status: XXX body: ...
OR
Exception: java.io.IOException: Received RST_STREAM: Protocol error
```

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
