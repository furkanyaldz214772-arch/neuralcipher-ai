'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminSecurityPage() {
  const [stats, setStats] = useState<any>(null)
  const [loginAttempts, setLoginAttempts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [statsData, attemptsData] = await Promise.all([
        adminAPI.getSecurityStats(),
        adminAPI.getLoginAttempts({ limit: 20 })
      ])
      setStats(statsData)
      setLoginAttempts(attemptsData)
    } catch (error) {
      console.error('Failed to load security data:', error)
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
        <h1 className="text-3xl font-bold text-white">Security & Monitoring</h1>
        <p className="text-slate-400 mt-1">Monitor system security and user activity</p>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Login Attempts</p>
          <p className="text-3xl font-bold text-white mt-2">{stats?.total_login_attempts || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Total today</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Failed Logins</p>
          <p className="text-3xl font-bold text-red-400 mt-2">{stats?.failed_login_attempts || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Failed attempts</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Active Sessions</p>
          <p className="text-3xl font-bold text-green-400 mt-2">{stats?.active_sessions || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Currently active</p>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Blocked IPs</p>
          <p className="text-3xl font-bold text-yellow-400 mt-2">{stats?.blocked_ips || 0}</p>
          <p className="text-sm text-slate-400 mt-2">Currently blocked</p>
        </div>
      </div>

      {/* Recent Login Attempts */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Recent Login Attempts</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {loginAttempts.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm text-white">{attempt.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{attempt.ip_address}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      attempt.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {attempt.success ? 'Success' : 'Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {new Date(attempt.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
