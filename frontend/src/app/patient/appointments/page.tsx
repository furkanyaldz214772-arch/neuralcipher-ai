'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, User, Plus, MapPin } from 'lucide-react'

export default function PatientAppointmentsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  // Mock appointments
  const appointments = [
    {
      id: 1,
      date: 'Feb 16, 2026',
      time: '14:00',
      doctor: 'Dr. Mehmet Yılmaz',
      location: 'Neurology Clinic',
      status: 'confirmed'
    },
    {
      id: 2,
      date: 'Jan 30, 2026',
      time: '10:30',
      doctor: 'Dr. Ayşe Demir',
      location: 'General Hospital',
      status: 'confirmed'
    }
  ]

  // Simple calendar days
  const daysInMonth = 31
  const firstDay = 3 // Wednesday
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Appointments</h1>
            <p className="text-gray-400">Manage your medical appointments</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg shadow-[#0EA5E9]/20"
          >
            <Plus className="h-5 w-5" />
            New Appointment
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">January 2026</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-[#0F172A] rounded-lg transition-colors text-gray-400">
                    ←
                  </button>
                  <button className="p-2 hover:bg-[#0F172A] rounded-lg transition-colors text-gray-400">
                    →
                  </button>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                  <div key={day} className="text-center text-gray-400 text-sm font-semibold py-2">
                    {day}
                  </div>
                ))}
                
                {/* Empty cells for first week */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {/* Days */}
                {days.map((day) => {
                  const hasAppointment = day === 16 || day === 30
                  const isToday = day === 27
                  
                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all relative ${
                        isToday
                          ? 'bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white'
                          : hasAppointment
                          ? 'bg-[#0EA5E9]/20 text-[#0EA5E9] border border-[#0EA5E9]'
                          : 'text-gray-400 hover:bg-[#0F172A]'
                      }`}
                    >
                      {day}
                      {hasAppointment && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-[#0EA5E9]" />
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Upcoming Appointments */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Upcoming</h2>
              <div className="space-y-4">
                {appointments.map((apt) => (
                  <motion.div
                    key={apt.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#0F172A] border border-gray-700 rounded-xl p-4 cursor-pointer hover:border-[#0EA5E9]/50 transition-all"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{apt.doctor}</h3>
                        <p className="text-gray-400 text-sm">{apt.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="h-4 w-4" />
                        <span>{apt.time}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-700">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#10B981]/20 text-[#10B981]">
                        Confirmed
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
