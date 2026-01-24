# 🎯 NEURALCIPHER.AI - İDEAL VERİ GEREKSİNİMLERİ
## 21 Ocak 2026 - Projemiz İçin Hangi Veriler Gerekli?

---

## 📊 PROJE HEDEFI

**Ne Yapıyoruz?**
Parkinson hastalığını ses analizi ile erken teşhis eden AI sistemi

**Nasıl Çalışıyor?**
1. Kullanıcı ses kaydı yapar (5 farklı test)
2. AI 59 ses özelliği çıkarır
3. Model Parkinson riskini hesaplar
4. Sonuç: %X Parkinson riski

---

## ✅ İHTİYACIMIZ OLAN VERİ TİPİ

### 1. SES KAYITLARI (WAV/MP3)

**Format:**
```
Dosya Tipi:       WAV, MP3, FLAC
Sample Rate:      16,000 Hz - 44,100 Hz
Bit Depth:        16-bit veya 24-bit
Kanal:            Mono (tek kanal)
Süre:             3-30 saniye
Kalite:           Temiz, gürültüsüz
```

**Test Türleri (5 Adet):**
```
1. Sustained Phonation ("Aaaa" sesi - 5 saniye)
   - Sabit ton
   - Tek nefeste
   - Maksimum süre

2. Rapid Syllable Repetition ("Pataka" - 5 saniye)
   - Hızlı tekrar
   - Net telaffuz
   - Ritmik

3. Spontaneous Speech (Konuşma - 30 saniye)
   - Doğal konuşma
   - Cümle kurma
   - Akıcılık

4. Plosive Sounds ("Puh puh puh" - 3 saniye)
   - Kesik kesik
   - Güçlü üfürme
   - Düzenli aralıklar

5. Counting (Sayı sayma - 10 saniye)
   - 1'den 20'ye kadar
   - Hızlı
   - Net
```

---

### 2. HASTA BİLGİLERİ (Metadata)

**Zorunlu Bilgiler:**
```
✅ Hasta ID (anonim)
✅ Yaş (18-90 arası)
✅ Cinsiyet (Erkek/Kadın)
✅ Parkinson Durumu (Var/Yok)
✅ Kayıt Tarihi
```

**Parkinson Hastaları İçin Ek Bilgiler:**
```
✅ Teşhis Tarihi
✅ Hastalık Süresi (yıl)
✅ UPDRS Skoru (0-176)
   - Motor UPDRS (0-108)
   - Total UPDRS (0-176)
✅ Hoehn & Yahr Stage (1-5)
✅ İlaç Kullanımı (Var/Yok)
✅ İlaç Tipi (Levodopa, Dopamin agonist, vb.)
```

**Sağlıklı Kontroller İçin:**
```
✅ Nörolojik hastalık geçmişi (Yok)
✅ Ses bozukluğu (Yok)
✅ Sigara kullanımı (Var/Yok)
```

---

### 3. SES ÖZELLİKLERİ (59 Adet)

**Bizim Çıkaracağımız Özellikler:**

**A. Pitch Features (Perde - 8 özellik)**
```
1. Mean Pitch (Ortalama perde)
2. Max Pitch (Maksimum perde)
3. Min Pitch (Minimum perde)
4. Pitch Range (Perde aralığı)
5. Pitch Std Dev (Perde standart sapma)
6. Vibrato Frequency (Titreşim frekansı)
7. Vibrato Depth (Titreşim derinliği)
8. Pitch Contour (Perde kontur)
```

**B. Jitter Features (Frekans Değişkenliği - 8 özellik)**
```
9. MDVP:Jitter(%)
10. MDVP:Jitter(Abs)
11. MDVP:RAP
12. MDVP:PPQ
13. Jitter:DDP
14. Local Jitter
15. Relative Jitter
16. Absolute Jitter
```

**C. Shimmer Features (Amplitüd Değişkenliği - 8 özellik)**
```
17. MDVP:Shimmer
18. MDVP:Shimmer(dB)
19. Shimmer:APQ3
20. Shimmer:APQ5
21. MDVP:APQ
22. Shimmer:DDA
23. Local Shimmer
24. Relative Shimmer
```

**D. Harmonics Features (Harmonik - 4 özellik)**
```
25. HNR (Harmonics-to-Noise Ratio)
26. NHR (Noise-to-Harmonics Ratio)
27. Harmonic Energy
28. Noise Energy
```

**E. Spectral Features (Spektral - 10 özellik)**
```
29. Spectral Centroid
30. Spectral Spread
31. Spectral Rolloff
32. Spectral Flux
33. Spectral Flatness
34. Spectral Entropy
35. Spectral Contrast
36. Mel-frequency Energy
37. Zero Crossing Rate
38. Energy
```

**F. MFCC Features (Mel-Frequency - 5 özellik)**
```
39-43. MFCC 1-5 (İlk 5 katsayı)
```

