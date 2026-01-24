# 🚀 HIZLI BAŞLANGIÇ - API KULLANIMI

## 📋 ÖZET

**Durum:** ✅ Production Ready  
**Test Sonucu:** 6/6 Passed (100%)  
**Model Accuracy:** 90.05%  
**Inference Time:** 2-4 saniye

---

## ⚡ 5 DAKİKADA BAŞLA

### 1. Backend Başlat
```bash
cd neuralcipher-ai/backend
python -m uvicorn app.main:app --reload --port 8000
```

### 2. Test Kullanıcısı Oluştur
```bash
python create_test_users_simple.py
```

### 3. API Test Et
```bash
python test_ensemble_integration.py
```

**Sonuç:** Tüm testler geçmeli (6/6) ✅

---

## 🔑 API KULLANIMI

### 1. Login
```python
import requests

response = requests.post(
    "http://localhost:8000/api/v1/auth/login",
    json={
        "email": "test@example.com",
        "password": "test123"
    }
)

token = response.json()["access_token"]
print(f"Token: {token}")
```

### 2. Test Yükle
```python
with open("test_audio.wav", "rb") as f:
    response = requests.post(
        "http://localhost:8000/api/v1/tests/upload-test",
        headers={"Authorization": f"Bearer {token}"},
        files={"audio_file": f},
        data={"level": "quick"}
    )

test_id = response.json()["test_id"]
print(f"Test ID: {test_id}")
```

### 3. Sonuçları Al
```python
response = requests.get(
    f"http://localhost:8000/api/v1/tests/{test_id}/results",
    headers={"Authorization": f"Bearer {token}"}
)

results = response.json()
print(f"Risk Score: {results['risk_score']}%")
print(f"Risk Level: {results['risk_category']}")
print(f"Confidence: {results['confidence']:.0%}")
```

---

## 🎯 ÖRNEK ÇIKTI

### Başarılı Tahmin
```json
{
  "prediction": 0,
  "risk_score": 1.04,
  "risk_level": "low",
  "confidence": 0.9005,
  "biomarkers": {
    "jitter_ddp": 76.187,
    "hnr": -11.407,
    "f0_mean": 117.371,
    "f0_std": 74.017
  },
  "model_version": "cpu_ensemble",
  "individual_predictions": {
    "lightgbm": 0
  },
  "individual_probabilities": {
    "lightgbm": 0.010
  },
  "models_used": 1
}
```

### Risk Seviyeleri
```
low:      0-30%   (Düşük risk)
medium:   30-60%  (Orta risk)
high:     60-100% (Yüksek risk)
```

---

## 🔧 HATA GİDERME

### Model Yükleme Hatası
```bash
# Modelleri kontrol et
ls neuralcipher-ai/ai-pipeline/models/cpu_ensemble/

# Eksikse yeniden eğit
cd neuralcipher-ai/ai-pipeline
python train_optimized_cpu.py
```

### API Bağlantı Hatası
```bash
# Backend çalışıyor mu?
curl http://localhost:8000/api/v1/health

# Port kullanımda mı?
netstat -ano | findstr :8000
```

### Test Hatası
```bash
# Integration testleri çalıştır
cd neuralcipher-ai/backend
python test_ensemble_integration.py

# Beklenen: 6/6 tests passed
```

---

## 📊 PERFORMANS

### Beklenen Süreler
```
Login:           ~50 ms
Upload Test:     ~3-5 seconds
Get Results:     ~100 ms
Model Inference: ~2-4 seconds
```

### Resource Kullanımı
```
CPU:     20-40% (inference sırasında)
Memory:  ~500 MB
Disk:    ~10 GB
```

---

## 🎓 İLERİ KULLANIM

### Ensemble Prediction (Tüm Modeller)
```python
from app.services.ml_service import ml_service
import numpy as np

# CSV features (XGBoost için)
csv_features = np.random.randn(776)

# Audio path (LightGBM için)
audio_path = "test.wav"

# Gait data (Random Forest için)
gait_data = np.random.randn(100)

# Ensemble prediction
result = ml_service.predict_ensemble(
    audio_path=audio_path,
    csv_features=csv_features,
    gait_data=gait_data
)

print(f"Models Used: {result['models_used']}/3")
print(f"Ensemble Score: {result['risk_score']:.2f}%")
```

### Sadece Audio (Basit)
```python
from app.services.ml_service import analyze_voice

result = analyze_voice("test.wav")
print(f"Risk: {result['risk_level']}")
```

---

## 📚 DAHA FAZLA BİLGİ

### Dokümantasyon
- **API Entegrasyon:** `API_ENTEGRASYON_TAMAMLANDI_22_OCAK.md`
- **Production Hazırlık:** `SISTEM_HAZIR_PRODUCTION_22_OCAK.md`
- **Training Raporu:** `EGITIM_TAMAMLANDI_22_OCAK.md`
- **Final Rapor:** `FINAL_RAPOR_22_OCAK_2026.md`

### Test Scripts
- **Integration Test:** `backend/test_ensemble_integration.py`
- **API Test:** `backend/test_upload_endpoint.py`
- **Unit Tests:** `backend/tests/`

### Model Files
```
neuralcipher-ai/ai-pipeline/models/cpu_ensemble/
├── xgboost_model.pkl
├── lightgbm_model.pkl
├── random_forest_model.pkl
└── training_report_cpu.json
```

---

## ✅ KONTROL LİSTESİ

### Başlamadan Önce
- [ ] Python 3.11+ yüklü
- [ ] Dependencies yüklü (`pip install -r requirements.txt`)
- [ ] Models eğitilmiş (cpu_ensemble klasöründe)
- [ ] Database migration yapılmış
- [ ] Environment variables ayarlanmış

### İlk Test
- [ ] Backend başlatıldı
- [ ] Health check başarılı (`/api/v1/health`)
- [ ] Test kullanıcısı oluşturuldu
- [ ] Login başarılı
- [ ] Test upload başarılı
- [ ] Sonuçlar alındı

### Production Hazırlık
- [ ] Integration tests geçti (6/6)
- [ ] API endpoints test edildi
- [ ] Performance test edildi
- [ ] Security audit yapıldı
- [ ] Monitoring kuruldu
- [ ] Backup stratejisi hazır

---

## 🎉 BAŞARILI!

Eğer buraya kadar geldiyseniz, sisteminiz çalışıyor demektir! 🚀

**Sonraki Adımlar:**
1. Frontend entegrasyonu test et
2. Staging environment'a deploy et
3. User acceptance testing yap
4. Production'a deploy et

**Destek:**
- GitHub Issues: github.com/neuralcipher/issues
- Email: support@neuralcipher.ai
- Docs: docs.neuralcipher.ai

---

**Tarih:** 22 Ocak 2026  
**Versiyon:** 1.0.0  
**Durum:** ✅ READY
