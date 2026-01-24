# 🎯 BÜYÜK VERİ EĞİTİM PLANI - MASTER PLAN

**Tarih:** 21 Ocak 2026  
**Hedef:** Binlerce gerçek ses verisi ile model eğitimi  
**Durum:** 📋 PLANLAMA AŞAMASI  
**Prensip:** HİÇBİR ŞEY KAÇIRMAYACAĞIZ!

---

## 🎯 GENEL BAKIŞ

### Hedefler:
1. ✅ **10,000+ ses kaydı** topla
2. ✅ **59+ özellik** çıkar
3. ✅ **%99+ accuracy** elde et
4. ✅ **Klinik validasyon** yap
5. ✅ **Production deployment** tamamla

### Zaman Çizelgesi:
- **Faz 1:** Veri Toplama (1-2 hafta)
- **Faz 2:** Veri İşleme (3-5 gün)
- **Faz 3:** Özellik Çıkarma (1 hafta)
- **Faz 4:** Model Eğitimi (2-3 gün)
- **Faz 5:** Validasyon & Test (1 hafta)
- **Faz 6:** Deployment (2-3 gün)

**TOPLAM:** 4-6 hafta

---

## 📊 FAZ 1: VERİ TOPLAMA (1-2 Hafta)

### 1.1 Veri Kaynakları Belirleme

#### 🥇 Öncelik 1: PVI Dataset (EN ÖNEMLİ!)

**Detaylar:**
- Website: http://parkinsonsvoice.org
- Özellik: 132 features
- Örnekler: 6,138 ses kaydı
- Parkinson: 50 hasta
- Sağlıklı: 43 kişi
- Format: WAV files
- Boyut: ~2-3 GB

**Adımlar:**
1. [ ] Website'e git
2. [ ] Akademik hesap oluştur
3. [ ] Veri kullanım anlaşması imzala
4. [ ] Dataset indir
5. [ ] Dosya bütünlüğü kontrol et (MD5/SHA256)
6. [ ] Klasör yapısını organize et

**Beklenen Süre:** 2-3 gün

#### 🥈 Öncelik 2: mPower Dataset

**Detaylar:**
- Platform: Synapse (Sage Bionetworks)
- Özellik: 100+ features
- Örnekler: 9,500+ ses kaydı
- Format: M4A/WAV
- Boyut: ~5-10 GB

**Adımlar:**
1. [ ] Synapse hesabı oluştur
2. [ ] mPower projesine katıl
3. [ ] Sertifika al
4. [ ] Dataset indir
5. [ ] Format dönüşümü (M4A → WAV)
6. [ ] Metadata parse et

**Beklenen Süre:** 3-5 gün

#### 🥉 Öncelik 3: PC-GITA Dataset

**Detaylar:**
- Kaynak: Universidad de Antioquia
- Özellik: 50+ features
- Örnekler: 500+ ses kaydı
- Dil: İspanyolca
- Format: WAV

**Adımlar:**
1. [ ] Dataset talep et
2. [ ] İndir
3. [ ] Dil uyumluluğu kontrol et
4. [ ] Organize et

**Beklenen Süre:** 2-3 gün

#### 📦 Öncelik 4: Mevcut Veriler

**Detaylar:**
- Oxford: 195 örnek (zaten var)
- Sample 100: 100 örnek (zaten var)
- Sample 500: 500 örnek (zaten var)
- TOPLAM: 795 örnek

**Adımlar:**
1. [x] Zaten mevcut
2. [ ] Yedekle
3. [ ] Dokümante et

**Beklenen Süre:** 1 saat

### 1.2 Veri Organizasyonu

**Klasör Yapısı:**
```
neuralcipher-ai/ai-pipeline/data/
├── raw/
│   ├── pvi/
│   │   ├── parkinson/
│   │   │   ├── patient_001/
│   │   │   │   ├── vowel_a.wav
│   │   │   │   ├── pataka.wav
│   │   │   │   ├── speech.wav
│   │   │   │   └── metadata.json
│   │   │   └── ...
│   │   └── healthy/
│   │       └── ...
│   ├── mpower/
│   │   └── ...
│   ├── pcgita/
│   │   └── ...
│   └── existing/
│       ├── oxford.csv
│       ├── sample_100.csv
│       └── sample_500.csv
├── processed/
│   ├── features/
│   │   ├── pvi_features.csv
│   │   ├── mpower_features.csv
│   │   └── combined_features.csv
│   └── cleaned/
│       └── ...
└── final/
    └── master_dataset.csv
```

