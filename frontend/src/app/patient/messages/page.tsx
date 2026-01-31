'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Clock, User, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface AssignedDoctor {
  id: number
  name: string
  email: string
  specialization: string | null
  hospital_clinic: string | null
  years_experience: number | null
}

export default function PatientMessagesPage() {
  const router = useRouter()
  const [assignedDoctor, setAssignedDoctor] = useState<AssignedDoctor | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchAssignedDoctor()
  }, [])

  const fetchAssignedDoctor = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('access_token')
      
      if (!token) {
        router.push('/auth/login')
        return
      }

      const response = await fetch('https://neuralcipher-production.up.railway.app/api/v1/patient/messages/assigned-doctor', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.status === 401) {
        router.push('/auth/login')
        return
      }

      if (response.status === 404) {
        setError('No doctor assigned yet. Please contact support.')
        setLoading(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch assigned doctor')
      }

      const data = await response.json()
      setAssignedDoctor(data)
      setError(null)
    } catch (err) {
      console.error('Error fetching assigned doctor:', err)
      setError('Failed to load doctor information')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-[#0EA5E9] animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
            <p className="text-gray-400">Communicate with your doctor</p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-12 text-center"
          >
            <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Doctor Assigned</h3>
            <p className="text-gray-400">{error}</p>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">Communicate with your assigned doctor</p>
        </div>

        {/* Doctor Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-bold text-white">Your Doctor</h2>
              </div>
              {assignedDoctor && (
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                  onClick={() => router.push(`/patient/messages/${assignedDoctor.id}`)}
                  className="w-full p-6 text-left transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-lg mb-1">{assignedDoctor.name}</h3>
                      {assignedDoctor.specialization && (
                        <p className="text-[#0EA5E9] text-sm mb-2">{assignedDoctor.specialization}</p>
                      )}
                      {assignedDoctor.hospital_clinic && (
                        <p className="text-gray-400 text-sm mb-2">{assignedDoctor.hospital_clinic}</p>
                      )}
                      {assignedDoctor.years_experience && (
                        <p className="text-gray-500 text-xs">{assignedDoctor.years_experience} years experience</p>
                      )}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="mt-4 px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-lg text-sm font-semibold text-center"
                      >
                        Send Message
                      </motion.div>
                    </div>
                  </div>
                </motion.button>
              )}
            </motion.div>
          </div>

          {/* Empty State */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-12 text-center h-full flex items-center justify-center"
            >
              <div>
                <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Start a conversation</h3>
                <p className="text-gray-400 mb-6">Click on your doctor to send a message</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => assignedDoctor && router.push(`/patient/messages/${assignedDoctor.id}`)}
                  className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-lg font-semibold inline-flex items-center gap-2"
                >
                  <Send className="h-5 w-5" />
                  New Message
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
