#!/usr/bin/env python3
"""
NeuralCipher.ai - Proof of Concept
Ses dosyasından Parkinson hastalığı risk skorunu hesaplar
"""

import argparse
import numpy as np
import librosa
import warnings
warnings.filterwarnings('ignore')


class AudioFeatureExtractor:
    """Ses dosyasından nörolojik özellikler çıkarır"""
    
    def __init__(self, audio_path):
        self.audio_path = audio_path
        self.y = None
        self.sr = None
        
    def load_audio(self):
        """Ses dosyasını yükle"""
        print(f"📂 Ses dosyası yükleniyor: {self.audio_path}")
        self.y, self.sr = librosa.load(self.audio_path, sr=22050)
        duration = librosa.get_duration(y=self.y, sr=self.sr)
        print(f"✅ Yüklendi - Süre: {duration:.2f} saniye, Sample Rate: {self.sr} Hz")
        return self
    
    def calculate_jitter(self):
        """Jitter: Ses tellerindeki frekans değişkenliği"""
        # F0 (temel frekans) çıkarımı
        f0 = librosa.yin(self.y, fmin=50, fmax=400, sr=self.sr)
        f0_clean = f0[f0 > 0]  # Sıfır değerleri temizle
        
        if len(f0_clean) < 2:
            return 0.0
        
        # Jitter: ardışık periyotlar arası fark
        periods = 1 / f0_clean
        period_diffs = np.abs(np.diff(periods))
        jitter = np.mean(period_diffs) / np.mean(periods) * 100
        
        return jitter
    
    def calculate_shimmer(self):
        """Shimmer: Ses tellerindeki genlik değişkenliği"""
        # Amplitüd zarfı
        amplitude_envelope = np.abs(librosa.stft(self.y))
        amplitude_mean = np.mean(amplitude_envelope, axis=0)
        
        if len(amplitude_mean) < 2:
            return 0.0
        
        # Shimmer: ardışık genlikler arası fark
        amp_diffs = np.abs(np.diff(amplitude_mean))
        shimmer = np.mean(amp_diffs) / np.mean(amplitude_mean) * 100
        
        return shimmer
    
    def calculate_hnr(self):
        """HNR (Harmonics-to-Noise Ratio): Ses kalitesi"""
        # Harmonik ve gürültü ayrımı
        harmonic, percussive = librosa.effects.hpss(self.y)
        
        harmonic_power = np.sum(harmonic ** 2)
        noise_power = np.sum(percussive ** 2)
        
        if noise_power == 0:
            return 100.0
        
        hnr = 10 * np.log10(harmonic_power / noise_power)
        return hnr
    
    def extract_mfcc(self, n_mfcc=13):
        """MFCC: Mel-Frequency Cepstral Coefficients"""
        mfcc = librosa.feature.mfcc(y=self.y, sr=self.sr, n_mfcc=n_mfcc)
        mfcc_mean = np.mean(mfcc, axis=1)
        mfcc_std = np.std(mfcc, axis=1)
        
        return mfcc_mean, mfcc_std
    
    def extract_all_features(self):
        """Tüm özellikleri çıkar"""
        print("\n🔬 Özellik çıkarımı başlıyor...")
        
        features = {}
        
        # Vokal özellikler
        features['jitter'] = self.calculate_jitter()
        print(f"  ✓ Jitter: {features['jitter']:.4f}%")
        
        features['shimmer'] = self.calculate_shimmer()
        print(f"  ✓ Shimmer: {features['shimmer']:.4f}%")
        
        features['hnr'] = self.calculate_hnr()
        print(f"  ✓ HNR: {features['hnr']:.2f} dB")
        
        # MFCC
        mfcc_mean, mfcc_std = self.extract_mfcc()
        features['mfcc_mean'] = mfcc_mean
        features['mfcc_std'] = mfcc_std
        print(f"  ✓ MFCC: {len(mfcc_mean)} katsayı çıkarıldı")
        
        # Ek özellikler
        features['zero_crossing_rate'] = np.mean(librosa.feature.zero_crossing_rate(self.y))
        features['spectral_centroid'] = np.mean(librosa.feature.spectral_centroid(y=self.y, sr=self.sr))
        features['spectral_rolloff'] = np.mean(librosa.feature.spectral_rolloff(y=self.y, sr=self.sr))
        
        print(f"  ✓ Ek özellikler: ZCR, Spectral Centroid, Rolloff")
        
        return features


