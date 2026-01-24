# 🚂 Railway.app Backend Deployment Rehberi

## ✅ Hazırlık Tamamlandı!

Backend dosyaları Railway deployment için hazır!

---

## 📋 ADIM ADIM DEPLOYMENT

### 🔹 ADIM 1: Railway.app Hesabı Oluştur

1. **Tarayıcıda aç:**
   ```
   https://railway.app
   ```

2. **"Login" tıkla**

3. **"Login with GitHub" seç**
   - GitHub hesabınla giriş yap
   - Railway'e izin ver

4. **Hesap oluşturuldu!** ✅

---

### 🔹 ADIM 2: GitHub Repository Oluştur

Backend'i Railway'e yüklemek için önce GitHub'a push etmen gerekiyor.

#### A) GitHub'da Yeni Repo Oluştur

1. **GitHub'a git:**
   ```
   https://github.com/new
   ```

2. **Repository bilgileri:**
   - Repository name: `neuralcipher-backend`
   - Description: `NeuralCipher.ai Backend API`
   - Visibility: **Private** (önerilen)
   - ✅ **"Create repository"** tıkla

#### B) Backend'i GitHub'a Push Et

Windows CMD'de şu komutları çalıştır:

```cmd
cd C:\Users\Mr.Yaldiz\Desktop\NeuralCipher.ai\neuralcipher-ai\backend

git init
git add .
git commit -m "Initial backend commit for Railway deployment"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/neuralcipher-backend.git
git push -u origin main
```

**NOT:** `KULLANICI_ADIN` yerine kendi GitHub kullanıcı adını yaz!

---

### 🔹 ADIM 3: Railway'de Proje Oluştur

1. **Railway Dashboard'a git:**
   ```
   https://railway.app/dashboard
   ```

2. **"New Project" tıkla**

3. **"Deploy from GitHub repo" seç**

4. **Repository seç:**
   - `neuralcipher-backend` repo'sunu bul
   - Tıkla ve seç

5. **Railway otomatik deploy başlatacak!** 🚀

---

### 🔹 ADIM 4: PostgreSQL Database Ekle

1. **Proje sayfasında "New" tıkla**

2. **"Database" seç**

3. **"Add PostgreSQL" tıkla**

4. **Database otomatik oluşturulacak!** ✅

5. **Database URL'i kopyala:**
   - PostgreSQL servisine tıkla
   - "Connect" tab'ına git
   - `DATABASE_URL` değerini kopyala

---

### 🔹 ADIM 5: Environment Variables Ayarla

1. **Backend servisine tıkla**

2. **"Variables" tab'ına git**

3. **Şu değişkenleri ekle:**

```env
# Database (Railway otomatik verecek)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Security Keys (ÖNEMLİ: Güçlü şifreler kullan!)
JWT_SECRET=super-secret-jwt-key-min-32-characters-change-this-now
CSRF_SECRET=super-secret-csrf-key-min-32-characters-change-this-now
SESSION_SECRET=super-secret-session-key-min-32-characters-change-this

# CORS (Frontend domain'ini ekle)
CORS_ORIGINS=https://neuralcipher.ai,https://www.neuralcipher.ai

# Environment
ENVIRONMENT=production
DEBUG=false

# Rate Limiting
RATE_LIMIT_ENABLED=true

# File Upload
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=.wav,.mp3,.m4a,.flac
```

4. **"Add" tıkla her değişken için**

---

### 🔹 ADIM 6: Domain Ayarla

1. **Backend servisinde "Settings" tab'ına git**

2. **"Networking" bölümünü bul**

3. **"Generate Domain" tıkla**

4. **Domain oluşturuldu!** 
   - Örnek: `neuralcipher-backend-production.up.railway.app`
   - **Bu URL'i kopyala!** (Frontend'de kullanacağız)

---

### 🔹 ADIM 7: Deploy Durumunu Kontrol Et

1. **"Deployments" tab'ına git**

2. **Son deployment'ı kontrol et:**
   - ✅ **Success** - Mükemmel!
   - ⏳ **Building** - Bekle
   - ❌ **Failed** - Logları kontrol et

3. **Logları kontrol et:**
   - Deployment'a tıkla
   - "View Logs" tıkla
   - Hata varsa göreceksin

---

## 🧪 Test Et

### Backend API Test

Tarayıcıda aç:
```
https://your-backend-url.railway.app/docs
```

Swagger UI açılmalı! ✅

### Health Check

```
https://your-backend-url.railway.app/health
```

Cevap:
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

---

## 🔗 Frontend'i Güncelle

Backend çalıştıktan sonra frontend'i güncelle:

### 1. API URL'ini Değiştir

`neuralcipher-ai/frontend/src/lib/api.ts` dosyasını aç:

```typescript
// Eski
const API_URL = 'http://localhost:8000'

// Yeni (Railway URL'ini kullan)
const API_URL = 'https://your-backend-url.railway.app'
```

### 2. Frontend'i Yeniden Build Et

```cmd
cd C:\Users\Mr.Yaldiz\Desktop\NeuralCipher.ai\neuralcipher-ai\frontend
npm run build
```

### 3. cPanel'e Yeniden Yükle

`out` klasöründeki dosyaları tekrar `public_html`'e yükle.

---

## 📊 Sonuç

```
✅ Backend: Railway'de çalışıyor
✅ Database: PostgreSQL aktif
✅ Frontend: cPanel'de çalışıyor
✅ API Bağlantısı: Kuruldu
```

---

## 🆘 Sorun Giderme

### Deploy Failed

**Logları kontrol et:**
1. Railway'de deployment'a tıkla
2. "View Logs" tıkla
3. Hata mesajını oku

**Yaygın hatalar:**
- `requirements.txt` eksik paket
- Environment variable eksik
- Port hatası (Railway otomatik `$PORT` kullanır)

### Database Bağlantı Hatası

**Kontrol et:**
1. `DATABASE_URL` doğru mu?
2. PostgreSQL servisi çalışıyor mu?
3. Alembic migration çalıştı mı?

### CORS Hatası

**Frontend'den API çağrısı çalışmıyorsa:**
1. `CORS_ORIGINS` değişkenini kontrol et
2. `https://neuralcipher.ai` eklenmiş mi?
3. Backend'i yeniden deploy et

---

## 💰 Maliyet

**Railway Free Tier:**
- ✅ $5 ücretsiz kredi/ay
- ✅ 500 saat çalışma
- ✅ PostgreSQL dahil
- ✅ Küçük projeler için yeterli

**Upgrade gerekirse:**
- Hobby Plan: $5/ay
- Pro Plan: $20/ay

---

## 🎯 Sonraki Adımlar

1. ✅ Backend deploy et (Railway)
2. ⏳ Frontend'i güncelle (API URL)
3. ⏳ End-to-end test
4. ⏳ Production monitoring

---

## 📞 Yardım

Sorun yaşarsan:
1. Railway logs kontrol et
2. GitHub repo kontrol et
3. Environment variables kontrol et

---

**Başarılar! Backend deployment'a başla!** 🚀
