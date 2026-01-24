# 🚀 10 Günlük Sprint Plan - Flutter Mobile App

## Sprint Hedefi

10 gün içinde **çalışan bir MVP (Minimum Viable Product)** oluşturmak:
- ✅ Ses kaydı yapabilen
- ✅ Backend'e gönderip analiz alabilen
- ✅ Sonuçları gösterebilen
- ✅ Temel UI/UX'i olan

**Başlangıç:** 2026-01-20 (Pazartesi)  
**Bitiş:** 2026-01-29 (Çarşamba)  
**Çalışma Saati:** Günde 8 saat (toplam 80 saat)

---

## 📅 Günlük Plan

### GÜN 1 (Pazartesi) - Setup & Foundation
**Hedef:** Proje kurulumu ve temel yapı

**Sabah (4 saat):**
- [ ] Flutter SDK kurulumu ve doğrulama
- [ ] Android Studio / VS Code setup
- [ ] Flutter projesi oluştur: `flutter create neuralcipher_mobile`
- [ ] Git repository kurulumu
- [ ] pubspec.yaml dependencies ekleme

**Öğleden Sonra (4 saat):**
- [ ] Proje klasör yapısını oluştur
- [ ] Theme configuration (light/dark)
- [ ] Route setup
- [ ] Constants dosyaları (API, Audio, App)
- [ ] İlk test: "Hello World" ekranı

**Deliverable:** Çalışan boş Flutter projesi

---

### GÜN 2 (Salı) - Audio Recording Core
**Hedef:** Ses kayıt altyapısı

**Sabah (4 saat):**
- [ ] Permission service implementation
- [ ] Audio recording service (44.1kHz, 16-bit, WAV)
- [ ] Test: Basit ses kaydı
- [ ] Dosya kaydetme ve okuma

**Öğleden Sonra (4 saat):**
- [ ] RecordingProvider (state management)
- [ ] Amplitude stream handling
- [ ] 5 saniyelik countdown timer
- [ ] Test: Gerçek cihazda ses kaydı

**Deliverable:** Çalışan ses kayıt servisi

---

### GÜN 3 (Çarşamba) - Recording UI
**Hedef:** Kayıt ekranı ve görselleştirme

**Sabah (4 saat):**
- [ ] Recording screen UI
- [ ] Waveform visualizer widget (CustomPainter)
- [ ] Countdown timer UI
- [ ] Record button (80dp, büyük)

**Öğleden Sonra (4 saat):**
- [ ] Real-time waveform animation (30 FPS)
- [ ] Recording state indicators
- [ ] Cancel button
- [ ] Haptic feedback
- [ ] Test: Tam kayıt akışı

**Deliverable:** Çalışan kayıt ekranı

---

### GÜN 4 (Perşembe) - API Integration
**Hedef:** Backend bağlantısı

**Sabah (4 saat):**
- [ ] Dio client setup
- [ ] API service implementation
- [ ] AnalysisResponse models (JSON serialization)
- [ ] uploadAndAnalyze() method

**Öğleden Sonra (4 saat):**
- [ ] AnalysisProvider (state management)
- [ ] Upload progress indicator
- [ ] Error handling
- [ ] Test: Backend'e ses gönderme

**Deliverable:** Backend entegrasyonu çalışıyor

---

### GÜN 5 (Cuma) - Results Display
**Hedef:** Sonuç ekranı

**Sabah (4 saat):**
- [ ] Results screen UI
- [ ] Risk score bar (color-coded)
- [ ] Risk level text ve icon
- [ ] Interpretation message

**Öğleden Sonra (4 saat):**
- [ ] Recommendations section
- [ ] Disclaimer text
- [ ] "Take New Test" button
- [ ] Test: End-to-end flow (kayıt → analiz → sonuç)

**Deliverable:** Tam çalışan MVP flow

---

### GÜN 6 (Cumartesi) - Local Storage
**Hedef:** Test geçmişi

**Sabah (4 saat):**
- [ ] SQLite database setup
- [ ] TestHistory entity ve model
- [ ] HistoryRepository implementation
- [ ] Save test results

**Öğleden Sonra (4 saat):**
- [ ] History screen UI
- [ ] List of past tests
- [ ] Tap to view details
- [ ] Delete functionality
- [ ] Test: Geçmiş kaydetme ve görüntüleme

**Deliverable:** Test geçmişi çalışıyor

---

