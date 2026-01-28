'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UserX, AlertTriangle, Users, Calendar } from 'lucide-react'
import Image from 'next/image'

interface Doctor {
  id: string
  name: string
  profile_photo_url: string | null
  access_granted_at: string
}

interface DoctorAccessListProps {
  doctors: Doctor[]
  onRevoke: (doctorId: string) => Promise<void>
  isLoading?: boolean
}

export default function DoctorAccessList({
  doctors,
  onRevoke,
  isLoading = false
}: DoctorAccessListProps) {
  const [revokingId, setRevokingId] = useState<string | null>(null)
  const [confirmDialogId, setConfirmDialogId] = useState<string | null>(null)

  // Handle revoke click
  const handleRevokeClick = (doctorId: string) => {
    setConfirmDialogId(doctorId)
  }

  // Handle confirm revoke
  const handleConfirmRevoke = async () => {
    if (!confirmDialogId) return

    try {
      setRevokingId(confirmDialogId)
      await onRevoke(confirmDialogId)
      setConfirmDialogId(null)
    } catch (error) {
      console.error('Failed to revoke access:', error)
    } finally {
      setRevokingId(null)
    }
  }

  // Handle cancel
  const handleCancelRevoke = () => {
    setConfirmDialogId(null)
  }

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

  // Empty state
  if (!isLoading && doctors.length === 0) {
    return (
      <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gray-700/50 rounded-full">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">No Doctors Have Access</h3>
            <p className="text-gray-400 text-sm">
              Share your access key with doctors to grant them access to your medical records.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Doctor List */}
      <div className="space-y-3">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center gap-4">
              {/* Doctor Photo */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                {doctor.profile_photo_url ? (
                  <Image
                    src={doctor.profile_photo_url}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold">
                    {getInitials(doctor.name)}
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium truncate">{doctor.name}</h4>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Access granted {formatDate(doctor.access_granted_at)}</span>
                </div>
              </div>

              {/* Revoke Button */}
              <button
                onClick={() => handleRevokeClick(doctor.id)}
                disabled={revokingId === doctor.id}
                className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
              >
                <UserX className="h-4 w-4" />
                <span className="hidden sm:inline">Revoke</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <AnimatePresence>
        {confirmDialogId && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancelRevoke}
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
                <h3 className="text-xl font-bold text-white">Revoke Access?</h3>
              </div>

              <p className="text-gray-300 mb-6">
                Are you sure you want to revoke this doctor's access to your medical records? 
                They will no longer be able to view your test results and health information.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleCancelRevoke}
                  className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmRevoke}
                  disabled={revokingId !== null}
                  className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors disabled:opacity-50"
                >
                  {revokingId ? 'Revoking...' : 'Revoke Access'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
