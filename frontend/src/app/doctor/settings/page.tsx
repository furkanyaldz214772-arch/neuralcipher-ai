'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Lock, Save, Mail, Phone, Building, Shield, Eye, EyeOff } from 'lucide-react';

export default function DoctorSettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    licenseNumber: '',
    hospital: '',
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  const handleSave = async () => {
    console.log('Saving settings:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-2">
            <div className="p-3 bg-[#0EA5E9]/10 rounded-xl">
              <Settings className="h-8 w-8 text-[#0EA5E9]" />
            </div>
            Settings
          </h1>
          <p className="text-gray-400">Manage your account and preferences</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-[#1E293B] border border-gray-700 rounded-xl p-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-[#0EA5E9] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            <User className="h-5 w-5 inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'notifications'
                ? 'bg-[#0EA5E9] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            <Bell className="h-5 w-5 inline mr-2" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-[#0EA5E9] text-white'
                : 'text-gray-400 hover:text-white hover:bg-[#0F172A]'
            }`}
          >
            <Lock className="h-5 w-5 inline mr-2" />
            Security
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <User className="h-6 w-6 text-[#0EA5E9]" />
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Dr. John Doe"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="doctor@example.com"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Specialty</label>
                  <input
                    type="text"
                    value={formData.specialty}
                    onChange={(e) => setFormData({...formData, specialty: e.target.value})}
                    placeholder="Neurology"
                    className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">License Number</label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.licenseNumber}
                      onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                      placeholder="MD-123456"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Hospital/Clinic</label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.hospital}
                      onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                      placeholder="City Medical Center"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Bell className="h-6 w-6 text-[#0EA5E9]" />
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#0F172A] border border-gray-700 rounded-xl">
                  <div>
                    <p className="text-white font-medium mb-1">Push Notifications</p>
                    <p className="text-gray-400 text-sm">Receive notifications in your browser</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.notifications}
                      onChange={(e) => setFormData({...formData, notifications: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0F172A] border border-gray-700 rounded-xl">
                  <div>
                    <p className="text-white font-medium mb-1">Email Alerts</p>
                    <p className="text-gray-400 text-sm">Get important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.emailAlerts}
                      onChange={(e) => setFormData({...formData, emailAlerts: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between p-4 bg-[#0F172A] border border-gray-700 rounded-xl">
                  <div>
                    <p className="text-white font-medium mb-1">SMS Alerts</p>
                    <p className="text-gray-400 text-sm">Receive urgent alerts via SMS</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.smsAlerts}
                      onChange={(e) => setFormData({...formData, smsAlerts: e.target.checked})}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-7 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Lock className="h-6 w-6 text-[#0EA5E9]" />
                Change Password
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.currentPassword}
                      onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                      placeholder="Enter current password"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-12 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      placeholder="Enter new password"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-2 font-medium">Confirm New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      placeholder="Confirm new password"
                      className="w-full bg-[#0F172A] border border-gray-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-[#0EA5E9]/20 transition-all"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
}
