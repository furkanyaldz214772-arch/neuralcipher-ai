'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminReportsPage() {
  const [tests, setTests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await adminAPI.listTests({ limit: 50, status: 'completed' })
      setTests(data)
    } catch (error) {
      console.error('Failed to load reports:', error)
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
        <h1 className="text-3xl font-bold text-white">Reports</h1>
        <p className="text-slate-400 mt-1">View and export system reports</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">Completed Tests</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {tests.map((test) => (
                <tr key={test.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm text-white">{test.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{test.patient_name}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      test.risk_level === 'low' ? 'bg-green-500/20 text-green-400' :
                      test.risk_level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {test.risk_level || 'N/A'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {new Date(test.created_at).toLocaleString()}
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
