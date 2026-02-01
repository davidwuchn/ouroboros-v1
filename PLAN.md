# PLAN.md

> Next steps and future directions for Ouroboros.

## Current Status

**PLATFORM COMPLETE** — All core capabilities implemented:
- Engine (∅), Query (EQL), Memory, Knowledge, API, OpenAPI
- AI tools (13), Agent (LLM integration), Chat (3 platforms)
- Telemetry, MCP, Auth, Dashboard, Config
- Docker, CI/CD, Test Suite

## Immediate Priorities

### 1. Documentation Cleanup
- [x] Fix README.md (add Discord to architecture)
- [x] Update STATE.md (remove duplicate examples, fix test counts)
- [x] Update LEARNING.md (document registry pattern, not just resolve)
- [x] Delete Containerfile (superseded by Dockerfile)
- [x] Fix .gitignore (remove tracked ignored files)

### 2. Test Coverage
- [x] Chat adapter tests (protocol compliance)
- [x] Tool execution tests (all 13 tools)
- [ ] Error handling tests (boundary conditions) — WIP
- [ ] Integration tests (full chat flow with AI)

### 3. Infrastructure Hardening
- [x] Fix Docker health check (remove resolve)
- [x] Fix CI secret detection (cover all token types)
- [x] Update bb test task (run all test suites)
- [ ] Split interface.clj (God Object refactor)

## Medium Term

### Observability
- [ ] Metrics export (Prometheus format)
- [ ] Structured logging (JSON format option)
- [ ] Distributed tracing for tool calls

### Performance
- [ ] Query caching (Pathom cache)
- [ ] Connection pooling for HTTP clients
- [ ] Memory usage optimization (event buffer sizing)

### Developer Experience
- [ ] REPL-driven debugging guide
- [ ] Custom tool development tutorial
- [ ] Platform adapter SDK

## Long Term / Research

### Persistence
- [ ] Datomic/Datalevin integration option
- [ ] Event sourcing for state reconstruction
- [ ] Multi-node state synchronization

### Scaling
- [ ] Redis for shared state across instances
- [ ] Horizontal scaling with load balancing
- [ ] Webhook-based chat adapters (serverless)

### Enterprise Features
- [ ] OAuth2/SAML authentication
- [ ] Audit logging for compliance
- [ ] Role-based access control (RBAC) expansion
- [ ] Enterprise SSO integration

### AI Improvements
- [ ] Multi-modal support (images, voice)
- [ ] Fine-tuning pipeline for custom models
- [ ] Agent memory and long-term context
- [ ] Tool-use planning and reasoning traces

## Completed Recently

| Date | Achievement |
|------|-------------|
| 2026-02-01 | Platform definition and test restructuring |
| 2026-02-01 | Docker + CI/CD implementation |
| 2026-02-01 | Tool registry restructuring (circular dependency eliminated) |
| 2026-02-01 | Comprehensive test suite (32+ tests) |

## How to Contribute

1. Pick an item from Immediate Priorities
2. Discuss in GitHub issue first
3. Follow the established patterns (see AGENTS.md)
4. Update tests and documentation
5. Commit with appropriate symbols (⚒, ◈, etc.)

---

*The Ouroboros grows by consuming its own tail.*
