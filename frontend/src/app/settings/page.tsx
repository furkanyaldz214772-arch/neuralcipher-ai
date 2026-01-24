'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'

export default function SettingsPage() {
  const { user } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'privacy'>('general')

  const tabs = [
    { 
      id: 'general', 
      label: 'General', 
      icon: '⚙️',
      gradient: 'from-electric-cyan to-azure-start',
      description: 'Language, timezone & preferences'
    },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: '🔔',
      gradient: 'from-neon-glow to-vibrant-pink',
      description: 'Email & push notifications'
    },
    { 
      id: 'security', 
      label: 'Security', 
      icon: '🔒',
      gradient: 'from-sunset-orange to-lime-green',
      description: 'Password & authentication'
    },
    { 
      id: 'privacy', 
      label: 'Privacy', 
      icon: '🛡️',
      gradient: 'from-vibrant-pink to-neon-glow',
      description: 'Data & privacy controls'
    }
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Animated background particles */}
        <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-gradient-cyber rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-gradient-sunset rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-ocean rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative z-10">
          {/* Header with stats */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-sora font-bold gradient-text mb-2">Settings</h1>
                <p className="text-gray-400 font-roboto">Manage your account preferences and security</p>
              </div>
              
              {/* Quick stats */}
              <div className="flex gap-4">
                <div className="glassmorphism rounded-xl px-4 py-3 border border-lime-green/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-lime-green rounded-full animate-pulse"></div>
                    <span className="text-lime-green font-medium font-roboto">2FA Active</span>
                  </div>
                </div>
                <div className="glassmorphism rounded-xl px-4 py-3 border border-electric-cyan/30">
                  <div className="flex items-center gap-2">
                    <span className="text-electric-cyan font-medium font-roboto">Last login: 2 min ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab navigation - Modern card style */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border-2 border-electric-cyan shadow-neon-lg scale-105'
                      : 'glassmorphism hover:scale-105 hover:shadow-glow-md border border-gray-800'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Animated background */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${tab.gradient} opacity-10`}></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-4xl">{tab.icon}</span>
                      {activeTab === tab.id && (
                        <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse"></div>
                      )}
                    </div>
                    <h3 className={`font-sora font-semibold text-lg mb-1 ${
                      activeTab === tab.id ? 'text-electric-cyan' : 'text-white group-hover:text-electric-cyan'
                    } transition-colors`}>
                      {tab.label}
                    </h3>
                    <p className="text-xs text-gray-400 font-roboto">{tab.description}</p>
                  </div>

                  {/* Decorative corner glow */}
                  <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${tab.gradient} rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300`}></div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="animate-fade-in">
            {activeTab === 'general' && <GeneralSettings />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'privacy' && <PrivacySettings />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function GeneralSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Language & Region Card */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-azure-start/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan to-azure-start flex items-center justify-center shadow-neon">
                <span className="text-2xl">🌍</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Language & Region</h2>
                <p className="text-sm text-gray-400 font-roboto">Customize your localization preferences</p>
              </div>
            </div>
            <div className="vibrant-badge badge-cyan">
              <span className="text-xs font-medium">Active</span>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto flex items-center gap-2">
                  <span className="text-lg">🗣️</span>
                  Language
                </label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all hover:border-electric-cyan/50 font-roboto">
                  <option value="en">🇬🇧 English</option>
                  <option value="tr">🇹🇷 Türkçe</option>
                  <option value="es">🇪🇸 Español</option>
                  <option value="fr">🇫🇷 Français</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto flex items-center gap-2">
                  <span className="text-lg">🕐</span>
                  Time Zone
                </label>
                <select className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-electric-cyan focus:border-transparent transition-all hover:border-electric-cyan/50 font-roboto">
                  <option value="Europe/Istanbul">Istanbul (GMT+3)</option>
                  <option value="Europe/London">London (GMT+0)</option>
                  <option value="America/New_York">New York (GMT-5)</option>
                  <option value="Asia/Tokyo">Tokyo (GMT+9)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2 font-roboto flex items-center gap-2">
                <span className="text-lg">📅</span>
                Date Format
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'].map((format) => (
                  <button
                    key={format}
                    className="px-4 py-3 glassmorphism rounded-xl hover:border-electric-cyan/50 border border-gray-700 text-white transition-all hover:shadow-glow-sm font-roboto"
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Display Preferences Card */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-glow/10 to-vibrant-pink/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-glow to-vibrant-pink flex items-center justify-center shadow-neon">
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Display Preferences</h2>
                <p className="text-sm text-gray-400 font-roboto">Customize your visual experience</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 glassmorphism rounded-xl hover:shadow-glow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌙</span>
                <div>
                  <div className="font-medium text-white font-roboto">Dark Mode</div>
                  <div className="text-sm text-gray-400 font-roboto">Always enabled for better eye comfort</div>
                </div>
              </div>
              <div className="vibrant-badge badge-purple">
                <span className="text-xs font-medium">Active</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 glassmorphism rounded-xl hover:shadow-glow-sm transition-all">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✨</span>
                <div>
                  <div className="font-medium text-white font-roboto">Animations</div>
                  <div className="text-sm text-gray-400 font-roboto">Smooth transitions and effects</div>
                </div>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gradient-to-r from-electric-cyan to-azure-start shadow-neon">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6"></span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-neon-glow/20 to-vibrant-pink/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 glassmorphism rounded-xl text-gray-300 hover:text-white transition-all duration-300 font-sora font-medium hover:shadow-glow-sm">
          Reset to Default
        </button>
        <button 
          onClick={handleSave}
          className="px-8 py-3 bg-gradient-to-r from-electric-cyan to-azure-start text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium hover:scale-105 flex items-center gap-2"
        >
          {saved ? (
            <>
              <span>✓</span>
              <span>Saved!</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [saved, setSaved] = useState(false)

  const notificationTypes = [
    {
      icon: '📧',
      title: 'Email Notifications',
      description: 'Receive emails for new test results and updates',
      enabled: true,
      gradient: 'from-electric-cyan to-azure-start'
    },
    {
      icon: '🔔',
      title: 'Push Notifications',
      description: 'Browser notifications for real-time updates',
      enabled: true,
      gradient: 'from-neon-glow to-vibrant-pink'
    },
    {
      icon: '⚠️',
      title: 'High Risk Alerts',
      description: 'Immediate alerts for high-risk detections',
      enabled: true,
      gradient: 'from-vibrant-pink to-sunset-orange'
    },
    {
      icon: '📊',
      title: 'Weekly Summary',
      description: 'Weekly email with your health statistics',
      enabled: false,
      gradient: 'from-azure-start to-neon-glow'
    },
    {
      icon: '🔄',
      title: 'System Updates',
      description: 'Notifications about new features and improvements',
      enabled: false,
      gradient: 'from-lime-green to-electric-cyan'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Notification Channels */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { icon: '📧', label: 'Email', count: '12', color: 'electric-cyan' },
          { icon: '🔔', label: 'Push', count: '8', color: 'neon-glow' },
          { icon: '📱', label: 'SMS', count: '3', color: 'vibrant-pink' }
        ].map((channel, index) => (
          <div 
            key={channel.label}
            className="glassmorphism rounded-xl p-4 hover:shadow-glow-md transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{channel.icon}</span>
              <div className={`vibrant-badge badge-${channel.color === 'electric-cyan' ? 'cyan' : channel.color === 'neon-glow' ? 'purple' : 'pink'}`}>
                <span className="text-xs font-medium">{channel.count}</span>
              </div>
            </div>
            <div className="font-medium text-white font-roboto">{channel.label}</div>
            <div className="text-xs text-gray-400 font-roboto">This week</div>
          </div>
        ))}
      </div>

      {/* Notification Types */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-glow/10 to-vibrant-pink/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-glow to-vibrant-pink flex items-center justify-center shadow-neon">
                <span className="text-2xl">🔔</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Notification Preferences</h2>
                <p className="text-sm text-gray-400 font-roboto">Choose what you want to be notified about</p>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-roboto">
              {notificationTypes.filter(n => n.enabled).length} of {notificationTypes.length} enabled
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {notificationTypes.map((notification, index) => (
              <div 
                key={notification.title}
                className="group/item flex items-center justify-between p-4 glassmorphism rounded-xl hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover gradient */}
                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${notification.gradient} opacity-5`}></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${notification.gradient} flex items-center justify-center shadow-glow-sm`}>
                    <span className="text-2xl">{notification.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white font-roboto flex items-center gap-2">
                      {notification.title}
                      {notification.enabled && (
                        <span className="text-xs text-lime-green">●</span>
                      )}
                    </div>
                    <div className="text-sm text-gray-400 font-roboto">{notification.description}</div>
                  </div>
                </div>
                <button
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notification.enabled 
                      ? `bg-gradient-to-r ${notification.gradient} shadow-neon` 
                      : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notification.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-neon-glow/20 to-vibrant-pink/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 glassmorphism rounded-xl text-gray-300 hover:text-white transition-all duration-300 font-sora font-medium hover:shadow-glow-sm">
          Test Notifications
        </button>
        <button 
          onClick={() => {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
          }}
          className="px-8 py-3 bg-gradient-to-r from-neon-glow to-vibrant-pink text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium hover:scale-105 flex items-center gap-2"
        >
          {saved ? (
            <>
              <span>✓</span>
              <span>Saved!</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function SecuritySettings() {
  const securityOptions = [
    {
      icon: '🔑',
      title: 'Change Password',
      description: 'Last changed: 30 days ago',
      status: 'Update recommended',
      statusColor: 'sunset-orange',
      gradient: 'from-sunset-orange to-vibrant-pink'
    },
    {
      icon: '🛡️',
      title: 'Two-Factor Authentication',
      description: 'Extra security for your account',
      status: 'Active',
      statusColor: 'lime-green',
      gradient: 'from-lime-green to-electric-cyan'
    },
    {
      icon: '📱',
      title: 'Active Sessions',
      description: '2 devices currently logged in',
      status: '2 devices',
      statusColor: 'azure-start',
      gradient: 'from-azure-start to-neon-glow'
    },
    {
      icon: '🔐',
      title: 'Login Alerts',
      description: 'Get notified of new logins',
      status: 'Enabled',
      statusColor: 'electric-cyan',
      gradient: 'from-electric-cyan to-azure-start'
    }
  ]

  const loginHistory = [
    { 
      device: 'Chrome on Windows', 
      location: 'Istanbul, TR', 
      time: '2 minutes ago', 
      color: 'electric-cyan',
      icon: '💻',
      status: 'current'
    },
    { 
      device: 'Safari on iPhone', 
      location: 'Istanbul, TR', 
      time: '2 hours ago', 
      color: 'azure-start',
      icon: '📱',
      status: 'active'
    },
    { 
      device: 'Chrome on Windows', 
      location: 'Istanbul, TR', 
      time: 'Yesterday', 
      color: 'neon-glow',
      icon: '💻',
      status: 'expired'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Security Score Card */}
      <div className="glassmorphism rounded-2xl p-6 relative overflow-hidden group hover:shadow-neon-lg transition-all duration-300">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-green/10 to-electric-cyan/10"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-green to-electric-cyan flex items-center justify-center shadow-neon">
              <span className="text-3xl">🛡️</span>
            </div>
            <div>
              <h3 className="text-2xl font-sora font-bold text-white mb-1">Security Score</h3>
              <p className="text-gray-400 font-roboto">Your account security level</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold gradient-text mb-1">85%</div>
            <div className="vibrant-badge badge-green">
              <span className="text-xs font-medium">Strong</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-6 h-3 bg-gray-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-lime-green to-electric-cyan rounded-full shadow-neon" style={{ width: '85%' }}></div>
        </div>
      </div>

      {/* Security Options */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-sunset-orange/10 to-lime-green/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sunset-orange to-lime-green flex items-center justify-center shadow-neon">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Security Settings</h2>
                <p className="text-sm text-gray-400 font-roboto">Manage your account security</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-2 gap-4">
            {securityOptions.map((option, index) => (
              <button 
                key={option.title}
                className="group/item text-left p-5 glassmorphism rounded-xl hover:shadow-glow-md transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${option.gradient} opacity-5`}></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center shadow-glow-sm`}>
                      <span className="text-2xl">{option.icon}</span>
                    </div>
                    <div className={`vibrant-badge badge-${option.statusColor === 'sunset-orange' ? 'orange' : option.statusColor === 'lime-green' ? 'green' : option.statusColor === 'azure-start' ? 'blue' : 'cyan'}`}>
                      <span className="text-xs font-medium">{option.status}</span>
                    </div>
                  </div>
                  <div className="font-medium text-white font-roboto mb-1 group-hover/item:text-electric-cyan transition-colors">
                    {option.title}
                  </div>
                  <div className="text-sm text-gray-400 font-roboto">{option.description}</div>
                </div>

                <svg className="absolute bottom-4 right-4 w-5 h-5 text-electric-cyan opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-sunset-orange/20 to-lime-green/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Login History */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-azure-start/10 to-neon-glow/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure-start to-neon-glow flex items-center justify-center shadow-neon">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Login History</h2>
                <p className="text-sm text-gray-400 font-roboto">Recent account activity</p>
              </div>
            </div>
            <button className="text-electric-cyan hover:text-white transition-colors text-sm font-roboto">
              View All →
            </button>
          </div>
          
          <div className="divide-y divide-gray-800">
            {loginHistory.map((session, index) => (
              <div 
                key={index} 
                className="p-5 hover:bg-gray-800/30 transition-colors group/session"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${session.color} to-azure-start flex items-center justify-center shadow-glow-sm`}>
                      <span className="text-2xl">{session.icon}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white font-roboto flex items-center gap-2">
                        {session.device}
                        {session.status === 'current' && (
                          <span className="vibrant-badge badge-green">
                            <span className="text-xs">Current</span>
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-400 font-roboto flex items-center gap-2">
                        <span className={`w-2 h-2 bg-${session.color} rounded-full animate-pulse`}></span>
                        {session.location} • {session.time}
                      </div>
                    </div>
                  </div>
                  {session.status !== 'current' && (
                    <button className="text-red-400 hover:text-red-300 transition-colors text-sm font-roboto opacity-0 group-hover/session:opacity-100">
                      Revoke
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-azure-start/20 to-neon-glow/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>
    </div>
  )
}

function PrivacySettings() {
  const [saved, setSaved] = useState(false)

  const privacyToggles = [
    {
      icon: '👁️',
      title: 'Profile Visibility',
      description: 'Show your profile to other doctors',
      enabled: true,
      gradient: 'from-electric-cyan to-azure-start'
    },
    {
      icon: '📊',
      title: 'Usage Statistics',
      description: 'Share anonymous usage data for product improvement',
      enabled: true,
      gradient: 'from-neon-glow to-vibrant-pink'
    },
    {
      icon: '🔬',
      title: 'Research Participation',
      description: 'Allow your data to be used in anonymous research',
      enabled: false,
      gradient: 'from-azure-start to-lime-green'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Privacy Overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { icon: '🔒', label: 'Data Encrypted', value: '100%', color: 'lime-green' },
          { icon: '🛡️', label: 'HIPAA Compliant', value: 'Yes', color: 'electric-cyan' },
          { icon: '📍', label: 'Data Location', value: 'EU', color: 'azure-start' }
        ].map((stat, index) => (
          <div 
            key={stat.label}
            className="glassmorphism rounded-xl p-5 hover:shadow-glow-md transition-all duration-300 group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-3xl">{stat.icon}</span>
              <div className={`vibrant-badge badge-${stat.color === 'lime-green' ? 'green' : stat.color === 'electric-cyan' ? 'cyan' : 'blue'}`}>
                <span className="text-xs font-medium">{stat.value}</span>
              </div>
            </div>
            <div className="text-sm text-gray-400 font-roboto">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Privacy Controls */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-vibrant-pink/10 to-neon-glow/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vibrant-pink to-neon-glow flex items-center justify-center shadow-neon">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-semibold text-white">Privacy Controls</h2>
                <p className="text-sm text-gray-400 font-roboto">Manage your data sharing preferences</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            {privacyToggles.map((toggle, index) => (
              <div 
                key={toggle.title}
                className="group/item flex items-center justify-between p-5 glassmorphism rounded-xl hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-r ${toggle.gradient} opacity-5`}></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${toggle.gradient} flex items-center justify-center shadow-glow-sm`}>
                    <span className="text-3xl">{toggle.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white font-roboto mb-1">{toggle.title}</div>
                    <div className="text-sm text-gray-400 font-roboto">{toggle.description}</div>
                  </div>
                </div>
                <button
                  className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
                    toggle.enabled 
                      ? `bg-gradient-to-r ${toggle.gradient} shadow-neon` 
                      : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                      toggle.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-vibrant-pink/20 to-neon-glow/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Data Management */}
      <div className="group glassmorphism rounded-2xl hover:shadow-neon-lg transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-electric-cyan/10 to-azure-start/10"></div>
        </div>

        <div className="relative z-10">
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-electric-cyan to-azure-start flex items-center justify-center shadow-neon">
                <span className="text-2xl">💾</span>
              </div>
              <div>
                <h3 className="text-xl font-sora font-semibold text-white">Data Management</h3>
                <p className="text-sm text-gray-400 font-roboto">Export or delete your data</p>
              </div>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-2 gap-4">
            <button className="group/item text-left p-6 glassmorphism rounded-xl hover:shadow-glow-md transition-all duration-300 relative overflow-hidden border border-gray-800 hover:border-electric-cyan/30">
              <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-electric-cyan/5 to-azure-start/5"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-electric-cyan to-azure-start flex items-center justify-center shadow-glow-sm mb-4">
                  <span className="text-3xl">📥</span>
                </div>
                <div className="font-medium text-white font-roboto mb-2 group-hover/item:text-electric-cyan transition-colors text-lg">
                  Download My Data
                </div>
                <div className="text-sm text-gray-400 font-roboto mb-4">
                  Download all your data in JSON format
                </div>
                <div className="flex items-center gap-2 text-electric-cyan text-sm font-roboto">
                  <span>Export Data</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </button>

            <button className="group/item text-left p-6 glassmorphism rounded-xl hover:shadow-[0_0_30px_rgba(239,68,68,0.3)] transition-all duration-300 relative overflow-hidden border border-red-500/30 hover:border-red-500/50">
              <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-red-500/5 to-red-600/5"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-glow-sm mb-4">
                  <span className="text-3xl">⚠️</span>
                </div>
                <div className="font-medium text-red-400 font-roboto mb-2 group-hover/item:text-red-300 transition-colors text-lg">
                  Delete Account
                </div>
                <div className="text-sm text-gray-400 font-roboto mb-4">
                  Permanently delete your account and all data
                </div>
                <div className="flex items-center gap-2 text-red-400 text-sm font-roboto">
                  <span>Delete Forever</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-electric-cyan/20 to-azure-start/20 rounded-full blur-2xl group-hover:opacity-60 transition-opacity duration-300"></div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-3 glassmorphism rounded-xl text-gray-300 hover:text-white transition-all duration-300 font-sora font-medium hover:shadow-glow-sm">
          View Privacy Policy
        </button>
        <button 
          onClick={() => {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
          }}
          className="px-8 py-3 bg-gradient-to-r from-vibrant-pink to-neon-glow text-white rounded-xl hover:shadow-neon-lg transition-all duration-300 font-sora font-medium hover:scale-105 flex items-center gap-2"
        >
          {saved ? (
            <>
              <span>✓</span>
              <span>Saved!</span>
            </>
          ) : (
            <>
              <span>💾</span>
              <span>Save Changes</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function SettingToggle({ label, description, defaultChecked = false }: any) {
  const [checked, setChecked] = useState(defaultChecked)

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="font-medium text-white font-roboto">{label}</div>
        <div className="text-sm text-gray-400 font-roboto">{description}</div>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-gradient-to-r from-electric-cyan to-azure-start shadow-neon' : 'bg-gray-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}
