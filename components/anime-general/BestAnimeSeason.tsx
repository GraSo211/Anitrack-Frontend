import { getTopSeasonAnime } from "@/actions/animes/getTopSeasonAnime";
import { AnimeTopSeason } from "@/types/anime/Anime";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaFireAlt } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

export default async function BestAnimeSeason() {
    const anime: AnimeTopSeason | null = await getTopSeasonAnime();
    if (!anime) return null;

    const title = anime.title?.english || anime.title?.romaji || "Sin título";

    return (
        <div className="w-full p-3 xl:w-[80%] mx-auto text-text-primary">
            <h2 className="text-xl font-bold lg:text-3xl mb-1">El público ha hablado</h2>
            <h3 className="font-semibold lg:text-xl mb-6 text-text-secondary">Este es el anime mejor valorado de la temporada</h3>

            <Link
                href={`/anime/a-${anime.id}`}
                aria-label={`Ver ${title}`}
                className="group relative block w-full h-75 rounded-xl overflow-hidden shadow-lg"
            >
                {anime.bannerImage && (
                    <Image
                        src={anime.bannerImage}
                        alt={title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 80vw"
                        className="object-cover brightness-75 transition-all duration-500 group-hover:scale-105 group-hover:brightness-90 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-hover:brightness-75"
                    />
                )}

                <div className="absolute inset-0 bg-linear-to-b from-transparent to-overlay-dark/70" />

                <div className="absolute bottom-4 left-4 text-text-light">
                    <h3 className="text-xl  lg:text-2xl font-bold drop-shadow-lg">{title}</h3>

                    <div className="flex gap-3 mt-2">
                        <span className="best-anime-chip-score px-3 py-1 text-sm bg-bg-quaternary/80 border border-border-default rounded-full flex items-center gap-1"><FaStar aria-hidden="true" /> {anime.averageScore ?? "—"}</span>
                        <span className="best-anime-chip-popularity px-3 py-1 text-sm bg-bg-tertiary/80 border border-border-default rounded-full flex items-center gap-1"><FaFireAlt aria-hidden="true" /> {anime.popularity?.toLocaleString() ?? "—"}</span>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-primary px-3 py-1.5 text-caption font-semibold text-text-light shadow-md transition-colors group-hover:bg-accent-primary-hover">
                        <FaPlay aria-hidden="true" className="w-3 h-3" />
                        Ver anime
                    </span>
                </div>
            </Link>
        </div>
    );
}
