# Development Dockerfile for Next.js web app
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/shared/package.json ./packages/shared/

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/web/ ./apps/web/
COPY packages/shared/ ./packages/shared/

# Set working directory to web app
WORKDIR /app/apps/web

EXPOSE 3000
ENV NODE_ENV=development
ENV PORT=3000

CMD ["pnpm", "dev"]
