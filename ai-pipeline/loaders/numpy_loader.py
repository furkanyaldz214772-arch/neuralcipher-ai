"""
Numpy Data Loader
1.28 GB - 2 .npz dosyası
Sensor ve time-series verilerini yükle
"""

import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple
import logging

logger = logging.getLogger(__name__)


class NumpyDataLoader:
    """Numpy compressed dosyalarını yükler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.npz_files = self.discover_files()
        logger.info(f"🔢 {len(self.npz_files)} Numpy dosyası bulundu")
    
    def discover_files(self) -> List[Path]:
        """Tüm .npz dosyalarını bul"""
        files = list(self.data_dir.rglob('*.npz'))
        return sorted(files)
    
    def load_npz(self, file_path: Path) -> Dict:
        """NPZ dosyasını yükle"""
        try:
            data = np.load(str(file_path), allow_pickle=True)
            
            result = {
                'file_path': str(file_path),
                'file_name': file_path.name,
                'keys': list(data.keys()),
                'arrays': {}
            }
            
            # Her array'i yükle
            for key in data.keys():
                result['arrays'][key] = data[key]
            
            logger.debug(f"✅ Yüklendi: {file_path.name} ({len(result['keys'])} array)")
            return result
            
        except Exception as e:
            logger.error(f"❌ Yükleme hatası {file_path.name}: {e}")
            return None
    
    def extract_timeseries_features(self, data: np.ndarray) -> Dict[str, float]:
        """Time-series verilerinden feature'ları çıkar"""
        features = {}
        
        try:
            # Flatten if multidimensional
            if data.ndim > 1:
                data = data.flatten()
            
            # Basic statistics
            features['mean'] = np.mean(data)
            features['std'] = np.std(data)
            features['min'] = np.min(data)
            features['max'] = np.max(data)
            features['median'] = np.median(data)
            features['range'] = features['max'] - features['min']
            
            # Percentiles
            features['q25'] = np.percentile(data, 25)
            features['q75'] = np.percentile(data, 75)
            features['iqr'] = features['q75'] - features['q25']
            
            # Skewness and Kurtosis
            mean = features['mean']
            std = features['std']
            if std > 0:
                features['skewness'] = np.mean(((data - mean) / std) ** 3)
                features['kurtosis'] = np.mean(((data - mean) / std) ** 4) - 3
            else:
                features['skewness'] = 0
                features['kurtosis'] = 0
            
            # Autocorrelation
            if len(data) > 1:
                autocorr = np.correlate(data, data, mode='full')
                autocorr = autocorr[len(autocorr)//2:]
                if autocorr[0] != 0:
                    autocorr = autocorr / autocorr[0]
                    features['autocorr_lag1'] = autocorr[1] if len(autocorr) > 1 else 0
                    features['autocorr_lag5'] = autocorr[5] if len(autocorr) > 5 else 0
            
            # Trend
            if len(data) > 2:
                x = np.arange(len(data))
                coeffs = np.polyfit(x, data, 1)
                features['trend_slope'] = coeffs[0]
                features['trend_intercept'] = coeffs[1]
            
            # Zero crossing rate
            zero_crossings = np.where(np.diff(np.sign(data)))[0]
            features['zero_crossing_rate'] = len(zero_crossings) / len(data)
            
            # Energy
            features['energy'] = np.sum(data ** 2)
            features['rms'] = np.sqrt(features['energy'] / len(data))
            
        except Exception as e:
            logger.error(f"❌ Feature extraction hatası: {e}")
        
        return features
    
    def process_all(self) -> List[Dict]:
        """Tüm NPZ dosyalarını işle"""
        logger.info("🔢 Tüm Numpy dosyaları işleniyor...")
        
        results = []
        for file_path in self.npz_files:
            data_dict = self.load_npz(file_path)
            if data_dict:
                # Her array için feature'ları çıkar
                all_features = {}
                
                for key, array in data_dict['arrays'].items():
                    if isinstance(array, np.ndarray):
                        features = self.extract_timeseries_features(array)
                        # Key prefix ekle
                        for feat_name, feat_value in features.items():
                            all_features[f'{key}_{feat_name}'] = feat_value
                
                results.append({
                    'file_path': str(file_path),
                    'file_name': file_path.name,
                    'keys': data_dict['keys'],
                    'features': all_features
                })
        
        logger.info(f"✅ {len(results)} Numpy dosyası işlendi")
        return results
    
    def create_feature_matrix(self, results: List[Dict]) -> Tuple[np.ndarray, np.ndarray]:
        """Feature matrix oluştur"""
        if not results:
            return None, None
        
        # Tüm feature names'leri topla
        all_feature_names = set()
        for r in results:
            all_feature_names.update(r['features'].keys())
        
        feature_names = sorted(list(all_feature_names))
        
        # Matrix oluştur
        X = []
        for r in results:
            features = [r['features'].get(fn, 0) for fn in feature_names]
            X.append(features)
        
        X = np.array(X)
        
        # NaN ve Inf değerleri temizle
        X = np.nan_to_num(X, nan=0.0, posinf=0.0, neginf=0.0)
        
        logger.info(f"✅ Feature matrix: X={X.shape}")
        
        return X, feature_names


def test_loader():
    """Loader'ı test et"""
    print("🔢 Numpy Loader Test")
    print("=" * 80)
    
    loader = NumpyDataLoader("../../Veriler")
    
    if loader.npz_files:
        print(f"\n🔄 İlk dosya test ediliyor: {loader.npz_files[0].name}")
        data_dict = loader.load_npz(loader.npz_files[0])
        
        if data_dict:
            print(f"\n✅ Veri yüklendi:")
            print(f"  Keys: {data_dict['keys']}")
            
            for key, array in list(data_dict['arrays'].items())[:3]:
                if isinstance(array, np.ndarray):
                    print(f"\n  {key}:")
                    print(f"    Shape: {array.shape}")
                    print(f"    Dtype: {array.dtype}")
                    
                    features = loader.extract_timeseries_features(array)
                    print(f"    Features: {len(features)}")


if __name__ == "__main__":
    test_loader()
