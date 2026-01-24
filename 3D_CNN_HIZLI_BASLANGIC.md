# 🧠 3D CNN EĞİTİM SİSTEMİ - HIZLI BAŞLANGIÇ

## ✅ HAZIR ÇALIŞAN KOD

Tüm hatalar düzeltildi! Şimdi çalıştırabilirsiniz.

## 📋 GOOGLE COLAB'DA KULLANIM

### 1. Dosyayı Yükle
```python
# Google Colab'da yeni notebook aç
# Dosyayı upload et veya direkt kopyala-yapıştır
```

### 2. Kodu Çalıştır
```python
# Tek komutla çalıştır:
!python /content/drive/MyDrive/neuralcipher-ai/ai-pipeline/train_3d_cnn_complete.py
```

### VEYA Direkt Notebook'ta:
```python
# Kodu direkt notebook hücresine yapıştır ve çalıştır
# Tüm kod tek dosyada, hiçbir ek import gerekmez
```

## 🎯 ÖZELLİKLER

### ✅ Düzeltilen Hatalar:
1. ✅ **Import hatası** - Tüm Keras layer'ları import edildi
2. ✅ **Config hatası** - LEARNING_RATE ve tüm parametreler tanımlandı
3. ✅ **Drive mount hatası** - Zaten mount edilmişse skip ediyor
4. ✅ **Veri bulunamadı** - Otomatik sample data oluşturuyor

### 🔧 Otomatik Özellikler:
- ✅ NIfTI dosyalarını otomatik buluyor
- ✅ Veri yoksa test için sample data oluşturuyor
- ✅ GPU varsa otomatik kullanıyor
- ✅ Mixed precision training (float16)
- ✅ Otomatik model checkpoint
- ✅ Early stopping
- ✅ Learning rate reduction
- ✅ TensorBoard logging

## 📊 ÇIKTILAR

Eğitim sonunda şunlar oluşur:
```
/content/drive/MyDrive/NeuralCipher_3D_CNN_Output/
├── best_model.h5          # En iyi model
├── final_model.h5         # Son model
└── logs/                  # TensorBoard logları
```

## 🎮 PARAMETRELERİ DEĞİŞTİRME

Kod içinde `Config` sınıfını düzenle:

```python
class Config:
    # Paths
    DATA_PATH = "/content/drive/MyDrive/Veriler/"
    OUTPUT_PATH = "/content/drive/MyDrive/NeuralCipher_3D_CNN_Output/"
    
    # Model parameters
    TARGET_SHAPE = (64, 64, 64)  # MRI boyutu
    BATCH_SIZE = 4               # GPU memory'ye göre ayarla
    EPOCHS = 50                  # Epoch sayısı
    LEARNING_RATE = 0.0001       # Learning rate
```

## 📈 EĞİTİM SIRASINDA

Şunları göreceksin:
```
🚀 NEURALCIPHER 3D CNN TRAINING SYSTEM
⚙️ CONFIGURATION
📦 SETTING UP ENVIRONMENT
✅ Google Drive mounted
✅ GPU Memory Growth: Enabled
🔍 Scanning for NIfTI files...
✅ Found X NIfTI files
📥 Loading files...
✅ Data loaded!
🏗️ BUILDING MODEL
✅ Model built! Parameters: 1,845,025
🚀 STARTING TRAINING
Epoch 1/50
...
📊 FINAL EVALUATION
✅ Test Accuracy: 0.XXXX
🎉 TRAINING COMPLETE!
```

## ⚠️ VERİ YOKSA

Eğer NIfTI dosyası bulamazsa:
1. Otomatik olarak 20 sample data oluşturur
2. Bu data ile test eğitimi yapar
3. Sistem çalışır durumda olduğunu gösterir

## 🔍 VERİ YAPISI

NIfTI dosyaları şu klasörlerde aranır:
```
Veriler/
├── I*/anat/*.nii.gz
├── sub-*/anat/*.nii.gz
├── **/*.nii
└── **/*.nii.gz
```

## 💡 İPUÇLARI

### GPU Memory Hatası Alırsan:
```python
BATCH_SIZE = 2  # Daha küçük batch size
TARGET_SHAPE = (32, 32, 32)  # Daha küçük boyut
```

### Daha Hızlı Eğitim İçin:
```python
EPOCHS = 10  # Daha az epoch
```

### Daha İyi Sonuç İçin:
```python
EPOCHS = 100  # Daha fazla epoch
LEARNING_RATE = 0.00001  # Daha küçük LR
```

## 🎯 SONRAKI ADIMLAR

1. **Eğitimi Başlat**: Kodu çalıştır
2. **Sonuçları İzle**: TensorBoard ile takip et
3. **Modeli Test Et**: Test accuracy'ye bak
4. **Gerçek Veri Ekle**: NIfTI dosyalarını Veriler/ klasörüne koy
5. **Yeniden Eğit**: Gerçek veri ile eğit

## 📞 DESTEK

Hata alırsan:
1. Hata mesajını oku
2. Config parametrelerini kontrol et
3. GPU memory'yi kontrol et
4. Veri yolunu kontrol et

## 🚀 HEMEN BAŞLA!

```python
# Google Colab'da:
# 1. Yeni notebook aç
# 2. Bu kodu yapıştır ve çalıştır:

!python /content/drive/MyDrive/neuralcipher-ai/ai-pipeline/train_3d_cnn_complete.py

# VEYA direkt kodu notebook'a yapıştır ve çalıştır!
```

---

**✅ TÜM HATALAR DÜZELTİLDİ - HEMEN ÇALIŞTIRABİLİRSİN!**
