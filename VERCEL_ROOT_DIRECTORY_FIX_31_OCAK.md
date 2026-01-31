# ⚠️ VERCEL ROOT DIRECTORY HATASI - ÇÖZÜM

## Hata
```
Error: No Next.js version detected. 
Make sure your package.json has "next" in either "dependencies" or "devDependencies". 
Also check your Root Directory setting matches the directory of your package.json file.
```

## Sorun
Vercel **Root Directory** ayarını yanlış yapılandırmış. Next.js `frontend/` klasöründe ama Vercel root'ta arıyor.

## Çözüm - Vercel Dashboard Ayarı

### Adım 1: Vercel Dashboard
https://vercel.com/dashboard → Projeyi seç

### Adım 2: Settings
**Settings** → **General**

### Adım 3: Root Directory
"Root Directory" bölümünü bul

**Şu an:** `.` (root) veya boş  
**Olması gereken:** `frontend`

### Adım 4: Değiştir
1. "Edit" butonuna tıkla
2. `frontend` yaz
3. "Save" tıkla

### Adım 5: Redeploy
1. **Deployments** tab
2. Son deployment → **3 nokta (•••)**
3. **"Redeploy"**
4. ❌ **"Use existing Build Cache"** checkbox'ını KALDIR
5. **"Redeploy"** tıkla

## Alternatif: vercel.json Güncellemesi

Eğer dashboard'dan değiştiremezsen, vercel.json'a ekle:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm ci --force",
  "framework": "nextjs"
}
```

**NOT:** Root Directory `frontend` olarak ayarlanırsa, vercel.json'daki `cd frontend` komutlarını kaldır.

## Proje Yapısı
```
neuralcipher-ai/
├── frontend/          ← Next.js burada
│   ├── package.json   ← "next" dependency burada
│   ├── src/
│   └── .next/
├── backend/
└── vercel.json
```

## Neden Bu Hata?
Vercel root dizinde `package.json` arıyor ama Next.js `frontend/package.json` içinde. Root Directory ayarı `frontend` olmalı.

## Doğrulama
Deployment başarılı olunca:
- ✅ "Next.js version detected"
- ✅ Build başarılı
- ✅ RadialBar hatası da çözülür (cache clear ile birlikte)