### 1.3 Veri Kalite Kontrol

**Kontrol Listesi:**
- [ ] Ses kalitesi kontrolü (SNR > 20 dB)
- [ ] Dosya bütünlüğü (corrupt file yok)
- [ ] Metadata eksiksiz
- [ ] Etiketleme doğru (Parkinson/Healthy)
- [ ] Duplicate kayıt yok
- [ ] Ses uzunluğu uygun (3-30 saniye)
- [ ] Sample rate tutarlı (16-44 kHz)
- [ ] Format standardize (WAV, Mono)

**Araçlar:**
```python
# quality_check.py
- librosa: Ses analizi
- soundfile: Dosya okuma
- pandas: Metadata yönetimi
- hashlib: Duplicate kontrolü
```

---

## 🔧 FAZ 2: VERİ İŞLEME (3-5 Gün)

### 2.1 Ses Dosyası Preprocessing

**Adımlar:**
1. [ ] **Format Dönüşümü**
   - Tüm dosyaları WAV'a çevir
   - Mono kanala dönüştür
   - Sample rate: 22050 Hz standardize

2. [ ] **Gürültü Temizleme**
   - Background noise reduction
   - Silence trimming
   - Normalization (-1 to 1)

3. [ ] **Segmentasyon**
   - Uzun kayıtları böl (max 30 saniye)
   - Sessiz kısımları çıkar
   - Overlap kontrolü

**Script:**
```python
# preprocess_audio.py
import librosa
import soundfile as sf
import noisereduce as nr

def preprocess_audio(input_path, output_path):
    # Load
    y, sr = librosa.load(input_path, sr=22050, mono=True)
    
    # Noise reduction
    y_clean = nr.reduce_noise(y=y, sr=sr)
    
    # Trim silence
    y_trimmed, _ = librosa.effects.trim(y_clean, top_db=20)
    
    # Normalize
    y_norm = librosa.util.normalize(y_trimmed)
    
    # Save
    sf.write(output_path, y_norm, sr)
```

### 2.2 Metadata Birleştirme

**Gerekli Bilgiler:**
- Patient ID
- Age
- Gender
- Diagnosis (Parkinson/Healthy)
- UPDRS Score (varsa)
- Recording date
- Test type (vowel/speech/pataka)
- Audio quality metrics

**Script:**
```python
# merge_metadata.py
import pandas as pd

def merge_all_metadata():
    # PVI metadata
    pvi_meta = pd.read_csv('pvi/metadata.csv')
    
    # mPower metadata
    mpower_meta = pd.read_json('mpower/metadata.json')
    
    # Standardize columns
    # Merge
    # Save
```

### 2.3 Veri Dengeleme

**Stratejiler:**
1. **Undersampling:** Fazla olan sınıftan azalt
2. **Oversampling:** Az olan sınıfı artır (SMOTE)
3. **Hybrid:** İkisini birleştir

**Hedef Denge:** 1:1 veya 1.5:1 (ideal)

---

## 🔬 FAZ 3: ÖZELLİK ÇIKARMA (1 Hafta)

### 3.1 Özellik Grupları

#### Grup 1: Temel Özellikler (22 özellik)
**Mevcut - Zaten var:**
- Pitch (3)
- Jitter (5)
- Shimmer (6)
- HNR/NHR (2)
- Nonlinear (6)

#### Grup 2: MFCC Özellikleri (25 özellik)
**Yeni eklenecek:**
- MFCC 1-13 (13 özellik)
- MFCC Delta (13 özellik)
- MFCC Delta-Delta (13 özellik)
- İstatistikler: mean, std, min, max

**Script:**
```python
# extract_mfcc.py
import librosa
import numpy as np

def extract_mfcc_features(audio_path):
    y, sr = librosa.load(audio_path, sr=22050)
    
    # MFCC
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
    
    # Delta
    mfcc_delta = librosa.feature.delta(mfcc)
    
    # Delta-Delta
    mfcc_delta2 = librosa.feature.delta(mfcc, order=2)
    
    # Statistics
    features = []
    for coef in [mfcc, mfcc_delta, mfcc_delta2]:
        features.extend([
            np.mean(coef, axis=1),
            np.std(coef, axis=1),
            np.min(coef, axis=1),
            np.max(coef, axis=1)
        ])
    
    return np.concatenate(features)
```

