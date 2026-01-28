# 🎯 Railway Dashboard - Görsel Adım Adım Rehber

## 📅 Tarih: 28 Ocak 2026

## 🎯 Hedef: GitHub'dan Otomatik Deploy Aktif Etmek

---

## 📍 ADIM 1: Railway Dashboard'a Git

### Ne Yapacaksınız:
```
1. Tarayıcınızı açın
2. https://railway.app/dashboard adresine gidin
3. GitHub ile login olun (zaten login olmuş olabilirsiniz)
```

### Ne Göreceksiniz:
```
┌─────────────────────────────────────────┐
│  Railway Dashboard                      │
├─────────────────────────────────────────┤
│                                         │
│  📦 NeuralCipher Backend               │
│  🟢 Active                              │
│                                         │
│  📦 PostgreSQL                          │
│  🟢 Active                              │
│                                         │
└─────────────────────────────────────────┘
```

### Tıklayın:
```
📦 NeuralCipher Backend  ← BURAYA TIKLAYIN
```

---

## 📍 ADIM 2: Settings Sekmesine Git

### Ne Yapacaksınız:
```
Üst menüde "Settings" sekmesine tıklayın
```

### Menü:
```
┌─────────────────────────────────────────┐
│  Deployments  |  Settings  |  Metrics   │
│                   ↑                     │
│              BURAYA TIKLA               │
└─────────────────────────────────────────┘
```

---

## 📍 ADIM 3: Source Bölümünü Bulun

### Ne Yapacaksınız:
```
Settings sayfasında aşağı kaydırın
"Source" bölümünü bulun
```

### Ne Göreceksiniz:
```
┌─────────────────────────────────────────┐
│  Source                                 │
├─────────────────────────────────────────┤
│                                         │
│  ⚠️ No repository connected            │
│                                         │
│  [Connect GitHub Repo]  ← BURAYA TIKLA │
│                                         │
└─────────────────────────────────────────┘
```

### Tıklayın:
```
[Connect GitHub Repo]  ← BURAYA TIKLAYIN
```

---

## 📍 ADIM 4: GitHub Authorization

### Ne Yapacaksınız:
```
GitHub authorization popup'ı açılacak
"Authorize Railway" butonuna tıklayın
```

### Popup:
```
┌─────────────────────────────────────────┐
│  Authorize Railway                      │
├─────────────────────────────────────────┤
│                                         │
│  Railway wants to access your GitHub   │
│  repositories                           │
│                                         │
│  Permissions:                           │
│  ✓ Read repository contents            │
│  ✓ Create webhooks                     │
│                                         │
│  [Authorize Railway]  ← TIKLA          │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📍 ADIM 5: Repository Seçimi

### Ne Yapacaksınız:
```
Repository listesinden projenizi seçin
```

### Liste:
```
┌─────────────────────────────────────────┐
│  Select Repository                      │
├─────────────────────────────────────────┤
│                                         │
│  🔍 Search repositories...              │
│                                         │
│  ○ furkanyaldz214772-arch/project1     │
│  ● furkanyaldz214772-arch/neuralcipher-ai  ← BUNU SEÇ
│  ○ furkanyaldz214772-arch/project3     │
│                                         │
│  [Continue]                             │
│                                         │
└─────────────────────────────────────────┘
```

### Seçin:
```
● furkanyaldz214772-arch/neuralcipher-ai  ← TIKLAYIN
```

---

## 📍 ADIM 6: Branch ve Root Directory

### Ne Yapacaksınız:
```
1. Branch seçin: master (veya main)
2. Root Directory yazın: backend
```

### Form:
```
┌─────────────────────────────────────────┐
│  Configure Deployment                   │
├─────────────────────────────────────────┤
│                                         │
│  Branch:                                │
│  [master ▼]  ← SEÇ                     │
│                                         │
│  Root Directory: (optional)             │
│  [backend]  ← MUTLAKA YAZ!             │
│                                         │
│  ⚠️ ÖNEMLI: Root Directory yazmayı    │
│     unutmayın! Yoksa hata alırsınız.   │
│                                         │
│  [Connect Repository]                   │
│                                         │
└─────────────────────────────────────────┘
```

### ⚠️ ÇOK ÖNEMLİ:
```
Root Directory: backend  ← MUTLAKA YAZIN!

