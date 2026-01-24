/**
 * NeuralCipher.ai - Ultra Modern Professional Dashboard
 * COMPLETELY REDESIGNED - Premium Startup Design
 */
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import RiskGauge from '@/components/dashboard/RiskGauge'
import TrendChart from '@/components/dashboard/TrendChart'
import QuickActions from '@/components/dashboard/QuickActions'
import RecentTests from '@/components/dashboard/RecentTests'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'
import type { VoiceTest } from '@/types'

export default function DashboardPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [latestTest, setLatestTest] = useState<VoiceTest | null>(null)
  const [recentTests, setRecentTests] = useState<VoiceTest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication first
    if (!isAuthenticated && !localStorage.getItem('access_token')) {
      router.replace('/auth/login')
      return
    }

    if (user) {
      if (user.role === 'admin') {
        router.replace('/admin/dashboard')
        return
      } else if (user.role === 'doctor') {
        router.replace('/doctor/dashboard')
        return
      }
    }
  }, [user, isAuthenticated, router])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [latestResponse, recentResponse] = await Promise.all([
        api.get('/api/v1/tests/latest').catch(() => ({ data: null })),
        api.get('/api/v1/tests?limit=5').catch(() => ({ data: [] }))
      ])
      
      setLatestTest(latestResponse.data)
      setRecentTests(recentResponse.data)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
      // Set empty data on error
      setLatestTest(null)
      setRecentTests([])
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-neon-glow border-t-transparent rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen relative">
        {/* MEGA Animated Background */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-20">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-electric-cyan via-azure-start to-neon-glow rounded-full blur-[150px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-vibrant-pink via-sunset-orange to-neon-glow rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-neon-glow to-azure-start rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
          {/* Ultra Professional Compact Hero Section */}
          <div className="mb-6">
            <div className="relative overflow-hidden rounded-xl p-4" style={{
              background: 'rgba(15, 23, 42, 0.4)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              backdropFilter: 'blur(10px)'
            }}>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-400 font-roboto">
                    <span className="text-white font-sora font-semibold">Welcome back</span>, {user?.email?.split('@')[0]}
                  </div>
                </div>

                <button
                  onClick={() => router.push('/test/new')}
                  className="px-5 py-2 rounded-lg font-sora font-medium text-sm transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.3)',
                    color: '#64FFDA'
                  }}
                >
                  New Test
                </button>
              </div>
            </div>
          </div>

          {/* Ultra Minimal Professional Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MinimalStatCard
              label="Latest Test"
              value={latestTest ? formatDate(latestTest.test_date) : 'No tests'}
              color="rgba(100, 255, 218, 0.6)"
              index={0}
            />
            <MinimalStatCard
              label="Risk Score"
              value={latestTest ? `${latestTest.risk_score}%` : '-'}
              color={getRiskColorHex(latestTest?.risk_score)}
              index={1}
            />
            <MinimalStatCard
              label="Total Tests"
              value={recentTests.length.toString()}
              color="rgba(139, 92, 246, 0.6)"
              index={2}
            />
            <MinimalStatCard
              label="Next Test"
              value={getNextTestDate()}
              color="rgba(132, 204, 22, 0.6)"
              index={3}
            />
          </div>

          {/* Main Content Grid - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {/* Risk Gauge - Enhanced */}
            <div className="relative">
              <RiskGauge test={latestTest} />
            </div>

            {/* Trend Chart - Enhanced */}
            <div className="relative">
              <TrendChart tests={recentTests} />
            </div>
          </div>

          {/* Quick Actions - Enhanced */}
          <div className="mb-10">
            <QuickActions />
          </div>

          {/* Recent Tests - Enhanced */}
          <RecentTests tests={recentTests} />
        </div>
      </div>
    </DashboardLayout>
  )
}

// ULTRA MINIMAL PROFESSIONAL STAT CARD
function MinimalStatCard({ label, value, color, index = 0 }: any) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg p-3 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in"
      style={{ 
        animationDelay: `${index * 50}ms`,
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(100, 255, 218, 0.1)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Subtle left border accent */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: color }}
      ></div>

      <div className="relative z-10 pl-2">
        <p className="text-xs text-gray-500 font-roboto font-medium mb-1">
          {label}
        </p>
        <p className="text-xl font-sora font-bold text-white">
          {value}
        </p>
      </div>
    </div>
  )
}

function getRiskColorHex(score?: number): string {
  if (!score) return 'rgba(100, 255, 218, 0.6)'
  if (score < 30) return 'rgba(132, 204, 22, 0.6)'
  if (score < 60) return 'rgba(245, 158, 11, 0.6)'
  return 'rgba(236, 72, 153, 0.6)'
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}

function getRiskColor(score?: number) {
  if (!score) return 'text-white'
  if (score < 30) return 'text-lime-green'
  if (score < 60) return 'text-sunset-orange'
  return 'text-vibrant-pink'
}

function getNextTestDate() {
  const nextDate = new Date()
  nextDate.setDate(nextDate.getDate() + 7)
  return formatDate(nextDate.toISOString())
}
