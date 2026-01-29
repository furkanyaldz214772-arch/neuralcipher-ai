# 🧪 MOBİL UYGULAMA TEST REHBERİ - 29 OCAK 2026

## 🚀 HEMEN TEST ET

### 1️⃣ Tarayıcıyı Aç
```
http://localhost:8080
```

### 2️⃣ Ne Göreceksin?

#### Splash Screen (2 saniye)
```
┌─────────────────────────┐
│                         │
│    [Animasyonlu Logo]   │
│                         │
│     NeuralCipher        │
│                         │
│  AI-Powered Voice       │
│      Analysis           │
│                         │
│    [Loading Spinner]    │
│                         │
└─────────────────────────┘
```

#### Login Screen
```
┌─────────────────────────┐
│      [Logo]             │
│                         │
│   NeuralCipher          │
│   Parkinson Erken       │
│   Teşhis Sistemi        │
│                         │
│  ┌──────────────────┐   │
│  │ Email            │   │
│  └──────────────────┘   │
│                         │
│  ┌──────────────────┐   │
│  │ Şifre            │   │
│  └──────────────────┘   │
│                         │
│  [Şifremi Unuttum]      │
│                         │
│  [Giriş Yap]            │
│                         │
│  ─── veya ───           │
│                         │
│  [Hesap Oluştur]        │
│                         │
│  ┌──────────────────┐   │
│  │ Test Kullanıcıları│  │
│  │ hasta@test.com    │  │
│  │ Test123!          │  │
│  └──────────────────┘   │
└─────────────────────────┘
```

## 🧪 TEST SENARYOLARI

### ✅ Senaryo 1: Başarılı Login
```
1. Email: hasta@test.com
2. Şifre: Test123!
3. "Giriş Yap" tıkla
4. Beklenen: Loading spinner → Dashboard'a yönlendirme
5. Gerçek: Dashboard henüz yok, hata alacaksın (normal)
```

### ❌ Senaryo 2: Geçersiz Email
```
1. Email: gecersizemail
2. Şifre: Test123!
3. "Giriş Yap" tıkla
4. Beklenen: "Geçerli bir email girin" hatası
5. Gerçek: ✅ Hata gösteriliyor
```

### ❌ Senaryo 3: Kısa Şifre
```
1. Email: test@test.com
2. Şifre: 123
3. "Giriş Yap" tıkla
4. Beklenen: "Şifre en az 6 karakter olmalı" hatası
5. Gerçek: ✅ Hata gösteriliyor
```

### ❌ Senaryo 4: Boş Alanlar
```
1. Email: (boş)
2. Şifre: (boş)
3. "Giriş Yap" tıkla
4. Beklenen: "Email gerekli" ve "Şifre gerekli" hataları
5. Gerçek: ✅ Hatalar gösteriliyor
```

## 🎯 KONTROL LİSTESİ

### Görsel Kontroller
- [ ] Splash screen animasyonu düzgün çalışıyor
- [ ] Logo görünüyor
- [ ] Gradient background güzel
- [ ] Login formu düzgün görünüyor
- [ ] Butonlar tıklanabilir
- [ ] Input'lar yazılabiliyor
- [ ] Şifre göster/gizle çalışıyor

### Fonksiyonel Kontroller
- [ ] Email validation çalışıyor
- [ ] Şifre validation çalışıyor
- [ ] Error mesajları gösteriliyor
- [ ] Loading state çalışıyor
- [ ] Mock API yanıt veriyor (800ms delay)

### Responsive Kontroller
- [ ] Mobil viewport (428x926) doğru
- [ ] Telefon çerçevesi görünüyor
- [ ] Scroll çalışıyor
- [ ] Keyboard açılınca layout bozulmuyor

## 🐛 BİLİNEN SORUNLAR

### 1. Dashboard Yok
```
Durum: Login başarılı ama dashboard'a yönlendirme hata veriyor
Neden: Dashboard ekranı henüz yapılmadı
Çözüm: Normal, devam ediyoruz
```

