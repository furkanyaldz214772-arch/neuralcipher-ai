'use client'

import { motion } from 'framer-motion'
import { Download, Mail, FileText, TrendingUp, Activity, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // Mock test data
  const test = {
    id: params.id,
    date: 'Jan 24, 2026',
    time: '14:30',
    riskScore: 15,
    status: 'Low',
    analysis: {
      voiceTremor: 'Normal',
      speechRate: 'Normal',
      voiceTone: 'Stable',
      articulation: 'Good'
    },
    recommendations: [
      'Regular monitoring recommended',
      'Follow-up test in 2 weeks',
      'Maintain current medication schedule'
    ]
  }

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
          <p className="text-gray-400">{test.date} at {test.time}</p>
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
                test.status === 'Low' 
                  ? 'bg-[#10B981]/20 text-[#10B981]' 
                  : 'bg-[#F59E0B]/20 text-[#F59E0B]'
              }`}>
                {test.riskScore}% - {test.status}
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div
                className={`h-4 rounded-full ${
                  test.riskScore < 20 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                }`}
                style={{ width: `${test.riskScore}%` }}
              />
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Activity className="h-6 w-6 text-[#0EA5E9]" />
              Detailed Analysis
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(test.analysis).map(([key, value]) => (
                <div key={key} className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-[#10B981]" />
                    <p className="text-white font-semibold">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-[#0EA5E9]" />
              Recommendations
            </h2>
            <div className="space-y-3">
              {test.recommendations.map((rec, index) => (
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
