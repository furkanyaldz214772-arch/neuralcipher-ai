# 🚨 ACİL: RAILWAY DATABASE MİGRATİON 006

**Tarih:** 28 Ocak 2026  
**Durum:** ❌ BACKEND ÇÖKMÜŞ - Migration gerekli

---

## 🔴 SORUN

Railway backend şu hatayla çöküyor:
```
ProgrammingError: column users.profile_photo_url does not exist
```

**Neden:** Migration 006 Railway database'inde çalıştırılmadı.

---

## ✅ ÇÖZÜM - 2 YÖNTEM

### YÖNTEM 1: Railway Dashboard (EN KOLAY)

1. **Railway Dashboard'a git:**
   https://railway.app/dashboard

2. **PostgreSQL servisini seç**

3. **"Query" tab'ına tıkla**

4. **Aşağıdaki SQL'i kopyala-yapıştır:**

```sql
-- Add profile_photo_url column
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS profile_photo_url VARCHAR(500);

-- Create doctor_patient_access table
CREATE TABLE IF NOT EXISTS doctor_patient_access (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    revoked_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(doctor_id, patient_id)
);

-- Create audit_logs table
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_doctor_patient_doctor 
ON doctor_patient_access(doctor_id);

CREATE INDEX IF NOT EXISTS idx_doctor_patient_patient 
ON doctor_patient_access(patient_id);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user 
ON audit_logs(user_id);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created 
ON audit_logs(created_at);
```

5. **"Run Query" butonuna tıkla**

6. **Backend'i restart et:**
   - Backend servisine git
   - Settings → Restart

---

### YÖNTEM 2: Railway CLI

```bash
# Railway CLI kur (eğer yoksa)
npm install -g @railway/cli

# Login
railway login

# Project'i seç
railway link

# Migration çalıştır
railway run python backend/run_migration_006_railway.py
```

---

## 🔍 DOĞRULAMA

Migration başarılı olduktan sonra:

```sql
-- Column var mı kontrol et
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
AND column_name = 'profile_photo_url';

-- Tablolar oluştu mu kontrol et
SELECT table_name 
FROM information_schema.tables 
WHERE table_name IN ('doctor_patient_access', 'audit_logs');
```

---

## 📝 SONRA NE OLACAK?

Migration tamamlandıktan sonra:
1. ✅ Backend otomatik restart olacak
2. ✅ Login çalışmaya başlayacak
3. ✅ Profile photo upload çalışacak
4. ✅ Doctor-patient access sistemi aktif olacak

---

**ÖNEMLİ:** Bu migration olmadan backend çalışmaz!
