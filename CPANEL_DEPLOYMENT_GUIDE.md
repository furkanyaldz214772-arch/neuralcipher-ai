# 🚀 cPanel Deployment Rehberi - NeuralCipher.ai

## ✅ Hazırlık Tamamlandı!

Build başarıyla tamamlandı. Şimdi cPanel'e yükleme zamanı!

---

## 📦 Yüklenecek Dosyalar

**Klasör:** `neuralcipher-ai/frontend/out/`

Bu klasördeki **TÜM dosyalar** cPanel'e yüklenecek.

---

## 🔐 cPanel Bilgileri

- **URL:** https://host51.registrar-servers.com/cpanel
- **Kullanıcı Adı:** neurcgzi
- **Şifre:** 8Rd5ZFEJTjM6
- **Domain:** neuralcipher.ai

---

## 📋 Adım Adım Yükleme

### 1️⃣ cPanel'e Giriş

1. Tarayıcıda aç: https://host51.registrar-servers.com/cpanel
2. Kullanıcı adı: `neurcgzi`
3. Şifre: `8Rd5ZFEJTjM6`
4. Giriş yap

### 2️⃣ File Manager'ı Aç

1. cPanel ana sayfasında **"File Manager"** bul
2. Tıkla ve aç

### 3️⃣ public_html Klasörüne Git

1. Sol menüden **`public_html`** klasörünü bul
2. Çift tıkla ve aç
3. İçindeki **eski dosyaları sil** (varsa)
   - Tümünü seç (Ctrl+A)
   - Delete tuşuna bas
   - Onayla

### 4️⃣ Dosyaları Yükle

**Yöntem 1: Sürükle-Bırak (Önerilen)**
1. File Manager penceresini küçült
2. Windows Explorer'da şu klasörü aç:
   ```
   C:\Users\Mr.Yaldiz\Desktop\NeuralCipher.ai\neuralcipher-ai\frontend\out
   ```
3. **TÜM dosyaları seç** (Ctrl+A)
4. File Manager'a **sürükle-bırak**
5. Yükleme tamamlanana kadar bekle

**Yöntem 2: Upload Butonu**
1. File Manager'da **"Upload"** butonuna tıkla
2. **"Select File"** tıkla
3. `out` klasöründeki dosyaları seç
4. Yükle

### 5️⃣ .htaccess Kontrolü

1. `public_html` klasöründe **`.htaccess`** dosyasının olduğunu kontrol et
2. Yoksa, `out` klasöründen tekrar yükle
3. **ÖNEMLİ:** Dosya adı tam olarak `.htaccess` olmalı (nokta ile başlıyor)

### 6️⃣ Dosya İzinlerini Kontrol Et

1. Tüm dosyaları seç
2. Sağ tık → **"Change Permissions"**
3. Klasörler için: **755**
4. Dosyalar için: **644**
5. **"Change Permissions"** tıkla

---

## 🌐 Domain Ayarları

### DNS Kontrolü

1. cPanel'de **"Zone Editor"** veya **"DNS Zone Editor"** bul
2. `neuralcipher.ai` için A kaydını kontrol et
3. Sunucu IP'sine işaret ettiğinden emin ol

### SSL Sertifikası (HTTPS)

1. cPanel'de **"SSL/TLS Status"** bul
2. `neuralcipher.ai` için **"Run AutoSSL"** tıkla
3. Sertifika kurulana kadar bekle (5-10 dakika)

---

## ✅ Test Et

### 1. Siteyi Aç
```
https://neuralcipher.ai
```

### 2. Kontrol Listesi
- ✅ Ana sayfa açılıyor mu?
- ✅ Login sayfası çalışıyor mu? (`/auth/login`)
- ✅ Register sayfası çalışıyor mu? (`/auth/register`)
- ✅ Demo sayfası çalışıyor mu? (`/demo`)
- ✅ About sayfası çalışıyor mu? (`/about`)
- ✅ HTTPS çalışıyor mu? (Yeşil kilit ikonu)

---

## 🔧 Sorun Giderme

### Sayfa Açılmıyor
- `.htaccess` dosyasının yüklendiğini kontrol et
- Dosya izinlerini kontrol et (644)
- cPanel Error Log'u kontrol et

### 404 Hatası
- `.htaccess` içeriğini kontrol et
- `index.html` dosyasının `public_html` içinde olduğunu kontrol et

### CSS/JS Yüklenmiyor
- `_next` klasörünün yüklendiğini kontrol et
- Tarayıcı cache'ini temizle (Ctrl+Shift+Delete)

### HTTPS Çalışmıyor
- SSL sertifikası kurulumunu bekle (5-10 dakika)
- cPanel'de SSL/TLS Status kontrol et
- AutoSSL'i tekrar çalıştır

---

## 📊 Dosya Yapısı (public_html içinde)

```
public_html/
├── .htaccess              # Routing kuralları
├── index.html             # Ana sayfa
├── 404.html               # Hata sayfası
├── _next/                 # Next.js assets
│   ├── static/
│   └── ...
├── about.html
├── auth/
│   ├── login.html
│   └── register.html
├── dashboard.html
├── demo.html
└── ... (diğer sayfalar)
```

---

## 🎯 Sonraki Adımlar

### Backend Deployment
Backend'i ayrı bir servise deploy etmen gerekecek:
- **Railway.app** (Önerilen - Ücretsiz)
- **Render.com** (Ücretsiz tier var)
- **Heroku** (Ücretli)

### API Bağlantısı
Frontend'deki API URL'lerini backend URL'sine güncelle:
```typescript
// src/lib/api.ts
const API_URL = 'https://your-backend-url.railway.app'
```

---

## 📞 Destek

Sorun yaşarsan:
1. cPanel Error Log'u kontrol et
2. Tarayıcı Console'u kontrol et (F12)
3. `.htaccess` dosyasını kontrol et

---

## ✨ Tebrikler!

Frontend deployment'ı tamamladın! 🎉

Sıradaki: Backend deployment (Railway/Render)
