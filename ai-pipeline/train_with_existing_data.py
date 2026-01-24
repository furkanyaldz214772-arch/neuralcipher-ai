"""
🧠 NEURALCIPHER - MEVCUT VERİLERLE EĞİTİM
=========================================
Veriler klasöründeki CSV, Audio, MATLAB dosyalarını kullanır
"""

import os
import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.layers import Input, Dense, Dropout, BatchNormalization, LSTM, Conv1D, MaxPooling1D, Flatten
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import glob
import librosa

print("=" * 60)
print("🚀 NEURALCIPHER - MEVCUT VERİLERLE EĞİTİM")
print("=" * 60)

# ============================================================
# CONFIGURATION
# ============================================================
class Config:
    DATA_PATH = "/content/drive/MyDrive/Veriler/"
    OUTPUT_PATH = "/content/drive/MyDrive/NeuralCipher_Output/"
    
    BATCH_SIZE = 32
    EPOCHS = 50
    LEARNING_RATE = 0.001
    RANDOM_STATE = 42

config = Config()

print("\n⚙️ CONFIGURATION")
print("=" * 60)
print(f"📂 Data Path: {config.DATA_PATH}")
print(f"💾 Output Path: {config.OUTPUT_PATH}")
print("=" * 60)

# ============================================================
# SETUP
# ============================================================
print("\n📦 SETTING UP ENVIRONMENT")
print("=" * 60)

try:
    from google.colab import drive
    if not os.path.exists('/content/drive'):
        drive.mount('/content/drive')
        print("✅ Google Drive mounted")
    else:
        print("✅ Google Drive already mounted")
except:
    print("⚠️ Not running in Colab")

os.makedirs(config.OUTPUT_PATH, exist_ok=True)

# GPU Setup
print(f"\n📦 TensorFlow: {tf.__version__}")
gpus = tf.config.list_physical_devices('GPU')
print(f"🎮 GPU: {len(gpus)} device(s)")

if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
    print("✅ GPU Memory Growth: Enabled")

# ============================================================
# DATA LOADER
# ============================================================
class MultiModalDataLoader:
    """CSV, Audio, MATLAB dosyalarını yükler"""
    
    def __init__(self, data_path):
        self.data_path = data_path
        self.scaler = StandardScaler()
        
    def load_csv_data(self):
        """CSV dosyalarını yükle"""
        print("\n🔍 Loading CSV files...")
        csv_files = glob.glob(os.path.join(self.data_path, "**/*.csv"), recursive=True)
        
        all_data = []
        for csv_file in csv_files[:10]:  # İlk 10 dosya
            try:
                df = pd.read_csv(csv_file)
                if len(df) > 0:
                    all_data.append(df)
                    print(f"✅ Loaded: {os.path.basename(csv_file)} ({len(df)} rows)")
            except Exception as e:
                continue
        
        if all_data:
            combined = pd.concat(all_data, ignore_index=True)
            print(f"\n✅ Total CSV data: {len(combined)} rows")
            return combined
        return None
    
    def load_audio_features(self):
        """Audio dosyalarından özellik çıkar"""
        print("\n🔍 Loading Audio files...")
        audio_files = glob.glob(os.path.join(self.data_path, "**/*.wav"), recursive=True)
        
        features = []
        labels = []
        
        for audio_file in audio_files[:50]:  # İlk 50 dosya
            try:
                # Audio yükle
                y, sr = librosa.load(audio_file, duration=3.0)
                
                # Özellikler çıkar
                mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
                mfcc_mean = np.mean(mfcc, axis=1)
                
                features.append(mfcc_mean)
                
                # Label belirle
                filename = os.path.basename(audio_file).lower()
                label = 1 if any(x in filename for x in ['pd', 'parkinson', 'patient']) else 0
                labels.append(label)
                
                if len(features) % 10 == 0:
                    print(f"Processed: {len(features)} audio files")
                    
            except Exception as e:
                continue
        
        if features:
            print(f"\n✅ Total audio features: {len(features)}")
            return np.array(features), np.array(labels)
        return None, None
    
    def create_sample_data(self, n_samples=1000):
        """Örnek veri oluştur"""
        print("\n🔧 Creating sample data...")
        
        # 22 özellik (parkinsons.data formatı)
        X = np.random.randn(n_samples, 22).astype(np.float32)
        y = np.random.randint(0, 2, n_samples)
        
        # Gerçekçi değerler
        X[:, 0] = np.random.uniform(88, 260, n_samples)  # MDVP:Fo(Hz)
        X[:, 1] = np.random.uniform(102, 592, n_samples)  # MDVP:Fhi(Hz)
        X[:, 2] = np.random.uniform(65, 239, n_samples)  # MDVP:Flo(Hz)
        
        print(f"✅ Sample data created: {X.shape}")
        return X, y
    
    def load_all_data(self):
        """Tüm verileri yükle"""
        print("\n" + "=" * 60)
        print("📥 LOADING DATA")
        print("=" * 60)
        
        # CSV verilerini dene
        csv_data = self.load_csv_data()
        if csv_data is not None and 'status' in csv_data.columns:
            # Parkinson veri seti bulundu
            X = csv_data.drop(['status', 'name'], axis=1, errors='ignore').values
            y = csv_data['status'].values
            
            X = self.scaler.fit_transform(X)
            
            print(f"\n✅ CSV Data loaded!")
            print(f"📊 Shape: {X.shape}")
            print(f"🏷️ PD: {np.sum(y)}, HC: {len(y) - np.sum(y)}")
            return X, y
        
        # Audio verilerini dene
        X_audio, y_audio = self.load_audio_features()
        if X_audio is not None:
            X_audio = self.scaler.fit_transform(X_audio)
            
            print(f"\n✅ Audio Data loaded!")
            print(f"📊 Shape: {X_audio.shape}")
            print(f"🏷️ PD: {np.sum(y_audio)}, HC: {len(y_audio) - np.sum(y_audio)}")
            return X_audio, y_audio
        
        # Hiçbir veri bulunamadı, sample oluştur
        print("\n⚠️ No data found, creating sample data...")
        return self.create_sample_data()

