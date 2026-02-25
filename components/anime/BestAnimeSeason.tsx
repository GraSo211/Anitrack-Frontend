import { getTopSeasonAnime } from "@/actions/getTopSeasonAnime";
import { AnimeTopSeason } from "@/types/AnimeTopSeason";
import Image from "next/image";
import React from "react";

export default async function BestAnimeSeason() {
    const anime: AnimeTopSeason | null = await getTopSeasonAnime();

    return (
        <div className="w-full p-3 xl:w-[80%]  mx-auto text-[#e0e1dd]">
            <h2 className="text-xl font-bold lg:text-3xl mb-1">El público ha hablado</h2>
            <h3 className="font-semibold lg:text-xl mb-6 opacity-90">Este es el anime mejor valorado de la temporada</h3>

            {anime && (
                <div className="relative w-full h-75 rounded-xl overflow-hidden shadow-lg">
                    {anime.bannerImage && <Image src={anime.bannerImage} alt={anime.title.romaji || anime.title.english || ""} fill className="object-cover brightness-75" />}

                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />

                    <div className="absolute bottom-4 left-4">
                        <h3 className="text-xl  lg:text-2xl font-bold drop-shadow-lg">{anime.title.english || anime.title.romaji}</h3>

                        <div className="flex gap-3 mt-2">
                            <span className="px-3 py-1 text-sm bg-[#415a77] rounded-full">⭐ {anime.averageScore}</span>
                            <span className="px-3 py-1 text-sm bg-[#1b263b] rounded-full">🔥 {anime.popularity.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
