# Quick Start Guide

Get up and running with RIVAYA in minutes.

## Prerequisites

- Node.js 18+ 
- pnpm 8+
- Git
- PostgreSQL (for local development)
- Supabase account (for production)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rivaya/rivaya.git
   cd rivaya
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Set up the database**
   ```bash
   pnpm db:generate
   pnpm db:push
   pnpm db:seed
   ```

5. **Start the development servers**
   ```bash
   pnpm dev
   ```

## What's Running

After running `pnpm dev`, you'll have:

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs**: http://localhost:3001/api/docs
- **Database Studio**: http://localhost:5555

## Next Steps

1. **Explore the Web App**: Visit http://localhost:3000 to see the RIVAYA interface
2. **Check API Docs**: Visit http://localhost:3001/api/docs for API documentation
3. **Run Tests**: Execute `pnpm test` to run the test suite
4. **Build for Production**: Run `pnpm build` to create production builds

## Troubleshooting

### Common Issues

**Port already in use**
```bash
# Kill processes using ports 3000, 3001, or 5555
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
lsof -ti:5555 | xargs kill -9
```

**Database connection issues**
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql
# Start PostgreSQL if needed
brew services start postgresql
```

**pnpm not found**
```bash
# Install pnpm globally
npm install -g pnpm
```

### Getting Help

- Check the [Troubleshooting Guide](./troubleshooting.md)
- Review [Common Issues](./common-issues.md)
- Join our [Discord Community](https://discord.gg/rivaya)
- Open an [Issue on GitHub](https://github.com/rivaya/rivaya/issues)

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the [Code Standards](../development/standards.md)
   - Write tests for new functionality
   - Update documentation as needed

3. **Run quality checks**
   ```bash
   pnpm lint
   pnpm type-check
   pnpm test
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and create a PR**
   ```bash
   git push origin feature/your-feature-name
   # Create PR on GitHub
   ```

## Production Deployment

See the [Deployment Guide](../development/deployment.md) for detailed instructions on deploying to production environments.
