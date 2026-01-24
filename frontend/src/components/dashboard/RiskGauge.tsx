/**
 * NeuralCipher.ai - Premium Risk Assessment Component
 * Ultra Professional Corporate Design
 */
'use client'

import { useRouter } from 'next/navigation'
import type { VoiceTest } from '@/types'

interface RiskGaugeProps {
  test: VoiceTest | null
}

export default function RiskGauge({ test }: RiskGaugeProps) {
  const router = useRouter()

  if (!test) {
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
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-electric-cyan to-azure-start"
              style={{ boxShadow: '0 0 30px rgba(100, 255, 218, 0.4)' }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-sora font-bold text-white">Risk Assessment</h3>
              <p className="text-sm text-gray-400 font-roboto">AI-powered analysis</p>
            </div>
          </div>
          
          <div className="px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-gray-400 border border-gray-700">
            NO DATA
          </div>
        </div>

        {/* Empty State */}
        <div className="text-center py-12">
          <div 
            className="w-24 h-24 mx-auto mb-6 rounded-2xl flex items-center justify-center bg-gradient-to-br from-electric-cyan/10 to-azure-start/10 border-2 border-electric-cyan/30"
            style={{ boxShadow: '0 0 40px rgba(100, 255, 218, 0.2)' }}
          >
            <svg className="w-12 h-12 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          
          <h4 className="text-lg font-sora font-semibold text-white mb-2">No Tests Yet</h4>
          <p className="text-sm text-gray-400 font-roboto mb-6 max-w-xs mx-auto">
            Take your first voice test to see your personalized risk assessment
          </p>
          
          <button
            onClick={() => router.push('/test/new')}
            className="px-6 py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 100%)',
              color: '#0A0E27',
              boxShadow: '0 8px 25px rgba(100, 255, 218, 0.4)'
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span>Take First Test</span>
          </button>
        </div>
      </div>
    )
  }

  const riskScore = test.risk_score
  const riskLevel = getRiskLevel(riskScore)
  const riskColor = getRiskColor(riskScore)
  const riskGradient = getRiskGradient(riskScore)

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
            className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${riskGradient}`}
            style={{ boxShadow: `0 0 30px ${riskColor}40` }}
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-sora font-bold text-white">Risk Assessment</h3>
            <p className="text-sm text-gray-400 font-roboto">Latest analysis results</p>
          </div>
        </div>
        
        <div 
          className={`px-3 py-1 rounded-full text-xs font-bold border-2`}
          style={{
            background: `${riskColor}20`,
            borderColor: `${riskColor}60`,
            color: riskColor,
            boxShadow: `0 0 20px ${riskColor}30`
          }}
        >
          {riskLevel.toUpperCase()}
        </div>
      </div>

      {/* Main Risk Display */}
      <div className="relative mb-8">
        {/* Circular Progress */}
        <div className="relative w-48 h-48 mx-auto">
          {/* Background Circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="rgba(100, 255, 218, 0.1)"
              strokeWidth="12"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke={riskColor}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${(riskScore / 100) * 553} 553`}
              style={{
                filter: `drop-shadow(0 0 10px ${riskColor})`,
                transition: 'stroke-dasharray 1s ease-in-out'
              }}
            />
          </svg>

          {/* Center Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className={`text-6xl font-sora font-black mb-2`} style={{ color: riskColor }}>
              {riskScore}
            </div>
            <div className="text-sm text-gray-400 font-roboto font-medium">RISK SCORE</div>
            <div className="mt-2 px-3 py-1 rounded-full text-xs font-bold" style={{
              background: `${riskColor}15`,
              color: riskColor
            }}>
              {riskLevel}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <RiskIndicator
          label="Low"
          range="0-30"
          active={riskScore < 30}
          color="#84CC16"
        />
        <RiskIndicator
          label="Medium"
          range="30-60"
          active={riskScore >= 30 && riskScore < 60}
          color="#F59E0B"
        />
        <RiskIndicator
          label="High"
          range="60-100"
          active={riskScore >= 60}
          color="#EC4899"
        />
      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push(`/results/${test.id}`)}
        className="w-full py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        style={{
          background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 100%)',
          color: '#0A0E27',
          boxShadow: '0 8px 25px rgba(100, 255, 218, 0.4)'
        }}
      >
        <span>View Full Report</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

function RiskIndicator({ label, range, active, color }: any) {
  return (
    <div 
      className={`p-3 rounded-lg text-center transition-all duration-300 ${active ? 'scale-105' : 'opacity-50'}`}
      style={{
        background: active ? `${color}15` : 'rgba(15, 23, 42, 0.5)',
        border: `2px solid ${active ? color + '60' : 'rgba(100, 255, 218, 0.2)'}`,
        boxShadow: active ? `0 0 20px ${color}30` : 'none'
      }}
    >
      <div className={`text-xs font-bold mb-1`} style={{ color: active ? color : '#9CA3AF' }}>
        {label}
      </div>
      <div className="text-xs text-gray-500 font-roboto">{range}</div>
    </div>
  )
}

function getRiskLevel(score: number): string {
  if (score < 30) return 'Low Risk'
  if (score < 60) return 'Medium Risk'
  return 'High Risk'
}

function getRiskColor(score: number): string {
  if (score < 30) return '#84CC16'
  if (score < 60) return '#F59E0B'
  return '#EC4899'
}

function getRiskGradient(score: number): string {
  if (score < 30) return 'from-lime-green to-electric-cyan'
  if (score < 60) return 'from-sunset-orange to-vibrant-pink'
  return 'from-vibrant-pink to-red-500'
}
