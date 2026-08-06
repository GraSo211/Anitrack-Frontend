import React from "react";
import { cookies } from "next/headers";

import "./Scrollbar.css";

import { getReleasingAnimes } from "@/actions/animes/getReleasingAnimes";
import { getAnimeList } from "@/actions/anime-list/getAnimeList";

import AnimeWeek from "./AnimeWeek";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import AnimeWeekMobile from "./AnimeWeekMobile";
import { airingDayKeyFromTimestamp } from "@/utils/airingDays";

const convertTodayEmision = (animes: AnimeReleasing[]) =>
    animes.map((anime) =>
        anime.nextAiringEpisode
            ? {
                  ...anime,
                  schedule: airingDayKeyFromTimestamp(
                      anime.nextAiringEpisode.airingAt,
                  ),
              }
            : anime,
    );

export default async function AiringAnimeTable() {
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const animesRaw: AnimeReleasing[] | null = await getReleasingAnimes();
    const userAnimeList: AnimeList | null = token
        ? await getAnimeList(token, "watching")
        : null;

    if (!animesRaw || animesRaw.length === 0) {
        return (
            <div className="w-full rounded-lg shadow-lg p-6 text-center">
                <h2 className="font-bold text-3xl mb-4 text-text-primary">
                    Animes en emisión
                </h2>
                <p className="text-red-400">
                    No se pudieron cargar los animes en emisión.
                </p>
                <p className="text-sm text-white/60 mt-2">
                    Intentá nuevamente más tarde.
                </p>
            </div>
        );
    }

    const animes = convertTodayEmision(animesRaw);

    return (
        <div className="w-full relative rounded-lg shadow-lg p-6 flex flex-col items-center">
            <h2 className="text-heading-xl font-bold text-text-primary mb-1">
                Animes{" "}
                <span className="gradient-text">en emisión</span>
            </h2>
            <p className="mb-2 text-body-sm text-text-secondary">
                Seguí los estrenos semanales de tus series favoritas
            </p>
            <div className="hidden lg:flex">
                <AnimeWeek
                    animes={animes}
                    userAnimeList={userAnimeList}
                ></AnimeWeek>
            </div>
            <div className="flex w-full lg:hidden">
                <AnimeWeekMobile
                    animes={animes}
                    userAnimeList={userAnimeList}
                ></AnimeWeekMobile>
            </div>
        </div>
    );
}
