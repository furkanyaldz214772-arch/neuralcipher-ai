# Getting Started - Flutter Mobile App Development

## Prerequisites

### Required Software

1. **Flutter SDK 3.19+**
   ```bash
   # Check Flutter version
   flutter --version
   
   # If not installed, download from:
   # https://flutter.dev/docs/get-started/install
   ```

2. **Dart SDK 3.3+** (comes with Flutter)

3. **IDE (choose one):**
   - Android Studio (recommended for Android)
   - Xcode (required for iOS, macOS only)
   - VS Code with Flutter extension

4. **Platform-Specific Tools:**
   - **Android:** Android Studio, Android SDK, Android Emulator
   - **iOS:** Xcode 15+, CocoaPods (macOS only)

### Verify Installation

```bash
# Check Flutter installation
flutter doctor

# Should show:
# ✓ Flutter (Channel stable, 3.19.x)
# ✓ Android toolchain
# ✓ Xcode (macOS only)
# ✓ VS Code / Android Studio
```

---

## Project Setup

### Step 1: Create Flutter Project

```bash
# Navigate to neuralcipher-ai directory
cd neuralcipher-ai

# Create Flutter project
flutter create neuralcipher_mobile

# Navigate to project
cd neuralcipher_mobile
```

### Step 2: Update pubspec.yaml

Replace the dependencies section with the one from `design.md`:

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.0
  
  # Audio Recording
  record: ^5.0.0
  path_provider: ^2.1.0
  permission_handler: ^11.0.0
  
  # ... (see design.md for full list)
```


### Step 3: Install Dependencies

```bash
# Get all packages
flutter pub get

# Run code generation (for JSON serialization)
flutter pub run build_runner build --delete-conflicting-outputs
```

### Step 4: Create Project Structure

```bash
# Create directory structure (Windows)
mkdir lib\core\constants lib\core\errors lib\core\utils lib\core\network
mkdir lib\features\onboarding\presentation\screens
mkdir lib\features\recording\domain\entities
mkdir lib\features\recording\data\models
mkdir lib\features\recording\presentation\screens
mkdir lib\features\analysis\presentation\screens
mkdir lib\features\history\presentation\screens
mkdir lib\shared\widgets lib\shared\extensions
mkdir lib\app

# Or use PowerShell:
New-Item -ItemType Directory -Path lib\core\constants, lib\core\errors, lib\core\utils, lib\core\network -Force
New-Item -ItemType Directory -Path lib\features\onboarding\presentation\screens -Force
# ... (continue for other directories)
```

---

## Development Workflow

### Running the App

```bash
# List available devices
flutter devices

# Run on specific device
flutter run -d <device-id>

# Run in debug mode (default)
flutter run

# Run in release mode
flutter run --release

# Hot reload: Press 'r' in terminal
# Hot restart: Press 'R' in terminal
```

### Testing

```bash
# Run all tests
flutter test

# Run specific test file
flutter test test/services/audio_recording_service_test.dart

# Run with coverage
flutter test --coverage

# View coverage report
# Windows: Use coverage tools or VS Code extensions
```

### Code Generation

```bash
# Generate code (JSON serialization, etc.)
flutter pub run build_runner build

# Watch mode (auto-generate on file changes)
flutter pub run build_runner watch

# Clean and rebuild
flutter pub run build_runner build --delete-conflicting-outputs
```

### Code Quality

```bash
# Analyze code
flutter analyze

# Format code
dart format lib/

# Fix common issues
dart fix --apply
```

---

## Platform-Specific Setup

### Android Configuration

1. **Update AndroidManifest.xml** (`android/app/src/main/AndroidManifest.xml`):

```xml
<manifest>
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
    <uses-permission android:name="android.permission.INTERNET" />
    
    <application
        android:label="NeuralCipher.ai"
        android:icon="@mipmap/ic_launcher">
        <!-- ... -->
    </application>
