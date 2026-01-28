'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * Admin Panel Layout
 * Includes Sidebar and Topbar
 * Updated: 28 Ocak 2026
 */

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const pathname = usePathname()

  // If on login page, don't show layout
  if (pathname === '/admin-panel') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Topbar */}
        <AdminTopbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

// Sidebar Component
function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Dashboard',
      icon: '🏠',
      href: '/admin-panel/dashboard',
    },
    {
      title: 'Users',
      icon: '👥',
      href: '/admin-panel/users',
      submenu: [
        { title: 'All Users', href: '/admin-panel/users' },
        { title: 'Patients', href: '/admin-panel/users/patients' },
        { title: 'Doctors', href: '/admin-panel/users/doctors' },
        { title: 'Hospitals', href: '/admin-panel/users/hospitals' },
      ]
    },
    {
      title: 'Tests',
      icon: '🧪',
      href: '/admin-panel/tests',
    },
    {
      title: 'Billing',
      icon: '💰',
      href: '/admin-panel/billing',
      submenu: [
        { title: 'Packages', href: '/admin-panel/packages' },
        { title: 'Payments', href: '/admin-panel/payments' },
      ]
    },
    {
      title: 'Hospitals',
      icon: '🏥',
      href: '/admin-panel/hospitals',
    },
    {
      title: 'Doctors',
      icon: '👨‍⚕️',
      href: '/admin-panel/doctors',
    },
    {
      title: 'Reports',
      icon: '📊',
      href: '/admin-panel/reports',
    },
    {
      title: 'Logs',
      icon: '📝',
      href: '/admin-panel/logs',
    },
    {
      title: 'Communications',
      icon: '📧',
      href: '/admin-panel/communications',
      submenu: [
        { title: 'Emails', href: '/admin-panel/emails' },
        { title: 'Notifications', href: '/admin-panel/notifications' },
      ]
    },
    {
      title: 'Mobile App',
      icon: '📱',
      href: '/admin-panel/mobile',
    },
    {
      title: 'Content',
      icon: '🎨',
      href: '/admin-panel/content',
    },
    {
      title: 'Analytics',
      icon: '📈',
      href: '/admin-panel/analytics',
    },
    {
      title: 'Security',
      icon: '🔒',
      href: '/admin-panel/security',
    },
    {
      title: 'Settings',
      icon: '⚙️',
      href: '/admin-panel/settings',
    },
  ]

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        {isOpen ? (
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        ) : (
          <span className="text-2xl">⚡</span>
        )}
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => (
          <div key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                pathname === item.href
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="font-medium">{item.title}</span>}
            </Link>
            
            {/* Submenu */}
            {isOpen && item.submenu && (
              <div className="ml-8 mt-2 space-y-1">
                {item.submenu.map((subitem) => (
                  <Link
                    key={subitem.href}
                    href={subitem.href}
                    className={`block px-4 py-2 rounded-lg text-sm transition-all ${
                      pathname === subitem.href
                        ? 'bg-purple-600/50 text-white'
                        : 'hover:bg-slate-700 text-slate-400'
                    }`}
                  >
                    {subitem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Logout */}
        <Link
          href="/admin-panel"
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/20 text-red-400 transition-all mt-8"
        >
          <span className="text-xl">🚪</span>
          {isOpen && <span className="font-medium">Logout</span>}
        </Link>
      </nav>
    </aside>
  )
}

// Topbar Component
function AdminTopbar({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-64 px-4 py-2 pl-10 bg-slate-800 text-slate-200 placeholder-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg
            className="w-5 h-5 text-slate-500 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
          <svg className="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold">A</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-200">Admin</p>
            <p className="text-xs text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}
