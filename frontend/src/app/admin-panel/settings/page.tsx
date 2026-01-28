'use client'

import { useState } from 'react'

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('general')

  const tabs = [
    { id: 'general', label: 'General', icon: '⚙️' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'ai', label: 'AI Model', icon: '🤖' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">System Settings</h1>
        <p className="text-slate-600 mt-1">Configure system-wide settings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="border-b border-slate-200 px-6">
          <div className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-slate-600 hover:text-slate-800'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'email' && <EmailSettings />}
          {activeTab === 'security' && <SecuritySettings />}
          {activeTab === 'payment' && <PaymentSettings />}
          {activeTab === 'ai' && <AISettings />}
          {activeTab === 'maintenance' && <MaintenanceSettings />}
        </div>
      </div>
    </div>
  )
}

function GeneralSettings() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Site Name</label>
        <input
          type="text"
          defaultValue="NeuralCipher AI"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Site Description</label>
        <textarea
          rows={3}
          defaultValue="AI-powered Parkinson's disease detection platform"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
          <input
            type="email"
            defaultValue="info@neuralcipher.ai"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
          <input
            type="email"
            defaultValue="support@neuralcipher.ai"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Default Language</label>
        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>English</option>
          <option>Turkish</option>
          <option>German</option>
        </select>
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save Changes
      </button>
    </div>
  )
}

function EmailSettings() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Host</label>
          <input
            type="text"
            defaultValue="smtp.gmail.com"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Port</label>
          <input
            type="text"
            defaultValue="587"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Username</label>
          <input
            type="text"
            defaultValue="noreply@neuralcipher.ai"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">SMTP Password</label>
          <input
            type="password"
            defaultValue="••••••••"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
        <input type="checkbox" id="test-mode" className="w-4 h-4 text-purple-600 rounded" />
        <label htmlFor="test-mode" className="text-sm text-slate-700">Enable test mode (emails won't be sent)</label>
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save & Test Email
      </button>
    </div>
  )
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <p className="font-medium text-slate-800">Two-Factor Authentication</p>
          <p className="text-sm text-slate-600">Require 2FA for all admin users</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" defaultChecked />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Password Length</label>
        <input
          type="number"
          defaultValue="8"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (minutes)</label>
        <input
          type="number"
          defaultValue="30"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">IP Whitelist (one per line)</label>
        <textarea
          rows={4}
          placeholder="192.168.1.1&#10;10.0.0.1"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save Security Settings
      </button>
    </div>
  )
}

function PaymentSettings() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Stripe Publishable Key</label>
        <input
          type="text"
          defaultValue="pk_test_..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Stripe Secret Key</label>
        <input
          type="password"
          defaultValue="sk_test_..."
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Currency</label>
        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
          <option>TRY</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Tax Rate (%)</label>
        <input
          type="number"
          defaultValue="20"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save Payment Settings
      </button>
    </div>
  )
}

function AISettings() {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Model Version</label>
        <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
          <option>v1.0.0 (Current)</option>
          <option>v0.9.5</option>
          <option>v0.9.0</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">API Endpoint</label>
        <input
          type="text"
          defaultValue="https://api.neuralcipher.ai/v1/predict"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Confidence Threshold (%)</label>
        <input
          type="number"
          defaultValue="75"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="p-4 bg-blue-50 rounded-lg">
        <p className="text-sm font-medium text-slate-800 mb-2">Model Performance</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Accuracy:</span>
            <span className="font-semibold">94.2%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Avg Response Time:</span>
            <span className="font-semibold">1.2s</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Total Predictions:</span>
            <span className="font-semibold">3,892</span>
          </div>
        </div>
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save AI Settings
      </button>
    </div>
  )
}

function MaintenanceSettings() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div>
          <p className="font-medium text-slate-800">Maintenance Mode</p>
          <p className="text-sm text-slate-600">Enable to show maintenance page to users</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Maintenance Message</label>
        <textarea
          rows={3}
          defaultValue="We're currently performing scheduled maintenance. We'll be back soon!"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Estimated End Time</label>
        <input
          type="datetime-local"
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div className="p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="font-medium text-red-800 mb-2">⚠️ Danger Zone</p>
        <div className="space-y-3">
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Clear All Cache
          </button>
          <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
            Reset Database
          </button>
        </div>
      </div>

      <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
        Save Maintenance Settings
      </button>
    </div>
  )
}
