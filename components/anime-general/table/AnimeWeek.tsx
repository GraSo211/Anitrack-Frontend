"use client";

import React, { useCallback, useRef, useState } from "react";
import Link from "next/link";
import { CiCalendar } from "react-icons/ci";
import AiringSwitch from "./AiringSwitch";
import AnimeLi from "./AnimeLi";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import {
    CalendarFilterMode,
    filterAnimesByUserList,
} from "@/components/airingAnime/filterAnimesByUserList";
import { buildWatchingMap } from "@/utils/animeWatchingMap";
import {
    AIRING_DAYS,
    DayKey,
    getDateNumberForDay,
    keyToDay,
    todayKey,
} from "@/utils/airingDays";

export default function AnimeWeek({
    animes,
    userAnimeList,
    isAuthenticated,
}: {
    animes: AnimeReleasing[] | undefined;
    userAnimeList?: AnimeList | null;
    isAuthenticated?: boolean;
}) {
    const [mode, setMode] = useState<CalendarFilterMode>("all");
    const [selectedDay, setSelectedDay] = useState<DayKey>(todayKey());

    const animesChecked: AnimeReleasing[] = Array.isArray(animes) ? animes : [];
    const hasError = animes !== undefined && !Array.isArray(animes);

    const animesAfterFilter = filterAnimesByUserList(
        animesChecked,
        userAnimeList ?? null,
        mode,
    );

    const showToggle = !!userAnimeList && userAnimeList.animeList.length > 0;

    const watchingMap = buildWatchingMap(userAnimeList);
    const activeDay = keyToDay(selectedDay);
    const isSelectedToday = selectedDay === todayKey();

    const countByDay = useCallback(
        (key: DayKey) =>
            animesAfterFilter.filter((anime) => anime.schedule === key).length,
        [animesAfterFilter],
    );

    const selectedDayAnimes = animesAfterFilter.filter(
        (anime) => anime.schedule === selectedDay,
    );

    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const focusTab = useCallback((index: number) => {
        const day = AIRING_DAYS[index];
        if (!day) return;
        setSelectedDay(day.key);
        tabRefs.current[index]?.focus();
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const currentIndex = AIRING_DAYS.findIndex(
            (day) => day.key === selectedDay,
        );
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            focusTab((currentIndex + 1) % AIRING_DAYS.length);
        } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            focusTab(
                (currentIndex - 1 + AIRING_DAYS.length) % AIRING_DAYS.length,
            );
        } else if (event.key === "Home") {
            event.preventDefault();
            focusTab(0);
        } else if (event.key === "End") {
            event.preventDefault();
            focusTab(AIRING_DAYS.length - 1);
        }
    };

    return (
        <div className="w-full">
            {showToggle && (
                <div className="flex justify-center lg:justify-end mb-3">
                    <AiringSwitch
                        onChange={(value) =>
                            setMode(value === "following" ? "mine" : "all")
                        }
                    />
                </div>
            )}

            {hasError && (
                <div className="w-full text-center text-status-error text-sm mt-4">
                    Ocurrió un problema al cargar los animes. Intentá
                    nuevamente más tarde.
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
                <div
                    role="tablist"
                    aria-label="Días de emisión"
                    onKeyDown={handleKeyDown}
                    className="flex flex-row lg:flex-col gap-2 lg:w-56 lg:shrink-0 lg:sticky lg:top-24 lg:self-start overflow-x-auto lg:overflow-visible pb-1 lg:pb-0"
                >
                    {AIRING_DAYS.map((day, index) => {
                        const count = countByDay(day.key);
                        const isActive = day.key === selectedDay;
                        const isTodayDay = day.key === todayKey();
                        const tabLabel = `${day.label}${isTodayDay ? " (Hoy)" : ""}: ${count} estreno${count !== 1 ? "s" : ""}`;

                        return (
                            <button
                                key={day.key}
                                ref={(element) => {
                                    tabRefs.current[index] = element;
                                }}
                                type="button"
                                role="tab"
                                aria-selected={isActive}
                                aria-controls="day-panel"
                                id={`tab-${day.key}`}
                                tabIndex={isActive ? 0 : -1}
                                aria-label={tabLabel}
                                onClick={() => setSelectedDay(day.key)}
                                className={`
                                    relative flex flex-col lg:flex-row items-center gap-1 lg:gap-3
                                    shrink-0 lg:shrink-0 lg:w-full
                                    w-16 sm:w-20 lg:px-4 lg:py-3 py-2 px-2
                                    rounded-xl border text-center lg:text-left
                                    transition-all duration-200
                                    ${
                                        isActive
                                            ? "bg-linear-to-b lg:bg-linear-to-r from-accent-primary to-accent-secondary border-accent-primary shadow-glow"
                                            : "bg-bg-secondary border-border-default hover:bg-bg-tertiary hover:border-border-strong"
                                    }
                                    ${
                                        isTodayDay && !isActive
                                            ? "border-accent-primary/40"
                                            : ""
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 rounded-r-full transition-all duration-200
                                        ${
                                            isActive
                                                ? "bg-surface-light/90"
                                                : "bg-transparent scale-y-0"
                                        }
                                    `}
                                />
                                <div className="flex flex-col lg:flex-1 lg:min-w-0 items-center lg:items-start">
                                    <span
                                        className={`text-caption font-semibold uppercase leading-none lg:tracking-wider ${
                                            isActive
                                                ? "text-text-light/80"
                                                : "text-text-tertiary"
                                        }`}
                                    >
                                        {day.short}
                                    </span>
                                    <span
                                        className={`text-lg font-bold leading-tight ${
                                            isActive
                                                ? "text-text-light"
                                                : "text-text-primary"
                                        }`}
                                    >
                                        {getDateNumberForDay(day.key)}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center lg:items-end gap-0.5">
                                    <span
                                        className={`text-caption font-semibold ${
                                            isActive
                                                ? "text-text-light/90"
                                                : count > 0
                                                  ? "text-accent-primary"
                                                  : "text-text-muted"
                                        }`}
                                    >
                                        {count} ep
                                    </span>
                                    {isTodayDay && (
                                        <span
                                            className={`
                                                hidden lg:inline-flex text-caption font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full
                                                ${
                                                    isActive
                                                        ? "bg-surface-light/20 text-text-light"
                                                        : "bg-accent-primary-subtle text-accent-primary"
                                                }
                                            `}
                                        >
                                            Hoy
                                        </span>
                                    )}
                                </div>
                                {isTodayDay && !isActive && (
                                    <span className="lg:hidden absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-accent-primary" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div
                    role="tabpanel"
                    id="day-panel"
                    aria-labelledby="day-heading"
                    className="flex-1 min-w-0 @container"
                >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2.5">
                            <h3
                                id="day-heading"
                                className="text-heading-md font-bold text-text-primary"
                            >
                                {activeDay.label}
                            </h3>
                            <span className="text-body-sm text-text-tertiary">
                                · {selectedDayAnimes.length} estreno
                                {selectedDayAnimes.length !== 1 ? "s" : ""}
                            </span>
                            {isSelectedToday && (
                                <span className="text-caption font-semibold uppercase tracking-wider bg-accent-primary-subtle text-accent-primary px-2 py-0.5 rounded-full">
                                    Hoy
                                </span>
                            )}
                        </div>
                        <Link
                            href={`/en-emision?day=${activeDay.slug}`}
                            className="inline-flex items-center gap-1 text-caption font-semibold text-accent-primary hover:text-accent-primary-hover transition-colors rounded-md px-2 py-1"
                        >
                            Ver día completo
                            <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <div
                        key={selectedDay}
                        className="animate-fade-in motion-reduce:animate-none"
                    >
                        {selectedDayAnimes.length > 0 ? (
                            <div className="max-h-[calc(2*(100cqw_-_10px_-_(var(--cols)_-_1)*var(--gap))/var(--cols)*4/3_+_var(--gap))] overflow-y-auto overflow-x-hidden [scrollbar-gutter:stable] [--cols:3] [--gap:6px] sm:[--cols:5] sm:[--gap:8px] lg:[--cols:7] xl:[--cols:10]">
                                <div className="grid grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-[var(--gap)]">
                                    {selectedDayAnimes.map((anime, index) => {
                                        const item =
                                            anime.idMal != null
                                                ? watchingMap.get(anime.idMal)
                                                : undefined;
                                        return (
                                            <div
                                                key={anime.id}
                                                className="animate-fade-in-up motion-reduce:animate-none"
                                                style={{
                                                    animationDelay: `${index * 40}ms`,
                                                }}
                                            >
                                                <AnimeLi
                                                    id={anime.id}
                                                    episode={
                                                        anime.nextAiringEpisode
                                                            ?.episode ?? 0
                                                    }
                                                    coverImage={
                                                        anime.coverImage
                                                            .extraLarge ||
                                                        anime.coverImage.large ||
                                                        "/coverImagePlaceholder.png"
                                                    }
                                                    title={
                                                        anime.title.romaji ||
                                                        anime.title.english ||
                                                        "Título Desconocido"
                                                    }
                                                    isAuthenticated={
                                                        isAuthenticated
                                                    }
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
                                                            ?.episode
                                                    }
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-primary-subtle text-accent-primary border border-accent-primary/30">
                                    <CiCalendar
                                        className="w-8 h-8"
                                        aria-hidden="true"
                                    />
                                </span>
                                <p className="text-body-md text-text-secondary">
                                    {mode === "mine"
                                        ? "No tenés animes en emisión en tu lista para este día"
                                        : "No hay animes programados para este día"}
                                </p>
                                <Link
                                    href="/animes"
                                    className="inline-flex h-9 items-center justify-center px-4 text-caption font-medium rounded-md bg-accent-primary text-text-light hover:bg-accent-primary-hover transition-colors"
                                >
                                    Explorar catálogo
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
