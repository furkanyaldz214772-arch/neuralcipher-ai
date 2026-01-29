# ✅ NeuralCipher Mobile - Aksiyon Planı

**Tarih:** 29 Ocak 2026  
**Hedef:** Web ile entegre, yatırımcı sunumuna hazır mobil uygulama

---

## 🎯 TEMEL KARARLAR

### ✅ Platform: Flutter
**Neden?**
- Tek kod, iki platform (iOS + Android)
- Web ile aynı veritabanı kullanımı kolay
- Native performans
- Hızlı geliştirme (hot reload)

### ✅ Veritabanı: Mevcut PostgreSQL (Railway)
**Nasıl?**
- Web backend API'leri kullan
- Aynı endpoint'ler
- Aynı JWT token sistemi
- Aynı kullanıcı tablosu

### ✅ Önizleme: Web + Android Emulator
**Neden?**
- Web: Hızlı iterasyon
- Emulator: Tam özellik testi
- Fiziksel cihaz: Final test

---

## 📋 HAFTALIK PLAN

### Hafta 1: Temel Altyapı (29 Ocak - 4 Şubat)

**Gün 1-2: Kurulum**
- [ ] Flutter SDK kur
- [ ] Android Studio kur
- [ ] Proje oluştur
- [ ] İlk ekranı çalıştır (web preview)

**Gün 3-4: Auth Sistemi**
- [ ] API service implementasyonu
- [ ] Login ekranı
- [ ] Register ekranı
- [ ] Token yönetimi
- [ ] Web backend ile test

**Gün 5-7: Dashboard**
- [ ] Ana ekran tasarımı
- [ ] 6 analiz tipi kartları
- [ ] Profil ekranı
- [ ] Navigation sistemi

**Teslim:** Login yapıp dashboard görebilme

---

### Hafta 2: Ses Kaydı (5-11 Şubat)

**Gün 1-2: Mikrofon**
- [ ] Permission handler
- [ ] Ses kaydı (record package)
- [ ] Kayıt ekranı UI
- [ ] Geri sayım timer

**Gün 3-4: Spektrogram**
- [ ] FFT implementasyonu
- [ ] Real-time görselleştirme
- [ ] Renkli frekans grafiği
- [ ] Smooth animasyonlar

**Gün 5-7: AI Feedback**
- [ ] Ses seviyesi kontrolü
- [ ] Gürültü tespiti
- [ ] Anlık feedback mesajları
- [ ] Haptic feedback

**Teslim:** 10 saniyelik ses kaydı yapabilme

---

### Hafta 3: Backend Entegrasyonu (12-18 Şubat)

**Gün 1-2: Upload**
- [ ] FormData ile ses dosyası gönderme
- [ ] Progress indicator
- [ ] Error handling
- [ ] Retry mekanizması

**Gün 3-4: Sonuç Alma**
- [ ] Polling ile sonuç bekleme
- [ ] Sonuç ekranı tasarımı
- [ ] Risk skoru gösterimi
- [ ] AI analizi detayları

**Gün 5-7: Paylaşım**
- [ ] PDF export
- [ ] QR kod ile doğrulama
- [ ] Doktora gönderme
- [ ] Email paylaşımı

**Teslim:** Tam test akışı (kayıt → upload → sonuç)

---

### Hafta 4: Offline & Polish (19-25 Şubat)

**Gün 1-3: Offline Destek**
- [ ] SQLite local database
- [ ] Sync queue
- [ ] Background sync
- [ ] Conflict resolution

**Gün 4-5: Animasyonlar**
- [ ] Lottie animasyonlar
- [ ] Splash screen polish
- [ ] Transition animasyonları
- [ ] Loading states

**Gün 6-7: Güvenlik**
- [ ] Biometric auth (Face ID/Touch ID)
- [ ] Secure storage
- [ ] SSL pinning
- [ ] Data encryption

**Teslim:** Production-ready app

---

### Hafta 5-6: Test & Deploy (26 Şubat - 10 Mart)

**Hafta 5: Beta Test**
- [ ] TestFlight (iOS)
- [ ] Play Console Internal Test (Android)
- [ ] 10 beta kullanıcısı
- [ ] Feedback toplama
- [ ] Bug fixes

**Hafta 6: Yayın**
- [ ] App Store başvurusu
- [ ] Play Store başvurusu
- [ ] Marketing materyalleri
- [ ] Yatırımcı demo hazırlığı

**Teslim:** Canlı uygulama

---

## 🚀 BUGÜN BAŞLA (30 Dakika)

### Adım 1: Flutter Kur (10 dk)
```powershell
# Flutter SDK indir
# https://flutter.dev/docs/get-started/install/windows

# PATH'e ekle
# flutter doctor çalıştır
```

### Adım 2: Proje Oluştur (5 dk)
```powershell
cd neuralcipher-ai
flutter create neuralcipher_mobile
cd neuralcipher_mobile
```

### Adım 3: İlk Ekranı Çalıştır (5 dk)
```powershell
flutter run -d chrome
```

### Adım 4: Backend Test (10 dk)
```dart
// API service oluştur
// Login endpoint test et
// Web'deki kullanıcı ile giriş yap
```

---

## 📊 İLERLEME TAKİBİ

### Hafta 1 (Temel Altyapı)
- [ ] Flutter kurulumu ✓
- [ ] Proje oluşturma ✓
- [ ] Splash screen ✓
- [ ] Login ekranı ✓
- [ ] Backend bağlantısı ✓
- [ ] Dashboard tasarımı ✓

