# 🚀 CPANEL KURULUM REHBERİ - NeuralCipher.ai

## 📋 İHTİYAÇ DUYULAN BİLGİLER

### 1. **cPanel Erişim Bilgileri**
```
cPanel URL: https://yourdomain.com:2083
Kullanıcı Adı: [cpanel_username]
Şifre: [cpanel_password]
```

### 2. **Domain Bilgileri**
```
Ana Domain: neuralcipher.ai (veya subdomain)
SSL Sertifikası: Var mı? (Let's Encrypt otomatik kurulabilir)
```

### 3. **Veritabanı Bilgileri**
```
MySQL/PostgreSQL: Hangisi tercih?
Veritabanı Adı: [otomatik oluşturulacak]
Veritabanı Kullanıcısı: [otomatik oluşturulacak]
Veritabanı Şifresi: [güçlü şifre oluşturulacak]
```

### 4. **Email Ayarları**
```
SMTP Host: mail.yourdomain.com
SMTP Port: 587 (TLS) veya 465 (SSL)
Email: noreply@neuralcipher.ai
Şifre: [email_password]
```

### 5. **Sunucu Gereksinimleri**
```
Python: 3.9+ (cPanel Python Selector ile)
Node.js: 18+ (cPanel Node.js Selector ile)
RAM: Minimum 2GB
Disk: Minimum 10GB
```

---

## 🔧 YAPILACAK İŞLEMLER

### **ADIM 1: DOSYA YÜKLEME**
```bash
# cPanel File Manager veya FTP ile
1. Backend dosyalarını /home/username/neuralcipher-backend/ yükle
2. Frontend build dosyalarını /home/username/public_html/ yükle
3. AI model dosyalarını /home/username/ai-models/ yükle
```

### **ADIM 2: VERİTABANI KURULUMU**
```sql
-- cPanel MySQL Databases ile
1. Yeni veritabanı oluştur: neuralcipher_db
2. Yeni kullanıcı oluştur: neuralcipher_user
3. Kullanıcıya tüm yetkiler ver
4. Tabloları oluştur (Alembic migration)
5. Test kullanıcıları ekle
```

### **ADIM 3: PYTHON ORTAMI**
```bash
# cPanel Terminal veya SSH ile
1. Python 3.9+ seç (Python Selector)
2. Virtual environment oluştur
3. Requirements.txt yükle
4. Environment variables ayarla
```

### **ADIM 4: NODE.JS KURULUMU**
```bash
# cPanel Node.js Selector ile
1. Node.js 18+ seç
2. Frontend build yap
3. Static dosyaları serve et
```

### **ADIM 5: DOMAIN AYARLARI**
```
1. Domain DNS ayarları
2. SSL sertifikası (Let's Encrypt)
3. .htaccess yapılandırması
4. Subdomain ayarları (api.neuralcipher.ai)
```

### **ADIM 6: BACKEND BAŞLATMA**
```bash
# Passenger veya Python App ile
1. WSGI application ayarla
2. Gunicorn/Uvicorn yapılandır
3. Auto-restart ayarla
4. Log dosyaları ayarla
```

### **ADIM 7: FRONTEND DEPLOYMENT**
```bash
1. Next.js build
2. Static export
3. .htaccess rewrite rules
4. CDN ayarları (opsiyonel)
```

### **ADIM 8: GÜVENLİK AYARLARI**
```
1. Firewall kuralları
2. ModSecurity ayarları
3. Rate limiting
4. CORS ayarları
5. Environment variables güvenliği
```

---

## 📦 KURULUM PAKETLERİ

### **Paket 1: Temel Kurulum (2-3 saat)**
- ✅ Dosya yükleme
- ✅ Veritabanı kurulumu
- ✅ Backend deployment
- ✅ Frontend deployment
- ✅ SSL sertifikası
- ✅ Temel güvenlik

### **Paket 2: Tam Kurulum (4-6 saat)**
- ✅ Paket 1 + 
- ✅ Email yapılandırması
- ✅ Cron jobs (otomatik görevler)
- ✅ Backup sistemi
- ✅ Monitoring kurulumu
- ✅ Performance optimizasyonu

