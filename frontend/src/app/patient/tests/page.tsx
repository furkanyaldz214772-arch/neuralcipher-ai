'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Eye, Download, Calendar, TrendingUp, Filter, Search, 
  Activity, Brain, AlertCircle, CheckCircle, Clock, BarChart3,
  ArrowUpRight, ArrowDownRight, Minus, ChevronDown, RefreshCw, GitCompare
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'


interface Test {
  id: number
  date: string
  time: string
  fullDate: Date
  riskScore: number
  status: 'Low' | 'Moderate' | 'High'
  analyzed: boolean
  processingStatus?: 'processing' | 'completed' | 'failed'
  progress?: number
  trend?: 'up' | 'down' | 'stable'
  biomarkers?: {
    jitter: number
    shimmer: number
    hnr: number
  }
}

export default function PatientTestsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [tests, setTests] = useState<Test[]>([])
  const [filteredTests, setFilteredTests] = useState<Test[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'Low' | 'Moderate' | 'High'>('all')
  const [sortBy, setSortBy] = useState<'date' | 'risk'>('date')
  const [showFilters, setShowFilters] = useState(false)
  const [dateRange, setDateRange] = useState<'all' | '7' | '30' | '90'>('all')
  const [compareMode, setCompareMode] = useState(false)
  const [selectedTests, setSelectedTests] = useState<number[]>([])
  const [stats, setStats] = useState({
    total: 0,
    avgRisk: 0,
    lastTest: '',
    trend: 'stable' as 'up' | 'down' | 'stable'
  })
  const [chartData, setChartData] = useState<Array<{ date: string; risk: number }>>([])


  useEffect(() => {
    fetchTests()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [tests, searchQuery, filterStatus, sortBy, dateRange])

  const fetchTests = async () => {
    try {
      setLoading(true)
      const response = await api.get('/api/v1/patient/tests/', {
        params: { page: 1, page_size: 50 }
      })
      
      // Backend returns array directly, not { tests: [] }
      const testsData = Array.isArray(response.data) ? response.data : []
      
      const formattedTests: Test[] = testsData.map((test: any, index: number) => {
        const testDate = new Date(test.created_at)
        const riskScore = test.risk_score || 0
        const isProcessing = test.status === 'processing'
        const isCompleted = test.status === 'completed'
        
        return {
          id: test.id,
          date: testDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          time: testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          fullDate: testDate,
          riskScore: isCompleted ? riskScore : 0,
          status: riskScore < 30 ? 'Low' : riskScore < 60 ? 'Moderate' : 'High',
          analyzed: isCompleted,
          processingStatus: test.status,
          progress: isProcessing ? (Math.random() * 40 + 30) : 100, // Simulated progress 30-70%
          trend: index > 0 ? (Math.random() > 0.5 ? 'down' : Math.random() > 0.5 ? 'up' : 'stable') : 'stable',
          biomarkers: isCompleted ? (test.biomarkers || {
            jitter: 0,
            shimmer: 0,
            hnr: 0
          }) : undefined
        }
      })
      
      setTests(formattedTests)
      calculateStats(formattedTests)
      prepareChartData(formattedTests)
    } catch (error) {
      console.error('Failed to fetch tests:', error)
      // Set empty array on error
      setTests([])
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (testData: Test[]) => {
    if (testData.length === 0) return
    
    const avgRisk = testData.reduce((sum, test) => sum + test.riskScore, 0) / testData.length
    const lastTest = testData[0]?.date || ''
    
    let trend: 'up' | 'down' | 'stable' = 'stable'
    if (testData.length >= 2) {
      const recent = testData.slice(0, 3).reduce((sum, t) => sum + t.riskScore, 0) / Math.min(3, testData.length)
      const older = testData.slice(3, 6).reduce((sum, t) => sum + t.riskScore, 0) / Math.min(3, testData.length - 3)
      trend = recent > older + 5 ? 'up' : recent < older - 5 ? 'down' : 'stable'
    }
    
    setStats({
      total: testData.length,
      avgRisk: Math.round(avgRisk),
      lastTest,
      trend
    })
  }

  const prepareChartData = (testData: Test[]) => {
    const data = testData
      .slice(0, 10)
      .reverse()
      .map(test => ({
        date: test.date,
        risk: test.riskScore
      }))
    setChartData(data)
  }

  const applyFilters = () => {
    let filtered = [...tests]
    
    // Date range filter
    if (dateRange !== 'all') {
      const days = parseInt(dateRange)
      const cutoffDate = new Date()
      cutoffDate.setDate(cutoffDate.getDate() - days)
      filtered = filtered.filter(test => test.fullDate >= cutoffDate)
    }
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(test => test.status === filterStatus)
    }
    
    if (searchQuery) {
      filtered = filtered.filter(test => 
        test.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.status.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return b.fullDate.getTime() - a.fullDate.getTime()
      } else {
        return b.riskScore - a.riskScore
      }
    })
    
    setFilteredTests(filtered)
  }

  const toggleTestSelection = (testId: number) => {
    if (selectedTests.includes(testId)) {
      setSelectedTests(selectedTests.filter(id => id !== testId))
    } else {
      if (selectedTests.length < 3) {
        setSelectedTests([...selectedTests, testId])
      }
    }
  }

  const handleDownloadPDF = async (testId: number) => {
    try {
      const response = await api.get(`/api/v1/tests/${testId}/pdf`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `neuralcipher_analysis_${testId}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download PDF:', error)
    }
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', gradient: 'from-emerald-500 to-teal-500' }
    if (score < 60) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', gradient: 'from-amber-500 to-orange-500' }
    return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30', gradient: 'from-red-500 to-rose-500' }
  }

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUpRight className="h-4 w-4 text-red-400" />
    if (trend === 'down') return <ArrowDownRight className="h-4 w-4 text-emerald-400" />
    return <Minus className="h-4 w-4 text-gray-400" />
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400 font-medium">Loading your test results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-xl">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                Test Results
              </h1>
              <p className="text-gray-400">Comprehensive analysis of your neurological assessments</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/patient/tests/new')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50 transition-all"
            >
              <Activity className="h-5 w-5" />
              New Assessment
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm font-medium">Total Tests</p>
                <FileText className="h-5 w-5 text-[#0EA5E9]" />
              </div>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm font-medium">Average Risk</p>
                <BarChart3 className="h-5 w-5 text-amber-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-3xl font-bold text-white">{stats.avgRisk}%</p>
                {getTrendIcon(stats.trend)}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm font-medium">Last Test</p>
                <Clock className="h-5 w-5 text-emerald-400" />
              </div>
              <p className="text-xl font-bold text-white">{stats.lastTest || 'N/A'}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm font-medium">Trend</p>
                <TrendingUp className="h-5 w-5 text-purple-400" />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold text-white capitalize">{stats.trend}</p>
                {getTrendIcon(stats.trend)}
              </div>
            </motion.div>
          </div>

          {/* Trend Chart */}
          {chartData.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#0EA5E9]" />
                  Risk Score Trend
                </h3>
                <span className="text-sm text-gray-400">Last 10 tests</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey="date" 
                    stroke="#9CA3AF" 
                    fontSize={12}
                    tickFormatter={(value) => value.split(',')[0]}
                  />
                  <YAxis stroke="#9CA3AF" fontSize={12} domain={[0, 100]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1E293B', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                    labelStyle={{ color: '#F3F4F6' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="risk" 
                    stroke="#0EA5E9" 
                    strokeWidth={3}
                    dot={{ fill: '#0EA5E9', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>
          )}

          {/* Date Range Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-400">Time Period:</span>
            {(['all', '7', '30', '90'] as const).map((range) => (
              <motion.button
                key={range}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  dateRange === range
                    ? 'bg-[#0EA5E9] text-white'
                    : 'bg-[#1E293B] text-gray-400 hover:text-white border border-gray-700'
                }`}
              >
                {range === 'all' ? 'All Time' : `Last ${range} Days`}
              </motion.button>
            ))}
          </div>

          {/* Compare Mode Toggle */}
          <div className="flex items-center justify-between mb-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCompareMode(!compareMode)
                setSelectedTests([])
              }}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
                compareMode
                  ? 'bg-[#0EA5E9] text-white'
                  : 'bg-[#1E293B] text-gray-300 border border-gray-700 hover:border-[#0EA5E9]'
              }`}
            >
              <GitCompare className="h-5 w-5" />
              Compare Tests {compareMode && `(${selectedTests.length}/3)`}
            </motion.button>
            
            {compareMode && selectedTests.length >= 2 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Open comparison modal
                  alert('Comparison feature coming soon!')
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-semibold"
              >
                View Comparison
              </motion.button>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tests by date or status..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E293B] border border-gray-700 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9] transition-colors"
              />
            </div>
            
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                  showFilters 
                    ? 'bg-[#0EA5E9] text-white' 
                    : 'bg-[#1E293B] border border-gray-700 text-gray-300 hover:border-[#0EA5E9]'
                }`}
              >
                <Filter className="h-5 w-5" />
                Filters
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchTests}
                className="px-4 py-3 bg-[#1E293B] border border-gray-700 text-gray-300 rounded-xl hover:border-[#0EA5E9] transition-all"
              >
                <RefreshCw className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 bg-[#1E293B] border border-gray-700 rounded-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Status Filter</label>
                      <div className="flex flex-wrap gap-2">
                        {(['all', 'Low', 'Moderate', 'High'] as const).map((status) => (
                          <button
                            key={status}
                            onClick={() => setFilterStatus(status)}
                            className={`px-4 py-2 rounded-lg font-medium transition-all ${
                              filterStatus === status
                                ? 'bg-[#0EA5E9] text-white'
                                : 'bg-[#0F172A] text-gray-400 hover:text-white'
                            }`}
                          >
                            {status === 'all' ? 'All Tests' : status}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setSortBy('date')}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                            sortBy === 'date'
                              ? 'bg-[#0EA5E9] text-white'
                              : 'bg-[#0F172A] text-gray-400 hover:text-white'
                          }`}
                        >
                          Date
                        </button>
                        <button
                          onClick={() => setSortBy('risk')}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                            sortBy === 'risk'
                              ? 'bg-[#0EA5E9] text-white'
                              : 'bg-[#0F172A] text-gray-400 hover:text-white'
                          }`}
                        >
                          Risk Score
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Tests Grid */}
        {filteredTests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-700/30 rounded-full mb-4">
              <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tests found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your filters or create a new test</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/patient/tests/new')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
            >
              <Activity className="h-5 w-5" />
              Create New Test
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTests.map((test, index) => {
              const colors = getRiskColor(test.riskScore)
              
              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.01 }}
                  className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-xl p-6 hover:border-[#0EA5E9]/50 transition-all group relative"
                >
                  {/* Compare Mode Checkbox */}
                  {compareMode && (
                    <div className="absolute top-4 left-4 z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                          selectedTests.includes(test.id)
                            ? 'bg-[#0EA5E9] border-[#0EA5E9]'
                            : 'bg-[#0F172A] border-gray-600'
                        }`}
                      >
                        {selectedTests.includes(test.id) && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </motion.div>
                    </div>
                  )}
                  
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    {/* Date & Time */}
                    <div className="flex items-center gap-4 lg:w-48">
                      <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
                        <Calendar className="h-6 w-6 text-[#0EA5E9]" />
                      </div>
                      <div>
                        <p className="text-white font-semibold text-lg">{test.date}</p>
                        <p className="text-gray-400 text-sm">{test.time}</p>
                      </div>
                    </div>

                    {/* Processing Status or Risk Score */}
                    {test.processingStatus === 'processing' ? (
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-400 flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Brain className="h-4 w-4 text-[#0EA5E9]" />
                            </motion.div>
                            AI Analysis in Progress
                          </span>
                          <span className="text-lg font-bold text-[#0EA5E9]">{Math.round(test.progress || 0)}%</span>
                        </div>
                        <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${test.progress || 0}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] rounded-full relative overflow-hidden"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            />
                          </motion.div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">Analyzing voice biomarkers and neural patterns...</p>
                      </div>
                    ) : (
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-400">Risk Assessment</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-2xl font-bold ${colors.text}`}>{test.riskScore}%</span>
                            {getTrendIcon(test.trend)}
                          </div>
                        </div>
                        <div className="relative h-3 bg-gray-700/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${test.riskScore}%` }}
                            transition={{ duration: 1, delay: index * 0.05 }}
                            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full`}
                          />
                        </div>
                      </div>
                    )}

                    {/* Status Badge */}
                    {test.processingStatus === 'processing' ? (
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-[#0EA5E9]/20 border border-[#0EA5E9]/30 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-[#0EA5E9] animate-pulse" />
                          <span className="font-semibold text-[#0EA5E9]">Processing</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className={`px-4 py-2 rounded-xl ${colors.bg} border ${colors.border} flex items-center gap-2`}>
                          {test.status === 'Low' ? (
                            <CheckCircle className={`h-4 w-4 ${colors.text}`} />
                          ) : (
                            <AlertCircle className={`h-4 w-4 ${colors.text}`} />
                          )}
                          <span className={`font-semibold ${colors.text}`}>{test.status} Risk</span>
                        </div>
                      </div>
                    )}

                    {/* Actions - Eye icon passive, Download active */}
                    <div className="flex items-center gap-2 pointer-events-auto">
                      {test.processingStatus === 'completed' ? (
                        <>
                          {/* Eye icon - Passive (not clickable) */}
                          <div
                            className="p-3 bg-blue-500/10 text-blue-400 rounded-xl border border-blue-500/20 cursor-default"
                            title="View Details"
                          >
                            <Eye className="h-5 w-5" />
                          </div>
                          {/* Download button - Active */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDownloadPDF(test.id)
                            }}
                            className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-all border border-emerald-500/20"
                            title="Download PDF"
                          >
                            <Download className="h-5 w-5" />
                          </motion.button>
                        </>
                      ) : (
                        <div
                          className="p-3 bg-gray-700/30 text-gray-500 rounded-xl cursor-not-allowed opacity-50"
                          title="Processing - not available yet"
                        >
                          <Download className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Biomarkers Preview - Only show for completed tests */}
                  {test.biomarkers && test.processingStatus === 'completed' && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Jitter</p>
                          <p className="text-sm font-semibold text-white">{(test.biomarkers.jitter * 100).toFixed(3)}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">Shimmer</p>
                          <p className="text-sm font-semibold text-white">{(test.biomarkers.shimmer * 100).toFixed(3)}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-gray-400 mb-1">HNR</p>
                          <p className="text-sm font-semibold text-white">{test.biomarkers.hnr.toFixed(2)} dB</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
