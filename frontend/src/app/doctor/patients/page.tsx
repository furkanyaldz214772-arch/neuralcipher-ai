'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface Patient {
  id: number
  full_name: string
  email: string
  phone?: string
  date_of_birth?: string
  last_test_date?: string
  risk_score?: number
  test_count: number
}

export default function DoctorPatientsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (user?.role !== 'doctor') {
      router.push('/dashboard')
      return
    }
    fetchPatients()
  }, [user])

  const fetchPatients = async () => {
    try {
      const response = await api.get('/api/v1/doctor/patients')
      setPatients(response.data)
    } catch (error) {
      console.error('Failed to fetch patients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-gray-400'
    if (score < 30) return 'text-green-500'
    if (score < 70) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getRiskLabel = (score?: number) => {
    if (!score) return 'No Data'
    if (score < 30) return 'Low Risk'
    if (score < 70) return 'Medium Risk'
    return 'High Risk'
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">My Patients</h1>
          <p className="text-sm text-gray-400 font-roboto">Manage and monitor your patients</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search patients by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(100, 255, 218, 0.2)'
            }}
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(100, 255, 218, 0.1)'
            }}>
            <div className="text-gray-400 text-xs font-roboto mb-1">Total Patients</div>
            <div className="text-2xl font-bold text-white font-sora">{patients.length}</div>
          </div>
          <div className="rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(236, 72, 153, 0.3)'
            }}>
            <div className="text-gray-400 text-xs font-roboto mb-1">High Risk</div>
            <div className="text-2xl font-bold text-pink-400 font-sora">
              {patients.filter(p => p.risk_score && p.risk_score >= 70).length}
            </div>
          </div>
          <div className="rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
            <div className="text-gray-400 text-xs font-roboto mb-1">Medium Risk</div>
            <div className="text-2xl font-bold text-amber-400 font-sora">
              {patients.filter(p => p.risk_score && p.risk_score >= 30 && p.risk_score < 70).length}
            </div>
          </div>
          <div className="rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(132, 204, 22, 0.3)'
            }}>
            <div className="text-gray-400 text-xs font-roboto mb-1">Low Risk</div>
            <div className="text-2xl font-bold text-lime-400 font-sora">
              {patients.filter(p => p.risk_score && p.risk_score < 30).length}
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="rounded-xl overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead style={{ background: 'rgba(15, 23, 42, 0.4)' }}>
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Tests</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Last Test</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Risk Level</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 font-roboto">Actions</th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid rgba(100, 255, 218, 0.1)' }}>
                {filteredPatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400 font-roboto">
                      {searchTerm ? 'No patients found matching your search' : 'No patients yet'}
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient, index) => (
                    <tr key={patient.id} 
                      className="transition-colors hover:bg-white/5"
                      style={{ 
                        borderBottom: index < filteredPatients.length - 1 ? '1px solid rgba(100, 255, 218, 0.1)' : 'none'
                      }}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3"
                            style={{
                              background: 'rgba(100, 255, 218, 0.1)',
                              border: '1px solid rgba(100, 255, 218, 0.3)'
                            }}>
                            {patient.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-white font-medium font-sora">{patient.full_name}</div>
                            {patient.date_of_birth && (
                              <div className="text-gray-400 text-xs font-roboto">
                                DOB: {new Date(patient.date_of_birth).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300 text-sm font-roboto">{patient.email}</div>
                        {patient.phone && (
                          <div className="text-gray-400 text-xs font-roboto">{patient.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-white font-medium font-sora">{patient.test_count}</div>
                        <div className="text-gray-400 text-xs font-roboto">tests</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-300 text-sm font-roboto">
                          {patient.last_test_date
                            ? new Date(patient.last_test_date).toLocaleDateString()
                            : 'Never'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`font-semibold font-sora ${getRiskColor(patient.risk_score)}`}>
                          {patient.risk_score ? `${patient.risk_score}%` : 'N/A'}
                        </div>
                        <div className={`text-xs font-roboto ${getRiskColor(patient.risk_score)}`}>
                          {getRiskLabel(patient.risk_score)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                          className="px-4 py-2 rounded-lg text-sm font-medium font-sora transition-all duration-200 hover:scale-105"
                          style={{
                            background: 'rgba(100, 255, 218, 0.15)',
                            border: '1px solid rgba(100, 255, 218, 0.4)',
                            color: '#64FFDA'
                          }}
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
