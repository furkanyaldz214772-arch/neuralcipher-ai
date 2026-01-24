# 🚀 NeuralCipher.ai - Quick Start Guide

**Get the system running in 10 minutes!**

---

## ✅ Prerequisites

- Docker Desktop installed and running
- Node.js 18+ installed
- Python 3.11+ installed
- Git installed

---

## 📦 Step 1: Start Databases (2 minutes)

```bash
cd neuralcipher-ai
docker-compose up -d
```

This starts:
- PostgreSQL (port 5432)
- MongoDB (port 27017)
- Redis (port 6379)

**Verify**:
```bash
docker ps
# Should show 3 containers running
```

---

## 🔧 Step 2: Configure Backend (3 minutes)

### 2.1 Create Environment File

```bash
cd backend
cp .env.example .env
```

### 2.2 Edit .env File

**Minimum Configuration** (works without email):
```bash
# Database (already configured)
DATABASE_URL=postgresql://neuralcipher:password@localhost:5432/neuralcipher_db

# Security
SECRET_KEY=your-secret-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Frontend URL
FRONTEND_URL=http://localhost:3001

# Environment
ENVIRONMENT=development
DEBUG=True
```

**Full Configuration** (with email):
```bash
# Add these for email support
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-gmail-app-password
FROM_EMAIL=noreply@neuralcipher.ai
FROM_NAME=NeuralCipher.ai
```

### 2.3 Install Dependencies

```bash
pip install -r requirements.txt
```

### 2.4 Run Database Migrations

```bash
alembic upgrade head
```

---

## 🚀 Step 3: Start Backend (1 minute)

```bash
python -m uvicorn app.main:app --reload --port 8000
```

**Verify**: Open http://localhost:8000/docs
- You should see Swagger API documentation

---

## 🎨 Step 4: Start Frontend (2 minutes)

### 4.1 Install Dependencies

```bash
cd ../frontend
npm install
```

### 4.2 Start Development Server

```bash
npm run dev
```

**Verify**: Open http://localhost:3001
- You should see the landing page

---

## ✅ Step 5: Test the System (2 minutes)

### 5.1 Register Account

1. Go to http://localhost:3001
2. Click "Get Started"
3. Fill registration form
4. Submit

### 5.2 Login

1. Use your credentials
2. You should see the dashboard

### 5.3 Upload Voice Test

1. Click "New Test"
2. Record or upload audio (30 seconds)
3. Wait for AI analysis (~3 seconds)
4. View results!

---

## 📧 Optional: Configure Email

### For Gmail:

1. **Enable 2FA** on your Google Account
2. **Generate App Password**:
   - Go to Google Account → Security
   - 2-Step Verification → App passwords
   - Select "Mail" and "Other"
   - Copy the 16-character password

3. **Update .env**:
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx  # App password
FROM_EMAIL=noreply@neuralcipher.ai
```

4. **Test Email**:
```bash
cd backend
python test_email.py
```

---

## 🔍 Troubleshooting

### Backend Won't Start

**Error**: "Connection refused" or database errors

**Solution**:
```bash
# Check if databases are running
docker ps

# Restart databases
docker-compose restart

# Check logs
docker-compose logs
```

### Frontend Won't Start

**Error**: "Port 3000 already in use"

**Solution**:
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### AI Model Not Loading

**Error**: "Model file not found"

**Solution**:
```bash
# Train the model
cd ai-pipeline
python train_59_feature_model.py
```

### Email Not Sending

**Error**: "Email service disabled"

**Solution**:
1. Check SMTP credentials in `.env`
2. For Gmail, use App Password (not regular password)
3. Test with: `python test_email.py`

---

## 📊 System Status Check

### Check All Services:

```bash
# Databases
docker ps

# Backend
curl http://localhost:8000/health

# Frontend
curl http://localhost:3001

# AI Model
curl http://localhost:8000/api/v1/tests/model-status
```

### Expected Response:

```json
{
  "status": "healthy",
  "database": "connected",
  "redis": "connected",
  "mongodb": "connected",
  "ai_model": "loaded",
  "email": "enabled"  // or "disabled"
}
```

---

## 🎯 What's Next?

### Immediate:
1. ✅ System is running
2. ⚠️ Configure email (optional but recommended)
3. ⚠️ Test with real voice samples

### Short Term:
1. 📝 Collect real training data
2. 📝 Deploy to production
3. 📝 Publish mobile apps

### Long Term:
1. 📝 Scale infrastructure
2. 📝 Add more features
3. 📝 Expand to other diseases

---

## 📚 Documentation

- **API Docs**: http://localhost:8000/docs
- **Complete Analysis**: `COMPLETE_PROJECT_ANALYSIS.md`
- **Email Setup**: `EMAIL_SETUP_GUIDE.md`
- **AI Integration**: `AI_MODEL_INTEGRATION_COMPLETE.md`

---

## 🆘 Need Help?

### Common Commands:

```bash
# Restart everything
docker-compose restart
cd backend && python -m uvicorn app.main:app --reload &
cd frontend && npm run dev &

# Stop everything
docker-compose down
# Kill backend/frontend processes

# Check logs
docker-compose logs -f
tail -f backend/logs/app.log

# Reset database
docker-compose down -v
docker-compose up -d
cd backend && alembic upgrade head
```

---

## ✅ Success Checklist

- [ ] Docker containers running
- [ ] Backend API responding (http://localhost:8000/docs)
- [ ] Frontend loading (http://localhost:3001)
- [ ] Can register account
- [ ] Can login
- [ ] Can upload voice test
- [ ] AI analysis works
- [ ] Results display correctly
- [ ] Email configured (optional)
- [ ] Email notifications working (optional)

---

**Time to Complete**: ~10 minutes  
**Difficulty**: Easy  
**Status**: Production-Ready (with email config)

🎉 **Congratulations! NeuralCipher.ai is now running!**
