'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Heart, Pill, Bell, Save, Camera, Key, Users as UsersIcon } from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { profilePhotoAPI, accessKeyAPI } from '@/lib/api'
import ProfilePhotoUpload from '@/components/settings/ProfilePhotoUpload'
import AccessKeyDisplay from '@/components/settings/AccessKeyDisplay'
import DoctorAccessList from '@/components/settings/DoctorAccessList'

export default function PatientSettingsPage() {
  const { user, updateUser } = useAuthStore()
  
  // Personal Info
  const [firstName, setFirstName] = useState('Ahmet')
  const [lastName, setLastName] = useState('Yılmaz')
  const [dateOfBirth, setDateOfBirth] = useState('1965-03-15')
  const [gender, setGender] = useState('Male')
  const [phone, setPhone] = useState('+90 555 123 4567')
  const [email, setEmail] = useState(user?.email || '')

  // Health Info
  const [diagnosisYear, setDiagnosisYear] = useState('2020')
  const [medications, setMedications] = useState('Levodopa, Carbidopa')
  const [allergies, setAllergies] = useState('None')
  const [chronicConditions, setChronicConditions] = useState('Parkinson')

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [testReminders, setTestReminders] = useState(true)
  const [appointmentReminders, setAppointmentReminders] = useState(true)
  const [doctorMessages, setDoctorMessages] = useState(true)

  // Profile Photo & Access Key
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(user?.profile_photo_url || null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [accessKey, setAccessKey] = useState<string>('')
  const [isRegeneratingKey, setIsRegeneratingKey] = useState(false)
  const [doctors, setDoctors] = useState<any[]>([])
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true)

  // Fetch access key and doctors on mount
  useEffect(() => {
    fetchAccessKey()
    fetchDoctors()
  }, [])

  const fetchAccessKey = async () => {
    try {
      const data = await accessKeyAPI.get()
      setAccessKey(data.access_key)
    } catch (error) {
      console.error('Failed to fetch access key:', error)
    }
  }

  const fetchDoctors = async () => {
    try {
      setIsLoadingDoctors(true)
      const data = await accessKeyAPI.getMyDoctors()
      setDoctors(data.doctors || [])
    } catch (error) {
      console.error('Failed to fetch doctors:', error)
    } finally {
      setIsLoadingDoctors(false)
    }
  }

  // Handle photo upload
  const handlePhotoUpload = async (file: File) => {
    try {
      setIsUploadingPhoto(true)
      const data = await profilePhotoAPI.upload(file)
      setProfilePhotoUrl(data.profile_photo_url)
      
      // Update user in auth store
      if (updateUser) {
        updateUser({ ...user, profile_photo_url: data.profile_photo_url })
      }
    } catch (error) {
      console.error('Failed to upload photo:', error)
      throw error
    } finally {
      setIsUploadingPhoto(false)
    }
  }

  // Handle photo delete
  const handlePhotoDelete = async () => {
    try {
      await profilePhotoAPI.delete()
      setProfilePhotoUrl(null)
      
      // Update user in auth store
      if (updateUser) {
        updateUser({ ...user, profile_photo_url: null })
      }
    } catch (error) {
      console.error('Failed to delete photo:', error)
      throw error
    }
  }

  // Handle copy access key
  const handleCopyAccessKey = () => {
    navigator.clipboard.writeText(accessKey)
  }

  // Handle regenerate access key
  const handleRegenerateKey = async () => {
    try {
      setIsRegeneratingKey(true)
      const data = await accessKeyAPI.regenerate()
      setAccessKey(data.access_key)
      
      // Refresh doctors list (should be empty now)
      await fetchDoctors()
    } catch (error) {
      console.error('Failed to regenerate key:', error)
      throw error
    } finally {
      setIsRegeneratingKey(false)
    }
  }

  // Handle revoke doctor access
  const handleRevokeDoctorAccess = async (doctorId: string) => {
    try {
      await accessKeyAPI.revokeDoctorAccess(doctorId)
      
      // Refresh doctors list
      await fetchDoctors()
    } catch (error) {
      console.error('Failed to revoke access:', error)
      throw error
    }
  }

  const handleSave = () => {
    // Handle save
    alert('Settings saved successfully!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-400">Manage your profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Camera className="h-5 w-5 text-[#0EA5E9]" />
              Profile Photo
            </h2>
            <ProfilePhotoUpload
              currentPhotoUrl={profilePhotoUrl}
              onUpload={handlePhotoUpload}
              onDelete={handlePhotoDelete}
              isUploading={isUploadingPhoto}
            />
          </motion.div>

          {/* Access Key Section */}
          {accessKey && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Key className="h-5 w-5 text-[#0EA5E9]" />
                Access Key Management
              </h2>
              <AccessKeyDisplay
                accessKey={accessKey}
                onCopy={handleCopyAccessKey}
                onRegenerate={handleRegenerateKey}
                isRegenerating={isRegeneratingKey}
              />
            </motion.div>
          )}

          {/* Doctors with Access Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <UsersIcon className="h-5 w-5 text-[#0EA5E9]" />
              Doctors with Access
            </h2>
            <DoctorAccessList
              doctors={doctors}
              onRevoke={handleRevokeDoctorAccess}
              isLoading={isLoadingDoctors}
            />
          </motion.div>

          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-[#0EA5E9]" />
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>
          </motion.div>

          {/* Health Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Heart className="h-5 w-5 text-[#0EA5E9]" />
              Health Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Diagnosis Year</label>
                <input
                  type="text"
                  value={diagnosisYear}
                  onChange={(e) => setDiagnosisYear(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Medications</label>
                <input
                  type="text"
                  value={medications}
                  onChange={(e) => setMedications(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Allergies</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-2">Chronic Conditions</label>
                <input
                  type="text"
                  value={chronicConditions}
                  onChange={(e) => setChronicConditions(e.target.value)}
                  className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-[#0EA5E9]" />
              Notification Settings
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white">Email notifications</span>
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white">Test reminders</span>
                <input
                  type="checkbox"
                  checked={testReminders}
                  onChange={(e) => setTestReminders(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white">Appointment reminders</span>
                <input
                  type="checkbox"
                  checked={appointmentReminders}
                  onChange={(e) => setAppointmentReminders(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-white">Doctor messages</span>
                <input
                  type="checkbox"
                  checked={doctorMessages}
                  onChange={(e) => setDoctorMessages(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-700 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                />
              </label>
            </div>
          </motion.div>

          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
          >
            <Save className="h-5 w-5" />
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  )
}