### 2. Backend API 404
```
Durum: Railway backend /api/v1/* route'ları çalışmıyor
Neden: Deployment sorunu
Çözüm: Mock API kullanıyoruz (geçici)
```

### 3. Hot Reload Sorunu
```
Durum: flutter run -d chrome takılıyor
Neden: Chrome hot reload sorunu
Çözüm: Build + serve kullanıyoruz ✅
```

## 📊 PERFORMANS

### Build Süresi
```
flutter build web --release
Süre: ~53 saniye
Boyut: Optimize edildi
```

### Loading Süreleri
- Splash screen: 2 saniye
- Login API: 800ms (mock)
- Register API: 1200ms (mock)
- Profile API: 500ms (mock)

### Optimizasyonlar
- ✅ Tree-shaking (icon'lar)
- ✅ Font optimization
- ✅ Code splitting
- ✅ Lazy loading

## 🔧 SORUN GİDERME

### Uygulama Açılmıyor
```bash
# Server çalışıyor mu kontrol et
netstat -ano | findstr :8080

# Çalışmıyorsa başlat
cd neuralcipher-ai/neuralcipher_mobile/build/web
python -m http.server 8080
```

### Beyaz Sayfa Görünüyor
```bash
# Build'i yeniden yap
cd neuralcipher-ai/neuralcipher_mobile
flutter clean
flutter pub get
flutter build web --release

# Serve et
cd build/web
python -m http.server 8080
```

### Console Hataları
```
F12 → Console tab
Hataları oku ve raporla
```

## 📸 EKRAN GÖRÜNTÜLERİ NASIL ALINIR?

### 1. Tarayıcıda Aç
```
http://localhost:8080
```

### 2. F12 Aç (Developer Tools)
```
F12 → Console tab
```

### 3. Mobil Görünümü Aç
```
Ctrl + Shift + M
veya
F12 → Device toolbar icon
```

### 4. Ekran Görüntüsü Al
```
Windows: Win + Shift + S
Mac: Cmd + Shift + 4
```

## 🎨 TASARIM DETAYLARI

### Renkler (Hex)
```css
Primary:    #6366F1  /* Indigo */
Secondary:  #8B5CF6  /* Purple */
Success:    #10B981  /* Green */
Background: #0F172A  /* Dark Blue */
Card:       #1E293B  /* Slate */
Error:      #EF4444  /* Red */
Warning:    #F59E0B  /* Amber */
```

### Spacing
```css
Small:  8px
Medium: 16px
Large:  24px
XLarge: 48px
```

### Border Radius
```css
Small:  8px
Medium: 12px
Large:  55px (phone frame)
```

### Font Sizes
```css
Small:  12px
Body:   16px
Title:  24px
Hero:   36px
```

## 🚀 SONRAKI ADIMLAR

### 1. Backend API Düzelt
```
Railway dashboard → Logs → Redeploy
```

### 2. Dashboard Ekranı Yap
```dart
lib/features/dashboard/
├── presentation/
│   ├── screens/
│   │   └── dashboard_screen.dart
│   └── widgets/
│       ├── profile_card.dart
│       ├── recent_tests.dart
│       └── quick_actions.dart
```

### 3. Register Ekranı Tamamla
```dart
lib/features/auth/presentation/screens/
└── register_screen.dart
```

### 4. Recording Ekranı Yap
```dart
lib/features/recording/
├── presentation/
│   ├── screens/
│   │   └── recording_screen.dart
│   └── widgets/
│       ├── audio_recorder.dart
│       └── waveform.dart
```

## 📞 DESTEK

### Sorun mu var?
1. Logs'u kontrol et (F12 → Console)
2. Server çalışıyor mu kontrol et
3. Build'i yeniden yap
4. Hata mesajını raporla

### Başarılı mı?
1. Ekran görüntüsü al
2. Test senaryolarını dene
3. Feedback ver

---

**Test Durumu:** ✅ HAZIR
**Erişim:** http://localhost:8080
**Test Kullanıcı:** hasta@test.com / Test123!
**Beklenen Süre:** 5-10 dakika
