import React from 'react'

interface Props {
  genres: string[];
}

export default function Genres({ genres }: Props) {
  return (
    <div className='flex gap-1 my-2 flex-wrap'>
        {genres.map((genre, index) => 
            <span key={index} className="bg-bg-tertiary px-2 border border-border-default rounded-2xl font-semibold text-text-secondary">{genre}</span>
        )}
    
    </div>
  )
}
