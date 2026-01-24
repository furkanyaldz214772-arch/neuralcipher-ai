"""
🧠 NEURALCIPHER 3D CNN TRAINING SYSTEM - COMPLETE VERSION
=========================================================
Tam çalışır 3D CNN eğitim sistemi - Tüm hatalar düzeltildi
"""

import os
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers, models
from tensorflow.keras.layers import Input, Conv3D, MaxPooling3D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau, TensorBoard
from tensorflow.keras.metrics import Precision, Recall, AUC
from sklearn.model_selection import train_test_split
import nibabel as nib
from datetime import datetime
import glob

print("=" * 60)
print("🚀 NEURALCIPHER 3D CNN TRAINING SYSTEM")
print("=" * 60)

# ============================================================
# 1. CONFIGURATION
# ============================================================
class Config:
    # Paths
    DATA_PATH = "/content/drive/MyDrive/Veriler/"
    OUTPUT_PATH = "/content/drive/MyDrive/NeuralCipher_3D_CNN_Output/"
    
    # Model parameters
    TARGET_SHAPE = (64, 64, 64)
    BATCH_SIZE = 4
    EPOCHS = 50
    LEARNING_RATE = 0.0001
    
    # Training parameters
    VALIDATION_SPLIT = 0.2
    TEST_SPLIT = 0.1
    RANDOM_STATE = 42

config = Config()

print("\n⚙️ CONFIGURATION")
print("=" * 60)
print(f"📂 Data Path: {config.DATA_PATH}")
print(f"💾 Output Path: {config.OUTPUT_PATH}")
print(f"🎯 Target Shape: {config.TARGET_SHAPE}")
print(f"📦 Batch Size: {config.BATCH_SIZE}")
print(f"🔄 Epochs: {config.EPOCHS}")
print(f"📊 Learning Rate: {config.LEARNING_RATE}")
print("=" * 60)

# ============================================================
# 2. SETUP ENVIRONMENT
# ============================================================
print("\n📦 SETTING UP ENVIRONMENT")
print("=" * 60)

# Mount Google Drive (only if not mounted)
try:
    from google.colab import drive
    if not os.path.exists('/content/drive'):
        drive.mount('/content/drive')
        print("✅ Google Drive mounted")
    else:
        print("✅ Google Drive already mounted")
except:
    print("⚠️ Not running in Colab, skipping drive mount")

# Create output directory
os.makedirs(config.OUTPUT_PATH, exist_ok=True)
print(f"✅ Output directory ready: {config.OUTPUT_PATH}")

# GPU Setup
print(f"\n📦 TensorFlow Version: {tf.__version__}")
gpus = tf.config.list_physical_devices('GPU')
print(f"🎮 GPU Devices: {gpus}")

if gpus:
    try:
        for gpu in gpus:
            tf.config.experimental.set_memory_growth(gpu, True)
        print(f"✅ GPU Memory Growth: Enabled for {len(gpus)} GPU(s)")
        
        # Mixed precision
        policy = tf.keras.mixed_precision.Policy('mixed_float16')
        tf.keras.mixed_precision.set_global_policy(policy)
        print("✅ Mixed Precision: Enabled (float16)")
    except RuntimeError as e:
        print(f"⚠️ GPU setup warning: {e}")
else:
    print("⚠️ No GPU found, using CPU")

print("=" * 60)

# ============================================================
# 3. DATA LOADER
# ============================================================
class NIfTIDataLoader:
    """NIfTI dosyalarını yükleyen ve işleyen sınıf"""
    
    def __init__(self, data_path, target_shape=(64, 64, 64)):
        self.data_path = data_path
        self.target_shape = target_shape
        
    def find_nifti_files(self):
        """NIfTI dosyalarını bul"""
        patterns = [
            '**/*.nii',
            '**/*.nii.gz',
            '**/sub-*/anat/*.nii.gz',
            '**/I*/**/*.nii',
            '**/I*/**/*.nii.gz'
        ]
        
        files = []
        for pattern in patterns:
            found = glob.glob(os.path.join(self.data_path, pattern), recursive=True)
            files.extend(found)
        
        return list(set(files))  # Remove duplicates
    
    def load_nifti(self, filepath):
        """Tek bir NIfTI dosyasını yükle"""
        try:
            img = nib.load(filepath)
            data = img.get_fdata()
            
            # Normalize
            data = (data - np.mean(data)) / (np.std(data) + 1e-8)
            
            # Resize to target shape
            from scipy.ndimage import zoom
            zoom_factors = [t / s for t, s in zip(self.target_shape, data.shape)]
            data = zoom(data, zoom_factors, order=1)
            
            return data
        except Exception as e:
            print(f"⚠️ Error loading {filepath}: {e}")
            return None
    
    def determine_label(self, filepath):
        """Dosya yolundan label belirle"""
        filepath_lower = filepath.lower()
        
        # PD indicators
        pd_indicators = ['pd', 'parkinson', 'patient', 'pt']
        # HC indicators
        hc_indicators = ['hc', 'control', 'healthy', 'co']
        
        for indicator in pd_indicators:
            if indicator in filepath_lower:
                return 1  # Parkinson's
        
        for indicator in hc_indicators:
            if indicator in filepath_lower:
                return 0  # Healthy Control
        
        # Default: assume healthy if unclear
        return 0
    
    def load_all_data(self):
        """Tüm verileri yükle"""
        print("\n🔍 Scanning for NIfTI files...")
        files = self.find_nifti_files()
        print(f"✅ Found {len(files)} NIfTI files")
        
        if len(files) == 0:
            print("\n⚠️ NO NIFTI FILES FOUND!")
            print("📍 Searching in:", self.data_path)
            print("\n💡 ÇÖZÜM:")
            print("1. NIfTI dosyası yok, test verisi oluşturuluyor")
            print("2. Gerçek veri için train_with_existing_data.py kullan")
            print("3. Veya NIfTI dosyalarını Veriler/ klasörüne ekle")
            
            # Create sample data for testing
            print("\n🔧 TEST VERİSİ OLUŞTURULUYOR...")
            print("✅ 100 sample 3D MRI verisi oluşturulacak")
            return self.create_sample_data(n_samples=100)
        
        X_list = []
        y_list = []
        
        print(f"\n📥 Loading {len(files)} files...")
        for i, filepath in enumerate(files):
            if i % 10 == 0:
                print(f"Progress: {i}/{len(files)}")
            
            data = self.load_nifti(filepath)
            if data is not None:
                label = self.determine_label(filepath)
                X_list.append(data)
                y_list.append(label)
        
        X = np.array(X_list)
        y = np.array(y_list)
        
        # Add channel dimension
        X = np.expand_dims(X, axis=-1)
        
        print(f"\n✅ Data loaded!")
        print(f"📊 Data shape: {X.shape}")
        print(f"🏷️ Labels shape: {y.shape}")
        print(f"📈 PD: {np.sum(y)}, HC: {len(y) - np.sum(y)}")
        
        return X, y
    
    def create_sample_data(self, n_samples=20):
        """Test için örnek veri oluştur"""
        print("Creating sample synthetic data...")
        
        X = np.random.randn(n_samples, *self.target_shape, 1).astype(np.float32)
        y = np.random.randint(0, 2, n_samples)
        
        print(f"✅ Sample data created!")
        print(f"📊 Data shape: {X.shape}")
        print(f"🏷️ Labels shape: {y.shape}")
        print(f"📈 PD: {np.sum(y)}, HC: {len(y) - np.sum(y)}")
        
        return X, y

