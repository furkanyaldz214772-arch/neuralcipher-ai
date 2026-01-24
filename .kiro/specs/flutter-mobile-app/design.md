# Design Document - Flutter Mobile App

## Introduction

Bu doküman, NeuralCipher.ai Flutter mobil uygulamasının teknik tasarımını içerir. Requirements.md'de tanımlanan gereksinimleri karşılayacak mimari, bileşenler ve implementasyon detayları burada açıklanmıştır.

## Design Goals

1. **Accessibility First:** 50+ yaş grubu için optimize edilmiş UI/UX
2. **Medical-Grade Audio:** 44.1kHz, 16-bit, WAV format ses kaydı
3. **Offline-First:** İnternet olmadan da çalışabilme
4. **Security:** HIPAA/GDPR uyumlu veri güvenliği
5. **Performance:** Hızlı ve akıcı kullanıcı deneyimi

## Architecture Overview

### Clean Architecture Pattern

```
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Screens    │  │   Widgets    │  │   Providers  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   DOMAIN LAYER                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Use Cases   │  │  Entities    │  │ Repositories │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────────────────────────────────────┐
│                   DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ API Service  │  │ Local DB     │  │ Audio Service│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```


## Technology Stack

### Core Framework
- **Flutter:** 3.19+ (latest stable)
- **Dart:** 3.3+

### State Management
- **Provider:** 6.1+ (simple, performant, recommended by Flutter team)

### Audio Recording
- **record:** 5.0+ (cross-platform, medical-grade quality support)
- **path_provider:** 2.1+ (file system access)
- **permission_handler:** 11.0+ (runtime permissions)

### API Communication
- **dio:** 5.4+ (HTTP client with interceptors)
- **retrofit:** 4.0+ (type-safe REST client)
- **json_serializable:** 6.7+ (JSON parsing)

### Local Storage
- **sqflite:** 2.3+ (SQLite database)
- **hive:** 2.2+ (fast key-value storage)
- **flutter_secure_storage:** 9.0+ (encrypted storage)

### UI/UX
- **flutter_svg:** 2.0+ (vector graphics)
- **lottie:** 3.0+ (animations)
- **shimmer:** 3.0+ (loading effects)
- **fl_chart:** 0.66+ (charts for history)

### Utilities
- **intl:** 0.18+ (localization)
- **logger:** 2.0+ (logging)
- **connectivity_plus:** 5.0+ (network status)


## Project Structure

```
lib/
├── main.dart                          # App entry point
├── app/
│   ├── app.dart                       # MaterialApp configuration
│   ├── routes.dart                    # Route definitions
│   └── theme.dart                     # Theme configuration
├── core/
│   ├── constants/
│   │   ├── api_constants.dart         # API endpoints
│   │   ├── app_constants.dart         # App-wide constants
│   │   └── audio_constants.dart       # Audio specs (44.1kHz, etc.)
│   ├── errors/
│   │   ├── failures.dart              # Error types
│   │   └── exceptions.dart            # Exception classes
│   ├── utils/
│   │   ├── logger.dart                # Logging utility
│   │   ├── validators.dart            # Input validators
│   │   └── formatters.dart            # Data formatters
│   └── network/
│       ├── dio_client.dart            # Dio configuration
│       └── network_info.dart          # Connectivity checker
├── features/
│   ├── onboarding/
│   │   ├── presentation/
│   │   │   ├── screens/
│   │   │   │   └── onboarding_screen.dart
│   │   │   ├── widgets/
│   │   │   │   ├── onboarding_page.dart
│   │   │   │   └── skip_button.dart
│   │   │   └── providers/
│   │   │       └── onboarding_provider.dart
│   │   └── data/
│   │       └── models/
│   │           └── onboarding_content.dart
│   ├── recording/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── audio_recording.dart
│   │   │   ├── repositories/
│   │   │   │   └── audio_repository.dart
│   │   │   └── usecases/
│   │   │       ├── record_audio.dart
│   │   │       └── check_environment.dart
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   └── audio_recording_model.dart
│   │   │   ├── datasources/
│   │   │   │   ├── audio_local_datasource.dart
│   │   │   │   └── audio_remote_datasource.dart
│   │   │   └── repositories/
│   │   │       └── audio_repository_impl.dart
│   │   └── presentation/
│   │       ├── screens/
│   │       │   ├── pre_flight_screen.dart
│   │       │   └── recording_screen.dart
│   │       ├── widgets/
│   │       │   ├── waveform_visualizer.dart
│   │       │   ├── countdown_timer.dart
│   │       │   └── record_button.dart
│   │       └── providers/
│   │           └── recording_provider.dart
│   ├── analysis/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   │   └── analysis_result.dart
│   │   │   └── usecases/
│   │   │       └── analyze_audio.dart
│   │   ├── data/
│   │   │   ├── models/
│   │   │   │   └── analysis_result_model.dart
│   │   │   └── datasources/
│   │   │       └── analysis_remote_datasource.dart
│   │   └── presentation/
│   │       ├── screens/
│   │       │   └── results_screen.dart
│   │       ├── widgets/
│   │       │   ├── risk_score_bar.dart
│   │       │   ├── risk_interpretation.dart
│   │       │   └── action_buttons.dart
│   │       └── providers/
│   │           └── analysis_provider.dart
│   └── history/
│       ├── domain/
│       │   ├── entities/
│       │   │   └── test_history.dart
│       │   └── usecases/
│       │       ├── get_history.dart
│       │       └── delete_test.dart
│       ├── data/
│       │   ├── models/
│       │   │   └── test_history_model.dart
│       │   ├── datasources/
│       │   │   └── history_local_datasource.dart
│       │   └── repositories/
│       │       └── history_repository_impl.dart
│       └── presentation/
│           ├── screens/
│           │   └── history_screen.dart
│           ├── widgets/
│           │   ├── history_list_item.dart
│           │   └── trend_chart.dart
│           └── providers/
│               └── history_provider.dart
└── shared/
    ├── widgets/
    │   ├── custom_button.dart
    │   ├── loading_indicator.dart
    │   └── error_dialog.dart
    └── extensions/
        ├── context_extensions.dart
        └── string_extensions.dart
```