### GÜN 7 (Pazar) - Polish & UX
**Hedef:** Kullanıcı deneyimi iyileştirmeleri

**Sabah (4 saat):**
- [ ] Home screen (ana ekran)
- [ ] Navigation flow optimization
- [ ] Loading states (shimmer effects)
- [ ] Error dialogs

**Öğleden Sonra (4 saat):**
- [ ] Onboarding flow (3 slides)
- [ ] Splash screen
- [ ] App icon
- [ ] Accessibility improvements (font sizes, touch targets)

**Deliverable:** Kullanıcı dostu UI

---

### GÜN 8 (Pazartesi) - Pre-Flight & Offline
**Hedef:** Ek özellikler

**Sabah (4 saat):**
- [ ] Environment checker (noise, battery, storage)
- [ ] Pre-flight check screen
- [ ] Warning messages

**Öğleden Sonra (4 saat):**
- [ ] Offline mode (queue uploads)
- [ ] Connectivity monitoring
- [ ] Auto-sync when online
- [ ] Retry logic (exponential backoff)

**Deliverable:** Robust error handling

---

### GÜN 9 (Salı) - Testing & Bug Fixes
**Hedef:** Kalite güvence

**Sabah (4 saat):**
- [ ] Unit tests (core services)
- [ ] Widget tests (key screens)
- [ ] Integration test (main flow)
- [ ] Fix critical bugs

**Öğleden Sonra (4 saat):**
- [ ] Test on multiple devices
- [ ] Test different scenarios (offline, errors, etc.)
- [ ] Performance profiling
- [ ] Memory leak check

**Deliverable:** Stable, tested app

---

### GÜN 10 (Çarşamba) - Final Polish & Demo
**Hedef:** Production-ready MVP

**Sabah (4 saat):**
- [ ] Code cleanup
- [ ] Documentation (README, comments)
- [ ] Build release APK/IPA
- [ ] Final testing

**Öğleden Sonra (4 saat):**
- [ ] Demo preparation
- [ ] Screenshots
- [ ] Demo video
- [ ] Deployment checklist

**Deliverable:** Production-ready MVP

---

## 🎯 Sprint Deliverables

### Minimum Viable Product (MVP)

**Core Features:**
1. ✅ Medical-grade audio recording (44.1kHz, 16-bit, WAV)
2. ✅ Backend API integration
3. ✅ Risk score analysis and display
4. ✅ Test history (local storage)
5. ✅ Basic UI/UX (accessible for 50+)

**Technical:**
- ✅ Flutter app running on Android/iOS
- ✅ Clean architecture (basic)
- ✅ State management (Provider)
- ✅ Error handling
- ✅ Offline support (basic)

**Quality:**
- ✅ No critical bugs
- ✅ Tested on real devices
- ✅ Basic test coverage
- ✅ Performance acceptable

---

## 📋 Daily Checklist Template

```
□ Morning standup (5 min)
  - What did I do yesterday?
  - What will I do today?
  - Any blockers?

□ Focus work (3.5 hours)
  - No distractions
  - Follow task list

□ Lunch break (30 min)

□ Afternoon work (3.5 hours)
  - Continue tasks
  - Test as you go

□ End of day (30 min)
  - Commit code
  - Update progress
  - Plan tomorrow
```

---

## 🚨 Risk Management

### Potential Blockers

**1. Audio Recording Issues**
- **Risk:** Platform-specific problems
- **Mitigation:** Test early (Day 2), have fallback plan

**2. Backend Connection**
- **Risk:** Network issues, CORS
- **Mitigation:** Test with Postman first, mock data ready

**3. Performance Problems**
- **Risk:** Slow waveform, memory leaks
- **Mitigation:** Profile early, optimize as needed

**4. Time Overruns**
- **Risk:** Tasks taking longer than expected
- **Mitigation:** Cut scope, focus on MVP only

### Scope Management

**Must Have (MVP):**
- Audio recording
- Backend integration
- Results display
- Basic history

**Nice to Have (Post-MVP):**
- Trend charts
- Share functionality
- Biometric auth
- Advanced animations

**Won't Have (This Sprint):**
- Multi-language (only Turkish)
- Dark mode (only light)
- Analytics
- Push notifications

---

## 🛠️ Development Setup (Day 1 Morning)

### Quick Start Commands

```bash
# 1. Verify Flutter
flutter doctor

# 2. Create project
cd neuralcipher-ai
flutter create neuralcipher_mobile
cd neuralcipher_mobile

# 3. Add dependencies (copy from design.md)
# Edit pubspec.yaml

# 4. Get packages
flutter pub get

# 5. Run
flutter run
```

