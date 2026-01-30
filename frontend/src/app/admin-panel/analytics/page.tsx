'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminAnalyticsPage() {
  const [overview, setOverview] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await adminAPI.getAnalyticsOverview()
      setOverview(data)
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Analytics & Insights</h1>
        <p className="text-slate-400 mt-1">Track user behavior and system performance</p>
      </div>

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Total Users</p>
          <p className="text-3xl font-bold text-white mt-2">{overview?.total_users || 0}</p>
          <p className={`text-sm mt-2 ${overview?.user_growth_rate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {overview?.user_growth_rate >= 0 ? '↑' : '↓'} {Math.abs(overview?.user_growth_rate || 0).toFixed(1)}% vs last month
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Total Tests</p>
          <p className="text-3xl font-bold text-white mt-2">{overview?.total_tests || 0}</p>
          <p className={`text-sm mt-2 ${overview?.test_growth_rate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {overview?.test_growth_rate >= 0 ? '↑' : '↓'} {Math.abs(overview?.test_growth_rate || 0).toFixed(1)}% vs last month
          </p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Active Today</p>
          <p className="text-3xl font-bold text-white mt-2">{overview?.active_users_today || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Users logged in today</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Tests Today</p>
          <p className="text-3xl font-bold text-white mt-2">{overview?.tests_today || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Tests completed today</p>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            Chart: User registrations over time
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Test Volume</h3>
          <div className="h-64 flex items-center justify-center text-slate-500">
            Chart: Tests completed over time
          </div>
        </div>
      </div>
    </div>
  )
}
