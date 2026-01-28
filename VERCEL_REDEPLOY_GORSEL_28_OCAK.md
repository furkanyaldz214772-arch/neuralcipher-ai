# ▲ Vercel Frontend Redeploy - Görsel Rehber

## 🎯 AMAÇ

Vercel'de yeni frontend kodunu (Sidebar debug + Access Key) canlıya almak.

## 📍 ADIM ADIM

### 1. Vercel Dashboard'a Git

```
https://vercel.com/dashboard
```

- Login yap (GitHub hesabınla)
- Dashboard açılacak

### 2. Frontend Projesini Bul

**Arayacağın proje adı:**
```
neuralcipher-ai
```

**Nasıl bulursun:**
- Dashboard'da projeler listesi var
- "neuralcipher" ara
- Tıkla

### 3. Deployments Tab'ına Git

Proje açıldığında üstte tab'lar var:

```
┌─────────────────────────────────────┐
│ Overview  Deployments  Settings ... │
│           ^^^^^^^^^^^                │  ← BURAYA TIKLA
└─────────────────────────────────────┘
```

**"Deployments" tab'ına tıkla**

### 4. En Son Deployment'ı Bul

Deployment listesi açılacak:

```
┌─────────────────────────────────────────────────────┐
│ Deployments                                         │
├─────────────────────────────────────────────────────┤
│                                                     │
│ ✅ Production                              [...] ← │  EN ÜSTTEKİ
│    fix: Add debug logging to Sidebar...            │
│    main • 2 hours ago                              │
│                                                     │
│ ✅ Production                              [...]   │
│    feat: Add profile photo and access key          │
│    main • 3 hours ago                              │
│                                                     │
└─────────────────────────────────────────────────────┘
```

**En üstteki deployment'ın yanındaki 3 nokta (...)** menüye tıkla

### 5. Redeploy Seç

Açılan menüde:

```
┌─────────────────────┐
│ Visit               │
│ Inspect             │
│ View Source         │
│ Redeploy            │  ← BUNU SEÇ
│ Promote to Prod     │
│ Delete              │
└─────────────────────┘
```

**"Redeploy" seçeneğine tıkla**

### 6. Onay Ver

Popup açılacak:

```
┌─────────────────────────────────────┐
│ Redeploy to Production?             │
│                                     │
│ This deployment will be rebuilt     │
│ and promoted to production.         │
│                                     │
│ ☑ Use existing Build Cache          │  ← TIKLI OLMASIN!
│                                     │
│  [Cancel]  [Redeploy] ← TIKLA       │
└─────────────────────────────────────┘
```

**ÖNEMLİ**: "Use existing Build Cache" kutucuğunu **KAPAT** (tik olmasın)

**"Redeploy" butonuna tıkla**

### 7. Deployment'ı İzle

Yeni deployment başlayacak:

```
┌─────────────────────────────────────┐
│ Deployments                         │
├─────────────────────────────────────┤
│                                     │
│ 🔄 Building                         │  ← YENİ DEPLOYMENT
│    Just now                         │
│    Queued → Initializing → Build... │
│                                     │
│ ✅ Production                       │
│    2 hours ago                      │
│                                     │
└─────────────────────────────────────┘
```

**Bekle: 2-3 dakika**

### 8. Build Logs'u İzle (Opsiyonel)

Yeni deployment'a tıklayarak detayları görebilirsin:

```
┌─────────────────────────────────────┐
│ Building                            │
├─────────────────────────────────────┤
│                                     │
│ ▶ Cloning repository...        ✓   │
│ ▶ Installing dependencies...   ✓   │
│ ▶ Building application...      🔄  │
│ ▶ Uploading...                     │
│                                     │
└─────────────────────────────────────┘
```

### 9. Başarıyı Kontrol Et

Deployment tamamlandığında:

```
┌─────────────────────────────────────┐
│ ✅ Ready                            │
│                                     │
│ Production                          │
│ neuralcipher-ai.vercel.app          │
│                                     │
│ [Visit] ← TIKLA                     │
└─────────────────────────────────────┘
```

**Status: "Ready" ✅**

**"Visit" butonuna tıklayarak siteyi aç**

## 🔍 SORUN GİDERME

### Sorun 1: Build Failed

**Logs'da ne yazıyor?**

```
❌ Error: Build failed
❌ Type error: ...
❌ Module not found: ...
```

**Çözüm:**
```
1. Build logs'u oku
2. Hatayı bana gönder
3. Birlikte çözelim
```

### Sorun 2: "Redeploy" Seçeneği Yok

**Alternatif yöntem:**

```
1. Settings tab'ına git
2. "General" bölümünde
3. En altta "Redeploy" butonu olabilir
```

veya

```
1. Git tab'ına git
2. "Trigger Deploy" butonu
3. Branch: main
4. Deploy
```

### Sorun 3: Cache Sorunu

**Eğer eski kod hala görünüyorsa:**

```
1. Tekrar redeploy yap
2. Bu sefer "Use existing Build Cache" KAPALI olsun
3. Veya Settings → General → Clear Build Cache
```

## ✅ BAŞARI KRİTERLERİ

- [ ] Deployment status: "Ready" ✅
- [ ] Latest commit: "fix: Add debug logging..." ✅
- [ ] Domain çalışıyor: neuralcipher-ai.vercel.app ✅
- [ ] Build time: ~2-3 dakika ✅

## 🧪 TEST ET

Deployment tamamlandıktan sonra:

### 1. Siteyi Aç

```
https://neuralcipher-ai.vercel.app/auth/login
```

### 2. Hard Refresh Yap

```
Ctrl + Shift + R
veya
Ctrl + F5
```

**Neden?** Browser cache'i temizlemek için.

### 3. Console'u Kontrol Et

```
F12 → Console tab
```

**Görmek istediğin:**

```javascript
✅ Sidebar Debug: { user: {...}, pathname: '...', role: '...', menuItems: 'will show' }
```

**Eğer bu mesaj varsa → Yeni kod canlıda! ✅**

## 📞 YARDIM

Takıldığın yeri screenshot al ve gönder:

1. **Dashboard ekranı** (proje listesi)
2. **Deployments ekranı** (deployment listesi)
3. **Build logs ekranı** (building/ready)
4. **Site ekranı** (açılıyor mu?)

---

**ŞİMDİ**: Vercel'e git ve redeploy yap! 2-3 dakika sürer.

**SONRA**: Siteyi aç, F12 bas, Console'da "Sidebar Debug" ara!
