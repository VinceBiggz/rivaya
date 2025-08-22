# Cross-platform endpoint testing script for RIVAYA
# This script tests all endpoints and provides consistent output across platforms

param(
    [string]$BaseUrl = "http://localhost",
    [switch]$Verbose
)

Write-Host "Testing RIVAYA endpoints..." -ForegroundColor Cyan
Write-Host "Base URL: $BaseUrl" -ForegroundColor Yellow
Write-Host ""

# Function to test endpoint with consistent output
function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$ExpectedStatus = "200"
    )
    
    try {
        $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec 10
        $status = $response.StatusCode
        
        if ($status -eq $ExpectedStatus) {
            Write-Host "[OK] $Name" -ForegroundColor Green
            if ($Verbose) {
                Write-Host "   URL: $Url" -ForegroundColor Gray
                Write-Host "   Status: $status" -ForegroundColor Gray
                Write-Host "   Content: $($response.Content)" -ForegroundColor Gray
            }
        } else {
            Write-Host "[WARN] $Name (Expected: $ExpectedStatus, Got: $status)" -ForegroundColor Yellow
        }
    }
    catch {
        Write-Host "[FAIL] $Name" -ForegroundColor Red
        if ($Verbose) {
            Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

# Test all endpoints
Write-Host "Testing Health Endpoints:" -ForegroundColor Magenta
Test-Endpoint "Nginx Health" "$BaseUrl/health"
Test-Endpoint "API Health" "$BaseUrl/api/v1/health"

Write-Host ""
Write-Host "Testing Direct Service Endpoints:" -ForegroundColor Magenta
Test-Endpoint "Web App (Direct)" "http://localhost:3000"
Test-Endpoint "API (Direct)" "http://localhost:3001/api/v1/health"
Test-Endpoint "Mobile (Web Preview)" "http://localhost:8081?platform=web"

Write-Host ""
Write-Host "Testing Database Connectivity:" -ForegroundColor Magenta
try {
    $redisTest = docker exec rivaya_redis redis-cli ping
    if ($redisTest -eq "PONG") {
        Write-Host "[OK] Redis Database" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Redis Database" -ForegroundColor Red
    }
    } catch {
        Write-Host "[FAIL] Redis Database" -ForegroundColor Red
}

try {
    $pgTest = docker exec rivaya_supabase pg_isready -U postgres -d postgres
    if ($pgTest -like "*accepting connections*") {
        Write-Host "[OK] PostgreSQL Database" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] PostgreSQL Database" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] PostgreSQL Database" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing Complete!" -ForegroundColor Cyan
