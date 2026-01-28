'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, Search, User, Phone, Video, MoreVertical, Paperclip, Smile, Circle } from 'lucide-react';

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
      
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockConversations: Conversation[] = [
        {
          id: '1',
          patientId: '1',
          patientName: 'John Smith',
          patientPhoto: null,
          lastMessage: 'Thank you doctor, I will follow your advice.',
          lastMessageTime: '2 min ago',
          unreadCount: 2,
          isOnline: true,
          messages: [
            {
              id: '1',
              content: 'Hello John, I reviewed your latest test results. Your risk score has improved significantly.',
              isDoctor: true,
              timestamp: '10:25 AM',
              status: 'read'
            },
            {
              id: '2',
              content: 'That\'s great news! What should I do to maintain this improvement?',
              isDoctor: false,
              timestamp: '10:27 AM',
              status: 'read'
            },
            {
              id: '3',
              content: 'Continue with your current medication schedule and try to do the voice exercises we discussed twice daily.',
              isDoctor: true,
              timestamp: '10:30 AM',
              status: 'read'
            },
            {
              id: '4',
              content: 'Thank you doctor, I will follow your advice.',
              isDoctor: false,
              timestamp: '10:32 AM',
              status: 'delivered'
            }
          ]
        },
        {
          id: '2',
          patientId: '2',
          patientName: 'Emma Wilson',
          patientPhoto: null,
          lastMessage: 'When should I schedule my next test?',
          lastMessageTime: '1 hour ago',
          unreadCount: 0,
          isOnline: false,
          messages: [
            {
              id: '1',
              content: 'Good morning doctor, I wanted to ask about my test schedule.',
              isDoctor: false,
              timestamp: '9:15 AM',
              status: 'read'
            },
            {
              id: '2',
              content: 'Good morning Emma! Your results look stable. I recommend scheduling your next test in 2 weeks.',
              isDoctor: true,
              timestamp: '9:20 AM',
              status: 'read'
            },
            {
              id: '3',
              content: 'When should I schedule my next test?',
              isDoctor: false,
              timestamp: '9:22 AM',
              status: 'read'
            }
          ]
        },
        {
          id: '3',
          patientId: '3',
          patientName: 'Michael Brown',
          patientPhoto: null,
          lastMessage: 'The medication is working well, thank you!',
          lastMessageTime: '3 hours ago',
          unreadCount: 1,
          isOnline: true,
          messages: [
            {
              id: '1',
              content: 'Hi Michael, how are you feeling with the new medication?',
              isDoctor: true,
              timestamp: '8:00 AM',
              status: 'read'
            },
            {
              id: '2',
              content: 'Much better! The tremors have reduced significantly.',
              isDoctor: false,
              timestamp: '8:15 AM',
              status: 'read'
            },
            {
              id: '3',
              content: 'The medication is working well, thank you!',
              isDoctor: false,
              timestamp: '8:16 AM',
              status: 'delivered'
            }
          ]
        },
        {
          id: '4',
          patientId: '4',
          patientName: 'Sarah Johnson',
          patientPhoto: null,
          lastMessage: 'I have some questions about my test results.',
          lastMessageTime: 'Yesterday',
          unreadCount: 0,
          isOnline: false,
          messages: [
            {
              id: '1',
              content: 'Hello doctor, I received my test results but I\'m not sure what they mean.',
              isDoctor: false,
              timestamp: 'Yesterday 3:45 PM',
              status: 'read'
            },
            {
              id: '2',
              content: 'I have some questions about my test results.',
              isDoctor: false,
              timestamp: 'Yesterday 3:46 PM',
              status: 'read'
            }
          ]
        }
      ];
      
      setConversations(mockConversations);
    } catch (error) {
      console.error('Failed to fetch conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !selectedConversation) return;
    
    // Mock send message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      isDoctor: true,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: message,
          lastMessageTime: 'Just now'
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation({
      ...selectedConversation,
      messages: [...selectedConversation.messages, newMessage]
    });
    setMessage('');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
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
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversations List */}
        <div className="w-full md:w-96 bg-[#1E293B] border-r border-gray-700 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-[#0EA5E9]" />
              Messages
            </h1>
            
            {/* Search */}
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
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-400">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1 p-2">
                {filteredConversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedConversation?.id === conv.id
                        ? 'bg-[#0EA5E9]/10 border border-[#0EA5E9]/30'
                        : 'bg-[#0F172A] hover:bg-[#0F172A]/80 border border-transparent'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold">
                          {getInitials(conv.patientName)}
                        </div>
                        {conv.isOnline && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#1E293B]" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-white truncate">{conv.patientName}</h3>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{conv.lastMessageTime}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                          {conv.unreadCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-[#0EA5E9] text-white text-xs font-semibold rounded-full flex-shrink-0">
                              {conv.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-[#0F172A]">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold">
                      {getInitials(selectedConversation.patientName)}
                    </div>
                    {selectedConversation.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0F172A]" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-white">{selectedConversation.patientName}</h2>
                    <p className="text-sm text-gray-400">
                      {selectedConversation.isOnline ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button className="p-3 bg-[#1E293B] hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-[#1E293B] hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-3 bg-[#1E293B] hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {selectedConversation.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.isDoctor ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-md ${msg.isDoctor ? 'order-2' : 'order-1'}`}>
                      <div
                        className={`px-4 py-3 rounded-2xl ${
                          msg.isDoctor
                            ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white'
                            : 'bg-[#1E293B] text-gray-100'
                        }`}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <p className={`text-xs text-gray-400 mt-1 ${msg.isDoctor ? 'text-right' : 'text-left'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-[#1E293B] hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
                    <Paperclip className="h-5 w-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-[#1E293B] border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-[#0EA5E9] transition-colors"
                  />
                  <button className="p-3 bg-[#1E293B] hover:bg-gray-700 text-gray-300 rounded-xl transition-colors">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button
                    onClick={sendMessage}
                    disabled={!message.trim()}
                    className="p-3 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] hover:from-[#0284C7] hover:to-[#0891B2] text-white rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-[#1E293B] rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                <p className="text-gray-400">Choose a patient to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
