# 📸 RAILWAY SQL - GÖRSEL REHBER

**Hasta girişini düzeltmek için**

---

## 🖼️ ADIM 1: Railway Dashboard

**URL:** https://railway.app/dashboard

```
┌─────────────────────────────────────┐
│  Railway Dashboard                  │
├─────────────────────────────────────┤
│                                     │
│  ┌─────────────┐                   │
│  │ PostgreSQL  │ ← BURAYA TIKLA    │
│  └─────────────┘                   │
│                                     │
│  ┌─────────────┐                   │
│  │ Backend     │                   │
│  └─────────────┘                   │
│                                     │
└─────────────────────────────────────┘
```

---

## 🖼️ ADIM 2: Query Tab

```
┌─────────────────────────────────────┐
│  PostgreSQL                         │
├─────────────────────────────────────┤
│  Data | Query | Settings | Logs    │
│        ↑                            │
│     BURAYA TIKLA                    │
└─────────────────────────────────────┘
```

---

## 🖼️ ADIM 3: SQL Yapıştır

```
┌─────────────────────────────────────┐
│  Query Editor                       │
├─────────────────────────────────────┤
│                                     │
│  ALTER TABLE users ADD COLUMN...   │
│  ↑                                  │
│  BURAYA YAPIŞTIR                    │
│                                     │
│  [Run Query] ← BURAYA TIKLA         │
│                                     │
└─────────────────────────────────────┘
```

---

## 🖼️ ADIM 4: Backend Restart

```
┌─────────────────────────────────────┐
│  Backend Service                    │
├─────────────────────────────────────┤
│  Deployments | Settings | Logs     │
│                ↑                    │
│             BURAYA TIKLA            │
│                                     │
│  [Restart] ← BURAYA TIKLA           │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ TAMAMLANDI!

30 saniye bekle, hasta girişi çalışacak.

---

## 📝 YAPIŞTIR

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo_url VARCHAR(500);
```

Sadece bu satırı yapıştır, yeterli!

---

**Detaylı bilgi:** HEMEN_DUZELT_HASTA_GIRIS.md
