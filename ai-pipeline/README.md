# AI Pipeline - Parkinson Hastalığı Tespit Modeli

## 🎯 Hedef
Ses verilerinden Parkinson hastalığını %85+ doğrulukla tespit eden AI modeli.

## 📊 Veri Seti
**mPower Study (Sage Bionetworks)**
- 10,000+ Parkinson hastası
- Ses kayıtları (vokal testler)
- Açık kaynak ve araştırma için kullanılabilir

**UCI Parkinson Dataset**
- 195 hasta
- 22 özellik (Jitter, Shimmer, HNR, vb.)
- Baseline model için ideal

## 🏗️ Pipeline Yapısı
```
ai-pipeline/
├── notebooks/          # Jupyter notebooks (EDA, training)
├── data/              # Veri setleri
│   ├── raw/          # Ham veri
│   ├── processed/    # İşlenmiş veri
│   └── features/     # Çıkarılmış özellikler
├── models/           # Eğitilmiş modeller
├── scripts/          # Training scripts
└── src/              # Kaynak kod
```

## 🚀 Hızlı Başlangıç

### 1. Veri Setini İndir
```bash
cd ai-pipeline
python scripts/download_data.py
```

### 2. Özellik Çıkarımı
```bash
python scripts/extract_features.py
```

### 3. Model Eğitimi
```bash
python scripts/train_model.py
```

### 4. Model Değerlendirmesi
```bash
python scripts/evaluate_model.py
```

## 📈 Beklenen Sonuçlar
- **Accuracy:** >85%
- **Sensitivity:** >80% (Hasta tespiti)
- **Specificity:** >85% (Sağlıklı tespiti)
- **AUC-ROC:** >0.90

## 🔬 Model Mimarisi
1. **Baseline:** Random Forest (hızlı prototip)
2. **Advanced:** Neural Network (daha yüksek doğruluk)
3. **Production:** Ensemble (RF + NN)
