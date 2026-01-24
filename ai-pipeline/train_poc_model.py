#!/usr/bin/env python3
"""
POC Model Training - Proof of Concept
Train initial model with UCI dataset
"""

import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from sklearn.model_selection import train_test_split, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score
import json
from pathlib import Path
import matplotlib.pyplot as plt
import seaborn as sns

class POCModelTrainer:
    def __init__(self, data_path="data/processed/uci/parkinsons.csv"):
        self.data_path = Path(data_path)
        self.model = None
        self.scaler = StandardScaler()
        self.history = None
        
    def load_data(self):
        """Load UCI dataset"""
        print("=" * 60)
        print("LOADING DATA")
        print("=" * 60)
        
        df = pd.read_csv(self.data_path)
        
        # Remove name column
        if 'name' in df.columns:
            df = df.drop('name', axis=1)
        
        # Separate features and labels
        X = df.drop('status', axis=1).values
        y = df['status'].values
        
        print(f"\n✅ Data loaded successfully")
        print(f"   Total samples: {len(X)}")
        print(f"   Features: {X.shape[1]}")
        print(f"   Parkinson: {np.sum(y == 1)} ({np.mean(y)*100:.1f}%)")
        print(f"   Healthy: {np.sum(y == 0)} ({(1-np.mean(y))*100:.1f}%)")
        
        return X, y
    
    def prepare_data(self, X, y, test_size=0.2):
        """Split and normalize data"""
        print("\n" + "=" * 60)
        print("PREPARING DATA")
        print("=" * 60)
        
        # Train/test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        # Normalize
        X_train = self.scaler.fit_transform(X_train)
        X_test = self.scaler.transform(X_test)
        
        print(f"\n✅ Data prepared")
        print(f"   Training set: {X_train.shape[0]} samples")
        print(f"   Test set: {X_test.shape[0]} samples")
        print(f"   Train Parkinson: {np.sum(y_train == 1)} ({np.mean(y_train)*100:.1f}%)")
        print(f"   Test Parkinson: {np.sum(y_test == 1)} ({np.mean(y_test)*100:.1f}%)")
        
        return X_train, X_test, y_train, y_test
    
    def create_model(self, input_shape):
        """Create neural network model"""
        print("\n" + "=" * 60)
        print("CREATING MODEL")
        print("=" * 60)
        
        model = keras.Sequential([
            # Input layer
            keras.layers.Input(shape=(input_shape,)),
            
            # Hidden layer 1
            keras.layers.Dense(128, activation='relu'),
            keras.layers.BatchNormalization(),
            keras.layers.Dropout(0.3),
            
            # Hidden layer 2
            keras.layers.Dense(64, activation='relu'),
            keras.layers.BatchNormalization(),
            keras.layers.Dropout(0.3),
            
            # Hidden layer 3
            keras.layers.Dense(32, activation='relu'),
            keras.layers.BatchNormalization(),
            keras.layers.Dropout(0.2),
            
            # Hidden layer 4
            keras.layers.Dense(16, activation='relu'),
            
            # Output layer
            keras.layers.Dense(1, activation='sigmoid')
        ])
        
        # Compile
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=[
                'accuracy',
                keras.metrics.Precision(name='precision'),
                keras.metrics.Recall(name='recall'),
                keras.metrics.AUC(name='auc')
            ]
        )
        
        print("\n✅ Model created")
        print(f"   Total parameters: {model.count_params():,}")
        
        return model
    
    def train_model(self, X_train, y_train, X_val, y_val, epochs=100):
        """Train the model"""
        print("\n" + "=" * 60)
        print("TRAINING MODEL")
        print("=" * 60)
        
        # Callbacks
        early_stopping = keras.callbacks.EarlyStopping(
            monitor='val_loss',
            patience=15,
            restore_best_weights=True,
            verbose=1
        )
        
        reduce_lr = keras.callbacks.ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=7,
            min_lr=1e-6,
            verbose=1
        )
        
        # Train
        history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=epochs,
            batch_size=16,
            callbacks=[early_stopping, reduce_lr],
            verbose=1
        )
        
        print("\n✅ Training complete")
        
        return history
    
    def evaluate_model(self, X_test, y_test):
        """Evaluate model performance"""
        print("\n" + "=" * 60)
        print("EVALUATING MODEL")
        print("=" * 60)
        
        # Predictions
        y_pred_prob = self.model.predict(X_test, verbose=0)
        y_pred = (y_pred_prob > 0.5).astype(int).flatten()
        
        # Metrics
        test_loss, test_acc, test_prec, test_rec, test_auc = self.model.evaluate(
            X_test, y_test, verbose=0
        )
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        
        # Classification report
        report = classification_report(y_test, y_pred, output_dict=True)
        
        print(f"\n📊 Test Results:")
        print(f"   Accuracy:  {test_acc*100:.2f}%")
        print(f"   Precision: {test_prec*100:.2f}%")
        print(f"   Recall:    {test_rec*100:.2f}%")
        print(f"   F1-Score:  {report['1']['f1-score']*100:.2f}%")
        print(f"   AUC:       {test_auc:.4f}")
        
        print(f"\n📈 Confusion Matrix:")
        print(f"   True Negatives:  {cm[0][0]}")
        print(f"   False Positives: {cm[0][1]}")
        print(f"   False Negatives: {cm[1][0]}")
        print(f"   True Positives:  {cm[1][1]}")
        
        return {
            'accuracy': float(test_acc),
            'precision': float(test_prec),
            'recall': float(test_rec),
            'f1_score': float(report['1']['f1-score']),
            'auc': float(test_auc),
            'confusion_matrix': cm.tolist(),
            'classification_report': report
        }
    
    def cross_validate(self, X, y, n_splits=5):
        """Perform k-fold cross-validation"""
        print("\n" + "=" * 60)
        print("CROSS-VALIDATION")
        print("=" * 60)
        
        kfold = StratifiedKFold(n_splits=n_splits, shuffle=True, random_state=42)
        
        cv_scores = []
        
        for fold, (train_idx, val_idx) in enumerate(kfold.split(X, y), 1):
            print(f"\n📊 Fold {fold}/{n_splits}")
            
            X_train, X_val = X[train_idx], X[val_idx]
            y_train, y_val = y[train_idx], y[val_idx]
            
            # Normalize
            scaler = StandardScaler()
            X_train = scaler.fit_transform(X_train)
            X_val = scaler.transform(X_val)
            
            # Create and train model
            model = self.create_model(X_train.shape[1])
            
            history = model.fit(
                X_train, y_train,
                validation_data=(X_val, y_val),
                epochs=50,
                batch_size=16,
                verbose=0
            )
            
            # Evaluate
            _, acc, prec, rec, auc = model.evaluate(X_val, y_val, verbose=0)
            
            cv_scores.append({
                'accuracy': acc,
                'precision': prec,
                'recall': rec,
                'auc': auc
            })
            
            print(f"   Accuracy: {acc*100:.2f}%")
        
        # Average scores
        avg_scores = {
            'accuracy': np.mean([s['accuracy'] for s in cv_scores]),
            'precision': np.mean([s['precision'] for s in cv_scores]),
            'recall': np.mean([s['recall'] for s in cv_scores]),
            'auc': np.mean([s['auc'] for s in cv_scores])
        }
        
        print(f"\n✅ Cross-Validation Results:")
        print(f"   Average Accuracy:  {avg_scores['accuracy']*100:.2f}%")
        print(f"   Average Precision: {avg_scores['precision']*100:.2f}%")
        print(f"   Average Recall:    {avg_scores['recall']*100:.2f}%")
        print(f"   Average AUC:       {avg_scores['auc']:.4f}")
        
        return cv_scores, avg_scores
    
    def save_model(self, output_dir="models/poc"):
        """Save trained model"""
        output_path = Path(output_dir)
        output_path.mkdir(parents=True, exist_ok=True)
        
        # Save model
        model_path = output_path / "poc_model.h5"
        self.model.save(str(model_path))
        
        # Save scaler
        import joblib
        scaler_path = output_path / "scaler.pkl"
        joblib.dump(self.scaler, str(scaler_path))
        
        print(f"\n✅ Model saved:")
        print(f"   Model: {model_path}")
        print(f"   Scaler: {scaler_path}")
        
        return model_path, scaler_path
    
    def run_full_training(self):
        """Run complete training pipeline"""
        print("\n" + "=" * 60)
        print("POC MODEL TRAINING - FULL PIPELINE")
        print("=" * 60)
        
        # Load data
        X, y = self.load_data()
        
        # Prepare data
        X_train, X_test, y_train, y_test = self.prepare_data(X, y)
        
        # Create model
        self.model = self.create_model(X_train.shape[1])
        
        # Train model
        self.history = self.train_model(
            X_train, y_train, X_test, y_test, epochs=100
        )
        
        # Evaluate model
        results = self.evaluate_model(X_test, y_test)
        
        # Cross-validation
        cv_scores, avg_cv_scores = self.cross_validate(X, y)
        
        # Save model
        model_path, scaler_path = self.save_model()
        
        # Save results
        results_data = {
            'test_results': results,
            'cv_results': {
                'individual_folds': cv_scores,
                'average': avg_cv_scores
            },
            'model_path': str(model_path),
            'scaler_path': str(scaler_path)
        }
        
        results_path = Path("models/poc/training_results.json")
        with open(results_path, 'w') as f:
            json.dump(results_data, f, indent=2)
        
        print(f"\n✅ Results saved: {results_path}")
        
        print("\n" + "=" * 60)
        print("🎉 POC MODEL TRAINING COMPLETE!")
        print("=" * 60)
        
        return results_data

if __name__ == "__main__":
    trainer = POCModelTrainer()
    results = trainer.run_full_training()
    
    print("\n📊 FINAL SUMMARY:")
    print(f"   Test Accuracy: {results['test_results']['accuracy']*100:.2f}%")
    print(f"   CV Accuracy:   {results['cv_results']['average']['accuracy']*100:.2f}%")
    print(f"   Model saved:   {results['model_path']}")
