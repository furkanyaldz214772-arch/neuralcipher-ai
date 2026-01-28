'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { 
  Building2, Users, UserCheck, Activity, TrendingUp, 
  AlertCircle, Calendar, FileText, BarChart3, Clock,
  Stethoscope, Bed, TestTube, Heart
} from 'lucide-react'

interface Stats {
  totalDoctors: number
  totalPatients: number
  totalTests: number
  activeDepartments: number
  todayAppointments: number
  pendingReports: number
  averageRiskScore: number
  highRiskPatients: number
}

export default function HospitalDashboard() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [stats, setStats] = useState<Stats>({
    totalDoctors: 0,
    totalPatients: 0,
    totalTests: 0,
    activeDepartments: 0,
    todayAppointments: 0,
    pendingReports: 0,
    averageRiskScore: 0,
    highRiskPatients: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    // ✅ FIX: Backend returns role in UPPERCASE, normalize for comparison
    if (user && user.role?.toUpperCase() !== 'HOSPITAL') {
      console.warn('⚠️ HOSPITAL DASHBOARD - User role mismatch:', { 
        userRole: user.role, 
        expected: 'HOSPITAL' 
      })
      // Redirect to appropriate dashboard based on actual role
      const roleUpper = user.role?.toUpperCase()
      if (roleUpper === 'PATIENT') {
        router.replace('/patient/dashboard')
      } else if (roleUpper === 'DOCTOR') {
        router.replace('/doctor/dashboard')
      } else if (roleUpper === 'ADMIN') {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/auth/login')
      }
      return
    }

    fetchStats()
  }, [user, isAuthenticated, router])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hospital/stats`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      } else {
        // Demo data for now
        setStats({
          totalDoctors: 24,
          totalPatients: 156,
          totalTests: 342,
          activeDepartments: 8,
          todayAppointments: 18,
          pendingReports: 12,
          averageRiskScore: 42.5,
          highRiskPatients: 23
        })
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
      // Demo data
      setStats({
        totalDoctors: 24,
        totalPatients: 156,
        totalTests: 342,
        activeDepartments: 8,
        todayAppointments: 18,
        pendingReports: 12,
        averageRiskScore: 42.5,
        highRiskPatients: 23
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold text-white">Hospital Dashboard</h1>
          </div>
          <p className="text-gray-400">Welcome back, {user?.email}</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Doctors */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Stethoscope className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-xs text-blue-400 font-medium">+12% this month</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Doctors</h3>
            <p className="text-3xl font-bold text-white">{stats.totalDoctors}</p>
          </div>

          {/* Total Patients */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-lg rounded-xl p-6 border border-green-500/20 hover:border-green-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-xs text-green-400 font-medium">+8% this month</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Patients</h3>
            <p className="text-3xl font-bold text-white">{stats.totalPatients}</p>
          </div>

          {/* Total Tests */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <TestTube className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-purple-400 font-medium">+24% this month</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">Total Tests</h3>
            <p className="text-3xl font-bold text-white">{stats.totalTests}</p>
          </div>

          {/* High Risk Patients */}
          <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 backdrop-blur-lg rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <span className="text-xs text-red-400 font-medium">Needs attention</span>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">High Risk Patients</h3>
            <p className="text-3xl font-bold text-white">{stats.highRiskPatients}</p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Bed className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-400 text-sm">Departments</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.activeDepartments}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-blue-400" />
              <span className="text-gray-400 text-sm">Today's Appointments</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.todayAppointments}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">Pending Reports</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.pendingReports}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-pink-400" />
              <span className="text-gray-400 text-sm">Avg Risk Score</span>
            </div>
            <p className="text-2xl font-bold text-white">{stats.averageRiskScore}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => router.push('/hospital/doctors')}
              className="p-4 bg-gradient-to-r from-blue-500/20 to-blue-600/10 rounded-lg border border-blue-500/30 hover:border-blue-500/50 transition-all text-left group"
            >
              <Stethoscope className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Manage Doctors</h3>
              <p className="text-gray-400 text-sm">Add, view, and manage doctors</p>
            </button>

            <button
              onClick={() => router.push('/hospital/patients')}
              className="p-4 bg-gradient-to-r from-green-500/20 to-green-600/10 rounded-lg border border-green-500/30 hover:border-green-500/50 transition-all text-left group"
            >
              <Users className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">View Patients</h3>
              <p className="text-gray-400 text-sm">Access patient records</p>
            </button>

            <button
              onClick={() => router.push('/hospital/analytics')}
              className="p-4 bg-gradient-to-r from-purple-500/20 to-purple-600/10 rounded-lg border border-purple-500/30 hover:border-purple-500/50 transition-all text-left group"
            >
              <BarChart3 className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="text-white font-semibold mb-1">Analytics</h3>
              <p className="text-gray-400 text-sm">View detailed analytics</p>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              { icon: UserCheck, text: 'Dr. Sarah Johnson joined Neurology department', time: '2 hours ago', color: 'text-blue-400' },
              { icon: TestTube, text: '15 new test results available', time: '3 hours ago', color: 'text-purple-400' },
              { icon: AlertCircle, text: '3 high-risk patients require attention', time: '5 hours ago', color: 'text-red-400' },
              { icon: FileText, text: '8 reports pending review', time: '6 hours ago', color: 'text-yellow-400' },
              { icon: TrendingUp, text: 'Patient satisfaction increased by 12%', time: '1 day ago', color: 'text-green-400' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.text}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
