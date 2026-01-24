# ⚡ VERİ İNDİRME AKSİYONU
## 21 Ocak 2026 - Hemen Başla!

---

## 🎯 HEDEF

**16,000+ ücretsiz Parkinson veri seti indir!**

---

## ⚡ HEMEN ŞİMDİ (30 Dakika)

### 1. UCI Oxford İndir (1 Dakika) ⚡

**Link:** https://archive.ics.uci.edu/ml/datasets/parkinsons

**Adımlar:**
1. Linke tıkla
2. "Data Folder" tıkla
3. "parkinsons.data" indir
4. CSV olarak aç

**Sonuç:** 195 kayıt ✅

---

### 2. UCI Telemonitoring İndir (1 Dakika) ⚡

**Link:** https://archive.ics.uci.edu/dataset/189/parkinsons+telemonitoring

**Adımlar:**
1. Linke tıkla
2. "Download" tıkla
3. CSV dosyasını aç

**Sonuç:** 5,875 kayıt ✅

---

### 3. PPMI Hesabı Oluştur (15 Dakika)

**Link:** https://www.ppmi-info.org/

**Adımlar:**
1. "Access Data & Specimens" tıkla
2. "Download Data" seç
3. "Create Account" tıkla
4. Formu doldur:
   - Ad, Soyad
   - Email
   - Kurum (varsa)
   - Araştırma amacı: "AI-based Parkinson's detection"
5. Data Use Agreement'ı kabul et
6. "Submit" tıkla

**Onay Süresi:** 1-3 gün  
**Sonuç:** 10,000+ kayıt (onaylandıktan sonra) ✅

---

### 4. mPower Hesabı Oluştur (15 Dakika)

**Link:** https://www.synapse.org/

**Adımlar:**
1. "Register" tıkla
2. Formu doldur:
   - Username
   - Email
   - Password
3. Email doğrula
4. mPower study sayfasına git: syn4993293
5. "Request Access" tıkla
6. Data Use Agreement kabul et

**Onay Süresi:** 1-3 gün  
**Sonuç:** Milyonlarca kayıt (onaylandıktan sonra) ✅

---

## 📊 30 DAKİKA SONUNDA

```
✅ UCI Oxford:           195 kayıt (indirildi)
✅ UCI Telemonitoring:   5,875 kayıt (indirildi)
✅ PPMI:                 10,000+ kayıt (başvuru yapıldı)
✅ mPower:               Milyonlarca kayıt (başvuru yapıldı)

TOPLAM HAZIR:            6,070 kayıt ✅
TOPLAM BEKLİYOR:         10,000+ kayıt ⏳
```

---

## 🔄 SONRAKI ADIMLAR

### Bugün (2 Saat)

**Veri Birleştirme (1 saat):**
```python
# Python script
import pandas as pd

# Oxford veri seti
oxford = pd.read_csv('parkinsons.data')
print(f"Oxford: {len(oxford)} kayıt, {len(oxford.columns)} özellik")

# Telemonitoring veri seti
telemonitoring = pd.read_csv('parkinsons_telemonitoring.csv')
print(f"Telemonitoring: {len(telemonitoring)} kayıt, {len(telemonitoring.columns)} özellik")

# Toplam
print(f"TOPLAM: {len(oxford) + len(telemonitoring)} kayıt")
```

**İlk Model Eğitimi (1 saat):**
```bash
cd ai-pipeline
python train_poc_model.py
```

---

### Gün 2-3: Onay Bekle ⏳

**Yapılacaklar:**
- ⏳ PPMI onay bekle (email kontrol et)
- ⏳ mPower onay bekle (email kontrol et)
- ✅ Mevcut veri ile model eğit
- ✅ Baseline accuracy ölç
- ✅ 59 özellik genişletmeye başla

---

### Gün 4-7: Büyük Veri İndir 📥

