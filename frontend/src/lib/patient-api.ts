/**
 * Patient Panel API Client
 * All API calls for patient dashboard, profile, tests, and messages
 */
import { api } from './api'

// ============================================================================
// DASHBOARD API (6 endpoints)
// ============================================================================

export const patientDashboardAPI = {
  /**
   * Get dashboard statistics
   */
  getStats: async () => {
    const response = await api.get('/api/v1/patient/dashboard/stats')
    return response.data
  },

  /**
   * Get recent tests with pagination
   */
  getRecentTests: async (limit: number = 5) => {
    const response = await api.get('/api/v1/patient/dashboard/recent-tests', {
      params: { limit }
    })
    return response.data
  },

  /**
   * Get risk trend chart data
   */
  getRiskTrend: async (days: number = 30) => {
    const response = await api.get('/api/v1/patient/dashboard/risk-trend', {
      params: { days }
    })
    return response.data
  },

  /**
   * Get health tips
   */
  getHealthTips: async () => {
    const response = await api.get('/api/v1/patient/dashboard/health-tips')
    return response.data
  },

  /**
   * Get notifications
   */
  getNotifications: async (limit: number = 10) => {
    const response = await api.get('/api/v1/patient/dashboard/notifications', {
      params: { limit }
    })
    return response.data
  },

  /**
   * Mark notification as read
   */
  markNotificationRead: async (notificationId: string) => {
    const response = await api.post(`/api/v1/patient/dashboard/notifications/${notificationId}/read`)
    return response.data
  },
}

// ============================================================================
// PROFILE API (7 endpoints)
// ============================================================================

export const patientProfileAPI = {
  /**
   * Get profile information
   */
  getProfile: async () => {
    const response = await api.get('/api/v1/patient/profile')
    return response.data
  },

  /**
   * Update profile information
   */
  updateProfile: async (data: {
    first_name?: string
    last_name?: string
    phone?: string
    date_of_birth?: string
    gender?: string
    address?: string
    city?: string
    country?: string
  }) => {
    const response = await api.put('/api/v1/patient/profile', data)
    return response.data
  },

  /**
   * Get access key
   */
  getAccessKey: async () => {
    const response = await api.get('/api/v1/patient/profile/access-key')
    return response.data
  },

  /**
   * Regenerate access key
   */
  regenerateAccessKey: async () => {
    const response = await api.post('/api/v1/patient/profile/access-key/regenerate')
    return response.data
  },

  /**
   * Get doctors who have access
   */
  getMyDoctors: async () => {
    const response = await api.get('/api/v1/patient/profile/my-doctors')
    return response.data
  },

  /**
   * Revoke doctor access
   */
  revokeDoctorAccess: async (doctorId: string) => {
    const response = await api.delete(`/api/v1/patient/profile/revoke-doctor/${doctorId}`)
    return response.data
  },

  /**
   * Get profile statistics
   */
  getStatistics: async () => {
    const response = await api.get('/api/v1/patient/profile/statistics')
    return response.data
  },
}

// ============================================================================
// TESTS API (6 endpoints)
// ============================================================================

export const patientTestsAPI = {
  /**
   * Get test history with pagination and filtering
   */
  getHistory: async (params?: {
    page?: number
    limit?: number
    risk_level?: string
    start_date?: string
    end_date?: string
  }) => {
    const response = await api.get('/api/v1/patient/tests/history', { params })
    return response.data
  },

  /**
   * Get test details by ID
   */
  getTestDetails: async (testId: string) => {
    const response = await api.get(`/api/v1/patient/tests/${testId}`)
    return response.data
  },

  /**
   * Get test statistics
   */
  getStatistics: async () => {
    const response = await api.get('/api/v1/patient/tests/statistics')
    return response.data
  },

  /**
   * Get biomarker trends
   */
  getBiomarkerTrends: async (days: number = 90) => {
    const response = await api.get('/api/v1/patient/tests/biomarker-trends', {
      params: { days }
    })
    return response.data
  },

  /**
   * Get risk distribution
   */
  getRiskDistribution: async () => {
    const response = await api.get('/api/v1/patient/tests/risk-distribution')
    return response.data
  },

  /**
   * Export tests to PDF
   */
  exportToPDF: async (testIds: string[]) => {
    const response = await api.post('/api/v1/patient/tests/export-pdf', {
      test_ids: testIds
    }, {
      responseType: 'blob'
    })
    return response.data
  },
}

// ============================================================================
// MESSAGES API (9 endpoints)
// ============================================================================

export const patientMessagesAPI = {
  /**
   * Get inbox messages
   */
  getInbox: async (params?: {
    page?: number
    limit?: number
    unread_only?: boolean
  }) => {
    const response = await api.get('/api/v1/patient/messages/inbox', { params })
    return response.data
  },

  /**
   * Get sent messages
   */
  getSent: async (params?: {
    page?: number
    limit?: number
  }) => {
    const response = await api.get('/api/v1/patient/messages/sent', { params })
    return response.data
  },

  /**
   * Get message details
   */
  getMessage: async (messageId: string) => {
    const response = await api.get(`/api/v1/patient/messages/${messageId}`)
    return response.data
  },

  /**
   * Send message to doctor
   */
  sendMessage: async (data: {
    recipient_id: string
    subject: string
    body: string
  }) => {
    const response = await api.post('/api/v1/patient/messages/send', data)
    return response.data
  },

  /**
   * Mark message as read
   */
  markAsRead: async (messageId: string) => {
    const response = await api.post(`/api/v1/patient/messages/${messageId}/read`)
    return response.data
  },

  /**
   * Delete message
   */
  deleteMessage: async (messageId: string) => {
    const response = await api.delete(`/api/v1/patient/messages/${messageId}`)
    return response.data
  },

  /**
   * Get message statistics
   */
  getStatistics: async () => {
    const response = await api.get('/api/v1/patient/messages/statistics')
    return response.data
  },

  /**
   * Get conversation with doctor
   */
  getConversation: async (doctorId: string, params?: {
    page?: number
    limit?: number
  }) => {
    const response = await api.get(`/api/v1/patient/messages/conversation/${doctorId}`, { params })
    return response.data
  },

  /**
   * Mark all messages as read
   */
  markAllAsRead: async () => {
    const response = await api.post('/api/v1/patient/messages/mark-all-read')
    return response.data
  },
}

// ============================================================================
// COMBINED EXPORT
// ============================================================================

export const patientAPI = {
  dashboard: patientDashboardAPI,
  profile: patientProfileAPI,
  tests: patientTestsAPI,
  messages: patientMessagesAPI,
}

export default patientAPI
