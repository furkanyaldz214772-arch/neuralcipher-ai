# 🚀 ADMIN DASHBOARD - ULTRA DETAYLI PLAN (A'dan Z'ye)

## 📊 1. DASHBOARD (Ana Sayfa)

### İstatistik Kartları (8 Kart)
- 👥 **Toplam Kullanıcılar** (Patient, Doctor, Hospital, Authorized)
- 🧪 **Toplam Testler** (Bugün, Bu Hafta, Bu Ay)
- 💰 **Gelir İstatistikleri** (Bugün, Bu Ay, Toplam)
- 📈 **Aktif Kullanıcılar** (Son 24 saat)
- ⚠️ **Bekleyen İşlemler** (Onay bekleyen testler, mesajlar)
- 🏥 **Hastane Sayısı**
- 👨‍⚕️ **Doktor Sayısı**
- 🔔 **Sistem Uyarıları**

### Grafikler
- **Son 30 günlük kullanıcı kayıt grafiği** (Line chart)
- **Rol bazlı kullanıcı dağılımı** (Pie chart)
- **Test dağılımı** (Bar chart)
- **Aylık gelir grafiği** (Area chart)
- **Sistem performansı** (Real-time)

### Son Aktiviteler
- Son kayıt olan kullanıcılar (10 adet)
- Son yapılan testler (10 adet)
- Son mesajlar (5 adet)
- Son ödemeler (5 adet)

---

## 👥 2. KULLANICI YÖNETİMİ (`/admin-panel/users`)

### Özellikler
- **Listeleme:** Tüm kullanıcıları tablo halinde
- **Filtreleme:** Role, Status, Date, Country
- **Arama:** Name, Email, Phone
- **Sıralama:** Tüm kolonlara göre
- **Pagination:** 10, 25, 50, 100 kayıt
- **Toplu İşlemler:**
  - Seçili kullanıcıları sil
  - Seçili kullanıcıları aktif/pasif yap
  - Seçili kullanıcılara email gönder
  - Export (CSV, Excel, PDF)

### Kullanıcı Detay Sayfası (`/admin-panel/users/[id]`)
- **Genel Bilgiler:** Name, Email, Phone, Country, Role, Status
- **İstatistikler:** Test sayısı, Mesaj sayısı, Son giriş
- **Aktivite Geçmişi:** Tüm aktiviteler (login, test, mesaj)
- **Testler:** Kullanıcının tüm testleri
- **Mesajlar:** Kullanıcının mesajları
- **Ödemeler:** Ödeme geçmişi
- **İşlemler:**
  - Kullanıcı düzenle
  - Rol değiştir
  - Şifre sıfırla
  - Hesap dondur/aktif et
  - Kullanıcı sil
  - Email gönder

---

## 🧪 3. TEST YÖNETİMİ (`/admin-panel/tests`)

### Özellikler
- **Listeleme:** Tüm testler
- **Filtreleme:** Patient, Doctor, Date, Status, Result
- **Arama:** Test ID, Patient Name
- **Test Detayları:**
  - Test bilgileri
  - Hasta bilgileri
  - Doktor bilgileri (eğer varsa)
  - Test sonuçları
  - AI analiz sonuçları
  - Ses dosyası
- **İşlemler:**
  - Test detaylarını görüntüle
  - Test sonuçlarını düzenle
  - Test sil
  - PDF export
  - Toplu silme

---

## 💰 4. PAKET YÖNETİMİ (`/admin-panel/packages`)

### Paket Listesi
- **Mevcut Paketler:**
  - Free Plan
  - Basic Plan
  - Pro Plan
  - Enterprise Plan

### Paket Özellikleri
- **Paket Bilgileri:**
  - Paket adı
  - Fiyat (Aylık/Yıllık)
  - Özellikler listesi
  - Test limiti
  - Depolama limiti
  - Destek seviyesi
  - Aktif/Pasif durumu

### İşlemler
- **Yeni paket oluştur**
- **Paket düzenle**
- **Paket sil**
- **Paket fiyatlarını güncelle**
- **Paket özelliklerini düzenle**
- **Paket istatistikleri:**
  - Kaç kullanıcı bu paketi kullanıyor
  - Toplam gelir
  - Dönüşüm oranı

---

## 💳 5. ÖDEME YÖNETİMİ (`/admin-panel/payments`)

### Özellikler
- **Ödeme Listesi:**
  - Tüm ödemeler
  - Filtreleme (Status, Date, Package, User)
  - Arama (User, Transaction ID)
- **Ödeme Detayları:**
  - Kullanıcı bilgileri
  - Paket bilgileri
  - Tutar
  - Ödeme yöntemi
  - Durum (Success, Pending, Failed)
  - Tarih
