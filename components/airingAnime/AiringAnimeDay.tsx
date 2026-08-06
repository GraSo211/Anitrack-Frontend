"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CiCalendar, CiClock2 } from "react-icons/ci";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import AiringSwitch from "@/components/anime-general/table/AiringSwitch";
import Button from "@/components/general-components/Button";
import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";
import {
    AIRING_DAYS,
    adjacentKey,
    airingDayKeyFromTimestamp,
    getDateNumberForDay,
    keyToDay,
    slugToKey,
    todayKey,
} from "@/utils/airingDays";

interface Props {
    animes: AnimeReleasing[] | null;
    userAnimeList?: AnimeList | null;
}

const formatCountdown = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

export default function AiringAnimeDay({ animes, userAnimeList }: Props) {
    const router = useRouter();
    const dayParam = useSearchParams().get("day");
    const [mode, setMode] = useState<CalendarFilterMode>("all");

    const activeKey = slugToKey(dayParam);
    const activeDay = keyToDay(activeKey);
    const isToday = activeKey === todayKey();

    const animesChecked: AnimeReleasing[] = Array.isArray(animes)
        ? animes.map((anime) =>
              anime.nextAiringEpisode
                  ? {
                        ...anime,
                        schedule: airingDayKeyFromTimestamp(
                            anime.nextAiringEpisode.airingAt,
                        ),
                    }
                  : anime,
          )
        : [];

    const animesAfterFilter = filterAnimesByUserList(
        animesChecked,
        userAnimeList ?? null,
        mode,
    );

    const animesOfDay = animesAfterFilter.filter(
        (anime) => anime.schedule === activeKey,
    );

    const showToggle = !!userAnimeList && userAnimeList.animeList.length > 0;

    const navigateTo = (key: typeof activeKey) =>
        router.push(`/airingAnimes?day=${keyToDay(key).slug}`);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            navigateTo(adjacentKey(activeKey, -1));
        }
        if (event.key === "ArrowRight") {
            event.preventDefault();
            navigateTo(adjacentKey(activeKey, 1));
        }
    };

    return (
        <div
            className="flex flex-col gap-5"
            role="region"
            aria-label="Calendario de estrenos"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    <h2 className="text-heading-md text-text-primary font-bold">
                        {activeDay.label}
                    </h2>
                    <span className="text-body-sm text-text-tertiary">
                        · {animesOfDay.length} estreno
                        {animesOfDay.length !== 1 ? "s" : ""}
                    </span>
                    {isToday && (
                        <span className="text-caption font-semibold uppercase tracking-wider bg-accent-primary-subtle text-accent-primary px-2 py-0.5 rounded-full">
                            Hoy
                        </span>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="secondary"
                        size="sm"
                        disabled={isToday}
                        onClick={() => navigateTo(todayKey())}
                    >
                        Ir a hoy
                    </Button>
                    {showToggle && (
                        <AiringSwitch
                            onChange={(value) =>
                                setMode(value === "following" ? "mine" : "all")
                            }
                        />
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Día anterior"
                    onClick={() => navigateTo(adjacentKey(activeKey, -1))}
                >
                    <FaChevronLeft />
                </Button>

                <div className="flex-1 overflow-x-auto py-1">
                    <div className="flex w-max gap-2">
                        {AIRING_DAYS.map((day) => {
                            const isActive = day.key === activeKey;
                            const isTodayDay = day.key === todayKey();

                            return (
                                <Link
                                    key={day.key}
                                    href={`/airingAnimes?day=${day.slug}`}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`
                                        relative flex flex-col items-center justify-center w-14 sm:w-16 py-2 rounded-lg
                                        border transition-all duration-200 shrink-0
                                        ${
                                            isActive
                                                ? "bg-accent-primary text-text-inverse border-accent-primary shadow-glow"
                                                : "bg-bg-secondary text-text-secondary border-border-default hover:bg-bg-tertiary hover:text-text-primary"
                                        }
                                    `}
                                >
                                    <span className="text-caption font-semibold leading-none uppercase">
                                        {day.short}
                                    </span>
                                    <span
                                        className={`text-lg font-bold leading-tight ${
                                            isActive
                                                ? "text-text-inverse"
                                                : "text-text-primary"
                                        }`}
                                    >
                                        {getDateNumberForDay(day.key)}
                                    </span>
                                    {isTodayDay && !isActive && (
                                        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-primary" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Día siguiente"
                    onClick={() => navigateTo(adjacentKey(activeKey, 1))}
                >
                    <FaChevronRight />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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

                    const airing = anime.nextAiringEpisode;
                    const isSoon = !!airing && airing.timeUntilAiring < 86400;

                    return (
                        <Link
                            key={anime.id}
                            href={`/anime/a-${anime.id}`}
                            className="group flex gap-4 rounded-xl border border-border-default bg-bg-secondary p-2.5 card-hover hover:border-border-strong"
                            style={{
                                backgroundColor: anime.coverImage.color
                                    ? `${anime.coverImage.color}18`
                                    : undefined,
                            }}
                        >
                            <div className="relative w-24 aspect-2/3 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                    src={cover}
                                    alt={title}
                                    fill
                                    sizes="96px"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {airing && (
                                    <span className="absolute top-1.5 left-1.5 z-10 inline-flex items-center gap-1 rounded-md bg-bg-primary/85 px-1.5 py-0.5 text-caption font-semibold text-text-primary backdrop-blur-sm">
                                        <CiClock2 aria-hidden="true" />
                                        EP {airing.episode}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col justify-between py-1 min-w-0 w-full">
                                <div>
                                    <h3 className="text-body-sm font-semibold text-text-primary line-clamp-2">
                                        {title}
                                    </h3>
                                </div>

                                {airing && (
                                    <p
                                        className={`text-caption font-medium ${
                                            isSoon
                                                ? "text-accent-tertiary"
                                                : "text-accent-primary"
                                        }`}
                                    >
                                        {isSoon
                                            ? "Estreno pronto · "
                                            : "Se emite en "}
                                        {formatCountdown(airing.timeUntilAiring)}
                                    </p>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>

            {animesOfDay.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                    <CiCalendar
                        className="w-10 h-10 text-text-muted"
                        aria-hidden="true"
                    />
                    <p className="text-body-md text-text-secondary">
                        {mode === "mine"
                            ? "No tenés animes en emisión en tu lista para este día"
                            : "No hay animes programados para este día"}
                    </p>
                    <Link
                        href="/animes"
                        className="inline-flex h-9 items-center justify-center px-4 text-caption font-medium rounded-md bg-accent-primary text-white hover:bg-accent-primary-hover transition-all"
                    >
                        Explorar catálogo
                    </Link>
                </div>
            )}
        </div>
    );
}
