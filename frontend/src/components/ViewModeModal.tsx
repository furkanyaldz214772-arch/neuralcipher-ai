'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, Microscope, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ViewModeModalProps {
  isOpen: boolean
  onClose: () => void
  testId: number
}

export default function ViewModeModal({ isOpen, onClose, testId }: ViewModeModalProps) {
  const router = useRouter()

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
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700 rounded-2xl p-8 max-w-4xl w-full relative shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>

              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Choose View Mode</h2>
                <p className="text-gray-400">Select how you want to view your test results</p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Simple View */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    router.push(`/patient/tests/${testId}/simple`)
                    onClose()
                  }}
                  className="group relative bg-gradient-to-br from-[#0EA5E9]/20 to-[#06B6D4]/10 border-2 border-[#0EA5E9]/30 hover:border-[#0EA5E9] rounded-xl p-8 text-left transition-all"
                >
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-[#0EA5E9]/20 rounded-lg group-hover:bg-[#0EA5E9]/30 transition-colors">
                      <FileText className="h-6 w-6 text-[#0EA5E9]" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    📊 Simple View
                  </h3>
                  
                  <p className="text-gray-300 mb-6">Quick summary with essential information</p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full"></div>
                      Risk Score & Level
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full"></div>
                      Main Biomarkers (4-5)
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full"></div>
                      Basic Information
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full"></div>
                      Quick Overview
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">⚡ Fast & Easy</span>
                    <ArrowRight className="h-5 w-5 text-[#0EA5E9] group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                {/* Detailed View */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    router.push(`/patient/tests/${testId}`)
                    onClose()
                  }}
                  className="group relative bg-gradient-to-br from-purple-500/20 to-pink-500/10 border-2 border-purple-500/30 hover:border-purple-500 rounded-xl p-8 text-left transition-all"
                >
                  <div className="absolute top-4 right-4">
                    <div className="p-2 bg-purple-500/20 rounded-lg group-hover:bg-purple-500/30 transition-colors">
                      <Microscope className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2">
                    🔬 Detailed View
                  </h3>
                  
                  <p className="text-gray-300 mb-6">Comprehensive analysis with all features</p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      All Biomarkers (59 features)
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      Charts & Visualizations
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      QR Code Verification
                    </li>
                    <li className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      PDF Export & Sharing
                    </li>
                  </ul>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">🎯 Professional Report</span>
                    <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              </div>

              {/* Footer Note */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  💡 Tip: You can always switch between views later
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