#### Grup 3: Spektral Özellikler (18 özellik)
**Yeni eklenecek:**
- Spectral Centroid
- Spectral Bandwidth
- Spectral Rolloff
- Spectral Contrast (7 bands)
- Spectral Flatness
- Zero Crossing Rate
- Chroma Features (12)

#### Grup 4: Prosodik Özellikler (15 özellik)
**Yeni eklenecek:**
- Speaking rate
- Pause duration
- Pause frequency
- Intensity mean/std
- Pitch range
- Pitch variability
- Energy contour

#### Grup 5: Ek Nonlinear (15 özellik)
**Yeni eklenecek:**
- Lyapunov exponent
- Hurst exponent
- Sample entropy
- Approximate entropy
- Correlation dimension (D2)
- Recurrence quantification

**TOPLAM:** 22 + 25 + 18 + 15 + 15 = **95 özellik!**

### 3.2 Özellik Çıkarma Pipeline

**Master Script:**
```python
# feature_extraction_master.py
import pandas as pd
from pathlib import Path

class FeatureExtractor:
    def __init__(self):
        self.extractors = [
            BasicFeatureExtractor(),    # 22 features
            MFCCExtractor(),             # 25 features
            SpectralExtractor(),         # 18 features
            ProsodicExtractor(),         # 15 features
            NonlinearExtractor()         # 15 features
        ]
    
    def extract_all(self, audio_path):
        features = {}
        for extractor in self.extractors:
            features.update(extractor.extract(audio_path))
        return features
    
    def process_dataset(self, data_dir, output_csv):
        results = []
        for audio_file in Path(data_dir).rglob('*.wav'):
            features = self.extract_all(audio_file)
            features['file_path'] = str(audio_file)
            results.append(features)
        
        df = pd.DataFrame(results)
        df.to_csv(output_csv, index=False)
        return df
```

### 3.3 Özellik Validasyonu

**Kontroller:**
- [ ] Tüm özellikler numeric
- [ ] NaN/Inf değer yok
- [ ] Outlier tespiti
- [ ] Feature correlation analizi
- [ ] Feature importance ranking

---

## 🤖 FAZ 4: MODEL EĞİTİMİ (2-3 Gün)

### 4.1 Veri Hazırlığı

**Adımlar:**
1. [ ] Train/Validation/Test split (70/15/15)
2. [ ] Stratified sampling (denge koru)
3. [ ] Feature scaling (StandardScaler)
4. [ ] Feature selection (top 59 seç)

### 4.2 Model Mimarisi

**Deneyeceğimiz Modeller:**

#### Model 1: Random Forest
```python
RandomForestClassifier(
    n_estimators=500,
    max_depth=30,
    min_samples_split=5,
    min_samples_leaf=2,
    class_weight='balanced'
)
```

#### Model 2: Gradient Boosting
```python
GradientBoostingClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=7,
    subsample=0.8
)
```

#### Model 3: XGBoost
```python
XGBClassifier(
    n_estimators=500,
    learning_rate=0.05,
    max_depth=7,
    subsample=0.8,
    colsample_bytree=0.8
)
```

#### Model 4: LightGBM
```python
LGBMClassifier(
    n_estimators=500,
    learning_rate=0.05,
    num_leaves=31,
    max_depth=7
)
```

#### Model 5: Deep Neural Network
```python
Sequential([
    Dense(256, activation='relu'),
    Dropout(0.3),
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.2),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])
```

#### Model 6: Stacking Ensemble
```python
StackingClassifier(
    estimators=[
        ('rf', RandomForest),
        ('gb', GradientBoosting),
        ('xgb', XGBoost),
        ('lgbm', LightGBM)
    ],
    final_estimator=LogisticRegression()
)
```

### 4.3 Hyperparameter Tuning

**Yöntem:** Bayesian Optimization (Optuna)

```python
import optuna

def objective(trial):
    params = {
        'n_estimators': trial.suggest_int('n_estimators', 100, 1000),
        'max_depth': trial.suggest_int('max_depth', 5, 50),
        'learning_rate': trial.suggest_float('learning_rate', 0.01, 0.3),
        'subsample': trial.suggest_float('subsample', 0.6, 1.0)
    }
    
    model = XGBClassifier(**params)
    score = cross_val_score(model, X_train, y_train, cv=10).mean()
    return score

study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=100)
```

### 4.4 Cross-Validation

