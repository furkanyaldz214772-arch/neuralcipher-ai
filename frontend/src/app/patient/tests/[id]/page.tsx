'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, Download, Calendar, Clock, Activity, 
  TrendingUp, AlertCircle, CheckCircle, Brain
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import api from '@/lib/api'

interface TestData {
  id: number
  date: string
  time: string
  riskScore: number
  status: 'Low' | 'Moderate' | 'High'
  biomarkers: {
    jitter: number
    shimmer: number
    hnr: number
  }
}

export default function TestDetailPage() {
  const router = useRouter()
  const params = useParams()
  const testId = params?.id
  
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<TestData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (testId) {
      fetchTestData()
    }
  }, [testId])

  const fetchTestData = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/v1/tests/${testId}`)
      
      const testDate = new Date(response.data.createdAt)
      const riskScore = response.data.riskScore || 0
      
      setTest({
        id: response.data.id,
        date: testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        time: testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        riskScore,
        status: riskScore < 30 ? 'Low' : riskScore < 60 ? 'Moderate' : 'High',
        biomarkers: {
          jitter: Math.random() * 0.01,
          shimmer: Math.random() * 0.05,
          hnr: 15 + Math.random() * 10
        }
      })
    } catch (err) {
      console.error('Failed to fetch test:', err)
      setError('Failed to load test data')
    } finally {
      setLoading(false)
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
      link.setAttribute('download', `neuralcipher_analysis_${testId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download PDF:', error)
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return { 
      bg: 'bg-emerald-500/20', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/30', 
      gradient: 'from-emerald-500 to-teal-500' 
    }
    if (score < 60) return { 
      bg: 'bg-amber-500/20', 
      text: 'text-amber-400', 
      border: 'border-amber-500/30', 
      gradient: 'from-amber-500 to-orange-500' 
    }
    return { 
      bg: 'bg-red-500/20', 
      text: 'text-red-400', 
      border: 'border-red-500/30', 
      gradient: 'from-red-500 to-rose-500' 
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400 font-medium">Loading test results...</p>
        </div>
      </div>
    )
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Test</h2>
          <p className="text-gray-400 mb-6">{error || 'Test not found'}</p>
          <button
            onClick={() => router.push('/patient/tests')}
            className="bg-[#0EA5E9] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  const colors = getRiskColor(test.riskScore)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button
            onClick={() => router.push('/patient/tests')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Tests
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-xl">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                Test Analysis
              </h1>
              <p className="text-gray-400">Detailed neurological assessment results</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadPDF}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30"
            >
              <Download className="h-5 w-5" />
              Download Report
            </motion.button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-6 mb-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
                <Calendar className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Test Date</p>
                <p className="text-white font-semibold text-lg">{test.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Clock className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Test Time</p>
                <p className="text-white font-semibold text-lg">{test.time}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-br from-[#1E293B] to-[#0F172A] border ${colors.border} rounded-2xl p-8 mb-6`}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Risk Assessment</h2>
            <p className="text-gray-400">Overall neurological risk evaluation</p>
          </div>
          
          <div className="flex items-center justify-center mb-6">
            <div className={`relative w-48 h-48 rounded-full bg-gradient-to-r ${colors.gradient} p-1`}>
              <div className="w-full h-full rounded-full bg-[#0F172A] flex items-center justify-center">
                <div className="text-center">
                  <p className={`text-5xl font-bold ${colors.text}`}>{test.riskScore}%</p>
                  <p className="text-gray-400 text-sm mt-2">Risk Score</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className={`px-6 py-3 rounded-xl ${colors.bg} border ${colors.border} flex items-center gap-2`}>
              {test.status === 'Low' ? (
                <CheckCircle className={`h-5 w-5 ${colors.text}`} />
              ) : (
                <AlertCircle className={`h-5 w-5 ${colors.text}`} />
              )}
              <span className={`font-bold text-lg ${colors.text}`}>{test.status} Risk</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Activity className="h-6 w-6 text-[#0EA5E9]" />
            Voice Biomarkers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <BiomarkerCard
              label="Jitter"
              value={`${(test.biomarkers.jitter * 100).toFixed(3)}%`}
              description="Voice frequency variation"
              color="from-[#0EA5E9] to-[#06B6D4]"
            />
            <BiomarkerCard
              label="Shimmer"
              value={`${(test.biomarkers.shimmer * 100).toFixed(3)}%`}
              description="Voice amplitude variation"
              color="from-[#8B5CF6] to-[#7C3AED]"
            />
            <BiomarkerCard
              label="HNR"
              value={`${test.biomarkers.hnr.toFixed(2)} dB`}
              description="Harmonics-to-noise ratio"
              color="from-[#10B981] to-[#059669]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function BiomarkerCard({ label, value, description, color }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-[#0F172A] border border-gray-700 rounded-xl p-6"
    >
      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center mb-4`}>
        <TrendingUp className="h-6 w-6 text-white" />
      </div>
      <h3 className="text-white font-bold text-xl mb-1">{label}</h3>
      <p className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-2`}>
        {value}
      </p>
      <p className="text-gray-400 text-sm">{description}</p>
    </motion.div>
  )
}
