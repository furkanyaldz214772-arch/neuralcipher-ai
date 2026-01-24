# 📋 EKSİK SAYFALAR - DETAYLI LİSTE
## Missing Pages - Complete Specification

**Date:** 23 Ocak 2026  
**Status:** 5 Sayfa Eksik  
**Priority:** YÜKSEK

---

## 🔴 KRİTİK ÖNCELIK - ADMIN PANELİ (4 Sayfa)

### 1. `/admin/users` - Kullanıcı Yönetimi

**Gerekli Özellikler:**
- ✅ Kullanıcı listesi (tablo formatında)
- ✅ Arama ve filtreleme (isim, email, rol, durum)
- ✅ Sıralama (kayıt tarihi, son giriş, isim)
- ✅ Kullanıcı rolleri gösterimi (Patient, Doctor, Admin, Hospital)
- ✅ Kullanıcı durumu (Active, Inactive, Banned)
- ✅ Kullanıcı istatistikleri (toplam, aktif, yeni)
- ✅ Kullanıcı detay modal
- ✅ Kullanıcı düzenleme butonu
- ✅ Kullanıcı silme butonu (onay ile)
- ✅ Yeni kullanıcı ekleme butonu
- ✅ Toplu işlemler (seçili kullanıcıları aktif/pasif yap)
- ✅ Export butonu (CSV/Excel)
- ✅ Pagination

**API Endpoints:**
- `GET /api/v1/admin/users` - Kullanıcı listesi
- `GET /api/v1/admin/users/{id}` - Kullanıcı detayı
- `PUT /api/v1/admin/users/{id}` - Kullanıcı güncelle
- `DELETE /api/v1/admin/users/{id}` - Kullanıcı sil
- `POST /api/v1/admin/users` - Yeni kullanıcı

**Tasarım:**
- Clean white cards
- Blue primary color
- Table with hover effects
- Action buttons (Edit, Delete, View)
- Status badges (Active=green, Inactive=gray, Banned=red)

---

### 2. `/admin/subscriptions` - Abonelik Yönetimi

**Gerekli Özellikler:**
- ✅ Abonelik listesi
- ✅ Plan türleri (Free, Basic, Premium, Enterprise)
- ✅ Abonelik durumu (Active, Expired, Cancelled, Trial)
- ✅ Ödeme durumu (Paid, Pending, Failed)
- ✅ Gelir istatistikleri (günlük, haftalık, aylık)
- ✅ Abonelik grafikleri (yeni abonelikler, iptal oranı)
- ✅ Filtreleme (plan, durum, tarih)
- ✅ Abonelik detay modal
- ✅ Manuel abonelik oluşturma
- ✅ Abonelik iptali
- ✅ Abonelik yenileme
- ✅ Ödeme geçmişi
- ✅ Export butonu

**API Endpoints:**
- `GET /api/v1/admin/subscriptions` - Abonelik listesi
- `GET /api/v1/admin/subscriptions/stats` - İstatistikler
- `GET /api/v1/admin/subscriptions/{id}` - Abonelik detayı
- `PUT /api/v1/admin/subscriptions/{id}` - Abonelik güncelle
- `DELETE /api/v1/admin/subscriptions/{id}` - Abonelik iptal

**Tasarım:**
- 4 stat cards (Total Revenue, Active Subs, MRR, Churn Rate)
- Revenue chart (line chart)
- Subscription distribution (pie chart)
- Table with subscription details
- Color-coded plan badges

---

### 3. `/admin/analytics` - Sistem Analitikleri

**Gerekli Özellikler:**
- ✅ Kullanıcı büyüme grafiği (line chart)
- ✅ Gelir grafiği (bar chart)
- ✅ Test istatistikleri (günlük, haftalık, aylık)
- ✅ Coğrafi dağılım (map veya list)
- ✅ Kullanıcı engagement metrikleri
- ✅ Popüler test türleri
- ✅ Ortalama risk skorları
- ✅ Doktor performans metrikleri
- ✅ Sistem kullanım istatistikleri
- ✅ Tarih aralığı seçici
- ✅ Export butonu (PDF/Excel)
- ✅ Real-time metrics

**API Endpoints:**
- `GET /api/v1/admin/analytics/users` - Kullanıcı metrikleri
- `GET /api/v1/admin/analytics/revenue` - Gelir metrikleri
- `GET /api/v1/admin/analytics/tests` - Test metrikleri
- `GET /api/v1/admin/analytics/engagement` - Engagement metrikleri

**Tasarım:**
- Dashboard style with multiple charts
- Colorful stat cards
- Interactive charts (Chart.js or Recharts)
- Date range picker
- Filter options

---

### 4. `/admin/settings` - Sistem Ayarları

**Gerekli Özellikler:**
- ✅ Genel ayarlar (site adı, logo, favicon)
- ✅ Email ayarları (SMTP config)
- ✅ Ödeme gateway ayarları (Stripe, PayPal)
- ✅ Feature flags (yeni özellikler açma/kapama)
- ✅ Maintenance mode
- ✅ API rate limits
- ✅ Security settings (2FA zorunlu, password policy)
- ✅ Notification settings
- ✅ Backup settings
- ✅ Log settings
- ✅ Integration settings (third-party APIs)
- ✅ Test mode toggle
- ✅ Save/Reset buttons

