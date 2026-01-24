# 🎯 AKSYON PLANI - 21 OCAK 2026
## NeuralCipher.ai Eksik Özellikler ve Öncelikler

---

## 📋 MEVCUT DURUM ÖZETİ

**Proje Tamamlanma:** %70 ✅

**Çalışan Sistemler:**
- ✅ Backend API (FastAPI) - 25+ endpoints
- ✅ Web Frontend (Next.js) - 20+ pages
- ✅ Mobile App (Flutter) - 15+ screens
- ✅ ML Model v6.0 - 94.8% accuracy, 11,070 samples
- ✅ Authentication (JWT)
- ✅ Admin Panel
- ✅ Doctor Panel
- ✅ Test Upload & Results

**Kritik Sorunlar:**
- ❌ Sadece 9 biyobelirteç (hedef: 59)
- ❌ 5 adımlı test wizard eksik
- ❌ Real-time ses kaydı eksik (web)
- ❌ PDF export eksik
- ❌ Email bildirimleri eksik
- ❌ Güvenlik özellikleri eksik (2FA, rate limiting)

---

## 🔴 ACIL GÖREVLER (Bu Hafta)

### 1. FFmpeg Kurulumu ve Test ✅ YAPILDI
**Durum:** Backend'de ses dönüştürme çalışıyor
**Dosya:** `backend/app/services/audio_processor.py`

### 2. Güven Seviyesi Doğrulaması ✅ YAPILDI
**Durum:** SYSTEM_CONFIDENCE = 0.948 (94.8%) - GERÇEK veri
**Dosya:** `backend/app/services/ml_service.py`
**Not:** Bu sabit değer, modelin validation accuracy'sini temsil ediyor

### 3. Test Sonuçları API ✅ YAPILDI
**Durum:** `/api/v1/tests/{id}/results` endpoint çalışıyor
**Dosya:** `backend/app/api/v1/tests/routes.py`

### 4. Frontend Test Sonuçları ✅ YAPILDI
**Durum:** Results page doğru veriyi gösteriyor
**Dosya:** `frontend/src/app/results/[id]/page.tsx`

---

## 🟡 KISA VADELİ GÖREVLER (Bu Ay)

### 5. Real-time Ses Kaydı (Web) ❌ EKSİK
**Öncelik:** YÜKSEK
**Açıklama:** Browser'da mikrofon erişimi ve ses kaydı
**Dosyalar:**
- `frontend/src/app/test/recording/page.tsx` (güncelle)
- `frontend/src/hooks/useAudioRecorder.ts` (yeni)

**Gereksinimler:**
- MediaRecorder API kullan
- Waveform görselleştirme
- Zamanlayıcı (countdown)
- Kayıt kontrolü (start/stop/pause)

**Örnek Kod:**
```typescript
const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    
    const chunks: BlobPart[] = [];
    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'audio/webm' });
      setAudioBlob(blob);
    };
    
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return { isRecording, audioBlob, startRecording, stopRecording };
};
```

### 6. 5 Adımlı Test Wizard ❌ EKSİK
**Öncelik:** YÜKSEK
**Açıklama:** Kullanıcıyı 5 farklı ses testi boyunca yönlendir

**Adımlar:**
1. **"Aaaa" Sesi** - Sürekli "a" sesi (5 saniye)
2. **"Pataka" Tekrarı** - Hızlı tekrar (10 saniye)
3. **Serbest Konuşma** - Bir konu hakkında konuş (30 saniye)
4. **"Puh" Sesi** - Nefes kontrolü (5 saniye)
5. **Sayı Sayma** - 1'den 10'a kadar (10 saniye)

**Dosyalar:**
- `frontend/src/app/test/wizard/page.tsx` (yeni)
- `frontend/src/components/test/TestWizard.tsx` (yeni)
- `frontend/src/components/test/TestStep.tsx` (yeni)
- `backend/app/api/v1/tests/multi_step.py` (yeni)

**UI Akışı:**
```
[Başla] → [Adım 1: Aaaa] → [Adım 2: Pataka] → [Adım 3: Konuşma] 
→ [Adım 4: Puh] → [Adım 5: Sayılar] → [İşleniyor] → [Sonuçlar]
```

### 7. PDF Rapor Oluşturma ❌ EKSİK
**Öncelik:** ORTA
**Açıklama:** Test sonuçlarını PDF olarak indir

