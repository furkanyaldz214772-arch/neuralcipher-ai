'use client'

import Sidebar from '@/components/layout/Sidebar'
import { SidebarProvider, useSidebar } from '@/lib/sidebar-context'

function DoctorLayoutContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()
  
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
      <Sidebar />
      <main 
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <DoctorLayoutContent>{children}</DoctorLayoutContent>
    </SidebarProvider>
  )
}
