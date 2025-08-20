#!/bin/bash

# RIVAYA Setup Script
# This script sets up the complete RIVAYA development environment

set -e

echo "🚀 Setting up RIVAYA development environment..."

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

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js version 18+ is required. Current version: $(node --version)"
        exit 1
    fi
    
    print_success "Node.js $(node --version) is installed"
    
    # Check pnpm
    if ! command -v pnpm &> /dev/null; then
        print_warning "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm
    fi
    
    print_success "pnpm $(pnpm --version) is installed"
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    print_success "Git $(git --version) is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing dependencies..."
    pnpm install
    print_success "Dependencies installed successfully"
}

# Setup environment
setup_environment() {
    print_status "Setting up environment variables..."
    
    if [ ! -f .env.local ]; then
        if [ -f .env.example ]; then
            cp .env.example .env.local
            print_success "Created .env.local from .env.example"
            print_warning "Please edit .env.local with your configuration"
        else
            print_warning "No .env.example found. Please create .env.local manually"
        fi
    else
        print_success ".env.local already exists"
    fi
}

# Setup database
setup_database() {
    print_status "Setting up database..."
    
    # Check if DATABASE_URL is set
    if [ -f .env.local ]; then
        if grep -q "DATABASE_URL" .env.local; then
            print_status "Generating Prisma client..."
            pnpm db:generate
            
            print_status "Pushing database schema..."
            pnpm db:push
            
            print_status "Seeding database..."
            pnpm db:seed
            
            print_success "Database setup completed"
        else
            print_warning "DATABASE_URL not found in .env.local. Skipping database setup."
        fi
    else
        print_warning "No .env.local found. Skipping database setup."
    fi
}

# Setup Git hooks
setup_git_hooks() {
    print_status "Setting up Git hooks..."
    
    if [ -d .git ]; then
        pnpm husky install
        print_success "Git hooks installed"
    else
        print_warning "Not a Git repository. Skipping Git hooks setup."
    fi
}

# Build packages
build_packages() {
    print_status "Building packages..."
    pnpm build
    print_success "Packages built successfully"
}

# Run tests
run_tests() {
    print_status "Running tests..."
    pnpm test
    print_success "Tests passed"
}

# Main setup function
main() {
    echo "🎯 RIVAYA Setup Script"
    echo "======================"
    
    check_requirements
    install_dependencies
    setup_environment
    setup_database
    setup_git_hooks
    build_packages
    run_tests
    
    echo ""
    echo "🎉 RIVAYA setup completed successfully!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env.local with your configuration"
    echo "2. Run 'pnpm dev' to start development servers"
    echo "3. Visit http://localhost:3000 for the web app"
    echo "4. Visit http://localhost:3001/api/docs for API documentation"
    echo ""
    echo "Happy coding! 🚀"
}

# Run main function
main "$@"
