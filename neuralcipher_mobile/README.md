# 📱 NeuralCipher.ai Mobile App

**Nörolojik Sağlık Tarama Mobil Uygulaması**

[![Flutter](https://img.shields.io/badge/Flutter-3.38.1-blue.svg)](https://flutter.dev)
[![Dart](https://img.shields.io/badge/Dart-3.10.0-blue.svg)](https://dart.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

NeuralCipher.ai, akıllı telefon ile ses kaydı yaparak Parkinson hastalığı riskini değerlendiren bir Clinical Decision Support (CDS) uygulamasıdır.

---

## 🎯 Özellikler

### ✅ Tamamlanan
- **Medical-Grade Audio Recording**
  - 44.1 kHz sample rate
  - 16-bit depth
  - WAV format (Linear PCM)
  - Mono channel
  - 5 seconds duration
- **Real-time Waveform Visualization** (30 FPS)
- **State Management** (Provider pattern)
- **Permission Handling** (Microphone, Storage)
- **Clean Architecture** (Scalable, maintainable)

### 🔄 Geliştiriliyor
- API Integration (Backend connectivity)
- Results Display (Risk score visualization)
- Test History (SQLite storage)
- Offline Mode (Queue & sync)
- Pre-flight Checks (Environment validation)

---

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Flutter SDK 3.19+
- Dart 3.3+
- Android Studio / Xcode
- Android SDK 21+ / iOS 13.0+

### Kurulum

```bash
# 1. Repository'yi klonlayın
cd neuralcipher-ai/neuralcipher_mobile

# 2. Dependencies yükleyin
flutter pub get

# 3. Uygulamayı çalıştırın
flutter run
```

### Backend Bağlantısı

Backend'in çalıştığından emin olun:

```bash
# Backend klasöründe
cd ../backend
python simple_start.py

# Backend: http://localhost:8000
```

---

## 📁 Proje Yapısı

```
lib/
├── main.dart                          # App entry point
├── app/
│   └── theme.dart                     # Theme configuration
├── core/
│   ├── constants/                     # App-wide constants
│   │   ├── api_constants.dart
│   │   ├── audio_constants.dart
│   │   └── app_constants.dart
│   ├── errors/                        # Error handling
│   │   ├── failures.dart
│   │   └── exceptions.dart
│   ├── network/                       # HTTP client
│   │   └── dio_client.dart
│   └── services/                      # Core services
│       ├── audio_service.dart         # Audio recording
│       ├── permission_service.dart    # Permissions
│       └── storage_service.dart       # Local storage
├── features/                          # Feature modules
│   └── recording/
│       ├── domain/                    # Business logic
│       ├── data/                      # Data layer
│       └── presentation/              # UI layer
│           ├── providers/
│           │   └── recording_provider.dart
│           ├── screens/
│           │   └── recording_screen.dart
│           └── widgets/
│               └── waveform_visualizer.dart
└── shared/                            # Shared components
    ├── widgets/
    └── extensions/
```

---

## 🎨 Mimari

### Clean Architecture

```
┌─────────────────────────────────────┐
│         PRESENTATION                │
│  (Screens, Widgets, Providers)      │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│           DOMAIN                    │
│  (Entities, Use Cases, Repos)       │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│            DATA                     │
│  (Models, Data Sources, Repos Impl) │
└─────────────────────────────────────┘
```

### State Management

**Provider Pattern:**
- Simple and effective
- Recommended by Flutter team
- Easy to test
- Good performance

---

## 🔊 Audio Recording

### Medical-Grade Specifications

```dart
AudioConfig(
  encoder: AudioEncoder.wav,      // WAV format
  sampleRate: 44100,               // 44.1 kHz
  bitRate: 705600,                 // 16-bit * 44.1kHz
  numChannels: 1,                  // Mono
)
```

### Recording Flow

```
1. Check Permissions
2. Initialize AudioService
3. Start Recording (5 seconds)
4. Monitor Amplitude (30 FPS)
5. Auto-stop Timer
6. Validate File
7. Return File Path
```

### Waveform Visualization

- **Update Rate:** 30 FPS
- **Amplitude Range:** 0.0 - 1.0 (normalized)
- **Rendering:** CustomPainter (performant)
- **Animation:** Smooth transitions

---

## 🎯 Kullanım

### Ses Kaydı

```dart
// 1. Initialize provider
final provider = context.read<RecordingProvider>();
await provider.initialize();

// 2. Start recording
await provider.startRecording();

// 3. Monitor state
provider.state; // RecordingState.recording
provider.countdown; // 5, 4, 3, 2, 1, 0
provider.amplitude; // 0.0 - 1.0

// 4. Auto-stops after 5 seconds
// provider.state == RecordingState.completed
// provider.recordedFilePath // Path to WAV file
```

### State Management

```dart
Consumer<RecordingProvider>(
  builder: (context, provider, child) {
    switch (provider.state) {
      case RecordingState.idle:
        return LoadingWidget();
      case RecordingState.ready:
        return ReadyWidget();
      case RecordingState.recording:
        return RecordingWidget(
          countdown: provider.countdown,
          amplitude: provider.amplitude,
        );
      case RecordingState.completed:
        return CompletedWidget(
          filePath: provider.recordedFilePath,
        );
      case RecordingState.error:
        return ErrorWidget(
          failure: provider.failure,
        );
    }
  },
)
```

---

## 🧪 Testing

### Run Tests

```bash
# All tests
flutter test

# Specific test
flutter test test/services/audio_service_test.dart

# With coverage
flutter test --coverage
```

### Analyze Code

```bash
# Static analysis
flutter analyze

# Format code
dart format lib/

# Fix issues
dart fix --apply
```

---

## 📱 Platform Configuration

### Android

**AndroidManifest.xml:**
```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.INTERNET" />
```

**build.gradle:**
```gradle
android {
    compileSdkVersion 34
    minSdkVersion 21
    targetSdkVersion 34
}
```

### iOS

**Info.plist:**
```xml
<key>NSMicrophoneUsageDescription</key>
<string>NeuralCipher.ai, sesinizi kaydederek nörolojik sağlık analizi yapmak için mikrofon erişimine ihtiyaç duyar.</string>
```

**Deployment Target:** iOS 13.0+

---

## 🎨 UI/UX

### Accessibility (50+ Yaş Grubu)

- **Font Sizes:**
  - Body: 18pt (minimum)
  - Headings: 24pt (minimum)
  - Large: 32pt (countdown, etc.)

- **Touch Targets:**
  - Minimum: 48x48 dp
  - Recommended: 56x56 dp

- **Colors:**
  - WCAG 2.1 AA compliant
  - High contrast ratios
  - Color-blind friendly

- **Interactions:**
  - Haptic feedback
  - Clear visual feedback
  - Simple navigation

### Theme

**Light Theme:**
- Primary: Deep Ocean Blue (#2196F3)
- Secondary: Green (#4CAF50)
- Error: Red (#E53935)
- Warning: Orange (#FFA726)

**Dark Theme:**
- Supported
- Auto-switch based on system
- Manual toggle in settings

---

## 📊 Performance

### Targets

- **App Launch:** < 2 seconds
- **Recording Start:** < 500ms
- **Waveform FPS:** 30+ FPS
- **Memory Usage:** < 200MB
- **Battery Impact:** < 5% per test

### Optimization

- Lazy loading
- Image caching
- Efficient state management
- Background processing
- Resource cleanup

---

## 🔒 Security & Privacy

### Data Protection

- **Encryption:** AES-256 for local storage
- **HTTPS:** All API communication
- **SSL Pinning:** Certificate validation
- **Biometric Auth:** Face ID / Fingerprint

### Privacy

- Audio files deleted after upload
- Test results encrypted locally
- No PII tracked in analytics
- User consent required
- GDPR/HIPAA compliant

---

## 📚 Documentation

### Available Docs

- `DAY_1_PROGRESS.md` - GÜN 1 progress report
- `DAY_2_PROGRESS.md` - GÜN 2 progress report
- `SPRINT_SUMMARY.md` - Sprint overview
- `FEATURE_EXTRACTION_GUIDE.md` - 59 features explained
- `README.md` - This file

### Backend Docs

- `../AI_MODEL_DOCUMENTATION.md` - Model details
- `../PROJECT_SUMMARY.md` - Project overview
- `../DEPLOYMENT_GUIDE.md` - Deployment guide

---

## 🐛 Troubleshooting

### Common Issues

**1. "Waiting for another flutter command"**
```bash
# Windows
del %LOCALAPPDATA%\flutter\.flutter_lock
```

**2. "CocoaPods not installed" (iOS)**
```bash
sudo gem install cocoapods
# or
brew install cocoapods
```

**3. "Android licenses not accepted"**
```bash
flutter doctor --android-licenses
```

**4. "Cannot connect to localhost"**
```dart
// Android Emulator
static const String baseUrl = 'http://10.0.2.2:8000';

// iOS Simulator
static const String baseUrl = 'http://localhost:8000';

// Physical Device
static const String baseUrl = 'http://192.168.1.x:8000';
```

---

## 🤝 Contributing

### Development Workflow

1. Create feature branch
2. Make changes
3. Run tests (`flutter test`)
4. Run analyzer (`flutter analyze`)
5. Format code (`dart format lib/`)
6. Create pull request

### Code Style

- Follow [Effective Dart](https://dart.dev/guides/language/effective-dart)
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new features

---

## 📈 Roadmap

### Sprint 1-2 (Completed ✅)
- [x] Project setup
- [x] Audio recording service
- [x] Waveform visualization
- [x] State management

### Sprint 3-4 (In Progress 🔄)
- [ ] API integration
- [ ] Results display
- [ ] Test history
- [ ] Offline mode

### Sprint 5-6 (Planned 📋)
- [ ] UI polish
- [ ] Testing
- [ ] Bug fixes
- [ ] Deployment

---

## 📞 Support

### Technical Issues

- GitHub Issues: [repo-url]
- Email: support@NeuralCipher.ai

### Medical Questions

- This is NOT a diagnostic device
- Consult a neurologist for medical advice
- Results are for informational purposes only

---

## 📄 License

MIT License - See LICENSE file for details

---

## 🙏 Acknowledgments

- **Flutter Team** - Amazing framework
- **UCI ML Repository** - Parkinson dataset
- **Librosa** - Audio analysis library
- **FastAPI** - Backend framework

---

## 📊 Status

**Version:** 1.0.0 (MVP)  
**Status:** 🔄 In Development  
**Progress:** 20% (2/10 days)  
**Quality:** ✅ High (0 errors)  
**Next:** GÜN 3 - Pre-flight checks

---

**Built with ❤️ by NeuralCipher.ai Team**

**Last Updated:** 2026-01-21



