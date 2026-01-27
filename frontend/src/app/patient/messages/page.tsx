'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Clock, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function PatientMessagesPage() {
  const router = useRouter()

  // Mock conversations
  const conversations = [
    {
      id: 1,
      doctorName: 'Dr. Mehmet Yılmaz',
      lastMessage: 'Your test results look very good...',
      time: '2 hours ago',
      unread: 2
    },
    {
      id: 2,
      doctorName: 'Dr. Ayşe Demir',
      lastMessage: 'I confirmed your appointment...',
      time: '1 day ago',
      unread: 0
    },
    {
      id: 3,
      doctorName: 'Dr. Can Öztürk',
      lastMessage: 'Please continue your medication...',
      time: '3 days ago',
      unread: 0
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Messages</h1>
          <p className="text-gray-400">Communicate with your doctors</p>
        </div>

        {/* Conversations List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-700">
                <h2 className="text-lg font-bold text-white">Conversations</h2>
              </div>
              <div className="divide-y divide-gray-700">
                {conversations.map((conv) => (
                  <motion.button
                    key={conv.id}
                    whileHover={{ backgroundColor: 'rgba(14, 165, 233, 0.05)' }}
                    onClick={() => router.push(`/patient/messages/${conv.id}`)}
                    className="w-full p-4 text-left transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-white font-semibold truncate">{conv.doctorName}</h3>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#EF4444] text-white text-xs flex items-center justify-center font-bold">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm truncate mb-1">{conv.lastMessage}</p>
                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                          <Clock className="h-3 w-3" />
                          <span>{conv.time}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Empty State */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-12 text-center h-full flex items-center justify-center"
            >
              <div>
                <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a doctor from the list to view messages</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
