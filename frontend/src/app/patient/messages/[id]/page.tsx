'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, ArrowLeft, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MessageDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [message, setMessage] = useState('')

  // Mock messages
  const messages = [
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello, I reviewed your test results.',
      time: '10:30'
    },
    {
      id: 2,
      sender: 'doctor',
      text: 'The results look very good.',
      time: '10:30'
    },
    {
      id: 3,
      sender: 'patient',
      text: 'Thank you doctor.',
      time: '11:15'
    },
    {
      id: 4,
      sender: 'patient',
      text: 'When should I take my next test?',
      time: '11:15'
    },
    {
      id: 5,
      sender: 'doctor',
      text: 'You can take a follow-up test in 2 weeks.',
      time: '11:20'
    }
  ]

  const handleSend = () => {
    if (message.trim()) {
      // Handle send message
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-4 mb-6"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 hover:bg-[#0F172A] rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-400" />
            </button>
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dr. Mehmet Yılmaz</h2>
              <p className="text-sm text-gray-400">Neurologist</p>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6 mb-6 h-[500px] overflow-y-auto"
        >
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'patient'
                      ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white'
                      : 'bg-[#0F172A] border border-gray-700 text-gray-300'
                  }`}
                >
                  <p className="mb-1">{msg.text}</p>
                  <p className={`text-xs ${msg.sender === 'patient' ? 'text-white/70' : 'text-gray-500'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-4"
        >
          <div className="flex items-center gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#0EA5E9]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white p-3 rounded-xl shadow-lg shadow-[#0EA5E9]/20"
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
