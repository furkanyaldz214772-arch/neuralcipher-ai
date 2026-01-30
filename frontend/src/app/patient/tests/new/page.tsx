'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Play, Upload, FileText, Activity, CheckCircle, Clock, Zap, Target, Award, ChevronRight, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

// Real Medical Test Protocols - Based on Clinical Research
const TEST_LEVELS = {
  quick: {
    name: 'Quick Screening',
    duration: 5,
    tests: 1,
    accuracy: '85-92%',
    icon: Zap,
    color: 'from-[#0EA5E9] to-[#06B6D4]',
    description: 'Fast initial screening for daily monitoring',
    recommended: 'Daily use',
    tests_list: [
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel A - Measures voice stability' }
    ]
  },
  standard: {
    name: 'Standard Assessment',
    duration: 45,
    tests: 9,
    accuracy: '92-95%',
    icon: Target,
    color: 'from-[#8B5CF6] to-[#7C3AED]',
    description: 'Comprehensive evaluation with multiple voice tests',
    recommended: 'Weekly use',
    tests_list: [
      // Sustained Vowels (15s)
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel A - Voice stability & jitter' },
      { id: 2, instruction: 'Say "Eeee" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel E - High frequency analysis' },
      { id: 3, instruction: 'Say "Oooo" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel O - Low frequency analysis' },
      // Diadochokinetic (15s)
      { id: 4, instruction: 'Repeat "pa-ta-ka" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Motor coordination - Oral diadochokinesis' },
      { id: 5, instruction: 'Repeat "pa-pa-pa" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Lip movement - Bilabial articulation' },
      { id: 6, instruction: 'Repeat "ta-ta-ta" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Tongue movement - Alveolar articulation' },
      // Numbers (15s)
      { id: 7, instruction: 'Count from 1 to 10', duration: 5, type: 'numbers', detail: 'Automatic speech - Sequential motor task' },
      { id: 8, instruction: 'Count from 10 to 20', duration: 5, type: 'numbers', detail: 'Speech consistency - Sustained counting' },
      { id: 9, instruction: 'Count backwards from 10 to 1', duration: 5, type: 'numbers', detail: 'Cognitive load - Reverse sequencing' }
    ]
  },
  comprehensive: {
    name: 'Comprehensive Evaluation',
    duration: 90,
    tests: 18,
    accuracy: '95-98%',
    icon: Award,
    color: 'from-[#F59E0B] to-[#D97706]',
    description: 'Extended clinical assessment with full test battery',
    recommended: 'Monthly use',
    tests_list: [
      // Sustained Vowels (15s)
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel A - Jitter & shimmer analysis' },
      { id: 2, instruction: 'Say "Eeee" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel E - Harmonics-to-noise ratio' },
      { id: 3, instruction: 'Say "Oooo" for 5 seconds', duration: 5, type: 'vowel', detail: 'Sustained vowel O - Fundamental frequency' },
      // Diadochokinetic (20s)
      { id: 4, instruction: 'Repeat "pa-ta-ka" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Alternating motion rate - Complex coordination' },
      { id: 5, instruction: 'Repeat "pa-pa-pa" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Sequential motion rate - Lip agility' },
      { id: 6, instruction: 'Repeat "ta-ta-ta" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Sequential motion rate - Tongue agility' },
      { id: 7, instruction: 'Repeat "ka-ka-ka" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'Sequential motion rate - Velar articulation' },
      // Numbers (15s)
      { id: 8, instruction: 'Count from 1 to 10', duration: 5, type: 'numbers', detail: 'Forward counting - Automatic speech production' },
      { id: 9, instruction: 'Count from 10 to 20', duration: 5, type: 'numbers', detail: 'Extended counting - Speech endurance' },
      { id: 10, instruction: 'Count backwards from 10 to 1', duration: 5, type: 'numbers', detail: 'Reverse counting - Executive function' },
      // Words (20s)
      { id: 11, instruction: 'Say: "Sun, Garden, Flower, Bird, Tree"', duration: 5, type: 'words', detail: 'Common words - Articulation clarity' },
      { id: 12, instruction: 'Say: "Hello, Thank you, Please, Good morning"', duration: 5, type: 'words', detail: 'Polite phrases - Social speech patterns' },
      { id: 13, instruction: 'Say: "Butterfly, Telephone, Computer, Hospital"', duration: 5, type: 'words', detail: 'Complex words - Multi-syllabic articulation' },
      { id: 14, instruction: 'Repeat "Hello" 5 times', duration: 5, type: 'words', detail: 'Word repetition - Speech consistency' },
      // Sentences (20s)
      { id: 15, instruction: 'Say: "The weather is nice today"', duration: 5, type: 'sentence', detail: 'Simple sentence - Natural prosody' },
      { id: 16, instruction: 'Say: "I went to the store yesterday"', duration: 5, type: 'sentence', detail: 'Past tense - Grammatical complexity' },
      { id: 17, instruction: 'Say: "Please pass me the salt and pepper"', duration: 5, type: 'sentence', detail: 'Request sentence - Pragmatic speech' },
      { id: 18, instruction: 'Read: "The quick brown fox jumps over the lazy dog"', duration: 5, type: 'sentence', detail: 'Pangram - Complete phonetic coverage' }
    ]
  },
  clinical: {
    name: 'Clinical Standard',
    duration: 120,
    tests: 24,
    accuracy: '98%+',
    icon: Activity,
    color: 'from-[#10B981] to-[#059669]',
    description: 'Full clinical protocol for medical evaluation',
    recommended: 'Doctor requested',
    tests_list: [
      // Sustained Vowels - Extended (20s)
      { id: 1, instruction: 'Say "Aaaa" for 5 seconds', duration: 5, type: 'vowel', detail: 'Vowel A - Baseline measurement' },
      { id: 2, instruction: 'Say "Eeee" for 5 seconds', duration: 5, type: 'vowel', detail: 'Vowel E - High frequency phonation' },
      { id: 3, instruction: 'Say "Oooo" for 5 seconds', duration: 5, type: 'vowel', detail: 'Vowel O - Low frequency phonation' },
      { id: 4, instruction: 'Say "Iiii" for 5 seconds', duration: 5, type: 'vowel', detail: 'Vowel I - Anterior tongue position' },
      // Diadochokinetic - Complete Battery (25s)
      { id: 5, instruction: 'Repeat "pa-ta-ka" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'AMR - Alternating motion rate' },
      { id: 6, instruction: 'Repeat "pa-pa-pa" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'SMR - Bilabial rate' },
      { id: 7, instruction: 'Repeat "ta-ta-ta" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'SMR - Alveolar rate' },
      { id: 8, instruction: 'Repeat "ka-ka-ka" 15 times quickly', duration: 5, type: 'diadochokinetic', detail: 'SMR - Velar rate' },
      { id: 9, instruction: 'Repeat "pa-ta" 10 times quickly', duration: 5, type: 'diadochokinetic', detail: 'AMR - Two-syllable alternation' },
      // Numbers - Extended (20s)
      { id: 10, instruction: 'Count from 1 to 10', duration: 5, type: 'numbers', detail: 'Forward counting - Basic sequencing' },
      { id: 11, instruction: 'Count from 10 to 20', duration: 5, type: 'numbers', detail: 'Extended counting - Sustained task' },
      { id: 12, instruction: 'Count backwards from 10 to 1', duration: 5, type: 'numbers', detail: 'Reverse counting - Cognitive demand' },
      { id: 13, instruction: 'Count by 2s: 2, 4, 6, 8, 10', duration: 5, type: 'numbers', detail: 'Skip counting - Mathematical sequencing' },
      // Words - Comprehensive (25s)
      { id: 14, instruction: 'Say: "Sun, Moon, Star, Cloud, Rain"', duration: 5, type: 'words', detail: 'Nature words - Semantic category' },
      { id: 15, instruction: 'Say: "Red, Blue, Green, Yellow, Orange"', duration: 5, type: 'words', detail: 'Color words - Visual semantics' },
      { id: 16, instruction: 'Say: "Monday, Tuesday, Wednesday, Thursday"', duration: 5, type: 'words', detail: 'Days - Temporal sequencing' },
      { id: 17, instruction: 'Say: "Butterfly, Telephone, Computer, Hospital, University"', duration: 5, type: 'words', detail: 'Complex words - Phonological complexity' },
      { id: 18, instruction: 'Repeat "Hello" 5 times', duration: 5, type: 'words', detail: 'Repetition - Motor consistency' },
      // Sentences - Full Protocol (30s)
      { id: 19, instruction: 'Say: "The weather is nice today"', duration: 5, type: 'sentence', detail: 'Simple declarative - Basic syntax' },
      { id: 20, instruction: 'Say: "I went to the store yesterday"', duration: 5, type: 'sentence', detail: 'Past tense - Temporal reference' },
      { id: 21, instruction: 'Say: "Please pass me the salt and pepper"', duration: 5, type: 'sentence', detail: 'Imperative - Request form' },
      { id: 22, instruction: 'Say: "The quick brown fox jumps over the lazy dog"', duration: 5, type: 'sentence', detail: 'Pangram - All phonemes' },
      { id: 23, instruction: 'Say: "Peter Piper picked a peck of pickled peppers"', duration: 5, type: 'sentence', detail: 'Tongue twister - Articulatory precision' },
      { id: 24, instruction: 'Describe what you did today in one sentence', duration: 5, type: 'spontaneous', detail: 'Spontaneous speech - Natural production' }
    ]
  }
}

export default function NewTestPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<'quick' | 'standard' | 'comprehensive' | 'clinical' | null>(null)
  const [currentTestIndex, setCurrentTestIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [completedTests, setCompletedTests] = useState<number[]>([])
  const [allRecordings, setAllRecordings] = useState<Blob[]>([])
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [testId, setTestId] = useState<string | null>(null)
  
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
      
      setAnalysisProgress(100)
      
      const responseTestId = response.data.test_id
      setTestId(responseTestId)
      
      // Show success popup
      setShowSuccessPopup(true)
      
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
                        
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
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
                          
                          <div className="bg-[#0F172A] rounded-lg p-3">
                            <div className="flex items-center gap-2 text-[#10B981] mb-1">
                              <CheckCircle className="h-4 w-4" />
                              <span className="text-xs font-semibold">Accuracy</span>
                            </div>
                            <p className="text-white font-bold">{level.accuracy}</p>
                          </div>
                          
                          <div className="bg-[#0F172A] rounded-lg p-3 col-span-2 sm:col-span-1">
                            <div className="flex items-center gap-2 text-[#F59E0B] mb-1">
                              <Target className="h-4 w-4" />
                              <span className="text-xs font-semibold">Use</span>
                            </div>
                            <p className="text-white font-bold text-sm">{level.recommended}</p>
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

          {/* Analyzing - Success Popup */}
          {isAnalyzing && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#1E293B] border-2 border-[#10B981] rounded-2xl p-8 shadow-2xl"
            >
              <div className="text-center">
                {/* Success Icon */}
                <motion.div
                  className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#10B981]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <CheckCircle className="h-16 w-16 text-white relative z-10" />
                </motion.div>

                {/* Success Message */}
                <motion.h2 
                  className="text-3xl sm:text-4xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  ✅ Ses Kaydı Başarılı!
                </motion.h2>
                
                <motion.p 
                  className="text-xl text-gray-300 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Sesiniz başarıyla yüklendi
                </motion.p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-4 mb-6 overflow-hidden">
                  <motion.div
                    className="h-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669]"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                {/* Info Box */}
                <motion.div
                  className="bg-[#0F172A] border border-[#10B981]/30 rounded-xl p-6 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="flex items-start gap-4 text-left">
                    <div className="w-12 h-12 rounded-full bg-[#10B981]/20 flex items-center justify-center flex-shrink-0">
                      <Activity className="h-6 w-6 text-[#10B981]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">🔬 Analiz Başlatıldı</h3>
                      <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        Ses kaydınız AI sistemimize gönderildi. Gelişmiş algoritmalarımız şu anda sesinizi analiz ediyor.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                          <span className="text-gray-400">59 ses özelliği çıkarılıyor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                          <span className="text-gray-400">Yapay zeka modeli çalışıyor</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-[#0EA5E9] animate-pulse" />
                          <span className="text-gray-400">Detaylı rapor hazırlanıyor</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Time Estimate */}
                <motion.div
                  className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl p-4 mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <Clock className="h-5 w-5 text-[#0EA5E9]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">⏱️ Tahmini Süre: 2-5 dakika</p>
                      <p className="text-gray-400 text-sm">Analiz tamamlanınca bildirim alacaksınız</p>
                    </div>
                  </div>
                </motion.div>

                {/* Redirect Message */}
                <motion.div
                  className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <FileText className="h-5 w-5 text-[#F59E0B]" />
                    <div className="text-left">
                      <p className="text-white font-semibold">📋 Sonuçlarınızı Görmek İçin</p>
                      <p className="text-gray-400 text-sm">"Testlerim" sayfasına yönlendiriliyorsunuz...</p>
                    </div>
                  </div>
                </motion.div>

                {/* Loading Animation */}
                <motion.div
                  className="mt-8 flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#0EA5E9]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#8B5CF6]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-[#10B981]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success Popup - Mükemmel Tasarım */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowSuccessPopup(false)
                router.push('/patient/tests')
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border-2 border-[#0EA5E9]/50 rounded-3xl p-8 sm:p-12 max-w-2xl w-full shadow-2xl shadow-[#0EA5E9]/20"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#10B981] to-[#059669] flex items-center justify-center relative"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#10B981]"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <CheckCircle className="h-12 w-12 text-white relative z-10" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-bold text-white text-center mb-4"
                >
                  🎉 Ses Kaydı Tamamlandı!
                </motion.h2>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-4 mb-8"
                >
                  <p className="text-lg text-gray-300 text-center leading-relaxed">
                    Ses kaydınız başarıyla yüklendi ve analiz süreci başlatıldı.
                  </p>
                  
                  <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <Activity className="h-6 w-6 text-[#0EA5E9] flex-shrink-0 mt-1 animate-pulse" />
                      <div>
                        <h3 className="text-white font-semibold mb-2 text-lg">Analiz Devam Ediyor</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Yapay zeka modelimiz ses kaydınızı analiz ediyor. Bu işlem birkaç dakika sürebilir. 
                          Sonuçlar hazır olduğunda <span className="text-[#0EA5E9] font-semibold">"Testlerim"</span> sayfasında görüntüleyebilirsiniz.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-[#0EA5E9] mb-2">
                        <Upload className="h-5 w-5" />
                        <span className="font-semibold">Yüklendi</span>
                      </div>
                      <p className="text-xs text-gray-400">Ses kaydı alındı</p>
                    </div>
                    
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-[#F59E0B] mb-2">
                        <Activity className="h-5 w-5 animate-pulse" />
                        <span className="font-semibold">İşleniyor</span>
                      </div>
                      <p className="text-xs text-gray-400">AI analiz ediyor</p>
                    </div>
                    
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                        <Clock className="h-5 w-5" />
                        <span className="font-semibold">Bekliyor</span>
                      </div>
                      <p className="text-xs text-gray-400">Sonuç hazırlanıyor</p>
                    </div>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSuccessPopup(false)
                      router.push('/patient/tests')
                    }}
                    className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30 text-lg"
                  >
                    <FileText className="h-5 w-5" />
                    Testlerime Git
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setShowSuccessPopup(false)
                      router.push('/patient/dashboard')
                    }}
                    className="flex-1 bg-[#1E293B] border-2 border-gray-700 hover:border-[#0EA5E9] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-lg"
                  >
                    <ChevronRight className="h-5 w-5" />
                    Ana Sayfaya Dön
                  </motion.button>
                </motion.div>

                {/* Info Note */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 text-center"
                >
                  <p className="text-sm text-gray-500">
                    💡 İpucu: Sonuçlar genellikle 2-5 dakika içinde hazır olur
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
