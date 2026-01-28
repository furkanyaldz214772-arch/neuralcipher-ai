'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Activity, FileText, MessageSquare, Calendar, 
  TrendingUp, AlertCircle, Clock, CheckCircle 
} from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

export default function PatientDashboard() {
  const { user } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalTests: 0,
    riskScore: 'Low',
    unreadMessages: 0,
    nextAppointment: 'No appointments'
  })
  const [recentTests, setRecentTests] = useState<any[]>([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      // Fetch dashboard data
      const dashboardRes = await api.get('/api/v1/patient/dashboard')
      const dashboardData = dashboardRes.data
      
      // Fetch messages count
      const messagesRes = await api.get('/api/v1/messages/conversations')
      const unreadCount = messagesRes.data.reduce((sum: number, conv: any) => sum + conv.unread_count, 0)
      
      // Update stats
      setStats({
        totalTests: dashboardData.stats.totalTests || 0,
        riskScore: dashboardData.stats.lastRiskLevel || 'Low',
        unreadMessages: unreadCount,
        nextAppointment: 'No appointments'
      })
      
      // Format recent tests
      const formattedTests = dashboardData.recentTests.map((test: any) => ({
        id: test.id,
        date: new Date(test.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        riskScore: test.riskScore || 0,
        status: test.riskLevel || 'Low'
      }))
      
      setRecentTests(formattedTests)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10 border border-[#0EA5E9]/20 rounded-2xl p-8 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                👋 Welcome back, {user?.firstName || user?.email?.split('@')[0] || 'Patient'}!
              </h1>
              <p className="text-gray-400">
                Total tests: {stats.totalTests} • Next appointment: {stats.nextAppointment}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/patient/tests/new')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
            >
              <Activity className="h-5 w-5" />
              New Test
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FileText}
            label="Total Tests"
            value={stats.totalTests}
            color="from-[#0EA5E9] to-[#06B6D4]"
          />
          <StatCard
            icon={TrendingUp}
            label="Risk Score"
            value={stats.riskScore}
            color="from-[#10B981] to-[#059669]"
          />
          <StatCard
            icon={MessageSquare}
            label="Doctor Messages"
            value={stats.unreadMessages}
            color="from-[#8B5CF6] to-[#7C3AED]"
          />
          <StatCard
            icon={Calendar}
            label="Appointment"
            value="Active"
            color="from-[#F59E0B] to-[#D97706]"
          />
        </div>

        {/* Recent Tests & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#0EA5E9]" />
                Recent Test Results
              </h2>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <motion.div
                    key={test.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#0EA5E9]/50 transition-all"
                    onClick={() => router.push(`/patient/tests/${test.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-semibold">{test.date}</p>
                        <p className="text-gray-400 text-sm">Risk Score: {test.riskScore}%</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          test.status === 'Low' 
                            ? 'bg-[#10B981]/20 text-[#10B981]' 
                            : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                        }`}>
                          {test.status}
                        </span>
                        <CheckCircle className="h-5 w-5 text-[#10B981]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <button
                onClick={() => router.push('/patient/tests')}
                className="w-full mt-4 text-[#0EA5E9] hover:text-[#06B6D4] font-semibold text-center py-2 transition-colors"
              >
                View All Tests →
              </button>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <QuickActionButton
                  icon={Activity}
                  label="New Test"
                  onClick={() => router.push('/patient/tests/new')}
                  color="from-[#0EA5E9] to-[#06B6D4]"
                />
                <QuickActionButton
                  icon={FileText}
                  label="View Reports"
                  onClick={() => router.push('/patient/tests')}
                  color="from-[#8B5CF6] to-[#7C3AED]"
                />
                <QuickActionButton
                  icon={MessageSquare}
                  label="Message Doctor"
                  onClick={() => router.push('/patient/messages')}
                  color="from-[#10B981] to-[#059669]"
                />
                <QuickActionButton
                  icon={Calendar}
                  label="Book Appointment"
                  onClick={() => router.push('/patient/appointments')}
                  color="from-[#F59E0B] to-[#D97706]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} bg-opacity-10 flex items-center justify-center mb-4`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <p className="text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  )
}

function QuickActionButton({ icon: Icon, label, onClick, color }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="w-full bg-[#0F172A] border border-gray-700 hover:border-[#0EA5E9]/50 rounded-xl p-4 flex items-center gap-3 transition-all"
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center`}>
        <Icon className="h-5 w-5 text-white" />
      </div>
      <span className="text-white font-semibold">{label}</span>
    </motion.button>
  )
}
