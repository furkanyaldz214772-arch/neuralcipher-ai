'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'
import type { VoiceTest } from '@/types'

export default function HistoryPage() {
  const router = useRouter()
  const [tests, setTests] = useState<VoiceTest[]>([])
  const [filteredTests, setFilteredTests] = useState<VoiceTest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterLevel, setFilterLevel] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  useEffect(() => {
    fetchTests()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tests, searchQuery, filterLevel, filterStatus])

  const fetchTests = async () => {
    try {
      const response = await api.get('/api/v1/tests')
      setTests(response.data)
    } catch (error) {
      console.error('Failed to fetch tests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...tests]

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(test =>
        test.test_level.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Level filter
    if (filterLevel !== 'all') {
      filtered = filtered.filter(test => test.test_level === filterLevel)
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(test => test.status === filterStatus)
    }

    setFilteredTests(filtered)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-sora font-bold text-white mb-2">
            Test <span className="text-electric-cyan glow-text">History</span>
          </h1>
          <p className="text-gray-400 font-roboto">
            Total {tests.length} test records
          </p>
        </div>

        {/* Filters */}
        <div className="group glassmorphism rounded-2xl p-6 mb-6 hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
          {/* Animated background gradient */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-azure-start/10"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tests..."
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
              />
            </div>

            {/* Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto">
                Test Level
              </label>
              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
              >
                <option value="all">All</option>
                <option value="quick">Quick</option>
                <option value="standard">Standard</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="clinical">Clinical</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto">
                Status
              </label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
          
          {/* Decorative corner accent */}
          <div className="absolute -bottom-2 -right-2 w-32 h-32 bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
        </div>

        {/* Test List */}
        {filteredTests.length === 0 ? (
          <div className="glassmorphism rounded-2xl p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-azure-start/5"></div>
            <div className="relative z-10">
              <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400 mb-4 font-roboto">No tests found</p>
              <button
                onClick={() => router.push('/test/new')}
                className="px-6 py-3 bg-gradient-to-r from-electric-cyan to-azure-start text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium"
              >
                Take Your First Test
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTests.map((test) => (
              <div
                key={test.id}
                onClick={() => router.push(`/results/${test.id}`)}
                className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 cursor-pointer p-6 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Animated background gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/5 to-azure-start/5"></div>
                </div>
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Risk Score */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${getRiskBg(test.risk_score)} shadow-neon group-hover:scale-110 transition-transform duration-300`}>
                      <span className={`text-2xl font-bold ${getRiskColor(test.risk_score)}`}>
                        {test.risk_score}
                      </span>
                    </div>

                    {/* Test Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-sora font-semibold text-white group-hover:text-electric-cyan transition-colors">
                          {getTestLevelLabel(test.test_level)}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(test.status)}`}>
                          {getStatusLabel(test.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 font-roboto">
                        {formatDate(test.test_date)}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                        <span>Confidence: {(test.confidence * 100).toFixed(0)}%</span>
                        <span>•</span>
                        <span>ID: {test.id.slice(0, 8)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg className="w-6 h-6 text-electric-cyan group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                
                {/* Decorative corner accent */}
                <div className={`absolute -bottom-2 -right-2 w-20 h-20 ${getRiskBg(test.risk_score)} opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Summary */}
        {tests.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="group glassmorphism rounded-xl p-5 hover:shadow-neon-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-azure-start/10"></div>
              </div>
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-1 font-roboto">Total Tests</div>
                <div className="text-3xl font-bold text-white font-sora group-hover:text-electric-cyan transition-colors">{tests.length}</div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 rounded-full blur-xl group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="group glassmorphism rounded-xl p-5 hover:shadow-neon-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-vibrant-pink/10 to-electric-cyan/10"></div>
              </div>
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-1 font-roboto">Average Score</div>
                <div className="text-3xl font-bold text-white font-sora group-hover:text-vibrant-pink transition-colors">
                  {(tests.reduce((sum, t) => sum + t.risk_score, 0) / tests.length).toFixed(0)}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-vibrant-pink/20 to-electric-cyan/20 rounded-full blur-xl group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="group glassmorphism rounded-xl p-5 hover:shadow-neon-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-glow/10 to-azure-start/10"></div>
              </div>
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-1 font-roboto">Latest Test</div>
                <div className="text-3xl font-bold text-white font-sora group-hover:text-neon-glow transition-colors">
                  {formatDateShort(tests[0]?.test_date)}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-neon-glow/20 to-azure-start/20 rounded-full blur-xl group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="group glassmorphism rounded-xl p-5 hover:shadow-neon-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-green/10 to-electric-cyan/10"></div>
              </div>
              <div className="relative z-10">
                <div className="text-sm text-gray-400 mb-1 font-roboto">Completed</div>
                <div className="text-3xl font-bold text-white font-sora group-hover:text-lime-green transition-colors">
                  {tests.filter(t => t.status === 'completed').length}
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-lime-green/20 to-electric-cyan/20 rounded-full blur-xl group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

function getRiskColor(score: number) {
  if (score < 30) return 'text-green-400'
  if (score < 60) return 'text-yellow-400'
  return 'text-red-400'
}

function getRiskBg(score: number) {
  if (score < 30) return 'bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30'
  if (score < 60) return 'bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30'
  return 'bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30'
}

function getTestLevelLabel(level: string) {
  const labels: Record<string, string> = {
    quick: 'Quick Test',
    standard: 'Standard Test',
    comprehensive: 'Comprehensive Test',
    clinical: 'Clinical Test'
  }
  return labels[level] || level
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    completed: 'Completed',
    processing: 'Processing',
    failed: 'Failed'
  }
  return labels[status] || status
}

function getStatusStyle(status: string) {
  const styles: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400 border border-green-500/30',
    processing: 'bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/30',
    failed: 'bg-red-500/20 text-red-400 border border-red-500/30'
  }
  return styles[status] || 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatDateShort(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}
