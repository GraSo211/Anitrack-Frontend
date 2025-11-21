import React from 'react'
import AnimeList from '../anime/horizontal-list/AnimeList'
import { Anime } from '@/types/Anime';
import { getSeasonTrendAnimes } from '@/actions/categories/getSeasonTrendAnimes';
import { getUpcomingAnimeReleases } from '@/actions/categories/getUpcomingAnimeReleases';
import { getMostValoratedAnimes } from '@/actions/categories/getMostValoratedAnimes';
import { getAnimesByGenre } from '@/actions/categories/getAnimesByGenre';

export default async     function AnimeCategories() {
    const seasonTrendAnimes: Anime[] = await getSeasonTrendAnimes(5);
    const upcomingAnimes: Anime[] = await getUpcomingAnimeReleases(5);
    const mostValoratedAnimes: Anime[] = await getMostValoratedAnimes(5);
    const actionAnimes: Anime[] = await getAnimesByGenre(5, "Action");
    const romanceAnimes: Anime[] = await getAnimesByGenre(5, "Romance");
    const comedyAnimes: Anime[] = await getAnimesByGenre(5, "Comedy");
    const sliceOfLifeAnimes: Anime[] = await getAnimesByGenre(5, "Slice of Life");
  return (
    <div>
         <AnimeList category={seasonTrendAnimes} title="Lo más popular de la Temporada" />
         <AnimeList category={upcomingAnimes} title="Estrenos más Esperados" />
         <AnimeList category={mostValoratedAnimes} title="Mejor Valorados de la Historia" />
         <AnimeList category={actionAnimes} title="Acción" />
         <AnimeList category={romanceAnimes} title="Romance" />
         <AnimeList category={comedyAnimes} title="Comedia" />
         <AnimeList category={sliceOfLifeAnimes} title="Slice of Life" />
         
    </div>
  )
}
