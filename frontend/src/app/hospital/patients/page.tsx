'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { Users, Search, Filter, AlertCircle, TrendingUp, Activity } from 'lucide-react'

export default function HospitalPatientsPage() {
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
        router.replace('/admin/dashboard')
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
            <Users className="w-8 h-8 text-cyan-400" />
            Patients Management
          </h1>
          <p className="text-gray-400">View and manage all hospital patients</p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-12 border border-white/10 text-center">
          <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Patients Management</h3>
          <p className="text-gray-400">Patient management features coming soon</p>
        </div>
      </div>
    </div>
  )
}
