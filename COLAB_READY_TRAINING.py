"""
🚀 GOOGLE COLAB - TEK KOMUT EĞİTİM
===================================
Bu kodu direkt Google Colab'a yapıştır ve çalıştır!
"""

# ============================================================
# ADIM 1: KURULUM
# ============================================================
print("🔧 Installing dependencies...")
import subprocess
import sys

try:
    import librosa
except:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "-q", "librosa"])
    print("✅ librosa installed")

# ============================================================
# ADIM 2: GOOGLE DRIVE MOUNT
# ============================================================
print("\n📂 Mounting Google Drive...")
try:
    from google.colab import drive
    import os
    if not os.path.exists('/content/drive'):
        drive.mount('/content/drive')
        print("✅ Drive mounted")
    else:
        print("✅ Drive already mounted")
except:
    print("⚠️ Not in Colab, skipping drive mount")

# ============================================================
# ADIM 3: EĞİTİM KODU
# ============================================================
print("\n" + "=" * 60)
print("🚀 NEURALCIPHER - GERÇEK VERİ EĞİTİMİ")
print("=" * 60)

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.layers import Input, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
import glob
import os

# Config
class Config:
    DATA_PATH = "/content/drive/MyDrive/Veriler/"
    OUTPUT_PATH = "/content/drive/MyDrive/NeuralCipher_Output/"
    BATCH_SIZE = 32
    EPOCHS = 50
    LEARNING_RATE = 0.001
    RANDOM_STATE = 42

config = Config()
os.makedirs(config.OUTPUT_PATH, exist_ok=True)

print(f"\n⚙️ Configuration:")
print(f"📂 Data: {config.DATA_PATH}")
print(f"💾 Output: {config.OUTPUT_PATH}")
print(f"🔄 Epochs: {config.EPOCHS}")

# GPU Setup
gpus = tf.config.list_physical_devices('GPU')
if gpus:
    for gpu in gpus:
        tf.config.experimental.set_memory_growth(gpu, True)
    print(f"✅ GPU: {len(gpus)} device(s)")
else:
    print("⚠️ No GPU, using CPU")

# Data Loader
class DataLoader:
    def __init__(self, data_path):
        self.data_path = data_path
        self.scaler = StandardScaler()
    
    def load_csv_data(self):
        print("\n🔍 Searching for CSV files...")
        csv_files = glob.glob(os.path.join(self.data_path, "**/*.csv"), recursive=True)
        
        # Öncelikli dosyalar
        priority_files = [
            'parkinsons.data',
            'parkinsons.csv', 
            'parkinsons_updrs.csv',
            'Parkinson_Sample_100.csv',
            'Parkinson_Sample_500.csv'
        ]
        
        all_data = []
        for priority in priority_files:
            for csv_file in csv_files:
                if priority in os.path.basename(csv_file):
                    try:
                        df = pd.read_csv(csv_file)
                        if len(df) > 0:
                            all_data.append(df)
                            print(f"✅ {os.path.basename(csv_file)}: {len(df)} rows")
                    except:
                        continue
        
        if all_data:
            combined = pd.concat(all_data, ignore_index=True)
            print(f"\n✅ Total: {len(combined)} rows")
            return combined
        return None
    
    def create_sample_data(self, n=1000):
        print("\n🔧 Creating sample data...")
        X = np.random.randn(n, 22).astype(np.float32)
        y = np.random.randint(0, 2, n)
        print(f"✅ Sample: {X.shape}")
        return X, y
    
    def load_all(self):
        print("\n" + "=" * 60)
        print("📥 LOADING DATA")
        print("=" * 60)
        
        csv_data = self.load_csv_data()
        
        if csv_data is not None:
            # Status column'u bul
            status_col = None
            for col in ['status', 'Status', 'label', 'Label', 'class', 'Class']:
                if col in csv_data.columns:
                    status_col = col
                    break
            
            if status_col:
                X = csv_data.drop([status_col, 'name', 'Name'], axis=1, errors='ignore').values
                y = csv_data[status_col].values
                
                X = self.scaler.fit_transform(X)
                
                print(f"\n✅ Data loaded!")
                print(f"📊 Shape: {X.shape}")
                print(f"🏷️ PD: {np.sum(y)}, HC: {len(y) - np.sum(y)}")
                return X, y
        
        print("\n⚠️ No CSV data found, using sample data")
        return self.create_sample_data()

# Model
def build_model(input_dim):
    inputs = Input(shape=(input_dim,))
    
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
    
    outputs = Dense(1, activation='sigmoid')(x)
    
    return models.Model(inputs=inputs, outputs=outputs)

# Main Training
def main():
    # Load
    loader = DataLoader(config.DATA_PATH)
    X, y = loader.load_all()
    
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
    
    # Build
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
    
    print(f"✅ Parameters: {model.count_params():,}")
    
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
    print("🚀 TRAINING")
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
    print("📊 RESULTS")
    print("=" * 60)
    
    results = model.evaluate(X_test, y_test, verbose=0)
    
    print(f"\n✅ Test Loss: {results[0]:.4f}")
    print(f"✅ Test Accuracy: {results[1]:.4f}")
    print(f"✅ Test Precision: {results[2]:.4f}")
    print(f"✅ Test Recall: {results[3]:.4f}")
    print(f"✅ Test AUC: {results[4]:.4f}")
    
    # Save
    model.save(os.path.join(config.OUTPUT_PATH, 'final_model.h5'))
    print(f"\n💾 Saved: {config.OUTPUT_PATH}")
    
    print("\n" + "=" * 60)
    print("🎉 COMPLETE!")
    print("=" * 60)

# Run
if __name__ == "__main__":
    main()
