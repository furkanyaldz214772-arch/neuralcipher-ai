'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Key, Check, AlertCircle, Loader2 } from 'lucide-react'

interface AddPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (accessKey: string) => Promise<void>
}

export default function AddPatientModal({
  isOpen,
  onClose,
  onSubmit
}: AddPatientModalProps) {
  const [accessKey, setAccessKey] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setAccessKey('')
      setError(null)
      setSuccess(false)
    }
  }, [isOpen])

  // Validate access key format (XXXX-XXXX-XXXX)
  const validateKeyFormat = (key: string): boolean => {
    const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/
    return pattern.test(key)
  }

  // Format input as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    
    // Add dashes automatically
    if (value.length > 4) {
      value = value.slice(0, 4) + '-' + value.slice(4)
    }
    if (value.length > 9) {
      value = value.slice(0, 9) + '-' + value.slice(9)
    }
    if (value.length > 14) {
      value = value.slice(0, 14)
    }
    
    setAccessKey(value)
    setError(null)
  }

  // Handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate format
    if (!validateKeyFormat(accessKey)) {
      setError('Invalid key format. Expected format: XXXX-XXXX-XXXX')
      return
    }

    try {
      setIsSubmitting(true)
      setError(null)
      
      await onSubmit(accessKey)
      
      // Show success
      setSuccess(true)
      
      // Close modal after delay
      setTimeout(() => {
        onClose()
      }, 1500)
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to add patient. Please check the access key.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const isValidFormat = validateKeyFormat(accessKey)

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-md bg-[#1E293B] border border-gray-700 rounded-2xl p-6 shadow-2xl"
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-[#0EA5E9]/10 rounded-full">
                  <Key className="h-6 w-6 text-[#0EA5E9]" />
                </div>
                <h3 className="text-xl font-bold text-white">Add Patient by Key</h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="h-5 w-5 text-gray-400" />
              </button>
            </div>

            {/* Success State */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
                  <Check className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Patient Added!</h4>
                <p className="text-gray-400 text-sm">
                  You now have access to this patient's medical records.
                </p>
              </motion.div>
            ) : (
              <>
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-400 text-sm mb-2">
                      Patient Access Key
                    </label>
                    <input
                      type="text"
                      value={accessKey}
                      onChange={handleInputChange}
                      placeholder="XXXX-XXXX-XXXX"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white text-center text-lg font-mono tracking-wider focus:outline-none focus:border-[#0EA5E9] transition-colors"
                      autoFocus
                    />
                    
                    {/* Format hint */}
                    {accessKey && !isValidFormat && (
                      <p className="text-orange-400 text-xs mt-2 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        Format: XXXX-XXXX-XXXX (12 characters)
                      </p>
                    )}
                    
                    {accessKey && isValidFormat && (
                      <p className="text-green-400 text-xs mt-2 flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        Valid format
                      </p>
                    )}
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-3 bg-[#0EA5E9]/10 border border-[#0EA5E9]/30 rounded-lg">
                    <p className="text-[#0EA5E9] text-sm">
                      Enter the 12-character access key provided by the patient to gain access to their medical records.
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!isValidFormat || isSubmitting}
                      className="flex-1 px-4 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          Adding...
                        </>
                      ) : (
                        'Add Patient'
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </AnimatePresence>
    )
  }
