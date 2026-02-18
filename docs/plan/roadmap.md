# Roadmap

## Long-term Vision

Transform Ouroboros from **utility assistant** to **wisdom partner**:
- Each interaction builds understanding
- Learning flywheel creates transferable knowledge
- Teams build better products with structured methodology

---

## Implementation Phases

### Phase 1: Foundation (Complete)
- [x] ECA Integration
- [x] Web UX Platform
- [x] λ(system) Self-Evolution
- [x] New Architecture (component, signal, statechart)

### Phase 2: Wisdom System (This Month)
- [ ] Split wisdom.clj (643 LOC → modules)
- [ ] Single batch endpoint
- [ ] Connect to learning namespace
- [ ] Template personalization

### Phase 3: Learning Activation (Next Month)
- [ ] Learning Flywheel UI
- [ ] Spaced repetition system
- [ ] Cross-user pattern aggregation
- [ ] Semantic search upgrade

### Phase 4: Isolation (Q2)
- [ ] Container Isolation
- [ ] Per-Channel Isolation

---

## Deferred Items

| Item | Reason |
|------|--------|
| Message Bus Architecture | Current 3 adapters work fine |
| Heartbeat/Scheduling | No use case yet |
| Cron Service | Depends on heartbeat |
| Voice Integration | Low priority |

---

## Success Metrics

| Metric | Current | Target |
|--------|---------|--------|
| wisdom.clj LOC | 643 | <200 |
| WS requests on load | 4 | 1 |
| Static insights | 100% | <30% |
| λ retrieval time | - | <1s |
| λ hit rate | - | >80% |
