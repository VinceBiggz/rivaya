# =============================================================================
# RIVAYA API - Multi-stage Dockerfile
# =============================================================================
# Development: Lightweight with volume mounts
# Production: Optimized multi-stage build
# =============================================================================

# Base stage for shared dependencies
FROM node:18-alpine AS base
WORKDIR /app

# Install system dependencies for Prisma compatibility
RUN apk add --no-cache \
    openssl \
    ca-certificates \
    curl

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy workspace configuration
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy app-specific package.json files
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies (this layer will be cached)
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter @rivaya/api db:generate

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start development server
CMD ["pnpm", "--filter", "@rivaya/api", "start:dev"]

# Builder stage for production
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .

# Generate Prisma client
RUN pnpm --filter @rivaya/api db:generate

# Build the application
RUN pnpm --filter @rivaya/api build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install system dependencies for Prisma compatibility
RUN apk add --no-cache \
    openssl \
    ca-certificates \
    curl

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start production server
CMD ["pnpm", "--filter", "@rivaya/api", "start:prod"]
