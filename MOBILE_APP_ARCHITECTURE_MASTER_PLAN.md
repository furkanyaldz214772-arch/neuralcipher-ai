# 🏗️ NeuralCipher Mobile App - Mimari Master Plan
**Tarih:** 29 Ocak 2026  
**Versiyon:** 1.0  
**Durum:** Planlama Aşaması

---

## 📋 İÇİNDEKİLER

1. [Genel Bakış](#genel-bakış)
2. [Teknik Mimari](#teknik-mimari)
3. [Veritabanı Stratejisi](#veritabanı-stratejisi)
4. [Web Entegrasyonu](#web-entegrasyonu)
5. [Geliştirme Planı](#geliştirme-planı)
6. [Önizleme Stratejisi](#önizleme-stratejisi)
7. [Yatırımcı Sunumu](#yatırımcı-sunumu)

---

## � GENEL BAKIŞ

### Proje Hedefi
Web platformu ile **aynı veritabanını** kullanan, iOS ve Android'de çalışan, yatırımcıları etkileyecek seviyede profesyonel bir mobil uygulama.

### Temel Prensipler
✅ **Tek Veritabanı:** Web ve mobil aynı PostgreSQL veritabanını kullanır  
✅ **Gerçek Zamanlı Senkronizasyon:** Anlık veri güncellemeleri  
✅ **Offline-First:** İnternet olmadan da çalışır  
✅ **Native Performans:** Flutter ile 60 FPS smooth animasyonlar  
✅ **Güvenlik:** End-to-end encryption + HIPAA uyumlu

---

## 🏛️ TEKNİK MİMARİ

### Sistem Mimarisi

```
┌─────────────────────────────────────────────────────────┐
│                    KULLANICI KATMANI                     │
├─────────────────────────────────────────────────────────┤
│  iOS App (Flutter)  │  Android App (Flutter)  │  Web    │
└──────────┬──────────┴──────────┬───────────────┴────┬───┘
           │                     │                     │
           └─────────────────────┼─────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   API GATEWAY LAYER     │
                    │  (Railway Backend)      │
                    │  FastAPI + Python       │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   BUSINESS LOGIC        │
                    ├─────────────────────────┤
                    │ • Auth Service          │
                    │ • ML Service            │
                    │ • Audio Processing      │
                    │ • Report Generation     │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │   DATA LAYER            │
                    ├─────────────────────────┤
                    │ PostgreSQL (Railway)    │
                    │ • Users                 │
                    │ • Tests                 │
                    │ • Reports               │
                    │ • Doctor-Patient Links  │
                    └─────────────────────────┘
```

### Flutter Uygulama Mimarisi

```
neuralcipher_mobile/
├── lib/
│   ├── main.dart                    # Entry point
│   │
│   ├── core/                        # Çekirdek servisler
│   │   ├── constants/
│   │   │   ├── api_endpoints.dart   # Backend URL'leri
│   │   │   ├── colors.dart
│   │   │   └── text_styles.dart
│   │   │
│   │   ├── services/
│   │   │   ├── api_service.dart     # HTTP istekleri
│   │   │   ├── auth_service.dart    # Token yönetimi
│   │   │   ├── audio_service.dart   # Ses kaydı
│   │   │   ├── sync_service.dart    # Offline sync
│   │   │   └── storage_service.dart # Local cache
│   │   │
│   │   └── utils/
│   │       ├── validators.dart
│   │       └── encryption.dart      # AES-256
│   │
│   ├── features/                    # Özellik modülleri
│   │   ├── onboarding/
│   │   │   ├── screens/
│   │   │   │   ├── splash_screen.dart
│   │   │   │   └── onboarding_screen.dart
│   │   │   └── widgets/
│   │   │
│   │   ├── auth/
│   │   │   ├── screens/
│   │   │   │   ├── login_screen.dart
│   │   │   │   └── register_screen.dart
│   │   │   └── providers/
│   │   │       └── auth_provider.dart  # Riverpod state
│   │   │
│   │   ├── recording/
│   │   │   ├── screens/
│   │   │   │   ├── dashboard_screen.dart
│   │   │   │   ├── recording_screen.dart
│   │   │   │   └── results_screen.dart
│   │   │   ├── widgets/
│   │   │   │   ├── spectrogram_widget.dart
│   │   │   │   └── audio_visualizer.dart
│   │   │   └── providers/
│   │   │       └── recording_provider.dart
│   │   │
│   │   └── profile/
│   │       └── screens/
│   │           └── profile_screen.dart
│   │
│   └── shared/                      # Paylaşılan bileşenler
│       └── widgets/
│           ├── custom_button.dart
│           └── loading_indicator.dart
│
├── assets/
│   ├── images/
│   ├── animations/                  # Lottie JSON
│   └── fonts/
│
└── test/                            # Unit & Widget testler
```

---

## 🗄️ VERİTABANI STRATEJİSİ

### Mevcut Web Veritabanı (Railway PostgreSQL)

**Tablo Yapısı:**
```sql
-- Users tablosu (Zaten mevcut)
users
├── id (UUID)
├── email
├── password_hash
├── role (patient/doctor/hospital/admin)
├── full_name
├── phone
├── access_key (Hasta için)
└── created_at

-- Tests tablosu (Zaten mevcut)
tests
├── id (UUID)
├── user_id (FK → users)
├── audio_file_path
├── test_type (quick/detailed/clinical)
├── duration_seconds
├── risk_score (0-100)
├── ai_analysis (JSONB)
└── created_at

-- Doctor-Patient ilişkisi (Zaten mevcut)
doctor_patients
├── doctor_id (FK → users)
├── patient_id (FK → users)
└── access_granted_at
```

### Mobil Uygulama İçin Ek Tablolar

```sql
-- Offline senkronizasyon için
CREATE TABLE sync_queue (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    action_type VARCHAR(50),  -- 'upload_test', 'update_profile'
    data JSONB,
    status VARCHAR(20),       -- 'pending', 'synced', 'failed'
    created_at TIMESTAMP,
    synced_at TIMESTAMP
);

-- Push notification tokens
CREATE TABLE device_tokens (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    device_type VARCHAR(20),  -- 'ios', 'android'
    fcm_token TEXT,
    last_active TIMESTAMP
);

-- Lokal cache metadata
CREATE TABLE cache_metadata (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    resource_type VARCHAR(50),
    last_sync TIMESTAMP,
    version INTEGER
);
```

### Veri Akışı

```
┌─────────────────┐
│  Mobile App     │
│  (Flutter)      │
└────────┬────────┘
         │
         │ 1. Login (JWT Token)
         ▼
┌─────────────────┐
│  Railway API    │
│  /api/v1/auth   │
└────────┬────────┘
         │
         │ 2. Token Validation
         ▼
┌─────────────────┐
│  PostgreSQL     │
│  users table    │
└────────┬────────┘
         │
         │ 3. Return User Data
         ▼
┌─────────────────┐
│  Mobile App     │
│  (Local Cache)  │
└─────────────────┘
```

---

## 🌐 WEB ENTEGRASYONU

### API Endpoint'leri (Mevcut Backend)

**Base URL:** `https://neuralcipher-backend.railway.app/api/v1`

#### Auth Endpoints
```dart
// Login
POST /auth/login
Body: { "email": "...", "password": "..." }
Response: { "access_token": "...", "user": {...} }

// Register
POST /auth/register
Body: { "email": "...", "password": "...", "role": "patient" }

// Refresh Token
POST /auth/refresh
Headers: { "Authorization": "Bearer <token>" }
```

#### Test Endpoints
```dart
// Upload ses dosyası
POST /tests/upload
Headers: { "Authorization": "Bearer <token>" }
Body: FormData(audio_file, test_type, duration)
Response: { "test_id": "...", "status": "processing" }

// Test sonuçlarını al
GET /tests/{test_id}
Response: { "risk_score": 87, "ai_analysis": {...} }

// Kullanıcının tüm testleri
GET /tests/my-tests
Response: [ {...}, {...} ]
```

#### Profile Endpoints
```dart
// Profil bilgileri
GET /profile/me
Response: { "id": "...", "email": "...", "full_name": "..." }

// Profil güncelle
PUT /profile/me
Body: { "full_name": "...", "phone": "..." }
```

### Flutter API Service Implementasyonu

```dart
// lib/core/services/api_service.dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static const String baseUrl = 'https://neuralcipher-backend.railway.app/api/v1';
  final Dio _dio = Dio();
  final FlutterSecureStorage _storage = FlutterSecureStorage();

  ApiService() {
    _dio.options.baseUrl = baseUrl;
    _dio.options.connectTimeout = Duration(seconds: 30);
    
    // Interceptor: Her istekte token ekle
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) async {
        final token = await _storage.read(key: 'access_token');
        if (token != null) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
      onError: (error, handler) async {
        // 401 hatası: Token expired, refresh yap
        if (error.response?.statusCode == 401) {
          await _refreshToken();
          return handler.resolve(await _retry(error.requestOptions));
        }
        return handler.next(error);
      },
    ));
  }

  // Login
  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    
    // Token'ı güvenli depola
    await _storage.write(key: 'access_token', value: response.data['access_token']);
    return response.data;
  }

  // Test upload
  Future<String> uploadTest(File audioFile, String testType, int duration) async {
    FormData formData = FormData.fromMap({
      'audio_file': await MultipartFile.fromFile(audioFile.path),
      'test_type': testType,
      'duration': duration,
    });

    final response = await _dio.post('/tests/upload', data: formData);
    return response.data['test_id'];
  }

  // Test sonuçları
  Future<Map<String, dynamic>> getTestResults(String testId) async {
    final response = await _dio.get('/tests/$testId');
    return response.data;
  }
}
```

### Offline-First Stratejisi

```dart
// lib/core/services/sync_service.dart
class SyncService {
  final ApiService _api;
  final DatabaseService _db;

  // Offline test kaydet
  Future<void> saveTestOffline(AudioFile file, String testType) async {
    await _db.insertPendingTest({
      'id': Uuid().v4(),
      'audio_path': file.path,
      'test_type': testType,
      'status': 'pending',
      'created_at': DateTime.now().toIso8601String(),
    });
  }

  // İnternet gelince senkronize et
  Future<void> syncPendingTests() async {
    final pendingTests = await _db.getPendingTests();
    
    for (var test in pendingTests) {
      try {
        final testId = await _api.uploadTest(
          File(test['audio_path']),
          test['test_type'],
          test['duration'],
        );
        
        // Başarılı, local'den sil
        await _db.deletePendingTest(test['id']);
        
        // Sonuçları çek ve kaydet
        final results = await _api.getTestResults(testId);
        await _db.insertTestResult(results);
      } catch (e) {
        // Hata, tekrar dene
        print('Sync failed: $e');
      }
    }
  }
}
```

---

## 🚀 GELİŞTİRME PLANI

### Faz 1: Temel Altyapı (Hafta 1)
**Hedef:** Backend bağlantısı ve auth sistemi

**Görevler:**
- [ ] Flutter projesi oluştur
- [ ] API service implementasyonu
- [ ] Login/Register ekranları
- [ ] Token yönetimi (JWT)
- [ ] Secure storage entegrasyonu

**Test:**
```bash
# Web'deki mevcut kullanıcı ile giriş yap
flutter run
# Login: hasta@test.com / Test123!
```

### Faz 2: Ses Kaydı (Hafta 2)
**Hedef:** Mikrofon erişimi ve spektrogram

**Görevler:**
- [ ] Mikrofon izni (iOS/Android)
- [ ] Ses kaydı (record package)
- [ ] Real-time spektrogram (FFT)
- [ ] Geri sayım timer
- [ ] AI feedback gösterimi

**Test:**
```bash
# 10 saniyelik test kaydı yap
# Backend'e upload et
# Sonuçları kontrol et
```

### Faz 3: Backend Entegrasyonu (Hafta 3)
**Hedef:** Test upload ve sonuç alma

**Görevler:**
- [ ] FormData ile ses dosyası upload
- [ ] Polling ile sonuç bekleme
- [ ] Sonuç ekranı tasarımı
- [ ] PDF export
- [ ] Doktora paylaşım

**Test:**
```bash
# Web panelinden aynı testi kontrol et
# Veritabanında aynı test_id'yi gör
```

### Faz 4: Offline Destek (Hafta 4)
**Hedef:** İnternet olmadan çalışma

**Görevler:**
- [ ] SQLite local database
- [ ] Sync queue implementasyonu
- [ ] Background sync (WorkManager)
- [ ] Conflict resolution

**Test:**
```bash
# Uçak modunda test kaydet
# İnternet aç, otomatik sync olsun
```

### Faz 5: Polish & Test (Hafta 5-6)
**Hedef:** Yayına hazır hale getir

**Görevler:**
- [ ] Animasyonlar (Lottie)
- [ ] Haptic feedback
- [ ] Push notifications
- [ ] Biometric auth (Face ID/Touch ID)
- [ ] Beta test (TestFlight/Play Console)

---

## 👀 ÖNİZLEME STRATEJİSİ

### Seçenek 1: Web Preview (Hızlı Test)

**Avantajlar:**
✅ Anında başla (Flutter kurulumu yeterli)  
✅ Hot reload ile hızlı iterasyon  
✅ Chrome DevTools ile debug

**Dezavantajlar:**
❌ Ses kaydı sınırlı (browser API)  
❌ Native özellikler yok (Face ID, haptic)

**Kullanım:**
```bash
cd neuralcipher-ai
flutter create neuralcipher_mobile
cd neuralcipher_mobile
flutter run -d chrome
```

### Seçenek 2: Android Emulator (Önerilen)

**Avantajlar:**
✅ Tam native özellikler  
✅ Ses kaydı çalışır  
✅ Windows/Mac/Linux'ta çalışır

**Kurulum:**
```bash
# Android Studio yükle
# AVD Manager → Create Virtual Device
# Pixel 6 Pro (API 33) seç

# Emulator başlat
flutter emulators --launch <emulator_id>

# Uygulamayı çalıştır
flutter run
```

### Seçenek 3: Fiziksel Cihaz (En İyi)

**iOS (iPhone):**
```bash
# Mac gerekli
# Xcode yükle
# iPhone'u USB ile bağla
# Developer hesabı ekle (ücretsiz)

flutter run
```

**Android:**
```bash
# USB Debugging aç
# Ayarlar → Geliştirici Seçenekleri → USB Debugging

# Cihazı kontrol et
flutter devices

# Çalıştır
flutter run
```

### Önizleme Ekranları

**1. Splash Screen (1.5sn)**
```
┌─────────────────────┐
│                     │
│                     │
│    [NeuralCipher]   │
│    [Logo + Pulse]   │
│                     │
│                     │
└─────────────────────┘
```

**2. Dashboard**
```
┌─────────────────────┐
│ 👤 Merhaba, Ahmet  │
│ Sağlık Skoru: 87   │
│ [Circular Progress] │
├─────────────────────┤
│ ⚡ Hızlı Tarama     │
│ 🔬 Detaylı Analiz   │
│ 🏥 Klinik Seviye    │
├─────────────────────┤
│ 📈 Geçmiş Analizler │
└─────────────────────┘
```

**3. Kayıt Ekranı**
```
┌─────────────────────┐
│ ← Geri             │
├─────────────────────┤
│   [Mikrofon İkon]   │
│   [Spektrogram]     │
│   ⏱️ 02:45 / 03:00  │
│   [Progress Bar]    │
│                     │
│ 💡 Ses kalitesi ✓  │
│                     │
│ [⏸️ Duraklat]       │
└─────────────────────┘
```

---

## � YATIRIMCI SUNUMU

### Demo Senaryosu (5 Dakika)

**Dakika 1: Problem**
> "Parkinson hastalığı 10 milyon kişiyi etkiliyor. Erken teşhis hayat kurtarır ama pahalı ve zor erişilebilir."

**Dakika 2: Çözüm**
> "NeuralCipher: Telefonunuzdan 10 saniyede AI destekli Parkinson risk analizi."

**Dakika 3: Canlı Demo**
1. Uygulamayı aç (Splash animasyonu)
2. Login yap (Biometric auth)
3. "Hızlı Tarama" seç
4. 10 saniye konuş (Spektrogram göster)
5. Sonuçları göster (Risk skoru + AI analizi)
6. PDF export (QR kod ile doğrulama)

**Dakika 4: Teknoloji**
> "Flutter ile native performans, Railway'de ölçeklenebilir backend, HIPAA uyumlu güvenlik."

**Dakika 5: Traction**
> "Web platformu canlı, 100+ test kullanıcısı, %94.2 AI doğruluğu, mobil beta hazır."

### Wow Faktörleri

1. **Real-Time Spektrogram**
   - Konuşurken frekans görselleştirmesi
   - Renkli, akıcı, etkileyici

2. **AI Feedback**
   - "Ses kalitesi mükemmel ✓"
   - "Ortam gürültüsü düşük ✓"
   - Anlık geri bildirim

3. **Offline-First**
   - İnternet olmadan çalışır
   - Otomatik senkronizasyon
   - Hiç veri kaybı yok

4. **Cross-Platform Sync**
   - Mobilde test yap
   - Web'de sonuçları gör
   - Doktor panelinde paylaş

5. **Security**
   - End-to-end encryption
   - Biometric auth
   - HIPAA compliant

### Metrikler (Yatırımcı İçin)

**Teknik:**
- 60 FPS animasyonlar
- <2 saniye uygulama açılış
- <5 saniye test upload
- %99.9 uptime (Railway)

**Kullanıcı:**
- 3 adımda test tamamlama
- 10 saniye kayıt süresi
- Anında sonuç
- Offline çalışma

**İş:**
- Tek codebase (iOS + Android)
- %50 daha az geliştirme maliyeti
- Hızlı iterasyon (hot reload)
- Kolay ölçeklendirme

---

## 📊 SONRAKI ADIMLAR

### Hemen Yapılacaklar (Bu Hafta)

1. **Flutter Kurulumu**
   ```bash
   # Flutter SDK indir
   # Android Studio/Xcode kur
   # flutter doctor çalıştır
   ```

2. **Proje Oluştur**
   ```bash
   cd neuralcipher-ai
   flutter create neuralcipher_mobile
   cd neuralcipher_mobile
   ```

3. **İlk Ekranı Çalıştır**
   ```bash
   # Splash screen + Login
   flutter run -d chrome  # Web preview
   ```

4. **Backend Bağlantısı Test**
   ```dart
   // Mevcut Railway API'ye bağlan
   // Login endpoint test et
   // Token al ve kaydet
   ```

### Bu Ay (Ocak Sonu)

- [ ] Auth sistemi tamamla
- [ ] Dashboard tasarımı
- [ ] Ses kaydı prototipi
- [ ] Web ile senkronizasyon testi

### Gelecek Ay (Şubat)

- [ ] Tüm özellikler tamamla
- [ ] Beta test başlat
- [ ] App Store/Play Store başvurusu
- [ ] Yatırımcı demo hazır

---

## 🎯 BAŞARI KRİTERLERİ

### Teknik
✅ Web ile aynı veritabanı kullanımı  
✅ Offline-first çalışma  
✅ 60 FPS animasyonlar  
✅ <3 saniye uygulama açılış  
✅ %100 feature parity (web ile)

### Kullanıcı Deneyimi
✅ 3 adımda test tamamlama  
✅ Sezgisel arayüz  
✅ Smooth animasyonlar  
✅ Anlaşılır AI feedback  
✅ Kolay doktor paylaşımı

### İş Hedefleri
✅ Yatırımcı demo hazır  
✅ Beta kullanıcıları pozitif feedback  
✅ App Store/Play Store onayı  
✅ Ölçeklenebilir mimari  
✅ Düşük bakım maliyeti

---

## � İLETİŞİM & DESTEK

**Geliştirici Dokümantasyonu:**
- Flutter: https://flutter.dev/docs
- Railway API: https://neuralcipher-backend.railway.app/docs
- Riverpod: https://riverpod.dev

**Topluluk:**
- Flutter Discord
- Stack Overflow
- GitHub Issues

---

**Hazırlayan:** Kiro AI  
**Son Güncelleme:** 29 Ocak 2026  
**Durum:** ✅ Planlama Tamamlandı - Geliştirme Başlayabilir
