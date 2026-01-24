'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'

export default function DoctorSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'privacy'>('general')

  const tabs = [
    { id: 'general', label: 'General', description: 'Language & preferences' },
    { id: 'notifications', label: 'Notifications', description: 'Email & alerts' },
    { id: 'security', label: 'Security', description: 'Password & 2FA' },
    { id: 'privacy', label: 'Privacy', description: 'Data controls' }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400 font-roboto">Manage your account preferences</p>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`p-4 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-800/60 border border-cyan-500/50'
                  : 'bg-slate-900/40 border border-slate-800 hover:border-cyan-500/30'
              }`}
              style={{ backdropFilter: 'blur(10px)' }}
            >
              <div className={`font-medium mb-1 ${
                activeTab === tab.id ? 'text-cyan-400' : 'text-white'
              }`}>
                {tab.label}
              </div>
              <div className="text-xs text-gray-400">{tab.description}</div>
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'privacy' && <PrivacySettings />}
        </div>
      </div>
    </DashboardLayout>
  )
}

function GeneralSettings() {
  return (
    <div className="space-y-4">
      {/* Language & Region */}
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-white">Language & Region</h2>
            <p className="text-sm text-gray-400">Localization preferences</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-300 mb-2">Language</label>
            <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500">
              <option>English</option>
              <option>Türkçe</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-300 mb-2">Time Zone</label>
            <select className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:ring-1 focus:ring-cyan-500 focus:border-cyan-500">
              <option>Istanbul (GMT+3)</option>
              <option>London (GMT+0)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Display */}
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-white">Display</h2>
            <p className="text-sm text-gray-400">Visual preferences</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
            <div>
              <div className="text-white font-medium">Dark Mode</div>
              <div className="text-sm text-gray-400">Always enabled</div>
            </div>
            <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-xs text-cyan-400">
              Active
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 bg-slate-800/50 border border-slate-700 text-gray-300 rounded-lg hover:border-cyan-500/50 transition-all">
          Reset
        </button>
        <button className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const notifications = [
    { title: 'Email Notifications', description: 'New patient alerts', enabled: true },
    { title: 'High Risk Alerts', description: 'Immediate notifications', enabled: true },
    { title: 'Weekly Summary', description: 'Patient statistics', enabled: false },
    { title: 'System Updates', description: 'New features', enabled: false }
  ]

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-white">Notifications</h2>
            <p className="text-sm text-gray-400">Manage alerts</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div key={notif.title} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <div className="text-white font-medium">{notif.title}</div>
                <div className="text-sm text-gray-400">{notif.description}</div>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notif.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notif.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const securityItems = [
    { 
      title: 'Change Password', 
      description: 'Last changed: 30 days ago',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      )
    },
    { 
      title: 'Two-Factor Authentication', 
      description: 'Extra security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )
    },
    { 
      title: 'Active Sessions', 
      description: '2 devices logged in',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ]

  return (
    <div className="space-y-4">
      {/* Security Score */}
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Security Score</h3>
              <p className="text-sm text-gray-400">Account security level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-cyan-400">85%</div>
            <div className="text-xs text-gray-400">Strong</div>
          </div>
        </div>
        <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-cyan-500 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>

      {/* Security Options */}
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-white">Security Settings</h2>
            <p className="text-sm text-gray-400">Manage account security</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {securityItems.map((item) => (
            <button 
              key={item.title}
              className="text-left p-4 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 border border-slate-700 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="text-cyan-400">{item.icon}</div>
                <div className="text-white font-medium">{item.title}</div>
              </div>
              <div className="text-sm text-gray-400">{item.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PrivacySettings() {
  const privacyOptions = [
    { title: 'Data Sharing', description: 'Control data sharing', enabled: false },
    { title: 'Analytics', description: 'Usage statistics', enabled: true },
    { title: 'Third-party Access', description: 'External integrations', enabled: false }
  ]

  return (
    <div className="space-y-4">
      <div className="bg-slate-900/40 rounded-lg border border-slate-800 p-6" style={{ backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
          <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h2 className="text-lg font-medium text-white">Privacy Controls</h2>
            <p className="text-sm text-gray-400">Manage data privacy</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {privacyOptions.map((option) => (
            <div key={option.title} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
              <div>
                <div className="text-white font-medium">{option.title}</div>
                <div className="text-sm text-gray-400">{option.description}</div>
              </div>
              <button
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  option.enabled ? 'bg-cyan-500' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    option.enabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-2 bg-cyan-500/10 border border-cyan-500/50 text-cyan-400 rounded-lg hover:bg-cyan-500/20 transition-all">
          Save Changes
        </button>
      </div>
    </div>
  )
}
