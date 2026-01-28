'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

/**
 * Admin Panel - User Detail Page
 * View and edit detailed user information
 * Created: 28 Ocak 2026 - Dark Theme
 */

export default function UserDetailPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params.id

  // Mock user data - replace with API call
  const [user, setUser] = useState({
    id: userId,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Patient',
    status: 'Active',
    country: 'USA',
    phone: '+1 234 567 8900',
    dateJoined: '2026-01-15',
    lastLogin: '2026-01-28 14:30',
    totalTests: 5,
    subscription: 'Premium',
    twoFactorEnabled: true,
    emailVerified: true,
    phoneVerified: false,
    profilePhoto: null,
    address: '123 Main St, New York, NY 10001',
    dateOfBirth: '1985-05-15',
    gender: 'Male',
    notes: 'Regular patient, no issues reported.'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
    // TODO: API call to save changes
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      // TODO: API call to delete user
      router.push('/admin-panel/users')
    }
  }

  const handleSuspend = () => {
    if (confirm('Are you sure you want to suspend this user?')) {
      setUser({...user, status: 'Inactive'})
      // TODO: API call to suspend user
    }
  }

  const handleActivate = () => {
    setUser({...user, status: 'Active'})
    // TODO: API call to activate user
  }

  const activityLogs = [
    { id: 1, action: 'Login', time: '2026-01-28 14:30', ip: '192.168.1.100', status: 'Success' },
    { id: 2, action: 'Test Completed', time: '2026-01-28 10:15', ip: '192.168.1.100', status: 'Success' },
    { id: 3, action: 'Profile Updated', time: '2026-01-27 16:45', ip: '192.168.1.100', status: 'Success' },
    { id: 4, action: 'Password Changed', time: '2026-01-25 09:20', ip: '192.168.1.100', status: 'Success' },
    { id: 5, action: 'Failed Login', time: '2026-01-24 22:10', ip: '10.0.0.45', status: 'Failed' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl font-bold text-slate-100">User Details</h1>
            <p className="text-slate-400 mt-1">View and manage user information</p>
          </div>
        </div>
        <div className="flex gap-3">
          {!isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Edit User
              </button>
              {user.status === 'Active' ? (
                <button
                  onClick={handleSuspend}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Suspend
                </button>
              ) : (
                <button
                  onClick={handleActivate}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Activate
                </button>
              )}
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete User
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setEditedUser(user)
                }}
                className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - User Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-slate-200">{user.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-slate-200">{user.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedUser.phone}
                    onChange={(e) => setEditedUser({...editedUser, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-slate-200">{user.phone}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
                {isEditing ? (
                  <select
                    value={editedUser.role}
                    onChange={(e) => setEditedUser({...editedUser, role: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option>Patient</option>
                    <option>Doctor</option>
                    <option>Hospital</option>
                    <option>Authorized</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                    user.role === 'Patient' ? 'bg-purple-900/50 text-purple-300 border border-purple-700' :
                    user.role === 'Doctor' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                    user.role === 'Hospital' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                    'bg-pink-900/50 text-pink-300 border border-pink-700'
                  }`}>
                    {user.role}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Country</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedUser.country}
                    onChange={(e) => setEditedUser({...editedUser, country: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-slate-200">{user.country}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Date of Birth</label>
                {isEditing ? (
                  <input
                    type="date"
                    value={editedUser.dateOfBirth}
                    onChange={(e) => setEditedUser({...editedUser, dateOfBirth: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                ) : (
                  <p className="text-slate-200">{user.dateOfBirth}</p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Address</label>
              {isEditing ? (
                <textarea
                  value={editedUser.address}
                  onChange={(e) => setEditedUser({...editedUser, address: e.target.value})}
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <p className="text-slate-200">{user.address}</p>
              )}
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-400 mb-2">Admin Notes</label>
              {isEditing ? (
                <textarea
                  value={editedUser.notes}
                  onChange={(e) => setEditedUser({...editedUser, notes: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              ) : (
                <p className="text-slate-200">{user.notes}</p>
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
              <h2 className="text-xl font-semibold text-slate-100">Activity Logs</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Action</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">IP Address</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {activityLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-800/50">
                      <td className="px-6 py-4 text-sm text-slate-300">{log.action}</td>
                      <td className="px-6 py-4 text-sm text-slate-400">{log.time}</td>
                      <td className="px-6 py-4 text-sm font-mono text-slate-400">{log.ip}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          log.status === 'Success' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Security */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                <span className="text-white text-3xl font-bold">{user.name[0]}</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-100">{user.name}</h3>
              <p className="text-slate-400 text-sm">{user.email}</p>
              <span className={`mt-3 px-4 py-1 text-sm font-medium rounded-full ${
                user.status === 'Active' ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
              }`}>
                {user.status}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Tests</span>
                <span className="text-slate-200 font-semibold">{user.totalTests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Subscription</span>
                <span className="text-purple-400 font-semibold">{user.subscription}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Member Since</span>
                <span className="text-slate-200 font-semibold">{user.dateJoined}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Last Login</span>
                <span className="text-slate-200 font-semibold">{user.lastLogin}</span>
              </div>
            </div>
          </div>

          {/* Security Status */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Security Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">2FA Enabled</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  user.twoFactorEnabled ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}>
                  {user.twoFactorEnabled ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Email Verified</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  user.emailVerified ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}>
                  {user.emailVerified ? 'Yes' : 'No'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone Verified</span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  user.phoneVerified ? 'bg-green-900/50 text-green-300 border border-green-700' : 'bg-red-900/50 text-red-300 border border-red-700'
                }`}>
                  {user.phoneVerified ? 'Yes' : 'No'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-100 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                Send Email
              </button>
              <button className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                Reset Password
              </button>
              <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                View Tests
              </button>
              <button className="w-full px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm">
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
