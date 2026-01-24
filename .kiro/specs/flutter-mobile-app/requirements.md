# Requirements Document - Flutter Mobile App

## Introduction

NeuralCipher.ai mobil uygulaması, 50+ yaş grubundaki kullanıcıların akıllı telefonları ile nörolojik sağlık taraması yapmalarını sağlayan bir Clinical Decision Support (CDS) aracıdır. Uygulama, medikal sınıf ses kaydı yaparak backend API'ye gönderir ve AI modeli ile risk skorunu kullanıcıya sunar.

## Glossary

- **User**: Uygulamayı kullanan hasta veya potansiel hasta
- **Audio_Capture**: Medikal sınıf ses kayıt modülü
- **Risk_Score**: AI modelinin hesapladığı 0.0-1.0 arası Parkinson riski
- **Backend_API**: FastAPI tabanlı backend servisi
- **Sustained_Phonation**: "Aaaa" sesi ile 5 saniyelik ses testi
- **Waveform_Visualizer**: Gerçek zamanlı ses dalgası görselleştirici
- **Pre_Flight_Check**: Kayıt öncesi ortam ve cihaz kontrolleri

---

## Requirements

### Requirement 1: Onboarding ve Kullanıcı Eğitimi

**User Story:** As a new user, I want to understand what the app does and how to use it, so that I can perform tests correctly and understand the results.

#### Acceptance Criteria

1. WHEN a user opens the app for the first time, THE App SHALL display a 3-slide onboarding flow
2. THE Onboarding SHALL explain "Why we record your voice", "How your data is protected", and "How to perform the test"
3. WHEN a user completes onboarding, THE App SHALL save the completion status locally
4. THE Onboarding SHALL use minimum 18pt font size for all text
5. THE Onboarding SHALL include skip button for returning users

### Requirement 2: Medical-Grade Audio Capture

**User Story:** As a user, I want to record high-quality voice samples, so that the AI model can accurately analyze my neurological health.

#### Acceptance Criteria

1. WHEN recording audio, THE Audio_Capture SHALL use Linear PCM (WAV) format
2. THE Audio_Capture SHALL record at 44.1 kHz sample rate with 16-bit depth
3. THE Audio_Capture SHALL use mono (single channel) recording
4. WHEN recording starts, THE App SHALL record exactly 5 seconds of audio
5. WHEN recording completes, THE App SHALL save the file with timestamp in filename
6. IF recording fails, THEN THE App SHALL show error message and allow retry

### Requirement 3: Pre-Flight Environmental Checks

**User Story:** As a user, I want to be guided to optimal recording conditions, so that my test results are accurate.

#### Acceptance Criteria

1. WHEN user taps "Start Test", THE App SHALL check ambient noise level
2. IF ambient noise > 40dB, THEN THE App SHALL warn user to find quieter location
3. THE App SHALL display visual guide showing phone should be 15-20cm from mouth
4. WHEN pre-flight check starts, THE App SHALL check battery level
5. IF battery < 20%, THEN THE App SHALL warn user to charge device
6. THE App SHALL check available storage space
7. IF storage < 50MB, THEN THE App SHALL warn user to free up space

### Requirement 4: Recording Interface and Visual Feedback

**User Story:** As a user, I want clear visual feedback during recording, so that I know the test is working correctly.

#### Acceptance Criteria

1. THE Recording_Screen SHALL display a large circular "Start Recording" button (minimum 80dp diameter)
2. WHEN recording starts, THE App SHALL display real-time waveform visualization
3. THE App SHALL show countdown timer from 5 to 0 seconds
4. WHILE recording, THE App SHALL display "Keep saying Aaaa" instruction
5. WHEN recording completes, THE App SHALL show success animation
6. THE Waveform_Visualizer SHALL update at minimum 30 FPS for smooth animation

### Requirement 5: Backend API Integration

**User Story:** As a user, I want my voice sample analyzed by AI, so that I can receive my risk assessment.

#### Acceptance Criteria

1. WHEN recording completes, THE App SHALL upload audio file to Backend_API
2. THE App SHALL use multipart/form-data for file upload
3. WHEN upload starts, THE App SHALL show "Analyzing..." loading indicator
4. IF upload fails, THEN THE App SHALL retry up to 3 times with exponential backoff
5. WHEN API returns result, THE App SHALL parse and display risk score
6. THE App SHALL handle network timeout (30 seconds) gracefully
7. IF network unavailable, THEN THE App SHALL save recording locally and queue for later upload

### Requirement 6: Results Display and Interpretation

**User Story:** As a user, I want to understand my risk assessment in simple terms, so that I know what action to take.

#### Acceptance Criteria

1. WHEN analysis completes, THE App SHALL display risk score as colored bar (Green/Yellow/Red)
2. THE App SHALL show risk level text: "Low Risk", "Medium Risk", or "High Risk"
3. THE App SHALL display interpretation message appropriate to risk level
4. FOR Low Risk, THE App SHALL recommend "Regular monitoring"
5. FOR Medium Risk, THE App SHALL recommend "Consult neurologist"
6. FOR High Risk, THE App SHALL recommend "Urgent neurologist consultation"
7. THE Results_Screen SHALL include "Share with Doctor" button
8. THE Results_Screen SHALL include "Take Another Test" button

### Requirement 7: Test History and Tracking

**User Story:** As a user, I want to see my previous test results, so that I can track changes over time.

#### Acceptance Criteria

1. THE App SHALL store all test results locally using SQLite
2. THE History_Screen SHALL display list of past tests with date and risk score
3. WHEN user taps a history item, THE App SHALL show detailed results
4. THE History_Screen SHALL show trend graph if user has 3+ tests
5. THE App SHALL allow user to delete individual test results
6. THE App SHALL sync test history with backend when online

