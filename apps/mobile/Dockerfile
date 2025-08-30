# =============================================================================
# RIVAYA MOBILE - Development Dockerfile
# =============================================================================
# Development: Lightweight with volume mounts for Expo development
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
COPY apps/mobile/package.json ./apps/mobile/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies (this layer will be cached)
RUN pnpm install --frozen-lockfile

# Development stage
FROM base AS development
WORKDIR /app

# Copy source code
COPY . .

# Expose Expo ports
EXPOSE 19000 19001 19002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8081 || exit 1

# Fix dependencies and start Expo development server
CMD ["sh", "-c", "cd /app/apps/mobile && npx expo install --fix && pnpm start --web --lan"]
