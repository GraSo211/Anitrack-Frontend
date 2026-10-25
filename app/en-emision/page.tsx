import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getReleasingAnimes } from "@/actions/animes/getReleasingAnimes";
import { getAnimeList } from "@/actions/anime-list/getAnimeList";
import AiringAnimeDay from "@/components/airingAnime/AiringAnimeDay";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { connection } from "next/server";
import React, { Suspense } from "react";
import Link from "next/link";
import { FiAlertTriangle, FiCalendar, FiInbox } from "react-icons/fi";
import EmptyState from "@/components/general-components/EmptyState";
import {
    airingDayKeyFromTimestamp,
    todayKey,
} from "@/utils/airingDays";

export const metadata: Metadata = {
    title: "Animes en emisión",
    description: "Consulta el calendario semanal de estrenos y descubre qué episodios de anime se emiten cada día para no perderte ninguno de tus favoritos.",
    alternates: { canonical: "/en-emision" },
};

export default async function page() {
    await connection();
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const animes: AnimeReleasing[] | null = await getReleasingAnimes();
    const userAnimeList: AnimeList | null = token
        ? await getAnimeList(token, "watching")
        : null;

    const weekCount = Array.isArray(animes) ? animes.length : 0;
    const todayCount = Array.isArray(animes)
        ? animes.filter(
              (a) =>
                  a.nextAiringEpisode &&
                  airingDayKeyFromTimestamp(a.nextAiringEpisode.airingAt) ===
                      todayKey(),
          ).length
        : 0;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                <header className="relative overflow-hidden rounded-2xl border border-border-default glass p-5 sm:p-7 mb-6">
                    <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                "linear-gradient(135deg, var(--accent-primary-subtle), var(--accent-secondary-subtle))",
                        }}
                        aria-hidden="true"
                    />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-start gap-4">
                            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-primary/20 text-accent-primary border border-accent-primary/30">
                                <FiCalendar className="h-6 w-6" />
                            </span>
                            <div>
                                <h1 className="text-display-md lg:text-heading-xl font-bold text-text-primary mb-1">
                                    Animes{" "}
                                    <span className="gradient-text">
                                        en emisión
                                    </span>
                                </h1>
                                <p className="text-body-sm text-text-secondary max-w-xl">
                                    Seguí los estrenos semanales y no te pierdas
                                    el próximo episodio de tus series favoritas.
                                </p>
                            </div>
                        </div>

                        <dl className="flex gap-3 shrink-0">
                            <div className="flex flex-col rounded-xl border border-border-default bg-bg-secondary/60 px-3.5 py-2 min-w-[72px]">
                                <dt className="text-caption uppercase tracking-wider text-text-tertiary">
                                    Esta semana
                                </dt>
                                <dd className="text-heading-md font-bold text-text-primary leading-none mt-1">
                                    {weekCount}
                                </dd>
                            </div>
                            <div className="flex flex-col rounded-xl border border-border-default bg-bg-secondary/60 px-3.5 py-2 min-w-[72px]">
                                <dt className="text-caption uppercase tracking-wider text-text-tertiary">
                                    Hoy
                                </dt>
                                <dd className="text-heading-md font-bold text-accent-primary leading-none mt-1">
                                    {todayCount}
                                </dd>
                            </div>
                            {userAnimeList ? (
                                <div className="flex flex-col rounded-xl border border-border-default bg-bg-secondary/60 px-3.5 py-2 min-w-[72px]">
                                    <dt className="text-caption uppercase tracking-wider text-text-tertiary">
                                        En tu lista
                                    </dt>
                                    <dd className="text-heading-md font-bold text-accent-secondary leading-none mt-1">
                                        {userAnimeList.animeList.length}
                                    </dd>
                                </div>
                            ) : null}
                        </dl>
                    </div>
                </header>

                {animes === null ? (
                    <EmptyState
                        icon={<FiAlertTriangle className="w-8 h-8" />}
                        title="No se pudieron cargar los animes en emisión"
                        description="Ocurrió un problema al obtener los estrenos. Intentá nuevamente más tarde."
                        className="py-20"
                        action={
                            <Link
                                href="/animes"
                                className="inline-flex h-10 items-center justify-center px-4 text-body-sm font-medium rounded-md bg-accent-primary text-white hover:bg-accent-primary-hover transition-all"
                            >
                                Explorar catálogo
                            </Link>
                        }
                    />
                ) : animes.length === 0 ? (
                    <EmptyState
                        icon={<FiInbox className="w-8 h-8" />}
                        title="No hay animes en emisión"
                        description="No encontramos estrenos programados por el momento. Volvé a consultar más tarde."
                        className="py-20"
                        action={
                            <Link
                                href="/animes"
                                className="inline-flex h-10 items-center justify-center px-4 text-body-sm font-medium rounded-md bg-accent-primary text-white hover:bg-accent-primary-hover transition-all"
                            >
                                Explorar catálogo
                            </Link>
                        }
                    />
                ) : (
                    <Suspense
                        fallback={
                            <div className="animate-pulse py-20 text-center text-text-tertiary">
                                Cargando calendario…
                            </div>
                        }
                    >
                        <AiringAnimeDay
                            animes={animes}
                            userAnimeList={userAnimeList}
                            isAuthenticated={Boolean(token)}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
