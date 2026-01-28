# 🚂 Railway GitHub Otomatik Deploy - Hızlı Kurulum

## 📅 Tarih: 28 Ocak 2026

## ❓ Sorun: Railway GitHub'dan Otomatik Çekmiyor

Railway şu anda **manuel deployment** bekliyor çünkü GitHub entegrasyonu yapılandırılmamış.

---

## ✅ ÇÖZÜM: 3 Yöntem

### 🎯 Yöntem 1: Railway Dashboard (EN KOLAY - ÖNERİLEN)

#### Adım 1: Railway Dashboard'a Git
```
https://railway.app/dashboard
```

#### Adım 2: Projenizi Seçin
- "NeuralCipher Backend" projesine tıklayın

#### Adım 3: Settings → Source
```
1. Settings sekmesine tıklayın
2. "Source" bölümünü bulun
3. "Connect GitHub Repo" butonuna tıklayın
```

#### Adım 4: Repository Seçimi
```
Repository: furkanyaldz214772-arch/neuralcipher-ai
Branch: master (veya main)
Root Directory: backend  ← ÇOK ÖNEMLİ!
```

#### Adım 5: Deploy Settings
```
Build Command: (boş bırakın - Railway otomatik algılar)
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
Watch Paths: backend/**
```

#### Adım 6: Auto Deploy Aktif Et
```
Settings → Deploys
✅ Enable Auto Deploy
✅ Deploy on Push to master
```

**✅ TAMAMLANDI!** Artık GitHub'a push yaptığınızda Railway otomatik deploy edecek.

---

### 🚀 Yöntem 2: Railway CLI (HIZLI)

```bash
# 1. Railway CLI'yi kur (sadece bir kez)
npm install -g @railway/cli

# 2. Railway'e login ol
railway login

# 3. Backend klasörüne git
cd neuralcipher-ai/backend

# 4. Railway projesine bağlan
railway link
# Listeden "NeuralCipher Backend" projesini seçin

# 5. Deploy et
railway up

# 6. Logs kontrol et
railway logs --tail
```

**Avantajları:**
- ✅ Hızlı deployment
- ✅ Lokal test edebilirsiniz
- ✅ Environment variables görebilirsiniz

**Dezavantajları:**
- ❌ Her seferinde manuel `railway up` yapmanız gerekir
- ❌ Otomatik deployment yok

---

### 🔧 Yöntem 3: Git Subtree (İLERİ SEVİYE)

```bash
# 1. Railway remote'u ekle (sadece bir kez)
railway link
railway remote

# 2. Backend'i Railway'e push et
git subtree push --prefix=neuralcipher-ai/backend railway master

# Veya alias oluştur
git config alias.railway-push '!git subtree push --prefix=neuralcipher-ai/backend railway master'

# Sonra sadece
git railway-push
```

---

## 🎯 HANGİ YÖNTEMI SEÇMELİYİM?

### Yöntem 1 (Dashboard) - ÖNERİLEN ✅
**Kullan eğer:**
- ✅ Otomatik deployment istiyorsanız
- ✅ GitHub'a push yapınca otomatik deploy olsun
- ✅ Takım çalışması yapıyorsanız
- ✅ CI/CD pipeline istiyorsanız

