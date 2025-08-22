# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2024-12-22

### Added
- **Monorepo Restructure**: Migrated to proper pnpm workspace structure with `apps/*` and `packages/*`
- **Shared Package**: Created `@rivaya/shared` package for common types and utilities
- **Workspace Dependencies**: Added proper workspace references across all packages
- **Multi-stage Docker Builds**: Optimized Docker builds with proper caching layers

### Changed
- **Project Structure**: Moved from `frontend/backend/mobile/shared` to `apps/web/api/mobile` and `packages/shared`
- **Mobile Web Preview**: Fixed web preview to work with Expo SDK 49+ architecture
- **Package Names**: Updated package names to reflect new structure (`@rivaya/web`, `@rivaya/api`, `@rivaya/mobile`)
- **Docker Commands**: Updated all Dockerfiles to use new workspace structure
- **Service Dependencies**: Fixed health check dependencies in docker-compose.yml

### Fixed
- **Mobile Web Preview**: Resolved web preview access through `http://localhost:8081?platform=web`
- **Workspace Resolution**: Fixed pnpm workspace dependency resolution
- **Docker Build Caching**: Optimized build process for faster development
- **Service Dependencies**: Added proper Supabase dependency to API service

### Technical Details
- Updated `pnpm-workspace.yaml` to use `apps/*` and `packages/*` patterns
- Added `@rivaya/shared: "workspace:*"` to all package.json files
- Modified mobile Dockerfile CMD to use `--web --lan` flags
- Updated docker-compose.yml with correct service paths and dependencies
- Removed `--frozen-lockfile` flags for fresh builds during restructuring

### Breaking Changes
- **Directory Structure**: All services moved to new `apps/` and `packages/` structure
- **Package References**: Updated all internal package references to new names
- **Build Commands**: Docker build contexts and paths updated

## [0.3.1] - 2024-12-21

### Fixed
- **Mobile Container Dependency Issue**: Fixed mobile container dependency issue by forcing installation of react-native-web and react-dom (Sprint 0.3.1)
- **Docker Build Process**: Updated mobile Dockerfile to properly handle web dependencies and ensure clean installation
- **Container Configuration**: Simplified mobile service configuration in docker-compose.yml

### Technical Details
- Replaced mobile Dockerfile with optimized build process
- Added explicit installation of react-native-web@~0.19.6 and react-dom@18.2.0
- Updated docker-compose.yml mobile service configuration
- Removed workspace-specific flags that were causing build failures

## [0.3.0] - 2024-12-21

### Added
- **Web Preview Support for Mobile App**: Added `react-native-web` and `react-dom` dependencies
- **Expo Web Platform**: Enabled web platform in `app.json` configuration
- **Docker Web Support**: Updated Dockerfile to start Expo with `--web` flag
- **Port Configuration**: Added port 19006 for web preview in docker-compose.yml
- **Documentation**: Updated README with web preview instructions

### Changed
- **Mobile App Access**: Now available at both `localhost:8081` (native) and `localhost:19006` (web)
- **Development Workflow**: Developers can now preview mobile app in browser for faster iteration

### Technical Details
- Added `react-dom@18.2.0` and `react-native-web@~0.19.6` to mobile dependencies
- Updated Expo configuration to include web platform
- Modified Docker setup to expose web preview port
- Enhanced documentation with clear testing instructions

## [0.2.0] - 2024-12-21

### Added
- **Complete Containerized Architecture**: Docker Compose orchestration
- **Professional Web Application**: Next.js 14 with modern UI
- **Full Mobile Application**: React Native with authentication
- **Backend API Foundation**: NestJS with health endpoints
- **Database Setup**: Supabase PostgreSQL with Redis
- **CI/CD Pipelines**: GitHub Actions and CircleCI
- **Comprehensive Documentation**: Architecture and development guides

### Features
- Authentication system with demo accounts
- Responsive web design with dark theme
- Mobile app with navigation and dashboard
- Containerized development environment
- Automated testing and deployment

## [0.1.0] - 2024-12-21

### Added
- Initial project setup
- Basic monorepo structure
- Development environment configuration
