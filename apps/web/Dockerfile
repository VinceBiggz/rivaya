# Development Dockerfile for Next.js web app
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory to web app
WORKDIR /app/apps/web

# Copy package.json files for dependency installation
COPY apps/web/package.json ./
COPY packages/shared/package.json ../../packages/shared/

# Install dependencies directly in the app directory
RUN pnpm install --frozen-lockfile

# Copy source code
COPY apps/web/ ./
COPY packages/shared/ ../../packages/shared/

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Start the development server
CMD ["pnpm", "dev"]
