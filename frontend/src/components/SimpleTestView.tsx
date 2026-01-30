'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, Clock, TrendingUp, Activity, AlertCircle, CheckCircle, ArrowRight, Download } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface SimpleTestViewProps {
  isOpen: boolean
  onClose: () => void
  test: {
    id: number
    date: string
    time: string
    riskScore: number
    status: 'Low' | 'Moderate' | 'High'
    biomarkers?: {
      jitter: number
      shimmer: number
      hnr: number
    }
  }
}

export default function SimpleTestView({ isOpen, onClose, test }: SimpleTestViewProps) {
  const router = useRouter()

  const getRiskColor = (score: number) => {
    if (score < 30) return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-500' }
    if (score < 60) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', gradient: 'from-amber-500 to-orange-500' }
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', gradient: 'from-red-500 to-rose-500' }
  }

  const colors = getRiskColor(test.riskScore)

  const getRecommendation = (score: number) => {
    if (score < 30) return "Your voice analysis shows healthy patterns. Continue regular monitoring."
    if (score < 60) return "Some indicators suggest monitoring. Consider consulting with a healthcare professional."
    return "Several indicators warrant attention. We recommend consulting with a healthcare professional soon."
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-2xl p-8 max-w-2xl w-full relative shadow-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors z-10"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#0EA5E9]/20 rounded-full mb-4">
                  <Activity className="h-8 w-8 text-[#0EA5E9]" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Test Results Summary</h2>
                <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {test.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {test.time}
                  </span>
                </div>
              </div>

              {/* Risk Score Card */}
              <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 mb-6`}>
                <div className="text-center">
                  <p className="text-sm text-gray-400 mb-2">Risk Assessment</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.6 }}
                      className={`text-6xl font-bold ${colors.text}`}
                    >
                      {test.riskScore}%
                    </motion.div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 mb-4">
                    {test.status === 'Low' ? (
                      <CheckCircle className={`h-5 w-5 ${colors.text}`} />
                    ) : (
                      <AlertCircle className={`h-5 w-5 ${colors.text}`} />
                    )}
                    <span className={`text-xl font-semibold ${colors.text}`}>{test.status} Risk</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${test.riskScore}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                    />
                  </div>
                </div>
              </div>

              {/* Main Biomarkers */}
              {test.biomarkers && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#0EA5E9]" />
                    Key Biomarkers
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 mb-1">Jitter</p>
                      <p className="text-lg font-bold text-white">{(test.biomarkers.jitter * 100).toFixed(3)}%</p>
                      <p className="text-xs text-gray-500 mt-1">Voice Stability</p>
                    </div>
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 mb-1">Shimmer</p>
                      <p className="text-lg font-bold text-white">{(test.biomarkers.shimmer * 100).toFixed(3)}%</p>
                      <p className="text-xs text-gray-500 mt-1">Amplitude Variation</p>
                    </div>
                    <div className="bg-[#0F172A] border border-gray-700 rounded-lg p-4 text-center">
                      <p className="text-xs text-gray-400 mb-1">HNR</p>
                      <p className="text-lg font-bold text-white">{test.biomarkers.hnr.toFixed(2)} dB</p>
                      <p className="text-xs text-gray-500 mt-1">Noise Ratio</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Recommendation */}
              <div className="bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-300 leading-relaxed">
                  💡 <span className="font-semibold">Recommendation:</span> {getRecommendation(test.riskScore)}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    router.push(`/patient/tests/${test.id}`)
                    onClose()
                  }}
                  className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#0EA5E9]/30 transition-all"
                >
                  View Full Report
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // PDF download logic
                    alert('PDF download feature coming soon!')
                  }}
                  className="bg-[#1E293B] border border-gray-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-[#0EA5E9] transition-all"
                >
                  <Download className="h-5 w-5" />
                  Download PDF
                </motion.button>
              </div>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  This is a simplified view. For detailed analysis with all biomarkers, charts, and QR code, view the full report.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