- **İşlemler:**
  - Ödeme detaylarını görüntüle
  - İade yap
  - Fatura oluştur
  - Export (CSV, PDF)

### İstatistikler
- Toplam gelir (Bugün, Bu Hafta, Bu Ay, Bu Yıl)
- Başarılı/Başarısız ödeme oranı
- Paket bazlı gelir dağılımı
- Ödeme yöntemi dağılımı

---

## 🏥 6. HASTANE YÖNETİMİ (`/admin-panel/hospitals`)

### Özellikler
- **Hastane Listesi:**
  - Tüm hastaneler
  - Filtreleme (Country, Status, Date)
  - Arama (Name, Email)
- **Hastane Detayları:**
  - Genel bilgiler
  - İletişim bilgileri
  - Doktor sayısı
  - Hasta sayısı
  - Test sayısı
  - Paket bilgisi
- **İşlemler:**
  - Yeni hastane ekle
  - Hastane düzenle
  - Hastane sil
  - Hastane aktif/pasif yap
  - Hastaneye doktor ata

---

## 👨‍⚕️ 7. DOKTOR YÖNETİMİ (`/admin-panel/doctors`)

### Özellikler
- **Doktor Listesi:**
  - Tüm doktorlar
  - Filtreleme (Hospital, Specialty, Status)
  - Arama (Name, Email, License)
- **Doktor Detayları:**
  - Genel bilgiler
  - Uzmanlık alanı
  - Lisans bilgileri
  - Bağlı olduğu hastane
  - Hasta sayısı
  - Test sayısı
  - Değerlendirmeler
- **İşlemler:**
  - Yeni doktor ekle
  - Doktor düzenle
  - Doktor sil
  - Doktor onay/red
  - Lisans doğrulama

---

## 📊 8. RAPORLAR (`/admin-panel/reports`)

### Rapor Türleri

#### Kullanıcı Raporları
- Kullanıcı büyüme raporu
- Rol bazlı kullanıcı dağılımı
- Ülke bazlı kullanıcı dağılımı
- Aktif/Pasif kullanıcı oranı
- Kullanıcı kayıt trendi

#### Test Raporları
- Günlük/Haftalık/Aylık test sayısı
- Test başarı oranı
- Doktor bazlı test dağılımı
- Hastane bazlı test dağılımı

#### Gelir Raporları
- Günlük/Haftalık/Aylık gelir
- Paket bazlı gelir dağılımı
- Ödeme yöntemi dağılımı
- Gelir trendi

#### Sistem Raporları
- Sistem performansı
- API kullanım istatistikleri
- Hata logları
- Kullanıcı aktivite raporu

### Export Seçenekleri
- PDF
- Excel
- CSV
- JSON

---

## 📝 9. AKTİVİTE LOGLARI (`/admin-panel/logs`)

### Log Türleri
- **User Logs:**
  - Login/Logout
  - Registration
  - Profile Update
  - Password Change
- **Test Logs:**
  - Test Created
  - Test Updated
  - Test Deleted
- **Payment Logs:**
  - Payment Success
  - Payment Failed
  - Refund
- **Admin Logs:**
  - Admin Actions
  - Settings Changed
  - User Modified

### Özellikler
- Filtreleme (Type, User, Date)
- Arama (User, Action)
- Real-time log görüntüleme
- Export (CSV, JSON)

---

## ⚙️ 10. SİSTEM AYARLARI (`/admin-panel/settings`)

### Genel Ayarlar
- Site adı
- Site logosu
- Site açıklaması
- İletişim bilgileri
- Sosyal medya linkleri
- Dil ayarları
- Zaman dilimi

### Email Ayarları
- SMTP Host
- SMTP Port
- SMTP Username
- SMTP Password
- From Email
- From Name
- Email şablonları

### Güvenlik Ayarları
- 2FA zorunluluğu
- Şifre politikası (min length, complexity)
- Session timeout
- IP whitelist/blacklist
- Rate limiting

### Ödeme Ayarları
- Stripe API Keys
- PayPal Credentials
- Ödeme yöntemleri (aktif/pasif)
- Vergi oranları
- Para birimi

### AI Model Ayarları
- Model versiyonu
- Model parametreleri
- Test limitleri
- API endpoints

### Bakım Modu
- Bakım modu aktif/pasif
- Bakım mesajı
- Bakım süresi

### Email Şablonları
- Hoş geldin emaili
- Şifre sıfırlama
- Test sonucu
- Ödeme onayı
- Abonelik hatırlatma

---

## 📧 11. EMAIL YÖNETİMİ (`/admin-panel/emails`)

### Özellikler
- **Email Gönder:**
  - Tek kullanıcıya
  - Toplu email (role göre, pakete göre)
  - Email şablonu seç
  - Custom email yaz
