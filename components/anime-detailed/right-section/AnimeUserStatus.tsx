import { getAnimeStatus } from '@/actions/anime-list/getAnimeStatus'
import { AnimeStatus } from '@/types/AnimeStatus';
import React from 'react'


interface Props {
    token: string
    id: number
}

export default async function AnimeUserStatus({ token, id }: Props) {
    const animeStatus: AnimeStatus | null = await getAnimeStatus(token, id);
    if (!animeStatus || animeStatus.status == "none") return

    return (
        <div className="flex items-center gap-3 bg-blue-900/10 border border-zinc-800 rounded-xl px-4 py-2 w-fit">

            {/* Status */}
            <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                <span className="text-sm text-zinc-400">Estado</span>
                <span className="text-sm font-medium text-white">{animeStatus.status}</span>
            </div>

            {/* Score */}
            {
                (animeStatus.score != 0) &&
                <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                    <span className="text-yellow-400">⭐</span>
                    <span className="text-sm font-medium text-white">{animeStatus.score}</span>
                </div>
            }


            {/* Episodes */}
            {
                animeStatus.numEpisodes != 0 &&
                <div className="flex items-center gap-2 bg-blue-900/20 px-3 py-1 rounded-lg">
                    <span className="text-sm text-zinc-400">Episodios Vistos</span>
                    <span className="text-sm font-medium text-white">{animeStatus.numEpisodes}</span>
                </div>
            }

        </div>
    )
}
