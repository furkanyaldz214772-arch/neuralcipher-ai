'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'

export default function NeuralControlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, isLoading } = useAuthStore()

  useEffect(() => {
    // Only check auth for dashboard pages, not the login page
    if (pathname?.includes('/dashboard')) {
      if (!isLoading && (!user || user.role !== 'ADMIN')) {
        router.push('/neural-control-center')
      }
    }
  }, [user, isLoading, router, pathname])

  // Show loading for dashboard pages
  if (pathname?.includes('/dashboard')) {
    if (isLoading) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] flex items-center justify-center">
          <div className="text-[#64FFDA] text-xl">Loading...</div>
        </div>
      )
    }

    if (!user || user.role !== 'ADMIN') {
      return null
    }
  }

  return <>{children}</>
}
