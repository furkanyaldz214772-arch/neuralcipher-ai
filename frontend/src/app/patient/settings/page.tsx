'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Calendar, Heart, Pill, Bell, Save } from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'

export default function PatientSettingsPage() {
  const { user } = useAuthStore()
  
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
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            transition={{ delay: 0.1 }}
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
            transition={{ delay: 0.2 }}
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
