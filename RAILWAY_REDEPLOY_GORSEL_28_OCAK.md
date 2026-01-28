# 🚂 Railway Backend Redeploy - Görsel Rehber

## 🎯 AMAÇ

Railway'de CORS değişikliğini aktif etmek için backend'i yeniden deploy etmek.

## 📍 ADIM ADIM

### 1. Railway Dashboard'a Git

```
https://railway.app
```

- Login yap (GitHub hesabınla)
- Dashboard açılacak

### 2. Backend Projesini Bul

**Arayacağın proje adı:**
```
neuralcipher-backend
```

veya

```
web-production-c00b0
```

**Nasıl bulursun:**
- Sol tarafta projeler listesi var
- "neuralcipher" veya "backend" ara
- Tıkla

### 3. Service'i Seç

Proje açıldığında:

```
┌─────────────────────────────────────┐
│ neuralcipher-backend                │
├─────────────────────────────────────┤
│                                     │
│  📦 web (Python)                    │  ← BUNA TIKLA
│  🗄️  PostgreSQL                     │
│                                     │
└─────────────────────────────────────┘
```

**"web" veya "backend" service'ine tıkla**

### 4. Redeploy Yap

Sağ üstte **3 nokta (...)** menü var:

```
┌─────────────────────────────────────┐
│ web                            [...] │  ← BURAYA TIKLA
└─────────────────────────────────────┘
```

Açılan menüde:

```
┌─────────────────────┐
│ View Logs           │
│ Restart             │
│ Redeploy            │  ← BUNU SEÇ
│ Remove              │
└─────────────────────┘
```

**"Redeploy" seçeneğine tıkla**

### 5. Onay Ver

Popup açılacak:

```
┌─────────────────────────────────────┐
│ Redeploy web?                       │
│                                     │
│ This will redeploy your service     │
│ with the latest configuration.      │
│                                     │
│  [Cancel]  [Redeploy] ← TIKLA       │
└─────────────────────────────────────┘
```

**"Redeploy" butonuna tıkla**

### 6. Deployment'ı İzle

Otomatik olarak **"Deployments"** tab'ına gidecek:

```
┌─────────────────────────────────────┐
│ Deployments                         │
├─────────────────────────────────────┤
│                                     │
│ 🔄 Building...                      │  ← İLK DURUM
│    Just now                         │
│                                     │
│ ✅ Success                          │
│    2 minutes ago                    │
│                                     │
└─────────────────────────────────────┘
```

**Bekle: 2-3 dakika**

### 7. Logs'u Kontrol Et

Deployment tamamlandığında **"View Logs"** tıkla:

```
┌─────────────────────────────────────┐
│ Logs                                │
├─────────────────────────────────────┤
│                                     │
│ INFO: Started server process [1]   │
│ INFO: Application startup complete  │
│ INFO: Uvicorn running on...         │
│ 🌐 CORS Origins: https://...        │  ← BUNU ARA
│                                     │
└─────────────────────────────────────┘
```

**Görmek istediğin:**

```
🌐 CORS Origins: https://neuralcipher.ai,https://www.neuralcipher.ai,https://neuralcipher-ai.vercel.app
```

**Eğer `https://www.neuralcipher.ai` varsa → ✅ BAŞARILI**

## 🔍 SORUN GİDERME

### Sorun 1: "Redeploy" Seçeneği Yok

**Çözüm:**
```
1. Service'in içinde misin? (web/backend)
2. Sağ üstte 3 nokta var mı?
3. Yoksa → "Settings" tab'ına git
4. En altta "Redeploy" butonu olabilir
```

### Sorun 2: Deployment Failed

**Logs'da ne yazıyor?**

```
❌ Build failed
❌ Error: ...
```

**Çözüm:**
```
1. Logs'u oku
2. Hatayı bana gönder
3. Birlikte çözelim
```

### Sorun 3: CORS Origins Güncel Değil

**Logs'da hala eski domain'ler varsa:**

```
1. Variables tab'ına git
2. CORS_ORIGINS değişkenini kontrol et
3. Değeri düzelt:
   https://neuralcipher.ai,https://www.neuralcipher.ai,https://neuralcipher-ai.vercel.app
4. Save
5. Tekrar redeploy yap
```

## ✅ BAŞARI KRİTERLERİ

- [ ] Deployment status: "Success" ✅
- [ ] Logs'da: "Uvicorn running on..." ✅
- [ ] Logs'da: CORS Origins listesinde `www.neuralcipher.ai` var ✅
- [ ] Service status: "Active" (yeşil) ✅

## 📞 YARDIM

Takıldığın yeri screenshot al ve gönder:

1. **Dashboard ekranı** (proje listesi)
2. **Service ekranı** (web/backend)
3. **Deployment ekranı** (building/success)
4. **Logs ekranı** (CORS origins)

---

**ŞİMDİ**: Railway'e git ve redeploy yap! 2-3 dakika sürer.
