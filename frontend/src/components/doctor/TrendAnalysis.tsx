'use client'

import { useRouter } from 'next/navigation'
import type { VoiceTest } from '@/types'

interface TrendAnalysisProps {
  history: VoiceTest[]
}

export default function TrendAnalysis({ history }: TrendAnalysisProps) {
  const router = useRouter()

  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-600">Henüz test geçmişi yok</p>
      </div>
    )
  }

  const sortedTests = [...history].sort((a, b) => 
    new Date(a.test_date).getTime() - new Date(b.test_date).getTime()
  )

  // Calculate trend
  const recentTests = sortedTests.slice(-5)
  const avgRecent = recentTests.reduce((sum, t) => sum + t.risk_score, 0) / recentTests.length
  const firstScore = sortedTests[0].risk_score
  const lastScore = sortedTests[sortedTests.length - 1].risk_score
  const trend = lastScore - firstScore

  return (
    <div className="space-y-6">
      {/* Trend Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Trend</h3>
          <div className="flex items-center space-x-2">
            <span className={`text-3xl font-bold ${trend > 0 ? 'text-red-600' : trend < 0 ? 'text-green-600' : 'text-gray-600'}`}>
              {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}
            </span>
            <div>
              <div className={`text-2xl font-bold ${trend > 0 ? 'text-red-600' : trend < 0 ? 'text-green-600' : 'text-gray-600'}`}>
                {Math.abs(trend).toFixed(0)}
              </div>
              <div className="text-sm text-gray-500">
                {trend > 0 ? 'Artış' : trend < 0 ? 'Azalış' : 'Stabil'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Son 5 Test Ortalaması</h3>
          <div className="text-3xl font-bold text-gray-900">{avgRecent.toFixed(0)}</div>
          <div className="text-sm text-gray-500 mt-1">Risk skoru</div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Test Sıklığı</h3>
          <div className="text-3xl font-bold text-gray-900">
            {calculateTestFrequency(sortedTests)}
          </div>
          <div className="text-sm text-gray-500 mt-1">test/ay</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Skoru Trendi</h3>
        <TrendChart tests={sortedTests} />
      </div>

      {/* Test List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Tüm Testler</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedTests.reverse().map((test) => (
            <div
              key={test.id}
              onClick={() => router.push(`/results/${test.id}`)}
              className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${getRiskBg(test.risk_score)}`}>
                    <span className={`text-2xl font-bold ${getRiskColor(test.risk_score)}`}>
                      {test.risk_score}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {getTestLevelLabel(test.test_level)}
                    </div>
                    <div className="text-sm text-gray-600">
                      {formatDate(test.test_date)}
                    </div>
                    <div className="text-sm text-gray-500">
                      Güven: {(test.confidence * 100).toFixed(0)}%
                    </div>
                  </div>
                </div>
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function TrendChart({ tests }: { tests: VoiceTest[] }) {
  const maxScore = 100
  const chartHeight = 300
  const chartWidth = 800
  const padding = 60

  const points = tests.map((test, index) => {
    const x = padding + (index / (tests.length - 1)) * (chartWidth - 2 * padding)
    const y = chartHeight - padding - (test.risk_score / maxScore) * (chartHeight - 2 * padding)
    return { x, y, score: test.risk_score, date: test.test_date }
  })

  const pathData = points.map((p, i) => 
    `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`
  ).join(' ')

  return (
    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full">
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map((value) => {
        const y = chartHeight - padding - (value / maxScore) * (chartHeight - 2 * padding)
        return (
          <g key={value}>
            <line
              x1={padding}
              y1={y}
              x2={chartWidth - padding}
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={padding - 15}
              y={y + 5}
              textAnchor="end"
              fontSize="14"
              fill="#6b7280"
            >
              {value}
            </text>
          </g>
        )
      })}

      {/* Line */}
      <path
        d={pathData}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Points */}
      {points.map((point, index) => (
        <g key={index}>
          <circle
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#3b82f6"
            stroke="white"
            strokeWidth="2"
          />
        </g>
      ))}
    </svg>
  )
}

function getRiskColor(score: number) {
  if (score < 30) return 'text-green-600'
  if (score < 60) return 'text-yellow-600'
  return 'text-red-600'
}

function getRiskBg(score: number) {
  if (score < 30) return 'bg-green-100'
  if (score < 60) return 'bg-yellow-100'
  return 'bg-red-100'
}

function getTestLevelLabel(level: string) {
  const labels: Record<string, string> = {
    quick: 'Hızlı Test',
    standard: 'Standart Test',
    comprehensive: 'Kapsamlı Test',
    clinical: 'Klinik Test'
  }
  return labels[level] || level
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function calculateTestFrequency(tests: VoiceTest[]) {
  if (tests.length < 2) return tests.length
  
  const firstDate = new Date(tests[0].test_date)
  const lastDate = new Date(tests[tests.length - 1].test_date)
  const monthsDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
  
  return monthsDiff > 0 ? (tests.length / monthsDiff).toFixed(1) : tests.length
}
