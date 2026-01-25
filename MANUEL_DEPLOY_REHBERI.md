# 🚀 Manuel Deploy Rehberi - 3 Kolay Yol

## ⚠️ SORUN
Kod değişti ama canlı sitede eski kod çalışıyor!

---

## ✅ YOL 1: Vercel Dashboard (EN KOLAY - 1 dakika)

### Adımlar:
1. **https://vercel.com** → Giriş yap
2. **NeuralCipher** projesine tıkla
3. **"Deployments"** sekmesi
4. En üstteki deployment → **"..."** menü → **"Redeploy"**
5. **"Redeploy"** butonuna tıkla
6. 2-3 dakika bekle
7. ✅ **TAMAM!**

---

## ✅ YOL 2: Vercel CLI (Terminal'den)

### Kurulum (Bir kez):
```bash
npm install -g vercel
vercel login
```

### Deploy:
```bash
cd neuralcipher-ai/frontend
vercel --prod
```

2-3 dakika bekle → ✅ **TAMAM!**

---

## ✅ YOL 3: Git Push (GitHub varsa)

### GitHub Repo URL'ini Bul:
1. GitHub'da repo sayfasını aç
2. Yeşil **"Code"** butonu → URL'i kopyala

### Terminal'de:
```bash
cd neuralcipher-ai
git remote add origin https://github.com/USERNAME/REPO.git
git push origin master
```

Vercel otomatik deploy eder (2-3 dakika)

---

## 🎯 HANGİSİNİ SEÇMELİYİM?

### Vercel Dashboard'a erişebiliyorsan:
→ **YOL 1** (En kolay, 1 dakika)

### Terminal kullanmayı seviyorsan:
→ **YOL 2** (Vercel CLI)

### GitHub repo varsa:
→ **YOL 3** (Git push)

---

## 🧪 Deploy Sonrası Test

1. **https://neuralcipher.ai/doctor/dashboard**
2. Quick Actions'da **"My Patients"** butonunu gör ✅
3. **"My Patients"** menüsüne tıkla
4. **"+ Add Patient"** butonunu gör (sağ üstte) ✅
5. Tıkla → **Modal açılır!** ✅

---

## 💡 HIZLI ÇÖZÜM

**En hızlı yol:** Vercel Dashboard'a git ve **Redeploy** tıkla!

Sadece 3 tıklama:
1. Vercel.com → Giriş
2. NeuralCipher → Deployments
3. Redeploy → Onayla

**2 dakika sonra hazır!** 🚀
