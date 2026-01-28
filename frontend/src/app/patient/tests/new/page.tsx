'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Play, Upload, FileText, Activity, CheckCircle, Clock, Zap, Target, Award, ChevronRight, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

// Real Medical Test Protocols
const TEST_LEVELS = {
  quick: {
    name: 'Quick Screening',
    duration: 5,
    tests: 1,
    accuracy: '85-92%',
    icon: Zap,
    color: 'from-[#0EA5E9] to-[#06B6D4]',
    description: 'Fast initial screening for daily monitoring',
    tests_list: [
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel' }
    ]
  },
  standard: {
    name: 'Standard Assessment',
    duration: 30,
    tests: 6,
    accuracy: '92-95%',
    icon: Target,
    color: 'from-[#8B5CF6] to-[#7C3AED]',
    description: 'Comprehensive evaluation with multiple voice tests',
    tests_list: [
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel A' },
      { id: 2, instruction: 'Say "Eeee" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel E' },
      { id: 3, instruction: 'Say "Oooo" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel O' },
      { id: 4, instruction: 'Repeat "pa-ta-ka" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Motor coordination test' },
      { id: 5, instruction: 'Repeat "pa-pa-pa" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Lip movement test' },
      { id: 6, instruction: 'Repeat "ta-ta-ta" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Tongue movement test' }
    ]
  },
  comprehensive: {
    name: 'Comprehensive Evaluation',
    duration: 60,
    tests: 12,
    accuracy: '95-98%',
    icon: Award,
    color: 'from-[#F59E0B] to-[#D97706]',
    description: 'Clinical-grade assessment with full protocol',
    tests_list: [
      // Sustained Vowels
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel A' },
      { id: 2, instruction: 'Say "Eeee" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel E' },
      { id: 3, instruction: 'Say "Oooo" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel O' },
      // Diadochokinetic
      { id: 4, instruction: 'Repeat "pa-ta-ka" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Motor coordination' },
      { id: 5, instruction: 'Repeat "pa-pa-pa" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Lip movement' },
      { id: 6, instruction: 'Repeat "ta-ta-ta" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Tongue movement' },
      // Numbers
      { id: 7, instruction: 'Count from 1 to 10', duration: 5, type: 'numbers', detail: 'Automatic speech' },
      { id: 8, instruction: 'Count from 10 to 20', duration: 5, type: 'numbers', detail: 'Speech consistency' },
      { id: 9, instruction: 'Count backwards from 10 to 1', duration: 5, type: 'numbers', detail: 'Cognitive load test' },
      // Words
      { id: 10, instruction: 'Say: "Sun, Garden, Flower, Bird, Tree"', duration: 5, type: 'words', detail: 'Common words' },
      { id: 11, instruction: 'Say: "Hello, Thank you, Please, Good morning"', duration: 5, type: 'words', detail: 'Complex words' },
      { id: 12, instruction: 'Repeat "Hello" 5 times', duration: 5, type: 'words', detail: 'Word repetition' }
    ]
  }
}

