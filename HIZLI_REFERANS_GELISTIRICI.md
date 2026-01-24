# 🛠️ HIZLI REFERANS - GELİŞTİRİCİ REHBERİ

## 🚀 HIZLI BAŞLANGIÇ

### Backend Başlat
```bash
cd neuralcipher-ai/backend
python -m uvicorn app.main:app --reload --port 8000
```

### Frontend Başlat
```bash
cd neuralcipher-ai/frontend
npm run dev
```

### Testleri Çalıştır
```bash
# Integration tests
cd neuralcipher-ai/backend
python test_ensemble_integration.py

# Unit tests
pytest tests/

# Frontend tests
cd neuralcipher-ai/frontend
npm test
```

---

## 📁 PROJE YAPISI

```
neuralcipher-ai/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/v1/            # API endpoints
│   │   ├── core/              # Core functionality
│   │   ├── models/            # Database models
│   │   ├── schemas/           # Pydantic schemas
│   │   └── services/          # Business logic
│   │       └── ml_service.py  # ⭐ ML model service
│   ├── tests/                 # Unit tests
│   └── test_ensemble_integration.py  # ⭐ Integration tests
│
├── frontend/                   # Next.js frontend
│   ├── src/
│   │   ├── app/               # Pages
│   │   ├── components/        # React components
│   │   └── lib/               # Utilities
│   └── public/                # Static files
│
├── ai-pipeline/               # ML training pipeline
│   ├── models/
│   │   └── cpu_ensemble/      # ⭐ Trained models
│   │       ├── xgboost_model.pkl
│   │       ├── lightgbm_model.pkl
│   │       ├── random_forest_model.pkl
│   │       └── training_report_cpu.json
│   ├── loaders/               # Data loaders
│   ├── scripts/               # Utility scripts
│   └── train_optimized_cpu.py # ⭐ Training script
│
└── Veriler/                   # Data directory (241K files)
```

---

## 🔑 ÖNEMLİ DOSYALAR

### Backend
```
app/services/ml_service.py     # ML model integration
app/api/v1/tests/routes.py     # Test upload endpoints
app/core/security/auth.py      # Authentication
app/models/test.py             # Test database model
```

### Frontend
```
src/app/test/new/page.tsx      # Test upload page
src/app/results/[id]/page.tsx  # Results page
src/components/AudioRecorder.tsx  # Audio recording
src/lib/api.ts                 # API client
```

### ML Pipeline
```
train_optimized_cpu.py         # Training script
models/cpu_ensemble/           # Trained models
loaders/                       # Data loaders
```

---

## 🎯 API ENDPOINTS

### Authentication
```
POST   /api/v1/auth/register   # Register new user
POST   /api/v1/auth/login      # Login
POST   /api/v1/auth/logout     # Logout
GET    /api/v1/auth/me         # Get current user
```

### Tests
```
POST   /api/v1/tests/upload-test        # Upload test
GET    /api/v1/tests/{id}               # Get test
GET    /api/v1/tests/{id}/results       # Get results
GET    /api/v1/tests/history            # Get history
DELETE /api/v1/tests/{id}               # Delete test
```

### Profile
```
GET    /api/v1/profile          # Get profile
PUT    /api/v1/profile          # Update profile
```

### Admin
```
GET    /api/v1/admin/users      # List users
GET    /api/v1/admin/stats      # Get statistics
```

---

## 🧪 TEST KOMUTLARI

### Backend Tests
```bash
# All integration tests
python test_ensemble_integration.py

# Specific test
python -m pytest tests/test_auth.py -v

# With coverage
python -m pytest --cov=app tests/

# Watch mode
python -m pytest-watch
```

### Frontend Tests
```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# Watch mode
npm run test:watch
```

### Load Testing
```bash
# Install locust
pip install locust

# Run load test
locust -f tests/load_test.py --host=http://localhost:8000
```

---

## 🔧 DEBUGGING

### Backend Debug
```python
# Add breakpoint
import pdb; pdb.set_trace()

# Or use debugpy
import debugpy
debugpy.listen(5678)
debugpy.wait_for_client()
```

### Frontend Debug
```javascript
// Console log
console.log('Debug:', data);

// Debugger
debugger;

// React DevTools
// Install browser extension
```

