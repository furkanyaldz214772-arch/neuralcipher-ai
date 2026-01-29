#!/usr/bin/env python3
"""
Yeni Dataset Eğitim Scripti
Herhangi bir CSV dataseti ile hızlı model eğitimi
"""

import pandas as pd
import numpy as np
from xgboost import XGBClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import sys
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

class NewDatasetTrainer:
    """Yeni dataset ile model eğitimi"""
    
    def __init__(self, data_path):
        self.data_path = data_path
        self.model = None
        self.scaler = None
        self.feature_names = None
        
    def load_and_validate(self):
        """Veriyi yükle ve doğrula"""
        print("=" * 70)
        print("📂 VERİ YÜKLEME VE DOĞRULAMA")
        print("=" * 70)
        
        # Veriyi yükle
        try:
            df = pd.read_csv(self.data_path)
            print(f"\n✅ Veri başarıyla yüklendi: {self.data_path}")
        except Exception as e:
            print(f"\n❌ HATA: Veri yüklenemedi!")
            print(f"   Hata: {e}")
            sys.exit(1)
        
        # Temel bilgiler
        print(f"\n📊 Dataset Bilgileri:")
        print(f"   Satır sayısı: {len(df):,}")
        print(f"   Kolon sayısı: {len(df.columns)}")
        print(f"   Boyut: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
        
        # Kolonları göster
        print(f"\n📋 Kolonlar ({len(df.columns)} adet):")
        for i, col in enumerate(df.columns[:10], 1):
            print(f"   {i}. {col}")
        if len(df.columns) > 10:
            print(f"   ... ve {len(df.columns)-10} kolon daha")
        
        # Status kolonu kontrolü
        if 'status' not in df.columns:
            print(f"\n⚠️  'status' kolonu bulunamadı!")
            print(f"   Mevcut kolonlar: {df.columns.tolist()}")
            
            # Olası etiket kolonlarını ara
            possible_labels = ['label', 'target', 'class', 'diagnosis', 'outcome']
            found = False
            for col in possible_labels:
                if col in df.columns:
                    print(f"\n✅ '{col}' kolonu bulundu, 'status' olarak yeniden adlandırılıyor...")
                    df = df.rename(columns={col: 'status'})
                    found = True
                    break
            
            if not found:
                print(f"\n❌ Etiket kolonu bulunamadı!")
                print(f"   Lütfen etiket kolonunu 'status' olarak adlandırın")
                sys.exit(1)
        
        # Status değerlerini kontrol et
        print(f"\n🎯 Etiket Dağılımı:")
        status_counts = df['status'].value_counts()
        for label, count in status_counts.items():
            percentage = count / len(df) * 100
            label_name = "Parkinson" if label == 1 else "Sağlıklı"
            print(f"   {label_name} ({label}): {count:,} (%{percentage:.1f})")
        
        # Eksik değer kontrolü
        missing = df.isnull().sum()
        if missing.sum() > 0:
            print(f"\n⚠️  Eksik değerler bulundu:")
            for col, count in missing[missing > 0].items():
                print(f"   {col}: {count} eksik")
            print(f"\n🔧 Eksik değerler ortalama ile doldurulacak...")
            df = df.fillna(df.mean(numeric_only=True))
        else:
            print(f"\n✅ Eksik değer yok")
        
        # Veri tiplerini kontrol et
        non_numeric = df.select_dtypes(exclude=[np.number]).columns.tolist()
        if 'status' in non_numeric:
            non_numeric.remove('status')
        
        if non_numeric:
            print(f"\n⚠️  Sayısal olmayan kolonlar bulundu:")
            for col in non_numeric:
                print(f"   {col}: {df[col].dtype}")
            print(f"\n🔧 Bu kolonlar çıkarılacak...")
            df = df.drop(columns=non_numeric)
        
        return df
    
    def prepare_data(self, df):
        """Veriyi hazırla"""
        print("\n" + "=" * 70)
        print("🔧 VERİ HAZIRLAMA")
        print("=" * 70)
        
        # Özellikler ve etiketler
        X = df.drop('status', axis=1)
        y = df['status']
        
        # İsim kolonu varsa çıkar
        if 'name' in X.columns:
            X = X.drop('name', axis=1)
            print(f"\n✅ 'name' kolonu çıkarıldı")
        
        self.feature_names = X.columns.tolist()
        
        print(f"\n📊 Hazırlanan Veri:")
        print(f"   Özellik sayısı: {X.shape[1]}")
        print(f"   Örnek sayısı: {X.shape[0]:,}")
        
        # Train/Test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        print(f"\n✅ Train/Test Split:")
        print(f"   Train: {len(X_train):,} örnek")
        print(f"   Test: {len(X_test):,} örnek")
        print(f"   Train Parkinson: {sum(y_train==1):,} (%{sum(y_train==1)/len(y_train)*100:.1f})")
        print(f"   Test Parkinson: {sum(y_test==1):,} (%{sum(y_test==1)/len(y_test)*100:.1f})")
        
        # Normalizasyon
        self.scaler = StandardScaler()
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        print(f"\n✅ Normalizasyon tamamlandı")
        
        return X_train_scaled, X_test_scaled, y_train, y_test
    
    def train_model(self, X_train, y_train):
        """Model eğit"""
        print("\n" + "=" * 70)
        print("🚀 MODEL EĞİTİMİ")
        print("=" * 70)
        
        print(f"\n⏳ XGBoost modeli eğitiliyor...")
        print(f"   Parametreler:")
        print(f"   - n_estimators: 500")
        print(f"   - max_depth: 7")
        print(f"   - learning_rate: 0.1")
        
        self.model = XGBClassifier(
            n_estimators=500,
            max_depth=7,
            learning_rate=0.1,
            random_state=42,
            n_jobs=-1,
            eval_metric='logloss'
        )
        
        self.model.fit(X_train, y_train)
        
        print(f"\n✅ Model eğitimi tamamlandı!")
        
    def evaluate_model(self, X_test, y_test):
        """Modeli değerlendir"""
        print("\n" + "=" * 70)
        print("📊 MODEL DEĞERLENDİRME")
        print("=" * 70)
        
        # Tahminler
        y_pred = self.model.predict(X_test)
        y_pred_proba = self.model.predict_proba(X_test)[:, 1]
        
        # Doğruluk
        accuracy = accuracy_score(y_test, y_pred)
        
        print(f"\n🎯 Test Doğruluğu: %{accuracy*100:.2f}")
        
        # Confusion Matrix
        cm = confusion_matrix(y_test, y_pred)
        print(f"\n📈 Confusion Matrix:")
        print(f"   True Negatives (Doğru Sağlıklı):  {cm[0][0]}")
        print(f"   False Positives (Yanlış Parkinson): {cm[0][1]}")
        print(f"   False Negatives (Yanlış Sağlıklı):  {cm[1][0]}")
        print(f"   True Positives (Doğru Parkinson):  {cm[1][1]}")
        
        # Classification Report
        print(f"\n📋 Detaylı Rapor:")
        print(classification_report(y_test, y_pred, 
                                    target_names=['Sağlıklı', 'Parkinson'],
                                    digits=4))
        
        # Özellik önem sıralaması
        feature_importance = pd.DataFrame({
            'feature': self.feature_names,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print(f"\n🔝 En Önemli 10 Özellik:")
        for i, row in feature_importance.head(10).iterrows():
            print(f"   {row['feature']:30s}: {row['importance']:.4f}")
        
        return accuracy
    
    def cross_validate(self, X, y):
        """Cross-validation"""
        print("\n" + "=" * 70)
        print("🔄 CROSS-VALIDATION (5-Fold)")
        print("=" * 70)
        
        print(f"\n⏳ Cross-validation yapılıyor...")
        
        cv_scores = cross_val_score(
            self.model, X, y, cv=5, scoring='accuracy', n_jobs=-1
        )
        
        print(f"\n📊 Fold Sonuçları:")
        for i, score in enumerate(cv_scores, 1):
            print(f"   Fold {i}: %{score*100:.2f}")
        
        print(f"\n✅ Ortalama CV Doğruluğu: %{cv_scores.mean()*100:.2f} (±{cv_scores.std()*100:.2f})")
        
        return cv_scores
    
    def save_model(self):
        """Modeli kaydet"""
        print("\n" + "=" * 70)
        print("💾 MODEL KAYDETME")
        print("=" * 70)
        
        # Klasör oluştur
        output_dir = Path("models/new_dataset")
        output_dir.mkdir(parents=True, exist_ok=True)
        
        # Model kaydet
        model_path = output_dir / "model.pkl"
        joblib.dump(self.model, model_path)
        
        # Scaler kaydet
        scaler_path = output_dir / "scaler.pkl"
        joblib.dump(self.scaler, scaler_path)
        
        # Feature names kaydet
        features_path = output_dir / "features.txt"
        with open(features_path, 'w') as f:
            f.write('\n'.join(self.feature_names))
        
        print(f"\n✅ Model kaydedildi:")
        print(f"   Model: {model_path}")
        print(f"   Scaler: {scaler_path}")
        print(f"   Features: {features_path}")
        
        return model_path
    
    def run_full_pipeline(self):
        """Tam pipeline çalıştır"""
        print("\n" + "=" * 70)
        print("🎯 YENİ DATASET EĞİTİM PİPELINE")
        print("=" * 70)
        
        # 1. Veri yükle ve doğrula
        df = self.load_and_validate()
        
        # 2. Veriyi hazırla
        X_train, X_test, y_train, y_test = self.prepare_data(df)
        
        # 3. Model eğit
        self.train_model(X_train, y_train)
        
        # 4. Değerlendir
        accuracy = self.evaluate_model(X_test, y_test)
        
        # 5. Cross-validation
        X = df.drop('status', axis=1)
        if 'name' in X.columns:
            X = X.drop('name', axis=1)
        y = df['status']
        X_scaled = self.scaler.transform(X)
        cv_scores = self.cross_validate(X_scaled, y)
        
        # 6. Model kaydet
        model_path = self.save_model()
        
        # Özet
        print("\n" + "=" * 70)
        print("🎉 EĞİTİM TAMAMLANDI!")
        print("=" * 70)
        print(f"\n📊 Sonuç Özeti:")
        print(f"   Test Doğruluğu: %{accuracy*100:.2f}")
        print(f"   CV Doğruluğu: %{cv_scores.mean()*100:.2f} (±{cv_scores.std()*100:.2f})")
        print(f"   Model: {model_path}")
        print(f"\n✅ Model kullanıma hazır!")

def main():
    """Ana fonksiyon"""
    if len(sys.argv) < 2:
        print("\n❌ HATA: Veri dosyası belirtilmedi!")
        print("\nKullanım:")
        print("  python train_new_dataset.py <data_path>")
        print("\nÖrnekler:")
        print("  python train_new_dataset.py data/yeni_veri.csv")
        print("  python train_new_dataset.py C:\\Users\\...\\dataset.csv")
        sys.exit(1)
    
    data_path = sys.argv[1]
    
    # Dosya var mı kontrol et
    if not Path(data_path).exists():
        print(f"\n❌ HATA: Dosya bulunamadı: {data_path}")
        sys.exit(1)
    
    # Trainer oluştur ve çalıştır
    trainer = NewDatasetTrainer(data_path)
    trainer.run_full_pipeline()

if __name__ == "__main__":
    main()
