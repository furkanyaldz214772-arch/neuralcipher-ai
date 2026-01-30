/**
 * Doctor Panel API Client
 * All API calls for doctor dashboard and patient management
 */
import { api } from './api'

// ============================================================================
// DASHBOARD API (6 endpoints)
// ============================================================================

export const doctorDashboardAPI = {
  /**
   * Get dashboard statistics
   */
  getStats: async () => {
    const response = await api.get('/api/v1/doctor/dashboard/stats')
    return response.data
  },

  /**
   * Get recent patients
   */
  getRecentPatients: async (limit: number = 10) => {
    const response = await api.get('/api/v1/doctor/dashboard/recent-patients', {
      params: { limit }
    })
    return response.data
  },

  /**
   * Get high-risk alerts
   */
  getHighRiskAlerts: async (limit: number = 5) => {
    const response = await api.get('/api/v1/doctor/dashboard/high-risk-alerts', {
      params: { limit }
    })
    return response.data
  },

  /**
   * Get patient risk distribution chart
   */
  getRiskDistribution: async () => {
    const response = await api.get('/api/v1/doctor/dashboard/risk-distribution')
    return response.data
  },

  /**
   * Get test trends over time
   */
  getTestTrends: async (days: number = 30) => {
    const response = await api.get('/api/v1/doctor/dashboard/test-trends', {
      params: { days }
    })
    return response.data
  },

  /**
   * Get activity summary
   */
  getActivitySummary: async (days: number = 7) => {
    const response = await api.get('/api/v1/doctor/dashboard/activity-summary', {
      params: { days }
    })
    return response.data
  },
}

// ============================================================================
// PATIENT MANAGEMENT API (7 endpoints)
// ============================================================================

export const doctorPatientsAPI = {
  /**
   * Get patient list with pagination and filtering
   */
  getPatients: async (params?: {
    page?: number
    limit?: number
    search?: string
    risk_level?: string
    sort_by?: string
  }) => {
    const response = await api.get('/api/v1/doctor/patients', { params })
    return response.data
  },

  /**
   * Get patient details by ID
   */
  getPatientDetails: async (patientId: string) => {
    const response = await api.get(`/api/v1/doctor/patients/${patientId}`)
    return response.data
  },

  /**
   * Add patient by access key
   */
  addPatientByKey: async (accessKey: string) => {
    const response = await api.post('/api/v1/doctor/patients/add-by-key', {
      access_key: accessKey
    })
    return response.data
  },

  /**
   * Remove patient from my list
   */
  removePatient: async (patientId: string) => {
    const response = await api.delete(`/api/v1/doctor/patients/${patientId}`)
    return response.data
  },

  /**
   * Get patient test history
   */
  getPatientTests: async (patientId: string, params?: {
    page?: number
    limit?: number
    start_date?: string
    end_date?: string
  }) => {
    const response = await api.get(`/api/v1/doctor/patients/${patientId}/tests`, { params })
    return response.data
  },

  /**
   * Get patient statistics
   */
  getPatientStatistics: async (patientId: string) => {
    const response = await api.get(`/api/v1/doctor/patients/${patientId}/statistics`)
    return response.data
  },

  /**
   * Get patient risk trend
   */
  getPatientRiskTrend: async (patientId: string, days: number = 90) => {
    const response = await api.get(`/api/v1/doctor/patients/${patientId}/risk-trend`, {
      params: { days }
    })
    return response.data
  },
}

// ============================================================================
// COMBINED EXPORT
// ============================================================================

export const doctorAPI = {
  dashboard: doctorDashboardAPI,
  patients: doctorPatientsAPI,
}

export default doctorAPI
