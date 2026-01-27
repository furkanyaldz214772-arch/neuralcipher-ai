'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'
import RiskGauge from '@/components/dashboard/RiskGauge'
import TrendChart from '@/components/dashboard/TrendChart'
import RecentTests from '@/components/dashboard/RecentTests'
import QuickActions from '@/components/dashboard/QuickActions'
import AccessKeyCard from '@/components/dashboard/AccessKeyCard'

interface DashboardData {
  user: {
    email: string
    firstName?: string
    lastName?: string
    accessKey?: string
  }
  stats: {
    totalTests: number
    avgRiskScore: number | null
    lastTestDate: string | null
    lastRiskLevel: string | null
  }
  recentTests: Array<{
    id: string
    patient_id: string
    test_level: 'quick' | 'standard' | 'comprehensive' | 'clinical'
    test_date: string
    audio_file_url: string
    risk_score: number
    confidence: number
    status: 'completed' | 'processing' | 'failed'
    created_at: string
  }>
  trendData: Array<{
    date: string
    riskScore: number
  }>
}

export default function PatientDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Fetch dashboard data
      const response = await api.get('/api/v1/patient/dashboard')
      setData(response.data)
    } catch (err: any) {
      console.error('Failed to fetch dashboard data:', err)
      
      if (err.response?.status === 401) {
        // Unauthorized - redirect to login
        router.push('/auth/login')
      } else {
        setError(err.response?.data?.detail || 'Failed to load dashboard data')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-md">
          <h2 className="text-red-500 text-xl font-bold mb-2">Error</h2>
          <p className="text-white mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return null
  }

  const { user, stats, recentTests, trendData } = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.firstName || user.email}!
          </h1>
          <p className="text-gray-300">
            Track your Parkinson's risk assessment and health trends
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Tests */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Tests</h3>
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">{stats.totalTests}</p>
          </div>

          {/* Average Risk Score */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Avg Risk Score</h3>
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <p className="text-3xl font-bold text-white">
              {stats.avgRiskScore !== null ? stats.avgRiskScore.toFixed(1) : 'N/A'}
            </p>
          </div>

          {/* Last Test */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Last Test</h3>
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-lg font-semibold text-white">
              {stats.lastTestDate 
                ? new Date(stats.lastTestDate).toLocaleDateString()
                : 'No tests yet'}
            </p>
          </div>

          {/* Risk Level */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Risk Level</h3>
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className={`text-lg font-semibold ${
              stats.lastRiskLevel === 'LOW' ? 'text-green-400' :
              stats.lastRiskLevel === 'MODERATE' ? 'text-yellow-400' :
              stats.lastRiskLevel === 'HIGH' ? 'text-red-400' :
              'text-gray-400'
            }`}>
              {stats.lastRiskLevel || 'N/A'}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Risk Gauge */}
          <div className="lg:col-span-1">
            <RiskGauge test={recentTests[0] || null} />
          </div>

          {/* Trend Chart */}
          <div className="lg:col-span-2">
            <TrendChart data={trendData} />
          </div>
        </div>

        {/* Recent Tests & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <RecentTests tests={recentTests} />
          </div>

          {/* Quick Actions & Access Key */}
          <div className="space-y-6">
            <QuickActions />
            {user.accessKey && <AccessKeyCard accessKey={user.accessKey} />}
          </div>
        </div>
      </div>
    </div>
  )
}
