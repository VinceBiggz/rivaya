# Development Dockerfile for NestJS API
FROM node:18-slim
# Install system dependencies for Prisma and curl for health checks
# Install system dependencies for Prisma and curl for health checks
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install pnpm
RUN npm install -g pnpm

# Set working directory to the API application directory within the monorepo
WORKDIR /app/apps/api

# Copy only package.json files first for efficient caching
# Copy pnpm-workspace.yaml and root package files from the build context (monorepo root)
COPY pnpm-workspace.yaml /app/
COPY package.json /app/
COPY pnpm-lock.yaml* /app/
# Copy app-specific package.json files
COPY apps/api/package.json ./
COPY packages/shared/package.json ../../packages/shared/

# Install dependencies at root level
RUN cd /app && pnpm install --frozen-lockfile

# Copy entire monorepo source code (excluding node_modules via .dockerignore)
COPY . /app

# Generate Prisma client (after schema is available)
RUN pnpm db:generate

# Expose the application port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3001

# Start the development server using pnpm exec to correctly find nest CLI
CMD ["pnpm", "exec", "nest", "start", "--watch"]
