'use client'

import { useState, useEffect } from 'react'
import { adminApi, isAdminAuthenticated } from '@/lib/admin-api'
import { useRouter } from 'next/navigation'

/**
 * Admin Dashboard - Main Page
 * Shows real statistics from API
 * Updated: 30 Ocak 2026 - API Integration
 */

export default function AdminDashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTests: 0,
    totalRevenue: 0,
    activeUsers: 0,
    pendingActions: 0,
    hospitals: 0,
    doctors: 0,
    systemAlerts: 0,
  })

  const [recentUsers, setRecentUsers] = useState<any[]>([])
  const [recentTests, setRecentTests] = useState<any[]>([])
  const [userGrowthData, setUserGrowthData] = useState<number[]>([])
  const [roleDistribution, setRoleDistribution] = useState<any[]>([])

  useEffect(() => {
    // Check authentication
    if (!isAdminAuthenticated()) {
      router.push('/admin-panel')
      return
    }

    // Load dashboard data
    loadDashboardData()
    
    // Auto refresh every 30 seconds
    const interval = setInterval(loadDashboardData, 30000)
    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Load stats
      const statsData = await adminApi.getDashboardStats()
      setStats({
        totalUsers: statsData.total_users,
        totalTests: statsData.total_tests,
        totalRevenue: statsData.revenue_monthly,
        activeUsers: statsData.active_users,
        pendingActions: 0, // TODO: Implement
        hospitals: statsData.hospitals,
        doctors: statsData.doctors,
        systemAlerts: statsData.system_alerts,
      })

      // Load recent activity
      const activities = await adminApi.getRecentActivity(5)
      setRecentUsers(activities.map(a => ({
        id: a.user_email,
        name: a.user_name,
        email: a.user_email,
        role: a.user_role,
        date: new Date(a.timestamp).toLocaleDateString()
      })))

      // Load user growth chart data
      const growthData = await adminApi.getUserGrowthChart(30)
      if (growthData && growthData.datasets && growthData.datasets[0]) {
        setUserGrowthData(growthData.datasets[0].data)
      }

      // Load role distribution
      const roleData = await adminApi.getRoleDistributionChart()
      if (roleData && roleData.labels && roleData.datasets && roleData.datasets[0]) {
        const distribution = roleData.labels.map((label: string, index: number) => ({
          label,
          count: roleData.datasets[0].data[index],
          percentage: 0 // Will calculate below
        }))
        
        // Calculate percentages
        const total = distribution.reduce((sum: number, item: any) => sum + item.count, 0)
        distribution.forEach((item: any) => {
          item.percentage = total > 0 ? Math.round((item.count / total) * 100) : 0
        })
        
        setRoleDistribution(distribution)
      }

      // TODO: Load recent tests when tests API is ready
      setRecentTests([])
      
    } catch (error: any) {
      console.error('Failed to load dashboard data:', error)
      if (error.message.includes('401') || error.message.includes('403')) {
        router.push('/admin-panel')
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-purple-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1">Welcome back, Admin! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon="👥"
          color="purple"
          change="+12%"
        />
        <StatsCard
          title="Total Tests"
          value={stats.totalTests.toLocaleString()}
          icon="🧪"
          color="blue"
          change="+8%"
        />
        <StatsCard
          title="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="green"
          change="+23%"
        />
        <StatsCard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          icon="📈"
          color="pink"
          change="+5%"
        />
        <StatsCard
          title="Pending Actions"
          value={stats.pendingActions.toLocaleString()}
          icon="⚠️"
          color="yellow"
          change="-3%"
        />
        <StatsCard
          title="Hospitals"
          value={stats.hospitals.toLocaleString()}
          icon="🏥"
          color="indigo"
          change="+2"
        />
        <StatsCard
          title="Doctors"
          value={stats.doctors.toLocaleString()}
          icon="👨‍⚕️"
          color="cyan"
          change="+7"
        />
        <StatsCard
          title="System Alerts"
          value={stats.systemAlerts.toLocaleString()}
          icon="🔔"
          color="red"
          change="0"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth (Last 30 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {userGrowthData.length > 0 ? (
              userGrowthData.map((value, i) => {
                const maxValue = Math.max(...userGrowthData, 1)
                const height = (value / maxValue) * 100
                return (
                  <div 
                    key={i} 
                    className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all hover:opacity-80" 
                    style={{ height: `${height}%` }}
                    title={`${value} users`}
                  ></div>
                )
              })
            ) : (
              // Fallback demo data
              [40, 55, 45, 60, 70, 65, 80, 75, 90, 85, 95, 100].map((height, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-purple-500/50 to-pink-500/50 rounded-t-lg" style={{ height: `${height}%` }}></div>
              ))
            )}
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Distribution by Role</h3>
          <div className="space-y-4">
            {roleDistribution.length > 0 ? (
              roleDistribution.map((role, index) => {
                const colors = ['purple', 'blue', 'green', 'pink', 'indigo']
                return (
                  <RoleBar 
                    key={index}
                    label={role.label} 
                    percentage={role.percentage} 
                    color={colors[index % colors.length]} 
                    count={role.count} 
                  />
                )
              })
            ) : (
              // Fallback demo data
              <>
                <RoleBar label="Patients" percentage={65} color="purple" count={stats.totalUsers > 0 ? Math.round(stats.totalUsers * 0.65) : 0} />
                <RoleBar label="Doctors" percentage={15} color="blue" count={stats.doctors} />
                <RoleBar label="Hospitals" percentage={4} color="green" count={stats.hospitals} />
                <RoleBar label="Others" percentage={16} color="pink" count={stats.totalUsers > 0 ? stats.totalUsers - stats.doctors - stats.hospitals - Math.round(stats.totalUsers * 0.65) : 0} />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Users</h3>
            <a href="/admin-panel/users" className="text-sm text-purple-600 hover:text-purple-700">View All →</a>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{user.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {user.role}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tests */}
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Recent Tests</h3>
            <a href="/admin-panel/tests" className="text-sm text-purple-600 hover:text-purple-700">View All →</a>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <div>
                  <p className="font-medium text-white">{test.patient}</p>
                  <p className="text-sm text-slate-400">{test.date}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  test.result === 'Low Risk' ? 'bg-green-100 text-green-700' :
                  test.result === 'Medium Risk' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {test.result}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <QuickActionButton icon="👥" label="Add User" href="/admin-panel/users" />
          <QuickActionButton icon="🏥" label="Add Hospital" href="/admin-panel/hospitals" />
          <QuickActionButton icon="📧" label="Send Email" href="/admin-panel/emails" />
          <QuickActionButton icon="⚙️" label="Settings" href="/admin-panel/settings" />
        </div>
      </div>
    </div>
  )
}

// Stats Card Component
function StatsCard({ title, value, icon, color, change }: any) {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    pink: 'from-pink-500 to-pink-600',
    yellow: 'from-yellow-500 to-yellow-600',
    indigo: 'from-indigo-500 to-indigo-600',
    cyan: 'from-cyan-500 to-cyan-600',
    red: 'from-red-500 to-red-600',
  }

  return (
    <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-400' : change.startsWith('-') ? 'text-red-400' : 'text-slate-400'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white">{value}</h3>
      <p className="text-sm text-slate-400 mt-1">{title}</p>
    </div>
  )
}

// Role Bar Component
function RoleBar({ label, percentage, color, count }: any) {
  const colorClasses = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    pink: 'bg-pink-500',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-200">{label}</span>
        <span className="text-sm text-slate-400">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color as keyof typeof colorClasses]}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}

// Quick Action Button
function QuickActionButton({ icon, label, href }: any) {
  return (
    <a
      href={href}
      className="flex flex-col items-center justify-center p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-all backdrop-blur-sm border border-white/20"
    >
      <span className="text-3xl mb-2">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}
