'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Lock, Save } from 'lucide-react';

export default function DoctorSettingsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialty: '',
    notifications: true,
    emailAlerts: true
  });

  const handleSave = async () => {
    console.log('Saving settings:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-[#0EA5E9]" />
          Settings
        </h1>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              <User className="h-6 w-6 text-[#0EA5E9]" />
              Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-[#1E293B] border border-gray-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
              <Bell className="h-6 w-6 text-[#0EA5E9]" />
              Notifications
            </h2>
            <div className="space-y-3">
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Push Notifications</span>
                <input type="checkbox" checked={formData.notifications} onChange={(e) => setFormData({...formData, notifications: e.target.checked})} className="w-5 h-5" />
              </label>
              <label className="flex items-center justify-between">
                <span className="text-gray-300">Email Alerts</span>
                <input type="checkbox" checked={formData.emailAlerts} onChange={(e) => setFormData({...formData, emailAlerts: e.target.checked})} className="w-5 h-5" />
              </label>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-[#0EA5E9] text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#0EA5E9]/90 transition-all"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
