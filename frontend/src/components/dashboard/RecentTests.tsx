/**
 * NeuralCipher.ai - WORLD'S BEST RECENT TESTS DESIGN
 * Ultra Premium, Futuristic, Award-Winning Interface
 */
'use client'

import { useRouter } from 'next/navigation'
import type { VoiceTest } from '@/types'

interface RecentTestsProps {
  tests: VoiceTest[]
}

export default function RecentTests({ tests }: RecentTestsProps) {
  const router = useRouter()

  if (!tests || tests.length === 0) {
    return (
      <div className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.01]"
        style={{
          background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(20, 25, 50, 0.98) 50%, rgba(15, 20, 45, 0.95) 100%)',
          border: '2px solid transparent',
          backgroundClip: 'padding-box',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(100, 255, 218, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Animated Border Gradient */}
        <div className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #64FFDA 100%)',
            backgroundSize: '300% 300%',
            animation: 'gradient-shift 8s ease infinite',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        />

        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-electric-cyan rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-glow rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-azure-start rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Premium Header */}
          <div className="p-8 border-b border-gray-800/50 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Animated Icon Container */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan to-azure-start rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-cyan via-azure-start to-neon-glow flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500"
                    style={{
                      boxShadow: '0 0 40px rgba(100, 255, 218, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                    }}
                  >
                    {/* Medical Waveform Icon - Voice Analysis */}
                    <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l3-9 4 18 3-9h4" />
                    </svg>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-2xl font-sora font-black mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #64FFDA 50%, #3B82F6 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 0 30px rgba(100, 255, 218, 0.3)'
                    }}
                  >
                    Recent Tests
                  </h3>
                  <p className="text-sm text-gray-400 font-roboto flex items-center gap-2">
                    <span className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse"></span>
                    <span>Your voice analysis history</span>
                  </p>
                </div>
              </div>
              
              {/* Premium Badge */}
              <div className="px-4 py-2 rounded-full text-xs font-bold relative overflow-hidden group/badge cursor-default"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)',
                  border: '2px solid rgba(100, 255, 218, 0.4)',
                  boxShadow: '0 0 30px rgba(100, 255, 218, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-azure-start/20 opacity-0 group-hover/badge:opacity-100 transition-opacity"></div>
                <span className="relative z-10 text-electric-cyan flex items-center gap-2">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>0 TESTS</span>
                </span>
              </div>
            </div>
          </div>

          {/* Premium Empty State */}
          <div className="text-center py-16 px-8">
            {/* Floating Icon */}
            <div className="relative inline-block mb-8">
              {/* Glow Rings */}
              <div className="absolute inset-0 -m-8">
                <div className="absolute inset-0 border-2 border-electric-cyan/20 rounded-full animate-ping"></div>
                <div className="absolute inset-0 border-2 border-azure-start/20 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute inset-0 border-2 border-neon-glow/20 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
              </div>
              
              {/* Main Icon */}
              <div className="relative w-32 h-32 rounded-3xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(59, 130, 246, 0.1) 50%, rgba(139, 92, 246, 0.1) 100%)',
                  border: '3px solid rgba(100, 255, 218, 0.3)',
                  boxShadow: '0 0 60px rgba(100, 255, 218, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Medical Waveform Icon - Voice Analysis */}
                <svg className="w-16 h-16 text-electric-cyan drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l3-9 4 18 3-9h4" />
                </svg>
              </div>
            </div>
            
            <h4 className="text-3xl font-sora font-black mb-3"
              style={{
                background: 'linear-gradient(135deg, #FFFFFF 0%, #64FFDA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              No Tests Yet
            </h4>
            <p className="text-gray-400 font-roboto mb-8 max-w-md mx-auto text-base leading-relaxed">
              Start your first voice analysis to track your vocal health and detect early signs with AI-powered precision
            </p>
            
            {/* Premium CTA Button */}
            <button
              onClick={() => router.push('/test/new')}
              className="group/btn relative px-10 py-4 rounded-2xl font-sora font-bold text-base transition-all duration-500 hover:scale-105 inline-flex items-center gap-3 overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 50%, #8B5CF6 100%)',
                boxShadow: '0 10px 40px rgba(100, 255, 218, 0.4), 0 0 60px rgba(100, 255, 218, 0.2)',
                color: '#0A0E27'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
              {/* Medical Waveform Icon - Voice Analysis */}
              <svg className="w-6 h-6 relative z-10 group-hover/btn:rotate-12 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l3-9 4 18 3-9h4" />
              </svg>
              <span className="relative z-10">Take Your First Test</span>
              <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Corner Glow Effects */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-electric-cyan/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-neon-glow/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
      </div>
    )
  }

  return (
    <div className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.01]"
      style={{
        background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(20, 25, 50, 0.98) 50%, rgba(15, 20, 45, 0.95) 100%)',
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), 0 0 80px rgba(100, 255, 218, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Animated Border Gradient */}
      <div className="absolute inset-0 rounded-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(135deg, #64FFDA 0%, #3B82F6 25%, #8B5CF6 50%, #EC4899 75%, #64FFDA 100%)',
          backgroundSize: '300% 300%',
          animation: 'gradient-shift 8s ease infinite',
          padding: '2px',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude'
        }}
      />

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-electric-cyan rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-neon-glow rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Premium Header */}
        <div className="p-8 border-b border-gray-800/50 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Animated Icon Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan to-azure-start rounded-2xl blur-xl opacity-60 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-cyan via-azure-start to-neon-glow flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500"
                  style={{
                    boxShadow: '0 0 40px rgba(100, 255, 218, 0.6), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                  }}
                >
                  {/* Medical Chart Icon - Analytics */}
                  <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-sora font-black mb-1"
                  style={{
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #64FFDA 50%, #3B82F6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(100, 255, 218, 0.3)'
                  }}
                >
                  Recent Tests
                </h3>
                <p className="text-sm text-gray-400 font-roboto flex items-center gap-2">
                  <span className="w-2 h-2 bg-lime-green rounded-full animate-pulse"></span>
                  <span>{tests.length} voice analyses completed</span>
                </p>
              </div>
            </div>
            
            {/* View All Button */}
            <button
              onClick={() => router.push('/history')}
              className="group/btn px-6 py-3 rounded-xl font-sora font-semibold text-sm transition-all duration-300 hover:scale-105 flex items-center gap-2 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
                border: '2px solid rgba(100, 255, 218, 0.3)',
                boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-cyan/20 to-azure-start/20 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
              <span className="relative z-10 text-electric-cyan">View All</span>
              <svg className="relative z-10 w-4 h-4 text-electric-cyan group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Premium Test Cards */}
        <div className="p-6 space-y-4">
          {tests.map((test, index) => (
            <div
              key={test.id}
              onClick={() => router.push(`/results/${test.id}`)}
              className="group/item relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 animate-fade-in"
              style={{ 
                animationDelay: `${index * 100}ms`,
                background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 41, 59, 0.6) 100%)',
                border: '2px solid rgba(100, 255, 218, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 40px rgba(100, 255, 218, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Hover Gradient Effect */}
              <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 bg-gradient-to-r ${getRiskGradient(test.risk_score)}`}
                style={{ opacity: 0.05 }}
              ></div>

              {/* Animated Border on Hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${getRiskColorHex(test.risk_score)} 0%, transparent 100%)`,
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}
              />
              
              <div className="relative z-10 p-6 flex items-center justify-between">
                {/* Left Section: Score + Info */}
                <div className="flex items-center gap-5">
                  {/* Premium Score Display */}
                  <div className="relative">
                    {/* Glow Ring */}
                    <div className={`absolute inset-0 -m-2 rounded-2xl blur-xl opacity-60 group-hover/item:opacity-100 transition-opacity`}
                      style={{ background: getRiskColorHex(test.risk_score) }}
                    ></div>
                    
                    {/* Score Container */}
                    <div className={`relative w-20 h-20 rounded-2xl flex items-center justify-center border-2 ${getRiskBorder(test.risk_score)} backdrop-blur-sm`}
                      style={{
                        background: `linear-gradient(135deg, ${getRiskColorHex(test.risk_score)}15 0%, ${getRiskColorHex(test.risk_score)}05 100%)`,
                        boxShadow: `0 0 30px ${getRiskColorHex(test.risk_score)}40, inset 0 2px 0 rgba(255, 255, 255, 0.1)`
                      }}
                    >
                      <div className="text-center">
                        <div className={`text-3xl font-black font-sora ${getRiskColor(test.risk_score)} drop-shadow-lg`}>
                          {test.risk_score}
                        </div>
                        <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Test Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getTestIcon(test.test_level)}
                      <span className="font-sora font-bold text-white text-lg group-hover/item:text-electric-cyan transition-colors">
                        {getTestLevelLabel(test.test_level)}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 font-roboto">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-electric-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        <span>{formatDate(test.test_date)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section: Status + Arrow */}
                <div className="flex items-center gap-4">
                  {/* Premium Status Badge */}
                  <div className={`px-5 py-2.5 rounded-xl text-sm font-bold ${getStatusStyle(test.status)} backdrop-blur-sm relative overflow-hidden group/status`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover/status:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      {getStatusIcon(test.status)}
                      <span>{getStatusLabel(test.status)}</span>
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 flex items-center justify-center border border-electric-cyan/30 group-hover/item:scale-110 group-hover/item:rotate-12 transition-all duration-500"
                    style={{ boxShadow: '0 0 20px rgba(100, 255, 218, 0.2)' }}
                  >
                    <svg className="w-5 h-5 text-electric-cyan group-hover/item:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Bottom Glow Line */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500`}
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${getRiskColorHex(test.risk_score)} 50%, transparent 100%)`,
                  boxShadow: `0 0 20px ${getRiskColorHex(test.risk_score)}`
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Corner Glow Effects */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-br from-electric-cyan/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-gradient-to-tl from-neon-glow/20 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
    </div>
  )
}

function getRiskColor(score: number) {
  if (score < 30) return 'text-lime-green'
  if (score < 60) return 'text-sunset-orange'
  return 'text-vibrant-pink'
}

function getRiskColorHex(score: number): string {
  if (score < 30) return '#84CC16'
  if (score < 60) return '#F59E0B'
  return '#EC4899'
}

function getRiskBg(score: number) {
  if (score < 30) return 'bg-gradient-to-br from-lime-green/20 to-electric-cyan/20'
  if (score < 60) return 'bg-gradient-to-br from-sunset-orange/20 to-vibrant-pink/20'
  return 'bg-gradient-to-br from-vibrant-pink/20 to-red-500/20'
}

function getRiskBorder(score: number) {
  if (score < 30) return 'border-lime-green/40'
  if (score < 60) return 'border-sunset-orange/40'
  return 'border-vibrant-pink/40'
}

function getRiskGradient(score: number) {
  if (score < 30) return 'from-lime-green to-electric-cyan'
  if (score < 60) return 'from-sunset-orange to-vibrant-pink'
  return 'from-vibrant-pink to-red-500'
}

function getTestIcon(level: string) {
  const iconStyle = "w-6 h-6 drop-shadow-lg"
  const icons: Record<string, JSX.Element> = {
    quick: (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 border border-electric-cyan/40 flex items-center justify-center backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(100, 255, 218, 0.3)' }}
      >
        {/* Quick Medical Scan - Stethoscope */}
        <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      </div>
    ),
    standard: (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure-start/20 to-neon-glow/20 border border-azure-start/40 flex items-center justify-center backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
      >
        {/* Standard Medical Analysis - Heart Monitor */}
        <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h4l3-6 4 12 3-6h4" />
        </svg>
      </div>
    ),
    comprehensive: (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-glow/20 to-vibrant-pink/20 border border-neon-glow/40 flex items-center justify-center backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' }}
      >
        {/* Comprehensive Medical - Brain Scan */}
        <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      </div>
    ),
    clinical: (
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-vibrant-pink/20 to-sunset-orange/20 border border-vibrant-pink/40 flex items-center justify-center backdrop-blur-sm"
        style={{ boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)' }}
      >
        {/* Clinical Medical - Hospital Cross */}
        <svg className={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 19.5a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016.75 4.5h10.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25H6.75z" />
        </svg>
      </div>
    )
  }
  return icons[level] || icons.quick
}

function getTestLevelLabel(level: string) {
  const labels: Record<string, string> = {
    quick: 'Quick Test',
    standard: 'Standard Test',
    comprehensive: 'Comprehensive Test',
    clinical: 'Clinical Test'
  }
  return labels[level] || level
}

function getStatusIcon(status: string) {
  const icons: Record<string, JSX.Element> = {
    completed: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    processing: (
      <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    failed: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    )
  }
  return icons[status] || icons.completed
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    completed: 'Completed',
    processing: 'Processing',
    failed: 'Failed'
  }
  return labels[status] || status
}

function getStatusStyle(status: string) {
  const styles: Record<string, string> = {
    completed: 'bg-gradient-to-r from-lime-green/20 to-electric-cyan/20 text-lime-green border-2 border-lime-green/40',
    processing: 'bg-gradient-to-r from-electric-cyan/20 to-azure-start/20 text-electric-cyan border-2 border-electric-cyan/40',
    failed: 'bg-gradient-to-r from-vibrant-pink/20 to-red-500/20 text-vibrant-pink border-2 border-vibrant-pink/40'
  }
  return styles[status] || 'bg-gray-500/20 text-gray-400 border-2 border-gray-500/30'
}

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
