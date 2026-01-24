# 🧬 NeuralCipher.ai - AI Model Dokümantasyonu

## 📊 Model Özeti

**Model Tipi:** Random Forest Classifier  
**Versiyon:** v1.0  
**Eğitim Tarihi:** 2026-01-19  
**Veri Seti:** UCI Parkinson Dataset (195 örneklem)

### Performans Metrikleri

| Metrik | Değer | Açıklama |
|--------|-------|----------|
| **Accuracy** | 92.31% | Genel doğruluk oranı |
| **AUC-ROC** | 0.9621 | Model ayırt etme gücü (mükemmel) |
| **Sensitivity** | 96.55% | Hasta tespiti başarısı |
| **Specificity** | 80.00% | Sağlıklı tespiti başarısı |
| **Precision** | 93.33% | Pozitif tahmin doğruluğu |
| **F1-Score** | 0.9492 | Dengeli performans skoru |

### Confusion Matrix

```
                 Gerçek Durum
                 Sağlıklı  Hasta
Tahmin Sağlıklı     8        1
       Hasta        2       28
```

- **True Negatives (TN):** 8 - Doğru sağlıklı tespiti
- **False Positives (FP):** 2 - Yanlış hasta uyarısı
- **False Negatives (FN):** 1 - Kaçan hasta (en kritik)
- **True Positives (TP):** 28 - Doğru hasta tespiti

---

## 🔬 Nörolojik Biyobelirteçler

Model, ses dosyalarından şu özellikleri çıkarır:

### 1. Vokal Özellikler

#### Jitter (Frekans Değişkenliği)
- **Tanım:** Ses tellerindeki frekans dalgalanması
- **Normal Aralık:** 0.0 - 1.0%
- **Parkinson'da:** Yüksek (>1.0%)
- **Neden Önemli:** Ses tellerindeki motor kontrol kaybını gösterir

#### Shimmer (Genlik Değişkenliği)
- **Tanım:** Ses tellerindeki genlik dalgalanması
- **Normal Aralık:** 0.0 - 3.5%
- **Parkinson'da:** Yüksek (>3.5%)
- **Neden Önemli:** Ses üretimindeki istikrarsızlığı gösterir

#### HNR (Harmonics-to-Noise Ratio)
- **Tanım:** Harmonik/gürültü oranı
- **Normal Aralık:** 20-40 dB
- **Parkinson'da:** Düşük (<20 dB)
- **Neden Önemli:** Ses kalitesini ve netliğini ölçer

### 2. MFCC (Mel-Frequency Cepstral Coefficients)

- **13 katsayı** çıkarılır
- Her katsayı için: mean, std, min, max
- **Toplam:** 52 MFCC özelliği
- **Kullanım:** Ses spektrumunun kompakt temsili

### 3. Spektral Özellikler

- **Spectral Centroid:** Frekans spektrumunun merkezi
- **Spectral Rolloff:** Spektral enerjinin %85'inin altındaki frekans
- **Spectral Bandwidth:** Frekans spektrumunun genişliği
- **Zero Crossing Rate:** Sinyal işaret değişim oranı

### 4. Feature Engineering

Model, orijinal özelliklere ek olarak türetilmiş özellikler kullanır:

- `jitter_ratio`: Jitter oranları
- `shimmer_combined`: Birleşik shimmer skoru
- `freq_range`: Frekans aralığı
- `voice_quality_score`: Bileşik ses kalitesi skoru
- `rpde_dfa_ratio`: Nonlinear dynamics oranı

**Toplam Özellik Sayısı:** 31

---

## 🎯 En Önemli 10 Özellik

Model, şu özelliklere en çok önem veriyor:

1. **PPE** (0.1066) - Pitch Period Entropy
2. **spread1** (0.0822) - Nonlinear measure
3. **NHR** (0.0527) - Noise-to-Harmonics Ratio
4. **MDVP:Fo(Hz)** (0.0509) - Temel frekans
5. **spread_ratio** (0.0418) - Türetilmiş özellik
6. **MDVP:Flo(Hz)** (0.0383) - Minimum frekans
7. **Jitter:DDP** (0.0369) - Jitter türevi
8. **MDVP:APQ** (0.0364) - Amplitude perturbation
9. **MDVP:Fhi(Hz)** (0.0342) - Maksimum frekans
10. **Shimmer:APQ5** (0.0328) - Shimmer türevi

---

## 🔌 API Kullanımı

### Endpoint: `/api/v1/voice/process`

**Method:** POST  
**Content-Type:** multipart/form-data

#### Request

```bash
curl -X POST "http://localhost:8000/api/v1/voice/process" \
  -F "file=@audio.wav"
```

#### Response

```json
{
  "success": true,
  "file_id": "uuid-here",
  "filename": "audio.wav",
  "analysis": {
    "risk_score": 0.7234,
    "risk_level": "HIGH",
    "risk_message": "Yüksek risk. Acil nöroloji konsültasyonu önerilir.",
    "prediction": 1,
    "confidence": {
      "healthy": 0.2766,
      "parkinsons": 0.7234
    },
    "model_version": "v1.0"
  },
  "message": "Ses dosyası başarıyla analiz edildi"
}
```

### Risk Seviyeleri

