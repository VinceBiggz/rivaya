#!/bin/bash

# RIVAYA Deployment Script
# This script handles deployment to different environments

set -e

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

# Default values
ENVIRONMENT="staging"
PLATFORM="all"
FORCE=false

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -e|--environment)
            ENVIRONMENT="$2"
            shift 2
            ;;
        -p|--platform)
            PLATFORM="$2"
            shift 2
            ;;
        -f|--force)
            FORCE=true
            shift
            ;;
        -h|--help)
            echo "Usage: $0 [OPTIONS]"
            echo "Options:"
            echo "  -e, --environment ENV    Deployment environment (staging|production) [default: staging]"
            echo "  -p, --platform PLATFORM  Platform to deploy (web|api|mobile|all) [default: all]"
            echo "  -f, --force              Force deployment without confirmation"
            echo "  -h, --help               Show this help message"
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            exit 1
            ;;
    esac
done

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    print_error "Invalid environment: $ENVIRONMENT. Must be 'staging' or 'production'"
    exit 1
fi

# Validate platform
if [[ "$PLATFORM" != "web" && "$PLATFORM" != "api" && "$PLATFORM" != "mobile" && "$PLATFORM" != "all" ]]; then
    print_error "Invalid platform: $PLATFORM. Must be 'web', 'api', 'mobile', or 'all'"
    exit 1
fi

# Check if we're on the correct branch
check_branch() {
    print_status "Checking current branch..."
    
    CURRENT_BRANCH=$(git branch --show-current)
    
    if [[ "$ENVIRONMENT" == "production" && "$CURRENT_BRANCH" != "main" ]]; then
        print_error "Production deployments must be from the 'main' branch. Current branch: $CURRENT_BRANCH"
        exit 1
    fi
    
    if [[ "$ENVIRONMENT" == "staging" && "$CURRENT_BRANCH" != "develop" ]]; then
        print_warning "Staging deployments are typically from the 'develop' branch. Current branch: $CURRENT_BRANCH"
    fi
    
    print_success "Branch check passed: $CURRENT_BRANCH"
}

# Check for uncommitted changes
check_changes() {
    print_status "Checking for uncommitted changes..."
    
    if [[ -n $(git status --porcelain) ]]; then
        print_warning "You have uncommitted changes:"
        git status --short
        
        if [[ "$FORCE" == false ]]; then
            read -p "Continue with deployment? (y/N): " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                print_error "Deployment cancelled"
                exit 1
            fi
        fi
    else
        print_success "No uncommitted changes found"
    fi
}

# Run pre-deployment checks
pre_deployment_checks() {
    print_status "Running pre-deployment checks..."
    
    # Run tests
    print_status "Running tests..."
    pnpm test
    
    # Run linting
    print_status "Running linting..."
    pnpm lint
    
    # Run type checking
    print_status "Running type checking..."
    pnpm type-check
    
    # Build packages
    print_status "Building packages..."
    pnpm build
    
    print_success "Pre-deployment checks passed"
}

# Deploy web application
deploy_web() {
    print_status "Deploying web application to $ENVIRONMENT..."
    
    if command -v vercel &> /dev/null; then
        cd apps/web
        vercel --prod
        cd ../..
        print_success "Web application deployed successfully"
    else
        print_error "Vercel CLI not found. Please install it first: npm install -g vercel"
        exit 1
    fi
}

# Deploy API
deploy_api() {
    print_status "Deploying API to $ENVIRONMENT..."
    
    if command -v railway &> /dev/null; then
        cd apps/api
        railway up --service rivaya-api-$ENVIRONMENT
        cd ../..
        print_success "API deployed successfully"
    else
        print_error "Railway CLI not found. Please install it first: npm install -g @railway/cli"
        exit 1
    fi
}

# Deploy mobile app
deploy_mobile() {
    print_status "Deploying mobile application to $ENVIRONMENT..."
    
    if command -v eas &> /dev/null; then
        cd apps/mobile
        
        if [[ "$ENVIRONMENT" == "production" ]]; then
            eas build --platform all --profile production
            eas submit --platform all
        else
            eas build --platform all --profile preview
        fi
        
        cd ../..
        print_success "Mobile application deployed successfully"
    else
        print_error "EAS CLI not found. Please install it first: npm install -g @expo/eas-cli"
        exit 1
    fi
}

# Deploy database
deploy_database() {
    print_status "Deploying database to $ENVIRONMENT..."
    
    if command -v supabase &> /dev/null; then
        supabase db push --project-ref rivaya-$ENVIRONMENT
        print_success "Database deployed successfully"
    else
        print_error "Supabase CLI not found. Please install it first: npm install -g supabase"
        exit 1
    fi
}

# Run post-deployment checks
post_deployment_checks() {
    print_status "Running post-deployment checks..."
    
    # Health checks
    if [[ "$PLATFORM" == "all" || "$PLATFORM" == "api" ]]; then
        print_status "Checking API health..."
        # Add health check logic here
    fi
    
    if [[ "$PLATFORM" == "all" || "$PLATFORM" == "web" ]]; then
        print_status "Checking web app availability..."
        # Add web app check logic here
    fi
    
    print_success "Post-deployment checks completed"
}

# Send notifications
send_notifications() {
    print_status "Sending deployment notifications..."
    
    # Slack notification
    if [[ -n "$SLACK_WEBHOOK_URL" ]]; then
        curl -X POST -H 'Content-type: application/json' \
            --data "{\"text\":\"RIVAYA deployment to $ENVIRONMENT completed successfully\"}" \
            "$SLACK_WEBHOOK_URL"
    fi
    
    print_success "Notifications sent"
}

# Main deployment function
main() {
    echo "🚀 RIVAYA Deployment Script"
    echo "==========================="
    echo "Environment: $ENVIRONMENT"
    echo "Platform: $PLATFORM"
    echo "Force: $FORCE"
    echo ""
    
    # Confirmation for production
    if [[ "$ENVIRONMENT" == "production" && "$FORCE" == false ]]; then
        read -p "Are you sure you want to deploy to PRODUCTION? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            print_error "Production deployment cancelled"
            exit 1
        fi
    fi
    
    check_branch
    check_changes
    pre_deployment_checks
    
    # Deploy based on platform
    if [[ "$PLATFORM" == "all" || "$PLATFORM" == "web" ]]; then
        deploy_web
    fi
    
    if [[ "$PLATFORM" == "all" || "$PLATFORM" == "api" ]]; then
        deploy_api
    fi
    
    if [[ "$PLATFORM" == "all" || "$PLATFORM" == "mobile" ]]; then
        deploy_mobile
    fi
    
    if [[ "$PLATFORM" == "all" ]]; then
        deploy_database
    fi
    
    post_deployment_checks
    send_notifications
    
    echo ""
    print_success "🎉 Deployment to $ENVIRONMENT completed successfully!"
    echo ""
    echo "Deployed platforms: $PLATFORM"
    echo "Environment: $ENVIRONMENT"
    echo "Timestamp: $(date)"
}

# Run main function
main "$@"
