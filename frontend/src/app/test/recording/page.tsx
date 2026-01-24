'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'

export default function RecordingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const level = searchParams.get('level') || 'quick'
  
  const [isRecording, setIsRecording] = useState(false)
  const [currentTest, setCurrentTest] = useState(0)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const tests = getTestsForLevel(level)
  const currentTestInfo = tests[currentTest]

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' })
        setAudioBlob(blob)
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= currentTestInfo.duration) {
            stopRecording()
            return prev
          }
          return prev + 1
        })
      }, 1000)
    } catch (error) {
      console.error('Microphone access denied:', error)
      alert('Microphone access denied. Please allow access in browser settings.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop())
    }
    if (timerRef.current) clearInterval(timerRef.current)
    setIsRecording(false)
  }

  const handleNext = () => {
    if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1)
      setRecordingTime(0)
      setAudioBlob(null)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    
    try {
      // Upload audio and process
      const formData = new FormData()
      if (audioBlob) {
        formData.append('audio_file', audioBlob, 'recording.webm')
      }
      formData.append('level', level)

      const response = await api.post('/api/v1/tests/upload-new', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      router.push(`/test/processing?testId=${response.data.test_id}`)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Error uploading test. Please try again.')
      setIsProcessing(false)
    }
  }

  if (isProcessing) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 border-4 border-neon-glow border-t-transparent rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <h2 className="text-2xl font-sora font-bold text-white mb-2">Uploading Test...</h2>
          <p className="text-gray-400 font-roboto">Please wait, your audio is being processed</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-300 font-roboto">
              Test {currentTest + 1} / {tests.length}
            </span>
            <span className="text-sm text-gray-400 font-roboto">
              {Math.round((currentTest / tests.length) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-electric-cyan to-azure-start h-2 rounded-full transition-all shadow-neon"
              style={{ width: `${(currentTest / tests.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Test Card */}
        <div className="glassmorphism rounded-2xl p-8 mb-6 shadow-neon-lg">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-electric-cyan/30">
              <span className="text-4xl">{currentTestInfo.icon}</span>
            </div>
            <h2 className="text-2xl font-sora font-bold text-white mb-2">
              {currentTestInfo.name}
            </h2>
            <p className="text-gray-400 font-roboto">{currentTestInfo.instruction}</p>
          </div>

          {/* Recording Visualization */}
          <div className="flex flex-col items-center mb-8">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
              isRecording 
                ? 'bg-gradient-to-br from-red-500/20 to-vibrant-pink/20 animate-pulse border-2 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.5)]' 
                : 'bg-gray-800/50 border border-gray-700'
            }`}>
              <span className="text-5xl font-bold text-white font-sora">
                {recordingTime}s
              </span>
            </div>
            <div className="text-sm text-gray-400 font-roboto">
              Duration: {currentTestInfo.duration} seconds
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isRecording && !audioBlob && (
              <button
                onClick={startRecording}
                className="px-8 py-4 bg-gradient-to-r from-red-500 to-vibrant-pink text-white rounded-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all duration-300 font-sora font-medium flex items-center space-x-2 group"
              >
                <svg className="w-6 h-6 group-hover:animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
                <span>Start Recording</span>
              </button>
            )}

            {isRecording && (
              <button
                onClick={stopRecording}
                className="px-8 py-4 glassmorphism text-white rounded-xl hover:shadow-neon transition-all duration-300 font-sora font-medium border border-gray-700"
              >
                Stop Recording
              </button>
            )}

            {audioBlob && !isRecording && (
              <>
                <button
                  onClick={() => {
                    setAudioBlob(null)
                    setRecordingTime(0)
                  }}
                  className="px-6 py-4 glassmorphism text-gray-300 rounded-xl hover:shadow-neon transition-all duration-300 font-roboto border border-gray-700"
                >
                  Record Again
                </button>
                <button
                  onClick={handleNext}
                  className="px-8 py-4 bg-gradient-to-r from-electric-cyan to-azure-start text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium"
                >
                  {currentTest < tests.length - 1 ? 'Next Test →' : 'Complete Test'}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Example Text */}
        {currentTestInfo.example && (
          <div className="glassmorphism rounded-xl p-6 border border-electric-cyan/20">
            <h3 className="font-semibold text-white mb-2 font-sora">Example Text:</h3>
            <p className="text-gray-300 italic font-roboto">{currentTestInfo.example}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function getTestsForLevel(level: string) {
  const allTests = [
    { name: 'Sustained "A" Sound', instruction: 'Say "Aaaaa" as long as you can', duration: 5, icon: '🎵', example: null },
    { name: 'Rapid Repetition', instruction: 'Quickly repeat "Pa-ta-ka" syllables', duration: 10, icon: '⚡', example: 'pa-ta-ka-pa-ta-ka-pa-ta-ka...' },
    { name: 'Reading', instruction: 'Read the following text aloud', duration: 30, icon: '📖', example: 'The weather is beautiful today. I want to take a walk in the park.' },
    { name: 'Free Speech', instruction: 'Tell us about your day', duration: 30, icon: '💬', example: null }
  ]

  const levelMap: Record<string, number> = {
    quick: 1,
    standard: 4,
    comprehensive: 8,
    clinical: 16
  }

  return allTests.slice(0, levelMap[level] || 1)
}
