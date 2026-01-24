/**
 * Hospital - Medical Staff Page
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'

export default function HospitalStaffPage() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'hospital')) {
      router.push('/auth/login')
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-[#0A0E27] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Medical Staff</h1>
          <p className="text-gray-400">Manage doctors, nurses, and medical personnel</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">45</div>
            <div className="text-sm text-gray-400">Doctors</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">42</div>
            <div className="text-sm text-gray-400">Nurses</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-3xl font-bold text-white mb-1">87</div>
            <div className="text-sm text-gray-400">Total Staff</div>
          </div>
        </div>

        {/* Staff Table */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/60 border-b border-cyan-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Staff ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Role</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Department</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 'DR-001', name: 'Dr. Smith', role: 'Doctor', dept: 'Neurology' },
                { id: 'DR-002', name: 'Dr. Johnson', role: 'Doctor', dept: 'Neurology' },
                { id: 'NR-001', name: 'Nurse Williams', role: 'Nurse', dept: 'General' },
                { id: 'DR-003', name: 'Dr. Brown', role: 'Doctor', dept: 'Neurology' },
                { id: 'NR-002', name: 'Nurse Davis', role: 'Nurse', dept: 'General' },
              ].map((staff, i) => (
                <tr key={i} className="border-b border-cyan-500/5 hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">{staff.id}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">{staff.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{staff.role}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{staff.dept}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/hospital/staff/${staff.id}`}
                      className="text-cyan-500 hover:text-cyan-400 text-sm font-semibold"
                    >
                      View Profile
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
