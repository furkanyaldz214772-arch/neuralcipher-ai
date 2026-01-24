# 🔍 Deployment Kontrol Rehberi

## Railway Deployment Durumunu Kontrol Et

### 1. Railway Dashboard'a Git
```
https://railway.app/dashboard
```

### 2. Projeyi Aç
- "neuralcipher-backend" projesini bul
- Tıkla

### 3. Deploy Logs'u İzle
- "Deployments" sekmesine git
- En son deployment'a tıkla
- "Deploy Logs" sekmesini aç

### 4. Başarılı Deployment Göstergeleri

#### ✅ Build Başarılı
```
Building...
Installing dependencies...
✓ Dependencies installed
✓ Build completed
```

#### ✅ Deploy Başarılı
```
Deploying...
✓ Application started
✓ Health check passed
```

#### ✅ Uygulama Çalışıyor
```
🚀 NeuralCipher.ai API starting...
📊 Environment: production
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:XXXX
```

### 5. Hata Varsa

#### ❌ Import Error
```
ImportError: cannot import name 'xxx' from 'app.core.xxx'
```
**Çözüm**: Import'u düzelt, commit, push

#### ❌ Module Not Found
```
ModuleNotFoundError: No module named 'xxx'
```
**Çözüm**: `requirements.txt`'e ekle, commit, push

#### ❌ Port Error
```
Error: PORT environment variable not set
```
**Çözüm**: Railway otomatik PORT set eder, `start.py` doğru

## Backend URL'i Al

### Railway'den URL Kopyala

1. Railway Dashboard'da projeyi aç
2. "Settings" sekmesine git
3. "Domains" bölümünü bul
4. URL'i kopyala (örnek: `https://neuralcipher-backend-production.up.railway.app`)

### URL'i Test Et

```bash
# PowerShell'de
Invoke-WebRequest -Uri "https://RAILWAY_URL/health" -Method GET

# Veya tarayıcıda
https://RAILWAY_URL/health
https://RAILWAY_URL/docs
```

## Frontend'i Güncelle

### 1. `frontend/src/lib/api.ts` Dosyasını Aç

### 2. API_URL'i Güncelle
```typescript
// ÖNCE
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// SONRA
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://RAILWAY_URL'
```

### 3. Frontend'i Yeniden Build Et
```bash
cd neuralcipher-ai/frontend
npm run build
```

### 4. cPanel'e Yükle
- `out` klasörünün içeriğini kopyala
- cPanel File Manager'da `public_html` klasörüne yapıştır
- Eski dosyaların üzerine yaz

## Sistem Testi

### 1. Frontend'i Aç
```
https://neuralcipher.ai
```

### 2. Register Sayfasına Git
```
https://neuralcipher.ai/auth/register
```

### 3. Test Kullanıcısı Oluştur
- Email: test@example.com
- Password: Test123!
- Role: Patient

### 4. Login Ol
```
https://neuralcipher.ai/auth/login
```

### 5. Dashboard'u Kontrol Et
```
https://neuralcipher.ai/dashboard
```

### 6. Test Yap (Opsiyonel)
```
https://neuralcipher.ai/test/new
```

## Sorun Giderme

### Frontend Backend'e Bağlanamıyor

#### CORS Hatası
```
Access to XMLHttpRequest blocked by CORS policy
```

**Çözüm**: Railway'de CORS_ORIGINS environment variable'ı kontrol et
```
CORS_ORIGINS=https://neuralcipher.ai,http://localhost:3000
```

#### Network Error
```
Network Error / Failed to fetch
```

**Çözüm**: 
1. Railway backend'in çalıştığını kontrol et
2. URL'in doğru olduğunu kontrol et
3. HTTPS kullandığından emin ol

### Backend Hataları

#### 500 Internal Server Error
**Çözüm**: Railway logs'u kontrol et, hata mesajını oku

#### 404 Not Found
**Çözüm**: Endpoint URL'ini kontrol et

#### 401 Unauthorized
**Çözüm**: Token'ın doğru gönderildiğini kontrol et

## Başarı Kriterleri

✅ Railway deployment başarılı
✅ Backend health check geçiyor
✅ Frontend backend'e bağlanıyor
✅ Register çalışıyor
✅ Login çalışıyor
✅ Dashboard açılıyor

## Tamamlandı! 🎉

Sistem tamamen çalışır durumda:
- ✅ Frontend: https://neuralcipher.ai (cPanel)
- ✅ Backend: https://RAILWAY_URL (Railway)
- ✅ Database: SQLite (dev mode) veya PostgreSQL (production)
- ✅ CORS: Configured
- ✅ Security: JWT, CSRF, Rate Limiting
- ✅ Monitoring: Health check, Metrics

**Production'a hazır!** 🚀
