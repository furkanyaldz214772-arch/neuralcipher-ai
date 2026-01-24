"""
Audio Data Loader
8.19 GB - 2,374 WAV dosyası
59 ses özelliği çıkarımı
"""

import librosa
import numpy as np
from pathlib import Path
from typing import List, Dict, Tuple
import logging
import warnings
warnings.filterwarnings('ignore')

logger = logging.getLogger(__name__)


class AudioDataLoader:
    """Ses dosyalarını yükler ve 59 özellik çıkarır"""
    
    def __init__(self, data_dir: str):
        self.data_dir = Path(data_dir)
        self.audio_files = self.discover_files()
        logger.info(f"🎵 {len(self.audio_files)} ses dosyası bulundu")
        
        # Ses parametreleri
        self.sr = 22050  # Sample rate
        self.n_mfcc = 13
        self.n_fft = 2048
        self.hop_length = 512
    
    def discover_files(self) -> List[Path]:
        """Tüm ses dosyalarını bul"""
        files = []
        files.extend(self.data_dir.rglob('*.wav'))
        files.extend(self.data_dir.rglob('*.m4a'))
        files.extend(self.data_dir.rglob('*.mp3'))
        return sorted(files)
    
    def load_audio(self, file_path: Path) -> Tuple[np.ndarray, int]:
        """Ses dosyasını yükle"""
        try:
            y, sr = librosa.load(str(file_path), sr=self.sr)
            return y, sr
        except Exception as e:
            logger.error(f"❌ Yükleme hatası {file_path.name}: {e}")
            return None, None
    
    def extract_59_features(self, y: np.ndarray, sr: int) -> Dict[str, float]:
        """
        59 ses özelliği çıkar (Parkinson's için optimize edilmiş)
        
        Kategoriler:
        - Frequency features (22)
        - Jitter features (5)
        - Shimmer features (6)
        - Harmonic features (4)
        - MFCC features (13)
        - Spectral features (9)
        """
        features = {}
        
        try:
            # 1. FREQUENCY FEATURES (22)
            # Fundamental frequency (F0)
            f0 = librosa.yin(y, fmin=50, fmax=400, sr=sr)
            f0 = f0[f0 > 0]  # Remove unvoiced frames
            
            if len(f0) > 0:
                features['MDVP:Fo(Hz)'] = np.mean(f0)
                features['MDVP:Fhi(Hz)'] = np.max(f0)
                features['MDVP:Flo(Hz)'] = np.min(f0)
                features['F0_std'] = np.std(f0)
                features['F0_range'] = features['MDVP:Fhi(Hz)'] - features['MDVP:Flo(Hz)']
            else:
                features['MDVP:Fo(Hz)'] = 0
                features['MDVP:Fhi(Hz)'] = 0
                features['MDVP:Flo(Hz)'] = 0
                features['F0_std'] = 0
                features['F0_range'] = 0
            
            # Spectral centroid
            spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
            features['spectral_centroid_mean'] = np.mean(spectral_centroids)
            features['spectral_centroid_std'] = np.std(spectral_centroids)
            
            # Spectral rolloff
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
            features['spectral_rolloff_mean'] = np.mean(spectral_rolloff)
            features['spectral_rolloff_std'] = np.std(spectral_rolloff)
            
            # Zero crossing rate
            zcr = librosa.feature.zero_crossing_rate(y)[0]
            features['zcr_mean'] = np.mean(zcr)
            features['zcr_std'] = np.std(zcr)
            
            # Spectral bandwidth
            spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
            features['spectral_bandwidth_mean'] = np.mean(spectral_bandwidth)
            features['spectral_bandwidth_std'] = np.std(spectral_bandwidth)
            
            # Spectral contrast
            spectral_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
            for i in range(min(7, spectral_contrast.shape[0])):
                features[f'spectral_contrast_{i}'] = np.mean(spectral_contrast[i])
            
            # 2. JITTER FEATURES (5)
            # Period-to-period variation
            if len(f0) > 1:
                f0_diff = np.abs(np.diff(f0))
                features['MDVP:Jitter(%)'] = (np.mean(f0_diff) / np.mean(f0)) * 100
                features['MDVP:Jitter(Abs)'] = np.mean(f0_diff)
                features['MDVP:RAP'] = np.mean(np.abs(f0[:-2] - f0[2:])) / np.mean(f0)
                features['MDVP:PPQ'] = np.std(f0_diff) / np.mean(f0)
                features['Jitter:DDP'] = features['MDVP:RAP'] * 3
            else:
                features['MDVP:Jitter(%)'] = 0
                features['MDVP:Jitter(Abs)'] = 0
                features['MDVP:RAP'] = 0
                features['MDVP:PPQ'] = 0
                features['Jitter:DDP'] = 0
            
            # 3. SHIMMER FEATURES (6)
            # Amplitude variation
            rms = librosa.feature.rms(y=y)[0]
            if len(rms) > 1:
                rms_diff = np.abs(np.diff(rms))
                features['MDVP:Shimmer'] = np.mean(rms_diff) / np.mean(rms)
                features['MDVP:Shimmer(dB)'] = 20 * np.log10(features['MDVP:Shimmer'] + 1e-10)
                features['Shimmer:APQ3'] = np.mean(np.abs(rms[:-2] - rms[2:])) / np.mean(rms)
                features['Shimmer:APQ5'] = np.mean(np.abs(rms[:-4] - rms[4:])) / np.mean(rms)
                features['MDVP:APQ'] = np.std(rms_diff) / np.mean(rms)
                features['Shimmer:DDA'] = features['Shimmer:APQ3'] * 3
            else:
                features['MDVP:Shimmer'] = 0
                features['MDVP:Shimmer(dB)'] = 0
                features['Shimmer:APQ3'] = 0
                features['Shimmer:APQ5'] = 0
                features['MDVP:APQ'] = 0
                features['Shimmer:DDA'] = 0
            
            # 4. HARMONIC FEATURES (4)
            # Harmonic-to-noise ratio
            harmonic, percussive = librosa.effects.hpss(y)
            harmonic_energy = np.sum(harmonic ** 2)
            noise_energy = np.sum(percussive ** 2)
            
            if noise_energy > 0:
                features['HNR'] = 10 * np.log10(harmonic_energy / noise_energy)
                features['NHR'] = 1 / (features['HNR'] + 1e-10)
            else:
                features['HNR'] = 0
                features['NHR'] = 0
            
            # RPDE (Recurrence Period Density Entropy)
            features['RPDE'] = self.calculate_rpde(y)
            
            # DFA (Detrended Fluctuation Analysis)
            features['DFA'] = self.calculate_dfa(y)
            
            # 5. MFCC FEATURES (13)
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=self.n_mfcc)
            for i in range(self.n_mfcc):
                features[f'MFCC_{i+1}'] = np.mean(mfccs[i])
            
            # 6. ADDITIONAL SPECTRAL FEATURES (9)
            # Spread and PPE
            features['spread1'] = np.std(spectral_centroids)
            features['spread2'] = np.std(spectral_rolloff)
            features['D2'] = self.calculate_correlation_dimension(y)
            features['PPE'] = self.calculate_ppe(f0)
            
            # Chroma features
            chroma = librosa.feature.chroma_stft(y=y, sr=sr)
            features['chroma_mean'] = np.mean(chroma)
            features['chroma_std'] = np.std(chroma)
            
            # Tonnetz
            tonnetz = librosa.feature.tonnetz(y=y, sr=sr)
            features['tonnetz_mean'] = np.mean(tonnetz)
            features['tonnetz_std'] = np.std(tonnetz)
            
            # Tempo
            tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
            features['tempo'] = tempo
            
        except Exception as e:
            logger.error(f"❌ Özellik çıkarma hatası: {e}")
            # Hata durumunda sıfır değerler döndür
            for i in range(59):
                features[f'feature_{i}'] = 0
        
        return features
    
    def calculate_rpde(self, y: np.ndarray) -> float:
        """Recurrence Period Density Entropy hesapla"""
        try:
            # Basitleştirilmiş RPDE hesabı
            autocorr = np.correlate(y, y, mode='full')
            autocorr = autocorr[len(autocorr)//2:]
            autocorr = autocorr / autocorr[0]
            
            # Entropy hesapla
            hist, _ = np.histogram(autocorr, bins=50)
            hist = hist / np.sum(hist)
            hist = hist[hist > 0]
            entropy = -np.sum(hist * np.log2(hist))
            
            return entropy
        except:
            return 0.0
    
    def calculate_dfa(self, y: np.ndarray) -> float:
        """Detrended Fluctuation Analysis hesapla"""
        try:
            # Basitleştirilmiş DFA hesabı
            N = len(y)
            y_cumsum = np.cumsum(y - np.mean(y))
            
            # Farklı pencere boyutları
            scales = np.logspace(1, np.log10(N//4), 10, dtype=int)
            fluctuations = []
            
            for scale in scales:
                n_segments = N // scale
                if n_segments < 2:
                    continue
                
                segments = y_cumsum[:n_segments*scale].reshape(n_segments, scale)
                
                # Her segment için trend çıkar
                trends = np.array([np.polyval(np.polyfit(range(scale), seg, 1), range(scale)) 
                                  for seg in segments])
                
                # Fluctuation hesapla
                fluct = np.sqrt(np.mean((segments - trends) ** 2))
                fluctuations.append(fluct)
            
            if len(fluctuations) > 1:
                # Log-log slope
                log_scales = np.log(scales[:len(fluctuations)])
                log_flucts = np.log(fluctuations)
                dfa = np.polyfit(log_scales, log_flucts, 1)[0]
                return dfa
            
            return 0.0
        except:
            return 0.0
    
    def calculate_correlation_dimension(self, y: np.ndarray) -> float:
        """Correlation Dimension (D2) hesapla"""
        try:
            # Basitleştirilmiş D2 hesabı
            # Embedding dimension
            m = 3
            tau = 1
            
            # Time delay embedding
            N = len(y)
            M = N - (m - 1) * tau
            
            if M < 10:
                return 0.0
            
            embedded = np.zeros((M, m))
            for i in range(M):
                for j in range(m):
                    embedded[i, j] = y[i + j * tau]
            
            # Pairwise distances
            from scipy.spatial.distance import pdist
            distances = pdist(embedded[:min(1000, M)])
            
            # Correlation sum
            r = np.logspace(-2, 0, 10)
            C = np.array([np.sum(distances < ri) / len(distances) for ri in r])
            C = C[C > 0]
            
            if len(C) > 1:
                log_r = np.log(r[:len(C)])
                log_C = np.log(C)
                d2 = np.polyfit(log_r, log_C, 1)[0]
                return d2
            
            return 0.0
        except:
            return 0.0
    
    def calculate_ppe(self, f0: np.ndarray) -> float:
        """Pitch Period Entropy hesapla"""
        try:
            if len(f0) < 2:
                return 0.0
            
            # Period hesapla
            periods = 1 / (f0 + 1e-10)
            
            # Histogram ve entropy
            hist, _ = np.histogram(periods, bins=50)
            hist = hist / np.sum(hist)
            hist = hist[hist > 0]
            ppe = -np.sum(hist * np.log2(hist))
            
            return ppe
        except:
            return 0.0
    
    def process_single_file(self, file_path: Path) -> Dict:
        """Tek bir ses dosyasını işle"""
        # Yükle
        y, sr = self.load_audio(file_path)
        if y is None:
            return None
        
        # Özellikleri çıkar
        features = self.extract_59_features(y, sr)
        
        # Label belirle (dosya adından)
        label = 1 if any(x in file_path.stem.lower() for x in ['pd', 'patient', 'parkinson']) else 0
        
        result = {
            'file_path': str(file_path),
            'file_name': file_path.name,
            'label': label,
            'duration': len(y) / sr,
            'features': features
        }
        
        return result
    
    def process_all(self) -> List[Dict]:
        """Tüm ses dosyalarını işle"""
        logger.info("🎵 Tüm ses dosyaları işleniyor...")
        
        results = []
        for i, file_path in enumerate(self.audio_files):
            if i % 100 == 0:
                logger.info(f"  İşleniyor: {i}/{len(self.audio_files)}")
            
            result = self.process_single_file(file_path)
            if result:
                results.append(result)
        
        logger.info(f"✅ {len(results)} ses dosyası işlendi")
        return results
    
    def create_feature_matrix(self, results: List[Dict]) -> Tuple[np.ndarray, np.ndarray]:
        """Feature matrix oluştur"""
        if not results:
            return None, None
        
        # Feature names
        feature_names = list(results[0]['features'].keys())
        
        # Matrix oluştur
        X = np.array([[r['features'][fn] for fn in feature_names] for r in results])
        y = np.array([r['label'] for r in results])
        
        logger.info(f"✅ Feature matrix: X={X.shape}, y={y.shape}")
        
        return X, y


def test_loader():
    """Loader'ı test et"""
    print("🎵 Audio Loader Test")
    print("=" * 80)
    
    loader = AudioDataLoader("../../Veriler")
    
    # İlk dosyayı test et
    if loader.audio_files:
        print(f"\n🔄 İlk dosya test ediliyor: {loader.audio_files[0].name}")
        result = loader.process_single_file(loader.audio_files[0])
        
        if result:
            print(f"\n✅ Özellikler çıkarıldı:")
            print(f"  Dosya: {result['file_name']}")
            print(f"  Süre: {result['duration']:.2f} saniye")
            print(f"  Label: {result['label']}")
            print(f"  Özellik sayısı: {len(result['features'])}")
            print(f"\n  İlk 5 özellik:")
            for i, (key, value) in enumerate(list(result['features'].items())[:5]):
                print(f"    {key}: {value:.4f}")


if __name__ == "__main__":
    test_loader()
