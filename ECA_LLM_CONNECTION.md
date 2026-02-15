# ECA Integration

> **Status**: ✅ Fully Operational  
> **Last Updated**: 2026-02-15

Ouroboros integrates with [ECA](https://github.com/joaomoreno/eca) (Editor Code Assistant) for AI capabilities.

## Quick Start

```bash
# Install ECA binary
bb setup:eca

# Verify installation
bb debug eca

# Start chat with AI
bb chat
```

## Architecture

```
┌─────────────┐      JSON-RPC      ┌─────────────┐
│  Ouroboros  │ ←─── over stdio ─→ │    ECA      │
│   (Clojure) │                    │  (Binary)   │
└─────────────┘                    └─────────────┘
       │                                  │
       ▼                                  ▼
┌─────────────┐                    ┌─────────────┐
│   Chat      │                    │  10+ LLM    │
│ Platforms   │                    │  Providers  │
│(Telegram/   │                    │(Claude/     │
│Discord/     │                    │OpenAI/etc)  │
│Slack)      │                    │             │
└─────────────┘                    └─────────────┘
```

## Configuration

ECA configuration lives in `~/.eca/config.json`:

```json
{
  "defaultProvider": "anthropic",
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-...",
      "model": "claude-3-5-sonnet-20241022"
    }
  }
}
```

## Troubleshooting

### ECA not found

```bash
bb debug eca        # Check status
bb setup:eca        # Reinstall
bb eca:diagnose     # Detailed diagnostics
```

### Connection issues

```bash
bb eca:status       # Show process status
# Check if orphaned ECA processes exist
```

## Historical Debug Log

For detailed debugging history of the ECA integration (including protocol fixes, IPC issues, and telemetry serialization), see:

**[docs/solutions/eca-integration-debugging.md](docs/solutions/eca-integration-debugging.md)**

This document contains the complete development and debugging log for educational purposes.

## API Usage

```clojure
(require '[ouroboros.eca-client :as eca])

;; Start client
(eca/start!)

;; Send chat prompt
(eca/chat-prompt "What files are in this project?")

;; Check status
(eca/alive?)
```

See [AGENTS.md](AGENTS.md) for more ECA integration details.
