'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminEmailsPage() {
  const [settings, setSettings] = useState<any>(null)
  const [testEmail, setTestEmail] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const data = await adminAPI.getEmailSettings()
      setSettings(data)
    } catch (error) {
      console.error('Failed to load email settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSendTest = async () => {
    if (!testEmail) {
      alert('Please enter an email address')
      return
    }
    try {
      setSending(true)
      await adminAPI.sendTestEmail(testEmail)
      alert('Test email sent successfully!')
      setTestEmail('')
    } catch (error) {
      console.error('Failed to send test email:', error)
      alert('Failed to send test email')
    } finally {
      setSending(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Email Management</h1>
        <p className="text-slate-400 mt-1">Manage email settings and send test emails</p>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Current Email Configuration</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">SMTP Host:</span>
            <span className="text-white">{settings?.smtp_host}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">SMTP Port:</span>
            <span className="text-white">{settings?.smtp_port}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">From Email:</span>
            <span className="text-white">{settings?.smtp_from_email}</span>
          </div>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Send Test Email</h3>
        <div className="flex gap-4">
          <input
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="Enter recipient email"
            className="flex-1 px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
          />
          <button
            onClick={handleSendTest}
            disabled={sending}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {sending ? 'Sending...' : 'Send Test'}
          </button>
        </div>
      </div>
    </div>
  )
}
