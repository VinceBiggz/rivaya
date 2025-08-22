# RIVAYA Architecture Documentation

## 🏗️ System Overview

RIVAYA is a modern, containerized microservices architecture designed for scalability, maintainability, and cross-platform compatibility. The system consists of three main applications: Web Frontend, Mobile App, and Backend API, all orchestrated through Docker containers.

## 📐 Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Frontend  │    │   Mobile App    │    │   Backend API   │
│   (Next.js)     │    │ (React Native)  │    │   (NestJS)      │
│   Port: 3000    │    │   Port: 8081    │    │   Port: 3001    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴─────────────┐
                    │      Nginx Proxy          │
                    │      Port: 80/443         │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │      Supabase DB          │
                    │      (PostgreSQL)         │
                    └─────────────┬─────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │        Redis Cache        │
                    │        Port: 6379         │
                    └───────────────────────────┘
```

## 🏢 Service Architecture

### Monorepo Structure
```
rivaya/
├── apps/
│   ├── web/          # Next.js Web Application
│   ├── api/          # NestJS Backend API
│   └── mobile/       # React Native Mobile App
├── packages/
│   └── shared/       # Shared types and utilities
└── docker-compose.yml # Service orchestration
```

### 1. Frontend Service (Web)
- **Technology**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Container**: Docker with Node.js 18 Alpine
- **Port**: 3000
- **Features**:
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - Responsive design
  - Dark theme support
  - Authentication pages
  - Professional landing page

### 2. Backend Service (API)
- **Technology**: NestJS
- **Language**: TypeScript
- **Database**: Prisma ORM
- **Container**: Docker with Node.js 18 Alpine
- **Port**: 3001
- **Features**:
  - RESTful API endpoints
  - JWT authentication
  - Health check endpoints
  - Modular architecture
  - Swagger documentation
  - Rate limiting

### 3. Mobile Service
- **Technology**: React Native with Expo
- **Language**: TypeScript
- **Container**: Docker with Node.js 18 Alpine
- **Port**: 8081 (Metro Bundler + Web Preview)
- **Features**:
  - Cross-platform compatibility
  - Hot reload development
  - Authentication screens
  - Dashboard interface
  - Demo user accounts
  - Web preview support (`?platform=web`)

### 4. Database Service
- **Technology**: Supabase (PostgreSQL)
- **Features**:
  - Row-level security (RLS)
  - Real-time subscriptions
  - Built-in authentication
  - File storage
  - Database functions

### 5. Cache Service
- **Technology**: Redis
- **Port**: 6379
- **Features**:
  - Session storage
  - API response caching
  - Rate limiting storage
  - Real-time data

### 6. Proxy Service
- **Technology**: Nginx
- **Ports**: 80 (HTTP), 443 (HTTPS)
- **Features**:
  - Load balancing
  - SSL termination
  - Rate limiting
  - Security headers
  - Reverse proxy

## 🔄 Data Flow

### Authentication Flow
```
1. User submits credentials
2. Frontend/Mobile → Backend API
3. Backend validates with Supabase
4. JWT token generated
5. Token returned to client
6. Client stores token locally
7. Subsequent requests include token
```

### API Request Flow
```
1. Client request → Nginx Proxy
2. Nginx → Backend API
3. Backend validates JWT
4. Backend queries Supabase/Redis
5. Response → Nginx → Client
```

## 🗄️ Database Design

### Core Tables (Planned)
```sql
-- Users table
users (
  id UUID PRIMARY KEY,
  email VARCHAR UNIQUE,
  full_name VARCHAR,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)

-- Groups table
groups (
  id UUID PRIMARY KEY,
  name VARCHAR,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP
)

-- Group members
group_members (
  id UUID PRIMARY KEY,
  group_id UUID REFERENCES groups(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR,
  joined_at TIMESTAMP
)

-- Payments table
payments (
  id UUID PRIMARY KEY,
  group_id UUID REFERENCES groups(id),
  payer_id UUID REFERENCES users(id),
  amount DECIMAL,
  description TEXT,
  created_at TIMESTAMP
)
```

## 🔒 Security Architecture

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication
- **Row-Level Security**: Database-level access control
- **Rate Limiting**: API request throttling
- **CORS**: Cross-origin resource sharing
- **Security Headers**: XSS, CSRF protection

### Data Protection
- **Encryption**: Data at rest and in transit
- **Input Validation**: Server-side validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Prevention**: Content Security Policy

## 🚀 Deployment Architecture

### Development Environment
- **Docker Compose**: Local service orchestration
- **Hot Reload**: Development server with live updates
- **Volume Mounting**: Code changes reflect immediately
- **Health Checks**: Service availability monitoring

### Production Environment (Planned)
- **Kubernetes**: Container orchestration
- **Load Balancer**: Traffic distribution
- **Auto-scaling**: Dynamic resource allocation
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## 📊 Performance Considerations

### Caching Strategy
- **Redis**: Session and API response caching
- **CDN**: Static asset delivery
- **Database**: Query result caching
- **Browser**: HTTP caching headers

### Scalability
- **Horizontal Scaling**: Multiple service instances
- **Database Sharding**: Data distribution
- **Microservices**: Independent service scaling
- **Load Balancing**: Traffic distribution

## 🔧 Development Workflow

### Local Development
1. **Docker Compose**: Start all services
2. **Hot Reload**: Code changes reflect immediately
3. **Database**: Local Supabase instance
4. **Testing**: Automated test suites
5. **Linting**: Code quality enforcement

### CI/CD Pipeline
1. **GitHub Actions**: Automated testing
2. **CircleCI**: Build and deployment
3. **Code Quality**: Linting and type checking
4. **Security**: Vulnerability scanning
5. **Deployment**: Automated releases

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Testing**: Vitest

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: Prisma + Supabase
- **Authentication**: JWT + Passport
- **Testing**: Jest

### Mobile
- **Framework**: React Native
- **Platform**: Expo
- **Language**: TypeScript
- **Navigation**: Screen-based routing
- **Testing**: Jest

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **CI/CD**: GitHub Actions + CircleCI
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis

## 📈 Future Architecture Plans

### Phase 1: Core Features
- [ ] Real-time messaging (WebSocket)
- [ ] File upload and storage
- [ ] Payment integration (Stripe)
- [ ] Email notifications

### Phase 2: Advanced Features
- [ ] AI-powered insights
- [ ] Advanced analytics
- [ ] Mobile push notifications
- [ ] Offline support

### Phase 3: Scale & Performance
- [ ] Kubernetes deployment
- [ ] Microservices breakdown
- [ ] Advanced caching
- [ ] Performance optimization

## 🔍 Monitoring & Observability

### Health Checks
- **Service Health**: `/health` endpoints
- **Database Connectivity**: Connection pooling
- **Cache Status**: Redis ping
- **API Response Time**: Performance metrics

### Logging
- **Structured Logging**: JSON format
- **Log Levels**: DEBUG, INFO, WARN, ERROR
- **Centralized Logging**: ELK Stack (planned)
- **Error Tracking**: Sentry integration (planned)

---

This architecture provides a solid foundation for building a scalable, maintainable, and feature-rich group management platform.
