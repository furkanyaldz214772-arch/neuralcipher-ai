# 🔑 Access Key Nerede? - Görsel Rehber

## 📍 Access Key'in Tam Konumu

### Settings Sayfasında Sıralama:

```
┌─────────────────────────────────────────────────────────┐
│                    SETTINGS PAGE                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1️⃣ 📸 Profile Photo                                   │
│     ┌─────────────────────────────────────────────┐    │
│     │  [Drag & drop or click to upload]          │    │
│     └─────────────────────────────────────────────┘    │
│                                                         │
│  2️⃣ 🔑 Access Key Management  ← BURASI!               │
│     ┌─────────────────────────────────────────────┐    │
│     │  Your Access Key                            │    │
│     │  Share this key with your doctors           │    │
│     │                                             │    │
│     │  ┌───────────────────────────────────────┐  │    │
│     │  │     ABCD-EFGH-JKLM                    │  │    │
│     │  └───────────────────────────────────────┘  │    │
│     │                                             │    │
│     │  [📋 Copy Key]  [🔄 Regenerate]            │    │
│     │                                             │    │
│     │  ⚠️ Regenerating will revoke all access    │    │
│     └─────────────────────────────────────────────┘    │
│                                                         │
│  3️⃣ 👥 Doctors with Access                            │
│     ┌─────────────────────────────────────────────┐    │
│     │  No doctors have access yet                 │    │
│     └─────────────────────────────────────────────┘    │
│                                                         │
│  4️⃣ 👤 Personal Information                           │
│     [First Name] [Last Name]                           │
│     [Date of Birth] [Gender]                           │
│                                                         │
│  5️⃣ ❤️ Health Information                             │
│     [Diagnosis Year] [Medications]                     │
│                                                         │
│  6️⃣ 🔔 Notification Settings                          │
│     ☑️ Email notifications                             │
│     ☑️ Test reminders                                  │
│                                                         │
│  [💾 Save Changes]                                     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🔍 Şu Anda Neden Görmüyorsun?

### Senaryo 1: Backend Migration Çalışmadı ❌

**Belirti:**
- Settings sayfasında Access Key bölümü hiç görünmüyor
- Console'da hata var: `Failed to fetch access key`

**Neden:**
- Railway database'de `access_key` kolonu yok
- Backend API hata veriyor
- Frontend key'i gösteremiyor

**Çözüm:**
```sql
-- Railway Query'de çalıştır:
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_key VARCHAR(20) UNIQUE;
```

### Senaryo 2: Frontend Cache Sorunu 🔄

**Belirti:**
- Backend çalışıyor ama frontend eski versiyonu gösteriyor
- Vercel'de yeni deployment var ama görmüyorsun

**Çözüm:**
1. Ctrl + Shift + R (Hard refresh)
2. Browser cache temizle
3. Incognito mode'da dene

### Senaryo 3: Authentication Sorunu 🔐

**Belirti:**
- Settings sayfası açılıyor ama key yüklenmiyor
- Console'da 401 Unauthorized hatası

**Çözüm:**
1. Logout yap
2. Tekrar login ol
3. Settings'e git

---

## 🧪 Hızlı Test - 3 Adım

### Adım 1: Backend Kontrolü

Railway Dashboard'da:
```sql
SELECT id, email, access_key 
FROM users 
WHERE role = 'PATIENT' 
LIMIT 5;
```

**Beklenen Sonuç:**
```
id | email              | access_key
---+--------------------+---------------
1  | patient@test.com   | ABCD-EFGH-JKLM
2  | hasta@test.com     | WXYZ-1234-5678
```

**Eğer `access_key` kolonu yok hatası alırsan:**
→ Migration çalışmamış, çalıştırmamız gerekiyor

### Adım 2: API Testi

Browser Console'da (F12):
```javascript
// Token'ı al
const token = localStorage.getItem('token')
console.log('Token:', token ? 'Var ✅' : 'Yok ❌')