## Core Components Design

### 1. Audio Recording Service

**Purpose:** Medical-grade audio capture with 44.1kHz, 16-bit, WAV format

**Interface:**
```dart
abstract class AudioRecordingService {
  Future<void> initialize();
  Future<bool> hasPermission();
  Future<void> requestPermission();
  Future<void> startRecording(String filePath);
  Future<String> stopRecording();
  Stream<double> getAmplitudeStream();
  Future<void> dispose();
}
```

**Implementation Details:**
- Use `record` package with custom encoder settings
- Sample rate: 44100 Hz
- Bit depth: 16-bit
- Channels: Mono (1 channel)
- Format: WAV (Linear PCM)
- Duration: Exactly 5 seconds with auto-stop

**Correctness Properties:**
- MUST record at exactly 44.1kHz sample rate
- MUST save as WAV format (not compressed)
- MUST be mono channel
- MUST handle permission denial gracefully
- MUST clean up resources on dispose


### 2. API Service

**Purpose:** Communication with backend API (http://localhost:8000)

**Interface:**
```dart
abstract class ApiService {
  Future<AnalysisResult> uploadAndAnalyze(File audioFile);
  Future<ModelInfo> getModelInfo();
  Future<HealthCheck> checkHealth();
}
```

**Endpoints:**
- POST `/api/v1/voice/process` - Upload audio and get risk score
- GET `/api/v1/voice/model-info` - Get model information
- GET `/api/v1/voice/health-check` - Check API health

**Error Handling:**
- Network timeout: 30 seconds
- Retry logic: 3 attempts with exponential backoff (1s, 2s, 4s)
- Offline mode: Queue for later upload

**Correctness Properties:**
- MUST use multipart/form-data for file upload
- MUST handle network errors gracefully
- MUST implement retry with exponential backoff
- MUST validate response structure
- MUST timeout after 30 seconds


### 3. Local Database

**Purpose:** Store test history and offline data

**Schema:**

```sql
-- Test Results Table
CREATE TABLE test_results (
  id TEXT PRIMARY KEY,
  timestamp INTEGER NOT NULL,
  risk_score REAL NOT NULL,
  risk_level TEXT NOT NULL,
  confidence_healthy REAL NOT NULL,
  confidence_parkinsons REAL NOT NULL,
  processing_time_ms REAL,
  synced INTEGER DEFAULT 0,
  created_at INTEGER NOT NULL
);

-- Pending Uploads Table
CREATE TABLE pending_uploads (
  id TEXT PRIMARY KEY,
  file_path TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  retry_count INTEGER DEFAULT 0,
  last_error TEXT
);

-- App Settings Table
CREATE TABLE app_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
```

**Correctness Properties:**
- MUST encrypt sensitive data (risk scores)
- MUST handle concurrent access safely
- MUST clean up old records (>90 days)
- MUST maintain referential integrity


### 4. Environment Checker

**Purpose:** Pre-flight checks before recording

**Interface:**
```dart
class EnvironmentCheck {
  final bool passed;
  final String message;
  final EnvironmentCheckType type;
}

enum EnvironmentCheckType {
  ambientNoise,
  batteryLevel,
  storageSpace,
  microphonePermission
}

abstract class EnvironmentChecker {
  Future<List<EnvironmentCheck>> performChecks();
  Future<double> getAmbientNoiseLevel();
  Future<int> getBatteryLevel();
  Future<int> getAvailableStorage();
}
```

**Check Criteria:**
- Ambient noise: < 40dB (warn if higher)
- Battery level: > 20% (warn if lower)
- Storage space: > 50MB (warn if lower)
- Microphone permission: Must be granted

**Correctness Properties:**
- MUST check all criteria before allowing recording
- MUST provide clear warning messages
- MUST allow user to proceed with warnings (not blocking)
- MUST re-check if user returns from settings


## UI/UX Design

### Design System

#### Typography
```dart
// For 50+ age group - large, readable fonts
TextTheme(
  displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
  displayMedium: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
  headlineLarge: TextStyle(fontSize: 24, fontWeight: FontWeight.w600),
  headlineMedium: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
  bodyLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.normal),
  bodyMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.normal),
  labelLarge: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
)
```

#### Color Palette

**Light Theme:**
```dart
ColorScheme.light(
  primary: Color(0xFF2196F3),        // Blue - trust, medical
  secondary: Color(0xFF4CAF50),      // Green - success
  error: Color(0xFFE53935),          // Red - high risk
  warning: Color(0xFFFFA726),        // Orange - medium risk
  surface: Color(0xFFFFFFFF),        // White
  background: Color(0xFFF5F5F5),     // Light gray
  onPrimary: Color(0xFFFFFFFF),      // White text on primary
  onSurface: Color(0xFF212121),      // Dark text on surface
)
```

**Dark Theme:**
```dart
ColorScheme.dark(
  primary: Color(0xFF64B5F6),        // Light blue
  secondary: Color(0xFF81C784),      // Light green
  error: Color(0xFFEF5350),          // Light red
  warning: Color(0xFFFFB74D),        // Light orange
  surface: Color(0xFF1E1E1E),        // Dark gray
  background: Color(0xFF121212),     // Almost black
  onPrimary: Color(0xFF000000),      // Black text on primary
  onSurface: Color(0xFFE0E0E0),      // Light text on surface
)
```

#### Spacing
```dart
class AppSpacing {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 16.0;
  static const double lg = 24.0;
  static const double xl = 32.0;
  static const double xxl = 48.0;
}
```

#### Touch Targets
- Minimum size: 48x48 dp (WCAG 2.1 AA)
- Recommended size: 56x56 dp for primary actions
- Spacing between targets: 8dp minimum


### Screen Designs

#### 1. Onboarding Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  [Skip]                             │
│                                     │
│         [Illustration]              │
│                                     │
│      Hoş Geldiniz!                  │
│                                     │
│  NeuralCipher.ai ile sesinizi           │
│  analiz ederek nörolojik            │
│  sağlığınızı takip edin.            │
│                                     │
│         ● ○ ○                       │
│                                     │
│  [         İleri         ]          │
└─────────────────────────────────────┘
```

**Features:**
- 3 slides: Welcome, Privacy, How to Use
- Large illustrations (Lottie animations)
- 18pt body text, 24pt headings
- Skip button (top-right)
- Page indicators (dots)
- Large "Next" button (56dp height)

**Correctness Properties:**
- MUST show only on first launch
- MUST save completion status
- MUST support swipe gestures
- MUST be skippable


#### 2. Home Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  NeuralCipher.ai          [☰]           │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    [Microphone Icon]        │   │
│  │                             │   │
│  │   Ses Testi Başlat          │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  📊 Test Geçmişi            │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  ℹ️  Nasıl Çalışır?         │   │
│  └─────────────────────────────┘   │
│                                     │
│  Son Test: 2 gün önce               │
│  Risk Seviyesi: Düşük ✓             │
└─────────────────────────────────────┘
```

**Features:**
- Large primary button (80dp diameter)
- Secondary action cards
- Last test summary
- Simple navigation

**Correctness Properties:**
- MUST show last test result if available
- MUST handle first-time users
- MUST provide clear call-to-action


#### 3. Pre-Flight Check Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  [←] Hazırlık Kontrolleri           │
│                                     │
│  ✓ Mikrofon İzni                    │
│    Verildi                          │
│                                     │
│  ✓ Batarya Seviyesi                 │
│    %85 - Yeterli                    │
│                                     │
│  ⚠ Ortam Gürültüsü                  │
│    45dB - Biraz yüksek              │
│    Daha sessiz bir yer bulun        │
│                                     │
│  ✓ Depolama Alanı                   │
│    2.5GB - Yeterli                  │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  Telefonu 15-20cm uzakta    │   │
│  │  tutun ve "Aaaa" deyin      │   │
│  │      [Phone Icon]           │   │
│  └─────────────────────────────┘   │
│                                     │
│  [    Kayda Başla    ]              │
└─────────────────────────────────────┘
```

**Features:**
- Real-time environment checks
- Visual indicators (✓, ⚠, ✗)
- Clear instructions
- Warning messages (not blocking)
- Visual guide for phone position

**Correctness Properties:**
- MUST perform all checks
- MUST update in real-time
- MUST allow proceeding with warnings
- MUST show actionable messages


#### 4. Recording Screen

**Layout:**
```
┌─────────────────────────────────────┐
│                                     │
│           5                         │
│                                     │
│    "Aaaa" demeye devam edin         │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    [Waveform Animation]     │   │
│  │    ▁▃▅▇▅▃▁▃▅▇▅▃▁           │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│         ●                           │
│     Kaydediliyor...                 │
│                                     │
│  [      İptal      ]                │
└─────────────────────────────────────┘
```

**Features:**
- Large countdown timer (32pt)
- Real-time waveform visualization (30+ FPS)
- Recording indicator (red dot)
- Clear instruction text
- Cancel button

**Waveform Visualizer:**
- Update frequency: 30+ FPS
- Amplitude range: 0-100
- Smooth animation
- Color: Primary color with gradient

**Correctness Properties:**
- MUST show countdown from 5 to 0
- MUST auto-stop at 0
- MUST update waveform in real-time
- MUST handle cancel gracefully
- MUST provide haptic feedback


#### 5. Results Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  [←] Test Sonuçları                 │
│                                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │    Risk Seviyesi: Düşük     │   │
│  │                             │   │
│  │  ████████░░░░░░░░░░░░░░░░  │   │
│  │         0.23                │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  ✓ Ses parametreleriniz normal      │
│    aralıkta görünüyor.              │
│                                     │
│  📋 Öneri:                          │
│  Düzenli takip için 3 ayda bir     │
│  test yapmanızı öneriyoruz.         │
│                                     │
│  ⚠️ Önemli:                         │
│  Bu bir teşhis değil, karar         │
│  destek aracıdır.                   │
│                                     │
│  [  Doktorla Paylaş  ]              │
│  [  Yeni Test Yap    ]              │
└─────────────────────────────────────┘
```

**Risk Score Bar:**
- Green (0.0-0.3): Low risk
- Yellow (0.3-0.7): Medium risk
- Red (0.7-1.0): High risk
- Animated fill
- Large score number

**Correctness Properties:**
- MUST show risk score prominently
- MUST provide clear interpretation
- MUST include disclaimer
- MUST offer actionable next steps
- MUST support sharing


#### 6. History Screen

**Layout:**
```
┌─────────────────────────────────────┐
│  [←] Test Geçmişi                   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   [Trend Chart]             │   │
│  │   Risk Skoru Trendi         │   │
│  │   ╱╲                        │   │
│  │  ╱  ╲╱                      │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  19 Ocak 2026               │   │
│  │  Risk: Düşük (0.23)         │   │
│  │  [>]                        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  16 Ocak 2026               │   │
│  │  Risk: Düşük (0.18)         │   │
│  │  [>]                        │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │  13 Ocak 2026               │   │
│  │  Risk: Orta (0.45)          │   │
│  │  [>]                        │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

**Features:**
- Trend chart (if 3+ tests)
- Chronological list
- Color-coded risk levels
- Swipe to delete
- Tap to view details

**Correctness Properties:**
- MUST show most recent first
- MUST display trend if 3+ tests
- MUST support deletion
- MUST handle empty state


## State Management

### Provider Architecture

**App-Level Providers:**
```dart
MultiProvider(
  providers: [
    ChangeNotifierProvider(create: (_) => ThemeProvider()),
    ChangeNotifierProvider(create: (_) => LocaleProvider()),
    ChangeNotifierProvider(create: (_) => ConnectivityProvider()),
    ChangeNotifierProvider(create: (_) => AuthProvider()),
  ],
  child: MyApp(),
)
```

**Feature-Level Providers:**
```dart
// Recording Provider
class RecordingProvider extends ChangeNotifier {
  RecordingState _state = RecordingState.idle;
  double _amplitude = 0.0;
  int _countdown = 5;
  
  Future<void> startRecording() async { ... }
  Future<String> stopRecording() async { ... }
  void updateAmplitude(double amplitude) { ... }
  void updateCountdown(int seconds) { ... }
}

// Analysis Provider
class AnalysisProvider extends ChangeNotifier {
  AnalysisState _state = AnalysisState.idle;
  AnalysisResult? _result;
  String? _error;
  
  Future<void> analyzeAudio(File audioFile) async { ... }
  void reset() { ... }
}

// History Provider
class HistoryProvider extends ChangeNotifier {
  List<TestHistory> _history = [];
  bool _isLoading = false;
  
  Future<void> loadHistory() async { ... }
  Future<void> deleteTest(String id) async { ... }
  Future<void> syncWithBackend() async { ... }
}
```

**State Enums:**
```dart
enum RecordingState {
  idle,
  checking,
  ready,
  recording,
  processing,
  completed,
  error
}

enum AnalysisState {
  idle,
  uploading,
  analyzing,
  completed,
  error
}
```


## Data Models

### Domain Entities

```dart
// Audio Recording Entity
class AudioRecording {
  final String id;
  final String filePath;
  final DateTime timestamp;
  final int duration; // milliseconds
  final int sampleRate;
  final int bitDepth;
  
  AudioRecording({
    required this.id,
    required this.filePath,
    required this.timestamp,
    required this.duration,
    this.sampleRate = 44100,
    this.bitDepth = 16,
  });
}

// Analysis Result Entity
class AnalysisResult {
  final String id;
  final double riskScore;
  final RiskLevel riskLevel;
  final String riskMessage;
  final Confidence confidence;
  final String modelVersion;
  final DateTime timestamp;
  final double processingTimeMs;
  
  AnalysisResult({
    required this.id,
    required this.riskScore,
    required this.riskLevel,
    required this.riskMessage,
    required this.confidence,
    required this.modelVersion,
    required this.timestamp,
    required this.processingTimeMs,
  });
}

// Risk Level Enum
enum RiskLevel {
  low,
  medium,
  high;
  
  Color get color {
    switch (this) {
      case RiskLevel.low:
        return Colors.green;
      case RiskLevel.medium:
        return Colors.orange;
      case RiskLevel.high:
        return Colors.red;
    }
  }
  
  String get label {
    switch (this) {
      case RiskLevel.low:
        return 'Düşük Risk';
      case RiskLevel.medium:
        return 'Orta Risk';
      case RiskLevel.high:
        return 'Yüksek Risk';
    }
  }
}

// Confidence
class Confidence {
  final double healthy;
  final double parkinsons;
  
  Confidence({
    required this.healthy,
    required this.parkinsons,
  });
}

// Test History Entity
class TestHistory {
  final String id;
  final DateTime timestamp;
  final double riskScore;
  final RiskLevel riskLevel;
  final bool synced;
  
  TestHistory({
    required this.id,
    required this.timestamp,
    required this.riskScore,
    required this.riskLevel,
    this.synced = false,
  });
}
```


### Data Models (API)

```dart
// API Request/Response Models
@JsonSerializable()
class AnalysisResponse {
  final bool success;
  final String fileId;
  final String filename;
  final AnalysisData analysis;
  final double processingTimeMs;
  final String message;
  
  AnalysisResponse({
    required this.success,
    required this.fileId,
    required this.filename,
    required this.analysis,
    required this.processingTimeMs,
    required this.message,
  });
  
  factory AnalysisResponse.fromJson(Map<String, dynamic> json) =>
      _$AnalysisResponseFromJson(json);
  Map<String, dynamic> toJson() => _$AnalysisResponseToJson(this);
}

@JsonSerializable()
class AnalysisData {
  final double riskScore;
  final String riskLevel;
  final String riskMessage;
  final int prediction;
  final ConfidenceData confidence;
  final String modelVersion;
  
  AnalysisData({
    required this.riskScore,
    required this.riskLevel,
    required this.riskMessage,
    required this.prediction,
    required this.confidence,
    required this.modelVersion,
  });
  
  factory AnalysisData.fromJson(Map<String, dynamic> json) =>
      _$AnalysisDataFromJson(json);
  Map<String, dynamic> toJson() => _$AnalysisDataToJson(this);
}

@JsonSerializable()
class ConfidenceData {
  final double healthy;
  final double parkinsons;
  
  ConfidenceData({
    required this.healthy,
    required this.parkinsons,
  });
  
  factory ConfidenceData.fromJson(Map<String, dynamic> json) =>
      _$ConfidenceDataFromJson(json);
  Map<String, dynamic> toJson() => _$ConfidenceDataToJson(this);
}
```


## Security & Privacy

### Data Encryption

**At Rest:**
- Use `flutter_secure_storage` for sensitive data
- Encrypt test results with AES-256
- Store encryption keys in secure keychain/keystore

**In Transit:**
- HTTPS only (TLS 1.3)
- SSL certificate pinning
- No sensitive data in URLs

### Permissions

**Required:**
- Microphone (for recording)
- Storage (for saving audio files)

**Optional:**
- Biometric authentication (Face ID, Fingerprint)
- Notifications (for reminders)

**Permission Flow:**
```dart
class PermissionService {
  Future<bool> requestMicrophonePermission() async {
    final status = await Permission.microphone.request();
    return status.isGranted;
  }
  
  Future<bool> hasMicrophonePermission() async {
    final status = await Permission.microphone.status;
    return status.isGranted;
  }
  
  Future<void> openAppSettings() async {
    await openAppSettings();
  }
}
```

### Data Retention

- Audio files: Deleted immediately after upload
- Test results: Kept for 90 days
- Cached data: Cleared on logout
- Analytics: Anonymized, no PII

### Compliance

- **HIPAA:** Encrypted storage, audit logs
- **GDPR:** User consent, data export, right to deletion
- **KVKK:** Turkish data protection compliance


## Error Handling

### Error Types

```dart
abstract class Failure {
  final String message;
  Failure(this.message);
}

class NetworkFailure extends Failure {
  NetworkFailure(String message) : super(message);
}

class ServerFailure extends Failure {
  ServerFailure(String message) : super(message);
}

class CacheFailure extends Failure {
  CacheFailure(String message) : super(message);
}

class PermissionFailure extends Failure {
  PermissionFailure(String message) : super(message);
}

class AudioRecordingFailure extends Failure {
  AudioRecordingFailure(String message) : super(message);
}
```

### Error Messages (User-Friendly)

```dart
class ErrorMessages {
  static const String networkError = 
    'İnternet bağlantınızı kontrol edin';
  
  static const String serverError = 
    'Sunucu ile bağlantı kurulamadı. Lütfen daha sonra tekrar deneyin';
  
  static const String permissionDenied = 
    'Mikrofon izni gerekli. Ayarlardan izin verin';
  
  static const String recordingFailed = 
    'Ses kaydı başarısız. Lütfen tekrar deneyin';
  
  static const String analysisTimeout = 
    'Analiz zaman aşımına uğradı. Lütfen tekrar deneyin';
  
  static const String unknownError = 
    'Beklenmeyen bir hata oluştu';
}
```

### Error Handling Strategy

1. **Network Errors:** Retry with exponential backoff
2. **Permission Errors:** Guide user to settings
3. **Recording Errors:** Show clear instructions
4. **Server Errors:** Queue for later (offline mode)
5. **Unknown Errors:** Log and show generic message


## Localization

### Supported Languages

- Turkish (tr)
- English (en)

### Implementation

```dart
// l10n.yaml
arb-dir: lib/l10n
template-arb-file: app_en.arb
output-localization-file: app_localizations.dart

// app_en.arb
{
  "appTitle": "NeuralCipher.ai",
  "startTest": "Start Test",
  "testHistory": "Test History",
  "lowRisk": "Low Risk",
  "mediumRisk": "Medium Risk",
  "highRisk": "High Risk",
  "recording": "Recording...",
  "analyzing": "Analyzing...",
  "shareWithDoctor": "Share with Doctor",
  "takeNewTest": "Take New Test"
}

// app_tr.arb
{
  "appTitle": "NeuralCipher.ai",
  "startTest": "Test Başlat",
  "testHistory": "Test Geçmişi",
  "lowRisk": "Düşük Risk",
  "mediumRisk": "Orta Risk",
  "highRisk": "Yüksek Risk",
  "recording": "Kaydediliyor...",
  "analyzing": "Analiz ediliyor...",
  "shareWithDoctor": "Doktorla Paylaş",
  "takeNewTest": "Yeni Test Yap"
}
```

### Usage

```dart
Text(AppLocalizations.of(context)!.startTest)
```


## Testing Strategy

### Unit Tests

**Coverage Target:** 80%+

```dart
// Example: Audio Recording Service Test
void main() {
  group('AudioRecordingService', () {
    late AudioRecordingService service;
    
    setUp(() {
      service = AudioRecordingService();
    });
    
    test('should initialize successfully', () async {
      await service.initialize();
      expect(service.isInitialized, true);
    });
    
    test('should request microphone permission', () async {
      final hasPermission = await service.requestPermission();
      expect(hasPermission, isA<bool>());
    });
    
    test('should record audio with correct settings', () async {
      final filePath = await service.startRecording('test.wav');
      await Future.delayed(Duration(seconds: 5));
      final result = await service.stopRecording();
      
      expect(result, isNotNull);
      expect(result.sampleRate, 44100);
      expect(result.bitDepth, 16);
    });
  });
}
```

### Widget Tests

```dart
// Example: Recording Button Test
void main() {
  testWidgets('RecordButton shows correct state', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: RecordButton(
            onPressed: () {},
            isRecording: false,
          ),
        ),
      ),
    );
    
    expect(find.text('Start Recording'), findsOneWidget);
    expect(find.byIcon(Icons.mic), findsOneWidget);
  });
}
```

### Integration Tests

```dart
// Example: Full Recording Flow Test
void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();
  
  testWidgets('complete recording flow', (tester) async {
    app.main();
    await tester.pumpAndSettle();
    
    // Navigate to recording screen
    await tester.tap(find.text('Start Test'));
    await tester.pumpAndSettle();
    
    // Start recording
    await tester.tap(find.byType(RecordButton));
    await tester.pumpAndSettle();
    
    // Wait for recording to complete
    await tester.pump(Duration(seconds: 5));
    await tester.pumpAndSettle();
    
    // Verify results screen
    expect(find.text('Test Results'), findsOneWidget);
  });
}
```


## Performance Optimization

### App Launch

**Target:** < 2 seconds on modern devices

**Strategies:**
- Lazy load providers
- Defer non-critical initialization
- Use splash screen effectively
- Cache frequently used data

### Recording Performance

**Target:** 30+ FPS waveform animation

**Strategies:**
- Use `CustomPainter` for waveform
- Limit amplitude updates to 30 FPS
- Use `RepaintBoundary` for optimization
- Offload audio processing to isolate

### Memory Management

**Target:** < 200MB during recording

**Strategies:**
- Dispose controllers properly
- Clear audio buffers after upload
- Use `AutomaticKeepAliveClientMixin` wisely
- Profile with DevTools

### Network Optimization

**Strategies:**
- Compress audio before upload (if needed)
- Cache API responses (5 minutes)
- Use connection pooling
- Implement request cancellation


## Accessibility

### WCAG 2.1 AA Compliance

**Visual:**
- Minimum contrast ratio: 4.5:1 for text
- Large text (18pt+): 3:1 contrast ratio
- Support system font scaling (up to 200%)
- Clear focus indicators

**Motor:**
- Minimum touch target: 48x48 dp
- Adequate spacing between targets (8dp)
- Support for switch control
- No time-based interactions (except recording)

**Cognitive:**
- Simple, clear language
- Consistent navigation
- Clear error messages
- Visual feedback for all actions

### Screen Reader Support

```dart
Semantics(
  label: 'Start recording button',
  hint: 'Double tap to start voice recording',
  button: true,
  child: RecordButton(...),
)
```

### Haptic Feedback

```dart
// On button press
HapticFeedback.lightImpact();

