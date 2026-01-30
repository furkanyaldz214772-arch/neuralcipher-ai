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
  profile_photo_url?: string | null
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
  updateUser: (userData: Partial<User>) => void
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
          
          // ✅ SECURITY: Tokens are set in httpOnly cookies by backend
          const response = await api.post('/api/v1/auth/login', loginData)

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

      logout: async () => {
        try {
          // ✅ SECURITY: Clear httpOnly cookies on backend
          await api.post('/api/v1/auth/logout')
        } catch (error) {
          console.error('Logout error:', error)
        }
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

      updateUser: (userData: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } })
        }
      },

      initialize: async () => {
        // ✅ SECURITY: Check if user is authenticated via cookie
        try {
          await get().fetchUser()
        } catch (error) {
          // Not authenticated or token invalid
          get().logout()
        }
      },

      setTokens: async (accessToken: string, refreshToken: string) => {
        // ✅ SECURITY: Tokens are now in httpOnly cookies
        // This method is deprecated but kept for backward compatibility
        console.warn('setTokens is deprecated - tokens are now in httpOnly cookies')
        
        // Fetch user data
        try {
          await get().fetchUser()
          set({ isAuthenticated: true })
        } catch (error) {
          set({ isAuthenticated: false })
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
