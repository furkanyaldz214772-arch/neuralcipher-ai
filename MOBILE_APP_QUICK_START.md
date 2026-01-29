# 🚀 NeuralCipher Mobile - Hızlı Başlangıç Rehberi

**Hedef:** 30 dakikada ilk ekranı çalıştır!

---

## ⚡ HIZLI KURULUM (Windows)

### Adım 1: Flutter Kurulumu (10 dk)

```powershell
# 1. Flutter SDK indir
# https://docs.flutter.dev/get-started/install/windows
# flutter_windows_3.16.0-stable.zip indir

# 2. C:\src\flutter klasörüne çıkart

# 3. PATH'e ekle
# Sistem Özellikleri → Gelişmiş → Ortam Değişkenleri
# Path → Düzenle → Yeni → C:\src\flutter\bin

# 4. Kontrol et
flutter doctor
```

**Beklenen Çıktı:**
```
Doctor summary (to see all details, run flutter doctor -v):
[✓] Flutter (Channel stable, 3.16.0)
[✓] Windows Version (Installed version of Windows is version 10 or higher)
[!] Android toolchain - develop for Android devices
[!] Chrome - develop for the web
[✓] Visual Studio
[✓] VS Code
```

### Adım 2: Android Studio (10 dk)

```powershell
# 1. Android Studio indir
# https://developer.android.com/studio

# 2. Kur ve aç

# 3. SDK Manager → SDK Tools
# ✓ Android SDK Command-line Tools
# ✓ Android Emulator
# ✓ Android SDK Platform-Tools

# 4. Flutter plugin kur
# File → Settings → Plugins → "Flutter" ara → Install

# 5. Kontrol et
flutter doctor --android-licenses  # Tümüne "y" de
flutter doctor  # Android toolchain ✓ olmalı
```

### Adım 3: Proje Oluştur (5 dk)

```powershell
# Proje klasörüne git
cd neuralcipher-ai

# Yeni Flutter projesi
flutter create neuralcipher_mobile

# Klasöre gir
cd neuralcipher_mobile

# Bağımlılıkları ekle
```

**pubspec.yaml** dosyasını düzenle:
```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  flutter_riverpod: ^2.4.9
  
  # UI
  google_fonts: ^6.1.0
  lottie: ^3.0.0
  fl_chart: ^0.66.0
  
  # Audio
  record: ^5.0.4
  just_audio: ^0.9.36
  permission_handler: ^11.1.0
  
  # Network
  dio: ^5.4.0
  
  # Storage
  flutter_secure_storage: ^9.0.0
  hive_flutter: ^1.1.0
  
  # Auth
  local_auth: ^2.1.7
```

```powershell
# Bağımlılıkları yükle
flutter pub get
```

### Adım 4: İlk Çalıştırma (5 dk)

**Seçenek A: Web Preview (En Hızlı)**
```powershell
flutter run -d chrome
```

**Seçenek B: Android Emulator**
```powershell
# Emulator oluştur
# Android Studio → Tools → Device Manager → Create Device
# Pixel 6 Pro → API 33 → Finish

# Emulator başlat
flutter emulators
flutter emulators --launch <emulator_id>

# Uygulamayı çalıştır
flutter run
```

---

## 🎨 İLK EKRANI OLUŞTUR

### Splash Screen (5 dk)

**lib/main.dart** dosyasını değiştir:

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

void main() {
  runApp(const NeuralCipherApp());
}

