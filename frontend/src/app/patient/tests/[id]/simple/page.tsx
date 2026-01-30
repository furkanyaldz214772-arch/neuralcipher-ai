'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, Clock, TrendingUp, Activity, AlertCircle, CheckCircle, ArrowRight, Download, ArrowLeft, Eye } from 'lucide-react'
import api from '@/lib/api'

interface Test {
  id: number
  created_at: string
  risk_score: number
  status: string
  biomarkers?: {
    jitter: number
    shimmer: number
    hnr: number
  }
}

export default function SimpleTestViewPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<Test | null>(null)

  useEffect(() => {
    fetchTest()
  }, [testId])

  const fetchTest = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/v1/patient/tests/${testId}`)
      setTest(response.data)
    } catch (error) {
      console.error('Failed to fetch test:', error)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-500' }
    if (score < 60) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', gradient: 'from-amber-500 to-orange-500' }
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', gradient: 'from-red-500 to-rose-500' }
  }

  const getRiskStatus = (score: number): 'Low' | 'Moderate' | 'High' => {
    if (score < 30) return 'Low'
    if (score < 60) return 'Moderate'
    return 'High'
  }

  const getRecommendation = (score: number) => {
    if (score < 30) return "Your voice analysis shows healthy patterns. Continue regular monitoring."
    if (score < 60) return "Some indicators suggest monitoring. Consider consulting with a healthcare professional."
    return "Several indicators warrant attention. We recommend consulting with a healthcare professional soon."
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

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Test Not Found</h2>
          <p className="text-gray-400 mb-6">The requested test could not be found.</p>
          <button
            onClick={() => router.push('/patient/tests')}
            className="bg-[#0EA5E9] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0EA5E9]/90 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    )
  }

  const testDate = new Date(test.created_at)
  const colors = getRiskColor(test.risk_score)
  const status = getRiskStatus(test.risk_score)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push('/patient/tests')}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0EA5E9]/20 rounded-full mb-4">
            <Activity className="h-8 w-8 text-[#0EA5E9]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Test Results Summary</h1>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </motion.div>

        {/* Risk Score Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`${colors.bg} border-2 ${colors.border} rounded-xl p-8 mb-6`}
        >
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Risk Assessment</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                className={`text-6xl font-bold ${colors.text}`}
              >
                {test.risk_score}%
              </motion.div>
            </div>
            
            <div className="flex items-center justify-center gap-2 mb-4">
              {status === 'Low' ? (
                <CheckCircle className={`h-5 w-5 ${colors.text}`} />
              ) : (
                <AlertCircle className={`h-5 w-5 ${colors.text}`} />
              )}
              <span className={`text-xl font-semibold ${colors.text}`}>{status} Risk</span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${test.risk_score}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
              />
            </div>
          </div>
        </motion.div>

        {/* Main Biomarkers */}
        {test.biomarkers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#0EA5E9]" />
              Key Biomarkers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 text-center hover:border-[#0EA5E9]/50 transition-colors">
                <p className="text-xs text-gray-400 mb-1">Jitter</p>
                <p className="text-2xl font-bold text-white mb-1">{(test.biomarkers.jitter * 100).toFixed(3)}%</p>
                <p className="text-xs text-gray-500">Voice Stability</p>
              </div>
              <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 text-center hover:border-[#0EA5E9]/50 transition-colors">
                <p className="text-xs text-gray-400 mb-1">Shimmer</p>
                <p className="text-2xl font-bold text-white mb-1">{(test.biomarkers.shimmer * 100).toFixed(3)}%</p>
                <p className="text-xs text-gray-500">Amplitude Variation</p>
              </div>
              <div className="bg-[#1E293B] border border-gray-700 rounded-lg p-6 text-center hover:border-[#0EA5E9]/50 transition-colors">
                <p className="text-xs text-gray-400 mb-1">HNR</p>
                <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.hnr.toFixed(2)} dB</p>
                <p className="text-xs text-gray-500">Noise Ratio</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-lg p-6 mb-6"
        >
          <p className="text-sm text-gray-300 leading-relaxed">
            💡 <span className="font-semibold">Recommendation:</span> {getRecommendation(test.risk_score)}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/patient/tests/${testId}`)}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#0EA5E9]/30 transition-all"
          >
            <Eye className="h-5 w-5" />
            View Full Report
            <ArrowRight className="h-5 w-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="bg-[#1E293B] border border-gray-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-[#0EA5E9] transition-all"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </motion.button>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-xs text-gray-500">
            This is a simplified view. For detailed analysis with all biomarkers, charts, and QR code, view the full report.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
