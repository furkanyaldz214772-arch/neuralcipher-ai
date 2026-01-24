/**
 * Audio Recorder Component
 * Real-time browser audio recording with waveform visualization
 */
'use client';

import React, { useRef, useEffect } from 'react';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number) => void;
  maxDuration?: number;
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  onRecordingComplete,
  maxDuration = 300,
}) => {
  const {
    isRecording,
    duration,
    audioBlob,
    startRecording,
    stopRecording,
    error,
  } = useAudioRecorder();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  // Initialize audio visualization
  useEffect(() => {
    if (isRecording) {
      initializeVisualization();
    } else {
      stopVisualization();
    }

    return () => stopVisualization();
  }, [isRecording]);

  // Handle recording complete
  useEffect(() => {
    if (audioBlob && !isRecording) {
      onRecordingComplete(audioBlob, duration);
    }
  }, [audioBlob, isRecording, duration, onRecordingComplete]);

  const initializeVisualization = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      drawWaveform();
    } catch (err) {
      console.error('Visualization error:', err);
    }
  };

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    const analyser = analyserRef.current;

    if (!canvas || !analyser) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas
      ctx.fillStyle = 'rgb(243, 244, 246)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw bars
      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;

        // Gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, '#3B82F6');
        gradient.addColorStop(1, '#64FFDA');

        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    draw();
  };

  const stopVisualization = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const downloadAudio = () => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${Date.now()}.webm`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Ses Kaydı</h2>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          <p className="font-medium">Hata:</p>
          <p>{error}</p>
        </div>
      )}

      {/* Waveform Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={200}
        className="w-full border-2 border-gray-300 rounded-lg mb-4 bg-gray-50"
      />

      {/* Timer */}
      <div className="text-center mb-6">
        <p className="text-5xl font-bold text-blue-600 mb-2">
          {formatTime(duration)}
        </p>
        <p className="text-sm text-gray-500">
          Maksimum: {formatTime(maxDuration)}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(duration / maxDuration) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center flex-wrap">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Kayıt Başlat
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            ⏹️ Durdur
          </button>
        )}

        {audioBlob && !isRecording && (
          <>
            <button
              onClick={() => {
                const url = URL.createObjectURL(audioBlob);
                const audio = new Audio(url);
                audio.play();
              }}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              🔊 Dinle
            </button>
            <button
              onClick={() => {
                const url = URL.createObjectURL(audioBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `recording-${Date.now()}.webm`;
                a.click();
              }}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              📥 İndir
            </button>
          </>
        )}
      </div>

      {/* File Info */}
      {audioBlob && !isRecording && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700 mb-1">
            <strong>Dosya Boyutu:</strong> {(audioBlob.size / 1024).toFixed(2)} KB
          </p>
          <p className="text-sm text-gray-700 mb-1">
            <strong>Dosya Türü:</strong> {audioBlob.type}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Süre:</strong> {formatTime(duration)}
          </p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;
