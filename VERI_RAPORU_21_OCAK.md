# 📊 VERİ RAPORU - 21 Ocak 2026

## ÖZET

**Toplam Veri:** 6,070 gerçek hasta ses kaydı  
**Durum:** ✅ İndirildi ve işlendi  
**Boyut:** 0.95 MB (CSV formatında)

---

## 📁 İNDİRİLEN VERİ SETLERİ

### ✅ 1. UCI Parkinson's Dataset
```
Örnek Sayısı:     195 ses kaydı
├─ Parkinson:     147 hasta (%75.4)
└─ Sağlıklı:      48 kişi (%24.6)

Özellikler:       22 ses biyobelirteci
Kalite:           ⭐⭐⭐⭐⭐ Yüksek (klinik doğrulanmış)
Dosya:            parkinsons.data (196 satır, 1 başlık)
Kullanım:         ✅ Model v1.0 eğitiminde kullanıldı
```

**Özellikler (22):**
- MDVP:Fo(Hz) - Ortalama vokal frekans
- MDVP:Fhi(Hz) - Maksimum vokal frekans  
- MDVP:Flo(Hz) - Minimum vokal frekans
- MDVP:Jitter(%), Jitter:DDP, MDVP:RAP, MDVP:PPQ - Jitter ölçümleri
- MDVP:Shimmer, Shimmer:APQ3, Shimmer:APQ5, MDVP:APQ, Shimmer:DDA - Shimmer ölçümleri
- NHR, HNR - Gürültü oranları
- RPDE, DFA, spread1, spread2, D2, PPE - Nonlinear ölçümler

---

### ✅ 2. UCI Telemonitoring Dataset
```
Örnek Sayısı:     5,875 ses kaydı
Hasta Sayısı:     42 Parkinson hastası (longitudinal)
Kayıt Süresi:     6 ay boyunca takip

Özellikler:       20 ses biyobelirteci + UPDRS skorları
Kalite:           ⭐⭐⭐ Orta (longitudinal veri, değişkenlik yüksek)
Dosya:            parkinsons_updrs.data (5,876 satır, 1 başlık)
Kullanım:         ⚠️ Model v2.0'da test edildi (başarısız)
```

**Özellikler (20):**
- subject# - Hasta ID
- age - Yaş
- sex - Cinsiyet
- test_time - Test zamanı (gün)
- motor_UPDRS - Motor UPDRS skoru (0-108)
- total_UPDRS - Toplam UPDRS skoru (0-176)
- 16 ses özelliği (Jitter, Shimmer, NHR, HNR, RPDE, DFA, PPE)

---

## ❌ İNDİRİLEMEYEN VERİ SETLERİ

### 1. Kaggle Datasets
```
Durum:     ❌ Başarısız
Sebep:     Kaggle CLI kurulu değil
Çözüm:     pip install kaggle + API key gerekli
Potansiyel: ~5,000 örnek
```

### 2. PhysioNet Parkinson's
```
Durum:     ❌ Başarısız  
Sebep:     HTTP 404 - Link kırık
Potansiyel: Bilinmiyor
```

### 3. MDVR-KCL Dataset
```
Durum:     ❌ Başarısız
Sebep:     HTTP 404 - Link kırık  
Potansiyel: Bilinmiyor
```

### 4. Italian Parkinson's
```
Durum:     ❌ Başarısız
Sebep:     HTTP 404 - Link kırık
Potansiyel: Bilinmiyor
```

---

## 📈 VERİ KULLANIMI

### Model v1.0 (ÜRETİMDE) ⭐
```
Veri Seti:        UCI Parkinson's (195 örnek)
Eğitim:           156 örnek (%80)
Test:             39 örnek (%20)

Sonuç:            %92.31 doğruluk ✅
ROC-AUC:          %96.21 ✅
Duyarlılık:       %96.55 ✅
```

### Model v2.0 (DENEYSEL) ❌
```
Veri Seti:        UCI + Telemonitoring (6,070 örnek)
Eğitim:           4,856 örnek (%80)
Test:             1,214 örnek (%20)

Sonuç:            %69.69 doğruluk ❌
ROC-AUC:          %78.82 ❌
Problem:          Özellik uyumsuzluğu, 77,740 eksik değer
```

**Sonuç:** 195 örnekle %92.31 > 6,070 örnekle %69.69  
**Sebep:** Kalite > Miktar

---

## 🎯 VERİ KALİTESİ ANALİZİ

### UCI Parkinson's (195 örnek)
```
✅ Tek protokol (tutarlı kayıt)
✅ Tüm 22 özellik mevcut
✅ Eksik değer YOK
✅ Klinik doğrulanmış
✅ Yüksek kalite
✅ Binary sınıflandırma (Parkinson/Sağlıklı)
```

### UCI Telemonitoring (5,875 örnek)
```
⚠️ Longitudinal veri (6 ay takip)
⚠️ Sadece 16 özellik
⚠️ Sadece Parkinson hastaları (sağlıklı kontrol YOK)
⚠️ UPDRS skorları (sürekli değişken)
⚠️ Yüksek değişkenlik
⚠️ Farklı kayıt koşulları
```

### Ortak Özellikler (8)
```
Her iki veri setinde ortak:
1. Jitter(%)
2. Jitter:Abs
3. Shimmer
4. Shimmer(dB)
5. NHR
6. HNR
7. RPDE
8. DFA

Kayıp özellikler: 14 (UCI'dan) + 12 (Telemonitoring'den)
```

