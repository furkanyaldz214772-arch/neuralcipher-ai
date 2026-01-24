#!/usr/bin/env python3
"""
3D CNN Training for NIfTI Brain Images
88.56 GB - 7,515 files
HIGHEST PRIORITY - Brain MRI/fMRI Analysis
"""

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
from pathlib import Path
import logging
import json
from datetime import datetime

# Loaders
import sys
sys.path.append(str(Path(__file__).parent))
from loaders.nifti_loader import NIfTIBrainLoader

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Brain3DCNN:
    """3D CNN for brain MRI analysis"""
    
    def __init__(self, input_shape=(128, 128, 128, 1), num_classes=2):
        self.input_shape = input_shape
        self.num_classes = num_classes
        self.model = None
        
    def build_3d_resnet(self):
        """3D ResNet architecture"""
        inputs = keras.Input(shape=self.input_shape)
        
        # Initial conv
        x = layers.Conv3D(32, 3, padding='same')(inputs)
        x = layers.BatchNormalization()(x)
        x = layers.Activation('relu')(x)
        x = layers.MaxPooling3D(2)(x)
        
        # Residual blocks
        for filters in [64, 128, 256]:
            # Residual block
            shortcut = x
            
            x = layers.Conv3D(filters, 3, padding='same')(x)
            x = layers.BatchNormalization()(x)
            x = layers.Activation('relu')(x)
            
            x = layers.Conv3D(filters, 3, padding='same')(x)
            x = layers.BatchNormalization()(x)
            
            # Match dimensions for shortcut
            shortcut = layers.Conv3D(filters, 1, padding='same')(shortcut)
            shortcut = layers.BatchNormalization()(shortcut)
            
            x = layers.Add()([x, shortcut])
            x = layers.Activation('relu')(x)
            x = layers.MaxPooling3D(2)(x)
        
        # Global pooling and classification
        x = layers.GlobalAveragePooling3D()(x)
        x = layers.Dropout(0.5)(x)
        x = layers.Dense(256, activation='relu')(x)
        x = layers.Dropout(0.3)(x)
        outputs = layers.Dense(self.num_classes, activation='softmax')(x)
        
        model = keras.Model(inputs, outputs, name='Brain3DResNet')
        return model
    
    def build_3d_densenet(self):
        """3D DenseNet architecture"""
        inputs = keras.Input(shape=self.input_shape)
        
        # Initial conv
        x = layers.Conv3D(64, 7, strides=2, padding='same')(inputs)
        x = layers.BatchNormalization()(x)
        x = layers.Activation('relu')(x)
        x = layers.MaxPooling3D(3, strides=2, padding='same')(x)
        
        # Dense blocks
        for num_layers in [6, 12, 24]:
            # Dense block
            for _ in range(num_layers):
                conv = layers.BatchNormalization()(x)
                conv = layers.Activation('relu')(conv)
                conv = layers.Conv3D(32, 3, padding='same')(conv)
                x = layers.Concatenate()([x, conv])
            
            # Transition layer
            x = layers.BatchNormalization()(x)
            x = layers.Activation('relu')(x)
            x = layers.Conv3D(x.shape[-1] // 2, 1)(x)
            x = layers.AveragePooling3D(2)(x)
        
        # Classification
        x = layers.GlobalAveragePooling3D()(x)
        x = layers.Dropout(0.5)(x)
        outputs = layers.Dense(self.num_classes, activation='softmax')(x)
        
        model = keras.Model(inputs, outputs, name='Brain3DDenseNet')
        return model
    
    def compile_model(self, model, learning_rate=0.001):
        """Compile model"""
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate),
            loss='sparse_categorical_crossentropy',
            metrics=['accuracy', keras.metrics.AUC(name='auc')]
        )
        self.model = model
        return model


