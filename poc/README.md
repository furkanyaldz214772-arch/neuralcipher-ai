# Proof of Concept - Ses Analizi

## 🎯 Amaç
Ses dosyasından Parkinson hastalığı risk skorunu hesaplayan minimal çalışan prototip.

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
pip install -r requirements.txt
```

## 📝 Kullanım

```bash
# Ses dosyasını analiz et
python audio_analyzer.py --audio sample.wav
```

## 📊 Çıktı Örneği

```
🧬 NEURALCIPHER.AI - PROOF OF CONCEPT
============================================================
📂 Ses dosyası yükleniyor: sample.wav
✅ Yüklendi - Süre: 3.50 saniye, Sample Rate: 22050 Hz

🔬 Özellik çıkarımı başlıyor...
  ✓ Jitter: 0.8542%
  ✓ Shimmer: 2.1234%
  ✓ HNR: 25.67 dB
  ✓ MFCC: 13 katsayı çıkarıldı
  ✓ Ek özellikler: ZCR, Spectral Centroid, Rolloff

🧠 Risk skoru hesaplanıyor...
  ✓ Jitter normal: 0.8542%
  ✓ Shimmer normal: 2.1234%
  ✓ HNR normal: 25.67 dB

============================================================
📊 ANALİZ SONUÇLARI
============================================================

🟢 Risk Seviyesi: DÜŞÜK
📈 Risk Skoru: 10.0/100

💡 Yorum: Ses parametreleri normal aralıkta. Düzenli takip önerilir.

⚠️  DİKKAT: Bu bir proof-of-concept'tir. Tıbbi teşhis koymaz!
   Doktorunuza danışın.
```

## 🔬 Çıkarılan Özellikler

1. **Jitter**: Ses tellerindeki frekans değişkenliği (%)
2. **Shimmer**: Ses tellerindeki genlik değişkenliği (%)
3. **HNR**: Harmonics-to-Noise Ratio (dB)
4. **MFCC**: Mel-Frequency Cepstral Coefficients (13 katsayı)
5. **Zero Crossing Rate**: Sinyal işaret değişim oranı
6. **Spectral Centroid**: Frekans spektrumunun merkezi
7. **Spectral Rolloff**: Spektral enerjinin %85'inin altındaki frekans

## 📌 Notlar

- Bu basit bir kural tabanlı sistemdir
- Gerçek AI modeli sonraki fazda eklenecek
- Sadece eğitim ve demo amaçlıdır

