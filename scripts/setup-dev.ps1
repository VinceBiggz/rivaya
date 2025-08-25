# =============================================================================
# RIVAYA DEVELOPMENT SETUP SCRIPT (PowerShell)
# =============================================================================
# This script sets up the complete development environment on Windows
# =============================================================================

param(
    [switch]$SkipDocker,
    [switch]$SkipMigrations,
    [switch]$SkipBuild
)

# Set error action preference
$ErrorActionPreference = "Stop"

# Colors for output
$Red = "Red"
$Green = "Green"
$Yellow = "Yellow"
$Blue = "Blue"

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor $Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor $Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor $Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor $Red
}

# Function to check if command exists
function Test-Command {
    param([string]$Command)
    try {
        Get-Command $Command -ErrorAction Stop | Out-Null
        return $true
    }
    catch {
        return $false
    }
}

# Function to check Docker status
function Test-Docker {
    if (-not (Test-Command "docker")) {
        Write-Error "Docker is not installed. Please install Docker Desktop first."
        exit 1
    }
    
    try {
        docker info | Out-Null
        Write-Success "Docker is running"
    }
    catch {
        Write-Error "Docker is not running. Please start Docker Desktop."
        exit 1
    }
}

# Function to check Node.js and pnpm
function Test-Node {
    if (-not (Test-Command "node")) {
        Write-Error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    }
    
    if (-not (Test-Command "pnpm")) {
        Write-Warning "pnpm is not installed. Installing pnpm..."
        npm install -g pnpm
    }
    
    Write-Success "Node.js and pnpm are ready"
}

function Copy-EnvFile {
    param(
        [string]$AppPath,
        [string]$ExampleFile,
        [string]$TargetFile
    )
    
    $examplePath = Join-Path $AppPath $ExampleFile
    $targetPath = Join-Path $AppPath $TargetFile

    if ((Test-Path $examplePath) -and (-not (Test-Path $targetPath))) {
        Copy-Item -Path $examplePath -Destination $targetPath
        Write-Success "Created $targetPath from $ExampleFile"
    }
    elseif (Test-Path $targetPath) {
        Write-Warning "$targetPath already exists. Skipping."
    }
}

# Function to setup environment files
function Set-EnvironmentFiles {
    Write-Status "Setting up environment files..."
    
    Copy-EnvFile "apps/api" ".env.example" ".env"
    Copy-EnvFile "apps/web" ".env.example" ".env.local"
    Copy-EnvFile "apps/mobile" ".env.example" ".env"
}

# Function to install dependencies
function Install-Dependencies {
    Write-Status "Installing dependencies..."
    
    # Install root dependencies
    pnpm install
    
    # Install workspace dependencies
    pnpm install --recursive
    
    Write-Success "Dependencies installed"
}

# Function to start database
function Start-Database {
    if ($SkipDocker) {
        Write-Warning "Skipping Docker setup as requested"
        return
    }
    
    Write-Status "Starting database services..."
    
    # Stop any existing containers
    docker-compose down postgres redis 2>$null
    
    # Start database services
    docker-compose up -d postgres redis
    
    # Wait for database to be ready
    Write-Status "Waiting for database to be ready..."
    $timeout = 60
    $counter = 0
    
    do {
        Start-Sleep -Seconds 1
        $counter++
        
        if ($counter -ge $timeout) {
            Write-Error "Database failed to start within $timeout seconds"
            exit 1
        }
    } while (-not (docker-compose exec -T postgres pg_isready -U postgres -d rivaya 2>$null))
    
    Write-Success "Database is ready"
}

# Function to run database migrations
function Invoke-Migrations {
    if ($SkipMigrations) {
        Write-Warning "Skipping migrations as requested"
        return
    }
    
    Write-Status "Running database migrations..."
    
    Push-Location "apps/api"
    
    # Generate Prisma client
    pnpm prisma generate
    
    # Run migrations
    pnpm prisma migrate dev --name init
    
    Pop-Location
    
    Write-Success "Database migrations completed"
}

# Function to seed database
function Invoke-SeedDatabase {
    Write-Status "Seeding database..."
    
    Push-Location "apps/api"
    
    # Run seed script if it exists
    if (Test-Path "prisma/seed.ts") {
        pnpm prisma db seed
    }
    else {
        Write-Warning "No seed script found. Skipping database seeding."
    }
    
    Pop-Location
    
    Write-Success "Database seeding completed"
}

# Function to build applications
function Build-Applications {
    if ($SkipBuild) {
        Write-Warning "Skipping build as requested"
        return
    }
    
    Write-Status "Building applications..."
    
    # Build API
    Write-Status "Building API..."
    Push-Location "apps/api"
    pnpm build
    Pop-Location
    
    # Build Web
    Write-Status "Building Web application..."
    Push-Location "apps/web"
    pnpm build
    Pop-Location
    
    Write-Success "Applications built successfully"
}

# Main execution
function Main {
    Write-Host "=============================================================================="
    Write-Host "RIVAYA DEVELOPMENT SETUP"
    Write-Host "=============================================================================="
    
    # Check prerequisites
    Write-Status "Checking prerequisites..."
    Test-Docker
    Test-Node
    
    # Setup environment
    Set-EnvironmentFiles
    
    # Install dependencies
    Install-Dependencies
    
    # Start database
    Start-Database
    
    # Run migrations
    Invoke-Migrations
    
    # Seed database
    Invoke-SeedDatabase
    
    # Build applications
    Build-Applications
    
    Write-Host ""
    Write-Host "=============================================================================="
    Write-Success "Development environment setup completed!"
    Write-Host "=============================================================================="
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "1. Start the development servers:"
    Write-Host "   docker-compose up"
    Write-Host ""
    Write-Host "2. Or start individual services:"
    Write-Host "   pnpm dev:api    # Start API server"
    Write-Host "   pnpm dev:web    # Start Web server"
    Write-Host "   pnpm dev:mobile # Start Mobile server"
    Write-Host ""
    Write-Host "3. Access your applications:"
    Write-Host "   Web: http://localhost:3000"
    Write-Host "   API: http://localhost:3001"
    Write-Host "   Mobile: http://localhost:8081"
    Write-Host ""
}

# Run main function
Main
