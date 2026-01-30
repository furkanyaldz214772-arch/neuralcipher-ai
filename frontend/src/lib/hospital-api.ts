/**
 * Hospital API Client
 * Handles all hospital panel API calls
 */
import { api } from './api'

// Hospital Dashboard API
export const hospitalDashboardAPI = {
  /**
   * Get hospital dashboard statistics
   */
  getStats: async () => {
    const response = await api.get('/api/v1/hospital/dashboard/stats')
    return response.data
  },

  /**
   * Get recent patients
   */
  getRecentPatients: async (limit: number = 10) => {
    const response = await api.get('/api/v1/hospital/dashboard/recent-patients', {
      params: { limit }
    })
    return response.data
  },

  /**
   * Get hospital doctors
   */
  getDoctors: async () => {
    const response = await api.get('/api/v1/hospital/dashboard/doctors')
    return response.data
  },

  /**
   * Get hospital activity
   */
  getActivity: async (days: number = 30) => {
    const response = await api.get('/api/v1/hospital/dashboard/activity', {
      params: { days }
    })
    return response.data
  }
}

// Hospital Patients API
export const hospitalPatientsAPI = {
  /**
   * Get hospital patients list
   */
  getPatients: async (params?: {
    page?: number
    limit?: number
    search?: string
    risk_level?: string
  }) => {
    const response = await api.get('/api/v1/hospital/patients', { params })
    return response.data
  },

  /**
   * Get patient details
   */
  getPatientDetails: async (patientId: string) => {
    const response = await api.get(`/api/v1/hospital/patients/${patientId}`)
    return response.data
  },

  /**
   * Get patient test history
   */
  getPatientTests: async (patientId: string, params?: {
    page?: number
    limit?: number
  }) => {
    const response = await api.get(`/api/v1/hospital/patients/${patientId}/tests`, { params })
    return response.data
  }
}

// Hospital Doctors API
export const hospitalDoctorsAPI = {
  /**
   * Get hospital doctors list
   */
  getDoctors: async (params?: {
    page?: number
    limit?: number
    search?: string
  }) => {
    const response = await api.get('/api/v1/hospital/doctors', { params })
    return response.data
  },

  /**
   * Get doctor details
   */
  getDoctorDetails: async (doctorId: string) => {
    const response = await api.get(`/api/v1/hospital/doctors/${doctorId}`)
    return response.data
  },

  /**
   * Get doctor's patients
   */
  getDoctorPatients: async (doctorId: string) => {
    const response = await api.get(`/api/v1/hospital/doctors/${doctorId}/patients`)
    return response.data
  }
}

// Combined Hospital API
export const hospitalAPI = {
  dashboard: hospitalDashboardAPI,
  patients: hospitalPatientsAPI,
  doctors: hospitalDoctorsAPI
}