**G. Prosody Features (Prozodi - 8 özellik)**
```
44. Speaking Rate (Konuşma hızı)
45. Pause Duration (Duraklama süresi)
46. Pause Frequency (Duraklama sıklığı)
47. Speech Rate Variability (Konuşma hızı değişkenliği)
48. Intonation Range (Tonlama aralığı)
49. Stress Pattern (Vurgu deseni)
50. Rhythm Regularity (Ritim düzenliliği)
51. Syllable Duration (Hece süresi)
```

**H. Nonlinear Features (Doğrusal Olmayan - 8 özellik)**
```
52. RPDE (Recurrence Period Density Entropy)
53. DFA (Detrended Fluctuation Analysis)
54. PPE (Pitch Period Entropy)
55. D2 (Correlation Dimension)
56. Spread1
57. Spread2
58. Lyapunov Exponent
59. Hurst Exponent
```

---

## 🎯 İDEAL VERİ SETİ ÖZELLİKLERİ

### Miktar

**Minimum (Beta Test):**
```
Parkinson:        500 hasta
Sağlıklı:         500 kişi
Toplam:           1,000 kişi
Her kişi:         5 test
Toplam Kayıt:     5,000 ses kaydı
```

**Optimal (Production):**
```
Parkinson:        2,000 hasta
Sağlıklı:         2,000 kişi
Toplam:           4,000 kişi
Her kişi:         5 test
Toplam Kayıt:     20,000 ses kaydı
```

**İdeal (Yüksek Accuracy):**
```
Parkinson:        10,000 hasta
Sağlıklı:         10,000 kişi
Toplam:           20,000 kişi
Her kişi:         5 test
Toplam Kayıt:     100,000 ses kaydı
```

---

### Kalite Kriterleri

**✅ OLMASI GEREKENLER:**

**1. Dengeli Veri**
```
Parkinson : Sağlıklı = 1:1 (eşit sayıda)
Erkek : Kadın = 1:1 (dengeli cinsiyet)
Yaş Dağılımı: 40-50, 50-60, 60-70, 70-80 (dengeli)
```

**2. Temiz Kayıt**
```
✅ Gürültüsüz ortam
✅ Kaliteli mikrofon
✅ Sabit ses seviyesi
✅ Tek kişi (arka planda başka ses yok)
✅ Tam kayıt (kesinti yok)
```

**3. Tutarlı Protokol**
```
✅ Aynı test talimatları
✅ Aynı kayıt koşulları
✅ Aynı süre limitleri
✅ Aynı ses formatı
```

**4. Klinik Doğrulama**
```
✅ Nörolog tarafından teşhis edilmiş
✅ UPDRS skorları mevcut
✅ İlaç kullanımı belirtilmiş
✅ Hastalık evresi belirtilmiş
```

**❌ OLMAMASI GEREKENLER:**

```
❌ Sentetik veri (yapay üretilmiş)
❌ Gürültülü kayıtlar
❌ Kesik kayıtlar
❌ Farklı protokoller
❌ Doğrulanmamış teşhisler
❌ Eksik metadata
❌ Düşük kalite ses
❌ Çok kısa kayıtlar (<2 saniye)
```

---

## 📁 VERİ YAPISI

### Klasör Organizasyonu

```
data/
├── parkinson/
│   ├── patient_001/
│   │   ├── metadata.json
│   │   ├── test_1_sustained_phonation.wav
│   │   ├── test_2_rapid_syllable.wav
│   │   ├── test_3_spontaneous_speech.wav
│   │   ├── test_4_plosive_sounds.wav
│   │   └── test_5_counting.wav
│   ├── patient_002/
│   │   └── ...
│   └── ...
│
└── healthy/
    ├── control_001/
    │   ├── metadata.json
    │   ├── test_1_sustained_phonation.wav
    │   ├── test_2_rapid_syllable.wav
    │   ├── test_3_spontaneous_speech.wav
    │   ├── test_4_plosive_sounds.wav
    │   └── test_5_counting.wav
    ├── control_002/
    │   └── ...
    └── ...
```

### Metadata Format (JSON)

```json
{
  "patient_id": "PD_001",
  "age": 65,
  "gender": "male",
  "diagnosis": "parkinson",
  "diagnosis_date": "2020-03-15",
  "disease_duration_years": 4,
  "updrs_motor": 28,
  "updrs_total": 45,
  "hoehn_yahr_stage": 2,
  "medication": true,
  "medication_type": "Levodopa",
  "recording_date": "2024-01-15",
  "recording_device": "iPhone 12",
  "sample_rate": 44100,
  "bit_depth": 16,
  "notes": "Morning recording, before medication"
}
```

---

## 🎯 ŞU AN MEVCUT VERİ vs İHTİYAÇ

### Mevcut Durum

```
Toplam:           6,070 gerçek kayıt
├─ Parkinson:     6,022 hasta (%99.2) ❌ Dengesiz!
└─ Sağlıklı:      48 kişi (%0.8) ❌ Çok az!

Özellikler:       9 ❌ (59 değil!)
Kalite:           ⭐⭐⭐ Orta
Test Türü:        1 (sadece sustained phonation)
```

### İhtiyaç

