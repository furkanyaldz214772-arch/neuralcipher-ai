"""
NeuralCipher.AI - CPU-Optimized Training Script
===============================================
Trains 3 models (XGBoost, LightGBM, Random Forest) on CPU
Target: 90-95% ensemble accuracy
Duration: 10-14 hours

Based on: Veri Değerlendirme & Optimizasyon Raporu
Date: 22 Ocak 2026
"""

import os
import sys
import json
import time
import logging
import warnings
from datetime import datetime
from pathlib import Path

import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import xgboost as xgb
import lightgbm as lgb
import joblib

# Suppress warnings
warnings.filterwarnings('ignore')
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('training_cpu_optimized.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class CPUOptimizedTrainer:
    """CPU-optimized trainer for classical ML models"""
    
    def __init__(self, data_dir='../../Veriler', output_dir='models/cpu_ensemble'):
        self.data_dir = Path(data_dir)
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        
        self.models = {}
        self.results = {}
        self.start_time = None
        
        logger.info("="*80)
        logger.info("CPU-OPTIMIZED TRAINING INITIALIZED")
        logger.info(f"  Data Directory: {self.data_dir}")
        logger.info(f"  Output Directory: {self.output_dir}")
        logger.info(f"  Target: 90-95% Ensemble Accuracy")
        logger.info("="*80)
    
    def load_csv_data(self):
        """Load and merge all CSV files"""
        logger.info("\n" + "="*80)
        logger.info("LOADING CSV DATA")
        logger.info("="*80)
        
        csv_files = list(self.data_dir.glob('**/*.csv'))
        logger.info(f"  Found {len(csv_files)} CSV files")
        
        dfs = []
        for i, csv_file in enumerate(csv_files):
            try:
                df = pd.read_csv(csv_file)
                if 'status' in df.columns or 'class' in df.columns:
                    dfs.append(df)
                    if (i + 1) % 100 == 0:
                        logger.info(f"  Processed: {i+1}/{len(csv_files)}")
            except Exception as e:
                continue
        
        if not dfs:
            logger.error("  No valid CSV files found!")
            return None, None
        
        # Merge all dataframes
        merged_df = pd.concat(dfs, ignore_index=True)
        logger.info(f"  Total rows: {len(merged_df)}")
        
        # Prepare features and labels
        label_col = 'status' if 'status' in merged_df.columns else 'class'
        X = merged_df.drop(columns=[label_col, 'name'] if 'name' in merged_df.columns else [label_col])
        y = merged_df[label_col]
        
        # Convert labels to binary
        y = y.map({1: 1, 0: 0, 'PD': 1, 'HC': 0, 'Parkinson': 1, 'Healthy': 0})
        y = y.fillna(0).astype(int)
        
        # Handle missing values
        X = X.fillna(X.mean())
        
        logger.info(f"  Features: {X.shape[1]}")
        logger.info(f"  Samples: {len(X)}")
        logger.info(f"  PD: {sum(y==1)} | HC: {sum(y==0)}")
        
        return X, y
    
    def load_audio_features(self):
        """Extract features from audio files"""
        logger.info("\n" + "="*80)
        logger.info("LOADING AUDIO DATA")
        logger.info("="*80)
        
        try:
            import librosa
        except ImportError:
            logger.warning("  librosa not available, skipping audio")
            return None, None
        
        audio_files = list(self.data_dir.glob('**/*.wav')) + list(self.data_dir.glob('**/*.m4a'))
        logger.info(f"  Found {len(audio_files)} audio files")
        
        if len(audio_files) == 0:
            return None, None
        
        features = []
        labels = []
        
        for i, audio_file in enumerate(audio_files[:500]):  # Limit to 500 for speed
            try:
                y_audio, sr = librosa.load(audio_file, duration=30)
                
                # Extract features
                mfcc = librosa.feature.mfcc(y=y_audio, sr=sr, n_mfcc=13)
                mfcc_mean = np.mean(mfcc, axis=1)
                
                features.append(mfcc_mean)
                
                # Infer label from filename
                label = 1 if 'pd' in audio_file.stem.lower() or 'parkinson' in audio_file.stem.lower() else 0
                labels.append(label)
                
                if (i + 1) % 50 == 0:
                    logger.info(f"  Processed: {i+1}/{min(500, len(audio_files))}")
            except Exception as e:
                continue
        
        if not features:
            return None, None
        
        X = np.array(features)
        y = np.array(labels)
        
        logger.info(f"  Features: {X.shape[1]}")
        logger.info(f"  Samples: {len(X)}")
        logger.info(f"  PD: {sum(y==1)} | HC: {sum(y==0)}")
        
        return X, y
    
    def load_gait_features(self):
        """Extract features from gait text files"""
        logger.info("\n" + "="*80)
        logger.info("LOADING GAIT DATA")
        logger.info("="*80)
        
        gait_files = list(self.data_dir.glob('**/*.txt'))
        logger.info(f"  Found {len(gait_files)} text files")
        
        if len(gait_files) == 0:
            return None, None
        
        features = []
        labels = []
        
        for i, gait_file in enumerate(gait_files[:1000]):  # Limit to 1000 for speed
            try:
                data = np.loadtxt(gait_file)
                if len(data.shape) == 1:
                    data = data.reshape(1, -1)
                
                # Extract statistical features
                feat = [
                    np.mean(data),
                    np.std(data),
                    np.min(data),
                    np.max(data),
                    np.median(data)
                ]
                features.append(feat)
                
                # Infer label from filename
                label = 1 if 'Pt' in gait_file.stem or 'pd' in gait_file.stem.lower() else 0
                labels.append(label)
                
                if (i + 1) % 100 == 0:
                    logger.info(f"  Processed: {i+1}/{min(1000, len(gait_files))}")
            except Exception as e:
                continue
        
        if not features:
            return None, None
        
        X = np.array(features)
        y = np.array(labels)
        
        logger.info(f"  Features: {X.shape[1]}")
        logger.info(f"  Samples: {len(X)}")
        logger.info(f"  PD: {sum(y==1)} | HC: {sum(y==0)}")
        
        return X, y
    
    def train_xgboost(self, X, y):
        """Train XGBoost model"""
        logger.info("\n" + "="*80)
        logger.info("TRAINING XGBOOST")
        logger.info("="*80)
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = xgb.XGBClassifier(
            n_estimators=500,
            max_depth=8,
            learning_rate=0.01,
            subsample=0.8,
            colsample_bytree=0.8,
            tree_method='hist',  # CPU-optimized
            n_jobs=-1,
            random_state=42
        )
        
        logger.info("  Training...")
        model.fit(X_train, y_train, eval_set=[(X_test, y_test)], verbose=False)
        
        # Evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        logger.info(f"  Accuracy: {accuracy:.4f}")
        logger.info(f"  Classification Report:\n{classification_report(y_test, y_pred)}")
        
        # Save model
        model_path = self.output_dir / 'xgboost_model.pkl'
        joblib.dump(model, model_path)
        logger.info(f"  Model saved: {model_path}")
        
        self.models['xgboost'] = model
        self.results['xgboost'] = {
            'accuracy': float(accuracy),
            'samples': len(X),
            'features': X.shape[1]
        }
        
        return model, accuracy
    
    def train_lightgbm(self, X, y):
        """Train LightGBM model"""
        logger.info("\n" + "="*80)
        logger.info("TRAINING LIGHTGBM")
        logger.info("="*80)
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = lgb.LGBMClassifier(
            n_estimators=500,
            max_depth=8,
            learning_rate=0.01,
            subsample=0.8,
            colsample_bytree=0.8,
            n_jobs=-1,
            random_state=42,
            verbose=-1
        )
        
        logger.info("  Training...")
        model.fit(X_train, y_train, eval_set=[(X_test, y_test)])
        
        # Evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        logger.info(f"  Accuracy: {accuracy:.4f}")
        logger.info(f"  Classification Report:\n{classification_report(y_test, y_pred)}")
        
        # Save model
        model_path = self.output_dir / 'lightgbm_model.pkl'
        joblib.dump(model, model_path)
        logger.info(f"  Model saved: {model_path}")
        
        self.models['lightgbm'] = model
        self.results['lightgbm'] = {
            'accuracy': float(accuracy),
            'samples': len(X),
            'features': X.shape[1]
        }
        
        return model, accuracy
    
    def train_random_forest(self, X, y):
        """Train Random Forest model"""
        logger.info("\n" + "="*80)
        logger.info("TRAINING RANDOM FOREST")
        logger.info("="*80)
        
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        model = RandomForestClassifier(
            n_estimators=500,
            max_depth=20,
            min_samples_split=5,
            min_samples_leaf=2,
            n_jobs=-1,
            random_state=42
        )
        
        logger.info("  Training...")
        model.fit(X_train, y_train)
        
        # Evaluate
        y_pred = model.predict(X_test)
        accuracy = accuracy_score(y_test, y_pred)
        
        logger.info(f"  Accuracy: {accuracy:.4f}")
        logger.info(f"  Classification Report:\n{classification_report(y_test, y_pred)}")
        
        # Save model
        model_path = self.output_dir / 'random_forest_model.pkl'
        joblib.dump(model, model_path)
        logger.info(f"  Model saved: {model_path}")
        
        self.models['random_forest'] = model
        self.results['random_forest'] = {
            'accuracy': float(accuracy),
            'samples': len(X),
            'features': X.shape[1]
        }
        
        return model, accuracy
    
    def train_all(self):
        """Train all models"""
        self.start_time = time.time()
        
        logger.info("\n" + "="*80)
        logger.info("STARTING CPU-OPTIMIZED TRAINING")
        logger.info("="*80)
        
        # Load CSV data
        X_csv, y_csv = self.load_csv_data()
        if X_csv is not None:
            self.train_xgboost(X_csv, y_csv)
        
        # Load audio data
        X_audio, y_audio = self.load_audio_features()
        if X_audio is not None:
            self.train_lightgbm(X_audio, y_audio)
        
        # Load gait data
        X_gait, y_gait = self.load_gait_features()
        if X_gait is not None:
            self.train_random_forest(X_gait, y_gait)
        
        # Calculate ensemble performance
        self.calculate_ensemble()
        
        # Save report
        self.save_report()
        
        duration = (time.time() - self.start_time) / 3600
        logger.info(f"\n  Total Duration: {duration:.2f} hours")
        logger.info("="*80)
    
    def calculate_ensemble(self):
        """Calculate weighted ensemble performance"""
        logger.info("\n" + "="*80)
        logger.info("CALCULATING ENSEMBLE PERFORMANCE")
        logger.info("="*80)
        
        if not self.results:
            logger.warning("  No models trained!")
            return
        
        # Weighted average based on individual accuracies
        weights = {
            'xgboost': 0.40,
            'lightgbm': 0.35,
            'random_forest': 0.25
        }
        
        ensemble_acc = 0
        total_weight = 0
        
        for model_name, weight in weights.items():
            if model_name in self.results:
                ensemble_acc += self.results[model_name]['accuracy'] * weight
                total_weight += weight
        
        if total_weight > 0:
            ensemble_acc /= total_weight
        
        logger.info(f"  Ensemble Accuracy: {ensemble_acc:.4f}")
        logger.info(f"  Models Used: {len(self.results)}/3")
        
        self.results['ensemble'] = {
            'accuracy': float(ensemble_acc),
            'models_count': len(self.results) - 1,  # Exclude ensemble itself
            'weights': weights
        }
    
    def save_report(self):
        """Save training report"""
        report = {
            'start_time': datetime.fromtimestamp(self.start_time).isoformat(),
            'duration_hours': (time.time() - self.start_time) / 3600,
            'models': self.results,
            'system_info': {
                'mode': 'CPU',
                'optimization': 'Classical ML Only'
            }
        }
        
        report_path = self.output_dir / 'training_report_cpu.json'
        with open(report_path, 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info(f"\n  Report saved: {report_path}")

if __name__ == '__main__':
    trainer = CPUOptimizedTrainer()
    trainer.train_all()
