'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { 
  Stethoscope, Search, Plus, Mail, Phone, Calendar,
  MoreVertical, Edit, Trash2, Eye, Award, TrendingUp
} from 'lucide-react'

interface Doctor {
  id: number
  name: string
  email: string
  specialization: string
  phone: string
  patients_count: number
  tests_count: number
  joined_date: string
  status: 'active' | 'inactive'
  rating: number
}

export default function HospitalDoctorsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    // ✅ FIX: Backend returns role in UPPERCASE, normalize for comparison
    if (user && user.role?.toUpperCase() !== 'HOSPITAL') {
      const roleUpper = user.role?.toUpperCase()
      if (roleUpper === 'PATIENT') {
        router.replace('/patient/dashboard')
      } else if (roleUpper === 'DOCTOR') {
        router.replace('/doctor/dashboard')
      } else if (roleUpper === 'ADMIN') {
        router.replace('/admin/dashboard')
      } else {
        router.replace('/auth/login')
      }
      return
    }

    fetchDoctors()
  }, [user, isAuthenticated, router])

  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/hospital/doctors`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json()
        setDoctors(data.doctors || [])
      } else {
        // Demo data
        setDoctors([
          {
            id: 1,
            name: 'Dr. Sarah Johnson',
            email: 'sarah.johnson@hospital.com',
            specialization: 'Neurology',
            phone: '+1 (555) 123-4567',
            patients_count: 45,
            tests_count: 128,
            joined_date: '2024-01-15',
            status: 'active',
            rating: 4.8
          },
          {
            id: 2,
            name: 'Dr. Michael Chen',
            email: 'michael.chen@hospital.com',
            specialization: 'Neurology',
            phone: '+1 (555) 234-5678',
            patients_count: 38,
            tests_count: 95,
            joined_date: '2024-02-20',
            status: 'active',
            rating: 4.9
          },
          {
            id: 3,
            name: 'Dr. Emily Rodriguez',
            email: 'emily.rodriguez@hospital.com',
            specialization: 'Movement Disorders',
            phone: '+1 (555) 345-6789',
            patients_count: 52,
            tests_count: 156,
            joined_date: '2023-11-10',
            status: 'active',
            rating: 4.7
          }
        ])
      }
    } catch (error) {
      console.error('Error fetching doctors:', error)
      setDoctors([])
    } finally {
      setLoading(false)
    }
  }

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-cyan-400" />
            Doctors Management
          </h1>
          <p className="text-gray-400">Manage your hospital's medical staff</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Doctors</span>
              <Stethoscope className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">{doctors.length}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Active</span>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {doctors.filter(d => d.status === 'active').length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Patients</span>
              <Award className="w-5 h-5 text-purple-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {doctors.reduce((sum, d) => sum + d.patients_count, 0)}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Avg Rating</span>
              <Award className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)}
            </p>
          </div>
        </div>

        {/* Search and Add */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, email, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" />
              Add Doctor
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDoctors.length === 0 ? (
            <div className="col-span-full bg-white/5 backdrop-blur-lg rounded-xl p-12 border border-white/10 text-center">
              <Stethoscope className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No doctors found</h3>
              <p className="text-gray-400 mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Add your first doctor to get started'}
              </p>
              {!searchQuery && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
                >
                  Add Doctor
                </button>
              )}
            </div>
          ) : (
            filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {doctor.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{doctor.name}</h3>
                      <p className="text-cyan-400 text-sm">{doctor.specialization}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-all">
                    <MoreVertical className="w-5 h-5 text-gray-400" />
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Mail className="w-4 h-4" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Phone className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {new Date(doctor.joined_date).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Patients</p>
                    <p className="text-white font-bold text-lg">{doctor.patients_count}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Tests</p>
                    <p className="text-white font-bold text-lg">{doctor.tests_count}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span className="text-white font-semibold">{doctor.rating}</span>
                  <span className="text-gray-400 text-sm">rating</span>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    doctor.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {doctor.status.charAt(0).toUpperCase() + doctor.status.slice(1)}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg hover:bg-cyan-500/30 transition-all text-sm font-medium flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all text-sm font-medium flex items-center justify-center gap-2">
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
