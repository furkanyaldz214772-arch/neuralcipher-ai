'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, RefreshCw, Check, AlertTriangle, Key } from 'lucide-react'

interface AccessKeyDisplayProps {
  accessKey: string
  onCopy: () => void
  onRegenerate: () => Promise<void>
  isRegenerating: boolean
}

export default function AccessKeyDisplay({
  accessKey,
  onCopy,
  onRegenerate,
  isRegenerating
}: AccessKeyDisplayProps) {
  const [showCopied, setShowCopied] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Handle copy
  const handleCopy = () => {
    onCopy()
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 2000)
  }

  // Handle regenerate
  const handleRegenerateClick = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmRegenerate = async () => {
    setShowConfirmDialog(false)
    await onRegenerate()
  }

  const handleCancelRegenerate = () => {
    setShowConfirmDialog(false)
  }

  return (
    <div className="space-y-4">
      {/* Access Key Display */}
      <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-[#0EA5E9]/10 rounded-lg">
            <Key className="h-5 w-5 text-[#0EA5E9]" />
          </div>
          <div>
            <h3 className="text-white font-semibold">Your Access Key</h3>
            <p className="text-gray-400 text-sm">Share this key with your doctors</p>
          </div>
        </div>

        {/* Key Display */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 bg-[#1E293B] border border-gray-700 rounded-lg px-4 py-3">
            <p className="text-2xl font-mono font-bold text-[#0EA5E9] tracking-wider text-center">
              {accessKey}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg transition-colors font-medium"
            title="Copy access key to clipboard"
          >
            {showCopied ? (
              <>
                <Check className="h-5 w-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5" />
                Copy Key
              </>
            )}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRegenerateClick}
            disabled={isRegenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 rounded-lg transition-colors font-medium disabled:opacity-50"
            title="Generate a new access key (will revoke all existing doctor access)"
          >
            {isRegenerating ? (
              <>
                <RefreshCw className="h-5 w-5 animate-spin" />
                Regenerating...
              </>
            ) : (
              <>
                <RefreshCw className="h-5 w-5" />
                Regenerate
              </>
            )}
          </motion.button>
        </div>

        {/* Warning */}
        <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <p className="text-orange-400 text-sm">
            Regenerating your access key will revoke access for all doctors who currently have access to your records.
          </p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelRegenerate}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-[#1E293B] border border-gray-700 rounded-2xl p-6 shadow-2xl z-50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Regenerate Access Key?</h3>
              </div>

              <p className="text-gray-300 mb-6">
                This will generate a new access key and <strong className="text-orange-400">revoke access for all doctors</strong> who currently have access to your medical records. They will need the new key to regain access.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelRegenerate}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRegenerate}
                  className="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium transition-colors"
                >
                  Regenerate Key
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
