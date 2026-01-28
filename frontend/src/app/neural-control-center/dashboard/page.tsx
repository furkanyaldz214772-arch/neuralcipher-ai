'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiShield, FiUsers, FiActivity, FiDatabase, FiAlertTriangle, FiCheckCircle } from 'react-icons/fi'

export default function NeuralControlDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <FiShield className="text-[#64FFDA] text-3xl" />
            <h1 className="text-4xl font-bold text-white">Neural Control Center</h1>
          </div>
          <p className="text-gray-400">System Administration Dashboard</p>
        </motion.div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FiUsers className="text-[#64FFDA] text-2xl" />
                <FiCheckCircle className="text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Total Users</h3>
              <p className="text-white text-3xl font-bold">1,234</p>
              <p className="text-green-400 text-xs mt-2">+12% this month</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FiActivity className="text-[#3B82F6] text-2xl" />
                <FiCheckCircle className="text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Active Tests</h3>
              <p className="text-white text-3xl font-bold">456</p>
              <p className="text-green-400 text-xs mt-2">+8% this week</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FiAlertTriangle className="text-yellow-400 text-2xl" />
                <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded">Active</span>
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Security Events</h3>
              <p className="text-white text-3xl font-bold">23</p>
              <p className="text-yellow-400 text-xs mt-2">3 require attention</p>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#EC4899] to-[#64FFDA] rounded-xl blur opacity-20 group-hover:opacity-40 transition" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <FiDatabase className="text-[#EC4899] text-2xl" />
                <FiCheckCircle className="text-green-400" />
              </div>
              <h3 className="text-gray-400 text-sm mb-2">Database Size</h3>
              <p className="text-white text-3xl font-bold">2.4 GB</p>
              <p className="text-gray-400 text-xs mt-2">68% capacity</p>
            </div>
          </motion.div>
        </div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative mb-8"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA]/20 to-[#3B82F6]/20 rounded-xl blur" />
          <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FiShield className="text-[#64FFDA]" />
              System Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-4 bg-[#0A0E27]/50 rounded-lg">
                <span className="text-gray-400">API Server</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0A0E27]/50 rounded-lg">
                <span className="text-gray-400">Database</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Connected</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-[#0A0E27]/50 rounded-lg">
                <span className="text-gray-400">AI Pipeline</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 text-sm">Ready</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#64FFDA]/20 to-[#3B82F6]/20 rounded-xl blur" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0A0E27]/50 rounded-lg">
                  <div className="w-2 h-2 bg-[#64FFDA] rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">New user registration</p>
                    <p className="text-gray-500 text-xs">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0A0E27]/50 rounded-lg">
                  <div className="w-2 h-2 bg-[#3B82F6] rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">Test analysis completed</p>
                    <p className="text-gray-500 text-xs">15 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0A0E27]/50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="flex-1">
                    <p className="text-white text-sm">Security scan initiated</p>
                    <p className="text-gray-500 text-xs">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#8B5CF6]/20 to-[#EC4899]/20 rounded-xl blur" />
            <div className="relative bg-[#1a1f3a] border border-[#64FFDA]/20 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4">System Health</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">CPU Usage</span>
                    <span className="text-white">45%</span>
                  </div>
                  <div className="w-full bg-[#0A0E27]/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#64FFDA] to-[#3B82F6] h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Memory</span>
                    <span className="text-white">62%</span>
                  </div>
                  <div className="w-full bg-[#0A0E27]/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] h-2 rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Storage</span>
                    <span className="text-white">68%</span>
                  </div>
                  <div className="w-full bg-[#0A0E27]/50 rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
