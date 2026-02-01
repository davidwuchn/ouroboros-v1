# Ouroboros Platform - Docker Image
# Multi-stage build for production deployment

# Stage 1: Base with Babashka
FROM babashka/babashka:1.12.195 AS base

WORKDIR /app

# Copy dependency files first (for layer caching)
COPY bb.edn ./
RUN bb prepare 2>/dev/null || true

# Copy source code
COPY src/ ./src/
COPY test/ ./test/
COPY .env.example ./

# Stage 2: Production image
FROM babashka/babashka:1.12.195 AS production

LABEL org.opencontainers.image.title="Ouroboros"
LABEL org.opencontainers.image.description="AI assistant platform with multi-platform chat support"
LABEL org.opencontainers.image.source="https://github.com/davidwuchn/ouroboros-v1"

WORKDIR /app

# Create non-root user for security
RUN adduser -D -u 1000 ouroboros && \
    chown -R ouroboros:ouroboros /app

# Copy application from base
COPY --from=base --chown=ouroboros:ouroboros /app/ ./

# Switch to non-root user
USER ouroboros

# Expose ports
# 8888 - nREPL
# 3000 - MCP server
# 8080 - Dashboard
EXPOSE 8888 3000 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
    CMD bb -e "(require '[ouroboros.engine :as engine]) (System/exit (if (engine/healthy?) 0 1))"

# Default command: run chat bots
CMD ["bb", "chat"]
