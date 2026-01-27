'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  UserCircle, Phone, Mail, Calendar, 
  MapPin, Clock, Award, Stethoscope,
  MessageSquare, Video
} from 'lucide-react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'

export default function MyDoctorPage() {
  const { user } = useAuthStore()
  const router = useRouter()

  // Mock doctor data - gerçek uygulamada API'den gelecek
  const doctorInfo = {
    name: 'Dr. Sarah Johnson',
    specialty: 'Neurologist',
    experience: '15 years',
    hospital: 'City Medical Center',
    phone: '+1 (555) 123-4567',
    email: 'dr.johnson@neuralcipher.ai',
    address: '123 Medical Plaza, New York, NY 10001',
    nextAppointment: 'Feb 15, 2026 at 10:00 AM',
    languages: ['English', 'Spanish'],
    education: 'MD from Harvard Medical School'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">My Doctor</h1>
          <p className="text-gray-400">Your assigned healthcare provider</p>
        </motion.div>

        {/* Doctor Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-8 mb-6"
        >
          <div className="flex items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {doctorInfo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">{doctorInfo.name}</h2>
              <div className="flex items-center gap-2 text-[#0EA5E9] mb-2">
                <Stethoscope className="h-5 w-5" />
                <span className="font-semibold">{doctorInfo.specialty}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="h-4 w-4" />
                <span>{doctorInfo.experience} experience</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="h-5 w-5 text-[#0EA5E9]" />
              <span>{doctorInfo.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="h-5 w-5 text-[#0EA5E9]" />
              <span>{doctorInfo.email}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="h-5 w-5 text-[#0EA5E9]" />
              <span>{doctorInfo.hospital}</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Clock className="h-5 w-5 text-[#0EA5E9]" />
              <span>Mon-Fri: 9AM - 5PM</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/patient/messages')}
              className="bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MessageSquare className="h-5 w-5" />
              Send Message
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-[#0F172A] border border-gray-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:border-[#0EA5E9]/50"
            >
              <Video className="h-5 w-5" />
              Video Call
            </motion.button>
          </div>
        </motion.div>

        {/* Next Appointment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#06B6D4]/10 border border-[#0EA5E9]/20 rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <Calendar className="h-6 w-6 text-[#0EA5E9]" />
            <h3 className="text-xl font-bold text-white">Next Appointment</h3>
          </div>
          <p className="text-gray-300 text-lg">{doctorInfo.nextAppointment}</p>
          <p className="text-gray-400 text-sm mt-2">{doctorInfo.address}</p>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1E293B] border border-gray-700 rounded-2xl p-6"
        >
          <h3 className="text-xl font-bold text-white mb-4">About</h3>
          <div className="space-y-3">
            <div>
              <p className="text-gray-400 text-sm mb-1">Education</p>
              <p className="text-white">{doctorInfo.education}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Languages</p>
              <p className="text-white">{doctorInfo.languages.join(', ')}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
