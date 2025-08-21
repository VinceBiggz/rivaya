# RIVAYA - AI-Powered Group Management Platform

A fully containerized, cross-platform group management platform with web, mobile, and API applications.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+ (for local development)
- pnpm (recommended package manager)

### 1. Clone and Setup
```bash
git clone https://github.com/VinceBiggz/rivaya.git
cd rivaya
cp env.docker.example .env.docker
# Edit .env.docker with your configuration
```

### 2. Start Everything with Docker
```bash
# Start all services (database, web, API, mobile)
docker-compose up -d

# Or start with logs
docker-compose up
```

### 3. Access Your Applications

| Service | URL | Description |
|---------|-----|-------------|
| **Web App** | http://localhost:3000 | Next.js frontend |
| **API** | http://localhost:3001 | NestJS backend |
| **Mobile Dev** | http://localhost:8081 | Expo development server |
| **pgAdmin** | http://localhost:5050 | Database management |
| **Nginx** | http://localhost:80 | Reverse proxy |

## 📱 Mobile Testing

### Android (Samsung)
1. Install Expo Go from Google Play Store
2. Scan QR code from: http://localhost:8081
3. App will load with hot reload

### iPhone
1. Install Expo Go from App Store
2. Scan QR code from: http://localhost:8081
3. App will load with hot reload

### Cross-Platform Testing
- **Windows**: Access via browser at http://localhost:3000
- **macOS**: Access via browser at http://localhost:3000
- **ChromeOS**: Access via browser at http://localhost:3000

## 🛠 Development Commands

### Docker Commands
```bash
# Build all containers
pnpm docker:build

# Start all services
pnpm docker:up

# View logs
pnpm docker:logs

# Stop all services
pnpm docker:down

# Clean up volumes
pnpm docker:clean

# Restart services
pnpm docker:restart
```

### Local Development
```bash
# Install dependencies
pnpm install:all

# Start database services only
pnpm db:setup

# Start web and API locally
pnpm dev

# Start mobile development
pnpm dev:mobile

# Run tests
pnpm test

# Type checking
pnpm typecheck

# Linting
pnpm lint
```

## 🏗 Architecture

```
rivaya/
├── frontend/          # Next.js Web App
├── backend/           # NestJS API
├── mobile/            # React Native (Expo)
├── shared/            # Shared types & utilities
├── docker-compose.yml # Container orchestration
├── nginx/             # Reverse proxy config
└── database/          # Database initialization
```

### Container Architecture
- **Web**: Next.js frontend (port 3000)
- **API**: NestJS backend (port 3001)
- **Mobile**: Expo development server (port 8081)
- **Database**: PostgreSQL (port 5432)
- **Cache**: Redis (port 6379)
- **Proxy**: Nginx (port 80/443)
- **Admin**: pgAdmin (port 5050)

## 🔧 Configuration

### Environment Variables
Copy `env.docker.example` to `.env.docker` and configure:

```bash
# Database
DATABASE_URL=postgresql://rivaya_user:rivaya_password@postgres:5432/rivaya

# API
JWT_SECRET=your-super-secret-jwt-token
STRIPE_SECRET_KEY=sk_test_your_stripe_key

# Mobile
EXPO_PUBLIC_API_URL=http://api:3001
```

### Database Setup
```bash
# Initialize database
pnpm db:setup

# Run migrations
pnpm db:migrate

# Seed data
pnpm db:seed
```

## 🧪 Testing

### Web Testing
- **Unit Tests**: `pnpm --filter @rivaya/frontend test`
- **E2E Tests**: `pnpm --filter @rivaya/frontend e2e`
- **Coverage**: `pnpm --filter @rivaya/frontend test:coverage`

### API Testing
- **Unit Tests**: `pnpm --filter @rivaya/backend test`
- **Coverage**: `pnpm --filter @rivaya/backend test:coverage`

### Mobile Testing
- **Unit Tests**: `pnpm --filter @rivaya/mobile test`
- **Device Testing**: Use Expo Go app

## 📊 Monitoring

### Health Checks
- **Web**: http://localhost:3000/health
- **API**: http://localhost:3001/health
- **Nginx**: http://localhost/health

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f web
docker-compose logs -f api
docker-compose logs -f mobile
```

## 🔒 Security

### Features
- **Rate Limiting**: Configured in Nginx
- **CORS**: Properly configured
- **Security Headers**: XSS, CSRF protection
- **JWT Authentication**: Secure token handling
- **Database RLS**: Row-level security enabled

### SSL/HTTPS
- Self-signed certificates for development
- Configured in Nginx for production

## 🚀 Deployment

### Production
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Staging
```bash
# Build staging images
docker-compose -f docker-compose.staging.yml build

# Deploy
docker-compose -f docker-compose.staging.yml up -d
```

## 🐛 Troubleshooting

### Common Issues

**Port Conflicts**
```bash
# Check what's using ports
netstat -ano | findstr :3000
netstat -ano | findstr :3001

# Kill processes
taskkill /PID <PID> /F
```

**Container Won't Start**
```bash
# Check logs
docker-compose logs <service-name>

# Rebuild
docker-compose build --no-cache <service-name>
```

**Mobile App Won't Load**
```bash
# Check Expo tunnel
docker-compose logs mobile

# Restart mobile service
docker-compose restart mobile
```

**Database Connection Issues**
```bash
# Check database health
docker-compose exec postgres pg_isready -U rivaya_user

# Reset database
docker-compose down -v
docker-compose up -d postgres
```

## 📚 Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Architecture Overview](./ARCHITECTURE.md)
- [Security Policy](./SECURITY.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests: `pnpm test`
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/VinceBiggz/rivaya/issues)
- **Discussions**: [GitHub Discussions](https://github.com/VinceBiggz/rivaya/discussions)
- **Email**: vincent@rivaya.com

---

**RIVAYA** - Empowering communities through intelligent group management.
