# λ(system) Metrics Implementation

## Implemented Components

### 1. λ(self) - Code Review Metrics
Tracks code review effectiveness:
- False positive rate (target: < 10%)
- Missed critical rate (target: < 5%)  
- Adoption rate (target: > 70%)
- Total reviews

### 2. λ(memory) - Knowledge Retrieval Metrics
Tracks knowledge retrieval effectiveness:
- Average retrieval time (target: < 1000ms)
- Hit rate (target: > 80%)
- Total queries

### 3. Maintenance Checklist
Automated checks:
- File size (< 200 lines)
- Manual checks for single-purpose and overlaps

## Usage

```bash
# Show λ(system) metrics
bb lambda:metrics

# Run maintenance checklist  
bb lambda:maintain

# Record a review outcome
# bb lambda:record-review file issues suggestions adopted time-ms

# Record a retrieval
# bb lambda:record-retrieval query elapsed-ms
```

## Files Created

- `src/ouroboros/lambda_metrics.clj` - Metrics tracking
- `src/ouroboros/lambda_maintain.clj` - Maintenance checklist
- `src/ouroboros/memory/search.clj` - Added metrics instrumentation (search-hybrid)
- `docs/lambda-system-metrics.md` - This documentation
- `bb.edn` - Added lambda:metrics and lambda:maintain tasks
