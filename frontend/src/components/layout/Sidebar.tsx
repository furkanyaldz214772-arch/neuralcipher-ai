'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/lib/auth-store'
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
  FileCheck
} from 'lucide-react'

export default function Sidebar() {
  const pathname = usePathname()
  const { user } = useAuthStore()

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
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center space-x-2">
          <Activity className="h-8 w-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            NeuralCipher
          </span>
        </Link>
      </div>

      <nav className="px-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user?.full_name || user?.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {user?.role?.toLowerCase()}
          </p>
        </div>
      </div>
    </aside>
  )
}