**Başarı Kriteri:** Web'deki kullanıcı ile login yapabilme

### Hafta 2 (Ses Kaydı)
- [ ] Mikrofon izni ✓
- [ ] Ses kaydı ✓
- [ ] Spektrogram ✓
- [ ] AI feedback ✓
- [ ] Timer ✓

**Başarı Kriteri:** 10 saniye ses kaydı yapabilme

### Hafta 3 (Backend)
- [ ] Ses upload ✓
- [ ] Sonuç alma ✓
- [ ] PDF export ✓
- [ ] Doktor paylaşımı ✓

**Başarı Kriteri:** Web'de aynı testi görebilme

### Hafta 4 (Polish)
- [ ] Offline destek ✓
- [ ] Animasyonlar ✓
- [ ] Biometric auth ✓
- [ ] Security ✓

**Başarı Kriteri:** Production-ready app

---

## 🎬 YATIRIMCI DEMO SENARYOSU

### 5 Dakikalık Sunum

**Dakika 1: Problem**
> "Parkinson erken teşhisi zor ve pahalı. 10 milyon hasta etkileniyor."

**Dakika 2: Çözüm**
> "NeuralCipher: Telefonunuzdan 10 saniyede AI analizi."

**Dakika 3: Canlı Demo**
1. Uygulamayı aç (Splash)
2. Login (Biometric)
3. "Hızlı Tarama" seç
4. 10 saniye konuş (Spektrogram)
5. Sonuçları göster (Risk skoru)
6. PDF export

**Dakika 4: Teknoloji**
> "Flutter native performans, Railway ölçeklenebilir backend, HIPAA güvenlik."

**Dakika 5: Traction**
> "Web canlı, 100+ kullanıcı, %94.2 AI doğruluğu, mobil beta hazır."

### Wow Faktörleri
1. ✨ Real-time spektrogram
2. 🤖 AI feedback
3. 📴 Offline çalışma
4. 🔄 Cross-platform sync
5. 🔒 Biometric security

---

## 💰 MALIYET & ZAMAN

### Geliştirme Maliyeti
- Flutter SDK: **ÜCRETSİZ**
- Android Studio: **ÜCRETSİZ**
- VS Code: **ÜCRETSİZ**
- Backend (Railway): **Mevcut**
- Veritabanı: **Mevcut**

### Yayın Maliyeti
- Apple Developer: **$99/yıl**
- Google Play: **$25 (tek seferlik)**
- **TOPLAM: $124**

### Geliştirme Süresi
- 1 Geliştirici: **6 hafta**
- 2 Geliştirici: **3 hafta**
- Tam ekip: **2 hafta**

---

## 🎯 BAŞARI METRİKLERİ

### Teknik
- ✅ 60 FPS animasyonlar
- ✅ <2 saniye uygulama açılış
- ✅ <5 saniye test upload
- ✅ %100 offline çalışma
- ✅ Web ile %100 feature parity

### Kullanıcı
- ✅ 3 adımda test tamamlama
- ✅ Sezgisel arayüz
- ✅ Anlaşılır AI feedback
- ✅ Kolay doktor paylaşımı

### İş
- ✅ Yatırımcı demo hazır
- ✅ Beta kullanıcıları pozitif
- ✅ App Store/Play Store onayı
- ✅ Ölçeklenebilir mimari

---

## 📞 DESTEK & KAYNAKLAR

### Dokümantasyon
- **Mimari Plan:** `MOBILE_APP_ARCHITECTURE_MASTER_PLAN.md`
- **Hızlı Başlangıç:** `MOBILE_APP_QUICK_START.md`
- **API Spec:** `API_SPECIFICATION.md`

### Topluluk
- Flutter Discord
- Stack Overflow
- GitHub Issues

### Backend
- **API URL:** https://neuralcipher-backend.railway.app
- **Docs:** https://neuralcipher-backend.railway.app/docs
- **Database:** Railway PostgreSQL

---

## ✅ HEMEN YAPILACAKLAR

### Bugün (29 Ocak)
1. [ ] Flutter SDK kur
2. [ ] Android Studio kur
3. [ ] `flutter doctor` çalıştır
4. [ ] Proje oluştur
5. [ ] İlk ekranı çalıştır

### Yarın (30 Ocak)
1. [ ] API service implementasyonu
2. [ ] Login ekranı
3. [ ] Backend bağlantısı test
4. [ ] Web kullanıcısı ile giriş

### Bu Hafta Sonu
1. [ ] Dashboard tasarımı
2. [ ] Navigation sistemi
3. [ ] Profil ekranı
4. [ ] İlk sprint tamamla

---

## 🎉 SONUÇ

**Hazır mısın?**

✅ Mimari plan hazır  
✅ Teknik stack seçildi  
✅ Veritabanı stratejisi netleşti  
✅ Geliştirme planı oluşturuldu  
✅ Yatırımcı demo senaryosu hazır

**Şimdi tek yapman gereken:**

```powershell
flutter create neuralcipher_mobile
cd neuralcipher_mobile
flutter run -d chrome
```

**Başlayalım! 🚀**

---

**Hazırlayan:** Kiro AI  
**Tarih:** 29 Ocak 2026  
**Durum:** ✅ Planlama Tamamlandı - Geliştirme Başlayabilir
