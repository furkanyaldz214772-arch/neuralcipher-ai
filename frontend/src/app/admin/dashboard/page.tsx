'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

export default function AdminDashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeSubscriptions: 0,
    testsThisMonth: 0,
    monthlyRevenue: 0,
    userGrowth: [] as any[],
    recentActivity: [] as any[]
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }
    
    if (user && user.role !== 'admin') {
      if (user.role === 'doctor') {
        router.replace('/doctor/dashboard')
      } else {
        router.replace('/dashboard')
      }
      return
    }
    
    if (user?.role === 'admin') {
      fetchAdminStats()
    }
  }, [user, isAuthenticated, router])

  const fetchAdminStats = async () => {
    try {
      const response = await api.get('/api/v1/admin/stats')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch admin stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400 font-roboto">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            change="+12%"
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )}
          />
          <StatCard
            title="Active Subscriptions"
            value={stats.activeSubscriptions}
            change="+8%"
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            )}
          />
          <StatCard
            title="Tests This Month"
            value={stats.testsThisMonth}
            change="+15%"
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )}
          />
          <StatCard
            title="Monthly Revenue"
            value={`$${stats.monthlyRevenue.toLocaleString()}`}
            change="+20%"
            icon={(
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6 mb-6" style={{ backdropFilter: 'blur(10px)' }}>
          <h3 className="text-lg font-medium text-white mb-4 font-sora">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <button
              onClick={() => router.push('/admin/users')}
              className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-medium text-white font-roboto">User Management</span>
            </button>
            <button
              onClick={() => router.push('/admin/subscriptions')}
              className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <span className="font-medium text-white font-roboto">Subscriptions</span>
            </button>
            <button
              onClick={() => router.push('/admin/analytics')}
              className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="font-medium text-white font-roboto">Analytics</span>
            </button>
            <button
              onClick={() => router.push('/admin/settings')}
              className="flex flex-col items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-medium text-white font-roboto">System Settings</span>
            </button>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
            <h3 className="text-lg font-medium text-white mb-4 font-sora">User Growth</h3>
            <UserGrowthChart data={stats.userGrowth} />
          </div>

          <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
            <h3 className="text-lg font-medium text-white mb-4 font-sora">Revenue Trend</h3>
            <RevenueChart data={stats.userGrowth} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/40 rounded-lg border border-slate-800" style={{ backdropFilter: 'blur(10px)' }}>
          <div className="p-6 border-b border-slate-800">
            <h3 className="text-lg font-medium text-white font-sora">Recent Activity</h3>
          </div>
          <div className="divide-y divide-slate-800">
            {stats.recentActivity.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="font-roboto">No recent activity</p>
              </div>
            ) : (
              stats.recentActivity.map((activity: any, index: number) => (
                <div key={index} className="p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center">
                      <span className="text-cyan-400 font-bold">{activity.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white font-roboto">{activity.title}</div>
                      <div className="text-sm text-gray-400 font-roboto">{activity.description}</div>
                    </div>
                    <div className="text-sm text-gray-500 font-roboto">{activity.time}</div>
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

function StatCard({ title, value, change, icon }: any) {
  return (
    <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-5" style={{ backdropFilter: 'blur(10px)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-400">
          {icon}
        </div>
        <span className="text-sm font-medium text-cyan-400 font-roboto">{change}</span>
      </div>
      <div className="text-2xl font-bold text-white mb-1 font-sora">{value}</div>
      <div className="text-sm text-gray-400 font-roboto">{title}</div>
    </div>
  )
}

function UserGrowthChart({ data }: any) {
  return (
    <div className="h-64 flex items-center justify-center text-gray-500 border border-slate-700 rounded-lg bg-slate-800/20">
      <div className="text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        <p className="font-roboto">User growth chart</p>
        <p className="text-xs text-gray-600 mt-1">(Chart.js integration)</p>
      </div>
    </div>
  )
}

function RevenueChart({ data }: any) {
  return (
    <div className="h-64 flex items-center justify-center text-gray-500 border border-slate-700 rounded-lg bg-slate-800/20">
      <div className="text-center">
        <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-roboto">Revenue trend chart</p>
        <p className="text-xs text-gray-600 mt-1">(Chart.js integration)</p>
      </div>
    </div>
  )
}
