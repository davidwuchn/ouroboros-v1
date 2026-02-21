# Datalevin Migration Strategy

> **Status:** Phase 1 In Progress
> **Last Updated:** Review completed - issues identified

## Overview

Migrate Ouroboros from EDN-based memory storage (`memory.clj`) to Datalevin operational data store while maintaining backward compatibility and system availability.

**Current State:** Single `memory.edn` file with atom + debounced writes
**Target State:** Datalevin with hybrid schema (EAV + JSON strings)
**Timeline:** Gradual migration over 4 phases

## Implementation Status

### Completed

| Component | Status | Notes |
|-----------|--------|-------|
| `schema.clj` | ⚠️ Partial | Schema defined, but has blocking issue (example code at namespace end) |
| `datalevin-memory.clj` | ⚠️ Partial | Core CRUD working, missing `:datalevin-first` in some functions |
| `memory.clj` integration | ✅ Done | Delegation to datalevin-memory working |
| `components.clj` integration | ✅ Done | Lifecycle management wired |
| Telemetry | ⚠️ Partial | Events emitted but some logic bugs exist |

### Known Issues (Code Review)

| Issue | Severity | Location | Fix Required |
|-------|----------|----------|--------------|
| Example code runs on namespace load | **Blocker** | `schema.clj:280-295` | Wrap in `(comment ...)` |
| `clear-memory!` not implemented for `:datalevin-only` | **Blocker** | `datalevin-memory.clj:380-400` | Implement Datalevin entity clearing |
| Missing `:datalevin-first` in `save-value!` | Critical | `datalevin-memory.clj` | Add case branch |
| Missing `:datalevin-first` in `delete-value!` | Critical | `datalevin-memory.clj` | Add case branch |
| `store-used` telemetry logic incorrect | Critical | `datalevin-memory.clj:285-295` | Fix store detection |
| Error logging uses println, not telemetry | Critical | `datalevin-memory.clj` | Use `telemetry/emit!` |
| No test coverage | Critical | - | Add test namespace |

### Schema-Implementation Mismatch

The schema defines `:presence/*` attributes but `datalevin-memory.clj` doesn't use them.
- **Option A:** Implement presence handling with dedicated attributes
- **Option B:** Remove unused attributes from schema

Recommend **Option B** to reduce confusion.

## Migration Principles

1. **Zero downtime** - System remains operational throughout migration
2. **Data safety** - No data loss, with backup/rollback capabilities  
3. **Backward compatibility** - Existing code continues to work during transition
4. **Performance monitoring** - Track performance impact and adjust as needed
5. **Gradual rollout** - Migrate data types incrementally, validate each step

## Phase 1: Preparation & Schema Setup

### 1.1 Update Database Component
- Modify `components.clj` database component to initialize Datalevin
- Add schema initialization on startup
- Add health checks for Datalevin connection

### 1.2 Create Migration Wrapper
- Create `datalevin-memory.clj` namespace that wraps memory operations
- Implements same interface as `memory.clj` (`save-value!`, `get-value`, etc.)
- Uses feature flag to control write destination (EDN only → dual-write → Datalevin only)

### 1.3 Add Telemetry & Monitoring
- Track migration progress (records migrated, performance metrics)
- Monitor Datalevin query performance vs EDN
- Alert on migration errors or performance regression

## Phase 2: Dual-Write Implementation

### 2.1 Session Data Migration (Priority 1)
- Update `collaboration.clj` to use migration wrapper
- Implement dual-write: writes go to both EDN and Datalevin
- Reads check Datalevin first, fall back to EDN if missing
- Background job migrates existing session data from EDN to Datalevin

### 2.2 Project Data Migration (Priority 2)  
- Update `webux.clj` builder persistence to use migration wrapper
- Same dual-write pattern as sessions
- Migrate existing project data in background

### 2.3 Learning System Migration (Priority 3)
- Update learning system (`core.clj`, `index.clj`) to use migration wrapper
- Special handling for indexes (`:learning/tag-index`, `:learning/index`)
- Migrate learning records and indexes in background

## Phase 3: Read Cutover

### 3.1 Feature Flag Controlled Reads
- Add configuration flag for read source preference
- Default: `:datalevin-first` (check Datalevin, fall back to EDN)
- Can be switched to `:datalevin-only` or `:edn-only` as needed

### 3.2 Performance Validation
- Benchmark read performance for common queries
- Validate data consistency between EDN and Datalevin
- Monitor system resource usage (memory, CPU, disk I/O)

### 3.3 Background Migration Completion
- Complete migration of all historical data
- Verify no data loss or corruption
- Create migration completion report

