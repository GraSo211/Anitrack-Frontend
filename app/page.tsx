import AiringAnimeTable from "../components/anime/table/AiringAnimeTable";
import AnimeList from "../components/anime/horizontal-list/AnimeList";

import {  getSeasonTrendAnimes } from "@/actions/getSeasonTrendAnimes";
import { Anime } from "@/types/Anime";

export default async function Home() {
    const seasonTrendAnimes: Anime[] = await getSeasonTrendAnimes(5);

    return (
        <main className="flex flex-col items-center gap-3 justify-center min-h-screen     ">
            <section className="flex justify-center">
                <AiringAnimeTable />
            </section>


            {/* Anime List - Popularity */}
            <section className="flex w-3/5  justify-center">
                <AnimeList seasonTrendAnimes={seasonTrendAnimes} title="Lo mejor de la Temporada" />
            </section>
        </main>
    );
}
