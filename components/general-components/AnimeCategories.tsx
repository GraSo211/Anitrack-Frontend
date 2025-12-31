import React from 'react'
import AnimeList from '../anime/horizontal-list/AnimeList'
import { getSeasonTrendAnimes } from '@/actions/categories/getSeasonTrendAnimes';
import { getUpcomingAnimeReleases } from '@/actions/categories/getUpcomingAnimeReleases';
import { getMostValoratedAnimes } from '@/actions/categories/getMostValoratedAnimes';
import { getAnimesByGenre } from '@/actions/categories/getAnimesByGenre';
import { AnimeCard } from '@/types/AnimeCard';

export default async  function AnimeCategories() {
    const seasonTrendAnimes: AnimeCard[] = await getSeasonTrendAnimes();
    const upcomingAnimes: AnimeCard[] = await getUpcomingAnimeReleases();
    const mostValoratedAnimes: AnimeCard[] = await getMostValoratedAnimes();
    const actionAnimes: AnimeCard[] = await getAnimesByGenre("Action");
    const romanceAnimes: AnimeCard[] = await getAnimesByGenre("Romance");
    const comedyAnimes: AnimeCard[] = await getAnimesByGenre("Comedy");
    const sliceOfLifeAnimes: AnimeCard[] = await getAnimesByGenre("Slice of Life");
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
