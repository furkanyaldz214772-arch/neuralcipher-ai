"""
Train NeuralCipher AI Model with ALL Available Data (6,070 samples) - Version 2
Uses ALL features from both datasets with smart feature engineering
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
print("🚀 TRAINING WITH ALL DATA - IMPROVED VERSION (6,070 SAMPLES)")
print("=" * 80)

# ============================================================================
# STEP 1: Load UCI Parkinson's Dataset (195 samples)
# ============================================================================
print("\n📊 Loading UCI Parkinson's Dataset...")
uci_file = DATA_DIR / "uci_parkinsons.data"
df_uci = pd.read_csv(uci_file)

print(f"✅ Loaded {len(df_uci)} samples")
print(f"   - Parkinson's: {df_uci['status'].sum()}")
print(f"   - Healthy: {len(df_uci) - df_uci['status'].sum()}")

# Prepare UCI data
X_uci = df_uci.drop(['name', 'status'], axis=1)
y_uci = df_uci['status']

# ============================================================================
# STEP 2: Load UCI Telemonitoring Dataset (5,875 samples)
# ============================================================================
print("\n📊 Loading UCI Telemonitoring Dataset...")
tele_file = DATA_DIR / "parkinsons_updrs.data"
df_tele = pd.read_csv(tele_file)

print(f"✅ Loaded {len(df_tele)} samples")

# Create binary labels (motor_UPDRS > 20 = Parkinson's)
y_tele = (df_tele['motor_UPDRS'] > 20).astype(int)
print(f"   - Parkinson's: {y_tele.sum()}")
print(f"   - Healthy/Mild: {len(y_tele) - y_tele.sum()}")

# Extract voice features (exclude metadata)
tele_voice_features = [
    'Jitter(%)', 'Jitter(Abs)', 'Jitter:RAP', 'Jitter:PPQ5', 'Jitter:DDP',
    'Shimmer', 'Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5', 'Shimmer:APQ11', 'Shimmer:DDA',
    'NHR', 'HNR', 'RPDE', 'DFA', 'PPE'
]
X_tele = df_tele[tele_voice_features]

# ============================================================================
# STEP 3: Create Unified Feature Set
# ============================================================================
print("\n🔄 Creating unified feature set...")

# Get all unique features from both datasets
all_features = sorted(list(set(X_uci.columns) | set(X_tele.columns)))
print(f"   - Total unique features: {len(all_features)}")

# Create aligned dataframes with all features
X_uci_full = pd.DataFrame(index=X_uci.index, columns=all_features)
X_tele_full = pd.DataFrame(index=X_tele.index, columns=all_features)

# Fill UCI data
for col in X_uci.columns:
    X_uci_full[col] = X_uci[col]

# Fill Telemonitoring data
for col in X_tele.columns:
    X_tele_full[col] = X_tele[col]

print(f"   - UCI features filled: {X_uci.shape[1]}")
print(f"   - Telemonitoring features filled: {X_tele.shape[1]}")

# ============================================================================
# STEP 4: Combine and Handle Missing Values
# ============================================================================
print("\n🔗 Combining datasets...")

X_combined = pd.concat([X_uci_full, X_tele_full], axis=0, ignore_index=True)
y_combined = pd.concat([y_uci, y_tele], axis=0, ignore_index=True)

print(f"✅ Combined dataset:")
print(f"   - Total samples: {len(X_combined):,}")
print(f"   - Features: {X_combined.shape[1]}")
print(f"   - Parkinson's: {y_combined.sum():,} ({y_combined.sum()/len(y_combined)*100:.1f}%)")
print(f"   - Healthy: {len(y_combined) - y_combined.sum():,} ({(len(y_combined) - y_combined.sum())/len(y_combined)*100:.1f}%)")

# Handle missing values
print("\n🔧 Handling missing values...")
missing_before = X_combined.isnull().sum().sum()
print(f"   - Missing values: {missing_before:,}")

# Strategy: Fill with median for each feature
X_combined = X_combined.fillna(X_combined.median())

missing_after = X_combined.isnull().sum().sum()
print(f"   - After filling: {missing_after:,}")

# ============================================================================
# STEP 5: Feature Selection (Remove low-variance features)
# ============================================================================
print("\n🎯 Feature selection...")

# Calculate variance for each feature
feature_variance = X_combined.var()
low_variance_features = feature_variance[feature_variance < 0.001].index.tolist()

if low_variance_features:
    print(f"   - Removing {len(low_variance_features)} low-variance features")
    X_combined = X_combined.drop(columns=low_variance_features)

print(f"   - Final feature count: {X_combined.shape[1]}")

# ============================================================================
# STEP 6: Split Data
# ============================================================================
print("\n✂️  Splitting data (80% train, 20% test)...")
X_train, X_test, y_train, y_test = train_test_split(
    X_combined, y_combined,
    test_size=0.2,
    random_state=42,
    stratify=y_combined
)

print(f"   - Training: {len(X_train):,} samples")
print(f"   - Test: {len(X_test):,} samples")

# ============================================================================
# STEP 7: Feature Scaling
# ============================================================================
print("\n📏 Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ============================================================================
# STEP 8: Train Model with Optimized Hyperparameters
# ============================================================================
print("\n🤖 Training Random Forest model...")
print("   - Estimators: 300")
print("   - Max depth: 25")
print("   - Min samples split: 5")
print("   - Min samples leaf: 2")

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=25,
    min_samples_split=5,
    min_samples_leaf=2,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1,
    class_weight='balanced'
)

print("\n⏳ Training...")
model.fit(X_train_scaled, y_train)
print("✅ Training complete!")

# ============================================================================
# STEP 9: Evaluate
# ============================================================================
print("\n📊 Evaluation:")

# Training accuracy
y_train_pred = model.predict(X_train_scaled)
train_acc = accuracy_score(y_train, y_train_pred)
print(f"   - Training Accuracy: {train_acc*100:.2f}%")

# Test accuracy
y_test_pred = model.predict(X_test_scaled)
test_acc = accuracy_score(y_test, y_test_pred)
print(f"   - Test Accuracy: {test_acc*100:.2f}%")

# Cross-validation
cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
print(f"   - CV Mean: {cv_scores.mean()*100:.2f}% (±{cv_scores.std()*100:.2f}%)")

# ROC-AUC
y_test_proba = model.predict_proba(X_test_scaled)[:, 1]
roc_auc = roc_auc_score(y_test, y_test_proba)
print(f"   - ROC-AUC: {roc_auc*100:.2f}%")

# Confusion Matrix
cm = confusion_matrix(y_test, y_test_pred)
tn, fp, fn, tp = cm.ravel()
sensitivity = tp / (tp + fn)
specificity = tn / (tn + fp)
precision = tp / (tp + fp)
f1 = 2 * (precision * sensitivity) / (precision + sensitivity)

print(f"   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - Specificity: {specificity*100:.2f}%")
print(f"   - Precision: {precision*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")

# ============================================================================
# STEP 10: Save Model
# ============================================================================
print("\n💾 Saving model v2.0...")

joblib.dump(model, MODEL_DIR / "neuralcipher_v2.0.pkl")
joblib.dump(scaler, MODEL_DIR / "neuralcipher_v2.0_scaler.pkl")

# Feature importance
feature_importance = pd.DataFrame({
    'feature': X_combined.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

metadata = {
    "model_version": "v2.0",
    "trained_at": datetime.now().isoformat(),
    "dataset": "UCI Parkinson's + UCI Telemonitoring (6,070 samples)",
    "total_samples": len(X_combined),
    "feature_count": X_combined.shape[1],
    "features": list(X_combined.columns),
    "metrics": {
        "train_accuracy": float(train_acc),
        "test_accuracy": float(test_acc),
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
        for _, row in feature_importance.head(20).iterrows()
    ],
    "model_file": "neuralcipher_v2.0.pkl",
    "scaler_file": "neuralcipher_v2.0_scaler.pkl",
    "note": "Trained with 6,070 samples using all features with median imputation"
}

with open(MODEL_DIR / "neuralcipher_v2.0_metadata.json", 'w') as f:
    json.dump(metadata, f, indent=2)

print("✅ Model saved!")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("🎉 TRAINING COMPLETE!")
print("=" * 80)
print(f"\n📊 Dataset: 6,070 samples ({len(X_uci)} UCI + {len(X_tele)} Telemonitoring)")
print(f"🎯 Performance:")
print(f"   - Test Accuracy: {test_acc*100:.2f}%")
print(f"   - ROC-AUC: {roc_auc*100:.2f}%")
print(f"   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")
print("\n✅ Model v2.0 ready for production!")
print("=" * 80)
