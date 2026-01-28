'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Activity, 
  TrendingUp, 
  AlertTriangle,
  Calendar,
  FileText,
  MessageSquare,
  UserPlus,
  Loader2
} from 'lucide-react'
import { useRouter } from 'next/navigation'

interface DoctorStats {
  total_patients: number
  high_risk_patients: number
  tests_this_month: number
  avg_risk_score: number
}

interface Patient {
  id: string
  name: string
  email: string
  last_test_date: string | null
  test_count: number
  risk_score: number | null
  status: 'low' | 'medium' | 'high'
}

export default function DoctorDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState<DoctorStats>({
    total_patients: 0,
    high_risk_patients: 0,
    tests_this_month: 0,
    avg_risk_score: 0
  })
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<'risk' | 'date' | 'name'>('risk')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      
      // Fetch real stats from API
      const statsResponse = await fetch('/api/v1/doctor/dashboard/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      // Fetch recent patients
      const patientsResponse = await fetch('/api/v1/doctor/patients?page=1&page_size=5', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      if (patientsResponse.ok) {
        const patientsData = await patientsResponse.json()
        const formattedPatients = patientsData.map((p: any) => ({
          id: p.id.toString(),
          name: `${p.first_name || ''} ${p.last_name || ''}`.trim() || p.email,
          email: p.email,
          last_test_date: p.last_test_date,
          test_count: p.total_tests || 0,
          risk_score: p.last_risk_score,
          status: p.last_risk_score >= 70 ? 'high' : p.last_risk_score >= 40 ? 'medium' : 'low'
        }))
        setPatients(formattedPatients)
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sortedPatients = [...patients].sort((a, b) => {
    if (sortBy === 'risk') {
      return (b.risk_score || 0) - (a.risk_score || 0)
    } else if (sortBy === 'date') {
      return new Date(b.last_test_date || 0).getTime() - new Date(a.last_test_date || 0).getTime()
    } else {
      return a.name.localeCompare(b.name)
    }
  })

  const getRiskColor = (status: string) => {
    switch (status) {
      case 'high': return 'text-red-400 bg-red-500/10'
      case 'medium': return 'text-yellow-400 bg-yellow-500/10'
      case 'low': return 'text-green-400 bg-green-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-[#0EA5E9] animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Doctor Dashboard</h1>
          <p className="text-gray-400">Welcome back, Dr. Sarah Johnson</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Patients */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">+12%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Patients</h3>
            <p className="text-3xl font-bold text-white">{stats.total_patients}</p>
          </motion.div>

          {/* High Risk */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/10 rounded-xl">
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
              <span className="text-red-400 text-sm font-semibold">+8%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">High Risk</h3>
            <p className="text-3xl font-bold text-white">{stats.high_risk_patients}</p>
          </motion.div>

          {/* Tests This Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-xl">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">+15%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Tests This Month</h3>
            <p className="text-3xl font-bold text-white">{stats.tests_this_month}</p>
          </motion.div>

          {/* Avg Risk Score */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
              <span className="text-green-400 text-sm font-semibold">-5%</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Avg Risk Score</h3>
            <p className="text-3xl font-bold text-white">{stats.avg_risk_score}%</p>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/doctor/patients')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white p-4 rounded-xl flex items-center gap-3 shadow-lg shadow-[#0EA5E9]/20"
            >
              <UserPlus className="h-6 w-6" />
              <span className="font-semibold">Add Patient</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1E293B] border border-gray-700 text-white p-4 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <Activity className="h-6 w-6 text-purple-400" />
              <span className="font-semibold">Analytics</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1E293B] border border-gray-700 text-white p-4 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <FileText className="h-6 w-6 text-green-400" />
              <span className="font-semibold">Reports</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#1E293B] border border-gray-700 text-white p-4 rounded-xl flex items-center gap-3 hover:bg-gray-700 transition-colors"
            >
              <MessageSquare className="h-6 w-6 text-blue-400" />
              <span className="font-semibold">Messages</span>
            </motion.button>
          </div>
        </div>

        {/* Patient List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Recent Patients</h2>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#1E293B] border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-[#0EA5E9]"
              >
                <option value="risk">Risk Score</option>
                <option value="date">Last Test</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          <div className="space-y-3">
            {sortedPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/doctor/patients/${patient.id}`)}
                className="bg-[#1E293B] border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-full flex items-center justify-center text-white font-bold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{patient.name}</h3>
                      <p className="text-gray-400 text-sm">{patient.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Last Test</p>
                      <p className="text-white text-sm">
                        {patient.last_test_date 
                          ? new Date(patient.last_test_date).toLocaleDateString()
                          : 'No tests yet'}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-400 text-sm">Tests</p>
                      <p className="text-white text-sm font-semibold">{patient.test_count}</p>
                    </div>

                    <div className={`px-4 py-2 rounded-lg ${getRiskColor(patient.status)}`}>
                      <p className="text-sm font-semibold">
                        {patient.risk_score !== null ? `${patient.risk_score}%` : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/doctor/patients')}
            className="w-full mt-4 bg-[#1E293B] border border-gray-700 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            View All Patients
          </motion.button>
        </div>
      </div>
    </div>
  )
}
