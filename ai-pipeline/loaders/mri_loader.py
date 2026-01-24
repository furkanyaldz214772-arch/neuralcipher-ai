"""
MRI/DICOM Data Loader
NIfTI ve DICOM formatlarını yükle
"""

import nibabel as nib
import pydicom
import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple
import logging

logger = logging.getLogger(__name__)


class MRIDataLoader:
    """MRI görüntülerini yükler (NIfTI ve DICOM)"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.nifti_files = self.discover_nifti_files()
        self.dicom_files = self.discover_dicom_files()
        logger.info(f"🧠 {len(self.nifti_files)} NIfTI + {len(self.dicom_files)} DICOM dosyası bulundu")
    
    def discover_nifti_files(self) -> List[Path]:
        """NIfTI dosyalarını bul"""
        files = []
        files.extend(self.data_dir.rglob('*.nii'))
        files.extend(self.data_dir.rglob('*.nii.gz'))
        return sorted(files)
    
    def discover_dicom_files(self) -> List[Path]:
        """DICOM dosyalarını bul"""
        files = list(self.data_dir.rglob('*.dcm'))
        return sorted(files)
    
    def load_nifti(self, file_path: Path) -> Tuple[np.ndarray, dict]:
        """NIfTI dosyasını yükle"""
        try:
            img = nib.load(str(file_path))
            data = img.get_fdata()
            
            metadata = {
                'shape': data.shape,
                'affine': img.affine,
                'file_path': str(file_path)
            }
            
            return data, metadata
            
        except Exception as e:
            logger.error(f"❌ NIfTI yükleme hatası {file_path.name}: {e}")
            return None, None
    
    def load_dicom(self, file_path: Path) -> Tuple[np.ndarray, dict]:
        """DICOM dosyasını yükle"""
        try:
            dcm = pydicom.dcmread(str(file_path))
            data = dcm.pixel_array
            
            metadata = {
                'shape': data.shape,
                'patient_id': getattr(dcm, 'PatientID', 'unknown'),
                'study_date': getattr(dcm, 'StudyDate', 'unknown'),
                'modality': getattr(dcm, 'Modality', 'unknown'),
                'file_path': str(file_path)
            }
            
            return data, metadata
            
        except Exception as e:
            logger.error(f"❌ DICOM yükleme hatası {file_path.name}: {e}")
            return None, None
    
    def extract_brain_features(self, volume: np.ndarray) -> Dict[str, float]:
        """Beyin görüntüsünden feature'ları çıkar"""
        features = {}
        
        try:
            # Intensity features
            features['intensity_mean'] = np.mean(volume)
            features['intensity_std'] = np.std(volume)
            features['intensity_min'] = np.min(volume)
            features['intensity_max'] = np.max(volume)
            features['intensity_range'] = features['intensity_max'] - features['intensity_min']
            
            # Histogram features
            hist, _ = np.histogram(volume.flatten(), bins=50)
            hist = hist / np.sum(hist)
            features['histogram_entropy'] = -np.sum(hist * np.log2(hist + 1e-10))
            features['histogram_skewness'] = self.calculate_skewness(volume.flatten())
            features['histogram_kurtosis'] = self.calculate_kurtosis(volume.flatten())
            
            # Texture features (simplified)
            if volume.ndim == 3:
                # Gradient magnitude
                grad_x = np.gradient(volume, axis=0)
                grad_y = np.gradient(volume, axis=1)
                grad_z = np.gradient(volume, axis=2)
                grad_mag = np.sqrt(grad_x**2 + grad_y**2 + grad_z**2)
                
                features['gradient_mean'] = np.mean(grad_mag)
                features['gradient_std'] = np.std(grad_mag)
            
            # Volume statistics
            features['volume_size'] = volume.size
            features['volume_shape_x'] = volume.shape[0]
            features['volume_shape_y'] = volume.shape[1]
            if volume.ndim == 3:
                features['volume_shape_z'] = volume.shape[2]
            
        except Exception as e:
            logger.error(f"❌ Feature extraction hatası: {e}")
        
        return features
    
    def calculate_skewness(self, data: np.ndarray) -> float:
        """Skewness hesapla"""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 3)
    
    def calculate_kurtosis(self, data: np.ndarray) -> float:
        """Kurtosis hesapla"""
        mean = np.mean(data)
        std = np.std(data)
        if std == 0:
            return 0
        return np.mean(((data - mean) / std) ** 4) - 3
    
    def process_all_nifti(self) -> List[Dict]:
        """Tüm NIfTI dosyalarını işle"""
        logger.info("🧠 NIfTI dosyaları işleniyor...")
        
        results = []
        for i, file_path in enumerate(self.nifti_files):
            if i % 100 == 0:
                logger.info(f"  İşleniyor: {i}/{len(self.nifti_files)}")
            
            volume, metadata = self.load_nifti(file_path)
            if volume is not None:
                features = self.extract_brain_features(volume)
                
                # Label belirle
                label = 1 if 'pd' in file_path.stem.lower() else 0
                
                results.append({
                    'file_path': str(file_path),
                    'file_name': file_path.name,
                    'label': label,
                    'metadata': metadata,
                    'features': features
                })
        
        logger.info(f"✅ {len(results)} NIfTI dosyası işlendi")
        return results


def test_loader():
    """Loader'ı test et"""
    print("🧠 MRI Loader Test")
    print("=" * 80)
    
    loader = MRIDataLoader("../../Veriler")
    
    if loader.nifti_files:
        print(f"\n🔄 İlk NIfTI dosyası test ediliyor: {loader.nifti_files[0].name}")
        volume, metadata = loader.load_nifti(loader.nifti_files[0])
        
        if volume is not None:
            print(f"\n✅ Veri yüklendi:")
            print(f"  Shape: {volume.shape}")
            print(f"  Dtype: {volume.dtype}")
            print(f"  Min/Max: {volume.min():.2f} / {volume.max():.2f}")
            
            features = loader.extract_brain_features(volume)
            print(f"\n  Feature sayısı: {len(features)}")
            print(f"  İlk 5 feature:")
            for i, (key, value) in enumerate(list(features.items())[:5]):
                print(f"    {key}: {value:.4f}")


if __name__ == "__main__":
    test_loader()
