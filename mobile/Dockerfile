# Simple single-stage build for React Native Expo mobile app
FROM node:18-alpine

# Install pnpm and Expo CLI
RUN npm install -g pnpm @expo/cli

# Set working directory
WORKDIR /app/mobile

# Copy mobile package.json
COPY mobile/package.json ./

# Install dependencies
RUN pnpm install

# Copy mobile source code
COPY mobile/ ./

# Expose ports
EXPOSE 8081 19000 19001 19002

# Set environment variables
ENV NODE_ENV=development
ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0
ENV REACT_NATIVE_PACKAGER_HOSTNAME=0.0.0.0
ENV EXPO_TUNNEL=true

# Start Expo development server
CMD ["npx", "expo", "start", "--tunnel"]
