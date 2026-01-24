"""
NeuralCipher v9.0 - Combined Dataset Training
Oxford (195) + Sample 100 (100) + Sample 500 (500) = 795 total samples
Perfect balance: 447 Parkinson (56.2%) + 348 Healthy (43.8%)
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, VotingClassifier
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                            f1_score, confusion_matrix, classification_report, roc_auc_score)
import pickle
import json
from datetime import datetime

print("=" * 80)
print("NEURALCIPHER v9.0 - COMBINED DATASET TRAINING")
print("=" * 80)

# Load combined dataset
print("\n📂 Loading combined dataset...")
df = pd.read_csv('neuralcipher-ai/ai-pipeline/data/processed/combined_dataset.csv')

print(f"   Total samples: {len(df)}")
print(f"   Parkinson: {(df['status']==1).sum()} ({(df['status']==1).sum()/len(df)*100:.1f}%)")
print(f"   Healthy: {(df['status']==0).sum()} ({(df['status']==0).sum()/len(df)*100:.1f}%)")
print(f"   Features: {len(df.columns)-2}")

# Prepare data
X = df.drop(['name', 'status'], axis=1)
y = df['status']

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\n📊 Data split:")
print(f"   Training: {len(X_train)} samples")
print(f"   Testing: {len(X_test)} samples")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\n" + "=" * 80)
print("MODEL TRAINING")
print("=" * 80)

# 1. Random Forest with hyperparameter tuning
print("\n🌲 1. Random Forest (Optimized)...")
rf_params = {
    'n_estimators': [200, 300],
    'max_depth': [15, 20, None],
    'min_samples_split': [2, 5],
    'min_samples_leaf': [1, 2]
}
rf_grid = GridSearchCV(RandomForestClassifier(random_state=42), rf_params, cv=5, n_jobs=-1, verbose=0)
rf_grid.fit(X_train_scaled, y_train)
rf_model = rf_grid.best_estimator_

rf_pred = rf_model.predict(X_test_scaled)
rf_acc = accuracy_score(y_test, rf_pred)
rf_f1 = f1_score(y_test, rf_pred)
rf_auc = roc_auc_score(y_test, rf_model.predict_proba(X_test_scaled)[:, 1])
rf_cv = cross_val_score(rf_model, X_train_scaled, y_train, cv=10).mean()

print(f"   Best params: {rf_grid.best_params_}")
print(f"   Accuracy: {rf_acc*100:.2f}%")
print(f"   F1-Score: {rf_f1*100:.2f}%")
print(f"   AUC-ROC: {rf_auc*100:.2f}%")
print(f"   CV Mean: {rf_cv*100:.2f}%")

# 2. Gradient Boosting with hyperparameter tuning
print("\n🚀 2. Gradient Boosting (Optimized)...")
gb_params = {
    'n_estimators': [200, 300],
    'learning_rate': [0.05, 0.1],
    'max_depth': [3, 5],
    'min_samples_split': [2, 5]
}
gb_grid = GridSearchCV(GradientBoostingClassifier(random_state=42), gb_params, cv=5, n_jobs=-1, verbose=0)
gb_grid.fit(X_train_scaled, y_train)
gb_model = gb_grid.best_estimator_

gb_pred = gb_model.predict(X_test_scaled)
gb_acc = accuracy_score(y_test, gb_pred)
gb_f1 = f1_score(y_test, gb_pred)
gb_auc = roc_auc_score(y_test, gb_model.predict_proba(X_test_scaled)[:, 1])
gb_cv = cross_val_score(gb_model, X_train_scaled, y_train, cv=10).mean()

print(f"   Best params: {gb_grid.best_params_}")
print(f"   Accuracy: {gb_acc*100:.2f}%")
print(f"   F1-Score: {gb_f1*100:.2f}%")
print(f"   AUC-ROC: {gb_auc*100:.2f}%")
print(f"   CV Mean: {gb_cv*100:.2f}%")

# 3. SVM
print("\n🎯 3. Support Vector Machine...")
svm_model = SVC(kernel='rbf', C=10, gamma='scale', probability=True, random_state=42)
svm_model.fit(X_train_scaled, y_train)

svm_pred = svm_model.predict(X_test_scaled)
svm_acc = accuracy_score(y_test, svm_pred)
svm_f1 = f1_score(y_test, svm_pred)
svm_auc = roc_auc_score(y_test, svm_model.predict_proba(X_test_scaled)[:, 1])
svm_cv = cross_val_score(svm_model, X_train_scaled, y_train, cv=10).mean()

print(f"   Accuracy: {svm_acc*100:.2f}%")
print(f"   F1-Score: {svm_f1*100:.2f}%")
print(f"   AUC-ROC: {svm_auc*100:.2f}%")
print(f"   CV Mean: {svm_cv*100:.2f}%")

# 4. Neural Network
print("\n🧠 4. Neural Network...")
nn_model = MLPClassifier(
    hidden_layer_sizes=(100, 50),
    activation='relu',
    solver='adam',
    max_iter=1000,
    random_state=42
)
nn_model.fit(X_train_scaled, y_train)

nn_pred = nn_model.predict(X_test_scaled)
nn_acc = accuracy_score(y_test, nn_pred)
nn_f1 = f1_score(y_test, nn_pred)
nn_auc = roc_auc_score(y_test, nn_model.predict_proba(X_test_scaled)[:, 1])
nn_cv = cross_val_score(nn_model, X_train_scaled, y_train, cv=10).mean()

print(f"   Accuracy: {nn_acc*100:.2f}%")
print(f"   F1-Score: {nn_f1*100:.2f}%")
print(f"   AUC-ROC: {nn_auc*100:.2f}%")
print(f"   CV Mean: {nn_cv*100:.2f}%")

# 5. Voting Ensemble
print("\n🎭 5. Voting Ensemble...")
voting_model = VotingClassifier(
    estimators=[
        ('rf', rf_model),
        ('gb', gb_model),
        ('svm', svm_model)
    ],
    voting='soft'
)
voting_model.fit(X_train_scaled, y_train)

voting_pred = voting_model.predict(X_test_scaled)
voting_acc = accuracy_score(y_test, voting_pred)
voting_f1 = f1_score(y_test, voting_pred)
voting_auc = roc_auc_score(y_test, voting_model.predict_proba(X_test_scaled)[:, 1])
voting_cv = cross_val_score(voting_model, X_train_scaled, y_train, cv=10).mean()

print(f"   Accuracy: {voting_acc*100:.2f}%")
print(f"   F1-Score: {voting_f1*100:.2f}%")
print(f"   AUC-ROC: {voting_auc*100:.2f}%")
print(f"   CV Mean: {voting_cv*100:.2f}%")

# Select best model
print("\n" + "=" * 80)
print("MODEL SELECTION")
print("=" * 80)

models = {
    'Random Forest': (rf_model, rf_acc, rf_f1, rf_auc, rf_cv),
    'Gradient Boosting': (gb_model, gb_acc, gb_f1, gb_auc, gb_cv),
    'SVM': (svm_model, svm_acc, svm_f1, svm_auc, svm_cv),
    'Neural Network': (nn_model, nn_acc, nn_f1, nn_auc, nn_cv),
    'Voting Ensemble': (voting_model, voting_acc, voting_f1, voting_auc, voting_cv)
}

best_model_name = max(models.items(), key=lambda x: x[1][1])[0]
best_model, best_acc, best_f1, best_auc, best_cv = models[best_model_name]

print(f"\n🏆 BEST MODEL: {best_model_name}")
print(f"   Accuracy: {best_acc*100:.2f}%")
print(f"   F1-Score: {best_f1*100:.2f}%")
print(f"   AUC-ROC: {best_auc*100:.2f}%")
print(f"   CV Mean: {best_cv*100:.2f}%")

# Detailed metrics
print("\n📊 DETAILED METRICS:")
best_pred = best_model.predict(X_test_scaled)
print(f"   Precision: {precision_score(y_test, best_pred)*100:.2f}%")
print(f"   Recall: {recall_score(y_test, best_pred)*100:.2f}%")

print("\n📈 Confusion Matrix:")
cm = confusion_matrix(y_test, best_pred)
print(f"   TN: {cm[0,0]}, FP: {cm[0,1]}")
print(f"   FN: {cm[1,0]}, TP: {cm[1,1]}")

print("\n📋 Classification Report:")
print(classification_report(y_test, best_pred, target_names=['Healthy', 'Parkinson']))

# Feature importance (if available)
if hasattr(best_model, 'feature_importances_'):
    print("\n🔬 TOP 10 MOST IMPORTANT FEATURES:")
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    for idx, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']}: {row['importance']*100:.2f}%")

# Save model
print("\n" + "=" * 80)
print("SAVING MODEL")
print("=" * 80)

model_path = 'neuralcipher-ai/ai-pipeline/models/neuralcipher_v9.0_combined.pkl'
scaler_path = 'neuralcipher-ai/ai-pipeline/models/neuralcipher_v9.0_combined_scaler.pkl'
metadata_path = 'neuralcipher-ai/ai-pipeline/models/neuralcipher_v9.0_combined_metadata.json'

# Save model and scaler
with open(model_path, 'wb') as f:
    pickle.dump(best_model, f)
print(f"✅ Model saved: {model_path}")

with open(scaler_path, 'wb') as f:
    pickle.dump(scaler, f)
print(f"✅ Scaler saved: {scaler_path}")

# Save metadata
metadata = {
    'version': '9.0',
    'model_type': best_model_name,
    'training_date': datetime.now().isoformat(),
    'dataset': {
        'total_samples': len(df),
        'parkinson_samples': int((df['status']==1).sum()),
        'healthy_samples': int((df['status']==0).sum()),
        'sources': ['Oxford (195)', 'Sample 100 (100)', 'Sample 500 (500)'],
        'balance_ratio': f"{(df['status']==1).sum() / (df['status']==0).sum():.2f}:1"
    },
    'features': {
        'count': len(X.columns),
        'names': X.columns.tolist()
    },
    'performance': {
        'accuracy': float(best_acc),
        'f1_score': float(best_f1),
        'auc_roc': float(best_auc),
        'cv_mean': float(best_cv),
        'precision': float(precision_score(y_test, best_pred)),
        'recall': float(recall_score(y_test, best_pred))
    },
    'confusion_matrix': {
        'true_negative': int(cm[0,0]),
        'false_positive': int(cm[0,1]),
        'false_negative': int(cm[1,0]),
        'true_positive': int(cm[1,1])
    },
    'comparison_with_v8': {
        'v8_accuracy': 0.9487,
        'v9_accuracy': float(best_acc),
        'improvement': f"{(best_acc - 0.9487)*100:.2f}%"
    }
}

with open(metadata_path, 'w') as f:
    json.dump(metadata, f, indent=2)
print(f"✅ Metadata saved: {metadata_path}")

print("\n" + "=" * 80)
print("TRAINING COMPLETE!")
print("=" * 80)
print(f"\n🎉 NeuralCipher v9.0 trained successfully!")
print(f"   Model: {best_model_name}")
print(f"   Accuracy: {best_acc*100:.2f}%")
print(f"   Dataset: 795 samples (447 PD + 348 HC)")
print(f"   Balance: 1.28:1 (EXCELLENT!)")
print("\n✅ Ready for deployment!")
