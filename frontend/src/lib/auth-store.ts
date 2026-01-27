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
  full_name?: string
  is_verified: boolean
  is_2fa_enabled: boolean
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Actions
  login: (email: string, password: string, role?: string) => Promise<User | null>
  logout: () => void
  register: (email: string, password: string, role: string, additionalData?: any) => Promise<void>
  fetchUser: () => Promise<void>
  updateUser: (user: User) => void
  initialize: () => Promise<void>
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string, role?: string) => {
        set({ isLoading: true })
        try {
          const loginData: any = {
            email,
            password,
          }
          
          // ✅ ROLE VALIDATION: Send selected role to backend for verification
          if (role) {
            loginData.role = role.toUpperCase()
          }
          
          const response = await api.post('/api/v1/auth/login', loginData)

          const { access_token, refresh_token } = response.data
          
          localStorage.setItem('access_token', access_token)
          localStorage.setItem('refresh_token', refresh_token)

          // Fetch user data
          await get().fetchUser()
          
          set({ isAuthenticated: true, isLoading: false })
          
          // Return user with normalized role for redirect logic
          const user = get().user
          console.log('🔍 AUTH STORE - Login successful:', { 
            email: user?.email, 
            role: user?.role,
            roleType: typeof user?.role 
          })
          return user
        } catch (error) {
          set({ isLoading: false })
          console.error('❌ AUTH STORE - Login failed:', error)
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
          
          // DETAILED DEBUG LOGGING
          console.log('🔍 AUTH STORE - Raw API response:', response.data)
          console.log('🔍 AUTH STORE - Role value:', response.data.role)
          console.log('🔍 AUTH STORE - Role type:', typeof response.data.role)
          console.log('🔍 AUTH STORE - Role JSON:', JSON.stringify(response.data.role))
          
          // Keep role as-is from backend (should be UPPERCASE string)
          const userData = {
            ...response.data
          }
          
          console.log('✅ AUTH STORE - User data stored:', { 
            email: userData.email, 
            role: userData.role,
            roleType: typeof userData.role
          })
          
          set({ user: userData, isAuthenticated: true })
        } catch (error) {
          console.error('❌ AUTH STORE - Fetch user failed:', error)
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

      setTokens: async (accessToken: string, refreshToken: string) => {
        // Store tokens
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        
        // Fetch user data
        try {
          await get().fetchUser()
          set({ isAuthenticated: true })
        } catch (error) {
          // If fetch fails, still mark as authenticated (tokens are valid)
          set({ isAuthenticated: true })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
