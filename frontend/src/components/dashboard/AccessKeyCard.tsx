/**
 * Access Key Card Component - Ultra Minimal
 */
'use client'

import { useState, useEffect } from 'react'
const Copy = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
)

const RefreshCw = ({ size = 12, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <polyline points="23 4 23 10 17 10"></polyline>
    <polyline points="1 20 1 14 7 14"></polyline>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
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
    if (!confirm('Are you sure? This will invalidate your old key.')) return
    setIsRegenerating(true)
    try {
      const response = await api.post('/api/v1/patient/access-key/regenerate')
      setKeyData(response.data)
      alert('Key regenerated!')
    } catch (error) {
      console.error('Failed to regenerate key:', error)
      alert('Failed to regenerate key.')
    } finally {
      setIsRegenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="rounded p-2 animate-pulse" style={{
        background: 'rgba(15, 23, 42, 0.4)',
        border: '1px solid rgba(100, 255, 218, 0.15)'
      }}>
        <div className="h-3 bg-gray-700 rounded w-1/4 mb-1.5"></div>
        <div className="h-6 bg-gray-700 rounded mb-1.5"></div>
        <div className="flex gap-1.5">
          <div className="h-6 bg-gray-700 rounded flex-1"></div>
          <div className="h-6 bg-gray-700 rounded flex-1"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded p-2 relative" style={{
      background: 'rgba(15, 23, 42, 0.4)',
      border: '1px solid rgba(100, 255, 218, 0.15)'
    }}>
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="text-xs">🔑</span>
        <h3 className="text-xs font-sora font-semibold text-white">Access Key</h3>
      </div>

      <div className="mb-1.5 p-1.5 rounded text-center" style={{
        background: 'rgba(0, 0, 0, 0.3)',
        border: '1px solid rgba(100, 255, 218, 0.2)'
      }}>
        <div className="text-sm font-mono font-bold tracking-wider" style={{
          color: '#64FFDA'
        }}>
          {keyData?.access_key || 'Loading...'}
        </div>
      </div>

      <div className="flex gap-1.5 mb-1.5">
        <button
          onClick={handleCopy}
          className="flex-1 px-1.5 py-1 rounded font-sora text-xs transition-all flex items-center justify-center gap-1"
          style={{
            background: copied ? 'rgba(132, 204, 22, 0.2)' : 'rgba(100, 255, 218, 0.1)',
            border: `1px solid ${copied ? 'rgba(132, 204, 22, 0.4)' : 'rgba(100, 255, 218, 0.3)'}`,
            color: copied ? '#84CC16' : '#64FFDA'
          }}
        >
          <Copy size={12} />
          {copied ? 'OK' : 'Copy'}
        </button>

        <button
          onClick={handleRegenerate}
          disabled={isRegenerating}
          className="flex-1 px-1.5 py-1 rounded font-sora text-xs transition-all flex items-center justify-center gap-1 disabled:opacity-50"
          style={{
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            color: '#F59E0B'
          }}
        >
          <RefreshCw size={12} className={isRegenerating ? 'animate-spin' : ''} />
          New
        </button>
      </div>

      <div className="flex gap-1.5 text-xs">
        <div className="flex-1 px-1.5 py-1 rounded flex items-center justify-between" style={{
          background: 'rgba(100, 255, 218, 0.05)',
          border: '1px solid rgba(100, 255, 218, 0.1)'
        }}>
          <span className="text-gray-400 font-roboto text-xs">Doctors</span>
          <span className="font-sora font-bold text-white text-xs">{keyData?.active_doctors || 0}</span>
        </div>

        <div className="flex-1 px-1.5 py-1 rounded flex items-center justify-between" style={{
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.1)'
        }}>
          <span className="text-gray-400 font-roboto text-xs">Pending</span>
          <span className="font-sora font-bold text-white text-xs">{keyData?.pending_requests || 0}</span>
        </div>
      </div>
    </div>
  )
}
