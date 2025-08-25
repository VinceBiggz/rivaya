-- =============================================================================
-- RIVAYA DATABASE INITIALIZATION SCRIPT
-- =============================================================================
-- This script runs when the PostgreSQL container starts for the first time
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create database user for application (if not exists)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'rivaya_app') THEN
        CREATE ROLE rivaya_app WITH LOGIN PASSWORD 'app_password';
    END IF;
END
$$;

-- Grant necessary permissions
GRANT CONNECT ON DATABASE rivaya TO rivaya_app;
GRANT USAGE ON SCHEMA public TO rivaya_app;
GRANT CREATE ON SCHEMA public TO rivaya_app;

-- Create indexes for better performance (will be created by Prisma migrations)
-- These are just examples of what Prisma will create

-- Log the initialization
DO $$
BEGIN
    RAISE NOTICE 'Rivaya database initialized successfully at %', NOW();
END
$$;