### ML Model Debug
```python
# Load model
from app.services.ml_service import ml_service

# Check if loaded
print(ml_service.loaded)

# Test prediction
result = ml_service.predict_ensemble(audio_path="test.wav")
print(result)
```

---

## 📊 MONITORING

### Health Check
```bash
curl http://localhost:8000/api/v1/health
```

### Logs
```bash
# Backend logs
tail -f backend/logs/app.log

# Frontend logs
npm run dev  # Console output

# Docker logs
docker-compose logs -f backend
```

### Metrics
```bash
# Prometheus metrics
curl http://localhost:8000/metrics

# Grafana dashboard
http://localhost:3001
```

---

## 🐛 COMMON ISSUES

### Issue 1: Models Not Loading
```bash
# Check if models exist
ls ai-pipeline/models/cpu_ensemble/

# If missing, train models
cd ai-pipeline
python train_optimized_cpu.py
```

### Issue 2: Database Connection Error
```bash
# Check database
docker-compose ps

# Restart database
docker-compose restart postgres

# Run migrations
alembic upgrade head
```

### Issue 3: Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :8000

# Kill process (Windows)
taskkill /PID <PID> /F

# Or use different port
uvicorn app.main:app --port 8001
```

### Issue 4: CORS Error
```python
# Check CORS settings in backend/app/main.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🔐 ENVIRONMENT VARIABLES

### Backend (.env)
```bash
# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/neuralcipher

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# ML Models
MODEL_PATH=../ai-pipeline/models/cpu_ensemble
```

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000
```

---

## 📦 DEPENDENCIES

### Backend
```bash
# Install
pip install -r requirements.txt

# Update
pip install --upgrade -r requirements.txt

# Add new package
pip install package-name
pip freeze > requirements.txt
```

### Frontend
```bash
# Install
npm install

# Update
npm update

# Add new package
npm install package-name
```

---

## 🚀 DEPLOYMENT

### Docker Build
```bash
# Build images
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Production Deploy
```bash
# Build for production
docker-compose -f docker-compose.production.yml build

# Deploy
docker-compose -f docker-compose.production.yml up -d

# Health check
curl https://api.neuralcipher.ai/health
```

---

## 📚 USEFUL COMMANDS

### Database
```bash
# Create migration
alembic revision --autogenerate -m "description"

# Apply migrations
alembic upgrade head

# Rollback
alembic downgrade -1

# Reset database
alembic downgrade base
alembic upgrade head
```

### Git
```bash
# Create feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create PR
gh pr create --title "Add new feature" --body "Description"
```

### Docker
```bash
# Remove all containers
docker-compose down

# Remove volumes
docker-compose down -v

# Rebuild
docker-compose up --build

# Shell into container
docker-compose exec backend bash
```

---

## 🎓 BEST PRACTICES

### Code Style
```python
# Python (PEP 8)
- Use 4 spaces for indentation
- Max line length: 88 characters
- Use type hints
- Write docstrings

# JavaScript (Prettier)
- Use 2 spaces for indentation
- Use semicolons
- Use single quotes
- Use arrow functions
```

### Git Commits
```bash
# Conventional commits
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
test: Add tests
chore: Update dependencies
```

### Testing
```python
# Write tests for:
- All API endpoints
- Business logic
- Edge cases
- Error handling

# Test coverage target: >80%
```

---

## 🔗 USEFUL LINKS

### Documentation
- API Docs: http://localhost:8000/docs
- Frontend: http://localhost:3000
- Grafana: http://localhost:3001

### Resources
- FastAPI: https://fastapi.tiangolo.com/
- Next.js: https://nextjs.org/docs
- Scikit-learn: https://scikit-learn.org/

### Internal Docs
- `API_ENTEGRASYON_TAMAMLANDI_22_OCAK.md`
- `SISTEM_HAZIR_PRODUCTION_22_OCAK.md`
- `HIZLI_BASLANGIC_API_22_OCAK.md`

---

## 🆘 HELP

### Get Help
```bash
# Backend help
python -m uvicorn --help

# Frontend help
npm run --help

# Docker help
docker-compose --help
```

### Contact
- Team Lead: team-lead@neuralcipher.ai
- DevOps: devops@neuralcipher.ai
- Support: support@neuralcipher.ai

---

**Tarih:** 22 Ocak 2026  
**Versiyon:** 1.0.0  
**Durum:** ✅ READY

🚀 **HAPPY CODING!** 🚀