- **Email Geçmişi:**
  - Gönderilen tüm emailler
  - Durum (Sent, Failed, Pending)
  - Açılma oranı
  - Tıklama oranı
- **Email Şablonları:**
  - Şablon oluştur
  - Şablon düzenle
  - Şablon sil
  - Şablon önizleme

---

## 🔔 12. BİLDİRİM YÖNETİMİ (`/admin-panel/notifications`)

### Özellikler
- **Bildirim Gönder:**
  - Tek kullanıcıya
  - Toplu bildirim
  - Push notification
  - In-app notification
- **Bildirim Geçmişi:**
  - Gönderilen bildirimler
  - Durum
  - Okunma oranı
- **Bildirim Ayarları:**
  - Otomatik bildirimler
  - Bildirim şablonları

---

## 📱 13. MOBİL UYGULAMA YÖNETİMİ (`/admin-panel/mobile`)

### Özellikler
- **Versiyon Yönetimi:**
  - Mevcut versiyon
  - Zorunlu güncelleme
  - Güncelleme mesajı
- **Push Notification:**
  - Firebase ayarları
  - Test notification gönder
- **App Store Bilgileri:**
  - iOS versiyon
  - Android versiyon
  - Store linkleri

---

## 🎨 14. İÇERİK YÖNETİMİ (`/admin-panel/content`)

### Sayfalar
- **Landing Page:**
  - Hero section
  - Features
  - Testimonials
  - FAQ
- **About Page**
- **Contact Page**
- **Blog Posts:**
  - Yeni post ekle
  - Post düzenle
  - Post sil
  - Kategori yönetimi

---

## 🔒 15. GÜVENLİK (`/admin-panel/security`)

### Özellikler
- **Güvenlik Logları:**
  - Failed login attempts
  - Suspicious activities
  - IP blocks
- **Firewall Kuralları:**
  - IP whitelist
  - IP blacklist
  - Rate limiting rules
- **SSL/TLS:**
  - Sertifika durumu
  - Sertifika yenileme
- **Backup:**
  - Otomatik backup
  - Manuel backup
  - Backup restore

---

## 📈 16. ANALİTİK (`/admin-panel/analytics`)

### Özellikler
- **Google Analytics Entegrasyonu**
- **Custom Analytics:**
  - Sayfa görüntülenmeleri
  - Kullanıcı davranışları
  - Conversion tracking
  - Funnel analysis
- **Real-time Analytics:**
  - Aktif kullanıcılar
  - Aktif sayfalar
  - Trafik kaynakları

---

## 🎯 17. SIDEBAR MENÜ YAPISI

```
🏠 Dashboard
├── 👥 Users
│   ├── All Users
│   ├── Patients
│   ├── Doctors
│   ├── Hospitals
│   └── Authorized Personnel
├── 🧪 Tests
│   ├── All Tests
│   ├── Pending Tests
│   └── Test Analytics
├── 💰 Billing
│   ├── Packages
│   ├── Payments
│   ├── Invoices
│   └── Refunds
├── 🏥 Hospitals
│   ├── All Hospitals
│   ├── Add Hospital
│   └── Hospital Requests
├── 👨‍⚕️ Doctors
│   ├── All Doctors
│   ├── Doctor Requests
│   └── License Verification
├── 📊 Reports
│   ├── User Reports
│   ├── Test Reports
│   ├── Revenue Reports
│   └── System Reports
├── 📝 Logs
│   ├── Activity Logs
│   ├── Error Logs
│   └── Audit Logs
├── 📧 Communications
│   ├── Emails
│   ├── Notifications
│   └── Messages
├── 📱 Mobile App
│   ├── Version Management
│   ├── Push Notifications
│   └── App Settings
├── 🎨 Content
│   ├── Pages
│   ├── Blog
│   └── Media Library
├── 📈 Analytics
│   ├── Overview
│   ├── User Behavior
│   └── Conversion Tracking
├── 🔒 Security
│   ├── Security Logs
│   ├── Firewall
│   └── Backups
├── ⚙️ Settings
│   ├── General
│   ├── Email
│   ├── Payment
│   ├── Security
│   ├── AI Model
│   └── Maintenance
└── 🚪 Logout
```

---

## 🎨 TASARIM ÖZELLİKLERİ

