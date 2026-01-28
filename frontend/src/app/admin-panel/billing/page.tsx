'use client'

import { useState } from 'react'

export default function AdminBillingPage() {
  const [transactions, setTransactions] = useState([
    { id: 1, user: 'John Doe', email: 'john@example.com', amount: 49.99, plan: 'Premium', status: 'Completed', date: '2026-01-28', method: 'Credit Card' },
    { id: 2, user: 'Dr. Sarah Smith', email: 'sarah@hospital.com', amount: 199.99, plan: 'Enterprise', status: 'Completed', date: '2026-01-27', method: 'Bank Transfer' },
    { id: 3, user: 'City Hospital', email: 'info@cityhospital.com', amount: 999.99, plan: 'Enterprise Plus', status: 'Pending', date: '2026-01-26', method: 'Invoice' },
    { id: 4, user: 'Jane Wilson', email: 'jane@example.com', amount: 29.99, plan: 'Basic', status: 'Failed', date: '2026-01-25', method: 'Credit Card' },
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'All' || transaction.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalRevenue = transactions.filter(t => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0)
  const pendingRevenue = transactions.filter(t => t.status === 'Pending').reduce((sum, t) => sum + t.amount, 0)

  const handleDownloadInvoice = (transactionId: number) => {
    alert(`Downloading invoice for transaction #${transactionId}`)
  }

  const handleDownloadData = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "User,Email,Amount,Plan,Status,Date,Method\n" +
      filteredTransactions.map(t => `${t.user},${t.email},${t.amount},${t.plan},${t.status},${t.date},${t.method}`).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "billing_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Billing & Payments</h1>
          <p className="text-slate-400 mt-1">Manage all transactions and subscriptions</p>
        </div>
        <button 
          onClick={handleDownloadData}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download Report
        </button>
      </div>

      {/* Revenue Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 border border-green-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">${totalRevenue.toFixed(2)}</p>
              <p className="text-green-400 text-sm mt-1">+12.5% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900/50 to-orange-900/50 border border-yellow-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm font-medium">Pending Revenue</p>
              <p className="text-3xl font-bold text-white mt-2">${pendingRevenue.toFixed(2)}</p>
              <p className="text-yellow-400 text-sm mt-1">{transactions.filter(t => t.status === 'Pending').length} pending transactions</p>
            </div>
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border border-blue-700 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm font-medium">Total Transactions</p>
              <p className="text-3xl font-bold text-white mt-2">{transactions.length}</p>
              <p className="text-blue-400 text-sm mt-1">This month</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by user or email..."
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option>All</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800 border-b border-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Transaction ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">User</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Plan</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Method</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-mono text-slate-400">#{transaction.id.toString().padStart(6, '0')}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-slate-200">{transaction.user}</p>
                      <p className="text-sm text-slate-400">{transaction.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{transaction.plan}</td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-semibold text-green-400">${transaction.amount}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{transaction.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Completed' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                      transaction.status === 'Pending' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                      'bg-red-900/50 text-red-300 border border-red-700'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadInvoice(transaction.id)}
                        className="p-2 text-blue-400 hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Download Invoice"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                      <button
                        className="p-2 text-green-400 hover:bg-green-900/30 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
