'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, User, Mail, Phone, Calendar, Activity, 
  TrendingUp, TrendingDown, Minus, FileText, Clock,
  AlertCircle, CheckCircle, AlertTriangle
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PatientDetail {
  id: string
  name: string
  email: string
  phone: string | null
  date_of_birth: string | null
  profile_photo_url: string | null
  total_tests: number
  avg_risk_score: number | null
  last_test_date: string | null
  last_risk_score: number | null
  last_risk_level: 'LOW' | 'MODERATE' | 'HIGH' | null
  access_key: string
}

interface Test {
  id: string
  risk_score: number
  risk_level: 'LOW' | 'MODERATE' | 'HIGH'
  created_at: string
  duration: number
}

export default function PatientDetailPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id as string

  const [patient, setPatient] = useState<PatientDetail | null>(null)
  const [tests, setTests] = useState<Test[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPatientDetails()
  }, [patientId])

  const fetchPatientDetails = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/v1/doctor/patients/${patientId}`)
      // const data = await response.json()
      
      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setPatient({
        id: patientId,
        name: 'John Smith',
        email: 'john@example.com',
        phone: '+1-555-0101',
        date_of_birth: '1965-03-15',
        profile_photo_url: null,
        total_tests: 12,
        avg_risk_score: 68.5,
        last_test_date: '2026-01-27T10:30:00Z',
        last_risk_score: 78,
        last_risk_level: 'HIGH',
        access_key: 'ABCD-EFGH-JKLM'
      })

      setTests([
        {
          id: '1',
          risk_score: 78,
          risk_level: 'HIGH',
          created_at: '2026-01-27T10:30:00Z',
          duration: 45
        },
        {
          id: '2',
          risk_score: 65,
          risk_level: 'MODERATE',
          created_at: '2026-01-20T14:15:00Z',
          duration: 42
        },
        {
          id: '3',
          risk_score: 72,
          risk_level: 'HIGH',
          created_at: '2026-01-13T09:45:00Z',
          duration: 48
        }
      ])
    } catch (err) {
      setError('Failed to load patient details')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-emerald-400 bg-emerald-500/10'
      case 'MODERATE': return 'text-yellow-400 bg-yellow-500/10'
      case 'HIGH': return 'text-red-400 bg-red-500/10'
      default: return 'text-gray-400 bg-gray-500/10'
    }
  }

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="h-5 w-5" />
      case 'MODERATE': return <AlertTriangle className="h-5 w-5" />
      case 'HIGH': return <AlertCircle className="h-5 w-5" />
      default: return <Minus className="h-5 w-5" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0EA5E9] mx-auto mb-4"></div>
          <p className="text-gray-400">Loading patient details...</p>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Patient Not Found</h2>
          <p className="text-gray-400 mb-6">{error || 'Unable to load patient details'}</p>
          <Link
            href="/doctor/patients"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0EA5E9] text-white rounded-xl font-semibold hover:bg-[#0284C7] transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Patients
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
          href="/doctor/patients"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Patients
        </Link>

        {/* Patient Header */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Profile Photo */}
            <div className="relative w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
              {patient.profile_photo_url ? (
                <Image
                  src={patient.profile_photo_url}
                  alt={patient.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold text-2xl">
                  {getInitials(patient.name)}
                </div>
              )}
            </div>

            {/* Patient Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{patient.name}</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{patient.email}</span>
                </div>
                
                {patient.phone && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{patient.phone}</span>
                  </div>
                )}
                
                {patient.date_of_birth && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Born {new Date(patient.date_of_birth).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Badge */}
            {patient.last_risk_level && (
              <div className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 ${getRiskColor(patient.last_risk_level)}`}>
                {getRiskIcon(patient.last_risk_level)}
                <span>{patient.last_risk_level} RISK</span>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#0EA5E9]/10 rounded-lg">
                <FileText className="h-6 w-6 text-[#0EA5E9]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Total Tests</p>
                <p className="text-2xl font-bold text-white">{patient.total_tests}</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Avg Risk Score</p>
                <p className="text-2xl font-bold text-white">
                  {patient.avg_risk_score ? `${patient.avg_risk_score.toFixed(1)}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Last Risk Score</p>
                <p className="text-2xl font-bold text-white">
                  {patient.last_risk_score ? `${patient.last_risk_score}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Last Test</p>
                <p className="text-sm font-semibold text-white">
                  {patient.last_test_date ? formatDate(patient.last_test_date) : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test History */}
        <div className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Test History</h2>
          
          {tests.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No tests recorded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tests.map((test) => (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${getRiskColor(test.risk_level)}`}>
                        {getRiskIcon(test.risk_level)}
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-white font-semibold">
                            Risk Score: {test.risk_score}%
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-sm font-medium ${getRiskColor(test.risk_level)}`}>
                            {test.risk_level}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(test.created_at)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {test.duration}s
                          </span>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/doctor/tests/${test.id}`}
                      className="px-4 py-2 bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg transition-colors font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
