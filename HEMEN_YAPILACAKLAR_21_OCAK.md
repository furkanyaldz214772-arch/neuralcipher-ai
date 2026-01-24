# 🚀 HEMEN YAPILACAKLAR
## 21 Ocak 2026 - Acil Aksiyonlar

---

## ✅ TAMAMLANAN İŞLER (Bugün)

1. ✅ Waveform Visualization - Zaten mevcut!
2. ✅ 5 Adımlı Test Wizard - Oluşturuldu
3. ✅ 2FA Frontend - Oluşturuldu
4. ✅ Veri temizleme - Sadece Oxford dataset kaldı (195 örnek)

**Proje Durumu:** %80 Tamamlandı

---

## 🔴 BUGÜN YAPILACAKLAR (2 Saat)

### 1. EMAIL SMTP YAPILANDIRMASI ⏱️ 30 Dakika

**Adımlar:**

**A. Gmail App Password Oluştur (10 dakika)**
```
1. Gmail'e giriş yap
2. Ayarlar → Güvenlik
3. "2-Step Verification" aktif et
4. "App passwords" bul
5. "Mail" seçeneğini seç
6. 16 haneli şifreyi kopyala (örn: xxxx-xxxx-xxxx-xxxx)
```

**B. .env Dosyasını Güncelle (5 dakika)**
```bash
# backend/.env dosyasını aç ve ekle:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=xxxx-xxxx-xxxx-xxxx
SENDER_EMAIL=your-email@gmail.com
SENDER_NAME=NeuralCipher.ai
```

**C. Test Et (15 dakika)**
```bash
cd backend
python test_email.py
```

**Beklenen Sonuç:**
```
✅ Email gönderildi!
✅ Test email alındı
```

---

### 2. PVI VERİ SETİ BAŞVURUSU ⏱️ 15 Dakika

**Email Gönder:**

```
To: parkinsonsvoice@gmail.com
Subject: Academic Use Request - Parkinson's Voice Dataset

Dear Parkinson's Voice Initiative Team,

I am requesting access to the Parkinson's Voice dataset for 
academic research purposes. I am developing an AI-based early 
detection system for Parkinson's disease using voice biomarkers.

Project Details:
- Name: NeuralCipher.ai
- Purpose: Academic research and development
- Features needed: 132 voice biomarkers
- Current dataset: Oxford Parkinson's (195 samples)
- Goal: Improve model accuracy from 94.8% to 96%+

The dataset will be used exclusively for:
1. Training machine learning models
2. Voice biomarker analysis
3. Early Parkinson's detection research

I understand and agree to:
- Use data only for academic/research purposes
- Not redistribute the dataset
- Cite PVI in all publications
- Follow all data usage guidelines

Thank you for your consideration.

Best regards,
[Your Name]
[Your Institution]
[Your Email]
[Your Phone]
```

**Beklenen Süre:** 1-2 hafta onay

---

### 3. PDF EXPORT TEST ⏱️ 1 Saat

**A. Frontend'e Download Butonu Ekle (30 dakika)**

**Dosya:** `frontend/src/app/results/[id]/page.tsx`

```typescript
// Fonksiyon ekle
const handleDownloadPDF = async (testId: number) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`/api/v1/tests/${testId}/pdf`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('PDF indirme başarısız');
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `neuralcipher_test_${testId}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ PDF başarıyla indirildi!');
  } catch (error) {
    console.error('PDF download error:', error);
    alert('❌ PDF indirme hatası: ' + (error as Error).message);
  }
};

// JSX'e buton ekle (results sayfasında)
<Button
  onClick={() => handleDownloadPDF(testId)}
  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg"
>
  📥 PDF Rapor İndir
</Button>
```

**B. Test Et (30 dakika)**
```
1. Sisteme giriş yap
2. Test sonuçları sayfasına git
3. "PDF Rapor İndir" butonuna tıkla
4. PDF'in indiğini kontrol et
5. PDF'i aç ve içeriği kontrol et
```

**Beklenen PDF İçeriği:**
- ✅ Hasta bilgileri
- ✅ Test tarihi
- ✅ Risk skorları
- ✅ Biyobelirteç değerleri
- ✅ Grafik/görselleştirme

---

## 🟡 YARIN YAPILACAKLAR (1 Gün)

### 4. TESTWIZARD ENTEGRASYONU ⏱️ 2 Saat

**A. Test Sayfasına Ekle (1 saat)**

**Dosya:** `frontend/src/app/test/new/page.tsx`

```typescript
import TestWizard from '@/components/TestWizard';

