# RIVAYA Development Environment Setup Script for Windows

Write-Host "🚀 Setting up RIVAYA development environment..." -ForegroundColor Green

# Check if Docker is running
try {
    docker info | Out-Null
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop first." -ForegroundColor Red
    exit 1
}

# Start the database services
Write-Host "📦 Starting database services..." -ForegroundColor Yellow
docker-compose up -d supabase redis

# Wait for database to be ready
Write-Host "⏳ Waiting for database to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Run database migrations
Write-Host "🔄 Running database migrations..." -ForegroundColor Yellow
docker exec -it rivaya_api pnpm db:migrate

# Generate Prisma client
Write-Host "🔧 Generating Prisma client..." -ForegroundColor Yellow
docker exec -it rivaya_api pnpm db:generate

# Seed the database
Write-Host "🌱 Seeding database with demo data..." -ForegroundColor Yellow
docker exec -it rivaya_api pnpm db:seed

# Start all services
Write-Host "🚀 Starting all services..." -ForegroundColor Yellow
docker-compose up -d

Write-Host "✅ Development environment setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📧 Demo credentials:" -ForegroundColor Cyan
Write-Host "   - demo@rivaya.com (password: demo123)" -ForegroundColor White
Write-Host "   - admin@rivaya.com (password: demo123)" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Services:" -ForegroundColor Cyan
Write-Host "   - Web App: http://localhost:3000" -ForegroundColor White
Write-Host "   - API: http://localhost:3001" -ForegroundColor White
Write-Host "   - Mobile: http://localhost:8081" -ForegroundColor White
Write-Host "   - Mobile Web: http://localhost:19006" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Useful commands:" -ForegroundColor Cyan
Write-Host "   - View logs: docker-compose logs -f" -ForegroundColor White
Write-Host "   - Restart services: docker-compose restart" -ForegroundColor White
Write-Host "   - Reset database: docker exec -it rivaya_api pnpm db:reset" -ForegroundColor White