**PPMI Onaylandıysa:**
1. ✅ PPMI'ya giriş yap
2. ✅ "Download Data" seç
3. ✅ Voice/Speech data seç
4. ✅ İndir (büyük dosya, 1-2 saat sürebilir)

**mPower Onaylandıysa:**
1. ✅ Synapse'e giriş yap
2. ✅ mPower study sayfasına git
3. ✅ Voice data seç
4. ✅ İndir

**Sonuç:** 16,000+ kayıt! 🎉

---

## 📋 KONTROL LİSTESİ

### ✅ Hemen Şimdi (30 Dakika)
- [ ] UCI Oxford indir (1 dakika)
- [ ] UCI Telemonitoring indir (1 dakika)
- [ ] PPMI hesabı oluştur (15 dakika)
- [ ] mPower hesabı oluştur (15 dakika)

### ✅ Bugün (2 Saat)
- [ ] Veri setlerini birleştir (1 saat)
- [ ] İlk model eğit (1 saat)
- [ ] Baseline accuracy ölç (15 dakika)

### ⏳ Bu Hafta
- [ ] PPMI onay bekle (1-3 gün)
- [ ] mPower onay bekle (1-3 gün)
- [ ] Onaylandıktan sonra indir (1-2 gün)
- [ ] Tüm veri setlerini birleştir (1 gün)

---

## 🎯 BAŞARI KRİTERLERİ

### 30 Dakika Sonunda
```
✅ 6,070 kayıt indirildi
✅ 2 hesap oluşturuldu
✅ 2 başvuru yapıldı
```

### Bugün Sonunda
```
✅ Veri setleri birleştirildi
✅ İlk model eğitildi
✅ Baseline accuracy ölçüldü
```

### Bu Hafta Sonunda
```
✅ 16,000+ kayıt indirildi
✅ Tüm veri setleri birleştirildi
✅ Model accuracy 92%+
```

---

## 💡 İPUÇLARI

### PPMI Başvurusu
- ✅ Akademik email kullan (varsa)
- ✅ Kurum adı yaz (üniversite/şirket)
- ✅ Araştırma amacını net yaz
- ✅ "AI-based early detection" de
- ✅ Email'i kontrol et (1-3 gün)

### mPower Başvurusu
- ✅ Gerçek bilgiler kullan
- ✅ Email doğrula
- ✅ Data Use Agreement oku
- ✅ "Academic research" seç
- ✅ Email'i kontrol et (1-3 gün)

### Veri İndirme
- ✅ Hızlı internet kullan
- ✅ Büyük dosyalar için zaman ayır
- ✅ ZIP dosyalarını aç
- ✅ CSV formatına çevir

---

## 🚀 HEMEN BAŞLA!

**İlk 3 Adım (5 Dakika):**

1. **UCI Oxford İndir** (1 dakika)
   - https://archive.ics.uci.edu/ml/datasets/parkinsons
   - "Data Folder" → "parkinsons.data" indir

2. **UCI Telemonitoring İndir** (1 dakika)
   - https://archive.ics.uci.edu/dataset/189/parkinsons+telemonitoring
   - "Download" tıkla

3. **PPMI Hesabı Oluştur** (3 dakika)
   - https://www.ppmi-info.org/
   - "Access Data" → "Create Account"

**5 DAKİKA SONRA: 6,070 KAYIT HAZIR!** ✅

---

## 📊 SONUÇ

**30 dakika içinde:**
- ✅ 6,070 kayıt indirildi
- ✅ 2 hesap oluşturuldu
- ✅ 10,000+ kayıt için başvuru yapıldı

**1 hafta içinde:**
- ✅ 16,000+ kayıt hazır
- ✅ Model eğitildi
- ✅ Accuracy 92%+

**HEMEN BAŞLA!** ⚡

---

**Tarih:** 21 Ocak 2026  
**Öncelik:** 🔴 YÜKSEK  
**Süre:** 30 dakika (hemen)  
**Sonuç:** 6,070 kayıt ✅

