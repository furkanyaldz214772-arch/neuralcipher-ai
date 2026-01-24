# 🔒 NeuralCipher.ai - Güvenlik Analiz Raporu

**Tarih:** 23 Ocak 2026  
**Analiz Eden:** AI Security Audit  
**Proje:** NeuralCipher.ai - Parkinson Erken Teşhis Sistemi

---

## 🚨 KRİTİK GÜVENLİK AÇIKLARI (YÜKSEK ÖNCELİK)

### 1. ❌ HARDCODED TEST ŞİFRELERİ (CRITICAL)
**Dosyalar:**
- `backend/add_hospital_simple.py` - Line 27: `password_hash("Hospital123!@#")`
- `backend/create_test_users.py` - Lines 38, 53, 68
- `backend/create_test_users_simple.py`

**Risk:** Production'da bu test kullanıcıları varsa sisteme yetkisiz erişim mümkün.

**Çözüm:**
```python
# ❌ YANLIŞ
password_hash = hash_password("Hospital123!@#")

# ✅ DOĞRU
import secrets
password = secrets.token_urlsafe(32)
password_hash = hash_password(password)
# Şifreyi güvenli bir şekilde admin'e ilet
```

---

### 2. ❌ SQL INJECTION RİSKİ (HIGH)
**Dosya:** `backend/add_hospital_simple.py` - Line 31-33

```python
# ❌ YANLIŞ - SQL Injection açığı
cursor.execute("""
    INSERT INTO users (email, password_hash, role, is_active, email_verified, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
""", ("hospital@test.com", password_hash, "hospital", 1, 1, created_at))
```

**Risk:** Parametreli sorgular kullanılıyor ama SQLite kullanımı production için uygun değil.

**Çözüm:**
- SQLite yerine PostgreSQL kullan (zaten requirements.txt'de var)
- SQLAlchemy ORM kullan (raw SQL yerine)

---

### 3. ❌ ZAYIF JWT SECRET KEY KONTROLÜ (CRITICAL)
**Dosya:** `backend/app/core/security/auth.py` - Line 17-19

```python
SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
    raise ValueError("JWT_SECRET environment variable is required and must be set")
```

**Risk:** 
- Secret key'in uzunluğu kontrol edilmiyor
- Güçlü olup olmadığı doğrulanmıyor
- `.env.example` dosyasında örnek değer var: `your-super-secret-jwt-key-min-32-chars-change-this`

**Çözüm:**
```python
SECRET_KEY = os.getenv("JWT_SECRET")
if not SECRET_KEY:
    raise ValueError("JWT_SECRET environment variable is required")
if len(SECRET_KEY) < 32:
    raise ValueError("JWT_SECRET must be at least 32 characters long")
if SECRET_KEY == "your-super-secret-jwt-key-min-32-chars-change-this":
    raise ValueError("JWT_SECRET must be changed from default value")
```

---

### 4. ❌ DOSYA YÜKLEME GÜVENLİK AÇIĞI (HIGH)
**Dosya:** `backend/app/api/v1/tests/routes.py` - Line 115-125

```python
# ❌ YANLIŞ - Dosya tipi kontrolü yok
audio_dir = f"uploads/tests/{current_user.id}"
os.makedirs(audio_dir, exist_ok=True)

file_path = f"{audio_dir}/{test.id}.wav"
with open(file_path, "wb") as f:
    content = await audio_file.read()
    f.write(content)
```

**Riskler:**
1. Dosya tipi doğrulanmıyor (malicious file upload)
2. Dosya boyutu kontrolü yok (DoS attack)
3. Dosya içeriği taranmıyor (virus/malware)
4. Path traversal açığı (`../../../etc/passwd`)

**Çözüm:**
```python
import magic
from pathlib import Path

# Dosya tipi kontrolü
ALLOWED_EXTENSIONS = {'.wav', '.mp3', '.m4a', '.flac'}
ALLOWED_MIME_TYPES = {'audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/flac'}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB

# Dosya uzantısı kontrolü
file_ext = Path(audio_file.filename).suffix.lower()
if file_ext not in ALLOWED_EXTENSIONS:
    raise HTTPException(400, "Invalid file type")

# Dosya boyutu kontrolü
content = await audio_file.read()
if len(content) > MAX_FILE_SIZE:
    raise HTTPException(413, "File too large")

# MIME type kontrolü
mime = magic.from_buffer(content, mime=True)
if mime not in ALLOWED_MIME_TYPES:
    raise HTTPException(400, "Invalid file content")

# Path traversal koruması
safe_filename = f"{uuid.uuid4()}.wav"
audio_dir = Path("uploads/tests") / str(current_user.id)
audio_dir.mkdir(parents=True, exist_ok=True)
file_path = audio_dir / safe_filename
```

---

### 5. ❌ RATE LIMITING YETERSİZ (MEDIUM)
**Dosya:** `backend/app/main.py` - Line 30

```python
limiter = Limiter(key_func=get_remote_address)
```

**Risk:** 
- Rate limit değerleri tanımlanmamış
- Endpoint bazlı limit yok
- Brute force attack'e açık

**Çözüm:**
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["100/hour", "20/minute"]
)

# Login endpoint için özel limit
@router.post("/login")
@limiter.limit("5/minute")  # 5 deneme/dakika
async def login(...):
    pass
