'use client'

import { useState, useEffect } from 'react'

/**
 * Admin Dashboard - Main Page
 * Shows statistics, charts, and recent activities
 * Updated: 28 Ocak 2026
 */

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    totalTests: 3892,
    totalRevenue: 45678,
    activeUsers: 342,
    pendingActions: 23,
    hospitals: 45,
    doctors: 189,
    systemAlerts: 5,
  })

  const [recentUsers, setRecentUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Patient', date: '2026-01-28' },
    { id: 2, name: 'Dr. Smith', email: 'smith@hospital.com', role: 'Doctor', date: '2026-01-28' },
    { id: 3, name: 'City Hospital', email: 'info@cityhospital.com', role: 'Hospital', date: '2026-01-27' },
  ])

  const [recentTests, setRecentTests] = useState([
    { id: 1, patient: 'John Doe', result: 'Low Risk', date: '2026-01-28 14:30' },
    { id: 2, patient: 'Jane Smith', result: 'Medium Risk', date: '2026-01-28 13:15' },
    { id: 3, patient: 'Bob Johnson', result: 'High Risk', date: '2026-01-28 11:45' },
  ])

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-600 mt-1">Welcome back, Admin! Here's what's happening today.</p>
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
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">User Growth (Last 30 Days)</h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[40, 55, 45, 60, 70, 65, 80, 75, 90, 85, 95, 100].map((height, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg" style={{ height: `${height}%` }}></div>
            ))}
          </div>
        </div>

        {/* Role Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">User Distribution by Role</h3>
          <div className="space-y-4">
            <RoleBar label="Patients" percentage={65} color="purple" count={810} />
            <RoleBar label="Doctors" percentage={15} color="blue" count={189} />
            <RoleBar label="Hospitals" percentage={4} color="green" count={45} />
            <RoleBar label="Authorized" percentage={16} color="pink" count={203} />
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Users</h3>
            <a href="/admin-panel/users" className="text-sm text-purple-600 hover:text-purple-700">View All →</a>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">{user.name[0]}</span>
                  </div>
                  <div>
                    <p className="font-medium text-slate-800">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {user.role}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{user.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tests */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Recent Tests</h3>
            <a href="/admin-panel/tests" className="text-sm text-purple-600 hover:text-purple-700">View All →</a>
          </div>
          <div className="space-y-3">
            {recentTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <p className="font-medium text-slate-800">{test.patient}</p>
                  <p className="text-sm text-slate-500">{test.date}</p>
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
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center text-2xl`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : change.startsWith('-') ? 'text-red-600' : 'text-slate-600'}`}>
          {change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
      <p className="text-sm text-slate-600 mt-1">{title}</p>
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
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm text-slate-600">{count} ({percentage}%)</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
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
