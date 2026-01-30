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
  
  // Production fallback (Real Railway URL)
  return 'https://web-production-c00b0.up.railway.app'
}

const API_URL = getApiUrl()

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ SECURITY: Send cookies with requests
})

// Request interceptor - Cookies are sent automatically
api.interceptors.request.use(
  (config) => {
    // ✅ SECURITY: Tokens are in httpOnly cookies, no localStorage needed
    // Cookies are automatically sent by browser
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
        // ✅ SECURITY: Refresh token is in httpOnly cookie
        // Backend will read it automatically
        await axios.post(
          `${API_URL}/api/v1/auth/refresh`,
          {},
          { withCredentials: true }
        )

        // Retry original request (new access token is in cookie)
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh failed - logout
        // Don't redirect if already on login pages
        if (typeof window !== 'undefined') {
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
