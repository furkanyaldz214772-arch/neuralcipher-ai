'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Eye, Download, Calendar, TrendingUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PatientTestsPage() {
  const router = useRouter()
  
  // Mock test data
  const tests = [
    { id: 1, date: 'Jan 24, 2026', time: '14:30', riskScore: 15, status: 'Low', analyzed: true },
    { id: 2, date: 'Jan 17, 2026', time: '10:15', riskScore: 18, status: 'Low', analyzed: true },
    { id: 3, date: 'Jan 10, 2026', time: '16:45', riskScore: 12, status: 'Low', analyzed: true },
    { id: 4, date: 'Jan 3, 2026', time: '09:30', riskScore: 20, status: 'Low', analyzed: true },
    { id: 5, date: 'Dec 27, 2025', time: '11:00', riskScore: 16, status: 'Low', analyzed: true },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Test Results</h1>
            <p className="text-gray-400">View and manage your test history</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/patient/tests/new')}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
          >
            <TrendingUp className="h-5 w-5" />
            New Test
          </motion.button>
        </div>

        {/* Tests Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0F172A] border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Test Date
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Risk Score
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {tests.map((test, index) => (
                  <motion.tr
                    key={test.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-[#0F172A]/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-semibold">{test.date}</p>
                        <p className="text-gray-400 text-sm">{test.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full max-w-[120px] bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              test.riskScore < 20 ? 'bg-[#10B981]' : 'bg-[#F59E0B]'
                            }`}
                            style={{ width: `${test.riskScore}%` }}
                          />
                        </div>
                        <span className="text-white font-semibold">{test.riskScore}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        test.status === 'Low' 
                          ? 'bg-[#10B981]/20 text-[#10B981]' 
                          : 'bg-[#F59E0B]/20 text-[#F59E0B]'
                      }`}>
                        {test.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => router.push(`/patient/tests/${test.id}`)}
                          className="p-2 bg-[#0EA5E9]/10 hover:bg-[#0EA5E9]/20 text-[#0EA5E9] rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981] rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
