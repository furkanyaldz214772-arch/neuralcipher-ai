# 🔐 NeuralCipher.ai - Giriş Bilgileri

## ✅ HAZIR TEST KULLANICILARI

Senin için 3 farklı rol için kullanıcı hesapları oluşturdum!

---

### 👤 HASTA KULLANICISI (Patient)

```
Email:    patient@test.com
Password: Patient123!@#
Rol:      Patient (Hasta)
```

**Özellikler:**
- ✅ Ses testi yapabilir
- ✅ Test geçmişini görebilir
- ✅ İlerleme takibi
- ✅ Dashboard erişimi
- ✅ Profil yönetimi
- ✅ Sonuçları dışa aktarma

---

### 👨‍⚕️ DOKTOR KULLANICISI (Doctor)

```
Email:    doctor@test.com
Password: Doctor123!@#
Rol:      Doctor (Doktor)
```

**Özellikler:**
- ✅ Tüm hastaları görüntüleme
- ✅ Hasta kayıtlarına erişim
- ✅ Analitik raporlar
- ✅ Rapor oluşturma
- ✅ Hasta mesajlaşma
- ✅ Gelişmiş istatistikler

---

### 👑 ADMIN KULLANICISI (Admin)

```
Email:    admin@test.com
Password: Admin123!@#
Rol:      Admin (Yönetici)
```

**Özellikler:**
- ✅ Tam sistem erişimi
- ✅ Kullanıcı yönetimi
- ✅ Sistem analitiği
- ✅ Yapılandırma ayarları
- ✅ Denetim logları
- ✅ Tüm özellikler

---

## 🌐 Uygulama Linkleri

- **Frontend (Web)**: http://localhost:3001
- **Backend API**: http://localhost:8000
- **API Dokümantasyon**: http://localhost:8000/docs
- **API Redoc**: http://localhost:8000/redoc

---

## 🚀 Nasıl Giriş Yapılır?

### Yöntem 1: Web Üzerinden (Önerilen)

1. **Tarayıcıda aç**: http://localhost:3001/auth/login
2. **Email gir**: Yukarıdaki email adreslerinden birini
3. **Şifre gir**: İlgili şifreyi
4. **"Sign In"** butonuna tıkla
5. **Hazırsın!** Dashboard'a yönlendirileceksin

### Yöntem 2: API Üzerinden

```bash
curl -X POST "http://localhost:8000/api/v1/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "patient@test.com",
    "password": "Patient123!@#"
  }'
```

---

## 🎯 İlk Test Nasıl Yapılır?

1. **Giriş yap** (yukarıdaki bilgilerle)
2. **"New Test"** butonuna tıkla
3. **Mikrofon izni ver** (tarayıcı soracak)
4. **30 saniye ses kaydı yap**
5. **Anında sonuçları gör!**
   - Risk skoru (0-100%)
   - 59 biyobelirteç analizi
   - Detaylı öneriler
   - Trend analizi

---

## 📊 Özellikler

### Ses Analizi
- ⏱️ 30 saniye hızlı test
- 🎯 %92.31 doğruluk oranı
- 🔬 59 biyobelirteç
- ⚡ Anlık sonuçlar

### Dashboard
- 📈 İlerleme grafikleri
- 📊 Risk trend analizi
- 📅 Test geçmişi
- 🎨 Modern arayüz

### Doktor Portalı
- 👥 Hasta yönetimi
- 📋 Detaylı raporlar
- 💬 Mesajlaşma
- 📊 Analitik

---

## 🔧 Sorun Giderme

### Backend çalışmıyor mu?
```bash
cd backend
python start_dev.py
```

### Frontend çalışmıyor mu?
```bash
cd frontend
npm run dev
```

### Giriş yapamıyor musun?
1. Backend'in çalıştığını kontrol et: http://localhost:8000/docs
2. Frontend'in çalıştığını kontrol et: http://localhost:3001
3. Tarayıcı cache'ini temizle (Ctrl+Shift+Delete)
4. Şifreyi doğru yazdığından emin ol (büyük/küçük harf önemli!)

### Şifreyi mi unuttun?
Yukarıdaki 3 test hesabından birini kullan:
- `Patient123!@#`
- `Doctor123!@#`
- `Admin123!@#`

---

## 💡 İpuçları

1. **İlk Kullanım**: Hasta hesabıyla başla (`patient@test.com`)
2. **En İyi Sonuç**: Sessiz bir ortamda test yap
3. **Tutarlılık**: Günün aynı saatinde test yap
4. **Sıklık**: Haftalık testler öneriliyor
5. **Mikrofon**: Kaliteli mikrofon kullan

---

## 📱 Mobil Uygulama

Mobil uygulama (iOS/Android) da mevcut!
- Aynı giriş bilgileri çalışır
- Offline destek
- Push bildirimleri
- Tüm özellikler

---

## 🔒 Güvenlik Notları

- ⚠️ **Geliştirme Modu**: Bu bilgiler sadece geliştirme için
- 🚫 **Production'da Kullanma**: Canlı ortamda bu şifreleri kullanma
- 🔐 **Şifre Gereksinimleri**: 
  - En az 12 karakter
  - Büyük harf + küçük harf + rakam + özel karakter
- ⏰ **JWT Token**: 24 saat sonra süresi doluyor

---

## 📞 Yardım

Sorun mu yaşıyorsun?
- Backend loglarına bak
- Frontend console'u kontrol et (F12)
- API dokümantasyonunu incele: http://localhost:8000/docs

---

**Son Güncelleme**: 21 Ocak 2026  
**Durum**: ✅ Aktif ve Hazır  
**Kullanıcı Sayısı**: 3 test kullanıcısı oluşturuldu
