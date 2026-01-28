'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { FiLoader, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { useAuthStore } from '@/lib/auth-store'

export default function AuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setTokens } = useAuthStore()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get tokens from URL
        const accessToken = searchParams.get('access_token')
        const refreshToken = searchParams.get('refresh_token')
        const role = searchParams.get('role')
        const error = searchParams.get('error')

        // Check for errors
        if (error) {
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          setTimeout(() => {
            router.push('/auth/login')
          }, 3000)
          return
        }

        // Validate tokens
        if (!accessToken || !refreshToken) {
          setStatus('error')
          setMessage('Invalid authentication response.')
          setTimeout(() => {
            router.push('/auth/login')
          }, 3000)
          return
        }

        // Store tokens
        setTokens(accessToken, refreshToken)

        // Success
        setStatus('success')
        setMessage('Authentication successful! Redirecting...')

        // Redirect based on role
        setTimeout(() => {
          switch (role) {
            case 'admin':
              router.push('/neural-control-center/dashboard')
              break
            case 'doctor':
              router.push('/doctor/dashboard')
              break
            case 'hospital':
              router.push('/hospital/dashboard')
              break
            default:
              router.push('/patient/dashboard')
          }
        }, 1500)

      } catch (err) {
        console.error('Callback error:', err)
        setStatus('error')
        setMessage('An error occurred during authentication.')
        setTimeout(() => {
          router.push('/auth/login')
        }, 3000)
      }
    }

    handleCallback()
  }, [searchParams, router, setTokens])

  return (
    <div className="min-h-screen modern-bg flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-[#64FFDA]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 glass-modern p-12 rounded-3xl max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          className="mb-6 flex justify-center"
          animate={
            status === 'loading'
              ? { rotate: 360 }
              : status === 'success'
              ? { scale: [1, 1.2, 1] }
              : { scale: [1, 0.9, 1] }
          }
          transition={
            status === 'loading'
              ? { duration: 1, repeat: Infinity, ease: "linear" }
              : { duration: 0.5 }
          }
        >
          {status === 'loading' && (
            <FiLoader className="w-16 h-16 text-[#64FFDA]" />
          )}
          {status === 'success' && (
            <FiCheckCircle className="w-16 h-16 text-green-400" />
          )}
          {status === 'error' && (
            <FiXCircle className="w-16 h-16 text-red-400" />
          )}
        </motion.div>

        {/* Message */}
        <h2 className="text-2xl font-bold text-white mb-3">
          {status === 'loading' && 'Authenticating...'}
          {status === 'success' && 'Success!'}
          {status === 'error' && 'Error'}
        </h2>
        <p className="text-gray-400">{message}</p>

        {/* Progress Bar */}
        {status === 'loading' && (
          <motion.div
            className="mt-6 h-1 bg-gray-800 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-[#64FFDA] to-[#3B82F6]"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
