import AdminGuard from '@/components/administrador/AdminGuard'
import AdminLayout from '@/components/administrador/AdminLayout'

import React from 'react'

export default function page() {
  return (
    <div className=' h-full '>
      <AdminGuard>
        <AdminLayout></AdminLayout>
      </AdminGuard>
    </div>
  )
}
