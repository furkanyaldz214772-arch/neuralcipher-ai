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

interface AddPatientForm {
  email: string
  first_name: string
  last_name: string
  phone: string
  date_of_birth: string
  gender: string
  password: string
}

export default function DoctorPatientsPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [addLoading, setAddLoading] = useState(false)
  const [formData, setFormData] = useState<AddPatientForm>({
    email: '',
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: '',
    password: ''
  })

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

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault()
    setAddLoading(true)
    
    try {
      await api.post('/api/v1/doctor/patients', formData)
      setShowAddModal(false)
      setFormData({
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        password: ''
      })
      fetchPatients() // Refresh list
      alert('Patient added successfully!')
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to add patient')
    } finally {
      setAddLoading(false)
    }
  }

  const handleDeletePatient = async (patientId: number) => {
    if (!confirm('Are you sure you want to remove this patient from your list?')) {
      return
    }
    
    try {
      await api.delete(`/api/v1/doctor/patients/${patientId}`)
      fetchPatients() // Refresh list
      alert('Patient removed successfully!')
    } catch (error: any) {
      alert(error.response?.data?.detail || 'Failed to remove patient')
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
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-sora font-bold text-white mb-2">My Patients</h1>
            <p className="text-sm text-gray-400 font-roboto">Manage and monitor your patients</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 rounded-lg font-medium font-sora transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #64FFDA 0%, #00BFA5 100%)',
              color: '#0F172A'
            }}
          >
            + Add Patient
          </button>
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
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                            className="px-4 py-2 rounded-lg text-sm font-medium font-sora transition-all duration-200 hover:scale-105"
                            style={{
                              background: 'rgba(100, 255, 218, 0.15)',
                              border: '1px solid rgba(100, 255, 218, 0.4)',
                              color: '#64FFDA'
                            }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeletePatient(patient.id)}
                            className="px-4 py-2 rounded-lg text-sm font-medium font-sora transition-all duration-200 hover:scale-105"
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#EF4444'
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Patient Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                background: 'rgba(15, 23, 42, 0.95)',
                border: '1px solid rgba(100, 255, 218, 0.2)'
              }}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-sora font-bold text-white">Add New Patient</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleAddPatient} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">First Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                        style={{
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px solid rgba(100, 255, 218, 0.2)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Last Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.last_name}
                        onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                        style={{
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px solid rgba(100, 255, 218, 0.2)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                      style={{
                        background: 'rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(100, 255, 218, 0.2)'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Password *</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                      style={{
                        background: 'rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(100, 255, 218, 0.2)'
                      }}
                      placeholder="Minimum 8 characters"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                        style={{
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px solid rgba(100, 255, 218, 0.2)'
                        }}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.date_of_birth}
                        onChange={(e) => setFormData({...formData, date_of_birth: e.target.value})}
                        className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                        style={{
                          background: 'rgba(15, 23, 42, 0.4)',
                          border: '1px solid rgba(100, 255, 218, 0.2)'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none font-roboto"
                      style={{
                        background: 'rgba(15, 23, 42, 0.4)',
                        border: '1px solid rgba(100, 255, 218, 0.2)'
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="flex-1 px-6 py-3 rounded-lg font-medium font-sora transition-all duration-200"
                      style={{
                        background: 'rgba(100, 255, 218, 0.1)',
                        border: '1px solid rgba(100, 255, 218, 0.3)',
                        color: '#64FFDA'
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={addLoading}
                      className="flex-1 px-6 py-3 rounded-lg font-medium font-sora transition-all duration-200 hover:scale-105 disabled:opacity-50"
                      style={{
                        background: 'linear-gradient(135deg, #64FFDA 0%, #00BFA5 100%)',
                        color: '#0F172A'
                      }}
                    >
                      {addLoading ? 'Adding...' : 'Add Patient'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
