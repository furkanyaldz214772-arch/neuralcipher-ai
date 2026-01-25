# 🔑 Patient Access Key System

**Tarih:** 25 Ocak 2026  
**Durum:** 🚧 GELIŞTIRME AŞAMASINDA

---

## 🎯 KONSEPT

Her hasta benzersiz bir Access Key alır. Bu key'i doktoruyla paylaşarak verilerine erişim izni verir.

### **Key Format:**
```
PAK-XXXX-XXXX-XXXX
Örnek: PAK-A7B9-C3D5-E1F8
```

---

## 📊 DATABASE ŞEMASI

### **1. Users Tablosuna Ekleme:**
```sql
ALTER TABLE users ADD COLUMN access_key VARCHAR(20) UNIQUE;
CREATE INDEX idx_users_access_key ON users(access_key);
```

### **2. Access Requests Tablosu:**
```sql
CREATE TABLE access_requests (
    id SERIAL PRIMARY KEY,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_key VARCHAR(20) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE,
    UNIQUE(doctor_id, patient_id, status)
);

CREATE INDEX idx_access_requests_patient ON access_requests(patient_id);
CREATE INDEX idx_access_requests_doctor ON access_requests(doctor_id);
CREATE INDEX idx_access_requests_status ON access_requests(status);
```

### **3. Access Logs Tablosu:**
```sql
CREATE TABLE access_logs (
    id SERIAL PRIMARY KEY,
    doctor_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    patient_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(50) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_access_logs_doctor ON access_logs(doctor_id);
CREATE INDEX idx_access_logs_patient ON access_logs(patient_id);
CREATE INDEX idx_access_logs_created ON access_logs(created_at);
```

---

## 🔧 BACKEND API ENDPOINTS

### **Patient Endpoints:**

#### 1. Get My Access Key
```
GET /api/v1/patient/access-key
Response: {
    "access_key": "PAK-A7B9-C3D5-E1F8",
    "created_at": "2026-01-25T10:00:00Z",
    "active_doctors": 2,
    "pending_requests": 1
}
```

#### 2. Regenerate Access Key
```
POST /api/v1/patient/access-key/regenerate
Response: {
    "access_key": "PAK-NEW1-NEW2-NEW3",
    "old_key_revoked": true,
    "message": "Access key regenerated successfully"
}
```

#### 3. Get Access Requests
```
GET /api/v1/patient/access-requests
Response: [
    {
        "id": 123,
        "doctor_id": 456,
        "doctor_name": "Dr. John Smith",
        "doctor_email": "dr.smith@hospital.com",
        "status": "pending",
        "requested_at": "2026-01-25T10:00:00Z"
    }
]
```

#### 4. Approve/Reject Request
```
POST /api/v1/patient/access-requests/{request_id}/approve
POST /api/v1/patient/access-requests/{request_id}/reject

Response: {
    "message": "Access request approved",
    "doctor_patient_id": 789
}
```

#### 5. Revoke Doctor Access
```
DELETE /api/v1/patient/revoke-access/{doctor_id}
Response: {
    "message": "Access revoked successfully"
}
```

#### 6. Get Active Doctors
```
GET /api/v1/patient/active-doctors
Response: [
    {
        "doctor_id": 456,
        "doctor_name": "Dr. John Smith",
        "doctor_email": "dr.smith@hospital.com",
        "granted_at": "2026-01-20T10:00:00Z",
        "last_access": "2026-01-25T09:00:00Z"
    }
]
```

### **Doctor Endpoints:**

#### 1. Request Access by Key
```
POST /api/v1/doctor/request-access
Body: {
    "access_key": "PAK-A7B9-C3D5-E1F8"
}
Response: {
    "status": "pending",
    "patient_name": "John Doe",
    "patient_email": "john@example.com",
    "request_id": 123,
    "message": "Access request sent to patient"
}
```

#### 2. Search Patient by Key
```
GET /api/v1/doctor/patients/search-by-key?key=PAK-A7B9-C3D5-E1F8
Response: {
    "patient_id": 789,
    "patient_name": "John Doe",
    "patient_email": "john@example.com",
    "has_access": false,
    "pending_request": true
}
```

