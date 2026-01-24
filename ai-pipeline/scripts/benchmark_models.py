#!/usr/bin/env python3
"""
Model Karşılaştırma ve Benchmark
Farklı ML algoritmalarını karşılaştırır
"""
import pandas as pd
import numpy as np
from pathlib import Path
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import accuracy_score, roc_auc_score, f1_score
import time
import json

# Klasörler
BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DIR = DATA_DIR / "raw"
RESULTS_DIR = BASE_DIR / "results"
RESULTS_DIR.mkdir(exist_ok=True)


def load_and_prepare_data():
    """Veri yükle ve hazırla"""
    print("📂 Veri yükleniyor...")
    
    data_file = RAW_DIR / "parkinsons.data"
    df = pd.read_csv(data_file)
    
    # Özellikler ve hedef
    if 'name' in df.columns:
        df = df.drop('name', axis=1)
    
    X = df.drop('status', axis=1)
    y = df['status']
    
    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    # Normalizasyon
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print(f"✅ Veri hazır: {len(X_train)} train, {len(X_test)} test")
    
    return X_train_scaled, X_test_scaled, y_train, y_test


def benchmark_models(X_train, X_test, y_train, y_test):
    """Farklı modelleri karşılaştır"""
    print("\n🔬 Model karşılaştırması başlıyor...\n")
    
    # Modeller
    models = {
        'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1),
        'Gradient Boosting': GradientBoostingClassifier(n_estimators=100, random_state=42),
        'SVM (RBF)': SVC(kernel='rbf', probability=True, random_state=42),
        'Logistic Regression': LogisticRegression(max_iter=1000, random_state=42),
        'K-Nearest Neighbors': KNeighborsClassifier(n_neighbors=5),
        'Naive Bayes': GaussianNB()
    }
    
    results = []
    
    for name, model in models.items():
        print(f"🧠 {name} eğitiliyor...")
        
        # Eğitim süresi
        start_time = time.time()
        model.fit(X_train, y_train)
        train_time = time.time() - start_time
        
        # Tahmin süresi
        start_time = time.time()
        y_pred = model.predict(X_test)
        inference_time = (time.time() - start_time) / len(X_test) * 1000  # ms per sample
        
        # Metrikler
        accuracy = accuracy_score(y_test, y_pred)
        f1 = f1_score(y_test, y_pred)
        
        # AUC-ROC (probability destekleyen modeller için)
        try:
            y_pred_proba = model.predict_proba(X_test)[:, 1]
            auc = roc_auc_score(y_test, y_pred_proba)
        except:
            auc = None
        
        # Cross-validation
        cv_scores = cross_val_score(model, X_train, y_train, cv=5, scoring='accuracy')
        
        result = {
            'model': name,
            'accuracy': accuracy,
            'f1_score': f1,
            'auc_roc': auc,
            'cv_mean': cv_scores.mean(),
            'cv_std': cv_scores.std(),
            'train_time': train_time,
            'inference_time_ms': inference_time
        }
        
        results.append(result)
        
        print(f"   Accuracy: {accuracy:.4f}")
        print(f"   F1-Score: {f1:.4f}")
        if auc:
            print(f"   AUC-ROC:  {auc:.4f}")
        print(f"   CV Mean:  {cv_scores.mean():.4f} ± {cv_scores.std():.4f}")
        print(f"   Train Time: {train_time:.2f}s")
        print(f"   Inference: {inference_time:.2f}ms/sample\n")
    
    return results


def print_comparison_table(results):
    """Karşılaştırma tablosu yazdır"""
    print("\n" + "=" * 100)
    print("📊 MODEL KARŞILAŞTIRMA TABLOSU")
    print("=" * 100)
    
    # DataFrame oluştur
    df = pd.DataFrame(results)
    
    # Sıralama (accuracy'ye göre)
    df = df.sort_values('accuracy', ascending=False)
    
    # Yazdır
    print(f"\n{'Model':<25} {'Accuracy':<12} {'F1-Score':<12} {'AUC-ROC':<12} {'CV Mean':<15} {'Train Time':<12} {'Inference':<12}")
    print("-" * 100)
    
    for _, row in df.iterrows():
        auc_str = f"{row['auc_roc']:.4f}" if row['auc_roc'] else "N/A"
        print(f"{row['model']:<25} {row['accuracy']:.4f}      {row['f1_score']:.4f}      "
              f"{auc_str:<12} {row['cv_mean']:.4f}±{row['cv_std']:.4f}   "
              f"{row['train_time']:.2f}s       {row['inference_time_ms']:.2f}ms")
    
    print("\n" + "=" * 100)
    
    # En iyi model
    best_model = df.iloc[0]
    print(f"\n🏆 EN İYİ MODEL: {best_model['model']}")
    print(f"   Accuracy: {best_model['accuracy']:.4f} ({best_model['accuracy']*100:.2f}%)")
    if best_model['auc_roc']:
        print(f"   AUC-ROC:  {best_model['auc_roc']:.4f}")
    print(f"   F1-Score: {best_model['f1_score']:.4f}")
    
    return df


def save_results(results_df):
    """Sonuçları kaydet"""
    output_file = RESULTS_DIR / "model_benchmark.json"
    results_df.to_json(output_file, orient='records', indent=2)
    print(f"\n💾 Sonuçlar kaydedildi: {output_file}")
    
    # CSV olarak da kaydet
    csv_file = RESULTS_DIR / "model_benchmark.csv"
    results_df.to_csv(csv_file, index=False)
    print(f"💾 CSV: {csv_file}")


def main():
    print("\n" + "=" * 100)
    print("🧬 NEURALCIPHER.AI - MODEL BENCHMARK")
    print("=" * 100 + "\n")
    
    # Veri hazırlama
    X_train, X_test, y_train, y_test = load_and_prepare_data()
    
    # Model karşılaştırması
    results = benchmark_models(X_train, X_test, y_train, y_test)
    
    # Karşılaştırma tablosu
    results_df = print_comparison_table(results)
    
    # Sonuçları kaydet
    save_results(results_df)
    
    print("\n" + "=" * 100)
    print("✅ BENCHMARK TAMAMLANDI!")
    print("=" * 100 + "\n")


if __name__ == "__main__":
    main()

