"""
MATLAB Data Loader
0.10 GB - 190 dosya
.mat dosyalarını yükle
"""

import scipy.io as sio
import numpy as np
from pathlib import Path
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)


class MATLABDataLoader:
    """MATLAB .mat dosyalarını yükler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.mat_files = self.discover_files()
        logger.info(f"🔬 {len(self.mat_files)} MATLAB dosyası bulundu")
    
    def discover_files(self) -> List[Path]:
        """Tüm .mat dosyalarını bul"""
        files = list(self.data_dir.rglob('*.mat'))
        return sorted(files)
    
    def load_mat_file(self, file_path: Path) -> Dict:
        """Tek bir .mat dosyasını yükle"""
        try:
            data = sio.loadmat(str(file_path))
            
            # Metadata'yı temizle
            clean_data = {k: v for k, v in data.items() 
                         if not k.startswith('__')}
            
            logger.debug(f"✅ Yüklendi: {file_path.name}")
            return clean_data
            
        except Exception as e:
            logger.error(f"❌ Yükleme hatası {file_path.name}: {e}")
            return None
    
    def extract_features_from_mat(self, data: Dict) -> np.ndarray:
        """MATLAB verisinden feature'ları çıkar"""
        features = []
        
        for key, value in data.items():
            if isinstance(value, np.ndarray):
                # Flatten ve istatistikler
                flat = value.flatten()
                features.extend([
                    np.mean(flat),
                    np.std(flat),
                    np.min(flat),
                    np.max(flat),
                    np.median(flat)
                ])
        
        return np.array(features)
    
    def load_all(self) -> List[Dict]:
        """Tüm MATLAB dosyalarını yükle"""
        logger.info("🔬 Tüm MATLAB dosyaları yükleniyor...")
        
        results = []
        for i, file_path in enumerate(self.mat_files):
            if i % 50 == 0:
                logger.info(f"  İşleniyor: {i}/{len(self.mat_files)}")
            
            data = self.load_mat_file(file_path)
            if data:
                results.append({
                    'file_path': str(file_path),
                    'file_name': file_path.name,
                    'data': data,
                    'keys': list(data.keys())
                })
        
        logger.info(f"✅ {len(results)} MATLAB dosyası yüklendi")
        return results


def test_loader():
    """Loader'ı test et"""
    print("🔬 MATLAB Loader Test")
    print("=" * 80)
    
    loader = MATLABDataLoader("../../Veriler")
    
    if loader.mat_files:
        print(f"\n🔄 İlk dosya test ediliyor: {loader.mat_files[0].name}")
        data = loader.load_mat_file(loader.mat_files[0])
        
        if data:
            print(f"\n✅ Veri yüklendi:")
            print(f"  Keys: {list(data.keys())}")
            for key, value in list(data.items())[:3]:
                if isinstance(value, np.ndarray):
                    print(f"  {key}: shape={value.shape}, dtype={value.dtype}")


if __name__ == "__main__":
    test_loader()
