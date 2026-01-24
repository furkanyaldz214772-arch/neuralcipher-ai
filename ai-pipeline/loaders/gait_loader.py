"""
Gait/Text Data Loader
11.24 GB - 42,235 text dosyası
Yürüyüş ve hareket verilerini parse et
"""

import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple
import logging
import re

logger = logging.getLogger(__name__)


class GaitDataLoader:
    """Yürüyüş ve hareket verilerini yükler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.text_files = self.discover_files()
        logger.info(f"🚶 {len(self.text_files)} text dosyası bulundu")
    
    def discover_files(self) -> List[Path]:
        """Tüm text dosyalarını bul"""
        files = list(self.data_dir.rglob('*.txt'))
        return sorted(files)
    
    def identify_file_type(self, file_path: Path) -> str:
        """Dosya tipini belirle"""
        name = file_path.stem.lower()
        
        # Gait data patterns
        if any(x in name for x in ['gaco', 'gapt', 'juco', 'jupt', 'sico', 'sipt']):
            return 'gait_timeseries'
        
        # Format files
        if 'format' in name or 'readme' in name:
            return 'metadata'
        
        # Other text data
        return 'text_data'
    
    def parse_gait_timeseries(self, file_path: Path) -> Dict:
        """Gait zaman serisi verisini parse et"""
        try:
            with open(file_path, 'r') as f:
                lines = f.readlines()
            
            # Numeric data'yı çıkar
            data = []
            for line in lines:
                # Sayıları bul
                numbers = re.findall(r'-?\d+\.?\d*', line)
                if numbers:
                    data.append([float(n) for n in numbers])
            
            if not data:
                return None
            
            # NumPy array'e çevir
            data_array = np.array(data)
            
            # Features çıkar
            features = self.extract_gait_features(data_array)
            
            # Label belirle (dosya adından)
            label = 1 if 'pt' in file_path.stem.lower() else 0
            
            return {
                'file_path': str(file_path),
                'file_name': file_path.name,
                'label': label,
                'data_shape': data_array.shape,
                'features': features
            }
            
        except Exception as e:
            logger.error(f"❌ Parse hatası {file_path.name}: {e}")
            return None
    
    def extract_gait_features(self, data: np.ndarray) -> Dict[str, float]:
        """Gait verilerinden feature'ları çıkar"""
        features = {}
        
        try:
            # Her sütun için istatistikler
            for col_idx in range(min(data.shape[1], 10)):  # İlk 10 sütun
                col_data = data[:, col_idx]
                
                features[f'col{col_idx}_mean'] = np.mean(col_data)
                features[f'col{col_idx}_std'] = np.std(col_data)
                features[f'col{col_idx}_min'] = np.min(col_data)
                features[f'col{col_idx}_max'] = np.max(col_data)
                features[f'col{col_idx}_range'] = np.ptp(col_data)
                
                # Autocorrelation
                if len(col_data) > 1:
                    autocorr = np.correlate(col_data, col_data, mode='full')
                    autocorr = autocorr[len(autocorr)//2:]
                    if autocorr[0] != 0:
                        autocorr = autocorr / autocorr[0]
                        features[f'col{col_idx}_autocorr_lag1'] = autocorr[1] if len(autocorr) > 1 else 0
                
            # Stride features
            if data.shape[1] >= 2:
                # Stride length variability
                stride_lengths = np.sqrt(np.sum(np.diff(data[:, :2], axis=0)**2, axis=1))
                features['stride_length_mean'] = np.mean(stride_lengths)
                features['stride_length_std'] = np.std(stride_lengths)
                features['stride_length_cv'] = features['stride_length_std'] / (features['stride_length_mean'] + 1e-10)
                
                # Stride time
                features['stride_time_mean'] = len(data) / (len(stride_lengths) + 1)
                
                # Asymmetry
                if len(stride_lengths) > 1:
                    even_strides = stride_lengths[::2]
                    odd_strides = stride_lengths[1::2]
                    min_len = min(len(even_strides), len(odd_strides))
                    if min_len > 0:
                        asymmetry = np.abs(even_strides[:min_len] - odd_strides[:min_len])
                        features['stride_asymmetry'] = np.mean(asymmetry)
            
            # Velocity features
            if data.shape[0] > 1:
                velocities = np.sqrt(np.sum(np.diff(data, axis=0)**2, axis=1))
                features['velocity_mean'] = np.mean(velocities)
                features['velocity_std'] = np.std(velocities)
                features['velocity_max'] = np.max(velocities)
            
            # Acceleration features
            if data.shape[0] > 2:
                accelerations = np.diff(velocities)
                features['acceleration_mean'] = np.mean(np.abs(accelerations))
                features['acceleration_std'] = np.std(accelerations)
            
        except Exception as e:
            logger.error(f"❌ Feature extraction hatası: {e}")
        
        return features
    
    def process_all(self) -> List[Dict]:
        """Tüm text dosyalarını işle"""
        logger.info("🚶 Tüm gait dosyaları işleniyor...")
        
        results = []
        gait_count = 0
        
        for i, file_path in enumerate(self.text_files):
            if i % 1000 == 0:
                logger.info(f"  İşleniyor: {i}/{len(self.text_files)}")
            
            file_type = self.identify_file_type(file_path)
            
            if file_type == 'gait_timeseries':
                result = self.parse_gait_timeseries(file_path)
                if result:
                    results.append(result)
                    gait_count += 1
        
        logger.info(f"✅ {gait_count} gait dosyası işlendi")
        return results
    
    def create_feature_matrix(self, results: List[Dict]) -> Tuple[np.ndarray, np.ndarray]:
        """Feature matrix oluştur"""
        if not results:
            return None, None
        
        # Feature names
        feature_names = list(results[0]['features'].keys())
        
        # Matrix oluştur
        X = []
        y = []
        
        for r in results:
            features = [r['features'].get(fn, 0) for fn in feature_names]
            X.append(features)
            y.append(r['label'])
        
        X = np.array(X)
        y = np.array(y)
        
        # NaN ve Inf değerleri temizle
        X = np.nan_to_num(X, nan=0.0, posinf=0.0, neginf=0.0)
        
        logger.info(f"✅ Feature matrix: X={X.shape}, y={y.shape}")
        
        return X, y


def test_loader():
    """Loader'ı test et"""
    print("🚶 Gait Loader Test")
    print("=" * 80)
    
    loader = GaitDataLoader("../../Veriler")
    
    # Gait dosyalarını bul
    gait_files = [f for f in loader.text_files 
                  if loader.identify_file_type(f) == 'gait_timeseries']
    
    if gait_files:
        print(f"\n🔄 İlk gait dosyası test ediliyor: {gait_files[0].name}")
        result = loader.parse_gait_timeseries(gait_files[0])
        
        if result:
            print(f"\n✅ Veri parse edildi:")
            print(f"  Dosya: {result['file_name']}")
            print(f"  Label: {result['label']}")
            print(f"  Data shape: {result['data_shape']}")
            print(f"  Feature sayısı: {len(result['features'])}")
            print(f"\n  İlk 5 feature:")
            for i, (key, value) in enumerate(list(result['features'].items())[:5]):
                print(f"    {key}: {value:.4f}")


if __name__ == "__main__":
    test_loader()
