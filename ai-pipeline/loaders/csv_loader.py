"""
CSV Tabular Data Loader
19.25 GB - 2,395 dosya
Tüm CSV dosyalarını birleştir ve feature engineering yap
"""

import pandas as pd
import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple
import logging
from sklearn.preprocessing import StandardScaler, LabelEncoder
import warnings
warnings.filterwarnings('ignore')

logger = logging.getLogger(__name__)


class CSVDataLoader:
    """CSV dosyalarını yükler, birleştirir ve işler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.csv_files = self.discover_files()
        logger.info(f"📊 {len(self.csv_files)} CSV dosyası bulundu")
        
        # Önemli feature'lar (59 özellik sistemi)
        self.voice_features = [
            'MDVP:Fo(Hz)', 'MDVP:Fhi(Hz)', 'MDVP:Flo(Hz)',
            'MDVP:Jitter(%)', 'MDVP:Jitter(Abs)', 'MDVP:RAP', 'MDVP:PPQ',
            'Jitter:DDP', 'MDVP:Shimmer', 'MDVP:Shimmer(dB)',
            'Shimmer:APQ3', 'Shimmer:APQ5', 'MDVP:APQ', 'Shimmer:DDA',
            'NHR', 'HNR', 'RPDE', 'DFA', 'spread1', 'spread2', 'D2', 'PPE'
        ]
        
        self.updrs_features = [
            'motor_UPDRS', 'total_UPDRS', 'age', 'sex', 'test_time'
        ]
    
    def discover_files(self) -> List[Path]:
        """Tüm CSV dosyalarını bul"""
        files = list(self.data_dir.rglob('*.csv'))
        return sorted(files)
    
    def load_single_csv(self, file_path: Path) -> pd.DataFrame:
        """Tek bir CSV dosyasını yükle"""
        try:
            # Farklı encoding'leri dene
            for encoding in ['utf-8', 'latin-1', 'iso-8859-1', 'cp1252']:
                try:
                    df = pd.read_csv(file_path, encoding=encoding)
                    logger.debug(f"✅ Yüklendi: {file_path.name} ({len(df)} satır)")
                    return df
                except UnicodeDecodeError:
                    continue
            
            logger.warning(f"⚠️  Encoding hatası: {file_path.name}")
            return None
            
        except Exception as e:
            logger.error(f"❌ Yükleme hatası {file_path.name}: {e}")
            return None
    
    def identify_dataset_type(self, df: pd.DataFrame, file_path: Path) -> str:
        """Dataset tipini belirle"""
        columns = [c.lower() for c in df.columns]
        filename = file_path.stem.lower()
        
        # Parkinson's voice features
        if any(feat.lower() in columns for feat in self.voice_features):
            return 'voice_features'
        
        # UPDRS scores
        if any(feat.lower() in columns for feat in self.updrs_features):
            return 'updrs_scores'
        
        # Gait/movement data
        if 'gait' in filename or 'movement' in filename:
            return 'gait_data'
        
        # Demographics
        if 'demographic' in filename or 'patient' in filename:
            return 'demographics'
        
        # Clinical data
        if 'clinical' in filename or 'diagnosis' in filename:
            return 'clinical'
        
        # Protein/peptide data
        if 'protein' in filename or 'peptide' in filename:
            return 'biomarkers'
        
        return 'unknown'
    
    def standardize_columns(self, df: pd.DataFrame, dataset_type: str) -> pd.DataFrame:
        """Sütun isimlerini standardize et"""
        # Boşlukları ve özel karakterleri temizle
        df.columns = df.columns.str.strip().str.replace(' ', '_')
        
        # Label sütununu standardize et
        label_candidates = ['status', 'label', 'class', 'diagnosis', 'target']
        for col in df.columns:
            if col.lower() in label_candidates:
                df = df.rename(columns={col: 'label'})
                break
        
        # Label encoding
        if 'label' in df.columns:
            if df['label'].dtype == 'object':
                le = LabelEncoder()
                df['label'] = le.fit_transform(df['label'])
        
        return df
    
    def extract_features(self, df: pd.DataFrame, dataset_type: str) -> pd.DataFrame:
        """Feature engineering"""
        
        if dataset_type == 'voice_features':
            # Jitter/Shimmer oranları
            if 'MDVP:Jitter(%)' in df.columns and 'MDVP:Shimmer' in df.columns:
                df['jitter_shimmer_ratio'] = df['MDVP:Jitter(%)'] / (df['MDVP:Shimmer'] + 1e-6)
            
            # HNR/NHR oranı
            if 'HNR' in df.columns and 'NHR' in df.columns:
                df['hnr_nhr_ratio'] = df['HNR'] / (df['NHR'] + 1e-6)
            
            # Frequency range
            if 'MDVP:Fhi(Hz)' in df.columns and 'MDVP:Flo(Hz)' in df.columns:
                df['frequency_range'] = df['MDVP:Fhi(Hz)'] - df['MDVP:Flo(Hz)']
        
        elif dataset_type == 'updrs_scores':
            # UPDRS score interactions
            if 'motor_UPDRS' in df.columns and 'total_UPDRS' in df.columns:
                df['motor_total_ratio'] = df['motor_UPDRS'] / (df['total_UPDRS'] + 1e-6)
            
            # Age interactions
            if 'age' in df.columns and 'motor_UPDRS' in df.columns:
                df['age_motor_interaction'] = df['age'] * df['motor_UPDRS']
        
        return df
    
    def merge_datasets(self, datasets: Dict[str, List[pd.DataFrame]]) -> pd.DataFrame:
        """Farklı tipteki datasetleri birleştir"""
        merged_dfs = []
        
        for dataset_type, df_list in datasets.items():
            if not df_list:
                continue
            
            logger.info(f"🔄 Birleştiriliyor: {dataset_type} ({len(df_list)} dosya)")
            
            # Aynı tipteki dosyaları birleştir
            combined = pd.concat(df_list, ignore_index=True, sort=False)
            
            # Duplicate'leri kaldır
            combined = combined.drop_duplicates()
            
            # Dataset type bilgisini ekle
            combined['dataset_type'] = dataset_type
            
            merged_dfs.append(combined)
        
        # Tüm datasetleri birleştir
        if merged_dfs:
            final_df = pd.concat(merged_dfs, ignore_index=True, sort=False)
            logger.info(f"✅ Toplam {len(final_df)} satır birleştirildi")
            return final_df
        
        return pd.DataFrame()
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Veriyi temizle"""
        initial_rows = len(df)
        
        # Tamamen boş satırları kaldır
        df = df.dropna(how='all')
        
        # Numeric sütunlardaki outlier'ları temizle
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        for col in numeric_cols:
            if col != 'label':
                Q1 = df[col].quantile(0.01)
                Q3 = df[col].quantile(0.99)
                IQR = Q3 - Q1
                df = df[(df[col] >= Q1 - 3*IQR) & (df[col] <= Q3 + 3*IQR)]
        
        # Eksik değerleri doldur
        for col in numeric_cols:
            if df[col].isnull().sum() > 0:
                df[col].fillna(df[col].median(), inplace=True)
        
        logger.info(f"🧹 Temizleme: {initial_rows} → {len(df)} satır")
        return df
    
    def load_and_merge_all(self) -> pd.DataFrame:
        """Tüm CSV dosyalarını yükle ve birleştir"""
        logger.info("📊 Tüm CSV dosyaları yükleniyor...")
        
        datasets = {
            'voice_features': [],
            'updrs_scores': [],
            'gait_data': [],
            'demographics': [],
            'clinical': [],
            'biomarkers': [],
            'unknown': []
        }
        
        # Tüm dosyaları yükle ve kategorize et
        for i, file_path in enumerate(self.csv_files):
            if i % 100 == 0:
                logger.info(f"  İşleniyor: {i}/{len(self.csv_files)}")
            
            df = self.load_single_csv(file_path)
            if df is None or len(df) == 0:
                continue
            
            # Dataset tipini belirle
            dataset_type = self.identify_dataset_type(df, file_path)
            
            # Sütunları standardize et
            df = self.standardize_columns(df, dataset_type)
            
            # Feature engineering
            df = self.extract_features(df, dataset_type)
            
            # Kaynak dosya bilgisini ekle
            df['source_file'] = file_path.name
            
            datasets[dataset_type].append(df)
        
        # İstatistikler
        logger.info("\n📊 Dataset Dağılımı:")
        for dtype, dfs in datasets.items():
            if dfs:
                total_rows = sum(len(df) for df in dfs)
                logger.info(f"  {dtype}: {len(dfs)} dosya, {total_rows:,} satır")
        
        # Birleştir
        merged_df = self.merge_datasets(datasets)
        
        # Temizle
        if len(merged_df) > 0:
            merged_df = self.clean_data(merged_df)
        
        return merged_df
    
    def prepare_for_training(self, df: pd.DataFrame) -> Tuple[np.ndarray, np.ndarray]:
        """Eğitim için hazırla"""
        # Label'ı ayır
        if 'label' not in df.columns:
            logger.warning("⚠️  Label sütunu bulunamadı!")
            return None, None
        
        y = df['label'].values
        
        # Numeric olmayan sütunları kaldır
        numeric_cols = df.select_dtypes(include=[np.number]).columns
        numeric_cols = [c for c in numeric_cols if c != 'label']
        
        X = df[numeric_cols].values
        
        # Standardize et
        scaler = StandardScaler()
        X = scaler.fit_transform(X)
        
        logger.info(f"✅ Eğitim verisi hazır: X={X.shape}, y={y.shape}")
        
        return X, y


def test_loader():
    """Loader'ı test et"""
    print("📊 CSV Loader Test")
    print("=" * 80)
    
    loader = CSVDataLoader("../../Veriler")
    
    # Tüm CSV'leri yükle ve birleştir
    print("\n🔄 CSV dosyaları yükleniyor...")
    merged_df = loader.load_and_merge_all()
    
    if len(merged_df) > 0:
        print(f"\n✅ Birleştirilmiş veri:")
        print(f"  Satır sayısı: {len(merged_df):,}")
        print(f"  Sütun sayısı: {len(merged_df.columns)}")
        print(f"\n  İlk 5 sütun: {list(merged_df.columns[:5])}")
        
        # Eğitim için hazırla
        X, y = loader.prepare_for_training(merged_df)
        if X is not None:
            print(f"\n  Eğitim verisi: X={X.shape}, y={y.shape}")
            print(f"  Label dağılımı: {np.bincount(y.astype(int))}")
    else:
        print("❌ Veri yüklenemedi!")


if __name__ == "__main__":
    test_loader()
