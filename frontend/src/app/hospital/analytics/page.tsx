/**
 * Hospital - Analytics Page
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import Sidebar from '@/components/layout/Sidebar'

export default function HospitalAnalyticsPage() {
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
    <div className="flex min-h-screen bg-[#0A0E27]">
      <Sidebar />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Analytics & Reports</h1>
          <p className="text-gray-400">View detailed analytics and generate reports</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Total Tests</div>
            <div className="text-3xl font-bold text-white">4,567</div>
            <div className="text-xs text-cyan-500 mt-2">+18% this month</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Avg. Accuracy</div>
            <div className="text-3xl font-bold text-white">94.2%</div>
            <div className="text-xs text-cyan-500 mt-2">+2.1% improvement</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Active Patients</div>
            <div className="text-3xl font-bold text-white">1,247</div>
            <div className="text-xs text-cyan-500 mt-2">+12% growth</div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="text-sm text-gray-400 mb-2">Response Time</div>
            <div className="text-3xl font-bold text-white">2.3s</div>
            <div className="text-xs text-cyan-500 mt-2">-0.5s faster</div>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Tests Over Time</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart visualization coming soon
            </div>
          </div>
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Patient Demographics</h2>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Chart visualization coming soon
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
