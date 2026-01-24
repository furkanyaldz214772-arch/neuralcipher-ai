'use client'

import { useEffect, useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    testsThisMonth: 0,
    testsLastMonth: 0,
    avgRiskScore: 0,
    riskDistribution: { normal: 0, warning: 0, risk: 0, high_risk: 0 },
    monthlyTests: [] as { month: string; count: number }[],
    topRiskPatients: [] as any[]
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/api/v1/doctor/analytics')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  const testGrowth = stats.testsLastMonth > 0 
    ? ((stats.testsThisMonth - stats.testsLastMonth) / stats.testsLastMonth * 100).toFixed(1)
    : '0'

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Professional Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Analytics Dashboard</h1>
          <p className="text-sm text-gray-400 font-roboto">Monitor patient trends and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Patients"
            value={stats.totalPatients}
            subtitle={`${stats.activePatients} active`}
            color="rgba(100, 255, 218, 0.6)"
          />
          <MetricCard
            title="Tests This Month"
            value={stats.testsThisMonth}
            subtitle={`${testGrowth}% ${Number(testGrowth) >= 0 ? '↑' : '↓'} vs last month`}
            color="rgba(132, 204, 22, 0.6)"
          />
          <MetricCard
            title="Average Risk"
            value={stats.avgRiskScore}
            subtitle="All patients"
            color="rgba(245, 158, 11, 0.6)"
          />
          <MetricCard
            title="High Risk"
            value={stats.riskDistribution.high_risk}
            subtitle="Urgent follow-up"
            color="rgba(236, 72, 153, 0.6)"
          />
        </div>

        {/* Risk Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
          <div className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-base font-sora font-semibold text-white mb-4">Risk Distribution</h3>
            <RiskDistributionChart distribution={stats.riskDistribution} />
          </div>

          <div className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <h3 className="text-base font-sora font-semibold text-white mb-4">Monthly Test Trend</h3>
            <MonthlyTestChart data={stats.monthlyTests} />
          </div>
        </div>

        {/* Top Risk Patients */}
        <div className="rounded-xl transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="p-6"
            style={{ borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}
          >
            <h3 className="text-base font-sora font-semibold text-white">High Risk Patients</h3>
          </div>
          <div>
            {stats.topRiskPatients.length === 0 ? (
              <div className="p-12 text-center">
                <p className="text-gray-400 font-roboto text-sm">No high risk patients</p>
              </div>
            ) : (
              stats.topRiskPatients.map((patient: any, index: number) => (
                <div 
                  key={patient.id} 
                  className="p-5 transition-all duration-200 hover:-translate-y-0.5 group cursor-pointer"
                  style={{ 
                    borderBottom: index < stats.topRiskPatients.length - 1 ? '1px solid rgba(100, 255, 218, 0.1)' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(100, 255, 218, 0.1)',
                          border: '1px solid rgba(100, 255, 218, 0.3)'
                        }}
                      >
                        <span className="text-electric-cyan font-bold">{patient.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-white font-sora group-hover:text-electric-cyan transition-colors">{patient.name}</div>
                        <div className="text-xs text-gray-400 font-roboto">Last test: {formatDate(patient.latest_test_date)}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-xl font-bold text-red-400 font-sora">{patient.risk_score}</div>
                        <div className="text-xs text-gray-500 font-roboto">Risk Score</div>
                      </div>
                      <button className="px-4 py-2 text-sm rounded-lg font-sora font-medium transition-all duration-200 hover:scale-105"
                        style={{
                          background: 'rgba(100, 255, 218, 0.15)',
                          border: '1px solid rgba(100, 255, 218, 0.4)',
                          color: '#64FFDA'
                        }}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function MetricCard({ title, value, subtitle, color }: any) {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg p-4 transition-all duration-200 hover:-translate-y-0.5"
      style={{ 
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
        <div className="text-2xl font-sora font-bold text-white mb-1">{value}</div>
        <div className="text-xs text-gray-500 font-roboto font-medium mb-1">{title}</div>
        <div className="text-xs text-gray-600 font-roboto">{subtitle}</div>
      </div>
    </div>
  )
}

function RiskDistributionChart({ distribution }: any) {
  const total = Object.values(distribution).reduce((sum: number, val: any) => sum + val, 0)
  
  const data = [
    { label: 'Normal', value: distribution.normal, color: 'rgba(132, 204, 22, 0.6)', percentage: (distribution.normal / total * 100).toFixed(0) },
    { label: 'Warning', value: distribution.warning, color: 'rgba(245, 158, 11, 0.6)', percentage: (distribution.warning / total * 100).toFixed(0) },
    { label: 'Risk', value: distribution.risk, color: 'rgba(251, 146, 60, 0.6)', percentage: (distribution.risk / total * 100).toFixed(0) },
    { label: 'High Risk', value: distribution.high_risk, color: 'rgba(236, 72, 153, 0.6)', percentage: (distribution.high_risk / total * 100).toFixed(0) }
  ]

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.label}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-400 font-roboto">{item.label}</span>
            <span className="text-xs text-gray-500 font-roboto">{item.value} patients ({item.percentage}%)</span>
          </div>
          <div className="w-full rounded-full h-2"
            style={{ background: 'rgba(100, 255, 218, 0.1)' }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${item.percentage}%`,
                background: item.color
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function MonthlyTestChart({ data }: any) {
  if (!data || data.length === 0) {
    return <div className="text-center py-8 text-gray-500 font-roboto text-sm">No data available</div>
  }

  const maxCount = Math.max(...data.map((d: any) => d.count))

  return (
    <div className="space-y-3">
      {data.map((item: any) => (
        <div key={item.month}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-gray-400 font-roboto">{item.month}</span>
            <span className="text-xs text-gray-500 font-roboto">{item.count} tests</span>
          </div>
          <div className="w-full rounded-full h-2"
            style={{ background: 'rgba(100, 255, 218, 0.1)' }}
          >
            <div
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(item.count / maxCount * 100)}%`,
                background: 'rgba(100, 255, 218, 0.6)'
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
}
