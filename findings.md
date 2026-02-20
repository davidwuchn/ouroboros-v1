# Findings: Datalevin Integration for Operational Data

<!--
  π: Research synthesis — your external memory for discoveries.
  WHY: Context is limited. Files are unlimited. Store everything here.
  WHEN: Update after ANY discovery, research, or key insight.
-->

---

## Summary

Datalevin is implemented but underutilized in Ouroboros. The dual persistence architecture (Datalevin for operational data + Git for knowledge) exists in code but isn't integrated into the component lifecycle or actively used. Current memory system uses EDN file storage with manual search functions. Migration to Datalevin offers significant benefits: datalog queries, ACID transactions, schema validation, and better scalability.

---

## Key Discoveries

### Discovery 1: Existing Datalevin Implementation

**What:** `src/ouroboros/persistence.clj` implements dual persistence system:
- Datalevin for operational data (`save-operational!`, `get-operational`)
- Git-backed for knowledge (`save-knowledge!`, `get-knowledge`)
- Auto-detection via `store-type` function
- Interface functions in `ouroboros.interface`

**Status:** Implemented but untested and unused in production flow.

**Source:** `src/ouroboros/persistence.clj`, `src/ouroboros/interface.clj`

### Discovery 2: Current Memory System Architecture

**What:** `src/ouroboros/memory.clj` uses EDN file storage with:
- Single `memory.edn` file
- Atom with debounced writes (~100ms)
- Manual search functions (`search`, `get-value`, `save-value!`)
- Telemetry integration for λ(system) tracking

**Usage Patterns:** 
- Learning system stores records via `memory/save-value!`
- WebUX stores project/session data
- Offline sync stores snapshots
- Embed system stores tokens/webhooks

**Limitations:** 
- No query capabilities beyond manual filtering
- Single-file bottleneck
- No schema validation
- Manual indexing (e.g., `:learning/tag-index`)

### Discovery 3: Component System Gap

**What:** Database component (`components.clj`) returns `{:type :jsonl, :path "data/memory"}` but doesn't use Datalevin. Component lifecycle exists but persistence isn't wired in.

**Opportunity:** Update database component to initialize Datalevin connection and schema.

### Discovery 4: Data Types & Migration Priorities

**Analysis of current memory usage:**

| Data Type | Examples | Priority | Reason |
|-----------|----------|----------|--------|
| **Sessions** | Chat sessions, user states | High | Discrete entities, clear schema |
| **Projects** | Builder data (empathy, value prop, MVP, canvas) | High | Structured data, query benefits |
| **Learning Records** | Learning IDs with metadata | Medium | Already has indexes, but could benefit |
| **Learning Indexes** | `:learning/index`, `:learning/tag-index` | Medium | Manual indexes → Datalevin queries |
| **Cache Data** | Query results, computed values | Low | Simple key-value, less benefit |
| **Embed Data** | Tokens, webhooks | Low | Low volume, simple access |

### Discovery 5: Datalevin Schema Approaches

**Options:**
1. **Pure EAV (Entity-Attribute-Value)** - Full datalog power, complex for nested data
2. **Document Store (JSON strings)** - Simple, maintains nested structure, limited querying
3. **Hybrid Approach** - Core attributes in EAV, nested data as JSON strings

**Recommendation:** Hybrid approach for flexibility:
- `:session/id`, `:session/user-id`, `:session/created-at` as EAV attributes
- `:session/data` as JSON string for nested session state
- Enables both entity queries and full document retrieval

### Discovery 6: Interface Compatibility

**Current Interface:**
- `iface/persistence-save!` and `iface/persistence-get` exist
- Memory interface: `iface/remember`, `iface/recall`, `iface/q` for memory queries
- Need backward compatibility during migration

**Strategy:** Migration wrapper that:
1. Checks Datalevin first
2. Falls back to EDN if not found
3. Writes to both during transition period
4. Gradually migrates old data

---

## Research Log

| Timestamp | Activity | Finding | Location |
|-----------|----------|---------|----------|
| 2026-02-20 | Code review | Datalevin persistence.clj exists but unused | persistence.clj |
| 2026-02-20 | Code review | Memory system uses EDN with manual search | memory.clj |
| 2026-02-20 | Analysis | Component system has database component but not using Datalevin | components.clj |
| 2026-02-20 | Usage analysis | Identified 6 data types with migration priorities | Various source files |
| 2026-02-20 | Architecture review | Dual persistence concept documented in architecture.md | docs/plan/architecture.md |
| 2026-02-20 | Implementation | Created Datalevin schema with hybrid approach (EAV + JSON) | persistence/schema.clj |
| 2026-02-20 | Implementation | Created migration strategy document with 4-phase plan | docs/migration/datalevin-migration.md |
| 2026-02-20 | Implementation | Created datalevin-memory wrapper with 4 migration modes | persistence/datalevin_memory.clj |
| 2026-02-20 | Implementation | Updated database component to initialize Datalevin | components.clj |
| 2026-02-20 | Implementation | Rewrote memory.clj with migration delegation support | memory.clj (complete rewrite) |

