'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiShield, FiLock, FiEye, FiEyeOff, FiAlertTriangle } from 'react-icons/fi'
import { useAuthStore } from '@/lib/auth-store'

export default function NeuralControlCenter() {
  const router = useRouter()
  const { login, isLoading } = useAuthStore()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Security: Max 5 attempts
    if (attempts >= 5) {
      setError('Too many failed attempts. Access temporarily blocked.')
      return
    }

    try {
      const user = await login(email, password, 'admin')
      
      if (!user || !user.role) {
        setAttempts(prev => prev + 1)
        setError('Invalid credentials')
        return
      }
      
      const userRole = String(user.role).toUpperCase().trim()
      
      // CRITICAL: Only ADMIN role allowed
      if (userRole !== 'ADMIN') {
        setAttempts(prev => prev + 1)
        setError('Access Denied: Insufficient privileges')
        return
      }
      
      // Success - redirect to neural control center dashboard
      router.push('/neural-control-center/dashboard')
      
    } catch (err: any) {
      setAttempts(prev => prev + 1)
      setError('Authentication failed')
      console.error('Admin login failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0A0E27] relative overflow-hidden flex items-center justify-center">
      {/* Animated Security Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#64FFDA 1px, transparent 1px), linear-gradient(90deg, #64FFDA 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Security Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#64FFDA]/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Main Login Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        {/* Security Warning Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <FiAlertTriangle className="text-red-400 text-xl flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm font-semibold">Restricted Area</p>
              <p className="text-red-300/70 text-xs">Unauthorized access attempts are logged and monitored</p>
            </div>
          </div>
        </motion.div>

        {/* Login Card */}
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6] rounded-2xl blur-xl opacity-20" />
          
          <div className="relative bg-[#0A0E27]/90 backdrop-blur-2xl border border-[#64FFDA]/20 rounded-2xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#64FFDA]/20 to-[#3B82F6]/20 border border-[#64FFDA]/30 mb-4"
              >
                <FiShield className="text-4xl text-[#64FFDA]" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-white mb-2">
                Neural Control Center
              </h1>
              <p className="text-gray-400 text-sm">
                Administrator Access Only
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
              >
                <p className="text-red-400 text-sm flex items-center gap-2">
                  <FiAlertTriangle />
                  {error}
                </p>
                {attempts > 0 && (
                  <p className="text-red-300/60 text-xs mt-1">
                    Attempts: {attempts}/5
                  </p>
                )}
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Administrator Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={attempts >= 5}
                    className="w-full px-4 py-3 bg-[#1a1f3a]/50 border border-[#64FFDA]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA] focus:ring-2 focus:ring-[#64FFDA]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="admin@neuralcipher.ai"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <FiLock className="text-gray-500" />
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Secure Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={attempts >= 5}
                    className="w-full px-4 py-3 bg-[#1a1f3a]/50 border border-[#64FFDA]/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#64FFDA] focus:ring-2 focus:ring-[#64FFDA]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed pr-12"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#64FFDA] transition-colors"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading || attempts >= 5}
                whileHover={{ scale: attempts >= 5 ? 1 : 1.02 }}
                whileTap={{ scale: attempts >= 5 ? 1 : 0.98 }}
                className="w-full relative group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] via-[#3B82F6] to-[#8B5CF6]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#3B82F6] to-[#64FFDA] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative px-6 py-3 text-[#0A0E27] font-bold text-sm flex items-center justify-center gap-2">
                  <FiShield />
                  {isLoading ? 'Authenticating...' : 'Secure Access'}
                </div>
              </motion.button>
            </form>

            {/* Security Footer */}
            <div className="mt-6 pt-6 border-t border-[#64FFDA]/10">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <FiShield className="text-[#64FFDA]" />
                <span>256-bit Encrypted Connection</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Warning */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-gray-500 mt-6"
        >
          All access attempts are logged and monitored for security purposes
        </motion.p>

        {/* System Status Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#64FFDA]/20 via-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-xl blur-lg" />
          
          <div className="relative bg-[#0A0E27]/80 backdrop-blur-xl border border-[#64FFDA]/10 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-[#64FFDA] mb-4 flex items-center gap-2">
              <FiShield className="text-lg" />
              System Security Status
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              {/* Active Sessions */}
              <div className="bg-[#1a1f3a]/50 rounded-lg p-4 border border-[#64FFDA]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Active Sessions</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </div>
                <p className="text-2xl font-bold text-white">0</p>
                <p className="text-xs text-gray-500 mt-1">Currently online</p>
              </div>

              {/* Security Level */}
              <div className="bg-[#1a1f3a]/50 rounded-lg p-4 border border-[#64FFDA]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Security Level</span>
                  <FiShield className="text-[#64FFDA]" />
                </div>
                <p className="text-2xl font-bold text-[#64FFDA]">MAX</p>
                <p className="text-xs text-gray-500 mt-1">256-bit encryption</p>
              </div>

              {/* Failed Attempts */}
              <div className="bg-[#1a1f3a]/50 rounded-lg p-4 border border-[#64FFDA]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Failed Attempts</span>
                  <FiAlertTriangle className="text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white">{attempts}</p>
                <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
              </div>

              {/* System Health */}
              <div className="bg-[#1a1f3a]/50 rounded-lg p-4 border border-[#64FFDA]/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">System Health</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <p className="text-2xl font-bold text-green-400">100%</p>
                <p className="text-xs text-gray-500 mt-1">All systems operational</p>
              </div>
            </div>

            {/* Last Activity */}
            <div className="mt-4 pt-4 border-t border-[#64FFDA]/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Last Admin Access:</span>
                <span className="text-gray-400">Never</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