# ============================================================
# 4. MODEL ARCHITECTURE
# ============================================================
def build_3d_cnn(input_shape=(64, 64, 64, 1)):
    """3D CNN modelini oluştur"""
    
    inputs = Input(shape=input_shape)
    
    # Block 1
    x = Conv3D(32, (3, 3, 3), activation='relu', padding='same')(inputs)
    x = BatchNormalization()(x)
    x = MaxPooling3D((2, 2, 2))(x)
    x = Dropout(0.2)(x)
    
    # Block 2
    x = Conv3D(64, (3, 3, 3), activation='relu', padding='same')(x)
    x = BatchNormalization()(x)
    x = MaxPooling3D((2, 2, 2))(x)
    x = Dropout(0.3)(x)
    
    # Block 3
    x = Conv3D(128, (3, 3, 3), activation='relu', padding='same')(x)
    x = BatchNormalization()(x)
    x = MaxPooling3D((2, 2, 2))(x)
    x = Dropout(0.4)(x)
    
    # Dense layers
    x = Flatten()(x)
    x = Dense(256, activation='relu')(x)
    x = Dropout(0.5)(x)
    x = Dense(128, activation='relu')(x)
    x = Dropout(0.5)(x)
    
    # Output
    outputs = Dense(1, activation='sigmoid', dtype='float32')(x)
    
    model = models.Model(inputs=inputs, outputs=outputs)
    
    return model

# ============================================================
# 5. MAIN TRAINING PIPELINE
# ============================================================
def main():
    """Ana eğitim pipeline'ı"""
    
    # Load data
    print("\n" + "=" * 60)
    print("📦 INITIALIZING DATA LOADER")
    print("=" * 60)
    
    loader = NIfTIDataLoader(config.DATA_PATH, config.TARGET_SHAPE)
    X, y = loader.load_all_data()
    
    # Split data
    print("\n" + "=" * 60)
    print("✂️ SPLITTING DATA")
    print("=" * 60)
    
    X_train, X_temp, y_train, y_temp = train_test_split(
        X, y, test_size=0.3, stratify=y, random_state=config.RANDOM_STATE
    )
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.33, stratify=y_temp, random_state=config.RANDOM_STATE
    )
    
    print(f"✅ Train: {X_train.shape}, Val: {X_val.shape}, Test: {X_test.shape}")
    
    # Build model
    print("\n" + "=" * 60)
    print("🏗️ BUILDING MODEL")
    print("=" * 60)
    
    model = build_3d_cnn(input_shape=(*config.TARGET_SHAPE, 1))
    
    # Compile
    model.compile(
        optimizer=Adam(learning_rate=config.LEARNING_RATE),
        loss='binary_crossentropy',
        metrics=['accuracy', Precision(), Recall(), AUC()]
    )
    
    print(f"✅ Model built! Parameters: {model.count_params():,}")
    
    # Callbacks
    callbacks = [
        ModelCheckpoint(
            os.path.join(config.OUTPUT_PATH, 'best_model.h5'),
            save_best_only=True,
            monitor='val_accuracy',
            mode='max'
        ),
        EarlyStopping(
            monitor='val_loss',
            patience=10,
            restore_best_weights=True
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=5,
            min_lr=1e-7
        ),
        TensorBoard(
            log_dir=os.path.join(config.OUTPUT_PATH, 'logs')
        )
    ]
    
    print("✅ Callbacks configured")
    
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
    print(f"\n✅ Test Accuracy: {test_results[1]:.4f}")
    print(f"✅ Test Loss: {test_results[0]:.4f}")
    
    # Save final model
    model.save(os.path.join(config.OUTPUT_PATH, 'final_model.h5'))
    print(f"\n✅ Model saved to: {config.OUTPUT_PATH}")
    
    print("\n" + "=" * 60)
    print("🎉 TRAINING COMPLETE!")
    print("=" * 60)

if __name__ == "__main__":
    main()
