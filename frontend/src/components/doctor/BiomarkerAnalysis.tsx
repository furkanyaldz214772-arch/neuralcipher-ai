'use client'

import type { Biomarkers } from '@/types'

interface BiomarkerAnalysisProps {
  biomarkers: Biomarkers
}

export default function BiomarkerAnalysis({ biomarkers }: BiomarkerAnalysisProps) {
  const categories = [
    {
      name: 'Temel Frekans (Fundamental Frequency)',
      icon: '🎵',
      markers: [
        { label: 'Ortalama F0', value: biomarkers.fundamental_frequency.mean_f0.toFixed(2), unit: 'Hz' },
        { label: 'F0 Std Sapma', value: biomarkers.fundamental_frequency.f0_std_dev.toFixed(2), unit: 'Hz' },
        { label: 'F0 Aralığı', value: biomarkers.fundamental_frequency.f0_range.toFixed(2), unit: 'Hz' }
      ]
    },
    {
      name: 'Jitter (Frekans Değişkenliği)',
      icon: '📊',
      markers: [
        { label: 'Lokal Jitter', value: (biomarkers.jitter.local_jitter * 100).toFixed(3), unit: '%' },
        { label: 'Mutlak Jitter', value: (biomarkers.jitter.absolute_jitter * 1000).toFixed(3), unit: 'ms' },
        { label: 'RAP', value: (biomarkers.jitter.rap * 100).toFixed(3), unit: '%' }
      ]
    },
    {
      name: 'Shimmer (Genlik Değişkenliği)',
      icon: '📈',
      markers: [
        { label: 'Lokal Shimmer', value: (biomarkers.shimmer.local_shimmer * 100).toFixed(3), unit: '%' },
        { label: 'Mutlak Shimmer', value: (biomarkers.shimmer.absolute_shimmer * 1000).toFixed(3), unit: 'dB' },
        { label: 'APQ', value: (biomarkers.shimmer.apq * 100).toFixed(3), unit: '%' }
      ]
    },
    {
      name: 'HNR (Harmonik-Gürültü Oranı)',
      icon: '🔊',
      markers: [
        { label: 'Harmonics to Noise', value: biomarkers.hnr.harmonics_to_noise.toFixed(2), unit: 'dB' },
        { label: 'Noise to Harmonics', value: biomarkers.hnr.noise_to_harmonics.toFixed(2), unit: 'dB' }
      ]
    },
    {
      name: 'Ses Kalitesi (Voice Quality)',
      icon: '🎤',
      markers: [
        { label: 'AVQI', value: biomarkers.voice_quality.avqi.toFixed(2), unit: '' },
        { label: 'DSI', value: biomarkers.voice_quality.dsi.toFixed(2), unit: '' },
        { label: 'CPP', value: biomarkers.voice_quality.cpp.toFixed(2), unit: 'dB' }
      ]
    },
    {
      name: 'Konuşma Hızı (Speech Rate)',
      icon: '⚡',
      markers: [
        { label: 'Konuşma Hızı', value: biomarkers.speech_rate.toFixed(2), unit: 'hece/sn' },
        { label: 'Artikülasyon Hızı', value: biomarkers.articulation_rate.toFixed(2), unit: 'hece/sn' }
      ]
    }
  ]

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">59 Biyobelirteç Analizi</h3>
        <p className="text-sm text-blue-800">
          Bu sayfa hastanın ses kaydından çıkarılan tüm biyobelirteçleri gösterir. 
          Her kategori Parkinson hastalığının farklı yönlerini değerlendirir.
        </p>
      </div>

      {categories.map((category, index) => (
        <div key={index} className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{category.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {category.markers.map((marker, markerIndex) => (
                <div key={markerIndex} className="border border-gray-200 rounded-lg p-4">
                  <div className="text-sm text-gray-600 mb-1">{marker.label}</div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{marker.value}</span>
                    {marker.unit && (
                      <span className="text-sm text-gray-500">{marker.unit}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Clinical Notes */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Klinik Notlar</h3>
        <textarea
          placeholder="Hasta hakkında notlarınızı buraya yazın..."
          rows={6}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex justify-end mt-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Notu Kaydet
          </button>
        </div>
      </div>
    </div>
  )
}
