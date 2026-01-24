"""
Train model ONLY on Telemonitoring dataset (5,875 samples)
To see if more data helps when using consistent features
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

print("=" * 80)
print("🚀 TRAINING ON TELEMONITORING ONLY (5,875 SAMPLES)")
print("=" * 80)

# Load data
print("\n📊 Loading UCI Telemonitoring Dataset...")
df = pd.read_csv(DATA_DIR / "parkinsons_updrs.data")
print(f"✅ Loaded {len(df)} samples from {df['subject#'].nunique()} patients")

# Features
features = [
    'Jitter(%)', 'Jitter(Abs)', 'Jitter:RAP', 'Jitter:PPQ5', 'Jitter:DDP',
    'Shimmer', 'Shimmer(dB)', 'Shimmer:APQ3', 'Shimmer:APQ5', 'Shimmer:APQ11', 'Shimmer:DDA',
    'NHR', 'HNR', 'RPDE', 'DFA', 'PPE'
]

X = df[features]
y = (df['motor_UPDRS'] > 20).astype(int)

print(f"   - Features: {len(features)}")
print(f"   - Parkinson's: {y.sum()} ({y.sum()/len(y)*100:.1f}%)")
print(f"   - Healthy/Mild: {len(y) - y.sum()} ({(len(y) - y.sum())/len(y)*100:.1f}%)")

# Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\n✂️  Split: {len(X_train)} train, {len(X_test)} test")

# Scale
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train
print("\n🤖 Training Random Forest...")
model = RandomForestClassifier(
    n_estimators=300,
    max_depth=25,
    min_samples_split=15,
    min_samples_leaf=4,
    random_state=42,
    n_jobs=-1,
    class_weight='balanced'
)

model.fit(X_train_scaled, y_train)
print("✅ Training complete!")

# Evaluate
y_train_pred = model.predict(X_train_scaled)
y_test_pred = model.predict(X_test_scaled)
y_test_proba = model.predict_proba(X_test_scaled)[:, 1]

train_acc = accuracy_score(y_train, y_train_pred)
test_acc = accuracy_score(y_test, y_test_pred)
roc_auc = roc_auc_score(y_test, y_test_proba)

cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')

cm = confusion_matrix(y_test, y_test_pred)
tn, fp, fn, tp = cm.ravel()
sensitivity = tp / (tp + fn)
specificity = tn / (tn + fp)
precision = tp / (tp + fp)
f1 = 2 * (precision * sensitivity) / (precision + sensitivity)

print(f"\n📊 Results:")
print(f"   - Training Accuracy: {train_acc*100:.2f}%")
print(f"   - Test Accuracy: {test_acc*100:.2f}%")
print(f"   - CV Mean: {cv_scores.mean()*100:.2f}% (±{cv_scores.std()*100:.2f}%)")
print(f"   - ROC-AUC: {roc_auc*100:.2f}%")
print(f"   - Sensitivity: {sensitivity*100:.2f}%")
print(f"   - Specificity: {specificity*100:.2f}%")
print(f"   - F1-Score: {f1*100:.2f}%")

print(f"\n   Confusion Matrix: [[TN={tn}, FP={fp}], [FN={fn}, TP={tp}]]")

# Save
print("\n💾 Saving model v4.0 (Telemonitoring only)...")
joblib.dump(model, MODEL_DIR / "neuralcipher_v4.0.pkl")
joblib.dump(scaler, MODEL_DIR / "neuralcipher_v4.0_scaler.pkl")

metadata = {
    "model_version": "v4.0",
    "trained_at": datetime.now().isoformat(),
    "dataset": "UCI Telemonitoring Only",
    "total_samples": len(X),
    "feature_count": len(features),
    "features": features,
    "metrics": {
        "train_accuracy": float(train_acc),
        "test_accuracy": float(test_acc),
        "cv_mean": float(cv_scores.mean()),
        "cv_std": float(cv_scores.std()),
        "roc_auc": float(roc_auc),
        "sensitivity": float(sensitivity),
        "specificity": float(specificity),
        "f1_score": float(f1)
    },
    "note": "Trained only on Telemonitoring dataset (5,875 samples)"
}

with open(MODEL_DIR / "neuralcipher_v4.0_metadata.json", 'w') as f:
    json.dump(metadata, f, indent=2)

print("✅ Model v4.0 saved!")
print("=" * 80)
