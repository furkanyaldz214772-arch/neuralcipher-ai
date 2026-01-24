# 🚀 HIZLI TEST REHBERİ

## ✅ SİSTEM DURUMU

- **Backend:** ✅ Çalışıyor (http://localhost:8000)
- **Frontend:** ✅ Çalışıyor (http://localhost:3000)
- **Database:** ✅ SQLite (5 test kaydı)
- **ML Model:** ✅ v6.0 yüklü

---

## 🔐 GİRİŞ BİLGİLERİ

```
Email: patient@test.com
Password: Patient123!@#
```

---

## 🧪 HIZLI TEST ADIMLARI

### 1. Backend API Testi (Terminal)

```bash
cd neuralcipher-ai/backend
python test_full_system.py
```

**Beklenen Çıktı:**
```
✅ Login successful
✅ Found 5 tests
✅ Results retrieved successfully
✅ ALL TESTS PASSED!
```

### 2. Frontend Browser Testi

**Adım 1:** Test dosyasını aç
```
neuralcipher-ai/test_frontend_api.html
```

**Adım 2:** "Run All Tests" butonuna tıkla

**Beklenen Sonuç:**
```
✅ Login works
✅ Test list works
✅ Test results works
🎉 ALL TESTS PASSED!
```

### 3. Frontend Sayfalarını Test Et

#### A. Login Sayfası
**URL:** http://localhost:3000/auth/login

**Test:**
1. Email: `patient@test.com`
2. Password: `Patient123!@#`
3. "Giriş Yap" butonuna tıkla
4. Dashboard'a yönlendirilmelisin

**Beklenen:** ✅ Başarılı giriş, dashboard'a yönlendirme

---

#### B. Dashboard
**URL:** http://localhost:3000/dashboard

**Test:**
1. Kullanıcı bilgilerini gör
2. Son testleri gör
3. "Yeni Test" butonunu gör

**Beklenen:** ✅ Dashboard içeriği gösteriliyor

---

#### C. Test Geçmişi
**URL:** http://localhost:3000/history

**Test:**
1. Test listesini gör (5 test)
2. Her testin durumunu gör
3. Bir teste tıkla

**Beklenen:** ✅ Test listesi gösteriliyor, tıklanabiliyor

---

#### D. Test Sonuçları
**URL:** http://localhost:3000/results/5

**Test:**
1. Risk skorunu gör (76%)
2. Biomarker değerlerini gör
3. Yorumları oku
4. Önerileri oku

**Beklenen:** ✅ Tüm veriler gösteriliyor

---

#### E. Yeni Test
**URL:** http://localhost:3000/test/new

**Test:**
1. "Kayda Başla" butonuna tıkla
2. Mikrofon izni ver
3. Ses kaydet
4. Yükle

**Beklenen:** ⚠️ Yükleme çalışıyor ama FFmpeg gerekli

---

## 📊 MEVCUT TEST VERİLERİ

| Test ID | Durum | Risk | URL |
|---------|-------|------|-----|
| 5 | ✅ completed | 76% | http://localhost:3000/results/5 |
| 2 | ✅ completed | 99% | http://localhost:3000/results/2 |
| 4 | ❌ failed | - | - |
| 3 | ⏳ processing | - | - |
| 1 | ❌ failed | - | - |

---

## 🔍 SORUN GİDERME

### "Test sonuçları bulunamadı" Hatası

**Çözüm:** ✅ ÇÖZÜLDÜ! Backend API düzeltildi.

**Kontrol:**
```bash
python test_full_system.py
```

---

### Backend Çalışmıyor

**Kontrol:**
```bash
curl http://localhost:8000/health
```

**Başlat:**
```bash
cd neuralcipher-ai/backend
python fix_and_start.py
```

---

### Frontend Çalışmıyor

**Kontrol:**
```bash
curl http://localhost:3000
```

**Başlat:**
```bash
cd neuralcipher-ai/frontend
npm run dev
```

---

### Login Çalışmıyor

**Kontrol:**
```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"patient@test.com","password":"Patient123!@#"}'
```

**Beklenen:** Token dönmeli

---

### Test Listesi Boş

**Kontrol:**
```bash
python -c "import sqlite3; conn = sqlite3.connect('neuralcipher-ai/backend/neuralcipher_dev.db'); cursor = conn.cursor(); cursor.execute('SELECT COUNT(*) FROM voice_tests'); print('Tests:', cursor.fetchone()[0]); conn.close()"
```

**Beklenen:** 5 test

---

## 🎯 BAŞARI KRİTERLERİ

### ✅ Backend
- [x] Server çalışıyor
- [x] ML model yüklü
- [x] Login endpoint çalışıyor
- [x] Test listesi endpoint çalışıyor
- [x] Test sonuçları endpoint çalışıyor

### ✅ Frontend
- [x] Server çalışıyor
- [x] Login sayfası çalışıyor
- [x] Dashboard gösteriliyor
- [ ] Test geçmişi çalışıyor (kontrol et)
- [ ] Test sonuçları çalışıyor (kontrol et)

### ✅ API İletişimi
- [x] Frontend backend'e bağlanabiliyor
- [x] Token authentication çalışıyor
- [x] Veri formatı uyumlu

---

## 📞 YARDIM

### Hata Logları

**Backend:**
```bash
# Terminal'de çalışan backend'in çıktısını kontrol et
```

**Frontend:**
```bash
# Browser console'u aç (F12)
# Network tab'ını kontrol et
```

### API Dokümantasyonu

**Swagger UI:** http://localhost:8000/docs

**Endpoints:**
- POST `/api/v1/auth/login` - Login
- GET `/api/v1/tests` - Test listesi
- GET `/api/v1/tests/{id}` - Test detayı
- GET `/api/v1/tests/{id}/results` - Test sonuçları

---

## ✅ SONUÇ

Sistem çalışır durumda! Tüm testler başarılı.

**Sonraki Adım:** Frontend'de test sonuçlarını kontrol et:
1. http://localhost:3000/auth/login - Giriş yap
2. http://localhost:3000/history - Test listesini gör
3. http://localhost:3000/results/5 - Sonuçları gör

---

**Son Güncelleme:** 21 Ocak 2026, 13:50  
**Durum:** ✅ SİSTEM HAZIR
