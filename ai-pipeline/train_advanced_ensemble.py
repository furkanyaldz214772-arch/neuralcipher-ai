#!/usr/bin/env python3
"""
NeuralCipher AI - Advanced Ensemble Model Training
En üst seviye model eğitimi: Ensemble + Hyperparameter Tuning + Cross-Validation
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import (
    RandomForestClassifier, 
    GradientBoostingClassifier,
    AdaBoostClassifier,
    VotingClassifier
)
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, 
    f1_score, confusion_matrix, classification_report,
    roc_auc_score, roc_curve
)
import joblib
import json
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

print("=" * 80)
print("🚀 NEURALCIPHER AI - ADVANCED ENSEMBLE MODEL TRAINING")
print("=" * 80)
print()

# 1. VERİ YÜKLEME
print("📊 1. Veri Yükleme...")
data = pd.read_csv('data/raw/parkinsons.data')
print(f"   ✅ Toplam Örnek: {len(data)}")
print(f"   ✅ Özellikler: {len(data.columns) - 2}")  # -2 for 'name' and 'status'
print()

# 2. VERİ HAZIRLAMA
print("🔧 2. Veri Hazırlama...")
# Remove 'name' column
X = data.drop(['name', 'status'], axis=1)
y = data['status']

print(f"   ✅ Parkinson: {sum(y == 1)} örnek")
print(f"   ✅ Sağlıklı: {sum(y == 0)} örnek")
print(f"   ✅ Özellik Sayısı: {X.shape[1]}")
print()

# 3. TRAIN-TEST SPLIT
print("✂️  3. Train-Test Split...")
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(f"   ✅ Training: {len(X_train)} örnek")
print(f"   ✅ Test: {len(X_test)} örnek")
print()

# 4. FEATURE SCALING
print("📏 4. Feature Scaling...")
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
print("   ✅ StandardScaler uygulandı")
print()

# 5. MODEL EĞİTİMİ - ENSEMBLE APPROACH
print("🤖 5. Advanced Ensemble Model Eğitimi...")
print()

# 5.1 Random Forest (Optimized)
print("   🌲 Random Forest (Hyperparameter Tuning)...")
rf_params = {
    'n_estimators': [200, 300, 500],
    'max_depth': [10, 15, 20, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4],
    'class_weight': ['balanced']
}
rf_base = RandomForestClassifier(random_state=42)
rf_grid = GridSearchCV(
    rf_base, rf_params, cv=5, scoring='f1', n_jobs=-1, verbose=0
)
rf_grid.fit(X_train_scaled, y_train)
rf_model = rf_grid.best_estimator_
print(f"      ✅ Best params: {rf_grid.best_params_}")
print(f"      ✅ Best CV F1: {rf_grid.best_score_:.4f}")
print()

# 5.2 Gradient Boosting
print("   📈 Gradient Boosting (Hyperparameter Tuning)...")
gb_params = {
    'n_estimators': [100, 200, 300],
    'learning_rate': [0.01, 0.05, 0.1],
    'max_depth': [3, 5, 7],
    'min_samples_split': [2, 5],
    'subsample': [0.8, 1.0]
}
gb_base = GradientBoostingClassifier(random_state=42)
gb_grid = GridSearchCV(
    gb_base, gb_params, cv=5, scoring='f1', n_jobs=-1, verbose=0
)
gb_grid.fit(X_train_scaled, y_train)
gb_model = gb_grid.best_estimator_
print(f"      ✅ Best params: {gb_grid.best_params_}")
print(f"      ✅ Best CV F1: {gb_grid.best_score_:.4f}")
print()

# 5.3 Support Vector Machine
print("   🎯 Support Vector Machine (Hyperparameter Tuning)...")
svm_params = {
    'C': [0.1, 1, 10, 100],
    'gamma': ['scale', 'auto', 0.001, 0.01],
    'kernel': ['rbf', 'poly'],
    'class_weight': ['balanced']
}
svm_base = SVC(probability=True, random_state=42)
svm_grid = GridSearchCV(
    svm_base, svm_params, cv=5, scoring='f1', n_jobs=-1, verbose=0
)
svm_grid.fit(X_train_scaled, y_train)
svm_model = svm_grid.best_estimator_
print(f"      ✅ Best params: {svm_grid.best_params_}")
print(f"      ✅ Best CV F1: {svm_grid.best_score_:.4f}")
print()

# 5.4 Neural Network
print("   🧠 Neural Network (Hyperparameter Tuning)...")
mlp_params = {
    'hidden_layer_sizes': [(100,), (100, 50), (150, 75, 25)],
    'activation': ['relu', 'tanh'],
    'alpha': [0.0001, 0.001, 0.01],
    'learning_rate': ['adaptive'],
    'max_iter': [1000]
}
mlp_base = MLPClassifier(random_state=42, early_stopping=True)
mlp_grid = GridSearchCV(
    mlp_base, mlp_params, cv=5, scoring='f1', n_jobs=-1, verbose=0
)
mlp_grid.fit(X_train_scaled, y_train)
mlp_model = mlp_grid.best_estimator_
print(f"      ✅ Best params: {mlp_grid.best_params_}")
print(f"      ✅ Best CV F1: {mlp_grid.best_score_:.4f}")
print()

# 5.5 Voting Ensemble (Soft Voting)
print("   🗳️  Voting Ensemble (Soft Voting)...")
ensemble_model = VotingClassifier(
    estimators=[
        ('rf', rf_model),
        ('gb', gb_model),
        ('svm', svm_model),
        ('mlp', mlp_model)
    ],
    voting='soft',
    weights=[2, 2, 1, 1]  # RF ve GB'ye daha fazla ağırlık
)
ensemble_model.fit(X_train_scaled, y_train)
print("      ✅ Ensemble model eğitildi")
print()

# 6. MODEL DEĞERLENDİRME
print("📊 6. Model Değerlendirme...")
print()

# Individual model performances
models = {
    'Random Forest': rf_model,
    'Gradient Boosting': gb_model,
    'SVM': svm_model,
    'Neural Network': mlp_model,
    'Ensemble': ensemble_model
}

results = {}
for name, model in models.items():
    y_pred = model.predict(X_test_scaled)
    y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    
    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    results[name] = {
        'accuracy': acc,
        'precision': prec,
        'recall': rec,
        'f1': f1,
        'auc': auc
    }
    
    print(f"   {name}:")
    print(f"      Accuracy:  {acc:.4f}")
    print(f"      Precision: {prec:.4f}")
    print(f"      Recall:    {rec:.4f}")
    print(f"      F1-Score:  {f1:.4f}")
    print(f"      AUC-ROC:   {auc:.4f}")
    print()

# Find best model
best_model_name = max(results, key=lambda x: results[x]['f1'])
best_model = models[best_model_name]
print(f"🏆 En İyi Model: {best_model_name}")
print(f"   F1-Score: {results[best_model_name]['f1']:.4f}")
print()

# 7. CROSS-VALIDATION
print("🔄 7. Cross-Validation (10-Fold)...")
cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)
cv_scores = []

for train_idx, val_idx in cv.split(X_train_scaled, y_train):
    X_cv_train, X_cv_val = X_train_scaled[train_idx], X_train_scaled[val_idx]
    y_cv_train, y_cv_val = y_train.iloc[train_idx], y_train.iloc[val_idx]
    
    best_model.fit(X_cv_train, y_cv_train)
    y_cv_pred = best_model.predict(X_cv_val)
    cv_scores.append(f1_score(y_cv_val, y_cv_pred))

print(f"   ✅ CV Mean F1: {np.mean(cv_scores):.4f} (+/- {np.std(cv_scores):.4f})")
print()

# 8. CONFUSION MATRIX
print("📈 8. Confusion Matrix (Best Model)...")
y_pred_final = best_model.predict(X_test_scaled)
cm = confusion_matrix(y_test, y_pred_final)
print(f"   {cm}")
print()
print("   Classification Report:")
print(classification_report(y_test, y_pred_final, target_names=['Healthy', 'Parkinson']))
print()

# 9. MODEL KAYDETME
print("💾 9. Model Kaydetme...")
version = "v8.0_advanced_ensemble"
timestamp = datetime.now().isoformat()

# Save best model
model_path = f'models/neuralcipher_{version}.pkl'
joblib.dump(best_model, model_path)
print(f"   ✅ Model kaydedildi: {model_path}")

# Save scaler
scaler_path = f'models/neuralcipher_{version}_scaler.pkl'
joblib.dump(scaler, scaler_path)
print(f"   ✅ Scaler kaydedildi: {scaler_path}")

# Save metadata
metadata = {
    'version': version,
    'created_at': timestamp,
    'dataset': 'Oxford Parkinson\'s Dataset',
    'total_samples': len(data),
    'training_samples': len(X_train),
    'test_samples': len(X_test),
    'parkinson_samples': int(sum(y == 1)),
    'healthy_samples': int(sum(y == 0)),
    'features': X.shape[1],
    'feature_names': list(X.columns),
    'best_model': best_model_name,
    'model_type': 'Advanced Ensemble (RF + GB + SVM + MLP)',
    'ensemble_weights': [2, 2, 1, 1],
    'individual_models': {
        name: {
            'accuracy': float(results[name]['accuracy']),
            'precision': float(results[name]['precision']),
            'recall': float(results[name]['recall']),
            'f1': float(results[name]['f1']),
            'auc': float(results[name]['auc'])
        }
        for name in results
    },
    'best_model_performance': {
        'test_accuracy': float(results[best_model_name]['accuracy']),
        'test_precision': float(results[best_model_name]['precision']),
        'test_recall': float(results[best_model_name]['recall']),
        'test_f1': float(results[best_model_name]['f1']),
        'test_auc': float(results[best_model_name]['auc']),
        'cv_mean_f1': float(np.mean(cv_scores)),
        'cv_std_f1': float(np.std(cv_scores))
    },
    'confusion_matrix': cm.tolist(),
    'hyperparameter_tuning': {
        'random_forest': rf_grid.best_params_,
        'gradient_boosting': {k: str(v) if not isinstance(v, (int, float)) else v 
                              for k, v in gb_grid.best_params_.items()},
        'svm': {k: str(v) if not isinstance(v, (int, float, str)) else v 
                for k, v in svm_grid.best_params_.items()},
        'neural_network': {k: str(v) if not isinstance(v, (int, float, str)) else v 
                          for k, v in mlp_grid.best_params_.items()}
    }
}

metadata_path = f'models/neuralcipher_{version}_metadata.json'
with open(metadata_path, 'w') as f:
    json.dump(metadata, f, indent=2)
print(f"   ✅ Metadata kaydedildi: {metadata_path}")
print()

# 10. ÖZET
print("=" * 80)
print("✅ MODEL EĞİTİMİ TAMAMLANDI!")
print("=" * 80)
print()
print(f"📊 Model Versiyonu: {version}")
print(f"🏆 En İyi Model: {best_model_name}")
print(f"📈 Test Accuracy: {results[best_model_name]['accuracy']:.4f}")
print(f"📈 Test F1-Score: {results[best_model_name]['f1']:.4f}")
print(f"📈 Test AUC-ROC: {results[best_model_name]['auc']:.4f}")
print(f"🔄 CV Mean F1: {np.mean(cv_scores):.4f} (+/- {np.std(cv_scores):.4f})")
print()
print("🎯 Tüm Modeller:")
for name in results:
    print(f"   {name:20s} - F1: {results[name]['f1']:.4f}, AUC: {results[name]['auc']:.4f}")
print()
print("💾 Kaydedilen Dosyalar:")
print(f"   - {model_path}")
print(f"   - {scaler_path}")
print(f"   - {metadata_path}")
print()
print("=" * 80)
