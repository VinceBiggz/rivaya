# Simple single-stage build for NestJS backend
FROM node:18-alpine

# Install pnpm and NestJS CLI
RUN npm install -g pnpm @nestjs/cli

# Set working directory
WORKDIR /app/backend

# Copy backend package.json
COPY backend/package.json ./

# Install dependencies
RUN pnpm install

# Copy backend source code
COPY backend/ ./

# Expose port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3001

# Start the development server directly
CMD ["pnpm", "run", "start:dev"]
