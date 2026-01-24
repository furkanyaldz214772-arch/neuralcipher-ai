/**
 * Hospital - All Patients Page
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Link from 'next/link'

export default function HospitalPatientsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">All Patients</h1>
          <p className="text-gray-400">Manage and view all registered patients</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6 mb-6">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search patients..."
              className="flex-1 bg-slate-900/60 border border-cyan-500/20 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50"
            />
            <button 
              onClick={() => {
                alert('Search functionality will be implemented with backend API')
              }}
              className="px-6 py-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-500 font-semibold transition-all"
            >
              Search
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-900/60 border-b border-cyan-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Patient ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Age</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Last Test</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-cyan-500/5 hover:bg-slate-900/40 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-300">PT-{1000 + i}</td>
                  <td className="px-6 py-4 text-sm text-white font-medium">Patient {i}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{50 + i}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">2 days ago</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 rounded-full text-xs font-semibold">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/hospital/patients/PT-${1000 + i}`}
                      className="text-cyan-500 hover:text-cyan-400 text-sm font-semibold"
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