**Avantajları:**
- Otomatik deployment
- Preview deployments (PR'larda)
- Rollback kolaylığı
- Deployment history

### Yöntem 2 (CLI) - HIZLI TEST İÇİN
**Kullan eğer:**
- ✅ Hızlı test etmek istiyorsanız
- ✅ Lokal değişiklikleri hemen deploy etmek istiyorsanız
- ✅ Geliştirme aşamasındasanız

### Yöntem 3 (Subtree) - İLERİ SEVİYE
**Kullan eğer:**
- ✅ Monorepo yapınız var
- ✅ Git workflow'unuzu özelleştirmek istiyorsanız
- ✅ Otomatik deployment istemiyorsanız

---

## 📋 ADIM ADIM: Dashboard ile Kurulum

### 1️⃣ Railway Dashboard'a Giriş

```
1. https://railway.app/dashboard adresine git
2. GitHub ile login ol
3. "NeuralCipher Backend" projesini bul
```

### 2️⃣ GitHub Bağlantısı

```
1. Projeye tıkla
2. Settings → Source
3. "Connect GitHub Repo" butonuna tıkla
4. GitHub authorization'ı onayla
```

### 3️⃣ Repository Ayarları

```
Repository: furkanyaldz214772-arch/neuralcipher-ai
Branch: master
Root Directory: backend  ← MUTLAKA YAZIN!
```

**⚠️ ÖNEMLİ:** Root Directory yazmayı unutmayın! Yoksa Railway tüm repo'yu deploy etmeye çalışır.

### 4️⃣ Build Ayarları

```
Build Command: (boş bırak)
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Railway Python projelerini otomatik algılar, build command'a gerek yok.

### 5️⃣ Auto Deploy Aktif Et

```
Settings → Deploys
✅ Auto Deploy: Enabled
✅ Deploy Triggers: Push to master
```

### 6️⃣ Environment Variables Kontrol

```
Settings → Variables
✅ DATABASE_URL (PostgreSQL'den otomatik gelir)
✅ SECRET_KEY
✅ CORS_ORIGINS=https://neuralcipher-ai.vercel.app
```

### 7️⃣ Test Et!

```bash
# Küçük bir değişiklik yap
echo "# Test" >> neuralcipher-ai/backend/README.md

# Commit ve push
git add .
git commit -m "test: Railway auto deploy"
git push origin master

# Railway Dashboard'da deployment'ı izle
# Deployments sekmesinde yeni deployment görünmeli
```

---

## ✅ Başarı Kontrolü

### Railway Dashboard'da Kontrol Et:

```
✅ Source: GitHub connected
✅ Repository: furkanyaldz214772-arch/neuralcipher-ai
✅ Branch: master
✅ Root Directory: backend
✅ Auto Deploy: Enabled
✅ Last Deploy: Success
```

### GitHub'da Kontrol Et:

```
1. Repo Settings → Webhooks
2. Railway webhook var mı?
   URL: https://backboard.railway.app/...
   Events: push, pull_request
   Status: ✅ Active
```

### Test Deployment:

```bash
# 1. Küçük değişiklik yap
echo "# Auto deploy test" >> neuralcipher-ai/backend/README.md

# 2. Push et
git add .
git commit -m "test: auto deploy"
git push origin master

# 3. Railway Dashboard'da izle
# 2-3 dakika içinde yeni deployment başlamalı
```

---

## 🐛 Sorun Giderme

### Problem 1: "Root Directory" Ayarı Yok

**Belirti:** Railway tüm repo'yu deploy etmeye çalışıyor, hata veriyor.

**Çözüm:**
```
Settings → Service Settings → Root Directory
Değer: backend
Save → Redeploy
```

### Problem 2: GitHub Webhook Çalışmıyor

**Belirti:** Push yapıyorsunuz ama Railway deploy etmiyor.

**Çözüm:**
```
1. Railway Dashboard → Settings
2. "Disconnect GitHub" tıkla
3. "Connect GitHub" tıkla
4. Repo'yu yeniden seç
5. Test push yap
```

### Problem 3: Build Hatası

**Belirti:** Deployment başlıyor ama build aşamasında hata veriyor.

**Çözüm:**
```bash
# Lokal test et
cd neuralcipher-ai/backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload

# Çalışıyorsa Railway'e push et
# Çalışmıyorsa hatayı düzelt
```

### Problem 4: Environment Variables Eksik

**Belirti:** Deployment başarılı ama uygulama çalışmıyor.

**Çözüm:**
```
Railway Dashboard → Variables
Eksik değişkenleri ekle:
- DATABASE_URL (PostgreSQL'den otomatik gelir)
- SECRET_KEY
- CORS_ORIGINS
```

---

## 📊 Deployment Süreci

### Otomatik Deployment Akışı:

```
1. GitHub'a push yaparsınız
   ↓
2. GitHub webhook Railway'e bildirir
   ↓
3. Railway kodu çeker (backend klasörünü)
   ↓
4. Dependencies yükler (pip install)
   ↓
5. Uygulamayı başlatır (uvicorn)
   ↓
6. Health check yapar
   ↓
7. Traffic'i yeni versiyona yönlendirir
   ↓
8. ✅ Deployment tamamlandı!
```

**Süre:** ~2-3 dakika

---

## 🎉 Başarı Kriterleri

Otomatik deploy çalışıyorsa:

1. ✅ GitHub'a push yapınca Railway otomatik deploy başlar
2. ✅ Railway Dashboard'da yeni deployment görünür
3. ✅ 2-3 dakika içinde deploy tamamlanır
4. ✅ Backend API çalışır durumda olur
5. ✅ Logs'da hata yok

---

## 🚀 Şimdi Ne Yapmalısınız?

### Seçenek A: Dashboard ile Otomatik Deploy (ÖNERİLEN)

```
1. Railway Dashboard'a git
2. Settings → Source → Connect GitHub
3. Repo seç, Root Directory: backend
4. Auto Deploy aktif et
5. Test push yap
```

**Süre:** 5 dakika  
**Sonuç:** Kalıcı otomatik deployment

### Seçenek B: CLI ile Hızlı Deploy

```bash
npm i -g @railway/cli
railway login
cd neuralcipher-ai/backend
railway link
railway up
```

**Süre:** 2 dakika  
**Sonuç:** Tek seferlik deployment

---

## 📝 Özet

**Şu Anda:**
- ❌ Railway otomatik deploy çalışmıyor
- ⚠️ Manuel deployment gerekiyor

**Çözüm:**
1. Railway Dashboard → Settings → GitHub bağla
2. Root Directory: `backend` ayarla
3. Auto Deploy: Enable
4. Test push yap

**Alternatif:**
```bash
railway login
cd neuralcipher-ai/backend
railway up
```

---

## 🔗 Yararlı Linkler

- **Railway Dashboard**: https://railway.app/dashboard
- **Railway Docs**: https://docs.railway.app/deploy/deployments
- **GitHub Webhooks**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai/settings/hooks
- **Railway CLI**: https://docs.railway.app/develop/cli

---

**Hazırlayan**: Kiro AI Assistant  
**Tarih**: 28 Ocak 2026  
**Durum**: 📖 Kurulum Rehberi Hazır