class ParkinsonRiskCalculator:
    """Basit kural tabanlı risk hesaplayıcı (gerçek model yerine)"""
    
    def __init__(self):
        # Sağlıklı kişilerde beklenen değerler (literatürden)
        self.healthy_ranges = {
            'jitter': (0.0, 1.0),      # %
            'shimmer': (0.0, 3.5),     # %
            'hnr': (20.0, 40.0),       # dB
        }
    
    def calculate_risk_score(self, features):
        """Risk skorunu hesapla (0-100)"""
        print("\n🧠 Risk skoru hesaplanıyor...")
        
        risk_factors = []
        
        # Jitter kontrolü
        jitter = features['jitter']
        if jitter > self.healthy_ranges['jitter'][1]:
            jitter_risk = min((jitter - 1.0) / 2.0 * 100, 100)
            risk_factors.append(jitter_risk)
            print(f"  ⚠️  Jitter yüksek: {jitter:.4f}% (normal: <1.0%)")
        else:
            print(f"  ✓ Jitter normal: {jitter:.4f}%")
        
        # Shimmer kontrolü
        shimmer = features['shimmer']
        if shimmer > self.healthy_ranges['shimmer'][1]:
            shimmer_risk = min((shimmer - 3.5) / 5.0 * 100, 100)
            risk_factors.append(shimmer_risk)
            print(f"  ⚠️  Shimmer yüksek: {shimmer:.4f}% (normal: <3.5%)")
        else:
            print(f"  ✓ Shimmer normal: {shimmer:.4f}%")
        
        # HNR kontrolü
        hnr = features['hnr']
        if hnr < self.healthy_ranges['hnr'][0]:
            hnr_risk = min((20.0 - hnr) / 20.0 * 100, 100)
            risk_factors.append(hnr_risk)
            print(f"  ⚠️  HNR düşük: {hnr:.2f} dB (normal: >20 dB)")
        else:
            print(f"  ✓ HNR normal: {hnr:.2f} dB")
        
        # Genel risk skoru
        if len(risk_factors) == 0:
            risk_score = 10  # Minimal risk
        else:
            risk_score = np.mean(risk_factors)
        
        return risk_score
    
    def interpret_risk(self, risk_score):
        """Risk skorunu yorumla"""
        if risk_score < 30:
            level = "DÜŞÜK"
            color = "🟢"
            message = "Ses parametreleri normal aralıkta. Düzenli takip önerilir."
        elif risk_score < 60:
            level = "ORTA"
            color = "🟡"
            message = "Bazı parametrelerde sapma tespit edildi. Nöroloji uzmanına danışmanız önerilir."
        else:
            level = "YÜKSEK"
            color = "🔴"
            message = "Birden fazla parametrede anormallik tespit edildi. Acil nöroloji konsültasyonu önerilir."
        
        return {
            'level': level,
            'color': color,
            'message': message
        }


def main():
    parser = argparse.ArgumentParser(description='NeuralCipher.ai - Ses Analizi PoC')
    parser.add_argument('--audio', type=str, required=True, help='Ses dosyası yolu (.wav)')
    args = parser.parse_args()
    
    print("=" * 60)
    print("🧬 NEURALCIPHER.AI - PROOF OF CONCEPT")
    print("=" * 60)
    
    # Özellik çıkarımı
    extractor = AudioFeatureExtractor(args.audio)
    extractor.load_audio()
    features = extractor.extract_all_features()
    
    # Risk hesaplama
    calculator = ParkinsonRiskCalculator()
    risk_score = calculator.calculate_risk_score(features)
    interpretation = calculator.interpret_risk(risk_score)
    
    # Sonuçları göster
    print("\n" + "=" * 60)
    print("📊 ANALİZ SONUÇLARI")
    print("=" * 60)
    print(f"\n{interpretation['color']} Risk Seviyesi: {interpretation['level']}")
    print(f"📈 Risk Skoru: {risk_score:.1f}/100")
    print(f"\n💡 Yorum: {interpretation['message']}")
    print("\n⚠️  DİKKAT: Bu bir proof-of-concept'tir. Tıbbi teşhis koymaz!")
    print("   Doktorunuza danışın.\n")
    print("=" * 60)


if __name__ == "__main__":
    main()

