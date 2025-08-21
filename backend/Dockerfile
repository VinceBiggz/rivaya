# Multi-stage build for NestJS backend
FROM node:18-alpine AS base

# Install pnpm and NestJS CLI
RUN npm install -g pnpm @nestjs/cli

# Set working directory
WORKDIR /app

# Copy root package files
COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml ./

# Copy package.json files for all workspaces
COPY frontend/package.json ./frontend/
COPY backend/package.json ./backend/
COPY mobile/package.json ./mobile/
COPY shared/package.json ./shared/

# Install dependencies
RUN pnpm install

# Copy source code
COPY frontend/ ./frontend/
COPY backend/ ./backend/
COPY mobile/ ./mobile/
COPY shared/ ./shared/

# Build stage
FROM base AS builder
WORKDIR /app/backend

# Build the NestJS application
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Install pnpm
RUN npm install -g pnpm

# Create non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

# Copy built application and dependencies
COPY --from=builder --chown=nestjs:nodejs /app/backend/dist ./dist
COPY --from=builder --chown=nestjs:nodejs /app/backend/package.json ./package.json
COPY --from=builder --chown=nestjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nestjs:nodejs /app/shared ./shared

USER nestjs

EXPOSE 3001

ENV PORT=3001

CMD ["node", "dist/main.js"]
