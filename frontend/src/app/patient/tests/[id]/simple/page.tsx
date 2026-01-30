'use client'

import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function SimpleTestViewPage() {
  const params = useParams()
  const router = useRouter()
  const testId = params.id as string

  useEffect(() => {
    // Automatically redirect to the detailed view
    router.replace(`/patient/tests/${testId}`)
  }, [testId, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0EA5E9] mx-auto mb-4"></div>
        <p className="text-white text-lg">Redirecting to detailed view...</p>
      </div>
    </div>
  )
}
