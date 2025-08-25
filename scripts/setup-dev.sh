#!/bin/bash

# =============================================================================
# RIVAYA DEVELOPMENT SETUP SCRIPT
# =============================================================================
# This script sets up the complete development environment
# =============================================================================

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to check Docker status
check_docker() {
    if ! command_exists docker; then
        print_error "Docker is not installed. Please install Docker Desktop first."
        exit 1
    fi
    
    if ! docker info >/dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker Desktop."
        exit 1
    fi
    
    print_success "Docker is running"
}

# Function to check Node.js and pnpm
check_node() {
    if ! command_exists node; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    if ! command_exists pnpm; then
        print_warning "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm
    fi
    
    print_success "Node.js and pnpm are ready"
}

# Function to setup environment files
setup_env_files() {
  print_status "Setting up environment files..."

  copy_env_file() {
    local app_path=$1
    local example_file=$2
    local target_file=$3

    if [ -f "$app_path/$example_file" ] && [ ! -f "$app_path/$target_file" ]; then
      cp "$app_path/$example_file" "$app_path/$target_file"
      print_success "Created $app_path/$target_file from $example_file"
    elif [ -f "$app_path/$target_file" ]; then
      print_warning "$app_path/$target_file already exists. Skipping."
    else
      print_error "Example file $app_path/$example_file not found. Please create it first."
    fi
  }

  # Create .env files from .env.example if they don't exist
  copy_env_file "apps/api" ".env.example" ".env"
  copy_env_file "apps/web" ".env.example" ".env.local"
  copy_env_file "apps/mobile" ".env.example" ".env"
}

# Function to install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    
    # Install root dependencies
    pnpm install
    
    # Install workspace dependencies
    pnpm install --recursive
    
    print_success "Dependencies installed"
}

# Function to start database
start_database() {
    print_status "Starting database services..."
    
    # Stop any existing containers
    docker-compose down postgres redis 2>/dev/null || true
    
    # Start database services
    docker-compose up -d postgres redis
    
    # Wait for database to be ready
    print_status "Waiting for database to be ready..."
    timeout=60
    counter=0
    
    while ! docker-compose exec -T postgres pg_isready -U postgres -d rivaya >/dev/null 2>&1; do
        sleep 1
        counter=$((counter + 1))
        if [ $counter -ge $timeout ]; then
            print_error "Database failed to start within $timeout seconds"
            exit 1
        fi
    done
    
    print_success "Database is ready"
}

# Function to run database migrations
run_migrations() {
    print_status "Running database migrations..."
    
    cd apps/api
    
    # Generate Prisma client
    pnpm prisma generate
    
    # Run migrations
    pnpm prisma migrate dev --name init
    
    cd ../..
    
    print_success "Database migrations completed"
}

# Function to seed database
seed_database() {
    print_status "Seeding database..."
    
    cd apps/api
    
    # Run seed script if it exists
    if [ -f "prisma/seed.ts" ]; then
        pnpm prisma db seed
    else
        print_warning "No seed script found. Skipping database seeding."
    fi
    
    cd ../..
    
    print_success "Database seeding completed"
}

# Function to build applications
build_applications() {
    print_status "Building applications..."
    
    # Build API
    print_status "Building API..."
    cd apps/api
    pnpm build
    cd ../..
    
    # Build Web
    print_status "Building Web application..."
    cd apps/web
    pnpm build
    cd ../..
    
    print_success "Applications built successfully"
}

# Main execution
main() {
    echo "=============================================================================="
    echo "RIVAYA DEVELOPMENT SETUP"
    echo "=============================================================================="
    
    # Check prerequisites
    print_status "Checking prerequisites..."
    check_docker
    check_node
    
    # Setup environment
    setup_env_files
    
    # Install dependencies
    install_dependencies
    
    # Start database
    start_database
    
    # Run migrations
    run_migrations
    
    # Seed database
    seed_database
    
    # Build applications
    build_applications
    
    echo ""
    echo "=============================================================================="
    print_success "Development environment setup completed!"
    echo "=============================================================================="
    echo ""
    echo "Next steps:"
    echo "1. Start the development servers:"
    echo "   docker-compose up"
    echo ""
    echo "2. Or start individual services:"
    echo "   pnpm dev:api    # Start API server"
    echo "   pnpm dev:web    # Start Web server"
    echo "   pnpm dev:mobile # Start Mobile server"
    echo ""
    echo "3. Access your applications:"
    echo "   Web: http://localhost:3000"
    echo "   API: http://localhost:3001"
    echo "   Mobile: http://localhost:8081"
    echo ""
}

# Run main function
main "$@"