### Essential Dependencies (Minimal)

```yaml
dependencies:
  flutter:
    sdk: flutter
  
  # State Management
  provider: ^6.1.0
  
  # Audio
  record: ^5.0.0
  path_provider: ^2.1.0
  permission_handler: ^11.0.0
  
  # API
  dio: ^5.4.0
  json_annotation: ^4.8.0
  
  # Storage
  sqflite: ^2.3.0
  
  # Utils
  intl: ^0.18.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  build_runner: ^2.4.0
  json_serializable: ^6.7.0
```

---

## 📊 Progress Tracking

### Daily Progress Table

| Day | Date | Tasks | Status | Notes |
|-----|------|-------|--------|-------|
| 1 | 20 Jan | Setup & Foundation | ⏳ | |
| 2 | 21 Jan | Audio Recording Core | ⏳ | |
| 3 | 22 Jan | Recording UI | ⏳ | |
| 4 | 23 Jan | API Integration | ⏳ | |
| 5 | 24 Jan | Results Display | ⏳ | |
| 6 | 25 Jan | Local Storage | ⏳ | |
| 7 | 26 Jan | Polish & UX | ⏳ | |
| 8 | 27 Jan | Pre-Flight & Offline | ⏳ | |
| 9 | 28 Jan | Testing & Bug Fixes | ⏳ | |
| 10 | 29 Jan | Final Polish & Demo | ⏳ | |

**Legend:** ⏳ Pending | 🔄 In Progress | ✅ Done | ⚠️ Blocked

---

## 🎓 Success Criteria

### End of Sprint Goals

**Functional:**
- [ ] User can record 5-second voice sample
- [ ] App uploads to backend and gets risk score
- [ ] Results displayed clearly
- [ ] Test history saved and viewable
- [ ] App works offline (queues uploads)

**Technical:**
- [ ] No crashes on main flow
- [ ] Audio quality verified (44.1kHz, WAV)
- [ ] API integration working
- [ ] Basic tests passing
- [ ] Code committed to Git

**UX:**
- [ ] Large fonts (18pt+)
- [ ] Clear instructions
- [ ] Loading indicators
- [ ] Error messages helpful
- [ ] Navigation intuitive

---

## 💡 Pro Tips

### Time Management
1. **Start early each day** - Most productive in morning
2. **Time-box tasks** - Don't perfect, just make it work
3. **Test frequently** - Catch issues early
4. **Commit often** - Small, working increments

### Development
1. **Hot reload is your friend** - Use `r` constantly
2. **Test on real device** - Emulator ≠ real device
3. **Keep backend running** - Don't restart unnecessarily
4. **Use print() for debugging** - Quick and effective

### Scope Control
1. **MVP first** - Fancy features later
2. **Hardcode if needed** - Can refactor later
3. **Skip animations** - Add in polish phase
4. **One language** - Turkish only for now

---

## 📞 Support Resources

### Documentation
- Flutter Docs: https://flutter.dev/docs
- Provider: https://pub.dev/packages/provider
- Record: https://pub.dev/packages/record
- Dio: https://pub.dev/packages/dio

### Project Files
- Requirements: `.kiro/specs/flutter-mobile-app/requirements.md`
- Design: `.kiro/specs/flutter-mobile-app/design.md`
- Tasks: `.kiro/specs/flutter-mobile-app/tasks.md`
- Getting Started: `.kiro/specs/flutter-mobile-app/GETTING_STARTED.md`

### Backend
- URL: http://localhost:8000
- Docs: http://localhost:8000/docs
- Health: http://localhost:8000/health

---

## 🎉 Sprint Completion

### Definition of Done

- [ ] MVP features working
- [ ] Tested on 2+ devices
- [ ] No critical bugs
- [ ] Code committed
- [ ] Demo ready
- [ ] Documentation updated

### Next Steps After Sprint

1. **User Testing** - Get feedback from 5-10 users
2. **Iteration** - Fix issues, add polish
3. **Feature Expansion** - Add nice-to-have features
4. **Beta Testing** - Wider audience
5. **App Store Submission** - Production release

---

**Sprint Status:** 🚀 Ready to Start  
**Confidence Level:** High  
**Team Size:** 1 developer  
**Expected Outcome:** Working MVP in 10 days

**Let's build something amazing! 💪**