// On recording start
HapticFeedback.mediumImpact();

// On error
HapticFeedback.heavyImpact();
```


## Analytics & Monitoring

### Events to Track

**User Journey:**
- App opened
- Onboarding completed
- Test started
- Test completed
- Results viewed
- History viewed

**Technical:**
- Recording duration
- Upload success/failure
- API response time
- Error occurrences
- Crash reports

**Business:**
- Daily active users
- Test completion rate
- Retention (7-day, 30-day)
- Feature usage

### Implementation

```dart
class AnalyticsService {
  Future<void> logEvent(String name, Map<String, dynamic> parameters) async {
    // Firebase Analytics or custom solution
    await FirebaseAnalytics.instance.logEvent(
      name: name,
      parameters: parameters,
    );
  }
  
  Future<void> logScreenView(String screenName) async {
    await FirebaseAnalytics.instance.logScreenView(
      screenName: screenName,
    );
  }
  
  Future<void> logError(String error, StackTrace stackTrace) async {
    await FirebaseCrashlytics.instance.recordError(
      error,
      stackTrace,
      fatal: false,
    );
  }
}
```

### Privacy

- All analytics anonymized
- No PII tracked
- User consent required
- Opt-out available in settings


## Build & Deployment

### Build Configurations

**Development:**
```dart
// config_dev.dart
class Config {
  static const String apiBaseUrl = 'http://localhost:8000';
  static const bool enableLogging = true;
  static const bool enableAnalytics = false;
}
```

**Staging:**
```dart
// config_staging.dart
class Config {
  static const String apiBaseUrl = 'https://staging-api.NeuralCipher.ai';
  static const bool enableLogging = true;
  static const bool enableAnalytics = true;
}
```

**Production:**
```dart
// config_prod.dart
class Config {
  static const String apiBaseUrl = 'https://api.NeuralCipher.ai';
  static const bool enableLogging = false;
  static const bool enableAnalytics = true;
}
```

### CI/CD Pipeline

**GitHub Actions:**
```yaml
name: Flutter CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
      - run: flutter pub get
      - run: flutter analyze
      - run: flutter test
      
  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: subosito/flutter-action@v2
      - run: flutter build apk --release
      - run: flutter build ios --release --no-codesign
