/**
 * NeuralCipher.ai - Premium Trend Chart Component
 * Ultra Professional Corporate Design
 */
'use client'

import { useRouter } from 'next/navigation'
import type { VoiceTest } from '@/types'

interface TrendChartProps {
  tests: VoiceTest[]
}

export default function TrendChart({ tests }: TrendChartProps) {
  const router = useRouter()

  if (!tests || tests.length < 2) {
    return (
      <div 
        className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-neon-lg"
        style={{
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
          border: '2px solid rgba(100, 255, 218, 0.5)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(100, 255, 218, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-neon-glow to-azure-start"
              style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-sora font-bold text-white">Risk Trend</h3>
              <p className="text-sm text-gray-400 font-roboto">Historical analysis</p>
            </div>
          </div>
          
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-gray-400 border border-gray-700">
            INSUFFICIENT DATA
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div 
            className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-neon-glow/10 to-azure-start/10 border-2 border-neon-glow/30"
            style={{ boxShadow: '0 0 40px rgba(139, 92, 246, 0.2)' }}
          >
            <svg className="w-12 h-12 text-neon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          
          <h4 className="text-lg font-sora font-semibold text-white mb-2">Not Enough Data</h4>
          <p className="text-sm text-gray-400 font-roboto mb-6 max-w-xs mx-auto">
            Take at least 2 tests to see your health trends over time
          </p>
          
          <button
            onClick={() => router.push('/test/new')}
            className="px-6 py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
              color: 'white',
              boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Add More Tests</span>
          </button>
        </div>
      </div>
    )
  }

  // Calculate trend data
  const sortedTests = [...tests].sort((a, b) => 
    new Date(a.test_date).getTime() - new Date(b.test_date).getTime()
  )
  
  const latestScore = sortedTests[sortedTests.length - 1].risk_score
  const previousScore = sortedTests[sortedTests.length - 2].risk_score
  const scoreDiff = latestScore - previousScore
  const trendDirection = scoreDiff > 0 ? 'up' : scoreDiff < 0 ? 'down' : 'stable'
  const trendColor = scoreDiff > 0 ? '#EC4899' : scoreDiff < 0 ? '#84CC16' : '#64FFDA'

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:shadow-neon-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '2px solid rgba(100, 255, 218, 0.5)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(100, 255, 218, 0.2)'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-neon-glow to-azure-start"
            style={{ boxShadow: '0 0 30px rgba(139, 92, 246, 0.4)' }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-sora font-bold text-white">Risk Trend</h3>
            <p className="text-sm text-gray-400 font-roboto">{tests.length} tests analyzed</p>
          </div>
        </div>
        
        <div 
          className="px-3 py-1 rounded-full text-xs font-bold border-2 flex items-center gap-1"
          style={{
            background: `${trendColor}20`,
            borderColor: `${trendColor}60`,
            color: trendColor,
            boxShadow: `0 0 20px ${trendColor}30`
          }}
        >
          {trendDirection === 'up' && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          )}
          {trendDirection === 'down' && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          {trendDirection === 'stable' && (
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14" />
            </svg>
          )}
          <span>{Math.abs(scoreDiff)}%</span>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="mb-6">
        <div className="h-32 flex items-end justify-between gap-2">
          {sortedTests.slice(-5).map((test, index) => {
            const height = (test.risk_score / 100) * 100
            const color = getRiskColor(test.risk_score)
            return (
              <div key={test.id} className="flex-1 flex flex-col items-center gap-2">
                <div 
                  className="w-full rounded-t-lg transition-all duration-500 hover:scale-105 cursor-pointer relative group/bar"
                  style={{
                    height: `${height}%`,
                    background: `linear-gradient(180deg, ${color} 0%, ${color}80 100%)`,
                    boxShadow: `0 0 20px ${color}40`,
                    minHeight: '20%'
                  }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity">
                    <div className="px-2 py-1 rounded bg-gray-900 text-white text-xs font-bold whitespace-nowrap">
                      {test.risk_score}%
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 font-roboto">
                  {formatDate(test.test_date)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <TrendStat
          label="Average"
          value={`${Math.round(tests.reduce((sum, t) => sum + t.risk_score, 0) / tests.length)}%`}
          color="#64FFDA"
        />
        <TrendStat
          label="Lowest"
          value={`${Math.min(...tests.map(t => t.risk_score))}%`}
          color="#84CC16"
        />
        <TrendStat
          label="Highest"
          value={`${Math.max(...tests.map(t => t.risk_score))}%`}
          color="#EC4899"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push('/history')}
        className="w-full py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #8B5CF6 0%, #3B82F6 100%)',
          color: 'white',
          boxShadow: '0 8px 25px rgba(139, 92, 246, 0.4)'
        }}
      >
        <span>View Full History</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

function TrendStat({ label, value, color }: any) {
  return (
    <div 
      className="p-3 rounded-lg text-center transition-all duration-300 hover:scale-105"
      style={{
        background: `${color}10`,
        border: `2px solid ${color}40`,
        boxShadow: `0 0 15px ${color}20`
      }}
    >
      <div className="text-xs text-gray-400 font-roboto mb-1">{label}</div>
      <div className="text-lg font-sora font-bold" style={{ color }}>{value}</div>
    </div>
  )
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function getRiskColor(score: number): string {
  if (score < 30) return '#84CC16'
  if (score < 60) return '#F59E0B'
  return '#EC4899'
}
