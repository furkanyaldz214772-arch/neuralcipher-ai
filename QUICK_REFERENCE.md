# ⚡ NeuralCipher.ai - Quick Reference Guide

**Fast access to key information**

---

## 🚀 Quick Start

### Backend
```bash
cd backend
python simple_start.py
# → http://localhost:8000
```

### Mobile App
```bash
cd neuralcipher_mobile
flutter pub get
flutter run
```

---

## 📊 Project Status (At a Glance)

```
Backend:    ████████████████████ 100% ✅
AI Model:   ████████████████████ 100% ✅
Docs:       ████████████████████ 100% ✅
Mobile:     ████░░░░░░░░░░░░░░░░  20% 🔄
OVERALL:    ████████████░░░░░░░░  68%
```

---

## 🎯 Key Metrics

### AI Model
- **Accuracy:** 92.31%
- **AUC-ROC:** 96.21%
- **Sensitivity:** 96.55%
- **Response Time:** ~200ms

### Audio Specs
- **Sample Rate:** 44.1 kHz
- **Bit Depth:** 16-bit
- **Format:** WAV (Linear PCM)
- **Channels:** Mono
- **Duration:** 5 seconds

---

## 📁 Key Files

### Backend
- `backend/simple_start.py` - Start server
- `backend/app/api/routes/voice.py` - API endpoints
- `backend/app/services/ml_inference.py` - ML service

### AI Model
- `ai-pipeline/models/neuralcipher_v1.0.pkl` - Trained model
- `ai-pipeline/src/feature_extractor.py` - Feature extraction
- `feature_extractor_59.py` - 59 features (reference)

### Mobile App
- `neuralcipher_mobile/lib/main.dart` - App entry
- `neuralcipher_mobile/lib/core/services/audio_service.dart` - Audio recording
- `neuralcipher_mobile/lib/features/recording/presentation/screens/recording_screen.dart` - Recording UI

### Documentation
- `PROJECT_MASTER_SUMMARY.md` - Complete overview
- `FINAL_STATUS_REPORT.md` - Status report
- `AI_MODEL_DOCUMENTATION.md` - Model details
- `neuralcipher_mobile/FEATURE_EXTRACTION_GUIDE.md` - 59 features explained

---

## 🔗 API Endpoints

```
POST   /api/v1/voice/process      - Analyze audio
GET    /api/v1/voice/model-info   - Model info
GET    /api/v1/voice/health-check - Health check
GET    /api/v1/voice/stats        - Statistics
GET    /docs                      - Swagger UI
```

---

## 🧬 59 Features Breakdown

- **40 MFCC:** Voice timbre analysis
- **12 Spectral:** Brightness, bandwidth, noise
- **7 Neurological:** Jitter, Shimmer, HNR, F0, etc.

**Critical Biomarkers:**
- Jitter >1.0% = Parkinson indicator
- Shimmer >3.5% = Parkinson indicator
- HNR <20 dB = Parkinson indicator

---

## 📱 Mobile App Commands

```bash
# Analyze code
flutter analyze

# Run tests
flutter test

# Format code
dart format lib/

# Build APK
flutter build apk --release

# Build iOS
flutter build ios --release
```

---

## 🐛 Common Issues

### Backend won't start
```bash
# Check Python version
python --version  # Should be 3.11+

# Reinstall dependencies
pip install -r requirements.txt
```

### Flutter errors
```bash
# Clean and rebuild
flutter clean
flutter pub get

# Check doctor
flutter doctor
```

### Permission issues (Mobile)
- Android: Check `AndroidManifest.xml`
- iOS: Check `Info.plist`

---

## 📞 Quick Links

- **Backend API:** http://localhost:8000
- **API Docs:** http://localhost:8000/docs
- **GitHub:** [repo-url]
- **Email:** info@NeuralCipher.ai

---

## 🎯 Next Steps

**GÜN 3:** Pre-flight checks + UI polish  
**GÜN 4:** API integration  
**GÜN 5:** Results display  
**GÜN 6-10:** History, testing, demo

---

**Last Updated:** 2026-01-21  
**Version:** 1.0