```

### App Store Submission

**iOS:**
- Xcode 15+
- iOS 13.0+ deployment target
- App Store Connect metadata
- Privacy manifest

**Android:**
- Target SDK 34 (Android 14)
- Min SDK 21 (Android 5.0)
- Play Store listing
- Privacy policy URL


## Dependencies

### pubspec.yaml

```yaml
name: neuralcipher_mobile
description: NeuralCipher.ai Mobile App - Neurological Health Screening
version: 1.0.0+1

environment:
  sdk: '>=3.3.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.0
  
  # Audio Recording
  record: ^5.0.0
  path_provider: ^2.1.0
  permission_handler: ^11.0.0
  
  # API & Network
  dio: ^5.4.0
  retrofit: ^4.0.0
  json_annotation: ^4.8.0
  connectivity_plus: ^5.0.0
  
  # Local Storage
  sqflite: ^2.3.0
  hive: ^2.2.0
  hive_flutter: ^1.1.0
  flutter_secure_storage: ^9.0.0
  
  # UI/UX
  flutter_svg: ^2.0.0
  lottie: ^3.0.0
  shimmer: ^3.0.0
  fl_chart: ^0.66.0
  
  # Utilities
  intl: ^0.18.0
  logger: ^2.0.0
  uuid: ^4.0.0
  
  # Analytics (optional)
  # firebase_analytics: ^10.0.0
  # firebase_crashlytics: ^3.0.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  
  # Code Generation
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
  retrofit_generator: ^8.0.0
  hive_generator: ^2.0.0
  
  # Testing
  mockito: ^5.4.0
  integration_test:
    sdk: flutter

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/
    - assets/animations/
    - assets/icons/
  
  fonts:
    - family: Roboto
      fonts:
        - asset: fonts/Roboto-Regular.ttf
        - asset: fonts/Roboto-Bold.ttf
          weight: 700
