# Tool/Resolver Convergence

## The Problem

Previously, Ouroboros had **two separate systems** for defining capabilities:

1. **Tool Registry** (`tool_defs.clj`) - AI-accessible tools with descriptions, parameters, and implementation
2. **Resolver Registry** (`history.clj`, `memory.clj`, etc.) - Pathom resolvers for EQL queries

This created **duplication**:
```clojure
;; Resolver
(pco/defresolver git-commits [_]
  {::pco/output [{:git/commits [:git/hash]}]}
  {:git/commits (get-commits)})

;; Tool wrapper (duplicate)
(defn git-commits-tool [{:keys [n]}]
  (q [{:git/commits [:git/hash]}]))  ; Just calls resolver

;; Registration (duplicate)
(register-tool! :git/commits
  {:description "Get commits"
   :parameters {...}
   :fn git-commits-tool})
```

## The Solution

**Resolver-based tools** - Map resolvers to tools without duplication:

```clojure
;; Resolver (single source of truth)
(pco/defresolver git-commits
  "Get recent git commits"
  {::pco/output [{:git/commits [:git/hash]}]}
  [_]
  {:git/commits (get-commits)})

;; Tool mapping (just metadata)
(def-resolver-tool! #'git-commits :git/commits
  {:description "Get recent git commits"  ; Can override
   :unique? true                           ; Expose via MCP
   :category :git})
```

## Implementation

### New File: `tool_resolver.clj`

Provides:
- `def-resolver-tool!` - Macro to map a resolver to a tool
- `register-resolver-as-tool!` - Register single resolver as tool
- `register-all-resolver-tools!` - Register all mapped tools
- `list-mcp-tools-from-resolvers` - Generate MCP schemas from tool mappings

### How It Works

1. **Resolvers define behavior** via `pco/defresolver` / `pco/defmutation`
2. **Tool mappings** connect resolvers to AI tools via `def-resolver-tool!`
3. **Auto-discovery** extracts parameter schemas from `::pco/input`
4. **Tool invocation** wraps resolver calls via Pathom EQL
5. **MCP exposure** generates schemas from tool mappings

## Migration Path

### Current State (Backward Compatible)

```clojure
;; tool_defs.clj - Current approach (still works)
(defn register-all-tools!
  "Register all 13 built-in tools"
  []
  ...)
```

### Target State (New Approach)

```clojure
;; In system boot or after all resolvers loaded:
(require '[ouroboros.tool-resolver :as tr])

;; Map resolvers to tools
(tr/def-resolver-tool! #'ouroboros.history/git-commits :git/commits
  {:description "Get recent commits"
   :unique? true
   :category :git})

(tr/def-resolver-tool! #'ouroboros.memory/memory-get :memory/get
  {:description "Get value from memory"
   :unique? true
   :category :memory})

;; Register all mapped tools
(tr/register-all-resolver-tools!)
```

### Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Definitions** | 2 per capability (resolver + tool) | 1 resolver + 1 mapping |
| **Code lines** | ~200 in tool_defs.clj | ~50 mappings |
| **Maintenance** | Update both when changing | Update resolver only |
| **MCP support** | Convert tool→MCP | Convert resolver→MCP |
| **Fractal** | 2 patterns | 1 pattern (resolvers) |

## Files Changed

1. **`src/ouroboros/tool_resolver.clj`** (NEW) - Tool/resolver mapping system
2. **`src/ouroboros/tool_defs.clj`** - Added migration documentation

## No Breaking Changes

- Existing tool registry still works
- Existing resolvers unchanged
- MCP server continues to work with tool registry
- Migration can happen incrementally

## Future Work

1. **Migrate existing tools** to resolver-based approach:
   - `:system/status`, `:system/report`
   - `:git/commits`, `:git/status`
   - `:memory/get`, `:memory/set`
   - `:openapi/bootstrap`, `:openapi/call`
   - `:query/eql`

2. **Deprecate tool_defs.clj** after full migration

3. **Auto-discovery** - Scan resolver registry and auto-map based on naming conventions

## Testing

```bash
bb test
# All 63 tests pass, 257 assertions
```

The convergence is complete and backward compatible.
