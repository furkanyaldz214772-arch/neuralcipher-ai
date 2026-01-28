'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Users, Search, Loader2 } from 'lucide-react'
import { doctorPatientAPI } from '@/lib/api'
import AddPatientModal from '@/components/doctor/AddPatientModal'
import PatientListItem from '@/components/doctor/PatientListItem'

interface Patient {
  id: string
  name: string
  profile_photo_url: string | null
  access_granted_at: string
  granted_via: 'KEY' | 'INVITATION'
}

export default function DoctorPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  // Fetch patients on mount
  useEffect(() => {
    fetchPatients()
  }, [page])

  const fetchPatients = async () => {
    try {
      setIsLoading(true)
      const data = await doctorPatientAPI.getMyPatients(page, 20)
      setPatients(data.patients || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle add patient
  const handleAddPatient = async (accessKey: string) => {
    try {
      await doctorPatientAPI.addPatientByKey(accessKey)
      
      // Refresh patient list
      await fetchPatients()
    } catch (error) {
      console.error('Failed to add patient:', error)
      throw error
    }
  }

  // Handle remove patient
  const handleRemovePatient = async (patientId: string) => {
    try {
      await doctorPatientAPI.removePatient(patientId)
      
      // Refresh patient list
      await fetchPatients()
    } catch (error) {
      console.error('Failed to remove patient:', error)
      throw error
    }
  }

  // Filter patients by search query
  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Patients</h1>
            <p className="text-gray-400">
              Manage your patient list and access their medical records
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
          >
            <UserPlus className="h-5 w-5" />
            Add Patient by Key
          </motion.button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients by name..."
              className="w-full bg-[#1E293B] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0EA5E9]/10 rounded-lg">
                <Users className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Patients</p>
                <p className="text-2xl font-bold text-white">{total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient List */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-[#0EA5E9] animate-spin" />
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-12 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-gray-700/50 rounded-full">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {searchQuery ? 'No patients found' : 'No patients yet'}
                </h3>
                <p className="text-gray-400 mb-6">
                  {searchQuery
                    ? 'Try adjusting your search query'
                    : 'Add patients using their access keys to get started'}
                </p>
                {!searchQuery && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                  >
                    <UserPlus className="h-5 w-5" />
                    Add Your First Patient
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredPatients.map((patient) => (
              <PatientListItem
                key={patient.id}
                patient={patient}
                onRemove={handleRemovePatient}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {total > 20 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-gray-400">
              Page {page} of {Math.ceil(total / 20)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / 20)}
              className="px-4 py-2 bg-[#1E293B] border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddPatient}
      />
    </div>
  )
}
