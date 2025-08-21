# Multi-stage build for React Native Expo mobile app
FROM node:18-alpine AS base

# Install pnpm and Expo CLI
RUN npm install -g pnpm @expo/cli

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

# Development stage
FROM base AS dev
WORKDIR /app/mobile

EXPOSE 8081 19000 19001 19002

ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_TUNNEL=true
ENV NODE_ENV=development

CMD ["pnpm", "start", "--tunnel"]
