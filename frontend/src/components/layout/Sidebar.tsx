'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  ChevronRight
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()
  const { isCollapsed, toggleSidebar } = useSidebar()

  const getMenuItems = () => {
    if (!user) return []

    switch (user.role) {
      case 'PATIENT':
        return [
          { href: '/patient/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/patient/tests', icon: FileText, label: 'My Tests' },
          { href: '/patient/tests/new', icon: Activity, label: 'New Test' },
          { href: '/patient/messages', icon: MessageSquare, label: 'Messages' },
          { href: '/patient/settings', icon: Settings, label: 'Settings' }
        ]
      
      case 'DOCTOR':
        return [
          { href: '/doctor/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/doctor/patients', icon: Users, label: 'Patients' },
          { href: '/doctor/tests', icon: FileText, label: 'Test Results' },
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
          { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
          { href: '/admin/users', icon: Users, label: 'Users' },
          { href: '/admin/hospitals', icon: Building2, label: 'Hospitals' },
          { href: '/admin/tests', icon: FileCheck, label: 'Tests' },
          { href: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
          { href: '/admin/database', icon: Database, label: 'Database' },
          { href: '/admin/audit', icon: Shield, label: 'Audit Logs' },
          { href: '/admin/settings', icon: Settings, label: 'Settings' }
        ]
      
      default:
        return []
    }
  }

  const menuItems = getMenuItems()

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header with Logo and Toggle Button */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
        {!isCollapsed && (
          <Link href="/" className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600 flex-shrink-0" />
            <span className="text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap">
              NeuralCipher
            </span>
          </Link>
        )}
        
        {isCollapsed && (
          <Link href="/" className="flex items-center justify-center w-full">
            <Activity className="h-8 w-8 text-blue-600" />
          </Link>
        )}
        
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
            isCollapsed ? 'absolute -right-3 top-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg' : ''
          }`}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="px-4 py-6 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
              title={isCollapsed ? item.label : ''}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="font-medium whitespace-nowrap">{item.label}</span>
              )}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                  {item.label}
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 dark:bg-gray-700 rotate-45"></div>
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* User Info Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className={`${isCollapsed ? 'flex justify-center' : 'px-4 py-2'}`}>
          {isCollapsed ? (
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user?.full_name?.[0] || user?.email?.[0] || 'U'}
            </div>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.full_name || user?.email}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {user?.role?.toLowerCase()}
              </p>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
