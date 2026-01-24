'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'

interface Settings {
  general: {
    siteName: string
    siteUrl: string
    supportEmail: string
    maintenanceMode: boolean
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUser: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  payment: {
    stripePublicKey: string
    stripeSecretKey: string
    paypalClientId: string
    paypalSecret: string
    testMode: boolean
  }
  security: {
    require2FA: boolean
    passwordMinLength: number
    sessionTimeout: number
    maxLoginAttempts: number
  }
  features: {
    enableRegistration: boolean
    enableDoctorPanel: boolean
    enableHospitalPanel: boolean
    enableSubscriptions: boolean
  }
}

export default function AdminSettingsPage() {
  const router = useRouter()
  const { user, isAuthenticated } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'general' | 'email' | 'payment' | 'security' | 'features'>('general')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [settings, setSettings] = useState<Settings>({
    general: {
      siteName: 'NeuralCipher AI',
      siteUrl: 'https://neuralcipher.ai',
      supportEmail: 'support@neuralcipher.ai',
      maintenanceMode: false
    },
    email: {
      smtpHost: '',
      smtpPort: '587',
      smtpUser: '',
      smtpPassword: '',
      fromEmail: 'noreply@neuralcipher.ai',
      fromName: 'NeuralCipher AI'
    },
    payment: {
      stripePublicKey: '',
      stripeSecretKey: '',
      paypalClientId: '',
      paypalSecret: '',
      testMode: true
    },
    security: {
      require2FA: false,
      passwordMinLength: 8,
      sessionTimeout: 30,
      maxLoginAttempts: 5
    },
    features: {
      enableRegistration: true,
      enableDoctorPanel: true,
      enableHospitalPanel: true,
      enableSubscriptions: true
    }
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }
    
    if (user && user.role !== 'admin') {
      router.replace('/dashboard')
      return
    }
    
    if (user?.role === 'admin') {
      fetchSettings()
    }
  }, [user, isAuthenticated, router])

