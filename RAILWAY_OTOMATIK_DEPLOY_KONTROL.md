# Railway Otomatik Deploy Kontrolü

## Sorun
Railway GitHub'dan otomatik çekmiyor mu? Neden manuel yapacağız?

## Cevap: Railway Otomatik Çekmeli! ✅

Railway normalde GitHub ile entegre olduğunda **otomatik deploy** yapmalı. Ama bazen ayarlar eksik olabilir.

---

## Railway Otomatik Deploy Nasıl Çalışır?

### 1. GitHub Entegrasyonu
Railway projeniz GitHub repo'nuza bağlıysa:
- ✅ Her `git push` → Otomatik deploy tetiklenir
- ✅ Webhook sistemi ile çalışır
- ✅ Build ve deploy otomatik olur

### 2. Kontrol Edilmesi Gerekenler

#### A. Railway Dashboard'da Kontrol Et

1. **Railway.app'e git**: https://railway.app
2. **Projeyi aç**: NeuralCipher backend projesi
3. **Settings** sekmesine git
4. **Source** bölümünü kontrol et:
   - ✅ GitHub repo bağlı mı?
   - ✅ Branch: `master` veya `main` seçili mi?
   - ✅ Auto-deploy: **ENABLED** mi?

#### B. GitHub Webhook Kontrolü

1. **GitHub repo'ya git**: https://github.com/furkanyaldz214772-arch/neuralcipher-ai
2. **Settings** → **Webhooks**
3. Railway webhook var mı kontrol et:
   - URL: `https://backboard.railway.app/...`
   - Events: `push`, `pull_request`
   - Status: ✅ (yeşil tik)

---

## Otomatik Deploy Aktif mi Kontrol Et

### Railway Dashboard'da

```
Project → Settings → Source

✅ Connected to GitHub: furkanyaldz214772-arch/neuralcipher-ai
✅ Branch: master
✅ Auto Deploy: ON
✅ Root Directory: backend (eğer monorepo ise)
```

### Eğer Otomatik Deploy KAPALI ise

**Açmak için:**
1. Railway Dashboard → Project Settings
2. **Source** bölümü
3. **Auto Deploy** toggle'ını **ON** yap
4. **Save** tıkla

---

## Manuel Deploy Ne Zaman Gerekli?

### Sadece Şu Durumlarda:

1. **İlk Kurulum**: Repo'yu ilk kez bağlarken
2. **Migration Çalıştırma**: Database değişiklikleri için
3. **Environment Variables**: Yeni env var eklendiğinde
4. **Build Hatası**: Otomatik deploy başarısız olursa

### Bizim Durumumuz

Backend kodunda değişiklik yaptık ama:
- ✅ GitHub'a push ettik
- ⏳ Railway otomatik deploy başlamalı
- 🔴 Eğer başlamadıysa → Auto-deploy kapalı demektir

---

## Hızlı Kontrol Komutu

Railway CLI ile kontrol et:

```bash
# Railway CLI kur (eğer yoksa)
npm install -g @railway/cli

# Login ol
railway login

# Projeyi seç
railway link

# Son deployment'ı kontrol et
railway status

# Logs'u izle
railway logs
```

---

## Otomatik Deploy Çalışıyorsa

### Şu Adımlar Otomatik Olur:

1. ✅ GitHub'a push yaptın
2. ✅ Railway webhook tetiklendi
3. ✅ Railway kodu çekti
4. ✅ Build başladı
5. ✅ Deploy edildi
6. ✅ Servis restart oldu

### Süre: ~2-5 dakika

---

## Otomatik Deploy Çalışmıyorsa

### Olası Nedenler:

1. **Auto-deploy kapalı**
   - Çözüm: Railway Settings → Auto Deploy → ON

2. **Webhook bozuk**
   - Çözüm: Railway'de repo'yu disconnect/reconnect et

3. **Branch yanlış**
   - Çözüm: Railway Settings → Branch → `master` seç

4. **Build hatası**
   - Çözüm: Railway logs'u kontrol et

---

## Manuel Deploy Nasıl Yapılır? (Gerekirse)

### Yöntem 1: Railway Dashboard

1. Railway.app → Project
2. **Deployments** sekmesi
3. **Deploy** butonu → **Redeploy**

### Yöntem 2: Railway CLI

```bash
# Railway CLI ile deploy
railway up
```

### Yöntem 3: Git Push (Otomatik tetikler)

```bash
# Boş commit ile tetikle
git commit --allow-empty -m "trigger deploy"
git push origin master
```

---

## Bizim Durumumuz İçin Öneriler

### Senaryo 1: Otomatik Deploy Aktif ✅

**Yapılacak**: Hiçbir şey! Bekle.
- GitHub'a push ettik
- Railway otomatik deploy yapacak
- 2-5 dakika içinde hazır olur

### Senaryo 2: Otomatik Deploy Kapalı 🔴

**Yapılacak**: Aktif et
1. Railway Dashboard → Settings
2. Auto Deploy → ON
3. Manuel deploy tetikle (bir kere)

### Senaryo 3: Migration Gerekli 🔧

**Yapılacak**: Migration çalıştır
```bash
# Railway console'da
railway run python run_migration_006.py
```

---

## Kontrol Listesi

- [ ] Railway Dashboard'a git
- [ ] Project Settings → Source kontrol et
- [ ] Auto Deploy ON mu?
- [ ] GitHub webhook aktif mi?
- [ ] Son deployment ne zaman?
- [ ] Logs'da hata var mı?

---

## Sonuç

**Railway OTOMATIK çekmeli!** Eğer çekmiyorsa:

1. ✅ Auto-deploy ayarını kontrol et
2. ✅ GitHub webhook'u kontrol et
3. ✅ Branch'i kontrol et
4. ⚠️ Gerekirse manuel deploy tetikle

**Bizim durumumuzda:**
- Frontend (Vercel): ✅ Otomatik deploy çalışıyor
- Backend (Railway): ⏳ Kontrol edilmeli

---

## Hemen Yapılacaklar

1. **Railway Dashboard'a git**: https://railway.app
2. **Auto Deploy kontrol et**: Settings → Source → Auto Deploy
3. **Eğer kapalıysa**: Aç ve manuel deploy tetikle
4. **Eğer açıksa**: Bekle, otomatik deploy olacak

**Tahmini Süre**: 2-5 dakika

---

**Hazırlayan**: Kiro AI Assistant  
**Tarih**: 28 Ocak 2026  
**Durum**: Kontrol Gerekli
