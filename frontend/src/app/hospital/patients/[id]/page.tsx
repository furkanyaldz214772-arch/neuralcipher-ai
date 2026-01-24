/**
 * Hospital - Patient Detail Page
 * View patient profile and test history
 */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'

interface Patient {
  id: string
  name: string
  age: number
  email: string
  phone: string
  address: string
  assignedDoctor: string
  registrationDate: string
  totalTests: number
  lastTest: string
  averageRisk: number
}

interface Test {
  id: string
  date: string
  type: string
  riskScore: number
  status: 'completed' | 'pending' | 'processing'
  doctor: string
}

export default function PatientDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useAuthStore()
  const [patient, setPatient] = useState<Patient | null>(null)
  const [tests, setTests] = useState<Test[]>([])

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'hospital') {
        router.push('/auth/login')
        return
      }
      // Mock data - replace with API call
      setPatient({
        id: params.id as string,
        name: 'John Doe',
        age: 65,
        email: 'john.doe@email.com',
        phone: '+1 (555) 987-6543',
        address: '123 Main St, New York, NY 10001',
        assignedDoctor: 'Dr. John Smith',
        registrationDate: 'March 10, 2024',
        totalTests: 12,
        lastTest: '2 days ago',
        averageRisk: 58
      })

      setTests([
        { id: 'TEST-001', date: '2 days ago', type: 'Voice Analysis', riskScore: 72, status: 'completed', doctor: 'Dr. Smith' },
        { id: 'TEST-002', date: '1 week ago', type: 'Voice Analysis', riskScore: 68, status: 'completed', doctor: 'Dr. Smith' },
        { id: 'TEST-003', date: '2 weeks ago', type: 'Voice Analysis', riskScore: 55, status: 'completed', doctor: 'Dr. Smith' },
        { id: 'TEST-004', date: '3 weeks ago', type: 'Voice Analysis', riskScore: 51, status: 'completed', doctor: 'Dr. Smith' },
        { id: 'TEST-005', date: '1 month ago', type: 'Voice Analysis', riskScore: 48, status: 'completed', doctor: 'Dr. Smith' },
      ])
    }
  }, [user, isLoading, router, params.id])

  if (isLoading || !user || !patient) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-500/10 border-red-500/30'
    if (score >= 40) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30'
    return 'text-green-400 bg-green-500/10 border-green-500/30'
  }

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'bg-green-500/10 text-green-500'
    if (status === 'processing') return 'bg-yellow-500/10 text-yellow-500'
    return 'bg-gray-500/10 text-gray-500'
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Back Button */}
        <Link 
          href="/hospital/patients"
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Patients
        </Link>

        {/* Patient Profile Card */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-8 mb-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/30">
              <svg className="w-12 h-12 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">{patient.name}</h1>
                  <p className="text-gray-400">Patient ID: {patient.id}</p>
                </div>
                <div className={`px-4 py-2 rounded-lg border ${getRiskColor(patient.averageRisk)}`}>
                  <div className="text-xs mb-1">Average Risk</div>
                  <div className="text-2xl font-bold">{patient.averageRisk}%</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Age</div>
                  <div className="text-white">{patient.age} years</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div className="text-white">{patient.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div className="text-white">{patient.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Assigned Doctor</div>
                  <div className="text-white">{patient.assignedDoctor}</div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm text-gray-400 mb-1">Address</div>
                  <div className="text-white">{patient.address}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Registration Date</div>
                  <div className="text-white">{patient.registrationDate}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Last Test</div>
                  <div className="text-white">{patient.lastTest}</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-white mb-1">{patient.totalTests}</div>
                  <div className="text-sm text-gray-400">Total Tests</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-white mb-1">{patient.averageRisk}%</div>
                  <div className="text-sm text-gray-400">Avg Risk Score</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-cyan-500 mb-1">Active</div>
                  <div className="text-sm text-gray-400">Status</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Test History */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-cyan-500/10">
            <h2 className="text-2xl font-bold text-white">Test History</h2>
            <p className="text-gray-400 mt-1">All tests performed by this patient</p>
          </div>

          <table className="w-full">
            <thead className="bg-slate-900/60 border-b border-cyan-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Test ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Risk Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tests.map((test) => (
                <tr key={test.id} className="border-b border-cyan-500/5 hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">{test.id}</td>
                  <td className="px-6 py-4 text-sm text-white">{test.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{test.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(test.riskScore)}`}>
                      {test.riskScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{test.doctor}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => router.push(`/results/${test.id}`)}
                      className="text-cyan-500 hover:text-cyan-400 text-sm font-semibold transition-colors"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  )
}
