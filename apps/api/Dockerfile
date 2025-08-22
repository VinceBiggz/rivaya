# Development Dockerfile for NestJS API
FROM node:18-slim

# Install system dependencies including OpenSSL
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

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

# Generate Prisma client
WORKDIR /app/apps/api
RUN pnpm db:generate

# Set working directory back to API
WORKDIR /app/apps/api

EXPOSE 3001
ENV NODE_ENV=development
ENV PORT=3001

CMD ["pnpm", "start:dev"]
