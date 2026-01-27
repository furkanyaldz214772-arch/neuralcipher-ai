/**
 * NeuralCipher.ai - Test Results Page
 * Professional Results Display with Biomarker Analysis
 */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'
import type { VoiceTest } from '@/types'

export default function ResultsPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params.id as string
  
  const [test, setTest] = useState<VoiceTest | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (testId) {
      fetchTestResults()
    }
  }, [testId])

  const fetchTestResults = async () => {
    try {
      const response = await api.get(`/api/v1/tests/${testId}`)
      setTest(response.data)
    } catch (error) {
      console.error('Failed to fetch test results:', error)
      setError('Failed to load test results')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/api/v1/tests/${testId}/pdf`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `neuralcipher-test-${testId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download PDF:', error)
      alert('Failed to download PDF report')
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-neon-glow border-t-transparent rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !test) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto text-center py-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center border-2 border-red-500/50">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-sora font-bold text-white mb-4">Test Not Found</h2>
          <p className="text-gray-400 mb-8 font-roboto">{error || 'The test you are looking for does not exist'}</p>
          <button
            onClick={() => router.push('/patient/dashboard')}
            className="px-6 py-3 bg-gradient-to-r from-electric-cyan to-azure-start text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium"
          >
            Back to Dashboard
          </button>
        </div>
      </DashboardLayout>
    )
  }

  const riskLevel = getRiskLevel(test.risk_score)
  const riskColor = getRiskColor(test.risk_score)
  const riskBg = getRiskBg(test.risk_score)

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-sora font-bold text-white mb-2">
                Test <span className="text-electric-cyan glow-text">Results</span>
              </h1>
              <p className="text-gray-400 font-roboto">
                {formatDate(test.test_date)} • Test ID: {test.id.slice(0, 8)}
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 glassmorphism rounded-xl text-white hover:shadow-neon transition-all duration-300 font-roboto border border-gray-700 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => router.push('/patient/dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-electric-cyan to-azure-start text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Risk Score Card - Large */}
        <div className={`glassmorphism rounded-2xl p-8 mb-6 relative overflow-hidden ${riskBg} border-2`}>
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 bg-gradient-to-br ${riskColor === 'text-green-400' ? 'from-green-500 to-green-600' : riskColor === 'text-yellow-400' ? 'from-yellow-500 to-yellow-600' : 'from-red-500 to-red-600'}`}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-sora font-bold text-white mb-2">Risk Assessment</h2>
              <p className="text-gray-300 font-roboto mb-4">
                Based on {test.test_level} test analysis
              </p>
              <div className={`inline-block px-4 py-2 rounded-full ${riskBg} border-2`}>
                <span className={`text-lg font-bold ${riskColor}`}>{riskLevel}</span>
              </div>
            </div>
            
            <div className="text-center">
              <div className={`text-8xl font-black ${riskColor} mb-2`}>
                {test.risk_score}
              </div>
              <div className="text-gray-400 font-roboto">Risk Score</div>
              <div className="mt-4 text-sm text-gray-500 font-roboto">
                Confidence: {(test.confidence * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Biomarkers Grid */}
        <div className="mb-6">
          <h3 className="text-2xl font-sora font-bold text-white mb-4">Voice Biomarkers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {generateMockBiomarkers(test.risk_score).map((biomarker, index) => (
              <div
                key={biomarker.name}
                className="glassmorphism rounded-xl p-5 hover:shadow-glow-md transition-all duration-300 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white font-roboto">
                    {biomarker.name}
                  </h4>
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 flex items-center justify-center border border-electric-cyan/30">
                    <span className="text-electric-cyan font-bold text-sm">
                      {biomarker.value}
                    </span>
                  </div>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-cyan to-azure-start rounded-full transition-all duration-500"
                    style={{ width: `${biomarker.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="glassmorphism rounded-2xl p-6 mb-6">
          <h3 className="text-2xl font-sora font-bold text-white mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Recommendations
          </h3>
          <div className="space-y-3">
            {getRecommendations(test.risk_score).map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 glassmorphism rounded-xl hover:shadow-glow-sm transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 flex items-center justify-center flex-shrink-0 border border-electric-cyan/30">
                  <span className="text-electric-cyan font-bold">{index + 1}</span>
                </div>
                <p className="text-gray-300 font-roboto">{rec}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/test/new')}
            className="glassmorphism rounded-xl p-6 hover:shadow-glow-md transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 flex items-center justify-center mb-4 border border-electric-cyan/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2 font-sora group-hover:text-electric-cyan transition-colors">
              Take Another Test
            </h4>
            <p className="text-sm text-gray-400 font-roboto">
              Track your progress over time
            </p>
          </button>

          <button
            onClick={() => router.push('/history')}
            className="glassmorphism rounded-xl p-6 hover:shadow-glow-md transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-glow/20 to-vibrant-pink/20 flex items-center justify-center mb-4 border border-neon-glow/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-neon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2 font-sora group-hover:text-neon-glow transition-colors">
              View History
            </h4>
            <p className="text-sm text-gray-400 font-roboto">
              Compare with previous tests
            </p>
          </button>

          <button
            onClick={() => window.open('https://www.neuralcipher.ai/contact', '_blank')}
            className="glassmorphism rounded-xl p-6 hover:shadow-glow-md transition-all duration-300 text-left group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sunset-orange/20 to-vibrant-pink/20 flex items-center justify-center mb-4 border border-sunset-orange/30 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-sunset-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-2 font-sora group-hover:text-sunset-orange transition-colors">
              Consult Doctor
            </h4>
            <p className="text-sm text-gray-400 font-roboto">
              Get professional advice
            </p>
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function getRiskLevel(score: number): string {
  if (score < 30) return 'Low Risk'
  if (score < 60) return 'Moderate Risk'
  return 'High Risk'
}

function getRiskColor(score: number): string {
  if (score < 30) return 'text-green-400'
  if (score < 60) return 'text-yellow-400'
  return 'text-red-400'
}

function getRiskBg(score: number): string {
  if (score < 30) return 'border-green-500/30'
  if (score < 60) return 'border-yellow-500/30'
  return 'border-red-500/30'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function getRecommendations(score: number): string[] {
  if (score < 30) {
    return [
      'Your results show low risk. Continue monitoring your health with regular tests.',
      'Maintain a healthy lifestyle with regular exercise and balanced diet.',
      'Consider taking a follow-up test in 3-6 months to track any changes.',
      'Stay informed about Parkinson\'s disease symptoms and early warning signs.'
    ]
  } else if (score < 60) {
    return [
      'Your results indicate moderate risk. We recommend consulting with a neurologist.',
      'Schedule regular monitoring tests every 1-3 months to track progression.',
      'Consider lifestyle modifications including exercise, stress management, and proper sleep.',
      'Discuss preventive measures and early intervention options with your healthcare provider.',
      'Keep a symptom diary to track any changes in motor or non-motor symptoms.'
    ]
  } else {
    return [
      'Your results show elevated risk. Please consult a neurologist as soon as possible.',
      'Schedule a comprehensive neurological examination and diagnostic tests.',
      'Discuss treatment options and management strategies with your healthcare team.',
      'Consider joining a support group and connecting with Parkinson\'s disease specialists.',
      'Monitor symptoms closely and maintain regular communication with your doctor.',
      'Explore clinical trials and research opportunities for early-stage interventions.'
    ]
  }
}

function generateMockBiomarkers(riskScore: number) {
  return [
    { name: 'Jitter', value: (0.005 + riskScore * 0.0001).toFixed(4), percentage: Math.min(100, riskScore * 1.2) },
    { name: 'Shimmer', value: (0.03 + riskScore * 0.0005).toFixed(3), percentage: Math.min(100, riskScore * 1.1) },
    { name: 'HNR', value: (25 - riskScore * 0.15).toFixed(2), percentage: Math.max(0, 100 - riskScore) },
    { name: 'RPDE', value: (0.5 + riskScore * 0.003).toFixed(3), percentage: Math.min(100, riskScore * 0.9) },
    { name: 'DFA', value: (0.7 - riskScore * 0.002).toFixed(3), percentage: Math.max(0, 100 - riskScore * 0.8) },
    { name: 'Spread1', value: (-5 - riskScore * 0.05).toFixed(2), percentage: Math.min(100, riskScore * 1.3) }
  ]
}
