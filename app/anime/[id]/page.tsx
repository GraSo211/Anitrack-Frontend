import { getAnimeById } from "@/actions/getAnimeById";

import { AnimeResponse } from "@/types/AnimeResponse";
import React from "react";

import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";

import AnimeStatus from "@/components/anime/info/AnimeStatus";
import Genres from "@/components/anime/info/Genres";

import Episodes from "@/components/anime/info/Episodes";
import { Anime } from "@/types/Anime";
import Link from "next/link";
import buildTrailerUrl from "@/utils/buildTrailerUrl";
import Hero from "@/components/anime-detailed/Hero";
import LeftSection from "../../../components/anime-detailed/left-section/LeftSection";
import RightSection from "@/components/anime-detailed/right-section/RightSection";

interface Props {
    params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
    const { id } = await params;
    const anime: Anime = await getAnimeById(id);  
    console.log(anime.relations);
    return (
        <div className="min-h-screen relative bg-black">
            {/* Hero */}
            <Hero bannerImage={anime.bannerImage} title={anime.title.romaji || anime.title.english} />

            {/* Content */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className="
                mt-[12rem]
                rounded-2xl
                shadow-2xl
                p-6
                flex flex-col lg:flex-row
                gap-8
            "
                >
                    {/* Left */}
                    <LeftSection
                        coverImage={anime.coverImage?.extraLarge || anime.coverImage?.large}
                        title={anime.title.romaji || anime.title.english}
                        studio={anime.studio}
                        source={anime.source}
                        episodes={anime.episodes}
                        startDate={anime.startDate}
                        endDate={anime.endDate}
                        season={anime.season}
                        seasonYear={anime.seasonYear}
                        countryOfOrigin={anime.countryOfOrigin}
                        isAdult={anime.isAdult}
                        nextAiringEpisode={anime.nextAiringEpisode}
                        duration={anime.duration}
                        relations={anime.relations}
                    />

                    {/* Right */}
                    <RightSection
                        titleRomaji={anime.title.romaji}
                        titleEnglish={anime.title.english}
                        synonyms={anime.synonyms}
                        averageScore={anime.averageScore}
                        popularity={anime.popularity}
                        status={anime.status}
                        genres={anime.genres}
                        description={anime.description}
                        trailer={anime.trailer}
                        episodes={anime.episodes}
                        
                    />
                </div>
            </main>
        </div>
    );
}
