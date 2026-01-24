"""
NIfTI Beyin Görüntüleri Loader
88.56 GB - 7,515 dosya
3D MRI/fMRI görüntüleri için
"""

import nibabel as nib
import numpy as np
from pathlib import Path
from typing import List, Tuple, Optional
import logging

logger = logging.getLogger(__name__)


class NIfTIBrainLoader:
    """NIfTI formatındaki beyin görüntülerini yükler ve işler"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.nifti_files = self.discover_files()
        logger.info(f"🧠 {len(self.nifti_files)} NIfTI dosyası bulundu")
    
    def discover_files(self) -> List[Path]:
        """Tüm .nii dosyalarını bul"""
        files = list(self.data_dir.rglob('*.nii'))
        files.extend(self.data_dir.rglob('*.nii.gz'))
        return sorted(files)
    
    def load_nifti(self, file_path: Path) -> Tuple[np.ndarray, dict]:
        """
        Tek bir NIfTI dosyasını yükle
        
        Returns:
            data: 3D numpy array
            metadata: Header bilgileri
        """
        try:
            img = nib.load(str(file_path))
            data = img.get_fdata()
            
            metadata = {
                'shape': data.shape,
                'affine': img.affine,
                'header': dict(img.header),
                'file_path': str(file_path)
            }
            
            return data, metadata
            
        except Exception as e:
            logger.error(f"❌ Yükleme hatası {file_path}: {e}")
            return None, None
    
    def normalize_volume(self, volume: np.ndarray) -> np.ndarray:
        """3D hacmi normalize et"""
        # Z-score normalization
        mean = np.mean(volume)
        std = np.std(volume)
        if std > 0:
            volume = (volume - mean) / std
        return volume
    
    def resize_volume(self, volume: np.ndarray, 
                     target_shape: Tuple[int, int, int] = (128, 128, 128)) -> np.ndarray:
        """
        3D hacmi yeniden boyutlandır
        
        Args:
            volume: Input 3D array
            target_shape: Hedef boyut (x, y, z)
        """
        from scipy.ndimage import zoom
        
        current_shape = volume.shape
        zoom_factors = [t / c for t, c in zip(target_shape, current_shape)]
        
        resized = zoom(volume, zoom_factors, order=1)
        return resized
    
    def extract_roi(self, volume: np.ndarray, 
                   roi_center: Tuple[int, int, int],
                   roi_size: Tuple[int, int, int] = (64, 64, 64)) -> np.ndarray:
        """
        İlgi bölgesini (ROI) çıkar
        Örn: Substantia nigra bölgesi
        """
        x, y, z = roi_center
        sx, sy, sz = roi_size
        
        x_start = max(0, x - sx//2)
        y_start = max(0, y - sy//2)
        z_start = max(0, z - sz//2)
        
        x_end = min(volume.shape[0], x + sx//2)
        y_end = min(volume.shape[1], y + sy//2)
        z_end = min(volume.shape[2], z + sz//2)
        
        roi = volume[x_start:x_end, y_start:y_end, z_start:z_end]
        return roi
    
    def augment_volume(self, volume: np.ndarray) -> np.ndarray:
        """3D veri augmentasyonu"""
        # Random rotation
        if np.random.rand() > 0.5:
            axes = np.random.choice([0, 1, 2], size=2, replace=False)
            volume = np.rot90(volume, k=1, axes=tuple(axes))
        
        # Random flip
        for axis in range(3):
            if np.random.rand() > 0.5:
                volume = np.flip(volume, axis=axis)
        
        # Random noise
        if np.random.rand() > 0.7:
            noise = np.random.normal(0, 0.01, volume.shape)
            volume = volume + noise
        
        return volume
    
    def create_dataset_generator(self, 
                                 batch_size: int = 4,
                                 target_shape: Tuple[int, int, int] = (128, 128, 128),
                                 augment: bool = True):
        """
        Batch generator oluştur
        
        Yields:
            batch_data: (batch_size, x, y, z, 1)
            batch_labels: (batch_size,)
        """
        batch_data = []
        batch_labels = []
        
        for file_path in self.nifti_files:
            # Dosya adından label çıkar (örnek: sub-pd01 -> 1, sub-hc01 -> 0)
            label = 1 if 'pd' in file_path.stem.lower() else 0
            
            # Yükle
            volume, metadata = self.load_nifti(file_path)
            if volume is None:
                continue
            
            # İşle
            volume = self.normalize_volume(volume)
            volume = self.resize_volume(volume, target_shape)
            
            if augment:
                volume = self.augment_volume(volume)
            
            # Batch'e ekle
            batch_data.append(volume[..., np.newaxis])  # Channel dimension ekle
            batch_labels.append(label)
            
            # Batch doldu mu?
            if len(batch_data) == batch_size:
                yield np.array(batch_data), np.array(batch_labels)
                batch_data = []
                batch_labels = []
        
        # Kalan verileri yield et
        if batch_data:
            yield np.array(batch_data), np.array(batch_labels)
    
    def get_statistics(self) -> dict:
        """Dataset istatistikleri"""
        stats = {
            'total_files': len(self.nifti_files),
            'total_size_gb': 0,
            'shapes': [],
            'pd_count': 0,
            'hc_count': 0
        }
        
        for file_path in self.nifti_files[:100]:  # İlk 100 dosya
            try:
                volume, metadata = self.load_nifti(file_path)
                if volume is not None:
                    stats['shapes'].append(volume.shape)
                    stats['total_size_gb'] += file_path.stat().st_size / (1024**3)
                    
                    # Label say
                    if 'pd' in file_path.stem.lower():
                        stats['pd_count'] += 1
                    else:
                        stats['hc_count'] += 1
            except:
                pass
        
        # Ortalama shape
        if stats['shapes']:
            stats['avg_shape'] = tuple(np.mean(stats['shapes'], axis=0).astype(int))
        
        return stats


def test_loader():
    """Loader'ı test et"""
    print("🧠 NIfTI Loader Test")
    print("=" * 80)
    
    loader = NIfTIBrainLoader("../../Veriler")
    
    # İstatistikler
    stats = loader.get_statistics()
    print(f"\n📊 İstatistikler:")
    print(f"  Toplam dosya: {stats['total_files']}")
    print(f"  PD hastaları: {stats['pd_count']}")
    print(f"  Sağlıklı kontrol: {stats['hc_count']}")
    if 'avg_shape' in stats:
        print(f"  Ortalama boyut: {stats['avg_shape']}")
    
    # İlk batch'i test et
    print(f"\n🔄 İlk batch test ediliyor...")
    gen = loader.create_dataset_generator(batch_size=2)
    batch_data, batch_labels = next(gen)
    
    print(f"  Batch shape: {batch_data.shape}")
    print(f"  Labels: {batch_labels}")
    print(f"\n✅ Test başarılı!")


if __name__ == "__main__":
    test_loader()