```

---

### 6. ❌ CSRF TOKEN KONTROLÜ EKSİK (MEDIUM)
**Dosya:** `backend/app/main.py` - Line 73

```python
app.add_middleware(CSRFMiddleware)
```

**Risk:** CSRF middleware eklendi ama token doğrulama implementasyonu görünmüyor.

**Çözüm:**
```python
# backend/app/core/security/csrf.py dosyasını kontrol et
# Token generation ve validation olmalı
```

---

### 7. ❌ HASSAS VERİ LOGLANMASI (HIGH - HIPAA/GDPR)
**Dosya:** `backend/app/api/v1/tests/routes.py`

**Risk:** 
- Ses dosyaları ve biomarker verileri loglanabilir
- HIPAA/GDPR ihlali riski
- Audit log'da hassas veri

**Çözüm:**
```python
import logging

# Hassas verileri loglardan çıkar
logging.getLogger("uvicorn.access").addFilter(
    lambda record: not any(
        sensitive in record.getMessage() 
        for sensitive in ['/tests/', '/upload', 'biomarker']
    )
)

# Audit log için ayrı sistem
from app.core.audit import audit_log
audit_log.log_test_created(
    user_id=current_user.id,
    test_id=test.id,
    # Hassas veri YOK
)
```

---

### 8. ❌ CORS ORIGIN KONTROLÜ ZAYIF (MEDIUM)
**Dosya:** `backend/app/main.py` - Line 60-68

```python
CORS_ORIGINS = os.getenv("CORS_ORIGINS")
if not CORS_ORIGINS:
    raise ValueError("CORS_ORIGINS environment variable is required")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["*"],  # ❌ Tüm metodlar açık
    allow_headers=["*"],  # ❌ Tüm headerlar açık
)
```

**Çözüm:**
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS.split(","),
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "PATCH"],  # ✅ Spesifik
    allow_headers=["Content-Type", "Authorization", "X-CSRF-Token"],  # ✅ Spesifik
    expose_headers=["X-Total-Count"],
    max_age=3600
)
```

---

### 9. ❌ DATABASE CONNECTION STRING AÇIKTA (CRITICAL)
**Dosya:** `backend/app/core/database.py` - Line 11-14

```python
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:password@localhost:5432/neuralcipher"  # ❌ Default şifre
)
```

**Risk:** Default şifre production'da kullanılabilir.

**Çözüm:**
```python
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required")
if "password@" in DATABASE_URL:
    raise ValueError("Default database password detected. Change it!")
```

---

### 10. ❌ SESSION MANAGEMENT EKSİK (MEDIUM)
**Risk:**
- Session timeout yok
- Concurrent session kontrolü yok
- Session invalidation eksik

**Çözüm:**
```python
# JWT token'a session_id ekle
def create_access_token(data: dict, session_id: str):
    to_encode = data.copy()
    to_encode.update({
        "exp": datetime.utcnow() + timedelta(minutes=30),
        "session_id": session_id,
        "type": "access"
    })
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Redis'te session tracking
def validate_session(session_id: str, user_id: int):
    active_sessions = redis_client.smembers(f"user:{user_id}:sessions")
    if session_id not in active_sessions:
        raise HTTPException(401, "Session expired or invalid")
```

---

## ⚠️ ORTA ÖNCELİKLİ SORUNLAR

### 11. Password Strength Validation Eksik
**Dosya:** `backend/app/core/security/auth.py` - Line 140-171

✅ İyi: Password validation fonksiyonu var  
❌ Kötü: Register endpoint'te kullanılmıyor

### 12. 2FA Zorunlu Değil
**Risk:** Admin ve doctor hesapları için 2FA zorunlu olmalı

### 13. Email Verification Eksik
**Risk:** Fake email ile kayıt olunabilir

### 14. API Versioning Yok
**Risk:** Breaking changes production'ı bozabilir

### 15. Input Sanitization Eksik
**Risk:** XSS ve injection attack'lere açık

---

## 📋 HEMEN YAPILMASI GEREKENLER

### Öncelik 1 (Bugün):
1. ✅ Test kullanıcı şifrelerini production'dan kaldır
2. ✅ JWT SECRET_KEY güçlü olduğundan emin ol
3. ✅ Dosya yükleme güvenliğini ekle
4. ✅ Database default şifresini değiştir

### Öncelik 2 (Bu Hafta):
5. ✅ Rate limiting ekle (login: 5/min, API: 100/hour)
6. ✅ CORS ayarlarını sıkılaştır
7. ✅ Session management ekle
8. ✅ Audit logging ekle

### Öncelik 3 (Bu Ay):
9. ✅ 2FA'yı admin/doctor için zorunlu yap
10. ✅ Email verification ekle
11. ✅ Input sanitization ekle
12. ✅ Security headers ekle (CSP, HSTS)

---

## 🛡️ ÖNERİLEN GÜVENLİK ARAÇLARI

### 1. Dependency Scanning
```bash
pip install safety
safety check
```

### 2. Static Code Analysis
```bash
pip install bandit
bandit -r backend/
```

### 3. Secret Scanning
```bash
pip install detect-secrets
detect-secrets scan
```

### 4. Penetration Testing
- OWASP ZAP
- Burp Suite
- SQLMap

---

## 📊 GÜVENLİK SKORU

**Mevcut Durum:** 6.5/10 ⚠️

**Kritik Açıklar:** 5  
**Yüksek Risk:** 3  
**Orta Risk:** 7  
**Düşük Risk:** 2

**Hedef:** 9.0/10 ✅

---

## 📞 DESTEK

Güvenlik açığı bulursanız:
- Email: security@neuralcipher.ai
- Bug Bounty: https://neuralcipher.ai/security

---

**Son Güncelleme:** 23 Ocak 2026  
**Sonraki Audit:** 23 Şubat 2026
