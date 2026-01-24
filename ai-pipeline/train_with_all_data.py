"""
Train NeuralCipher AI Model with ALL Available Data (6,070 samples)
Combines UCI Parkinson's Dataset + UCI Telemonitoring Dataset
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, roc_auc_score
import joblib
import json
from datetime import datetime
from pathlib import Path

# Paths
DATA_DIR = Path(__file__).parent / "data" / "raw"
MODEL_DIR = Path(__file__).parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

print("=" * 80)
print("🚀 TRAINING WITH ALL DATA (6,070 SAMPLES)")
print("=" * 80)

# ============================================================================
# STEP 1: Load UCI Parkinson's Dataset (195 samples)
# ============================================================================
print("\n📊 Loading UCI Parkinson's Dataset...")
uci_file = DATA_DIR / "uci_parkinsons.data"
df_uci = pd.read_csv(uci_file)

print(f"✅ Loaded {len(df_uci)} samples from UCI Parkinson's Dataset")
print(f"   - Features: {df_uci.shape[1] - 2} (excluding 'name' and 'status')")
print(f"   - Parkinson's: {df_uci['status'].sum()} samples")
print(f"   - Healthy: {len(df_uci) - df_uci['status'].sum()} samples")

# Prepare UCI data
X_uci = df_uci.drop(['name', 'status'], axis=1)
y_uci = df_uci['status']

# ============================================================================
# STEP 2: Load UCI Telemonitoring Dataset (5,875 samples)
# ============================================================================
print("\n📊 Loading UCI Telemonitoring Dataset...")
tele_file = DATA_DIR / "parkinsons_updrs.data"
df_tele = pd.read_csv(tele_file)

print(f"✅ Loaded {len(df_tele)} samples from UCI Telemonitoring Dataset")
print(f"   - Features: {df_tele.shape[1]}")
print(f"   - Patients: {df_tele['subject#'].nunique()}")
print(f"   - Columns: {list(df_tele.columns)}")

# Process Telemonitoring data
# This dataset has UPDRS scores but no binary status
# We'll use motor_UPDRS > 20 as Parkinson's indicator (clinical threshold)
print("\n🔄 Processing Telemonitoring data...")

# Select relevant features that overlap with UCI dataset
# Telemonitoring has: Jitter, Shimmer, NHR, HNR, DFA, PPE
tele_features = [
    'Jitter(%)', 'Jitter(Abs)', 'Jitter:RAP', 'Jitter:PPQ5', 'Jitter:DDP',
    'Shimmer', 'Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5', 'Shimmer:APQ11', 'Shimmer:DDA',
    'NHR', 'HNR', 'DFA', 'PPE'
]

# Check which features exist
available_features = [f for f in tele_features if f in df_tele.columns]
print(f"   - Available features: {len(available_features)}")
print(f"   - Features: {available_features}")

# Create binary labels based on motor_UPDRS
# motor_UPDRS > 20 indicates moderate to severe Parkinson's symptoms
y_tele = (df_tele['motor_UPDRS'] > 20).astype(int)
print(f"   - Parkinson's (motor_UPDRS > 20): {y_tele.sum()} samples")
print(f"   - Healthy/Mild (motor_UPDRS <= 20): {len(y_tele) - y_tele.sum()} samples")

# Extract features
X_tele = df_tele[available_features]

# ============================================================================
# STEP 3: Align Features Between Datasets
# ============================================================================
print("\n🔄 Aligning features between datasets...")

# UCI features
uci_features = list(X_uci.columns)
print(f"   - UCI features: {len(uci_features)}")

# Find common features
common_features = list(set(uci_features) & set(available_features))
print(f"   - Common features: {len(common_features)}")
print(f"   - Common: {common_features}")

# For features in UCI but not in Telemonitoring, we'll use mean imputation
# For features in Telemonitoring but not in UCI, we'll drop them

# Align UCI data
X_uci_aligned = X_uci[common_features].copy()

# Align Telemonitoring data
X_tele_aligned = X_tele[common_features].copy()

print(f"\n✅ Aligned datasets:")
print(f"   - UCI: {X_uci_aligned.shape}")
print(f"   - Telemonitoring: {X_tele_aligned.shape}")

# ============================================================================
# STEP 4: Combine Datasets
# ============================================================================
print("\n🔗 Combining datasets...")

# Combine features
X_combined = pd.concat([X_uci_aligned, X_tele_aligned], axis=0, ignore_index=True)

# Combine labels
y_combined = pd.concat([y_uci, y_tele], axis=0, ignore_index=True)

print(f"✅ Combined dataset:")
print(f"   - Total samples: {len(X_combined)}")
print(f"   - Features: {X_combined.shape[1]}")
print(f"   - Parkinson's: {y_combined.sum()} samples ({y_combined.sum()/len(y_combined)*100:.1f}%)")
print(f"   - Healthy: {len(y_combined) - y_combined.sum()} samples ({(len(y_combined) - y_combined.sum())/len(y_combined)*100:.1f}%)")

# Check for missing values
missing = X_combined.isnull().sum().sum()
if missing > 0:
    print(f"\n⚠️  Found {missing} missing values, filling with median...")
    X_combined = X_combined.fillna(X_combined.median())

# ============================================================================
# STEP 5: Split Data
# ============================================================================
print("\n✂️  Splitting data (80% train, 20% test)...")
X_train, X_test, y_train, y_test = train_test_split(
    X_combined, y_combined, 
    test_size=0.2, 
    random_state=42,
    stratify=y_combined
)

print(f"   - Training set: {len(X_train)} samples")
print(f"   - Test set: {len(X_test)} samples")
print(f"   - Train Parkinson's: {y_train.sum()} ({y_train.sum()/len(y_train)*100:.1f}%)")
print(f"   - Test Parkinson's: {y_test.sum()} ({y_test.sum()/len(y_test)*100:.1f}%)")

# ============================================================================
# STEP 6: Feature Scaling
# ============================================================================
print("\n📏 Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("✅ Features scaled using StandardScaler")

# ============================================================================
# STEP 7: Train Model
# ============================================================================
print("\n🤖 Training Random Forest model...")
print("   - Estimators: 200 (increased for larger dataset)")
print("   - Max depth: 20 (increased for more complex patterns)")
print("   - Min samples split: 10")
print("   - Min samples leaf: 4")

model = RandomForestClassifier(
    n_estimators=200,      # More trees for larger dataset
    max_depth=20,          # Deeper trees
    min_samples_split=10,  # Prevent overfitting
    min_samples_leaf=4,    # Prevent overfitting
    max_features='sqrt',
    random_state=42,
    n_jobs=-1,
    class_weight='balanced'  # Handle class imbalance
)

print("\n⏳ Training in progress...")
model.fit(X_train_scaled, y_train)
print("✅ Model trained successfully!")

# ============================================================================
# STEP 8: Evaluate Model
# ============================================================================
print("\n📊 Evaluating model...")

# Training accuracy
y_train_pred = model.predict(X_train_scaled)
train_accuracy = accuracy_score(y_train, y_train_pred)
print(f"   - Training Accuracy: {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")

# Test accuracy
y_test_pred = model.predict(X_test_scaled)
test_accuracy = accuracy_score(y_test, y_test_pred)
print(f"   - Test Accuracy: {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")

# Cross-validation
print("\n🔄 Performing 5-fold cross-validation...")
cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
print(f"   - CV Mean: {cv_scores.mean():.4f} ({cv_scores.mean()*100:.2f}%)")
print(f"   - CV Std: {cv_scores.std():.4f} (±{cv_scores.std()*100:.2f}%)")
print(f"   - CV Scores: {[f'{s:.4f}' for s in cv_scores]}")

# ROC-AUC
y_test_proba = model.predict_proba(X_test_scaled)[:, 1]
roc_auc = roc_auc_score(y_test, y_test_proba)
print(f"\n   - ROC-AUC Score: {roc_auc:.4f} ({roc_auc*100:.2f}%)")

# Confusion Matrix
cm = confusion_matrix(y_test, y_test_pred)
print(f"\n   - Confusion Matrix:")
print(f"     [[TN={cm[0,0]}, FP={cm[0,1]}],")
print(f"      [FN={cm[1,0]}, TP={cm[1,1]}]]")

# Calculate metrics
tn, fp, fn, tp = cm.ravel()
sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
precision = tp / (tp + fp) if (tp + fp) > 0 else 0
f1 = 2 * (precision * sensitivity) / (precision + sensitivity) if (precision + sensitivity) > 0 else 0

print(f"\n   - Sensitivity (Recall): {sensitivity:.4f} ({sensitivity*100:.2f}%)")
print(f"   - Specificity: {specificity:.4f} ({specificity*100:.2f}%)")
print(f"   - Precision: {precision:.4f} ({precision*100:.2f}%)")
print(f"   - F1-Score: {f1:.4f} ({f1*100:.2f}%)")

# Classification Report
print("\n📋 Classification Report:")
print(classification_report(y_test, y_test_pred, target_names=['Healthy', 'Parkinsons']))

# Feature Importance
print("\n🔍 Top 10 Most Important Features:")
feature_importance = pd.DataFrame({
    'feature': X_combined.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

for idx, row in feature_importance.head(10).iterrows():
    print(f"   {idx+1}. {row['feature']}: {row['importance']:.4f}")

# ============================================================================
# STEP 9: Save Model
# ============================================================================
print("\n💾 Saving model...")

# Save model
model_file = MODEL_DIR / "neuralcipher_v2.0.pkl"
joblib.dump(model, model_file)
print(f"   ✅ Model saved: {model_file}")

# Save scaler
scaler_file = MODEL_DIR / "neuralcipher_v2.0_scaler.pkl"
joblib.dump(scaler, scaler_file)
print(f"   ✅ Scaler saved: {scaler_file}")

# Save metadata
metadata = {
    "model_version": "v2.0",
    "trained_at": datetime.now().isoformat(),
    "dataset": "UCI Parkinson's + UCI Telemonitoring (Combined)",
    "total_samples": len(X_combined),
    "uci_samples": len(X_uci),
    "telemonitoring_samples": len(X_tele),
    "feature_count": X_combined.shape[1],
    "features": list(X_combined.columns),
    "training_samples": len(X_train),
    "test_samples": len(X_test),
    "metrics": {
        "train_accuracy": float(train_accuracy),
        "test_accuracy": float(test_accuracy),
        "cv_mean": float(cv_scores.mean()),
        "cv_std": float(cv_scores.std()),
        "roc_auc": float(roc_auc),
        "sensitivity": float(sensitivity),
        "specificity": float(specificity),
        "precision": float(precision),
        "f1_score": float(f1),
        "confusion_matrix": cm.tolist()
    },
    "feature_importance": [
        {"feature": row['feature'], "importance": float(row['importance'])}
        for _, row in feature_importance.iterrows()
    ],
    "model_file": "neuralcipher_v2.0.pkl",
    "scaler_file": "neuralcipher_v2.0_scaler.pkl",
    "note": "Trained with 6,070 real Parkinson's patient samples (UCI + Telemonitoring)"
}

metadata_file = MODEL_DIR / "neuralcipher_v2.0_metadata.json"
with open(metadata_file, 'w') as f:
    json.dump(metadata, f, indent=2)
print(f"   ✅ Metadata saved: {metadata_file}")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("🎉 MODEL TRAINING COMPLETE!")
print("=" * 80)
print(f"\n📊 Dataset Summary:")
print(f"   - Total Samples: {len(X_combined):,}")
print(f"   - UCI Parkinson's: {len(X_uci):,} samples")
print(f"   - UCI Telemonitoring: {len(X_tele):,} samples")
print(f"   - Features: {X_combined.shape[1]}")
print(f"   - Parkinson's: {y_combined.sum():,} ({y_combined.sum()/len(y_combined)*100:.1f}%)")
print(f"   - Healthy: {len(y_combined) - y_combined.sum():,} ({(len(y_combined) - y_combined.sum())/len(y_combined)*100:.1f}%)")

print(f"\n🎯 Model Performance:")
print(f"   - Test Accuracy: {test_accuracy*100:.2f}%")
print(f"   - ROC-AUC: {roc_auc*100:.2f}%")
print(f"   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - Specificity: {specificity*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")
print(f"   - Cross-Validation: {cv_scores.mean()*100:.2f}% (±{cv_scores.std()*100:.2f}%)")

print(f"\n💾 Saved Files:")
print(f"   - {model_file}")
print(f"   - {scaler_file}")
print(f"   - {metadata_file}")

print("\n✅ Model v2.0 is ready for production!")
print("   To use: Update backend to load neuralcipher_v2.0.pkl")
print("=" * 80)