**Kütüphane:** `reportlab` (Python) veya `jsPDF` (JavaScript)

**Backend Yaklaşımı:**
```python
# backend/app/services/pdf_service.py
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from reportlab.lib.units import cm

def generate_test_report_pdf(test_id: int, user_data: dict, results: dict) -> bytes:
    """Generate PDF report for test results"""
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=A4)
    
    # Header
    c.setFont("Helvetica-Bold", 20)
    c.drawString(2*cm, 28*cm, "NeuralCipher.ai - Test Raporu")
    
    # Patient Info
    c.setFont("Helvetica", 12)
    c.drawString(2*cm, 26*cm, f"Hasta: {user_data['name']}")
    c.drawString(2*cm, 25.5*cm, f"Tarih: {results['date']}")
    
    # Risk Score
    c.setFont("Helvetica-Bold", 16)
    c.drawString(2*cm, 23*cm, f"Risk Skoru: {results['risk_score']:.1f}%")
    c.drawString(2*cm, 22*cm, f"Risk Seviyesi: {results['risk_level'].upper()}")
    
    # Biomarkers
    c.setFont("Helvetica", 12)
    y = 20
    for key, value in results['biomarkers'].items():
        c.drawString(2*cm, y*cm, f"{key}: {value:.2f}")
        y -= 0.5
    
    c.save()
    return buffer.getvalue()
```

**Endpoint:**
```python
@router.get("/tests/{test_id}/pdf")
async def download_test_pdf(test_id: int, current_user: User = Depends(get_current_user)):
    """Download test results as PDF"""
    pdf_bytes = generate_test_report_pdf(test_id, current_user, results)
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=test_{test_id}.pdf"}
    )
```

### 8. Email Bildirimleri ❌ EKSİK
**Öncelik:** ORTA
**Açıklama:** Test tamamlandığında email gönder

**Durum:** Backend hazır (`backend/app/core/email.py`), entegrasyon eksik

**Yapılacaklar:**
1. Test tamamlandığında email gönder
2. Yüksek risk durumunda uyarı emaili
3. Doktor atandığında bildirim
4. Haftalık özet raporu

**Entegrasyon:**
```python
# backend/app/api/v1/tests/routes.py içinde
from app.core.email import send_test_result_email

@router.post("/tests/{test_id}/complete")
async def complete_test(test_id: int, db: Session = Depends(get_db)):
    test = db.query(Test).filter(Test.id == test_id).first()
    user = db.query(User).filter(User.id == test.user_id).first()
    
    # Send email notification
    await send_test_result_email(
        to_email=user.email,
        user_name=user.full_name,
        test_id=test_id,
        risk_score=test.risk_score,
        risk_level=test.risk_level
    )
    
    return {"message": "Test completed and email sent"}
```

### 9. Waveform Görselleştirme ❌ EKSİK
**Öncelik:** DÜŞÜK
**Açıklama:** Ses kaydı sırasında dalga formu göster

**Kütüphane:** `wavesurfer.js`

```typescript
// frontend/src/components/test/Waveform.tsx
import WaveSurfer from 'wavesurfer.js';

export const Waveform = ({ audioUrl }: { audioUrl: string }) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (waveformRef.current) {
      const wavesurfer = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        height: 100
      });
      
      wavesurfer.load(audioUrl);
      
      return () => wavesurfer.destroy();
    }
  }, [audioUrl]);
  
  return <div ref={waveformRef} />;
};
```

---

## 🟢 ORTA VADELİ GÖREVLER (3 Ay)

### 10. Doktor-Hasta Mesajlaşma (Mobil) ⚠️ KISMEN
**Durum:** Backend hazır, mobil entegrasyon eksik
**Dosyalar:**
- Backend: `backend/app/api/v1/messages/routes.py` ✅
- Mobil: `neuralcipher_mobile/lib/features/messaging/` ✅
- **Eksik:** Push notification entegrasyonu

### 11. 2FA (Two-Factor Authentication) ❌ EKSİK
**Öncelik:** YÜKSEK (Güvenlik)
**Kütüphane:** `pyotp` (Python)

