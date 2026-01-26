/**
 * Auth Store - Zustand
 * Global authentication state management
 */
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from './api'

interface User {
  id: string
  email: string
  role: string
  is_verified: boolean
  is_2fa_enabled: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void
  register: (email: string, password: string, role: string) => Promise<void>
  fetchUser: () => Promise<void>
  updateUser: (user: User) => void
  initialize: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const response = await api.post('/api/v1/auth/login', {
            email,
            password,
          })

          const { access_token, refresh_token } = response.data
          
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)

          // Fetch user data
          await get().fetchUser()
          
          set({ isAuthenticated: true, isLoading: false })
          
          // Return user for redirect logic
          return get().user
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        set({ user: null, isAuthenticated: false })
      },

      register: async (email: string, password: string, role: string, additionalData?: any) => {
        set({ isLoading: true })
        try {
          const registerData = {
            email,
            password,
            role
          }
          
          // Merge additional data if provided
          if (additionalData) {
            Object.assign(registerData, additionalData)
          }
          
          await api.post('/api/v1/auth/register', registerData)
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      fetchUser: async () => {
        try {
          const response = await api.get('/api/v1/auth/me')
          set({ user: response.data, isAuthenticated: true })
        } catch (error) {
          set({ user: null, isAuthenticated: false })
          throw error
        }
      },

      updateUser: (user: User) => {
        set({ user })
      },

      initialize: async () => {
        const token = localStorage.getItem('access_token')
        if (token) {
          try {
            await get().fetchUser()
          } catch (error) {
            // Token invalid, clear it
            get().logout()
          }
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
