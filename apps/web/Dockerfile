# Development Dockerfile for Next.js web app
FROM node:18-alpine
# Install curl for health checks (if needed, though web apps usually don't have health checks inside the container)
RUN apk add --no-cache curl
# Install pnpm
RUN npm install -g pnpm

# Set working directory to web app
WORKDIR /app/apps/web

# Copy package.json files for dependency installation
# Copy pnpm-workspace.yaml and root package files from the build context (monorepo root)
COPY pnpm-workspace.yaml /app/
COPY package.json /app/
COPY pnpm-lock.yaml* /app/
# Copy app-specific package.json files
COPY apps/web/package.json ./
COPY packages/shared/package.json ../../packages/shared/

# Install dependencies directly in the app directory
RUN cd /app && pnpm install --frozen-lockfile

# Copy source code
COPY . /app

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Start the development server
CMD ["pnpm", "dev"]
