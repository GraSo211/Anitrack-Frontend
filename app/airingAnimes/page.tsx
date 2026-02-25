
import { getReleasingAnimes } from '@/actions/getReleasingAnimes';
import AiringAnimeDay from '@/components/airingAnime/AiringAnimeDay';
import { AnimeReleasing } from '@/types/AnimeReleasing';

import React from 'react'

export default async function page() {

    let animes: AnimeReleasing[] | null = await getReleasingAnimes();

    //const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    //const hasError = animes !== undefined && !Array.isArray(animes);


   

    return (
        <div className='w-full overflow-hidden'>
            <AiringAnimeDay animes={animes}></AiringAnimeDay>
          
        </div>
    )
}
