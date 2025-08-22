# RIVAYA - AI-Powered Group Management Platform

[![CI/CD](https://github.com/VinceBiggz/rivaya/actions/workflows/ci.yml/badge.svg)](https://github.com/VinceBiggz/rivaya/actions/workflows/ci.yml)
[![CircleCI](https://circleci.com/gh/VinceBiggz/rivaya.svg?style=svg)](https://circleci.com/gh/VinceBiggz/rivaya)

> **Revolutionizing how families, alumni, SACCOs, and communities stay connected across any distance with AI-powered group management.**

## 🚀 Quick Start

### Prerequisites
- Docker Desktop
- Node.js 18+
- pnpm (recommended)

### Local Development
```bash
# Clone the repository
git clone https://github.com/VinceBiggz/rivaya.git
cd rivaya

# Start all services
docker-compose up -d

# Access the applications
# Web App: http://localhost:3000
# API: http://localhost:3001
# Mobile (Expo): http://localhost:8081
# Mobile (Web Preview): http://localhost:8081?platform=web
```

## 📱 Mobile App Testing

### Demo Accounts
- **Admin**: `admin@rivaya.com` / `admin123`
- **User**: `user@rivaya.com` / `user123`
- **Demo**: `demo@rivaya.com` / `demo123`

### Testing Options

#### Option 1: Web Preview (Recommended for Development)
1. Visit `http://localhost:8081?platform=web` in your browser
2. Test the mobile app interface directly in the browser
3. All authentication flows and dashboard features available

#### Option 2: Native Mobile Testing
1. Install [Expo GO](https://expo.dev/client) on your device
2. Connect to: `exp://localhost:8081`
3. Test all authentication flows and dashboard features

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: NestJS, TypeScript, Prisma
- **Mobile**: React Native (Expo), TypeScript
- **Database**: Supabase (PostgreSQL with RLS)
- **Cache**: Redis
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions, CircleCI
- **Testing**: Vitest (Frontend), Jest (Backend/Mobile)

### Project Structure
```
rivaya/
├── apps/
│   ├── web/                 # Next.js Web Application
│   │   ├── src/
│   │   │   ├── app/         # App Router pages
│   │   │   ├── components/  # Reusable components
│   │   │   └── __tests__/   # Frontend tests
│   │   └── Dockerfile
│   ├── api/                 # NestJS API
│   │   ├── src/
│   │   │   ├── modules/     # Feature modules
│   │   │   ├── common/      # Shared utilities
│   │   │   └── test/        # Backend tests
│   │   └── Dockerfile
│   └── mobile/              # React Native App
│       ├── src/
│       │   └── screens/     # Mobile screens
│       ├── App.tsx          # Main app component
│       └── Dockerfile
├── packages/
│   └── shared/              # Shared types and utilities
│       ├── src/
│       │   ├── types/       # TypeScript types
│       │   ├── schemas/     # Validation schemas
│       │   └── utils/       # Shared utilities
│       └── package.json
├── docker-compose.yml        # Service orchestration
├── pnpm-workspace.yaml      # pnpm workspace configuration
├── .github/workflows/        # GitHub Actions
├── .circleci/               # CircleCI configuration
└── docs/                    # Documentation
```

## ✨ Features

### ✅ Implemented
- **Authentication System**: Complete login/signup with demo accounts
- **Responsive Web Design**: Professional landing page with dark navigation
- **Mobile App**: Full React Native app with authentication and dashboard
- **Containerized Architecture**: Docker-based development environment
- **CI/CD Pipelines**: Automated testing and deployment
- **Database Setup**: Supabase with PostgreSQL
- **API Foundation**: NestJS backend with health endpoints

### 🚧 In Development
- **AI-Powered Insights**: Intelligent group recommendations
- **Payment Management**: Group finance handling
- **Real-time Collaboration**: Live chat and notifications
- **Group Management**: Create, manage, and organize groups
- **Event Scheduling**: Calendar and event management
- **File Sharing**: Media and document management

## 🔧 Development

### Available Scripts
```bash
# Root level (monorepo)
pnpm dev          # Start all development servers
pnpm build        # Build all applications
pnpm test         # Run all tests

# Web App
cd apps/web
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm test         # Run tests

# API
cd apps/api
pnpm start:dev    # Start development server
pnpm test         # Run tests
pnpm build        # Build for production

# Mobile
cd apps/mobile
pnpm start        # Start Expo development server
pnpm android      # Run on Android
pnpm ios          # Run on iOS

# Shared Package
cd packages/shared
pnpm build        # Build shared types and utilities
pnpm test         # Run tests
```

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f [service]

# Rebuild specific service
docker-compose build --no-cache [service]

# Stop all services
docker-compose down
```

## 🧪 Testing

### Test Coverage
- **Frontend**: Unit tests with Vitest
- **Backend**: Unit and E2E tests with Jest
- **Mobile**: Component tests with Jest
- **CI/CD**: Automated testing on every commit

### Running Tests
```bash
# All tests
pnpm test

# Individual service tests
cd apps/web && pnpm test      # Frontend tests
cd apps/api && pnpm test      # Backend tests
cd apps/mobile && pnpm test   # Mobile tests
cd packages/shared && pnpm test # Shared package tests
```

## 📊 Current Status

### Sprint 0.3 - COMPLETED ✅
- [x] CI/CD Pipeline Setup (CircleCI + GitHub Actions)
- [x] Comprehensive Testing Suite
- [x] Authentication Pages Implementation
- [x] Professional Web Design with Dark Theme
- [x] Mobile App with Full Authentication Flow
- [x] Demo User Accounts for Testing
- [x] Containerized Development Environment

### Services Status
- **Web App**: ✅ Running on http://localhost:3000
- **API**: ✅ Running on http://localhost:3001
- **Mobile**: ✅ Running on http://localhost:8081
- **Database**: ✅ Supabase PostgreSQL
- **Cache**: ✅ Redis
- **CI/CD**: ✅ GitHub Actions + CircleCI

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs/](docs/)
- **Issues**: [GitHub Issues](https://github.com/VinceBiggz/rivaya/issues)
- **Discussions**: [GitHub Discussions](https://github.com/VinceBiggz/rivaya/discussions)

## 🏆 Acknowledgments

- Built with modern web technologies
- Containerized for easy development and deployment
- Designed for scalability and maintainability
- Focused on user experience across all platforms

---

**RIVAYA** - Connecting groups, empowering communities, one platform at a time.
