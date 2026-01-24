"""
Nörolojik Biyobelirteç Çıkarım Modülü
Ses dosyalarından Parkinson hastalığı için kritik özellikleri çıkarır
"""
import numpy as np
import librosa
from typing import Dict, Tuple
import warnings
warnings.filterwarnings('ignore')


class NeurologicalBiomarkerExtractor:
    """
    Nörolojik biyobelirteç çıkarıcı
    
    Çıkarılan Özellikler:
    - MFCC (Mel-Frequency Cepstral Coefficients): 13 katsayı
    - Jitter: Ses tellerindeki frekans değişkenliği
    - Shimmer: Ses tellerindeki genlik değişkenliği
    - HNR (Harmonics-to-Noise Ratio): Ses kalitesi
    - Spektral özellikler: Centroid, Rolloff, Bandwidth
    """
    
    def __init__(self, sample_rate: int = 22050):
        self.sample_rate = sample_rate
    
    def load_audio(self, file_path: str) -> Tuple[np.ndarray, int]:
        """Ses dosyasını yükle"""
        y, sr = librosa.load(file_path, sr=self.sample_rate)
        return y, sr
    
    def calculate_jitter(self, y: np.ndarray, sr: int) -> float:
        """
        Jitter: Ses tellerindeki frekans değişkenliği
        Parkinson hastalarında yüksek olur
        """
        try:
            # F0 (temel frekans) çıkarımı
            f0 = librosa.yin(y, fmin=50, fmax=400, sr=sr)
            f0_clean = f0[f0 > 0]
            
            if len(f0_clean) < 2:
                return 0.0
            
            # Periyot hesaplama
            periods = 1 / f0_clean
            
            # Jitter: ardışık periyotlar arası fark
            period_diffs = np.abs(np.diff(periods))
            jitter = np.mean(period_diffs) / np.mean(periods) * 100
            
            return float(jitter)
        except:
            return 0.0
    
    def calculate_shimmer(self, y: np.ndarray) -> float:
        """
        Shimmer: Ses tellerindeki genlik değişkenliği
        Parkinson hastalarında yüksek olur
        """
        try:
            # Amplitüd zarfı
            amplitude_envelope = np.abs(librosa.stft(y))
            amplitude_mean = np.mean(amplitude_envelope, axis=0)
            
            if len(amplitude_mean) < 2:
                return 0.0
            
            # Shimmer: ardışık genlikler arası fark
            amp_diffs = np.abs(np.diff(amplitude_mean))
            shimmer = np.mean(amp_diffs) / np.mean(amplitude_mean) * 100
            
            return float(shimmer)
        except:
            return 0.0
    
    def calculate_hnr(self, y: np.ndarray) -> float:
        """
        HNR (Harmonics-to-Noise Ratio): Ses kalitesi
        Parkinson hastalarında düşük olur
        """
        try:
            # Harmonik ve perküsif ayrımı
            harmonic, percussive = librosa.effects.hpss(y)
            
            harmonic_power = np.sum(harmonic ** 2)
            noise_power = np.sum(percussive ** 2)
            
            if noise_power == 0:
                return 100.0
            
            hnr = 10 * np.log10(harmonic_power / noise_power)
            return float(hnr)
        except:
            return 0.0
    
    def extract_mfcc(self, y: np.ndarray, sr: int, n_mfcc: int = 13) -> Dict[str, np.ndarray]:
        """
        MFCC (Mel-Frequency Cepstral Coefficients)
        Ses spektrumunun kompakt temsili
        """
        try:
            mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=n_mfcc)
            
            # İstatistiksel özellikler
            mfcc_mean = np.mean(mfcc, axis=1)
            mfcc_std = np.std(mfcc, axis=1)
            mfcc_min = np.min(mfcc, axis=1)
            mfcc_max = np.max(mfcc, axis=1)
            
            return {
                'mean': mfcc_mean,
                'std': mfcc_std,
                'min': mfcc_min,
                'max': mfcc_max
            }
        except:
            return {
                'mean': np.zeros(n_mfcc),
                'std': np.zeros(n_mfcc),
                'min': np.zeros(n_mfcc),
                'max': np.zeros(n_mfcc)
            }
    
    def extract_spectral_features(self, y: np.ndarray, sr: int) -> Dict[str, float]:
        """Spektral özellikler"""
        try:
            # Spectral Centroid: Frekans spektrumunun merkezi
            centroid = np.mean(librosa.feature.spectral_centroid(y=y, sr=sr))
            
            # Spectral Rolloff: Spektral enerjinin %85'inin altındaki frekans
            rolloff = np.mean(librosa.feature.spectral_rolloff(y=y, sr=sr))
            
            # Spectral Bandwidth: Frekans spektrumunun genişliği
            bandwidth = np.mean(librosa.feature.spectral_bandwidth(y=y, sr=sr))
            
            # Zero Crossing Rate: Sinyal işaret değişim oranı
            zcr = np.mean(librosa.feature.zero_crossing_rate(y))
            
            return {
                'spectral_centroid': float(centroid),
                'spectral_rolloff': float(rolloff),
                'spectral_bandwidth': float(bandwidth),
                'zero_crossing_rate': float(zcr)
            }
        except:
            return {
                'spectral_centroid': 0.0,
                'spectral_rolloff': 0.0,
                'spectral_bandwidth': 0.0,
                'zero_crossing_rate': 0.0
            }
    
    def extract_all_features(self, file_path: str) -> Dict:
        """
        Tüm nörolojik biyobelirteçleri çıkar
        
        Returns:
            Dict: Tüm özellikler ve metadata
        """
        # Ses dosyasını yükle
        y, sr = self.load_audio(file_path)
        duration = librosa.get_duration(y=y, sr=sr)
        
        # Vokal özellikler
        jitter = self.calculate_jitter(y, sr)
        shimmer = self.calculate_shimmer(y)
        hnr = self.calculate_hnr(y)
        
        # MFCC
        mfcc_features = self.extract_mfcc(y, sr)
        
        # Spektral özellikler
        spectral_features = self.extract_spectral_features(y, sr)
        
        # Tüm özellikleri birleştir
        features = {
            'metadata': {
                'duration': float(duration),
                'sample_rate': int(sr)
            },
            'vocal_features': {
                'jitter': jitter,
                'shimmer': shimmer,
                'hnr': hnr
            },
            'mfcc': {
                'mean': mfcc_features['mean'].tolist(),
                'std': mfcc_features['std'].tolist(),
                'min': mfcc_features['min'].tolist(),
                'max': mfcc_features['max'].tolist()
            },
            'spectral_features': spectral_features
        }
        
        return features
    
    def features_to_vector(self, features: Dict) -> np.ndarray:
        """
        Özellikleri model için vektöre dönüştür
        
        Returns:
            np.ndarray: 1D feature vector (59 features)
        """
        vector = []
        
        # Vokal özellikler (3)
        vector.append(features['vocal_features']['jitter'])
        vector.append(features['vocal_features']['shimmer'])
        vector.append(features['vocal_features']['hnr'])
        
        # MFCC mean (13)
        vector.extend(features['mfcc']['mean'])
        
        # MFCC std (13)
        vector.extend(features['mfcc']['std'])
        
        # MFCC min (13)
        vector.extend(features['mfcc']['min'])
        
        # MFCC max (13)
        vector.extend(features['mfcc']['max'])
        
        # Spektral özellikler (4)
        vector.append(features['spectral_features']['spectral_centroid'])
        vector.append(features['spectral_features']['spectral_rolloff'])
        vector.append(features['spectral_features']['spectral_bandwidth'])
        vector.append(features['spectral_features']['zero_crossing_rate'])
        
        return np.array(vector)


# Test fonksiyonu
if __name__ == "__main__":
    print("🧬 Nörolojik Biyobelirteç Çıkarıcı Test")
    print("=" * 60)
    
    extractor = NeurologicalBiomarkerExtractor()
    print("✅ Extractor oluşturuldu")
    print(f"   Sample Rate: {extractor.sample_rate} Hz")
    print("\n💡 Kullanım:")
    print("   features = extractor.extract_all_features('audio.wav')")
    print("   vector = extractor.features_to_vector(features)")
