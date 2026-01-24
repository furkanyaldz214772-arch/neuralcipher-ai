# 🔐 NeuralCipher.ai - Login Credentials

## ⚠️ IMPORTANT NOTE

Currently, there are **NO pre-created test users** in the system.
You need to **create a new account** to login.

---

## 🌐 Access URLs

- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **API Redoc**: http://localhost:8000/redoc

---

## 📝 How to Create New Account

### Option 1: Via Web Interface (RECOMMENDED)

1. Open browser and go to: **http://localhost:3001**
2. Click **"Start Free Test"** or **"Sign Up"** button
3. Fill in registration form:
   - **Email**: your@email.com
   - **Password**: Must meet requirements (see below)
   - **Full Name**: Your Name
4. Click **"Register"**
5. You're automatically logged in!

### Password Requirements:
- ✅ Minimum 12 characters
- ✅ At least 1 uppercase letter (A-Z)
- ✅ At least 1 lowercase letter (a-z)
- ✅ At least 1 number (0-9)
- ✅ At least 1 special character (!@#$%^&*)

**Example Valid Passwords:**
- `MyPassword123!`
- `Hasta123!@#`
- `Doktor123!@#`
- `Admin123!@#`

---

## ✅ Suggested Test Accounts

Create these accounts for testing different roles:

### 👤 Patient Account
```
Email:    patient@test.com
Password: Patient123!@#
Role:     Patient (default)
```

### 👨‍⚕️ Doctor Account
```
Email:    doctor@test.com
Password: Doctor123!@#
Role:     Doctor (change after registration)
```

### 👑 Admin Account
```
Email:    admin@test.com
Password: Admin123!@#
Role:     Admin (change after registration)
```

---

## 🔑 Login Process

### Web Login
1. Go to http://localhost:3001/auth/login
2. Enter email and password
3. Click "Sign In"

### API Login
```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "Patient123!@#"
  }'
```

---

## 🚀 Quick Start Guide

1. **Start Backend** (if not running):
   ```bash
   cd backend
   python start_dev.py
   ```

2. **Start Frontend** (if not running):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Create Account**:
   - Go to http://localhost:3001
   - Click "Start Free Test"
   - Register with your email

4. **Take First Test**:
   - Click "New Test"
   - Allow microphone access
   - Record your voice for 30 seconds
   - Get instant results!

---

## 🔧 Troubleshooting

### Backend Not Running?
```bash
cd backend
python start_dev.py
```

### Frontend Not Running?
```bash
cd frontend
npm run dev
```

### Database Error?
```bash
cd backend
del neuralcipher_dev.db  # Windows
# or
rm neuralcipher_dev.db   # Linux/Mac
python start_dev.py
```

### Can't Register?
- Check password meets all requirements (12+ chars, uppercase, lowercase, number, special char)
- Check backend is running at http://localhost:8000
- Check browser console for errors (F12)

---

## 📊 Features After Login

### Patient Features:
- ✅ Take voice tests (30 seconds)
- ✅ View test history
- ✅ Track progress over time
- ✅ Access dashboard
- ✅ Manage profile
- ✅ Export results

### Doctor Features:
- ✅ View all patients
- ✅ Access patient records
- ✅ View analytics
- ✅ Generate reports
- ✅ Manage consultations

### Admin Features:
- ✅ Full system access
- ✅ User management
- ✅ System analytics
- ✅ Configuration
- ✅ Audit logs

---

## 🎯 First Test Guide

1. **Login** to your account
2. Click **"New Test"** button
3. **Allow microphone** access when prompted
4. **Record** your voice for 30 seconds
5. **Get instant results** with:
   - Risk score (0-100%)
   - 59 biomarker analysis
   - Detailed recommendations
   - Trend analysis

---

## 💡 Tips

1. **First Time Users**: Use the "Quick Test" (30 seconds)
2. **Best Results**: Test in a quiet environment
3. **Consistency**: Test at the same time of day
4. **Frequency**: Weekly tests recommended
5. **Microphone**: Use a good quality microphone

---

## 📱 Mobile App

The mobile app (iOS/Android) is also available!
- Same login credentials work on mobile
- Offline support with auto-sync
- Push notifications
- All features available

---

**Last Updated**: January 21, 2026
**Version**: 1.0.0
**Status**: Development Mode
