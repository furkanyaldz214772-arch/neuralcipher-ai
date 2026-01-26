'use client'

import { useState } from 'react'
import api from '@/lib/api'

// Icons as inline SVG
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const UserIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
)

const ActivityIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const AlertCircleIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

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
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <SearchIcon />
                </div>
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
                <AlertCircleIcon />
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
                    <UserIcon />
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
                  <ActivityIcon />
                  <span className="text-gray-400 text-sm font-sora">Total Tests</span>
                </div>
                <div className="text-3xl font-bold text-white font-sora">{patientData.total_tests}</div>
              </div>

              {/* Average Risk Score */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUpIcon />
                  <span className="text-gray-400 text-sm font-sora">Avg Risk Score</span>
                </div>
                <div className="text-3xl font-bold text-white font-sora">
                  {patientData.avg_risk_score ? `${(patientData.avg_risk_score * 100).toFixed(1)}%` : 'N/A'}
                </div>
              </div>

              {/* Last Test */}
              <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <CalendarIcon />
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
            <div className="mx-auto text-gray-600 mb-4 flex justify-center">
              <SearchIcon />
            </div>
            <h3 className="text-xl font-bold text-gray-400 mb-2 font-sora">No Patient Selected</h3>
            <p className="text-gray-500 font-roboto">Enter a patient's access key to view their information</p>
          </div>
        )}
      </div>
    </div>
  )
}
