import React from "react";
import AnimeList from "../anime/horizontal-list/AnimeList";
import { getSeasonTrendAnimes } from "@/actions/categories/getSeasonTrendAnimes";
import { getUpcomingAnimeReleases } from "@/actions/categories/getUpcomingAnimeReleases";
import { getMostValoratedAnimes } from "@/actions/categories/getMostValoratedAnimes";
import { getAnimesByGenre } from "@/actions/categories/getAnimesByGenre";
import { AnimeCard } from "@/types/AnimeCard";

export default async function AnimeCategories() {
    const seasonTrendAnimes: AnimeCard[] | null = await getSeasonTrendAnimes();
    const upcomingAnimes: AnimeCard[] | null = await getUpcomingAnimeReleases();
    const mostValoratedAnimes: AnimeCard[] | null = await getMostValoratedAnimes();
    const actionAnimes: AnimeCard[] | null = await getAnimesByGenre(5,"Action");
    const romanceAnimes: AnimeCard[] | null = await getAnimesByGenre(5,"Romance");
    const comedyAnimes: AnimeCard[] | null = await getAnimesByGenre(5,"Comedy");
    const sliceOfLifeAnimes: AnimeCard[] | null = await getAnimesByGenre(5,"Slice of Life");
    return (
        <div>
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
