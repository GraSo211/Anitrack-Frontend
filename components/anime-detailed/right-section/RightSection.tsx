import AnimeStatus from "@/components/anime/info/AnimeStatus";
import Genres from "@/components/anime/info/Genres";
import buildTrailerUrl from "@/utils/buildTrailerUrl";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";
import DOMPurify from "isomorphic-dompurify";
import Episodes from "@/components/anime/info/Episodes";

interface Props {
    titleRomaji: string | undefined;
    titleEnglish: string | undefined;
    synonyms: string[];
    averageScore: number | undefined;
    popularity: number | undefined;
    status: string | undefined;
    genres: string[];
    description: string | undefined;
    trailer?: {
        id?: number;
        site?: string;
        thumbnail?: string;
    };
    episodes: number | undefined;
    nextAiringEpisode?: {
        id?: number | undefined;
        airingAt?: number | undefined;
        timeUntilAiring?: number | undefined;
        episode?: number | undefined;
        mediaId?: number | undefined;
    };
}

export default function RightSection({ titleRomaji, titleEnglish, synonyms, averageScore, popularity, status, genres, description, trailer, episodes, nextAiringEpisode }: Props) {

    return (
        <div className="flex flex-col  w-full relative">
            {/* Header */}
            <header className="">
                <h1 className="text-4xl font-extrabold text-white leading-tight">{titleRomaji || titleEnglish}</h1>

                {synonyms.length > 0 && <p className="text-xs my-1 text-gray-400">{synonyms.join(", ")}</p>}

                {/* Metrics */}
                <div className="flex flex-wrap gap-3 items-center">
                    {averageScore && <span className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 font-semibold">⭐ {averageScore}</span>}
                    {popularity && <span className="px-3 py-1 rounded bg-orange-500/20 text-orange-400 font-semibold">🔥 {popularity}</span>}
                    {status && <AnimeStatus status={status} />}
                </div>
            </header>

            {/* Genres */}
            <Genres genres={genres} />

            {/* Description */}
            {description && (
                <section className="bg-gray-900/60 rounded-xl p-4 my-2 border border-gray-700">
                    <p
                        className="text-gray-200 leading-relaxed text-base"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(description),
                        }}
                    />
                </section>
            )}

            {/* Trailer */}
            {trailer?.thumbnail && (
                <section>
                    <h2 className="text-xl font-semibold text-white mb-3">Trailer</h2>
                    <Link href={buildTrailerUrl(trailer)!} target="_blank" className="group inline-block">
                        <div className="relative overflow-hidden rounded-xl border border-gray-700 shadow-lg">
                            <Image alt={titleRomaji || "Trailer"} src={trailer.thumbnail} width={480} height={270} className="object-cover transition-transform duration-300 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="bg-black/60 text-white px-4 py-2 rounded-full font-semibold">▶ Ver trailer</span>
                            </div>
                        </div>
                    </Link>
                </section>
            )}

            {/* Episodes */}
            {episodes && status === "FINISHED" && (
                <section className="mt-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Episodios</h2>
                  
                </section>
            )}
        </div>
    );
}
