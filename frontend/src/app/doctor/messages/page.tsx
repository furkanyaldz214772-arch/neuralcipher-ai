'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Search, User } from 'lucide-react';
import api from '@/lib/api';

export default function DoctorMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/v1/messages/conversations');
      setConversations(response.data.conversations || []);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;
    
    try {
      await api.post('/api/v1/messages', {
        recipientId: selectedConversation.patientId,
        content: message
      });
      setMessage('');
      fetchConversations();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-[#0EA5E9] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-400">Loading messages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
          <MessageSquare className="h-8 w-8 text-[#0EA5E9]" />
          Messages
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-[#1E293B] border border-gray-700 rounded-xl p-4">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-2">
              {conversations.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No conversations</p>
              ) : (
                conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedConversation?.id === conv.id
                        ? 'bg-[#0EA5E9]/20 border border-[#0EA5E9]'
                        : 'bg-[#0F172A] border border-gray-700 hover:border-[#0EA5E9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-[#0EA5E9]" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium">{conv.patientName}</p>
                        <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-[#1E293B] border border-gray-700 rounded-xl flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-[#0EA5E9]" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedConversation.patientName}</p>
                      <p className="text-gray-400 text-sm">Online</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="space-y-4">
                    {selectedConversation.messages?.map((msg: any, idx: number) => (
                      <div
                        key={idx}
                        className={`flex ${msg.isDoctor ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] p-3 rounded-lg ${
                            msg.isDoctor
                              ? 'bg-[#0EA5E9] text-white'
                              : 'bg-[#0F172A] text-gray-300'
                          }`}
                        >
                          <p>{msg.content}</p>
                          <p className="text-xs mt-1 opacity-70">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9]"
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-[#0EA5E9] text-white rounded-lg hover:bg-[#0EA5E9]/90 transition-all flex items-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