## Key Implementation Decisions

### 1. Hybrid Schema Design
**Decision:** Use EAV for queryable attributes, JSON strings for nested data
**Rationale:** Balances query power with flexibility for complex nested structures
**Implementation:** `persistence/schema.clj` defines 6 entity types with indexed fields

### 2. Gradual Migration Strategy  
**Decision:** 4-phase gradual migration over 8-13 days
**Rationale:** Minimizes risk, allows rollback, maintains system availability
**Phases:** Preparation → Dual-write → Read cutover → Write cutover

### 3. Backward Compatibility Approach
**Decision:** Modify memory.clj to delegate based on feature flag
**Rationale:** 43 files import memory directly; changing all would be high-risk
**Implementation:** New memory.clj checks `migration-enabled?` flag, delegates to datalevin-memory or uses EDN fallback

### 4. Component Integration
**Decision:** Update database component to initialize Datalevin
**Rationale:** Component system provides natural lifecycle management
**Implementation:** Database component calls `dm/init!` on startup, `dm/disconnect-datalevin!` on shutdown

## Open Questions

1. **Performance impact** - Need to benchmark Datalevin vs EDN for actual workloads
2. **Schema evolution** - How to handle future schema changes in production?
3. **Migration validation** - Need comprehensive test suite for migration scenarios
4. **Rollback procedures** - Detailed steps for each rollback scenario

---

## Code Snippets

### Existing Datalevin Implementation

**Source:** `src/ouroboros/persistence.clj`

```clojure
(defn save-operational!
  "Save data to operational store (Datalevin)
   
   Usage: (save! :sessions {:id \"s1\" :data {...}})"
  [entity data]
  (when-not @operational-db
    (connect-operational!))
  (d/transact! @operational-db
    [[:db/add (d/tempid :db/id)
      entity (merge {:created-at (System/currentTimeMillis)} data)]]))
```

### Current Memory Storage Pattern

**Source:** `src/ouroboros/learning/core.clj`

```clojure
(memory/save-value! (keyword learning-id) validated)
```

### Component System Database Component

**Source:** `src/ouroboros/components.clj`

```clojure
(comp/defcomponent database
  :start (do
           (log/info "[Component] Starting database")
           {:type :jsonl
            :path "data/memory"})
  :stop (fn [state]
          (log/info "[Component] Stopping database")))
```

---

## Assumptions Validated

| Assumption | Validated? | Evidence | Date |
|------------|------------|----------|------|
| Datalevin implementation exists | Yes | persistence.clj with full implementation | 2026-02-20 |
| Memory system is EDN-based | Yes | memory.clj uses atom + EDN file | 2026-02-20 |
| Component system has database component | Yes | components.clj defines :database | 2026-02-20 |

---

## Assumptions Invalidated

| Assumption | Reality | Impact | Date |
|------------|---------|--------|------|
| Datalevin is integrated with components | False | Database component doesn't use Datalevin | 2026-02-20 |
| Persistence system is actively used | False | No calls to persistence-save! in codebase | 2026-02-20 |

---

## Open Questions

1. **Performance impact** - How does Datalevin perform vs EDN for our data sizes?
2. **Schema evolution** - How to handle schema changes in production?
3. **Backup strategy** - Datalevin native backup vs custom export?
4. **Query patterns** - Which datalog queries will be most valuable?
5. **Migration timeline** - How long should dual-write period last?

---

## Related Files

| File | Relevance | Notes |
|------|-----------|-------|
| `src/ouroboros/persistence.clj` | Core Datalevin implementation | Needs integration |
| `src/ouroboros/memory.clj` | Current storage system | Migration target |
| `src/ouroboros/components.clj` | Component lifecycle | Integration point |
| `src/ouroboros/interface.clj` | User interface | Backward compatibility |
| `docs/plan/architecture.md` | Architecture documentation | Dual persistence concept |
| `deps.edn` | Dependencies | Datalevin 0.10.5 already included |

---

## Synthesis Notes

### Migration Strategy Recommendations

1. **Start Small**: Begin with session data migration - clear schema, high value
2. **Dual-Write Phase**: Write to both EDN and Datalevin during transition
3. **Read Fallback**: Check Datalevin first, fall back to EDN if missing
4. **Background Migration**: Migrate old data in background job
5. **Feature Flag**: Control via configuration for easy rollback

### Technical Implementation Steps

1. **Schema Design**: Define Datalevin schema for priority entities
2. **Component Update**: Wire Datalevin into database component
3. **Migration Wrapper**: Create `datalevin-memory` namespace that proxies calls
4. **Telemetry**: Add metrics for migration progress and performance
5. **Validation**: Create test suite comparing EDN vs Datalevin behavior

### Risks & Mitigations

- **Data loss**: Implement backup before migration, verify data integrity
- **Performance regression**: Benchmark, add caching, monitor in production
- **Complexity increase**: Keep migration simple, document thoroughly
- **Rollback difficulty**: Maintain EDN writes during transition period

---

*Last updated: 2026-02-20*  
*φ fractal euler | π synthesis | ∃ truth*