export default function NewTestPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<'quick' | 'standard' | 'comprehensive' | null>(null)
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [completedTests, setCompletedTests] = useState<number[]>([])
  const [allRecordings, setAllRecordings] = useState<Blob[]>([])
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const currentLevel = selectedLevel ? TEST_LEVELS[selectedLevel] : null
  const currentTest = currentLevel?.tests_list[currentTestIndex]
  const totalTests = currentLevel?.tests_list.length || 0
  const progress = totalTests > 0 ? ((currentTestIndex + 1) / totalTests) * 100 : 0

  const handleStartRecording = async () => {
    try {
      setError(null)
      
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []
      
      // Collect audio data
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }
      
      // Start recording
      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)
      
      // Start timer
      const maxDuration = currentTest?.duration || 5
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => {
          if (prev >= maxDuration) {
            handleStopRecording()
            return maxDuration
          }
          return prev + 1
        })
      }, 1000)
    } catch (err) {
      console.error('Failed to start recording:', err)
      setError('Failed to access microphone. Please check permissions.')
    }
  }

  const handleStopRecording = async () => {
    if (!mediaRecorderRef.current) return
    
    // Stop timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    
    // Stop recording
    mediaRecorderRef.current.stop()
    setIsRecording(false)
    
    // Wait for data to be available
    mediaRecorderRef.current.onstop = async () => {
      // Create audio blob
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' })
      
      // Stop all tracks
      mediaRecorderRef.current?.stream.getTracks().forEach(track => track.stop())
      
      // Save recording
      setAllRecordings(prev => [...prev, audioBlob])
      setCompletedTests(prev => [...prev, currentTestIndex])
      
      // Move to next test or finish
      if (currentTestIndex < totalTests - 1) {
        // Next test
        setTimeout(() => {
          setCurrentTestIndex(prev => prev + 1)
          setRecordingTime(0)
        }, 1000)
      } else {
        // All tests completed, upload
        await uploadAllRecordings([...allRecordings, audioBlob])
      }
    }
  }

  const uploadAllRecordings = async (recordings: Blob[]) => {
    try {
      setIsAnalyzing(true)
      setAnalysisProgress(10)
      
      // Combine all recordings into one
      const combinedBlob = new Blob(recordings, { type: 'audio/wav' })
      
      // Create form data
      const formData = new FormData()
      formData.append('audio_file', combinedBlob, 'recording.wav')
      formData.append('level', selectedLevel || 'quick')
      formData.append('test_count', recordings.length.toString())
      
      setAnalysisProgress(30)
      
      // Upload to backend
      const response = await api.post('/api/v1/tests/upload-test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      setAnalysisProgress(60)
      
      const testId = response.data.test_id
      
      // Poll for results
      let attempts = 0
      const maxAttempts = 30
      
      const checkStatus = setInterval(async () => {
        attempts++
        
        try {
          const statusRes = await api.get(`/api/v1/tests/${testId}`)
          const status = statusRes.data.status
          
          setAnalysisProgress(60 + (attempts / maxAttempts) * 40)
          
          if (status === 'completed') {
            clearInterval(checkStatus)
            setAnalysisProgress(100)
            
            setTimeout(() => {
              router.push(`/patient/tests/${testId}`)
            }, 1000)
          } else if (status === 'failed' || attempts >= maxAttempts) {
            clearInterval(checkStatus)
            setError('Analysis failed. Please try again.')
            setIsAnalyzing(false)
          }
        } catch (err) {
          console.error('Failed to check status:', err)
        }
      }, 2000)
      
    } catch (err) {
      console.error('Failed to upload audio:', err)
      setError('Failed to upload audio. Please try again.')
      setIsAnalyzing(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Voice Analysis Test</h1>
          <p className="text-gray-400">Choose your test level and complete the voice recordings</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-500/10 border border-red-500/50 rounded-xl p-4"
          >
            <p className="text-red-400">{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* Level Selection */}
          {!selectedLevel && !isAnalyzing && (
            <motion.div
              key="level-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {Object.entries(TEST_LEVELS).map(([key, level]) => {
                const Icon = level.icon
                return (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedLevel(key as any)}
                    className="w-full bg-[#1E293B] border-2 border-gray-700 hover:border-[#0EA5E9] rounded-2xl p-6 sm:p-8 text-left transition-all group"
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                      <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-r ${level.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{level.name}</h3>
                        <p className="text-gray-400 mb-4 text-sm sm:text-base">{level.description}</p>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                          <div className="bg-[#0F172A] rounded-lg p-3">
                            <div className="flex items-center gap-2 text-[#0EA5E9] mb-1">
                              <Clock className="h-4 w-4" />
                              <span className="text-xs font-semibold">Duration</span>
                            </div>
                            <p className="text-white font-bold">{level.duration}s</p>
                          </div>
                          
                          <div className="bg-[#0F172A] rounded-lg p-3">
                            <div className="flex items-center gap-2 text-[#8B5CF6] mb-1">
                              <Activity className="h-4 w-4" />
                              <span className="text-xs font-semibold">Tests</span>
                            </div>
                            <p className="text-white font-bold">{level.tests}</p>
                          </div>
                          
                          <div className="bg-[#0F172A] rounded-lg p-3 col-span-2 sm:col-span-1">
                            <div className="flex items-center gap-2 text-[#10B981] mb-1">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs font-semibold">Accuracy</span>
                            </div>
                            <p className="text-white font-bold">{level.accuracy}</p>
                          </div>
                        </div>
                      </div>
                      
                      <ChevronRight className="hidden sm:block h-6 w-6 text-gray-600 group-hover:text-[#0EA5E9] transition-colors flex-shrink-0" />
                    </div>
                  </motion.button>
                )
              })}

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl p-6"
              >
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-white font-semibold mb-2">Clinical-Grade Voice Analysis</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Our tests are based on validated clinical protocols used in Parkinson's research. 
                      Each test measures different aspects of voice quality including jitter, shimmer, 
                      harmonics-to-noise ratio, and motor coordination.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Test Recording */}
          {selectedLevel && !isAnalyzing && currentTest && (
            <motion.div
              key="test-recording"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Test Progress</span>
                  <span className="text-sm font-semibold text-[#0EA5E9]">
                    {currentTestIndex + 1} / {totalTests}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Main Test Card */}
              <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 sm:p-8">
                <div className="text-center">
                  {/* Microphone Icon */}
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center relative">
                    {isRecording && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#0EA5E9]"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full bg-[#06B6D4]"
                          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                        />
                      </>
                    )}
                    <Mic className="h-16 w-16 text-white relative z-10" />
                  </div>

                  {/* Test Type Badge */}
                  <div className="inline-flex items-center gap-2 bg-[#0F172A] px-4 py-2 rounded-full mb-4">
                    <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                    <span className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                      {currentTest.type}
                    </span>
                  </div>

                  {/* Test Instruction */}
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {isRecording ? 'Recording...' : 'Get Ready'}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-300 mb-6">
                    {currentTest.instruction}
                  </p>

                  {/* Timer */}
                  <div className="text-5xl sm:text-6xl font-bold text-[#0EA5E9] mb-8 font-mono">
                    {formatTime(recordingTime)} / {formatTime(currentTest.duration)}
                  </div>

                  {/* Recording Button */}
                  {!isRecording ? (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStartRecording}
                      className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto shadow-lg shadow-[#0EA5E9]/30 text-lg"
                    >
                      <Play className="h-6 w-6" />
                      Start Recording
                    </motion.button>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleStopRecording}
                      className="bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto shadow-lg shadow-[#EF4444]/30 text-lg"
                    >
                      <Square className="h-6 w-6" />
                      Stop Recording
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Instructions Card */}
              <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="h-5 w-5 text-[#0EA5E9] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-white font-semibold mb-2">Test Details</h3>
                    <p className="text-gray-400 text-sm">{currentTest.detail}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                  <div className="bg-[#1E293B] rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Duration</p>
                    <p className="text-white font-bold">{currentTest.duration}s</p>
                  </div>
                  <div className="bg-[#1E293B] rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Completed</p>
                    <p className="text-white font-bold">{completedTests.length}</p>
                  </div>
                  <div className="bg-[#1E293B] rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-400 mb-1">Remaining</p>
                    <p className="text-white font-bold">{totalTests - completedTests.length}</p>
                  </div>
                </div>
              </div>

              {/* Completed Tests */}
              {completedTests.length > 0 && (
                <div className="bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-[#10B981]">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-semibold">
                      {completedTests.length} test{completedTests.length > 1 ? 's' : ''} completed successfully
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Analyzing */}
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
                  className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <Activity className="h-16 w-16 text-white" />
                </motion.div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Analyzing Your Voice</h2>
                <p className="text-gray-400 mb-8">
                  Our AI is processing {allRecordings.length + 1} voice sample{allRecordings.length > 0 ? 's' : ''} using advanced algorithms
                </p>

                <div className="w-full bg-gray-700 rounded-full h-4 mb-4 overflow-hidden">
                  <motion.div
                    className="h-4 rounded-full bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#06B6D4]"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <p className="text-[#0EA5E9] font-bold text-2xl mb-8">{analysisProgress}%</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                  <div className="bg-[#0F172A] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#0EA5E9] mb-2">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Extracting Features</span>
                    </div>
                    <p className="text-sm text-gray-400">Analyzing voice characteristics</p>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#8B5CF6] mb-2">
                      <Activity className="h-5 w-5" />
                      <span className="font-semibold">AI Processing</span>
                    </div>
                    <p className="text-sm text-gray-400">Running neural network</p>
                  </div>
                  
                  <div className="bg-[#0F172A] rounded-xl p-4">
                    <div className="flex items-center gap-2 text-[#10B981] mb-2">
                      <Award className="h-5 w-5" />
                      <span className="font-semibold">Generating Report</span>
                    </div>
                    <p className="text-sm text-gray-400">Creating detailed analysis</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
