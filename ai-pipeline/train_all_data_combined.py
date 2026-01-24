#!/usr/bin/env python3
"""
TÜM VERİYİ KULLAN - MAKSIMUM MODEL
Oxford (195) + Telemonitoring (5,875) + Sentetik (5,000) = 11,070 ÖRNEK!
"""

import numpy as np
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, accuracy_score
from pathlib import Path
import json
from datetime import datetime

class MaximumDataTrainer:
    def __init__(self):
        self.base_dir = Path(__file__).parent
        self.data_dir = self.base_dir / "data" / "raw"
        self.models_dir = self.base_dir / "models"
        self.models_dir.mkdir(exist_ok=True)
        
        self.model = None
        self.scaler = StandardScaler()
        
    def load_all_data(self):
        """TÜM VERİYİ YÜK - HİÇBİR ŞEYİ ATMA!"""
        print("="*60)
        print("📊 TÜM VERİYİ YÜKLÜYORUM - HİÇBİR ŞEY SİLİNMEYECEK!")
        print("="*60)
        
        all_data = []
        
        # 1. Oxford Parkinson's (195 örnek, 22 özellik)
        print("\n1️⃣ Oxford Parkinson's Dataset")
        oxford_file = self.data_dir / "parkinsons.data"
        if oxford_file.exists():
            df_oxford = pd.read_csv(oxford_file)
            if 'name' in df_oxford.columns:
                df_oxford = df_oxford.drop('name', axis=1)
            
            print(f"   ✅ {len(df_oxford)} örnek yüklendi")
            print(f"   📊 Özellik: {len(df_oxford.columns)-1}")
            print(f"   🔴 Parkinson: {sum(df_oxford['status']==1)}")
            print(f"   🟢 Sağlıklı: {sum(df_oxford['status']==0)}")
            all_data.append(('Oxford', df_oxford))
        
        # 2. Telemonitoring (5,875 örnek, 16 özellik)
        print("\n2️⃣ Telemonitoring Dataset")
        tele_file = self.data_dir / "parkinsons_updrs.data"
        if tele_file.exists():
            df_tele = pd.read_csv(tele_file)
            
            # Gereksiz sütunları çıkar
            drop_cols = ['subject#', 'age', 'sex', 'test_time', 'motor_UPDRS', 'total_UPDRS']
            df_tele = df_tele.drop([col for col in drop_cols if col in df_tele.columns], axis=1)
            
            # Status sütunu ekle (Telemonitoring hepsi Parkinson hastası)
            df_tele['status'] = 1
            
            print(f"   ✅ {len(df_tele)} örnek yüklendi")
            print(f"   📊 Özellik: {len(df_tele.columns)-1}")
            print(f"   ⚠️  Özellik sayısı farklı! Oxford: 22, Telemonitoring: {len(df_tele.columns)-1}")
            
            # Ortak özellikleri bul
            oxford_features = set(all_data[0][1].columns) - {'status'}
            tele_features = set(df_tele.columns) - {'status'}
            common_features = oxford_features & tele_features
            
            print(f"   🔗 Ortak özellik: {len(common_features)}")
            
            # Sadece ortak özellikleri kullan
            common_features_list = list(common_features) + ['status']
            df_tele = df_tele[common_features_list]
            
            print(f"   ✅ {len(df_tele)} örnek eklendi (ortak özelliklerle)")
            all_data.append(('Telemonitoring', df_tele))
        
        # 3. Sentetik Veri (5,000 örnek, 22 özellik)
        print("\n3️⃣ Sentetik Dataset")
        synthetic_file = self.data_dir / "synthetic_parkinsons_5000.csv"
        if synthetic_file.exists():
            df_synthetic = pd.read_csv(synthetic_file)
            if 'name' in df_synthetic.columns:
                df_synthetic = df_synthetic.drop('name', axis=1)
            
            print(f"   ✅ {len(df_synthetic)} örnek yüklendi")
            print(f"   📊 Özellik: {len(df_synthetic.columns)-1}")
            print(f"   🔴 Parkinson: {sum(df_synthetic['status']==1)}")
            print(f"   🟢 Sağlıklı: {sum(df_synthetic['status']==0)}")
            all_data.append(('Synthetic', df_synthetic))
        
        # Ortak özellikleri bul
        print("\n🔗 Ortak Özellikleri Buluyorum...")
        all_features = [set(df.columns) - {'status'} for name, df in all_data]
        common_features = set.intersection(*all_features)
        
        print(f"   ✅ Ortak özellik sayısı: {len(common_features)}")
        print(f"   📋 Özellikler: {sorted(common_features)[:5]}... (ilk 5)")
        
        # Tüm veriyi birleştir (sadece ortak özelliklerle)
        print("\n🔗 Tüm Veriyi Birleştiriyorum...")
        common_features_list = list(common_features) + ['status']
        
        combined_dfs = []
        for name, df in all_data:
            df_filtered = df[common_features_list]
            combined_dfs.append(df_filtered)
            print(f"   ✅ {name}: {len(df_filtered)} örnek eklendi")
        
        df_combined = pd.concat(combined_dfs, ignore_index=True)
        
        # Ayrıştır
        X = df_combined.drop('status', axis=1).values
        y = df_combined['status'].values
        
        print(f"\n✅ TOPLAM VERİ:")
        print(f"   📊 Örnek: {len(X):,}")
        print(f"   📊 Özellik: {X.shape[1]}")
        print(f"   🔴 Parkinson: {np.sum(y == 1):,} ({np.mean(y)*100:.1f}%)")
        print(f"   🟢 Sağlıklı: {np.sum(y == 0):,} ({(1-np.mean(y))*100:.1f}%)")
        
        return X, y, len(common_features)
    
    def prepare_data(self, X, y, test_size=0.2):
        """Veriyi hazırla"""
        print("\n" + "="*60)
        print("🔧 VERİYİ HAZIRLIYORUM")
        print("="*60)
        
        # Train/test split
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, random_state=42, stratify=y
        )
        
        # Normalize
        X_train = self.scaler.fit_transform(X_train)
        X_test = self.scaler.transform(X_test)
        
        print(f"\n✅ Hazır!")
        print(f"   📊 Train: {X_train.shape[0]:,} örnek")
        print(f"   📊 Test: {X_test.shape[0]:,} örnek")
        
        return X_train, X_test, y_train, y_test
    
    def train_model(self, X_train, y_train):
        """Model eğit - GÜÇLÜ AYARLAR!"""
        print("\n" + "="*60)
        print("🚀 MODEL EĞİTİMİ BAŞLIYOR")
        print("="*60)
        
        print("\n🌲 Random Forest - MAKSIMUM GÜÇ!")
        print("   🌳 Ağaç: 300 (daha fazla veri = daha fazla ağaç!)")
        print("   📏 Max Depth: 25")
        print("   🔢 Min Samples Split: 5")
        
        self.model = RandomForestClassifier(
            n_estimators=300,  # Daha fazla!
            max_depth=25,      # Daha derin!
            min_samples_split=5,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1,
            verbose=1
        )
        
        print("\n🔄 Eğitim başladı...")
        self.model.fit(X_train, y_train)
        
        print("\n✅ Eğitim tamamlandı!")
        
        return self.model
    
    def evaluate_model(self, X_train, y_train, X_test, y_test):
        """Model değerlendir"""
        print("\n" + "="*60)
        print("📊 MODEL DEĞERLENDİRME")
        print("="*60)
        
        # Train accuracy
        train_pred = self.model.predict(X_train)
        train_acc = accuracy_score(y_train, train_pred)
        
        # Test predictions
        y_pred = self.model.predict(X_test)
        y_pred_proba = self.model.predict_proba(X_test)[:, 1]
        
        # Metrics
        test_acc = accuracy_score(y_test, y_pred)
        roc_auc = roc_auc_score(y_test, y_pred_proba)
        
        # Confusion matrix
        cm = confusion_matrix(y_test, y_pred)
        tn, fp, fn, tp = cm.ravel()
        
        # Sensitivity and Specificity
        sensitivity = tp / (tp + fn) if (tp + fn) > 0 else 0
        specificity = tn / (tn + fp) if (tn + fp) > 0 else 0
        
        # Classification report
        report = classification_report(y_test, y_pred, output_dict=True)
        
        print(f"\n🎯 SONUÇLAR:")
        print(f"\n   Train Accuracy:  {train_acc*100:.2f}%")
        print(f"   Test Accuracy:   {test_acc*100:.2f}%")
        print(f"   ROC-AUC:         {roc_auc:.4f} ({roc_auc*100:.2f}%)")
        print(f"   Sensitivity:     {sensitivity*100:.2f}%")
        print(f"   Specificity:     {specificity*100:.2f}%")
        print(f"   F1-Score:        {report['1']['f1-score']*100:.2f}%")
        
        print(f"\n📈 Confusion Matrix:")
        print(f"   TN: {tn:,}  FP: {fp:,}")
        print(f"   FN: {fn:,}  TP: {tp:,}")
        
        return {
            'train_accuracy': float(train_acc),
            'test_accuracy': float(test_acc),
            'roc_auc': float(roc_auc),
            'sensitivity': float(sensitivity),
            'specificity': float(specificity),
            'f1_score': float(report['1']['f1-score']),
            'precision': float(report['1']['precision']),
            'recall': float(report['1']['recall']),
            'confusion_matrix': {
                'tn': int(tn), 'fp': int(fp),
                'fn': int(fn), 'tp': int(tp)
            }
        }
    
    def cross_validate(self, X, y, cv=5):
        """Cross-validation"""
        print("\n" + "="*60)
        print("🔄 CROSS-VALIDATION")
        print("="*60)
        
        X_scaled = self.scaler.fit_transform(X)
        
        cv_scores = cross_val_score(
            self.model, X_scaled, y, cv=cv, scoring='accuracy', n_jobs=-1
        )
        
        print(f"\n✅ CV Sonuçları:")
        print(f"   Skorlar: {[f'{s*100:.2f}%' for s in cv_scores]}")
        print(f"   Ortalama: {cv_scores.mean()*100:.2f}%")
        print(f"   Std: ±{cv_scores.std()*100:.2f}%")
        
        return {
            'scores': cv_scores.tolist(),
            'mean': float(cv_scores.mean()),
            'std': float(cv_scores.std())
        }
    
    def save_model(self, results, cv_results, n_features):
        """Modeli kaydet"""
        print("\n" + "="*60)
        print("💾 MODEL KAYDEDILIYOR")
        print("="*60)
        
        version = "v6.0"  # Yeni versiyon!
        model_name = f"neuralcipher_{version}"
        
        # Save model
        model_path = self.models_dir / f"{model_name}.pkl"
        joblib.dump(self.model, model_path)
        print(f"\n✅ Model: {model_path}")
        
        # Save scaler
        scaler_path = self.models_dir / f"{model_name}_scaler.pkl"
        joblib.dump(self.scaler, scaler_path)
        print(f"✅ Scaler: {scaler_path}")
        
        # Save metadata
        metadata = {
            'version': version,
            'training_date': datetime.now().isoformat(),
            'training_samples': 11070,
            'datasets': [
                {'name': 'Oxford Parkinson\'s', 'samples': 195},
                {'name': 'Telemonitoring', 'samples': 5875},
                {'name': 'Synthetic', 'samples': 5000}
            ],
            'features': n_features,
            'algorithm': 'Random Forest',
            'hyperparameters': {
                'n_estimators': 300,
                'max_depth': 25,
                'min_samples_split': 5,
                'min_samples_leaf': 2
            },
            'performance': results,
            'cross_validation': cv_results
        }
        
        metadata_path = self.models_dir / f"{model_name}_metadata.json"
        with open(metadata_path, 'w') as f:
            json.dump(metadata, f, indent=2)
        print(f"✅ Metadata: {metadata_path}")
        
        return model_path
    
    def run(self):
        """Tam pipeline"""
        print("\n" + "="*60)
        print("🚀 MAKSIMUM VERİ - MAKSIMUM MODEL!")
        print("="*60)
        print(f"\n💪 TÜM VERİYİ KULLANIYORUZ!")
        print(f"   Oxford: 195")
        print(f"   Telemonitoring: 5,875")
        print(f"   Sentetik: 5,000")
        print(f"   TOPLAM: 11,070 ÖRNEK!")
        
        # Load
        X, y, n_features = self.load_all_data()
        
        # Prepare
        X_train, X_test, y_train, y_test = self.prepare_data(X, y)
        
        # Train
        self.train_model(X_train, y_train)
        
        # Evaluate
        results = self.evaluate_model(X_train, y_train, X_test, y_test)
        
        # Cross-validate
        cv_results = self.cross_validate(X, y)
        
        # Save
        model_path = self.save_model(results, cv_results, n_features)
        
        print("\n" + "="*60)
        print("🎉 TAMAMLANDI!")
        print("="*60)
        print(f"\n📊 Final Sonuçlar:")
        print(f"   Veri: 11,070 örnek")
        print(f"   Özellik: {n_features}")
        print(f"   Test Accuracy: {results['test_accuracy']*100:.2f}%")
        print(f"   ROC-AUC: {results['roc_auc']*100:.2f}%")
        print(f"   CV Mean: {cv_results['mean']*100:.2f}%")
        print(f"\n💾 Model: {model_path}")
        print(f"\n🚀 Backend'i güncelle: MODEL_VERSION = 'v6.0'")
        
        return results

if __name__ == "__main__":
    trainer = MaximumDataTrainer()
    trainer.run()
