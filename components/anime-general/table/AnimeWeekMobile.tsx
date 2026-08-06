"use client";

import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AiringSwitch from "./AiringSwitch";
import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";
import {
    AIRING_DAYS,
    getDateNumberForDay,
    todayKey,
} from "@/utils/airingDays";

interface Props {
    animes: AnimeReleasing[];
    userAnimeList?: AnimeList | null;
}

export default function AnimeWeekMobile({ animes, userAnimeList }: Props) {
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
        <div className="flex w-full flex-col gap-4">
            {showToggle && (
                <div className="flex w-full justify-center">
                    <AiringSwitch
                        onChange={(value) =>
                            setMode(value === "following" ? "mine" : "all")
                        }
                    />
                </div>
            )}
            {hasError && (
                <div className="text-center text-red-400 text-sm mt-4">
                    Ocurrió un problema al cargar los animes. Intentá
                    nuevamente más tarde.
                </div>
            )}
            {AIRING_DAYS.map((day) => (
                <div key={day.key} className="w-full flex flex-col gap-2">
                    <Link
                        href={`/airingAnimes?day=${day.slug}`}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-tertiary border border-border-default transition-colors hover:bg-accent-primary-subtle"
                    >
                        <h3 className="text-lg font-bold text-text-primary tracking-wide uppercase leading-tight">
                            {day.short}
                        </h3>
                        <span className="text-caption font-semibold text-text-tertiary">
                            {getDateNumberForDay(day.key)}
                        </span>
                        {day.key === today && (
                            <span className="text-caption font-semibold uppercase tracking-wider bg-accent-primary-subtle text-accent-primary px-2 py-0.5 rounded-full">
                                Hoy
                            </span>
                        )}
                    </Link>
                    <div className="relative space-y-2 w-full">
                        {(() => {
                            const dayAnimes = animesAfterFilter.filter(
                                (anime) => anime.schedule === day.key,
                            );
                            if (dayAnimes.length === 0) {
                                return (
                                    <p className="text-caption text-text-muted px-3 py-1">
                                        Sin estrenos
                                    </p>
                                );
                            }
                            return dayAnimes.slice(0, 2).map((anime) => (
                                <Link
                                    key={anime.id}
                                    href={`/anime/a-${anime.id}`}
                                    className="flex items-center gap-3 p-2 w-full rounded-md transition-colors hover:bg-bg-tertiary"
                                >
                                    <Image
                                        src={
                                            anime.coverImage?.large ||
                                            anime.coverImage?.medium ||
                                            "/coverImagePlaceholder.png"
                                        }
                                        alt={
                                            anime.title.romaji ||
                                            anime.title.english ||
                                            "Título Desconocido"
                                        }
                                        width={90}
                                        height={40}
                                        className="rounded-sm object-cover shrink-0 aspect-video"
                                    />
                                    <div className="flex flex-col justify-center">
                                        <span className="text-xs font-semibold text-text-primary line-clamp-1">
                                            {anime.title.romaji ||
                                                anime.title.english}
                                        </span>
                                        <span className="text-xs text-text-tertiary">
                                            EP{" "}
                                            {anime.nextAiringEpisode?.episode ||
                                                "?"}
                                        </span>
                                    </div>
                                </Link>
                            ));
                        })()}
                        <div className="flex justify-end">
                            <Link
                                href={`/airingAnimes?day=${day.slug}`}
                                className="text-xs text-text-primary border border-border-default py-1 px-2 rounded-md bg-bg-tertiary hover:text-accent-primary transition-colors cursor-pointer"
                            >
                                Ver todos →
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