```python
# backend/app/core/security/twofa.py
import pyotp
import qrcode
from io import BytesIO

def generate_2fa_secret(user_id: int) -> str:
    """Generate 2FA secret for user"""
    return pyotp.random_base32()

def generate_qr_code(secret: str, user_email: str) -> bytes:
    """Generate QR code for 2FA setup"""
    uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=user_email,
        issuer_name="NeuralCipher.ai"
    )
    
    qr = qrcode.QRCode(version=1, box_size=10, border=5)
    qr.add_data(uri)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    return buffer.getvalue()

def verify_2fa_token(secret: str, token: str) -> bool:
    """Verify 2FA token"""
    totp = pyotp.TOTP(secret)
    return totp.verify(token, valid_window=1)
```

### 12. Rate Limiting ❌ EKSİK
**Öncelik:** YÜKSEK (Güvenlik)
**Kütüphane:** `slowapi`

```python
# backend/app/core/rate_limit.py
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# Usage in routes:
@router.post("/auth/login")
@limiter.limit("5/minute")  # Max 5 login attempts per minute
async def login(request: Request, ...):
    ...
```

### 13. CSRF Protection ❌ EKSİK
**Öncelik:** ORTA (Güvenlik)

```python
# backend/app/core/security/csrf.py
from fastapi import Request, HTTPException
import secrets

def generate_csrf_token() -> str:
    return secrets.token_urlsafe(32)

def verify_csrf_token(request: Request, token: str) -> bool:
    session_token = request.session.get("csrf_token")
    return session_token == token
```

### 14. Security Headers ❌ EKSİK
**Öncelik:** ORTA (Güvenlik)

```python
# backend/app/main.py
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

app.add_middleware(TrustedHostMiddleware, allowed_hosts=["neuralcipher.ai", "*.neuralcipher.ai"])
app.add_middleware(HTTPSRedirectMiddleware)

@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response
```

### 15. Push Notifications ❌ EKSİK
**Öncelik:** ORTA
**Servis:** Firebase Cloud Messaging (FCM)

### 16. Offline Mode (Mobil) ❌ EKSİK
**Öncelik:** DÜŞÜK
**Açıklama:** Test sonuçlarını offline görüntüle

---

## 🔵 UZUN VADELİ GÖREVLER (6 Ay)

### 17. Production Deployment ❌ EKSİK
**Öncelik:** YÜKSEK
**Platform:** AWS / DigitalOcean / Vercel

**Yapılacaklar:**
- [ ] Domain satın al (neuralcipher.ai)
- [ ] SSL sertifikası
- [ ] Frontend: Vercel'e deploy
- [ ] Backend: AWS EC2 / DigitalOcean
- [ ] Database: PostgreSQL (AWS RDS)
- [ ] Storage: AWS S3
- [ ] CDN: CloudFront
- [ ] Monitoring: Prometheus + Grafana

### 18. Biyobelirteç Sayısını Artır (9 → 59) ❌ EKSİK
**Öncelik:** ORTA
**Açıklama:** Daha fazla ses özelliği çıkar

**Hedef Kategoriler:**
1. **Frekans Özellikleri (15):** F0, Jitter, Shimmer varyasyonları
2. **Enerji Özellikleri (10):** HNR, NHR, SNR varyasyonları
3. **Spektral Özellikler (12):** MFCC, Spectral Centroid, Rolloff
4. **Temporal Özellikler (8):** Konuşma hızı, duraklamalar
5. **Nonlinear Özellikler (8):** DFA, RPDE, PPE varyasyonları
6. **Vokal Özellikler (6):** Formant frekansları

**Dosya:** `ai-pipeline/src/feature_extractor.py` (güncelle)

### 19. Klinik Validasyon ❌ EKSİK
**Öncelik:** YÜKSEK
**Açıklama:** Gerçek hastalarla test et

### 20. FDA Onayı Başvurusu ❌ EKSİK
**Öncelik:** YÜKSEK
**Açıklama:** Tıbbi cihaz onayı

### 21. Çoklu Dil Desteği ❌ EKSİK
**Öncelik:** DÜŞÜK
**Diller:** Türkçe, İngilizce, Almanca, Fransızca

### 22. Dark Mode ❌ EKSİK
**Öncelik:** DÜŞÜK

### 23. Accessibility Features ❌ EKSİK
**Öncelik:** DÜŞÜK
**Özellikler:** Screen reader, keyboard navigation, high contrast

---

## 📊 ÖNCELİK MATRİSİ

