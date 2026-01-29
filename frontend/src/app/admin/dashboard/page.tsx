import React from 'react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
        <p className="text-gray-400 mb-8">System Control Panel</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
            <p className="text-white text-3xl font-bold">1,234</p>
          </div>
          
          <div className="bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Active Tests</h3>
            <p className="text-white text-3xl font-bold">456</p>
          </div>
          
          <div className="bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Security Events</h3>
            <p className="text-white text-3xl font-bold">23</p>
          </div>
          
          <div className="bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm mb-2">Database Size</h3>
            <p className="text-white text-3xl font-bold">2.4 GB</p>
          </div>
        </div>
      </div>
    </div>
  )
}
