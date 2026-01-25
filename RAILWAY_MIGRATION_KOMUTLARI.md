# 🚀 Railway Migration - Hemen Çalıştır

## ⚡ Tek Komut ile Migration

Railway Dashboard'da backend servisine git ve şu komutu çalıştır:

```sql
CREATE TABLE IF NOT EXISTS doctor_patients (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(doctor_id, patient_id)
);

CREATE INDEX IF NOT EXISTS ix_doctor_patients_doctor_id ON doctor_patients(doctor_id);
CREATE INDEX IF NOT EXISTS ix_doctor_patients_patient_id ON doctor_patients(patient_id);
```

## 📋 Adım Adım

### 1. Railway Dashboard Aç
https://railway.app/dashboard

### 2. Backend Servisine Git
- Project'i seç
- Backend service'i seç

### 3. Database Tab'ına Git
- "Data" sekmesine tıkla
- "Query" butonuna tıkla

### 4. SQL'i Yapıştır ve Çalıştır
Yukarıdaki SQL'i yapıştır ve "Run" tıkla

### 5. Kontrol Et
```sql
SELECT * FROM doctor_patients LIMIT 1;
```

## ✅ Tamamlandı!

Artık canlı sitede:
- ✅ Doktorlar hasta ekleyebilir
- ✅ Doktorlar hasta düzenleyebilir
- ✅ Doktorlar hasta silebilir
- ✅ Sadece kendi hastalarını görebilir

## 🧪 Test Et

1. https://neuralcipher.ai/auth/login
2. Doktor olarak giriş yap
3. My Patients sayfasına git
4. "Add Patient" butonunu gör
5. Hasta ekle!

**Deployment süresi:** 30 saniye! ⚡