```
Toplam:           20,000 kayıt (hedef)
├─ Parkinson:     10,000 hasta (%50) ✅ Dengeli
└─ Sağlıklı:      10,000 kişi (%50) ✅ Dengeli

Özellikler:       59 ✅
Kalite:           ⭐⭐⭐⭐⭐ Yüksek
Test Türü:        5 (tüm testler)
```

### Eksikler

```
❌ 9,952 sağlıklı kontrol eksik
❌ 3,978 Parkinson hastası eksik
❌ 50 özellik eksik (59 - 9 = 50)
❌ 4 test türü eksik (5 - 1 = 4)
```

---

## 🚀 VERİ TOPLAMA STRATEJİSİ

### Faz 1: Hızlı Başlangıç (1 Ay)

**Hedef:** 1,000 kişi (500 Parkinson + 500 Sağlıklı)

**Kaynak:**
1. **PVI Veri Seti İndir**
   - 6,138 kayıt (50 Parkinson + 43 Sağlıklı)
   - 132 özellik
   - Ücretsiz

2. **Oxford UCI (Mevcut)**
   - 195 kayıt (147 Parkinson + 48 Sağlıklı)
   - 22 özellik
   - Zaten var

3. **PC-GITA İndir**
   - ~500 kayıt (50 Parkinson + 50 Sağlıklı)
   - 50+ özellik
   - Ücretsiz

**Toplam:** ~6,833 kayıt

---

### Faz 2: Hastane Ortaklığı (3 Ay)

**Hedef:** 2,000 kişi (1,000 Parkinson + 1,000 Sağlıklı)

**Yöntem:**
1. Nöroloji kliniklerine başvur
2. Etik kurul onayı al
3. Hasta rızası al
4. Ses kayıtları topla
5. Klinik verilerle eşleştir

**Avantajlar:**
- ✅ Klinik doğrulanmış
- ✅ UPDRS skorları mevcut
- ✅ Yüksek kalite
- ✅ Türkçe veri

---

### Faz 3: Mobil Uygulama (6 Ay)

**Hedef:** 10,000 kişi (5,000 Parkinson + 5,000 Sağlıklı)

**Yöntem:**
1. Mobil app'i yayınla
2. Kullanıcılar kendi kayıtlarını yükler
3. Doktor onayı ile etiketle
4. Veri setine ekle

**Avantajlar:**
- ✅ Büyük ölçekli
- ✅ Düşük maliyet
- ✅ Çeşitli cihazlar
- ✅ Gerçek dünya verisi

---

## 💡 ÖNERİLER

### Kısa Vadeli (1 Ay)

**1. PVI Veri Seti İndir**
```
Website: http://parkinsonsvoice.org
Email:   parkinsonsvoice@gmail.com
Süre:    1 hafta
Sonuç:   6,138 kayıt + 132 özellik
```

**2. 59 Özellik Seç**
```
132 özellikten en iyi 59'unu seç
Feature importance analizi yap
Correlation analizi yap
Süre: 3 gün
```

**3. Model Yeniden Eğit**
```
59 özellik ile eğit
Accuracy hedef: 96%+
Süre: 1 hafta
```

---

### Orta Vadeli (3 Ay)

**4. Hastane Ortaklığı Kur**
```
Nöroloji klinikleri ile anlaş
1,000 Parkinson + 1,000 Sağlıklı topla
Klinik doğrulama yap
Süre: 3 ay
```

**5. Veri Kalitesini Artır**
```
Gürültü filtreleme
Normalizasyon
Augmentation
Süre: 2 hafta
```

---

### Uzun Vadeli (6 Ay)

**6. Mobil App ile Veri Topla**
```
10,000+ kullanıcı
Crowdsourcing
Doktor onayı
Süre: 6 ay
```

**7. Çok Dilli Veri**
```
Türkçe, İngilizce, İspanyolca
Farklı aksanlar
Global model
Süre: 1 yıl
```

---

## 🎯 SONUÇ

### İdeal Veri Seti

```
Miktar:           20,000 kişi (10,000 + 10,000)
Özellikler:       59 ses biyobelirteci
Test Türü:        5 farklı test
Kalite:           ⭐⭐⭐⭐⭐ Yüksek
Denge:            1:1 (Parkinson:Sağlıklı)
Doğrulama:        Klinik onaylı
Format:           WAV, 44.1kHz, 16-bit, Mono
Metadata:         Tam ve detaylı
```

### Beklenen Sonuç

```
Accuracy:         96-98%
Sensitivity:      98%+
Specificity:      95%+
ROC-AUC:          0.98+
F1-Score:         0.97+
```

### Zaman Çizelgesi

```
1 Ay:    PVI + Oxford + PC-GITA (6,833 kayıt)
3 Ay:    + Hastane ortaklığı (2,000 kayıt)
6 Ay:    + Mobil app (10,000 kayıt)
1 Yıl:   + Çok dilli (20,000+ kayıt)
```

---

**Hazırlanma Tarihi:** 21 Ocak 2026  
**Rapor Türü:** İdeal Veri Gereksinimleri  
**Sonraki Adım:** PVI başvurusu yap!
