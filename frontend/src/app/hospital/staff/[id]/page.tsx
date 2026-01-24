/**
 * Hospital - Doctor Detail Page
 * View doctor profile and their patients
 */
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'

interface Doctor {
  id: string
  name: string
  specialization: string
  email: string
  phone: string
  license: string
  joinDate: string
  totalPatients: number
  activePatients: number
  testsCompleted: number
}

interface Patient {
  id: string
  name: string
  age: number
  lastTest: string
  riskScore: number
  status: 'active' | 'inactive'
}

export default function DoctorDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { user, isLoading } = useAuthStore()
  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])

  useEffect(() => {
    if (!isLoading) {
      if (!user || user.role !== 'hospital') {
        router.push('/auth/login')
        return
      }
      // Mock data - replace with API call
      setDoctor({
        id: params.id as string,
        name: 'Dr. John Smith',
        specialization: 'Neurology',
        email: 'dr.smith@hospital.com',
        phone: '+1 (555) 123-4567',
        license: 'MD-12345',
        joinDate: 'January 15, 2023',
        totalPatients: 45,
        activePatients: 38,
        testsCompleted: 234
      })

      setPatients([
        { id: 'PT-1001', name: 'John Doe', age: 65, lastTest: '2 days ago', riskScore: 72, status: 'active' },
        { id: 'PT-1002', name: 'Jane Smith', age: 58, lastTest: '5 days ago', riskScore: 45, status: 'active' },
        { id: 'PT-1003', name: 'Bob Johnson', age: 71, lastTest: '1 week ago', riskScore: 88, status: 'active' },
        { id: 'PT-1004', name: 'Alice Brown', age: 62, lastTest: '3 days ago', riskScore: 34, status: 'active' },
        { id: 'PT-1005', name: 'Charlie Wilson', age: 69, lastTest: '4 days ago', riskScore: 56, status: 'active' },
      ])
    }
  }, [user, isLoading, router, params.id])

  if (isLoading || !user || !doctor) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const getRiskColor = (score: number) => {
    if (score >= 70) return 'text-red-400 bg-red-500/10'
    if (score >= 40) return 'text-yellow-400 bg-yellow-500/10'
    return 'text-green-400 bg-green-500/10'
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Back Button */}
        <Link 
          href="/hospital/staff"
          className="inline-flex items-center gap-2 text-cyan-500 hover:text-cyan-400 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Staff
        </Link>

        {/* Doctor Profile Card */}
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
              <h1 className="text-3xl font-bold text-white mb-2">{doctor.name}</h1>
              <p className="text-cyan-500 text-lg mb-4">{doctor.specialization}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Email</div>
                  <div className="text-white">{doctor.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Phone</div>
                  <div className="text-white">{doctor.phone}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">License Number</div>
                  <div className="text-white">{doctor.license}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Join Date</div>
                  <div className="text-white">{doctor.joinDate}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-white mb-1">{doctor.totalPatients}</div>
                  <div className="text-sm text-gray-400">Total Patients</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-white mb-1">{doctor.activePatients}</div>
                  <div className="text-sm text-gray-400">Active Patients</div>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-4 border border-cyan-500/10">
                  <div className="text-2xl font-bold text-white mb-1">{doctor.testsCompleted}</div>
                  <div className="text-sm text-gray-400">Tests Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor's Patients */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-cyan-500/10">
            <h2 className="text-2xl font-bold text-white">Doctor's Patients</h2>
            <p className="text-gray-400 mt-1">All patients assigned to this doctor</p>
          </div>

          <table className="w-full">
            <thead className="bg-slate-900/60 border-b border-cyan-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Patient ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Test</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Risk Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-cyan-500/5 hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">{patient.id}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{patient.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{patient.age}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{patient.lastTest}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(patient.riskScore)}`}>
                      {patient.riskScore}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-semibold capitalize">
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/hospital/patients/${patient.id}`}
                      className="text-cyan-500 hover:text-cyan-400 text-sm font-semibold transition-colors"
                    >
                      View Details
                    </Link>
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
