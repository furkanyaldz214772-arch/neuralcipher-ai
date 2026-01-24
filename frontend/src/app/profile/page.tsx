'use client'

import { useState, useEffect } from 'react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useAuthStore } from '@/lib/auth-store'
import api from '@/lib/api'
import type { PatientProfile } from '@/types'

export default function ProfilePage() {
  const { user } = useAuthStore()
  const [profile, setProfile] = useState<PatientProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    phone: '',
    address: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/v1/profile')
      setProfile(response.data)
      setFormData({
        first_name: response.data.first_name || '',
        last_name: response.data.last_name || '',
        date_of_birth: response.data.date_of_birth || '',
        gender: response.data.gender || '',
        phone: response.data.phone || '',
        address: response.data.address || ''
      })
    } catch (error) {
      console.error('Failed to fetch profile:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await api.put('/api/v1/profile', formData)
      setProfile(response.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save profile:', error)
      alert('Error updating profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || '',
        phone: profile.phone || '',
        address: profile.address || ''
      })
    }
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-2 border-electric-cyan border-t-transparent rounded-full animate-spin"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Professional Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-sora font-bold text-white mb-2">Profile</h1>
          <p className="text-sm text-gray-400 font-roboto">View and edit your personal information</p>
        </div>

        {/* Professional Profile Card */}
        <div className="rounded-xl p-6 mb-5 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(100, 255, 218, 0.1)',
                  border: '1px solid rgba(100, 255, 218, 0.3)'
                }}
              >
                <span className="text-2xl text-electric-cyan font-bold">
                  {formData.first_name?.charAt(0) || user?.email?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-xl font-sora font-bold text-white">
                  {formData.first_name} {formData.last_name}
                </h2>
                <p className="text-sm text-gray-400 font-roboto">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded capitalize"
                  style={{
                    background: 'rgba(100, 255, 218, 0.1)',
                    border: '1px solid rgba(100, 255, 218, 0.3)',
                    color: '#64FFDA'
                  }}
                >
                  {user?.role}
                </span>
              </div>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-sm rounded-lg transition-all duration-200 font-roboto"
                style={{
                  background: 'rgba(100, 255, 218, 0.1)',
                  border: '1px solid rgba(100, 255, 218, 0.3)',
                  color: '#64FFDA'
                }}
              >
                Edit
              </button>
            )}
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                First Name
              </label>
              <input
                type="text"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                Last Name
              </label>
              <input
                type="text"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
                placeholder="+1 XXX XXX XXXX"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-400 mb-1.5 font-roboto">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className="w-full px-3 py-2 text-sm text-white rounded-lg focus:outline-none disabled:opacity-50 transition-all"
                style={{
                  background: 'rgba(15, 23, 42, 0.4)',
                  border: '1px solid rgba(100, 255, 218, 0.2)'
                }}
              />
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex justify-end space-x-3 mt-5">
              <button
                onClick={handleCancel}
                disabled={isSaving}
                className="px-5 py-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 font-roboto"
                style={{
                  background: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(100, 255, 218, 0.15)',
                  color: '#9CA3AF'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2 text-sm rounded-lg transition-all duration-200 disabled:opacity-50 font-sora font-medium"
                style={{
                  background: 'rgba(100, 255, 218, 0.15)',
                  border: '1px solid rgba(100, 255, 218, 0.4)',
                  color: '#64FFDA'
                }}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>

        {/* Account Info */}
        <div className="rounded-xl p-6 mb-5 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-base font-sora font-semibold text-white mb-4">Account Information</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2.5"
              style={{ borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}
            >
              <span className="text-sm text-gray-400 font-roboto">Email</span>
              <span className="text-sm font-medium text-white font-roboto">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2.5"
              style={{ borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}
            >
              <span className="text-sm text-gray-400 font-roboto">Account Type</span>
              <span className="text-sm font-medium text-white capitalize font-roboto">{user?.role}</span>
            </div>
            <div className="flex justify-between py-2.5"
              style={{ borderBottom: '1px solid rgba(100, 255, 218, 0.1)' }}
            >
              <span className="text-sm text-gray-400 font-roboto">Email Verified</span>
              <span className={`text-sm font-medium ${user?.is_verified ? 'text-green-400' : 'text-red-400'} font-roboto`}>
                {user?.is_verified ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-sm text-gray-400 font-roboto">2FA Active</span>
              <span className={`text-sm font-medium ${user?.is_2fa_enabled ? 'text-green-400' : 'text-gray-400'} font-roboto`}>
                {user?.is_2fa_enabled ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
        </div>

        {/* Security Actions */}
        <div className="rounded-xl p-6 transition-all duration-200 hover:-translate-y-0.5"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(100, 255, 218, 0.15)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h3 className="text-base font-sora font-semibold text-white mb-4">Security</h3>
          <div className="space-y-2.5">
            <button className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group/btn"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white font-roboto group-hover/btn:text-electric-cyan transition-colors">Change Password</span>
                <svg className="w-4 h-4 text-electric-cyan group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 hover:-translate-y-0.5 group/btn"
              style={{
                background: 'rgba(15, 23, 42, 0.4)',
                border: '1px solid rgba(100, 255, 218, 0.15)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-white font-roboto group-hover/btn:text-electric-cyan transition-colors">Two-Factor Authentication</span>
                <svg className="w-4 h-4 text-electric-cyan group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
