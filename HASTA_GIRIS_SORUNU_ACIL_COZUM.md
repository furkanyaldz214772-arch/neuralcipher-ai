# 🚨 HASTA GİRİŞİ ÇALIŞMIYOR - ACİL ÇÖZÜM

**Tarih:** 28 Ocak 2026  
**Durum:** ❌ Backend çökmüş - Login çalışmıyor

---

## 🔴 SORUN

Hasta girişi yapılamıyor. Backend şu hatayla çöküyor:
```
ProgrammingError: column users.profile_photo_url does not exist
```

**Neden:**
- Backend'de yeni kod var (profile_photo_url kullanıyor)
- Database'de bu column yok
- Her login denemesinde backend crash oluyor

---

## ✅ ÇÖZÜM (2 DAKİKA)

### ADIM 1: Railway Dashboard'a Git
https://railway.app/dashboard

### ADIM 2: PostgreSQL'i Seç
Sol menüden **PostgreSQL** servisine tıkla

### ADIM 3: Query Tab'ına Git
Üstten **"Query"** tab'ına tıkla

### ADIM 4: Bu SQL'i Kopyala-Yapıştır

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

### ADIM 5: Run Query
**"Run Query"** veya **"Execute"** butonuna tıkla

### ADIM 6: Backend'i Restart Et
1. Sol menü → **Backend** servisi
2. Sağ üst → **Settings**
3. Aşağı kaydır → **Restart** butonu
4. Bekle (30 saniye)

---

## ✅ TEST ET

Backend çalışıyor mu kontrol et:
https://web-production-c00b0.up.railway.app/health

Hasta girişi dene:
https://neuralcipher-ai.vercel.app/auth/login

**Test Kullanıcısı:**
- Email: patient@test.com
- Password: Test123!

---

## 📝 NEDEN OLDU?

1. Backend'e yeni özellikler eklendi (profile photo, access key)
2. Kod GitHub'a push edildi
3. Railway otomatik deploy etti
4. Ama database migration çalıştırılmadı
5. Backend yeni column'u bekliyor, bulamıyor, crash oluyor

---

## 🎯 SONRA NE OLACAK?

Migration tamamlandıktan sonra:
- ✅ Backend çalışacak
- ✅ Hasta girişi çalışacak
- ✅ Doktor girişi çalışacak
- ✅ Tüm paneller çalışacak

---

**ÖNEMLİ:** Bu migration olmadan hiçbir giriş çalışmaz!