---

## 🎨 FRONTEND COMPONENTS

### **Patient Dashboard:**

#### Access Key Card
- Display current access key
- Copy to clipboard button
- Regenerate key button
- Active doctors count
- Pending requests count

#### Access Requests List
- Pending requests with doctor info
- Approve/Reject buttons
- Request timestamp

#### Active Doctors List
- List of doctors with access
- Granted date
- Last access date
- Revoke access button

### **Doctor Panel:**

#### Add Patient by Key
- Input field for access key
- Search/Request button
- Patient preview
- Request status

---

## 🔒 GÜVENLIK ÖZELLİKLERİ

### **Key Generation:**
- 16 karakter (4-4-4 format)
- Cryptographically secure random
- Unique constraint
- Collision detection

### **Rate Limiting:**
- 5 key search attempts / 15 minutes
- 3 key regeneration / 24 hours
- IP-based throttling

### **Audit Trail:**
- Her erişim loglanır
- IP adresi kaydedilir
- User agent kaydedilir
- HIPAA compliance

### **Auto-Expiration:**
- Unused keys: 90 days
- Pending requests: 7 days
- Rejected requests: Immediate cleanup

---

## 📱 KULLANIM SENARYOLARI

### **Senaryo 1: Hasta Key Paylaşır**
1. Hasta dashboard'a girer
2. Access Key'ini görür ve kopyalar
3. Doktoruna email/telefon ile gönderir
4. Doktor key'i girer
5. Hasta onaylar
6. Erişim verilir

### **Senaryo 2: Key Yenileme**
1. Hasta güvenlik nedeniyle key yenilemek ister
2. "Regenerate Key" butonuna tıklar
3. Onay mesajı
4. Yeni key oluşturulur
5. Eski key iptal edilir
6. Mevcut doktorlar etkilenmez

### **Senaryo 3: Erişim İptali**
1. Hasta active doctors listesini görür
2. Bir doktorun erişimini iptal etmek ister
3. "Revoke Access" butonuna tıklar
4. Onay mesajı
5. İlişki kopar
6. Doktor artık verileri göremez

---

## ✅ AVANTAJLAR

- ✅ Hasta kontrolde
- ✅ Kolay paylaşım
- ✅ Güvenli (şifre paylaşmaya gerek yok)
- ✅ İptal edilebilir
- ✅ Audit trail
- ✅ HIPAA uyumlu
- ✅ Birden fazla doktor
- ✅ Geçici erişim (opsiyonel)

---

## 🚀 DEPLOYMENT ADIMLARI

### 1. Database Migration
```bash
cd neuralcipher-ai/backend
alembic revision -m "add_patient_access_key_system"
alembic upgrade head
```

### 2. Backend Deploy
```bash
# Railway otomatik deploy
git push origin main
```

### 3. Frontend Deploy
```bash
cd neuralcipher-ai/frontend
npm run build
# Vercel otomatik deploy
```

### 4. Generate Keys for Existing Patients
```bash
python scripts/generate_access_keys.py
```

---

## 📊 METRIKLER

### **Takip Edilecek:**
- Key generation count
- Access request count
- Approval rate
- Rejection rate
- Revocation count
- Average response time
- Failed key attempts

---

## 🔄 SONRAKI ADIMLAR

### **Phase 1: Core System** (Şimdi)
- ✅ Database schema
- ✅ Backend API
- ✅ Frontend UI
- ✅ Basic security

### **Phase 2: Enhanced Features**
- QR Code generation
- Email invitation system
- Temporary access (time-limited)
- Limited access (data range)

### **Phase 3: Advanced**
- Multi-factor approval
- Access analytics
- Notification system
- Mobile app integration

---

## 📝 NOTLAR

- Key format değiştirilebilir
- Onay sistemi opsiyonel (auto-approve modu)
- Audit logs 1 yıl saklanır
- Rate limiting ayarlanabilir

---

**Sistem production-ready olacak!** 🚀
