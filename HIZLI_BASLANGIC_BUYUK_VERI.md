# ⚡ HIZLI BAŞLANGIÇ - BÜYÜK VERİ EĞİTİMİ

**Hedef:** Binlerce ses verisi ile model eğitimi  
**Süre:** 4-6 hafta  
**Sonuç:** %99+ accuracy model

---

## 🚀 HEMEN BAŞLA - 3 ADIM

### 1️⃣ VERİ İNDİR (1-2 Hafta)

**En önemli kaynak: PVI Dataset**

```bash
# 1. Website'e git
http://parkinsonsvoice.org

# 2. Hesap oluştur (akademik email gerekli)
# 3. Veri kullanım anlaşması imzala
# 4. Dataset indir (2-3 GB)
```

**Alternatif: mPower Dataset**
```bash
# 1. Synapse hesabı: synapse.org
# 2. mPower projesine katıl
# 3. Sertifika al
# 4. Dataset indir (5-10 GB)
```

### 2️⃣ ÖZELLİK ÇIKAR (1 Hafta)

**Script hazır! Sadece çalıştır:**

```bash
cd neuralcipher-ai/ai-pipeline

# Tüm özellikleri çıkar (95 özellik)
python extract_all_features.py \
    --input data/raw/ \
    --output data/processed/features.csv \
    --features all

# Süre: ~2-3 saat (10,000 dosya için)
```

### 3️⃣ MODEL EĞİT (2-3 Gün)

**Tek komut ile eğit:**

```bash
# Ultimate model eğitimi
python train_ultimate_model.py \
    --data data/processed/features.csv \
    --output models/neuralcipher_v10.0_ultimate.pkl \
    --features 59 \
    --cv 10

# Süre: ~4-6 saat
```

---

## 📋 DETAYLI ADIMLAR

### Adım 1: Ortam Hazırlığı

```bash
# Gerekli paketleri yükle
pip install -r requirements_ultimate.txt

# Klasörleri oluştur
mkdir -p data/raw/{pvi,mpower,pcgita}
mkdir -p data/processed/{features,cleaned}
mkdir -p models/v10.0
```

### Adım 2: Veri İndirme

**PVI Dataset:**
1. http://parkinsonsvoice.org → Register
2. Download → Select "Full Dataset"
3. Extract → `data/raw/pvi/`

**mPower Dataset:**
1. https://synapse.org → Register
2. Join mPower Study
3. Download → `data/raw/mpower/`

### Adım 3: Veri İşleme

```bash
# Preprocessing
python scripts/preprocess_audio.py \
    --input data/raw/ \
    --output data/processed/cleaned/

# Metadata birleştir
python scripts/merge_metadata.py \
    --sources pvi,mpower,existing \
    --output data/processed/master_metadata.csv
```

### Adım 4: Özellik Çıkarma

```bash
# 95 özellik çıkar
python scripts/extract_features_master.py \
    --input data/processed/cleaned/ \
    --metadata data/processed/master_metadata.csv \
    --output data/processed/features_95.csv \
    --parallel 8  # CPU core sayısı
```

### Adım 5: Model Eğitimi

```bash
# Tüm modelleri eğit ve en iyisini seç
python train_ultimate_model.py \
    --data data/processed/features_95.csv \
    --models rf,gb,xgb,lgbm,nn,stacking \
    --tune True \
    --cv 10 \
    --output models/v10.0/
```

### Adım 6: Validasyon

```bash
# Model test et
python scripts/validate_model.py \
    --model models/v10.0/best_model.pkl \
    --test_data data/processed/test_set.csv \
    --output reports/validation_report.pdf
```

### Adım 7: Deployment

```bash
# Backend'e entegre et
cp models/v10.0/best_model.pkl backend/app/models/
cp models/v10.0/scaler.pkl backend/app/models/

# Backend'i güncelle
python scripts/update_backend.py --version v10.0

# Test et
python backend/test_v10_model.py
```

---

## 🎯 KONTROL LİSTESİ

### Hazırlık
- [ ] Python 3.8+ kurulu
- [ ] Gerekli paketler yüklü
- [ ] 100+ GB disk alanı var
- [ ] 32+ GB RAM var

### Veri
- [ ] PVI Dataset indirildi
- [ ] mPower Dataset indirildi (opsiyonel)
- [ ] Dosyalar organize edildi
- [ ] Metadata hazır

### İşleme
- [ ] Preprocessing tamamlandı
- [ ] Özellik çıkarma tamamlandı
- [ ] 95 özellik doğrulandı
- [ ] Veri dengeleme yapıldı

### Eğitim
- [ ] Model eğitildi
- [ ] Hyperparameter tuning yapıldı
- [ ] En iyi model seçildi
- [ ] Model kaydedildi

### Deployment
- [ ] Backend güncellendi
- [ ] Test edildi
- [ ] Production'a deploy edildi

---

## ⚠️ SORUN GİDERME

### Sorun 1: Veri indirme yavaş
**Çözüm:** VPN kullan, gece indir

### Sorun 2: RAM yetersiz
**Çözüm:** Batch processing kullan, chunk size küçült

### Sorun 3: GPU yok
**Çözüm:** Google Colab kullan (ücretsiz GPU)

### Sorun 4: Özellik çıkarma hataları
**Çözüm:** Ses dosyası formatını kontrol et, corrupt file'ları temizle

---

## 📞 YARDIM

**Detaylı plan:** `BUYUK_VERI_EGITIM_PLANI_MASTER.md`  
**Mevcut durum:** Model v9.0 (%100 accuracy, 795 örnek)  
**Hedef:** Model v10.0 (%99+ accuracy, 15,000+ örnek)

**Başla!** 🚀
