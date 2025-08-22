# Multi-stage build for NestJS API
FROM node:18-alpine AS base

# Install pnpm and NestJS CLI
RUN npm install -g pnpm @nestjs/cli

# Set working directory
WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/api/ ./apps/api/
COPY packages/shared/ ./packages/shared/

# Build stage
FROM base AS builder
WORKDIR /app/apps/api
RUN pnpm build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy workspace config and dependencies
COPY pnpm-workspace.yaml package.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/
RUN pnpm install --prod

# Copy built app
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY apps/api/ ./apps/api/
COPY packages/shared/ ./packages/shared/

WORKDIR /app/apps/api

EXPOSE 3001
ENV NODE_ENV=production
ENV PORT=3001

CMD ["pnpm", "start:prod"]
