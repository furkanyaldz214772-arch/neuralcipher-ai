'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
import { useSidebar } from '@/lib/sidebar-context'
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  Building2,
  Stethoscope,
  Activity,
  MessageSquare,
  BarChart3,
  Shield,
  Database,
  FileCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const { isCollapsed, toggleSidebar } = useSidebar()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/auth/login')
  }

  const getMenuItems = () => {
    // If no user, try to get role from pathname
    const role = user?.role || pathname?.split('/')[1]?.toUpperCase()
    
    console.log('Sidebar Debug:', { user, pathname, role, menuItems: role ? 'will show' : 'empty' })
    
    if (!role) return []

    switch (role) {
      case 'PATIENT':
        return [
          { href: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/patient/tests', icon: FileText, label: 'My Tests' },
          { href: '/patient/tests/new', icon: Activity, label: 'New Test' },
          { href: '/patient/messages', icon: MessageSquare, label: 'Messages' },
          { href: '/patient/appointments', icon: UserCircle, label: 'My Doctor' },
          { href: '/patient/settings', icon: Settings, label: 'Settings' }
        ]
      
      case 'DOCTOR':
        return [
          { href: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/doctor/patients', icon: Users, label: 'Patients' },
          { href: '/doctor/appointments', icon: UserCircle, label: 'Appointments' },
          { href: '/doctor/tests', icon: FileText, label: 'Test Results' },
          { href: '/doctor/reports', icon: FileCheck, label: 'Reports' },
          { href: '/doctor/messages', icon: MessageSquare, label: 'Messages' },
          { href: '/doctor/analytics', icon: BarChart3, label: 'Analytics' },
          { href: '/doctor/settings', icon: Settings, label: 'Settings' }
        ]
      
      case 'HOSPITAL':
        return [
          { href: '/hospital/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/hospital/doctors', icon: Stethoscope, label: 'Doctors' },
          { href: '/hospital/patients', icon: Users, label: 'Patients' },
          { href: '/hospital/tests', icon: FileText, label: 'Tests' },
          { href: '/hospital/analytics', icon: BarChart3, label: 'Analytics' },
          { href: '/hospital/settings', icon: Settings, label: 'Settings' }
        ]
      
      case 'ADMIN':
        return [
          { href: '/neural-control-center/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/neural-control-center/users', icon: Users, label: 'Users' },
          { href: '/neural-control-center/hospitals', icon: Building2, label: 'Hospitals' },
          { href: '/neural-control-center/tests', icon: FileCheck, label: 'Tests' },
          { href: '/neural-control-center/analytics', icon: BarChart3, label: 'Analytics' },
          { href: '/neural-control-center/database', icon: Database, label: 'Database' },
          { href: '/neural-control-center/audit', icon: Shield, label: 'Audit Logs' },
          { href: '/neural-control-center/settings', icon: Settings, label: 'Settings' }
        ]
      
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  // Kullanıcı adını al - full_name yoksa email'den al
  const displayName = user?.full_name || user?.email?.split('@')[0] || 'User'
  const displayEmail = user?.email || ''
  const profilePhotoUrl = user?.profile_photo_url

  // Get initials for fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || name[0]?.toUpperCase() || 'U'
  }

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-r border-gray-700 transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-700">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-[#0EA5E9] flex-shrink-0" />
            <span className="text-xl font-bold text-white whitespace-nowrap">
              NeuralCipher
            </span>
          </Link>
        )}
        
        {isCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full">
            <Activity className="h-8 w-8 text-[#0EA5E9]" />
          </Link>
        )}
        
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-700 transition-colors ${
            isCollapsed ? 'absolute -right-3 top-6 bg-[#1E293B] border border-gray-700 shadow-lg' : ''
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100vh-240px)]">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-gradient-to-r from-[#0EA5E9]/20 to-[#06B6D4]/20 text-[#0EA5E9] border border-[#0EA5E9]/30'
                  : 'text-gray-300 hover:bg-gray-700/50'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 border border-gray-700">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 border-l border-b border-gray-700 rotate-45"></div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Profile Dropdown */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-700 bg-[#0F172A]">
        <div className="relative">
          {/* Profile Button */}
          <button
            onClick={() => !isCollapsed && setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full p-4 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} hover:bg-gray-700/50 transition-colors`}
          >
            <div className={`flex items-center ${isCollapsed ? '' : 'space-x-3'}`}>
              <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden relative">
                {profilePhotoUrl ? (
                  <Image
                    src={profilePhotoUrl}
                    alt={displayName}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback to gradient circle on error
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                ) : null}
                {!profilePhotoUrl && (
                  <div className="w-full h-full bg-gradient-to-r from-[#0EA5E9] to-[#06B6D4] flex items-center justify-center text-white font-semibold">
                    {getInitials(displayName)}
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <div className="text-left">
                  <p className="text-sm font-medium text-white truncate max-w-[140px]">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-400 truncate max-w-[140px]">
                    {displayEmail}
                  </p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              isDropdownOpen ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )
            )}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && !isCollapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-1 bg-[#1E293B] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
              <Link
                href={`/${user?.role?.toLowerCase()}/settings`}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700/50 transition-colors text-gray-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                <UserCircle className="h-5 w-5" />
                <span className="font-medium">Profile</span>
              </Link>
              <Link
                href={`/${user?.role?.toLowerCase()}/settings`}
                className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-700/50 transition-colors text-gray-300"
                onClick={() => setIsDropdownOpen(false)}
              >
                <Settings className="h-5 w-5" />
                <span className="font-medium">Settings</span>
              </Link>
              <div className="border-t border-gray-700"></div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-500/10 transition-colors text-red-400"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
