# 🚨 VERCEL ROOT DIRECTORY FIX - ACİL - 1 ŞUBAT 2026

## ❌ SORUN

```
Error: No Next.js version detected
```

**Neden?**
- Vercel projenin root'unda Next.js arıyor
- Ama Next.js `frontend/` klasöründe
- Root Directory ayarı yapılmamış

## ✅ ÇÖZÜM - 2 DAKİKA

### Adım 1: Vercel Dashboard'a Git

```
https://vercel.com/dashboard
```

### Adım 2: Projeyi Aç

1. **NeuralCipher Frontend** projesine tıkla
2. **Settings** sekmesine git

### Adım 3: Root Directory Ayarla

```
Settings → General → Root Directory
```

**Şu anda**: (boş veya `/`)
**Olması gereken**: `frontend`

**Değiştir**:
1. Root Directory kutusuna `frontend` yaz
2. **Save** butonuna tıkla

### Adım 4: Redeploy

```
Deployments → En son deployment → ⋯ (3 nokta) → Redeploy
```

## 📋 Görsel Adımlar

### 1. Settings → General

```
┌─────────────────────────────────────────┐
│  Settings                               │
├─────────────────────────────────────────┤
│  General                                │
│  ├── Project Name                       │
│  ├── Framework Preset: Next.js          │
│  └── Root Directory: [frontend]  ← BURAYA YAZ
│                                         │
│  [Save]                                 │
└─────────────────────────────────────────┘
```

### 2. Redeploy

```
┌─────────────────────────────────────────┐
│  Deployments                            │
├─────────────────────────────────────────┤
│  ✅ Production (main)                   │
│     └── ⋯ → Redeploy  ← TIKLA          │
└─────────────────────────────────────────┘
```

## 🎯 Alternatif: vercel.json Güncellemesi (Opsiyonel)

Eğer Root Directory ayarı yeterli olmazsa, `vercel.json`'u da güncelleyebiliriz:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install",
  "framework": "nextjs"
}
```

**Not**: Bu dosya `frontend/` klasörünün içinde olmalı!

## ✅ Başarı Kontrolü

Build başarılı olduğunda göreceksin:

```bash
✅ Detected Next.js version: 14.1.4
✅ Installing dependencies...
✅ Building Next.js application...
✅ Deployment successful
```

## 🔍 Neden Bu Hata Oluyor?

### Proje Yapısı

```
neuralcipher-ai/
├── frontend/          ← Next.js burada
│   ├── package.json   ← next: 14.1.4 burada
│   ├── next.config.js
│   └── src/
├── backend/
└── vercel.json        ← Root'ta
```

### Vercel'in Beklentisi

Vercel default olarak root'ta Next.js arar:

```
❌ Vercel arıyor:
neuralcipher-ai/package.json  → Yok!
neuralcipher-ai/next.config.js → Yok!

✅ Gerçekte:
neuralcipher-ai/frontend/package.json  → Var!
neuralcipher-ai/frontend/next.config.js → Var!
```

### Çözüm

Root Directory'yi `frontend` olarak ayarla → Vercel doğru yere bakar!

## 🚀 Hızlı Komutlar

### Manuel Test (Lokal)

```bash
cd neuralcipher-ai/frontend
npm install
npm run build
```

Eğer lokal build başarılı ise, Vercel'de de başarılı olacak (Root Directory ayarlandıktan sonra).

## 📞 Sorun Devam Ederse

### Senaryo 1: Root Directory Ayarı Yok

```
Settings → General → Root Directory kutusunu göremiyorum
```

**Çözüm**: Framework Preset'i "Next.js" olarak ayarla, sonra Root Directory görünür.

### Senaryo 2: Build Yine Başarısız

```
Error: Cannot find module 'next'
```

**Çözüm**: 
1. Root Directory: `frontend` ✅
2. Build Command: `npm run build` ✅
3. Install Command: `npm install` ✅

### Senaryo 3: package.json Bulunamıyor

```
Error: No package.json found
```

**Çözüm**: Root Directory'nin tam olarak `frontend` olduğundan emin ol (başında/sonunda boşluk yok).

## 🎉 Sonuç

**Root Directory ayarı yapıldıktan sonra**:

1. ✅ Vercel `frontend/` klasörüne bakar
2. ✅ `package.json`'u bulur
3. ✅ Next.js 14.1.4'ü tespit eder
4. ✅ Build başarılı olur
5. ✅ Deployment tamamlanır

---

**Durum**: Root Directory ayarı gerekli  
**Süre**: 2 dakika  
**Zorluk**: Çok kolay  
**Tarih**: 1 Şubat 2026

**HEMEN YAP**: Vercel Dashboard → Settings → Root Directory → `frontend` → Save → Redeploy
