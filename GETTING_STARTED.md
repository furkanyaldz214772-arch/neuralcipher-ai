# 🚀 Başlangıç Kılavuzu

NeuralCipher.ai projesine hoş geldiniz! Bu kılavuz, projeyi çalıştırmak için gereken tüm adımları içerir.

---

## 📋 Gereksinimler

### Yazılım
- **Python 3.11+** (önerilen)
- **Docker & Docker Compose** (backend için)
- **Git**

### Donanım
- Minimum 4GB RAM
- 2GB boş disk alanı

---

## 🎯 Seçenek 1: Proof of Concept (5 Dakika)

En hızlı başlangıç yolu. Sadece ses analizi yapar.

```bash
# 1. Projeyi klonla
git clone <repo-url>
cd neuralcipher-ai/poc

# 2. Bağımlılıkları yükle
pip install -r requirements.txt

# 3. Test ses dosyası oluştur (veya kendi dosyanı kullan)
# Mikrofon ile 3-5 saniyelik "Aaaa" sesi kaydet ve sample.wav olarak kaydet

# 4. Analiz et
python audio_analyzer.py --audio sample.wav
```

**Beklenen Çıktı:**
```
🧬 NEURALCIPHER.AI - PROOF OF CONCEPT
============================================================
📂 Ses dosyası yükleniyor: sample.wav
✅ Yüklendi - Süre: 3.50 saniye

🔬 Özellik çıkarımı başlıyor...
  ✓ Jitter: 0.8542%
  ✓ Shimmer: 2.1234%
  ✓ HNR: 25.67 dB

🟢 Risk Seviyesi: DÜŞÜK
📈 Risk Skoru: 10.0/100
```

---

## 🎯 Seçenek 2: Backend API (10 Dakika)

Tam özellikli backend API.

### Adım 1: Docker ile Başlat

```bash
# Proje kök dizininde
cd neuralcipher-ai

# Container'ları başlat
docker-compose up -d

# Logları izle
docker-compose logs -f backend
```

### Adım 2: API'yi Test Et

**Tarayıcıda:**
- Ana sayfa: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

**Python ile:**
```bash
cd backend
python test_api.py
```

### Adım 3: Manuel API Testi

```bash
# 1. Ses dosyası yükle
curl -X POST "http://localhost:8000/api/v1/audio/upload" \
  -F "file=@sample.wav"

# Response: {"audio_id": "xxx-xxx-xxx"}

# 2. Analiz başlat
curl -X POST "http://localhost:8000/api/v1/audio/analyze/{audio_id}"

# Response: {"analysis_id": "yyy-yyy-yyy"}

# 3. Sonuçları al
curl "http://localhost:8000/api/v1/audio/results/{analysis_id}"
```

---

## 🎯 Seçenek 3: Manuel Backend Kurulumu

Docker kullanmadan geliştirme ortamı.

### Adım 1: PostgreSQL Başlat

```bash
docker run -d \
  --name neuralcipher-db \
  -e POSTGRES_USER=neuralcipher \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=neuralcipher_db \
  -p 5432:5432 \
  postgres:15-alpine
```

### Adım 2: Backend Kur

```bash
cd backend

# Virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Bağımlılıklar
pip install -r requirements.txt

# Environment
cp .env.example .env
# .env dosyasını düzenle (DATABASE_URL, SECRET_KEY)

# Başlat
python -m app.main
```

### Adım 3: Test Et

```bash
# Başka bir terminal'de
python test_api.py
```

---

## 🧪 Test Ses Dosyası Oluşturma

### Windows
```powershell
# PowerShell ile mikrofon kaydı (ffmpeg gerekli)
ffmpeg -f dshow -i audio="Microphone" -t 5 sample.wav
```

### macOS
```bash
# QuickTime Player kullan veya:
rec -r 22050 -c 1 sample.wav trim 0 5
```

### Linux
```bash
# arecord ile
arecord -d 5 -f cd sample.wav
```

### Online Alternatif
1. https://online-voice-recorder.com/ adresine git
2. 3-5 saniye "Aaaa" sesi kaydet
3. WAV formatında indir
4. `sample.wav` olarak kaydet

---

## 🐛 Sorun Giderme

### "ModuleNotFoundError: No module named 'librosa'"
```bash
pip install librosa soundfile
```

### "Connection refused" (Docker)
```bash
# Container'ları yeniden başlat
docker-compose down
docker-compose up -d

# Logları kontrol et
docker-compose logs backend
```

### "Database connection failed"
```bash
# PostgreSQL çalışıyor mu?
docker ps | grep postgres

# Yeniden başlat
docker restart neuralcipher-db
```

### "Port 8000 already in use"
```bash
# Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:8000 | xargs kill -9
```

---

## 📚 Sonraki Adımlar

1. **API Dokümantasyonunu İncele**: http://localhost:8000/docs
2. **Kod Yapısını Keşfet**: `backend/app/` klasörüne bak
3. **Kendi Modelini Eğit**: `ai-pipeline/` klasörüne geç (yakında)
4. **Mobil Uygulama**: `mobile/` klasörüne geç (yakında)

---

## 💡 İpuçları

- **Geliştirme Modu**: Backend otomatik reload ile çalışır (kod değişikliklerinde yeniden başlar)
- **Database GUI**: pgAdmin veya DBeaver ile PostgreSQL'e bağlan
- **API Test**: Postman veya Insomnia kullanabilirsin
- **Loglar**: `docker-compose logs -f` ile canlı logları izle

---

## 🆘 Yardım

Sorun mu yaşıyorsun?
1. `GETTING_STARTED.md` dosyasını tekrar oku
2. `backend/README.md` dosyasına bak
3. GitHub Issues'da ara
4. Yeni issue aç

**Başarılar! 🚀**


