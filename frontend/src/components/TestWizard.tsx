'use client';

import React, { useState } from 'react';
import AudioRecorder from './AudioRecorder';

interface TestStep {
  id: number;
  name: string;
  instruction: string;
  duration: number;
  example: string;
}

const TEST_STEPS: TestStep[] = [
  {
    id: 1,
    name: '"Aaaa" Sesi',
    instruction: 'Lütfen 5 saniye boyunca "Aaaa" sesini çıkarın. Sabit bir tonla.',
    duration: 5,
    example: 'Aaaa... (sabit ses)',
  },
  {
    id: 2,
    name: '"Pataka" Sesi',
    instruction: 'Lütfen 5 saniye boyunca "Pataka pataka pataka..." deyin. Hızlı ve net.',
    duration: 5,
    example: 'Pataka pataka pataka...',
  },
  {
    id: 3,
    name: 'Hızlı Konuşma',
    instruction: 'Lütfen 30 saniye boyunca şu soruları cevaplayın: "Bugün nasılsınız? Adınız nedir? Ne yapıyorsunuz?"',
    duration: 30,
    example: 'Bugün çok iyiyim, adım Ali, yazılımcı olarak çalışıyorum...',
  },
  {
    id: 4,
    name: '"Puh" Sesi',
    instruction: 'Lütfen 3 saniye boyunca "Puh puh puh..." deyin. Kesik kesik.',
    duration: 3,
    example: 'Puh puh puh...',
  },
  {
    id: 5,
    name: 'Sayılar',
    instruction: 'Lütfen 10 saniye boyunca hızlı sayı sayın: "1, 2, 3, 4, 5..."',
    duration: 10,
    example: '1, 2, 3, 4, 5, 6, 7, 8, 9, 10...',
  },
];

export const TestWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [recordings, setRecordings] = useState<Blob[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleRecordingComplete = (blob: Blob, duration: number) => {
    const step = TEST_STEPS[currentStep];
    
    // Minimum süre kontrolü
    if (duration < step.duration - 1) {
      alert(`Lütfen en az ${step.duration} saniye kayıt yapın. Şu an: ${duration} saniye`);
      return;
    }

    // Kaydı kaydet
    const newRecordings = [...recordings];
    newRecordings[currentStep] = blob;
    setRecordings(newRecordings);

    // Sonraki adıma geç veya tamamla
    if (currentStep < TEST_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitTest(newRecordings);
    }
  };

  const submitTest = async (recordedBlobs: Blob[]) => {
    setIsProcessing(true);

    try {
      const formData = new FormData();
      recordedBlobs.forEach((blob, index) => {
        formData.append(`audio_${index + 1}`, blob, `test_${index + 1}.webm`);
      });

      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/tests/upload-multi', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Test gönderimi başarısız');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      alert('Hata: ' + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const step = TEST_STEPS[currentStep];
  const progress = ((currentStep + 1) / TEST_STEPS.length) * 100;

  if (results) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg border border-cyan-400">
        <h2 className="text-2xl font-bold mb-6 text-cyan-400">✅ Test Tamamlandı</h2>
        <div className="p-4 bg-blue-950 rounded border border-cyan-400">
          <p className="text-lg font-semibold text-white mb-4">
            🧠 Risk Skoru: <span className="text-cyan-400">{results.risk_score?.toFixed(1) || 0}%</span>
          </p>
          <p className="text-lg font-semibold text-white">
            🎯 Güven: <span className="text-cyan-400">{((results.confidence || 0) * 100).toFixed(1)}%</span>
          </p>
        </div>
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && results.test_id) {
              window.location.href = `/results/${results.test_id}`
            }
          }}
          className="mt-6 w-full px-6 py-3 bg-cyan-400 text-blue-950 rounded-lg hover:bg-cyan-300 font-semibold"
        >
          Detaylı Sonuçları Gör →
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-blue-900 to-blue-950 rounded-lg border border-cyan-400">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">🎤 5 Adımlı Test</h2>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-semibold text-white">
            Adım {currentStep + 1} / {TEST_STEPS.length}
          </span>
          <span className="text-sm text-cyan-400">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-cyan-400 h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex gap-2 mb-6">
        {TEST_STEPS.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index <= currentStep ? 'bg-cyan-400' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">{step.name}</h3>
        <p className="text-gray-300 mb-4">{step.instruction}</p>
        <div className="p-4 bg-blue-950 rounded border border-purple-500 mb-4">
          <p className="text-sm text-gray-400">
            <strong className="text-purple-400">Örnek:</strong> {step.example}
          </p>
        </div>
        <p className="text-sm text-gray-500">
          ⏱️ Maksimum Süre: {step.duration} saniye
        </p>
      </div>

      {/* Audio Recorder */}
      <AudioRecorder
        onRecordingComplete={handleRecordingComplete}
        maxDuration={step.duration + 5}
      />

      {/* Navigation */}
      <div className="mt-6 flex gap-4 justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-6 py-2 border-2 border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-400 hover:text-blue-950 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Geri
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(TEST_STEPS.length - 1, currentStep + 1))}
          disabled={currentStep === TEST_STEPS.length - 1 || !recordings[currentStep]}
          className="px-6 py-2 bg-cyan-400 text-blue-950 rounded-lg hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          İleri →
        </button>
      </div>

      {/* Processing */}
      {isProcessing && (
        <div className="mt-6 p-4 bg-purple-950 rounded border border-purple-500 text-center">
          <p className="text-purple-300">⏳ Test analiz ediliyor... Lütfen bekleyin (10-15 saniye)</p>
        </div>
      )}
    </div>
  );
};

export default TestWizard;