// API'yi test et
fetch('https://web-production-c00b0.up.railway.app/api/v1/profile/access-key', {
  headers: { 'Authorization': `Bearer ${token}` }
})
.then(r => r.json())
.then(data => {
  console.log('✅ Access Key:', data.access_key)
})
.catch(err => {
  console.error('❌ Hata:', err)
})
```

**Beklenen Sonuç:**
```
✅ Access Key: ABCD-EFGH-JKLM
```

### Adım 3: Frontend Kontrolü

Settings sayfasında Console'da:
```javascript
// Access key state'ini kontrol et
console.log('Access Key State:', 
  document.querySelector('[class*="text-2xl"]')?.textContent
)
```

**Beklenen Sonuç:**
```
Access Key State: ABCD-EFGH-JKLM
```

---

## 🛠️ Sorun Giderme Adımları

### Problem: Access Key bölümü hiç görünmüyor

**Kontrol Et:**
```javascript
// Frontend'de component render oluyor mu?
console.log('Access Key Section:', 
  document.querySelector('h2')?.textContent.includes('Access Key')
)
```

**Eğer `false` dönerse:**
1. `accessKey` state'i boş olabilir
2. Conditional rendering çalışıyor: `{accessKey && <AccessKeyDisplay />}`
3. Backend'den key gelmiyor

**Çözüm:**
```javascript
// State'i zorla set et (test için)
// Settings page'de:
setAccessKey('TEST-1234-5678')
```

### Problem: "LOADING" yazıyor

**Neden:**
- API çağrısı hata verdi
- Fallback olarak "LOADING" set edildi

**Çözüm:**
1. Network tab'ı aç (F12)
2. `/api/v1/profile/access-key` isteğini bul
3. Response'u kontrol et
4. Hata varsa backend'i düzelt

### Problem: Key var ama kopyalanmıyor

**Kontrol Et:**
```javascript
// Clipboard API çalışıyor mu?
navigator.clipboard.writeText('test')
  .then(() => console.log('✅ Clipboard çalışıyor'))
  .catch(err => console.error('❌ Clipboard hatası:', err))
```

**Eğer hata varsa:**
- HTTPS gerekiyor (localhost'ta çalışmaz)
- Browser izni gerekiyor

---

## 📋 Checklist - Sırayla Kontrol Et

### ✅ Backend Kontrolü
- [ ] Railway backend çalışıyor mu?
- [ ] Database'de `access_key` kolonu var mı?
- [ ] `/api/v1/profile/access-key` endpoint'i çalışıyor mu?
- [ ] Test user'ın access_key'i var mı?

### ✅ Frontend Kontrolü
- [ ] Vercel'de son deployment başarılı mı?
- [ ] Settings sayfası açılıyor mu?
- [ ] Console'da hata var mı?
- [ ] Token localStorage'da var mı?

### ✅ Network Kontrolü
- [ ] API isteği gidiyor mu?
- [ ] Response 200 OK mı?
- [ ] Response'da `access_key` var mı?
- [ ] CORS hatası yok mu?

---

## 🚀 Hızlı Çözüm - 5 Dakika

### 1. Railway'e Git (2 dk)
https://railway.app → Backend → Database → Query

```sql
-- Kolon var mı kontrol et
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'users' AND column_name = 'access_key';

-- Yoksa ekle
ALTER TABLE users ADD COLUMN IF NOT EXISTS access_key VARCHAR(20) UNIQUE;

-- Test user'a key ver
UPDATE users 
SET access_key = 'TEST-1234-5678' 
WHERE email = 'patient@test.com';
```

### 2. Backend'i Restart Et (1 dk)
Railway → Backend → Settings → Restart

### 3. Frontend'i Test Et (2 dk)
1. Settings sayfasını aç
2. Ctrl + Shift + R (hard refresh)
3. Access Key bölümünü gör
4. Copy butonunu test et

---

## 🎯 Sonuç

**Access Key şurada olmalı:**
- Settings sayfası
- Profile Photo'nun hemen altında
- Doctors with Access'in hemen üstünde
- Büyük, mavi, XXXX-XXXX-XXXX formatında

**Görmüyorsan:**
1. Railway'de migration çalıştır
2. Backend'i restart et
3. Frontend'i hard refresh yap
4. Hala görmüyorsan Python script'i çalıştır:
   ```bash
   python check_access_key_backend.py
   ```

---

**Not:** Access Key otomatik oluşturulur, manuel bir şey yapmana gerek yok. Settings'e girdiğin anda backend otomatik key oluşturup döndürür.
