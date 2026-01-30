/**
 * Admin API Client
 * Handles all admin panel API requests
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://neuralcipher-ai-production.up.railway.app'

interface AdminLoginCredentials {
  email: string
  password: string
}

interface AdminLoginResponse {
  access_token: string
  refresh_token: string
  token_type: string
  user: {
    id: number
    email: string
    role: string
    first_name: string | null
    last_name: string | null
    is_active: boolean
    created_at: string
    last_login: string | null
  }
}

interface DashboardStats {
  total_users: number
  active_users: number
  total_tests: number
  tests_today: number
  revenue_monthly: number
  growth_rate: number
  hospitals: number
  doctors: number
  patients: number
  system_alerts: number
}

interface RecentActivity {
  type: string
  user_email: string
  user_name: string | null
  user_role: string
  timestamp: string
  details: string | null
}

interface User {
  id: number
  email: string
  role: string
  first_name: string | null
  last_name: string | null
  is_active: boolean
  email_verified: boolean
  created_at: string
  last_login: string | null
}

interface UserListResponse {
  users: User[]
  total: number
  page: number
  page_size: number
  total_pages: number
}

class AdminAPI {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('admin_token')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  // Authentication
  async login(credentials: AdminLoginCredentials): Promise<AdminLoginResponse> {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.detail || 'Login failed')
    }

    const data = await response.json()
    
    // Store token
    localStorage.setItem('admin_token', data.access_token)
    localStorage.setItem('admin_refresh_token', data.refresh_token)
    localStorage.setItem('admin_user', JSON.stringify(data.user))
    
    return data
  }

  async logout(): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/api/v1/admin/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      })
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_refresh_token')
      localStorage.removeItem('admin_user')
    }
  }

  async getMe(): Promise<AdminLoginResponse['user']> {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/auth/me`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    return response.json()
  }

  // Dashboard
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/dashboard/stats`, {
      headers: this.getAuthHeaders()
    })

    if (!response.ok) {
      throw new Error('Failed to fetch dashboard stats')
    }

    return response.json()
  }

  async getRecentActivity(limit: number = 10): Promise<RecentActivity[]> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/dashboard/recent-activity?limit=${limit}`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch recent activity')
    }

    return response.json()
  }

  async getUserGrowthChart(days: number = 30): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/dashboard/charts/user-growth?days=${days}`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch user growth chart')
    }

    return response.json()
  }

  async getRoleDistributionChart(): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/dashboard/charts/role-distribution`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch role distribution chart')
    }

    return response.json()
  }

  async getActivityTimeline(hours: number = 24): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/dashboard/charts/activity-timeline?hours=${hours}`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch activity timeline')
    }

    return response.json()
  }

  // Users
  async getUsers(params: {
    page?: number
    page_size?: number
    search?: string
    role?: string
    is_active?: boolean
  } = {}): Promise<UserListResponse> {
    const queryParams = new URLSearchParams()
    
    if (params.page) queryParams.append('page', params.page.toString())
    if (params.page_size) queryParams.append('page_size', params.page_size.toString())
    if (params.search) queryParams.append('search', params.search)
    if (params.role) queryParams.append('role', params.role)
    if (params.is_active !== undefined) queryParams.append('is_active', params.is_active.toString())

    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/users?${queryParams}`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch users')
    }

    return response.json()
  }

  async getUser(userId: number): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/users/${userId}`,
      { headers: this.getAuthHeaders() }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch user')
    }

    return response.json()
  }

  async updateUser(userId: number, data: any): Promise<any> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/users/${userId}`,
      {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(data)
      }
    )

    if (!response.ok) {
      throw new Error('Failed to update user')
    }

    return response.json()
  }

  async deleteUser(userId: number): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/admin/users/${userId}`,
      {
        method: 'DELETE',
        headers: this.getAuthHeaders()
      }
    )

    if (!response.ok) {
      throw new Error('Failed to delete user')
    }
  }

  // Helper methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token')
  }

  getStoredUser(): AdminLoginResponse['user'] | null {
    const userStr = localStorage.getItem('admin_user')
    return userStr ? JSON.parse(userStr) : null
  }
}

export const adminApi = new AdminAPI()

// Helper function for authentication check
export function isAdminAuthenticated(): boolean {
  return adminApi.isAuthenticated()
}
