# 🏥 DOKTOR PANELİNE TEST HASTALARI EKLEME

## Adım 1: Railway DATABASE_URL Al

1. **Railway Dashboard'a git**: https://railway.app
2. **NeuralCipher projesini aç**
3. **PostgreSQL servisine tıkla**
4. **"Connect" tab'ına git**
5. **"Postgres Connection URL" kopyala**

URL formatı:
```
postgresql://postgres:XXXXXXXX@XXXXXXX.proxy.rlwy.net:XXXXX/railway
```

## Adım 2: Script Çalıştır

### Windows CMD:
```cmd
set DATABASE_URL=postgresql://postgres:XXXXXXXX@XXXXXXX.proxy.rlwy.net:XXXXX/railway
python add_test_patients_to_doctor.py
```

### PowerShell:
```powershell
$env:DATABASE_URL="postgresql://postgres:XXXXXXXX@XXXXXXX.proxy.rlwy.net:XXXXX/railway"
python add_test_patients_to_doctor.py
```

## Ne Yapacak?

Script şunları oluşturacak:

### 5 Test Hastası:
1. **John Smith** (patient1@test.com)
2. **Maria Garcia** (patient2@test.com)
3. **Robert Johnson** (patient3@test.com)
4. **Emily Chen** (patient4@test.com)
5. **Michael Brown** (patient5@test.com)

**Tüm şifreler**: `Patient123!`

### Otomatik Bağlantı:
- Her hasta otomatik olarak `doctor@neuralcipher.ai` doktoruna bağlanacak
- Her hastaya benzersiz access key oluşturulacak
- Doctor-patient ilişkisi kurulacak

## Sonuç

Script çalıştıktan sonra:

1. **Doktor paneline git**: https://neuralcipher-ai.vercel.app/doctor/patients
2. **Giriş yap**:
   - Email: `doctor@neuralcipher.ai`
   - Password: `Doctor2026!@#`
3. **5 test hastasını göreceksin**

## Sorun Giderme

### "DATABASE_URL not set" hatası:
- DATABASE_URL'i doğru kopyaladığından emin ol
- Tırnak işaretleri içinde olmalı (PowerShell için)

### "Connection failed" hatası:
- Railway PostgreSQL servisinin çalıştığından emin ol
- URL'in güncel olduğundan emin ol (Railway URL'leri değişebilir)

### "Doctor not found" hatası:
- `doctor@neuralcipher.ai` kullanıcısının Railway'de olduğundan emin ol
- Gerekirse önce doktor kullanıcısını oluştur