```


## Implementation Phases

### Phase 1: Core Setup (Week 1)
- ✅ Project structure
- ✅ Dependencies setup
- ✅ Theme configuration
- ✅ Routing setup
- ✅ Basic screens (skeleton)

### Phase 2: Audio Recording (Week 2)
- ✅ Audio recording service
- ✅ Permission handling
- ✅ Waveform visualizer
- ✅ Recording screen UI
- ✅ Pre-flight checks

### Phase 3: API Integration (Week 3)
- ✅ API service setup
- ✅ Upload functionality
- ✅ Error handling
- ✅ Offline mode
- ✅ Retry logic

### Phase 4: Results & History (Week 4)
- ✅ Results screen
- ✅ History screen
- ✅ Local database
- ✅ Trend chart
- ✅ Data sync

### Phase 5: Polish & Testing (Week 5-6)
- ✅ Onboarding flow
- ✅ Accessibility improvements
- ✅ Localization
- ✅ Unit tests
- ✅ Integration tests
- ✅ Performance optimization

### Phase 6: Deployment (Week 7-8)
- ✅ App Store submission
- ✅ Play Store submission
- ✅ Beta testing
- ✅ Bug fixes
- ✅ Production release


## Correctness Properties Summary

### Audio Recording
1. MUST record at exactly 44.1kHz sample rate
2. MUST save as WAV format (Linear PCM, not compressed)
3. MUST be mono channel (single channel)
4. MUST record for exactly 5 seconds
5. MUST handle permission denial gracefully
6. MUST clean up resources on dispose

### API Communication
1. MUST use multipart/form-data for file upload
2. MUST handle network errors gracefully
3. MUST implement retry with exponential backoff (3 attempts)
4. MUST validate response structure
5. MUST timeout after 30 seconds
6. MUST queue failed uploads for later

### UI/UX
1. MUST use minimum 18pt font for body text
2. MUST use minimum 48x48 dp touch targets
3. MUST maintain WCAG 2.1 AA contrast ratios
4. MUST update waveform at 30+ FPS
5. MUST provide haptic feedback for actions
6. MUST support system font scaling up to 200%

### Data Security
1. MUST encrypt test results with AES-256
2. MUST use HTTPS for all API calls
3. MUST delete audio files after upload
4. MUST implement SSL certificate pinning
5. MUST require user consent for data collection
6. MUST support biometric authentication

### Performance
1. MUST launch in < 2 seconds
2. MUST respond to input within 100ms
3. MUST use < 200MB memory during recording
4. MUST maintain 30+ FPS during animation
5. MUST handle background/foreground transitions

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-19  
**Status:** Ready for Implementation

**Next Step:** Create tasks.md with detailed implementation checklist



