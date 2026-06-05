"use client";

import Link from "next/link";
import Image from "next/image";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import AiringSwitch from "@/components/anime-general/table/AiringSwitch";
import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";

interface Props {
    animes: AnimeReleasing[] | null;
    userAnimeList?: AnimeList | null;
}

const convertTodayEmision = (animes: AnimeReleasing[]) => {
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    return animes.map((anime) => {
        if (anime.nextAiringEpisode) {
            const airingDate = new Date(anime.nextAiringEpisode.airingAt * 1000);
            const airingDay = airingDate.getDay();
            return {
                ...anime,
                schedule: daysOfWeek[airingDay] ?? "unknown"
            };
        }
        return anime;
    });
};

const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${days}d ${hours}h ${minutes}m`;
};

export default function AiringAnimeDay({ animes, userAnimeList }: Props) {

    const dayParam = useSearchParams().get("day");

    const [mode, setMode] = useState<CalendarFilterMode>("all");

    const daysOfWeek = [
        { key: "monday", spanishLabel: "lunes" },
        { key: "tuesday", spanishLabel: "martes" },
        { key: "wednesday", spanishLabel: "miercoles" },
        { key: "thursday", spanishLabel: "jueves" },
        { key: "friday", spanishLabel: "viernes" },
        { key: "saturday", spanishLabel: "sabado" },
        { key: "sunday", spanishLabel: "domingo" },
    ];

    const dayEnglish =
        daysOfWeek.find(d => d.spanishLabel === dayParam?.toLowerCase())?.key ??
        "monday";

    const animesChecked = Array.isArray(animes)
        ? convertTodayEmision(animes)
        : [];

    const animesAfterFilter = filterAnimesByUserList(
        animesChecked,
        userAnimeList ?? null,
        mode,
    );

    const animesOfDay = animesAfterFilter.filter(
        anime => anime.schedule === dayEnglish
    );

    const showToggle = !!userAnimeList && userAnimeList.animeList.length > 0;

    return (
        <div className=" flex flex-col    gap-2 px-3 py-4">
            {showToggle && (
                <div className="flex justify-center sm:justify-start">
                    <AiringSwitch
                        onChange={(value) =>
                            setMode(value === "following" ? "mine" : "all")
                        }
                    />
                </div>
            )}
            <div className="w-full overflow-x-auto">
                <div className="flex w-max rounded-xl bg-bg-secondary border border-border-default">
                    {daysOfWeek.map((day) => {
                        const isActive = day.key === dayEnglish;

                        return (
                            <Link
                                key={day.key}
                                href={`/airingAnimes?day=${day.spanishLabel}`}
                                className={`
            px-2 py-2 text-xs font-semibold rounded-lg whitespace-nowrap
            transition-all duration-200 shrink-0
            ${isActive
                                        ? "bg-accent-primary text-text-inverse shadow-md"
                                        : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
                                    }
          `}
                            >
                                {day.spanishLabel.toUpperCase()}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <h2 className="text-xl font-bold text-text-primary">{daysOfWeek.find(d => d.key === dayEnglish)?.spanishLabel.toUpperCase()}</h2>
            <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 flex flex-col gap-3">

                {animesOfDay.map((anime) => {

                    const title =
                        anime.title.english ??
                        anime.title.romaji ??
                        "Título desconocido";

                    const cover =
                        anime.coverImage.extraLarge ??
                        anime.coverImage.large ??
                        anime.coverImage.medium ??
                        "/coverImagePlaceholder.png";

                    return (

                        <Link
                            key={anime.id}
                            href={`/anime/a-${anime.id}`}
                            className="flex w-full gap-4 rounded-xl transition hover:bg-bg-tertiary border border-border-default p-2"
                            style={{
                                backgroundColor: anime.coverImage.color
                                    ? `${anime.coverImage.color}20`
                                    : undefined
                            }}
                        >
                            <div className="relative w-24 aspect-2/3 shrink-0">
                                <Image
                                    src={cover}
                                    alt={title}
                                    fill
                                    sizes="96px"
                                    className="rounded-lg object-cover"
                                />
                            </div>

                            <div className="flex flex-col justify-between py-2 w-full">
                                <div>
                                    <h3 className="text-base font-semibold text-text-primary line-clamp-2">
                                        {title}
                                    </h3>

                                    {anime.nextAiringEpisode && (
                                        <p className="text-sm text-text-tertiary mt-1">
                                            Episodio {anime.nextAiringEpisode.episode}
                                        </p>
                                    )}
                                </div>

                                {anime.nextAiringEpisode && (
                                    <p className="text-xs text-accent-primary font-medium mt-2">
                                        Se emite en {formatCountdown(anime.nextAiringEpisode.timeUntilAiring)}
                                    </p>
                                )}
                            </div>
                        </Link>


                    );
                })}
            </div>


            {animesOfDay.length === 0 && (
                <div className="text-center text-text-muted py-10">
                    {mode === "mine"
                        ? "No tenés animes en emisión en tu lista para este día"
                        : "No hay animes programados para este día"}
                </div>
            )}
        </div>
    );
}
