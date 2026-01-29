# 🔧 MOBİL UYGULAMA - SORUN GİDERME REHBERİ

## ✅ YAPILDI

1. ✅ Backend Railway'e bağlandı
2. ✅ Build temizlendi
3. ✅ Yeniden build edildi
4. ✅ HTTP server yeniden başlatıldı

## 🎯 ŞİMDİ NE YAPACAKSIN?

### 1. Tarayıcıyı Aç
```
http://localhost:8080
```

### 2. Cache'i Temizle (ÖNEMLİ!)
**Seçenek A: Hard Refresh**
```
CTRL + SHIFT + R
```

**Seçenek B: İncognito/Private Pencere**
```
CTRL + SHIFT + N (Chrome/Edge)
CTRL + SHIFT + P (Firefox)
```

**Seçenek C: Manuel Cache Temizleme**
```
F12 → Application → Storage → Clear site data
```

### 3. Test Et
- Logo ekranı göreceksin (1.5 saniye)
- Sonra login ekranı açılacak
- Railway backend'e bağlı

## ❌ HALA LOGO EKRANINDA TAKILIYORSA

### Adım 1: Console'u Aç
```
F12 veya CTRL + SHIFT + I
Console tab'ına bak
```

### Adım 2: Hata Mesajını Bul
Şunları ara:
- ❌ Network error
- ❌ Failed to fetch
- ❌ CORS error
- ❌ 404 Not Found
- ❌ JavaScript error

### Adım 3: Network Tab'ı Kontrol Et
```
F12 → Network tab
Hangi istekler başarısız?
Kırmızı olanları bul
```

## 🔍 OLASI SORUNLAR VE ÇÖZÜMLER

### Sorun 1: "Failed to load main.dart.js"
**Çözüm:**
```bash
cd neuralcipher-ai/neuralcipher_mobile
flutter clean
flutter build web --release
```

### Sorun 2: "CORS error"
**Çözüm:**
Railway backend CORS ayarları zaten yapıldı. Tarayıcı cache'ini temizle.

### Sorun 3: "Network error"
**Çözüm:**
Railway backend çalışıyor mu kontrol et:
```
https://neuralcipher-backend.railway.app/api/v1/docs
```

### Sorun 4: "White screen"
**Çözüm:**
```
F12 → Console → Hata mesajını oku
```

## 🎯 BACKEND TEST

Railway backend çalışıyor mu?
```
https://neuralcipher-backend.railway.app/api/v1/docs
```

Bu sayfayı açabiliyorsan backend çalışıyor ✅

## 📱 TEST KULLANICILARI

**Hasta:**
```
Email: hasta@test.com
Şifre: Test123!
```

**Doktor:**
```
Email: doktor@test.com
Şifre: Test123!
```

## 🚨 ACİL DURUM: HALA ÇALIŞMIYORSA

### 1. Tüm Servisleri Yeniden Başlat
```bash
# HTTP server'ı durdur
# Process 23'ü durdur

# Yeniden başlat
cd neuralcipher-ai/neuralcipher_mobile/build/web
python -m http.server 8080
```

### 2. Farklı Tarayıcı Dene
- Chrome çalışmıyorsa → Firefox dene
- Firefox çalışmıyorsa → Edge dene

### 3. Farklı Port Dene
```bash
python -m http.server 8081
```
Sonra: `http://localhost:8081`

## 📊 DURUM KONTROL

```
✅ Backend:  Railway Production
✅ URL:      https://neuralcipher-backend.railway.app
✅ Build:    Fresh (yeni build edildi)
✅ Cache:    Temizlendi
✅ Server:   localhost:8080 çalışıyor
```

---

**Şimdi test et ve sonucu söyle!** 🚀

Eğer hala sorun varsa:
1. F12 bas
2. Console'daki hata mesajını kopyala
3. Bana gönder
