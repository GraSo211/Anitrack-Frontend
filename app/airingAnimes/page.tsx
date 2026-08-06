import { cookies } from "next/headers";
import { getReleasingAnimes } from "@/actions/animes/getReleasingAnimes";
import { getAnimeList } from "@/actions/anime-list/getAnimeList";
import AiringAnimeDay from "@/components/airingAnime/AiringAnimeDay";
import { AnimeList, AnimeReleasing } from "@/types/anime/Anime";
import { connection } from "next/server";
import React, { Suspense } from "react";
import Link from "next/link";

export default async function page() {
    await connection();
    const cookieStore = await cookies();
    const token = cookieStore.get("access_token")?.value;

    const animes: AnimeReleasing[] | null = await getReleasingAnimes();
    const userAnimeList: AnimeList | null = token
        ? await getAnimeList(token, "watching")
        : null;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
                <header className="mb-6">
                    <h1 className="text-display-md lg:text-heading-xl font-bold text-text-primary mb-1">
                        Animes{" "}
                        <span className="gradient-text">en emisión</span>
                    </h1>
                    <p className="text-body-sm text-text-secondary">
                        Seguí los estrenos semanales y no te pierdas el próximo
                        episodio de tus series favoritas.
                    </p>
                </header>

                {animes === null ? (
                    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                        <p className="text-body-lg text-text-primary font-semibold">
                            No se pudieron cargar los animes en emisión
                        </p>
                        <p className="text-body-sm text-text-muted">
                            Intentá nuevamente más tarde.
                        </p>
                        <Link
                            href="/animes"
                            className="inline-flex h-10 items-center justify-center px-4 text-body-sm font-medium rounded-md bg-accent-primary text-white hover:bg-accent-primary-hover transition-all"
                        >
                            Explorar catálogo
                        </Link>
                    </div>
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
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
}
