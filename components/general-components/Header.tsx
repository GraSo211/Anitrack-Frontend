import React from 'react'

export default function Header() {
  return (
    <header className='h-20 flex items-center w-full  sticky top-0 border-b mb-1'>
      <div className=' w-full font-bold flex items-center justify-center'><h1>ANITRACK</h1></div>
      <div className='w-full'></div>
      <nav className='w-full'>
        <ul className='w-full flex justify-around items-center px-3'>
          <li>Inicio</li>
          <li>Inicio</li>
          <li>Inicio</li>
          <li>Inicio</li>
          <li>Inicio</li>
        </ul>
      </nav>

    </header>
  )
}
