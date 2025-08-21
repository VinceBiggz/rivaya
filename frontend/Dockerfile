# Simple single-stage build for Next.js web app
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app/frontend

# Copy frontend package.json
COPY frontend/package.json ./

# Install dependencies
RUN pnpm install

# Copy frontend source code
COPY frontend/ ./

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=development
ENV PORT=3000

# Start the development server
CMD ["pnpm", "dev"]
