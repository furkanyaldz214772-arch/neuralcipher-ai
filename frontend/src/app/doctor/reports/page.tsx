'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function ReportsPage() {
  const [reportType, setReportType] = useState<'patient' | 'summary' | 'custom'>('patient')
  const [selectedPatient, setSelectedPatient] = useState('')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerateReport = async () => {
    setIsGenerating(true)
    
    // Simulate report generation
    setTimeout(() => {
      alert('Report generated! (Demo)')
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Professional Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Generate Report</h1>
          <p className="text-sm text-gray-400 font-roboto">Create custom reports for your patients</p>
        </div>

        {/* Report Type Selection */}
        <div className="rounded-xl p-6 mb-6 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-base font-sora font-semibold text-white mb-4">Report Type</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => setReportType('patient')}
              className={`p-5 rounded-lg text-left transition-all duration-200 hover:-translate-y-0.5 ${
                reportType === 'patient'
                  ? 'border-2'
                  : 'border'
              }`}
              style={{
                background: reportType === 'patient' 
                  ? 'rgba(100, 255, 218, 0.1)' 
                  : 'rgba(15, 23, 42, 0.4)',
                borderColor: reportType === 'patient'
                  ? 'rgba(100, 255, 218, 0.5)'
                  : 'rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="font-semibold text-white mb-1 font-sora text-sm">Patient Report</div>
              <div className="text-xs text-gray-400 font-roboto">Detailed report for a single patient</div>
            </button>

            <button
              onClick={() => setReportType('summary')}
              className={`p-5 rounded-lg text-left transition-all duration-200 hover:-translate-y-0.5 ${
                reportType === 'summary'
                  ? 'border-2'
                  : 'border'
              }`}
              style={{
                background: reportType === 'summary' 
                  ? 'rgba(100, 255, 218, 0.1)' 
                  : 'rgba(15, 23, 42, 0.4)',
                borderColor: reportType === 'summary'
                  ? 'rgba(100, 255, 218, 0.5)'
                  : 'rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <div className="font-semibold text-white mb-1 font-sora text-sm">Summary Report</div>
              <div className="text-xs text-gray-400 font-roboto">Statistics for all patients</div>
            </button>

            <button
              onClick={() => setReportType('custom')}
              className={`p-5 rounded-lg text-left transition-all duration-200 hover:-translate-y-0.5 ${
                reportType === 'custom'
                  ? 'border-2'
                  : 'border'
              }`}
              style={{
                background: reportType === 'custom' 
                  ? 'rgba(100, 255, 218, 0.1)' 
                  : 'rgba(15, 23, 42, 0.4)',
                borderColor: reportType === 'custom'
                  ? 'rgba(100, 255, 218, 0.5)'
                  : 'rgba(100, 255, 218, 0.15)'
              }}
            >
              <svg className="w-8 h-8 text-electric-cyan mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="font-semibold text-white mb-1 font-sora text-sm">Custom Report</div>
              <div className="text-xs text-gray-400 font-roboto">Customized report criteria</div>
            </button>
          </div>
        </div>

        {/* Report Configuration */}
        <div className="rounded-xl p-6 mb-6 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-base font-sora font-semibold text-white mb-4">Report Settings</h3>
          
          <div className="space-y-4">
            {/* Patient Report - Show patient selector */}
            {reportType === 'patient' && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                  Select Patient
                </label>
                <select
                  value={selectedPatient}
                  onChange={(e) => setSelectedPatient(e.target.value)}
                  className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(100, 255, 218, 0.2)'
                  }}
                >
                  <option value="">Select patient...</option>
                  <option value="1">Ahmet Yılmaz</option>
                  <option value="2">Ayşe Demir</option>
                  <option value="3">Mehmet Kaya</option>
                </select>
              </div>
            )}

            {/* Summary Report - Show summary options */}
            {reportType === 'summary' && (
              <div className="p-4 rounded-lg"
                style={{
                  background: 'rgba(100, 255, 218, 0.05)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              >
                <p className="text-xs text-gray-300 font-roboto mb-3">
                  This report will include statistics for all your patients
                </p>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Patient demographics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Risk distribution</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Test statistics</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Monthly trends</span>
                  </label>
                </div>
              </div>
            )}

            {/* Custom Report - Show custom options */}
            {reportType === 'custom' && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                    Select Patients (Multiple)
                  </label>
                  <select
                    multiple
                    className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto h-24"
                    style={{
                      background: 'rgba(15, 23, 42, 0.4)',
                      border: '1px solid rgba(100, 255, 218, 0.2)'
                    }}
                  >
                    <option value="1">Ahmet Yılmaz</option>
                    <option value="2">Ayşe Demir</option>
                    <option value="3">Mehmet Kaya</option>
                    <option value="4">Ali Yıldız</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1 font-roboto">Hold Ctrl/Cmd to select multiple</p>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                    Risk Level Filter
                  </label>
                  <select className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                    style={{
                      background: 'rgba(15, 23, 42, 0.4)',
                      border: '1px solid rgba(100, 255, 218, 0.2)'
                    }}
                  >
                    <option value="all">All Risk Levels</option>
                    <option value="high">High Risk Only</option>
                    <option value="medium">Medium Risk Only</option>
                    <option value="low">Low Risk Only</option>
                  </select>
                </div>
              </div>
            )}

            {/* Common fields for all report types */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                  Start Date
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(100, 255, 218, 0.2)'
                  }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                  End Date
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                  style={{
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(100, 255, 218, 0.2)'
                  }}
                />
              </div>
            </div>

            {/* Show content options only for patient and custom reports */}
            {(reportType === 'patient' || reportType === 'custom') && (
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                  Report Content
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Test results</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Biomarkers</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" defaultChecked className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Trend analysis</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-xs text-gray-300 font-roboto">Treatment recommendations</span>
                  </label>
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-2 font-roboto">
                Report Format
              </label>
              <select className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none font-roboto"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              >
                <option value="pdf">PDF</option>
                <option value="excel">Excel</option>
                <option value="word">Word</option>
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 mb-8">
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 text-sm rounded-lg font-roboto transition-all duration-200"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              color: '#9CA3AF'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="px-5 py-2 text-sm rounded-lg font-sora font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(100, 255, 218, 0.15)',
              border: '1px solid rgba(100, 255, 218, 0.4)',
              color: '#64FFDA'
            }}
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </button>
        </div>

        {/* Recent Reports */}
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
            <h3 className="text-base font-sora font-semibold text-white">Recent Reports</h3>
          </div>
          <div>
            {[
              { name: 'Ahmet Yılmaz - Patient Report', date: '2026-01-20', type: 'PDF' },
              { name: 'Monthly Summary Report', date: '2026-01-15', type: 'Excel' },
              { name: 'Ayşe Demir - Patient Report', date: '2026-01-10', type: 'PDF' }
            ].map((report, index) => (
              <div 
                key={index} 
                className="p-5 transition-all duration-200 hover:-translate-y-0.5 group"
                style={{ 
                  borderBottom: index < 2 ? '1px solid rgba(100, 255, 218, 0.1)' : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: 'rgba(100, 255, 218, 0.1)',
                        border: '1px solid rgba(100, 255, 218, 0.3)'
                      }}
                    >
                      <svg className="w-5 h-5 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium text-white font-sora text-sm group-hover:text-electric-cyan transition-colors">{report.name}</div>
                      <div className="text-xs text-gray-400 font-roboto">{report.date} • {report.type}</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-sm rounded-lg font-roboto transition-all duration-200 hover:scale-105"
                    style={{
                      background: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid rgba(100, 255, 218, 0.3)',
                      color: '#64FFDA'
                    }}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
