# ⚡ Hızlı Başlangıç - NeuralCipher.ai

## 🎯 Durum

✅ **Proje yapısı oluşturuldu!**
- Backend API kodu hazır
- Proof of Concept scripti hazır
- Database modelleri hazır
- Docker yapılandırması hazır

## 🚀 Şimdi Ne Yapmalısın?

### Seçenek 1: Docker Desktop Kur ve Başlat (Önerilen)

1. **Docker Desktop'ı İndir ve Kur:**
   - https://www.docker.com/products/docker-desktop/
   - Kur ve başlat

2. **Backend'i Başlat:**
   ```bash
   cd neuralcipher-ai
   docker-compose up -d
   ```

3. **Tarayıcıda Aç:**
   - http://localhost:8000/docs

### Seçenek 2: Manuel Kurulum (Docker Olmadan)

1. **Python Bağımlılıklarını Yükle:**
   ```bash
   cd neuralcipher-ai/backend
   pip install -r requirements-minimal.txt
   ```
   ⚠️ Bu 5-10 dakika sürebilir (librosa, scipy gibi büyük paketler)

2. **Backend'i Başlat:**
   ```bash
   python start.py
   ```

3. **Tarayıcıda Aç:**
   - http://localhost:8000/docs

### Seçenek 3: Sadece Proof of Concept Test Et

En hızlı yol! Backend olmadan ses analizi:

```bash
cd neuralcipher-ai/poc
pip install -r requirements.txt
python audio_analyzer.py --audio sample.wav
```

⚠️ **Not:** Bir ses dosyası gerekli (sample.wav)

## 📝 Ses Dosyası Nasıl Oluşturulur?

### Windows (Ses Kaydedici)
1. Başlat menüsünden "Ses Kaydedici" aç
2. 3-5 saniye "Aaaa" sesi kaydet
3. WAV formatında kaydet
4. `sample.wav` olarak yeniden adlandır

### Online Alternatif
1. https://online-voice-recorder.com/ adresine git
2. 3-5 saniye kayıt yap
3. WAV formatında indir
4. `sample.wav` olarak kaydet

## 🐛 Sorun mu Yaşıyorsun?

### "Docker Desktop çalışmıyor"
- Docker Desktop'ı başlat (Windows'ta sistem tepsisinde olmalı)
- Bilgisayarı yeniden başlat
- Manuel kurulum seçeneğini dene

### "pip install çok uzun sürüyor"
- Normal! librosa ve scipy büyük paketler
- Kahve molası ver ☕
- İnternet bağlantını kontrol et

### "ModuleNotFoundError"
- Bağımlılıkları yükledin mi?
- `pip install -r requirements-minimal.txt`

### "Port 8000 already in use"
- Başka bir uygulama 8000 portunu kullanıyor
- Backend'i farklı portta başlat: `uvicorn app.main:app --port 8001`

## 📚 Sonraki Adımlar

1. ✅ Backend'i çalıştır
2. ✅ Swagger Docs'u keşfet (http://localhost:8000/docs)
3. ✅ İlk ses dosyasını yükle ve analiz et
4. 🔜 Flutter mobil uygulaması
5. 🔜 Gerçek AI model eğitimi

## 💡 Yardım

Takıldın mı?
- `GETTING_STARTED.md` dosyasına bak
- `backend/README.md` dosyasına bak
- GitHub Issues'da sor

**Başarılar! 🚀**

