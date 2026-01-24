# 🚀 VERCEL DEPLOYMENT REHBERİ

## ✅ YAPILACAKLAR

Dil değiştirici butonunu canlı siteye göndermek için:

---

## 📋 ADIMLAR

### 1. Git Commit
```bash
cd neuralcipher-ai
git add .
git commit -m "Add German language switcher with flags"
```

### 2. GitHub'a Push
```bash
# Eğer remote yoksa ekle:
git remote add origin https://github.com/KULLANICI_ADIN/neuralcipher-ai.git

# Push yap:
git push -u origin main
```

### 3. Vercel'de Deploy
- Vercel Dashboard'a git: https://vercel.com
- "Import Project" tıkla
- GitHub repository'yi seç
- "Deploy" tıkla
- 2-3 dakika bekle

---

## 🎯 ALTERNAT İF: MANUEL DEPLOY

Eğer GitHub kullanmak istemiyorsan:

### Vercel CLI ile:
```bash
# Vercel CLI kur
npm i -g vercel

# Frontend klasörüne git
cd neuralcipher-ai/frontend

# Deploy et
vercel --prod
```

---

## 📝 DEPLOYMENT DOSYALARI

### Oluşturulan Dosyalar:
- ✅ `frontend/src/components/LanguageSwitcher.tsx`
- ✅ `frontend/src/lib/i18n.ts`
- ✅ `frontend/src/hooks/useTranslation.ts`
- ✅ `frontend/src/app/page.tsx` (güncellendi)
- ✅ `frontend/public/locales/de/*.json` (13 dosya)

### Vercel Otomatik Algılar:
- Next.js projesi
- Build komutu: `npm run build`
- Output klasörü: `.next`

---

## 🌐 DEPLOYMENT SONRASI

### Kontrol Et:
1. Vercel URL'ini aç
2. Navbar'da dil butonunu bul
3. Almanca seç
4. TÜM içerik Almanca olmalı

### URL Örneği:
```
https://neuralcipher-ai.vercel.app
```

---

## 🐛 SORUN GİDERME

### Build Hatası?
```bash
# Local'de test et
cd neuralcipher-ai/frontend
npm run build
```

### Dil Butonu Görünmüyor?
- Cache temizle: Ctrl + F5
- Vercel'de yeniden deploy et
- Build log'ları kontrol et

---

## 📊 DEPLOYMENT DURUMU

### Şu An:
- ✅ Kod hazır
- ✅ Dosyalar oluşturuldu
- ⏳ Git commit gerekli
- ⏳ GitHub push gerekli
- ⏳ Vercel deploy gerekli

### Sonra:
- ✅ Canlı sitede görünür
- ✅ Dil değiştirici çalışır
- ✅ Almanca/İngilizce geçiş

---

**Tarih**: 24 Ocak 2026  
**Durum**: DEPLOYMENT HAZIR  
**Sonraki Adım**: Git commit & push

