#!/usr/bin/env python3
"""
NeuralCipher.ai - Oxford Dataset Only Training
Train model with only Oxford Parkinson's dataset (195 samples)
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import joblib
import json
from datetime import datetime
import os

# Paths
DATA_PATH = 'data/raw/parkinsons.data'
MODEL_DIR = 'models'
os.makedirs(MODEL_DIR, exist_ok=True)

print("=" * 80)
print("NEURALCIPHER.AI - OXFORD DATASET TRAINING")
print("=" * 80)
print(f"Tarih: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
print()

# 1. Load Data
print("📊 VERİ YÜKLEME")
print("-" * 80)

df = pd.read_csv(DATA_PATH)
print(f"✅ Veri yüklendi: {DATA_PATH}")
print(f"   Toplam Kayıt: {len(df)}")
print(f"   Toplam Özellik: {len(df.columns)}")
print()

# 2. Data Analysis
print("📈 VERİ ANALİZİ")
print("-" * 80)

# Status distribution
status_counts = df['status'].value_counts()
print(f"Parkinson (status=1): {status_counts.get(1, 0)} kayıt ({status_counts.get(1, 0)/len(df)*100:.1f}%)")
print(f"Sağlıklı (status=0):  {status_counts.get(0, 0)} kayıt ({status_counts.get(0, 0)/len(df)*100:.1f}%)")
print()

# Feature info
print(f"Özellikler ({len(df.columns)-2}):")  # -2 for 'name' and 'status'
feature_cols = [col for col in df.columns if col not in ['name', 'status']]
for i, col in enumerate(feature_cols, 1):
    print(f"  {i:2d}. {col}")
print()

# 3. Prepare Data
print("🔧 VERİ HAZIRLAMA")
print("-" * 80)

# Remove 'name' column
X = df.drop(['name', 'status'], axis=1)
y = df['status']

print(f"✅ Özellikler (X): {X.shape}")
print(f"✅ Hedef (y): {y.shape}")
print()

# Check for missing values
missing = X.isnull().sum().sum()
print(f"Eksik değer: {missing}")
if missing > 0:
    print("⚠️  Eksik değerler ortalama ile doldurulacak")
    X = X.fillna(X.mean())
print()

# 4. Split Data
print("✂️  VERİ BÖLME")
print("-" * 80)

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"Training set:   {len(X_train)} kayıt ({len(X_train)/len(df)*100:.1f}%)")
print(f"  - Parkinson:  {sum(y_train == 1)} kayıt")
print(f"  - Sağlıklı:   {sum(y_train == 0)} kayıt")
print()
print(f"Test set:       {len(X_test)} kayıt ({len(X_test)/len(df)*100:.1f}%)")
print(f"  - Parkinson:  {sum(y_test == 1)} kayıt")
print(f"  - Sağlıklı:   {sum(y_test == 0)} kayıt")
print()

# 5. Scale Features
print("📏 ÖZELLİK ÖLÇEKLENDİRME")
print("-" * 80)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print(f"✅ Scaler eğitildi ve uygulandı")
print(f"   Mean: {scaler.mean_[:3]} ...")
print(f"   Std:  {scaler.scale_[:3]} ...")
print()

# 6. Train Model
print("🤖 MODEL EĞİTİMİ")
print("-" * 80)

# Random Forest with optimized parameters
model = RandomForestClassifier(
    n_estimators=200,
    max_depth=10,
    min_samples_split=5,
    min_samples_leaf=2,
    random_state=42,
    n_jobs=-1,
    class_weight='balanced'  # Handle imbalanced data
)

print("Model parametreleri:")
print(f"  - n_estimators: {model.n_estimators}")
print(f"  - max_depth: {model.max_depth}")
print(f"  - min_samples_split: {model.min_samples_split}")
print(f"  - min_samples_leaf: {model.min_samples_leaf}")
print(f"  - class_weight: {model.class_weight}")
print()

print("Eğitim başlıyor...")
model.fit(X_train_scaled, y_train)
print("✅ Model eğitildi!")
print()

# 7. Cross-Validation
print("🔄 CROSS-VALIDATION")
print("-" * 80)

cv_scores = cross_val_score(model, X_train_scaled, y_train, cv=5, scoring='accuracy')
print(f"5-Fold CV Accuracy: {cv_scores.mean():.4f} (+/- {cv_scores.std() * 2:.4f})")
print(f"  Fold scores: {[f'{score:.4f}' for score in cv_scores]}")
print()

# 8. Evaluate Model
print("📊 MODEL DEĞERLENDİRME")
print("-" * 80)

# Training set performance
y_train_pred = model.predict(X_train_scaled)
train_accuracy = accuracy_score(y_train, y_train_pred)

# Test set performance
y_test_pred = model.predict(X_test_scaled)
test_accuracy = accuracy_score(y_test, y_test_pred)
test_precision = precision_score(y_test, y_test_pred)
test_recall = recall_score(y_test, y_test_pred)
test_f1 = f1_score(y_test, y_test_pred)

print("Training Set:")
print(f"  Accuracy:  {train_accuracy:.4f} ({train_accuracy*100:.2f}%)")
print()

print("Test Set:")
print(f"  Accuracy:  {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
print(f"  Precision: {test_precision:.4f} ({test_precision*100:.2f}%)")
print(f"  Recall:    {test_recall:.4f} ({test_recall*100:.2f}%)")
print(f"  F1-Score:  {test_f1:.4f} ({test_f1*100:.2f}%)")
print()

# Confusion Matrix
cm = confusion_matrix(y_test, y_test_pred)
print("Confusion Matrix:")
print(f"                Predicted")
print(f"              Healthy  Parkinson")
print(f"Actual Healthy    {cm[0][0]:3d}      {cm[0][1]:3d}")
print(f"       Parkinson  {cm[1][0]:3d}      {cm[1][1]:3d}")
print()

# Classification Report
print("Classification Report:")
print(classification_report(y_test, y_test_pred, target_names=['Healthy', 'Parkinson']))

# 9. Feature Importance
print("🎯 ÖZELLİK ÖNEMİ")
print("-" * 80)

feature_importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)

print("Top 10 En Önemli Özellikler:")
for i, row in feature_importance.head(10).iterrows():
    print(f"  {row['feature']:20s}: {row['importance']:.4f}")
print()

# 10. Save Model
print("💾 MODEL KAYDETME")
print("-" * 80)

model_version = "v7.0_oxford"
model_path = os.path.join(MODEL_DIR, f'neuralcipher_{model_version}.pkl')
scaler_path = os.path.join(MODEL_DIR, f'neuralcipher_{model_version}_scaler.pkl')
metadata_path = os.path.join(MODEL_DIR, f'neuralcipher_{model_version}_metadata.json')
features_path = os.path.join(MODEL_DIR, f'neuralcipher_{model_version}_features.json')

# Save model
joblib.dump(model, model_path)
print(f"✅ Model kaydedildi: {model_path}")

# Save scaler
joblib.dump(scaler, scaler_path)
print(f"✅ Scaler kaydedildi: {scaler_path}")

# Save metadata
metadata = {
    'version': model_version,
    'created_at': datetime.now().isoformat(),
    'dataset': 'Oxford Parkinson\'s Dataset',
    'total_samples': len(df),
    'training_samples': len(X_train),
    'test_samples': len(X_test),
    'parkinson_samples': int(status_counts.get(1, 0)),
    'healthy_samples': int(status_counts.get(0, 0)),
    'features': len(X.columns),
    'feature_names': list(X.columns),
    'model_type': 'RandomForestClassifier',
    'model_params': {
        'n_estimators': model.n_estimators,
        'max_depth': model.max_depth,
        'min_samples_split': model.min_samples_split,
        'min_samples_leaf': model.min_samples_leaf,
        'class_weight': str(model.class_weight)
    },
    'performance': {
        'train_accuracy': float(train_accuracy),
        'test_accuracy': float(test_accuracy),
        'test_precision': float(test_precision),
        'test_recall': float(test_recall),
        'test_f1': float(test_f1),
        'cv_mean': float(cv_scores.mean()),
        'cv_std': float(cv_scores.std())
    },
    'confusion_matrix': cm.tolist(),
    'feature_importance': feature_importance.to_dict('records')
}

with open(metadata_path, 'w') as f:
    json.dump(metadata, f, indent=2)
print(f"✅ Metadata kaydedildi: {metadata_path}")

# Save feature names
features_data = {
    'features': list(X.columns),
    'count': len(X.columns)
}
with open(features_path, 'w') as f:
    json.dump(features_data, f, indent=2)
print(f"✅ Features kaydedildi: {features_path}")
print()

# 11. Summary
print("=" * 80)
print("📋 ÖZET")
print("=" * 80)
print(f"Model Version:     {model_version}")
print(f"Dataset:           Oxford Parkinson's Dataset")
print(f"Total Samples:     {len(df)}")
print(f"Features:          {len(X.columns)}")
print(f"Training Samples:  {len(X_train)}")
print(f"Test Samples:      {len(X_test)}")
print()
print(f"Test Accuracy:     {test_accuracy:.4f} ({test_accuracy*100:.2f}%)")
print(f"Test Precision:    {test_precision:.4f} ({test_precision*100:.2f}%)")
print(f"Test Recall:       {test_recall:.4f} ({test_recall*100:.2f}%)")
print(f"Test F1-Score:     {test_f1:.4f} ({test_f1*100:.2f}%)")
print()
print(f"Model saved to:    {model_path}")
print(f"Scaler saved to:   {scaler_path}")
print(f"Metadata saved to: {metadata_path}")
print("=" * 80)
print("✅ EĞİTİM TAMAMLANDI!")
print("=" * 80)
