# Testing Guide

## Overview

Comprehensive testing strategy for NeuralCipher.ai covering unit, integration, E2E, and performance tests.

---

## Backend Tests (Python/pytest)

### Setup

```bash
cd backend
pip install -r requirements-test.txt
```

### Run Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html

# Run specific test file
pytest tests/test_auth.py

# Run specific test
pytest tests/test_auth.py::TestLogin::test_login_success

# Run with markers
pytest -m unit
pytest -m integration
```

### Test Structure

```
backend/tests/
├── conftest.py          # Fixtures and configuration
├── test_auth.py         # Authentication tests
├── test_tests.py        # Voice test API tests
├── test_profile.py      # Profile API tests
├── test_doctor.py       # Doctor API tests
├── test_messages.py     # Messaging API tests
└── performance/
    ├── load_test.js     # k6 load tests
    └── stress_test.js   # k6 stress tests
```

### Coverage Requirements

- Minimum: 80%
- Target: 90%+

---

## Frontend Tests (Jest + React Testing Library)

### Setup

```bash
cd frontend
npm install
```

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific test
npm test -- api.test.ts
```

### Test Structure

```
frontend/src/
└── lib/
    └── __tests__/
        └── api.test.ts
```

---

## E2E Tests (Cypress)

### Setup

```bash
cd frontend
npm install cypress --save-dev
```

### Run Tests

```bash
# Open Cypress UI
npx cypress open

# Run headless
npx cypress run

# Run specific spec
npx cypress run --spec "cypress/e2e/auth.cy.ts"
```

### Test Structure

```
frontend/cypress/
├── e2e/
│   ├── auth.cy.ts       # Authentication flows
│   └── test-flow.cy.ts  # Voice test flows
└── support/
    └── commands.ts      # Custom commands
```

### Critical Flows

1. ✅ User Registration & Login
2. ✅ Email Verification
3. ✅ 2FA Setup & Verification
4. ✅ Voice Test (All levels)
5. ✅ Result Display
6. ✅ Doctor Assignment
7. ✅ Messaging
8. ✅ Subscription Purchase
9. ✅ Payment Processing
10. ✅ Report Generation

---

## Performance Tests (k6)

### Setup

```bash
# Install k6
brew install k6  # macOS
# or
choco install k6  # Windows
# or
sudo apt-get install k6  # Linux
```

### Run Tests

```bash
cd backend/tests/performance

# Load test
k6 run load_test.js

# Stress test
k6 run stress_test.js

# With custom VUs
k6 run --vus 100 --duration 30s load_test.js
```

### Performance Targets

- API response time (p95): < 500ms
- API response time (p99): < 1000ms
- Error rate: < 0.1%
- Throughput: 1000+ req/s

---

## Mobile Tests (Flutter)

### Setup

```bash
cd neuralcipher_mobile
flutter pub get
```

### Run Tests

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Run specific test
flutter test test/auth_test.dart
```

---

## CI/CD Integration

### GitHub Actions

Tests run automatically on:
- Push to main/develop
- Pull requests
- Manual trigger

### Workflow

```yaml
1. Backend tests (pytest)
2. Frontend tests (Jest)
3. E2E tests (Cypress)
4. Coverage upload (Codecov)
```

---

## Test Data

### Test Users

```
Patient:
- Email: test@example.com
- Password: testpassword123

Doctor:
- Email: doctor@example.com
- Password: doctorpassword123

Admin:
- Email: admin@example.com
- Password: adminpassword123
```

### Test API Endpoints

```
Health: http://localhost:8000/health
Docs: http://localhost:8000/docs
Metrics: http://localhost:8000/metrics
```

---

## Debugging

### Backend

```bash
# Run with verbose output
pytest -v

# Run with print statements
pytest -s

# Run with debugger
pytest --pdb
```

### Frontend

```bash
# Debug in browser
npm test -- --no-coverage

# Debug specific test
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Cypress

```bash
# Open Cypress UI for debugging
npx cypress open

# Run with video
npx cypress run --video
```

---

## Best Practices

1. **Write tests first** (TDD)
2. **Keep tests isolated** (no dependencies)
3. **Use fixtures** for test data
4. **Mock external services** (API, database)
5. **Test edge cases** (errors, empty states)
6. **Maintain high coverage** (80%+)
7. **Run tests before commit**
8. **Review test failures** in CI

---

## Troubleshooting

### Common Issues

**Database connection error**:
```bash
# Check PostgreSQL is running
docker ps

# Restart database
docker-compose restart postgres
```

**Port already in use**:
```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9
```

**Test timeout**:
```bash
# Increase timeout in pytest.ini
timeout = 300
```

---

## Resources

- [pytest documentation](https://docs.pytest.org/)
- [Jest documentation](https://jestjs.io/)
- [Cypress documentation](https://docs.cypress.io/)
- [k6 documentation](https://k6.io/docs/)
- [Flutter testing](https://flutter.dev/docs/testing)

---

**Last Updated**: 20 Ocak 2026
