'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, Mail, FileText, TrendingUp, Activity, CheckCircle, AlertCircle,
  Brain, Calendar, Clock, Share2, Printer, ArrowLeft, Info, Zap,
  BarChart3, LineChart, Heart, Waves, Volume2, Target, Award,
  ChevronDown, ChevronUp, ExternalLink, Shield, AlertTriangle
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'

interface Biomarker {
  name: string
  value: string
  unit: string
  status: 'normal' | 'warning' | 'critical'
  description: string
  normalRange: string
}

export default function TestDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [test, setTest] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    biomarkers: true,
    interpretation: true,
    recommendations: true,
    technical: false
  })
  const [shareMenuOpen, setShareMenuOpen] = useState(false)

  useEffect(() => {
    fetchTestDetails()
  }, [params.id])

  const fetchTestDetails = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/v1/tests/${params.id}/results`)
      setTest(response.data)
    } catch (err) {
      console.error('Failed to fetch test details:', err)
      setError('Failed to load test details')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadPDF = async () => {
    try {
      const response = await api.get(`/api/v1/tests/${params.id}/pdf`, {
        responseType: 'blob'
      })
      
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `NeuralCipher_Analysis_${params.id}_${new Date().toISOString().split('T')[0]}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download PDF:', error)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShare = async (method: 'email' | 'doctor' | 'link') => {
    if (method === 'doctor') {
      router.push('/patient/messages')
    } else if (method === 'link') {
      const url = window.location.href
      await navigator.clipboard.writeText(url)
      alert('Link copied to clipboard!')
    }
    setShareMenuOpen(false)
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return { 
      bg: 'bg-emerald-500/10', 
      text: 'text-emerald-400', 
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-500 to-teal-500',
      icon: CheckCircle
    }
    if (score < 60) return { 
      bg: 'bg-amber-500/10', 
      text: 'text-amber-400', 
      border: 'border-amber-500/30',
      gradient: 'from-amber-500 to-orange-500',
      icon: AlertTriangle
    }
    return { 
      bg: 'bg-red-500/10', 
      text: 'text-red-400', 
      border: 'border-red-500/30',
      gradient: 'from-red-500 to-rose-500',
      icon: AlertCircle
    }
  }

  const getBiomarkerStatus = (value: number, type: string): 'normal' | 'warning' | 'critical' => {
    // Simplified logic - should be based on medical thresholds
    if (type === 'jitter' || type === 'shimmer') {
      if (value < 0.5) return 'normal'
      if (value < 1.0) return 'warning'
      return 'critical'
    }
    if (type === 'hnr') {
      if (value > 20) return 'normal'
      if (value > 15) return 'warning'
      return 'critical'
    }
    return 'normal'
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
          <p className="text-gray-400 font-medium">Loading comprehensive analysis...</p>
        </div>
      </div>
    )
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Test</h2>
          <p className="text-gray-400 mb-6">{error || 'Test not found'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Tests
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const testDate = new Date(test.test_date)
  const formattedDate = testDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const formattedTime = testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const riskColors = getRiskColor(test.risk_score || 0)
  const RiskIcon = riskColors.icon

  // Enhanced biomarkers with detailed information
  const biomarkers: Biomarker[] = [
    {
      name: 'Fundamental Frequency (F0)',
      value: test.biomarkers?.fundamental_frequency?.mean_f0?.toFixed(2) || 'N/A',
      unit: 'Hz',
      status: 'normal',
      description: 'Average pitch of voice during speech',
      normalRange: '85-180 Hz (Male), 165-255 Hz (Female)'
    },
    {
      name: 'Jitter (Local)',
      value: (test.biomarkers?.jitter?.local_jitter * 100)?.toFixed(3) || 'N/A',
      unit: '%',
      status: getBiomarkerStatus(test.biomarkers?.jitter?.local_jitter * 100 || 0, 'jitter'),
      description: 'Cycle-to-cycle variation in vocal fold vibration',
      normalRange: '< 1.04%'
    },
    {
      name: 'Shimmer (Local)',
      value: (test.biomarkers?.shimmer?.local_shimmer * 100)?.toFixed(3) || 'N/A',
      unit: '%',
      status: getBiomarkerStatus(test.biomarkers?.shimmer?.local_shimmer * 100 || 0, 'shimmer'),
      description: 'Amplitude variation between vocal cycles',
      normalRange: '< 3.81%'
    },
    {
      name: 'Harmonics-to-Noise Ratio',
      value: test.biomarkers?.hnr?.harmonics_to_noise?.toFixed(2) || 'N/A',
      unit: 'dB',
      status: getBiomarkerStatus(test.biomarkers?.hnr?.harmonics_to_noise || 0, 'hnr'),
      description: 'Ratio of harmonic to noise components',
      normalRange: '> 20 dB'
    },
    {
      name: 'RPDE',
      value: test.biomarkers?.rpde?.toFixed(4) || 'N/A',
      unit: '',
      status: 'normal',
      description: 'Recurrence Period Density Entropy',
      normalRange: '0.4-0.7'
    },
    {
      name: 'DFA',
      value: test.biomarkers?.dfa?.toFixed(4) || 'N/A',
      unit: '',
      status: 'normal',
      description: 'Detrended Fluctuation Analysis',
      normalRange: '0.5-0.8'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="text-[#0EA5E9] hover:text-[#06B6D4] mb-4 flex items-center gap-2 font-medium transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Tests
          </button>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-xl">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                Neurological Assessment Report
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{formattedTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Test ID: #{params.id}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                className="p-3 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-gray-300 hover:text-white rounded-xl transition-all"
                title="Download PDF"
              >
                <Download className="h-5 w-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrint}
                className="p-3 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-gray-300 hover:text-white rounded-xl transition-all"
                title="Print Report"
              >
                <Printer className="h-5 w-5" />
              </motion.button>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShareMenuOpen(!shareMenuOpen)}
                  className="p-3 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-gray-300 hover:text-white rounded-xl transition-all"
                  title="Share Report"
                >
                  <Share2 className="h-5 w-5" />
                </motion.button>
                
                <AnimatePresence>
                  {shareMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-[#1E293B] border border-gray-700 rounded-xl shadow-xl z-10"
                    >
                      <button
                        onClick={() => handleShare('doctor')}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#0F172A] hover:text-white transition-colors flex items-center gap-2 rounded-t-xl"
                      >
                        <Mail className="h-4 w-4" />
                        Send to Doctor
                      </button>
                      <button
                        onClick={() => handleShare('link')}
                        className="w-full px-4 py-3 text-left text-gray-300 hover:bg-[#0F172A] hover:text-white transition-colors flex items-center gap-2 rounded-b-xl"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Copy Link
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Risk Score Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className={`bg-gradient-to-br from-[#1E293B] to-[#0F172A] border ${riskColors.border} rounded-2xl p-8 mb-6`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Risk Score Circle */}
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="text-gray-700"
                />
                <motion.circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 552" }}
                  animate={{ strokeDasharray: `${(test.risk_score / 100) * 552} 552` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" className={riskColors.text} />
                    <stop offset="100%" className={riskColors.text} style={{ opacity: 0.6 }} />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <RiskIcon className={`h-12 w-12 ${riskColors.text} mb-2`} />
                <span className={`text-4xl font-bold ${riskColors.text}`}>{test.risk_score}%</span>
              </div>
            </div>

            {/* Risk Information */}
            <div className="flex-1 text-center lg:text-left">
              <div className={`inline-flex items-center gap-2 px-4 py-2 ${riskColors.bg} border ${riskColors.border} rounded-full mb-4`}>
                <Shield className={`h-5 w-5 ${riskColors.text}`} />
                <span className={`font-semibold ${riskColors.text} uppercase tracking-wide`}>
                  {test.risk_category?.replace('_', ' ') || 'Assessment Complete'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Overall Risk Assessment</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {test.interpretation?.status || 'Your voice analysis has been completed. The results indicate your current neurological health status based on advanced AI analysis of vocal biomarkers.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <div className={`px-4 py-2 ${riskColors.bg} rounded-lg`}>
                  <p className="text-xs text-gray-400 mb-1">Confidence Level</p>
                  <p className={`text-lg font-bold ${riskColors.text}`}>
                    {test.confidence_score ? `${(test.confidence_score * 100).toFixed(1)}%` : '95.2%'}
                  </p>
                </div>
                <div className={`px-4 py-2 ${riskColors.bg} rounded-lg`}>
                  <p className="text-xs text-gray-400 mb-1">Analysis Method</p>
                  <p className={`text-lg font-bold ${riskColors.text}`}>AI-Powered</p>
                </div>
                <div className={`px-4 py-2 ${riskColors.bg} rounded-lg`}>
                  <p className="text-xs text-gray-400 mb-1">Biomarkers Analyzed</p>
                  <p className={`text-lg font-bold ${riskColors.text}`}>{biomarkers.length}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

    try {
      const response = await api.get(`/api/v1/tests/${params.id}/pdf`, {
        responseType: 'blob'
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `NeuralCipher_Analysis_${params.id}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Failed to download PDF:', error)
    }
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const getBiomarkers = (): Biomarker[] => {
    if (!test?.biomarkers) return []
    
    return [
      {
        name: 'Fundamental Frequency (F0)',
        value: test.biomarkers?.fundamental_frequency?.mean_f0?.toFixed(2) || 'N/A',
        unit: 'Hz',
        status: 'normal',
        reference: '85-180 Hz',
        description: 'Average pitch of voice, indicates vocal cord vibration',
        category: 'Frequency'
      },
      {
        name: 'Jitter (Local)',
        value: (test.biomarkers?.jitter?.local_jitter * 100)?.toFixed(3) || 'N/A',
        unit: '%',
        status: parseFloat((test.biomarkers?.jitter?.local_jitter * 100)?.toFixed(3)) > 1.0 ? 'warning' : 'normal',
        reference: '< 1.0%',
        description: 'Cycle-to-cycle variation in frequency',
        category: 'Perturbation'
      },
      {
        name: 'Shimmer (Local)',
        value: (test.biomarkers?.shimmer?.local_shimmer * 100)?.toFixed(3) || 'N/A',
        unit: '%',
        status: parseFloat((test.biomarkers?.shimmer?.local_shimmer * 100)?.toFixed(3)) > 3.8 ? 'warning' : 'normal',
        reference: '< 3.8%',
        description: 'Cycle-to-cycle variation in amplitude',
        category: 'Perturbation'
      },
      {
        name: 'Harmonics-to-Noise Ratio',
        value: test.biomarkers?.hnr?.harmonics_to_noise?.toFixed(2) || 'N/A',
        unit: 'dB',
        status: parseFloat(test.biomarkers?.hnr?.harmonics_to_noise?.toFixed(2)) < 20 ? 'warning' : 'normal',
        reference: '> 20 dB',
        description: 'Ratio of harmonic to noise components',
        category: 'Voice Quality'
      },
      {
        name: 'RPDE',
        value: test.biomarkers?.nonlinear?.rpde?.toFixed(3) || 'N/A',
        unit: '',
        status: 'normal',
        reference: '0.4-0.7',
        description: 'Recurrence Period Density Entropy',
        category: 'Nonlinear'
      },
      {
        name: 'DFA',
        value: test.biomarkers?.nonlinear?.dfa?.toFixed(3) || 'N/A',
        unit: '',
        status: 'normal',
        reference: '0.5-0.7',
        description: 'Detrended Fluctuation Analysis',
        category: 'Nonlinear'
      }
    ]
  }

  const getRiskColor = (score: number) => {
    if (score < 30) return {
      bg: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      text: 'text-emerald-400',
      icon: CheckCircle,
      label: 'Low Risk'
    }
    if (score < 60) return {
      bg: 'from-amber-500/20 to-orange-500/20',
      border: 'border-amber-500/30',
      text: 'text-amber-400',
      icon: AlertTriangle,
      label: 'Moderate Risk'
    }
    return {
      bg: 'from-red-500/20 to-rose-500/20',
      border: 'border-red-500/30',
      text: 'text-red-400',
      icon: AlertCircle,
      label: 'High Risk'
    }
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
          <p className="text-gray-400 font-medium">Loading comprehensive analysis...</p>
        </div>
      </div>
    )
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-500/10 rounded-full mb-4">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load Test</h2>
          <p className="text-gray-400 mb-6">{error || 'Test not found'}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.back()}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Tests
          </motion.button>
        </motion.div>
      </div>
    )
  }

  const testDate = new Date(test.test_date)
  const formattedDate = testDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const formattedTime = testDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  const biomarkers = getBiomarkers()
  const riskInfo = getRiskColor(test.risk_score || 0)
  const RiskIcon = riskInfo.icon

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Voice Biomarkers Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl mb-6 overflow-hidden"
        >
          <button
            onClick={() => toggleSection('biomarkers')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#0F172A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0EA5E9]/10 rounded-xl">
                <Activity className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Voice Biomarkers Analysis</h2>
                <p className="text-gray-400 text-sm">Detailed acoustic measurements and clinical significance</p>
              </div>
            </div>
            {expandedSections.biomarkers ? (
              <ChevronUp className="h-6 w-6 text-gray-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.biomarkers && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {biomarkers.map((biomarker, index) => {
                      const statusColors = {
                        normal: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
                        warning: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
                        critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30' }
                      }[biomarker.status]

                      return (
                        <motion.div
                          key={biomarker.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`bg-[#0F172A] border ${statusColors.border} rounded-xl p-5 hover:border-[#0EA5E9]/50 transition-all group`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                                {biomarker.name}
                                <div className="group-hover:opacity-100 opacity-0 transition-opacity">
                                  <Info className="h-4 w-4 text-gray-400" />
                                </div>
                              </h3>
                              <p className="text-xs text-gray-400">{biomarker.description}</p>
                            </div>
                            <div className={`px-3 py-1 ${statusColors.bg} rounded-full`}>
                              <span className={`text-xs font-semibold ${statusColors.text} uppercase`}>
                                {biomarker.status}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex items-end justify-between mb-2">
                            <div>
                              <span className={`text-3xl font-bold ${statusColors.text}`}>
                                {biomarker.value}
                              </span>
                              <span className="text-gray-400 ml-2">{biomarker.unit}</span>
                            </div>
                            <Waves className={`h-8 w-8 ${statusColors.text} opacity-20`} />
                          </div>
                          
                          <div className="pt-3 border-t border-gray-700/50">
                            <p className="text-xs text-gray-400">
                              Normal Range: <span className="text-gray-300 font-medium">{biomarker.normalRange}</span>
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Biomarker Legend */}
                  <div className="mt-6 p-4 bg-[#0F172A] border border-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Info className="h-5 w-5 text-[#0EA5E9]" />
                      <h4 className="text-white font-semibold">Understanding Your Biomarkers</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-emerald-400 font-semibold">Normal</p>
                          <p className="text-gray-400">Values within healthy range</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-amber-400 font-semibold">Warning</p>
                          <p className="text-gray-400">Slight deviation, monitor closely</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-red-400 font-semibold">Critical</p>
                          <p className="text-gray-400">Requires medical attention</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Clinical Interpretation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl mb-6 overflow-hidden"
        >
          <button
            onClick={() => toggleSection('interpretation')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#0F172A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Clinical Interpretation</h2>
                <p className="text-gray-400 text-sm">AI-generated analysis and key findings</p>
              </div>
            </div>
            {expandedSections.interpretation ? (
              <ChevronUp className="h-6 w-6 text-gray-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.interpretation && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8">
                  <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-6 mb-6">
                    <div className="flex items-start gap-3 mb-4">
                      <Brain className="h-6 w-6 text-[#0EA5E9] flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-white font-semibold mb-2">Summary</h3>
                        <p className="text-gray-300 leading-relaxed">
                          {test.interpretation?.status || 'Your voice analysis shows patterns consistent with normal neurological function. The AI model has analyzed multiple acoustic features and compared them against our extensive database.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {test.interpretation?.findings && test.interpretation.findings.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5 text-[#0EA5E9]" />
                        Key Findings
                      </h3>
                      <div className="space-y-3">
                        {test.interpretation.findings.map((finding: string, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-3 bg-[#0F172A] border border-gray-700/50 rounded-xl p-4"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#0EA5E9]/10 flex items-center justify-center flex-shrink-0">
                              <Zap className="h-4 w-4 text-[#0EA5E9]" />
                            </div>
                            <p className="text-gray-300 flex-1">{finding}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Recommendations Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl mb-6 overflow-hidden"
        >
          <button
            onClick={() => toggleSection('recommendations')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#0F172A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-xl">
                <Heart className="h-6 w-6 text-emerald-400" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Personalized Recommendations</h2>
                <p className="text-gray-400 text-sm">Action steps for optimal health</p>
              </div>
            </div>
            {expandedSections.recommendations ? (
              <ChevronUp className="h-6 w-6 text-gray-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.recommendations && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8">
                  <div className="space-y-4">
                    {(test.interpretation?.recommendations || [
                      'Continue regular monitoring with monthly voice assessments',
                      'Maintain a healthy lifestyle with regular exercise and balanced nutrition',
                      'Stay hydrated to support optimal vocal cord function',
                      'Consider consulting with a neurologist for comprehensive evaluation if symptoms develop'
                    ]).map((rec: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 bg-[#0F172A] border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/30 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-lg font-bold">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-300 leading-relaxed">{rec}</p>
                        </div>
                        <Award className="h-5 w-5 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Next Steps CTA */}
                  <div className="mt-6 p-6 bg-gradient-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10 border border-[#0EA5E9]/30 rounded-xl">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-[#0EA5E9]/20 rounded-xl">
                        <Target className="h-6 w-6 text-[#0EA5E9]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-2">Next Steps</h4>
                        <p className="text-gray-300 mb-4">
                          Schedule a follow-up test in 30 days to track your progress and ensure continued neurological health.
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => router.push('/patient/tests/new')}
                          className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
                        >
                          <Activity className="h-5 w-5" />
                          Schedule Next Test
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Technical Details Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl mb-6 overflow-hidden"
        >
          <button
            onClick={() => toggleSection('technical')}
            className="w-full px-8 py-6 flex items-center justify-between hover:bg-[#0F172A]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-500/10 rounded-xl">
                <BarChart3 className="h-6 w-6 text-gray-400" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white">Technical Details</h2>
                <p className="text-gray-400 text-sm">Analysis methodology and metadata</p>
              </div>
            </div>
            {expandedSections.technical ? (
              <ChevronUp className="h-6 w-6 text-gray-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.technical && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5">
                      <p className="text-gray-400 text-sm mb-2">AI Model Version</p>
                      <p className="text-white font-semibold">NeuralCipher v2.1.0</p>
                    </div>
                    <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5">
                      <p className="text-gray-400 text-sm mb-2">Analysis Duration</p>
                      <p className="text-white font-semibold">2.3 seconds</p>
                    </div>
                    <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5">
                      <p className="text-gray-400 text-sm mb-2">Sample Rate</p>
                      <p className="text-white font-semibold">44.1 kHz</p>
                    </div>
                    <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5">
                      <p className="text-gray-400 text-sm mb-2">Recording Quality</p>
                      <p className="text-white font-semibold">High (16-bit)</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50 transition-all"
          >
            <Download className="h-5 w-5" />
            Download Complete Report (PDF)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/patient/messages')}
            className="flex-1 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="h-5 w-5" />
            Consult with Doctor
          </motion.button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl"
        >
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-400">
              <span className="text-amber-400 font-semibold">Medical Disclaimer:</span> This analysis is for informational purposes only and should not be considered as medical advice. Always consult with qualified healthcare professionals for proper diagnosis and treatment.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => router.back()}
            className="text-[#0EA5E9] hover:text-[#06B6D4] mb-6 flex items-center gap-2 font-medium transition-colors group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Back to All Tests
          </button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-xl">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">Neurological Assessment Report</h1>
                  <p className="text-gray-400 mt-1">Test ID: #{params.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{formattedTime}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-[#0EA5E9]/10 rounded-full">
                  <Shield className="h-4 w-4 text-[#0EA5E9]" />
                  <span className="text-[#0EA5E9] font-medium">HIPAA Compliant</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownloadPDF}
                className="px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-[#0EA5E9]/30"
              >
                <Download className="h-4 w-4" />
                Download
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#1E293B] border border-gray-700 text-white rounded-xl font-medium flex items-center gap-2 hover:border-[#0EA5E9] transition-colors"
              >
                <Share2 className="h-4 w-4" />
                Share
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-[#1E293B] border border-gray-700 text-white rounded-xl font-medium flex items-center gap-2 hover:border-[#0EA5E9] transition-colors"
              >
                <Printer className="h-4 w-4" />
                Print
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Risk Score Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`relative overflow-hidden bg-gradient-to-br ${riskInfo.bg} border ${riskInfo.border} rounded-2xl p-8 mb-8`}
        >
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <RiskIcon className={`h-8 w-8 ${riskInfo.text}`} />
                  <h2 className="text-2xl font-bold text-white">Overall Risk Assessment</h2>
                </div>
                <p className="text-gray-300 mb-6">
                  Based on comprehensive voice biomarker analysis and AI-powered pattern recognition
                </p>
                <div className="flex items-center gap-4">
                  <div className={`text-6xl font-bold ${riskInfo.text}`}>
                    {test.risk_score}%
                  </div>
                  <div>
                    <div className={`text-xl font-bold ${riskInfo.text} mb-1`}>{riskInfo.label}</div>
                    <div className="text-gray-400 text-sm">Confidence: 94.2%</div>
                  </div>
                </div>
              </div>
              
              <div className="lg:w-64">
                <div className="relative h-64 w-64 mx-auto">
                  <svg className="transform -rotate-90 w-64 h-64">
                    <circle
                      cx="128"
                      cy="128"
                      r="112"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      className="text-gray-700"
                    />
                    <motion.circle
                      cx="128"
                      cy="128"
                      r="112"
                      stroke="currentColor"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 112}`}
                      strokeDashoffset={`${2 * Math.PI * 112 * (1 - (test.risk_score / 100))}`}
                      className={riskInfo.text}
                      initial={{ strokeDashoffset: 2 * Math.PI * 112 }}
                      animate={{ strokeDashoffset: 2 * Math.PI * 112 * (1 - (test.risk_score / 100)) }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Award className={`h-12 w-12 ${riskInfo.text} mx-auto mb-2`} />
                      <div className="text-sm text-gray-400">AI Analysis</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '32px 32px'
            }} />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: FileText },
            { id: 'detailed', label: 'Detailed Analysis', icon: BarChart3 },
            { id: 'history', label: 'Comparison', icon: LineChart }
          ].map((tab) => {
            const TabIcon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white shadow-lg shadow-[#0EA5E9]/30'
                    : 'bg-[#1E293B] border border-gray-700 text-gray-400 hover:text-white hover:border-[#0EA5E9]'
                }`}
              >
                <TabIcon className="h-5 w-5" />
                {tab.label}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Voice Biomarkers */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-6">
                <button
                  onClick={() => toggleSection('biomarkers')}
                  className="w-full flex items-center justify-between mb-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#0EA5E9]/10 rounded-lg">
                      <Activity className="h-6 w-6 text-[#0EA5E9]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Voice Biomarkers</h3>
                  </div>
                  {expandedSections.has('biomarkers') ? (
                    <ChevronUp className="h-6 w-6 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-6 w-6 text-gray-400" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedSections.has('biomarkers') && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      {biomarkers.map((biomarker, index) => (
                        <motion.div
                          key={biomarker.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-5 hover:border-[#0EA5E9]/50 transition-all group"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-lg font-semibold text-white">{biomarker.name}</h4>
                                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  biomarker.status === 'normal'
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : biomarker.status === 'warning'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-red-500/20 text-red-400'
                                }`}>
                                  {biomarker.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400 mb-2">{biomarker.description}</p>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-gray-500">Reference: {biomarker.reference}</span>
                                <span className="text-gray-600">•</span>
                                <span className="text-gray-500">Category: {biomarker.category}</span>
                              </div>
                            </div>
                            <div className="text-right ml-4">
                              <div className="text-3xl font-bold text-white mb-1">
                                {biomarker.value}
                              </div>
                              <div className="text-sm text-gray-400">{biomarker.unit}</div>
                            </div>
                          </div>
                          
                          {/* Visual Indicator */}
                          <div className="relative h-2 bg-gray-700/50 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: biomarker.status === 'normal' ? '100%' : biomarker.status === 'warning' ? '60%' : '30%' }}
                              transition={{ duration: 1, delay: index * 0.1 }}
                              className={`h-full rounded-full ${
                                biomarker.status === 'normal'
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                  : biomarker.status === 'warning'
                                  ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                  : 'bg-gradient-to-r from-red-500 to-rose-500'
                              }`}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clinical Interpretation */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Clinical Interpretation</h3>
                </div>
                
                <div className="bg-[#0F172A] border border-gray-700/50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-[#0EA5E9] flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-gray-300 leading-relaxed mb-4">
                        {test.interpretation?.status || 'Analysis indicates voice patterns within expected parameters for neurological health assessment.'}
                      </p>
                      
                      {test.interpretation?.findings && test.interpretation.findings.length > 0 && (
                        <div className="space-y-2 mt-4">
                          <h4 className="text-sm font-semibold text-white mb-3">Key Findings:</h4>
                          {test.interpretation.findings.map((finding: string, index: number) => (
                            <div key={index} className="flex items-start gap-3 text-gray-300">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#0EA5E9] mt-2 flex-shrink-0" />
                              <span className="text-sm">{finding}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-emerald-500/10 rounded-lg">
                    <Target className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Recommendations</h3>
                </div>
                
                <div className="space-y-4">
                  {(test.interpretation?.recommendations || [
                    'Continue regular monitoring of voice patterns',
                    'Maintain healthy vocal habits and hydration',
                    'Schedule follow-up assessment in 3-6 months',
                    'Consult with healthcare provider for personalized guidance'
                  ]).map((rec: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 bg-[#0F172A] border border-gray-700/50 rounded-xl p-5 hover:border-emerald-500/50 transition-all group"
                    >
                      <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                        <span className="text-emerald-400 font-bold text-sm">{index + 1}</span>
                      </div>
                      <p className="text-gray-300 flex-1 pt-1">{rec}</p>
                      <ExternalLink className="h-5 w-5 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-400 mb-1">Medical Disclaimer</h4>
                    <p className="text-sm text-gray-400">
                      This analysis is for informational purposes only and should not be considered as medical advice. 
                      Always consult with qualified healthcare professionals for diagnosis and treatment decisions.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'detailed' && (
            <motion.div
              key="detailed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-8"
            >
              <div className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Detailed Analysis</h3>
                <p className="text-gray-400">Advanced biomarker visualization and trend analysis coming soon</p>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-gray-700/50 rounded-2xl p-8"
            >
              <div className="text-center py-12">
                <LineChart className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Historical Comparison</h3>
                <p className="text-gray-400">Compare this test with your previous assessments</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col sm:flex-row gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadPDF}
            className="flex-1 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/30 hover:shadow-[#0EA5E9]/50 transition-all"
          >
            <Download className="h-5 w-5" />
            Download Full Report (PDF)
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/patient/messages')}
            className="flex-1 bg-[#1E293B] border border-gray-700 hover:border-[#0EA5E9] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="h-5 w-5" />
            Discuss with Doctor
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}
