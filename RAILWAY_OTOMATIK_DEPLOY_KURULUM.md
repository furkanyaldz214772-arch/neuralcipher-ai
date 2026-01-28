# 🚂 Railway Otomatik Deploy Kurulumu

## Durum: Railway GitHub'dan Otomatik Çekmiyor ❌

### Neden Manuel Deploy Gerekiyor?

Railway otomatik deploy için 3 yöntem var:

#### 1️⃣ GitHub Entegrasyonu (Önerilen)
Railway'in GitHub repo'nuza bağlanması gerekiyor.

**Kontrol Et:**
```
1. Railway Dashboard'a git: https://railway.app
2. Projenize tıklayın
3. Settings → GitHub Repo
4. Bağlı mı kontrol et
```

**Eğer Bağlı Değilse:**
- Railway GitHub entegrasyonunu aktifleştir
- Repo'yu seç: `furkanyaldz214772-arch/neuralcipher-ai`
- Branch'i seç: `master`
- Root Directory: `backend` (ÖNEMLİ!)

#### 2️⃣ Railway CLI (Hızlı Çözüm)
```bash
# Railway CLI kur
npm i -g @railway/cli

# Login ol
railway login

# Backend klasöründe
cd neuralcipher-ai/backend

# Railway'e bağlan
railway link

# Deploy et
railway up
```

#### 3️⃣ Git Remote (Manuel)
```bash
# Railway remote ekle
git remote add railway https://railway.app/your-project-url

# Backend'i push et
git subtree push --prefix=neuralcipher-ai/backend railway master
```

---

## ✅ Otomatik Deploy Kurulumu (Adım Adım)

### Adım 1: Railway Dashboard'da GitHub Bağlantısı

1. **Railway'e git**: https://railway.app/dashboard
2. **Projenizi seçin** (NeuralCipher Backend)
3. **Settings** → **Service Settings**
4. **Source** bölümünde:
   - ✅ GitHub repo bağlı mı?
   - ✅ Branch: `master` seçili mi?
   - ✅ Root Directory: `backend` yazılı mı?

### Adım 2: Webhook Kontrolü

GitHub'da webhook aktif mi kontrol et:

1. **GitHub'a git**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai
2. **Settings** → **Webhooks**
3. Railway webhook var mı?
   - URL: `https://backboard.railway.app/...`
   - Events: `push`, `pull_request`
   - Active: ✅

**Eğer Webhook Yoksa:**
- Railway Dashboard → Settings → Reconnect GitHub

### Adım 3: Auto Deploy Ayarı

Railway Dashboard'da:

1. **Settings** → **Deploys**
2. **Auto Deploy**: ✅ Enabled
3. **Deploy Triggers**:
   - ✅ Push to `master` branch
   - ✅ Pull request merged

---

## 🔧 Hızlı Çözüm: Railway CLI ile Deploy

En hızlı yöntem Railway CLI kullanmak:

```bash
# 1. CLI kur (sadece bir kez)
npm install -g @railway/cli

# 2. Login ol
railway login

# 3. Backend klasörüne git
cd neuralcipher-ai/backend

# 4. Railway projesine bağlan
railway link
# Listeden projenizi seçin

# 5. Deploy et
railway up

# 6. Logs kontrol et
railway logs
```

---

## 🎯 Önerilen Çözüm: GitHub Entegrasyonu

