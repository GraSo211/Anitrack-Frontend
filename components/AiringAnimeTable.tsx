import React from 'react'

import { getAnimes } from '@/actions/getAnimes';
export default async function  AiringAnimeTable() {
  const  animes =await getAnimes();
  console.log(animes)
  return (
    <table className='w-[90%] bg-gray-700 '>
        <caption>Animes En Emision</caption>
        <thead>
            <tr>
                <th>Lunes</th>
                <th>Martes</th>
                <th>Miercoles</th>
                <th>Jueves</th>
                <th>Viernes</th>
                <th>Sabado</th>
                <th>Domingo</th>
            </tr>
        </thead>
        <tbody>
            
        </tbody>
    </table>
  )
}
