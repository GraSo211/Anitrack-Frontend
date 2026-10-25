import AdminGuard from '@/components/administrador/AdminGuard'
import AdminLayout from '@/components/administrador/AdminLayout'
import type { Metadata } from 'next'

import React from 'react'

export const metadata: Metadata = {
  title: "Administración",
  robots: { index: false, follow: false },
}

export default function page() {
  return (
    <div className=' h-full '>
      <AdminGuard>
        <AdminLayout></AdminLayout>
      </AdminGuard>
    </div>
  )
}
