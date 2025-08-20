import React from 'react'

interface Props {
  genres: string[];
}

export default function Genres({ genres }: Props) {
  return (
    <div className='flex gap-1 my-2 flex-wrap'>
        {genres.map((genre, index) => 
            <span key={index} className="bg-gray-800/50 px-2 border rounded-2xl font-semibold text-gray-300">{genre}</span>
        )}
    
    </div>
  )
}
