#!/usr/bin/env python3
"""
Baseline Model Eğitimi - Random Forest
Hızlı prototip ve benchmark için
"""
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import (
    accuracy_score, precision_score, recall_score, f1_score,
    confusion_matrix, classification_report, roc_auc_score, roc_curve
)
import joblib
import json

# Klasörler
DATA_DIR = Path("data")
RAW_DIR = DATA_DIR / "raw"
MODELS_DIR = Path("models")
MODELS_DIR.mkdir(exist_ok=True)

def load_data():
    """Veri setini yükle"""
    print("📂 Veri yükleniyor...")
    
    # UCI veri setini dene
    uci_file = RAW_DIR / "parkinsons.data"
    sample_file = RAW_DIR / "parkinsons_sample.data"
    
    if uci_file.exists():
        df = pd.read_csv(uci_file)
        print(f"✅ UCI veri seti yüklendi: {len(df)} satır")
    elif sample_file.exists():
        df = pd.read_csv(sample_file)
        print(f"✅ Örnek veri seti yüklendi: {len(df)} satır")
    else:
        raise FileNotFoundError("Veri seti bulunamadı! Önce download_data.py çalıştırın.")
    
    return df

def prepare_features(df):
    """Özellikleri hazırla"""
    print("\n🔧 Özellikler hazırlanıyor...")
    
    # 'name' sütununu çıkar (ID)
    if 'name' in df.columns:
        df = df.drop('name', axis=1)
    
    # Özellikler ve hedef
    X = df.drop('status', axis=1)
    y = df['status']
    
    print(f"   Özellik sayısı: {X.shape[1]}")
    print(f"   Pozitif örnekler (Parkinson): {y.sum()}")
    print(f"   Negatif örnekler (Sağlıklı): {len(y) - y.sum()}")
    
    return X, y

def train_model(X_train, y_train):
    """Random Forest modelini eğit"""
    print("\n🧠 Model eğitiliyor...")
    
    # Random Forest parametreleri
    model = RandomForestClassifier(
        n_estimators=100,
        max_depth=10,
        min_samples_split=5,
        min_samples_leaf=2,
        random_state=42,
        n_jobs=-1
    )
    
    # Eğitim
    model.fit(X_train, y_train)
    
    print("✅ Model eğitimi tamamlandı!")
    
    return model

def evaluate_model(model, X_test, y_test, X_train, y_train):
    """Modeli değerlendir"""
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
    sensitivity = recall  # Aynı şey
    
    # Cross-validation
    cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
    
    # Sonuçları yazdır
    print("\n" + "=" * 60)
    print("📈 MODEL PERFORMANSI")
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
    print(f"   True Negatives:  {tn}")
    print(f"   False Positives: {fp}")
    print(f"   False Negatives: {fn}")
    print(f"   True Positives:  {tp}")
    print(f"\n🔄 Cross-Validation (5-fold):")
    print(f"   Mean Accuracy: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
    
    # Özellik önem sıralaması
    feature_importance = pd.DataFrame({
        'feature': X_test.columns,
        'importance': model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    print(f"\n🔝 En Önemli 10 Özellik:")
    for idx, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']:20s}: {row['importance']:.4f}")
    
    # Sonuçları kaydet
    results = {
        'accuracy': float(accuracy),
        'precision': float(precision),
        'recall': float(recall),
        'f1_score': float(f1),
        'auc_roc': float(auc),
        'sensitivity': float(sensitivity),
        'specificity': float(specificity),
        'confusion_matrix': {
            'tn': int(tn),
            'fp': int(fp),
            'fn': int(fn),
            'tp': int(tp)
        },
        'cv_mean': float(cv_scores.mean()),
        'cv_std': float(cv_scores.std()),
        'feature_importance': feature_importance.to_dict('records')
    }
    
    return results

def save_model(model, scaler, results):
    """Modeli ve sonuçları kaydet"""
    print("\n💾 Model kaydediliyor...")
    
    # Model
    model_file = MODELS_DIR / "baseline_rf_model.pkl"
    joblib.dump(model, model_file)
    print(f"✅ Model kaydedildi: {model_file}")
    
    # Scaler
    scaler_file = MODELS_DIR / "scaler.pkl"
    joblib.dump(scaler, scaler_file)
    print(f"✅ Scaler kaydedildi: {scaler_file}")
    
    # Sonuçlar
    results_file = MODELS_DIR / "baseline_results.json"
    with open(results_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"✅ Sonuçlar kaydedildi: {results_file}")

def main():
    print("\n" + "=" * 60)
    print("🧬 NEURALCIPHER.AI - BASELINE MODEL EĞİTİMİ")
    print("=" * 60 + "\n")
    
    # 1. Veri yükleme
    df = load_data()
    
    # 2. Özellik hazırlama
    X, y = prepare_features(df)
    
    # 3. Train-test split
    print("\n✂️  Veri bölünüyor (80% train, 20% test)...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    print(f"   Train: {len(X_train)} örneklem")
    print(f"   Test:  {len(X_test)} örneklem")
    
    # 4. Normalizasyon
    print("\n📏 Özellikler normalize ediliyor...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # DataFrame'e geri çevir (özellik isimlerini korumak için)
    X_train_scaled = pd.DataFrame(X_train_scaled, columns=X_train.columns)
    X_test_scaled = pd.DataFrame(X_test_scaled, columns=X_test.columns)
    
    # 5. Model eğitimi
    model = train_model(X_train_scaled, y_train)
    
    # 6. Değerlendirme
    results = evaluate_model(model, X_test_scaled, y_test, X_train_scaled, y_train)
    
    # 7. Kaydetme
    save_model(model, scaler, results)
    
    # 8. Sonuç özeti
    print("\n" + "=" * 60)
    print("✅ EĞİTİM TAMAMLANDI!")
    print("=" * 60)
    
    if results['accuracy'] >= 0.85:
        print("\n🎉 BAŞARILI! Model %85+ doğruluk hedefine ulaştı!")
    elif results['accuracy'] >= 0.80:
        print("\n✅ İYİ! Model %80+ doğruluk elde etti.")
    else:
        print("\n⚠️  Model doğruluğu beklenenin altında. Hiperparametre optimizasyonu gerekebilir.")
    
    print(f"\n📌 Model dosyası: {MODELS_DIR / 'baseline_rf_model.pkl'}")
    print(f"📌 Sonuçlar: {MODELS_DIR / 'baseline_results.json'}")
    print("\n💡 Sonraki adım: Neural Network modeli eğitimi")
    print("   python scripts/train_neural_network.py\n")

if __name__ == "__main__":
    main()

