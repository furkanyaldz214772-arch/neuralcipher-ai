'use client'

import { useState } from 'react'
import { Search, User, Activity, Calendar, TrendingUp, AlertCircle } from 'lucide-react'
import api from '@/lib/api'

interface PatientData {
  id: number
  email: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  date_of_birth: string | null
  total_tests: number
  avg_risk_score: number | null
  last_test_date: string | null
  last_risk_score: number | null
  last_risk_level: string | null
  access_key: string
}

export default function PatientLookupPage() {
  const [accessKey, setAccessKey] = useState('')
  const [patientData, setPatientData] = useState<PatientData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!accessKey.trim()) {
      setError('Please enter an access key')
      return
    }

    setIsLoading(true)
    setError('')
    setPatientData(null)

    try {
      const response = await api.get(`/api/v1/doctor/patients/search-by-key?key=${accessKey.trim()}`)
      setPatientData(response.data)
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError('Patient not found with this access key')
      } else {
        setError('Failed to search patient. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (level: string | null) => {
    if (!level) return 'text-gray-400'
    switch (level.toLowerCase()) {
      case 'low': return 'text-green-500'
      case 'moderate': return 'text-yellow-500'
      case 'high': return 'text-red-500'
      default: return 'text-gray-400'
    }
  }

  const getRiskBg = (level: string | null) => {
    if (!level) return 'bg-gray-500/10'
    switch (level.toLowerCase()) {
      case 'low': return 'bg-green-500/10'
      case 'moderate': return 'bg-yellow-500/10'
      case 'high': return 'bg-red-500/10'
      default: return 'bg-gray-500/10'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 font-sora">Patient Lookup</h1>
          <p className="text-gray-400 font-roboto">Search for patient information using their access key</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2 font-sora">
              Patient Access Key
            </label>
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value.toUpperCase())}
                  placeholder="XXXX-XXXX-XXXX"
                  className="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 font-mono text-lg tracking-wider"
                  maxLength={14}
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-sora"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
            {error && (
              <div className="mt-3 flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
        </form>

        {/* Patient Data */}
        {patientData && (
          <div className="space-y-6">
            {/* Patient Info Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                    <User className="text-white" size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white font-sora">
                      {patientData.first_name && patientData.last_name
                        ? `${patientData.first_name} ${patientData.last_name}`
                        : 'Patient'}
                    </h2>
                    <p className="text-gray-400 text-sm font-roboto">{patientData.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Access Key</div>
                  <div className="font-mono text-cyan-400 font-bold">{patientData.access_key}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                {patientData.phone && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Phone</div>
                    <div className="text-white font-roboto">{patientData.phone}</div>
                  </div>
                )}
                {patientData.date_of_birth && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Date of Birth</div>
                    <div className="text-white font-roboto">{patientData.date_of_birth}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Total Tests */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Activity className="text-cyan-400" size={20} />
                  <span className="text-gray-400 text-sm font-sora">Total Tests</span>
                </div>
                <div className="text-3xl font-bold text-white font-sora">{patientData.total_tests}</div>
              </div>

              {/* Average Risk Score */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="text-cyan-400" size={20} />
                  <span className="text-gray-400 text-sm font-sora">Avg Risk Score</span>
                </div>
                <div className="text-3xl font-bold text-white font-sora">
                  {patientData.avg_risk_score ? `${(patientData.avg_risk_score * 100).toFixed(1)}%` : 'N/A'}
                </div>
              </div>

              {/* Last Test */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="text-cyan-400" size={20} />
                  <span className="text-gray-400 text-sm font-sora">Last Test</span>
                </div>
                <div className="text-sm text-white font-roboto">
                  {patientData.last_test_date
                    ? new Date(patientData.last_test_date).toLocaleDateString()
                    : 'No tests yet'}
                </div>
              </div>
            </div>

            {/* Last Test Result */}
            {patientData.last_risk_score !== null && (
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <h3 className="text-lg font-bold text-white mb-4 font-sora">Latest Test Result</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Risk Level</div>
                    <div className={`text-2xl font-bold ${getRiskColor(patientData.last_risk_level)} font-sora capitalize`}>
                      {patientData.last_risk_level || 'Unknown'}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-400 mb-1">Risk Score</div>
                    <div className="text-2xl font-bold text-white font-sora">
                      {(patientData.last_risk_score * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getRiskBg(patientData.last_risk_level)} transition-all`}
                    style={{ width: `${patientData.last_risk_score * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* View Full Details Button */}
            <div className="flex justify-center">
              <a
                href={`/doctor/patients/${patientData.id}`}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all font-sora"
              >
                View Full Patient Details
              </a>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!patientData && !error && !isLoading && (
          <div className="bg-slate-800/30 backdrop-blur-sm border border-cyan-500/10 rounded-lg p-12 text-center">
            <Search className="mx-auto text-gray-600 mb-4" size={48} />
            <h3 className="text-xl font-bold text-gray-400 mb-2 font-sora">No Patient Selected</h3>
            <p className="text-gray-500 font-roboto">Enter a patient's access key to view their information</p>
          </div>
        )}
      </div>
    </div>
  )
}