# ============================================================
# MODEL
# ============================================================
def build_model(input_dim):
    """Neural Network modeli"""
    
    inputs = Input(shape=(input_dim,))
    
    # Dense layers
    x = Dense(256, activation='relu')(inputs)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    
    x = Dense(128, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.3)(x)
    
    x = Dense(64, activation='relu')(x)
    x = BatchNormalization()(x)
    x = Dropout(0.2)(x)
    
    x = Dense(32, activation='relu')(x)
    x = Dropout(0.2)(x)
    
    # Output
    outputs = Dense(1, activation='sigmoid')(x)
    
    model = models.Model(inputs=inputs, outputs=outputs)
    
    return model

# ============================================================
# MAIN
# ============================================================
def main():
    """Ana eğitim"""
    
    # Load data
    loader = MultiModalDataLoader(config.DATA_PATH)
    X, y = loader.load_all_data()
    
    # Split
    print("\n" + "=" * 60)
    print("✂️ SPLITTING DATA")
    print("=" * 60)
    
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, stratify=y, random_state=config.RANDOM_STATE
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.33, stratify=y_temp, random_state=config.RANDOM_STATE
    )
    
    print(f"✅ Train: {X_train.shape}")
    print(f"✅ Val: {X_val.shape}")
    print(f"✅ Test: {X_test.shape}")
    
    # Build model
    print("\n" + "=" * 60)
    print("🏗️ BUILDING MODEL")
    print("=" * 60)
    
    model = build_model(X_train.shape[1])
    
    model.compile(
        optimizer=Adam(learning_rate=config.LEARNING_RATE),
        loss='binary_crossentropy',
        metrics=['accuracy', 
                 tf.keras.metrics.Precision(),
                 tf.keras.metrics.Recall(),
                 tf.keras.metrics.AUC()]
    )
    
    print(f"✅ Model built! Parameters: {model.count_params():,}")
    model.summary()
    
    # Callbacks
    callbacks = [
        ModelCheckpoint(
            os.path.join(config.OUTPUT_PATH, 'best_model.h5'),
            save_best_only=True,
            monitor='val_accuracy',
            mode='max',
            verbose=1
        ),
        EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=5,
            min_lr=1e-7,
            verbose=1
        )
    ]
    
    # Train
    print("\n" + "=" * 60)
    print("🚀 STARTING TRAINING")
    print("=" * 60)
    
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=config.EPOCHS,
        batch_size=config.BATCH_SIZE,
        callbacks=callbacks,
        verbose=1
    )
    
    # Evaluate
    print("\n" + "=" * 60)
    print("📊 FINAL EVALUATION")
    print("=" * 60)
    
    test_results = model.evaluate(X_test, y_test, verbose=0)
    
    print(f"\n✅ Test Loss: {test_results[0]:.4f}")
    print(f"✅ Test Accuracy: {test_results[1]:.4f}")
    print(f"✅ Test Precision: {test_results[2]:.4f}")
    print(f"✅ Test Recall: {test_results[3]:.4f}")
    print(f"✅ Test AUC: {test_results[4]:.4f}")
    
    # Save
    model.save(os.path.join(config.OUTPUT_PATH, 'final_model.h5'))
    print(f"\n✅ Model saved to: {config.OUTPUT_PATH}")
    
    print("\n" + "=" * 60)
    print("🎉 TRAINING COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
