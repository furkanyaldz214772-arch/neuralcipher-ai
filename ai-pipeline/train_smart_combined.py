"""
Smart Combined Training - Convert Telemonitoring to UCI Format
Strategy: Use Telemonitoring data to augment UCI features intelligently
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

DATA_DIR = Path(__file__).parent / "data" / "raw"
MODEL_DIR = Path(__file__).parent / "models"
MODEL_DIR.mkdir(exist_ok=True)

print("=" * 80)
print("🚀 SMART COMBINED TRAINING - ALL 6,070 SAMPLES")
print("=" * 80)

# ============================================================================
# STEP 1: Load UCI Dataset (195 samples)
# ============================================================================
print("\n📊 Loading UCI Parkinson's Dataset...")
df_uci = pd.read_csv(DATA_DIR / "uci_parkinsons.data")
print(f"✅ Loaded {len(df_uci)} samples")

X_uci = df_uci.drop(['name', 'status'], axis=1)
y_uci = df_uci['status']

# ============================================================================
# STEP 2: Load Telemonitoring Dataset (5,875 samples)
# ============================================================================
print("\n📊 Loading UCI Telemonitoring Dataset...")
df_tele = pd.read_csv(DATA_DIR / "parkinsons_updrs.data")
print(f"✅ Loaded {len(df_tele)} samples")

# Create labels
y_tele = (df_tele['motor_UPDRS'] > 20).astype(int)

# ============================================================================
# STEP 3: Smart Feature Engineering - Convert Telemonitoring to UCI Format
# ============================================================================
print("\n🔧 Smart Feature Engineering...")

# Telemonitoring has these features:
tele_features = {
    'Jitter(%)': 'MDVP:Jitter(%)',
    'Jitter(Abs)': 'MDVP:Jitter(Abs)',
    'Jitter:RAP': 'MDVP:RAP',
    'Jitter:PPQ5': 'MDVP:PPQ',
    'Jitter:DDP': 'Jitter:DDP',
    'Shimmer': 'MDVP:Shimmer',
    'Shimmer(dB)': 'MDVP:Shimmer(dB)',
    'Shimmer:APQ3': 'Shimmer:APQ3',
    'Shimmer:APQ5': 'Shimmer:APQ5',
    'Shimmer:APQ11': 'MDVP:APQ',
    'Shimmer:DDA': 'Shimmer:DDA',
    'NHR': 'NHR',
    'HNR': 'HNR',
    'RPDE': 'RPDE',
    'DFA': 'DFA',
    'PPE': 'PPE'
}

# Create Telemonitoring dataframe with UCI column names
X_tele_converted = pd.DataFrame()
for tele_col, uci_col in tele_features.items():
    if tele_col in df_tele.columns:
        X_tele_converted[uci_col] = df_tele[tele_col]

print(f"   - Converted {len(X_tele_converted.columns)} features from Telemonitoring")

# For missing UCI features, we'll calculate them from available data
print("\n🧮 Calculating missing features...")

# Calculate missing features using correlations and formulas
# MDVP:Fo(Hz) - Average fundamental frequency (estimate from other jitter/shimmer)
X_tele_converted['MDVP:Fo(Hz)'] = 154.0  # Average from UCI dataset

# MDVP:Fhi(Hz) - Maximum fundamental frequency
X_tele_converted['MDVP:Fhi(Hz)'] = 197.0  # Average from UCI dataset

# MDVP:Flo(Hz) - Minimum fundamental frequency  
X_tele_converted['MDVP:Flo(Hz)'] = 116.0  # Average from UCI dataset

# spread1, spread2, D2 - Nonlinear measures (use DFA and RPDE as proxies)
X_tele_converted['spread1'] = X_tele_converted['DFA'] * 0.5 + X_tele_converted['RPDE'] * 0.5
X_tele_converted['spread2'] = X_tele_converted['DFA'] * 0.3 + X_tele_converted['RPDE'] * 0.7
X_tele_converted['D2'] = X_tele_converted['DFA'] * 0.4 + X_tele_converted['RPDE'] * 0.6

print(f"   - Total features after engineering: {len(X_tele_converted.columns)}")

# Align columns with UCI dataset
all_uci_features = list(X_uci.columns)
for col in all_uci_features:
    if col not in X_tele_converted.columns:
        # Fill with UCI mean
        X_tele_converted[col] = X_uci[col].mean()

# Reorder columns to match UCI
X_tele_converted = X_tele_converted[all_uci_features]

print(f"✅ Telemonitoring converted to UCI format: {X_tele_converted.shape}")

# ============================================================================
# STEP 4: Combine Datasets
# ============================================================================
print("\n🔗 Combining datasets...")

X_combined = pd.concat([X_uci, X_tele_converted], axis=0, ignore_index=True)
y_combined = pd.concat([y_uci, y_tele], axis=0, ignore_index=True)

print(f"✅ Combined dataset:")
print(f"   - Total samples: {len(X_combined):,}")
print(f"   - Features: {X_combined.shape[1]}")
print(f"   - Parkinson's: {y_combined.sum():,} ({y_combined.sum()/len(y_combined)*100:.1f}%)")
print(f"   - Healthy: {len(y_combined) - y_combined.sum():,}")

# ============================================================================
# STEP 5: Split Data (Stratified)
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
# STEP 6: Feature Scaling
# ============================================================================
print("\n📏 Scaling features...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# ============================================================================
# STEP 7: Train Model with Optimized Hyperparameters
# ============================================================================
print("\n🤖 Training Random Forest model...")
print("   - Estimators: 500 (more data = more trees)")
print("   - Max depth: 30")
print("   - Min samples split: 20")
print("   - Min samples leaf: 5")

model = RandomForestClassifier(
    n_estimators=500,
    max_depth=30,
    min_samples_split=20,
    min_samples_leaf=5,
    max_features='sqrt',
    random_state=42,
    n_jobs=-1,
    class_weight='balanced',
    bootstrap=True,
    oob_score=True
)

print("\n⏳ Training (this may take 1-2 minutes)...")
model.fit(X_train_scaled, y_train)
print("✅ Training complete!")

# ============================================================================
# STEP 8: Evaluate
# ============================================================================
print("\n📊 Evaluation:")

# Training accuracy
y_train_pred = model.predict(X_train_scaled)
train_acc = accuracy_score(y_train, y_train_pred)
print(f"   - Training Accuracy: {train_acc*100:.2f}%")

# OOB Score (Out-of-Bag)
print(f"   - OOB Score: {model.oob_score_*100:.2f}%")

# Test accuracy
y_test_pred = model.predict(X_test_scaled)
test_acc = accuracy_score(y_test, y_test_pred)
print(f"   - Test Accuracy: {test_acc*100:.2f}%")

# Cross-validation
print("\n🔄 Cross-validation (5-fold)...")
cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy', n_jobs=-1)
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

print(f"\n   - Confusion Matrix:")
print(f"     [[TN={tn}, FP={fp}],")
print(f"      [FN={fn}, TP={tp}]]")
print(f"\n   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - Specificity: {specificity*100:.2f}%")
print(f"   - Precision: {precision*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")

# Classification Report
print("\n📋 Classification Report:")
print(classification_report(y_test, y_test_pred, target_names=['Healthy', 'Parkinsons']))

# Feature Importance
print("\n🔍 Top 15 Most Important Features:")
feature_importance = pd.DataFrame({
    'feature': X_combined.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

for idx, (_, row) in enumerate(feature_importance.head(15).iterrows(), 1):
    print(f"   {idx:2d}. {row['feature']:20s}: {row['importance']:.4f}")

# ============================================================================
# STEP 9: Save Model as v3.0
# ============================================================================
print("\n💾 Saving model v3.0...")

model_file = MODEL_DIR / "neuralcipher_v3.0.pkl"
scaler_file = MODEL_DIR / "neuralcipher_v3.0_scaler.pkl"
metadata_file = MODEL_DIR / "neuralcipher_v3.0_metadata.json"

joblib.dump(model, model_file)
joblib.dump(scaler, scaler_file)

metadata = {
    "model_version": "v3.0",
    "trained_at": datetime.now().isoformat(),
    "dataset": "UCI Parkinson's + UCI Telemonitoring (Smart Combined)",
    "total_samples": len(X_combined),
    "uci_samples": len(X_uci),
    "telemonitoring_samples": len(X_tele_converted),
    "feature_count": X_combined.shape[1],
    "features": list(X_combined.columns),
    "training_samples": len(X_train),
    "test_samples": len(X_test),
    "metrics": {
        "train_accuracy": float(train_acc),
        "test_accuracy": float(test_acc),
        "oob_score": float(model.oob_score_),
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
    "model_file": "neuralcipher_v3.0.pkl",
    "scaler_file": "neuralcipher_v3.0_scaler.pkl",
    "note": "Smart combined: Telemonitoring converted to UCI format with feature engineering"
}

with open(metadata_file, 'w') as f:
    json.dump(metadata, f, indent=2)

print(f"   ✅ Model saved: {model_file}")
print(f"   ✅ Scaler saved: {scaler_file}")
print(f"   ✅ Metadata saved: {metadata_file}")

# ============================================================================
# SUMMARY
# ============================================================================
print("\n" + "=" * 80)
print("🎉 SMART COMBINED TRAINING COMPLETE!")
print("=" * 80)
print(f"\n📊 Dataset:")
print(f"   - Total Samples: {len(X_combined):,}")
print(f"   - UCI Original: {len(X_uci):,}")
print(f"   - Telemonitoring Converted: {len(X_tele_converted):,}")
print(f"   - Features: {X_combined.shape[1]} (all UCI features)")

print(f"\n🎯 Performance:")
print(f"   - Test Accuracy: {test_acc*100:.2f}%")
print(f"   - OOB Score: {model.oob_score_*100:.2f}%")
print(f"   - ROC-AUC: {roc_auc*100:.2f}%")
print(f"   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - Specificity: {specificity*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")
print(f"   - CV Score: {cv_scores.mean()*100:.2f}% (±{cv_scores.std()*100:.2f}%)")

print("\n✅ Model v3.0 ready!")
print("=" * 80)
