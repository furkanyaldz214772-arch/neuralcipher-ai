'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface AuditEntry {
  id: string
  timestamp: string
  user: string
  userEmail: string
  action: string
  resource: string
  resourceId?: string
  changes?: any
  ip: string
  userAgent: string
  status: 'success' | 'failed'
}

export default function AuditTrailPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [audits, setAudits] = useState<AuditEntry[]>([])
  const [filteredAudits, setFilteredAudits] = useState<AuditEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionFilter, setActionFilter] = useState<string>('all')
  const [resourceFilter, setResourceFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAudit, setSelectedAudit] = useState<AuditEntry | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [dateRange, setDateRange] = useState<string>('7d')

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
      fetchAudits()
    }
  }, [user, isAuthenticated, router, dateRange])

  useEffect(() => {
    filterAudits()
  }, [audits, actionFilter, resourceFilter, statusFilter, searchQuery])

  const fetchAudits = async () => {
    try {
      setError(null)
      const response = await api.get(`/api/v1/admin/audit?range=${dateRange}`)
      const auditsData = response.data?.audits || []
      setAudits(Array.isArray(auditsData) ? auditsData : [])
    } catch (error: any) {
      console.error('Failed to fetch audit trail:', error)
      setError(error?.response?.data?.detail || 'Failed to load audit trail')
      setAudits([])
    } finally {
      setIsLoading(false)
    }
  }

  const filterAudits = () => {
    if (!Array.isArray(audits)) {
      setFilteredAudits([])
      return
    }

    let filtered = [...audits]

    if (actionFilter !== 'all') {
      filtered = filtered.filter(audit => audit.action === actionFilter)
    }

    if (resourceFilter !== 'all') {
      filtered = filtered.filter(audit => audit.resource === resourceFilter)
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(audit => audit.status === statusFilter)
    }

    if (searchQuery) {
      filtered = filtered.filter(audit =>
        audit.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        audit.resource.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredAudits(filtered)
  }

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'update':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'delete':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'login':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'logout':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    }
  }

  const getStatusBadge = (status: string) => {
    return status === 'success'
      ? 'bg-green-500/20 text-green-400 border-green-500/30'
      : 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'create':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
      case 'update':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        )
      case 'delete':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )
      case 'login':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
    }
  }

  const exportAudit = () => {
    const csv = [
      ['Timestamp', 'User', 'Email', 'Action', 'Resource', 'Status', 'IP'],
      ...filteredAudits.map(audit => [
        audit.timestamp,
        audit.user,
        audit.userEmail,
        audit.action,
        audit.resource,
        audit.status,
        audit.ip
      ])
    ].map(row => row.join(',')).join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `audit-trail-${new Date().toISOString()}.csv`
    a.click()
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
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-sora font-bold text-white mb-2">Audit Trail</h1>
            <p className="text-gray-400 font-roboto">Track all admin and user actions</p>
          </div>
          <div className="flex gap-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <button
              onClick={exportAudit}
              className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-400 font-medium flex-1">{error}</p>
              <button
                onClick={fetchAudits}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm font-medium"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Actions</p>
            <p className="text-2xl font-bold text-white mt-1">{audits.length}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Successful</p>
            <p className="text-2xl font-bold text-green-400 mt-1">
              {audits.filter(a => a.status === 'success').length}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Failed</p>
            <p className="text-2xl font-bold text-red-400 mt-1">
              {audits.filter(a => a.status === 'failed').length}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Unique Users</p>
            <p className="text-2xl font-bold text-white mt-1">
              {new Set(audits.map(a => a.userEmail)).size}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search user, action, resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
            />
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Actions</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
            </select>
            <select
              value={resourceFilter}
              onChange={(e) => setResourceFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Resources</option>
              <option value="user">User</option>
              <option value="subscription">Subscription</option>
              <option value="test">Test</option>
              <option value="settings">Settings</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Audit Table */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Action</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Resource</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IP</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredAudits.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      No audit entries found
                    </td>
                  </tr>
                ) : (
                  filteredAudits.map((audit) => (
                    <tr key={audit.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {new Date(audit.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-white">{audit.user}</div>
                          <div className="text-xs text-gray-400">{audit.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex items-center gap-2 text-xs leading-5 font-semibold rounded-full border ${getActionBadge(audit.action)}`}>
                          {getActionIcon(audit.action)}
                          {audit.action.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                        {audit.resource}
                        {audit.resourceId && (
                          <span className="text-gray-400 text-xs ml-2">#{audit.resourceId.slice(0, 8)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusBadge(audit.status)}`}>
                          {audit.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400 font-mono">
                        {audit.ip}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => {
                            setSelectedAudit(audit)
                            setShowDetailModal(true)
                          }}
                          className="text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Modal */}
        {showDetailModal && selectedAudit && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#0A0F1E] border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">Audit Details</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Timestamp</p>
                      <p className="text-white font-medium">{new Date(selectedAudit.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Status</p>
                      <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full border ${getStatusBadge(selectedAudit.status)}`}>
                        {selectedAudit.status.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">User</p>
                      <p className="text-white font-medium">{selectedAudit.user}</p>
                      <p className="text-gray-400 text-xs">{selectedAudit.userEmail}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Action</p>
                      <span className={`px-3 py-1 inline-flex items-center gap-2 text-xs font-semibold rounded-full border ${getActionBadge(selectedAudit.action)}`}>
                        {getActionIcon(selectedAudit.action)}
                        {selectedAudit.action.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Resource</p>
                      <p className="text-white font-medium">{selectedAudit.resource}</p>
                      {selectedAudit.resourceId && (
                        <p className="text-gray-400 text-xs font-mono">{selectedAudit.resourceId}</p>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">IP Address</p>
                      <p className="text-white font-medium font-mono">{selectedAudit.ip}</p>
                    </div>
                  </div>
                </div>

                {selectedAudit.userAgent && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">User Agent</p>
                    <p className="text-white text-sm">{selectedAudit.userAgent}</p>
                  </div>
                )}

                {selectedAudit.changes && (
                  <div className="bg-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-sm mb-2">Changes</p>
                    <pre className="text-white text-xs bg-black/30 p-4 rounded-lg overflow-x-auto">
                      {JSON.stringify(selectedAudit.changes, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/10">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
