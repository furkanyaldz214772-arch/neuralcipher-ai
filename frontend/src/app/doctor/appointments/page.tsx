'use client'

import { useState, useEffect } from 'react'
import { useAuthStore } from '@/lib/auth-store'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, User, Plus, Filter, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface Appointment {
  id: number
  patient_id: number
  doctor_id: number
  appointment_date: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  reason: string | null
  notes: string | null
  created_at: string
}

export default function AppointmentsPage() {
  const { user, isAuthenticated } = useAuthStore()
  const router = useRouter()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const [showNewModal, setShowNewModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/login')
      return
    }

    if (user && user.role !== 'doctor') {
      router.replace('/dashboard')
      return
    }

    fetchAppointments()
  }, [user, isAuthenticated, router, filter])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token')
      const url = filter === 'all' 
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments/`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments/?status=${filter}`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAppointments(data)
      }
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (appointmentId: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/appointments/${appointmentId}/status?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      )

      if (response.ok) {
        fetchAppointments()
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 bg-green-400/10'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10'
      case 'cancelled': return 'text-red-400 bg-red-400/10'
      case 'completed': return 'text-blue-400 bg-blue-400/10'
      default: return 'text-gray-400 bg-gray-400/10'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />
      case 'pending': return <AlertCircle className="w-4 h-4" />
      case 'cancelled': return <XCircle className="w-4 h-4" />
      case 'completed': return <CheckCircle className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const groupByDate = (appointments: Appointment[]) => {
    const grouped: { [key: string]: Appointment[] } = {}
    
    appointments.forEach(apt => {
      const date = new Date(apt.appointment_date).toDateString()
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(apt)
    })

    return grouped
  }

  const groupedAppointments = groupByDate(appointments)
  const sortedDates = Object.keys(groupedAppointments).sort((a, b) => 
    new Date(a).getTime() - new Date(b).getTime()
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Appointments</h1>
          <p className="text-gray-400">Manage your patient appointments</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total</span>
              <Calendar className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold text-white">{appointments.length}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Pending</span>
              <AlertCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {appointments.filter(a => a.status === 'pending').length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Confirmed</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {appointments.filter(a => a.status === 'confirmed').length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Today</span>
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-2xl font-bold text-white">
              {appointments.filter(a => {
                const aptDate = new Date(a.appointment_date).toDateString()
                const today = new Date().toDateString()
                return aptDate === today
              }).length}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 mb-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex gap-2">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filter === status
                      ? 'bg-cyan-500 text-white'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-6">
          {sortedDates.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-12 border border-white/10 text-center">
              <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No appointments found</h3>
              <p className="text-gray-400">
                {filter === 'all' 
                  ? 'You don\'t have any appointments yet.'
                  : `No ${filter} appointments found.`
                }
              </p>
            </div>
          ) : (
            sortedDates.map(date => (
              <div key={date} className="space-y-4">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" />
                  {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </h2>

                <div className="space-y-3">
                  {groupedAppointments[date]
                    .sort((a, b) => new Date(a.appointment_date).getTime() - new Date(b.appointment_date).getTime())
                    .map(appointment => (
                      <div
                        key={appointment.id}
                        className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-500/50 transition-all"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </div>
                              <span className="text-gray-400 text-sm flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {new Date(appointment.appointment_date).toLocaleTimeString('en-US', {
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </span>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-white font-medium">Patient ID: {appointment.patient_id}</span>
                            </div>

                            {appointment.reason && (
                              <p className="text-gray-300 mb-2">
                                <span className="text-gray-500">Reason:</span> {appointment.reason}
                              </p>
                            )}

                            {appointment.notes && (
                              <p className="text-gray-400 text-sm">
                                <span className="text-gray-500">Notes:</span> {appointment.notes}
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          {appointment.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => updateStatus(appointment.id, 'confirmed')}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-all"
                              >
                                Confirm
                              </button>
                              <button
                                onClick={() => updateStatus(appointment.id, 'cancelled')}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition-all"
                              >
                                Cancel
                              </button>
                            </div>
                          )}

                          {appointment.status === 'confirmed' && (
                            <button
                              onClick={() => updateStatus(appointment.id, 'completed')}
                              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all"
                            >
                              Mark Complete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