**Stratejiler:**
- 10-Fold CV
- Stratified K-Fold
- Leave-One-Out (küçük veri için)
- Time-Series Split (zaman bazlı veri için)

### 4.5 Eğitim Scripti

**Master Training Script:**
```python
# train_master_model.py
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import joblib

# Load data
df = pd.read_csv('data/final/master_dataset.csv')

# Prepare
X = df.drop(['patient_id', 'diagnosis'], axis=1)
y = df['diagnosis']

# Split
X_train, X_temp, y_train, y_temp = train_test_split(
    X, y, test_size=0.3, stratify=y, random_state=42
)
X_val, X_test, y_val, y_test = train_test_split(
    X_temp, y_temp, test_size=0.5, stratify=y_temp, random_state=42
)

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_val_scaled = scaler.transform(X_val)
X_test_scaled = scaler.transform(X_test)

# Train all models
models = train_all_models(X_train_scaled, y_train)

# Validate
best_model = select_best_model(models, X_val_scaled, y_val)

# Final test
final_score = evaluate_model(best_model, X_test_scaled, y_test)

# Save
joblib.dump(best_model, 'models/neuralcipher_v10.0_ultimate.pkl')
joblib.dump(scaler, 'models/neuralcipher_v10.0_ultimate_scaler.pkl')
```

---

## ✅ FAZ 5: VALIDASYON & TEST (1 Hafta)

### 5.1 Performance Metrics

**Hesaplanacak Metrikler:**
- Accuracy
- Precision
- Recall
- F1-Score
- AUC-ROC
- AUC-PR
- Confusion Matrix
- Classification Report
- Cross-Validation Score
- Confidence Intervals

### 5.2 Error Analysis

**Analiz Adımları:**
1. [ ] False Positive analizi
2. [ ] False Negative analizi
3. [ ] Misclassification patterns
4. [ ] Feature importance
5. [ ] SHAP values
6. [ ] Confusion matrix heatmap

### 5.3 Robustness Testing

**Test Senaryoları:**
- [ ] Farklı ses kaliteleri
- [ ] Farklı yaş grupları
- [ ] Farklı cinsiyetler
- [ ] Farklı diller (varsa)
- [ ] Farklı kayıt cihazları
- [ ] Gürültülü ortamlar

### 5.4 Clinical Validation

**Adımlar:**
1. [ ] Klinik uzman değerlendirmesi
2. [ ] Gerçek hasta verileri ile test
3. [ ] UPDRS skorları ile korelasyon
4. [ ] Sensitivite/Spesifisite analizi
5. [ ] ROC curve analizi

---

## 🚀 FAZ 6: DEPLOYMENT (2-3 Gün)

### 6.1 Model Optimizasyonu

**Adımlar:**
- [ ] Model quantization (boyut küçült)
- [ ] Inference optimization
- [ ] Batch prediction support
- [ ] GPU acceleration (varsa)

### 6.2 Backend Entegrasyonu

**Güncellenecek Dosyalar:**
```
backend/app/services/
├── ml_service.py          # Model loading
├── feature_extractor.py   # 95 feature extraction
└── audio_processor.py     # Audio preprocessing
```

### 6.3 API Güncelleme

**Yeni Endpoint:**
```python
@router.post("/analyze/advanced")
async def analyze_advanced(audio: UploadFile):
    # Extract 95 features
    features = feature_extractor.extract_all(audio)
    
    # Predict
    result = ml_service.predict(features)
    
    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "risk_score": result["risk_score"],
        "feature_count": 95,
        "model_version": "v10.0_ultimate"
    }
```

### 6.4 Testing

**Test Checklist:**
- [ ] Unit tests
- [ ] Integration tests
- [ ] Load tests (1000+ requests)
- [ ] Stress tests
- [ ] API response time (<2 seconds)

### 6.5 Documentation

**Dokümantasyon:**
- [ ] Model architecture
- [ ] Feature descriptions
- [ ] API documentation
- [ ] Deployment guide
- [ ] User manual

---

## 📋 KONTROL LİSTESİ - HİÇBİR ŞEY KAÇIRMA!

### Veri Toplama
- [ ] PVI Dataset indirildi
- [ ] mPower Dataset indirildi
- [ ] PC-GITA Dataset indirildi
- [ ] Tüm dosyalar organize edildi
- [ ] Metadata birleştirildi
- [ ] Kalite kontrolü yapıldı
- [ ] Yedekleme yapıldı

