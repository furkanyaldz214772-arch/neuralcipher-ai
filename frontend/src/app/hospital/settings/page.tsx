'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { Settings, Building2, Bell, Shield, Users } from 'lucide-react'

export default function HospitalSettingsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    // ✅ FIX: Backend returns role in UPPERCASE, normalize for comparison
    if (user && user.role?.toUpperCase() !== 'HOSPITAL') {
      const roleUpper = user.role?.toUpperCase()
      if (roleUpper === 'PATIENT') {
        router.replace('/patient/dashboard')
      } else if (roleUpper === 'DOCTOR') {
        router.replace('/doctor/dashboard')
      } else if (roleUpper === 'ADMIN') {
        router.replace('/neural-control-center/dashboard')
      } else {
        router.replace('/auth/login')
      }
      return
    }

    setLoading(false)
  }, [user, isAuthenticated, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Settings className="w-8 h-8 text-cyan-400" />
            Hospital Settings
          </h1>
          <p className="text-gray-400">Configure hospital preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Building2 className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Hospital Profile</h3>
            <p className="text-gray-400 text-sm">Manage hospital information and branding</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Users className="w-8 h-8 text-blue-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Staff Management</h3>
            <p className="text-gray-400 text-sm">Configure staff roles and permissions</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Bell className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Notifications</h3>
            <p className="text-gray-400 text-sm">Manage notification preferences</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <Shield className="w-8 h-8 text-green-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Security</h3>
            <p className="text-gray-400 text-sm">Configure security and privacy settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}
