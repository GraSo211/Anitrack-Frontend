"use client";

import { AnimeCard as AnimeCardType } from "@/types/AnimeCard";
import Link from "next/dist/client/link";
import React from "react";

interface Props {
    anime: AnimeCardType;
}

export default function AnimeCard({ anime }: Props) {
    return (
        <li key={anime.id} className="  p-1 items-baseline rounded-md flex flex-col gap-2 ">
            <Link href={`/anime/${anime.id}`}>
                <div className="relative w-25 h-35  lg:w-40 lg:h-60 2xl:w-60 2xl:h-80   max-w-[400]   ">
                    <img src={anime.coverImage?.extraLarge || anime.coverImage?.large|| anime.coverImage?.medium || "/coverImagePlaceholder.jpg"} alt={anime.title.romaji || "Default Anime Cover"} sizes="(max-width: 768px) 100vw, 480px" className="object-cover rounded-md" />
                </div>
            </Link>
            <Link href={`/anime/${anime.id}`} className="w-20 lg:w-40 2xl:w-60 text-center">
                <h4 className=" text-[10px] lg:text-xs  font-semibold text-pretty">{anime.title.romaji}</h4>
            </Link>
        </li>
    );
}
