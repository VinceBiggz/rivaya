# Development Dockerfile for NestJS API
FROM node:18-slim

# Install system dependencies for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy only package.json files first for efficient caching
COPY pnpm-workspace.yaml ./
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY apps/api/package.json ./apps/api/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies at root level
RUN pnpm install --frozen-lockfile

# Copy entire monorepo source code (excluding node_modules via .dockerignore)
COPY . .

# Generate Prisma client (after schema is available)
RUN cd apps/api && pnpm db:generate

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3001

# Start the development server using pnpm workspace from root directory
CMD ["pnpm", "--filter", "@rivaya/api", "start:dev"]
