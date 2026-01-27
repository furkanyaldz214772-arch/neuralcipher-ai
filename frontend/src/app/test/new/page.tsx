/**
 * NeuralCipher.ai - Professional New Test Page
 * Corporate, Minimal, Sophisticated Design
 */
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function NewTestPage() {
  const router = useRouter()
  const [selectedLevel, setSelectedLevel] = useState<string>('')

  const testLevels = [
    {
      id: 'quick',
      name: 'Quick Test',
      duration: '30 seconds',
      tests: 1,
      description: 'Fast assessment with single voice test'
    },
    {
      id: 'standard',
      name: 'Standard Test',
      duration: '2 minutes',
      tests: 4,
      description: 'Detailed analysis with four voice tests',
      recommended: true
    },
    {
      id: 'comprehensive',
      name: 'Comprehensive Test',
      duration: '5 minutes',
      tests: 8,
      description: 'Full evaluation with eight test protocols'
    },
    {
      id: 'clinical',
      name: 'Clinical Test',
      duration: '10 minutes',
      tests: 16,
      description: 'Professional clinical-grade analysis'
    }
  ]

  const handleStartTest = () => {
    if (selectedLevel) {
      router.push(`/test/recording?level=${selectedLevel}`)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="relative z-10">
          {/* Professional Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-sora font-bold text-white mb-2">Start New Test</h1>
            <p className="text-base text-gray-400 font-roboto">
              Select your test level and begin voice analysis
            </p>
          </div>

          {/* Professional Test Level Cards - Sophisticated & Minimal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {testLevels.map((level, index) => (
              <div
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className="group/card relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: selectedLevel === level.id 
                    ? '2px solid rgba(100, 255, 218, 0.5)' 
                    : '1px solid rgba(100, 255, 218, 0.15)',
                  boxShadow: selectedLevel === level.id
                    ? '0 10px 40px rgba(100, 255, 218, 0.2)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                {/* Subtle hover effect */}
                <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.05) 0%, transparent 100%)'
                  }}
                ></div>

                {/* Recommended Badge - Minimal */}
                {level.recommended && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-lg text-xs font-semibold z-20"
                    style={{
                      background: 'rgba(100, 255, 218, 0.1)',
                      border: '1px solid rgba(100, 255, 218, 0.3)',
                      color: '#64FFDA'
                    }}
                  >
                    Recommended
                  </div>
                )}

                {/* Selected Indicator - Minimal */}
                {selectedLevel === level.id && (
                  <div className="absolute top-4 left-4 w-2 h-2 rounded-full z-20"
                    style={{
                      background: '#64FFDA',
                      boxShadow: '0 0 10px rgba(100, 255, 218, 0.6)'
                    }}
                  ></div>
                )}

                <div className="relative z-10 p-6">
                  {/* Test Info */}
                  <div className="mb-5">
                    <h3 className={`text-2xl font-sora font-bold mb-2 transition-colors ${
                      selectedLevel === level.id ? 'text-electric-cyan' : 'text-white group-hover/card:text-electric-cyan'
                    }`}>
                      {level.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-roboto leading-relaxed">
                      {level.description}
                    </p>
                  </div>

                  {/* Stats - Minimal & Professional */}
                  <div className="flex items-center gap-4 text-sm text-gray-400 font-roboto">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{level.duration}</span>
                    </div>
                    <span className="w-1 h-1 rounded-full bg-gray-600"></span>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                      </svg>
                      <span>{level.tests} {level.tests === 1 ? 'test' : 'tests'}</span>
                    </div>
                  </div>
                </div>

                {/* Subtle bottom accent */}
                {selectedLevel === level.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, #64FFDA 50%, transparent 100%)'
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Professional Instructions Section - Minimal & Sophisticated */}
          <div className="rounded-xl p-6 mb-8"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(100, 255, 218, 0.15)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="mb-5">
              <h3 className="font-sora font-bold text-white text-lg mb-1">Pre-Test Preparation</h3>
              <p className="text-sm text-gray-400 font-roboto">Follow these steps for optimal results</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { 
                  text: 'Find a quiet environment',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.143 17.082a24.248 24.248 0 003.844.148m-3.844-.148a23.856 23.856 0 01-5.455-1.31 8.964 8.964 0 002.3-5.542m3.155 6.852a3 3 0 005.667 1.97m1.965-2.277L21 21m-4.225-4.225a23.81 23.81 0 003.536-1.003A8.967 8.967 0 0118 9.75V9A6 6 0 006.53 6.53m10.245 10.245L6.53 6.53M3 3l3.53 3.53" />
                    </svg>
                  )
                },
                { 
                  text: 'Check your microphone works',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                    </svg>
                  )
                },
                { 
                  text: 'Sit in a comfortable position',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  )
                },
                { 
                  text: 'Follow on-screen instructions carefully',
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                  style={{ 
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(100, 255, 218, 0.1)'
                  }}
                >
                  <div className="text-electric-cyan flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-sm text-gray-300 font-roboto">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Action Buttons - Sophisticated & Minimal */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/patient/dashboard')}
              className="px-6 py-3 rounded-lg font-sora font-medium text-sm transition-all duration-200 hover:-translate-x-1 flex items-center gap-2"
              style={{
                background: 'rgba(15, 23, 42, 0.6)',
                border: '1px solid rgba(100, 255, 218, 0.15)',
                color: '#9CA3AF',
                backdropFilter: 'blur(10px)'
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Dashboard</span>
            </button>

            <button
              onClick={handleStartTest}
              disabled={!selectedLevel}
              className={`px-8 py-3 rounded-lg font-sora font-semibold text-base transition-all duration-300 flex items-center gap-2 ${
                selectedLevel
                  ? 'hover:scale-105'
                  : 'cursor-not-allowed opacity-50'
              }`}
              style={{
                background: selectedLevel 
                  ? 'rgba(100, 255, 218, 0.15)'
                  : 'rgba(100, 255, 218, 0.05)',
                border: selectedLevel 
                  ? '1px solid rgba(100, 255, 218, 0.4)' 
                  : '1px solid rgba(100, 255, 218, 0.1)',
                color: selectedLevel ? '#64FFDA' : '#6B7280',
                boxShadow: selectedLevel ? '0 4px 20px rgba(100, 255, 218, 0.2)' : 'none'
              }}
            >
              <span>Start Test</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
