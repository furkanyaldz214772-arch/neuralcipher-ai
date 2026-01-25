# 🚀 Git & Railway Setup

## Adım 1: GitHub Repository Oluştur

1. https://github.com adresine git
2. "New repository" butonuna tıkla
3. Repository adı: `neuralcipher-ai`
4. Private seç
5. "Create repository" tıkla

## Adım 2: Git Remote Ekle

```bash
cd neuralcipher-ai

# GitHub repository URL'ini ekle (kendi URL'inizi kullanın)
git remote add origin https://github.com/KULLANICI_ADINIZ/neuralcipher-ai.git

# Push
git push -u origin master
```

## Adım 3: Railway'e Bağla

1. https://railway.app adresine git
2. "New Project" → "Deploy from GitHub repo"
3. `neuralcipher-ai` repository'sini seç
4. Backend için:
   - Root Directory: `backend`
   - Start Command: `python start_dev.py`
5. Frontend için:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Start Command: `npm start`

## Adım 4: Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
CORS_ORIGINS=https://neuralcipher.ai
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
```

## Adım 5: Deploy!

Railway otomatik olarak:
- ✅ Code'u çeker
- ✅ Build eder
- ✅ Migration çalıştırır
- ✅ Deploy eder

---

## 🔧 Alternatif: Railway CLI

```bash
# Railway CLI kur
npm install -g @railway/cli

# Login
railway login

# Project oluştur
railway init

# Deploy
railway up
```

---

## ✅ Deployment Kontrolü

1. Railway Dashboard → Deployments
2. Logs'u kontrol et
3. Domain'i aç
4. Test et!

**Deployment süresi:** ~5-10 dakika
