# =============================================================================
# RIVAYA WEB - Multi-stage Dockerfile
# =============================================================================
# Development: Lightweight with volume mounts
# Production: Optimized multi-stage build
# =============================================================================

# Base stage for shared dependencies
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm@latest

# Copy workspace configuration
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy app-specific package.json files
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies (this layer will be cached)
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app

# Copy source code
COPY . .

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start development server
CMD ["pnpm", "--filter", "@rivaya/web", "dev"]

# Builder stage for production
FROM base AS builder
WORKDIR /app

# Copy source code
COPY . .

# Build the application
RUN pnpm --filter @rivaya/web build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@latest

# Copy package files
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod

# Copy built application from builder stage
COPY --from=builder /app/apps/web/.next ./apps/web/.next
COPY --from=builder /app/apps/web/public ./apps/web/public
COPY --from=builder /app/apps/web/next.config.js ./apps/web/
COPY --from=builder /app/packages/shared/dist ./packages/shared/dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000 || exit 1

# Start production server
CMD ["pnpm", "--filter", "@rivaya/web", "start"]

