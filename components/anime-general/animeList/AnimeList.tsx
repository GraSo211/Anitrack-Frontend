import { AnimeList as AnimeListType }  from '@/types/anime/Anime'
import Link from 'next/link'
import React from 'react'

interface Props{
    animeList : AnimeListType
}

export default function AnimeList({animeList}:Props) {
    if(animeList.animeList.length == 0 ){
        return <div>No hay ningun anime en esta lista.</div>
    }
  return (
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {animeList.animeList.map((anime) => (
          <Link
            href={`/anime/m-${anime.id}`}
            key={anime.id}
            className="bg-[#1e1e2e] rounded-lg overflow-hidden shadow hover:scale-105 transition"
          >
            <img
              src={anime.mainPicture.large}
              alt={anime.title}
              className="w-full h-56 object-cover"
            />

            <div className="p-2">
              <h2 className="text-sm font-semibold line-clamp-2">
                {anime.title}
              </h2>

              <div className="text-xs text-gray-400 mt-1">
                ⭐ {anime.score}
              </div>

              <div className="text-xs text-gray-500">
                {anime.status}
              </div>
            </div>
          </Link>
        ))}
      </div>
  )
}
