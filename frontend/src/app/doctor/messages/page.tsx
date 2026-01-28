'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Search, User, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import api from '@/lib/api';

interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientPhoto: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
  messages: Message[];
}

interface Message {
  id: string;
  content: string;
  isDoctor: boolean;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export default function DoctorMessagesPage() {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
            <MessageSquare className="h-8 w-8 text-[#0EA5E9]" />
          </div>
          Messages
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1 bg-[#1E293B] border border-gray-700 rounded-2xl flex flex-col overflow-hidden">
            {/* Search */}
            <div className="p-4 border-b border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9] transition-colors"
                />
              </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-600 mb-4" />
                  <p className="text-gray-400">No conversations yet</p>
                </div>
              ) : (
                <div className="p-2 space-y-2">
                  {filteredConversations.map((conv) => (
                    <motion.div
                      key={conv.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedConversation(conv)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedConversation?.id === conv.id
                          ? 'bg-[#0EA5E9]/20 border border-[#0EA5E9]'
                          : 'bg-[#0F172A] border border-transparent hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-full flex items-center justify-center">
                            {conv.patientPhoto ? (
                              <img src={conv.patientPhoto} alt={conv.patientName} className="w-full h-full rounded-full object-cover" />
                            ) : (
                              <User className="h-6 w-6 text-white" />
                            )}
                          </div>
                          {conv.isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1E293B] rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-white font-semibold truncate">{conv.patientName}</p>
                            <span className="text-xs text-gray-400">{conv.lastMessageTime}</span>
                          </div>
                          <p className="text-gray-400 text-sm truncate">{conv.lastMessage}</p>
                        </div>
                        {conv.unreadCount > 0 && (
                          <div className="px-2 py-1 bg-[#0EA5E9] text-white text-xs font-bold rounded-full min-w-[20px] text-center">
                            {conv.unreadCount}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-[#1E293B] border border-gray-700 rounded-2xl flex flex-col overflow-hidden">
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] rounded-full flex items-center justify-center">
                        {selectedConversation.patientPhoto ? (
                          <img src={selectedConversation.patientPhoto} alt={selectedConversation.patientName} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <User className="h-6 w-6 text-white" />
                        )}
                      </div>
                      {selectedConversation.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#1E293B] rounded-full" />
                      )}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{selectedConversation.patientName}</p>
                      <p className="text-gray-400 text-sm">
                        {selectedConversation.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-[#0F172A] text-[#0EA5E9] rounded-lg hover:bg-[#0EA5E9]/10 transition-all"
                    >
                      <Phone className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-[#0F172A] text-[#0EA5E9] rounded-lg hover:bg-[#0EA5E9]/10 transition-all"
                    >
                      <Video className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 bg-[#0F172A] text-gray-400 rounded-lg hover:bg-gray-700 transition-all"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {selectedConversation.messages?.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-400">No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      selectedConversation.messages?.map((msg, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className={`flex ${msg.isDoctor ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] p-4 rounded-2xl ${
                              msg.isDoctor
                                ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-br-none'
                                : 'bg-[#0F172A] text-gray-300 border border-gray-700 rounded-bl-none'
                            }`}
                          >
                            <p className="leading-relaxed">{msg.content}</p>
                            <div className="flex items-center justify-end gap-2 mt-2">
                              <p className="text-xs opacity-70">{msg.timestamp}</p>
                              {msg.isDoctor && (
                                <span className="text-xs opacity-70">
                                  {msg.status === 'read' ? '✓✓' : msg.status === 'delivered' ? '✓✓' : '✓'}
                                </span>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-[#0F172A] text-gray-400 rounded-xl hover:bg-gray-700 transition-all"
                    >
                      <Paperclip className="h-5 w-5" />
                    </motion.button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-3 bg-[#0F172A] text-gray-400 rounded-xl hover:bg-gray-700 transition-all"
                    >
                      <Smile className="h-5 w-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendMessage}
                      disabled={!message.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-5 w-5" />
                      Send
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="p-6 bg-[#0F172A] rounded-full inline-block mb-4">
                    <MessageSquare className="h-16 w-16 text-gray-600" />
                  </div>
                  <p className="text-gray-400 text-lg">Select a conversation to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
