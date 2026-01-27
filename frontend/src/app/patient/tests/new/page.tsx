'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Play, Upload, FileText, Activity, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function NewTestPage() {
  const router = useRouter()
  const [testType, setTestType] = useState<'voice' | 'manual' | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

  const handleStartRecording = () => {
    setIsRecording(true)
    // Simulate recording timer
    const interval = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 30) {
          clearInterval(interval)
          handleStopRecording()
          return 30
        }
        return prev + 1
      })
    }, 1000)
  }

  const handleStopRecording = () => {
    setIsRecording(false)
    setIsAnalyzing(true)
    
    // Simulate analysis progress
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push('/patient/tests/1')
          }, 1000)
          return 100
        }
        return prev + 5
      })
    }, 200)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">New Test</h1>
          <p className="text-gray-400">Choose your test method and follow the instructions</p>
        </div>

        <AnimatePresence mode="wait">
          {!testType && (
            <motion.div
              key="test-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {/* Voice Test Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTestType('voice')}
                className="w-full bg-[#1E293B] border-2 border-[#0EA5E9] hover:border-[#06B6D4] rounded-2xl p-8 text-left transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                    <Mic className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Voice Test (Recommended)</h3>
                    <p className="text-gray-400 mb-4">
                      Record your voice using our AI-powered analysis system. Takes only 30 seconds.
                    </p>
                    <div className="flex items-center gap-2 text-[#0EA5E9]">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Most Accurate</span>
                    </div>
                  </div>
                </div>
              </motion.button>

              {/* Manual Entry Option */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTestType('manual')}
                className="w-full bg-[#1E293B] border-2 border-gray-700 hover:border-[#8B5CF6] rounded-2xl p-8 text-left transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">Manual Data Entry</h3>
                    <p className="text-gray-400 mb-4">
                      Enter clinical test results manually if you have them from your doctor.
                    </p>
                    <div className="flex items-center gap-2 text-gray-400">
                      <FileText className="h-5 w-5" />
                      <span className="font-semibold">Alternative Method</span>
                    </div>
                  </div>
                </div>
              </motion.button>
            </motion.div>
          )}

          {testType === 'voice' && !isAnalyzing && (
            <motion.div
              key="voice-recording"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8"
            >
              <div className="text-center">
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center relative">
                  {isRecording && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-[#0EA5E9]"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <Mic className="h-16 w-16 text-white relative z-10" />
                </div>

                <h2 className="text-2xl font-bold text-white mb-4">
                  {isRecording ? 'Recording...' : 'Voice Recording'}
                </h2>

                <div className="text-4xl font-bold text-[#0EA5E9] mb-8">
                  {formatTime(recordingTime)} / 00:30
                </div>

                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStartRecording}
                    className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-[#0EA5E9]/20"
                  >
                    <Play className="h-5 w-5" />
                    Start Recording
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStopRecording}
                    className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2 mx-auto shadow-lg shadow-[#EF4444]/20"
                  >
                    <Square className="h-5 w-5" />
                    Stop Recording
                  </motion.button>
                )}

                <div className="mt-8 bg-[#0F172A] border border-gray-700 rounded-xl p-6 text-left">
                  <h3 className="text-white font-semibold mb-4">Instructions:</h3>
                  <ol className="space-y-2 text-gray-400">
                    <li>1. Say "Aaaa" for 5 seconds</li>
                    <li>2. Repeat "Pa-ta-ka" 10 times</li>
                    <li>3. Read a short sentence clearly</li>
                  </ol>
                </div>
              </div>
            </motion.div>
          )}

          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8"
            >
              <div className="text-center">
                <motion.div
                  className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="h-16 w-16 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">Analyzing...</h2>
                <p className="text-gray-400 mb-8">Our AI is analyzing your voice sample</p>

                <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
                  <motion.div
                    className="h-4 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <p className="text-[#0EA5E9] font-semibold">{analysisProgress}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
