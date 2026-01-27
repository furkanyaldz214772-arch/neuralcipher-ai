'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'

export default function ProcessingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const testId = searchParams.get('testId')
  
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Ses kaydı yükleniyor...')

  useEffect(() => {
    if (!testId) {
      router.push('/patient/dashboard')
      return
    }

    // Simulate processing steps
    const steps = [
      { progress: 20, status: 'Analyzing audio recording...', delay: 1000 },
      { progress: 40, status: 'Extracting biomarkers...', delay: 2000 },
      { progress: 60, status: 'Running AI model...', delay: 2000 },
      { progress: 80, status: 'Calculating risk score...', delay: 1500 },
      { progress: 100, status: 'Preparing results...', delay: 1000 }
    ]

    let currentStep = 0
    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep]
        setTimeout(() => {
          setProgress(step.progress)
          setStatus(step.status)
          currentStep++
          runStep()
        }, step.delay)
      } else {
        // Check test status
        checkTestStatus()
      }
    }

    runStep()
  }, [testId, router])

  const checkTestStatus = async () => {
    try {
      const response = await api.get(`/api/v1/tests/${testId}`)
      
      if (response.data.status === 'completed') {
        router.push(`/results/${testId}`)
      } else if (response.data.status === 'failed') {
        alert('Error processing test. Please try again.')
        router.push('/patient/dashboard')
      } else {
        // Still processing, check again
        setTimeout(checkTestStatus, 2000)
      }
    } catch (error) {
      console.error('Failed to check test status:', error)
      // Redirect to results anyway for demo
      setTimeout(() => router.push(`/results/${testId}`), 2000)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto text-center py-12">
        {/* Animated Icon */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-8 border-electric-cyan/20 rounded-full"></div>
          <div
            className="absolute inset-0 border-8 border-electric-cyan rounded-full border-t-transparent animate-spin shadow-neon"
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🎤</span>
          </div>
        </div>

        {/* Status */}
        <h2 className="text-3xl font-sora font-bold text-white mb-4">
          Processing Test
        </h2>
        <p className="text-lg text-gray-400 mb-8 font-roboto">{status}</p>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-800/50 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-electric-cyan to-azure-start h-3 rounded-full transition-all duration-500 shadow-neon"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-400 font-roboto">{progress}% Complete</div>
        </div>

        {/* Info */}
        <div className="glassmorphism rounded-2xl p-6 text-left border border-electric-cyan/20">
          <h3 className="font-semibold text-electric-cyan mb-3 font-sora">Processing Steps:</h3>
          <ul className="space-y-2 text-sm text-gray-300 font-roboto">
            <li className={`flex items-center transition-opacity duration-300 ${progress >= 20 ? 'opacity-100' : 'opacity-50'}`}>
              <svg className={`w-5 h-5 mr-2 ${progress >= 20 ? 'text-electric-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Audio recording analysis
            </li>
            <li className={`flex items-center transition-opacity duration-300 ${progress >= 40 ? 'opacity-100' : 'opacity-50'}`}>
              <svg className={`w-5 h-5 mr-2 ${progress >= 40 ? 'text-electric-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Biomarker extraction (22 features)
            </li>
            <li className={`flex items-center transition-opacity duration-300 ${progress >= 60 ? 'opacity-100' : 'opacity-50'}`}>
              <svg className={`w-5 h-5 mr-2 ${progress >= 60 ? 'text-electric-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              AI model analysis
            </li>
            <li className={`flex items-center transition-opacity duration-300 ${progress >= 80 ? 'opacity-100' : 'opacity-50'}`}>
              <svg className={`w-5 h-5 mr-2 ${progress >= 80 ? 'text-electric-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Risk score calculation
            </li>
            <li className={`flex items-center transition-opacity duration-300 ${progress >= 100 ? 'opacity-100' : 'opacity-50'}`}>
              <svg className={`w-5 h-5 mr-2 ${progress >= 100 ? 'text-electric-cyan' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Preparing results
            </li>
          </ul>
        </div>

        <p className="text-sm text-gray-500 mt-6 font-roboto">
          This process typically takes 10-30 seconds. Please don't close the page.
        </p>
      </div>
    </DashboardLayout>
  )
}
