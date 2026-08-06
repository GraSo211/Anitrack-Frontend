"use client";
import React, { useState } from "react";
import AiringSwitch from "./AiringSwitch";
import AnimeLi from "./AnimeLi";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import Link from "next/link";
import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";
import {
    AIRING_DAYS,
    getDateNumberForDay,
    todayKey,
} from "@/utils/airingDays";

export default function AnimeWeek({
    animes,
    userAnimeList,
}: {
    animes: AnimeReleasing[] | undefined;
    userAnimeList?: AnimeList | null;
}) {
    const [mode, setMode] = useState<CalendarFilterMode>("all");

    const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    const hasError = animes !== undefined && !Array.isArray(animes);

    const animesAfterFilter = filterAnimesByUserList(
        animesChecked,
        userAnimeList ?? null,
        mode,
    );

    const showToggle = !!userAnimeList && userAnimeList.animeList.length > 0;

    const today = todayKey();

    return (
        <div>
            {showToggle && (
                <div className="flex mb-2 font-semibold">
                    <AiringSwitch
                        onChange={(value) =>
                            setMode(value === "following" ? "mine" : "all")
                        }
                    />
                </div>
            )}
            <div className="grid grid-cols-7 gap-4 w-full">
                {hasError && (
                    <div className="col-span-7 text-center text-red-400 text-sm mt-4">
                        Ocurrió un problema al cargar los animes. Intentá
                        nuevamente más tarde.
                    </div>
                )}

                {AIRING_DAYS.map((day) => (
                    <div
                        key={day.key}
                        className="bg-bg-secondary rounded-xl p-1 flex flex-col items-center max-h-100 2xl:max-h-150 overflow-hidden shadow-lg transition-transform hover:scale-105 border border-border-default"
                    >
                        <Link
                            href={`/airingAnimes?day=${day.slug}`}
                            className="w-full"
                        >
                            <div
                                className={`
                                    w-full text-center rounded-lg border py-1.5 mb-1 transition-colors
                                    ${
                                        day.key === today
                                            ? "border-accent-primary/40 bg-accent-primary-subtle hover:bg-accent-primary/25"
                                            : "border-border-default bg-bg-tertiary hover:bg-accent-primary-subtle"
                                    }
                                `}
                            >
                                <h3 className="text-lg font-bold text-text-primary tracking-wide uppercase leading-tight">
                                    {day.short}
                                </h3>
                                <span
                                    className={`text-xs font-semibold ${
                                        day.key === today
                                            ? "text-accent-primary"
                                            : "text-text-tertiary"
                                    }`}
                                >
                                    {getDateNumberForDay(day.key)}
                                </span>
                            </div>
                        </Link>

                        <ul className="space-y-3 w-full scrollbar overflow-y-auto m-2">
                            {animesAfterFilter
                                .filter((anime) => anime.schedule === day.key)
                                .map((anime) => (
                                    <AnimeLi
                                        key={anime.id}
                                        id={anime.id}
                                        episode={
                                            anime.nextAiringEpisode?.episode ??
                                            0
                                        }
                                        coverImage={
                                            anime.coverImage.extraLarge ||
                                            anime.coverImage.large ||
                                            "/coverImagePlaceholder.png"
                                        }
                                        title={
                                            anime.title.romaji ||
                                            anime.title.english ||
                                            "Título Desconocido"
                                        }
                                    />
                                ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
