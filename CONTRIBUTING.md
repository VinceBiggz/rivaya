# Contributing to RIVAYA

Thank you for your interest in contributing to RIVAYA! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Contributing Guidelines](#contributing-guidelines)
- [Commit Convention](#commit-convention)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Testing](#testing)
- [Documentation](#documentation)
- [Reporting Issues](#reporting-issues)
- [Feature Requests](#feature-requests)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- Docker & Docker Compose
- Git
- Supabase CLI (optional)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rivaya.git
   cd rivaya
   ```
3. Add the upstream repository:
   ```bash
   git remote add upstream https://github.com/VinceBiggz/rivaya.git
   ```

## Development Setup

### 1. Install Dependencies

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration
```

### 2. Start Development Environment

```bash
# Start database services
docker-compose up -d postgres redis pgadmin

# Start all applications
pnpm dev

# Or start individually
pnpm dev:web    # Web app
pnpm dev:api    # API server
pnpm dev:mobile # Mobile app
```

### 3. Verify Setup

- Web app: http://localhost:3000
- API: http://localhost:3001
- pgAdmin: http://localhost:5050

## Contributing Guidelines

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Report bugs and issues
- **Feature Requests**: Suggest new features
- **Code Contributions**: Submit code changes
- **Documentation**: Improve documentation
- **Testing**: Add or improve tests
- **Design**: UI/UX improvements

### Before Contributing

1. **Check existing issues**: Search for existing issues or pull requests
2. **Discuss changes**: For major changes, open an issue first to discuss
3. **Follow the style guide**: Ensure your code follows our style guidelines
4. **Write tests**: Include tests for new functionality
5. **Update documentation**: Update relevant documentation

## Commit Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Commit Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Commit Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Examples

```bash
feat(auth): add OAuth2 authentication support

fix(api): resolve user profile update issue

docs(readme): update installation instructions

style(web): format code with prettier

refactor(database): optimize user queries

test(api): add unit tests for payment service

chore(deps): update dependencies
```

### Scope Examples

- `web`: Web application changes
- `api`: API server changes
- `mobile`: Mobile app changes
- `database`: Database schema changes
- `auth`: Authentication related changes
- `ui`: UI component changes
- `deps`: Dependency updates

## Pull Request Process

### 1. Create a Feature Branch

```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/your-bug-description
```

### 2. Make Your Changes

- Write your code following our style guidelines
- Add tests for new functionality
- Update documentation as needed
- Ensure all tests pass

### 3. Commit Your Changes

```bash
# Stage your changes
git add .

# Commit with conventional commit format
git commit -m "feat(web): add user dashboard component"

# Push to your fork
git push origin feature/your-feature-name
```

### 4. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the pull request template
5. Submit the pull request

### 5. Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Additional Notes
Any additional information or context.
```

## Code Style

### TypeScript

- Use TypeScript for all new code
- Follow strict TypeScript configuration
- Use proper type annotations
- Avoid `any` type when possible
- Use interfaces for object shapes

### React/Next.js

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement proper error boundaries
- Follow Next.js conventions

### NestJS

- Follow NestJS decorators and patterns
- Use proper dependency injection
- Implement proper error handling
- Follow REST API conventions
- Use DTOs for request/response validation

### General

- Use meaningful variable and function names
- Write self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Follow DRY (Don't Repeat Yourself) principle

## Testing

### Test Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data
```

### Running Tests

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# Run integration tests
pnpm test:integration

# Run E2E tests
pnpm test:e2e

# Run tests with coverage
pnpm test:coverage

# Run tests in watch mode
pnpm test:watch
```

### Writing Tests

- Write tests for all new functionality
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies
- Test both success and error cases

## Documentation

### Code Documentation

- Add JSDoc comments for functions and classes
- Document complex algorithms
- Include usage examples
- Keep documentation up to date

### API Documentation

- Document all API endpoints
- Include request/response examples
- Document error codes and messages
- Keep OpenAPI/Swagger docs updated

### User Documentation

- Update README for new features
- Add installation and setup instructions
- Include troubleshooting guides
- Provide usage examples

## Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** of the issue
2. **Steps to reproduce** the problem
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, browser, Node.js version)
5. **Screenshots or logs** if applicable
6. **Minimal reproduction** if possible

### Issue Template

```markdown
## Bug Description
Clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari, Firefox]
- Node.js Version: [e.g. 20.0.0]
- pnpm Version: [e.g. 8.0.0]

## Additional Context
Any other context about the problem.
```

## Feature Requests

### Feature Request Guidelines

1. **Check existing issues**: Search for similar feature requests
2. **Provide clear description**: Explain the feature and its benefits
3. **Include use cases**: Describe how the feature would be used
4. **Consider implementation**: Think about technical requirements
5. **Be patient**: Feature requests are evaluated based on priority

### Feature Request Template

```markdown
## Feature Description
Clear and concise description of the feature.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How would you like this feature to work?

## Use Cases
Describe specific scenarios where this feature would be useful.

## Alternative Solutions
Are there any alternative solutions you've considered?

## Additional Context
Any other context or screenshots about the feature request.
```

## Getting Help

### Resources

- [Documentation](https://docs.rivaya.com)
- [GitHub Issues](https://github.com/VinceBiggz/rivaya/issues)
- [GitHub Discussions](https://github.com/VinceBiggz/rivaya/discussions)
- [Discord Community](https://discord.gg/rivaya)

### Contact

- **Email**: contributors@rivaya.com
- **Discord**: Join our community server
- **GitHub**: Open an issue or discussion

## Recognition

Contributors will be recognized in:

- [Contributors page](https://github.com/VinceBiggz/rivaya/graphs/contributors)
- [Release notes](CHANGELOG.md)
- Project documentation

## License

By contributing to RIVAYA, you agree that your contributions will be licensed under the [MIT License](LICENSE).

---

Thank you for contributing to RIVAYA! Your contributions help make this project better for everyone. 🌟
