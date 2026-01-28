'use client'

import { useState } from 'react'

export default function AdminReportsPage() {
  const [reportType, setReportType] = useState('users')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
        <p className="text-slate-600 mt-1">Generate and export comprehensive reports</p>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <button
          onClick={() => setReportType('users')}
          className={`p-6 rounded-xl border-2 transition-all ${
            reportType === 'users'
              ? 'border-purple-600 bg-purple-50'
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="text-3xl mb-2">👥</div>
          <p className="font-semibold text-slate-800">User Reports</p>
          <p className="text-sm text-slate-600 mt-1">Growth, distribution, activity</p>
        </button>

        <button
          onClick={() => setReportType('tests')}
          className={`p-6 rounded-xl border-2 transition-all ${
            reportType === 'tests'
              ? 'border-purple-600 bg-purple-50'
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="text-3xl mb-2">🧪</div>
          <p className="font-semibold text-slate-800">Test Reports</p>
          <p className="text-sm text-slate-600 mt-1">Volume, results, trends</p>
        </button>

        <button
          onClick={() => setReportType('revenue')}
          className={`p-6 rounded-xl border-2 transition-all ${
            reportType === 'revenue'
              ? 'border-purple-600 bg-purple-50'
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="text-3xl mb-2">💰</div>
          <p className="font-semibold text-slate-800">Revenue Reports</p>
          <p className="text-sm text-slate-600 mt-1">Income, packages, trends</p>
        </button>

        <button
          onClick={() => setReportType('system')}
          className={`p-6 rounded-xl border-2 transition-all ${
            reportType === 'system'
              ? 'border-purple-600 bg-purple-50'
              : 'border-slate-200 bg-white hover:border-purple-300'
          }`}
        >
          <div className="text-3xl mb-2">📊</div>
          <p className="font-semibold text-slate-800">System Reports</p>
          <p className="text-sm text-slate-600 mt-1">Performance, errors, logs</p>
        </button>
      </div>

      {/* Report Configuration */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Report Configuration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>PDF</option>
              <option>Excel</option>
              <option>CSV</option>
              <option>JSON</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Group By</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Day</option>
              <option>Week</option>
              <option>Month</option>
              <option>Quarter</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Generate Report
          </button>
          <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Schedule Report
          </button>
          <button className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
            Email Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Total Users</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">1,247</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% vs last period</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Total Tests</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">3,892</p>
          <p className="text-sm text-green-600 mt-2">↑ 8% vs last period</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">$45,678</p>
          <p className="text-sm text-green-600 mt-2">↑ 23% vs last period</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Conversion Rate</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">8.4%</p>
          <p className="text-sm text-green-600 mt-2">↑ 1.2% vs last period</p>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {[
            { name: 'User Growth Report - January 2026', date: '2026-01-28', format: 'PDF', size: '2.4 MB' },
            { name: 'Revenue Analysis - Q4 2025', date: '2026-01-25', format: 'Excel', size: '1.8 MB' },
            { name: 'Test Results Summary - December 2025', date: '2026-01-20', format: 'PDF', size: '3.1 MB' },
          ].map((report, i) => (
            <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📄</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{report.name}</p>
                  <p className="text-sm text-slate-500">{report.date} • {report.format} • {report.size}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
