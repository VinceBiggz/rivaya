#!/bin/bash

echo "🚀 Setting up RIVAYA development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Start the database services
echo "📦 Starting database services..."
docker-compose up -d supabase redis

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Run database migrations
echo "🔄 Running database migrations..."
docker exec -it rivaya_api pnpm db:migrate

# Generate Prisma client
echo "🔧 Generating Prisma client..."
docker exec -it rivaya_api pnpm db:generate

# Seed the database
echo "🌱 Seeding database with demo data..."
docker exec -it rivaya_api pnpm db:seed

# Start all services
echo "🚀 Starting all services..."
docker-compose up -d

echo "✅ Development environment setup complete!"
echo ""
echo "📧 Demo credentials:"
echo "   - demo@rivaya.com (password: demo123)"
echo "   - admin@rivaya.com (password: demo123)"
echo ""
echo "🌐 Services:"
echo "   - Web App: http://localhost:3000"
echo "   - API: http://localhost:3001"
echo "   - Mobile: http://localhost:8081"
echo "   - Mobile Web: http://localhost:19006"
echo ""
echo "🔧 Useful commands:"
echo "   - View logs: docker-compose logs -f"
echo "   - Restart services: docker-compose restart"
echo "   - Reset database: docker exec -it rivaya_api pnpm db:reset"
