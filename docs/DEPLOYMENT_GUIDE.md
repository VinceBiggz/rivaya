# RIVAYA Deployment Guide

This guide covers deploying RIVAYA to various environments and platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Local Development](#local-development)
- [Staging Deployment](#staging-deployment)
- [Production Deployment](#production-deployment)
- [Database Deployment](#database-deployment)
- [Mobile App Deployment](#mobile-app-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

## Prerequisites

### Required Tools
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- Git
- Supabase CLI (for database management)

### Required Accounts
- [GitHub](https://github.com) - Source code and CI/CD
- [Vercel](https://vercel.com) - Web app hosting
- [Railway](https://railway.app) or [Render](https://render.com) - API hosting
- [Supabase](https://supabase.com) - Database and storage
- [Expo](https://expo.dev) - Mobile app builds
- [Stripe](https://stripe.com) - Payment processing

## Environment Setup

### 1. Environment Variables

Create environment files for different environments:

#### Development (.env.local)
```bash
# Database
DATABASE_URL="postgresql://postgres:password@localhost:5432/rivaya"
REDIS_URL="redis://localhost:6379"

# Supabase
SUPABASE_URL="http://localhost:54321"
SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Authentication
JWT_SECRET="your-jwt-secret"
JWT_REFRESH_SECRET="your-refresh-secret"

# Payment Gateways
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
MPESA_CONSUMER_KEY="your-mpesa-key"
MPESA_CONSUMER_SECRET="your-mpesa-secret"

# Email
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"

# File Storage
STORAGE_BUCKET="media"
STORAGE_REGION="us-east-1"
```

#### Production (.env.production)
```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/rivaya"
REDIS_URL="redis://host:6379"

# Supabase
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_ANON_KEY="your-production-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-production-service-role-key"

# Authentication
JWT_SECRET="your-production-jwt-secret"
JWT_REFRESH_SECRET="your-production-refresh-secret"

# Payment Gateways
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
MPESA_CONSUMER_KEY="your-production-mpesa-key"
MPESA_CONSUMER_SECRET="your-production-mpesa-secret"

# Email
SMTP_HOST="smtp.sendgrid.net"
SMTP_PORT="587"
SMTP_USER="apikey"
SMTP_PASS="your-sendgrid-api-key"

# File Storage
STORAGE_BUCKET="rivaya-media"
STORAGE_REGION="us-east-1"
```

## Local Development

### 1. Start Database Services

```bash
# Start PostgreSQL, Redis, and pgAdmin
docker-compose up -d postgres redis pgadmin

# Verify services are running
docker-compose ps
```

### 2. Set Up Supabase Local

```bash
# Install Supabase CLI
npm install -g supabase

# Start Supabase locally
supabase start

# Apply migrations
supabase db reset
```

### 3. Start Applications

```bash
# Install dependencies
pnpm install

# Start all applications
pnpm dev

# Or start individually
pnpm dev:web    # Web app on http://localhost:3000
pnpm dev:api    # API on http://localhost:3001
pnpm dev:mobile # Mobile dev server
```

## Staging Deployment

### 1. Database Setup

```bash
# Create staging project in Supabase
supabase projects create rivaya-staging

# Link local project to staging
supabase link --project-ref your-staging-project-ref

# Push migrations
supabase db push
```

### 2. Deploy API

#### Using Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize project
railway init

# Deploy
railway up
```

#### Using Render
```bash
# Connect GitHub repository to Render
# Set build command: pnpm install && pnpm build:api
# Set start command: pnpm start:api
# Configure environment variables
```

### 3. Deploy Web App

#### Using Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Or connect GitHub for automatic deployments
```

### 4. Configure Environment Variables

Set the following in your deployment platforms:

- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `JWT_SECRET`
- `STRIPE_SECRET_KEY`
- `SMTP_*` variables

## Production Deployment

### 1. Database Migration

```bash
# Create production project
supabase projects create rivaya-production

# Link to production
supabase link --project-ref your-production-project-ref

# Apply migrations
supabase db push

# Seed production data (if needed)
supabase db seed
```

### 2. API Deployment

#### Railway Production
```bash
# Deploy to production
railway up --environment production

# Set production environment variables
railway variables set NODE_ENV=production
railway variables set DATABASE_URL="your-production-db-url"
```

#### Render Production
```bash
# Deploy to production environment
# Configure production environment variables
# Set up custom domain
# Configure SSL certificates
```

### 3. Web App Deployment

#### Vercel Production
```bash
# Deploy to production
vercel --prod

# Configure custom domain
vercel domains add your-domain.com

# Set up SSL certificates
```

### 4. CDN and Performance

```bash
# Configure CDN (Cloudflare)
# Set up caching rules
# Configure image optimization
# Set up monitoring
```

## Database Deployment

### 1. Supabase Setup

```bash
# Create production project
supabase projects create rivaya-production

# Configure RLS policies
supabase db push

# Set up backups
supabase db backup create

# Configure monitoring
```

### 2. Migration Strategy

```bash
# Create migration
supabase migration new add_new_feature

# Test migration locally
supabase db reset

# Apply to staging
supabase db push --project-ref staging-ref

# Apply to production
supabase db push --project-ref production-ref
```

### 3. Backup Strategy

```bash
# Automated backups
supabase db backup create --project-ref production-ref

# Restore from backup
supabase db restore --project-ref production-ref --backup-id backup-id
```

## Mobile App Deployment

### 1. Expo Setup

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure
```

### 2. Build Configuration

```json
// eas.json
{
  "cli": {
    "version": ">= 5.2.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "distribution": "store"
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 3. Build and Deploy

```bash
# Build for development
eas build --platform all --profile development

# Build for testing
eas build --platform all --profile preview

# Build for production
eas build --platform all --profile production

# Submit to app stores
eas submit --platform all
```

## Monitoring & Maintenance

### 1. Application Monitoring

#### Vercel Analytics
```bash
# Enable analytics in Vercel dashboard
# Configure performance monitoring
# Set up error tracking
```

#### API Monitoring
```bash
# Set up health checks
# Configure logging
# Set up alerting
# Monitor performance metrics
```

### 2. Database Monitoring

```bash
# Supabase dashboard monitoring
# Set up query performance alerts
# Monitor connection pools
# Track storage usage
```

### 3. Security Monitoring

```bash
# Set up security scanning
# Monitor for vulnerabilities
# Configure rate limiting alerts
# Set up intrusion detection
```

### 4. Backup and Recovery

```bash
# Automated daily backups
# Test restore procedures
# Document recovery processes
# Set up disaster recovery
```

## Troubleshooting

### Common Issues

1. **Database Connection Issues**
   ```bash
   # Check connection string
   # Verify network access
   # Check SSL configuration
   ```

2. **Build Failures**
   ```bash
   # Check Node.js version
   # Verify dependencies
   # Check environment variables
   ```

3. **Deployment Issues**
   ```bash
   # Check logs
   # Verify environment variables
   # Check resource limits
   ```

### Support Resources

- [GitHub Issues](https://github.com/VinceBiggz/rivaya/issues)
- [Documentation](https://docs.rivaya.com)
- [Community Discord](https://discord.gg/rivaya)
- [Email Support](support@rivaya.com)

## Security Checklist

- [ ] Environment variables are secure
- [ ] Database has RLS enabled
- [ ] API has rate limiting
- [ ] SSL certificates are valid
- [ ] Dependencies are up to date
- [ ] Security headers are configured
- [ ] CORS is properly configured
- [ ] Authentication is working
- [ ] Backups are automated
- [ ] Monitoring is active

---

For additional support, please refer to the [main documentation](https://docs.rivaya.com) or contact the development team.
