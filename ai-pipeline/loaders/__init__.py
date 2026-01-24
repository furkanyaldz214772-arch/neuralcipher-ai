"""
NeuralCipher.AI - Veri Yükleme Modülleri
241,000 dosya için özelleştirilmiş loader'lar

TAMAMLANAN LOADER'LAR:
✅ NIfTI Brain Images (88.56 GB - 7,515 files)
✅ TFRecords Images (28.47 GB - 1,848 files)
✅ CSV Tabular Data (19.25 GB - 2,395 files)
✅ Audio WAV Files (8.19 GB - 2,374 files)
✅ Text/Gait Data (11.24 GB - 42,235 files)
✅ MATLAB Data (0.10 GB - 190 files)
✅ MRI/DICOM Data (NIfTI + DICOM)
✅ Numpy Compressed (1.28 GB - 2 files)
"""

from .nifti_loader import NIfTIBrainLoader
from .tfrecords_loader import TFRecordsImageLoader
from .audio_loader import AudioDataLoader
from .csv_loader import CSVDataLoader
from .matlab_loader import MATLABDataLoader
from .gait_loader import GaitDataLoader
from .mri_loader import MRIDataLoader
from .numpy_loader import NumpyDataLoader

__all__ = [
    'NIfTIBrainLoader',
    'TFRecordsImageLoader',
    'AudioDataLoader',
    'CSVDataLoader',
    'MATLABDataLoader',
    'GaitDataLoader',
    'MRIDataLoader',
    'NumpyDataLoader',
]
