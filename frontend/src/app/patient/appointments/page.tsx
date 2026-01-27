'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  User, Mail, Phone, Calendar, MessageSquare, 
  Stethoscope, Award, Clock, MapPin, Star
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MyDoctorPage() {
  const router = useRouter()
  
  // Mock doctor data - gerçek uygulamada API'den gelecek
  const doctor = {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurologist',
    experience: '15 years',
    rating: 4.9,
    reviews: 234,
    email: 'dr.sarah@neuralcipher.ai',
    phone: '+1 (555) 123-4567',
    location: 'Medical Center, New York',
    avatar: null,
    bio: 'Specialized in Parkinson\'s disease and movement disorders. Board certified neurologist with extensive experience in early detection and treatment.',
    nextAppointment: {
      date: 'Feb 15, 2026',
      time: '10:00 AM',
      type: 'Follow-up Consultation'
    },
    availability: [
      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
      { day: 'Friday', hours: '9:00 AM - 3:00 PM' }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">My Doctor</h1>
          <p className="text-gray-400">Your assigned healthcare provider</p>
        </motion.div>

        {/* Doctor Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8 mb-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white text-4xl font-bold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{doctor.name}</h2>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Stethoscope className="h-4 w-4" />
                    <span>{doctor.specialty}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-white">{doctor.rating}</span>
                      <span>({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">{doctor.bio}</p>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-[#0EA5E9]" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-[#0EA5E9]" />
                  <span>{doctor.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-[#0EA5E9]" />
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Next Appointment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-[#0EA5E9]" />
              Next Appointment
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Date</span>
                <span className="text-white font-semibold">{doctor.nextAppointment.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Time</span>
                <span className="text-white font-semibold">{doctor.nextAppointment.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Type</span>
                <span className="text-white font-semibold">{doctor.nextAppointment.type}</span>
              </div>
            </div>
            <button
              onClick={() => router.push('/patient/messages')}
              className="w-full mt-6 bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
            >
              <MessageSquare className="h-5 w-5" />
              Message Doctor
            </button>
          </motion.div>

          {/* Availability */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#0EA5E9]" />
              Availability
            </h3>
            <div className="space-y-3">
              {doctor.availability.map((slot, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-0">
                  <span className="text-gray-300 font-medium">{slot.day}</span>
                  <span className="text-gray-400">{slot.hours}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full mt-6 bg-[#0F172A] border border-gray-700 text-white px-6 py-3 rounded-xl font-semibold hover:border-[#0EA5E9]/50 transition-colors"
            >
              Book New Appointment
            </button>
          </motion.div>
        </div>

        {/* Recent Consultations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">Recent Consultations</h3>
          <div className="space-y-3">
            {[
              { date: 'Jan 24, 2026', type: 'Follow-up', notes: 'Reviewed test results, medication adjusted' },
              { date: 'Jan 10, 2026', type: 'Initial Consultation', notes: 'First assessment and baseline tests ordered' },
              { date: 'Dec 15, 2025', type: 'Check-up', notes: 'Regular monitoring, no changes needed' }
            ].map((consultation, index) => (
              <div key={index} className="bg-[#0F172A] border border-gray-700 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-semibold">{consultation.date}</span>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#0EA5E9]/20 text-[#0EA5E9]">
                    {consultation.type}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{consultation.notes}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