### Requirement 8: Accessibility for 50+ Age Group

**User Story:** As an older user, I want large, clear interface elements, so that I can use the app without difficulty.

#### Acceptance Criteria

1. THE App SHALL use minimum 18pt font size for all body text
2. THE App SHALL use minimum 24pt font size for headings
3. ALL interactive elements SHALL have minimum 48x48 dp touch target
4. THE App SHALL use high contrast colors meeting WCAG 2.1 AA standards
5. THE App SHALL support system font scaling up to 200%
6. THE App SHALL use simple, clear language avoiding medical jargon
7. THE App SHALL provide haptic feedback for all button presses

### Requirement 9: Data Security and Privacy

**User Story:** As a user, I want my health data protected, so that my privacy is maintained.

#### Acceptance Criteria

1. WHEN analysis completes, THE App SHALL delete local audio file
2. THE App SHALL use HTTPS for all API communication
3. THE App SHALL implement SSL certificate pinning
4. WHERE biometric authentication available, THE App SHALL require Face ID or Fingerprint on app launch
5. THE App SHALL encrypt all locally stored test results using AES-256
6. THE App SHALL display privacy policy on first launch
7. THE App SHALL require explicit consent before uploading any data

### Requirement 10: Offline Mode and Sync

**User Story:** As a user, I want to take tests even without internet, so that I can use the app anywhere.

#### Acceptance Criteria

1. WHEN network unavailable, THE App SHALL allow recording audio
2. THE App SHALL queue recordings for upload when online
3. WHEN network becomes available, THE App SHALL automatically sync queued recordings
4. THE App SHALL show sync status indicator
5. THE App SHALL allow user to manually trigger sync
6. IF sync fails after 3 attempts, THEN THE App SHALL notify user

### Requirement 11: Dark Mode Support

**User Story:** As a user, I want dark mode option, so that I can use the app comfortably in low light.

#### Acceptance Criteria

1. THE App SHALL support both light and dark themes
2. THE App SHALL follow system theme preference by default
3. THE App SHALL allow manual theme selection in settings
4. WHEN theme changes, THE App SHALL update all screens without restart
5. THE Dark_Theme SHALL maintain WCAG 2.1 AA contrast ratios

### Requirement 12: Error Handling and User Feedback

**User Story:** As a user, I want clear error messages, so that I know what went wrong and how to fix it.

#### Acceptance Criteria

1. WHEN error occurs, THE App SHALL display user-friendly error message
2. THE App SHALL avoid technical jargon in error messages
3. THE App SHALL provide actionable suggestions for error resolution
4. WHEN microphone permission denied, THE App SHALL show instructions to enable it
5. WHEN API error occurs, THE App SHALL display "Try again later" message
6. THE App SHALL log errors locally for debugging
7. THE App SHALL include "Report Problem" button in settings

### Requirement 13: Performance and Responsiveness

**User Story:** As a user, I want the app to respond quickly, so that I have a smooth experience.

#### Acceptance Criteria

1. THE App SHALL launch in less than 2 seconds on modern devices
2. THE App SHALL respond to user input within 100ms
3. THE Waveform_Visualizer SHALL maintain 30+ FPS during recording
4. THE App SHALL handle audio processing in background thread
5. THE App SHALL show loading indicators for operations > 500ms
6. THE App SHALL cache API responses for 5 minutes

### Requirement 14: Localization Support

**User Story:** As a Turkish user, I want the app in my language, so that I can understand all instructions.

#### Acceptance Criteria

1. THE App SHALL support English and Turkish languages
2. THE App SHALL detect system language and use it by default
3. THE App SHALL allow manual language selection in settings
4. WHEN language changes, THE App SHALL update all text immediately
5. THE App SHALL format dates and numbers according to selected locale

### Requirement 15: Analytics and Monitoring

**User Story:** As a product owner, I want to track app usage, so that I can improve the user experience.

#### Acceptance Criteria

1. THE App SHALL track screen views anonymously
2. THE App SHALL track test completion rate
3. THE App SHALL track error occurrences
4. THE App SHALL track average recording quality metrics
5. THE App SHALL send analytics only when user consents
6. THE App SHALL not track any personally identifiable information

---

## Non-Functional Requirements

### Performance
- App size: < 50MB
- Memory usage: < 200MB during recording
- Battery impact: < 5% per test

### Compatibility
- iOS: 13.0+
- Android: API 21+ (Android 5.0+)
- Devices: iPhone 6s+, Android devices with decent microphone

### Reliability
- Crash rate: < 0.1%
- Recording success rate: > 99%
- API success rate: > 95%

### Security
- OWASP Mobile Top 10 compliance
- Regular security audits
- Penetration testing before launch

---

## Technical Constraints

1. Flutter SDK 3.0+
2. Dart 3.0+
3. Minimum 44.1kHz audio recording capability
4. Internet connection for analysis (offline recording supported)
5. Microphone permission required
6. Storage permission required (Android)

---

## Regulatory Compliance

1. HIPAA compliance for US market
2. GDPR compliance for EU market
3. KVKK compliance for Turkey market
4. Medical device regulations (Class I/II)
5. App Store and Play Store guidelines

---

## Success Metrics

1. User completes onboarding: > 80%
2. Test completion rate: > 90%
3. User retention (7-day): > 60%
4. Average session duration: 2-3 minutes
5. User satisfaction (NPS): > 50
6. App Store rating: > 4.5/5

---

**Document Version:** 1.0  
**Last Updated:** 2026-01-19  
**Status:** Ready for Design Phase

