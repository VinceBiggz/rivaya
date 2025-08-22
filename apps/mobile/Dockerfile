# Multi-stage build for Expo mobile app
FROM node:18-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy workspace config
COPY pnpm-workspace.yaml package.json ./
COPY apps/mobile/package.json ./apps/mobile/
COPY packages/shared/package.json ./packages/shared/

# Create configs BEFORE installing dependencies
RUN echo 'module.exports = function(api) { api.cache(true); return { presets: ["babel-preset-expo"] }; };' > apps/mobile/babel.config.js

# Create metro config with correct path for new workspace structure
RUN echo 'const { getDefaultConfig } = require("expo/metro-config"); const path = require("path"); const config = getDefaultConfig(__dirname); config.resolver.enableSymlinks = true; config.resolver.alias = { "@rivaya/shared": path.resolve(__dirname, "../../packages/shared/src") }; module.exports = config;' > apps/mobile/metro.config.js

# Install dependencies
RUN pnpm install

# Copy source code
COPY apps/mobile/ ./apps/mobile/
COPY packages/shared/ ./packages/shared/

# Ensure expo is available locally and test it
RUN cd apps/mobile && pnpm install && npx expo --version

WORKDIR /app/apps/mobile

EXPOSE 8081 19006
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0

CMD ["npx", "expo", "start", "--web", "--lan"]
