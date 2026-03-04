import React from 'react'

export default function Stat({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-[#0d1b2a] p-4 rounded-lg text-center">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs opacity-70">{label}</p>
    </div>
  )
}
