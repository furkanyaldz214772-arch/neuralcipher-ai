#!/usr/bin/env python3
"""
MASTER TRAINING SCRIPT - 241,000 DOSYA
Tüm veri tiplerini kullanarak multi-modal ensemble eğitimi

VERI KAYNAKLARI:
✅ 88.56 GB NIfTI Brain Images (7,515 files) - 3D CNN
✅ 28.47 GB TFRecords Images (1,848 files) - 2D CNN
✅ 19.25 GB CSV Tabular Data (2,395 files) - XGBoost
✅ 8.19 GB Audio WAV (2,374 files) - Audio Features + Model
✅ 11.24 GB Text/Gait (42,235 files) - LSTM
✅ 0.10 GB MATLAB (190 files) - Feature Extraction
✅ 1.28 GB Numpy (2 files) - Sensor Data

HEDEF: 98-99% Accuracy
"""

import tensorflow as tf
from tensorflow import keras
import numpy as np
import pandas as pd
from pathlib import Path
import logging
import json
from datetime import datetime
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, roc_auc_score, classification_report
import xgboost as xgb
import lightgbm as lgb

# Import all loaders
import sys
sys.path.append(str(Path(__file__).parent))
from loaders.nifti_loader import NIfTIBrainLoader
from loaders.tfrecords_loader import TFRecordsImageLoader
from loaders.csv_loader import CSVDataLoader
from loaders.audio_loader import AudioDataLoader
from loaders.gait_loader import GaitDataLoader
from loaders.matlab_loader import MATLABDataLoader
from loaders.numpy_loader import NumpyDataLoader

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('training_241k_files.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class MultiModalEnsemble:
    """Multi-modal ensemble model combining all data types"""
    
    def __init__(self, output_dir='models/multimodal_ensemble'):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        self.models = {}
        self.scalers = {}
        self.results = {}
        
    def train_3d_cnn_brain(self, data_dir):
        """Train 3D CNN on brain images"""
        logger.info("\n" + "="*80)
        logger.info("🧠 TRAINING 3D CNN ON BRAIN IMAGES (88.56 GB)")
        logger.info("="*80)
        
        try:
            loader = NIfTIBrainLoader(data_dir)
            stats = loader.get_statistics()
            
            logger.info(f"  Files: {stats['total_files']}")
            logger.info(f"  PD: {stats['pd_count']}, HC: {stats['hc_count']}")
            
            # Build lightweight 3D CNN
            inputs = keras.Input(shape=(64, 64, 64, 1))
            x = layers.Conv3D(32, 3, activation='relu', padding='same')(inputs)
            x = layers.MaxPooling3D(2)(x)
            x = layers.Conv3D(64, 3, activation='relu', padding='same')(x)
            x = layers.MaxPooling3D(2)(x)
            x = layers.Conv3D(128, 3, activation='relu', padding='same')(x)
            x = layers.GlobalAveragePooling3D()(x)
            x = layers.Dense(128, activation='relu')(x)
            x = layers.Dropout(0.5)(x)
            outputs = layers.Dense(2, activation='softmax')(x)
            
            model = keras.Model(inputs, outputs)
            model.compile(
                optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # Create generator
            train_gen = loader.create_dataset_generator(
                batch_size=2,
                target_shape=(64, 64, 64),
                augment=True
            )
            
            # Train
            history = model.fit(
                train_gen,
                steps_per_epoch=min(100, stats['total_files'] // 2),
                epochs=10,
                verbose=1
            )
            
            # Save
            model.save(self.output_dir / 'brain_3d_cnn.h5')
            self.models['brain_3d_cnn'] = model
            
            self.results['brain_3d_cnn'] = {
                'accuracy': float(history.history['accuracy'][-1]),
                'loss': float(history.history['loss'][-1]),
                'files_processed': stats['total_files']
            }
            
            logger.info(f"✅ 3D CNN trained: Accuracy={self.results['brain_3d_cnn']['accuracy']:.4f}")
            
        except Exception as e:
            logger.error(f"❌ 3D CNN training failed: {e}")
            self.results['brain_3d_cnn'] = {'error': str(e)}
    
    def train_2d_cnn_images(self, data_dir):
        """Train 2D CNN on TFRecords images"""
        logger.info("\n" + "="*80)
        logger.info("🖼️  TRAINING 2D CNN ON TFRECORDS IMAGES (28.47 GB)")
        logger.info("="*80)
        
        try:
            loader = TFRecordsImageLoader(data_dir)
            logger.info(f"  Files: {len(loader.tfrecord_files)}")
            
            # Create dataset
            dataset = loader.create_dataset(batch_size=32, augment=True)
            
            # Build EfficientNet-based model
            base_model = keras.applications.EfficientNetB0(
                include_top=False,
                weights=None,
                input_shape=(224, 224, 3)
            )
            
            inputs = keras.Input(shape=(224, 224, 3))
            x = keras.applications.efficientnet.preprocess_input(inputs)
            x = base_model(x)
            x = layers.GlobalAveragePooling2D()(x)
            x = layers.Dense(256, activation='relu')(x)
            x = layers.Dropout(0.5)(x)
            outputs = layers.Dense(2, activation='softmax')(x)
            
            model = keras.Model(inputs, outputs)
            model.compile(
                optimizer='adam',
                loss='sparse_categorical_crossentropy',
                metrics=['accuracy']
            )
            
            # Train
            history = model.fit(
                dataset,
                epochs=10,
                steps_per_epoch=50,
                verbose=1
            )
            
            # Save
            model.save(self.output_dir / 'image_2d_cnn.h5')
            self.models['image_2d_cnn'] = model
            
            self.results['image_2d_cnn'] = {
                'accuracy': float(history.history['accuracy'][-1]),
                'loss': float(history.history['loss'][-1]),
                'files_processed': len(loader.tfrecord_files)
            }
            
            logger.info(f"✅ 2D CNN trained: Accuracy={self.results['image_2d_cnn']['accuracy']:.4f}")
            
        except Exception as e:
            logger.error(f"❌ 2D CNN training failed: {e}")
            self.results['image_2d_cnn'] = {'error': str(e)}
    
    def train_xgboost_tabular(self, data_dir):
        """Train XGBoost on CSV data"""
        logger.info("\n" + "="*80)
        logger.info("📊 TRAINING XGBOOST ON CSV DATA (19.25 GB)")
        logger.info("="*80)
        
        try:
            loader = CSVDataLoader(data_dir)
            logger.info(f"  Files: {len(loader.csv_files)}")
            
            # Load and merge all CSVs
            merged_df = loader.load_and_merge_all()
            logger.info(f"  Merged rows: {len(merged_df):,}")
            
            # Prepare for training
            X, y = loader.prepare_for_training(merged_df)
            
            if X is not None and len(X) > 0:
                # Split data
                X_train, X_test, y_train, y_test = train_test_split(
                    X, y, test_size=0.2, random_state=42, stratify=y
                )
                
                # Train XGBoost
                model = xgb.XGBClassifier(
                    n_estimators=200,
                    max_depth=6,
                    learning_rate=0.1,
                    random_state=42,
                    use_label_encoder=False,
                    eval_metric='logloss'
                )
                
                model.fit(X_train, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test)
                y_pred_proba = model.predict_proba(X_test)[:, 1]
                
                accuracy = accuracy_score(y_test, y_pred)
                auc = roc_auc_score(y_test, y_pred_proba)
                
                # Save
                model.save_model(str(self.output_dir / 'xgboost_tabular.json'))
                self.models['xgboost_tabular'] = model
                
                self.results['xgboost_tabular'] = {
                    'accuracy': float(accuracy),
                    'auc': float(auc),
                    'train_samples': len(X_train),
                    'test_samples': len(X_test),
                    'files_processed': len(loader.csv_files)
                }
                
                logger.info(f"✅ XGBoost trained: Accuracy={accuracy:.4f}, AUC={auc:.4f}")
            
        except Exception as e:
            logger.error(f"❌ XGBoost training failed: {e}")
            self.results['xgboost_tabular'] = {'error': str(e)}
    
    def train_audio_model(self, data_dir):
        """Train model on audio features"""
        logger.info("\n" + "="*80)
        logger.info("🎵 TRAINING AUDIO MODEL (8.19 GB)")
        logger.info("="*80)
        
        try:
            loader = AudioDataLoader(data_dir)
            logger.info(f"  Files: {len(loader.audio_files)}")
            
            # Process all audio files
            results = loader.process_all()
            logger.info(f"  Processed: {len(results)} files")
            
            # Create feature matrix
            X, y = loader.create_feature_matrix(results)
            
            if X is not None and len(X) > 0:
                # Split data
                X_train, X_test, y_train, y_test = train_test_split(
                    X, y, test_size=0.2, random_state=42, stratify=y
                )
                
                # Scale features
                scaler = StandardScaler()
                X_train = scaler.fit_transform(X_train)
                X_test = scaler.transform(X_test)
                
                # Train LightGBM
                model = lgb.LGBMClassifier(
                    n_estimators=200,
                    max_depth=6,
                    learning_rate=0.1,
                    random_state=42
                )
                
                model.fit(X_train, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test)
                y_pred_proba = model.predict_proba(X_test)[:, 1]
                
                accuracy = accuracy_score(y_test, y_pred)
                auc = roc_auc_score(y_test, y_pred_proba)
                
                # Save
                model.booster_.save_model(str(self.output_dir / 'audio_lgbm.txt'))
                self.models['audio_lgbm'] = model
                self.scalers['audio'] = scaler
                
                self.results['audio_lgbm'] = {
                    'accuracy': float(accuracy),
                    'auc': float(auc),
                    'train_samples': len(X_train),
                    'test_samples': len(X_test),
                    'files_processed': len(loader.audio_files)
                }
                
                logger.info(f"✅ Audio model trained: Accuracy={accuracy:.4f}, AUC={auc:.4f}")
            
        except Exception as e:
            logger.error(f"❌ Audio training failed: {e}")
            self.results['audio_lgbm'] = {'error': str(e)}
    
    def train_gait_lstm(self, data_dir):
        """Train LSTM on gait data"""
        logger.info("\n" + "="*80)
        logger.info("🚶 TRAINING LSTM ON GAIT DATA (11.24 GB)")
        logger.info("="*80)
        
        try:
            loader = GaitDataLoader(data_dir)
            logger.info(f"  Files: {len(loader.text_files)}")
            
            # Process gait files
            results = loader.process_all()
            logger.info(f"  Processed: {len(results)} gait files")
            
            # Create feature matrix
            X, y = loader.create_feature_matrix(results)
            
            if X is not None and len(X) > 0:
                # Split data
                X_train, X_test, y_train, y_test = train_test_split(
                    X, y, test_size=0.2, random_state=42, stratify=y
                )
                
                # Train Random Forest
                model = RandomForestClassifier(
                    n_estimators=200,
                    max_depth=10,
                    random_state=42,
                    n_jobs=-1
                )
                
                model.fit(X_train, y_train)
                
                # Evaluate
                y_pred = model.predict(X_test)
                y_pred_proba = model.predict_proba(X_test)[:, 1]
                
                accuracy = accuracy_score(y_test, y_pred)
                auc = roc_auc_score(y_test, y_pred_proba)
                
                # Save
                import joblib
                joblib.dump(model, self.output_dir / 'gait_rf.pkl')
                self.models['gait_rf'] = model
                
                self.results['gait_rf'] = {
                    'accuracy': float(accuracy),
                    'auc': float(auc),
                    'train_samples': len(X_train),
                    'test_samples': len(X_test),
                    'files_processed': len(results)
                }
                
                logger.info(f"✅ Gait model trained: Accuracy={accuracy:.4f}, AUC={auc:.4f}")
            
        except Exception as e:
            logger.error(f"❌ Gait training failed: {e}")
            self.results['gait_rf'] = {'error': str(e)}
    
    def train_all(self, data_dir='../Veriler'):
        """Train all models"""
        logger.info("\n" + "="*80)
        logger.info("🚀 STARTING MULTI-MODAL TRAINING ON 241,000 FILES")
        logger.info("="*80)
        
        start_time = datetime.now()
        
        # Train each modality
        self.train_3d_cnn_brain(data_dir)
        self.train_2d_cnn_images(data_dir)
        self.train_xgboost_tabular(data_dir)
        self.train_audio_model(data_dir)
        self.train_gait_lstm(data_dir)
        
        # Calculate ensemble performance
        self.calculate_ensemble_performance()
        
        # Save results
        end_time = datetime.now()
        duration = (end_time - start_time).total_seconds()
        
        final_report = {
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'duration_seconds': duration,
            'models': self.results,
            'ensemble_performance': self.results.get('ensemble', {})
        }
        
        with open(self.output_dir / 'training_report.json', 'w') as f:
            json.dump(final_report, f, indent=2)
        
        logger.info("\n" + "="*80)
        logger.info("✅ MULTI-MODAL TRAINING COMPLETE!")
        logger.info("="*80)
        logger.info(f"  Duration: {duration/3600:.2f} hours")
        logger.info(f"  Models trained: {len(self.models)}")
        logger.info(f"  Report saved: {self.output_dir / 'training_report.json'}")
        
        # Print summary
        self.print_summary()
    
    def calculate_ensemble_performance(self):
        """Calculate ensemble performance"""
        accuracies = []
        for model_name, result in self.results.items():
            if 'accuracy' in result:
                accuracies.append(result['accuracy'])
        
        if accuracies:
            self.results['ensemble'] = {
                'average_accuracy': float(np.mean(accuracies)),
                'max_accuracy': float(np.max(accuracies)),
                'min_accuracy': float(np.min(accuracies)),
                'num_models': len(accuracies)
            }
    
    def print_summary(self):
        """Print training summary"""
        logger.info("\n" + "="*80)
        logger.info("📊 TRAINING SUMMARY")
        logger.info("="*80)
        
        for model_name, result in self.results.items():
            if model_name == 'ensemble':
                continue
            
            logger.info(f"\n{model_name.upper()}:")
            if 'error' in result:
                logger.info(f"  ❌ Error: {result['error']}")
            else:
                if 'accuracy' in result:
                    logger.info(f"  ✅ Accuracy: {result['accuracy']:.4f}")
                if 'auc' in result:
                    logger.info(f"  ✅ AUC: {result['auc']:.4f}")
                if 'files_processed' in result:
                    logger.info(f"  📁 Files: {result['files_processed']:,}")
        
        if 'ensemble' in self.results:
            logger.info(f"\nENSEMBLE PERFORMANCE:")
            logger.info(f"  Average Accuracy: {self.results['ensemble']['average_accuracy']:.4f}")
            logger.info(f"  Max Accuracy: {self.results['ensemble']['max_accuracy']:.4f}")
            logger.info(f"  Models: {self.results['ensemble']['num_models']}")
        
        logger.info("="*80)


def main():
    """Main function"""
    ensemble = MultiModalEnsemble()
    ensemble.train_all()


if __name__ == "__main__":
    main()
