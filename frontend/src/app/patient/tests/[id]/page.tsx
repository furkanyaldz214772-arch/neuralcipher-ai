'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, FileText, TrendingUp, Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function TestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTestDetails()
  }, [params.id])

  const fetchTestDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/v1/tests/${params.id}/results`)
      setTest(response.data)
    } catch (err) {
      console.error('Failed to fetch test details:', err)
      setError('Failed to load test details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/api/v1/tests/${params.id}/pdf`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `neuralcipher_test_${params.id}.pdf`)
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
          <div className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading test details...</p>
        </div>
      </div>
    )
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <p className="text-gray-400">{error || 'Test not found'}</p>
          <button
            onClick={() => router.back()}
            className="mt-4 text-[#0EA5E9] hover:text-[#06B6D4]"
          >
            ← Go Back
          </button>
        </div>
      </div>
    )
  }

  const testDate = new Date(test.test_date)
  const formattedDate = testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const formattedTime = testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  // Extract biomarkers for display
  const biomarkersList = [
    { key: 'Fundamental Frequency', value: test.biomarkers?.fundamental_frequency?.mean_f0?.toFixed(2) || 'N/A', unit: 'Hz' },
    { key: 'Jitter', value: (test.biomarkers?.jitter?.local_jitter * 100)?.toFixed(3) || 'N/A', unit: '%' },
    { key: 'Shimmer', value: (test.biomarkers?.shimmer?.local_shimmer * 100)?.toFixed(3) || 'N/A', unit: '%' },
    { key: 'HNR', value: test.biomarkers?.hnr?.harmonics_to_noise?.toFixed(2) || 'N/A', unit: 'dB' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="text-[#0EA5E9] hover:text-[#06B6D4] mb-4 flex items-center gap-2"
          >
            ← Back to Tests
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Test Report</h1>
          <p className="text-gray-400">{formattedDate} at {formattedTime}</p>
        </motion.div>

        {/* Report Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8 mb-6"
        >
          {/* Risk Score */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-[#0EA5E9]" />
                Risk Score
              </h2>
              <span className={`px-4 py-2 rounded-full text-lg font-bold ${
                test.risk_category === 'normal' 
                  ? 'bg-[#10B981]/20 text-[#10B981]' 
                  : test.risk_category === 'warning'
                  ? 'bg-[#F59E0B]/20 text-[#F59E0B]'
                  : 'bg-[#EF4444]/20 text-[#EF4444]'
              }`}>
                {test.risk_score}% - {test.risk_category.replace('_', ' ').toUpperCase()}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  test.risk_score < 30 ? 'bg-[#10B981]' : test.risk_score < 60 ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
                }`}
                style={{ width: `${test.risk_score}%` }}
              />
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#0EA5E9]" />
              Voice Biomarkers
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {biomarkersList.map((biomarker) => (
                <div key={biomarker.key} className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">
                    {biomarker.key}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <p className="text-white font-semibold">{biomarker.value} {biomarker.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpretation */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="h-6 w-6 text-[#0EA5E9]" />
              Clinical Interpretation
            </h2>
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <p className="text-gray-300">{test.interpretation?.status}</p>
            </div>
          </div>

          {/* Findings */}
          {test.interpretation?.findings && test.interpretation.findings.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg font-bold text-white mb-3">Key Findings</h3>
              <div className="space-y-2">
                {test.interpretation.findings.map((finding: string, index: number) => (
                  <div key={index} className="flex items-start gap-2 text-gray-300">
                    <span className="text-[#0EA5E9]">•</span>
                    <span>{finding}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-[#0EA5E9]" />
              Recommendations
            </h2>
            <div className="space-y-3">
              {test.interpretation?.recommendations?.map((rec: string, index: number) => (
                <div key={index} className="flex items-start gap-3 bg-[#0F172A] border border-gray-700 rounded-xl p-4">
                  <div className="w-6 h-6 rounded-full bg-[#0EA5E9]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#0EA5E9] text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
          >
            <Download className="h-5 w-5" />
            Download PDF
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/patient/messages')}
            className="flex-1 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="h-5 w-5" />
            Send to Doctor
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