### **Paket 3: Enterprise Kurulum (1-2 gün)**
- ✅ Paket 2 +
- ✅ Load balancing
- ✅ Redis cache
- ✅ CDN entegrasyonu
- ✅ Advanced monitoring
- ✅ Auto-scaling
- ✅ Disaster recovery

---

## 🔐 GÜVENLİK KONTROL LİSTESİ

### **Zorunlu Güvenlik Ayarları**
- [ ] SSL/TLS sertifikası aktif
- [ ] HTTPS yönlendirmesi
- [ ] Güçlü veritabanı şifreleri
- [ ] Environment variables şifreli
- [ ] CORS ayarları yapılandırılmış
- [ ] Rate limiting aktif
- [ ] SQL injection koruması
- [ ] XSS koruması
- [ ] CSRF token'ları
- [ ] Secure headers (HSTS, CSP, etc.)

### **Önerilen Güvenlik Ayarları**
- [ ] 2FA aktif (admin paneli)
- [ ] IP whitelist (admin)
- [ ] Fail2ban kurulumu
- [ ] ModSecurity kuralları
- [ ] Regular security scans
- [ ] Automated backups
- [ ] Log monitoring
- [ ] Intrusion detection

---

## 📊 PERFORMANS OPTİMİZASYONU

### **Backend Optimizasyonu**
```python
# Gunicorn workers
workers = (CPU_COUNT * 2) + 1
worker_class = "uvicorn.workers.UvicornWorker"
timeout = 120
keepalive = 5

# Database connection pooling
SQLALCHEMY_POOL_SIZE = 10
SQLALCHEMY_MAX_OVERFLOW = 20

# Redis caching
REDIS_URL = "redis://localhost:6379/0"
CACHE_TTL = 3600
```

### **Frontend Optimizasyonu**
```javascript
// Next.js config
module.exports = {
  compress: true,
  images: {
    domains: ['neuralcipher.ai'],
    formats: ['image/avif', 'image/webp']
  },
  swcMinify: true,
  reactStrictMode: true
}
```

### **Database Optimizasyonu**
```sql
-- Indexes
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_test_user_id ON voice_tests(user_id);
CREATE INDEX idx_test_date ON voice_tests(test_date);

-- Query optimization
ANALYZE TABLE users;
ANALYZE TABLE voice_tests;
```

---

## 🔄 BACKUP STRATEJİSİ

### **Otomatik Yedekleme**
```bash
# Günlük veritabanı yedeği (cron job)
0 2 * * * /usr/bin/mysqldump -u user -p'password' neuralcipher_db > /backups/db_$(date +\%Y\%m\%d).sql

# Haftalık dosya yedeği
0 3 * * 0 tar -czf /backups/files_$(date +\%Y\%m\%d).tar.gz /home/username/neuralcipher-backend/

# Aylık tam yedek
0 4 1 * * /scripts/full_backup.sh
```

### **Yedek Saklama**
- Günlük: 7 gün
- Haftalık: 4 hafta
- Aylık: 12 ay
- Offsite backup: AWS S3 / Google Cloud

---

## 📈 MONİTORİNG KURULUMU

### **Uptime Monitoring**
```
- UptimeRobot (ücretsiz)
- Pingdom
- StatusCake
- Custom health checks
```

### **Performance Monitoring**
```
- New Relic (APM)
- Sentry (Error tracking)
- Google Analytics
- Custom metrics dashboard
```

### **Log Management**
```bash
# Log rotation
/var/log/neuralcipher/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0640 www-data www-data
}
```

---

## 🚀 DEPLOYMENT SCRIPT

### **Otomatik Deployment**
```bash
#!/bin/bash
# deploy.sh

echo "🚀 NeuralCipher.ai Deployment Başlıyor..."

# 1. Git pull
cd /home/username/neuralcipher-backend
git pull origin main

# 2. Backend güncelleme
source venv/bin/activate
pip install -r requirements.txt
alembic upgrade head

# 3. Frontend build
cd /home/username/neuralcipher-frontend
npm install
npm run build
cp -r out/* /home/username/public_html/

# 4. Backend restart
touch /home/username/neuralcipher-backend/tmp/restart.txt

# 5. Cache temizleme
redis-cli FLUSHALL

echo "✅ Deployment tamamlandı!"
```