**API Endpoints:**
- `GET /api/v1/admin/settings` - Tüm ayarlar
- `PUT /api/v1/admin/settings` - Ayarları güncelle
- `POST /api/v1/admin/settings/test-email` - Email test
- `POST /api/v1/admin/settings/test-payment` - Payment test

**Tasarım:**
- Tabbed interface (General, Email, Payment, Security, etc.)
- Form fields with validation
- Toggle switches for boolean settings
- Test buttons for integrations
- Save confirmation

---

## 🟡 YÜKSEK ÖNCELİK - DOKTOR PANELİ (1 Sayfa)

### 5. `/doctor/patients` - Hasta Listesi

**Gerekli Özellikler:**
- ✅ Hasta listesi (card veya table)
- ✅ Arama (isim, email)
- ✅ Filtreleme (risk seviyesi, son test tarihi)
- ✅ Sıralama (risk, isim, tarih)
- ✅ Hasta kartları (avatar, isim, risk skoru, son test)
- ✅ "Yeni Hasta Ekle" butonu
- ✅ Hasta detayına git (click to view)
- ✅ Quick actions (mesaj gönder, test iste)
- ✅ Risk seviyesi gösterimi (color-coded)
- ✅ Pagination
- ✅ Empty state (henüz hasta yok)

**API Endpoints:**
- `GET /api/v1/doctor/patients` - Hasta listesi (ZATEN VAR)
- `POST /api/v1/doctor/patients` - Yeni hasta ekle
- `GET /api/v1/doctor/patients/{id}` - Hasta detayı

**Tasarım:**
- Grid layout (3 columns)
- Patient cards with:
  - Avatar (initials)
  - Name
  - Email
  - Risk score (gauge or number)
  - Last test date
  - Test count
  - Status badge
  - Action buttons
- Search bar at top
- Filter dropdown
- Sort dropdown

---

## 🟢 DÜŞÜK ÖNCELİK (Opsiyonel)

### 6. `/doctor` - Hastanın Doktoru Sayfası

**Seçenekler:**
1. **Sayfa Oluştur:** Hastanın atanmış doktorunu göster
2. **Linki Kaldır:** Sidebar'dan "Doktorum" linkini kaldır
3. **Yönlendir:** `/doctor/messages` sayfasına yönlendir

**Önerilen:** Linki kaldır (şu an doktor atama sistemi yok)

---

## 📊 ÖZET

### Toplam Eksik: 5 Sayfa
- 🔴 Kritik: 4 sayfa (Admin paneli)
- 🟡 Yüksek: 1 sayfa (Doctor paneli)
- 🟢 Düşük: 1 link sorunu

### Tahmini Süre
- Admin Users: 45 dakika
- Admin Subscriptions: 45 dakika
- Admin Analytics: 60 dakika
- Admin Settings: 45 dakika
- Doctor Patients: 30 dakika
- **TOPLAM:** ~3.5 saat

### Gerekli Kaynaklar
- Frontend: React/Next.js components
- Backend: API endpoints (çoğu zaten var)
- Design: Mevcut admin/doctor panel stilini takip et

---

## 🎯 UYGULAMA SIRASI

### Adım 1: Admin Users (En Basit)
- Kullanıcı listesi tablosu
- CRUD işlemleri
- Basit filtreleme

### Adım 2: Doctor Patients (Hızlı)
- Mevcut dashboard kodunu kullan
- Sadece layout değişikliği

### Adım 3: Admin Subscriptions (Orta)
- Stat cards + table
- Basit grafikler

### Adım 4: Admin Analytics (Karmaşık)
- Çoklu grafikler
- Metrikler

### Adım 5: Admin Settings (Orta)
- Form tabanlı
- Validation

---

## ✅ HAZIR OLAN KAYNAKLAR

### Mevcut Components (Kullanılabilir)
- ✅ Sidebar (role-based)
- ✅ Stat cards
- ✅ Tables
- ✅ Charts (TrendChart, RiskGauge)
- ✅ Modals
- ✅ Forms
- ✅ Buttons
- ✅ Badges

### Mevcut API Endpoints
- ✅ `/api/v1/admin/stats` - Admin istatistikleri
- ✅ `/api/v1/doctor/patients` - Hasta listesi
- ✅ `/api/v1/admin/*` - Admin endpoints (bazıları)

### Mevcut Styles
- ✅ Tailwind CSS
- ✅ Color scheme
- ✅ Component styles

---

## 🚀 BAŞLAMAYA HAZIR

Hangi sayfadan başlamak istersiniz?

1. **Admin Users** (En basit, hızlı başlangıç)
2. **Doctor Patients** (En hızlı, 30 dakika)
3. **Admin Analytics** (En görsel, etkileyici)
4. **Hepsini sırayla** (3.5 saat)

**Önerim:** Admin Users'dan başlayalım, sonra Doctor Patients, sonra diğerleri.

---

**Hazırlayan:** Kiro AI  
**Tarih:** 23 Ocak 2026  
**Durum:** Uygulama için hazır ✅