class NeuralCipherApp extends StatelessWidget {
  const NeuralCipherApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'NeuralCipher',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF6366F1),
          brightness: Brightness.dark,
        ),
        textTheme: GoogleFonts.interTextTheme(),
        useMaterial3: true,
      ),
      home: const SplashScreen(),
    );
  }
}

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _scaleAnimation;
  late Animation<double> _opacityAnimation;

  @override
  void initState() {
    super.initState();
    
    _controller = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _scaleAnimation = Tween<double>(begin: 0.5, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeOutBack),
    );

    _opacityAnimation = Tween<double>(begin: 0.0, end: 1.0).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeIn),
    );

    _controller.forward();

    // 2 saniye sonra login ekranına git
    Future.delayed(const Duration(seconds: 2), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const LoginScreen()),
      );
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              const Color(0xFF6366F1),
              const Color(0xFF8B5CF6),
              const Color(0xFF10B981),
            ],
          ),
        ),
        child: Center(
          child: AnimatedBuilder(
            animation: _controller,
            builder: (context, child) {
              return Opacity(
                opacity: _opacityAnimation.value,
                child: Transform.scale(
                  scale: _scaleAnimation.value,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // Logo (şimdilik icon)
                      Container(
                        width: 120,
                        height: 120,
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.2),
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(
                          Icons.graphic_eq,
                          size: 60,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 24),
                      Text(
                        'NeuralCipher',
                        style: GoogleFonts.inter(
                          fontSize: 32,
                          fontWeight: FontWeight.bold,
                          color: Colors.white,
                        ),
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'AI-Powered Voice Analysis',
                        style: GoogleFonts.inter(
                          fontSize: 16,
                          color: Colors.white.withOpacity(0.8),
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
      ),
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Login'),
        backgroundColor: Colors.transparent,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Welcome Back!',
                style: GoogleFonts.inter(
                  fontSize: 28,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 40),
              TextField(
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: const Icon(Icons.email),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                obscureText: true,
                decoration: InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  prefixIcon: const Icon(Icons.lock),
                ),
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 56,
                child: ElevatedButton(
                  onPressed: () {
                    // TODO: Backend bağlantısı
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Login clicked!')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color(0xFF6366F1),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                  ),
                  child: Text(
                    'Login',
                    style: GoogleFonts.inter(
                      fontSize: 18,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
```

### Çalıştır!

```powershell
# Hot reload aktif
flutter run

# Değişiklik yap, kaydet
# Otomatik güncellenir (r tuşu)
```

---

## 🌐 BACKEND BAĞLANTISI

### API Service Oluştur

**lib/core/services/api_service.dart:**

```dart
import 'package:dio/dio.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class ApiService {
  static const String baseUrl = 'https://neuralcipher-backend.railway.app/api/v1';
  final Dio _dio = Dio();
  final FlutterSecureStorage _storage = const FlutterSecureStorage();

  ApiService() {
    _dio.options.baseUrl = baseUrl;
    _dio.options.connectTimeout = const Duration(seconds: 30);
    _dio.options.receiveTimeout = const Duration(seconds: 30);
  }

  // Login
  Future<Map<String, dynamic>> login(String email, String password) async {
    try {
      final response = await _dio.post('/auth/login', data: {
        'email': email,
        'password': password,
      });

      // Token kaydet
      if (response.data['access_token'] != null) {
        await _storage.write(
          key: 'access_token',
          value: response.data['access_token'],
        );
      }

      return response.data;
    } on DioException catch (e) {
      throw Exception('Login failed: ${e.message}');
    }
  }

  // Get current user
  Future<Map<String, dynamic>> getCurrentUser() async {
    final token = await _storage.read(key: 'access_token');
    
    final response = await _dio.get(
      '/profile/me',
      options: Options(
        headers: {'Authorization': 'Bearer $token'},
      ),
    );

    return response.data;
  }
}
```

### Login Ekranını Güncelle

```dart
// LoginScreen içinde
final ApiService _api = ApiService();

ElevatedButton(
  onPressed: () async {
    try {
      final result = await _api.login(
        emailController.text,
        passwordController.text,
      );
      
      // Başarılı, dashboard'a git
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  },
  child: const Text('Login'),
),
```

---

## 🧪 TEST ET

### Web ile Aynı Kullanıcı

```dart
// Test kullanıcısı (web'den)
Email: hasta@test.com
Password: Test123!

// Login yap
// Backend'den token al
// Profile bilgilerini çek
```

### Veritabanı Kontrolü

```sql
-- Railway PostgreSQL'de
SELECT * FROM users WHERE email = 'hasta@test.com';

-- Mobile'dan login sonrası
-- Aynı user_id'yi göreceksin
```

---

## 📱 ÖNİZLEME SEÇENEKLERİ

### 1. Web Preview (Şu An)
```powershell
flutter run -d chrome
```
**Artılar:** Hızlı, kolay  
**Eksiler:** Ses kaydı sınırlı

### 2. Android Emulator (Önerilen)
```powershell
flutter run
```
**Artılar:** Tam özellikler  
**Eksiler:** Biraz yavaş

### 3. Fiziksel Telefon (En İyi)
```powershell
# USB Debugging aç
# Telefonu bağla
flutter run
```
**Artılar:** Gerçek deneyim  
**Eksiler:** Kablo gerekli

---

## 🎯 SONRAKI ADIMLAR

### Bugün
- [x] Flutter kurulumu
- [x] İlk ekran çalıştırma
- [ ] Backend bağlantısı test

### Bu Hafta
- [ ] Dashboard tasarımı
- [ ] Ses kaydı prototipi
- [ ] Spektrogram gösterimi

### Gelecek Hafta
- [ ] Test upload
- [ ] Sonuç ekranı
- [ ] Offline destek

---

## 🆘 SORUN GİDERME

### Flutter doctor hataları
```powershell
# Android lisansları
flutter doctor --android-licenses

# VS Code plugin
code --install-extension Dart-Code.flutter
```

### Emulator başlamıyor
```powershell
# HAXM kur (Intel CPU)
# Hyper-V kapat (AMD CPU)
# BIOS'ta virtualization aç
```

### Hot reload çalışmıyor
```powershell
# Uygulamayı kapat
flutter clean
flutter pub get
flutter run
```

---

## 📚 KAYNAKLAR

**Dokümantasyon:**
- Flutter: https://flutter.dev/docs
- Riverpod: https://riverpod.dev
- Dio: https://pub.dev/packages/dio

**Video Tutorials:**
- Flutter Basics: https://www.youtube.com/c/FlutterDev
- State Management: https://www.youtube.com/watch?v=KjE2IDphA_U

**Topluluk:**
- Discord: https://discord.gg/flutter
- Stack Overflow: [flutter] tag

---

**Hazır mısın? Başlayalım! 🚀**

```powershell
flutter create neuralcipher_mobile
cd neuralcipher_mobile
flutter run -d chrome
```
