'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface Report {
  id: string
  patient_id: string
  patient_name: string
  template_id: string | null
  title: string
  content: string
  status: 'draft' | 'final' | 'sent'
  created_at: string
  updated_at: string
}

interface Patient {
  id: string
  name: string
  email: string
}

export default function ReportsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [reports, setReports] = useState<Report[]>([])
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNewModal, setShowNewModal] = useState(false)
  const [filter, setFilter] = useState<'all' | 'draft' | 'final' | 'sent'>('all')
  const [newReport, setNewReport] = useState({
    patient_id: '',
    title: '',
    content: '',
    template_id: null as string | null
  })
  const [saving, setSaving] = useState(false)

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }
    
    if (user && user.role !== 'doctor') {
      router.replace('/dashboard')
      return
    }
  }, [user, isAuthenticated, router])

  // Fetch data
  useEffect(() => {
    if (isAuthenticated && user?.role === 'doctor') {
      fetchReports()
      fetchPatients()
    }
  }, [isAuthenticated, user])

  const fetchReports = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('/api/v1/doctor/reports')
      setReports(response.data.reports || [])
    } catch (err: any) {
      console.error('Error fetching reports:', err)
      setError(err.response?.data?.detail || 'Failed to load reports')
    } finally {
      setLoading(false)
    }
  }

  const fetchPatients = async () => {
    try {
      const response = await api.get('/api/v1/doctor/patients')
      setPatients(response.data.patients || [])
    } catch (err: any) {
      console.error('Error fetching patients:', err)
    }
  }

  const handleCreateReport = async () => {
    if (!newReport.patient_id || !newReport.title || !newReport.content) {
      setError('Please fill in all required fields')
      return
    }

    try {
      setSaving(true)
      setError('')
      await api.post('/api/v1/doctor/reports', newReport)
      setNewReport({ patient_id: '', title: '', content: '', template_id: null })
      setShowNewModal(false)
      fetchReports()
    } catch (err: any) {
      console.error('Error creating report:', err)
      setError(err.response?.data?.detail || 'Failed to create report')
    } finally {
      setSaving(false)
    }
  }

  const handleDownloadPDF = async (reportId: string) => {
    try {
      const response = await api.get(`/api/v1/doctor/reports/${reportId}/pdf`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `report-${reportId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (err: any) {
      console.error('Error downloading PDF:', err)
      setError('Failed to download PDF')
    }
  }

  const handleSendEmail = async (reportId: string) => {
    try {
      await api.post(`/api/v1/doctor/reports/${reportId}/send`)
      alert('Report sent successfully!')
      fetchReports()
    } catch (err: any) {
      console.error('Error sending report:', err)
      setError('Failed to send report')
    }
  }

  const filteredReports = reports.filter(report => {
    if (filter === 'all') return true
    return report.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'text-yellow-400 bg-yellow-400/10'
      case 'final': return 'text-green-400 bg-green-400/10'
      case 'sent': return 'text-cyan-400 bg-cyan-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft': return '📝'
      case 'final': return '✅'
      case 'sent': return '📧'
      default: return '📄'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Medical Reports</h1>
          <p className="text-gray-400">Create and manage patient reports</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          {/* Filter */}
          <div className="flex gap-2">
            {(['all', 'draft', 'final', 'sent'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg capitalize transition-all ${
                  filter === f
                    ? 'bg-cyan-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* New Report Button */}
          <button
            onClick={() => setShowNewModal(true)}
            className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
          >
            ➕ New Report
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Total Reports</div>
            <div className="text-3xl font-bold text-white">{reports.length}</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Drafts</div>
            <div className="text-3xl font-bold text-yellow-400">
              {reports.filter(r => r.status === 'draft').length}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Final</div>
            <div className="text-3xl font-bold text-green-400">
              {reports.filter(r => r.status === 'final').length}
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <div className="text-gray-400 text-sm mb-2">Sent</div>
            <div className="text-3xl font-bold text-cyan-400">
              {reports.filter(r => r.status === 'sent').length}
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          {filteredReports.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-white mb-2">No reports found</h3>
              <p className="text-gray-400 mb-6">
                {filter === 'all' 
                  ? 'Create your first report to get started'
                  : `No ${filter} reports`
                }
              </p>
              <button
                onClick={() => setShowNewModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
              >
                ➕ Create Report
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="p-6 hover:bg-white/5 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">{report.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(report.status)}`}>
                          {getStatusIcon(report.status)} {report.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">👤 {report.patient_name}</p>
                      <p className="text-sm text-gray-400 line-clamp-2">{report.content}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mt-3">
                        <span>📅 {new Date(report.created_at).toLocaleDateString()}</span>
                        {report.updated_at !== report.created_at && (
                          <span>✏️ Updated {new Date(report.updated_at).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleDownloadPDF(report.id)}
                        className="px-3 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm"
                      >
                        📥 PDF
                      </button>
                      {report.status === 'final' && (
                        <button
                          onClick={() => handleSendEmail(report.id)}
                          className="px-3 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-all text-sm"
                        >
                          📧 Send
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* New Report Modal */}
        {showNewModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#1E293B] border border-white/10 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-white mb-6">Create New Report</h3>
              
              {/* Patient Selection */}
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Patient *</label>
                <select
                  value={newReport.patient_id}
                  onChange={(e) => setNewReport({ ...newReport, patient_id: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="">Select a patient</option>
                  {patients.map((patient) => (
                    <option key={patient.id} value={patient.id}>
                      {patient.name} ({patient.email})
                    </option>
                  ))}
                </select>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm text-gray-400 mb-2">Report Title *</label>
                <input
                  type="text"
                  value={newReport.title}
                  onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
                  placeholder="e.g., Parkinson's Assessment Report"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Content */}
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">Report Content *</label>
                <textarea
                  value={newReport.content}
                  onChange={(e) => setNewReport({ ...newReport, content: e.target.value })}
                  placeholder="Enter the report content..."
                  rows={10}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleCreateReport}
                  disabled={saving}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50"
                >
                  {saving ? 'Creating...' : '💾 Create Report'}
                </button>
                <button
                  onClick={() => {
                    setShowNewModal(false)
                    setNewReport({ patient_id: '', title: '', content: '', template_id: null })
                  }}
                  className="px-4 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
