# 🔍 RAILWAY BACKEND SORUN TESPİTİ

## 1️⃣ RAILWAY LOGS KONTROL

### Adım 1: Railway Dashboard Aç
```
https://railway.app/
```

### Adım 2: Project'i Bul
- "neuralcipher-backend" veya benzeri isim

### Adım 3: Deployments Tab
- Son deployment'ı aç
- "View Logs" tıkla

### Adım 4: Hata Ara
Şu hataları ara:
```
❌ "ModuleNotFoundError"
❌ "ImportError"
❌ "DATABASE_URL not found"
❌ "Connection refused"
❌ "Port already in use"
❌ "CORS error"
```

## 2️⃣ ENVIRONMENT VARIABLES KONTROL

Railway dashboard'da Settings → Variables:

### Gerekli Variables
```bash
DATABASE_URL=postgresql://...
SECRET_KEY=your-secret-key-here
CORS_ORIGINS=https://neuralcipher.vercel.app,http://localhost:3000
ENVIRONMENT=production
PORT=8000
```

### Eksik mi?
- DATABASE_URL yoksa → PostgreSQL ekle
- SECRET_KEY yoksa → Oluştur
- CORS_ORIGINS yoksa → Ekle

## 3️⃣ RAILWAY POSTGRESQL KONTROL

### PostgreSQL Var mı?
Railway dashboard'da:
- "New" → "Database" → "Add PostgreSQL"
- Otomatik `DATABASE_URL` oluşturur

### Bağlantı Test
```bash
# Railway CLI ile
railway run python -c "from app.core.database import engine; print(engine)"
```

## 4️⃣ OLASI HATALAR VE ÇÖZÜMLER

### Hata 1: "ModuleNotFoundError: No module named 'app'"
**Neden:** Railway build sırasında dependencies yüklenmemiş
**Çözüm:**
```bash
# requirements.txt kontrol et
# Railway'de "Redeploy" yap
```

### Hata 2: "DATABASE_URL not found"
**Neden:** PostgreSQL eklenmemiş
**Çözüm:**
```bash
# Railway dashboard → Add PostgreSQL
# Otomatik DATABASE_URL oluşur
```

### Hata 3: "Port 8000 already in use"
**Neden:** Railway farklı port kullanıyor
**Çözüm:**
```python
# app/main.py
port = int(os.getenv("PORT", 8000))
uvicorn.run("app.main:app", host="0.0.0.0", port=port)
```

### Hata 4: "CORS error"
**Neden:** CORS_ORIGINS yanlış
**Çözüm:**
```bash
# Railway Variables ekle:
CORS_ORIGINS=https://neuralcipher.vercel.app,http://localhost:3000,http://localhost:8080
```

### Hata 5: Router'lar 404
**Neden:** Router include edilmemiş veya path yanlış
**Çözüm:**
```python
# app/main.py kontrol et
app.include_router(auth_routes.router, prefix="/api/v1/auth")
```

## 5️⃣ HIZLI TEST

### Test 1: Root Endpoint
```bash
curl https://neuralcipher-backend.railway.app/
# Beklenen: 200 OK
```

### Test 2: Health Endpoint
```bash
curl https://neuralcipher-backend.railway.app/health
# Beklenen: {"status":"healthy"}
```

### Test 3: API Endpoint
```bash
curl https://neuralcipher-backend.railway.app/api/v1/auth/login
# Beklenen: 405 Method Not Allowed (GET yerine POST gerekli)
# Gerçek: 404 Not Found ❌
```

## 6️⃣ ÇÖZÜM ADIMLARI

### Adım 1: Logs Oku
```
Railway Dashboard → Deployments → View Logs
Hata mesajını kopyala
```

### Adım 2: Environment Variables Ekle
```
Railway Dashboard → Settings → Variables
DATABASE_URL, SECRET_KEY, CORS_ORIGINS ekle
```

### Adım 3: PostgreSQL Ekle
```
Railway Dashboard → New → Database → PostgreSQL
```

### Adım 4: Redeploy
```
Railway Dashboard → Deployments → Redeploy
```

### Adım 5: Test Et
```bash
curl https://neuralcipher-backend.railway.app/health
```

---

**Sonraki Adım:** Railway logs'unu kontrol et ve hata mesajını bana gönder
