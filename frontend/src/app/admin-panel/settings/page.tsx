'use client'

import { useState, useEffect } from 'react'
import adminAPI from '@/lib/admin-api'

export default function AdminSettingsPage() {
  const [systemSettings, setSystemSettings] = useState<any>(null)
  const [emailSettings, setEmailSettings] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [system, email] = await Promise.all([
        adminAPI.getSystemSettings(),
        adminAPI.getEmailSettings()
      ])
      setSystemSettings(system)
      setEmailSettings(email)
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSystem = async () => {
    try {
      setSaving(true)
      await adminAPI.updateSystemSettings(systemSettings)
      alert('System settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveEmail = async () => {
    try {
      setSaving(true)
      await adminAPI.updateEmailSettings(emailSettings)
      alert('Email settings saved successfully!')
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
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
        <h1 className="text-3xl font-bold text-white">System Settings</h1>
        <p className="text-slate-400 mt-1">Configure system and application settings</p>
      </div>

      {/* System Settings */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Site Name</label>
            <input
              type="text"
              value={systemSettings?.site_name || ''}
              onChange={(e) => setSystemSettings({ ...systemSettings, site_name: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Site URL</label>
            <input
              type="text"
              value={systemSettings?.site_url || ''}
              onChange={(e) => setSystemSettings({ ...systemSettings, site_url: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Support Email</label>
            <input
              type="email"
              value={systemSettings?.support_email || ''}
              onChange={(e) => setSystemSettings({ ...systemSettings, support_email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={systemSettings?.enable_registration || false}
              onChange={(e) => setSystemSettings({ ...systemSettings, enable_registration: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm text-slate-300">Enable User Registration</label>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={systemSettings?.enable_google_oauth || false}
              onChange={(e) => setSystemSettings({ ...systemSettings, enable_google_oauth: e.target.checked })}
              className="w-4 h-4"
            />
            <label className="text-sm text-slate-300">Enable Google OAuth</label>
          </div>
          <button
            onClick={handleSaveSystem}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save System Settings'}
          </button>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Email Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Host</label>
            <input
              type="text"
              value={emailSettings?.smtp_host || ''}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtp_host: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">SMTP Port</label>
            <input
              type="number"
              value={emailSettings?.smtp_port || ''}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtp_port: parseInt(e.target.value) })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">From Email</label>
            <input
              type="email"
              value={emailSettings?.smtp_from_email || ''}
              onChange={(e) => setEmailSettings({ ...emailSettings, smtp_from_email: e.target.value })}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600"
            />
          </div>
          <button
            onClick={handleSaveEmail}
            disabled={saving}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Email Settings'}
          </button>
        </div>
      </div>
    </div>
  )
}
