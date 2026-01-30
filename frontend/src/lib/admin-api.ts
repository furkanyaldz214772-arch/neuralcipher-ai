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

  // Tests Management
  async getTestStats() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/tests/stats`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch test stats')
    return response.json()
  }

  async listTests(params?: { skip?: number; limit?: number; status?: string; risk_level?: string }) {
    const queryParams = new URLSearchParams()
    if (params?.skip) queryParams.append('skip', params.skip.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.risk_level) queryParams.append('risk_level', params.risk_level)

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/tests/list?${queryParams}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch tests')
    return response.json()
  }

  async getTestDetail(testId: number) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/tests/${testId}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch test detail')
    return response.json()
  }

  async deleteTest(testId: number) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/tests/${testId}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to delete test')
    return response.json()
  }

  async bulkDeleteTests(testIds: number[]) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/tests/bulk-delete`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(testIds)
    })
    if (!response.ok) throw new Error('Failed to delete tests')
    return response.json()
  }

  // Analytics
  async getAnalyticsOverview() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/overview`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch analytics overview')
    return response.json()
  }

  async getUserRegistrations(days: number = 30) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/user-registrations?days=${days}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch user registrations')
    return response.json()
  }

  async getTestVolume(days: number = 30) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/test-volume?days=${days}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch test volume')
    return response.json()
  }

  async getRiskDistribution() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/risk-distribution`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch risk distribution')
    return response.json()
  }

  async getHourlyActivity() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/hourly-activity`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch hourly activity')
    return response.json()
  }

  async getUserActivityHeatmap() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/analytics/user-activity-heatmap`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch activity heatmap')
    return response.json()
  }

  // Security
  async getSecurityStats() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/stats`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch security stats')
    return response.json()
  }

  async getLoginAttempts(params?: { skip?: number; limit?: number; success?: boolean }) {
    const queryParams = new URLSearchParams()
    if (params?.skip) queryParams.append('skip', params.skip.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.success !== undefined) queryParams.append('success', params.success.toString())

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/login-attempts?${queryParams}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch login attempts')
    return response.json()
  }

  async getAuditLogs(params?: { skip?: number; limit?: number; action?: string }) {
    const queryParams = new URLSearchParams()
    if (params?.skip) queryParams.append('skip', params.skip.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.action) queryParams.append('action', params.action)

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/audit-logs?${queryParams}`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch audit logs')
    return response.json()
  }

  async getBlockedIPs() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/blocked-ips`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch blocked IPs')
    return response.json()
  }

  async blockIP(ipAddress: string, reason: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/block-ip`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ ip_address: ipAddress, reason })
    })
    if (!response.ok) throw new Error('Failed to block IP')
    return response.json()
  }

  async unblockIP(ipAddress: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/security/unblock-ip/${ipAddress}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to unblock IP')
    return response.json()
  }

  // Settings
  async getSystemSettings() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/settings/system`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch system settings')
    return response.json()
  }

  async updateSystemSettings(settings: any) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/settings/system`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings)
    })
    if (!response.ok) throw new Error('Failed to update system settings')
    return response.json()
  }

  async getEmailSettings() {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/settings/email`, {
      headers: this.getAuthHeaders()
    })
    if (!response.ok) throw new Error('Failed to fetch email settings')
    return response.json()
  }

  async updateEmailSettings(settings: any) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/settings/email`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(settings)
    })
    if (!response.ok) throw new Error('Failed to update email settings')
    return response.json()
  }

  async sendTestEmail(recipient: string) {
    const response = await fetch(`${API_BASE_URL}/api/v1/admin/settings/test-email`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ recipient })
    })
    if (!response.ok) throw new Error('Failed to send test email')
    return response.json()
  }
}

export const adminApi = new AdminAPI()
export const adminAPI = adminApi

// Helper function for authentication check
export function isAdminAuthenticated(): boolean {
  return adminApi.isAuthenticated()
}

export default adminAPI