### Renk Şeması
- **Primary:** Purple (#8B5CF6)
- **Secondary:** Pink (#EC4899)
- **Accent:** Blue (#3B82F6)
- **Success:** Green (#10B981)
- **Warning:** Yellow (#F59E0B)
- **Error:** Red (#EF4444)
- **Dark:** #1F2937
- **Light:** #F9FAFB

### Tipografi
- **Font:** Inter, system-ui
- **Headings:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Small:** 12-14px

### Componentler
- **Sidebar:** Fixed, collapsible
- **Topbar:** User info, notifications, search
- **Cards:** Glassmorphism effect
- **Tables:** Sortable, filterable, paginated
- **Charts:** Recharts library
- **Modals:** Smooth animations
- **Buttons:** Gradient, hover effects
- **Forms:** React Hook Form + Zod validation

---

## 🔧 TEKNİK DETAYLAR

### Frontend
- **Framework:** Next.js 14 App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Tables:** TanStack Table
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **State:** React Context / Zustand

### Backend API Endpoints (Gerekli)

```typescript
// Dashboard
GET /api/admin/stats
GET /api/admin/charts/users
GET /api/admin/charts/tests
GET /api/admin/charts/revenue
GET /api/admin/recent-activities

// Users
GET /api/admin/users
GET /api/admin/users/:id
PUT /api/admin/users/:id
DELETE /api/admin/users/:id
POST /api/admin/users/bulk-action
POST /api/admin/users/:id/reset-password
POST /api/admin/users/:id/send-email

// Tests
GET /api/admin/tests
GET /api/admin/tests/:id
DELETE /api/admin/tests/:id
POST /api/admin/tests/bulk-delete

// Packages
GET /api/admin/packages
POST /api/admin/packages
PUT /api/admin/packages/:id
DELETE /api/admin/packages/:id

// Payments
GET /api/admin/payments
GET /api/admin/payments/:id
POST /api/admin/payments/:id/refund

// Hospitals
GET /api/admin/hospitals
POST /api/admin/hospitals
PUT /api/admin/hospitals/:id
DELETE /api/admin/hospitals/:id

// Doctors
GET /api/admin/doctors
POST /api/admin/doctors
PUT /api/admin/doctors/:id
DELETE /api/admin/doctors/:id

// Reports
GET /api/admin/reports/users
GET /api/admin/reports/tests
GET /api/admin/reports/revenue
GET /api/admin/reports/system

// Logs
GET /api/admin/logs

// Settings
GET /api/admin/settings
PUT /api/admin/settings

// Emails
POST /api/admin/emails/send
GET /api/admin/emails/history

// Notifications
POST /api/admin/notifications/send
GET /api/admin/notifications/history
```

---

## 📁 DOSYA YAPISI

```
frontend/src/app/admin-panel/
├── page.tsx (Login)
├── layout.tsx (Admin Layout + Sidebar)
├── dashboard/
│   └── page.tsx
├── users/
│   ├── page.tsx
│   ├── [id]/
│   │   └── page.tsx
│   └── components/
│       ├── UserTable.tsx
│       ├── UserFilters.tsx
│       └── UserModal.tsx
├── tests/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── packages/
│   ├── page.tsx
│   └── components/
│       ├── PackageCard.tsx
│       └── PackageModal.tsx
├── payments/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── hospitals/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── doctors/
│   ├── page.tsx
│   └── [id]/
│       └── page.tsx
├── reports/
│   └── page.tsx
├── logs/
│   └── page.tsx
├── emails/
│   └── page.tsx
├── notifications/
│   └── page.tsx
├── mobile/
│   └── page.tsx
├── content/
│   └── page.tsx
├── analytics/
│   └── page.tsx
├── security/
│   └── page.tsx
├── settings/
│   └── page.tsx
└── components/
    ├── Sidebar.tsx
    ├── Topbar.tsx
    ├── StatsCard.tsx
    ├── Chart.tsx
    ├── DataTable.tsx
    └── ...
```

---

## ⏱️ UYGULAMA SÜRESİ

**Toplam Süre:** ~2-3 saat (Tüm özelliklerle)

**Aşama Aşama:**
1. Dashboard + Sidebar + Layout: 30 dakika
2. Kullanıcı Yönetimi: 30 dakika
3. Test Yönetimi: 20 dakika
4. Paket Yönetimi: 20 dakika
5. Ödeme Yönetimi: 20 dakika
6. Hastane/Doktor Yönetimi: 20 dakika
7. Raporlar: 20 dakika
8. Loglar: 15 dakika
9. Ayarlar: 20 dakika
10. Diğer sayfalar: 30 dakika

---

## ✅ ONAYINA SUNULUYOR

Bu ultra detaylı planı onaylıyor musun?

**Evet dersen:**
- Önce Dashboard + Sidebar + Layout yapacağım
- Sonra sırayla tüm sayfaları ekleyeceğim
- Her sayfa tam fonksiyonel olacak
- Modern, profesyonel tasarım
- Responsive (mobil uyumlu)
- Real-time data
- Export özellikleri

**ONAYLIYOR MUSUN?** 🚀