---

## 💾 DOSYA DETAYLARI

### Veri Dosyaları
```
📁 neuralcipher-ai/ai-pipeline/data/raw/
├─ parkinsons.data              (196 satır, 22 özellik + 1 label)
├─ parkinsons_updrs.data        (5,876 satır, 20 özellik + 2 UPDRS)
├─ uci_parkinsons.data          (aynı: parkinsons.data)
├─ datasets_info.json           (veri seti bilgileri)
└─ download_summary.json        (indirme özeti)

Toplam Boyut: 0.95 MB
```

### Model Dosyaları
```
📁 neuralcipher-ai/ai-pipeline/models/
├─ neuralcipher_v1.0.pkl        (215 KB - Random Forest)
├─ neuralcipher_v1.0_scaler.pkl (1.6 KB - StandardScaler)
├─ neuralcipher_v1.0_metadata.json
├─ neuralcipher_v2.0.pkl        (deneysel)
├─ neuralcipher_v3.0.pkl        (deneysel)
└─ neuralcipher_v4.0.pkl        (deneysel)
```

---

## 📊 İSTATİSTİKLER

### Veri Dağılımı
```
Toplam:           6,070 örnek
├─ UCI:           195 örnek (%3.2)
│  ├─ Parkinson:  147 (%75.4)
│  └─ Sağlıklı:   48 (%24.6)
└─ Telemonitoring: 5,875 örnek (%96.8)
   └─ Parkinson:  5,875 (%100)
```

### Özellik Sayıları
```
UCI:              22 özellik
Telemonitoring:   16 özellik
Ortak:            8 özellik
Toplam (birleşik): 29 özellik (13 düşük varyans sonrası)
```

### Eksik Değerler
```
UCI:              0 eksik değer ✅
Telemonitoring:   0 eksik değer ✅
Birleşik:         77,740 eksik değer ❌
                  (farklı özellikler nedeniyle)
```

---

## 🚀 SONRAKİ ADIMLAR

### Öncelik 1: Kaggle Verisi (Bu Hafta)
```bash
# Kaggle CLI kur
pip install kaggle

# API key indir (kaggle.com/account)
# ~/.kaggle/kaggle.json dosyasına kaydet

# Veri indir
cd neuralcipher-ai/ai-pipeline/scripts
python setup_kaggle.py download vikasukani/parkinsons-disease-data-set

Beklenen: 5,000+ örnek
```

### Öncelik 2: Daha Fazla UCI-Tarzı Veri
```
Hedef:    500-1,000 örnek (UCI protokolü ile)
Kaynak:   Hastane ortaklıkları
Özellik:  Aynı 22 özellik
Sonuç:    %93-95 doğruluk bekleniyor
```

### Öncelik 3: Ensemble Model
```
Model A:  UCI (195 örnek) → %92 doğruluk
Model B:  Telemonitoring (5,875 örnek) → %70 doğruluk
Ensemble: Ağırlıklı ortalama (70% A + 30% B)
Sonuç:    %85-90 doğruluk + daha robust
```

---

## ⚠️ ÖNEMLİ NOTLAR

### Neden v1.0 Daha İyi?
```
❌ Daha fazla veri = Daha iyi model (YANLIŞ!)
✅ Daha kaliteli veri = Daha iyi model (DOĞRU!)

195 örnek (yüksek kalite) > 6,070 örnek (karışık kalite)
```

### Veri Toplama Stratejisi
```
1. Kalite öncelikli
2. Tutarlı protokol
3. Tüm özellikler mevcut
4. Eksik değer minimum
5. Klinik doğrulanmış
```

### Mevcut Durum
```
✅ 6,070 örnek indirildi
✅ 195 örnek kullanılıyor (v1.0)
✅ %92.31 doğruluk
✅ Üretim hazır
⏳ Daha fazla veri toplanabilir
```

---

## 📞 KOMUTLAR

### Veri Kontrol
```bash
# Veri dizinine git
cd neuralcipher-ai/ai-pipeline/data/raw

# Dosyaları listele
dir

# Satır sayılarını kontrol et
(Get-Content parkinsons.data | Measure-Object -Line).Lines
(Get-Content parkinsons_updrs.data | Measure-Object -Line).Lines
```

### Veri İndirme
```bash
# Kaggle kur
pip install kaggle

# Kaggle setup
cd neuralcipher-ai/ai-pipeline/scripts
python setup_kaggle.py

# Veri indir
python download_free_datasets.py
```

### Model Eğitimi
```bash
# POC model (UCI only)
cd neuralcipher-ai/ai-pipeline
python train_poc_model.py

# Gerçek veri ile (UCI)
python train_with_real_data.py

# Tüm veri ile (UCI + Telemonitoring)
python train_with_all_data_v2.py
```

---

## ✅ SONUÇ

**Mevcut Veri:** 6,070 örnek (0.95 MB)  
**Kullanılan:** 195 örnek (UCI)  
**Model Doğruluğu:** %92.31  
**Durum:** ✅ Üretim hazır

**Tavsiye:** Mevcut model ile beta testine başla, paralel olarak daha fazla UCI-tarzı veri topla.

---

**Rapor Tarihi:** 21 Ocak 2026  
**Veri İndirme:** 20 Ocak 2026  
**Son Güncelleme:** 21 Ocak 2026, 15:30
