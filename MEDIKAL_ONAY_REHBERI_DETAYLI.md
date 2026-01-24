# 🏥 NeuralCipher.ai - Detaylı Medikal Onay Rehberi

**Tarih:** 23 Ocak 2026  
**Versiyon:** 1.0  
**Kapsam:** Global Medikal Cihaz Onayları ve Başvuru Süreçleri

---

## 📋 İÇİNDEKİLER

1. [Genel Bakış](#genel-bakış)
2. [FDA Onayı (ABD)](#fda-onayı-abd)
3. [CE Mark (Avrupa)](#ce-mark-avrupa)
4. [TGA Onayı (Avustralya)](#tga-onayı-avustralya)
5. [PMDA Onayı (Japonya)](#pmda-onayı-japonya)
6. [NMPA Onayı (Çin)](#nmpa-onayı-çin)
7. [Health Canada (Kanada)](#health-canada-kanada)
8. [ANVISA (Brezilya)](#anvisa-brezilya)
9. [COFEPRIS (Meksika)](#cofepris-meksika)
10. [Türkiye Sağlık Bakanlığı](#türkiye-sağlık-bakanlığı)
11. [Maliyet Özeti](#maliyet-özeti)
12. [Zaman Çizelgesi](#zaman-çizelgesi)
13. [Başarı Stratejisi](#başarı-stratejisi)

---

## 🌍 GENEL BAKIŞ

### NeuralCipher.ai Sınıflandırması

**Cihaz Tipi:** Yazılım Tabanlı Medikal Cihaz (SaMD - Software as a Medical Device)  
**Kullanım Amacı:** Parkinson hastalığı erken teşhis desteği  
**Risk Sınıfı:** 
- FDA: Class II (Moderate Risk)
- EU: Class IIa veya IIb
- Diğer: Benzer orta risk kategorisi

**Neden Class II?**
- Tanı koymuyor, sadece risk değerlendirmesi yapıyor
- Doktor kararını destekliyor (decision support)
- İnvaziv değil (non-invasive)
- Düşük hasta riski

---


## 🇺🇸 FDA ONAYI (ABD)

### Genel Bilgiler

**Düzenleyici Kurum:** U.S. Food and Drug Administration (FDA)  
**İlgili Departman:** Center for Devices and Radiological Health (CDRH)  
**Başvuru Tipi:** 510(k) Premarket Notification  
**Web:** https://www.fda.gov/medical-devices

### Onay Süreci

#### Adım 1: Pre-Submission (Q-Submission)
**Süre:** 2-3 ay  
**Maliyet:** $0 (ücretsiz)

**Yapılacaklar:**
1. FDA ile ön görüşme talep et
2. Cihaz sınıflandırmasını doğrula
3. Klinik çalışma gereksinimlerini netleştir
4. Test protokollerini gözden geçir

**Gerekli Belgeler:**
- Cihaz tanımı ve kullanım amacı
- Risk analizi (preliminary)
- Benzer cihazlar (predicate devices) listesi
- Önerilen test planı

**İletişim:**
```
CDRH Pre-Submission Program
Email: DICE@fda.hhs.gov
Phone: 301-796-5640
Portal: eSTAR (Electronic Submission Template and Resource)
```

#### Adım 2: Predicate Device Belirleme
**Süre:** 1-2 ay  
**Maliyet:** $0

**Yapılacaklar:**
1. FDA 510(k) veritabanında benzer cihazları ara
2. En az 1-2 predicate device belirle
3. Substantial equivalence (önemli eşdeğerlik) belgele

**Arama Kaynakları:**
- FDA 510(k) Database: https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfpmn/pmn.cfm
- Arama terimleri: "Parkinson", "voice analysis", "neurological assessment"

**Örnek Predicate Devices:**
- Benzer ses analizi cihazları
- Parkinson değerlendirme yazılımları
- Nörolojik assessment tools

#### Adım 3: Klinik Çalışma (Gerekirse)
**Süre:** 6-12 ay  
**Maliyet:** $200,000 - $500,000

**Gereksinim:**
- Class II cihazlar için genellikle klinik çalışma GEREKMİYOR
- Ancak FDA isteyebilir (Pre-Sub'da netleşir)

**Eğer Gerekirse:**
1. IRB (Institutional Review Board) onayı al
2. Klinik protokol hazırla
3. En az 100-200 hasta ile çalışma yap
4. Sensitivity, specificity, accuracy belgele

**Klinik Çalışma Alternatifleri:**
- Literatür verisi kullanımı
- Bench testing (laboratuvar testleri)
- Simülasyon çalışmaları

#### Adım 4: 510(k) Başvurusu Hazırlama
**Süre:** 3-4 ay  
**Maliyet:** $50,000 - $100,000 (danışman + hazırlık)

**Gerekli Belgeler:**

**1. Administrative Information**
- Cover letter
- 510(k) summary veya statement
- Truthful and accuracy statement
- Class III certification (if applicable)
- Financial disclosure

**2. Device Description**
- Detailed device description
- Intended use statement
- Indications for use
- Device specifications
- Software documentation (Level of Concern: Moderate)

**3. Substantial Equivalence Discussion**
- Predicate device comparison
- Similarities and differences
- Performance comparison

**4. Performance Testing**
- Software verification and validation
- Cybersecurity documentation
- Usability testing
- Performance testing (accuracy, sensitivity, specificity)

**5. Labeling**
- User manual
- Quick start guide
- Warnings and precautions
- Contraindications

**6. Risk Analysis**
- ISO 14971 risk management file
- Hazard analysis
- Risk mitigation strategies

**7. Software Documentation**
- Software design specification
- Software requirements specification
- Software testing documentation
- Cybersecurity plan

#### Adım 5: 510(k) Başvurusu
**Süre:** 90 gün (FDA review)  
**Maliyet:** $12,745 (small business) veya $23,060 (standard)

**Başvuru Yöntemi:**
- eSTAR portal üzerinden elektronik başvuru
- Tüm belgeleri PDF formatında yükle

**FDA Review Süreci:**
1. **Day 1-15:** Administrative review (eksik belge kontrolü)
2. **Day 15-60:** Substantive review (teknik inceleme)
3. **Day 60-75:** Additional information request (varsa)
4. **Day 75-90:** Final decision

**Olası Sonuçlar:**
- ✅ **Clearance:** Onaylandı (hedef)
- ⚠️ **Additional Information:** Ek bilgi istendi
- ❌ **Not Substantially Equivalent (NSE):** Reddedildi (nadir)

#### Adım 6: Post-Market Gereksinimler
**Süre:** Sürekli  
**Maliyet:** $20,000 - $50,000/yıl

**Yükümlülükler:**
1. **Annual Registration:** Yıllık kayıt ($6,875/yıl)
2. **Device Listing:** Cihaz listesi güncelleme
3. **Adverse Event Reporting:** Yan etki raporlama (MDR)
4. **Complaint Handling:** Şikayet yönetimi
5. **Corrective Actions:** Düzeltici faaliyetler

### FDA Onay Maliyeti Özeti

| Kalem | Maliyet |
|-------|---------|
| Pre-Submission | $0 |
| Danışmanlık | $50,000 - $100,000 |
| Klinik Çalışma (opsiyonel) | $200,000 - $500,000 |
| Test ve Validasyon | $30,000 - $50,000 |
| 510(k) Başvuru Ücreti | $12,745 - $23,060 |
| **TOPLAM (klinik çalışma olmadan)** | **$92,745 - $173,060** |
| **TOPLAM (klinik çalışma ile)** | **$292,745 - $673,060** |

### FDA Onay Süresi

**En İyi Senaryo:** 12-15 ay  
**Ortalama:** 18-24 ay  
**Klinik Çalışma ile:** 24-36 ay

### Başarı İpuçları

1. **Pre-Sub'a katıl:** FDA ile erken iletişim kritik
2. **İyi predicate seç:** Güçlü substantial equivalence argümanı
3. **Software documentation:** Çok detaylı olmalı (FDA'nın en çok incelediği alan)
4. **Cybersecurity:** Güvenlik dokümantasyonu eksiksiz olmalı
5. **Usability testing:** Kullanıcı testleri yapılmalı
6. **Regulatory consultant:** Deneyimli danışman kullan

### İletişim Bilgileri

**FDA CDRH**
- Address: 10903 New Hampshire Avenue, Silver Spring, MD 20993
- Phone: 1-800-638-2041
- Email: DICE@fda.hhs.gov
- Web: https://www.fda.gov/medical-devices

**Division of Neurological and Physical Medicine Devices**
- Phone: 301-796-6260
- Email: CDRH-Neuro-Devices@fda.hhs.gov

---


## 🇪🇺 CE MARK (AVRUPA)

### Genel Bilgiler

**Düzenleyici Çerçeve:** Medical Device Regulation (MDR) 2017/745  
**Geçerli Ülkeler:** 27 AB ülkesi + İzlanda, Norveç, Lihtenştayn  
**Başvuru Tipi:** Notified Body Assessment  
**Web:** https://ec.europa.eu/health/medical-devices-sector_en

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class IIa veya IIb

**Class IIa (Daha Olası):**
- Tanı desteği sağlıyor (diagnostic aid)
- Kritik kararlar için kullanılmıyor
- Doktor gözetiminde kullanılıyor

**Class IIb (Eğer):**
- Kritik tanı kararları etkiliyor
- Tedavi planlamasını doğrudan etkiliyor

### Onay Süreci

#### Adım 1: Sınıflandırma Belirleme
**Süre:** 1 ay  
**Maliyet:** $5,000 - $10,000 (danışman)

**Yapılacaklar:**
1. MDR Annex VIII kurallarını uygula
2. Rule 11 (software) kontrol et
3. Intended use'a göre sınıflandır

**Rule 11 (Software):**
- Tanı veya tedavi kararlarını etkiliyor mu?
- Hasta sağlığına ciddi zarar verebilir mi?
- Kritik fizyolojik parametreleri izliyor mu?

#### Adım 2: Notified Body Seçimi
**Süre:** 1-2 ay  
**Maliyet:** $0 (seçim ücretsiz)

**Önerilen Notified Bodies:**
1. **TÜV SÜD** (Almanya) - EN ISO 13485 sertifikalı
2. **BSI** (İngiltere/Hollanda) - Yazılım konusunda güçlü
3. **DEKRA** (Almanya) - Hızlı süreç
4. **SGS** (İsviçre) - Global deneyim

**Seçim Kriterleri:**
- MDR yetkisi var mı?
- Software/SaMD deneyimi var mı?
- İngilizce çalışıyor mu?
- Fiyatlandırma uygun mu?

**Notified Body Listesi:**
https://ec.europa.eu/growth/tools-databases/nando/

#### Adım 3: Quality Management System (QMS)
**Süre:** 3-6 ay  
**Maliyet:** $30,000 - $80,000

**Gereksinim:** ISO 13485:2016 sertifikası

**Yapılacaklar:**
1. QMS dokümantasyonu oluştur
2. Prosedürler yaz (SOP'lar)
3. İç audit yap
4. Management review yap
5. ISO 13485 sertifikası al

**Gerekli Prosedürler:**
- Document control
- Design control
- Risk management
- Supplier management
- Production control
- Post-market surveillance
- Complaint handling
- Corrective/preventive actions (CAPA)

**ISO 13485 Sertifikasyon:**
- Sertifikasyon kuruluşu seç (TÜV, BSI, SGS)
- Stage 1 audit (dokümantasyon)
- Stage 2 audit (uygulama)
- Sertifika al (3 yıl geçerli)

#### Adım 4: Technical Documentation
**Süre:** 4-6 ay  
**Maliyet:** $50,000 - $100,000

**Gerekli Belgeler (MDR Annex II & III):**

**1. Device Description and Specifications**
- General description
- Intended purpose
- Risk class and classification rules
- Novel features
- Device variants

**2. Information Supplied by Manufacturer**
- Labels and instructions for use
- User manual
- Technical specifications

**3. Design and Manufacturing**
- Design process documentation
- Manufacturing process
- Software lifecycle documentation
- Verification and validation

**4. General Safety and Performance Requirements**
- GSPR checklist (MDR Annex I)
- Compliance demonstration
- Risk-benefit analysis

**5. Benefit-Risk Analysis and Risk Management**
- ISO 14971 risk management file
- Risk analysis report
- Risk mitigation measures
- Residual risk evaluation

**6. Product Verification and Validation**
- Software verification (IEC 62304)
- Software validation
- Usability validation (IEC 62366)
- Clinical evaluation (MDR Article 61)

**7. Clinical Evaluation**
- Clinical evaluation plan
- Clinical evaluation report (CER)
- Literature review
- Clinical data analysis
- Post-market clinical follow-up (PMCF) plan

**8. Post-Market Surveillance (PMS)**
- PMS plan
- Periodic safety update report (PSUR) plan
- Vigilance system

#### Adım 5: Clinical Evaluation Report (CER)
**Süre:** 3-4 ay  
**Maliyet:** $30,000 - $60,000

**Gereksinim:** MDR Article 61

**CER İçeriği:**
1. **Clinical Background:** Parkinson hastalığı, mevcut tanı yöntemleri
2. **Device Description:** NeuralCipher.ai detaylı açıklama
3. **Clinical Data:** 
   - Literatür taraması (systematic review)
   - Kendi klinik verileriniz
   - Equivalent device verileri
4. **Clinical Performance:** Sensitivity, specificity, accuracy
5. **Clinical Safety:** Yan etkiler, riskler
6. **Benefit-Risk Analysis:** Fayda-risk değerlendirmesi
7. **Conclusions:** Sonuçlar ve öneriler

**Klinik Çalışma Gereksinimi:**
- Class IIa için genellikle literatür yeterli
- Class IIb için klinik çalışma gerekebilir
- Equivalent device varsa klinik çalışma gerekmeyebilir

#### Adım 6: Notified Body Assessment
**Süre:** 6-9 ay  
**Maliyet:** €15,000 - €30,000

**Başvuru Süreci:**
1. Technical documentation gönder
2. QMS audit planla
3. Notified Body sorularını yanıtla
4. Ek belgeler sağla (gerekirse)
5. Final assessment

**Notified Body Değerlendirmesi:**
- Document review (2-3 ay)
- QMS audit (1-2 gün on-site)
- Additional information requests (1-2 ay)
- Final decision (1 ay)

**Olası Sonuçlar:**
- ✅ **Certificate Issued:** Sertifika verildi
- ⚠️ **Major Non-Conformities:** Büyük uygunsuzluklar (düzeltilmeli)
- ⚠️ **Minor Non-Conformities:** Küçük uygunsuzluklar (düzeltilebilir)

#### Adım 7: CE Mark Affixing
**Süre:** 1 hafta  
**Maliyet:** $0

**Yapılacaklar:**
1. CE mark'ı ürüne ve ambalaja ekle
2. Notified Body numarasını ekle (örn: CE 0123)
3. Declaration of Conformity (DoC) hazırla
4. EUDAMED'e kayıt yap

**CE Mark Formatı:**
```
CE 0123
(0123 = Notified Body numarası)
```

#### Adım 8: EUDAMED Registration
**Süre:** 1-2 ay  
**Maliyet:** €0 (ücretsiz)

**EUDAMED:** European Database on Medical Devices

**Kayıt Bilgileri:**
- Manufacturer information
- Device information
- Certificates
- Clinical investigations
- Vigilance and post-market surveillance

**Web:** https://ec.europa.eu/tools/eudamed/

#### Adım 9: Post-Market Surveillance
**Süre:** Sürekli  
**Maliyet:** $30,000 - $60,000/yıl

**Yükümlülükler:**
1. **PMS System:** Post-market surveillance sistemi
2. **Vigilance:** Ciddi olayları raporla (FSCA)
3. **PSUR:** Periodic Safety Update Report (yıllık)
4. **PMCF:** Post-Market Clinical Follow-up
5. **Trend Reporting:** Trend analizi

### CE Mark Maliyeti Özeti

| Kalem | Maliyet |
|-------|---------|
| Sınıflandırma Danışmanlığı | €5,000 - €10,000 |
| ISO 13485 Sertifikasyonu | €30,000 - €80,000 |
| Technical Documentation | €50,000 - €100,000 |
| Clinical Evaluation Report | €30,000 - €60,000 |
| Notified Body Assessment | €15,000 - €30,000 |
| Regulatory Consultant | €40,000 - €80,000 |
| **TOPLAM** | **€170,000 - €360,000** |
| **TOPLAM (USD)** | **$185,000 - $390,000** |

### CE Mark Süresi

**En İyi Senaryo:** 12-18 ay  
**Ortalama:** 18-24 ay  
**Klinik Çalışma ile:** 24-36 ay

### Başarı İpuçları

1. **ISO 13485 önce:** QMS olmadan başvuru yapılamaz
2. **İyi CER:** Clinical Evaluation Report çok önemli
3. **Notified Body seçimi:** Deneyimli ve hızlı olanı seç
4. **Regulatory consultant:** AB uzmanı danışman kullan
5. **GSPR checklist:** Tüm gereksinimleri belgele
6. **Software documentation:** IEC 62304 standardına uygun

### İletişim Bilgileri

**European Commission - Health**
- Web: https://ec.europa.eu/health/medical-devices-sector_en
- Email: SANTE-MEDICAL-DEVICES@ec.europa.eu

**Önerilen Notified Bodies:**

**TÜV SÜD (Almanya)**
- Web: https://www.tuvsud.com/medical-devices
- Email: medical.devices@tuvsud.com
- Phone: +49 89 5791-0

**BSI (Hollanda)**
- Web: https://www.bsigroup.com/medical-devices
- Email: medical.devices@bsigroup.com
- Phone: +31 20 346 0780

**DEKRA (Almanya)**
- Web: https://www.dekra.com/medical-devices
- Email: medical-devices@dekra.com
- Phone: +49 711 7829-0

---


## 🇦🇺 TGA ONAYI (AVUSTRALYA)

### Genel Bilgiler

**Düzenleyici Kurum:** Therapeutic Goods Administration (TGA)  
**Başvuru Tipi:** Inclusion in ARTG (Australian Register of Therapeutic Goods)  
**Web:** https://www.tga.gov.au/

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class IIa veya IIb (EU sınıflandırmasına benzer)

**TGA Sınıflandırma Kuralları:**
- Rule 3.3: Software for diagnosis/monitoring
- Orta risk kategorisi

### Onay Süreci

#### Adım 1: Manufacturer Registration
**Süre:** 2-4 hafta  
**Maliyet:** AUD $1,000

**Yapılacaklar:**
1. TGA Business Services (TBS) hesabı aç
2. Manufacturer olarak kayıt ol
3. Australian Sponsor belirle (eğer Avustralya dışındaysanız)

**Australian Sponsor:**
- Avustralya'da yerleşik bir şirket olmalı
- TGA ile iletişimden sorumlu
- Post-market surveillance'dan sorumlu

#### Adım 2: Conformity Assessment
**Süre:** 6-12 ay  
**Maliyet:** AUD $50,000 - $100,000

**TGA Conformity Assessment Yolları:**

**Yol 1: CE Mark Kullanımı (En Kolay)**
- Eğer CE mark'ınız varsa, TGA bunu kabul eder
- Ek klinik çalışma gerekmez
- Sadece CE belgelerini TGA'ya gönder

**Yol 2: TGA Conformity Assessment**
- CE mark yoksa, TGA kendi değerlendirmesini yapar
- ISO 13485 QMS gerekli
- Clinical evidence gerekli
- Technical documentation gerekli

**Önerilen:** Önce CE mark al, sonra TGA'ya başvur (çok daha hızlı ve ucuz)

#### Adım 3: ARTG Application
**Süre:** 2-3 ay  
**Maliyet:** AUD $5,000 - $10,000

**Gerekli Belgeler:**
1. **Application Form:** TGA form
2. **Device Description:** Cihaz tanımı
3. **Intended Purpose:** Kullanım amacı
4. **Classification:** Sınıflandırma belgesi
5. **Conformity Assessment Certificate:** 
   - CE certificate (varsa) VEYA
   - TGA assessment report
6. **Declaration of Conformity:** Uygunluk beyanı
7. **Labels and IFU:** Etiketler ve kullanım kılavuzu
8. **Clinical Evidence Summary:** Klinik kanıt özeti

**Başvuru Yöntemi:**
- TGA Business Services (TBS) portal
- Elektronik başvuru

#### Adım 4: TGA Review
**Süre:** 60-90 gün  
**Maliyet:** AUD $3,000 - $8,000 (application fee)

**Review Süreci:**
1. **Screening (5 gün):** Eksik belge kontrolü
2. **Evaluation (30-60 gün):** Teknik değerlendirme
3. **Additional Information (varsa):** Ek bilgi talebi
4. **Decision (10 gün):** Final karar

**Application Fees (Class IIa/IIb):**
- Standard: AUD $7,800
- Fast-track: AUD $15,600 (30 gün)

#### Adım 5: ARTG Inclusion
**Süre:** 1 hafta  
**Maliyet:** $0

**ARTG Number:**
- Onaylandıktan sonra ARTG numarası verilir
- Örnek: ARTG 123456
- Bu numara ürün etiketinde olmalı

#### Adım 6: Post-Market Obligations
**Süre:** Sürekli  
**Maliyet:** AUD $10,000 - $20,000/yıl

**Yükümlülükler:**
1. **Annual Charge:** Yıllık ücret (AUD $1,000-$2,000)
2. **Adverse Event Reporting:** Yan etki raporlama
3. **Recall Procedures:** Geri çağırma prosedürleri
4. **Post-Market Surveillance:** Pazar sonrası gözetim
5. **Device Modifications:** Cihaz değişiklikleri bildirimi

### TGA Onay Maliyeti Özeti

| Kalem | Maliyet (AUD) | Maliyet (USD) |
|-------|---------------|---------------|
| Manufacturer Registration | $1,000 | $670 |
| CE Mark (önce alınmalı) | - | $185,000 - $390,000 |
| Australian Sponsor | $5,000 - $10,000/yıl | $3,350 - $6,700/yıl |
| ARTG Application | $5,000 - $10,000 | $3,350 - $6,700 |
| TGA Application Fee | $7,800 | $5,200 |
| Regulatory Consultant | $20,000 - $40,000 | $13,400 - $26,800 |
| **TOPLAM (CE mark ile)** | **$38,800 - $68,800** | **$26,000 - $46,000** |
| **TOPLAM (CE mark olmadan)** | **$88,800 - $168,800** | **$59,500 - $113,000** |

### TGA Onay Süresi

**CE Mark ile:** 3-6 ay  
**CE Mark olmadan:** 12-18 ay

### Başarı İpuçları

1. **CE mark önce:** CE mark varsa TGA çok daha kolay
2. **Australian Sponsor:** Güvenilir sponsor seç
3. **TBS Portal:** Erken hesap aç ve sistemi öğren
4. **Fast-track:** Acilse fast-track başvuru yap
5. **Clinical evidence:** CE mark'taki CER'i kullan

### İletişim Bilgileri

**TGA - Medical Devices**
- Address: PO Box 100, Woden ACT 2606, Australia
- Phone: 1800 020 653 (Australia) / +61 2 6232 8444 (International)
- Email: devices@tga.gov.au
- Web: https://www.tga.gov.au/medical-devices

**TGA Business Services**
- Portal: https://www.tga.gov.au/tbs
- Email: tbs@tga.gov.au

---

## 🇯🇵 PMDA ONAYI (JAPONYA)

### Genel Bilgiler

**Düzenleyici Kurum:** Pharmaceuticals and Medical Devices Agency (PMDA)  
**İlgili Kanun:** Pharmaceutical and Medical Device Act (PMD Act)  
**Başvuru Tipi:** Marketing Authorization Application  
**Web:** https://www.pmda.go.jp/english/

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class II (Controlled Medical Device)

**Japonya Sınıflandırması:**
- Class I: General Medical Device (届出)
- Class II: Controlled Medical Device (認証)
- Class III: Specially Controlled Medical Device (承認)
- Class IV: Highly Controlled Medical Device (承認)

### Onay Süreci

#### Adım 1: Marketing Authorization Holder (MAH)
**Süre:** 2-3 ay  
**Maliyet:** ¥500,000 - ¥1,000,000

**Gereksinim:**
- Japonya'da MAH (Marketing Authorization Holder) olmalısınız
- Yabancı şirketler için Japonya'da subsidiary veya distributor gerekli

**Seçenekler:**
1. **Japonya'da şirket kur:** En iyi ama pahalı
2. **Japon distribütör bul:** Daha kolay
3. **Regulatory consultant:** MAH hizmeti veren danışman

#### Adım 2: QMS Certification (QMS省令)
**Süre:** 6-12 ay  
**Maliyet:** ¥3,000,000 - ¥6,000,000

**Gereksinim:** ISO 13485 + Japonya QMS省令

**Yapılacaklar:**
1. ISO 13485 sertifikası al (global)
2. Japonya QMS省令 uyumluluğu sağla
3. Registered Certification Body (RCB) seçimi
4. QMS audit

**Registered Certification Bodies:**
- JMDN (Japan Medical Device Nomenclature)
- TÜV Rheinland Japan
- BSI Japan

#### Adım 3: Technical Documentation (Japonca)
**Süre:** 4-6 ay  
**Maliyet:** ¥5,000,000 - ¥10,000,000

**Önemli:** Tüm belgeler Japonca olmalı!

**Gerekli Belgeler:**
1. **Device Description (機器の説明)**
2. **Intended Use (使用目的)**
3. **Performance Specifications (性能仕様)**
4. **Safety Information (安全性情報)**
5. **Clinical Data (臨床データ)**
6. **Manufacturing Information (製造情報)**
7. **Quality Control (品質管理)**
8. **Labeling (表示)**

**Çeviri Maliyeti:**
- Teknik dokümantasyon: ¥2,000,000 - ¥4,000,000
- Kullanım kılavuzu: ¥500,000 - ¥1,000,000

#### Adım 4: Clinical Data Requirements
**Süre:** 6-12 ay  
**Maliyet:** ¥10,000,000 - ¥30,000,000

**Gereksinim:**
- Class II için genellikle klinik çalışma GEREKMİYOR
- Ancak PMDA isteyebilir
- Foreign clinical data kabul edilir (CE, FDA)

**Eğer Klinik Çalışma Gerekirse:**
1. PMDA consultation (事前相談)
2. Clinical trial protocol
3. IRB approval (Japonya'da)
4. Japon hastalarla çalışma (önemli!)
5. Clinical trial report

**Alternatif:**
- Foreign clinical data kullanımı
- Bridging study (köprü çalışması)
- Literature review

#### Adım 5: Certification Application (認証申請)
**Süre:** 3-6 ay  
**Maliyet:** ¥2,000,000 - ¥4,000,000

**Başvuru Yöntemi:**
- Registered Certification Body (RCB) üzerinden
- Class II için PMDA'ya değil, RCB'ye başvuru

**RCB Review:**
1. Document review
2. Additional information requests
3. QMS audit (if needed)
4. Certification decision

#### Adım 6: PMDA Notification
**Süre:** 1 ay  
**Maliyet:** ¥100,000

**Yapılacaklar:**
1. RCB sertifikasını PMDA'ya bildir
2. PMDA registration number al
3. Marketing başlayabilir

#### Adım 7: Post-Market Surveillance
**Süre:** Sürekli  
**Maliyet:** ¥2,000,000 - ¥4,000,000/yıl

**Yükümlülükler:**
1. **Adverse Event Reporting (副作用報告)**
2. **Periodic Reports (定期報告)**
3. **Quality Defect Reports (品質不良報告)**
4. **Recall Procedures (回収手順)**

### PMDA Onay Maliyeti Özeti

| Kalem | Maliyet (¥) | Maliyet (USD) |
|-------|-------------|---------------|
| MAH Setup | ¥500,000 - ¥1,000,000 | $3,400 - $6,800 |
| QMS Certification | ¥3,000,000 - ¥6,000,000 | $20,000 - $40,000 |
| Technical Documentation | ¥5,000,000 - ¥10,000,000 | $34,000 - $68,000 |
| Translation | ¥2,500,000 - ¥5,000,000 | $17,000 - $34,000 |
| Clinical Data (opsiyonel) | ¥10,000,000 - ¥30,000,000 | $68,000 - $204,000 |
| Certification Application | ¥2,000,000 - ¥4,000,000 | $13,600 - $27,200 |
| Regulatory Consultant | ¥5,000,000 - ¥10,000,000 | $34,000 - $68,000 |
| **TOPLAM (klinik çalışma olmadan)** | **¥18,000,000 - ¥36,000,000** | **$122,000 - $244,000** |
| **TOPLAM (klinik çalışma ile)** | **¥28,000,000 - ¥66,000,000** | **$190,000 - $448,000** |

### PMDA Onay Süresi

**En İyi Senaryo:** 12-18 ay  
**Ortalama:** 18-24 ay  
**Klinik Çalışma ile:** 24-36 ay

### Başarı İpuçları

1. **Japon partner:** Mutlaka Japon partner/distribütör bul
2. **Japonca belgeler:** Profesyonel çeviri kullan
3. **PMDA consultation:** Erken consultation yap (事前相談)
4. **Foreign data:** CE/FDA verilerini kullan
5. **Cultural adaptation:** Japonya'ya özel adaptasyon yap
6. **Regulatory consultant:** Japonya uzmanı danışman şart

### İletişim Bilgileri

**PMDA - Medical Devices**
- Address: 3-3-2 Kasumigaseki, Chiyoda-ku, Tokyo 100-0013, Japan
- Phone: +81-3-3506-9541
- Email: consultation@pmda.go.jp
- Web: https://www.pmda.go.jp/english/

**PMDA Consultation (事前相談)**
- Email: soudan@pmda.go.jp
- Phone: +81-3-3506-9556

---


## 🇨🇳 NMPA ONAYI (ÇİN)

### Genel Bilgiler

**Düzenleyici Kurum:** National Medical Products Administration (NMPA)  
**Eski Adı:** CFDA (China Food and Drug Administration)  
**Başvuru Tipi:** Medical Device Registration  
**Web:** https://www.nmpa.gov.cn/ (Çince)

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class II

**Çin Sınıflandırması:**
- Class I: Low risk (备案 - Filing)
- Class II: Moderate risk (注册 - Registration)
- Class III: High risk (注册 - Registration)

### Onay Süreci

#### Adım 1: Chinese Agent/Distributor
**Süre:** 2-3 ay  
**Maliyet:** ¥100,000 - ¥300,000

**Gereksinim:**
- Çin'de kayıtlı bir şirket olmalı
- Medical device license'ı olmalı
- NMPA ile iletişimden sorumlu

**Seçenekler:**
1. **Çin'de subsidiary kur:** En iyi ama pahalı
2. **Çinli distribütör bul:** Daha kolay
3. **Regulatory agent:** NMPA agent hizmeti

#### Adım 2: Product Registration Testing
**Süre:** 3-6 ay  
**Maliyet:** ¥200,000 - ¥500,000

**Gereksinim:**
- NMPA onaylı test laboratuvarında test
- Çin standardlarına uygunluk

**Test Gereksinimleri:**
1. **Software Testing:**
   - GB/T 25000.51 (Software quality)
   - YY/T 0664 (Medical device software)
   - Cybersecurity testing

2. **Performance Testing:**
   - Accuracy, sensitivity, specificity
   - Usability testing
   - Compatibility testing

3. **Safety Testing:**
   - Electrical safety (if applicable)
   - EMC testing (if applicable)

**NMPA Onaylı Test Laboratuvarları:**
- CMDE (Center for Medical Device Evaluation)
- Provincial testing centers
- Authorized third-party labs

#### Adım 3: Clinical Evaluation
**Süre:** 6-12 ay  
**Maliyet:** ¥1,000,000 - ¥5,000,000

**Gereksinim:**
- Class II için genellikle klinik çalışma GEREKMİYOR
- Clinical evaluation report yeterli
- Ancak NMPA isteyebilir

**Clinical Evaluation Yolları:**

**Yol 1: Clinical Trial Exemption (临床试验豁免)**
- Equivalent device varsa
- Foreign clinical data kullanımı
- Literature review

**Yol 2: Clinical Trial (临床试验)**
- NMPA onaylı hastanelerde
- En az 100-200 Çinli hasta
- GCP (Good Clinical Practice) uyumlu

#### Adım 4: Technical Documentation (Çince)
**Süre:** 4-6 ay  
**Maliyet:** ¥500,000 - ¥1,000,000

**Gerekli Belgeler (Çince):**
1. **Product Technical Requirements (产品技术要求)**
2. **Research Data (研究资料)**
3. **Production and Quality Control (生产和质量控制)**
4. **Clinical Evaluation Report (临床评价报告)**
5. **Product Risk Analysis (产品风险分析)**
6. **Software Documentation (软件文档)**
7. **Instructions for Use (使用说明书)**
8. **Labeling (标签)**

**Çeviri Maliyeti:**
- Teknik dokümantasyon: ¥300,000 - ¥600,000
- Kullanım kılavuzu: ¥100,000 - ¥200,000

#### Adım 5: NMPA Registration Application
**Süre:** 6-12 ay  
**Maliyet:** ¥50,000 - ¥100,000

**Başvuru Yöntemi:**
- NMPA online portal
- Chinese agent üzerinden

**NMPA Review Süreci:**
1. **Acceptance Review (受理审查):** 5-10 gün
2. **Technical Review (技术审查):** 60-90 gün
3. **Administrative Review (行政审查):** 20 gün
4. **Supplementary Materials (补充资料):** Varsa 60 gün
5. **Approval (批准):** 20 gün

**Application Fee:**
- Class II: ¥50,000

#### Adım 6: Registration Certificate
**Süre:** 1 ay  
**Maliyet:** $0

**Registration Certificate (注册证):**
- 5 yıl geçerli
- Yenileme gerekli
- Certificate number: 国械注准 + numara

#### Adım 7: Post-Market Requirements
**Süre:** Sürekli  
**Maliyet:** ¥300,000 - ¥600,000/yıl

**Yükümlülükler:**
1. **Adverse Event Reporting (不良事件报告)**
2. **Annual Report (年度报告)**
3. **Quality System Inspection (质量体系检查)**
4. **Product Recall (产品召回)**
5. **Registration Renewal (注册续期):** 5 yılda bir

### NMPA Onay Maliyeti Özeti

| Kalem | Maliyet (¥) | Maliyet (USD) |
|-------|-------------|---------------|
| Chinese Agent | ¥100,000 - ¥300,000 | $14,000 - $42,000 |
| Product Testing | ¥200,000 - ¥500,000 | $28,000 - $70,000 |
| Clinical Evaluation | ¥1,000,000 - ¥5,000,000 | $140,000 - $700,000 |
| Technical Documentation | ¥500,000 - ¥1,000,000 | $70,000 - $140,000 |
| Translation | ¥400,000 - ¥800,000 | $56,000 - $112,000 |
| NMPA Application Fee | ¥50,000 | $7,000 |
| Regulatory Consultant | ¥500,000 - ¥1,000,000 | $70,000 - $140,000 |
| **TOPLAM (klinik çalışma olmadan)** | **¥1,750,000 - ¥3,600,000** | **$245,000 - $504,000** |
| **TOPLAM (klinik çalışma ile)** | **¥2,750,000 - ¥8,600,000** | **$385,000 - $1,204,000** |

### NMPA Onay Süresi

**En İyi Senaryo:** 12-18 ay  
**Ortalama:** 18-30 ay  
**Klinik Çalışma ile:** 30-48 ay

### Başarı İpuçları

1. **Çinli partner:** Güçlü Çinli partner şart
2. **Çince belgeler:** Profesyonel çeviri kullan
3. **NMPA consultation:** Erken consultation yap
4. **Clinical trial exemption:** Mümkünse klinik çalışmadan kaçın
5. **Guanxi (关系):** İlişkiler önemli, iyi danışman bul
6. **Patience:** Çin süreci uzun, sabırlı ol

### İletişim Bilgileri

**NMPA - Medical Devices**
- Address: No. 26, Xuanwumen West Street, Xicheng District, Beijing 100053, China
- Phone: +86-10-88330000
- Web: https://www.nmpa.gov.cn/

**CMDE (Center for Medical Device Evaluation)**
- Address: No. 26, Xuanwumen West Street, Xicheng District, Beijing 100053, China
- Phone: +86-10-68584180
- Email: cmde@cmde.org.cn
- Web: http://www.cmde.org.cn/

---

## 🇨🇦 HEALTH CANADA (KANADA)

### Genel Bilgiler

**Düzenleyici Kurum:** Health Canada - Medical Devices Bureau  
**Başvuru Tipi:** Medical Device Licence Application (MDLA)  
**Web:** https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices.html

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class II

**Kanada Sınıflandırması:**
- Class I: Low risk
- Class II: Low-moderate risk
- Class III: Moderate-high risk
- Class IV: High risk

### Onay Süreci

#### Adım 1: Canadian Medical Device Licence (MDL)
**Süre:** 1-2 ay  
**Maliyet:** CAD $5,000 - $10,000

**Gereksinim:**
- Kanada'da Manufacturer Licence gerekli
- Yabancı şirketler için Canadian Representative

**Canadian Representative:**
- Kanada'da yerleşik kişi/şirket
- Health Canada ile iletişimden sorumlu
- Adverse event reporting sorumlusu

#### Adım 2: Quality Management System
**Süre:** 3-6 ay  
**Maliyet:** CAD $30,000 - $60,000

**Gereksinim:** ISO 13485 + CMDCAS

**CMDCAS:** Canadian Medical Devices Conformity Assessment System

**Yapılacaklar:**
1. ISO 13485 sertifikası al
2. CMDCAS audit
3. Medical Device Establishment Licence (MDEL)

#### Adım 3: Medical Device Licence Application
**Süre:** 3-6 ay  
**Maliyet:** CAD $10,000 - $20,000

**Gerekli Belgeler:**
1. **Device Description**
2. **Intended Use**
3. **Risk Classification**
4. **Safety and Effectiveness Evidence:**
   - Clinical data
   - Performance testing
   - Risk analysis
5. **Quality System Certificate:** ISO 13485
6. **Labeling:** English and French
7. **Declaration of Conformity**

**Foreign Approval Recognition:**
- FDA 510(k) clearance kabul edilir
- CE mark kabul edilir
- Ek klinik çalışma gerekmez

#### Adım 4: Health Canada Review
**Süre:** 75 gün (Class II)  
**Maliyet:** CAD $3,000 - $5,000

**Review Süreci:**
1. **Screening (10 gün):** Eksik belge kontrolü
2. **Evaluation (45 gün):** Teknik değerlendirme
3. **Additional Information (varsa):** 30 gün
4. **Decision (20 gün):** Final karar

**Application Fee (Class II):**
- Standard: CAD $4,590
- Small business: CAD $2,295

#### Adım 5: Medical Device Licence Issuance
**Süre:** 1 hafta  
**Maliyet:** $0

**Medical Device Licence (MDL):**
- Licence number verilir
- Geçerlilik süresi yok (sürekli)
- Ancak yıllık bildirim gerekli

#### Adım 6: Post-Market Obligations
**Süre:** Sürekli  
**Maliyet:** CAD $10,000 - $20,000/yıl

**Yükümlülükler:**
1. **Incident Reporting:** 10 gün içinde
2. **Annual Declaration:** Yıllık bildirim
3. **Device Problem Reporting**
4. **Recall Procedures**
5. **Labeling Updates:** İngilizce + Fransızca

### Health Canada Maliyeti Özeti

| Kalem | Maliyet (CAD) | Maliyet (USD) |
|-------|---------------|---------------|
| Canadian Representative | $5,000 - $10,000/yıl | $3,700 - $7,400/yıl |
| ISO 13485 + CMDCAS | $30,000 - $60,000 | $22,000 - $44,000 |
| MDLA Preparation | $10,000 - $20,000 | $7,400 - $14,800 |
| Application Fee | $4,590 | $3,400 |
| Regulatory Consultant | $20,000 - $40,000 | $14,800 - $29,600 |
| **TOPLAM** | **$69,590 - $134,590** | **$51,300 - $99,200** |

### Health Canada Onay Süresi

**FDA/CE mark ile:** 4-6 ay  
**FDA/CE mark olmadan:** 9-12 ay

### Başarı İpuçları

1. **FDA/CE önce:** FDA veya CE mark varsa çok daha kolay
2. **Bilingual labeling:** İngilizce + Fransızca etiketler hazırla
3. **Canadian Representative:** Güvenilir representative seç
4. **CMDCAS:** ISO 13485 yeterli, ek audit kolay
5. **Small business fee:** Eğer uygunsa indirimli ücret kullan

### İletişim Bilgileri

**Health Canada - Medical Devices Bureau**
- Address: 200 Eglantine Driveway, Ottawa, ON K1A 0K9, Canada
- Phone: 1-800-267-9675 (Canada) / 613-957-2991 (International)
- Email: hc.meddevices-instrumentsmed.sc@canada.ca
- Web: https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices.html

---


## 🇧🇷 ANVISA (BREZİLYA)

### Genel Bilgiler

**Düzenleyici Kurum:** Agência Nacional de Vigilância Sanitária (ANVISA)  
**Başvuru Tipi:** Medical Device Registration (Registro de Produto)  
**Web:** https://www.gov.br/anvisa/

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class II (Risco Médio)

**Brezilya Sınıflandırması:**
- Class I: Baixo Risco (Low Risk)
- Class II: Médio Risco (Medium Risk)
- Class III: Alto Risco (High Risk)
- Class IV: Máximo Risco (Maximum Risk)

### Onay Süreci

#### Adım 1: Brazilian Legal Representative
**Süre:** 1-2 ay  
**Maliyet:** R$ 20,000 - R$ 50,000

**Gereksinim:**
- Brezilya'da kayıtlı şirket olmalı
- AFE (Autorização de Funcionamento de Empresa) olmalı
- ANVISA ile iletişimden sorumlu

**AFE (Company Operating Authorization):**
- ANVISA'dan alınır
- Yıllık ücret: R$ 10,000 - R$ 30,000

#### Adım 2: Good Manufacturing Practices (GMP)
**Süre:** 3-6 ay  
**Maliyet:** R$ 50,000 - R$ 100,000

**Gereksinim:** 
- ISO 13485 sertifikası
- ANVISA GMP inspection (opsiyonel)

**GMP Certification:**
- INMETRO onaylı kuruluştan
- ISO 13485 yeterli
- ANVISA inspection gerekebilir

#### Adım 3: Product Registration Dossier
**Süre:** 4-6 ay  
**Maliyet:** R$ 80,000 - R$ 150,000

**Gerekli Belgeler (Portekizce):**
1. **Formulário de Petição (Petition Form)**
2. **Descrição do Produto (Product Description)**
3. **Finalidade de Uso (Intended Use)**
4. **Especificações Técnicas (Technical Specifications)**
5. **Evidência Clínica (Clinical Evidence)**
6. **Análise de Risco (Risk Analysis)**
7. **Rotulagem (Labeling):** Portekizce
8. **Manual do Usuário (User Manual):** Portekizce
9. **Certificado de Boas Práticas (GMP Certificate)**
10. **Registro no País de Origem (Registration in Country of Origin):**
    - FDA 510(k) VEYA
    - CE mark VEYA
    - Health Canada licence

**Çeviri Maliyeti:**
- Teknik dokümantasyon: R$ 30,000 - R$ 60,000
- Kullanım kılavuzu: R$ 10,000 - R$ 20,000

#### Adım 4: ANVISA Registration Application
**Süre:** 6-12 ay  
**Maliyet:** R$ 10,000 - R$ 20,000

**Başvuru Yöntemi:**
- Peticionamento Eletrônico (Electronic Petition)
- Brazilian representative üzerinden

**ANVISA Review Süreci:**
1. **Triagem (Screening):** 30 gün
2. **Análise Técnica (Technical Analysis):** 90-180 gün
3. **Exigência (Additional Information):** Varsa 60 gün
4. **Decisão (Decision):** 30 gün

**Application Fee (Class II):**
- Registration: R$ 9,000
- Annual surveillance: R$ 3,000/yıl

#### Adım 5: Registration Certificate
**Süre:** 1 ay  
**Maliyet:** $0

**Registro de Produto:**
- Registration number verilir
- 5 yıl geçerli (bazı durumlarda 10 yıl)
- Yenileme gerekli

#### Adım 6: Post-Market Surveillance
**Süre:** Sürekli  
**Maliyet:** R$ 30,000 - R$ 60,000/yıl

**Yükümlülükler:**
1. **Notificação de Eventos Adversos (Adverse Event Notification)**
2. **Relatório Anual (Annual Report)**
3. **Tecnovigilância (Technovigilance)**
4. **Recall Procedures**
5. **Labeling Updates:** Portekizce

### ANVISA Maliyeti Özeti

| Kalem | Maliyet (R$) | Maliyet (USD) |
|-------|--------------|---------------|
| Brazilian Representative + AFE | R$ 30,000 - R$ 80,000 | $6,000 - $16,000 |
| GMP Certification | R$ 50,000 - R$ 100,000 | $10,000 - $20,000 |
| Product Registration Dossier | R$ 80,000 - R$ 150,000 | $16,000 - $30,000 |
| Translation | R$ 40,000 - R$ 80,000 | $8,000 - $16,000 |
| ANVISA Application Fee | R$ 9,000 | $1,800 |
| Regulatory Consultant | R$ 60,000 - R$ 120,000 | $12,000 - $24,000 |
| **TOPLAM** | **R$ 269,000 - R$ 539,000** | **$53,800 - $107,800** |

### ANVISA Onay Süresi

**FDA/CE mark ile:** 9-15 ay  
**FDA/CE mark olmadan:** 18-24 ay

### Başarı İpuçları

1. **FDA/CE önce:** FDA veya CE mark şart (ANVISA kabul eder)
2. **Portekizce belgeler:** Profesyonel çeviri kullan
3. **Brazilian partner:** Güçlü Brezilyalı partner bul
4. **AFE erken:** AFE sürecini erken başlat
5. **Patience:** Brezilya süreci uzun olabilir

### İletişim Bilgileri

**ANVISA - Medical Devices**
- Address: SIA Trecho 5, Área Especial 57, Brasília-DF, CEP 71205-050, Brazil
- Phone: +55 61 3462-6000
- Email: anvisa@anvisa.gov.br
- Web: https://www.gov.br/anvisa/

---

## 🇲🇽 COFEPRIS (MEKSİKA)

### Genel Bilgiler

**Düzenleyici Kurum:** Comisión Federal para la Protección contra Riesgos Sanitarios (COFEPRIS)  
**Başvuru Tipi:** Registro Sanitario (Sanitary Registration)  
**Web:** https://www.gob.mx/cofepris

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class II

**Meksika Sınıflandırması:**
- Class I: Bajo Riesgo (Low Risk)
- Class II: Riesgo Moderado (Moderate Risk)
- Class III: Alto Riesgo (High Risk)

### Onay Süreci

#### Adım 1: Mexican Legal Representative
**Süre:** 1-2 ay  
**Maliyet:** MXN $50,000 - $100,000

**Gereksinim:**
- Meksika'da kayıtlı şirket
- Responsable Sanitario (Sanitary Responsible)
- COFEPRIS ile iletişimden sorumlu

#### Adım 2: Product Registration Dossier
**Süre:** 3-4 ay  
**Maliyet:** MXN $100,000 - $200,000

**Gerekli Belgeler (İspanyolca):**
1. **Solicitud de Registro (Registration Application)**
2. **Descripción del Dispositivo (Device Description)**
3. **Uso Previsto (Intended Use)**
4. **Especificaciones Técnicas (Technical Specifications)**
5. **Evidencia Clínica (Clinical Evidence)**
6. **Análisis de Riesgo (Risk Analysis)**
7. **Etiquetado (Labeling):** İspanyolca
8. **Manual de Usuario (User Manual):** İspanyolca
9. **Certificado de Libre Venta (Free Sale Certificate):**
   - FDA 510(k) VEYA
   - CE mark VEYA
   - Health Canada licence
10. **Certificado de Buenas Prácticas (GMP Certificate):** ISO 13485

**Çeviri Maliyeti:**
- Teknik dokümantasyon: MXN $40,000 - $80,000
- Kullanım kılavuzu: MXN $15,000 - $30,000

#### Adım 3: COFEPRIS Registration Application
**Süre:** 4-8 ay  
**Maliyet:** MXN $20,000 - $40,000

**Başvuru Yöntemi:**
- COFEPRIS online portal (Ventanilla Única)
- Mexican representative üzerinden

**COFEPRIS Review Süreci:**
1. **Revisión Documental (Document Review):** 20 gün
2. **Evaluación Técnica (Technical Evaluation):** 60-90 gün
3. **Información Adicional (Additional Information):** Varsa 30 gün
4. **Resolución (Resolution):** 20 gün

**Application Fee (Class II):**
- Registration: MXN $18,000
- Annual renewal: MXN $5,000/yıl

#### Adım 4: Registro Sanitario
**Süre:** 2 hafta  
**Maliyet:** $0

**Registro Sanitario:**
- Registration number verilir
- 5 yıl geçerli
- Yenileme gerekli

#### Adım 5: Post-Market Surveillance
**Süre:** Sürekli  
**Maliyet:** MXN $50,000 - $100,000/yıl

**Yükümlülükler:**
1. **Reporte de Eventos Adversos (Adverse Event Reporting)**
2. **Farmacovigilancia (Pharmacovigilance)**
3. **Recall Procedures**
4. **Labeling Updates:** İspanyolca

### COFEPRIS Maliyeti Özeti

| Kalem | Maliyet (MXN) | Maliyet (USD) |
|-------|---------------|---------------|
| Mexican Representative | $50,000 - $100,000 | $2,900 - $5,800 |
| Product Registration Dossier | $100,000 - $200,000 | $5,800 - $11,600 |
| Translation | $55,000 - $110,000 | $3,200 - $6,400 |
| COFEPRIS Application Fee | $18,000 | $1,050 |
| Regulatory Consultant | $80,000 - $150,000 | $4,650 - $8,700 |
| **TOPLAM** | **$303,000 - $578,000** | **$17,600 - $33,500** |

### COFEPRIS Onay Süresi

**FDA/CE mark ile:** 6-10 ay  
**FDA/CE mark olmadan:** 12-18 ay

### Başarı İpuçları

1. **FDA/CE önce:** FDA veya CE mark şart
2. **İspanyolca belgeler:** Profesyonel çeviri kullan
3. **Mexican partner:** Güvenilir Meksikalı partner bul
4. **Free Sale Certificate:** FDA/CE sertifikası hazır olsun
5. **Ventanilla Única:** Online portal kullan

### İletişim Bilgileri

**COFEPRIS - Medical Devices**
- Address: Monterrey 33, Col. Roma, Del. Cuauhtémoc, C.P. 06700, CDMX, Mexico
- Phone: +52 55 5080 5200
- Email: atencion.cofepris@cofepris.gob.mx
- Web: https://www.gob.mx/cofepris

---


## 🇹🇷 TÜRKİYE SAĞLIK BAKANLIĞI

### Genel Bilgiler

**Düzenleyici Kurum:** Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK)  
**Başvuru Tipi:** Tıbbi Cihaz Ruhsatı  
**Web:** https://www.titck.gov.tr/

### Cihaz Sınıflandırması

**NeuralCipher.ai için:** Class IIa veya IIb

**Türkiye Sınıflandırması:**
- Class I: Düşük Risk
- Class IIa: Orta-Düşük Risk
- Class IIb: Orta-Yüksek Risk
- Class III: Yüksek Risk

**Not:** Türkiye AB MDR sınıflandırmasını kullanır

### Onay Süreci

#### Adım 1: Türkiye'de Yasal Temsilci
**Süre:** 1-2 ay  
**Maliyet:** ₺50,000 - ₺100,000

**Gereksinim:**
- Türkiye'de kayıtlı şirket VEYA
- Yetkili temsilci (Authorized Representative)

**Seçenekler:**
1. **Türkiye'de şirket kur:** En iyi ama pahalı
2. **Türk distribütör bul:** Daha kolay
3. **Yetkili temsilci:** TİTCK onaylı temsilci

#### Adım 2: CE Mark (Zorunlu)
**Süre:** 12-24 ay  
**Maliyet:** €170,000 - €360,000

**Gereksinim:** 
- Türkiye için CE mark ZORUNLU
- CE mark olmadan başvuru yapılamaz
- EU MDR 2017/745 uyumlu olmalı

**Not:** Önce CE mark alın, sonra Türkiye'ye başvurun

#### Adım 3: Tıbbi Cihaz Ruhsat Başvurusu
**Süre:** 2-4 ay  
**Maliyet:** ₺20,000 - ₺40,000

**Gerekli Belgeler:**
1. **Başvuru Formu:** TİTCK formu
2. **CE Sertifikası:** Notified Body sertifikası
3. **Uygunluk Beyanı (DoC):** Declaration of Conformity
4. **Teknik Dokümantasyon Özeti**
5. **Kullanım Kılavuzu:** Türkçe
6. **Etiket:** Türkçe
7. **Risk Sınıfı Belgesi**
8. **ISO 13485 Sertifikası**
9. **Yetkili Temsilci Belgesi**
10. **Üretici Yetki Belgesi**

**Türkçe Çeviri Maliyeti:**
- Kullanım kılavuzu: ₺10,000 - ₺20,000
- Etiket: ₺5,000 - ₺10,000

#### Adım 4: TİTCK İncelemesi
**Süre:** 60-90 gün  
**Maliyet:** ₺5,000 - ₺10,000

**İnceleme Süreci:**
1. **Ön İnceleme (10 gün):** Eksik belge kontrolü
2. **Teknik İnceleme (40-60 gün):** Detaylı inceleme
3. **Ek Bilgi Talebi (varsa):** 30 gün
4. **Karar (10 gün):** Final karar

**Başvuru Ücreti (Class IIa/IIb):**
- Ruhsat ücreti: ₺4,500
- Yıllık izleme ücreti: ₺2,000/yıl

#### Adım 5: Tıbbi Cihaz Ruhsatı
**Süre:** 1 hafta  
**Maliyet:** $0

**Ruhsat:**
- Ruhsat numarası verilir
- 5 yıl geçerli
- Yenileme gerekli

#### Adım 6: UBB (Ürün Bilgi Bankası) Kaydı
**Süre:** 1 ay  
**Maliyet:** ₺5,000 - ₺10,000

**UBB Kaydı:**
- TİTCK Ürün Bilgi Bankası'na kayıt
- Barkod/GTIN numarası
- Ürün bilgileri
- Zorunlu

#### Adım 7: Piyasa Gözetimi Yükümlülükleri
**Süre:** Sürekli  
**Maliyet:** ₺30,000 - ₺60,000/yıl

**Yükümlülükler:**
1. **Ciddi Olay Bildirimi:** 15 gün içinde
2. **Yıllık Güvenlilik Raporu**
3. **Piyasa Gözetimi Sistemi**
4. **Geri Çağırma Prosedürleri**
5. **Etiket Güncellemeleri:** Türkçe

### Türkiye Onay Maliyeti Özeti

| Kalem | Maliyet (₺) | Maliyet (USD) |
|-------|-------------|---------------|
| Yetkili Temsilci | ₺50,000 - ₺100,000 | $1,700 - $3,400 |
| CE Mark (önce alınmalı) | - | $185,000 - $390,000 |
| Türkçe Çeviri | ₺15,000 - ₺30,000 | $500 - $1,000 |
| Ruhsat Başvurusu | ₺20,000 - ₺40,000 | $680 - $1,360 |
| TİTCK Başvuru Ücreti | ₺4,500 | $150 |
| UBB Kaydı | ₺5,000 - ₺10,000 | $170 - $340 |
| Danışmanlık | ₺40,000 - ₺80,000 | $1,360 - $2,720 |
| **TOPLAM (CE mark ile)** | **₺134,500 - ₺264,500** | **$4,560 - $8,970** |
| **TOPLAM (CE mark olmadan)** | **-** | **$189,560 - $398,970** |

### Türkiye Onay Süresi

**CE Mark ile:** 3-6 ay  
**CE Mark olmadan:** 15-26 ay (CE mark süresi dahil)

### Başarı İpuçları

1. **CE mark önce:** CE mark olmadan Türkiye'ye başvuru yapılamaz
2. **Türkçe belgeler:** Kullanım kılavuzu ve etiket Türkçe olmalı
3. **Yetkili temsilci:** Deneyimli temsilci seç
4. **UBB kaydı:** Erken kayıt yap
5. **TİTCK iletişim:** Düzenli iletişim kur

### İletişim Bilgileri

**Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK)**
- Adres: Söğütözü Mahallesi 2176. Sokak No:5 Çankaya/ANKARA
- Telefon: +90 312 565 5000
- Email: titck@titck.gov.tr
- Web: https://www.titck.gov.tr/

**Tıbbi Cihaz Dairesi**
- Telefon: +90 312 565 5555
- Email: tibbicihaz@titck.gov.tr

---

## 💰 MALİYET ÖZETİ (TÜM ÜLKELER)

### Toplam Maliyet Karşılaştırması

| Ülke | Maliyet (USD) | Süre | Zorluk |
|------|---------------|------|--------|
| **ABD (FDA)** | $92,745 - $673,060 | 12-36 ay | ⭐⭐⭐⭐ |
| **Avrupa (CE)** | $185,000 - $390,000 | 12-36 ay | ⭐⭐⭐⭐⭐ |
| **Avustralya (TGA)** | $26,000 - $46,000* | 3-6 ay* | ⭐⭐ |
| **Japonya (PMDA)** | $122,000 - $448,000 | 12-36 ay | ⭐⭐⭐⭐⭐ |
| **Çin (NMPA)** | $245,000 - $1,204,000 | 12-48 ay | ⭐⭐⭐⭐⭐ |
| **Kanada** | $51,300 - $99,200* | 4-12 ay* | ⭐⭐⭐ |
| **Brezilya (ANVISA)** | $53,800 - $107,800* | 9-24 ay* | ⭐⭐⭐⭐ |
| **Meksika (COFEPRIS)** | $17,600 - $33,500* | 6-18 ay* | ⭐⭐⭐ |
| **Türkiye (TİTCK)** | $4,560 - $8,970* | 3-6 ay* | ⭐⭐ |

**\* CE mark ile** (CE mark maliyeti dahil değil)

### Stratejik Öncelik Sıralaması

#### Faz 1: Temel Onaylar (İlk 18-24 Ay)
1. **CE Mark (Avrupa)** - $185K-$390K
   - En kapsamlı onay
   - Diğer ülkeler için gerekli
   - 27 AB ülkesi + 3 ülke
   
2. **FDA 510(k) (ABD)** - $93K-$673K
   - En büyük pazar
   - Prestij ve güvenilirlik
   - Diğer ülkeler için referans

**Faz 1 Toplam:** $278K - $1,063K

#### Faz 2: İkincil Pazarlar (18-30 Ay)
3. **TGA (Avustralya)** - $26K-$46K (CE ile)
4. **Health Canada** - $51K-$99K (FDA/CE ile)
5. **TİTCK (Türkiye)** - $5K-$9K (CE ile)

**Faz 2 Toplam:** $82K - $154K

#### Faz 3: Asya Pazarları (24-48 Ay)
6. **PMDA (Japonya)** - $122K-$448K
7. **NMPA (Çin)** - $245K-$1,204K

**Faz 3 Toplam:** $367K - $1,652K

#### Faz 4: Latin Amerika (30-48 Ay)
8. **ANVISA (Brezilya)** - $54K-$108K (FDA/CE ile)
9. **COFEPRIS (Meksika)** - $18K-$34K (FDA/CE ile)

**Faz 4 Toplam:** $72K - $142K

### Toplam Yatırım (Tüm Ülkeler)

**Minimum:** $799,000  
**Maksimum:** $3,011,000  
**Ortalama:** $1,900,000

**Süre:** 4-6 yıl (tüm onaylar için)

---

## ⏱️ ZAMAN ÇİZELGESİ

### Önerilen Timeline

```
Yıl 1 (Ay 1-12):
├─ Ay 1-3: Pre-submission (FDA) + Sınıflandırma (CE)
├─ Ay 4-9: ISO 13485 sertifikasyonu
├─ Ay 10-12: Technical documentation hazırlık
└─ Sonuç: QMS hazır, belgeler hazır

Yıl 2 (Ay 13-24):
├─ Ay 13-15: FDA 510(k) başvurusu
├─ Ay 13-18: CE Mark başvurusu (Notified Body)
├─ Ay 19-21: FDA review
├─ Ay 22-24: CE Mark sertifikası
└─ Sonuç: FDA + CE Mark onayları

Yıl 3 (Ay 25-36):
├─ Ay 25-27: TGA, Health Canada, Türkiye başvuruları
├─ Ay 28-30: PMDA pre-consultation
├─ Ay 31-33: TGA, Canada, Türkiye onayları
├─ Ay 34-36: PMDA başvuru hazırlık
└─ Sonuç: 6 ülke onayı (ABD, AB, Avustralya, Kanada, Türkiye)

Yıl 4 (Ay 37-48):
├─ Ay 37-42: PMDA başvurusu ve review
├─ Ay 43-48: NMPA başvuru hazırlık
└─ Sonuç: Japonya onayı

Yıl 5 (Ay 49-60):
├─ Ay 49-54: NMPA başvurusu
├─ Ay 55-60: ANVISA, COFEPRIS başvuruları
└─ Sonuç: Çin onayı başlangıç

Yıl 6 (Ay 61-72):
├─ Ay 61-66: NMPA review devam
├─ Ay 67-72: ANVISA, COFEPRIS onayları
└─ Sonuç: Tüm major pazarlar onaylı
```

---


## 🎯 BAŞARI STRATEJİSİ

### Kritik Başarı Faktörleri

#### 1. Doğru Sıralama
**Önce CE Mark, Sonra Diğerleri**

**Neden CE Mark Önce?**
- TGA, Health Canada, ANVISA, COFEPRIS, Türkiye CE mark'ı kabul eder
- Klinik çalışma maliyetini azaltır
- Diğer başvurular çok daha hızlı olur
- Toplam maliyet %40-60 azalır

**Strateji:**
```
1. CE Mark al (18-24 ay, $185K-$390K)
2. FDA 510(k) başvur (paralel, 12-18 ay, $93K-$673K)
3. CE ile kolay ülkeler (TGA, Canada, Türkiye) (3-6 ay, $82K-$154K)
4. Asya pazarları (PMDA, NMPA) (24-48 ay, $367K-$1,652K)
5. Latin Amerika (ANVISA, COFEPRIS) (9-18 ay, $72K-$142K)
```

#### 2. Regulatory Consultant Kullanımı
**Neden Gerekli?**
- Regulatory süreçler çok karmaşık
- Her ülkenin kendine özgü gereksinimleri var
- Hata yapma maliyeti çok yüksek (red, gecikme)
- Deneyimli danışman süreci %50 hızlandırır

**Danışman Maliyetleri:**
- CE Mark: €40K-€80K
- FDA: $50K-$100K
- PMDA: ¥5M-¥10M ($34K-$68K)
- NMPA: ¥500K-¥1M ($70K-$140K)

**Toplam Danışmanlık:** $194K-$388K

**ROI:** Danışman kullanmak:
- Süreyi 6-12 ay kısaltır
- Red riskini %80 azaltır
- Toplam maliyeti %20-30 azaltır

#### 3. Klinik Çalışma Stratejisi
**Klinik Çalışma Gerekli mi?**

**Class II SaMD için:**
- Genellikle GEREKMİYOR
- Literature review + bench testing yeterli
- Ancak FDA/PMDA/NMPA isteyebilir

**Eğer Gerekirse:**
- Tek bir global klinik çalışma yap
- Multi-center (ABD + Avrupa + Asya)
- 200-300 hasta
- Maliyet: $500K-$1M
- Süre: 12-18 ay

**Alternatifler:**
- Real-world evidence (RWE)
- Post-market clinical follow-up (PMCF)
- Literature-based clinical evaluation

#### 4. Quality Management System (QMS)
**ISO 13485 Önceliği**

**Neden Önemli?**
- Tüm ülkeler ISO 13485 istiyor
- QMS olmadan başvuru yapılamaz
- Erken yatırım yapın

**QMS Kurulum:**
- Süre: 6-12 ay
- Maliyet: $50K-$100K
- Sertifikasyon: $10K-$20K
- Yıllık audit: $5K-$10K

**QMS Gereksinimleri:**
- Document control
- Design control
- Risk management (ISO 14971)
- Production control
- Post-market surveillance
- CAPA (Corrective/Preventive Actions)

#### 5. Software Documentation
**IEC 62304 Uyumluluğu**

**Gerekli Belgeler:**
1. **Software Requirements Specification (SRS)**
2. **Software Design Specification (SDS)**
3. **Software Verification and Validation (V&V)**
4. **Risk Management File (ISO 14971)**
5. **Cybersecurity Documentation**
6. **Usability Engineering File (IEC 62366)**

**Software Level of Concern:**
- NeuralCipher.ai: Moderate (Class B)
- Detaylı dokümantasyon gerekli
- Maliyet: $30K-$60K

#### 6. Clinical Evaluation Report (CER)
**MDR Article 61 Uyumluluğu**

**CER İçeriği:**
1. Clinical background (Parkinson hastalığı)
2. Device description (NeuralCipher.ai)
3. Clinical data:
   - Literature review (systematic)
   - Own clinical data
   - Equivalent device data
4. Clinical performance (sensitivity, specificity, accuracy)
5. Clinical safety (adverse events, risks)
6. Benefit-risk analysis
7. Conclusions

**CER Hazırlık:**
- Süre: 3-4 ay
- Maliyet: $30K-$60K
- Clinical writer gerekli

#### 7. Post-Market Surveillance (PMS)
**Sürekli İzleme Sistemi**

**PMS Gereksinimleri:**
1. **Vigilance System:** Ciddi olayları raporla
2. **Complaint Handling:** Şikayetleri yönet
3. **Trend Analysis:** Trend analizi yap
4. **PSUR:** Periodic Safety Update Report
5. **PMCF:** Post-Market Clinical Follow-up

**PMS Maliyeti:**
- Sistem kurulum: $20K-$40K
- Yıllık operasyon: $30K-$60K/ülke

### Maliyet Optimizasyonu Stratejileri

#### Strateji 1: Paralel Başvurular
**CE + FDA Paralel**
- CE Mark başvurusu yap (Ay 1)
- FDA Pre-Sub yap (Ay 1)
- FDA 510(k) başvur (Ay 6)
- CE sertifikası al (Ay 18)
- FDA clearance al (Ay 18)

**Avantaj:** 12 ay kazanç

#### Strateji 2: CE-First Approach
**CE Sonrası Hızlı Genişleme**
- CE Mark al (Ay 18)
- TGA, Canada, Türkiye başvur (Ay 19)
- 3 ülke daha onay (Ay 24)

**Avantaj:** $200K-$400K tasarruf

#### Strateji 3: Phased Approach
**Aşamalı Pazar Girişi**
- Faz 1: CE + FDA (Yıl 1-2)
- Faz 2: TGA, Canada, Türkiye (Yıl 2-3)
- Faz 3: PMDA, NMPA (Yıl 3-5)
- Faz 4: ANVISA, COFEPRIS (Yıl 4-6)

**Avantaj:** Cash flow yönetimi

#### Strateji 4: Revenue-Funded Expansion
**Gelir ile Genişleme**
- CE + FDA ile satış başlat
- Gelir ile diğer ülkeleri fonla
- Risk azaltma

**Avantaj:** Dış yatırım gerekmez

### Risk Yönetimi

#### Risk 1: Başvuru Reddi
**Olasılık:** %10-20  
**Etki:** 6-12 ay gecikme, $50K-$100K ek maliyet

**Azaltma:**
- Deneyimli danışman kullan
- Pre-submission consultation yap
- Belgeler eksiksiz olsun

#### Risk 2: Klinik Çalışma Talebi
**Olasılık:** %30-40  
**Etki:** 12-18 ay gecikme, $500K-$1M ek maliyet

**Azaltma:**
- Güçlü literature review
- Real-world evidence topla
- Equivalent device data kullan

#### Risk 3: Regulatory Değişiklikler
**Olasılık:** %20-30  
**Etki:** Değişken

**Azaltma:**
- Regulatory intelligence servisi
- Düzenli güncelleme takibi
- Esnek dokümantasyon

#### Risk 4: Bütçe Aşımı
**Olasılık:** %50-60  
**Etki:** %20-40 bütçe aşımı

**Azaltma:**
- %30 contingency ekle
- Phased approach kullan
- Maliyet kontrolü yap

### Başarı Metrikleri

#### KPI'lar
1. **Time to Market:** İlk onay süresi
   - Hedef: 18-24 ay (CE + FDA)
   
2. **Approval Rate:** Onay oranı
   - Hedef: %90+ (ilk başvuruda)
   
3. **Cost Efficiency:** Maliyet verimliliği
   - Hedef: Bütçe içinde kal
   
4. **Market Coverage:** Pazar kapsamı
   - Hedef: 5 ülke (Yıl 3), 9 ülke (Yıl 6)

### Önerilen Ekip

#### İç Ekip
1. **Regulatory Affairs Manager:** Full-time
2. **Quality Manager:** Full-time
3. **Clinical Affairs Specialist:** Part-time
4. **Technical Writer:** Part-time

#### Dış Danışmanlar
1. **CE Mark Consultant:** Avrupa uzmanı
2. **FDA Consultant:** ABD uzmanı
3. **Asia Consultant:** PMDA/NMPA uzmanı
4. **Clinical Writer:** CER uzmanı

**Toplam Ekip Maliyeti:** $200K-$400K/yıl

---

## 📚 KAYNAKLAR VE REFERANSLAR

### Regulatory Agencies

**FDA (ABD)**
- Web: https://www.fda.gov/medical-devices
- Guidance: https://www.fda.gov/medical-devices/device-advice-comprehensive-regulatory-assistance/guidance-documents-medical-devices-and-radiation-emitting-products

**European Commission (Avrupa)**
- Web: https://ec.europa.eu/health/medical-devices-sector_en
- MDCG Guidance: https://ec.europa.eu/health/md_sector/new_regulations/guidance_en

**TGA (Avustralya)**
- Web: https://www.tga.gov.au/medical-devices
- Guidance: https://www.tga.gov.au/publication/guidance-documents-medical-devices

**PMDA (Japonya)**
- Web: https://www.pmda.go.jp/english/
- Guidance: https://www.pmda.go.jp/english/review-services/regulations/0002.html

**NMPA (Çin)**
- Web: https://www.nmpa.gov.cn/
- English: http://english.nmpa.gov.cn/

**Health Canada (Kanada)**
- Web: https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices.html
- Guidance: https://www.canada.ca/en/health-canada/services/drugs-health-products/medical-devices/application-information/guidance-documents.html

**ANVISA (Brezilya)**
- Web: https://www.gov.br/anvisa/
- English: https://www.gov.br/anvisa/en/

**COFEPRIS (Meksika)**
- Web: https://www.gob.mx/cofepris

**TİTCK (Türkiye)**
- Web: https://www.titck.gov.tr/

### Standards

**ISO 13485:2016**
- Medical devices - Quality management systems

**ISO 14971:2019**
- Medical devices - Application of risk management

**IEC 62304:2006**
- Medical device software - Software life cycle processes

**IEC 62366-1:2015**
- Medical devices - Application of usability engineering

**ISO/IEC 27001:2013**
- Information security management

### Useful Resources

**IMDRF (International Medical Device Regulators Forum)**
- Web: http://www.imdrf.org/
- Harmonization documents

**GHTF (Global Harmonization Task Force)**
- Historical guidance documents

**MEDDEV Guidance**
- EU guidance documents

**FDA Recognized Consensus Standards**
- https://www.accessdata.fda.gov/scripts/cdrh/cfdocs/cfStandards/search.cfm

### Recommended Books

1. **"Medical Device Regulatory Practices"** - Kimberly Trautman
2. **"FDA Regulatory Affairs"** - Douglas Pisano
3. **"EU Medical Device Regulation"** - Johner Institute
4. **"Software as a Medical Device (SaMD)"** - IMDRF

### Training and Certification

**RAPS (Regulatory Affairs Professionals Society)**
- Web: https://www.raps.org/
- RAC Certification

**AAMI (Association for the Advancement of Medical Instrumentation)**
- Web: https://www.aami.org/
- Training courses

**Johner Institute**
- Web: https://www.johner-institute.com/
- EU MDR training

---

## 📞 DESTEK VE DANIŞMANLIK

### Önerilen Regulatory Consultants

#### Global Consultants

**1. Emergo by UL**
- Web: https://www.emergobyul.com/
- Services: Global regulatory consulting
- Expertise: CE Mark, FDA, Asia
- Contact: info@emergobyul.com

**2. Regulatory Affairs Associates (RAA)**
- Web: https://www.raaregulatory.com/
- Services: FDA, CE Mark, Canada
- Expertise: Software/SaMD
- Contact: info@raaregulatory.com

**3. Freyr Solutions**
- Web: https://www.freyrsolutions.com/
- Services: Global regulatory
- Expertise: All major markets
- Contact: info@freyrsolutions.com

#### Regional Consultants

**Europe (CE Mark)**
- BSI Regulatory Services
- TÜV SÜD Regulatory Services
- DEKRA Certification

**USA (FDA)**
- Greenlight Guru
- MedTech Momentum
- Regulatory Compliance Associates

**Asia (PMDA/NMPA)**
- CIRS (China)
- Yakuji Nippo (Japan)
- Asia Regulatory Consulting

### Notified Bodies (CE Mark)

**Recommended for Software/SaMD:**

1. **TÜV SÜD Product Service**
   - Web: https://www.tuvsud.com/medical-devices
   - Strong in software
   - Fast turnaround

2. **BSI (British Standards Institution)**
   - Web: https://www.bsigroup.com/medical-devices
   - Excellent reputation
   - Good communication

3. **DEKRA Certification**
   - Web: https://www.dekra.com/medical-devices
   - Competitive pricing
   - Efficient process

### ISO 13485 Certification Bodies

1. **TÜV Rheinland**
2. **SGS**
3. **BSI**
4. **DEKRA**
5. **Lloyd's Register**

---

## ✅ SONUÇ VE ÖNERİLER

### Özet

NeuralCipher.ai için global medikal cihaz onayları:

**Toplam Yatırım:** $800K - $3M  
**Toplam Süre:** 4-6 yıl (tüm pazarlar)  
**Pazar Kapsamı:** 9 ülke/bölge, 2+ milyar insan

### Önerilen Strateji

#### Faz 1: Foundation (Yıl 1-2)
**Hedef:** CE Mark + FDA  
**Yatırım:** $278K - $1,063K  
**Pazar:** ABD + Avrupa (27 ülke)

**Aksiyonlar:**
1. ISO 13485 sertifikasyonu al
2. CE Mark başvurusu yap
3. FDA Pre-Sub + 510(k) başvur
4. Technical documentation hazırla
5. Clinical evaluation report yaz

#### Faz 2: Expansion (Yıl 2-3)
**Hedef:** TGA + Health Canada + Türkiye  
**Yatırım:** $82K - $154K  
**Pazar:** Avustralya + Kanada + Türkiye

**Aksiyonlar:**
1. CE sertifikası ile başvur
2. Hızlı onay al (3-6 ay)
3. Satış başlat

#### Faz 3: Asia (Yıl 3-5)
**Hedef:** PMDA + NMPA  
**Yatırım:** $367K - $1,652K  
**Pazar:** Japonya + Çin

**Aksiyonlar:**
1. Yerel partner bul
2. Belgeler çevir
3. Klinik çalışma (gerekirse)
4. Başvuru yap

#### Faz 4: Latin America (Yıl 4-6)
**Hedef:** ANVISA + COFEPRIS  
**Yatırım:** $72K - $142K  
**Pazar:** Brezilya + Meksika

**Aksiyonlar:**
1. FDA/CE ile başvur
2. Portekizce/İspanyolca çeviri
3. Onay al

### Kritik Başarı Faktörleri

1. ✅ **CE Mark Önceliği:** Diğer onaylar için gerekli
2. ✅ **Deneyimli Danışman:** Süreç çok karmaşık
3. ✅ **ISO 13485 Erken:** QMS olmadan başvuru yok
4. ✅ **Güçlü CER:** Clinical evaluation çok önemli
5. ✅ **Phased Approach:** Aşamalı genişleme
6. ✅ **Budget Contingency:** %30 ek bütçe
7. ✅ **Patience:** Süreç uzun, sabırlı ol

### Final Tavsiye

**Hemen Başlayın:**
1. ISO 13485 sertifikasyon sürecini başlatın
2. Regulatory consultant kiralayın (CE + FDA)
3. Technical documentation hazırlığına başlayın
4. Clinical evaluation plan yapın
5. Budget ve timeline oluşturun

**İlk 6 Ay Hedefi:**
- ISO 13485 sertifikası
- CE Mark başvurusu
- FDA Pre-Sub meeting
- Technical documentation %80 hazır

**18-24 Ay Hedefi:**
- CE Mark sertifikası ✅
- FDA 510(k) clearance ✅
- Satış başlangıcı ✅

**Başarı Şansı:** %85-90 (doğru strateji ile)

---

**Rapor Hazırlayan:** AI Regulatory Consultant  
**Tarih:** 23 Ocak 2026  
**Versiyon:** 1.0  
**Son Güncelleme:** 23 Ocak 2026

**Disclaimer:** Bu rehber genel bilgilendirme amaçlıdır. Spesifik durumunuz için profesyonel regulatory danışman ile çalışmanız önerilir. Regulatory gereksinimler değişebilir, güncel bilgi için ilgili kurumların web sitelerini kontrol edin.

---

**İletişim:**
- Email: regulatory@neuralcipher.ai
- Web: https://neuralcipher.ai/regulatory
- Phone: [To be added]

**Destek için:**
Bu rehber hakkında sorularınız için regulatory ekibimizle iletişime geçin.