  const fetchSettings = async () => {
    try {
      setError(null)
      const response = await api.get('/api/v1/admin/settings')
      setSettings(response.data)
    } catch (error: any) {
      console.error('Failed to fetch settings:', error)
      setError(error?.response?.data?.detail || 'Failed to load settings. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError(null)
    setSuccessMessage(null)
    try {
      await api.put('/api/v1/admin/settings', settings)
      setSuccessMessage('Settings saved successfully!')
      setTimeout(() => setSuccessMessage(null), 3000)
    } catch (error: any) {
      console.error('Failed to save settings:', error)
      setError(error?.response?.data?.detail || 'Failed to save settings')
    } finally {
      setIsSaving(false)
    }
  }

  const handleTestEmail = async () => {
    try {
      await api.post('/api/v1/admin/settings/test-email')
      alert('Test email sent! Check your inbox.')
    } catch (error) {
      console.error('Failed to send test email:', error)
      alert('Failed to send test email')
    }
  }

  const handleTestPayment = async () => {
    try {
      await api.post('/api/v1/admin/settings/test-payment')
      alert('Payment gateway connection successful!')
    } catch (error) {
      console.error('Failed to test payment:', error)
      alert('Failed to test payment gateway')
    }
  }

  const updateSettings = (section: keyof Settings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">System Settings</h1>
          <p className="text-gray-400 font-roboto">Configure system-wide settings and integrations</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-red-400 font-medium">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-green-400 font-medium flex-1">{successMessage}</p>
              <button
                onClick={() => setSuccessMessage(null)}
                className="text-green-400 hover:text-green-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl mb-6">
          <div className="flex overflow-x-auto">
            <TabButton
              active={activeTab === 'general'}
              onClick={() => setActiveTab('general')}
              icon={(
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            >
              General
            </TabButton>
            <TabButton
              active={activeTab === 'email'}
              onClick={() => setActiveTab('email')}
              icon={(
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              )}
            >
              Email
            </TabButton>
            <TabButton
              active={activeTab === 'payment'}
              onClick={() => setActiveTab('payment')}
              icon={(
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              )}
            >
              Payment
            </TabButton>
            <TabButton
              active={activeTab === 'security'}
              onClick={() => setActiveTab('security')}
              icon={(
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              )}
            >
              Security
            </TabButton>
            <TabButton
              active={activeTab === 'features'}
              onClick={() => setActiveTab('features')}
              icon={(
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              )}
            >
              Features
            </TabButton>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
          {activeTab === 'general' && (
            <GeneralSettings settings={settings.general} updateSettings={updateSettings} />
          )}
          {activeTab === 'email' && (
            <EmailSettings settings={settings.email} updateSettings={updateSettings} onTest={handleTestEmail} />
          )}
          {activeTab === 'payment' && (
            <PaymentSettings settings={settings.payment} updateSettings={updateSettings} onTest={handleTestPayment} />
          )}
          {activeTab === 'security' && (
            <SecuritySettings settings={settings.security} updateSettings={updateSettings} />
          )}
          {activeTab === 'features' && (
            <FeatureSettings settings={settings.features} updateSettings={updateSettings} />
          )}
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => fetchSettings()}
            className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 transition-colors font-roboto"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-white font-semibold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  )
}

function TabButton({ active, onClick, icon, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors font-roboto ${
        active
          ? 'border-cyan-500 text-cyan-400 bg-white/5'
          : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
      }`}
    >
      {icon}
      {children}
    </button>
  )
}

function GeneralSettings({ settings, updateSettings }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4 font-sora">General Settings</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Site Name</label>
        <input
          type="text"
          value={settings.siteName}
          onChange={(e) => updateSettings('general', 'siteName', e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Site URL</label>
        <input
          type="url"
          value={settings.siteUrl}
          onChange={(e) => updateSettings('general', 'siteUrl', e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Support Email</label>
        <input
          type="email"
          value={settings.supportEmail}
          onChange={(e) => updateSettings('general', 'supportEmail', e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
        <div>
          <p className="text-white font-medium">Maintenance Mode</p>
          <p className="text-sm text-gray-400">Temporarily disable site access for maintenance</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.maintenanceMode}
            onChange={(e) => updateSettings('general', 'maintenanceMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>
    </div>
  )
}

function EmailSettings({ settings, updateSettings, onTest }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white font-sora">Email Settings</h3>
        <button
          onClick={onTest}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Send Test Email
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Host</label>
          <input
            type="text"
            value={settings.smtpHost}
            onChange={(e) => updateSettings('email', 'smtpHost', e.target.value)}
            placeholder="smtp.gmail.com"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Port</label>
          <input
            type="text"
            value={settings.smtpPort}
            onChange={(e) => updateSettings('email', 'smtpPort', e.target.value)}
            placeholder="587"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Username</label>
        <input
          type="text"
          value={settings.smtpUser}
          onChange={(e) => updateSettings('email', 'smtpUser', e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">SMTP Password</label>
        <input
          type="password"
          value={settings.smtpPassword}
          onChange={(e) => updateSettings('email', 'smtpPassword', e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">From Email</label>
          <input
            type="email"
            value={settings.fromEmail}
            onChange={(e) => updateSettings('email', 'fromEmail', e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">From Name</label>
          <input
            type="text"
            value={settings.fromName}
            onChange={(e) => updateSettings('email', 'fromName', e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  )
}

function PaymentSettings({ settings, updateSettings, onTest }: any) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white font-sora">Payment Settings</h3>
        <button
          onClick={onTest}
          className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-lg text-cyan-400 hover:bg-cyan-500/30 transition-colors flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Test Connection
        </button>
      </div>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10 mb-4">
        <div>
          <p className="text-white font-medium">Test Mode</p>
          <p className="text-sm text-gray-400">Use test API keys for development</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.testMode}
            onChange={(e) => updateSettings('payment', 'testMode', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-medium text-white">Stripe Configuration</h4>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Stripe Public Key</label>
          <input
            type="text"
            value={settings.stripePublicKey}
            onChange={(e) => updateSettings('payment', 'stripePublicKey', e.target.value)}
            placeholder="pk_test_..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Stripe Secret Key</label>
          <input
            type="password"
            value={settings.stripeSecretKey}
            onChange={(e) => updateSettings('payment', 'stripeSecretKey', e.target.value)}
            placeholder="sk_test_..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/10">
        <h4 className="text-lg font-medium text-white">PayPal Configuration</h4>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Client ID</label>
          <input
            type="text"
            value={settings.paypalClientId}
            onChange={(e) => updateSettings('payment', 'paypalClientId', e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">PayPal Secret</label>
          <input
            type="password"
            value={settings.paypalSecret}
            onChange={(e) => updateSettings('payment', 'paypalSecret', e.target.value)}
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  )
}

function SecuritySettings({ settings, updateSettings }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4 font-sora">Security Settings</h3>

      <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
        <div>
          <p className="text-white font-medium">Require Two-Factor Authentication</p>
          <p className="text-sm text-gray-400">Force all users to enable 2FA</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={settings.require2FA}
            onChange={(e) => updateSettings('security', 'require2FA', e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Minimum Password Length</label>
        <input
          type="number"
          value={settings.passwordMinLength}
          onChange={(e) => updateSettings('security', 'passwordMinLength', parseInt(e.target.value))}
          min="6"
          max="32"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
        <p className="text-xs text-gray-400 mt-1">Recommended: 8 or more characters</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Session Timeout (minutes)</label>
        <input
          type="number"
          value={settings.sessionTimeout}
          onChange={(e) => updateSettings('security', 'sessionTimeout', parseInt(e.target.value))}
          min="5"
          max="1440"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
        <p className="text-xs text-gray-400 mt-1">Auto-logout after inactivity</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Max Login Attempts</label>
        <input
          type="number"
          value={settings.maxLoginAttempts}
          onChange={(e) => updateSettings('security', 'maxLoginAttempts', parseInt(e.target.value))}
          min="3"
          max="10"
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-cyan-500"
        />
        <p className="text-xs text-gray-400 mt-1">Lock account after failed attempts</p>
      </div>
    </div>
  )
}

function FeatureSettings({ settings, updateSettings }: any) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4 font-sora">Feature Flags</h3>
      <p className="text-gray-400 mb-6">Enable or disable system features</p>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="text-white font-medium">User Registration</p>
            <p className="text-sm text-gray-400">Allow new users to register</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableRegistration}
              onChange={(e) => updateSettings('features', 'enableRegistration', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="text-white font-medium">Doctor Panel</p>
            <p className="text-sm text-gray-400">Enable doctor dashboard and features</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableDoctorPanel}
              onChange={(e) => updateSettings('features', 'enableDoctorPanel', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="text-white font-medium">Hospital Panel</p>
            <p className="text-sm text-gray-400">Enable hospital dashboard and features</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableHospitalPanel}
              onChange={(e) => updateSettings('features', 'enableHospitalPanel', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>

        <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10">
          <div>
            <p className="text-white font-medium">Subscriptions</p>
            <p className="text-sm text-gray-400">Enable subscription plans and payments</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.enableSubscriptions}
              onChange={(e) => updateSettings('features', 'enableSubscriptions', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
          </label>
        </div>
      </div>
    </div>
  )
}
