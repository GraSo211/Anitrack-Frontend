"use client";
import React, { useState } from 'react'
import ConfigSelector from './ConfigSelector';
import { ADMINSELECTOR } from '@/types/admin/AdminSelector';

export default function () {
    const [selector, useSelector] = useState<ADMINSELECTOR>("dashboard");
    return (
        <div className=' h-full flex '>
            <section className='flex flex-col h-full border-gray-200/20 border-r mt-3  justify-start w-40 xl:w-60  '>
                <span className='  py-5 pl-3  w-full border-b border-gray-200/20 gap-2'>
                    <h1 className='text-sm  text-gray-400'>Admin </h1>
                    <h2 className='text-sm font-bold'> Panel</h2>
                </span>
                <div className='pl-3'>
                    <ul className='flex flex-col gap-2 mt-3'>
                        <li className='text-sm text-gray-400 hover:text-gray-200 cursor-pointer' ><button onClick={() => useSelector("dashboard")}>Dashboard</button></li>
                        <li className='text-sm text-gray-400 hover:text-gray-200 cursor-pointer'><button onClick={() => useSelector("hero")}>Hero Images</button></li>
                        <li className='text-sm text-gray-400 hover:text-gray-200 cursor-pointer'><button onClick={() => useSelector("configuration")}>Configuracion</button></li>
                    </ul>
                </div>


            </section>
            <ConfigSelector selector={selector}></ConfigSelector>


        </div>
    )
}
