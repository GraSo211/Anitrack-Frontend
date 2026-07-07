import React from "react";

import { getSeasonTrendAnimes } from "@/actions/animes/categories/getSeasonTrendAnimes";
import { getUpcomingAnimeReleases } from "@/actions/animes/categories/getUpcomingAnimeReleases";
import { getMostValoratedAnimes } from "@/actions/animes/categories/getMostValoratedAnimes";
import { getAnimesByGenre } from "@/actions/animes/categories/getAnimesByGenre";
import { AnimeCard } from "@/types/anime/Anime";
import AnimeList from "../anime-general/horizontal-list/AnimeList";

export default async function AnimeCategories() {
    const seasonTrendAnimes: AnimeCard[] | null = await getSeasonTrendAnimes(10);
    const upcomingAnimes: AnimeCard[] | null = await getUpcomingAnimeReleases(10);
    const mostValoratedAnimes: AnimeCard[] | null = await getMostValoratedAnimes(10);
    const actionAnimes: AnimeCard[] | null = await getAnimesByGenre(10,"Action");
    const romanceAnimes: AnimeCard[] | null = await getAnimesByGenre(10,"Romance");
    const comedyAnimes: AnimeCard[] | null = await getAnimesByGenre(10,"Comedy");
    const sliceOfLifeAnimes: AnimeCard[] | null = await getAnimesByGenre(10,"Slice of Life");
    return (
        <div className="mx-auto max-w-md lg:max-w-4xl xl:max-w-7xl min-w-0">
            {seasonTrendAnimes && <AnimeList category={seasonTrendAnimes} title="Lo más popular de la Temporada" />}

            {upcomingAnimes && <AnimeList category={upcomingAnimes} title="Estrenos más Esperados" />}

            {mostValoratedAnimes && <AnimeList category={mostValoratedAnimes} title="Mejor Valorados de la Historia" />}

            {actionAnimes && <AnimeList category={actionAnimes} title="Acción" />}

            {romanceAnimes && <AnimeList category={romanceAnimes} title="Romance" />}

            {comedyAnimes && <AnimeList category={comedyAnimes} title="Comedia" />}

            {sliceOfLifeAnimes && <AnimeList category={sliceOfLifeAnimes} title="Slice of Life" />}
        </div>
    );
}
