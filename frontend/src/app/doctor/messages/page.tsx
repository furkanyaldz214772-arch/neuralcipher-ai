'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import api from '@/lib/api'

interface Message {
  id: string
  sender_id: string
  receiver_id: string
  content: string
  created_at: string
  read: boolean
  sender_name?: string
}

export default function DoctorMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await api.get('/api/v1/messages')
      setMessages(response.data)
    } catch (error) {
      console.error('Failed to fetch messages:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim()) return

    setIsSending(true)
    try {
      await api.post('/api/v1/messages', {
        content: newMessage,
        receiver_role: 'doctor'
      })
      setNewMessage('')
      fetchMessages()
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-neon-glow border-t-transparent rounded-full animate-spin opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Professional Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Doctor Communication</h1>
          <p className="text-base text-gray-400 font-roboto">
            Send messages to your doctor and get information about your test results
          </p>
        </div>

        {/* Professional Messages Container */}
        <div className="rounded-xl p-6 mb-6 h-[500px] flex flex-col"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Messages List */}
          <div className="flex-1 overflow-y-auto mb-6 space-y-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.3)'
                  }}
                >
                  {/* Professional Doctor Icon - Medical Professional */}
                  <svg className="w-8 h-8 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 font-roboto mb-2">No messages yet</p>
                <p className="text-sm text-gray-500 font-roboto">Send your first message to your doctor</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender_name ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[70%] p-4 rounded-xl ${
                      message.sender_name
                        ? 'border'
                        : ''
                    }`}
                    style={{
                      background: message.sender_name 
                        ? 'rgba(15, 23, 42, 0.6)' 
                        : 'rgba(100, 255, 218, 0.15)',
                      border: message.sender_name 
                        ? '1px solid rgba(100, 255, 218, 0.2)' 
                        : '1px solid rgba(100, 255, 218, 0.3)'
                    }}
                  >
                    {message.sender_name && (
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{
                            background: 'rgba(100, 255, 218, 0.1)',
                            border: '1px solid rgba(100, 255, 218, 0.3)'
                          }}
                        >
                          {/* Professional Doctor Icon */}
                          <svg className="w-4 h-4 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-electric-cyan font-roboto">
                          {message.sender_name}
                        </span>
                      </div>
                    )}
                    <p className={`font-roboto ${message.sender_name ? 'text-white' : 'text-electric-cyan'}`}>
                      {message.content}
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-roboto">
                      {new Date(message.created_at).toLocaleString('en-US')}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Professional Message Input */}
          <div className="flex items-end space-x-3">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Type your message..."
              rows={3}
              className="flex-1 px-4 py-3 text-white rounded-lg focus:ring-1 focus:ring-electric-cyan focus:border-transparent transition-all resize-none font-roboto text-sm"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(100, 255, 218, 0.2)'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim() || isSending}
              className="px-5 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-sora font-medium h-[84px] flex items-center justify-center"
              style={{
                background: newMessage.trim() && !isSending ? 'rgba(100, 255, 218, 0.15)' : 'rgba(100, 255, 218, 0.05)',
                border: newMessage.trim() && !isSending ? '1px solid rgba(100, 255, 218, 0.4)' : '1px solid rgba(100, 255, 218, 0.1)',
                color: newMessage.trim() && !isSending ? '#64FFDA' : '#6B7280'
              }}
            >
              {isSending ? (
                <div className="w-5 h-5 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Professional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg p-4"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)'
            }}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-roboto">Response Time</div>
                <div className="text-base font-semibold text-white font-sora">~2 hours</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)'
            }}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-roboto">Messages</div>
                <div className="text-base font-semibold text-white font-sora">{messages.length}</div>
              </div>
            </div>
          </div>

          <div className="rounded-lg p-4"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)'
            }}
          >
            <div className="flex items-center space-x-3">
              <svg className="w-5 h-5 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div className="text-xs text-gray-500 font-roboto">Status</div>
                <div className="text-base font-semibold text-electric-cyan font-sora">Active</div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Tips */}
        <div className="mt-6 rounded-xl p-5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.2)'
          }}
        >
          <h3 className="font-sora font-semibold text-white text-base mb-4 flex items-center">
            <svg className="w-5 h-5 mr-2 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-400 font-roboto">
            <li className="flex items-start">
              <span className="mr-2 text-electric-cyan">•</span>
              <span>You can ask questions about your test results</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-electric-cyan">•</span>
              <span>Your doctor typically responds within 2 hours</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-electric-cyan">•</span>
              <span>For emergencies, please call 911</span>
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  )
}
