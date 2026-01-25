# 🚀 Railway Deployment - Doktor-Hasta Yönetimi

**Tarih:** 25 Ocak 2026  
**Özellik:** Doktor hasta ekleme/düzenleme/silme

---

## 📋 Deployment Checklist

### 1. **Git Commit & Push**
```bash
cd neuralcipher-ai

# Tüm değişiklikleri ekle
git add .

# Commit
git commit -m "feat: Add doctor-patient management system

- Add DoctorPatient relationship model
- Add patient CRUD endpoints for doctors
- Add patient management UI with modal
- Add authorization checks
- Add migration for doctor_patients table"

# Push to main
git push origin main
```

### 2. **Railway Otomatik Deploy**
Railway otomatik olarak:
- ✅ Yeni commit'i algılar
- ✅ Backend'i rebuild eder
- ✅ Migration'ı çalıştırır
- ✅ Servisi restart eder

### 3. **Migration Kontrolü**
Railway dashboard'da:
1. Backend servisine git
2. "Deployments" sekmesine tıkla
3. Son deployment'ı aç
4. Logs'da şunu ara:
```
✅ Database connected successfully
✅ Tables created/verified
```

---

## 🔍 Test Adımları

### **1. Backend API Test**
```bash
# Railway backend URL'ini kullan
curl https://your-backend.railway.app/api/v1/doctor/patients \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### **2. Frontend Test**
1. https://neuralcipher.ai adresine git
2. Doktor olarak giriş yap:
   - Email: `doctor@test.com`
   - Password: `doctor123`
3. "My Patients" sayfasına git
4. "Add Patient" butonunu gör
5. Hasta ekle
6. Hasta listesini gör

---

## 📊 Yeni Endpoint'ler

### **POST /api/v1/doctor/patients**
Yeni hasta ekle
```json
{
  "email": "patient@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "password": "secure123",
  "phone": "+1234567890",
  "date_of_birth": "1980-01-01",
  "gender": "male"
}
```

### **GET /api/v1/doctor/patients**
Doktorun hastalarını listele

### **PUT /api/v1/doctor/patients/{id}**
Hasta bilgilerini güncelle

### **DELETE /api/v1/doctor/patients/{id}**
Hastayı listeden kaldır (soft delete)

---

## 🗄️ Database Migration

Railway otomatik çalıştırır:
```sql
CREATE TABLE doctor_patients (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER REFERENCES users(id),
    patient_id INTEGER REFERENCES users(id),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(doctor_id, patient_id)
);
```

---

## ✅ Deployment Sonrası Kontrol

### **Backend Health Check**
```bash
curl https://your-backend.railway.app/health
```

Beklenen yanıt:
```json
{
  "status": "healthy",
  "database": "connected"
}
```

### **Frontend Check**
1. https://neuralcipher.ai açılıyor mu?
2. Login çalışıyor mu?
3. Doktor paneli açılıyor mu?
4. "Add Patient" butonu görünüyor mu?

---

## 🔧 Sorun Giderme

### **Migration Çalışmadıysa**
Railway dashboard'da:
```bash
# Railway CLI ile bağlan
railway run alembic upgrade head
```

### **Backend Restart**
Railway dashboard'da:
- Backend servisine git
- "Restart" butonuna tıkla

### **Logs Kontrolü**
```bash
# Railway CLI
railway logs
```

---

## 📱 Kullanıcı Testi

### **Test Senaryosu 1: Hasta Ekleme**
1. Doktor olarak giriş yap
2. My Patients → Add Patient
3. Formu doldur
4. Submit
5. ✅ Hasta listeye eklenmeli

### **Test Senaryosu 2: Yetkilendirme**
1. Doktor A olarak giriş yap
2. Hasta ekle
3. Çıkış yap
4. Doktor B olarak giriş yap
5. ✅ Doktor A'nın hastasını görmemeli

### **Test Senaryosu 3: Hasta Silme**
1. Doktor olarak giriş yap
2. Hasta listesinde "Remove" tıkla
3. Onayla
4. ✅ Hasta listeden kalkar

---

## 🎯 Deployment Özeti

**Yapılan Değişiklikler:**
- ✅ Backend: 4 yeni endpoint
- ✅ Frontend: Patient management UI
- ✅ Database: doctor_patients tablosu
- ✅ Security: Ownership kontrolü

**Deployment Süresi:** ~5-10 dakika

**Rollback:** 
```bash
git revert HEAD
git push origin main
```

---

## 🚀 Hemen Deploy Et!

```bash
# 1. Commit
git add .
git commit -m "feat: Doctor-patient management system"

# 2. Push
git push origin main

# 3. Railway otomatik deploy eder
# 4. 5 dakika bekle
# 5. Test et!
```

**Railway Dashboard:** https://railway.app/dashboard

Deployment tamamlandığında sistem canlıda hazır! 🎉
