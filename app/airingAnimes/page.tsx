import { cookies } from "next/headers";
import { getReleasingAnimes } from "@/actions/animes/getReleasingAnimes";
import { getAnimeList } from "@/actions/anime-list/getAnimeList";
import AiringAnimeDay from "@/components/airingAnime/AiringAnimeDay";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { connection } from "next/server";
import React from "react";

export default async function page() {
    await connection();
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const animes: AnimeReleasing[] | null = await getReleasingAnimes();
    const userAnimeList: AnimeList | null = token
        ? await getAnimeList(token, "watching")
        : null;

    return (
        <div className="w-full lg:flex justify-center items-center  overflow-hidden">
            <AiringAnimeDay
                animes={animes}
                userAnimeList={userAnimeList}
            ></AiringAnimeDay>
        </div>
    );
}
