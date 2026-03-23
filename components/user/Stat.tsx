import React from 'react'

export default function Stat({ label, value, clickable }: {
  label: string;
  value: number;
  clickable?: boolean;
}) {
  return (
    <div
      className={`
        p-4 rounded-xl bg-white/5 border border-white/10
        flex flex-col items-center justify-center
        transition
        ${clickable ? "hover:bg-white/10 hover:scale-105 cursor-pointer" : ""}
      `}
    >
      <span className="text-2xl font-bold">{value}</span>
      <span className="text-sm opacity-70">{label}</span>
    </div>
  );
}