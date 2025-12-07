"use client";
import { Anime } from "@/types/Anime";
import { AnimeCard as AnimeCardType } from "@/types/AnimeCard";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";

interface Props {
    anime: Anime | AnimeCardType;
}

export default function AnimeCard({ anime }: Props) {
    return (
        <li key={anime.id} className="  p-1 items-baseline rounded-md flex flex-col gap-2 ">
            <Link href={`/anime/${anime.id}`}>
                <div className="relative w-full  ">
                    <Image src={anime.coverImage?.extraLarge || anime.coverImage?.large|| anime.coverImage?.medium || "/coverImagePlaceholder.jpg"} alt={anime.title.romaji || "Default Anime Cover"} height={400} width={200} className="object-cover w-40 h-60 2xl:w-60 2xl:h-80 rounded-md" />
                </div>
            </Link>
            <Link href={`/anime/${anime.id}`} className="w-40 2xl:w-60 text-center">
                <h4 className="text-xs  font-semibold text-pretty">{anime.title.romaji}</h4>
            </Link>
        </li>
    );
}
