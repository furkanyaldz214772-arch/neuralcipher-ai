'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminTestsPage() {
  const [stats, setStats] = useState<any>(null)
  const [tests, setTests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState({ status: '', risk_level: '' })

  useEffect(() => {
    loadData()
  }, [filter])

  const loadData = async () => {
    try {
      setLoading(true)
      const [statsData, testsData] = await Promise.all([
        adminAPI.getTestStats(),
        adminAPI.listTests({ limit: 20, ...filter })
      ])
      setStats(statsData)
      setTests(testsData)
    } catch (error) {
      console.error('Failed to load tests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (testId: number) => {
    if (!confirm('Are you sure you want to delete this test?')) return
    try {
      await adminAPI.deleteTest(testId)
      loadData()
    } catch (error) {
      console.error('Failed to delete test:', error)
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Tests Management</h1>
          <p className="text-slate-400 mt-1">View and manage all tests</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Tests</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.total_tests || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🧪</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Today</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.today_tests || 0}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Pending</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.pending_tests || 0}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Completed</p>
              <p className="text-2xl font-bold text-white mt-1">{stats?.completed_tests || 0}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <span className="text-2xl">✅</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-4">
        <div className="flex gap-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={filter.risk_level}
            onChange={(e) => setFilter({ ...filter, risk_level: e.target.value })}
            className="px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
          >
            <option value="">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>
      </div>

      {/* Tests Table */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Confidence</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-white">{test.patient_name}</p>
                      <p className="text-xs text-slate-400">{test.patient_email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      test.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {test.risk_level ? (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        test.risk_level === 'low' ? 'bg-green-500/20 text-green-400' :
                        test.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {test.risk_level}
                      </span>
                    ) : (
                      <span className="text-slate-500">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {test.confidence ? `${(test.confidence * 100).toFixed(1)}%` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {new Date(test.created_at).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDelete(test.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      Delete
                    </button>
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