---

## 📞 KURULUM SONRASI DESTEK

### **Test Edilecekler**
- [ ] Ana sayfa yükleniyor mu?
- [ ] Login çalışıyor mu?
- [ ] Test upload çalışıyor mu?
- [ ] Email gönderimi çalışıyor mu?
- [ ] SSL sertifikası geçerli mi?
- [ ] API endpoint'ler yanıt veriyor mu?
- [ ] Database bağlantısı çalışıyor mu?
- [ ] Admin paneli erişilebilir mi?

### **Performans Testleri**
- [ ] Sayfa yükleme süresi < 3 saniye
- [ ] API response time < 500ms
- [ ] Database query time < 100ms
- [ ] Concurrent users: 100+

### **Güvenlik Testleri**
- [ ] SSL Labs: A+ rating
- [ ] Security Headers: A+ rating
- [ ] OWASP Top 10 koruması
- [ ] Penetration testing

---

## 💰 MALİYET TAHMİNİ

### **Hosting Maliyetleri**
```
Shared Hosting: $10-30/ay
VPS Hosting: $20-100/ay
Dedicated Server: $100-500/ay
Cloud Hosting (AWS/GCP): $50-300/ay
```

### **Ek Servisler**
```
Domain: $10-15/yıl
SSL Sertifikası: Ücretsiz (Let's Encrypt)
Email Hosting: $5-10/ay
CDN: $10-50/ay (opsiyonel)
Backup Storage: $5-20/ay
Monitoring: $0-50/ay
```

---

## 📝 BANA GÖNDERMENİZ GEREKENLER

### **Zorunlu Bilgiler**
1. ✅ cPanel login URL + kullanıcı adı + şifre
2. ✅ Domain adı
3. ✅ Email SMTP bilgileri (varsa)
4. ✅ Tercih edilen veritabanı (MySQL/PostgreSQL)

### **Opsiyonel Bilgiler**
5. ⭕ SSH erişimi (varsa)
6. ⭕ FTP bilgileri (alternatif)
7. ⭕ Mevcut hosting planı detayları
8. ⭕ Özel gereksinimler

---

## ⚡ HIZLI BAŞLANGIÇ

### **Senaryo 1: Sadece cPanel Erişimi**
```
1. cPanel bilgilerini gönder
2. Ben tüm kurulumu yaparım
3. 2-3 saat içinde sistem hazır
4. Test kullanıcıları ile giriş yapabilirsin
```

### **Senaryo 2: cPanel + SSH Erişimi**
```
1. cPanel + SSH bilgilerini gönder
2. Daha hızlı kurulum (1-2 saat)
3. Advanced optimizasyonlar
4. Custom script'ler kurulabilir
```

### **Senaryo 3: Sadece FTP Erişimi**
```
1. FTP bilgilerini gönder
2. Manuel kurulum (3-4 saat)
3. Bazı özellikler sınırlı olabilir
4. Temel sistem çalışır
```

---

## 🎯 SONUÇ

**EVET, YAPABILIRIM! 🚀**

Bana şunları gönder:
1. cPanel URL + kullanıcı adı + şifre
2. Domain adı
3. Email SMTP bilgileri (varsa)

Ben:
- ✅ Tüm dosyaları yüklerim
- ✅ Veritabanını kurarım
- ✅ Backend'i deploy ederim
- ✅ Frontend'i deploy ederim
- ✅ SSL sertifikası kurarım
- ✅ Güvenlik ayarlarını yaparım
- ✅ Test kullanıcıları oluştururum
- ✅ Sistemi test ederim
- ✅ Sana hazır sistem teslim ederim

**Süre:** 2-6 saat (hosting planına göre)
**Sonuç:** Çalışır, güvenli, production-ready sistem! ✅

---

**Hazır mısın? Bilgileri gönder, başlayalım! 🚀**
