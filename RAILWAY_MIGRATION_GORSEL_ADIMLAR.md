# 📸 RAILWAY MİGRATİON - GÖRSEL ADIM ADIM

**Tarih:** 28 Ocak 2026  
**Süre:** 2 dakika

---

## 🎯 ADIM 1: Railway Dashboard'a Git

**URL:** https://railway.app/dashboard

1. Tarayıcıda aç
2. Login ol (eğer değilsen)
3. Project'ini seç: **neuralcipher-backend**

---

## 🎯 ADIM 2: PostgreSQL Servisini Seç

1. Sol menüden **PostgreSQL** servisine tıkla
2. Üstteki tab'lardan **"Query"** tab'ına tıkla
3. SQL editörü açılacak

---

## 🎯 ADIM 3: SQL Kodunu Yapıştır

**Aşağıdaki kodu TAMAMEN kopyala:**

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_photo_url VARCHAR(500);

CREATE TABLE IF NOT EXISTS doctor_patient_access (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(doctor_id, patient_id)
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50),
    resource_id INTEGER,
    details JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doctor_patient_doctor ON doctor_patient_access(doctor_id);
CREATE INDEX IF NOT EXISTS idx_doctor_patient_patient ON doctor_patient_access(patient_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON audit_logs(created_at);
```

**SQL editörüne yapıştır**

---

## 🎯 ADIM 4: Query'yi Çalıştır

1. **"Run Query"** veya **"Execute"** butonuna tıkla
2. Yeşil ✅ işareti göreceksin
3. "Query executed successfully" mesajı gelecek

---

## 🎯 ADIM 5: Backend'i Restart Et

1. Sol menüden **Backend** servisine tıkla
2. Sağ üstten **"Settings"** tab'ına git
3. Aşağı kaydır
4. **"Restart"** butonuna tıkla
5. Backend yeniden başlayacak (30 saniye)

---

## ✅ TAMAMLANDI!

Backend şimdi çalışıyor olmalı.

**Test et:**
https://web-production-c00b0.up.railway.app/health
