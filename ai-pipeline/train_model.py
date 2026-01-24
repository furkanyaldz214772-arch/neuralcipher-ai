#!/usr/bin/env python3
"""
NeuralCipher.ai - Production Model Eğitimi
UCI Parkinson veri seti ile Random Forest + Feature Engineering
"""
import sys
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    roc_auc_score, confusion_matrix
)
import joblib
import json
from datetime import datetime

# Klasörler
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

# Model versiyonu
MODEL_VERSION = "v1.0"
MODEL_NAME = f"neuralcipher_{MODEL_VERSION}"


def load_data():
    """UCI Parkinson veri setini yükle"""
    print("📂 Veri yükleniyor...")
    
    data_file = RAW_DIR / "parkinsons.data"
    if not data_file.exists():
        print("❌ Veri seti bulunamadı!")
        print("   Önce şunu çalıştırın: python scripts/download_data.py")
        sys.exit(1)
    
    df = pd.read_csv(data_file)
    print(f"✅ Veri yüklendi: {len(df)} örneklem")
    
    return df


def engineer_features(df):
    """Feature Engineering - Yeni özellikler türet"""
    print("\n🔧 Feature Engineering...")
    
    # Orijinal özellikleri koru
    df_engineered = df.copy()
    
    # Jitter türevleri
    df_engineered['jitter_ratio'] = df['MDVP:Jitter(%)'] / (df['MDVP:Jitter(Abs)'] + 1e-10)
    df_engineered['jitter_combined'] = (df['MDVP:Jitter(%)'] + df['MDVP:RAP'] + df['MDVP:PPQ']) / 3
    
    # Shimmer türevleri
    df_engineered['shimmer_ratio'] = df['MDVP:Shimmer'] / (df['MDVP:Shimmer(dB)'] + 1e-10)
    df_engineered['shimmer_combined'] = (df['MDVP:Shimmer'] + df['Shimmer:APQ3'] + df['Shimmer:APQ5']) / 3
    
    # Frekans özellikleri
    df_engineered['freq_range'] = df['MDVP:Fhi(Hz)'] - df['MDVP:Flo(Hz)']
    df_engineered['freq_variation'] = df['MDVP:Fhi(Hz)'] / (df['MDVP:Flo(Hz)'] + 1e-10)
    
    # Ses kalitesi bileşik skoru
    df_engineered['voice_quality_score'] = (
        df['HNR'] * 0.4 +  # HNR yüksek = iyi
        (1 / (df['NHR'] + 1e-10)) * 0.3 +  # NHR düşük = iyi
        (1 / (df['MDVP:Jitter(%)'] + 1e-10)) * 0.15 +  # Jitter düşük = iyi
        (1 / (df['MDVP:Shimmer'] + 1e-10)) * 0.15  # Shimmer düşük = iyi
    )
    
    # Nonlinear dynamics özellikleri
    df_engineered['rpde_dfa_ratio'] = df['RPDE'] / (df['DFA'] + 1e-10)
    df_engineered['spread_ratio'] = df['spread1'] / (df['spread2'] + 1e-10)
    
    print(f"   Yeni özellikler eklendi: {len(df_engineered.columns) - len(df.columns)} adet")
    
    return df_engineered


def prepare_features(df):
    """Özellikleri hazırla"""
    print("\n🎯 Özellikler hazırlanıyor...")
    
    # 'name' sütununu çıkar
    if 'name' in df.columns:
        df = df.drop('name', axis=1)
    
    # Hedef değişken
    y = df['status']
    X = df.drop('status', axis=1)
    
    print(f"   Toplam özellik sayısı: {X.shape[1]}")
    print(f"   Parkinson hastaları: {y.sum()} ({y.sum()/len(y)*100:.1f}%)")
    print(f"   Sağlıklı bireyler: {len(y) - y.sum()} ({(len(y)-y.sum())/len(y)*100:.1f}%)")
    
    return X, y


