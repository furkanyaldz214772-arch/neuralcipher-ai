'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface Patient {
  id: string
  name: string
  email: string
  latest_test_date: string
  risk_score: number
  test_count: number
  status: 'active' | 'inactive'
}

export default function DoctorDashboardPage() {
  const router = useRouter()
  const { user } = useAuthStore()
  const [patients, setPatients] = useState<Patient[]>([])
  const [stats, setStats] = useState({
    totalPatients: 0,
    highRiskPatients: 0,
    testsThisMonth: 0,
    avgRiskScore: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'risk' | 'date' | 'name'>('risk')

  useEffect(() => {
    console.log('🏥 DOCTOR DASHBOARD - Component mounted')
    console.log('🏥 DOCTOR DASHBOARD - User:', { email: user?.email, role: user?.role })
    
    // Backend returns role in UPPERCASE, normalize to lowercase
    const userRole = user?.role?.toLowerCase()
    
    console.log('🏥 DOCTOR DASHBOARD - Normalized role:', userRole)
    
    if (!user) {
      console.log('🏥 DOCTOR DASHBOARD - No user, redirecting to login')
      router.push('/auth/login')
      return
    }
    
    if (userRole !== 'doctor') {
      console.log('🏥 DOCTOR DASHBOARD - Wrong role, redirecting to appropriate dashboard')
      if (userRole === 'admin') {
        router.push('/admin/dashboard')
      } else if (userRole === 'hospital') {
        router.push('/hospital/dashboard')
      } else {
        router.push('/dashboard')
      }
      return
    }
    
    console.log('🏥 DOCTOR DASHBOARD - Correct role, fetching data')
    fetchDashboardData()
  }, [user, router])

  const fetchDashboardData = async () => {
    try {
      const [patientsResponse, statsResponse] = await Promise.all([
        api.get('/api/v1/doctor/patients'),
        api.get('/api/v1/doctor/stats')
      ])
      
      setPatients(patientsResponse.data)
      setStats(statsResponse.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sortedPatients = [...patients].sort((a, b) => {
    if (sortBy === 'risk') return b.risk_score - a.risk_score
    if (sortBy === 'date') return new Date(b.latest_test_date).getTime() - new Date(a.latest_test_date).getTime()
    return a.name.localeCompare(b.name)
  })

  if (isLoading) {
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
        {/* Professional Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Doctor Dashboard</h1>
          <p className="text-sm text-gray-400 font-roboto">Monitor and manage your patients</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Patients"
            value={stats.totalPatients}
            color="rgba(100, 255, 218, 0.6)"
          />
          <StatCard
            title="High Risk"
            value={stats.highRiskPatients}
            color="rgba(236, 72, 153, 0.6)"
          />
          <StatCard
            title="Tests This Month"
            value={stats.testsThisMonth}
            color="rgba(132, 204, 22, 0.6)"
          />
          <StatCard
            title="Avg Risk Score"
            value={stats.avgRiskScore}
            color="rgba(139, 92, 246, 0.6)"
          />
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl p-6 mb-6 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-base font-sora font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button
              onClick={() => router.push('/doctor/patients')}
              className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="text-sm font-medium text-white font-roboto group-hover:text-electric-cyan transition-colors">My Patients</span>
            </button>
            <button
              onClick={() => router.push('/doctor/analytics')}
              className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span className="text-sm font-medium text-white font-roboto group-hover:text-electric-cyan transition-colors">Analytics</span>
            </button>
            <button
              onClick={() => router.push('/doctor/reports')}
              className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="text-sm font-medium text-white font-roboto group-hover:text-electric-cyan transition-colors">Reports</span>
            </button>
            <button
              onClick={() => router.push('/doctor/messages')}
              className="flex flex-col items-center p-4 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-sm font-medium text-white font-roboto group-hover:text-electric-cyan transition-colors">Messages</span>
            </button>
          </div>
        </div>

        {/* Patient List */}
        <div className="rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="p-6"
            style={{ borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-sora font-semibold text-white">My Patients</h3>
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(100, 255, 218, 0.2)'
                  }}
                >
                  <option value="risk">By Risk Score</option>
                  <option value="date">By Date</option>
                  <option value="name">By Name</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            {sortedPatients.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 font-roboto mb-4">No patients added yet</p>
                <button
                  onClick={() => router.push('/doctor/patients')}
                  className="px-6 py-2 text-sm rounded-lg font-sora font-medium transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(100, 255, 218, 0.15)',
                    border: '1px solid rgba(100, 255, 218, 0.4)',
                    color: '#64FFDA'
                  }}
                >
                  Go to Patients Page
                </button>
              </div>
            ) : (
              sortedPatients.map((patient, index) => (
                <div
                  key={patient.id}
                  className="p-5 cursor-not-allowed opacity-60 transition-all duration-200 group"
                  style={{ 
                    borderBottom: index < sortedPatients.length - 1 ? '1px solid rgba(100, 255, 218, 0.1)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(100, 255, 218, 0.1)',
                          border: '1px solid rgba(100, 255, 218, 0.3)'
                        }}
                      >
                        <span className="text-electric-cyan font-bold text-lg">
                          {patient.name.charAt(0)}
                        </span>
                      </div>

                      {/* Patient Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h4 className="font-semibold text-white font-sora group-hover:text-electric-cyan transition-colors">{patient.name}</h4>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            patient.status === 'active' 
                              ? 'text-green-400' 
                              : 'text-gray-400'
                          }`}
                            style={{
                              background: patient.status === 'active' 
                                ? 'rgba(132, 204, 22, 0.1)' 
                                : 'rgba(156, 163, 175, 0.1)',
                              border: patient.status === 'active'
                                ? '1px solid rgba(132, 204, 22, 0.3)'
                                : '1px solid rgba(156, 163, 175, 0.3)'
                            }}
                          >
                            {patient.status === 'active' ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 font-roboto">{patient.email}</p>
                        <div className="flex items-center space-x-3 mt-1 text-xs text-gray-500 font-roboto">
                          <span>Last Test: {formatDate(patient.latest_test_date)}</span>
                          <span>•</span>
                          <span>{patient.test_count} tests</span>
                        </div>
                      </div>
                    </div>

                    {/* Risk Score */}
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{
                          background: getRiskBgMinimal(patient.risk_score),
                          border: `1px solid ${getRiskColorMinimal(patient.risk_score)}`
                        }}
                      >
                        <span className="text-xl font-bold text-white font-sora">
                          {patient.risk_score}
                        </span>
                      </div>
                      <svg className="w-5 h-5 text-electric-cyan group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function StatCard({ title, value, color }: any) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{ 
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(100, 255, 218, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Subtle left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      ></div>

      <div className="relative z-10 pl-2">
        <p className="text-xs text-gray-500 font-roboto font-medium mb-1">
          {title}
        </p>
        <p className="text-xl font-sora font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  )
}

function getRiskColorMinimal(score: number) {
  if (score < 30) return 'rgba(132, 204, 22, 0.6)'
  if (score < 60) return 'rgba(245, 158, 11, 0.6)'
  return 'rgba(236, 72, 153, 0.6)'
}

function getRiskBgMinimal(score: number) {
  if (score < 30) return 'rgba(132, 204, 22, 0.1)'
  if (score < 60) return 'rgba(245, 158, 11, 0.1)'
  return 'rgba(236, 72, 153, 0.1)'
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}
