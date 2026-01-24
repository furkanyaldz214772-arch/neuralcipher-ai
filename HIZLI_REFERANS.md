# ⚡ HIZLI REFERANS KARTI

**NeuralCipher.ai - Sistem Durumu**

---

## 🚀 SİSTEM DURUMU

```
✅ Backend:  http://localhost:8000  (Process ID: 8)
✅ Frontend: http://localhost:3000  (Process ID: 6)
✅ Model:    v6.0 (11,070 örnek, 94.81% accuracy)
✅ Database: neuralcipher_dev.db
```

---

## 👤 GİRİŞ BİLGİLERİ

### Admin
```
Email: admin@test.com
Şifre: Admin123!@#
```

### Doktor
```
Email: doctor@test.com
Şifre: Doctor123!@#
```

### Hasta
```
Email: patient@test.com
Şifre: Patient123!@#
```

---

## 🔧 KOMUTLAR

### Backend Başlat
```bash
cd neuralcipher-ai/backend
python start_dev.py
```

### Frontend Başlat
```bash
cd neuralcipher-ai/frontend
npm run dev
```

### Model Eğit
```bash
cd neuralcipher-ai/ai-pipeline
python train_all_data_combined.py
```

### Test Yap
```bash
cd neuralcipher-ai/backend
python test_upload_endpoint.py
```

---

## 📊 MODEL BİLGİLERİ

```
Version:         v6.0
Veri:            11,070 örnek
Özellik:         9
Test Accuracy:   94.81%
ROC-AUC:         98.35%
Sensitivity:     98.24%
Specificity:     83.33%
```

**Datasets:**
- Oxford: 195 örnek
- Telemonitoring: 5,875 örnek
- Sentetik: 5,000 örnek

**Features:**
- DFA, HNR, Jitter:DDP
- MDVP:Fo(Hz), MDVP:Fhi(Hz), MDVP:Flo(Hz)
- NHR, PPE, RPDE

---

## 🌐 API ENDPOINTS

```
POST /api/v1/auth/login           - Giriş
POST /api/v1/auth/register        - Kayıt
POST /api/v1/tests/upload-new     - Ses yükle
GET  /api/v1/tests/{id}           - Test sonucu
GET  /api/v1/tests/               - Tüm testler
GET  /docs                        - API dokümantasyonu
```

---

## 📁 ÖNEMLİ DOSYALAR

### Backend
```
app/services/ml_service.py        - ML model
app/api/v1/tests/upload_new.py    - Upload endpoint
app/core/security/auth.py         - Authentication
```

### Frontend
```
src/app/test/recording/page.tsx   - Ses kayıt
src/app/dashboard/page.tsx        - Dashboard
src/lib/api.ts                    - API client
```

### AI Pipeline
```
train_all_data_combined.py        - Model eğitimi
models/neuralcipher_v6.0.pkl      - Trained model
models/neuralcipher_v6.0_scaler.pkl - Scaler
```

---

## 🔍 SORUN GİDERME

### Backend Çalışmıyor
```bash
# Port kontrol
netstat -ano | findstr :8000

# Process öldür
taskkill /PID <PID> /F

# Yeniden başlat
python start_dev.py
```

### Frontend Çalışmıyor
```bash
# Port kontrol
netstat -ano | findstr :3000

# Process öldür
taskkill /PID <PID> /F

# Dependencies
npm install

# Yeniden başlat
npm run dev
```

### Model Yüklenmiyor
```bash
# Model var mı?
dir ai-pipeline\models\neuralcipher_v6.0*

# Yeniden eğit
cd ai-pipeline
python train_all_data_combined.py
```

---

## 📚 DOKÜMANTASYON

```
SISTEM_DURUM_RAPORU_FINAL.md      - Tam sistem raporu
V6_MODEL_MAKSIMUM_VERI.md         - Model detayları
MODEL_GELISTIRME_YOL_HARITASI.md  - İyileştirme planı
API_SPECIFICATION.md              - API dokümantasyonu
README.md                         - Genel bakış
```

---

## ✅ SON TEST SONUCU

```json
{
  "test_id": 9,
  "status": "completed",
  "risk_score": 97.83,
  "risk_level": "high",
  "model_version": "v6.0",
  "biomarkers": {
    "jitter_ddp": 0.155,
    "hnr": 31.645,
    "f0_mean": 220.435,
    "dfa": 3.250
  }
}
```

**✅ Gerçek ML çalışıyor!**

---

## 🎯 SONRAKI ADIMLAR

1. **Daha Fazla Veri** → 20,000+ örnek hedef
2. **Daha Fazla Özellik** → 9 → 22 → 59
3. **Model Optimizasyonu** → Ensemble, Deep Learning
4. **Klinik Validasyon** → Gerçek hastalarla test
5. **Production Deployment** → AWS/Azure

---

**🚀 HER ŞEY HAZIR VE ÇALIŞIYOR!**

*Model: v6.0 | Accuracy: 94.81% | Status: ✅ ACTIVE*