</manifest>
```

2. **Update build.gradle** (`android/app/build.gradle`):

```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 34
    }
}
```


### iOS Configuration

1. **Update Info.plist** (`ios/Runner/Info.plist`):

```xml
<dict>
    <!-- Microphone Permission -->
    <key>NSMicrophoneUsageDescription</key>
    <string>NeuralCipher.ai needs microphone access to record your voice for neurological health analysis.</string>
    
    <!-- Face ID Permission (optional) -->
    <key>NSFaceIDUsageDescription</key>
    <string>NeuralCipher.ai uses Face ID to secure your health data.</string>
</dict>
```

2. **Set Deployment Target** (Xcode):
   - Open `ios/Runner.xcworkspace` in Xcode
   - Select Runner target
   - Set "Deployment Target" to iOS 13.0

3. **Install CocoaPods:**

```bash
cd ios
pod install
cd ..
```

---

## Backend API Connection

### Development Setup

1. **Ensure backend is running:**
   ```bash
   # In neuralcipher-ai/backend directory
   python simple_start.py
   
   # Backend should be at: http://localhost:8000
   ```

2. **Update API constants** (`lib/core/constants/api_constants.dart`):

```dart
class ApiConstants {
  // Development
  static const String baseUrl = 'http://localhost:8000';
  
  // For Android Emulator, use:
  // static const String baseUrl = 'http://10.0.2.2:8000';
  
  // For iOS Simulator, use:
  // static const String baseUrl = 'http://localhost:8000';
  
  // For Physical Device, use your computer's IP:
  // static const String baseUrl = 'http://192.168.1.x:8000';
  
  static const String voiceProcessEndpoint = '/api/v1/voice/process';
  static const String modelInfoEndpoint = '/api/v1/voice/model-info';
}
```

### Testing API Connection

```dart
// Test in main.dart or a test file
void testApiConnection() async {
  final dio = Dio();
  try {
    final response = await dio.get('http://localhost:8000/health');
    print('API Connected: ${response.data}');
  } catch (e) {
    print('API Connection Failed: $e');
  }
}
```

---

## Common Issues & Solutions

### Issue 1: "Waiting for another flutter command to release the startup lock"

```bash
# Delete lock file
# Windows:
del %LOCALAPPDATA%\flutter\.flutter_lock

# Or restart your computer
```

### Issue 2: "CocoaPods not installed" (iOS)

```bash
# Install CocoaPods
sudo gem install cocoapods

# Or use Homebrew
brew install cocoapods
```

### Issue 3: "Android licenses not accepted"

```bash
flutter doctor --android-licenses
# Accept all licenses
```

### Issue 4: "Cannot connect to localhost from Android Emulator"

Use `10.0.2.2` instead of `localhost`:
```dart
static const String baseUrl = 'http://10.0.2.2:8000';
```

### Issue 5: "Permission denied" errors

```bash
# Make sure permissions are in AndroidManifest.xml and Info.plist
# Request permissions at runtime using permission_handler package
```

---

## Development Tips

### Hot Reload Best Practices

- Use `r` for hot reload (preserves state)
- Use `R` for hot restart (resets state)
- Hot reload doesn't work for:
  - main() function changes
  - initState() changes
  - Global variables initialization

### Debugging

```bash
# Enable verbose logging
flutter run --verbose

# Debug in VS Code:
# 1. Set breakpoints
# 2. Press F5
# 3. Use Debug Console

# Debug in Android Studio:
# 1. Set breakpoints
# 2. Click Debug button
# 3. Use Debug panel
```

### Performance Profiling

```bash
# Open DevTools
flutter pub global activate devtools
flutter pub global run devtools

# Run app with profiling
flutter run --profile
```

---

## Next Steps

1. ✅ Complete prerequisites
2. ✅ Setup project structure
3. ✅ Configure platforms
4. 📋 Start with Phase 1 tasks (see tasks.md)
5. 📋 Follow implementation order in tasks.md

---

## Resources

- **Flutter Documentation:** https://flutter.dev/docs
- **Dart Documentation:** https://dart.dev/guides
- **Provider Package:** https://pub.dev/packages/provider
- **Record Package:** https://pub.dev/packages/record
- **Dio Package:** https://pub.dev/packages/dio

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-19  
**Status:** Ready for Development


