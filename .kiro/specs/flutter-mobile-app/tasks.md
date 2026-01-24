# Implementation Tasks - Flutter Mobile App

## Overview

Bu doküman, NeuralCipher.ai Flutter mobil uygulamasının implementasyonu için detaylı görev listesini içerir. Her görev, requirements.md ve design.md dokümanlarına referans verir.

**Toplam Süre:** 8 hafta  
**Başlangıç:** 2026-01-19  
**Hedef Tamamlanma:** 2026-03-15

---

## Phase 1: Core Setup (Week 1)

### Task 1.1: Project Initialization
- [ ] Flutter projesi oluştur (`flutter create neuralcipher_mobile`)
- [ ] Git repository kurulumu
- [ ] .gitignore yapılandırması
- [ ] README.md oluştur

**Estimated Time:** 2 hours  
**Dependencies:** None

### Task 1.2: Project Structure
- [ ] lib/ klasör yapısını oluştur (design.md'ye göre)
- [ ] core/ klasörü ve alt klasörler
- [ ] features/ klasörü ve feature modülleri
- [ ] shared/ klasörü

**Estimated Time:** 2 hours  
**Dependencies:** Task 1.1

### Task 1.3: Dependencies Setup
- [ ] pubspec.yaml'a tüm dependencies ekle
- [ ] flutter pub get çalıştır
- [ ] Build runner setup
- [ ] Platform-specific configurations (iOS/Android)

**Estimated Time:** 3 hours  
**Dependencies:** Task 1.2  
**Reference:** design.md - Dependencies section


### Task 1.4: Theme Configuration
- [ ] app/theme.dart oluştur
- [ ] Light theme tanımla (colors, typography, spacing)
- [ ] Dark theme tanımla
- [ ] ThemeProvider oluştur
- [ ] Theme switching logic

**Estimated Time:** 4 hours  
**Dependencies:** Task 1.3  
**Reference:** design.md - Design System section  
**Acceptance Criteria:** REQ-11 (Dark Mode Support)

### Task 1.5: Routing Setup
- [ ] app/routes.dart oluştur
- [ ] Route definitions
- [ ] Navigation service
- [ ] Route guards (onboarding check)

**Estimated Time:** 3 hours  
**Dependencies:** Task 1.3

### Task 1.6: Constants & Configuration
- [ ] core/constants/api_constants.dart
- [ ] core/constants/app_constants.dart
- [ ] core/constants/audio_constants.dart (44.1kHz, 16-bit, WAV)
- [ ] Environment configs (dev, staging, prod)

**Estimated Time:** 2 hours  
**Dependencies:** Task 1.2  
**Reference:** design.md - Build Configurations

### Task 1.7: Utilities
- [ ] core/utils/logger.dart
- [ ] core/utils/validators.dart
- [ ] core/utils/formatters.dart
- [ ] shared/extensions/context_extensions.dart
- [ ] shared/extensions/string_extensions.dart

**Estimated Time:** 3 hours  
**Dependencies:** Task 1.2

**Phase 1 Total:** ~19 hours (~3 days)

---

## Phase 2: Audio Recording (Week 2)

### Task 2.1: Permission Service
- [ ] Create PermissionService class
- [ ] Implement requestMicrophonePermission()
- [ ] Implement hasMicrophonePermission()
- [ ] Implement openAppSettings()
- [ ] Handle permission denial gracefully

**Estimated Time:** 4 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - Security & Privacy  
**Acceptance Criteria:** REQ-2 (Medical-Grade Audio Capture)


### Task 2.2: Audio Recording Service
- [ ] Create AudioRecordingService interface
- [ ] Implement with `record` package
- [ ] Configure: 44.1kHz, 16-bit, WAV, mono
- [ ] Implement startRecording()
- [ ] Implement stopRecording()
- [ ] Implement getAmplitudeStream()
- [ ] Add 5-second auto-stop timer
- [ ] Resource cleanup on dispose

**Estimated Time:** 8 hours  
**Dependencies:** Task 2.1  
**Reference:** design.md - Audio Recording Service  
**Acceptance Criteria:** REQ-2 (Medical-Grade Audio Capture)  
**Correctness:** MUST record at 44.1kHz, WAV format, mono channel

### Task 2.3: Environment Checker
- [ ] Create EnvironmentChecker class
- [ ] Implement getAmbientNoiseLevel() (< 40dB check)
- [ ] Implement getBatteryLevel() (> 20% check)
- [ ] Implement getAvailableStorage() (> 50MB check)
- [ ] Implement performChecks()
- [ ] Return EnvironmentCheck results

**Estimated Time:** 6 hours  
**Dependencies:** Task 2.1  
**Reference:** design.md - Environment Checker  
**Acceptance Criteria:** REQ-3 (Pre-Flight Environmental Checks)

### Task 2.4: Recording Provider
- [ ] Create RecordingProvider (ChangeNotifier)
- [ ] State management (RecordingState enum)
- [ ] Integrate AudioRecordingService
- [ ] Amplitude stream handling
- [ ] Countdown timer logic
- [ ] Error handling

**Estimated Time:** 5 hours  
**Dependencies:** Task 2.2  
**Reference:** design.md - State Management

### Task 2.5: Waveform Visualizer Widget
- [ ] Create WaveformVisualizer widget
- [ ] Use CustomPainter for drawing
- [ ] Real-time amplitude updates (30+ FPS)
- [ ] Smooth animation
- [ ] Color gradient

**Estimated Time:** 6 hours  
**Dependencies:** Task 2.4  
**Reference:** design.md - Recording Screen  
**Acceptance Criteria:** REQ-4 (Recording Interface)  
**Correctness:** MUST update at 30+ FPS


### Task 2.6: Pre-Flight Screen UI
- [ ] Create PreFlightScreen
- [ ] Display environment checks
- [ ] Visual indicators (✓, ⚠, ✗)
- [ ] Warning messages
- [ ] Phone position guide
- [ ] "Start Recording" button
- [ ] Accessibility (48dp touch targets, 18pt fonts)

**Estimated Time:** 5 hours  
**Dependencies:** Task 2.3  
**Reference:** design.md - Pre-Flight Check Screen  
**Acceptance Criteria:** REQ-3, REQ-8 (Accessibility)

### Task 2.7: Recording Screen UI
- [ ] Create RecordingScreen
- [ ] Large countdown timer (32pt)
- [ ] Integrate WaveformVisualizer
- [ ] Recording indicator (red dot)
- [ ] Instruction text
- [ ] Cancel button
- [ ] Haptic feedback

**Estimated Time:** 5 hours  
**Dependencies:** Task 2.5  
**Reference:** design.md - Recording Screen  
**Acceptance Criteria:** REQ-4 (Recording Interface)

### Task 2.8: Recording Flow Testing
- [ ] Unit tests for AudioRecordingService
- [ ] Unit tests for EnvironmentChecker
- [ ] Widget tests for WaveformVisualizer
- [ ] Integration test for recording flow

**Estimated Time:** 4 hours  
**Dependencies:** Task 2.7  
**Reference:** design.md - Testing Strategy

**Phase 2 Total:** ~43 hours (~6 days)

---

## Phase 3: API Integration (Week 3)

### Task 3.1: Network Setup
- [ ] Create DioClient with interceptors
- [ ] Configure base URL
- [ ] Add logging interceptor
- [ ] Add error interceptor
- [ ] Timeout configuration (30s)

**Estimated Time:** 3 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - API Service


### Task 3.2: API Models
- [ ] Create AnalysisResponse model
- [ ] Create AnalysisData model
- [ ] Create ConfidenceData model
- [ ] Add JSON serialization (@JsonSerializable)
- [ ] Run build_runner

**Estimated Time:** 3 hours  
**Dependencies:** Task 3.1  
**Reference:** design.md - Data Models (API)

### Task 3.3: API Service Implementation
- [ ] Create ApiService interface
- [ ] Implement uploadAndAnalyze() with multipart/form-data
- [ ] Implement getModelInfo()
- [ ] Implement checkHealth()
- [ ] Use Retrofit for type-safe API calls

**Estimated Time:** 5 hours  
**Dependencies:** Task 3.2  
**Reference:** design.md - API Service  
**Acceptance Criteria:** REQ-5 (Backend API Integration)  
**Correctness:** MUST use multipart/form-data, MUST timeout after 30s

### Task 3.4: Retry Logic
- [ ] Implement exponential backoff (1s, 2s, 4s)
- [ ] Retry up to 3 times
- [ ] Handle different error types
- [ ] Log retry attempts

**Estimated Time:** 4 hours  
**Dependencies:** Task 3.3  
**Reference:** design.md - API Service  
**Acceptance Criteria:** REQ-5 (Backend API Integration)

### Task 3.5: Connectivity Service
- [ ] Create ConnectivityService
- [ ] Monitor network status
- [ ] Provide connectivity stream
- [ ] Handle offline/online transitions

**Estimated Time:** 3 hours  
**Dependencies:** Task 3.1  
**Reference:** design.md - Network Optimization

### Task 3.6: Offline Queue
- [ ] Create PendingUploadsRepository
- [ ] Queue failed uploads
- [ ] Auto-sync when online
- [ ] Manual sync trigger
- [ ] Update pending_uploads table

**Estimated Time:** 6 hours  
**Dependencies:** Task 3.5  
**Reference:** design.md - Local Database  
**Acceptance Criteria:** REQ-10 (Offline Mode and Sync)


### Task 3.7: Analysis Provider
- [ ] Create AnalysisProvider (ChangeNotifier)
- [ ] State management (AnalysisState enum)
- [ ] Integrate ApiService
- [ ] Handle upload progress
- [ ] Error handling
- [ ] Success/failure callbacks

**Estimated Time:** 5 hours  
**Dependencies:** Task 3.3  
**Reference:** design.md - State Management

### Task 3.8: Error Handling
- [ ] Create Failure classes
- [ ] User-friendly error messages
- [ ] Error dialog widget
- [ ] Retry UI
- [ ] Error logging

**Estimated Time:** 4 hours  
**Dependencies:** Task 3.7  
**Reference:** design.md - Error Handling  
**Acceptance Criteria:** REQ-12 (Error Handling)

### Task 3.9: API Integration Testing
- [ ] Unit tests for ApiService
- [ ] Mock API responses
- [ ] Test retry logic
- [ ] Test offline queue
- [ ] Integration test for upload flow

**Estimated Time:** 5 hours  
**Dependencies:** Task 3.8

**Phase 3 Total:** ~38 hours (~5 days)

---

## Phase 4: Results & History (Week 4)

### Task 4.1: Local Database Setup
- [ ] Create database helper
- [ ] Define test_results table schema
- [ ] Define pending_uploads table schema
- [ ] Define app_settings table schema
- [ ] Migration logic

**Estimated Time:** 4 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - Local Database

### Task 4.2: Domain Entities
- [ ] Create AudioRecording entity
- [ ] Create AnalysisResult entity
- [ ] Create TestHistory entity
- [ ] Create RiskLevel enum
- [ ] Create Confidence class

**Estimated Time:** 3 hours  
**Dependencies:** Task 4.1  
**Reference:** design.md - Domain Entities


### Task 4.3: History Repository
- [ ] Create HistoryRepository interface
- [ ] Implement HistoryRepositoryImpl
- [ ] saveTestResult()
- [ ] getHistory()
- [ ] deleteTest()
- [ ] syncWithBackend()

**Estimated Time:** 5 hours  
**Dependencies:** Task 4.2  
**Reference:** design.md - Local Database  
**Acceptance Criteria:** REQ-7 (Test History and Tracking)

### Task 4.4: Secure Storage
- [ ] Setup flutter_secure_storage
- [ ] Encrypt test results (AES-256)
- [ ] Store encryption keys securely
- [ ] Decrypt on read

**Estimated Time:** 4 hours  
**Dependencies:** Task 4.3  
**Reference:** design.md - Security & Privacy  
**Acceptance Criteria:** REQ-9 (Data Security)  
**Correctness:** MUST encrypt with AES-256

### Task 4.5: Results Screen UI
- [ ] Create ResultsScreen
- [ ] Risk score bar (color-coded)
- [ ] Risk level text
- [ ] Interpretation message
- [ ] Recommendations
- [ ] Disclaimer
- [ ] "Share with Doctor" button
- [ ] "Take New Test" button

**Estimated Time:** 6 hours  
**Dependencies:** Task 4.2  
**Reference:** design.md - Results Screen  
**Acceptance Criteria:** REQ-6 (Results Display)

### Task 4.6: History Provider
- [ ] Create HistoryProvider (ChangeNotifier)
- [ ] Load history from database
- [ ] Delete test logic
- [ ] Sync logic
- [ ] Sort by date (most recent first)

**Estimated Time:** 4 hours  
**Dependencies:** Task 4.3  
**Reference:** design.md - State Management

### Task 4.7: History Screen UI
- [ ] Create HistoryScreen
- [ ] List of past tests
- [ ] Trend chart (if 3+ tests)
- [ ] Swipe to delete
- [ ] Tap to view details
- [ ] Empty state
- [ ] Sync indicator

**Estimated Time:** 6 hours  
**Dependencies:** Task 4.6  
**Reference:** design.md - History Screen  
**Acceptance Criteria:** REQ-7 (Test History)


### Task 4.8: Trend Chart Widget
- [ ] Create TrendChart widget
- [ ] Use fl_chart package
- [ ] Plot risk scores over time
- [ ] Color-coded points
- [ ] Smooth line
- [ ] Date labels

**Estimated Time:** 5 hours  
**Dependencies:** Task 4.7  
**Reference:** design.md - History Screen  
**Acceptance Criteria:** REQ-7 (Test History)

### Task 4.9: Share Functionality
- [ ] Implement share with doctor
- [ ] Generate PDF report
- [ ] Include test results
- [ ] Include trend chart
- [ ] Share via system share sheet

**Estimated Time:** 5 hours  
**Dependencies:** Task 4.5  
**Acceptance Criteria:** REQ-6 (Results Display)

### Task 4.10: Results & History Testing
- [ ] Unit tests for HistoryRepository
- [ ] Unit tests for encryption
- [ ] Widget tests for ResultsScreen
- [ ] Widget tests for HistoryScreen
- [ ] Integration test for full flow

**Estimated Time:** 5 hours  
**Dependencies:** Task 4.9

**Phase 4 Total:** ~47 hours (~6 days)

---

## Phase 5: Polish & Testing (Week 5-6)

### Task 5.1: Onboarding Flow
- [ ] Create OnboardingScreen
- [ ] 3 slides (Welcome, Privacy, How to Use)
- [ ] Lottie animations
- [ ] Page indicators
- [ ] Skip button
- [ ] Save completion status
- [ ] Large fonts (18pt body, 24pt headings)

**Estimated Time:** 6 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - Onboarding Screen  
**Acceptance Criteria:** REQ-1 (Onboarding)

### Task 5.2: Home Screen
- [ ] Create HomeScreen
- [ ] Large "Start Test" button (80dp)
- [ ] Test history card
- [ ] How it works card
- [ ] Last test summary
- [ ] Navigation

**Estimated Time:** 4 hours  
**Dependencies:** Task 5.1  
**Reference:** design.md - Home Screen


### Task 5.3: Accessibility Improvements
- [ ] Verify minimum font sizes (18pt body, 24pt headings)
- [ ] Verify touch targets (48x48 dp minimum)
- [ ] Verify contrast ratios (WCAG 2.1 AA)
- [ ] Add Semantics widgets
- [ ] Test with screen reader
- [ ] Test with font scaling (up to 200%)
- [ ] Add haptic feedback

**Estimated Time:** 8 hours  
**Dependencies:** All UI tasks  
**Reference:** design.md - Accessibility  
**Acceptance Criteria:** REQ-8 (Accessibility)  
**Correctness:** MUST meet WCAG 2.1 AA standards

### Task 5.4: Localization
- [ ] Setup l10n.yaml
- [ ] Create app_en.arb
- [ ] Create app_tr.arb
- [ ] Translate all strings
- [ ] Test language switching
- [ ] Test date/number formatting

**Estimated Time:** 6 hours  
**Dependencies:** All UI tasks  
**Reference:** design.md - Localization  
**Acceptance Criteria:** REQ-14 (Localization)

### Task 5.5: Analytics Integration
- [ ] Create AnalyticsService
- [ ] Implement event logging
- [ ] Implement screen view tracking
- [ ] Implement error logging
- [ ] Add consent mechanism
- [ ] Test analytics flow

**Estimated Time:** 5 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - Analytics & Monitoring  
**Acceptance Criteria:** REQ-15 (Analytics)

### Task 5.6: Biometric Authentication
- [ ] Setup local_auth package
- [ ] Implement biometric check
- [ ] Implement authentication flow
- [ ] Handle authentication failure
- [ ] Settings toggle

**Estimated Time:** 4 hours  
**Dependencies:** Phase 1  
**Reference:** design.md - Security & Privacy  
**Acceptance Criteria:** REQ-9 (Data Security)

### Task 5.7: Settings Screen
- [ ] Create SettingsScreen
- [ ] Theme selection
- [ ] Language selection
- [ ] Biometric toggle
- [ ] Analytics consent
- [ ] Privacy policy link
- [ ] About section

**Estimated Time:** 5 hours  
**Dependencies:** Task 5.6


### Task 5.8: Performance Optimization
- [ ] Profile app launch time (target: < 2s)
- [ ] Optimize waveform rendering (target: 30+ FPS)
- [ ] Profile memory usage (target: < 200MB)
- [ ] Add RepaintBoundary widgets
- [ ] Lazy load providers
- [ ] Cache API responses
- [ ] Optimize image assets

**Estimated Time:** 8 hours  
**Dependencies:** All features  
**Reference:** design.md - Performance Optimization  
**Acceptance Criteria:** REQ-13 (Performance)

### Task 5.9: Comprehensive Testing
- [ ] Unit tests for all services (80%+ coverage)
- [ ] Unit tests for all providers
- [ ] Widget tests for all screens
- [ ] Widget tests for all custom widgets
- [ ] Integration tests for main flows
- [ ] Fix all failing tests

**Estimated Time:** 12 hours  
**Dependencies:** All features  
**Reference:** design.md - Testing Strategy

### Task 5.10: Code Quality
- [ ] Run flutter analyze (fix all issues)
- [ ] Run dart format
- [ ] Add documentation comments
- [ ] Code review
- [ ] Refactor duplicated code

**Estimated Time:** 6 hours  
**Dependencies:** Task 5.9

### Task 5.11: Loading States & Animations
- [ ] Add loading indicators
- [ ] Add shimmer effects
- [ ] Add success animations
- [ ] Add error animations
- [ ] Smooth transitions

**Estimated Time:** 5 hours  
**Dependencies:** All UI tasks

**Phase 5 Total:** ~69 hours (~9 days)

---

## Phase 6: Deployment (Week 7-8)

### Task 6.1: Build Configurations
- [ ] Setup dev environment config
- [ ] Setup staging environment config
- [ ] Setup production environment config
- [ ] Test all environments

**Estimated Time:** 3 hours  
**Dependencies:** Phase 5  
**Reference:** design.md - Build Configurations


### Task 6.2: iOS Setup
- [ ] Configure Xcode project
- [ ] Set deployment target (iOS 13.0+)
- [ ] Configure Info.plist (permissions)
- [ ] Add app icons
- [ ] Add launch screen
- [ ] Configure signing
- [ ] Test on physical device

**Estimated Time:** 6 hours  
**Dependencies:** Task 6.1  
**Reference:** design.md - App Store Submission

### Task 6.3: Android Setup
- [ ] Configure build.gradle
- [ ] Set minSdkVersion (21) and targetSdkVersion (34)
- [ ] Configure AndroidManifest.xml (permissions)
- [ ] Add app icons (adaptive)
- [ ] Add splash screen
- [ ] Configure signing
- [ ] Test on physical device

**Estimated Time:** 6 hours  
**Dependencies:** Task 6.1  
**Reference:** design.md - App Store Submission

### Task 6.4: CI/CD Pipeline
- [ ] Setup GitHub Actions
- [ ] Configure Flutter CI workflow
- [ ] Add automated testing
- [ ] Add automated builds
- [ ] Add deployment scripts

**Estimated Time:** 5 hours  
**Dependencies:** Task 6.3  
**Reference:** design.md - CI/CD Pipeline

### Task 6.5: App Store Preparation
- [ ] Create App Store Connect account
- [ ] Prepare app metadata
- [ ] Prepare screenshots (all sizes)
- [ ] Prepare app preview video
- [ ] Write app description
- [ ] Privacy policy
- [ ] Terms of service

**Estimated Time:** 8 hours  
**Dependencies:** Task 6.2

### Task 6.6: Play Store Preparation
- [ ] Create Google Play Console account
- [ ] Prepare store listing
- [ ] Prepare screenshots (all sizes)
- [ ] Prepare feature graphic
- [ ] Write app description
- [ ] Privacy policy
- [ ] Content rating questionnaire

**Estimated Time:** 8 hours  
**Dependencies:** Task 6.3


### Task 6.7: Beta Testing
- [ ] Setup TestFlight (iOS)
- [ ] Setup Internal Testing (Android)
- [ ] Recruit beta testers (20-30 users)
- [ ] Distribute beta builds
- [ ] Collect feedback
- [ ] Fix critical bugs

**Estimated Time:** 16 hours (over 1 week)  
**Dependencies:** Task 6.5, Task 6.6

### Task 6.8: Final QA
- [ ] Test all features on iOS
- [ ] Test all features on Android
- [ ] Test on different screen sizes
- [ ] Test with different OS versions
- [ ] Test accessibility features
- [ ] Test offline mode
- [ ] Test error scenarios
- [ ] Performance testing

**Estimated Time:** 12 hours  
**Dependencies:** Task 6.7

### Task 6.9: App Store Submission
- [ ] Build release version (iOS)
- [ ] Upload to App Store Connect
- [ ] Submit for review
- [ ] Respond to review feedback
- [ ] Release to production

**Estimated Time:** 8 hours (+ review time)  
**Dependencies:** Task 6.8

### Task 6.10: Play Store Submission
- [ ] Build release version (Android)
- [ ] Upload to Play Console
- [ ] Submit for review
- [ ] Respond to review feedback
- [ ] Release to production

**Estimated Time:** 8 hours (+ review time)  
**Dependencies:** Task 6.8

### Task 6.11: Post-Launch Monitoring
- [ ] Monitor crash reports
- [ ] Monitor analytics
- [ ] Monitor user reviews
- [ ] Respond to user feedback
- [ ] Plan hotfixes if needed

**Estimated Time:** Ongoing  
**Dependencies:** Task 6.9, Task 6.10

**Phase 6 Total:** ~80 hours (~10 days + review time)

---

## Summary

**Total Estimated Time:** ~296 hours (~37 days of work)  
**With 8-week timeline:** ~5 hours/day (manageable pace)

### Critical Path
1. Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 6
2. Audio recording must work before API integration
3. API integration must work before results display
4. All features must be complete before deployment

### Risk Mitigation
- Start with audio recording (most critical)
- Test on real devices early
- Get beta feedback before launch
- Have rollback plan for production

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-19  
**Status:** Ready for Implementation

**Next Step:** Begin Phase 1 - Core Setup


