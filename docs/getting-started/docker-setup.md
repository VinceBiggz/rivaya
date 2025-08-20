# Docker Setup Guide

This guide covers setting up and running RIVAYA using Docker containers for seamless development across different environments.

## Prerequisites

- **Docker Desktop** installed and running
- **Git** for cloning the repository
- **At least 4GB RAM** available for Docker

## Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone https://github.com/rivaya/rivaya.git
cd rivaya

# Start all services
docker-compose up -d
```

### 2. Access Your Applications

Once the containers are running, you can access:

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **API Documentation**: http://localhost:3001/api/docs
- **pgAdmin**: http://localhost:5050
  - Email: `admin@rivaya.dev`
  - Password: `admin123`
- **Mobile Dev Server**: http://localhost:8081

## Docker Services Overview

### Core Services

| Service | Port | Description |
|---------|------|-------------|
| `postgres` | 5432 | PostgreSQL database |
| `redis` | 6379 | Redis cache |
| `pgadmin` | 5050 | Database management interface |
| `web` | 3000 | Next.js web application |
| `api` | 3001 | NestJS API server |
| `mobile` | 8081, 19000-19002 | Expo development server |

### Network Configuration

All services communicate through the `rivaya-network` bridge network, allowing seamless inter-service communication.

## Development Workflow

### Starting Services

```bash
# Start all services in background
pnpm dev:detached

# Start with logs visible
pnpm dev:docker

# Start only database services
pnpm db:setup
```

### Stopping Services

```bash
# Stop all services
pnpm docker:down

# Stop and remove volumes
docker-compose down -v
```

### Viewing Logs

```bash
# View all logs
pnpm docker:logs

# View specific service logs
docker-compose logs -f web
docker-compose logs -f api
docker-compose logs -f postgres
```

### Database Operations

```bash
# Run migrations
pnpm db:migrate

# Seed database
pnpm db:seed

# Access database directly
docker-compose exec postgres psql -U rivaya_user -d rivaya_dev
```

## Mobile Development

### Android Device Testing

1. **Start mobile development server**:
   ```bash
   pnpm mobile:tunnel
   ```

2. **Install Expo Go** on your Android device

3. **Scan QR code** from the terminal or visit http://localhost:8081

4. **Enable hot reload** for instant updates

### iOS Simulator (macOS only)

```bash
# Start iOS simulator
cd apps/mobile
npx expo run:ios
```

## Environment Configuration

### Docker Environment Variables

The `env.docker` file contains all necessary environment variables for containerized development:

```bash
# Database
DATABASE_URL=postgresql://rivaya_user:rivaya_dev_password@postgres:5432/rivaya_dev
REDIS_URL=redis://redis:6379

# API Configuration
API_PORT=3001
WEB_PORT=3000

# Mobile Development
EXPO_TUNNEL=true
```

### Customizing Environment

1. Copy the environment template:
   ```bash
   cp env.docker .env.docker
   ```

2. Edit `.env.docker` with your specific values

3. Restart containers:
   ```bash
   docker-compose down
   docker-compose up -d
   ```

## Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000
lsof -i :3001
lsof -i :5432

# Kill the process
kill -9 <PID>
```

#### Container Won't Start

```bash
# Check container logs
docker-compose logs <service-name>

# Rebuild containers
docker-compose build --no-cache

# Clean and restart
docker-compose down -v
docker-compose up --build
```

#### Database Connection Issues

```bash
# Check if PostgreSQL is running
docker-compose ps postgres

# Check database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up postgres -d
```

#### Mobile App Won't Connect

1. **Check tunnel status**:
   ```bash
   docker-compose logs mobile
   ```

2. **Restart mobile service**:
   ```bash
   docker-compose restart mobile
   ```

3. **Use local network** instead of tunnel:
   ```bash
   # Edit docker-compose.yml mobile service
   environment:
     - EXPO_TUNNEL=false
   ```

### Performance Optimization

#### Resource Allocation

For better performance, allocate more resources to Docker:

- **Memory**: 4GB minimum, 8GB recommended
- **CPU**: 2 cores minimum, 4 cores recommended
- **Disk**: 20GB available space

#### Volume Mounting

The setup uses volume mounting for development:

```yaml
volumes:
  - ./apps/web:/app
  - /app/node_modules  # Prevents overwriting container node_modules
```

This allows for:
- Hot reloading
- Live code changes
- Persistent development state

## Production Considerations

### Security

- Change default passwords in production
- Use environment-specific secrets
- Enable SSL/TLS for all services
- Implement proper firewall rules

### Scaling

- Use Docker Swarm or Kubernetes for orchestration
- Implement load balancing
- Set up monitoring and logging
- Configure auto-scaling policies

### Data Persistence

- Use external volumes for production data
- Implement backup strategies
- Set up database replication
- Configure disaster recovery

## Advanced Configuration

### Custom Docker Compose

Create `docker-compose.override.yml` for local customizations:

```yaml
version: '3.8'
services:
  web:
    environment:
      - DEBUG=true
      - LOG_LEVEL=debug
    volumes:
      - ./local-overrides:/app/overrides
```

### Multi-Environment Setup

Create environment-specific compose files:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Staging
docker-compose -f docker-compose.yml -f docker-compose.staging.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Support

For issues and questions:

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review [Common Issues](./common-issues.md)
- Open an [Issue on GitHub](https://github.com/rivaya/rivaya/issues)
- Join our [Discord Community](https://discord.gg/rivaya)
