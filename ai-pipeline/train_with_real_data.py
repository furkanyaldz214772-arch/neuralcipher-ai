#!/usr/bin/env python3
"""
Train Model with Real UCI Parkinson's Dataset
Uses actual patient data instead of synthetic data
"""
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
import joblib
from pathlib import Path
import json
from datetime import datetime

# Directories
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data" / "raw"
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

MODEL_VERSION = "v1.0"
MODEL_NAME = f"neuralcipher_{MODEL_VERSION}"

print("=" * 70)
print("🧬 NEURALCIPHER.AI - REAL DATA MODEL TRAINING")
print("=" * 70)
print()

def load_uci_dataset():
    """Load UCI Parkinson's Dataset"""
    print("📊 Loading UCI Parkinson's Dataset...")
    
    data_file = DATA_DIR / "uci_parkinsons.data"
    
    if not data_file.exists():
        print("❌ Dataset not found!")
        print("   Please run: python scripts/download_free_datasets.py")
        return None, None
    
    # Load data
    df = pd.read_csv(data_file)
    
    print(f"✅ Dataset loaded successfully")
    print(f"   Total samples: {len(df)}")
    print(f"   Parkinson's: {df['status'].sum()}")
    print(f"   Healthy: {len(df) - df['status'].sum()}")
    print(f"   Features: {len(df.columns) - 2}")  # Exclude name and status
    print()
    
    # Separate features and labels
    X = df.drop(['name', 'status'], axis=1)
    y = df['status']
    
    print(f"📋 Features used:")
    for i, col in enumerate(X.columns[:10], 1):
        print(f"   {i}. {col}")
    if len(X.columns) > 10:
        print(f"   ... and {len(X.columns) - 10} more")
    print()
    
    return X, y

def train_model(X, y):
    """Train Random Forest model"""
    print("=" * 70)
    print("🤖 TRAINING RANDOM FOREST MODEL")
    print("=" * 70)
    print()
    
    # Split data
    print("📊 Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print(f"   Training set: {len(X_train)} samples")
    print(f"   Test set: {len(X_test)} samples")
    print()
    
    # Normalize features
    print("📏 Normalizing features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    print("✅ Normalization complete")
    print()
    
    # Train model
    print("🧠 Training Random Forest...")
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        min_samples_split=5,
        min_samples_leaf=2,
        max_features='sqrt',
        random_state=42,
        n_jobs=-1,
        verbose=1
    )
    
    model.fit(X_train_scaled, y_train)
    print("✅ Training complete!")
    print()
    
    # Evaluate
    print("=" * 70)
    print("📊 MODEL EVALUATION")
    print("=" * 70)
    print()
    
    # Training accuracy
    train_pred = model.predict(X_train_scaled)
    train_acc = accuracy_score(y_train, train_pred)
    print(f"📈 Training Accuracy: {train_acc:.4f} ({train_acc*100:.2f}%)")
    
    # Test accuracy
    test_pred = model.predict(X_test_scaled)
    test_acc = accuracy_score(y_test, test_pred)
    print(f"📈 Test Accuracy: {test_acc:.4f} ({test_acc*100:.2f}%)")
    print()
    
    # Cross-validation
    print("🔄 Cross-validation (5-fold)...")
    cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
    print(f"   CV Scores: {cv_scores}")
    print(f"   CV Mean: {cv_scores.mean():.4f} ({cv_scores.mean()*100:.2f}%)")
    print(f"   CV Std: {cv_scores.std():.4f}")
    print()
    
    # Detailed metrics
    print("📊 Detailed Classification Report:")
    print(classification_report(y_test, test_pred, target_names=['Healthy', 'Parkinson\'s']))
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, test_pred)
    print("📊 Confusion Matrix:")
    print(f"   True Negatives:  {cm[0,0]}")
    print(f"   False Positives: {cm[0,1]}")
    print(f"   False Negatives: {cm[1,0]}")
    print(f"   True Positives:  {cm[1,1]}")
    print()
    
    # ROC-AUC
    test_proba = model.predict_proba(X_test_scaled)[:, 1]
    roc_auc = roc_auc_score(y_test, test_proba)
    print(f"📈 ROC-AUC Score: {roc_auc:.4f} ({roc_auc*100:.2f}%)")
    print()
    
    # Feature importance
    print("🔍 Top 10 Most Important Features:")
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    for i, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']}: {row['importance']:.4f}")
    print()
    
    return model, scaler, {
        'train_accuracy': float(train_acc),
        'test_accuracy': float(test_acc),
        'cv_mean': float(cv_scores.mean()),
        'cv_std': float(cv_scores.std()),
        'roc_auc': float(roc_auc),
        'confusion_matrix': cm.tolist(),
        'feature_importance': feature_importance.to_dict('records')
    }

def save_model(model, scaler, metrics, X):
    """Save model, scaler, and metadata"""
    print("=" * 70)
    print("💾 SAVING MODEL")
    print("=" * 70)
    print()
    
    # Save model
    model_file = MODELS_DIR / f"{MODEL_NAME}.pkl"
    joblib.dump(model, model_file)
    print(f"✅ Model saved: {model_file}")
    
    # Save scaler
    scaler_file = MODELS_DIR / f"{MODEL_NAME}_scaler.pkl"
    joblib.dump(scaler, scaler_file)
    print(f"✅ Scaler saved: {scaler_file}")
    
    # Save feature names
    features_file = MODELS_DIR / f"{MODEL_NAME}_features.json"
    with open(features_file, 'w') as f:
        json.dump({'features': list(X.columns)}, f, indent=2)
    print(f"✅ Features saved: {features_file}")
    
    # Save metadata
    metadata = {
        'model_version': MODEL_VERSION,
        'trained_at': datetime.now().isoformat(),
        'dataset': 'UCI Parkinson\'s Dataset',
        'feature_count': len(X.columns),
        'training_samples': len(X),
        'metrics': metrics,
        'model_file': str(model_file.name),
        'scaler_file': str(scaler_file.name),
        'note': 'Trained with real UCI Parkinson\'s patient data'
    }
    
    metadata_file = MODELS_DIR / f"{MODEL_NAME}_metadata.json"
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"✅ Metadata saved: {metadata_file}")
    print()

def print_summary(metrics):
    """Print training summary"""
    print("=" * 70)
    print("🎉 TRAINING COMPLETE!")
    print("=" * 70)
    print()
    print("📊 Final Model Performance:")
    print(f"   Training Accuracy: {metrics['train_accuracy']*100:.2f}%")
    print(f"   Test Accuracy: {metrics['test_accuracy']*100:.2f}%")
    print(f"   Cross-Validation: {metrics['cv_mean']*100:.2f}% (±{metrics['cv_std']*100:.2f}%)")
    print(f"   ROC-AUC Score: {metrics['roc_auc']*100:.2f}%")
    print()
    print("✅ Model is ready for production!")
    print()
    print("🚀 Next Steps:")
    print("   1. Restart backend to load new model")
    print("   2. Test with real voice recordings")
    print("   3. Monitor performance in production")
    print()

def main():
    """Main training function"""
    # Load data
    X, y = load_uci_dataset()
    
    if X is None:
        return
    
    # Train model
    model, scaler, metrics = train_model(X, y)
    
    # Save model
    save_model(model, scaler, metrics, X)
    
    # Print summary
    print_summary(metrics)
    
    print("=" * 70)
    print("✅ ALL DONE!")
    print("=" * 70)

if __name__ == "__main__":
    main()
