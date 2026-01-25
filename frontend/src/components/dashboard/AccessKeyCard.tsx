/**
 * Access Key Card Component
 * Displays patient's unique access key for sharing with doctors
 */
'use client'

import { useState, useEffect } from 'react'
// Icons as SVG components
const Copy = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

const RefreshCw = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
  </svg>
)

const Users = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
)

const Clock = ({ size = 16, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
)
import api from '@/lib/api'

interface AccessKeyData {
  access_key: string
  created_at: string
  active_doctors: number
  pending_requests: number
}

export default function AccessKeyCard() {
  const [keyData, setKeyData] = useState<AccessKeyData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  useEffect(() => {
    fetchAccessKey()
  }, [])

  const fetchAccessKey = async () => {
    try {
      const response = await api.get('/api/v1/patient/access-key')
      setKeyData(response.data)
    } catch (error) {
      console.error('Failed to fetch access key:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    if (keyData?.access_key) {
      navigator.clipboard.writeText(keyData.access_key)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleRegenerate = async () => {
    if (!confirm('Are you sure? This will invalidate your old key. Current doctors will keep their access.')) {
      return
    }

    setIsRegenerating(true)
    try {
      const response = await api.post('/api/v1/patient/access-key/regenerate')
      setKeyData(response.data)
      alert('Access key regenerated successfully!')
    } catch (error) {
      console.error('Failed to regenerate key:', error)
      alert('Failed to regenerate key. Please try again.')
    } finally {
      setIsRegenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-xl p-6 animate-pulse" style={{
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(100, 255, 218, 0.15)',
        backdropFilter: 'blur(10px)'
      }}>
        <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="h-12 bg-gray-700 rounded mb-4"></div>
        <div className="flex gap-2">
          <div className="h-10 bg-gray-700 rounded flex-1"></div>
          <div className="h-10 bg-gray-700 rounded flex-1"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl p-6 relative overflow-hidden group" style={{
      background: 'rgba(15, 23, 42, 0.4)',
      border: '1px solid rgba(100, 255, 218, 0.15)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-electric-cyan to-transparent"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
            background: 'rgba(100, 255, 218, 0.1)',
            border: '1px solid rgba(100, 255, 218, 0.3)'
          }}>
            <span className="text-2xl">🔑</span>
          </div>
          <div>
            <h3 className="text-lg font-sora font-semibold text-white">Your Access Key</h3>
            <p className="text-xs text-gray-400 font-roboto">Share with your doctor</p>
          </div>
        </div>

        {/* Access Key Display */}
        <div className="mb-4 p-4 rounded-lg" style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(100, 255, 218, 0.2)'
        }}>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold tracking-wider mb-1" style={{
              color: '#64FFDA',
              textShadow: '0 0 20px rgba(100, 255, 218, 0.3)'
            }}>
              {keyData?.access_key || 'Loading...'}
            </div>
            <div className="text-xs text-gray-500 font-roboto">
              Created {keyData?.created_at ? new Date(keyData.created_at).toLocaleDateString() : ''}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={handleCopy}
            className="flex-1 px-4 py-2.5 rounded-lg font-sora font-medium text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
            style={{
              background: copied ? 'rgba(132, 204, 22, 0.2)' : 'rgba(100, 255, 218, 0.1)',
              border: `1px solid ${copied ? 'rgba(132, 204, 22, 0.4)' : 'rgba(100, 255, 218, 0.3)'}`,
              color: copied ? '#84CC16' : '#64FFDA'
            }}
          >
            <Copy size={16} />
            {copied ? 'Copied!' : 'Copy Key'}
          </button>

          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex-1 px-4 py-2.5 rounded-lg font-sora font-medium text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              color: '#F59E0B'
            }}
          >
            <RefreshCw size={16} className={isRegenerating ? 'animate-spin' : ''} />
            {isRegenerating ? 'Regenerating...' : 'Regenerate'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg" style={{
            background: 'rgba(100, 255, 218, 0.05)',
            border: '1px solid rgba(100, 255, 218, 0.1)'
          }}>
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-electric-cyan" />
              <span className="text-xs text-gray-400 font-roboto">Active Doctors</span>
            </div>
            <div className="text-xl font-sora font-bold text-white">
              {keyData?.active_doctors || 0}
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{
            background: 'rgba(245, 158, 11, 0.05)',
            border: '1px solid rgba(245, 158, 11, 0.1)'
          }}>
            <div className="flex items-center gap-2 mb-1">
              <Clock size={14} className="text-sunset-orange" />
              <span className="text-xs text-gray-400 font-roboto">Pending</span>
            </div>
            <div className="text-xl font-sora font-bold text-white">
              {keyData?.pending_requests || 0}
            </div>
          </div>
        </div>

        {/* Info Text */}
        <div className="mt-4 p-3 rounded-lg" style={{
          background: 'rgba(139, 92, 246, 0.05)',
          border: '1px solid rgba(139, 92, 246, 0.1)'
        }}>
          <p className="text-xs text-gray-400 font-roboto leading-relaxed">
            💡 <span className="text-gray-300">Share this key with your doctor</span> to grant them access to your test results and medical data. You can revoke access anytime.
          </p>
        </div>
      </div>
    </div>
  )
}
