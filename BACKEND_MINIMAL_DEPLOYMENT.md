# 🚀 Backend Minimal Deployment Rehberi

## 📐 Mimari

```
Frontend (cPanel) → Backend API (Render) → AI Service (Hugging Face)
```

---

## ✅ YAPILACAKLAR

### 1. Requirements Değiştir

`requirements.txt` yerine `requirements-minimal.txt` kullan:

```bash
cd backend
cp requirements-minimal.txt requirements.txt
```

**Kaldırılan Ağır Paketler:**
- ❌ torch (2 GB)
- ❌ librosa (500 MB)
- ❌ scikit-learn (200 MB)
- ❌ numpy (100 MB)
- ❌ soundfile

**Kalan Hafif Paketler:**
- ✅ FastAPI (API)
- ✅ SQLAlchemy (Database)
- ✅ Pydantic (Validation)
- ✅ Python-Jose (JWT)

---

### 2. AI Service URL Ekle

`.env` dosyasına AI service URL'ini ekle:

```env
# AI Service (Hugging Face veya başka)
AI_SERVICE_URL=https://your-ai-service.hf.space/predict
AI_SERVICE_API_KEY=your-api-key-here
```

---

### 3. ML Service'i Güncelle

`app/services/ml_service.py` dosyasını güncelle - AI servisine HTTP request gönder:

```python
import requests
import os

AI_SERVICE_URL = os.getenv("AI_SERVICE_URL")
AI_SERVICE_API_KEY = os.getenv("AI_SERVICE_API_KEY")

async def analyze_audio(audio_file_path: str):
    """Send audio to external AI service"""
    
    with open(audio_file_path, 'rb') as f:
        files = {'audio': f}
        headers = {'Authorization': f'Bearer {AI_SERVICE_API_KEY}'}
        
        response = requests.post(
            f"{AI_SERVICE_URL}/analyze",
            files=files,
            headers=headers,
            timeout=30
        )
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"AI Service error: {response.text}")
```

---

### 4. Render.com'a Deploy Et

#### A) Render.com Hesabı Oluştur

1. https://render.com → Sign Up
2. GitHub ile giriş yap

#### B) Web Service Oluştur

1. Dashboard → "New" → "Web Service"
2. GitHub repo'sunu seç: `neuralcipher-backend`
3. Ayarlar:
   - **Name:** neuralcipher-backend
   - **Region:** Frankfurt (Europe)
   - **Branch:** main
   - **Root Directory:** (boş bırak)
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

#### C) Environment Variables Ekle

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key-min-32-chars
CSRF_SECRET=your-csrf-secret-key
SESSION_SECRET=your-session-secret-key
CORS_ORIGINS=https://neuralcipher.ai,https://www.neuralcipher.ai
ENVIRONMENT=production
DEBUG=false
AI_SERVICE_URL=https://your-ai-service.hf.space
AI_SERVICE_API_KEY=your-api-key
```

#### D) PostgreSQL Ekle

1. Dashboard → "New" → "PostgreSQL"
2. Name: neuralcipher-db
3. Database URL'i kopyala
4. Backend service'e `DATABASE_URL` olarak ekle

#### E) Deploy!

"Create Web Service" tıkla - 5-10 dakika sürer.

---

## 🧪 Test Et

### Backend Health Check

```bash
curl https://your-backend.onrender.com/health
```

Cevap:
```json
{
  "status": "healthy",
  "version": "1.0.0"
}
```

### API Docs

Tarayıcıda aç:
```
https://your-backend.onrender.com/docs
```

---

## 🔗 Frontend'i Güncelle

Backend URL'ini frontend'e ekle:

`frontend/src/lib/api.ts`:
```typescript
const API_URL = 'https://your-backend.onrender.com'
```

Frontend'i yeniden build et:
```bash
cd frontend
npm run build
```

`out` klasörünü cPanel'e yükle.

---

## 📊 Sonuç

```
✅ Frontend: cPanel (neuralcipher.ai)
✅ Backend: Render.com (hafif, hızlı)
✅ AI Service: Hugging Face (güçlü)
✅ Database: PostgreSQL (Render)
```

---

## 💰 Maliyet

**Render Free Tier:**
- ✅ 750 saat/ay
- ✅ PostgreSQL 256 MB
- ✅ Otomatik SSL
- ⚠️ Cold start (15 dk inaktivite)

**Upgrade ($7/ay):**
- ✅ Cold start yok
- ✅ Daha hızlı
- ✅ Production-ready

---

## 🆘 Sorun Giderme

### Build Failed

Logları kontrol et:
1. Render dashboard → Service → Logs
2. Hata mesajını oku
3. `requirements.txt` kontrol et

### Database Connection Error

`.env` dosyasında `DATABASE_URL` doğru mu?

### AI Service Timeout

`AI_SERVICE_URL` doğru mu? API key geçerli mi?

---

## 🎯 Sonraki Adımlar

1. ✅ Backend'i Render'da deploy et
2. ⏳ AI Service'i Hugging Face'de oluştur
3. ⏳ Frontend'i güncelle
4. ⏳ End-to-end test

---

**Başarılar!** 🚀