## Phase 4: Write Cutover & Cleanup

### 4.1 Write Cutover
- Switch writes from dual-write to Datalevin-only
- Keep EDN writes as backup for safety period
- Monitor for any write failures

### 4.2 EDN Archive
- Create final backup of EDN data
- Archive `memory.edn` and related files
- Document migration completion

### 4.3 Legacy Code Removal
- Remove dual-write logic from migration wrapper
- Update components to use Datalevin directly
- Remove EDN fallback code (optional, keep as emergency fallback)

## Data Mapping Specifications

### EDN Key → Datalevin Entity Mapping

| EDN Key Pattern | Datalevin Entity | Mapping Strategy |
|-----------------|------------------|------------------|
| `:presence/{session-id}` | `:session` + `:presence` | Session entity + presence entities |
| `:collab-session/{session-id}` | `:session` | Session metadata |
| `:learning/{id}` | `:learning` | Learning record entity |
| `:learning/tag-index` | Multiple `:tag` | Each tag becomes separate entity |
| `:learning/index` | `:cache` (temporary) | Cache entity, consider specialized index |
| `:embed-token/{token}` | `:cache` | Cache entity with type `:embed-token` |
| `:webhook/{id}` | `:cache` | Cache entity with type `:webhook` |
| Other keys | `:cache` | Generic cache entity |

### JSON Serialization Strategy

Complex/nested data stored as JSON strings in Datalevin:
- Session presence maps
- Project builder data  
- Learning insights/examples/pattern
- Cache values

Queryable attributes stored as EAV:
- IDs, timestamps, counts, types, statuses
- Indexed fields for common queries

## Rollback Plan

### Scenario 1: Performance Regression
- Switch read preference back to `:edn-only`
- Continue dual-writes for data preservation
- Investigate and fix performance issue
- Resume migration after fix

### Scenario 2: Data Corruption
- Restore from EDN backup
- Switch to `:edn-only` mode
- Investigate migration logic error
- Fix and restart migration from last safe point

### Scenario 3: System Instability
- Revert database component to EDN-only mode
- Disable Datalevin initialization
- System returns to pre-migration state
- Schedule migration for later date with fixes

## Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Data consistency** | 100% | No differences between EDN and Datalevin for migrated data |
| **Read performance** | ≤ 10% regression | Query latency comparison |
| **Write performance** | ≤ 20% regression | Write latency comparison |
| **Migration completion** | 100% of target data | Records migrated vs total |
| **System stability** | Zero critical incidents | Error rate during migration |

## Timeline Estimate

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 1** | 2-3 days | Schema, migration wrapper, monitoring |
| **Phase 2** | 3-5 days | Dual-write for sessions, projects, learning |
| **Phase 3** | 2-3 days | Read cutover, performance validation |
| **Phase 4** | 1-2 days | Write cutover, cleanup, documentation |
| **Total** | 8-13 days | Full migration to Datalevin |

## Risk Mitigation

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|------------|
| Data loss during migration | Low | High | Dual-write, backups, validation scripts |
| Performance regression | Medium | Medium | Benchmarking, monitoring, rollback capability |
| Schema evolution issues | Low | Medium | Versioned schema, migration utilities |
| Component dependency issues | Low | Low | Lazy initialization, health checks |

## Team Responsibilities

- **Architecture:** Schema design, migration strategy
- **Development:** Implementation of migration wrapper, component updates
- **QA:** Data validation, performance testing
- **Operations:** Monitoring, backup/restore procedures
- **Documentation:** Update architecture docs, create operational runbooks

## Next Steps

### Immediate (Fix Blockers)

1. **[schema.clj]** Remove or wrap example code at namespace end - currently executes on load
2. **[datalevin-memory.clj]** Implement `clear-memory!` for `:datalevin-only` mode
3. **[datalevin-memory.clj]** Add `:datalevin-first` case to `save-value!` and `delete-value!`

### Short Term (Fix Critical)

4. **[datalevin-memory.clj]** Fix `store-used` telemetry logic in `get-value`
5. **[datalevin-memory.clj]** Replace println with `telemetry/emit!` for error visibility
6. **Add test coverage** - Create `datalevin-memory-test.clj` with:
   - Basic CRUD operations
   - Migration path tests
   - Concurrent write tests

### Medium Term

7. **[schema.clj]** Decide on presence attribute handling (implement or remove)
8. **Component lifecycle** - Consider passing connection as dependency vs global atom
9. **Extract handlers** - Break up large `case` statements into private functions

### After Issues Resolved

1. Execute migration in development environment
2. Monitor and adjust based on results
3. Schedule production migration
