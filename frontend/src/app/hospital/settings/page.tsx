/**
 * Hospital - Settings Page
 */
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function HospitalSettingsPage() {
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
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage hospital configuration and preferences</p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {/* Hospital Information */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Hospital Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Hospital Name</label>
                <input
                  type="text"
                  defaultValue="General Hospital"
                  className="w-full bg-slate-900/60 border border-cyan-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full bg-slate-900/60 border border-cyan-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 123-4567"
                  className="w-full bg-slate-900/60 border border-cyan-500/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-cyan-500/50"
                />
              </div>
            </div>
          </div>

          {/* System Preferences */}
          <div className="bg-slate-900/40 backdrop-blur-sm border border-cyan-500/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">System Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Email Notifications</div>
                  <div className="text-sm text-gray-400">Receive email alerts for important events</div>
                </div>
                <button className="w-12 h-6 bg-cyan-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">Auto Backup</div>
                  <div className="text-sm text-gray-400">Automatically backup data daily</div>
                </div>
                <button className="w-12 h-6 bg-cyan-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              onClick={() => {
                alert('Settings saved successfully!')
              }}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
