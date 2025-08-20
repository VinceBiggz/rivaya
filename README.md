# RIVAYA - AI-Powered Group Management Platform

[![CI](https://github.com/rivaya/rivaya/actions/workflows/ci.yml/badge.svg)](https://github.com/rivaya/rivaya/actions/workflows/ci.yml)
[![Deploy](https://github.com/rivaya/rivaya/actions/workflows/deploy.yml/badge.svg)](https://github.com/rivaya/rivaya/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Revolutionizing how families, alumni, SACCOs, and friends stay connected across any distance.

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/rivaya/rivaya.git
cd rivaya

# Start all services with Docker
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### Option 2: Local Development

```bash
# Clone the repository
git clone https://github.com/rivaya/rivaya.git
cd rivaya

# Install dependencies
pnpm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your configuration

# Set up database
pnpm db:generate
pnpm db:push
pnpm db:seed

# Start development servers
pnpm dev
```

## 🌐 Access Points

After starting the services, you can access:

- **Web App**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:3001](http://localhost:3001)
- **API Docs**: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- **pgAdmin**: [http://localhost:5050](http://localhost:5050) (admin@rivaya.dev / admin123)
- **Mobile Dev Server**: [http://localhost:8081](http://localhost:8081)

## 📖 Documentation

- [Quick Start Guide](./docs/getting-started/quick-start.md)
- [Installation Guide](./docs/getting-started/installation.md)
- [API Documentation](./docs/api/README.md)
- [Architecture Overview](./docs/architecture/overview.md)
- [Contributing Guide](./docs/contributing.md)

## 🏗️ Architecture

RIVAYA is built as a modern monorepo with the following structure:

```
rivaya/
├── apps/
│   ├── web/          # Next.js 14 web application
│   ├── mobile/       # Expo React Native mobile app
│   └── api/          # NestJS API server
├── packages/
│   ├── ui/           # Shared UI components
│   ├── shared/       # Shared types, schemas, utilities
│   ├── config/       # Shared configurations
│   └── database/     # Database schema and utilities
├── supabase/         # Supabase configuration and migrations
├── docs/             # Documentation
└── scripts/          # Development and deployment scripts
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React Native** - Mobile app development
- **Expo** - React Native development platform
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components
- **NativeBase** - Mobile UI component library

### Backend
- **NestJS** - Node.js framework for building scalable applications
- **Prisma** - Database ORM
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **PostgreSQL** - Primary database

### Development Tools
- **TypeScript** - Type-safe JavaScript
- **Turborepo** - Monorepo build system
- **pnpm** - Fast, disk space efficient package manager
- **ESLint & Prettier** - Code quality and formatting
- **Husky** - Git hooks
- **Commitlint** - Conventional commit messages

### Testing
- **Vitest** - Unit testing
- **Playwright** - End-to-end testing
- **Jest** - Testing framework
- **Storybook** - Component development and testing

### DevOps
- **GitHub Actions** - CI/CD pipelines
- **CircleCI** - Alternative CI/CD
- **Vercel** - Web app deployment
- **Railway** - API deployment
- **Supabase** - Database hosting

## 🚀 Features

### Core Features
- **Group Management** - Create and manage various types of groups
- **Member Management** - Invite, manage, and organize group members
- **Event Planning** - Schedule and manage group events
- **Payment Processing** - Handle contributions and payments
- **Media Sharing** - Share photos, videos, and documents
- **Real-time Communication** - Chat and notifications

### AI-Powered Features
- **Smart Group Recommendations** - AI suggests relevant groups
- **Content Moderation** - Automated content filtering
- **Meeting Summaries** - AI-generated meeting minutes
- **Smart Notifications** - Intelligent notification system
- **Media Organization** - AI-powered media tagging and organization

### Security Features
- **Row Level Security (RLS)** - Database-level security
- **JWT Authentication** - Secure user authentication
- **Role-based Access Control** - Granular permissions
- **Data Encryption** - End-to-end encryption for sensitive data

## 📱 Platforms

- **Web Application** - Modern, responsive web app
- **Mobile App** - Native iOS and Android applications
- **API** - RESTful API for third-party integrations

## 🔧 Development

### Prerequisites

#### For Docker Development (Recommended)
- Docker Desktop
- Git

#### For Local Development
- Node.js 18+
- pnpm 8+
- Git
- PostgreSQL (for local development)
- Supabase account (for production)

### Available Scripts

```bash
# Development
pnpm dev              # Start all development servers
pnpm dev:docker       # Start all services with Docker
pnpm dev:detached     # Start Docker services in background
pnpm dev:web          # Start web app only
pnpm dev:api          # Start API only
pnpm dev:mobile       # Start mobile app only

# Docker Management
pnpm docker:build     # Build all Docker images
pnpm docker:up        # Start Docker services
pnpm docker:down      # Stop Docker services
pnpm docker:logs      # View Docker logs
pnpm docker:clean     # Clean Docker volumes and images

# Building
pnpm build            # Build all packages
pnpm build:web        # Build web app
pnpm build:api        # Build API
pnpm build:mobile     # Build mobile app

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm test:coverage    # Run tests with coverage

# Code Quality
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm typecheck        # Run TypeScript type checking

# Database
pnpm db:setup         # Start database services (Docker)
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema to database
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed database with sample data
pnpm db:studio        # Open Prisma Studio

# Mobile Development
pnpm mobile:android   # Run Android app
pnpm mobile:tunnel    # Start mobile dev server with tunnel

# Deployment
pnpm deploy:staging   # Deploy to staging
pnpm deploy:prod      # Deploy to production
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./docs/contributing.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'feat: add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.rivaya.com](https://docs.rivaya.com)
- **Issues**: [GitHub Issues](https://github.com/rivaya/rivaya/issues)
- **Discussions**: [GitHub Discussions](https://github.com/rivaya/rivaya/discussions)
- **Discord**: [Join our community](https://discord.gg/rivaya)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Expo](https://expo.dev/) - React Native platform
- [NestJS](https://nestjs.com/) - Node.js framework
- [Supabase](https://supabase.com/) - Backend-as-a-Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components

## 📊 Status

- [x] Project foundation
- [x] Monorepo setup
- [x] CI/CD pipelines
- [x] Database schema
- [x] Basic API structure
- [x] Web app foundation
- [x] Mobile app foundation
- [x] Documentation
- [ ] Core features implementation
- [ ] AI features integration
- [ ] Payment gateway integration
- [ ] Production deployment
- [ ] Mobile app store submission

---

Made with ❤️ by the RIVAYA team