### Veri İşleme
- [ ] Format dönüşümü tamamlandı
- [ ] Gürültü temizleme yapıldı
- [ ] Segmentasyon tamamlandı
- [ ] Normalizasyon yapıldı
- [ ] Veri dengeleme yapıldı

### Özellik Çıkarma
- [ ] 22 temel özellik çıkarıldı
- [ ] 25 MFCC özelliği çıkarıldı
- [ ] 18 spektral özellik çıkarıldı
- [ ] 15 prosodik özellik çıkarıldı
- [ ] 15 nonlinear özellik çıkarıldı
- [ ] Toplam 95 özellik doğrulandı
- [ ] Feature selection yapıldı (top 59)

### Model Eğitimi
- [ ] 6 farklı model eğitildi
- [ ] Hyperparameter tuning yapıldı
- [ ] Cross-validation tamamlandı
- [ ] En iyi model seçildi
- [ ] Model kaydedildi

### Validasyon
- [ ] Performance metrics hesaplandı
- [ ] Error analysis yapıldı
- [ ] Robustness testing tamamlandı
- [ ] Clinical validation yapıldı
- [ ] Rapor hazırlandı

### Deployment
- [ ] Model optimize edildi
- [ ] Backend entegre edildi
- [ ] API güncellendi
- [ ] Testing tamamlandı
- [ ] Documentation hazırlandı
- [ ] Production'a deploy edildi

---

## 🎯 BAŞARI KRİTERLERİ

### Minimum Gereksinimler:
- ✅ 10,000+ ses kaydı
- ✅ 59+ özellik
- ✅ %97+ accuracy
- ✅ %95+ F1-score
- ✅ <2 saniye inference time

### İdeal Hedefler:
- 🎯 15,000+ ses kaydı
- 🎯 95 özellik
- 🎯 %99+ accuracy
- 🎯 %98+ F1-score
- 🎯 <1 saniye inference time

---

## 📊 BEKLENEN SONUÇLAR

### Model v10.0 (Ultimate)

**Veri:**
- Toplam: 15,000+ örnek
- Parkinson: 7,500+
- Sağlıklı: 7,500+
- Denge: 1:1 (MÜKEMMEL!)

**Özellikler:**
- Toplam: 95 özellik
- Kullanılan: 59 en önemli
- Kategoriler: 5 grup

**Performance:**
- Accuracy: %99+
- F1-Score: %98+
- AUC-ROC: %99.5+
- False Positive: <1%
- False Negative: <1%

**Karşılaştırma:**
| Metrik | v9.0 | v10.0 | İyileşme |
|--------|------|-------|----------|
| Veri | 795 | 15,000+ | +1,787% |
| Özellik | 22 | 59 | +168% |
| Accuracy | 100% | 99%+ | Maintained |
| Robustness | Orta | Yüksek | +++ |

---

## 🚨 RİSKLER VE ÇÖZÜMLER

### Risk 1: Veri indirme sorunları
**Çözüm:** Alternatif kaynaklar, VPN kullanımı

### Risk 2: Hesaplama gücü yetersizliği
**Çözüm:** Cloud GPU (Google Colab, AWS)

### Risk 3: Overfitting
**Çözüm:** Regularization, dropout, cross-validation

### Risk 4: Veri dengesizliği
**Çözüm:** SMOTE, class weights, stratified sampling

### Risk 5: Özellik çıkarma hataları
**Çözüm:** Extensive testing, validation

---

## 📞 DESTEK VE KAYNAKLAR

### Araçlar:
- Python 3.8+
- librosa, soundfile
- scikit-learn, xgboost, lightgbm
- tensorflow/pytorch
- pandas, numpy
- optuna (hyperparameter tuning)

### Donanım:
- CPU: 8+ cores
- RAM: 32+ GB
- GPU: NVIDIA (optional but recommended)
- Disk: 100+ GB SSD

### Dokümantasyon:
- PVI Dataset: parkinsonsvoice.org
- mPower: synapse.org
- Librosa: librosa.org
- Scikit-learn: scikit-learn.org

---

**Hazırlayan:** Kiro AI  
**Tarih:** 21 Ocak 2026  
**Durum:** 📋 MASTER PLAN HAZIR  
**Sonraki Adım:** Veri indirmeye başla!

🎯 **HİÇBİR ŞEY KAÇIRMADIK! PLAN EKSIKSIZ!** 🎯
