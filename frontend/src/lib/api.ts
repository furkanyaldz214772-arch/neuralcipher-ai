/**
 * API Client
 * Axios instance with interceptors for auth
 */
import axios from 'axios'

// Smart API URL detection
const getApiUrl = () => {
  // Server-side rendering
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_API_URL || 'https://web-production-c00b0.up.railway.app'
  }
  
  // Client-side
  const envUrl = process.env.NEXT_PUBLIC_API_URL
  if (envUrl) return envUrl
  
  // Development fallback
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    return 'http://localhost:8000'
  }
  
  // Production fallback (Real Railway URL) - ✅ FIXED: Updated to correct URL (1 Feb 2026)
  return 'https://neuralcipher-ai-production.up.railway.app'
}

const API_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ SECURITY: Send cookies with requests
})

// Request interceptor - Add Authorization header from localStorage
api.interceptors.request.use(
  (config) => {
    // ✅ CROSS-DOMAIN FIX: Add Authorization header from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // If 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // ✅ CROSS-DOMAIN FIX: Send refresh token in Authorization header
        const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
        
        if (!refreshToken) {
          throw new Error('No refresh token available')
        }

        const response = await axios.post(
          `${API_URL}/api/v1/auth/refresh`,
          {},
          { 
            headers: {
              Authorization: `Bearer ${refreshToken}`
            },
            withCredentials: true 
          }
        )

        // Store new access token
        if (response.data.access_token && typeof window !== 'undefined') {
          localStorage.setItem('access_token', response.data.access_token)
        }

        // Retry original request with new token
        if (typeof window !== 'undefined') {
          originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`
        }
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed - logout
        if (typeof window !== 'undefined') {
          localStorage.removeItem('access_token')
          localStorage.removeItem('refresh_token')
          
          const currentPath = window.location.pathname
          if (!currentPath.includes('/auth/login') && !currentPath.includes('/neural-control-center')) {
            window.location.href = '/auth/login'
          }
        }
        
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

// Profile Photo API
export const profilePhotoAPI = {
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await api.post('/api/v1/profile/upload-photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  delete: async () => {
    const response = await api.delete('/api/v1/profile/photo')
    return response.data
  },
}

// Access Key API
export const accessKeyAPI = {
  get: async () => {
    const response = await api.get('/api/v1/profile/access-key')
    return response.data
  },

  regenerate: async () => {
    const response = await api.post('/api/v1/profile/regenerate-key')
    return response.data
  },

  getMyDoctors: async () => {
    const response = await api.get('/api/v1/profile/my-doctors')
    return response.data
  },

  revokeDoctorAccess: async (doctorId: string) => {
    const response = await api.delete(`/api/v1/profile/revoke-doctor-access/${doctorId}`)
    return response.data
  },
}

// Doctor Patient API
export const doctorPatientAPI = {
  addPatientByKey: async (accessKey: string) => {
    const response = await api.post('/api/v1/doctor/add-patient-by-key', {
      access_key: accessKey,
    })
    return response.data
  },

  getMyPatients: async (page: number = 1, limit: number = 20) => {
    const response = await api.get('/api/v1/doctor/my-patients', {
      params: { page, limit },
    })
    return response.data
  },

  removePatient: async (patientId: string) => {
    const response = await api.delete(`/api/v1/doctor/remove-patient/${patientId}`)
    return response.data
  },
}

export default api