| Risk Skoru | Seviye | Açıklama |
|------------|--------|----------|
| 0.0 - 0.3 | **LOW** | Düşük risk. Ses parametreleri normal aralıkta. |
| 0.3 - 0.7 | **MEDIUM** | Orta risk. Nöroloji uzmanına danışmanız önerilir. |
| 0.7 - 1.0 | **HIGH** | Yüksek risk. Acil nöroloji konsültasyonu önerilir. |

---

## 📚 Veri Seti Detayları

### UCI Parkinson Dataset

- **Kaynak:** UCI Machine Learning Repository
- **Yayın:** 2008
- **Örneklem:** 195 ses kaydı
  - Parkinson hastaları: 147 (75.4%)
  - Sağlıklı bireyler: 48 (24.6%)
- **Özellikler:** 22 orijinal + 9 türetilmiş = 31 toplam
- **Ses Testi:** Sürekli "Aaaa" sesi (3-5 saniye)

### Veri Ön İşleme

1. **Normalizasyon:** StandardScaler ile z-score normalizasyonu
2. **Train-Test Split:** 80% train, 20% test (stratified)
3. **Feature Engineering:** 9 yeni özellik türetildi
4. **Cross-Validation:** 5-fold CV ile doğrulama

---

## 🧠 Model Mimarisi

### Random Forest Classifier

**Hiperparametreler:**
```python
{
    'n_estimators': 200,      # Ağaç sayısı
    'max_depth': 10,          # Maksimum derinlik
    'min_samples_split': 2,   # Bölünme için min örnek
    'min_samples_leaf': 1,    # Yaprakta min örnek
    'max_features': 'log2',   # Özellik seçimi
    'random_state': 42        # Tekrarlanabilirlik
}
```

**Neden Random Forest?**
- ✅ Yüksek doğruluk
- ✅ Overfitting'e dirençli
- ✅ Özellik önem sıralaması
- ✅ Hızlı inference
- ✅ Yorumlanabilir

---

## ⚠️ Kısıtlamalar ve Uyarılar

### Model Kısıtlamaları

1. **Veri Seti Boyutu:** 195 örneklem (küçük)
   - Daha büyük veri setleri ile iyileştirilebilir
   
2. **Ses Kalitesi:** Temiz ses kaydı gerektirir
   - Arka plan gürültüsü performansı düşürür
   
3. **Ses Testi Tipi:** "Aaaa" sesi için optimize edilmiş
   - Farklı ses testleri farklı sonuçlar verebilir

4. **Demografik Çeşitlilik:** UCI veri seti sınırlı
   - Farklı yaş, cinsiyet, etnik köken için test edilmeli

### Klinik Uyarılar

⚠️ **BU BİR TIBBİ TEŞHIS CİHAZI DEĞİLDİR**

- Model, **Clinical Decision Support (CDS)** aracıdır
- Doktor kararını destekler, yerine geçmez
- Kesin teşhis için nöroloji uzmanına başvurun
- Yanlış pozitif/negatif sonuçlar olabilir

### Yanlış Sonuç Riskleri

**Yanlış Pozitif (FP = 2):**
- Sağlıklı kişiye yüksek risk uyarısı
- Gereksiz anksiyete ve doktor ziyareti

**Yanlış Negatif (FN = 1):**
- Hasta kişiye düşük risk
- Geç teşhis riski (EN KRİTİK)

---

## 🚀 Gelecek İyileştirmeler

### Kısa Vadeli (1-3 ay)

1. **Daha Büyük Veri Seti**
   - mPower Study (10,000+ örneklem)
   - Kendi veri toplama

2. **Deep Learning Modeli**
   - CNN veya Transformer
   - Daha yüksek doğruluk hedefi

3. **Ensemble Model**
   - Random Forest + Neural Network
   - Voting/Stacking

### Orta Vadeli (3-6 ay)

1. **Çoklu Hastalık Tespiti**
   - Alzheimer
   - Multiple Sclerosis
   - ALS

2. **Gerçek Zamanlı Analiz**
   - Edge AI (cihaz üzerinde)
   - Daha hızlı inference

3. **Klinik Validasyon**
   - Hastane ortaklıkları
   - Prospektif çalışmalar

### Uzun Vadeli (6-12 ay)

1. **FDA Onayı**
   - Class II medikal cihaz
   - Klinik denemeler

2. **Çoklu Modalite**
   - Ses + Hareket + Bilişsel testler
   - Daha kapsamlı değerlendirme

3. **Kişiselleştirilmiş Model**
   - Kullanıcı bazlı fine-tuning
   - Longitudinal tracking

---

## 📖 Referanslar

1. **UCI Parkinson Dataset**
   - Little, M. A., et al. (2008). "Exploiting Nonlinear Recurrence and Fractal Scaling Properties for Voice Disorder Detection"

2. **mPower Study**
   - Sage Bionetworks (2015). "mPower: Mobile Parkinson Disease Study"

3. **Vokal Özellikler**
   - Tsanas, A., et al. (2010). "Accurate telemonitoring of Parkinson's disease progression"

4. **MFCC**
   - Davis, S., & Mermelstein, P. (1980). "Comparison of parametric representations for monosyllabic word recognition"

---

## 📞 Destek

**Teknik Sorular:**
- GitHub Issues: [repo-url]
- Email: support@NeuralCipher.ai

**Klinik Sorular:**
- Nöroloji uzmanınıza danışın
- Bu bir tıbbi cihaz değildir

---

**Son Güncelleme:** 2026-01-19  
**Model Versiyonu:** v1.0  
**Dokümantasyon Versiyonu:** 1.0

