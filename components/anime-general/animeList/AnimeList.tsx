import { AnimeList as AnimeListType }  from '@/types/anime/Anime'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { FaStar } from 'react-icons/fa'

interface Props{
    animeList : AnimeListType
}

export default function AnimeList({animeList}:Props) {
    if(animeList.animeList.length == 0 ){
        return <div>No hay ningún anime en esta lista.</div>
    }
  return (
      <div className="grid w-3/4 xl:w-1/2 place-content-center grid-cols-2 md:grid-cols-4 xl:grid-cols-6  gap-4 xl:gap-6">
        {animeList.animeList.map((anime) => (
          <Link
            href={`/anime/m-${anime.id}`}
            key={anime.id}
            className="min-w-0 bg-bg-secondary border border-border-default rounded-lg overflow-hidden shadow hover:scale-105 transition"
          >
            <div className="relative aspect-[2/3] w-full bg-bg-tertiary">
              <Image
                src={anime.mainPicture.large}
                alt={anime.title}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 16vw"
                className="object-cover"
              />
            </div>

            <div className="p-2">
              <h2 className="text-sm font-semibold line-clamp-2" title={anime.title}>
                {anime.title}
              </h2>

              <div className="text-xs flex items-center gap-1 text-text-tertiary mt-1">
                <FaStar size={20} /> {anime.score}
              </div>

              <div className="text-xs text-text-muted">
                {anime.status}
              </div>
            </div>
          </Link>
        ))}
      </div>
  )
}
