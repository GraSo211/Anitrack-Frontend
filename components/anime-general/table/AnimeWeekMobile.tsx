"use client";

import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import AiringSwitch from "./AiringSwitch";
import MarkPreviousEpisodeButton from "@/components/airingAnime/MarkPreviousEpisodeButton";
import { buildWatchingMap } from "@/utils/animeWatchingMap";
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
    isAuthenticated?: boolean;
}

export default function AnimeWeekMobile({
    animes,
    userAnimeList,
    isAuthenticated,
}: Props) {
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
    const watchingMap = buildWatchingMap(userAnimeList);

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
                <div className="text-center text-status-error text-sm mt-4">
                    Ocurrió un problema al cargar los animes. Intentá
                    nuevamente más tarde.
                </div>
            )}
            {AIRING_DAYS.map((day) => (
                <div key={day.key} className="w-full flex flex-col gap-2">
                    <Link
                        href={`/en-emision?day=${day.slug}`}
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
                            return dayAnimes.slice(0, 2).map((anime) => {
                                const item =
                                    anime.idMal != null
                                        ? watchingMap.get(anime.idMal)
                                        : undefined;
                                return (
                                    <div
                                        key={anime.id}
                                        className="group flex items-center gap-2 w-full"
                                    >
                                        <Link
                                            href={`/anime/a-${anime.id}`}
                                            aria-label={
                                                anime.title.romaji ||
                                                anime.title.english ||
                                                "Título Desconocido"
                                            }
                                            title={
                                                anime.title.romaji ||
                                                anime.title.english ||
                                                "Título Desconocido"
                                            }
                                            className="flex items-center gap-3 p-2 flex-1 min-w-0 rounded-md transition-colors hover:bg-bg-tertiary"
                                        >
                                            <div className="relative w-24 shrink-0 aspect-video rounded-sm overflow-hidden bg-bg-tertiary">
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
                                                    fill
                                                    sizes="96px"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center min-w-0">
                                                <span
                                                    className="text-xs font-semibold text-text-primary line-clamp-1"
                                                    title={
                                                        anime.title.romaji ||
                                                        anime.title.english ||
                                                        "Título Desconocido"
                                                    }
                                                >
                                                    {anime.title.romaji ||
                                                        anime.title.english}
                                                </span>
                                                <span className="text-xs text-text-tertiary">
                                                    EP{" "}
                                                    {anime.nextAiringEpisode
                                                        ?.episode || "?"}
                                                </span>
                                            </div>
                                        </Link>
                                        {anime.nextAiringEpisode && (
                                            <MarkPreviousEpisodeButton
                                                isAuthenticated={isAuthenticated}
                                                idMal={anime.idMal}
                                                inList={!!item}
                                                episodesWatched={
                                                    item?.episodesWatched
                                                }
                                                status={
                                                    item?.status ?? "watching"
                                                }
                                                score={item?.score ?? 0}
                                                nextEpisode={
                                                    anime.nextAiringEpisode
                                                        .episode
                                                }
                                                className="shrink-0"
                                            />
                                        )}
                                    </div>
                                );
                            });
                        })()}
                        <div className="flex justify-end">
                            <Link
                                href={`/en-emision?day=${day.slug}`}
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
