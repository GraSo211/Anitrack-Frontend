// components/anime-detailed/right-section/RightSection.client.tsx
"use client";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";

import AnimeStatus from "@/components/anime/info/AnimeStatus";
import Genres from "@/components/anime/info/Genres";
import Episodes from "@/components/anime/info/Episodes";
import buildTrailerUrl from "@/utils/buildTrailerUrl";
import { EpisodePage } from "@/types/EpisodePage";

interface Props {
    malId: number;
    titleRomaji?: string;
    titleEnglish?: string;
    synonyms: string[];
    averageScore?: number;
    popularity?: number;
    status?: string;
    genres: string[];
    description?: string;
    trailer?: {
        id?: number;
        site?: string;
        thumbnail?: string;
    };
    episodePage: EpisodePage;
}

export default function RightSectionClient({ titleRomaji, titleEnglish, synonyms, averageScore, popularity, status, genres, description, trailer, episodePage }: Props) {
    return (
        <div className="flex flex-col w-full relative">
            <header>
                <h1 className="text-4xl font-extrabold text-white">{titleRomaji ?? titleEnglish ?? "Título desconocido"}</h1>

                {synonyms.length > 0 && <p className="text-xs my-1 text-gray-400">{synonyms.join(", ")}</p>}

                <div className="flex flex-wrap gap-3 items-center">
                    {averageScore && <span>⭐ {averageScore}</span>}
                    {popularity && <span>🔥 {popularity}</span>}
                    {status && <AnimeStatus status={status} />}
                </div>
            </header>

            <Genres genres={genres} />

            {description && (
                <section className="bg-gray-900/60 rounded-xl p-4 my-2">
                    <div
                        className="text-gray-200 leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                        }}
                    />
                </section>
            )}

            {trailer?.thumbnail && (
                <section>
                    <Link href={buildTrailerUrl(trailer)!} target="_blank">
                        <div className="relative w-full max-w-120 aspect-video">
                            <Image
                                alt={titleRomaji ?? "Trailer"}
                                src={trailer.thumbnail}
                                fill
                                sizes="(max-width: 768px) 100vw, 480px"
                                className="rounded-lg object-cover hover:brightness-90 transition"
                            />
                        </div>
                    </Link>
                </section>
            )}

            <section className="mt-6">
                <h2 className="text-2xl font-bold text-white mb-4">Episodios</h2>

                {episodePage.items?.map((episode) => (
                    <Episodes key={episode.malId} episode={episode} watched={false} />
                ))}
            </section>
        </div>
    );
}
