# 🚨 Backend Kritik Hatalar - Çözüm (28 Ocak 2026)

## ❌ İKİ KRİTİK SORUN

### Sorun 1: CORS Hatası
```
Access to XMLHttpRequest blocked by CORS policy
Origin: 'https://www.neuralcipher.ai'
```

**Neden**: Backend CORS ayarlarında `www.neuralcipher.ai` yok!

**Mevcut CORS**:
```
https://neuralcipher.ai
https://frontend-gules-sigma-59.vercel.app
```

**Eksik**: `https://www.neuralcipher.ai` ❌

### Sorun 2: Database Connection Error
```
psycopg2.OperationalError: SSL SYSCALL error: EOF detected
```

**Neden**: PostgreSQL connection pool tükeniyor veya timeout oluyor.

## ✅ ÇÖZÜM 1: CORS Düzeltmesi (ACİL!)

### Railway Dashboard'da:

1. **Railway'e git**: https://railway.app
2. **neuralcipher-backend** projesini aç
3. **Variables** tab'ına tıkla
4. **CORS_ORIGINS** değişkenini bul
5. **Değeri güncelle**:

```
https://neuralcipher.ai,https://www.neuralcipher.ai,https://neuralcipher-ai.vercel.app
```

6. **Save** ve **Redeploy**

### Alternatif: Railway CLI

```bash
# Railway CLI kur (eğer yoksa)
npm install -g @railway/cli

# Login
railway login

# Project'i seç
railway link

# Environment variable ekle
railway variables set CORS_ORIGINS="https://neuralcipher.ai,https://www.neuralcipher.ai,https://neuralcipher-ai.vercel.app"

# Redeploy
railway up
```

## ✅ ÇÖZÜM 2: Database Connection Pool

### Backend kodunda düzeltme gerekli:

`backend/app/core/database.py` dosyasında:

```python
# Mevcut
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True
)

# Düzeltilmiş
engine = create_engine(
    DATABASE_URL,
    pool_pre_ping=True,
    pool_size=10,              # Connection pool boyutu
    max_overflow=20,           # Ekstra connection sayısı
    pool_recycle=3600,         # 1 saatte bir connection yenile
    pool_timeout=30,           # 30 saniye timeout
    connect_args={
        "connect_timeout": 10,  # 10 saniye connection timeout
        "keepalives": 1,
        "keepalives_idle": 30,
        "keepalives_interval": 10,
        "keepalives_count": 5
    }
)
```

## 🔍 Console'dan Gelen Bilgiler

### Auth Store Çalışıyor ✅
```javascript
AUTH_STORE - Raw API response: Object
AUTH_STORE - Role value: PATIENT
AUTH_STORE - Role type: string
AUTH_STORE - Role JSON: "PATIENT"
AUTH_STORE - User data stored: Object
AUTH_STORE - Login successful: Object
```

### Login Başarılı ✅
```javascript
LOGIN_PAGE - User logged in: Object
LOGIN_PAGE - Role comparison: Object
Redirecting to: /patient/dashboard
```

### Sidebar Debug ✅
```javascript
Sidebar Debug: Object
```

### CORS Hatası ❌
```
Failed to fetch access key
Failed to load resource: net::ERR_FAILED
Failed to load resource: the server responded with a status of 404
Failed to fetch doctors
```

## 🎯 Öncelik Sırası

### 1. CORS Düzeltmesi (5 dakika)
- Railway dashboard → Variables
- CORS_ORIGINS güncelle
- Redeploy

### 2. Test Et (2 dakika)
- Siteyi yenile
- F12 → Console
- CORS hatası gitmeli

### 3. Database Fix (Opsiyonel)
- Eğer hala connection error varsa
- Backend kodunu güncelle
- Git push → Railway auto-deploy

## 📋 CORS Domains Listesi

Railway'de olması gerekenler:

```
https://neuralcipher.ai
https://www.neuralcipher.ai
https://neuralcipher-ai.vercel.app
http://localhost:3000
http://localhost:5173
```

## 🔧 Railway Environment Variables

Kontrol edilmesi gerekenler:

| Variable | Değer | Durum |
|----------|-------|-------|
| CORS_ORIGINS | Yukarıdaki liste | ❌ Eksik |
| DATABASE_URL | postgres://... | ✅ Var |
| JWT_SECRET | ... | ✅ Var |
| ENVIRONMENT | production | ✅ Var |

## 📞 Hızlı Komutlar

### Railway Dashboard
```
https://railway.app/project/[PROJECT_ID]/service/[SERVICE_ID]/variables
```

### Test CORS
```bash
curl -H "Origin: https://www.neuralcipher.ai" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Authorization" \
     -X OPTIONS \
     https://web-production-c00b0.up.railway.app/api/v1/profile/access-key
```

## ✅ Başarı Kriterleri

- [ ] CORS hatası gitti
- [ ] Access key API çalışıyor
- [ ] Doctors API çalışıyor
- [ ] Database connection stable
- [ ] Sidebar menü görünüyor

## 🎯 Sonraki Adımlar

1. **HEMEN**: Railway'de CORS_ORIGINS güncelle
2. **Test**: Siteyi yenile ve console kontrol et
3. **Eğer çalışırsa**: Database fix'i sonraya bırak
4. **Eğer çalışmazsa**: Database connection pool ekle

---

**ŞİMDİ YAP**: Railway dashboard'a git ve CORS_ORIGINS'e `https://www.neuralcipher.ai` ekle!