export default function NewTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          🎤 Yeni Test Başlat
        </h1>
        <TestWizard />
      </div>
    </div>
  );
}
```

**B. Routing Ayarla (30 dakika)**
- Dashboard'dan "Yeni Test" butonuna link ekle
- Sidebar'a "Test Başlat" menüsü ekle

**C. Test Et (30 dakika)**
- 5 adımı tamamla
- Her adımda kayıt yap
- Sonuçları kontrol et

---

### 5. 2FA ENTEGRASYONU ⏱️ 2 Saat

**A. Settings Sayfasına Ekle (1 saat)**

**Dosya:** `frontend/src/app/settings/page.tsx`

```typescript
import TwoFactorSetup from '@/components/TwoFactorSetup';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-blue-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-cyan-400 mb-8">
          ⚙️ Ayarlar
        </h1>
        
        {/* Güvenlik Bölümü */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            🔐 Güvenlik
          </h2>
          <TwoFactorSetup />
        </div>
      </div>
    </div>
  );
}
```

**B. Backend Bağlantısı Test Et (30 dakika)**
- QR code gösterimini test et
- Kod doğrulamayı test et
- Backup codes'u test et

**C. Login Sayfasına 2FA Ekle (30 dakika)**
- Login sonrası 2FA kodu iste
- Kod doğrulama ekranı ekle

---

## 🟢 BU HAFTA YAPILACAKLAR (3 Gün)

### 6. TÜM ÖZELLİKLERİ TEST ET ⏱️ 1 Gün

**Test Listesi:**
- [ ] Kullanıcı kaydı
- [ ] Login
- [ ] 2FA kurulumu
- [ ] 2FA ile login
- [ ] 5 adımlı test
- [ ] Test sonuçları
- [ ] PDF indirme
- [ ] Email bildirimleri
- [ ] Dashboard
- [ ] Doktor paneli
- [ ] Admin paneli

---

### 7. BUG FIXES ⏱️ 1 Gün

**Kontrol Edilecekler:**
- [ ] Dark theme tutarlılığı
- [ ] Responsive design
- [ ] API error handling
- [ ] Loading states
- [ ] Form validations
- [ ] Security checks

---

### 8. DOCUMENTATION GÜNCELLE ⏱️ 1 Gün

**Güncellenecek Dosyalar:**
- [ ] README.md
- [ ] API_SPECIFICATION.md
- [ ] DEPLOYMENT_GUIDE.md
- [ ] TESTING_GUIDE.md
- [ ] QUICK_START.md

---

## 📅 ÖNÜMÜZDEKI 2 HAFTA

### Hafta 2 (22-28 Ocak)
- ✅ Email SMTP (bugün)
- ✅ PVI başvurusu (bugün)
- ✅ PDF Export (bugün)
- ⏳ TestWizard entegrasyonu (yarın)
- ⏳ 2FA entegrasyonu (yarın)
- ⏳ Tüm özellikler test (2 gün)
- ⏳ Bug fixes (1 gün)

### Hafta 3 (29 Ocak - 4 Şubat)
- ⏳ 59 Biyobelirteç - Pitch, Amplitude, Noise (5 gün)
- ⏳ Documentation güncelle (2 gün)

### Hafta 4 (5-11 Şubat)
- ⏳ 59 Biyobelirteç - Spectral, Prosody, Voice Quality (5 gün)
- ⏳ Model v7.0 eğit (2 gün)

### Hafta 5 (12-18 Şubat)
- ⏳ PVI veri seti indir (eğer onaylandıysa)
- ⏳ Model v8.0 eğit (2 gün)
- ⏳ Production deployment (1 gün)

---

## 🎯 BAŞARI KRİTERLERİ

### Bugün Sonunda
- ✅ Email çalışıyor
- ✅ PVI başvurusu yapıldı
- ✅ PDF indirme çalışıyor

### Yarın Sonunda
- ✅ TestWizard entegre
- ✅ 2FA entegre
- ✅ Tüm özellikler çalışıyor

### Bu Hafta Sonunda
- ✅ 0 kritik hata
- ✅ Tüm testler geçiyor
- ✅ Documentation güncel
- ✅ Sistem %85 tamamlanmış

---

## 📊 İLERLEME TAKİBİ

### Tamamlanan: 4/11 (36%)
- ✅ Waveform
- ✅ 5 Adımlı Test Wizard
- ✅ 2FA Frontend
- ✅ Veri temizleme

### Bugün: 3/11 (27%)
- ⏳ Email SMTP
- ⏳ PVI başvurusu
- ⏳ PDF Export

### Yarın: 2/11 (18%)
- ⏳ TestWizard entegrasyonu
- ⏳ 2FA entegrasyonu

### Bu Hafta: 2/11 (18%)
- ⏳ Tüm özellikler test
- ⏳ Bug fixes

### Genel Tamamlanma: %80 → %85 (Bu Hafta)

---

## 💡 ÖNEMLİ NOTLAR

### Email SMTP
- Gmail App Password kullan (normal şifre değil!)
- 2FA aktif olmalı
- "Less secure apps" ayarı gerekmiyor (App Password yeterli)

### PVI Başvurusu
- Akademik email kullan (varsa)
- Detaylı proje açıklaması yap
- Onay süresi 1-2 hafta
- Reddedilirse alternatif: Italian Parkinson's Dataset

### PDF Export
- Backend zaten hazır
- Sadece frontend butonu ekle
- Test et ve doğrula

---

## 🚀 BAŞLA!

**Şimdi yapılacak ilk 3 şey:**

1. **Gmail App Password oluştur** (10 dakika)
2. **backend/.env dosyasını güncelle** (5 dakika)
3. **Test email gönder** (5 dakika)

**Toplam:** 20 dakika

**Sonra:**

4. **PVI'ya email gönder** (15 dakika)
5. **PDF download butonu ekle** (30 dakika)
6. **PDF'i test et** (15 dakika)

**Toplam:** 1 saat 20 dakika

**Bugün tamamlanacak!** ✅

---

**Hazırlanma Tarihi:** 21 Ocak 2026  
**Öncelik:** 🔴 YÜKSEK  
**Hedef:** Bugün tamamla  
**Sonraki Kontrol:** Yarın sabah