def train_optimized_model(X_train, y_train):
    """Hiperparametre optimizasyonu ile model eğit"""
    print("\n🧠 Model eğitiliyor (Hiperparametre optimizasyonu)...")
    
    # Hiperparametre grid
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth': [10, 15, 20],
        'min_samples_split': [2, 5],
        'min_samples_leaf': [1, 2],
        'max_features': ['sqrt', 'log2']
    }
    
    # Base model
    rf = RandomForestClassifier(random_state=42, n_jobs=-1)
    
    # Grid Search
    print("   Grid Search başlatılıyor...")
    grid_search = GridSearchCV(
        rf, param_grid, cv=5, scoring='roc_auc',
        n_jobs=-1, verbose=0
    )
    
    grid_search.fit(X_train, y_train)
    
    print(f"✅ En iyi parametreler bulundu:")
    for param, value in grid_search.best_params_.items():
        print(f"   {param}: {value}")
    
    return grid_search.best_estimator_, grid_search.best_params_


def evaluate_model(model, X_test, y_test, X_train, y_train):
    """Kapsamlı model değerlendirmesi"""
    print("\n📊 Model değerlendiriliyor...")
    
    # Tahminler
    y_pred = model.predict(X_test)
    y_pred_proba = model.predict_proba(X_test)[:, 1]
    
    # Metrikler
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()
    
    specificity = tn / (tn + fp)
    sensitivity = recall
    
    # Train accuracy (overfitting kontrolü)
    train_accuracy = model.score(X_train, y_train)
    
    # Sonuçları yazdır
    print("\n" + "=" * 60)
    print("📈 PRODUCTION MODEL PERFORMANSI")
    print("=" * 60)
    print(f"\n🎯 Test Seti Metrikleri:")
    print(f"   Accuracy:    {accuracy:.4f} ({accuracy*100:.2f}%)")
    print(f"   Precision:   {precision:.4f} ({precision*100:.2f}%)")
    print(f"   Recall:      {recall:.4f} ({recall*100:.2f}%)")
    print(f"   F1-Score:    {f1:.4f}")
    print(f"   AUC-ROC:     {auc:.4f}")
    
    print(f"\n🔬 Klinik Metrikler:")
    print(f"   Sensitivity: {sensitivity:.4f} ({sensitivity*100:.2f}%) - Hasta tespiti")
    print(f"   Specificity: {specificity:.4f} ({specificity*100:.2f}%) - Sağlıklı tespiti")
    
    print(f"\n📊 Confusion Matrix:")
    print(f"   True Negatives:  {tn} (Doğru sağlıklı)")
    print(f"   False Positives: {fp} (Yanlış hasta)")
    print(f"   False Negatives: {fn} (Kaçan hasta)")
    print(f"   True Positives:  {tp} (Doğru hasta)")
    
    print(f"\n🔍 Overfitting Kontrolü:")
    print(f"   Train Accuracy: {train_accuracy:.4f}")
    print(f"   Test Accuracy:  {accuracy:.4f}")
    print(f"   Fark:           {abs(train_accuracy - accuracy):.4f}")
    
    if abs(train_accuracy - accuracy) < 0.05:
        print("   ✅ Model iyi genelleştirilmiş (overfitting yok)")
    else:
        print("   ⚠️  Overfitting riski var")
    
    # Özellik önemleri
    feature_importance = pd.DataFrame({
        'feature': X_test.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(f"\n🔝 En Önemli 10 Özellik:")
    for idx, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']:30s}: {row['importance']:.4f}")
    
    # Sonuçları dict olarak döndür
    results = {
        'model_version': MODEL_VERSION,
        'trained_at': datetime.now().isoformat(),
        'metrics': {
            'accuracy': float(accuracy),
            'precision': float(precision),
            'recall': float(recall),
            'f1_score': float(f1),
            'auc_roc': float(auc),
            'sensitivity': float(sensitivity),
            'specificity': float(specificity)
        },
        'confusion_matrix': {
            'tn': int(tn),
            'fp': int(fp),
            'fn': int(fn),
            'tp': int(tp)
        },
        'overfitting_check': {
            'train_accuracy': float(train_accuracy),
            'test_accuracy': float(accuracy),
            'difference': float(abs(train_accuracy - accuracy))
        },
        'feature_importance': feature_importance.head(20).to_dict('records')
    }
    
    return results


def save_production_model(model, scaler, results, best_params, feature_names):
    """Production modeli kaydet"""
    print("\n💾 Production model kaydediliyor...")
    
    # Model
    model_file = MODELS_DIR / f"{MODEL_NAME}.pkl"
    joblib.dump(model, model_file)
    print(f"✅ Model: {model_file}")
    
    # Scaler
    scaler_file = MODELS_DIR / f"{MODEL_NAME}_scaler.pkl"
    joblib.dump(scaler, scaler_file)
    print(f"✅ Scaler: {scaler_file}")
    
    # Feature names
    features_file = MODELS_DIR / f"{MODEL_NAME}_features.json"
    with open(features_file, 'w') as f:
        json.dump({'features': feature_names}, f, indent=2)
    print(f"✅ Features: {features_file}")
    
    # Metadata
    metadata = {
        **results,
        'best_params': best_params,
        'feature_count': len(feature_names),
        'model_file': str(model_file.name),
        'scaler_file': str(scaler_file.name)
    }
    
    metadata_file = MODELS_DIR / f"{MODEL_NAME}_metadata.json"
    with open(metadata_file, 'w') as f:
        json.dump(metadata, f, indent=2)
    print(f"✅ Metadata: {metadata_file}")
    
    print(f"\n📦 Production model paketi hazır:")
    print(f"   {model_file.name}")
    print(f"   {scaler_file.name}")
    print(f"   {features_file.name}")
    print(f"   {metadata_file.name}")


def main():
    print("\n" + "=" * 60)
    print("🧬 NEURALCIPHER.AI - PRODUCTION MODEL EĞİTİMİ")
    print("=" * 60 + "\n")
    
    # 1. Veri yükleme
    df = load_data()
    
    # 2. Feature Engineering
    df_engineered = engineer_features(df)
    
    # 3. Özellik hazırlama
    X, y = prepare_features(df_engineered)
    
    # 4. Train-test split
    print("\n✂️  Veri bölünüyor (80% train, 20% test)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"   Train: {len(X_train)} örneklem")
    print(f"   Test:  {len(X_test)} örneklem")
    
    # 5. Normalizasyon
    print("\n📏 Özellikler normalize ediliyor...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # DataFrame'e geri çevir
    X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
    X_test_scaled = pd.DataFrame(X_test_scaled, columns=X_test.columns)
    
    # 6. Model eğitimi (optimizasyon ile)
    model, best_params = train_optimized_model(X_train_scaled, y_train)
    
    # 7. Değerlendirme
    results = evaluate_model(model, X_test_scaled, y_test, X_train_scaled, y_train)
    
    # 8. Production model kaydetme
    save_production_model(model, scaler, results, best_params, X.columns.tolist())
    
    # 9. Sonuç özeti
    print("\n" + "=" * 60)
    print("✅ PRODUCTION MODEL HAZIR!")
    print("=" * 60)
    
    accuracy = results['metrics']['accuracy']
    auc = results['metrics']['auc_roc']
    
    if accuracy >= 0.90 and auc >= 0.95:
        print("\n🎉 MÜKEMMEL! Model production için hazır!")
    elif accuracy >= 0.85 and auc >= 0.90:
        print("\n✅ İYİ! Model hedeflere ulaştı.")
    else:
        print("\n⚠️  Model iyileştirme gerektirebilir.")
    
    print(f"\n📊 Özet:")
    print(f"   Accuracy: {accuracy*100:.2f}%")
    print(f"   AUC-ROC:  {auc:.4f}")
    print(f"   Sensitivity: {results['metrics']['sensitivity']*100:.2f}%")
    print(f"   Specificity: {results['metrics']['specificity']*100:.2f}%")
    
    print(f"\n📌 Model dosyası: models/{MODEL_NAME}.pkl")
    print(f"📌 Backend entegrasyonu için hazır!\n")


if __name__ == "__main__":
    main()
