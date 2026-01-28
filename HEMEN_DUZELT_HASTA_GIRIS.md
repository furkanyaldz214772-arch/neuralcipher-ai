# 🚨 HASTA GİRİŞİ HEMEN DÜZELT

**Süre:** 2 dakika  
**Zorluk:** Çok kolay

---

## 📋 NE YAPACAKSIN?

Railway'de SQL çalıştıracaksın. Hepsi bu!

---

## 🎯 ADIMLAR

### 1️⃣ Railway'e Git
https://railway.app/dashboard

### 2️⃣ PostgreSQL'e Tıkla
Sol menüden **PostgreSQL** servisini seç

### 3️⃣ Query Tab'ı Aç
Üstteki tab'lardan **"Query"** seç

### 4️⃣ Bu Kodu Yapıştır

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo_url VARCHAR(500);
```

### 5️⃣ Run Query Tıkla
Yeşil ✅ göreceksin

### 6️⃣ Backend'i Restart Et
Sol menü → Backend → Settings → Restart

---

## ✅ BITTI!

30 saniye bekle, hasta girişi çalışacak.

**Test:**
https://neuralcipher-ai.vercel.app/auth/login

Email: patient@test.com  
Password: Test123!

---

## 🤔 NEDEN OLDU?

Backend'e yeni özellik eklendi ama database güncellenmedi.

---

**Soru varsa:** HASTA_GIRIS_SORUNU_ACIL_COZUM.md dosyasına bak
