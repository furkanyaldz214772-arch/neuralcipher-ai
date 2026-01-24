/**
 * NeuralCipher.ai - Professional Quick Actions Component
 * Minimal Corporate Design - No Emojis, Pure SVG Icons
 */
'use client'

import { useRouter } from 'next/navigation'

export default function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: 'New Test',
      description: 'Start voice analysis',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      color: '#64FFDA',
      href: '/test/new'
    },
    {
      title: 'View History',
      description: 'Review test results',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      color: '#8B5CF6',
      href: '/history'
    },
    {
      title: 'Contact Doctor',
      description: 'Send a message',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
        </svg>
      ),
      color: '#3B82F6',
      href: '/doctor/messages'
    },
    {
      title: 'Settings',
      description: 'Manage account',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      color: '#F59E0B',
      href: '/settings'
    }
  ]

  return (
    <div 
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.98) 0%, rgba(30, 41, 59, 0.95) 100%)',
        border: '2px solid rgba(100, 255, 218, 0.5)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6), 0 0 40px rgba(100, 255, 218, 0.2)'
      }}
    >
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-800">
        <h3 className="text-lg font-sora font-bold text-white">Quick Actions</h3>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 bg-electric-cyan rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 bg-azure-start rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1.5 h-1.5 bg-neon-glow rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <button
            key={action.title}
            onClick={() => router.push(action.href)}
            className="group/action flex flex-col items-center p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            style={{
              background: 'rgba(15, 23, 42, 0.5)',
              border: '1px solid rgba(100, 255, 218, 0.2)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Hover effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover/action:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${action.color}10 0%, ${action.color}05 100%)`
              }}
            ></div>
            
            <div className="relative z-10 flex flex-col items-center w-full">
              {/* Icon Container - Minimal, No Gradient */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 transition-all duration-300 group-hover/action:scale-110"
                style={{
                  background: `${action.color}15`,
                  border: `1px solid ${action.color}40`,
                  color: action.color
                }}
              >
                {action.icon}
              </div>
              
              {/* Text */}
              <h4 className="font-sora font-semibold text-white text-sm mb-1 group-hover/action:text-electric-cyan transition-colors">
                {action.title}
              </h4>
              <p className="text-xs text-gray-500 text-center font-roboto group-hover/action:text-gray-400 transition-colors">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
