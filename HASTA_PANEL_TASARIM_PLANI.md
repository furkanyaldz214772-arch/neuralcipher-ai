# 🎯 NeuralCipher.ai - Profesyonel Hasta Paneli Tasarım Planı

## 📋 GENEL BAKIŞ

Mükemmel projemize yakışan, modern ve kullanıcı dostu bir hasta paneli tasarlıyoruz. Bu panel, hastaların test sonuçlarını takip etmelerini, yeni testler yapmalarını ve doktorlarıyla iletişim kurmalarını sağlayacak.

---

## 🎨 TASARIM TEMASI

### Renk Paleti
- **Ana Renk**: Electric Cyan (#00D9FF / #64FFDA)
- **İkincil Renk**: Deep Navy (#0A1628 / #0A0E27)
- **Vurgu Renkleri**: 
  - Mor (#8B5CF6) - Analytics
  - Mavi (#3B82F6) - Tests
  - Yeşil (#10B981) - Success
  - Kırmızı (#EF4444) - Alerts

### Tasarım Stili
- **Glassmorphism**: Yarı saydam kartlar, blur efektleri
- **Gradient Borders**: Renkli kenarlıklar
- **Smooth Animations**: Framer Motion ile akıcı geçişler
- **Dark Theme**: Modern karanlık tema (mevcut sistemle uyumlu)

---

## 📱 PANEL SAYFALARI VE ÖZELLİKLER

### 1. 🏠 DASHBOARD (Ana Sayfa)
**Yol**: `/patient/dashboard`

#### Bileşenler:
1. **Hoş Geldin Kartı**
   - Hasta adı ve son giriş tarihi
   - Hızlı istatistikler (toplam test, son test tarihi)
   - Motivasyon mesajı

2. **İstatistik Kartları** (4 adet)
   - Toplam Test Sayısı
   - Son Test Tarihi
   - Risk Skoru Trendi (↑↓)
   - Okunmamış Mesajlar

3. **Son Test Sonuçları** (Liste)
   - Son 5 test
   - Tarih, test tipi, risk skoru
   - Detay görüntüleme butonu
   - Renkli risk göstergeleri (yeşil/sarı/kırmızı)

4. **Risk Trendi Grafiği**
   - Line chart (Chart.js)
   - Son 6 ayın risk skorları
   - İnteraktif tooltip'ler

5. **Hızlı Aksiyonlar**
   - "Yeni Test Yap" butonu (büyük, vurgulu)
   - "Doktoruma Mesaj Gönder"
   - "Test Geçmişim"

---

### 2. 🎤 YENİ TEST (Test Wizard)
**Yol**: `/patient/tests/new`

#### Adım Adım Wizard:
**Adım 1: Test Tipi Seçimi**
- Ses Testi (Voice Test)
- El Yazısı Testi (Handwriting Test)
- Yürüyüş Testi (Gait Test)
- Her biri için açıklama ve süre bilgisi

**Adım 2: Ses Kaydı** (Voice Test için)
- Büyük kayıt butonu (pulse animasyonu)
- Dalga formu görselleştirmesi
- Süre sayacı
- "Tekrar Kaydet" ve "Devam Et" butonları
- Kayıt talimatları (hangi cümleleri söylemeli)

**Adım 3: Ek Bilgiler**
- İlaç kullanımı (evet/hayır)
- Semptomlar (checkbox listesi)
- Notlar (textarea)

**Adım 4: Gönder ve Bekle**
- Yükleme animasyonu
- "AI analiz ediyor..." mesajı
- Progress bar

**Adım 5: Sonuç**
- Risk skoru (büyük, renkli)
- Detaylı analiz
- PDF indirme butonu
- "Doktoruma Gönder" butonu

---

### 3. 📊 TEST GEÇMİŞİ
**Yol**: `/patient/tests/history`

#### Özellikler:
1. **Filtreleme**
   - Tarih aralığı
   - Test tipi
   - Risk seviyesi

2. **Sıralama**
   - En yeni → En eski
   - Risk skoru (yüksek → düşük)

3. **Test Listesi**
   - Tablo görünümü
   - Her satırda: Tarih, Test Tipi, Risk Skoru, Durum, Aksiyonlar
   - "Detay Gör" ve "PDF İndir" butonları

4. **Detay Modal**
   - Tam test sonucu
   - Biomarker'lar
   - Doktor yorumları (varsa)
   - Karşılaştırma grafiği (önceki testlerle)

---

### 4. 📈 ANALİTİK
**Yol**: `/patient/tests/analytics`

#### Grafikler:
1. **Risk Skoru Trendi**
   - Line chart
   - Son 12 ay
   - Trend çizgisi

2. **Test Tipi Dağılımı**
   - Pie chart
   - Hangi testten kaç tane yapılmış

3. **Biomarker Karşılaştırması**
   - Bar chart
   - Jitter, Shimmer, HNR vb.
   - Normal aralık göstergeleri

4. **İlerleme Raporu**
   - Aylık özet
   - İyileşme/kötüleşme yüzdesi
   - Öneriler

---

### 5. 💬 MESAJLAR
**Yol**: `/patient/tests/messages`

#### Özellikler:
1. **Konuşma Listesi**
   - Doktorlarla konuşmalar
   - Son mesaj önizlemesi
   - Okunmamış sayısı badge'i

2. **Chat Arayüzü**
   - WhatsApp tarzı
   - Mesaj baloncukları
   - Tarih ayırıcıları
   - "Yazıyor..." göstergesi

3. **Dosya Paylaşımı**
   - Test sonuçlarını paylaşma
   - Görsel/PDF ekleme

4. **Hızlı Yanıtlar**
   - "Randevu talep ediyorum"
   - "Sorum var"
   - "Teşekkürler"

---

### 6. 👤 PROFİL
**Yol**: `/patient/profile`

#### Bölümler:
1. **Kişisel Bilgiler**
   - Ad Soyad
   - E-posta
   - Telefon
   - Doğum Tarihi
   - Cinsiyet

2. **Tıbbi Bilgiler**
   - Tanı tarihi (varsa)
   - Kullanılan ilaçlar
   - Alerji bilgileri
   - Aile geçmişi

3. **Acil Durum İletişimi**
   - Yakın adı
   - Telefon
   - İlişki

4. **Profil Fotoğrafı**
   - Yükleme/değiştirme
   - Avatar seçenekleri

---

### 7. ⚙️ AYARLAR
**Yol**: `/patient/settings`

#### Sekmeler:
1. **Hesap Ayarları**
   - Şifre değiştirme
   - E-posta değiştirme
   - 2FA (Two-Factor Authentication)

2. **Bildirim Tercihleri**
   - E-posta bildirimleri
   - SMS bildirimleri
   - Test sonucu bildirimleri
   - Mesaj bildirimleri

3. **Gizlilik**
   - Veri paylaşımı tercihleri
   - Hesap silme

4. **Dil ve Tema**
   - Dil seçimi (TR/EN/DE)
   - Tema (Dark/Light)

5. **Yardım ve Destek**
   - SSS
   - İletişim
   - Kullanım kılavuzu

---

## 🔐 GİRİŞ SİSTEMİ GELİŞTİRMELERİ

### Mevcut Login Sayfasına Eklenecekler:

#### 1. Access Key (Hasta Kodu) ile Giriş
**Neden?** Bazı hastalar e-posta kullanmayabilir veya hızlı erişim isteyebilir.

**Nasıl Çalışacak?**
```
┌─────────────────────────────────┐
│  Giriş Yöntemi Seçin:          │
│  ○ E-posta ile Giriş           │
│  ● Hasta Kodu ile Giriş        │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  Hasta Kodunuz:                 │
│  [XXXX-XXXX-XXXX]              │
│                                 │
│  [Giriş Yap]                   │
└─────────────────────────────────┘
```

**Özellikler:**
- 12 haneli kod (XXXX-XXXX-XXXX formatı)
- Otomatik tire ekleme
- Kod doğrulama
- "Kodumu Unuttum" linki

#### 2. Rol Seçimi (Mevcut)
Zaten var, sadece görsel iyileştirme:
- Daha büyük butonlar
- İkonlar (hasta, doktor, hastane)
- Hover efektleri

#### 3. Google OAuth (Mevcut)
Zaten entegre, sadece test edilecek.

---

## 🎯 ÖZEL ÖZELLİKLER

### 1. AI Asistan (Chatbot)
- Sağ alt köşede floating buton
- Hızlı sorular için
- "Test nasıl yapılır?"
- "Sonuçlarım ne anlama geliyor?"

### 2. Gamification (Oyunlaştırma)
- Test yapma streak'i (ardışık günler)
- Rozetler (10 test, 50 test, vb.)
- İlerleme çubuğu
- Motivasyon mesajları

### 3. Bildirimler
- Yeni test sonucu
- Doktor mesajı
- Randevu hatırlatıcı
- İlaç hatırlatıcı (opsiyonel)

### 4. Export Seçenekleri
- PDF rapor (detaylı)
- CSV (ham veri)
- Doktora paylaşım linki

### 5. Karanlık/Aydınlık Tema
- Toggle switch
- Sistem tercihini takip et
- Smooth geçiş animasyonu

---

## 📱 MOBİL UYUMLULUK

### Responsive Tasarım:
- **Desktop**: Sidebar + Content (mevcut)
- **Tablet**: Collapsible sidebar
- **Mobile**: Bottom navigation bar
  - Dashboard
  - Yeni Test
  - Mesajlar
  - Profil

### Touch Optimizasyonu:
- Büyük butonlar (min 44px)
- Swipe gesture'lar
- Pull-to-refresh

---

## 🔧 TEKNİK DETAYLAR

### Kullanılacak Teknolojiler:
- **Framework**: Next.js 14 (mevcut)
- **Styling**: Tailwind CSS (mevcut)
- **Animasyon**: Framer Motion (mevcut)
- **Grafikler**: Chart.js / Recharts (mevcut)
- **İkonlar**: Lucide React (mevcut)
- **State Management**: Zustand (mevcut)
- **API**: Axios (mevcut)

### Yeni Bağımlılıklar:
```json
{
  "react-audio-visualize": "^1.0.0",  // Ses kaydı görselleştirme
  "react-dropzone": "^14.2.3",        // Dosya yükleme
  "date-fns": "^3.2.0"                // Tarih formatla (ZATEN VAR)
}
```

---

## 📂 DOSYA YAPISI

```
neuralcipher-ai/frontend/src/
├── app/
│   └── patient/
│       ├── dashboard/
│       │   └── page.tsx                    ✅ YENİ
│       ├── tests/
│       │   ├── new/
│       │   │   └── page.tsx                ✅ YENİ (Wizard)
│       │   ├── history/
│       │   │   └── page.tsx                ✅ YENİ
│       │   └── analytics/
│       │       └── page.tsx                ✅ YENİ
│       ├── messages/
│       │   └── page.tsx                    ✅ YENİ
│       ├── profile/
│       │   └── page.tsx                    ✅ YENİ
│       └── settings/
│           └── page.tsx                    ✅ YENİ
│
├── components/
│   └── patient/
│       ├── WelcomeCard.tsx                 ✅ YENİ
│       ├── StatsCard.tsx                   ✅ YENİ
│       ├── RecentTests.tsx                 ✅ YENİ
│       ├── RiskTrendChart.tsx              ✅ YENİ
│       ├── TestWizard/
│       │   ├── StepIndicator.tsx           ✅ YENİ
│       │   ├── TestTypeSelector.tsx        ✅ YENİ
│       │   ├── VoiceRecorder.tsx           ✅ YENİ
│       │   ├── AdditionalInfo.tsx          ✅ YENİ
│       │   └── ResultDisplay.tsx           ✅ YENİ
│       ├── TestHistoryTable.tsx            ✅ YENİ
│       ├── AnalyticsCharts.tsx             ✅ YENİ
│       ├── ChatInterface.tsx               ✅ YENİ
│       └── ProfileForm.tsx                 ✅ YENİ
```

---

## 🎨 ÖRNEK EKRAN GÖRÜNTÜLERİ (Konsept)

### Dashboard:
```
┌─────────────────────────────────────────────────────────┐
│  🏠 Dashboard                                    🔔 👤  │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  👋 Hoş Geldin, Ahmet!                          │  │
│  │  Son giriş: 27 Ocak 2026, 14:30                │  │
│  │  Toplam 12 test yaptın, harikasın! 🎉          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │  12  │  │ 3 gün│  │  ↓5% │  │  2   │              │
│  │Tests │  │ önce │  │ Risk │  │ Msg  │              │
│  └──────┘  └──────┘  └──────┘  └──────┘              │
│                                                          │
│  📊 Risk Trendi (Son 6 Ay)                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │     [Line Chart Buraya Gelecek]                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  📝 Son Test Sonuçları                                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 24 Ocak  │ Ses Testi    │ 🟢 Düşük  │ [Detay]  │  │
│  │ 20 Ocak  │ El Yazısı    │ 🟡 Orta   │ [Detay]  │  │
│  │ 15 Ocak  │ Ses Testi    │ 🟢 Düşük  │ [Detay]  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
│  [🎤 Yeni Test Yap]  [💬 Mesaj Gönder]                │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## ⏱️ UYGULAMA ZAMANLAMA

### Faz 1: Temel Yapı (1-2 saat)
- ✅ Dashboard sayfası (boş layout)
- ✅ Routing yapısı
- ✅ Temel componentler

### Faz 2: Dashboard (2-3 saat)
- ✅ Welcome Card
- ✅ Stats Cards
- ✅ Recent Tests
- ✅ Risk Chart

### Faz 3: Test Wizard (3-4 saat)
- ✅ Step indicator
- ✅ Test type selector
- ✅ Voice recorder
- ✅ Form validation
- ✅ API integration

### Faz 4: Diğer Sayfalar (2-3 saat)
- ✅ Test History
- ✅ Analytics
- ✅ Messages
- ✅ Profile
- ✅ Settings

### Faz 5: Login Geliştirmeleri (1 saat)
- ✅ Access Key input
- ✅ API endpoint
- ✅ Validation

### Faz 6: Polish & Test (1-2 saat)
- ✅ Animasyonlar
- ✅ Responsive test
- ✅ Bug fixes

**TOPLAM: ~10-15 saat**

---

## 🚀 SONRAKI ADIMLAR

### Onay Bekliyor:
1. ✅ Bu tasarım planını onayla
2. ✅ Hangi özellikler öncelikli?
3. ✅ Access Key sistemi gerekli mi?
4. ✅ Başka eklemek istediğin özellik var mı?

### Onaydan Sonra:
1. 🔨 Dashboard sayfasını oluştur
2. 🔨 Temel componentleri yaz
3. 🔨 API entegrasyonlarını yap
4. 🔨 Test et ve deploy et

---

## 💡 EK ÖNERİLER

### Gelecek Özellikler (v2):
- 📱 Mobil uygulama (React Native)
- 🤖 AI sohbet asistanı
- 📅 Randevu sistemi
- 💊 İlaç takibi
- 📊 Aile üyeleri için dashboard
- 🌍 Çoklu dil desteği (TR/EN/DE/FR/ES)

### Güvenlik:
- 🔒 2FA (Two-Factor Authentication)
- 🔐 End-to-end encryption (mesajlar için)
- 📝 Audit logs
- 🚨 Anormal aktivite tespiti

---

## ✅ ÖZET

Bu plan, NeuralCipher.ai için **profesyonel, kullanıcı dostu ve modern** bir hasta paneli oluşturacak. 

**Ana Özellikler:**
- ✅ Kolay kullanım (sezgisel arayüz)
- ✅ Görsel zenginlik (grafikler, animasyonlar)
- ✅ Hızlı erişim (Access Key ile giriş)
- ✅ Kapsamlı takip (test geçmişi, analytics)
- ✅ İletişim (doktor mesajlaşma)
- ✅ Mobil uyumlu (responsive)

**Onayını bekliyorum! Hangi özelliklerle başlayalım?** 🚀
