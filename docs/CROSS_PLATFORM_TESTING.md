# Cross-Platform Testing Guide

## 🚨 **RECURRING ISSUE: Invoke-WebRequest in PowerShell**

### **Problem**
The `curl` command in PowerShell is aliased to `Invoke-WebRequest`, which requires interactive parameter input and causes failures in automated scripts.

### **Root Cause Analysis**
1. **Why does curl fail?** PowerShell has built-in alias `curl` → `Invoke-WebRequest`
2. **Why do we keep using curl?** Unix/Linux habits without platform awareness
3. **Why no systematic solution?** Lack of cross-platform testing patterns
4. **Why recurring issue?** No standardized approach for HTTP testing
5. **Why not learned?** No documentation or reusable patterns

## ✅ **SOLUTION: Cross-Platform Testing Patterns**

### **PowerShell (Windows)**
```powershell
# ✅ CORRECT - Use Invoke-WebRequest with parameters
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing

# ✅ CORRECT - Use our testing script
.\scripts\test-endpoints.ps1

# ❌ WRONG - Don't use curl in PowerShell
curl http://localhost:3000
```

### **Bash (Linux/macOS)**
```bash
# ✅ CORRECT - Use curl with parameters
curl -s http://localhost:3000

# ✅ CORRECT - Use wget
wget -qO- http://localhost:3000
```

### **Cross-Platform Scripts**
```powershell
# Use our standardized testing script
.\scripts\test-endpoints.ps1 -Verbose
```

## 🔧 **Testing Scripts**

### **PowerShell Testing Script**
- **Location**: `scripts/test-endpoints.ps1`
- **Usage**: `.\scripts\test-endpoints.ps1 [-Verbose] [-BaseUrl "http://localhost"]`
- **Features**:
  - Tests all RIVAYA endpoints
  - Consistent output format
  - Database connectivity checks
  - Error handling
  - Verbose mode for debugging

### **Bash Testing Script (Future)**
```bash
# TODO: Create equivalent bash script
./scripts/test-endpoints.sh
```

## 📋 **Standard Testing Commands**

### **Health Checks**
```powershell
# Nginx Health
Invoke-WebRequest -Uri "http://localhost/health" -UseBasicParsing

# API Health
Invoke-WebRequest -Uri "http://localhost/api/v1/health" -UseBasicParsing

# Direct API Health
Invoke-WebRequest -Uri "http://localhost:3001/api/v1/health" -UseBasicParsing
```

### **Service Status**
```powershell
# Container Status
docker-compose ps

# Service Logs
docker-compose logs [service_name]

# Health Check
docker-compose ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
```

### **Database Connectivity**
```powershell
# Redis
docker exec rivaya_redis redis-cli ping

# PostgreSQL
docker exec rivaya_supabase pg_isready -U postgres -d postgres
```

## 🎯 **Best Practices**

### **1. Always Use Platform-Aware Commands**
- **Windows**: `Invoke-WebRequest` with `-UseBasicParsing`
- **Linux/macOS**: `curl` with `-s` flag
- **Cross-platform**: Use our testing scripts

### **2. Consistent Error Handling**
```powershell
try {
    $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 10
    Write-Host "[OK] $service" -ForegroundColor Green
} catch {
    Write-Host "[FAIL] $service" -ForegroundColor Red
}
```

### **3. Standardized Output Format**
- `[OK]` for success (Green)
- `[WARN]` for warnings (Yellow)
- `[FAIL]` for failures (Red)

### **4. Use Testing Scripts**
- **For development**: `.\scripts\test-endpoints.ps1`
- **For CI/CD**: `.\scripts\test-endpoints.ps1 -Verbose`
- **For debugging**: Check individual endpoints manually

## 🚀 **Quick Reference**

### **Common Testing Commands**
```powershell
# Test all endpoints
.\scripts\test-endpoints.ps1

# Test with verbose output
.\scripts\test-endpoints.ps1 -Verbose

# Test specific endpoint
Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing

# Check container status
docker-compose ps

# View logs
docker-compose logs [service]
```

### **Troubleshooting**
```powershell
# If Invoke-WebRequest fails
Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 30

# If container won't start
docker-compose logs [service] --tail 50

# If health check fails
docker-compose restart [service]
```

## 📚 **Related Documentation**
- [Architecture Documentation](./ARCHITECTURE.md)
- [Development Plan](./DEVELOPMENT_PLAN.md)
- [API Documentation](./API_DOCUMENTATION.md)

---

**Remember**: Always use platform-aware commands and our standardized testing scripts to avoid the Invoke-WebRequest issue!
