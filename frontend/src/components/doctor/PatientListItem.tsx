'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserX, Calendar, Key, Mail, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Patient {
  id: string
  name: string
  profile_photo_url: string | null
  access_granted_at: string
  granted_via: 'KEY' | 'INVITATION'
}

interface PatientListItemProps {
  patient: Patient
  onRemove: (patientId: string) => Promise<void>
}

export default function PatientListItem({
  patient,
  onRemove
}: PatientListItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Handle remove click
  const handleRemoveClick = () => {
    setShowConfirmDialog(true)
  }

  // Handle confirm remove
  const handleConfirmRemove = async () => {
    try {
      setIsRemoving(true)
      await onRemove(patient.id)
      setShowConfirmDialog(false)
    } catch (error) {
      console.error('Failed to remove patient:', error)
    } finally {
      setIsRemoving(false)
    }
  }

  // Handle cancel
  const handleCancelRemove = () => {
    setShowConfirmDialog(false)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
      >
        <div className="flex items-center gap-4">
          {/* Patient Photo */}
          <Link href={`/doctor/patients/${patient.id}`} className="flex-shrink-0">
            <div className="relative w-16 h-16 rounded-full overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#0EA5E9] transition-all">
              {patient.profile_photo_url ? (
                <Image
                  src={patient.profile_photo_url}
                  alt={patient.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold text-lg">
                  {getInitials(patient.name)}
                </div>
              )}
            </div>
          </Link>

          {/* Patient Info */}
          <div className="flex-1 min-w-0">
            <Link href={`/doctor/patients/${patient.id}`}>
              <h4 className="text-white font-semibold text-lg truncate hover:text-[#0EA5E9] transition-colors cursor-pointer">
                {patient.name}
              </h4>
            </Link>
            
            <div className="flex flex-wrap items-center gap-3 mt-1">
              {/* Access Method Badge */}
              <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                patient.granted_via === 'KEY'
                  ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]'
                  : 'bg-purple-500/10 text-purple-400'
              }`}>
                {patient.granted_via === 'KEY' ? (
                  <>
                    <Key className="h-3 w-3" />
                    Access Key
                  </>
                ) : (
                  <>
                    <Mail className="h-3 w-3" />
                    Invitation
                  </>
                )}
              </div>

              {/* Access Date */}
              <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                <Calendar className="h-3.5 w-3.5" />
                <span>{formatDate(patient.access_granted_at)}</span>
              </div>
            </div>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemoveClick}
            disabled={isRemoving}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50 flex-shrink-0"
          >
            <UserX className="h-4 w-4" />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {showConfirmDialog && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelRemove}
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
                <div className="p-3 bg-red-500/10 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Remove Patient?</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Are you sure you want to remove <strong className="text-white">{patient.name}</strong> from your patient list? 
                You will no longer have access to their medical records.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelRemove}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRemove}
                  disabled={isRemoving}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {isRemoving ? 'Removing...' : 'Remove Patient'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
