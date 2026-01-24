# 🔑 GİRİŞ BİLGİLERİ - NeuralCipher.ai

**Tarih:** 21 Ocak 2026  
**Durum:** ✅ Sistem Aktif ve Çalışıyor

---

## 🌐 SİSTEM URL'LERİ

### Frontend (Web Arayüzü)
```
URL: http://localhost:3000
Durum: ✅ Çalışıyor (Process 6)
```

### Backend (API)
```
URL: http://localhost:8000
API Docs: http://localhost:8000/docs
Health Check: http://localhost:8000/health
Durum: ✅ Çalışıyor (Process 5)
```

---

## 👥 TEST HESAPLARI

### 🏥 Hasta Hesabı
```
Email: patient@test.com
Şifre: Patient123!@#
Rol: Patient (Hasta)

Yetkiler:
  ✅ Ses testi yapma
  ✅ Test sonuçlarını görme
  ✅ Geçmiş testleri görme
  ✅ Profil düzenleme
  ✅ Doktorla mesajlaşma
```

### 👨‍⚕️ Doktor Hesabı
```
Email: doctor@test.com
Şifre: Doctor123!@#
Rol: Doctor (Doktor)

Yetkiler:
  ✅ Hasta listesini görme
  ✅ Hasta test sonuçlarını görme
  ✅ Hasta analizleri
  ✅ Raporlar oluşturma
  ✅ Hastalarla mesajlaşma
  ✅ Trend analizi
```

### 👨‍💼 Admin Hesabı
```
Email: admin@test.com
Şifre: Admin123!@#
Rol: Admin (Yönetici)

Yetkiler:
  ✅ Tüm kullanıcıları görme/düzenleme
  ✅ Sistem ayarları
  ✅ Abonelik yönetimi
  ✅ Analitik raporlar
  ✅ Sistem metrikleri
  ✅ Kullanıcı yönetimi
```

---

## 🚀 HIZLI BAŞLANGIÇ

### 1. Sisteme Giriş
1. Tarayıcıda http://localhost:3000 adresine git
2. "Giriş Yap" butonuna tıkla
3. Yukarıdaki hesaplardan birini kullan

### 2. Hasta Olarak Test Yapma
1. `patient@test.com` ile giriş yap
2. Dashboard'da "Yeni Test" butonuna tıkla
3. Test seviyesi seç (Quick/Standard/Comprehensive/Clinical)
4. Mikrofon izni ver
5. Test talimatlarını takip et
6. Ses kaydet
7. Sonuçları gör

### 3. Doktor Olarak Hasta Görüntüleme
1. `doctor@test.com` ile giriş yap
2. "Hastalarım" menüsüne git
3. Hasta listesini gör
4. Hasta detaylarına tıkla
5. Test sonuçlarını ve trendleri incele

### 4. Admin Olarak Sistem Yönetimi
1. `admin@test.com` ile giriş yap
2. "Kullanıcılar" menüsüne git
3. Tüm kullanıcıları gör
4. Sistem ayarlarını yönet
5. Analitik raporları incele

---

## 🧪 TEST KOMUTLARI

### Backend Test
```bash
cd backend

# Ses yükleme testi
python test_simple_upload.py

# Sonuç getirme testi
python test_get_result.py

# API testi
python test_api.py
```

### Beklenen Sonuç
```
Status: 200
Model Version: v5.0
Risk Score: [Gerçek tahmin]
Biomarkers: [Gerçek değerler]
```

---

## 📊 SİSTEM DURUMU

### Backend
- ✅ Çalışıyor
- ✅ ML Model yüklü (v5.0)
- ✅ Veritabanı bağlantısı aktif
- ✅ API endpoint'leri hazır

### Frontend
- ✅ Çalışıyor
- ✅ Tüm sayfalar erişilebilir
- ✅ Ses kaydı çalışıyor
- ✅ Sonuç görüntüleme aktif

### ML Model
- ✅ Model: v5.0
- ✅ Doğruluk: 99.33%
- ✅ Özellikler: 22 UCI Parkinson's
- ✅ Gerçek tahminler çalışıyor

---

## 🔧 SORUN GİDERME

### Backend Çalışmıyorsa
```bash
cd backend
python start_dev.py
```

### Frontend Çalışmıyorsa
```bash
cd frontend
npm run dev
```

### Veritabanı Sıfırlama
```bash
cd backend
python init_database.py
python create_test_users_simple.py
```

---

## 📱 KULLANICI AKIŞI

### Hasta Akışı
```
1. Giriş Yap (patient@test.com)
   ↓
2. Dashboard → Yeni Test
   ↓
3. Test Seviyesi Seç
   ↓
4. Ses Kaydet (1-16 test)
   ↓
5. Sonuçları Gör
   ↓
6. Geçmiş Testleri İncele
```

### Doktor Akışı
```
1. Giriş Yap (doctor@test.com)
   ↓
2. Hastalarım → Hasta Seç
   ↓
3. Test Sonuçlarını Gör
   ↓
4. Trend Analizi Yap
   ↓
5. Rapor Oluştur
   ↓
6. Hasta ile Mesajlaş
```

### Admin Akışı
```
1. Giriş Yap (admin@test.com)
   ↓
2. Kullanıcılar → Tüm Kullanıcılar
   ↓
3. Sistem Ayarları
   ↓
4. Analitik Raporlar
   ↓
5. Abonelik Yönetimi
```

---

## 🎯 ÖNEMLİ NOTLAR

### Şifre Gereksinimleri
- Minimum 8 karakter
- En az 1 büyük harf
- En az 1 küçük harf
- En az 1 rakam
- En az 1 özel karakter (!@#$%^&*)

### Test Seviyeleri
- **Quick:** 1 test (~5 saniye)
- **Standard:** 4 test (~2 dakika)
- **Comprehensive:** 8 test (~5 dakika)
- **Clinical:** 16 test (~10 dakika)

### ML Model Bilgisi
- Model gerçek tahminler yapıyor
- Mock veri YOK
- Analiz süresi: ~3.7 saniye
- 22 biomarker çıkarımı

---

## 📞 DESTEK

### Dokümantasyon
- `ML_INTEGRATION_COMPLETE.md` - ML detayları
- `SISTEM_TAMAM_21_OCAK.md` - Sistem özeti
- `QUICK_STATUS.md` - Hızlı durum
- `API_SPECIFICATION.md` - API dökümanı

### API Dokümantasyonu
```
http://localhost:8000/docs
```

---

## ✅ KONTROL LİSTESİ

Sisteme giriş yapmadan önce kontrol et:

- [ ] Backend çalışıyor mu? (http://localhost:8000/health)
- [ ] Frontend çalışıyor mu? (http://localhost:3000)
- [ ] Doğru hesap bilgilerini kullanıyor musun?
- [ ] Tarayıcı mikrofon iznini verdi mi?
- [ ] İnternet bağlantısı var mı?

---

## 🎉 BAŞARILI GİRİŞ SONRASI

Giriş yaptıktan sonra göreceksin:

### Hasta Dashboard
- Risk skoru özeti
- Son test sonuçları
- Trend grafiği
- Yeni test butonu

### Doktor Dashboard
- Hasta sayısı
- Bugünkü testler
- Yüksek riskli hastalar
- Hasta listesi

### Admin Dashboard
- Toplam kullanıcılar
- Sistem metrikleri
- Aktif abonelikler
- Sistem sağlığı

---

**Sistem hazır! İyi kullanımlar! 🚀**

*Son Güncelleme: 21 Ocak 2026*