| Görev | Öncelik | Süre | Etki | Zorluk |
|-------|---------|------|------|--------|
| Real-time Ses Kaydı | 🔴 Yüksek | 1 hafta | Yüksek | Orta |
| 5 Adımlı Test Wizard | 🔴 Yüksek | 2 hafta | Yüksek | Orta |
| PDF Export | 🟡 Orta | 3 gün | Orta | Düşük |
| Email Bildirimleri | 🟡 Orta | 2 gün | Orta | Düşük |
| 2FA | 🔴 Yüksek | 1 hafta | Yüksek | Orta |
| Rate Limiting | 🔴 Yüksek | 2 gün | Yüksek | Düşük |
| CSRF Protection | 🟡 Orta | 2 gün | Orta | Düşük |
| Security Headers | 🟡 Orta | 1 gün | Orta | Düşük |
| Push Notifications | 🟡 Orta | 1 hafta | Orta | Orta |
| Waveform Görselleştirme | 🟢 Düşük | 3 gün | Düşük | Düşük |
| Production Deployment | 🔴 Yüksek | 2 hafta | Yüksek | Yüksek |
| 59 Biyobelirteç | 🟡 Orta | 3 hafta | Yüksek | Yüksek |

---

## 🎯 ÖNERİLEN ÇALIŞMA PLANI

### **Hafta 1-2: Temel Özellikler**
1. Real-time ses kaydı (web)
2. 5 adımlı test wizard
3. PDF export
4. Email bildirimleri

### **Hafta 3-4: Güvenlik**
5. 2FA implementasyonu
6. Rate limiting
7. CSRF protection
8. Security headers
9. Audit logging

### **Hafta 5-6: Deployment**
10. Production environment setup
11. Database migration (SQLite → PostgreSQL)
12. Frontend deployment (Vercel)
13. Backend deployment (AWS/DO)
14. Domain & SSL setup

### **Hafta 7-8: İyileştirmeler**
15. Push notifications
16. Waveform görselleştirme
17. Performance optimization
18. Load testing

### **Ay 2-3: Gelişmiş Özellikler**
19. 59 biyobelirteç implementasyonu
20. Model retraining
21. Offline mode (mobil)
22. Dark mode
23. Çoklu dil desteği

### **Ay 4-6: Klinik Validasyon**
24. Gerçek hasta testleri
25. Klinik çalışma
26. FDA başvurusu
27. App store yayını

---

## ✅ TAMAMLANMIŞ GÖREVLER

- ✅ ML Model v6.0 (94.8% accuracy)
- ✅ Backend API (25+ endpoints)
- ✅ Web Frontend (20+ pages)
- ✅ Mobile App (15+ screens)
- ✅ Authentication (JWT)
- ✅ Admin Panel
- ✅ Doctor Panel
- ✅ Test Upload
- ✅ Test Results Display
- ✅ Test History
- ✅ Profile Management
- ✅ FFmpeg Integration
- ✅ Confidence Level Fix (94.8%)

---

## 📈 BAŞARI KRİTERLERİ

**Kısa Vade (1 Ay):**
- [ ] Real-time ses kaydı çalışıyor
- [ ] 5 adımlı test wizard tamamlandı
- [ ] PDF export çalışıyor
- [ ] Email bildirimleri aktif
- [ ] Temel güvenlik özellikleri eklendi

**Orta Vade (3 Ay):**
- [ ] Production'da yayında
- [ ] 2FA aktif
- [ ] Push notifications çalışıyor
- [ ] Performance optimize edildi
- [ ] Load testing tamamlandı

**Uzun Vade (6 Ay):**
- [ ] 59 biyobelirteç aktif
- [ ] Klinik validasyon başladı
- [ ] FDA başvurusu yapıldı
- [ ] App store'da yayında
- [ ] 1000+ aktif kullanıcı

---

## 💡 ÖNERİLER

1. **Önce Güvenlik:** 2FA, rate limiting, CSRF gibi güvenlik özelliklerini önceliklendir
2. **Sonra Kullanıcı Deneyimi:** Real-time kayıt, 5 adımlı test gibi UX iyileştirmeleri
3. **Deployment Hazırlığı:** Production'a geçmeden önce tüm güvenlik testlerini yap
4. **Klinik Validasyon:** Gerçek hastalarla test etmeye başla
5. **Dokümantasyon:** Her özellik için kullanıcı ve geliştirici dokümantasyonu yaz

---

**Rapor Tarihi:** 21 Ocak 2026, 16:00  
**Rapor Türü:** AKSYON PLANI  
**Durum:** AKTIF - Uygulanmaya Hazır
