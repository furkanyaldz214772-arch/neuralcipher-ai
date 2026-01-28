'use client'

import { useState } from 'react'

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState([
    { id: 1, user: 'John Doe', package: 'Pro Plan', amount: 79, method: 'Credit Card', status: 'Success', date: '2026-01-28 14:30' },
    { id: 2, user: 'Jane Smith', package: 'Basic Plan', amount: 29, method: 'PayPal', status: 'Success', date: '2026-01-28 13:15' },
    { id: 3, user: 'Bob Johnson', package: 'Enterprise', amount: 299, method: 'Credit Card', status: 'Pending', date: '2026-01-28 11:45' },
    { id: 4, user: 'Alice Cooper', package: 'Pro Plan', amount: 79, method: 'Credit Card', status: 'Failed', date: '2026-01-28 10:20' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Payment Management</h1>
          <p className="text-slate-600 mt-1">View and manage all payments</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
          Export Payments
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">$17,405</p>
          <p className="text-sm text-green-600 mt-2">↑ 23% this month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Today's Revenue</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">$486</p>
          <p className="text-sm text-green-600 mt-2">↑ 12% vs yesterday</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Success Rate</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">96.8%</p>
          <p className="text-sm text-green-600 mt-2">↑ 2.1% this month</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <p className="text-sm text-slate-600">Failed Payments</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">23</p>
          <p className="text-sm text-red-600 mt-2">↓ 5% this month</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All</option>
              <option>Success</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Package</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All</option>
              <option>Free Plan</option>
              <option>Basic Plan</option>
              <option>Pro Plan</option>
              <option>Enterprise</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Payment Method</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>All</option>
              <option>Credit Card</option>
              <option>PayPal</option>
              <option>Bank Transfer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Date Range</label>
            <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Today</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Package</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {payments.map((payment) => (
                <tr key={payment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">#{payment.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.user}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.package}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-800">${payment.amount}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      payment.status === 'Success' ? 'bg-green-100 text-green-700' :
                      payment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{payment.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Invoice">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      {payment.status === 'Success' && (
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Refund">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Revenue Trend (Last 30 Days)</h3>
        <div className="h-64 flex items-end justify-between gap-2">
          {[45, 52, 48, 65, 70, 68, 85, 80, 95, 90, 100, 95].map((height, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg" style={{ height: `${height}%` }}></div>
          ))}
        </div>
      </div>
    </div>
  )
}
