'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, User, Calendar, Clock, Activity, 
  TrendingUp, AlertCircle, CheckCircle, AlertTriangle,
  Download, FileText, Waves
} from 'lucide-react'
import Link from 'next/link'

interface TestDetail {
  id: string
  patient_name: string
  patient_id: string
  risk_score: number
  risk_level: 'LOW' | 'MODERATE' | 'HIGH'
  created_at: string
  duration: number
  biomarkers: {
    jitter: number
    shimmer: number
    hnr: number
    pitch_variability: number
    voice_breaks: number
    tremor_intensity: number
  }
}

export default function TestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  const [test, setTest] = useState<TestDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchTestDetails()
  }, [testId])

  const fetchTestDetails = async () => {
    try {
      setIsLoading(true)
      
      // Mock data - replace with API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock test data based on ID
      const mockTests: Record<string, TestDetail> = {
        '1': {
          id: '1',
          patient_name: 'John Smith',
          patient_id: '1',
          risk_score: 78,
          risk_level: 'HIGH',
          created_at: '2026-01-27T10:30:00Z',
          duration: 45,
          biomarkers: {
            jitter: 0.0045,
            shimmer: 0.032,
            hnr: 18.5,
            pitch_variability: 12.3,
            voice_breaks: 8,
            tremor_intensity: 0.68
          }
        },
        '2': {
          id: '2',
          patient_name: 'Emma Wilson',
          patient_id: '2',
          risk_score: 45,
          risk_level: 'MODERATE',
          created_at: '2026-01-26T14:15:00Z',
          duration: 42,
          biomarkers: {
            jitter: 0.0028,
            shimmer: 0.021,
            hnr: 22.1,
            pitch_variability: 8.7,
            voice_breaks: 4,
            tremor_intensity: 0.42
          }
        },
        '3': {
          id: '3',
          patient_name: 'Michael Brown',
          patient_id: '3',
          risk_score: 22,
          risk_level: 'LOW',
          created_at: '2026-01-25T09:45:00Z',
          duration: 48,
          biomarkers: {
            jitter: 0.0015,
            shimmer: 0.015,
            hnr: 25.8,
            pitch_variability: 5.2,
            voice_breaks: 2,
            tremor_intensity: 0.18
          }
        }
      }

      setTest(mockTests[testId] || mockTests['1'])
    } catch (error) {
      console.error('Failed to fetch test details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      case 'MODERATE': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
      case 'HIGH': return 'text-red-400 bg-red-500/10 border-red-500/30'
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/30'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="h-6 w-6" />
      case 'MODERATE': return <AlertTriangle className="h-6 w-6" />
      case 'HIGH': return <AlertCircle className="h-6 w-6" />
      default: return null
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EA5E9] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading test details...</p>
        </div>
      </div>
    )
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Test Not Found</h2>
          <p className="text-gray-400 mb-6">Unable to load test details</p>
          <Link
            href="/doctor/tests"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] text-white rounded-xl font-semibold hover:bg-[#0284C7] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Tests
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back Button */}
        <Link
          href="/doctor/tests"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Tests
        </Link>

        {/* Header */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{test.patient_name}</h1>
                <Link
                  href={`/doctor/patients/${test.patient_id}`}
                  className="text-[#0EA5E9] hover:text-[#0284C7] transition-colors text-sm"
                >
                  View Patient →
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-gray-300">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(test.created_at)}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {test.duration}s duration
                </span>
                <span className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Voice Analysis
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className={`px-6 py-3 rounded-xl border font-semibold flex items-center gap-2 ${getRiskColor(test.risk_level)}`}>
                {getRiskIcon(test.risk_level)}
                <span>{test.risk_score}% Risk</span>
              </div>
              <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-xl transition-colors">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-4">Risk Assessment</h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">Overall Risk Score</span>
                <span className="text-white font-semibold">{test.risk_score}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    test.risk_level === 'HIGH' ? 'bg-red-500' :
                    test.risk_level === 'MODERATE' ? 'bg-yellow-500' :
                    'bg-emerald-500'
                  }`}
                  style={{ width: `${test.risk_score}%` }}
                />
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${getRiskColor(test.risk_level)}`}>
              <div className="flex items-start gap-3">
                {getRiskIcon(test.risk_level)}
                <div>
                  <h3 className="font-semibold mb-1">{test.risk_level} Risk Level</h3>
                  <p className="text-sm opacity-90">
                    {test.risk_level === 'HIGH' && 'Immediate medical attention recommended. Multiple biomarkers indicate significant risk.'}
                    {test.risk_level === 'MODERATE' && 'Regular monitoring advised. Some biomarkers show moderate deviation from normal ranges.'}
                    {test.risk_level === 'LOW' && 'No immediate concerns. Biomarkers within normal ranges. Continue regular checkups.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Biomarkers */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Voice Biomarkers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Jitter */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="h-5 w-5 text-[#0EA5E9]" />
                <h3 className="font-semibold text-white">Jitter</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.jitter.toFixed(4)}</p>
              <p className="text-sm text-gray-400">Frequency variation</p>
            </div>

            {/* Shimmer */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-purple-400" />
                <h3 className="font-semibold text-white">Shimmer</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.shimmer.toFixed(3)}</p>
              <p className="text-sm text-gray-400">Amplitude variation</p>
            </div>

            {/* HNR */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                <h3 className="font-semibold text-white">HNR</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.hnr.toFixed(1)} dB</p>
              <p className="text-sm text-gray-400">Harmonic-to-noise ratio</p>
            </div>

            {/* Pitch Variability */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5 text-yellow-400" />
                <h3 className="font-semibold text-white">Pitch Variability</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.pitch_variability.toFixed(1)}%</p>
              <p className="text-sm text-gray-400">Pitch fluctuation</p>
            </div>

            {/* Voice Breaks */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                <h3 className="font-semibold text-white">Voice Breaks</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.voice_breaks}</p>
              <p className="text-sm text-gray-400">Interruptions detected</p>
            </div>

            {/* Tremor Intensity */}
            <div className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Waves className="h-5 w-5 text-red-400" />
                <h3 className="font-semibold text-white">Tremor Intensity</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{test.biomarkers.tremor_intensity.toFixed(2)}</p>
              <p className="text-sm text-gray-400">Tremor magnitude</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
