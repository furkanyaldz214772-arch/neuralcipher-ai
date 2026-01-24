'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface DatabaseStats {
  size: number
  tables: number
  records: number
  lastBackup: string | null
  backupSize: number
}

interface Backup {
  id: string
  filename: string
  size: number
  created: string
  status: 'completed' | 'in_progress' | 'failed'
}

export default function DatabaseManagementPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [stats, setStats] = useState<DatabaseStats | null>(null)
  const [backups, setBackups] = useState<Backup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isBackingUp, setIsBackingUp] = useState(false)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [showRestoreModal, setShowRestoreModal] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<Backup | null>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }
    
    if (user && user.role !== 'admin') {
      router.replace('/dashboard')
      return
    }
    
    if (user?.role === 'admin') {
      fetchStats()
      fetchBackups()
    }
  }, [user, isAuthenticated, router])

  const fetchStats = async () => {
    try {
      setError(null)
      const response = await api.get('/api/v1/admin/database/stats')
      setStats(response.data)
    } catch (error: any) {
      console.error('Failed to fetch database stats:', error)
      setError(error?.response?.data?.detail || 'Failed to load database stats')
    } finally {
      setIsLoading(false)
    }
  }

  const fetchBackups = async () => {
    try {
      const response = await api.get('/api/v1/admin/database/backups')
      const backupsData = response.data?.backups || []
      setBackups(Array.isArray(backupsData) ? backupsData : [])
    } catch (error: any) {
      console.error('Failed to fetch backups:', error)
    }
  }

  const createBackup = async () => {
    if (!confirm('Create a new database backup? This may take a few minutes.')) {
      return
    }

    setIsBackingUp(true)
    try {
      await api.post('/api/v1/admin/database/backup')
      alert('Backup created successfully!')
      fetchBackups()
      fetchStats()
    } catch (error: any) {
      console.error('Failed to create backup:', error)
      alert(error?.response?.data?.detail || 'Failed to create backup')
    } finally {
      setIsBackingUp(false)
    }
  }

  const restoreBackup = async () => {
    if (!selectedBackup) return

    if (!confirm(`Restore database from backup "${selectedBackup.filename}"? This will overwrite current data!`)) {
      return
    }

    try {
      await api.post(`/api/v1/admin/database/restore/${selectedBackup.id}`)
      alert('Database restored successfully!')
      setShowRestoreModal(false)
      fetchStats()
    } catch (error: any) {
      console.error('Failed to restore backup:', error)
      alert(error?.response?.data?.detail || 'Failed to restore backup')
    }
  }

  const deleteBackup = async (backupId: string) => {
    if (!confirm('Delete this backup? This action cannot be undone.')) {
      return
    }

    try {
      await api.delete(`/api/v1/admin/database/backups/${backupId}`)
      alert('Backup deleted successfully!')
      fetchBackups()
    } catch (error: any) {
      console.error('Failed to delete backup:', error)
      alert(error?.response?.data?.detail || 'Failed to delete backup')
    }
  }

  const optimizeDatabase = async () => {
    if (!confirm('Optimize database? This may take a few minutes and will improve performance.')) {
      return
    }

    setIsOptimizing(true)
    try {
      await api.post('/api/v1/admin/database/optimize')
      alert('Database optimized successfully!')
      fetchStats()
    } catch (error: any) {
      console.error('Failed to optimize database:', error)
      alert(error?.response?.data?.detail || 'Failed to optimize database')
    } finally {
      setIsOptimizing(false)
    }
  }

  const downloadBackup = (backup: Backup) => {
    window.open(`/api/v1/admin/database/backups/${backup.id}/download`, '_blank')
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'failed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
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
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Database Management</h1>
          <p className="text-gray-400 font-roboto">Backup, restore, and optimize your database</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 font-medium flex-1">{error}</p>
            </div>
          </div>
        )}

        {stats && (
          <>
            {/* Database Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Database Size</p>
                    <p className="text-2xl font-bold text-white">{formatBytes(stats.size)}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Tables</p>
                    <p className="text-2xl font-bold text-white">{stats.tables}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Records</p>
                    <p className="text-2xl font-bold text-white">{stats.records.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Last Backup</p>
                    <p className="text-lg font-bold text-white">
                      {stats.lastBackup ? new Date(stats.lastBackup).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <button
                onClick={createBackup}
                disabled={isBackingUp}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  {isBackingUp ? (
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  )}
                  <div className="text-left">
                    <p className="text-xl font-bold">Create Backup</p>
                    <p className="text-sm opacity-90">Backup current database</p>
                  </div>
                </div>
              </button>

              <button
                onClick={optimizeDatabase}
                disabled={isOptimizing}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl p-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center gap-4">
                  {isOptimizing ? (
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  <div className="text-left">
                    <p className="text-xl font-bold">Optimize</p>
                    <p className="text-sm opacity-90">Improve performance</p>
                  </div>
                </div>
              </button>

              <button
                onClick={fetchStats}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl p-6 transition-all"
              >
                <div className="flex items-center gap-4">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <div className="text-left">
                    <p className="text-xl font-bold">Refresh Stats</p>
                    <p className="text-sm opacity-90">Update database info</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Backups List */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">Backup History</h3>
                <p className="text-gray-400 text-sm mt-1">Manage your database backups</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Filename</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {backups.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                          No backups found. Create your first backup above.
                        </td>
                      </tr>
                    ) : (
                      backups.map((backup) => (
                        <tr key={backup.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-mono">
                            {backup.filename}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {formatBytes(backup.size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                            {new Date(backup.created).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(backup.status)}`}>
                              {backup.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                            <button
                              onClick={() => downloadBackup(backup)}
                              className="text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                              Download
                            </button>
                            <button
                              onClick={() => {
                                setSelectedBackup(backup)
                                setShowRestoreModal(true)
                              }}
                              className="text-green-400 hover:text-green-300 transition-colors"
                            >
                              Restore
                            </button>
                            <button
                              onClick={() => deleteBackup(backup.id)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Restore Confirmation Modal */}
        {showRestoreModal && selectedBackup && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0A0F1E] border border-white/10 rounded-2xl max-w-md w-full">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-2xl font-bold text-white">Confirm Restore</h2>
              </div>

              <div className="p-6">
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-yellow-400 font-medium">Warning</p>
                      <p className="text-gray-400 text-sm mt-1">
                        This will restore the database from the selected backup and overwrite all current data. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Backup:</span>
                    <span className="text-white font-mono text-sm">{selectedBackup.filename}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Size:</span>
                    <span className="text-white">{formatBytes(selectedBackup.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Created:</span>
                    <span className="text-white">{new Date(selectedBackup.created).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 flex gap-3">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={restoreBackup}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all font-medium"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
