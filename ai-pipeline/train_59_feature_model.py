#!/usr/bin/env python3
"""
NeuralCipher.ai - 59 Feature Model Eğitimi
Yeni feature extraction ile uyumlu model
"""
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib
from pathlib import Path
import json
from datetime import datetime

# Klasörler
BASE_DIR = Path(__file__).parent
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

MODEL_VERSION = "v1.0"
MODEL_NAME = f"neuralcipher_{MODEL_VERSION}"

def create_synthetic_data(n_samples=200):
    """
    59 feature'lı sentetik veri oluştur
    Gerçek veri toplanana kadar demo için
    """
    print(f"📊 {n_samples} sentetik örneklem oluşturuluyor...")
    
    # 59 features
    n_features = 59
    
    # Sağlıklı bireyler (100 örneklem)
    healthy_samples = n_samples // 2
    X_healthy = np.random.randn(healthy_samples, n_features)
    
    # Jitter, Shimmer düşük, HNR yüksek (sağlıklı)
    X_healthy[:, 0] = np.random.uniform(0.2, 0.8, healthy_samples)  # jitter
    X_healthy[:, 1] = np.random.uniform(1.0, 3.0, healthy_samples)  # shimmer
    X_healthy[:, 2] = np.random.uniform(20, 30, healthy_samples)    # hnr
    
    y_healthy = np.zeros(healthy_samples)
    
    # Parkinson hastaları (100 örneklem)
    parkinsons_samples = n_samples - healthy_samples
    X_parkinsons = np.random.randn(parkinsons_samples, n_features)
    
    # Jitter, Shimmer yüksek, HNR düşük (hasta)
    X_parkinsons[:, 0] = np.random.uniform(1.5, 3.0, parkinsons_samples)  # jitter
    X_parkinsons[:, 1] = np.random.uniform(4.0, 7.0, parkinsons_samples)  # shimmer
    X_parkinsons[:, 2] = np.random.uniform(10, 18, parkinsons_samples)    # hnr
    
    y_parkinsons = np.ones(parkinsons_samples)
    
    # Birleştir
    X = np.vstack([X_healthy, X_parkinsons])
    y = np.concatenate([y_healthy, y_parkinsons])
    
    # Karıştır
    indices = np.random.permutation(len(X))
    X = X[indices]
    y = y[indices]
    
    print(f"✅ Veri hazır:")
    print(f"   Sağlıklı: {int(np.sum(y == 0))} örneklem")
    print(f"   Parkinson: {int(np.sum(y == 1))} örneklem")
    print(f"   Toplam feature: {n_features}")
    
    return X, y

def train_model():
    """59 feature'lı model eğit"""
    print("\n" + "=" * 60)
    print("🧬 NEURALCIPHER.AI - 59 FEATURE MODEL EĞİTİMİ")
    print("=" * 60 + "\n")
    
    # 1. Sentetik veri oluştur
    X, y = create_synthetic_data(n_samples=200)
    
    # 2. Normalizasyon
    print("\n📏 Özellikler normalize ediliyor...")
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    print("✅ Normalizasyon tamamlandı")
    
    # 3. Model eğitimi
    print("\n🧠 Random Forest modeli eğitiliyor...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_scaled, y)
    
    # 4. Performans
    train_accuracy = model.score(X_scaled, y)
    print(f"✅ Model eğitildi")
    print(f"   Train Accuracy: {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
    
    # 5. Model kaydet
    print("\n💾 Model kaydediliyor...")
    
    # Model
    model_file = MODELS_DIR / f"{MODEL_NAME}.pkl"
    joblib.dump(model, model_file)
    print(f"✅ Model: {model_file}")
    
    # Scaler
    scaler_file = MODELS_DIR / f"{MODEL_NAME}_scaler.pkl"
    joblib.dump(scaler, scaler_file)
    print(f"✅ Scaler: {scaler_file}")
    
    # Feature names (59 features)
    feature_names = [
        'jitter', 'shimmer', 'hnr',  # 3 vocal
        *[f'mfcc_mean_{i}' for i in range(13)],  # 13 MFCC mean
        *[f'mfcc_std_{i}' for i in range(13)],   # 13 MFCC std
        *[f'mfcc_min_{i}' for i in range(13)],   # 13 MFCC min
        *[f'mfcc_max_{i}' for i in range(13)],   # 13 MFCC max
        'spectral_centroid', 'spectral_rolloff',  # 4 spectral
        'spectral_bandwidth', 'zero_crossing_rate'
    ]
    
    features_file = MODELS_DIR / f"{MODEL_NAME}_features.json"
    with open(features_file, 'w') as f:
        json.dump({'features': feature_names}, f, indent=2)
    print(f"✅ Features: {features_file}")
    
    # Metadata
    metadata = {
        'model_version': MODEL_VERSION,
        'trained_at': datetime.now().isoformat(),
        'feature_count': 59,
        'training_samples': len(X),
        'metrics': {
            'train_accuracy': float(train_accuracy),
            'note': 'Sentetik veri ile eğitildi - gerçek veri ile güncellenecek'
        },
        'model_file': str(model_file.name),
        'scaler_file': str(scaler_file.name)
    }
    
    metadata_file = MODELS_DIR / f"{MODEL_NAME}_metadata.json"
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"✅ Metadata: {metadata_file}")
    
    print("\n" + "=" * 60)
    print("✅ 59 FEATURE MODEL HAZIR!")
    print("=" * 60)
    print(f"\n📊 Özet:")
    print(f"   Feature Count: 59")
    print(f"   Train Accuracy: {train_accuracy*100:.2f}%")
    print(f"   Model: {model_file.name}")
    print(f"\n📌 Backend şimdi 59 feature ile çalışacak!")
    print(f"⚠️  NOT: Bu sentetik veri ile eğitilmiş demo model")
    print(f"   Gerçek veri toplanınca yeniden eğitilmeli\n")

if __name__ == "__main__":
    train_model()