Neden? Çünkü:
- Repo'nuzda frontend ve backend ayrı klasörlerde
- Railway sadece backend klasörünü deploy etmeli
- Yoksa tüm repo'yu deploy etmeye çalışır ve hata verir
```

---

## 📍 ADIM 7: Auto Deploy Aktif Et

### Ne Yapacaksınız:
```
Settings → Deploys bölümüne gidin
Auto Deploy'u aktif edin
```

### Ayarlar:
```
┌─────────────────────────────────────────┐
│  Deploys                                │
├─────────────────────────────────────────┤
│                                         │
│  Auto Deploy                            │
│  [✓] Enable Auto Deploy  ← İŞARETLE   │
│                                         │
│  Deploy Triggers:                       │
│  [✓] Push to master branch             │
│  [✓] Pull request merged               │
│                                         │
│  Watch Paths: (optional)                │
│  [backend/**]                           │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📍 ADIM 8: Build Settings (Opsiyonel)

### Ne Yapacaksınız:
```
Settings → Build bölümüne gidin
Start command'ı kontrol edin
```

### Ayarlar:
```
┌─────────────────────────────────────────┐
│  Build Settings                         │
├─────────────────────────────────────────┤
│                                         │
│  Build Command: (optional)              │
│  [                    ]  ← BOŞ BIRAKIN │
│                                         │
│  Start Command:                         │
│  [uvicorn app.main:app --host 0.0.0.0 --port $PORT]
│                                         │
│  ℹ️ Railway Python projelerini otomatik│
│     algılar, build command'a gerek yok │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📍 ADIM 9: Environment Variables Kontrol

### Ne Yapacaksınız:
```
Settings → Variables bölümüne gidin
Gerekli değişkenleri kontrol edin
```

### Değişkenler:
```
┌─────────────────────────────────────────┐
│  Environment Variables                  │
├─────────────────────────────────────────┤
│                                         │
│  DATABASE_URL                           │
│  postgresql://...  ✅ (Otomatik)       │
│                                         │
│  SECRET_KEY                             │
│  your-secret-key  ✅                   │
│                                         │
│  CORS_ORIGINS                           │
│  https://neuralcipher-ai.vercel.app ✅ │
│                                         │
│  [+ Add Variable]                       │
│                                         │
└─────────────────────────────────────────┘
```

---

## 📍 ADIM 10: Test Et!

### Ne Yapacaksınız:
```
Küçük bir değişiklik yapıp push edin
Railway'in otomatik deploy ettiğini görün
```

### Terminal:
```bash
# 1. Küçük değişiklik
echo "# Auto deploy test" >> neuralcipher-ai/backend/README.md

# 2. Commit
git add .
git commit -m "test: Railway auto deploy"

# 3. Push
git push origin master

# 4. Railway Dashboard'da izle
# Deployments sekmesinde yeni deployment görünmeli
```

### Railway Dashboard:
```
┌─────────────────────────────────────────┐
│  Deployments                            │
├─────────────────────────────────────────┤
│                                         │
│  🔄 Deploying... (just now)            │
│  📝 test: Railway auto deploy          │
│  👤 furkanyaldz214772-arch             │
│                                         │
│  ✅ Success (2 minutes ago)            │
│  📝 feat: Add profile photo system     │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ Başarı Kontrol Listesi

### Railway Dashboard'da:
```
✅ Source: GitHub connected
✅ Repository: furkanyaldz214772-arch/neuralcipher-ai
✅ Branch: master
✅ Root Directory: backend
✅ Auto Deploy: Enabled
✅ Last Deploy: Success
```

### GitHub'da:
```
1. Repo Settings → Webhooks
2. Railway webhook var mı?
   ✅ URL: https://backboard.railway.app/...
   ✅ Events: push, pull_request
   ✅ Status: Active
   ✅ Recent Deliveries: Success
```

---

## 🎉 Tebrikler!

Artık GitHub'a push yaptığınızda Railway otomatik deploy edecek!

### Deployment Akışı:
```
1. GitHub'a push yaparsınız
   ↓
2. GitHub webhook Railway'e bildirir
   ↓
3. Railway kodu çeker (backend klasörünü)
   ↓
4. Dependencies yükler
   ↓
5. Uygulamayı başlatır
   ↓
6. ✅ Deployment tamamlandı!
```

**Süre:** ~2-3 dakika

---

## 🐛 Sorun mu Var?

### Problem: "Root Directory" Görmüyorum

**Çözüm:**
```
1. Settings → Service Settings
2. "Root Directory" alanını bulun
3. "backend" yazın
4. Save
5. Redeploy
```

### Problem: Webhook Çalışmıyor

**Çözüm:**
```
1. Settings → Disconnect GitHub
2. Connect GitHub
3. Repo'yu yeniden seç
4. Test push yap
```

### Problem: Build Hatası

**Çözüm:**
```
1. Railway Dashboard → Deployments
2. Failed deployment'a tıkla
3. View Logs
4. Hatayı oku ve düzelt
```

---

## 🔗 Hızlı Linkler

- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub Repo**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai
- **GitHub Webhooks**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai/settings/hooks

---

**Hazırlayan**: Kiro AI Assistant  
**Tarih**: 28 Ocak 2026  
**Durum**: 📖 Görsel Rehber Hazır
