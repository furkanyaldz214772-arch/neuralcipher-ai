# Contributing to NeuralCipher.ai

Thank you for your interest in contributing to NeuralCipher.ai! This document provides guidelines and instructions for contributing.

---

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Respect differing viewpoints
- Show empathy towards others

---

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/neuralcipher/neuralcipher-ai/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots (if applicable)
   - Environment details (OS, browser, version)

### Suggesting Features

1. Check [Issues](https://github.com/neuralcipher/neuralcipher-ai/issues) for existing suggestions
2. Create a new issue with:
   - Clear feature description
   - Use case and benefits
   - Possible implementation approach
   - Mockups or examples (if applicable)

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/neuralcipher-ai.git
   cd neuralcipher-ai
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow code style guidelines
   - Add tests for new features
   - Update documentation

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open a Pull Request**
   - Provide clear description
   - Reference related issues
   - Include screenshots (if UI changes)

---

## Development Setup

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Python 3.11+
- Flutter 3.x (for mobile)

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
pip install -r requirements-dev.txt
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Mobile Setup
```bash
cd neuralcipher_mobile
flutter pub get
```

### Running Tests
```bash
# Backend
cd backend
pytest

# Frontend
cd frontend
npm test

# E2E
cd frontend
npx cypress run
```

---

## Code Style

### Python (Backend)
- Follow PEP 8
- Use type hints
- Maximum line length: 100 characters
- Use docstrings for functions and classes

```python
def calculate_risk_score(biomarkers: dict) -> float:
    """
    Calculate risk score from biomarkers.
    
    Args:
        biomarkers: Dictionary of biomarker values
        
    Returns:
        Risk score between 0 and 100
    """
    # Implementation
    pass
```

### TypeScript (Frontend)
- Use TypeScript strict mode
- Follow Airbnb style guide
- Use functional components
- Prefer const over let

```typescript
interface User {
  id: number;
  email: string;
  role: UserRole;
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  // Implementation
};
```

### Dart (Mobile)
- Follow Effective Dart guidelines
- Use const constructors where possible
- Prefer final over var

```dart
class TestResult {
  final int id;
  final double riskScore;
  
  const TestResult({
    required this.id,
    required this.riskScore,
  });
}
```

---

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples
```
feat(auth): add 2FA support

Implement TOTP-based two-factor authentication with QR code generation
and backup codes.

Closes #123
```

```
fix(api): resolve rate limiting issue

Fix Redis connection pool exhaustion causing rate limit failures.

Fixes #456
```

---

## Testing Guidelines

### Unit Tests
- Test all business logic
- Mock external dependencies
- Aim for 80%+ coverage

```python
def test_calculate_risk_score():
    biomarkers = {"f0_mean": 150.0, "jitter": 0.005}
    score = calculate_risk_score(biomarkers)
    assert 0 <= score <= 100
```

### Integration Tests
- Test API endpoints
- Test database operations
- Test third-party integrations

```python
def test_create_test_endpoint(client, auth_headers):
    response = client.post(
        "/api/v1/tests/",
        headers=auth_headers,
        json={"level": "quick"}
    )
    assert response.status_code == 200
```

### E2E Tests
- Test critical user flows
- Test across different browsers
- Test mobile responsiveness

```typescript
describe('Voice Test Flow', () => {
  it('should complete full test flow', () => {
    cy.visit('/test/new');
    cy.contains('Start Test').click();
    // ... test steps
  });
});
```

---

## Documentation

### Code Documentation
- Add docstrings to all public functions
- Include type hints
- Provide usage examples

### API Documentation
- Update OpenAPI schema
- Include request/response examples
- Document error codes

### User Documentation
- Update README for new features
- Add screenshots for UI changes
- Update getting started guide

---

## Review Process

### Pull Request Checklist
- [ ] Code follows style guidelines
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] All tests passing
- [ ] No merge conflicts
- [ ] Reviewed by at least one maintainer

### Review Timeline
- Initial review: Within 2 business days
- Follow-up reviews: Within 1 business day
- Merge: After approval from 2 maintainers

---

## Release Process

### Version Numbering
Follow [Semantic Versioning](https://semver.org/):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

### Release Steps
1. Update CHANGELOG.md
2. Update version numbers
3. Create release branch
4. Run full test suite
5. Create GitHub release
6. Deploy to production

---

## Community

### Communication Channels
- GitHub Issues: Bug reports and feature requests
- GitHub Discussions: General questions and ideas
- Slack: Real-time chat (invite only)
- Email: dev@neuralcipher.ai

### Getting Help
- Check documentation first
- Search existing issues
- Ask in GitHub Discussions
- Contact maintainers

---

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to contributor events
- Eligible for swag and rewards

---

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## Questions?

Contact us at dev@neuralcipher.ai or open a GitHub Discussion.

Thank you for contributing to NeuralCipher.ai! 🎉
