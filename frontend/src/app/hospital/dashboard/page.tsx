/**
 * Hospital Dashboard - Professional Minimal Design
 * Ultra Professional & Corporate Style - ONLY Cyan (#64FFDA)
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function HospitalDashboard() {
  const router = useRouter()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    // Backend returns role in UPPERCASE, normalize to lowercase
    const userRole = user?.role?.toLowerCase()
    
    if (!isLoading && (!user || userRole !== 'hospital')) {
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Hospital Dashboard
          </h1>
          <p className="text-gray-400">
            Welcome back, {user.email}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Patients */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">1,247</div>
            <div className="text-sm text-gray-400">Total Patients</div>
            <div className="mt-2 text-xs text-cyan-500">+12% from last month</div>
          </div>

          {/* Medical Staff */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">87</div>
            <div className="text-sm text-gray-400">Medical Staff</div>
            <div className="mt-2 text-xs text-cyan-500">45 Doctors, 42 Nurses</div>
          </div>

          {/* Tests Today */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">156</div>
            <div className="text-sm text-gray-400">Tests Today</div>
            <div className="mt-2 text-xs text-cyan-500">23 pending review</div>
          </div>

          {/* System Status */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">98.5%</div>
            <div className="text-sm text-gray-400">System Uptime</div>
            <div className="mt-2 text-xs text-cyan-500">All systems operational</div>
          </div>
        </div>

        {/* Recent Activity & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { action: 'New patient registered', time: '5 minutes ago', type: 'patient' },
                { action: 'Test completed by Dr. Smith', time: '12 minutes ago', type: 'test' },
                { action: 'Staff member added', time: '1 hour ago', type: 'staff' },
                { action: 'System backup completed', time: '2 hours ago', type: 'system' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-900/60 rounded-lg border border-cyan-500/5">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">{activity.action}</div>
                    <div className="text-xs text-gray-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-bold text-white">Quick Actions</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => router.push('/hospital/patients')}
                className="p-4 bg-slate-900/60 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl transition-all group"
              >
                <svg className="w-8 h-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <div className="text-sm font-semibold text-white">Add Patient</div>
              </button>

              <button 
                onClick={() => router.push('/hospital/staff')}
                className="p-4 bg-slate-900/60 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl transition-all group"
              >
                <svg className="w-8 h-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <div className="text-sm font-semibold text-white">Add Staff</div>
              </button>

              <button 
                onClick={() => router.push('/hospital/patients')}
                className="p-4 bg-slate-900/60 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl transition-all group"
              >
                <svg className="w-8 h-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="text-sm font-semibold text-white">View Reports</div>
              </button>

              <button 
                onClick={() => router.push('/hospital/settings')}
                className="p-4 bg-slate-900/60 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30 rounded-xl transition-all group"
              >
                <svg className="w-8 h-8 text-cyan-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-sm font-semibold text-white">Settings</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
