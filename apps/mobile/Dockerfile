# RIVAYA Mobile App Dockerfile
# Development environment for Expo React Native

FROM node:20-alpine

# Install system dependencies
RUN apk add --no-cache \
    git \
    bash \
    curl \
    wget \
    unzip \
    python3 \
    make \
    g++ \
    libc6-compat

# Install Expo CLI and EAS CLI globally
RUN npm install -g @expo/cli eas-cli

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose Expo development server ports
EXPOSE 8081 19000 19001 19002

# Set environment variables for Expo
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_TUNNEL=true

# Start Expo development server with tunnel
CMD ["npx", "expo", "start", "--tunnel"]