### Neden GitHub Entegrasyonu?
- ✅ Otomatik deploy (push yapınca)
- ✅ Preview deployments (PR'larda)
- ✅ Rollback kolaylığı
- ✅ Deployment history

### Kurulum:

**1. Railway Dashboard'da:**
```
Settings → GitHub Repo → Connect Repository
```

**2. Repo Seçimi:**
```
Repository: furkanyaldz214772-arch/neuralcipher-ai
Branch: master
Root Directory: backend  ← ÖNEMLİ!
```

**3. Build Settings:**
```
Build Command: (boş bırak, Railway otomatik algılar)
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**4. Environment Variables:**
```
DATABASE_URL=postgresql://...
SECRET_KEY=...
CORS_ORIGINS=https://neuralcipher-ai.vercel.app
```

---

## 🚀 Test: Otomatik Deploy Çalışıyor mu?

### Test 1: Küçük Değişiklik Yap

```bash
# Backend'de küçük bir değişiklik
echo "# Test" >> neuralcipher-ai/backend/README.md

# Commit ve push
git add .
git commit -m "test: Railway auto deploy"
git push origin master
```

**Beklenen Sonuç:**
- Railway Dashboard'da yeni deployment başlamalı
- 2-3 dakika içinde deploy tamamlanmalı

### Test 2: Railway Logs

```bash
# Railway CLI ile
railway logs --tail

# Veya Dashboard'da
# Deployments → Latest → View Logs
```

---

## 🐛 Sorun Giderme

### Problem 1: Railway GitHub'ı Görmüyor

**Çözüm:**
```
1. Railway Dashboard → Settings
2. Disconnect GitHub
3. Reconnect GitHub
4. Repo'yu yeniden seç
```

### Problem 2: Root Directory Yanlış

**Çözüm:**
```
Settings → Service Settings → Root Directory
Değiştir: backend
```

### Problem 3: Build Hatası

**Çözüm:**
```bash
# Lokal test et
cd neuralcipher-ai/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Çalışıyorsa Railway'e push et
```

### Problem 4: Environment Variables Eksik

**Çözüm:**
```
Railway Dashboard → Variables
Tüm gerekli değişkenleri ekle:
- DATABASE_URL
- SECRET_KEY
- CORS_ORIGINS
```

---

## 📊 Deployment Durumu Kontrolü

### Railway Dashboard'da:

```
✅ GitHub Connected: Yes/No
✅ Auto Deploy: Enabled/Disabled
✅ Last Deploy: Success/Failed
✅ Branch: master
✅ Root Directory: backend
```

### GitHub'da:

```
✅ Webhook Active: Yes/No
✅ Recent Deliveries: Success/Failed
```

---

## 🎉 Başarı Kriterleri

Otomatik deploy çalışıyorsa:

1. ✅ GitHub'a push yapınca Railway otomatik deploy başlar
2. ✅ Railway Dashboard'da yeni deployment görünür
3. ✅ 2-3 dakika içinde deploy tamamlanır
4. ✅ Backend API çalışır durumda olur

---

## 💡 Alternatif: Monorepo Yapısı

Eğer Railway backend klasörünü algılamıyorsa:

### Seçenek A: Backend'i Ayrı Repo'ya Taşı

```bash
# Yeni repo oluştur
gh repo create neuralcipher-backend --private

# Backend'i kopyala
cp -r neuralcipher-ai/backend/* neuralcipher-backend/

# Push et
cd neuralcipher-backend
git init
git add .
git commit -m "Initial commit"
git push origin master

# Railway'de bu repo'yu bağla
```

### Seçenek B: Railway.json Kullan

`neuralcipher-ai/backend/railway.json`:
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔗 Yararlı Linkler

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app
- **GitHub Webhooks**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai/settings/hooks
- **Railway CLI Docs**: https://docs.railway.app/develop/cli

---

## 📝 Özet

**Şu Anda:**
- ❌ Railway otomatik deploy çalışmıyor
- ⚠️ Manuel deploy gerekiyor

**Çözüm:**
1. Railway Dashboard → Settings → GitHub Repo bağla
2. Root Directory: `backend` ayarla
3. Auto Deploy: Enable
4. Test et: Küçük değişiklik push et

**Hızlı Alternatif:**
```bash
npm i -g @railway/cli
railway login
cd neuralcipher-ai/backend
railway link
railway up
```

---

**Hazırlayan**: Kiro AI Assistant  
**Tarih**: 28 Ocak 2026  
**Durum**: Kurulum Rehberi Hazır