def train_3d_cnn():
    """Main training function"""
    logger.info("🧠 3D CNN Training for Brain Images")
    logger.info("=" * 80)
    
    # Configuration
    config = {
        'data_dir': '../Veriler',
        'output_dir': 'models/brain_3d_cnn',
        'batch_size': 4,  # Small batch for 3D data
        'epochs': 50,
        'target_shape': (128, 128, 128),
        'learning_rate': 0.0001,
        'architecture': 'resnet'  # or 'densenet'
    }
    
    # Create output directory
    output_dir = Path(config['output_dir'])
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Load data
    logger.info("📂 Loading NIfTI brain images...")
    loader = NIfTIBrainLoader(config['data_dir'])
    
    # Get statistics
    stats = loader.get_statistics()
    logger.info(f"📊 Dataset Statistics:")
    logger.info(f"  Total files: {stats['total_files']}")
    logger.info(f"  PD patients: {stats['pd_count']}")
    logger.info(f"  Healthy controls: {stats['hc_count']}")
    
    # Create data generator
    logger.info("🔄 Creating data generator...")
    train_gen = loader.create_dataset_generator(
        batch_size=config['batch_size'],
        target_shape=config['target_shape'],
        augment=True
    )
    
    # Build model
    logger.info(f"🏗️  Building 3D {config['architecture'].upper()} model...")
    brain_cnn = Brain3DCNN(
        input_shape=(*config['target_shape'], 1),
        num_classes=2
    )
    
    if config['architecture'] == 'resnet':
        model = brain_cnn.build_3d_resnet()
    else:
        model = brain_cnn.build_3d_densenet()
    
    model = brain_cnn.compile_model(model, config['learning_rate'])
    
    logger.info(f"📊 Model Summary:")
    model.summary()
    
    # Callbacks
    callbacks = [
        keras.callbacks.ModelCheckpoint(
            output_dir / 'best_model.h5',
            monitor='loss',
            save_best_only=True,
            verbose=1
        ),
        keras.callbacks.EarlyStopping(
            monitor='loss',
            patience=10,
            restore_best_weights=True,
            verbose=1
        ),
        keras.callbacks.ReduceLROnPlateau(
            monitor='loss',
            factor=0.5,
            patience=5,
            min_lr=1e-7,
            verbose=1
        ),
        keras.callbacks.CSVLogger(
            output_dir / 'training_log.csv'
        )
    ]
    
    # Calculate steps per epoch
    steps_per_epoch = stats['total_files'] // config['batch_size']
    
    # Train
    logger.info("🚀 Starting training...")
    logger.info(f"  Steps per epoch: {steps_per_epoch}")
    logger.info(f"  Total epochs: {config['epochs']}")
    
    history = model.fit(
        train_gen,
        steps_per_epoch=steps_per_epoch,
        epochs=config['epochs'],
        callbacks=callbacks,
        verbose=1
    )
    
    # Save final model
    model.save(output_dir / 'final_model.h5')
    logger.info(f"✅ Model saved to {output_dir}")
    
    # Save training history
    history_dict = {
        'loss': [float(x) for x in history.history['loss']],
        'accuracy': [float(x) for x in history.history['accuracy']],
        'auc': [float(x) for x in history.history['auc']]
    }
    
    with open(output_dir / 'history.json', 'w') as f:
        json.dump(history_dict, f, indent=2)
    
    # Save config
    config['training_date'] = datetime.now().isoformat()
    config['final_loss'] = float(history.history['loss'][-1])
    config['final_accuracy'] = float(history.history['accuracy'][-1])
    config['final_auc'] = float(history.history['auc'][-1])
    
    with open(output_dir / 'config.json', 'w') as f:
        json.dump(config, f, indent=2)
    
    logger.info("\n" + "=" * 80)
    logger.info("✅ 3D CNN TRAINING COMPLETE!")
    logger.info(f"  Final Loss: {config['final_loss']:.4f}")
    logger.info(f"  Final Accuracy: {config['final_accuracy']:.4f}")
    logger.info(f"  Final AUC: {config['final_auc']:.4f}")
    logger.info("=" * 80)


if __name__ == "__main__":
    train_3d_cnn()
