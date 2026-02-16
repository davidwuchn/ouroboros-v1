# λ(system) Auto-Evolution Implementation

## Overview

Implements the 4 self-evolving loops from λ(system):

```
error⊢proof       →  Repeated issues → Auto-create linter rules
reflection→structure → Insights → Auto-create templates
observe→become   →  High usage → Auto-promote to quick access  
relevance⊢retrieval → High search → Auto-index priority
```

## Usage

```bash
# Run auto-evolution
bb lambda:evolve

# View status
bb lambda:evolve:status
```

## Tracking Functions

```clojure
(require '[ouroboros.lambda-evolve :as evolve])

;; Track issues (3+ repeats = auto-rule)
(evolve/track-issue! "deep-nesting" "src/foo.clj")

;; Track searches (5+ searches = auto-index)
(evolve/track-search! "threading macros")

;; Track knowledge access (10+ accesses = auto-promote)
(evolve/track-access! "quick-ref/threading")

;; Record insights
(evolve/record-insight! "Threading macros are frequently asked")
```

## Thresholds

| Pattern | Threshold | Action |
|---------|-----------|--------|
| Issue repeats | 3 | Auto-create linter rule |
| Search frequency | 5 | Auto-index |
| Access count | 10 | Auto-promote |

## Integration Points

To make the system truly auto-evolve, integrate tracking into:

1. **Chat commands** - Track search queries
2. **Review tools** - Track flagged issues  
3. **Knowledge system** - Track access patterns

## Files

- `src/ouroboros/lambda_evolve.clj` - Auto-evolution engine
- `src/ouroboros/lambda_metrics.clj` - Effectiveness metrics
- `src/ouroboros/lambda_maintain.clj` - Maintenance checklist
- `bb.edn` - Tasks: `lambda:metrics`, `lambda:maintain`, `lambda:evolve`
