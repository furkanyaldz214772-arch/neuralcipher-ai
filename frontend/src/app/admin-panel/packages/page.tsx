'use client'

import { useState } from 'react'

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Free Plan',
      price: 0,
      interval: 'month',
      features: ['1 Test per month', 'Basic support', '7 days history'],
      users: 450,
      revenue: 0,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Basic Plan',
      price: 29,
      interval: 'month',
      features: ['5 Tests per month', 'Email support', '30 days history', 'PDF Reports'],
      users: 234,
      revenue: 6786,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Pro Plan',
      price: 79,
      interval: 'month',
      features: ['Unlimited Tests', 'Priority support', 'Unlimited history', 'Advanced analytics', 'API access'],
      users: 89,
      revenue: 7031,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Enterprise',
      price: 299,
      interval: 'month',
      features: ['Everything in Pro', 'Dedicated support', 'Custom integration', 'White-label', 'SLA'],
      users: 12,
      revenue: 3588,
      status: 'Active'
    },
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Package Management</h1>
          <p className="text-slate-400 mt-1">Manage subscription packages and pricing</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg">
          + Create Package
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Total Subscribers</p>
          <p className="text-2xl font-bold text-white mt-1">785</p>
          <p className="text-sm text-green-400 mt-2">+12% this month</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Monthly Revenue</p>
          <p className="text-2xl font-bold text-white mt-1">$17,405</p>
          <p className="text-sm text-green-400 mt-2">+23% this month</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Conversion Rate</p>
          <p className="text-2xl font-bold text-white mt-1">8.4%</p>
          <p className="text-sm text-green-400 mt-2">+1.2% this month</p>
        </div>
        <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
          <p className="text-sm text-slate-400">Churn Rate</p>
          <p className="text-2xl font-bold text-white mt-1">2.1%</p>
          <p className="text-sm text-red-400 mt-2">-0.5% this month</p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <div key={pkg.id} className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6 hover:shadow-lg transition-shadow">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{pkg.name}</h3>
              <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                pkg.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {pkg.status}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-white">${pkg.price}</span>
                <span className="text-slate-400">/{pkg.interval}</span>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3 mb-6">
              {pkg.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-slate-300">{feature}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="border-t border-slate-700 pt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Subscribers</span>
                <span className="font-semibold text-white">{pkg.users}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Revenue</span>
                <span className="font-semibold text-white">${pkg.revenue.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-2">
              <button className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Edit
              </button>
              <button className="px-4 py-2 border border-slate-600 rounded-lg hover:bg-slate-700 transition-colors text-sm text-slate-300">
                Stats
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Package Comparison Table */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Package Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50 border-b border-slate-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Feature</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Free</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Basic</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Pro</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-200">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              <tr>
                <td className="px-6 py-4 text-sm text-slate-300">Tests per month</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">1</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">5</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Unlimited</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-300">History</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">7 days</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">30 days</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Unlimited</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Unlimited</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-300">Support</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Basic</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Email</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Priority</td>
                <td className="px-6 py-4 text-center text-sm text-slate-300">Dedicated</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-slate-300">API Access</td>
                <td className="px-6 py-4 text-center">❌</td>
                <td className="px-6 py-4 text-center">❌</td>
                <td className="px-6 py-4 text-center">✅</td>
                <td className="px-6 py-4 text-center">✅</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
